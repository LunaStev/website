import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const rootDirectory = path.resolve(scriptDirectory, "..");
const contentDirectory = path.join(rootDirectory, "content", "posts");
const blogDirectory = path.join(rootDirectory, "blog");
const generatedPostsDirectory = path.join(blogDirectory, "posts");
const siteUrl = "https://lunastev.org";

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function escapeXml(value) {
    return escapeHtml(value);
}

function parseFrontMatter(source, fileName) {
    const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);

    if (!match) {
        throw new Error(`${fileName}: missing front matter`);
    }

    const metadata = {};

    for (const line of match[1].split(/\r?\n/)) {
        if (!line.trim() || line.trimStart().startsWith("#")) {
            continue;
        }

        const separator = line.indexOf(":");
        if (separator === -1) {
            throw new Error(`${fileName}: invalid front matter line: ${line}`);
        }

        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();

        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        metadata[key] = value;
    }

    for (const requiredField of ["title", "date", "description", "slug"]) {
        if (!metadata[requiredField]) {
            throw new Error(`${fileName}: missing ${requiredField}`);
        }
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.date) ||
        Number.isNaN(Date.parse(`${metadata.date}T00:00:00Z`))) {
        throw new Error(`${fileName}: date must use YYYY-MM-DD`);
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(metadata.slug)) {
        throw new Error(`${fileName}: slug must contain lowercase letters, numbers, and hyphens only`);
    }

    return {
        title: metadata.title,
        date: metadata.date,
        description: metadata.description,
        slug: metadata.slug,
        lang: metadata.lang || "en",
        draft: metadata.draft?.toLowerCase() === "true",
        body: match[2].trim()
    };
}

function renderInline(source) {
    const tokens = [];
    const reserve = (html) => {
        const index = tokens.push(html) - 1;
        return `\u0000${index}\u0000`;
    };

    let text = source.replace(/`([^`\n]+)`/g, (_, code) =>
        reserve(`<code>${escapeHtml(code)}</code>`)
    );

    text = text.replace(/\[([^\]]+)]\(([^)\s]+)\)/g, (_, label, href) => {
        const safeHref = /^(https?:\/\/|mailto:|\/|#)/.test(href) ? href : "#";
        const external = /^https?:\/\//.test(safeHref) ? ' target="_blank" rel="noopener"' : "";
        return reserve(`<a href="${escapeHtml(safeHref)}"${external}>${escapeHtml(label)}</a>`);
    });

    text = escapeHtml(text)
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>");

    return text.replace(/\u0000(\d+)\u0000/g, (_, index) => tokens[Number(index)]);
}

function isBlockStart(line) {
    return /^```/.test(line) ||
        /^#{1,6}\s+/.test(line) ||
        /^>\s?/.test(line) ||
        /^[-*]\s+/.test(line) ||
        /^\d+\.\s+/.test(line) ||
        /^---\s*$/.test(line);
}

function renderMarkdown(source) {
    const lines = source.replaceAll("\r\n", "\n").split("\n");
    const output = [];
    let index = 0;

    while (index < lines.length) {
        const line = lines[index];

        if (!line.trim()) {
            index += 1;
            continue;
        }

        const fence = line.match(/^```([A-Za-z0-9_+-]*)\s*$/);
        if (fence) {
            const code = [];
            index += 1;

            while (index < lines.length && !/^```\s*$/.test(lines[index])) {
                code.push(lines[index]);
                index += 1;
            }

            if (index === lines.length) {
                throw new Error("Unclosed code fence in post body");
            }

            index += 1;
            const language = fence[1] ? ` class="language-${escapeHtml(fence[1])}"` : "";
            output.push(`<pre><code${language}>${escapeHtml(code.join("\n"))}</code></pre>`);
            continue;
        }

        const heading = line.match(/^(#{1,6})\s+(.+)$/);
        if (heading) {
            const level = heading[1].length;
            output.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
            index += 1;
            continue;
        }

        if (/^>\s?/.test(line)) {
            const quote = [];

            while (index < lines.length && /^>\s?/.test(lines[index])) {
                quote.push(lines[index].replace(/^>\s?/, ""));
                index += 1;
            }

            output.push(`<blockquote><p>${renderInline(quote.join(" "))}</p></blockquote>`);
            continue;
        }

        if (/^[-*]\s+/.test(line)) {
            const items = [];

            while (index < lines.length && /^[-*]\s+/.test(lines[index])) {
                items.push(lines[index].replace(/^[-*]\s+/, ""));
                index += 1;
            }

            output.push(`<ul>\n${items.map((item) => `    <li>${renderInline(item)}</li>`).join("\n")}\n</ul>`);
            continue;
        }

        if (/^\d+\.\s+/.test(line)) {
            const items = [];

            while (index < lines.length && /^\d+\.\s+/.test(lines[index])) {
                items.push(lines[index].replace(/^\d+\.\s+/, ""));
                index += 1;
            }

            output.push(`<ol>\n${items.map((item) => `    <li>${renderInline(item)}</li>`).join("\n")}\n</ol>`);
            continue;
        }

        if (/^---\s*$/.test(line)) {
            output.push("<hr>");
            index += 1;
            continue;
        }

        const paragraph = [line.trim()];
        index += 1;

        while (index < lines.length && lines[index].trim() && !isBlockStart(lines[index])) {
            paragraph.push(lines[index].trim());
            index += 1;
        }

        output.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
    }

    return output.join("\n\n");
}

function displayDate(date, lang = "en") {
    const locale = lang.toLowerCase().startsWith("ko") ? "ko-KR" : "en-US";
    return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC"
    }).format(new Date(`${date}T00:00:00Z`));
}

function layout({ lang = "en", title, description, canonical, content, type = "website", date }) {
    const jsonDescription = JSON.stringify(description).replaceAll("<", "\\u003c");
    const jsonTitle = JSON.stringify(title).replaceAll("<", "\\u003c");
    const jsonCanonical = JSON.stringify(canonical).replaceAll("<", "\\u003c");

    const structuredData = type === "article"
        ? `{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${jsonTitle},
      "description": ${jsonDescription},
      "url": ${jsonCanonical},
      "datePublished": ${JSON.stringify(date)},
      "author": {
        "@type": "Person",
        "name": "LunaStev",
        "url": "${siteUrl}/"
      }
    }`
        : `{
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": ${jsonTitle},
      "description": ${jsonDescription},
      "url": ${jsonCanonical},
      "author": {
        "@type": "Person",
        "name": "LunaStev",
        "url": "${siteUrl}/"
      }
    }`;

    return `<!DOCTYPE html>
<html lang="${escapeHtml(lang)}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
    <link rel="canonical" href="${escapeHtml(canonical)}">
    <link rel="alternate" type="application/rss+xml" title="LunaStev Writing" href="${siteUrl}/blog/feed.xml">
    <link rel="stylesheet" href="/assets/site.css">
    <meta property="og:type" content="${type}">
    <meta property="og:site_name" content="LunaStev Writing">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(description)}">
    <meta property="og:url" content="${escapeHtml(canonical)}">
    <meta property="og:image" content="${siteUrl}/assets/og/cover.svg">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(description)}">
    <meta name="twitter:image" content="${siteUrl}/assets/og/cover.svg">
    <script type="application/ld+json">
    ${structuredData}
    </script>
</head>
<body>
${content}
</body>
</html>
`;
}

function renderPost(post) {
    const canonical = `${siteUrl}/blog/posts/${post.slug}/`;
    const content = `    <main class="page">
        <article class="card">
            <header class="hero">
                <h1>${escapeHtml(post.title)}</h1>
                <p class="post-meta"><time datetime="${post.date}">${escapeHtml(displayDate(post.date, post.lang))}</time></p>
                <nav class="classic-links" aria-label="Main navigation">
                    <a href="/">[Home]</a>
                    <a href="/blog/">[Writing]</a>
                    <a href="${siteUrl}/blog/feed.xml">[RSS]</a>
                </nav>
            </header>

            <hr>

            <div class="post-body">
${renderMarkdown(post.body)}
            </div>

            <hr>

            <footer class="footer-center">
                <small><a href="/blog/">Back to the writing archive</a></small>
            </footer>
        </article>
    </main>`;

    return layout({
        lang: post.lang,
        title: `${post.title} | LunaStev`,
        description: post.description,
        canonical,
        content,
        type: "article",
        date: post.date
    });
}

function renderIndex(posts) {
    const archive = posts.length === 0
        ? '<p class="empty-state">No entries yet.</p>'
        : `<ol class="post-list">
${posts.map((post) => `                    <li>
                        <time datetime="${post.date}">${escapeHtml(displayDate(post.date))}</time><br>
                        <b><a href="/blog/posts/${post.slug}/">${escapeHtml(post.title)}</a></b>
                        <p class="post-summary">${escapeHtml(post.description)}</p>
                    </li>`).join("\n")}
                </ol>`;

    const content = `    <main class="page">
        <article class="card">
            <header class="hero">
                <h1>Writing</h1>
                <p>Development notes, technical writing, and retrospectives.</p>
                <nav class="classic-links" aria-label="Main navigation">
                    <a href="/">[Home]</a>
                    <a href="https://github.com/wavefnd/Wave" target="_blank" rel="noopener">[Wave]</a>
                    <a href="/blog/feed.xml">[RSS]</a>
                </nav>
            </header>

            <hr>

            <section>
                <h2>Archive</h2>
                ${archive}
            </section>

            <hr>

            <footer class="footer-center">
                <small>&copy; 2026 LunaStev</small>
            </footer>
        </article>
    </main>`;

    return layout({
        title: "Writing | LunaStev",
        description: "Development notes, technical writing, and retrospectives by LunaStev.",
        canonical: `${siteUrl}/blog/`,
        content
    });
}

function renderFeed(posts) {
    const items = posts.map((post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/posts/${post.slug}/</link>
      <guid>${siteUrl}/blog/posts/${post.slug}/</guid>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`).join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>LunaStev Writing</title>
    <link>${siteUrl}/blog/</link>
    <description>Development notes, technical writing, and retrospectives.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}

function renderSitemap(posts, buildDate) {
    const urls = [
        { path: "/", lastModified: buildDate, priority: "1.0" },
        { path: "/blog/", lastModified: posts[0]?.date || buildDate, priority: "0.9" },
        ...posts.map((post) => ({
            path: `/blog/posts/${post.slug}/`,
            lastModified: post.date,
            priority: "0.8"
        }))
    ];

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${siteUrl}${url.path}</loc>
    <lastmod>${url.lastModified}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
}

async function loadPosts() {
    const entries = await fs.readdir(contentDirectory, { withFileTypes: true });
    const files = entries
        .filter((entry) =>
            entry.isFile() &&
            entry.name.endsWith(".md") &&
            !entry.name.startsWith("_") &&
            entry.name.toLowerCase() !== "readme.md"
        )
        .map((entry) => entry.name)
        .sort();

    const posts = [];

    for (const fileName of files) {
        const source = await fs.readFile(path.join(contentDirectory, fileName), "utf8");
        const post = parseFrontMatter(source, fileName);

        if (!post.draft) {
            posts.push(post);
        }
    }

    const slugs = new Set();
    for (const post of posts) {
        if (slugs.has(post.slug)) {
            throw new Error(`Duplicate slug: ${post.slug}`);
        }
        slugs.add(post.slug);
    }

    return posts.sort((left, right) => right.date.localeCompare(left.date));
}

async function build() {
    const posts = await loadPosts();
    const buildDate = new Date().toISOString().slice(0, 10);

    await fs.mkdir(blogDirectory, { recursive: true });
    await fs.rm(generatedPostsDirectory, { recursive: true, force: true });
    await fs.mkdir(generatedPostsDirectory, { recursive: true });

    for (const post of posts) {
        const outputDirectory = path.join(generatedPostsDirectory, post.slug);
        await fs.mkdir(outputDirectory, { recursive: true });
        await fs.writeFile(path.join(outputDirectory, "index.html"), renderPost(post), "utf8");
    }

    await Promise.all([
        fs.writeFile(path.join(blogDirectory, "index.html"), renderIndex(posts), "utf8"),
        fs.writeFile(path.join(blogDirectory, "feed.xml"), renderFeed(posts), "utf8"),
        fs.writeFile(path.join(rootDirectory, "sitemap.xml"), renderSitemap(posts, buildDate), "utf8")
    ]);

    console.log(`Built ${posts.length} published post${posts.length === 1 ? "" : "s"}.`);
}

await build();
