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

Content-Signal: ai-train=no, search=yes, ai-input=yes

Sitemap: https://ahtasham.site/sitemap.xml
```

> **Note:** “Allow on all pages” alone does **not** fix the conflict if managed robots.txt is still ON. You must **disable** “Instruct AI bot traffic with robots.txt”.

### Agent-Ready audit (Cloudflare "Is Your Site Agent-Ready?")

The repo ships discovery files for AI agents:

| Path | Purpose |
|------|---------|
| `/.well-known/api-catalog` | RFC 9727 API catalog (linkset) |
| `/.well-known/oauth-authorization-server` | OAuth discovery (public site) |
| `/.well-known/openid-configuration` | OIDC discovery stub |
| `/.well-known/oauth-protected-resource` | Protected resource metadata |
| `/auth.md` | Agent registration / contact instructions |
| `/.well-known/mcp/server-card.json` | MCP server card |
| `/.well-known/agent-skills/index.json` | Agent skills index |
| `/llms.txt` / `/llms-full.txt` | LLM grounding context |
| `functions/_middleware.js` | `Accept: text/markdown` → markdown homepage |
| `Link` response header on `/` | RFC 8288 agent discovery |

**DNS for AI Discovery (DNS-AID)** — add manually in Cloudflare DNS:

1. Cloudflare → **DNS** → **Records** → **Add record**
2. Add **HTTPS** records (repeat for each name):

| Name | Type | Content / Target |
|------|------|----------------|
| `_index._agents` | HTTPS | `1 ahtasham.site alpn=h2,h3` |
| `_a2a._agents` | HTTPS | `1 ahtasham.site alpn=h2,h3` |
| `_mcp._agents` | HTTPS | `1 ahtasham.site alpn=h2,h3` |

**Cloudflare DNS UI steps (exact):**

1. DNS → **Add record**
2. Type: **HTTPS** (if not listed, use **SVCB**)
3. Name: `_index._agents` (only this part — Cloudflare adds `.ahtasham.site`)
4. Target / Value: `1 ahtasham.site alpn=h2,h3`
5. Proxy: **DNS only** (grey cloud)
6. Save, then repeat for `_a2a._agents` and `_mcp._agents`

3. Optional TXT on `_index._agents`: `v=aid1; url=https://ahtasham.site/llms.txt`
4. **Enable DNSSEC (required for DNS-AID pass)** — see below

#### DNSSEC — required (fixes “DNSSEC was not validated” / AD=false)

Your HTTPS records are correct. The audit also requires **DNSSEC-signed** DNS so resolvers return `AD=true` (Authenticated Data).

**Step 1 — Enable in Cloudflare**

1. Cloudflare → **ahtasham.site** → **DNS** → **Settings** (or **DNSSEC** tab)
2. Find **DNSSEC** → click **Enable DNSSEC**
3. Cloudflare shows a **DS record** (Digest, Key tag, Algorithm, Digest type) — **copy it**

**Step 2 — Add DS record at your domain registrar**

Where you bought `ahtasham.site` (Namecheap, GoDaddy, Cloudflare Registrar, etc.):

1. Open domain → **DNSSEC** / **DS Records**
2. **Add DS record** — paste the values Cloudflare gave you
3. Save

> If the domain is on **Cloudflare Registrar**, DS is often added automatically after you enable DNSSEC in Step 1.

**Step 3 — Wait and verify**

- Propagation: **15 minutes to 24 hours** (usually ~1 hour)
- Verify at [Cloudflare DNSSEC debugger](https://dnssec-debugger.verisignlabs.com/ahtasham.site) — chain should be **Secure**
- Or run: `dig +dnssec _index._agents.ahtasham.site HTTPS` — look for `ad` flag in response

**Step 4 — Re-scan Agent-Ready**

When DNSSEC is active, DoH responses should show `"AD":true` instead of `"AD":false`.

| Check | Your status |
|-------|-------------|
| 3× HTTPS records | Done |
| DNSSEC enabled | **You must do this in dashboard** |
| DS at registrar | **Required if registrar ≠ Cloudflare auto** |

**Markdown negotiation** — pick one:

1. **Cloudflare dashboard (fastest):** [AI Crawl Control](https://dash.cloudflare.com/?to=/:account/:zone/ai) → enable **Markdown for Agents** (Pro/Business plan). No code needed — Cloudflare converts HTML → markdown when `Accept: text/markdown` is sent.
2. **Worker (this repo):** `worker/index.js` + `run_worker_first: true` in `wrangler.jsonc`. After push, Cloudflare CI must run `npx wrangler deploy` successfully. Purge cache if needed.

**Deploy command:** `npm run build` then `npx wrangler deploy` — uses `worker/index.js` for markdown negotiation (`Accept: text/markdown` → `text/markdown` on `/`). `wrangler.jsonc` sets `run_worker_first: true` so the worker runs before static `index.html` is served.

### Google Search Console (manual — required for indexing)

1. https://search.google.com/search-console → Add property `ahtasham.site`
2. Verify via DNS TXT (easy on Cloudflare) or HTML tag
3. Submit sitemap: `https://ahtasham.site/sitemap.xml`
4. URL Inspection → Request indexing for `/`, `/about`, `/services`, `/blog`, `/contact`

### Cloudflare Speed (safe for this site)

**Important:** This portfolio uses **Three.js + GSAP**. Cloudflare Speed Test score is limited by heavy JS (~2MB). Target **75–85** with 3D, not 100. LCP/FCP can still be excellent.

**Rocket Loader → OFF (required)**  
You enabled it — **turn it OFF now**. It breaks React hydration, GSAP timelines, and Three.js. Score may look similar but the site can glitch.

**Zaraz → Skip**  
Zaraz only helps if you load third-party scripts (Google Analytics, Facebook Pixel, Hotjar). This site has **none** — nothing to configure in Zaraz.

Enable in dashboard:

| Setting | Where | Action |
|---------|--------|--------|
| **Polish** | Speed → Optimization → Image Optimization | **Lossy** ON |
| **Auto Minify** | Speed → Optimization | JS, CSS, HTML **ON** |
| **Brotli** | Speed → Optimization | ON |
| **Early Hints** | Speed → Optimization | ON |
| **HTTP/2 + HTTP/3** | Network | ON |
| **Crawler Hints** | Caching → Configuration | ON |
| **Always Online** | Caching → Configuration | ON (optional) |
| **Rocket Loader** | Speed → Optimization | **OFF** |

#### Cache Rules (Cloudflare dashboard)

Go to **Caching** → **Cache Rules** → **Create rule** (repeat for each):

**Rule 1 — Next.js static assets (1 year)**
- Rule name: `Cache Next static`
- When: URI Path **starts with** `/_next/static/`
- Then: Cache eligibility **Eligible for cache**, Edge TTL **Ignore cache-control and use 1 year**, Browser TTL **respect origin**

**Rule 2 — Images**
- When: URI Path **starts with** `/images/`
- Then: Edge TTL **1 month**, Browser TTL **respect origin**

**Rule 3 — 3D assets**
- When: URI Path **starts with** `/models/` OR `/draco/`
- Then: Edge TTL **1 year**

**Rule 4 — HTML (short cache)**
- When: URI Path **equals** `/` OR ends with `.html`
- Then: Edge TTL **2 hours**, Browser TTL **respect origin**

Static assets already ship with `public/_headers` cache headers; Cache Rules enforce the same at Cloudflare edge.

**Argo Smart Routing** — paid add-on; skip unless you want faster global routing.

After changes: **Caching → Purge Everything**, wait 2 min, re-run Speed Test.
