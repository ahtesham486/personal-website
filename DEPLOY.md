# Cloudflare Deploy — Next.js Portfolio

## Build settings (Cloudflare Pages / Workers)

| Setting | Value |
|--------|--------|
| Build command | `npm run build` |
| **Output directory** | **`out`** ← NOT `dist` |
| Node.js | **20** |
| Deploy command | `npx wrangler deploy` |

> **Important:** After migrating to Next.js, output is `out/` not `dist/`.
> If Cloudflare still reads `dist`, update the dashboard setting and redeploy.

### Fix: `_redirects` infinite loop error

Do **not** use SPA mode for Next.js (multi-page site).  
`wrangler.jsonc` uses `"not_found_handling": "404-page"` instead of `"single-page-application"`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Production build

```bash
npm run build
```

Static export output → `out/` folder (used by `wrangler.jsonc`).

## Add a blog post

See [BLOG.md](./BLOG.md) — create a `.md` file in `content/blog/` and push to GitHub.

## Edit site content

- **Config & projects:** `data/siteConfig.ts`
- **Blog posts:** `content/blog/*.md`
- **Tech stack:** `data/techStackData.ts`

## Custom domain

Domain: **ahtasham.site** — connected via Cloudflare nameservers + Worker custom domain.

## SEO files (auto-generated at build)

- `/sitemap.xml` — all pages + blog + projects
- `/robots.txt` — allows indexing
- JSON-LD schema in `app/layout.tsx` and per-page metadata
