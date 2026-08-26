# Writing workflow

Posts are written in Markdown and compiled to static HTML. No package install is
required.

1. Copy `_template.md` to a descriptive filename such as
   `2026-08-25-wave-retrospective.md`.
2. Set `title`, `date`, `description`, `slug`, and `lang` in the front matter.
3. Change `draft` to `false` when the post is ready to publish.
4. Run `node scripts/build-blog.mjs` from the repository root.

The build creates:

- `blog/index.html`: the writing archive.
- `blog/posts/<slug>/index.html`: one page per published post.
- `blog/feed.xml`: the RSS feed.
- `sitemap.xml`: the current search-engine sitemap.

Do not edit generated files under `blog/` directly. Edit the Markdown source and
run the build again.

Supported Markdown includes headings, paragraphs, links, bold and italic text,
inline code, fenced code blocks, blockquotes, ordered lists, unordered lists,
and horizontal rules.
