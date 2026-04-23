'use client';
// Ported 1:1 from Fullstack portfolio/variant-terminal.jsx with ESM surgery only.
// - 'use client' directive added.
// - 'import * as React' preserves every React.useState/React.Fragment call unchanged.
// - Shared data + hooks imported from @/lib/shared (originally on window).
// - 'window.Lenis' replaced by the 'lenis' npm package (functionally identical).
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/rules-of-hooks */
// @ts-nocheck
import * as React from 'react';
import Lenis from 'lenis';
import { PROFILE, CREDENTIALS, WORK, WORK_INDEX, SERVICES, STACK, WRITING, NAV, ALL_STACKS, useTheme, useInView, ScopedCursor, ScrollProgress, Placeholder } from '@/lib/shared';

// Variant 3 — The Terminal
// Linear-adjacent. Denser, more system-feeling, monospace tags,
// cmd-K style affordances, subtle grid lines.
// Display: Inter Display (via Inter with tight letter-spacing + tabular numerals).
// Body: Inter. Mono: JetBrains Mono.
// Accent treatment still bone/off-white to keep palette consistent.

const termStyles = {
  fontDisplay: "'Inter', -apple-system, sans-serif",
  fontBody:    "'Inter', -apple-system, sans-serif",
  fontMono:    "'JetBrains Mono', ui-monospace, monospace",
};

function TerminalPalette(theme) {
  return theme === "dark"
    ? {
        bg: "#0b0b0d", bg2: "#0f0f12", fg: "#ece8dd", dim: "#807b72",
        line: "rgba(236,232,221,0.08)", lineStrong: "rgba(236,232,221,0.18)",
        panel: "rgba(236,232,221,0.03)", accent: "#ece8dd", kbdBg: "rgba(236,232,221,0.06)",
      }
    : {
        bg: "#f6f3ec", bg2: "#ece9e0", fg: "#14120d", dim: "#605b51",
        line: "rgba(20,18,13,0.10)", lineStrong: "rgba(20,18,13,0.22)",
        panel: "rgba(20,18,13,0.03)", accent: "#14120d", kbdBg: "rgba(20,18,13,0.06)",
      };
}

function TerminalVariant() {
  const [theme, toggleTheme] = useTheme("dark");
  const c = TerminalPalette(theme);
  const containerRef = React.useRef(null);
  const [active, setActive] = React.useState("hero");
  const [stackFilter, setStackFilter] = React.useState(null);
  const [cmdkOpen, setCmdkOpen] = React.useState(false);

  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const sections = root.querySelectorAll("[data-section]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.section); });
    }, { root, threshold: 0.35 });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lenis smooth scroll on the internal scrolling container
  const lenisRef = React.useRef(null);
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const lenis = new Lenis({
      wrapper: root,
      content: root.firstElementChild ? root : root,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.3,
    });
    lenisRef.current = lenis;
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); lenisRef.current = null; };
  }, []);

  const scrollTo = (id) => {
    const root = containerRef.current;
    const target = root?.querySelector(`[data-section="${id}"]`);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target.offsetTop - 8, { duration: 1.2 });
    } else {
      root.scrollTo({ top: target.offsetTop - 8, behavior: "smooth" });
    }
  };

  const filtered = stackFilter ? WORK.filter(w => w.stack.includes(stackFilter)) : WORK;

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%", height: "100%",
        background: c.bg, color: c.fg,
        fontFamily: termStyles.fontBody,
        overflow: "auto",
        transition: "background .35s ease, color .35s ease",
        // subtle grid background
        backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
        backgroundPosition: "0 0, 0 0",
      }}
    >
      <ScrollProgress containerRef={containerRef} color={c.accent} thickness={1} />
      <ScopedCursor containerRef={containerRef} color={c.fg} size={10} />

      {/* Top chrome */}
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        background: c.bg,
        borderBottom: `1px solid ${c.line}`,
      }}>
        {/* Row 1: meta */}
        <div style={{
          padding: "10px 24px",
          borderBottom: `1px solid ${c.line}`,
        }}>
          <div className="container" style={{
            display: "grid", gridTemplateColumns: "1fr auto 1fr",
            fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
            alignItems: "center",
          }}>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: c.fg }}>leandrosoria.dev</span>
            <span>/ portfolio</span>
            <span>/ v03</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <kbd style={kbd(c)}>⌘</kbd>
            <kbd style={kbd(c)}>K</kbd>
            <span style={{ color: c.dim }}>to navigate</span>
          </div>
          <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", gap: 16 }}>
            <span>
              <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#7fd37f", marginRight: 8 }}/>
              available-q3-26
            </span>
            <button
              data-cursor
              onClick={toggleTheme}
              style={{
                all: "unset", cursor: "pointer",
                padding: "2px 8px", border: `1px solid ${c.line}`, borderRadius: 4,
              }}
            >{theme === "dark" ? "dark" : "light"}</button>
          </div>
          </div>
        </div>
        {/* Row 2: tabs */}
        <div style={{
          padding: "0 24px",
        }}>
          <div className="container" style={{
            display: "flex", gap: 0,
            fontFamily: termStyles.fontMono, fontSize: 12,
          }}>
          {NAV.map((n, i) => (
            <button
              key={n.id}
              data-cursor
              onClick={() => scrollTo(n.id)}
              style={{
                all: "unset", cursor: "pointer",
                padding: "12px 16px",
                color: active === n.id ? c.fg : c.dim,
                borderBottom: active === n.id ? `1px solid ${c.fg}` : "1px solid transparent",
                transition: "color .15s, border-color .15s",
                letterSpacing: "0.02em",
              }}
            >
              <span style={{ color: c.dim, marginRight: 8 }}>{String(i+1).padStart(2,"0")}</span>
              {n.label.toLowerCase()}
            </button>
          ))}
          <button
            data-cursor
            onClick={() => setCmdkOpen(true)}
            style={{
              all: "unset", cursor: "pointer", marginLeft: "auto",
              padding: "12px 16px", color: c.dim, display: "flex", alignItems: "center", gap: 8,
            }}
          >
            <span>⌘K</span>
            <span>search</span>
          </button>
          </div>
        </div>
      </header>

      <TermHero c={c} />
      <TermAbout c={c} />
      <TermWork c={c} filter={stackFilter} setFilter={setStackFilter} filtered={filtered} />
      <TermServices c={c} />
      <TermStack c={c} />
      <TermWriting c={c} />
      <TermContact c={c} />
      <TermFooter c={c} />

      {cmdkOpen && <CmdK c={c} onClose={() => setCmdkOpen(false)} scrollTo={scrollTo} setFilter={setStackFilter} />}
    </div>
  );
}

function kbd(c) {
  return {
    fontFamily: termStyles.fontMono, fontSize: 10,
    padding: "1px 6px", borderRadius: 3,
    background: c.kbdBg, color: c.fg,
    border: `1px solid ${c.line}`,
  };
}

function CmdK({ c, onClose, scrollTo, setFilter }) {
  const [q, setQ] = React.useState("");
  const items = [
    ...NAV.map(n => ({ type: "Go to", label: n.label, run: () => { scrollTo(n.id); onClose(); } })),
    ...ALL_STACKS.map(s => ({ type: "Filter", label: s, run: () => { setFilter(s); scrollTo("work"); onClose(); } })),
    { type: "Action", label: "Copy email", run: () => { navigator.clipboard?.writeText(PROFILE.email); onClose(); } },
  ];
  const filtered = q ? items.filter(i => i.label.toLowerCase().includes(q.toLowerCase())) : items;
  React.useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)", zIndex: 100,
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        paddingTop: "15vh",
      }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 560, maxWidth: "90vw", background: c.bg2,
          border: `1px solid ${c.lineStrong}`, borderRadius: 8,
          overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
        }}>
        <input
          autoFocus
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search sections, stacks, actions…"
          style={{
            width: "100%", padding: "16px 20px", background: "transparent",
            border: "none", outline: "none", color: c.fg, fontSize: 15,
            fontFamily: termStyles.fontBody,
            borderBottom: `1px solid ${c.line}`,
          }}
        />
        <div style={{ maxHeight: 320, overflowY: "auto", padding: "8px 0" }}>
          {filtered.map((it, i) => (
            <button
              key={i}
              onClick={it.run}
              style={{
                all: "unset", cursor: "pointer",
                display: "grid", gridTemplateColumns: "80px 1fr auto",
                padding: "10px 20px", width: "100%", boxSizing: "border-box",
                fontFamily: termStyles.fontMono, fontSize: 13,
                color: c.fg, alignItems: "center",
              }}
            >
              <span style={{ color: c.dim, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>{it.type}</span>
              <span>{it.label}</span>
              <span style={{ color: c.dim, fontSize: 10 }}>↵</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "20px", color: c.dim, fontSize: 13, textAlign: "center" }}>
              No matches
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── HERO
function AnimatedH1({ c }) {
  // Split into words for per-word reveal with blur + slide
  const lines = [
    ["Senior", "Front-End"],
    ["Engineer", "&", "CMS"],
    ["Architect."],
  ];
  let idx = 0;
  return (
    <h1 style={{
      fontFamily: termStyles.fontDisplay, fontWeight: 500,
      fontSize: "clamp(56px, 7.5vw, 128px)",
      lineHeight: 1.0, letterSpacing: "-0.035em",
      margin: 0, textWrap: "balance",
      fontFeatureSettings: "'ss01','cv11'",
    }}>
      <style>{`
        @keyframes h1WordIn {
          0%   { opacity: 0; transform: translateY(0.4em); filter: blur(14px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .term-h1-word {
          display: inline-block;
          opacity: 0;
          animation: h1WordIn 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          will-change: opacity, transform, filter;
        }
      `}</style>
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {line.map((w, wi) => {
            const delay = idx * 90;
            idx++;
            const isAmp = w === "&";
            return (
              <React.Fragment key={wi}>
                <span className="term-h1-word" style={{
                  animationDelay: `${delay}ms`,
                  color: isAmp ? c.dim : "inherit",
                }}>{w}</span>
                {wi < line.length - 1 && " "}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function TermHero({ c }) {
  return (
    <section data-section="hero" data-screen-label="01 Hero" style={{
      padding: "80px 24px 100px",
      borderBottom: `1px solid ${c.line}`,
      minHeight: "85vh",
    }}>
      <div className="container" style={{
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60,
        alignItems: "start",
      }}>
      <div>
        <div style={{
          fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
          letterSpacing: "0.04em", marginBottom: 32,
          display: "flex", gap: 12, alignItems: "center",
          opacity: 0, animation: "termFadeIn 500ms cubic-bezier(0.2,0.8,0.2,1) 100ms forwards",
        }}>
          <style>{`@keyframes termFadeIn { to { opacity: 1; } }`}</style>
          <span style={{
            padding: "3px 8px", borderRadius: 4, background: c.panel,
            border: `1px solid ${c.line}`, color: c.fg,
          }}>SENIOR</span>
          <span>/ contractor / team-lead</span>
        </div>
        <AnimatedH1 c={c} />
        <p style={{
          marginTop: 32, maxWidth: 520, fontSize: 17, lineHeight: 1.55, color: c.fg,
          opacity: 0, animation: "termFadeIn 700ms cubic-bezier(0.2,0.8,0.2,1) 900ms forwards",
        }}>
          Building production websites for international brands.
          Five years, a hundred-plus sites, and a standard that doesn't bend.
        </p>
        <div style={{
          marginTop: 32, display: "flex", gap: 12,
          opacity: 0, animation: "termFadeIn 600ms cubic-bezier(0.2,0.8,0.2,1) 1100ms forwards",
        }}>
          <button data-cursor style={{
            all: "unset", cursor: "pointer",
            padding: "10px 18px", background: c.fg, color: c.bg,
            borderRadius: 6, fontSize: 13, fontWeight: 500,
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            View selected work
            <span style={{ fontFamily: termStyles.fontMono, fontSize: 11, opacity: 0.6 }}>→</span>
          </button>
          <button data-cursor style={{
            all: "unset", cursor: "pointer",
            padding: "10px 18px", border: `1px solid ${c.lineStrong}`,
            borderRadius: 6, fontSize: 13,
            display: "inline-flex", alignItems: "center", gap: 8,
          }}>
            Book an intro call
          </button>
        </div>
      </div>

      {/* Right: system meta card */}
      <div style={{
        border: `1px solid ${c.line}`, borderRadius: 8, overflow: "hidden",
        background: c.panel, fontFamily: termStyles.fontMono, fontSize: 12,
        alignSelf: "start", marginTop: 60,
        opacity: 0, animation: "termFadeIn 500ms cubic-bezier(0.2,0.8,0.2,1) 600ms forwards",
      }}>
        <style>{`
          @keyframes termRowIn {
            0%   { opacity: 0; transform: translateX(-14px); filter: blur(4px); }
            100% { opacity: 1; transform: translateX(0); filter: blur(0); }
          }
          .term-sys-value {
            display: inline-block;
            opacity: 0;
            animation: termRowIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            will-change: opacity, transform, filter;
          }
        `}</style>
        <div style={{
          padding: "10px 14px", borderBottom: `1px solid ${c.line}`,
          display: "flex", justifyContent: "space-between",
          color: c.dim, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
        }}>
          <span>system / status</span>
          <span>· live</span>
        </div>
        <div style={{ padding: 8 }}>
          {[
            ["name",       PROFILE.name],
            ["role",       "Senior FE Engineer"],
            ["secondary",  "CMS Architect"],
            ["location",   "Buenos Aires, AR"],
            ["time_zone",  "GMT-3"],
            ["experience", "5+ years"],
            ["shipped",    "100+ sites"],
            ["leadership", "15 engineers @ Luxury Presence"],
            ["recognition","RealTrends Best Design 2022"],
            ["certified",  "HubSpot Implementation Partner"],
            ["status",     "available Q3 2026 · 2 slots"],
          ].map(([k, v], i) => (
            <div key={k} style={{
              display: "grid", gridTemplateColumns: "110px 1fr", gap: 12,
              padding: "6px 8px", borderRadius: 4,
            }}>
              <span style={{ color: c.dim }}>{k}</span>
              <span
                className="term-sys-value"
                style={{ color: c.fg, animationDelay: `${800 + i * 70}ms` }}
              >{v}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

// ── ABOUT
// Scroll-fill hook: as the element scrolls from bottom→top of viewport,
// returns progress 0→1 (pinned at 60% → 20% of viewport height for a comfortable "fill zone")
function useScrollProgressEl(ref, { start = 0.85, end = 0.25 } = {}) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Find the nearest scrolling ancestor (V3.1's outer container scrolls, not window)
    const scroller = getScrollParent(el);
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = scroller === window
        ? window.innerHeight
        : scroller.getBoundingClientRect().height;
      const scrollerTop = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      // Position of element top relative to scroller's viewport, normalized 0→1
      const relTop = (rect.top - scrollerTop) / vh;
      // relTop decreases as we scroll. Start (e.g. 0.85) → End (e.g. 0.25)
      const raw = (start - relTop) / (start - end);
      setP(Math.max(0, Math.min(1, raw)));
    };
    const target = scroller === window ? window : scroller;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, start, end]);
  return p;
}

function getScrollParent(el) {
  let node = el.parentElement;
  while (node) {
    const s = getComputedStyle(node);
    if (/(auto|scroll|overlay)/.test(s.overflow + s.overflowY)) return node;
    node = node.parentElement;
  }
  return window;
}

// Tracks vertical scroll position of the nearest scroll container relative to `ref`.
// Returns { centerOffset, direction } — centerOffset is element-center-minus-viewport-center normalized to 0..1,
// direction is +1 (scrolling down) or -1 (scrolling up), damped.
function useScrollTrack(ref) {
  const [state, setState] = React.useState({ offset: 0, dir: 1 });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const scroller = getScrollParent(el);
    let lastY = scroller === window ? window.scrollY : scroller.scrollTop;
    let dir = 1;
    const onScroll = () => {
      const y = scroller === window ? window.scrollY : scroller.scrollTop;
      if (y > lastY + 0.5) dir = 1;
      else if (y < lastY - 0.5) dir = -1;
      lastY = y;
      const rect = el.getBoundingClientRect();
      const vh = scroller === window
        ? window.innerHeight
        : scroller.getBoundingClientRect().height;
      const scrollerTop = scroller === window ? 0 : scroller.getBoundingClientRect().top;
      const elCenter = (rect.top + rect.height / 2) - scrollerTop;
      // Normalize: 0 when element center is at viewport top, 1 when at bottom
      const offset = elCenter / vh;
      setState({ offset, dir });
    };
    const target = scroller === window ? window : scroller;
    target.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      target.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
  return state;
}

// Animated count-up number. Extracts digits, animates from 0 → digits, preserves suffixes.
function CountUp({ value, active, duration = 1400 }) {
  const match = String(value).match(/^(\D*)(\d[\d,\.]*)(.*)$/);
  if (!match) return <>{value}</>;
  const [, prefix, numStr, suffix] = match;
  const target = parseFloat(numStr.replace(/,/g, ""));
  const [n, setN] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out quart
      const eased = 1 - Math.pow(1 - p, 4);
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  const display = Number.isInteger(target)
    ? Math.round(n).toString()
    : n.toFixed(numStr.includes(".") ? numStr.split(".")[1].length : 0);
  return <>{prefix}{display}{suffix}</>;
}

function TermAbout({ c }) {
  const [ref, inView] = useInView();
  const fillRef = React.useRef(null);
  const fillProgress = useScrollProgressEl(fillRef, { start: 0.9, end: 0.35 });

  // Stats animation trigger (countup + initial sweep — only fires once)
  const [statsRef, statsIn] = useInView({ threshold: 0.3, rootMargin: "0px 0px -10% 0px" });
  const [sweepOn, setSweepOn] = React.useState(false);
  React.useEffect(() => {
    if (statsIn) {
      const t = setTimeout(() => setSweepOn(true), 100);
      return () => clearTimeout(t);
    }
  }, [statsIn]);

  return (
    <section data-section="about" data-screen-label="02 About" ref={ref} style={{
      padding: "100px 24px", borderBottom: `1px solid ${c.line}`,
      opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 16}px)`,
      transition: "opacity .7s, transform .7s",
    }}>
      <div className="container">
      <TermSectionHeader c={c} n="02" label="about" />
      <div style={{
        marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
      }}>
        <div>
          {/* Scroll-fill H2 */}
          <h2
            ref={fillRef}
            aria-label="I build marketing sites that survive the second year — when the original team rotated out and the brand pivoted twice."
            style={{
              fontFamily: termStyles.fontDisplay, fontWeight: 500,
              fontSize: 44, letterSpacing: "-0.025em", lineHeight: 1.1,
              margin: 0, maxWidth: 560, textWrap: "pretty",
              color: c.dim, // fallback
              backgroundImage: `linear-gradient(90deg, ${c.fg} 0%, ${c.fg} ${fillProgress * 100}%, ${c.dim} ${fillProgress * 100}%, ${c.dim} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              transition: "none",
            }}
          >
            I build marketing sites that survive the second year — when the original team rotated out and the brand pivoted twice.
          </h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 15, lineHeight: 1.65 }}>
          <p style={{ margin: 0 }}>
            Five years in production front-end. Past: Team Lead of 15 engineers at
            Luxury Presence. Current: independent — two engagements per quarter for
            clients who care how the site ages.
          </p>
          <p style={{ margin: 0 }}>
            My work lives at the intersection of front-end engineering and operational
            content systems. Fast on day one, maintainable on day three hundred. The
            brief is always both.
          </p>
        </div>
      </div>

      {/* trust row with initial count-up + sweep, per-item hover sweep */}
      <div
        ref={statsRef}
        style={{
          marginTop: 64, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 0,
          border: `1px solid ${c.line}`, borderRadius: 8, overflow: "hidden",
          position: "relative",
        }}
      >
        <style>{`
          @keyframes termStatSweep {
            0%   { transform: translateX(-102%); }
            100% { transform: translateX(102%); }
          }
        `}</style>
        {CREDENTIALS.map((cr, i) => (
          <TermStatCell key={i} cr={cr} i={i} c={c} sweepOn={sweepOn} statsIn={statsIn} />
        ))}
      </div>
      </div>
    </section>
  );
}

function TermStatCell({ cr, i, c, sweepOn, statsIn }) {
  const [hover, setHover] = React.useState(false);
  const [hoverKey, setHoverKey] = React.useState(0);
  const onEnter = () => {
    setHover(true);
    // Re-key to restart the hover sweep even on repeated enters
    setHoverKey(k => k + 1);
  };
  const onLeave = () => setHover(false);
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        padding: "20px 20px",
        borderRight: i < CREDENTIALS.length - 1 ? `1px solid ${c.line}` : "none",
        background: hover ? c.kbdBg : c.panel,
        position: "relative", overflow: "hidden",
        transition: `background 200ms cubic-bezier(0.2,0.8,0.2,1)`,
      }}
    >
      {/* intro sweep — fires once on scroll-into-view */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(90deg, transparent 0%, ${c.fg}12 45%, ${c.fg}22 50%, ${c.fg}12 55%, transparent 100%)`,
        transform: "translateX(-102%)",
        animation: sweepOn ? `termStatSweep 1100ms cubic-bezier(0.2,0.8,0.2,1) ${i * 100}ms forwards` : "none",
        pointerEvents: "none",
      }}/>
      {/* hover sweep — isolated to this cell; re-keyed on each enter */}
      {hover && (
        <div key={hoverKey} style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(90deg, transparent 0%, ${c.fg}18 45%, ${c.fg}30 50%, ${c.fg}18 55%, transparent 100%)`,
          transform: "translateX(-102%)",
          animation: `termStatSweep 750ms cubic-bezier(0.2,0.8,0.2,1) forwards`,
          pointerEvents: "none",
        }}/>
      )}
      <div style={{
        fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
        letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10,
        position: "relative",
      }}>
        {cr.label}
      </div>
      <div style={{
        fontFamily: termStyles.fontDisplay, fontWeight: 500,
        fontSize: 28, letterSpacing: "-0.02em", lineHeight: 1,
        fontVariantNumeric: "tabular-nums",
        position: "relative",
      }}>
        <CountUp value={cr.value} active={statsIn} />
      </div>
      <div style={{ fontSize: 12, color: c.dim, marginTop: 6, position: "relative" }}>{cr.meta}</div>
    </div>
  );
}

function TermSectionHeader({ c, n, label, meta }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      paddingBottom: 12, borderBottom: `1px solid ${c.line}`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
        <span style={{
          fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>§{n}</span>
        <h2 style={{
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: 28, letterSpacing: "-0.02em", margin: 0,
        }}>
          {label}
        </h2>
      </div>
      {meta && (
        <span style={{
          fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
          letterSpacing: "0.08em",
        }}>
          {meta}
        </span>
      )}
    </div>
  );
}

// ── WORK
function TermWork({ c, filter, setFilter, filtered }) {
  const indexFiltered = filter
    ? (typeof WORK_INDEX !== "undefined" ? WORK_INDEX : []).filter(w => w.stack.includes(filter))
    : (typeof WORK_INDEX !== "undefined" ? WORK_INDEX : []);
  return (
    <section data-section="work" data-screen-label="03 Work" style={{
      padding: "100px 24px", borderBottom: `1px solid ${c.line}`,
    }}>
      <div className="container">
      <TermSectionHeader c={c} n="03" label="selected work" meta={`${filtered.length} featured · ${(WORK_INDEX || []).length + WORK.length} total`} />

      <div style={{
        marginTop: 20, display: "flex", flexWrap: "wrap", gap: 6,
        fontFamily: termStyles.fontMono, fontSize: 11,
      }}>
        <TermChip active={filter === null} c={c} onClick={() => setFilter(null)}>all</TermChip>
        {ALL_STACKS.map(s => (
          <TermChip key={s} active={filter === s} c={c} onClick={() => setFilter(filter === s ? null : s)}>
            {s.toLowerCase()}
          </TermChip>
        ))}
      </div>

      <div style={{
        marginTop: 32, display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)", gap: 16,
      }}>
        {filtered.map((w, i) => {
          const layouts = [
            { col: "1 / 13", h: 460 },
            { col: "1 / 7",  h: 340 },
            { col: "7 / 13", h: 340 },
            { col: "1 / 7",  h: 340 },
            { col: "7 / 13", h: 340 },
          ];
          const L = layouts[i] || { col: "1 / 7", h: 340 };
          return <TermWorkCard key={w.id} w={w} c={c} layout={L} n={i} />;
        })}
      </div>

      {/* Full index list grouped by agency */}
      <TermWorkIndex c={c} items={indexFiltered}/>
      </div>
    </section>
  );
}

function TermWorkIndex({ c, items }) {
  const groups = {};
  items.forEach(it => {
    (groups[it.agency] = groups[it.agency] || []).push(it);
  });
  const order = ["Marketwake", "Luxury Presence"];
  return (
    <div style={{ marginTop: 64 }}>
      <div style={{
        fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
        letterSpacing: "0.12em", textTransform: "uppercase",
        paddingBottom: 12, borderBottom: `1px solid ${c.line}`,
        display: "flex", justifyContent: "space-between",
      }}>
        <span>full index</span>
        <span>{items.length} projects</span>
      </div>
      {order.filter(k => groups[k]?.length).map(agency => (
        <div key={agency} style={{ marginTop: 32 }}>
          <div style={{
            fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
            letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8,
            paddingBottom: 8, borderBottom: `1px dashed ${c.line}`,
          }}>
            via {agency}
          </div>
          {groups[agency].map((it, i) => (
            <TermIndexRow key={i} it={it} c={c} stagger={i} />
          ))}
        </div>
      ))}
    </div>
  );
}

function TermIndexRow({ it, c, stagger = 0 }) {
  const [hover, setHover] = React.useState(false);
  const [ref, inView] = useInView({ threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  const delay = Math.min(stagger, 8) * 60; // cap to keep long lists snappy
  return (
    <a
      ref={ref}
      href={`https://${it.url}`}
      target="_blank" rel="noopener"
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: "unset", cursor: "pointer", display: "grid",
        gridTemplateColumns: "1.4fr 1fr 200px 80px 24px",
        gap: 16, alignItems: "baseline",
        padding: "14px 4px",
        borderBottom: `1px solid ${c.line}`,
        color: c.fg,
        background: hover ? c.panel : "transparent",
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0)" : "blur(10px)",
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 700ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, filter 700ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, transform 700ms cubic-bezier(0.2,0.8,0.2,1) ${delay}ms, background 180ms cubic-bezier(0.2,0.8,0.2,1)`,
        willChange: "opacity, filter, transform",
      }}
    >
      <span style={{
        fontFamily: termStyles.fontDisplay, fontSize: 18, fontWeight: 500,
        letterSpacing: "-0.01em",
        transform: hover ? "translateX(6px)" : "translateX(0)",
        transition: "transform 220ms cubic-bezier(0.2,0.8,0.2,1)",
      }}>{it.client}{it.note && <span style={{ color: c.dim, marginLeft: 10, fontSize: 11, fontFamily: termStyles.fontMono }}>★ {it.note}</span>}</span>
      <span style={{ fontFamily: termStyles.fontMono, fontSize: 12, color: c.dim }}>{it.url}</span>
      <span style={{
        fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
        display: "flex", gap: 4, flexWrap: "wrap",
      }}>
        {it.stack.map(s => (
          <span key={s} style={{
            padding: "2px 7px", borderRadius: 3,
            border: `1px solid ${c.line}`, background: c.bg,
          }}>{s}</span>
        ))}
      </span>
      <span style={{ fontFamily: termStyles.fontMono, fontSize: 12, color: c.dim, textAlign: "right" }}>{it.year}</span>
      <span style={{
        fontFamily: termStyles.fontMono, fontSize: 12, color: c.dim, textAlign: "right",
        transform: hover ? "translateX(4px)" : "translateX(0)",
        transition: "transform 220ms cubic-bezier(0.2,0.8,0.2,1)",
      }}>↗</span>
    </a>
  );
}

function TermChip({ active, c, children, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      data-cursor
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: "unset", cursor: "pointer",
        padding: "4px 10px", borderRadius: 4,
        border: `1px solid ${active ? c.fg : (hover ? c.lineStrong : c.line)}`,
        background: active ? c.fg : (hover ? c.kbdBg : "transparent"),
        color: active ? c.bg : (hover ? c.fg : c.dim),
        transition: "all 180ms cubic-bezier(0.2,0.8,0.2,1)",
        transform: hover && !active ? "translateY(-1px)" : "translateY(0)",
      }}
    >{children}</button>
  );
}

function TermWorkCard({ w, c, layout, n }) {
  const [ref, inView] = useInView();
  const [hover, setHover] = React.useState(false);
  return (
    <article
      ref={ref}
      data-cursor
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        gridColumn: layout.col,
        opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 16}px)`,
        transition: `opacity .6s ${n * 0.05}s, transform .6s ${n * 0.05}s`,
        border: `1px solid ${c.line}`,
        borderRadius: 10, overflow: "hidden",
        background: c.panel,
        cursor: "pointer",
      }}>
      {/* card header bar */}
      <div style={{
        padding: "10px 14px",
        borderBottom: `1px solid ${c.line}`,
        display: "flex", justifyContent: "space-between",
        fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
      }}>
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ color: c.fg }}>№ {w.index}</span>
          <span>{w.category.toLowerCase()}</span>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <span>{w.year}</span>
          <span style={{
            color: c.fg, padding: "0 6px", borderRadius: 3,
            background: c.kbdBg, border: `1px solid ${c.line}`,
          }}>
            {w.stack[0].toLowerCase()}
          </span>
        </div>
      </div>
      {/* mockup region */}
      <div style={{
        height: layout.h, position: "relative", overflow: "hidden",
        background: w.swatch,
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0 12px, transparent 12px 24px)",
        }}/>
        {/* Fake site chrome to suggest preview */}
        <div style={{
          position: "absolute", top: 20, left: 20, right: 20,
          height: 24, borderRadius: 4,
          background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)",
          display: "flex", alignItems: "center", padding: "0 10px", gap: 8,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }}/>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }}/>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.25)" }}/>
          <div style={{
            flex: 1, height: 14, marginLeft: 12, borderRadius: 3,
            background: "rgba(255,255,255,0.1)",
            fontFamily: termStyles.fontMono, fontSize: 10, color: "rgba(255,255,255,0.6)",
            display: "flex", alignItems: "center", padding: "0 8px",
          }}>
            {w.client.toLowerCase().replace(/\s+/g, "")}.com
          </div>
        </div>
        <div style={{
          position: "absolute", bottom: 28, left: 28, right: 28,
          color: "rgba(255,255,255,0.95)",
        }}>
          <div style={{
            fontFamily: termStyles.fontDisplay, fontWeight: 500,
            fontSize: n === 0 ? 56 : 40, letterSpacing: "-0.025em", lineHeight: 1,
          }}>{w.client}</div>
          <div style={{
            fontFamily: termStyles.fontMono, fontSize: 11, color: "rgba(255,255,255,0.75)",
            marginTop: 10, letterSpacing: "0.06em",
          }}>
            {w.title}
          </div>
        </div>
        {/* hover overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.4)", backdropFilter: "blur(6px)",
          opacity: hover ? 1 : 0, transition: "opacity .3s",
          padding: 28,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          color: "rgba(255,255,255,0.92)",
        }}>
          <div style={{ fontFamily: termStyles.fontMono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
            № {w.index} · case study
          </div>
          <div>
            <div style={{
              fontFamily: termStyles.fontDisplay, fontSize: 22, fontWeight: 500,
              letterSpacing: "-0.02em", lineHeight: 1.25, maxWidth: 480,
            }}>
              {w.summary}
            </div>
            {w.award && (
              <div style={{
                marginTop: 16, fontFamily: termStyles.fontMono, fontSize: 11,
                letterSpacing: "0.08em",
              }}>
                ★ {w.award}
              </div>
            )}
            <div style={{
              marginTop: 20, display: "flex", gap: 6,
              fontFamily: termStyles.fontMono, fontSize: 10, letterSpacing: "0.06em",
            }}>
              {w.stack.map(s => (
                <span key={s} style={{
                  padding: "3px 8px", borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.25)",
                }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* footer bar */}
      <div style={{
        padding: "12px 14px",
        display: "flex", justifyContent: "space-between",
        fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
      }}>
        <span>{w.role.toLowerCase()}</span>
        <span style={{ color: c.fg }}>{w.metric}</span>
        <span>→ case study</span>
      </div>
    </article>
  );
}

// ── SERVICES
function TermServices({ c }) {
  return (
    <section data-section="services" data-screen-label="04 Services" style={{
      padding: "100px 24px", borderBottom: `1px solid ${c.line}`,
    }}>
      <div className="container">
      <TermSectionHeader c={c} n="04" label="what I build" meta="4 engagements" />
      <div style={{
        marginTop: 32, display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", gap: 16,
      }}>
        {SERVICES.map((s, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={s.n} ref={ref} style={{
              padding: "28px 28px 24px",
              border: `1px solid ${c.line}`, borderRadius: 10,
              background: c.panel,
              opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 14}px)`,
              transition: `opacity .6s ${i*0.06}s, transform .6s ${i*0.06}s`,
            }}>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                marginBottom: 14,
              }}>
                <span style={{
                  fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
                  letterSpacing: "0.1em",
                }}>
                  /service/{s.n}
                </span>
                <span style={{
                  fontFamily: termStyles.fontMono, fontSize: 10, color: c.fg,
                  padding: "2px 8px", border: `1px solid ${c.line}`, borderRadius: 3,
                  background: c.kbdBg, letterSpacing: "0.08em",
                }}>
                  active
                </span>
              </div>
              <h3 style={{
                fontFamily: termStyles.fontDisplay, fontWeight: 500,
                fontSize: 24, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.15,
              }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: c.fg, marginTop: 12, marginBottom: 0 }}>
                {s.body}
              </p>
              <div style={{
                marginTop: 18, display: "flex", flexWrap: "wrap", gap: 6,
                fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                letterSpacing: "0.06em",
              }}>
                {s.deliverables.map(d => (
                  <span key={d} style={{
                    padding: "3px 8px", borderRadius: 3,
                    border: `1px solid ${c.line}`, background: c.bg,
                  }}>{d}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

// ── STACK
function TermStack({ c }) {
  const [ref, inView] = useInView({ threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
  const items = [];
  STACK.forEach(g => g.items.forEach((it, j) => items.push({ g: g.cat, it, j, last: j === g.items.length - 1 })));
  return (
    <section data-section="stack" data-screen-label="05 Stack" ref={ref} style={{
      padding: "100px 24px", borderBottom: `1px solid ${c.line}`,
    }}>
      <div className="container">
      <style>{`
        @keyframes termStackIn {
          0%   { opacity: 0; transform: translateX(-14px); filter: blur(4px); }
          100% { opacity: 1; transform: translateX(0); filter: blur(0); }
        }
        .term-stack-item {
          opacity: 0;
          will-change: opacity, transform, filter;
        }
        .term-stack-item.in {
          animation: termStackIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      <TermSectionHeader c={c} n="05" label="technical stack" />
      <div style={{
        marginTop: 32, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16,
      }}>
        {STACK.map((g, gi) => {
          const gDelay = gi * 80;
          return (
            <div key={g.cat} style={{
              border: `1px solid ${c.line}`, borderRadius: 10, overflow: "hidden",
              background: c.panel,
            }}>
              <div
                className={inView ? "term-stack-item in" : "term-stack-item"}
                style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${c.line}`,
                  display: "flex", justifyContent: "space-between",
                  fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  animationDelay: `${gDelay}ms`,
                }}>
                <span style={{ color: c.fg }}>{g.cat}</span>
                <span>{String(g.items.length).padStart(2, "0")}</span>
              </div>
              {g.items.map((it, j) => (
                <div
                  key={it}
                  className={inView ? "term-stack-item in" : "term-stack-item"}
                  style={{
                    padding: "10px 14px",
                    borderBottom: j === g.items.length - 1 ? "none" : `1px solid ${c.line}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontFamily: termStyles.fontMono, fontSize: 12,
                    animationDelay: `${gDelay + 80 + j * 60}ms`,
                  }}>
                  <span style={{ color: c.fg }}>{it}</span>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", background: c.fg, opacity: 0.4,
                  }}/>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

// ── WRITING
function TermWriting({ c }) {
  const [ref, inView] = useInView({ threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
  const [hoverIdx, setHoverIdx] = React.useState(null);
  return (
    <section data-section="writing" data-screen-label="06 Writing" ref={ref} style={{
      padding: "100px 24px", borderBottom: `1px solid ${c.line}`,
    }}>
      <div className="container">
      <style>{`
        @keyframes termWritingIn {
          0%   { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .term-writing-row {
          opacity: 0;
          will-change: opacity, transform, filter;
          transition: background-color .25s ease, padding-left .25s ease;
        }
        .term-writing-row.in {
          animation: termWritingIn 600ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      <TermSectionHeader c={c} n="06" label="writing" meta="forthcoming" />
      <div style={{ marginTop: 24 }}>
        {WRITING.map((w, i) => {
          const isHover = hoverIdx === i;
          return (
            <div
              key={i}
              data-cursor
              className={inView ? "term-writing-row in" : "term-writing-row"}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 120px 140px",
                gap: 24,
                padding: isHover ? "20px 20px 20px 20px" : "20px 12px",
                borderTop: `1px solid ${c.line}`,
                borderBottom: i === WRITING.length - 1 ? `1px solid ${c.line}` : "none",
                alignItems: "baseline",
                cursor: "pointer",
                fontFamily: termStyles.fontMono, fontSize: 13,
                background: isHover ? c.panel : "transparent",
                animationDelay: `${i * 70}ms`,
              }}>
              <span style={{ color: c.dim, display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{
                  display: "inline-block",
                  width: 8,
                  opacity: isHover ? 1 : 0,
                  transform: isHover ? "translateX(0)" : "translateX(-4px)",
                  transition: "opacity .25s, transform .25s",
                  color: c.fg,
                }}>→</span>
                {String(i+1).padStart(2,"0")}/
              </span>
              <span style={{
                fontFamily: termStyles.fontDisplay, fontSize: 20, letterSpacing: "-0.01em",
                color: c.fg, fontWeight: 500,
              }}>{w.title}</span>
              <span style={{ color: c.dim }}>{w.kind.toLowerCase()}</span>
              <span style={{ color: c.dim, textAlign: "right" }}>{w.date}</span>
            </div>
          );
        })}
      </div>
      </div>
    </section>
  );
}

// ── CONTACT
function TermContact({ c }) {
  const [ref, inView] = useInView({ threshold: 0.25, rootMargin: "0px 0px -8% 0px" });
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  const words1 = ["2", "engagements"];
  const words2 = ["available", "Q3", "2026."];
  let idx = 0;
  return (
    <section data-section="contact" data-screen-label="07 Contact" ref={ref} style={{
      padding: "120px 24px 80px",
      borderBottom: `1px solid ${c.line}`,
    }}>
      <div className="container">
      <style>{`
        @keyframes termContactWord {
          0%   { opacity: 0; transform: translateY(0.4em); filter: blur(14px); }
          60%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes termContactFade {
          0%   { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .term-contact-word {
          display: inline-block;
          opacity: 0;
          will-change: opacity, transform, filter;
        }
        .term-contact-word.in {
          animation: termContactWord 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .term-contact-fade {
          opacity: 0;
          will-change: opacity, transform;
        }
        .term-contact-fade.in {
          animation: termContactFade 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
      <TermSectionHeader c={c} n="07" label="contact" />
      <div style={{
        marginTop: 48, display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64,
        alignItems: "start",
      }}>
        <div>
          <h2 style={{
            fontFamily: termStyles.fontDisplay, fontWeight: 500,
            fontSize: "clamp(48px, 6vw, 96px)", letterSpacing: "-0.035em",
            lineHeight: 1.0, margin: 0, textWrap: "balance",
          }}>
            <span style={{ display: "block" }}>
              {words1.map((w, wi) => {
                const delay = idx * 90; idx++;
                return (
                  <React.Fragment key={wi}>
                    <span
                      className={inView ? "term-contact-word in" : "term-contact-word"}
                      style={{ animationDelay: `${delay}ms` }}
                    >{w}</span>
                    {wi < words1.length - 1 && " "}
                  </React.Fragment>
                );
              })}
            </span>
            <span style={{ display: "block", color: c.dim }}>
              {words2.map((w, wi) => {
                const delay = idx * 90; idx++;
                return (
                  <React.Fragment key={wi}>
                    <span
                      className={inView ? "term-contact-word in" : "term-contact-word"}
                      style={{ animationDelay: `${delay}ms` }}
                    >{w}</span>
                    {wi < words2.length - 1 && " "}
                  </React.Fragment>
                );
              })}
            </span>
          </h2>
          <p
            className={inView ? "term-contact-fade in" : "term-contact-fade"}
            style={{
              marginTop: 28, fontSize: 16, lineHeight: 1.6, maxWidth: 500,
              animationDelay: "600ms",
            }}>
            Write directly. I reply within one business day with either a scoping
            call or a referral to someone better suited.
          </p>
          <button
            data-cursor
            onClick={copy}
            className={inView ? "term-contact-fade in" : "term-contact-fade"}
            style={{
              all: "unset", cursor: "pointer", marginTop: 32,
              display: "inline-flex", alignItems: "center", gap: 14,
              padding: "14px 22px", borderRadius: 8,
              background: c.fg, color: c.bg,
              fontFamily: termStyles.fontMono, fontSize: 14,
              animationDelay: "780ms",
            }}
          >
            <span>{copied ? "copied ✓" : PROFILE.email}</span>
            <span style={{ fontSize: 11, opacity: 0.6 }}>{copied ? "" : "copy"}</span>
          </button>
        </div>
        <div
          className={inView ? "term-contact-fade in" : "term-contact-fade"}
          style={{
            border: `1px solid ${c.line}`, borderRadius: 10, overflow: "hidden",
            background: c.panel, fontFamily: termStyles.fontMono, fontSize: 12,
            animationDelay: "500ms",
          }}>
          <div style={{
            padding: "10px 14px", borderBottom: `1px solid ${c.line}`,
            fontSize: 10, color: c.dim, letterSpacing: "0.1em", textTransform: "uppercase",
          }}>
            direct channels
          </div>
          {[
            ["email",    PROFILE.email],
            ["linkedin", "/in/leandrosoria"],
            ["github",   "@leandrosoria"],
            ["read.cv",  "leandrosoria"],
            ["intro",    "cal.com/leandrosoria/30"],
          ].map(([k, v], i) => (
            <div key={k} style={{
              padding: "12px 14px",
              borderBottom: `1px solid ${c.line}`,
              display: "grid", gridTemplateColumns: "100px 1fr",
            }}>
              <span style={{ color: c.dim }}>{k}</span>
              <span style={{ color: c.fg }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

function TermFooter({ c }) {
  const [ref, inView] = useInView({ threshold: 0.3, rootMargin: "0px 0px -5% 0px" });
  // Scroll-tracked parallax: offset is ~1 when element is below viewport, ~0 when above
  const track = useScrollTrack(ref);
  // Map offset → vertical shift. Range centered around offset=0.6 (element roughly visible).
  // Use a wider range so the effect is noticeable during the element's scroll-through.
  const parallaxY = (track.offset - 0.6) * 80; // px — negative = upward drift
  // Tilt direction slightly toward scroll direction: scrolling down → pull down more; scrolling up → push up more
  const dirAccent = track.dir * 12;
  const driftY = parallaxY + dirAccent;

  // Split the wordmark into individual letters for staggered blur reveal
  const mark = "LEANDROSORIA";
  return (
    <footer ref={ref} style={{
      padding: "80px 24px 32px",
      borderTop: `1px solid ${c.line}`,
      overflow: "hidden",
    }}>
      <div className="container">
      <style>{`
        @keyframes termFootLetter {
          0%   { opacity: 0; transform: translateY(0.4em); filter: blur(24px); }
          60%  { opacity: 0.9; filter: blur(0); }
          100% { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes termFootBlock {
          0%   { opacity: 0; filter: blur(40px); transform: translateY(24px) scale(0.98); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0) scale(1); }
        }
        .term-foot-letter {
          display: inline-block;
          opacity: 0;
          will-change: opacity, transform, filter;
        }
        .term-foot-letter.in {
          animation: termFootLetter 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        .term-foot-mark {
          opacity: 0;
          will-change: opacity, transform, filter;
        }
        .term-foot-mark.in {
          animation: termFootBlock 1400ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes termFootSig {
          0%   { opacity: 0; filter: blur(18px); transform: translateY(16px); }
          100% { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .term-foot-sig {
          opacity: 0;
          will-change: opacity, transform, filter;
        }
        .term-foot-sig.in {
          animation: termFootSig 1100ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          animation-delay: 1200ms;
        }
      `}</style>
      <div
        aria-label="Leandro Soria"
        className={inView ? "term-foot-mark in" : "term-foot-mark"}
        style={{
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: "clamp(80px, 16vw, 280px)",
          letterSpacing: "-0.05em", lineHeight: 0.9,
          color: c.fg,
          textAlign: "center",
          whiteSpace: "nowrap",
          // Parallax drift applied after the reveal animation completes via wrapper
        }}
      >
        <div style={{
          transform: `translateY(${driftY}px)`,
          transition: "transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          willChange: "transform",
        }}>
          {mark.split("").map((ch, i) => (
            <span
              key={i}
              className={inView ? "term-foot-letter in" : "term-foot-letter"}
              style={{ animationDelay: `${600 + i * 45}ms` }}
            >{ch}</span>
          ))}
        </div>
      </div>
      <div
        className={inView ? "term-foot-sig in" : "term-foot-sig"}
        style={{
          marginTop: 56, textAlign: "center",
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: 22, letterSpacing: "-0.01em", color: c.fg,
        }}>
        Leandro Soria.
      </div>
      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: `1px solid ${c.line}`,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
        letterSpacing: "0.06em",
      }}>
        <div>© 2026 Leandro Soria</div>
        <div>v03 · The Terminal</div>
        <div>build 2026.04.22</div>
        <div style={{ textAlign: "right" }}>end-of-document</div>
      </div>
      </div>
    </footer>
  );
}

export { TerminalVariant };
export { TerminalPalette };
export { TermHero };
export { TermAbout };
export { TermWork };
export { TermWorkIndex };
export { TermIndexRow };
export { TermChip };
export { TermWorkCard };
export { TermServices };
export { TermStack };
export { TermWriting };
export { TermContact };
export { TermFooter };
export { TermSectionHeader };
export { TermStatCell };
export { CountUp };
export { CmdK };
export { kbd };
export { termStyles };
export { useScrollProgressEl };
export { useScrollTrack };
export { getScrollParent };
