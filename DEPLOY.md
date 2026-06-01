# Cloudflare Pages Deployment

## Quick deploy (drag & drop)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. Upload the entire `portfolio` folder (index.html, css/, js/, assets/)
3. Your site will be live at `https://your-project.pages.dev`

## Deploy via Git (recommended)

1. Push this folder to GitHub
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Connect to Git**
3. Select your repo
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (root)

## Custom domain

In Cloudflare Pages project → **Custom domains** → add your domain (e.g. `ahtashamaslam.com`)

## Google Calendar booking (meetings)

1. Open [Google Calendar](https://calendar.google.com) → **Create** → **Appointment schedule**
2. Name: `Free 15-Min Consultation`, Duration: **15 min**
3. **Location:** Google Meet (add video conferencing)
4. Set your available hours
5. Copy the **booking page** link
6. Paste in `js/config.js` → `googleBookingUrl: 'YOUR_LINK_HERE'`

Clients pick date/time on your site; they get **email + Google Meet link** automatically. Meetings no longer use WhatsApp.

## Update video reviews

In `index.html`, find `data-video-id="YOUR_VIDEO_ID"` and replace with your YouTube video ID.

Example: `https://www.youtube.com/watch?v=abc123xyz` → use `abc123xyz`
