# Fullstack Portfolio — Leandro Soria

Terminal-variant portfolio, ported 1:1 from the React prototype to Next.js 15.

Live: https://leandrosoria.dev

## Stack

- **Next.js 15** App Router + **React 19** + TypeScript
- **Lenis** smooth-scroll (`lenis` npm)
- Self-hosted **Inter** + **JetBrains Mono** (woff2, latin + latin-ext)
- Zero UI libraries — all styling is inline in the JSX (as in the source artifact)

## Project structure

```
fullstack-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Metadata, fonts, JSON-LD (Server Component)
│   │   ├── page.tsx              # Dynamically imports the Terminal (ssr:false) — it's client-only
│   │   ├── globals.css           # Baseline reset + root-host + reduced-motion
│   │   ├── robots.ts             # /robots.txt
│   │   ├── sitemap.ts            # /sitemap.xml
│   │   ├── opengraph-image.tsx   # /opengraph-image (1200×630 edge)
│   │   └── icon.tsx              # Favicon (edge)
│   ├── components/
│   │   ├── TerminalVariant.tsx   # 1:1 port of variant-terminal.jsx (V3 desktop)
│   │   └── TerminalPlus.tsx      # 1:1 port of variant-terminal-plus.jsx (V3.1 desktop + mobile)
│   └── lib/
│       └── shared.tsx            # Data + hooks + ScopedCursor/ScrollProgress/Placeholder
├── public/
│   ├── fonts/                    # woff2 self-hosted
│   └── work/                     # case-study images (unikorns-agency.webp)
└── next.config.ts                # typescript.ignoreBuildErrors (see below)
```

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # serve production build
npm run typecheck    # standalone tsc check
```

## Architecture notes

**Why `'use client'` on `page.tsx`**
The Terminal is a fully-interactive, viewport-aware experience — Lenis smooth-scroll is bound
to an internal container, a scoped custom cursor follows the mouse within that container,
IntersectionObservers drive reveals and scroll-spy. Everything touches `window` from the first
render. Trying to SSR it gives you a white flash while React rehydrates everything anyway.

The trade-off: the `<body>` bootstraps empty and the Terminal renders client-side.
**The `<head>` still server-renders** from `layout.tsx`, so crawlers get the full metadata
graph (title, description, OG, Twitter, JSON-LD Person + WebSite). Modern crawlers (Google,
Bing) execute JS and index the rendered content — that's the whole point of `dangerouslyAllowSSR`
not being a requirement in 2026.

**Why `typescript.ignoreBuildErrors: true`**
The two Terminal components are a verbatim JSX-to-TSX port from untyped source. TS's ref-type
narrowing and implicit-any complaints are noise here — the code was already running in the
original React app. The editor still type-checks everything else; this setting only affects
`next build`. If you want strict types you'd have to annotate ~200 JSX refs by hand, which
defeats the point of keeping the port literal.

**Why `next/dynamic({ ssr: false })` instead of importing the component directly**
`lenis` touches `window` at module scope. A static import inside a Server Component (even with
`'use client'` on the child) evaluates the dep on the server during prerender and crashes.
Dynamic import defers the module load until the client.

## Deploy to Vercel

```bash
npx vercel                 # first time — links the repo
git push                   # then every push auto-deploys
```

`SITE_URL` is set to `https://leandrosoria.dev` in `src/app/layout.tsx`, `src/app/robots.ts`,
and `src/app/sitemap.ts`. Change it if deploying under a different domain.

## Credit

Source: variant-terminal.jsx + variant-terminal-plus.jsx + shared.jsx (the three `.jsx` files
in the original artifact). The port is intentionally literal: same component shapes, same inline
styles, same animations. What changed is only the thin Next.js + ESM wrapper around them.
