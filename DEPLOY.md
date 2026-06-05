# Cloudflare Pages Deployment (React + Vite)

## Build settings (Git deploy)

1. Cloudflare Dashboard → **Workers & Pages** → your project → **Settings** → **Build**
2. Configure:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 18 or 20

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Edit your info

Update `src/data/siteConfig.ts` for:
- Name, email, WhatsApp
- Google Calendar booking links
- Projects, career, about text

## Google Calendar booking (Safari fix)

- `googleBookingUrl` — short link for "open in new tab"
- `googleBookingEmbedUrl` — full `calendar.google.com/.../schedules/...` URL for iframe embed

## Custom domain

Cloudflare Pages project → **Custom domains** → add your domain
