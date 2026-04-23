'use client';

// Ported 1:1 from Fullstack portfolio/shared.jsx with ESM surgery only.
// - 'use client' directive added (hooks run in the browser).
// - 'import * as React' keeps the original React.useState/React.Fragment calls untouched.
// - trailing Object.assign(window, ...) replaced by ESM exports on each declaration.

/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import * as React from 'react';
// Shared data + hooks for all three portfolio variations.
// Leandro Soria — Senior Front-End Engineer & CMS Architect

export const PROFILE = {
  name: "Leandro Soria",
  role: "Senior Front-End Engineer & CMS Architect",
  tagline: "Building production websites for international brands",
  location: "Buenos Aires, AR · Working globally",
  email: "hello@leandrosoria.com",
  yearsExperience: 5,
  sitesShipped: 100,
  teamSize: 15,
};

export const CREDENTIALS = [
  { label: "Years shipping",        value: "5+",            meta: "Front-end & CMS" },
  { label: "Production sites",      value: "100+",          meta: "Live, maintained" },
  { label: "Team Lead",             value: "15 devs",       meta: "Luxury Presence" },
  { label: "RealTrends 2022",       value: "Best Design",   meta: "Fuller Group" },
  { label: "HubSpot CMS",           value: "Certified",     meta: "Implementation Partner" },
];

export const WORK = [
  {
    id: "fuller",
    index: "01",
    client: "Fuller Group",
    title: "A flagship site for top-producing luxury real estate",
    summary: "Rebuilt the digital presence of a Chicago-area luxury brokerage. Focus on narrative pacing, typography, and a content system the team could actually operate.",
    year: "2022",
    role: "Lead Engineer",
    agency: "Luxury Presence",
    url: "thefullerproperties.com",
    stack: ["Next.js", "Sanity", "GSAP"],
    category: "Luxury Real Estate",
    award: "RealTrends — Best Website Design 2022",
    metric: "RealTrends Best Design 2022",
    swatch: "linear-gradient(135deg,#2a2420 0%,#4a3f35 45%,#8a7862 100%)",
    featured: true,
  },
  {
    id: "greene-isen",
    index: "02",
    client: "Patricia Greene Isen",
    title: "Multi-market luxury brokerage, one editorial voice",
    summary: "Unified presence across LA and Aspen markets without diluting either. Modular listing system, editorial templates, custom search.",
    year: "2023",
    role: "Architect & Lead",
    agency: "Luxury Presence",
    url: "patriciagreeneisen.com",
    stack: ["Next.js", "Sanity", "Algolia"],
    category: "Luxury Real Estate",
    metric: "Two markets, one system",
    swatch: "linear-gradient(135deg,#1a2420 0%,#2d3a34 50%,#607065 100%)",
  },
  {
    id: "impact",
    index: "03",
    client: "Impact Analytics",
    title: "Marketing platform for an enterprise AI company",
    summary: "Translated a complex B2B AI product into a clear marketing story. Webflow CMS architected for non-technical marketers to ship weekly.",
    year: "2024",
    role: "Front-end Lead",
    agency: "Marketwake",
    url: "impactanalytics.co",
    stack: ["Webflow", "JS", "Figma"],
    category: "B2B SaaS · AI",
    metric: "Marketing ships weekly",
    swatch: "linear-gradient(135deg,#1a1d28 0%,#2a3349 50%,#5b6a8f 100%)",
  },
  {
    id: "sayers",
    index: "04",
    client: "Sayers",
    title: "Corporate technology consultancy, on WordPress",
    summary: "Enterprise IT consultancy site rebuilt on WordPress + Breakdance. Performance budget held under strict CMS constraints; editors ship without dev involvement.",
    year: "2024",
    role: "CMS Architect",
    agency: "Marketwake",
    url: "sayers.com",
    stack: ["WordPress", "Breakdance", "ACF"],
    category: "Corporate Technology",
    metric: "Editors ship independently",
    swatch: "linear-gradient(135deg,#241a1a 0%,#3d2a2a 50%,#7a5656 100%)",
  },
  {
    id: "arovy",
    index: "05",
    client: "Arovy",
    title: "SaaS marketing presence on HubSpot CMS",
    summary: "Full HubSpot CMS build: design system, modular templates, marketing ops integrated from day one. Growth team runs experiments without waiting.",
    year: "2025",
    role: "HubSpot Architect",
    agency: "Marketwake",
    url: "arovy.com",
    stack: ["HubSpot", "HubL", "TS"],
    category: "SaaS Marketing",
    metric: "Growth runs experiments unblocked",
    swatch: "linear-gradient(135deg,#1e2420 0%,#2d3a30 50%,#6a8070 100%)",
  },
];

// Expanded catalogue — grouped by agency, shown in a list view below flagship cards
export const WORK_INDEX = [
  // Luxury Presence — real estate
  { client: "Fuller Group",           url: "thefullerproperties.com",    year: "2022", agency: "Luxury Presence", stack: ["Next.js"],    note: "RealTrends Best Design '22" },
  { client: "Patricia Greene Isen",   url: "patriciagreeneisen.com",     year: "2023", agency: "Luxury Presence", stack: ["Next.js"] },
  { client: "The Alliance Group",     url: "alliancegrouphomes.com",     year: "2023", agency: "Luxury Presence", stack: ["Next.js"] },
  { client: "Terra Shoaf",            url: "terrashoaf.com",             year: "2023", agency: "Luxury Presence", stack: ["Next.js"] },
  { client: "Stephanie Renteria",     url: "stephanierenteria.com",      year: "2023", agency: "Luxury Presence", stack: ["Next.js"] },
  { client: "David Thayer",           url: "thayercoastalhomes.com",     year: "2024", agency: "Luxury Presence", stack: ["Next.js"] },
  { client: "Tim Singer",             url: "timsinger.com",              year: "2024", agency: "Luxury Presence", stack: ["Next.js"] },

  // Marketwake — B2B, SaaS, e-com
  { client: "Impact Analytics",       url: "impactanalytics.co",         year: "2024", agency: "Marketwake", stack: ["Webflow"] },
  { client: "Sayers",                 url: "sayers.com",                 year: "2024", agency: "Marketwake", stack: ["WordPress", "Breakdance"] },
  { client: "Stratascale",            url: "stratascale.com",            year: "2024", agency: "Marketwake", stack: ["WordPress", "Breakdance"] },
  { client: "RightPath",              url: "rightpath.com",              year: "2024", agency: "Marketwake", stack: ["WordPress", "Breakdance"] },
  { client: "Arovy",                  url: "arovy.com",                  year: "2025", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "Katalon",                url: "katalon.com",                year: "2025", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "T-Lake",                 url: "tlake.com",                  year: "2025", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "Ripple IT",              url: "rippleit.com",               year: "2023", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "BIP Wealth",             url: "bipwealth.com",              year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Infinity Transport",     url: "infinitytransport.com",      year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Georgia Chamber",        url: "gachamber.com",              year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Xcelerate Networks",     url: "xceleratenetworks.com",      year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Tavezio",                url: "tavezio.com",                year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Punchlist",              url: "punchlist.com",              year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Ras Systems",            url: "ras-systems.com",            year: "2023", agency: "Marketwake", stack: ["WordPress", "Bakery"] },
  { client: "Marketwake",             url: "marketwake.com",             year: "2024", agency: "Marketwake", stack: ["WordPress", "Greenshift"] },
  { client: "5Q Partners",            url: "5qpartners.com",             year: "2024", agency: "Marketwake", stack: ["WordPress"] },
  { client: "100 Coconuts",           url: "100coconuts.com",            year: "2024", agency: "Marketwake", stack: ["Shopify"] },
  { client: "Penley Art",             url: "penleyartco.com",            year: "2024", agency: "Marketwake", stack: ["Shopify"] },
  { client: "CUCU Store",             url: "drinkcucu.com",              year: "2025", agency: "Marketwake", stack: ["Shopify"] },
];

export const SERVICES = [
  {
    n: "01",
    title: "Marketing Site Architecture",
    body: "End-to-end build of a marketing site your team can actually operate. Information architecture, design system, CMS modeling, front-end engineering, launch.",
    deliverables: ["Design system", "CMS schema", "Production build", "Team handoff"],
  },
  {
    n: "02",
    title: "CMS Implementation",
    body: "HubSpot, Webflow, WordPress, or Sanity — modeled for how your team works, not how the platform wants you to work. Editors ship without engineering in the loop.",
    deliverables: ["Content modeling", "Template system", "Editor training", "Ops integration"],
  },
  {
    n: "03",
    title: "Front-End Rebuilds",
    body: "Performance, accessibility, and maintainability retrofitted onto sites that have outgrown their original build. Minimal disruption, measurable outcome.",
    deliverables: ["Audit", "Migration plan", "Phased build", "Core Web Vitals"],
  },
  {
    n: "04",
    title: "Fractional Engineering Lead",
    body: "Embedded leadership for in-house teams. Code review, architectural direction, hiring support, process design — with five years of shipping at the other end of it.",
    deliverables: ["Architecture review", "Mentoring", "Process", "Hiring"],
  },
];

export const STACK = [
  {
    cat: "Front-end",
    items: ["React", "Next.js", "TypeScript", "Astro", "Tailwind", "GSAP"],
  },
  {
    cat: "CMS",
    items: ["HubSpot CMS", "Webflow", "WordPress", "Sanity", "Contentful", "Breakdance"],
  },
  {
    cat: "Infrastructure",
    items: ["Vercel", "Netlify", "Cloudflare", "Algolia", "Stripe", "Sentry"],
  },
  {
    cat: "Practice",
    items: ["Design systems", "Performance", "Accessibility", "Team leadership", "Hiring", "Architecture"],
  },
];

export const WRITING = [
  { title: "The real cost of Webflow at scale", date: "Coming soon",  kind: "Essay" },
  { title: "Why HubSpot is an underrated front-end platform", date: "Coming soon", kind: "Essay" },
  { title: "Leading a 15-person front-end team remotely", date: "Coming soon", kind: "Notes" },
];

export const NAV = [
  { id: "hero", label: "Index" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "stack", label: "Stack" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

// All unique stacks across work, for the filter chips
export const ALL_STACKS = Array.from(new Set(WORK.flatMap(w => w.stack))).sort();

// Theme hook — dark default, light optional.
//
// Besides tracking theme as React state (so the `c` palette object still
// works for the lingering inline styles), this hook writes the active
// theme to `<html data-theme="dark|light">`. Every CSS rule that reads
// `[data-theme='light']` (see src/styles/abstracts/_tokens.scss) flips
// without a React re-render.
//
// As the inline-styles-to-BEM migration progresses, components will drop
// their `c` references one by one; eventually `useTheme` only needs the
// DOM side-effect.
export function useTheme(initial = "dark") {
  const [theme, setTheme] = React.useState(initial);
  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);
  const toggle = () => setTheme(t => t === "dark" ? "light" : "dark");
  // `as const` makes TS infer the tuple shape [string, () => void, Dispatch]
  // instead of a union-element array, so consumers get the right type per slot.
  return [theme, toggle, setTheme] as const;
}

// IntersectionObserver based "has entered" boolean, for subtle fade-ups.
export function useInView(options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

// Scoped custom cursor — follows mouse within a container, not the whole page.
// Shows an outlined dot that scales on hoverable elements ([data-cursor]).
export function ScopedCursor({ containerRef, color = "currentColor", size = 14 }) {
  const dotRef = React.useRef(null);
  const [hovering, setHovering] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onMove = (e) => {
      const r = c.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%,-50%)`;
      }
      setVisible(true);
      const t = e.target.closest?.("[data-cursor]");
      setHovering(!!t);
    };
    const onLeave = () => setVisible(false);
    c.addEventListener("mousemove", onMove);
    c.addEventListener("mouseleave", onLeave);
    return () => {
      c.removeEventListener("mousemove", onMove);
      c.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef]);

  return (
    <div
      ref={dotRef}
      aria-hidden
      style={{
        position: "absolute",
        left: 0, top: 0,
        width: hovering ? size * 3 : size,
        height: hovering ? size * 3 : size,
        borderRadius: "50%",
        border: `1.25px solid ${color}`,
        background: hovering ? `${color}` : "transparent",
        mixBlendMode: "difference",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "width .22s cubic-bezier(.2,.8,.2,1), height .22s cubic-bezier(.2,.8,.2,1), background .18s, opacity .15s",
        zIndex: 999,
      }}
    />
  );
}

// Tiny reusable scroll-progress bar bound to a container's scroll.
export function ScrollProgress({ containerRef, color, thickness = 1 }) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const on = () => {
      const max = c.scrollHeight - c.clientHeight;
      setP(max > 0 ? c.scrollTop / max : 0);
    };
    on();
    c.addEventListener("scroll", on, { passive: true });
    return () => c.removeEventListener("scroll", on);
  }, [containerRef]);
  return (
    <div style={{
      position: "absolute", left: 0, top: 0, right: 0, height: thickness,
      background: "transparent", zIndex: 50, pointerEvents: "none",
    }}>
      <div style={{
        height: "100%", width: `${p * 100}%`, background: color, transition: "width .08s linear",
      }} />
    </div>
  );
}

// Editorial placeholder — subtly striped, monospace label, no generated imagery.
export function Placeholder({ label, tone = "dark", ratio = "16/10", radius = 4, style = {} }) {
  const isDark = tone === "dark";
  const stripeA = isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.04)";
  const stripeB = isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.015)";
  const border  = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const text    = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.5)";
  return (
    <div style={{
      aspectRatio: ratio,
      width: "100%",
      borderRadius: radius,
      border: `1px solid ${border}`,
      background: `repeating-linear-gradient(135deg, ${stripeA} 0 8px, ${stripeB} 8px 16px)`,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "ui-monospace, 'SF Mono', 'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        color: text,
      }}>
        <span>{label}</span>
      </div>
      <div style={{
        position: "absolute", top: 10, left: 10,
        width: 8, height: 8, border: `1px solid ${text}`,
      }} />
      <div style={{
        position: "absolute", top: 10, right: 10,
        width: 8, height: 8, border: `1px solid ${text}`,
      }} />
      <div style={{
        position: "absolute", bottom: 10, left: 10,
        width: 8, height: 8, border: `1px solid ${text}`,
      }} />
      <div style={{
        position: "absolute", bottom: 10, right: 10,
        width: 8, height: 8, border: `1px solid ${text}`,
      }} />
    </div>
  );
}
