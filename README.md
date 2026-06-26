# Aarka Imports — Next.js

## Stack
- **Next.js 14** (App Router, TypeScript)
- **React Three Fiber** — WebGL background particles + 3D rose
- **@react-three/postprocessing** — Bloom + Chromatic Aberration
- **GSAP** — hero text animations + scroll triggers
- **Lenis** — physics-based smooth scroll
- **Tailwind CSS** — utility styling

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

```bash
# Option 1: CLI
npm i -g vercel
vercel deploy

# Option 2: Push to GitHub, connect repo at vercel.com
```

## Project structure

```
aarka-next/
├── app/
│   ├── layout.tsx       # Root layout — fonts, global components
│   ├── page.tsx         # Home page (assembles sections)
│   └── globals.css      # CSS variables + global styles
├── components/
│   ├── BackgroundScene  # R3F canvas — 7000 particles + 40 falling petals
│   │                    # + bloom + chromatic aberration post-processing
│   ├── RoseCanvas       # Separate R3F canvas — 3D rose (About section)
│   ├── SmoothScroll     # Lenis setup + GSAP ScrollTrigger integration
│   ├── Loader           # Animated loading screen
│   ├── Cursor           # Custom cursor + petal trail
│   ├── Nav              # Fixed navigation with mobile menu
│   ├── Hero             # GSAP text mask entrance animation
│   ├── About            # Stats + 3D rose (bloom triggers on scroll)
│   ├── Products         # Product cards with 3D tilt
│   ├── WhyUs            # Feature grid
│   ├── Contact          # Form + company info
│   └── Footer
└── lib/
    └── scrollStore.ts   # Shared scroll state (no re-renders)
```

## How the 3D works

The background WebGL canvas is `position: fixed` behind everything.
Scroll progress from Lenis → `scrollStore` → `useFrame` in R3F.
Camera flies forward as you scroll, particles drift, petals fall.
Post-processing adds cinematic bloom glow and chromatic aberration.

The rose in the About section is a separate Canvas that activates
(petals bloom open) when the section enters the viewport.
