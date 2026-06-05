# Cloudflare Pages — personal-website

## Dashboard settings (exact)

Cloudflare → **Workers & Pages** → **personal-website** → **Settings** → **Build**

| Setting | Value |
|--------|--------|
| Production branch | `main` |
| Root directory | `/` |
| **Build command** | `npm run build` |
| **Deploy command** | `npx wrangler deploy` |
| Node.js version | **20** |

> **Important:** `Build command` must NOT be empty. Without `npm run build`, the site serves raw source and breaks.

`wrangler.jsonc` in this repo tells Wrangler to deploy the **`dist`** folder (Vite output), not the project root.

## After changing settings

1. **Settings** → save build config
2. **Deployments** → **Retry deployment** (or push a new commit to `main`)
3. Wait until status is **Success**
4. Click **Visit site**

## Local test before push

```bash
npm install
npm run build
npm run preview
```

## Edit website content

`src/data/siteConfig.ts`
