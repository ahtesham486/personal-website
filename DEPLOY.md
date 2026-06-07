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

### Fix robots.txt conflict (Cloudflare) — REQUIRED

Your repo ships a **clean** `robots.txt`. Cloudflare **prepends** its own block at the edge when **managed robots.txt** is ON — code cannot remove that; you must change Cloudflare settings.

If `https://ahtasham.site/robots.txt` shows `# BEGIN Cloudflare Managed content` and `Disallow: /` for GPTBot, ClaudeBot, etc., do **both** steps below.

#### Step A — Turn OFF managed robots.txt (most important)

**Option 1 (Overview sidebar):**

1. Cloudflare → **ahtasham.site** → **Overview**
2. Right sidebar → **Control AI crawlers**
3. **Manage your robots.txt** → set to **Do not manage** / **Off** (NOT “Instruct AI bot traffic…”)
4. Save

**Option 2 (Security settings):**

1. Cloudflare → **Security** → **Settings**
2. Filter: **Bot traffic**
3. Find **Instruct AI bot traffic with robots.txt** → turn **OFF**
4. Save

Docs: [Cloudflare managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/)

#### Step B — Allow AI crawlers (if shown separately)

1. **Block AI training bots** → **Allow on all pages** (or **Do not block**)
2. Optional: uncheck **Display Content Signals Policy** (removes the long comment block at top)

#### Step C — Purge cache

1. Overview → **Quick Actions** → **Purge Cache** → **Purge Everything**
2. Wait 1–2 minutes
3. Open `https://ahtasham.site/robots.txt` in **Incognito** — must match exactly:

```
User-agent: *
Allow: /

Sitemap: https://ahtasham.site/sitemap.xml
```

> **Note:** “Allow on all pages” alone does **not** fix the conflict if managed robots.txt is still ON. You must **disable** “Instruct AI bot traffic with robots.txt”.

### Google Search Console (manual — required for indexing)

1. https://search.google.com/search-console → Add property `ahtasham.site`
2. Verify via DNS TXT (easy on Cloudflare) or HTML tag
3. Submit sitemap: `https://ahtasham.site/sitemap.xml`
4. URL Inspection → Request indexing for `/`, `/about`, `/services`, `/blog`, `/contact`
