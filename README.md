# lunastev.org

A dependency-free static website focused on Wave and a small Markdown-based
writing archive.

## Local preview

Serve the repository root with any static file server. For example:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish a post

1. Copy `content/posts/_template.md` to a new Markdown file in the same
   directory.
2. Fill in the front matter and write the post.
3. Set `draft: false`.
4. Run the build:

```sh
node scripts/build-blog.mjs
```

Commit the Markdown source and generated files together. The build updates the
writing archive, individual post pages, RSS feed, and sitemap. See
`content/posts/README.md` for the supported Markdown syntax and full workflow.
