# Chuxi’s notebook

A responsive personal introduction and Markdown-powered blog for **https://xiechuxi.github.io**. Built with Astro and TypeScript; no backend or database required.

## Features

- Notebook-style homepage with custom illustrations and a featured post.
- Search by title, description, topic, and tags; combine search with topic filters.
- Individual articles with reading time, table of contents, syntax highlighting, and related posts.
- About page, RSS subscription guide, styled RSS feed, sitemap, and custom 404.
- Persistent light/dark theme, keyboard-accessible controls, reduced-motion support, and mobile layouts.
- Locally hosted fonts and illustrations, with no external tracking or required image services.
- GitHub Actions builds, tests, and deploys the static site to GitHub Pages.

## Local development

Requires **Node.js 22.12.0 or newer**. Install dependencies with `npm install`, then run `npm run dev`. Open **http://localhost:4321**.

Use `npm run build` to validate types and create the static site. Use `npm run preview` to preview the production build. Run `npm test` **after building** for unit tests and generated-page/link checks.

## Make it your own

Start with [src/config.ts](src/config.ts): edit your display name, introduction, short bio, GitHub URL, and about paragraphs. The initial personal copy is editable starter text, not a verified biography.

The five visible articles are original **sample posts** to demonstrate the layout. Replace or remove them before publishing if you prefer to start with only your own writing. Colors, spacing, and responsive styles are in [src/styles/global.css](src/styles/global.css).

## Publish a post

1. Copy [src/content/blog/your-next-note.md](src/content/blog/your-next-note.md) to a new Markdown file in the same folder with a URL-friendly name, such as `my-first-post.md`.
2. Set the frontmatter: `title`, `description`, `pubDate` (YYYY-MM-DD), `category`, and `tags`.
3. Choose a category: `Building`, `Learning`, or `Life & thoughts`. Choose optional `artwork`: `notebook`, `code`, `garden`, or `window`.
4. Write your post below the frontmatter using Markdown. Headings, links, lists, images, and fenced code blocks are supported.
5. Set `draft: false` (or remove it) when ready. Drafts are excluded from the homepage, article routes, RSS, and sitemap, **including local previews**. Preview a post by setting it to published locally before pushing.
6. Optionally set `featured: true`. If multiple posts are featured, the newest one wins. Otherwise, the newest post is featured automatically.
7. Check with `npm run build` and `npm test`, then commit and push to `main`.

The filename determines the post URL. For example, `my-first-post.md` becomes `/blog/my-first-post/`. Images may be placed in the public folder and referenced by a root-relative URL. Keep the title and description concise for readable cards and search snippets.

**Posting is file-based**, not a browser admin panel. You can also create or edit Markdown files directly in GitHub’s web editor. Once committed to `main`, the deployment workflow rebuilds the blog.

## GitHub Pages deployment

1. In the repository’s **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Commit and push the site, including the npm lockfile, to `main`.
3. The workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) checks, builds, tests, and deploys automatically. Pull requests are validated without deploying.
4. When the workflow completes, visit **https://xiechuxi.github.io**.

[astro.config.mjs](astro.config.mjs) already uses the user-site URL. No repository path prefix is necessary for this repository. If you change the domain, also update the sitemap URL in [public/robots.txt](public/robots.txt).

The RSS feed is available at **https://xiechuxi.github.io/rss.xml**. No mailing service is configured; the follow button uses a real RSS feed rather than collecting email addresses.