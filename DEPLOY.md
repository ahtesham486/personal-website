# Cloudflare Pages Deployment (Fast)

## Build settings

| Setting | Value |
|--------|--------|
| Framework preset | **Vite** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | **20** |

## Performance notes

- 3D model loads directly from `/models/character.glb` (no decrypt delay)
- TechStack physics loads only when you scroll near that section
- Static assets cached via `public/_headers`
- Chunks split: three.js, gsap, react-three load separately

## Local dev

```bash
npm install
npm run dev
```

## Edit content

`src/data/siteConfig.ts`
