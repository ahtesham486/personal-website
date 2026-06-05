# Cloudflare Pages — personal-website

## Recommended settings (new Pages project)

Cloudflare → **Workers & Pages** → **personal-website** → **Settings** → **Build**

| Setting | Value |
|--------|--------|
| Framework preset | **Vite** (or None) |
| Production branch | `main` |
| Root directory | `/` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Deploy command** | *(leave empty)* |
| Node.js version | **20** |

> Use **Build output directory = `dist`**. Do **not** use `npx wrangler deploy` unless you intentionally want a Worker project.

## If build hangs at "computing gzip size"

This repo disables that step in `vite.config.ts` (`reportCompressedSize: false`) so Cloudflare builds finish faster.

## After saving settings

1. **Deployments** → **Retry deployment**
2. Wait for **Success**
3. Click **Visit site**

## Local test

```bash
npm install
npm run build
npm run preview
```

## Edit content

`src/data/siteConfig.ts`
