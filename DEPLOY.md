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

- `/sitemap.xml` — all pages + blog + projects (submit in Google Search Console)
- `/robots.txt` — single `Allow: /` rule (see Cloudflare note below)
- `/llms.txt` and `/llms-full.txt` — AI crawler context
- JSON-LD schema on every page (Person, LocalBusiness, Service, FAQ, BlogPosting, Breadcrumbs)
- `/opengraph-image` — PNG social preview (1200×630)

### Fix robots.txt conflict (Cloudflare)

If audit tools show **"BEGIN Cloudflare Managed content"** blocking GPTBot/ClaudeBot **before** your Allow rules:

1. Cloudflare Dashboard → **Security** → **Bots** (or **Scrape Shield**)
2. Find **AI Crawlers** / **Manage robots.txt** settings
3. Set AI bots to **Allow** (not Block)
4. Purge cache and re-check `https://ahtasham.site/robots.txt`

Your repo only ships a clean robots file:
```
User-agent: *
Allow: /
Sitemap: https://ahtasham.site/sitemap.xml
```

### Google Search Console (manual — required for indexing)

1. https://search.google.com/search-console → Add property `ahtasham.site`
2. Verify via DNS TXT (easy on Cloudflare) or HTML tag
3. Submit sitemap: `https://ahtasham.site/sitemap.xml`
4. URL Inspection → Request indexing for `/`, `/about`, `/services`, `/blog`, `/contact`
