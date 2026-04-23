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
    <div ref={containerRef} className="term-shell">
      <ScrollProgress containerRef={containerRef} color="var(--ls-accent)" thickness={1} />
      <ScopedCursor containerRef={containerRef} color="var(--ls-fg)" size={10} />

      {/* Top chrome */}
      <header className="term-header">
        {/* Row 1: meta */}
        <div className="term-header__row">
          <div className="container term-header__meta">
            <div className="term-header__breadcrumb">
              <span>leandrosoria.dev</span>
              <span>/ portfolio</span>
              <span>/ v03</span>
            </div>
            <div className="term-header__hint">
              <kbd className="term-kbd">⌘</kbd>
              <kbd className="term-kbd">K</kbd>
              <span>to navigate</span>
            </div>
            <div className="term-header__status">
              <span className="term-status">
                <span className="term-status__dot" />
                available-q3-26
              </span>
              <button
                data-cursor
                onClick={toggleTheme}
                className="term-theme-toggle"
              >{theme === "dark" ? "dark" : "light"}</button>
            </div>
          </div>
        </div>
        {/* Row 2: tabs */}
        <div className="term-header__row term-header__row--nav">
          <div className="container term-nav">
            {NAV.map((n, i) => (
              <button
                key={n.id}
                data-cursor
                onClick={() => scrollTo(n.id)}
                className={`term-nav__link${active === n.id ? " term-nav__link--active" : ""}`}
              >
                <span className="term-nav__link-index">{String(i+1).padStart(2,"0")}</span>
                {n.label.toLowerCase()}
              </button>
            ))}
            <button
              data-cursor
              onClick={() => setCmdkOpen(true)}
              className="term-nav__search"
            >
              <span aria-hidden="true">
                <svg
                  viewBox="0 0 14 14"
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <circle cx="6" cy="6" r="4" />
                  <path d="M9.2 9.2L13 13" />
                </svg>
              </span>
              <span>search</span>
            </button>
          </div>
        </div>
      </header>

      <TermHero c={c} scrollTo={scrollTo} />
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
    <div className="term-cmdk" onClick={onClose}>
      <div className="term-cmdk__panel" onClick={(e) => e.stopPropagation()}>
        <input
          autoFocus
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search sections, stacks, actions…"
          className="term-cmdk__input"
        />
        <div className="term-cmdk__results">
          {filtered.map((it, i) => (
            <button key={i} onClick={it.run} className="term-cmdk__item">
              <span className="term-cmdk__item-type">{it.type}</span>
              <span>{it.label}</span>
              <span className="term-cmdk__item-hint">↵</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="term-cmdk__empty">No matches</div>
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
    <h1 className="term-h1">
      {lines.map((line, li) => (
        <span key={li} className="term-h1__line">
          {line.map((w, wi) => {
            const delay = idx * 90;
            idx++;
            const isAmp = w === "&";
            return (
              <React.Fragment key={wi}>
                <span
                  className={`term-h1__word${isAmp ? " term-h1__word--muted" : ""}`}
                  style={{ animationDelay: `${delay}ms` }}
                >{w}</span>
                {wi < line.length - 1 && " "}
              </React.Fragment>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

function TermHero({ c, scrollTo }: any) {
  return (
    <section data-section="hero" data-screen-label="01 Hero" className="term-hero">
      <div className="container term-hero__grid">
        <div className="term-hero__left">
          <div className="term-hero__eyebrow">
            <span className="term-hero__tag">SENIOR</span>
            <span>/ contractor / team-lead</span>
          </div>
          <AnimatedH1 c={c} />
          <p className="term-hero__lede">
            Building production websites for international brands.
            Five years, a hundred-plus sites, and a standard that doesn&apos;t bend.
          </p>
          <div className="term-hero__ctas">
            <button
              data-cursor
              onClick={() => scrollTo?.("work")}
              className="term-hero__cta term-hero__cta--primary"
            >
              View selected work
              <span className="term-hero__cta-arrow">→</span>
            </button>
            {/* Hidden for now — may re-enable when booking flow is ready. */}
            <button data-cursor hidden className="term-hero__cta term-hero__cta--ghost">
              Book an intro call
            </button>
          </div>
        </div>

        {/* Right: system meta card */}
        <aside className="term-hero__sys">
          <div className="term-hero__sys-head">
            <span>system / status</span>
            <span>· live</span>
          </div>
          <div className="term-hero__sys-rows">
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
              <div key={k} className="term-hero__sys-row">
                <span className="term-hero__sys-key">{k}</span>
                <span
                  className="term-hero__sys-val"
                  style={{ animationDelay: `${800 + i * 70}ms` }}
                >{v}</span>
              </div>
            ))}
          </div>
        </aside>
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
    <section
      data-section="about"
      data-screen-label="02 About"
      ref={ref}
      className="term-about"
      style={{
        opacity: inView ? 1 : 0,
        transform: `translateY(${inView ? 0 : 16}px)`,
        transition: "opacity .7s, transform .7s",
      }}
    >
      <div className="container">
        <TermSectionHeader c={c} n="02" label="about" />
        <div className="term-about__body">
          <div>
            {(() => {
              const fillText = "I build marketing sites that survive the second year - when the original team rotated out and the brand pivoted twice.";
              const words = fillText.split(" ");
              return (
                <h2
                  ref={fillRef}
                  className="term-about__fill"
                  aria-label={fillText}
                >
                  {words.map((w, i) => {
                    // Each word owns a 1/N slice of the global 0→1 progress.
                    // clamp((p * N) - i, 0, 1) = local fill for word i.
                    const local = Math.max(0, Math.min(1, fillProgress * words.length - i));
                    return (
                      <React.Fragment key={i}>
                        <span
                          className="term-about__fill-word"
                          style={{ ['--fill' as any]: `${local * 100}%` }}
                        >{w}</span>
                        {i < words.length - 1 && " "}
                      </React.Fragment>
                    );
                  })}
                </h2>
              );
            })()}
          </div>
          <div className="term-about__prose">
            <p>
              Five years in production front-end. Past: Team Lead of 15 engineers at
              Luxury Presence. Current: independent - two engagements per quarter for
              clients who care how the site ages.
            </p>
            <p>
              My work lives at the intersection of front-end engineering and operational
              content systems. Fast on day one, maintainable on day three hundred. The
              brief is always both.
            </p>
          </div>
        </div>

        {/* trust row with initial count-up + sweep, per-item hover sweep */}
        <div ref={statsRef} className="term-about__stats">
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
    <div className="term-stat" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {/* intro sweep — fires once on scroll-into-view, staggered by index */}
      <div
        className={`term-stat__sweep${sweepOn ? " is-sweeping" : ""}`}
        style={{ animationDelay: `${i * 100}ms` }}
      />
      {/* hover sweep — re-keyed on each enter to restart the animation */}
      {hover && <div key={hoverKey} className="term-stat__sweep-hover" />}
      <div className="term-stat__label">{cr.label}</div>
      <div className="term-stat__value">
        <CountUp value={cr.value} active={statsIn} />
      </div>
      <div className="term-stat__meta">{cr.meta}</div>
    </div>
  );
}

function TermSectionHeader({ c, n, label, meta }) {
  return (
    <div className="term-section-header">
      <div className="term-section-header__left">
        <span className="term-section-header__num">§{n}</span>
        <h2 className="term-section-header__label">{label}</h2>
      </div>
      {meta && <span className="term-section-header__meta">{meta}</span>}
    </div>
  );
}

// ── WORK
function TermWork({ c, filter, setFilter, filtered }) {
  const indexFiltered = filter
    ? (typeof WORK_INDEX !== "undefined" ? WORK_INDEX : []).filter(w => w.stack.includes(filter))
    : (typeof WORK_INDEX !== "undefined" ? WORK_INDEX : []);
  return (
    <section data-section="work" data-screen-label="03 Work" className="term-work">
      <div className="container">
        <TermSectionHeader c={c} n="03" label="selected work" meta={`${filtered.length} featured · ${(WORK_INDEX || []).length + WORK.length} total`} />

        <div className="term-work__chips">
          <TermChip active={filter === null} c={c} onClick={() => setFilter(null)}>all</TermChip>
          {ALL_STACKS.map(s => (
            <TermChip key={s} active={filter === s} c={c} onClick={() => setFilter(filter === s ? null : s)}>
              {s.toLowerCase()}
            </TermChip>
          ))}
        </div>

        <div className="term-work__grid">
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
    <div className="term-work-index">
      <div className="term-work-index__head">
        <span>full index</span>
        <span>{items.length} projects</span>
      </div>
      {order.filter(k => groups[k]?.length).map(agency => (
        <div key={agency} className="term-work-index__group">
          <div className="term-work-index__agency">via {agency}</div>
          {groups[agency].map((it, i) => (
            <TermIndexRow key={i} it={it} c={c} stagger={i} />
          ))}
        </div>
      ))}
    </div>
  );
}

function TermIndexRow({ it, c, stagger = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  const delay = Math.min(stagger, 8) * 60; // cap to keep long lists snappy
  return (
    <a
      ref={ref}
      href={`https://${it.url}`}
      target="_blank"
      rel="noopener"
      data-cursor
      className="term-work-index__row"
      style={{
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0)" : "blur(10px)",
        transform: inView ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 700ms var(--ls-ease) ${delay}ms, filter 700ms var(--ls-ease) ${delay}ms, transform 700ms var(--ls-ease) ${delay}ms, background 180ms var(--ls-ease)`,
        willChange: "opacity, filter, transform",
      }}
    >
      <span className="term-work-index__client">
        {it.client}
        {it.note && <span className="term-work-index__note">★ {it.note}</span>}
      </span>
      <span className="term-work-index__url">{it.url}</span>
      <span className="term-work-index__stack">
        {it.stack.map(s => (
          <span key={s} className="term-work-index__stack-item">{s}</span>
        ))}
      </span>
      <span className="term-work-index__year">{it.year}</span>
      <span className="term-work-index__arrow">↗</span>
    </a>
  );
}

function TermChip({ active, c, children, onClick }) {
  return (
    <button
      data-cursor
      onClick={onClick}
      className={`term-chip${active ? " term-chip--active" : ""}`}
    >
      {children}
    </button>
  );
}

function TermWorkCard({ w, c, layout, n }) {
  const [ref, inView] = useInView();
  return (
    <a
      ref={ref}
      data-cursor
      href={`https://${w.url}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${w.client} - ${w.title}`}
      className="term-work-card"
      style={{
        gridColumn: layout.col,
        opacity: inView ? 1 : 0,
        transform: `translateY(${inView ? 0 : 16}px)`,
        transition: `opacity .6s ${n * 0.05}s, transform .6s ${n * 0.05}s`,
      }}
    >
      <div className="term-work-card__bar">
        <div className="term-work-card__bar-left">
          <span className="term-work-card__bar-index">№ {w.index}</span>
          <span>{w.category.toLowerCase()}</span>
        </div>
        <div className="term-work-card__bar-right">
          <span>{w.year}</span>
          <span className="term-work-card__bar-pill">{w.stack[0].toLowerCase()}</span>
        </div>
      </div>

      <div
        className="term-work-card__mock"
        style={{ height: layout.h, background: w.swatch }}
      >
        <div className="term-work-card__mock-grain" />
        <div className="term-work-card__mock-chrome">
          <div className="term-work-card__mock-dot" />
          <div className="term-work-card__mock-dot" />
          <div className="term-work-card__mock-dot" />
          <div className="term-work-card__mock-url">
            {w.client.toLowerCase().replace(/\s+/g, "")}.com
          </div>
        </div>
        <div className="term-work-card__mock-caption">
          <div className={`term-work-card__mock-title${n === 0 ? " term-work-card__mock-title--featured" : ""}`}>
            {w.client}
          </div>
          <div className="term-work-card__mock-subtitle">{w.title}</div>
        </div>

        <div className="term-work-card__overlay">
          <div className="term-work-card__overlay-kicker">№ {w.index} · case study</div>
          <div>
            <div className="term-work-card__overlay-summary">{w.summary}</div>
            {w.award && (
              <div className="term-work-card__overlay-award">★ {w.award}</div>
            )}
            <div className="term-work-card__overlay-stack">
              {w.stack.map(s => (
                <span key={s} className="term-work-card__overlay-stack-item">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="term-work-card__foot">
        <span>{w.role.toLowerCase()}</span>
        <span className="term-work-card__foot-metric">{w.metric}</span>
        <span>↗ visit site</span>
      </div>
    </a>
  );
}

// ── SERVICES
function TermServices({ c }) {
  return (
    <section data-section="services" data-screen-label="04 Services" className="term-services">
      <div className="container">
        <TermSectionHeader c={c} n="04" label="what I build" meta="4 engagements" />
        <div className="term-services__grid">
          {SERVICES.map((s, i) => {
            const [ref, inView] = useInView();
            return (
              <div
                key={s.n}
                ref={ref}
                className="term-services__card"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: `translateY(${inView ? 0 : 14}px)`,
                  transition: `opacity .6s ${i * 0.06}s, transform .6s ${i * 0.06}s`,
                }}
              >
                <div className="term-services__card-head">
                  <span className="term-services__card-n">/service/{s.n}</span>
                  <span className="term-services__card-badge">active</span>
                </div>
                <h3 className="term-services__card-title">{s.title}</h3>
                <p className="term-services__card-body">{s.body}</p>
                <div className="term-services__card-pills">
                  {s.deliverables.map(d => (
                    <span key={d} className="term-services__card-pill">{d}</span>
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
  return (
    <section data-section="stack" data-screen-label="05 Stack" ref={ref} className="term-stack">
      <div className="container">
        <TermSectionHeader c={c} n="05" label="technical stack" />
        <div className="term-stack__grid">
          {STACK.map((g, gi) => {
            const gDelay = gi * 80;
            return (
              <div key={g.cat} className="term-stack__group">
                <div
                  className={`term-stack-item term-stack__cat${inView ? " in" : ""}`}
                  style={{ animationDelay: `${gDelay}ms` }}
                >
                  <span className="term-stack__cat-name">{g.cat}</span>
                  <span>{String(g.items.length).padStart(2, "0")}</span>
                </div>
                {g.items.map((it, j) => {
                  const isLast = j === g.items.length - 1;
                  return (
                    <div
                      key={it}
                      className={`term-stack-item term-stack__row${isLast ? " term-stack__row--last" : ""}${inView ? " in" : ""}`}
                      style={{ animationDelay: `${gDelay + 80 + j * 60}ms` }}
                    >
                      <span className="term-stack__row-name">{it}</span>
                      <span className="term-stack__row-dot" />
                    </div>
                  );
                })}
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
  return (
    <section data-section="writing" data-screen-label="06 Writing" ref={ref} className="term-writing">
      <div className="container">
        <TermSectionHeader c={c} n="06" label="writing" meta="forthcoming" />
        <div className="term-writing__list">
          {WRITING.map((w, i) => (
            <div
              key={i}
              data-cursor
              className={`term-writing__row term-writing-row${inView ? " in" : ""}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="term-writing__num">
                <span className="term-writing__arrow">→</span>
                {String(i + 1).padStart(2, "0")}/
              </span>
              <span className="term-writing__title">{w.title}</span>
              <span className="term-writing__kind">{w.kind.toLowerCase()}</span>
              <span className="term-writing__date">{w.date}</span>
            </div>
          ))}
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
  const wordCls = `term-contact-word${inView ? " in" : ""}`;
  const fadeCls = `term-contact-fade${inView ? " in" : ""}`;
  return (
    <section data-section="contact" data-screen-label="07 Contact" ref={ref} className="term-contact">
      <div className="container">
        <TermSectionHeader c={c} n="07" label="contact" />
        <div className="term-contact__grid">
          <div>
            <h2 className="term-contact__h">
              <span className="term-contact__h-line">
                {words1.map((w, wi) => {
                  const delay = idx * 90; idx++;
                  return (
                    <React.Fragment key={wi}>
                      <span className={wordCls} style={{ animationDelay: `${delay}ms` }}>{w}</span>
                      {wi < words1.length - 1 && " "}
                    </React.Fragment>
                  );
                })}
              </span>
              <span className="term-contact__h-line term-contact__h-line--muted">
                {words2.map((w, wi) => {
                  const delay = idx * 90; idx++;
                  return (
                    <React.Fragment key={wi}>
                      <span className={wordCls} style={{ animationDelay: `${delay}ms` }}>{w}</span>
                      {wi < words2.length - 1 && " "}
                    </React.Fragment>
                  );
                })}
              </span>
            </h2>
            <p className={`term-contact__lede ${fadeCls}`} style={{ animationDelay: "600ms" }}>
              Write directly. I reply within one business day with either a scoping
              call or a referral to someone better suited.
            </p>
            <button
              data-cursor
              onClick={copy}
              className={`term-contact__cta ${fadeCls}`}
              style={{ animationDelay: "780ms" }}
            >
              <span>{copied ? "copied ✓" : PROFILE.email}</span>
              <span className="term-contact__cta-hint">{copied ? "" : "copy"}</span>
            </button>
          </div>
          <aside className={`term-contact__card ${fadeCls}`} style={{ animationDelay: "500ms" }}>
            <div className="term-contact__card-head">direct channels</div>
            {[
              ["email",    PROFILE.email],
              ["linkedin", "/in/leandro-d-soria"],
              ["github",   "@leandsoria"],
            ].map(([k, v]) => (
              <div key={k} className="term-contact__card-row">
                <span className="term-contact__card-key">{k}</span>
                <span className="term-contact__card-val">{v}</span>
              </div>
            ))}
          </aside>
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
    <footer ref={ref} className="term-footer">
      <div className="container">
        <div
          aria-label="Leandro Soria"
          className={`term-footer__mark${inView ? " in" : ""}`}
        >
          <div
            className="term-footer__mark-inner"
            style={{ transform: `translateY(${driftY}px)` }}
          >
            {mark.split("").map((ch, i) => (
              <span
                key={i}
                className={`term-footer__letter${inView ? " in" : ""}`}
                style={{ animationDelay: `${600 + i * 45}ms` }}
              >{ch}</span>
            ))}
          </div>
        </div>
        <div className={`term-footer__sig${inView ? " in" : ""}`}>
          Leandro Soria.
        </div>
        <div className="term-footer__meta">
          <div>© 2026 Leandro Soria</div>
          <div>v03 · The Terminal</div>
          <div>build 2026.04.22</div>
          <div>end-of-document</div>
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
export { termStyles };
export { useScrollProgressEl };
export { useScrollTrack };
export { getScrollParent };
