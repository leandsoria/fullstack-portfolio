'use client';

// Ported 1:1 from Fullstack portfolio/shared.jsx with ESM surgery only.
// - 'use client' directive added (hooks run in the browser).
// - 'import * as React' keeps the original React.useState/React.Fragment calls untouched.
// - trailing Object.assign(window, ...) replaced by ESM exports on each declaration.

/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import * as React from 'react';
// Shared data + hooks for all three portfolio variations.
// Leandro Soria: Web Engineer for Marketing Teams
//
// Content source of truth: career-ops/output/portfolio-update-brief.md (2026-11-21).
// Every claim here must trace to the "Facts you can use" list in that brief.

export const PROFILE = {
  name: "Leandro Soria",
  role: "Web Engineer for Marketing Teams",
  tagline: "I own the web layer for US marketing teams",
  location: "Buenos Aires, AR · GMT-3, full US overlap",
  email: "hello@leandrosoria.dev",
  yearsExperience: 6,
  sitesShipped: 100,
  teamSize: 15,
  // Public availability line (neutral version, approved by Leandro).
  availability: "Currently at Marketwake. Happy to talk.",
};

export const CREDENTIALS = [
  { label: "Years shipping",        value: "6",             meta: "Web for US teams" },
  { label: "Sites launched",        value: "100+",          meta: "Luxury Presence + Marketwake" },
  { label: "Devs led",              value: "15",            meta: "Luxury Presence" },
  { label: "RealTrends 2022",       value: "Best Design",   meta: "Fuller Group" },
  { label: "HubSpot",               value: "Certified",     meta: "Implementation for Partners" },
];

export const WORK = [
  {
    id: "cloyes",
    index: "01",
    client: "Cloyes",
    title: "A Webflow site and a catalog app on one domain",
    summary: "Full rebuild for an automotive timing parts manufacturer. A Webflow marketing site in English and Spanish, plus a Webflow Cloud app in Next.js on Cloudflare Workers for the parts catalog, with live search by make, model, year, engine and category. I designed the search and data model (Cloudflare D1, R2 and Cloudflare Images), directed the pipeline that normalizes the client's catalog exports, and ran the launch: redirect map from the old WordPress site, technical SEO, consent and CRM forms. Claude Code wrote most of the code; I owned the architecture, review, QA and delivery.",
    year: "2026",
    role: "Primary developer",
    agency: "Marketwake",
    url: "cloyes.com",
    stack: ["Webflow", "Webflow Cloud", "Cloudflare", "Claude Code"],
    category: "Automotive parts",
    metric: "Live since Nov 2026, English and Spanish on one domain",
    swatch: "linear-gradient(135deg,#1c1a16 0%,#3a3226 50%,#8a6f45 100%)",
    featured: true,
  },
  {
    id: "arovy",
    index: "02",
    client: "Arovy",
    title: "SaaS marketing site on HubSpot CMS",
    summary: "Campaign-ready HubSpot CMS theme built from scratch in HubL, with custom modules the marketing team uses to launch pages on its own",
    year: "2025",
    role: "HubSpot developer",
    agency: "Marketwake",
    url: "arovy.com",
    stack: ["HubSpot CMS", "HubL"],
    category: "SaaS",
    metric: "Marketing launches pages without a developer",
    swatch: "linear-gradient(135deg,#1e2420 0%,#2d3a30 50%,#6a8070 100%)",
  },
  {
    id: "impact",
    index: "03",
    client: "Impact Analytics",
    title: "A Webflow site the marketing team runs",
    summary: "Webflow site with modular, CMS-driven sections the marketing team edits on its own: complex CMS collections, Logic, custom code and localization",
    year: "2025",
    role: "Webflow developer",
    agency: "Marketwake",
    url: "impactanalytics.ai",
    stack: ["Webflow", "Webflow CMS", "Figma"],
    category: "B2B SaaS",
    metric: "Marketing edits the site on its own",
    swatch: "linear-gradient(135deg,#1a1d28 0%,#2a3349 50%,#5b6a8f 100%)",
  },
  {
    id: "sayers",
    index: "04",
    client: "Sayers",
    title: "Corporate technology site on WordPress",
    summary: "Corporate site built on WordPress with Breakdance, with custom PHP, ACF field groups and a performance pass before launch",
    year: "2025",
    role: "WordPress developer",
    agency: "Marketwake",
    url: "sayers.com",
    stack: ["WordPress", "Breakdance", "ACF", "PHP"],
    category: "Corporate technology",
    metric: "Launched with a 90+ PageSpeed target",
    swatch: "linear-gradient(135deg,#241a1a 0%,#3d2a2a 50%,#7a5656 100%)",
  },
  {
    id: "fuller",
    index: "05",
    client: "Fuller Group",
    title: "Luxury real estate site, built solo",
    summary: "Developed the site on my own at Luxury Presence. Selected among RealTrends Best Website Designs 2022",
    year: "2022",
    role: "Front-end developer",
    agency: "Luxury Presence",
    url: "thefullerproperties.com",
    stack: ["HTML", "CSS / SCSS", "JavaScript"],
    category: "Luxury real estate",
    award: "RealTrends Best Website Designs 2022",
    metric: "★ RealTrends Best Website Designs 2022",
    swatch: "linear-gradient(135deg,#2a2420 0%,#4a3f35 45%,#8a7862 100%)",
  },
];

// Expanded catalogue, grouped by agency, shown in a list view below flagship cards.
// Luxury Presence entries carry no framework tags: the stack behind them is not confirmed.
const LP = ["Luxury Presence platform"];
export const WORK_INDEX = [
  // Luxury Presence, real estate
  { client: "Fuller Group",           url: "thefullerproperties.com",    year: "2022", agency: "Luxury Presence", stack: LP, note: "RealTrends Best Design '22" },
  { client: "Patricia Greene Isen",   url: "patriciagreeneisen.com",     year: "2023", agency: "Luxury Presence", stack: LP },
  { client: "The Alliance Group",     url: "alliancegrouphomes.com",     year: "2023", agency: "Luxury Presence", stack: LP },
  { client: "Terra Shoaf",            url: "terrashoaf.com",             year: "2023", agency: "Luxury Presence", stack: LP },
  { client: "Stephanie Renteria",     url: "stephanierenteria.com",      year: "2023", agency: "Luxury Presence", stack: LP },
  { client: "David Thayer",           url: "thayercoastalhomes.com",     year: "2023", agency: "Luxury Presence", stack: LP },
  { client: "Tim Singer",             url: "timsinger.com",              year: "2023", agency: "Luxury Presence", stack: LP },

  // Marketwake, B2B, SaaS, e-com
  { client: "Cloyes",                 url: "cloyes.com",                 year: "2026", agency: "Marketwake", stack: ["Webflow", "Webflow Cloud"] },
  { client: "Impact Analytics",       url: "impactanalytics.ai",         year: "2025", agency: "Marketwake", stack: ["Webflow"] },
  { client: "Sayers",                 url: "sayers.com",                 year: "2025", agency: "Marketwake", stack: ["WordPress", "Breakdance"] },
  { client: "Stratascale",            url: "stratascale.com",            year: "2024", agency: "Marketwake", stack: ["WordPress", "Breakdance"] },
  { client: "RightPath",              url: "rightpath.com",              year: "2024", agency: "Marketwake", stack: ["WordPress", "Breakdance"] },
  { client: "Sylvan",                 url: "sylvan-inc.com",             year: "2026", agency: "Marketwake", stack: ["WordPress", "Elementor"] },
  { client: "Arovy",                  url: "arovy.com",                  year: "2025", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "Katalon",                url: "katalon.com",                year: "2025", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "T-Lake",                 url: "tlake.com",                  year: "2025", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "Ripple IT",              url: "rippleit.com",               year: "2023", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "Signature Aviation",     url: "signatureaviation.com",      year: "ongoing", agency: "Marketwake", stack: ["HubSpot", "Tailwind CSS"] },
  { client: "Crunchafi",              url: "crunchafi.com",              year: "ongoing", agency: "Marketwake", stack: ["HubSpot"] },
  { client: "BIP Wealth",             url: "bipwealth.com",              year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Infinity Transport",     url: "infinitytransport.com",      year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Georgia Chamber",        url: "gachamber.com",              year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Xcelerate Networks",     url: "xceleratenetworks.com",      year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Tavezio",                url: "tavezio.com",                year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "Punchlist",              url: "punchlist.com",              year: "2023", agency: "Marketwake", stack: ["WordPress", "Oxygen"] },
  { client: "RAS Systems",            url: "ras-systems.com",            year: "2023", agency: "Marketwake", stack: ["WordPress", "WPBakery"] },
  { client: "5Q Partners",            url: "5qpartners.com",             year: "2024", agency: "Marketwake", stack: ["Webflow"] },
  { client: "100 Coconuts",           url: "100coconuts.com",            year: "2024", agency: "Marketwake", stack: ["Shopify"] },
  { client: "Penley Art",             url: "penleyartco.com",            year: "2024", agency: "Marketwake", stack: ["Shopify"] },
  { client: "CUCU Store",             url: "drinkcucu.com",              year: "2025", agency: "Marketwake", stack: ["Shopify"] },
];

export const SERVICES = [
  {
    n: "01",
    title: "Marketing sites, end to end",
    body: "Figma to production on WordPress, Webflow, HubSpot CMS or Shopify, with CMS structures your marketing team edits on its own.",
    deliverables: ["Figma to build", "CMS modeling", "Custom themes", "Launch"],
  },
  {
    n: "02",
    title: "Web operations",
    body: "Hosting, DNS, Cloudflare, security headers, backups, monitoring and incident response. Migrations between CMS and hosts that keep your SEO.",
    deliverables: ["Migrations", "Cloudflare", "Security headers", "Incidents"],
  },
  {
    n: "03",
    title: "Tracking and integrations",
    body: "GA4 and Google Tag Manager events and conversions, consent-gated analytics, and forms connected to HubSpot, ActiveCampaign or Mailchimp through Zapier, Make and n8n.",
    deliverables: ["GA4", "GTM", "Consent", "CRM forms"],
  },
  {
    n: "04",
    title: "AI-first delivery",
    body: "Claude Code with custom skills, MCP-connected tools and written specs, so builds move faster while I own architecture, review and QA.",
    deliverables: ["Claude Code", "Custom skills", "MCP", "QA"],
  },
];

export const STACK = [
  {
    cat: "Platforms",
    items: ["WordPress", "Webflow + Webflow Cloud", "HubSpot CMS", "Shopify", "Framer"],
  },
  {
    cat: "Front end",
    items: ["HTML", "CSS / SCSS", "Tailwind CSS", "JavaScript (ES6+)", "PHP for WordPress", "Twig", "HubL", "Liquid", "GSAP"],
  },
  {
    cat: "WordPress",
    items: ["Custom themes and plugins", "ACF", "Custom post types", "WooCommerce", "Breakdance", "Oxygen", "Elementor"],
  },
  {
    cat: "Infrastructure",
    items: ["Cloudflare: DNS, SSL, Workers", "Cloudflare Images and R2", "Security headers", "WP Engine", "Kinsta", "Cloudways", "SiteGround", "Pantheon", "Git"],
  },
  {
    cat: "Analytics and integrations",
    items: ["GA4", "Google Tag Manager", "Hotjar", "Algolia", "HubSpot", "ActiveCampaign", "Mailchimp", "Zapier", "Make", "n8n"],
  },
  {
    cat: "AI",
    items: ["Claude Code (custom skills)", "Claude Cowork", "MCP", "ChatGPT", "Qwen", "Ollama", "ComfyUI"],
  },
];

export const STACK_NOTE = "Next.js, React and Cloudflare Workers through the cloyes.com build with Claude Code";

// Approved referee quotes, verbatim. All from the Luxury Presence team-lead period (2023).
export const TESTIMONIALS = [
  {
    quote: "Leandro is an amazing frontend developer and team leader who is always there for his team and provides excellent support. He is very organized and has a great attitude",
    name: "Melisa Brandao",
    role: "Frontend Developer & WordPress Specialist",
  },
  {
    quote: "Leandro was a wonderful leader, teacher, and a good person. He is always looking to help the team get better",
    name: "Sebastián Fontana",
    role: "Former teammate",
  },
  {
    quote: "he has great development skills and also a lot of patience to help, teach and manage a team",
    name: "Daniela Mastandrea",
    role: "Web Builder, Launch Team, Luxury Presence",
  },
];

// Writing section removed until a real post exists. Kept as an empty list so the
// legacy V3 variant (TerminalVariant) still compiles.
export const WRITING = [];

export const NAV = [
  { id: "hero", label: "Index" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "stack", label: "Stack" },
  { id: "testimonials", label: "Quotes" },
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

// Custom cursor — follows the mouse via viewport-relative coords.
// The dot is position:fixed so it stays pinned to the viewport (not the
// scrollable shell) — this avoids two bugs: (1) translating the dot
// toward the left edge inside an `overflow:auto` container generated
// horizontal scrollbars; (2) inside a container that Lenis scrolls
// internally the dot drifted out of sync with the mouse while scrolling.
export function ScopedCursor({ containerRef, color = "currentColor", size = 14 }) {
  const dotRef = React.useRef(null);
  const [hovering, setHovering] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
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
      className={`term-cursor${visible ? " is-visible" : ""}${hovering ? " is-hovering" : ""}`}
      style={{
        ['--cursor-color' as any]: color,
        width: hovering ? size * 3 : size,
        height: hovering ? size * 3 : size,
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
    <div className="term-scroll-progress" style={{ height: thickness }}>
      <div
        className="term-scroll-progress__bar"
        style={{ width: `${p * 100}%`, background: color }}
      />
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
