# How to add a new blog post

Blog posts live in **`content/blog/`** as Markdown files.  
Push to GitHub → Cloudflare rebuilds → new post goes live.

## Step 1 — Create a file

Create `content/blog/your-post-slug.md`

The **filename** becomes the URL:  
`your-post-slug.md` → `https://ahtasham.site/blog/your-post-slug`

## Step 2 — Add frontmatter

```md
---
title: "Your Post Title"
description: "Short summary for Google and social previews (150–160 chars)."
date: "2026-06-10"
tags: ["Python", "SEO", "Automation"]
cover: "/images/work-python-api.webp"
---

Your article content here in **Markdown**.

## Use headings

- Bullet lists work
- Links work: [Contact](/#contact)
```

## Step 3 — Push to GitHub

```bash
git add content/blog/your-post-slug.md
git commit -m "Add blog post: Your Post Title"
git push origin main
```

Cloudflare auto-deploys in ~2–3 minutes.

## Tips for SEO / AEO / GEO

- Write a clear **title** and **description**
- Use **H2** headings for sections
- Add **tags** relevant to the topic
- Link to your **work pages** and **contact**
- One post = one main topic (better for AI search)

## Images

Put images in `public/images/` and reference as `/images/your-image.webp`.

Convert JPEG → WebP for faster loading (use [squoosh.app](https://squoosh.app)).
