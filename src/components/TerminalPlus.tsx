'use client';
// Ported 1:1 from Fullstack portfolio/variant-terminal-plus.jsx with ESM surgery only.
// - 'use client' directive added.
// - 'import * as React' preserves every React.useState/React.Fragment call unchanged.
// - Shared data + hooks imported from @/lib/shared (originally on window).
// - 'window.Lenis' replaced by the 'lenis' npm package (functionally identical).
/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/rules-of-hooks */
// @ts-nocheck
import * as React from 'react';
import Lenis from 'lenis';
import { PROFILE, CREDENTIALS, WORK, WORK_INDEX, SERVICES, STACK, WRITING, NAV, ALL_STACKS, useTheme, useInView, ScopedCursor, ScrollProgress, Placeholder } from '@/lib/shared';
import { TerminalPalette, TermHero, TermAbout, TermWork, TermServices, TermStack, TermWriting, TermContact, TermFooter, TermSectionHeader, CmdK, kbd, termStyles } from './TerminalVariant';

// V3 — Terminal: enhancements
// 1) Process section (numbered vertical list with states)
// 2) Motion polish helpers (stagger, softer easing, intent-driven)
// 3) Mobile sibling variant at 390px

// ── Motion: a single global easing + stagger helper
const TERM_EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";

// Reveal hook — fades up with a per-index stagger
function useReveal(delayMs = 0) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => setShown(true), delayMs);
        io.disconnect();
      }
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [delayMs]);
  return [ref, shown];
}

function revealStyle(shown, y = 12) {
  return {
    opacity: shown ? 1 : 0,
    transform: `translateY(${shown ? 0 : y}px)`,
    transition: `opacity 600ms ${TERM_EASE}, transform 600ms ${TERM_EASE}`,
  };
}

// ─────────────────────────────────────────────
// PROCESS — 4 steps, numbered, states
// ─────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    n: "01", status: "Week 1",
    title: "Discovery",
    body: "We scope the actual problem — traffic, team, CMS constraints, brand obligations. One call, one written brief back.",
    deliverables: ["Scope doc", "Risk map", "Go / no-go"],
  },
  {
    n: "02", status: "Week 2",
    title: "Architecture",
    body: "Content model, design system, CMS schema, and the non-functional contracts (perf, a11y, ops). Built before any page is designed.",
    deliverables: ["Content model", "System tokens", "Platform pick"],
  },
  {
    n: "03", status: "Weeks 3–4",
    title: "Design & Build",
    body: "Weekly shippable checkpoints. No month-long dark phases. Stakeholders see the live staging site from week three.",
    deliverables: ["Staging live", "Weekly demos", "Design system v1"],
  },
  {
    n: "04", status: "Week 5+",
    title: "Handoff & Care",
    body: "Editor training, documentation, monitoring. I stay available by retainer if you want someone on-call when marketing ships.",
    deliverables: ["Docs", "Editor session", "Retainer (opt.)"],
  },
];

function TermProcess({ c }) {
  return (
    <section data-section="process" data-screen-label="05 Process" style={{
      padding: "100px 24px", borderBottom: `1px solid ${c.line}`,
    }}>
      <div className="container">
      <TermSectionHeader c={c} n="05" label="how i work" meta="4 phases · ~5 weeks typical" />
      <div style={{
        marginTop: 32, display: "grid", gridTemplateColumns: "220px 1fr", gap: 40,
      }}>
        {/* left legend */}
        <div style={{
          position: "sticky", top: 120, alignSelf: "start",
          fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
          letterSpacing: "0.08em", lineHeight: 1.8,
        }}>
          <div style={{ color: c.fg, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.14em" }}>
            process.map
          </div>
          <div>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: c.fg, marginRight: 8 }}/>
            current step
          </div>
          <div>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", border: `1px solid ${c.dim}`, marginRight: 8 }}/>
            pending
          </div>
          <div>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: c.dim, marginRight: 8, opacity: 0.4 }}/>
            complete
          </div>
        </div>

        {/* steps */}
        <ol style={{
          listStyle: "none", padding: 0, margin: 0, position: "relative",
        }}>
          {/* guide line */}
          <div style={{
            position: "absolute", left: 20, top: 8, bottom: 8,
            width: 1, background: c.line,
          }}/>
          {PROCESS_STEPS.map((s, i) => {
            const [ref, shown] = useReveal(i * 90);
            return (
              <li
                key={s.n}
                ref={ref}
                data-cursor
                style={{
                  position: "relative", paddingLeft: 60,
                  paddingBottom: i === PROCESS_STEPS.length - 1 ? 0 : 40,
                  ...revealStyle(shown, 10),
                }}
              >
                {/* marker */}
                <span style={{
                  position: "absolute", left: 12, top: 6,
                  width: 18, height: 18, borderRadius: "50%",
                  background: c.bg,
                  border: `1px solid ${c.lineStrong}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: termStyles.fontMono, fontSize: 9, color: c.fg,
                }}>{s.n}</span>

                <div style={{
                  border: `1px solid ${c.line}`, borderRadius: 10,
                  background: c.panel, padding: "20px 24px",
                  transition: `border-color 200ms ${TERM_EASE}`,
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    marginBottom: 8,
                  }}>
                    <div style={{
                      fontFamily: termStyles.fontDisplay, fontWeight: 500,
                      fontSize: 24, letterSpacing: "-0.02em",
                    }}>{s.title}</div>
                    <span style={{
                      fontFamily: termStyles.fontMono, fontSize: 10, color: c.fg,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "3px 8px", borderRadius: 3,
                      background: c.kbdBg, border: `1px solid ${c.line}`,
                    }}>
                      {s.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: c.fg, margin: 0, maxWidth: 640 }}>
                    {s.body}
                  </p>
                  <div style={{
                    marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6,
                    fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                    letterSpacing: "0.06em",
                  }}>
                    {s.deliverables.map(d => (
                      <span key={d} style={{
                        padding: "2px 8px", borderRadius: 3,
                        border: `1px solid ${c.line}`, background: c.bg,
                      }}>{d}</span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// DESKTOP V3.1 — identical shell to V3 but with:
//   · Process section injected after Services
//   · Reveal animations replaced with polished stagger (softer, intent-driven)
//   · Kbd hint subtly animated in
//
// Re-implemented inline instead of forking the file.
// ─────────────────────────────────────────────
function TerminalVariantV2() {
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

  // Lenis smooth scroll on internal scroll container
  const lenisRef = React.useRef(null);
  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const lenis = new Lenis({
      wrapper: root,
      content: root,
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

  const filtered = stackFilter ? WORK.filter(w => w.stack.includes(stackFilter)) : WORK;

  const NAV_V2 = [
    { id: "hero", label: "Index" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "stack", label: "Stack" },
    { id: "writing", label: "Writing" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%", height: "100%",
        background: c.bg, color: c.fg,
        fontFamily: termStyles.fontBody,
        overflow: "auto",
        transition: `background 350ms ${TERM_EASE}, color 350ms ${TERM_EASE}`,
        backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
        backgroundSize: "64px 64px",
      }}
    >
      <ScrollProgress containerRef={containerRef} color={c.accent} thickness={1} />
      <ScopedCursor containerRef={containerRef} color={c.fg} size={10} />

      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        background: c.bg, borderBottom: `1px solid ${c.line}`,
      }}>
        <div style={{
          padding: "10px 24px", borderBottom: `1px solid ${c.line}`,
          display: "grid", gridTemplateColumns: "1fr auto 1fr",
          fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
          alignItems: "center",
        }}>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: c.fg }}>leandrosoria.dev</span>
            <span>/ portfolio</span>
            <span>/ v03.1</span>
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
            <button data-cursor onClick={toggleTheme} style={{
              all: "unset", cursor: "pointer",
              padding: "2px 8px", border: `1px solid ${c.line}`, borderRadius: 4,
            }}>{theme === "dark" ? "dark" : "light"}</button>
          </div>
        </div>
        <div style={{
          padding: "0 24px", display: "flex", gap: 0,
          fontFamily: termStyles.fontMono, fontSize: 12,
        }}>
          {NAV_V2.map((n, i) => (
            <button key={n.id} data-cursor onClick={() => scrollTo(n.id)} style={{
              all: "unset", cursor: "pointer",
              padding: "12px 16px",
              color: active === n.id ? c.fg : c.dim,
              borderBottom: active === n.id ? `1px solid ${c.fg}` : "1px solid transparent",
              transition: `color 180ms ${TERM_EASE}, border-color 180ms ${TERM_EASE}`,
              letterSpacing: "0.02em",
            }}>
              <span style={{ color: c.dim, marginRight: 8 }}>{String(i+1).padStart(2,"0")}</span>
              {n.label.toLowerCase()}
            </button>
          ))}
          <button data-cursor onClick={() => setCmdkOpen(true)} style={{
            all: "unset", cursor: "pointer", marginLeft: "auto",
            padding: "12px 16px", color: c.dim, display: "flex", alignItems: "center", gap: 8,
          }}>
            <span>⌘K</span><span>search</span>
          </button>
        </div>
      </header>

      <TermHero c={c} scrollTo={scrollTo} />
      <TermAbout c={c} />
      <TermWork c={c} filter={stackFilter} setFilter={setStackFilter} filtered={filtered} />
      <TermServices c={c} />
      <TermProcess c={c} />
      <TermStack c={c} />
      <TermWriting c={c} />
      <TermContact c={c} />
      <TermFooterV2 c={c} scrollTo={scrollTo} />

      {cmdkOpen && <CmdK c={c} onClose={() => setCmdkOpen(false)} scrollTo={scrollTo} setFilter={setStackFilter} />}
    </div>
  );
}

// Small wrapper: V3.1 hero gets the same content as V3's Hero but we pass scrollTo down.
// Keep the original TermHero untouched (used by V3) — for V3.1 we just re-export it.
// Since TermHero doesn't actually use scrollTo, this is a no-op pass; harmless.

// ─────────────────────────────────────────────
// MOBILE — 390 wide, V3 language, bottom tab bar
// ─────────────────────────────────────────────
function TerminalMobile() {
  const [theme, toggleTheme] = useTheme("dark");
  const c = TerminalPalette(theme);
  const containerRef = React.useRef(null);
  const [active, setActive] = React.useState("hero");
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [openCaseIdx, setOpenCaseIdx] = React.useState(0);

  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const sections = root.querySelectorAll("[data-section]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.dataset.section); });
    }, { root, threshold: 0.4 });
    sections.forEach(s => io.observe(s));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    const root = containerRef.current;
    const t = root?.querySelector(`[data-section="${id}"]`);
    if (t) root.scrollTo({ top: t.offsetTop - 4, behavior: "smooth" });
    setMenuOpen(false);
  };

  const MOB_NAV = [
    { id: "hero", label: "Home", icon: "◦" },
    { id: "work", label: "Work", icon: "▣" },
    { id: "services", label: "Build", icon: "◇" },
    { id: "process", label: "How", icon: "≡" },
    { id: "contact", label: "Talk", icon: "→" },
  ];

  return (
    <div ref={containerRef} style={{
      width: "100%", height: "100%",
      background: c.bg, color: c.fg,
      fontFamily: termStyles.fontBody,
      overflow: "auto", position: "relative",
      transition: `background 350ms ${TERM_EASE}, color 350ms ${TERM_EASE}`,
      backgroundImage: `linear-gradient(${c.line} 1px, transparent 1px), linear-gradient(90deg, ${c.line} 1px, transparent 1px)`,
      backgroundSize: "32px 32px",
    }}>
      <ScrollProgress containerRef={containerRef} color={c.accent} thickness={1} />

      {/* top chrome */}
      <header style={{
        position: "sticky", top: 0, zIndex: 30,
        background: c.bg, borderBottom: `1px solid ${c.line}`,
        padding: "10px 16px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ color: c.fg }}>leandrosoria.dev</span>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#7fd37f", marginRight: 6 }}/>q3-26</span>
          <button onClick={toggleTheme} style={{
            all: "unset", cursor: "pointer",
            padding: "2px 8px", border: `1px solid ${c.line}`, borderRadius: 4,
          }}>{theme === "dark" ? "◐" : "◑"}</button>
          <button onClick={() => setMenuOpen(v => !v)} style={{
            all: "unset", cursor: "pointer",
            padding: "2px 8px", border: `1px solid ${c.line}`, borderRadius: 4,
          }}>{menuOpen ? "×" : "☰"}</button>
        </div>
      </header>

      {/* expanding menu */}
      <div style={{
        maxHeight: menuOpen ? 320 : 0, overflow: "hidden",
        transition: `max-height 320ms ${TERM_EASE}`,
        borderBottom: menuOpen ? `1px solid ${c.line}` : "none",
        background: c.panel,
      }}>
        {[["hero","01","Index"],["about","02","About"],["work","03","Work"],["services","04","Services"],["process","05","Process"],["stack","06","Stack"],["writing","07","Writing"],["contact","08","Contact"]].map(([id, n, label]) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            all: "unset", cursor: "pointer", width: "100%", boxSizing: "border-box",
            padding: "12px 16px", display: "grid",
            gridTemplateColumns: "32px 1fr auto",
            borderBottom: `1px solid ${c.line}`,
            fontFamily: termStyles.fontMono, fontSize: 13,
            color: active === id ? c.fg : c.dim,
          }}>
            <span style={{ color: c.dim, fontSize: 10 }}>{n}</span>
            <span>{label.toLowerCase()}</span>
            <span style={{ color: c.dim }}>→</span>
          </button>
        ))}
      </div>

      {/* HERO (mobile) */}
      <MobSection id="hero" label="01 Hero">
        <div style={{
          fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
          letterSpacing: "0.08em", marginBottom: 18,
          display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap",
        }}>
          <span style={{ padding: "3px 8px", borderRadius: 4, background: c.panel, border: `1px solid ${c.line}`, color: c.fg }}>SENIOR</span>
          <span>contractor · team-lead</span>
        </div>
        <h1 style={{
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: 44, lineHeight: 1.0, letterSpacing: "-0.035em",
          margin: 0, textWrap: "balance",
        }}>
          Senior Front-End<br/>
          Engineer <span style={{ color: c.dim }}>&</span><br/>
          CMS Architect.
        </h1>
        <p style={{ marginTop: 20, fontSize: 15, lineHeight: 1.55, color: c.fg }}>
          Building production websites for international brands.
          Five years, a hundred-plus sites, and a standard that doesn't bend.
        </p>
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
          <button onClick={() => scrollTo("work")} style={{
            all: "unset", cursor: "pointer",
            padding: "12px 16px", background: c.fg, color: c.bg,
            borderRadius: 8, fontSize: 14, fontWeight: 500, textAlign: "center",
          }}>View selected work →</button>
          <button onClick={() => scrollTo("contact")} style={{
            all: "unset", cursor: "pointer",
            padding: "12px 16px", border: `1px solid ${c.lineStrong}`,
            borderRadius: 8, fontSize: 14, textAlign: "center",
          }}>Book an intro call</button>
        </div>

        {/* mobile system card */}
        <div style={{
          marginTop: 28, border: `1px solid ${c.line}`, borderRadius: 10,
          background: c.panel, fontFamily: termStyles.fontMono, fontSize: 12,
          overflow: "hidden",
        }}>
          <div style={{
            padding: "10px 12px", borderBottom: `1px solid ${c.line}`,
            color: c.dim, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase",
            display: "flex", justifyContent: "space-between",
          }}>
            <span>system / status</span><span>· live</span>
          </div>
          {[
            ["name", PROFILE.name],
            ["role", "Senior FE · CMS Architect"],
            ["exp", "5+ years"],
            ["shipped", "100+ sites"],
            ["lead", "15 engineers"],
            ["cert", "HubSpot · RealTrends '22"],
            ["slots", "2 · Q3 2026"],
          ].map(([k, v]) => (
            <div key={k} style={{
              display: "grid", gridTemplateColumns: "66px 1fr",
              padding: "8px 12px", borderBottom: `1px solid ${c.line}`,
            }}>
              <span style={{ color: c.dim }}>{k}</span>
              <span style={{ color: c.fg }}>{v}</span>
            </div>
          ))}
        </div>
      </MobSection>

      {/* ABOUT */}
      <MobSection id="about" label="02 About" n="02">
        <h2 style={{
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: 28, letterSpacing: "-0.025em", lineHeight: 1.15,
          margin: 0, textWrap: "pretty",
        }}>
          I build marketing sites that survive the second year
          <span style={{ color: c.dim }}> — when the original team rotated out and the brand pivoted twice.</span>
        </h2>
        <p style={{ marginTop: 18, fontSize: 14, lineHeight: 1.6 }}>
          Past: Team Lead of 15 engineers at Luxury Presence.
          Now independent — two engagements per quarter for clients who
          care how the site ages.
        </p>
        {/* trust */}
        <div style={{
          marginTop: 24, border: `1px solid ${c.line}`, borderRadius: 10,
          background: c.panel, overflow: "hidden",
        }}>
          {CREDENTIALS.map((cr, i) => (
            <div key={i} style={{
              padding: "14px 14px",
              borderBottom: i < CREDENTIALS.length - 1 ? `1px solid ${c.line}` : "none",
              display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center",
            }}>
              <div>
                <div style={{
                  fontFamily: termStyles.fontMono, fontSize: 9, color: c.dim,
                  letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4,
                }}>{cr.label}</div>
                <div style={{ color: c.dim, fontSize: 11 }}>{cr.meta}</div>
              </div>
              <div style={{
                fontFamily: termStyles.fontDisplay, fontWeight: 500,
                fontSize: 22, letterSpacing: "-0.02em",
              }}>{cr.value}</div>
            </div>
          ))}
        </div>
      </MobSection>

      {/* WORK — mobile cards */}
      <MobSection id="work" label="03 Work" n="03">
        <SectionMobHead c={c} n="03" label="selected work" meta={`${WORK.length} entries`}/>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          {WORK.map((w, i) => {
            const [ref, shown] = useReveal(i * 80);
            const expanded = openCaseIdx === i;
            return (
              <article key={w.id} ref={ref} onClick={() => setOpenCaseIdx(expanded ? -1 : i)} style={{
                border: `1px solid ${c.line}`, borderRadius: 12, overflow: "hidden",
                background: c.panel, ...revealStyle(shown, 10),
              }}>
                <div style={{
                  padding: "10px 14px",
                  borderBottom: `1px solid ${c.line}`,
                  display: "flex", justifyContent: "space-between",
                  fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                }}>
                  <span style={{ color: c.fg }}>№ {w.index}</span>
                  <span>{w.year}</span>
                </div>
                <div style={{
                  height: 200, position: "relative", overflow: "hidden",
                  background: w.swatch,
                }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.02) 0 10px, transparent 10px 20px)",
                  }}/>
                  <div style={{
                    position: "absolute", top: 12, left: 12, right: 12, height: 20, borderRadius: 4,
                    background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", padding: "0 8px",
                    fontFamily: termStyles.fontMono, fontSize: 9, color: "rgba(255,255,255,0.6)",
                  }}>
                    {w.client.toLowerCase().replace(/\s+/g, "")}.com
                  </div>
                  <div style={{
                    position: "absolute", bottom: 14, left: 16, right: 16,
                    color: "rgba(255,255,255,0.95)",
                  }}>
                    <div style={{
                      fontFamily: termStyles.fontDisplay, fontSize: 30, fontWeight: 500,
                      letterSpacing: "-0.02em", lineHeight: 1,
                    }}>{w.client}</div>
                  </div>
                </div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 13, lineHeight: 1.5, color: c.fg }}>{w.title}</div>
                  <div style={{
                    marginTop: 10, display: "flex", flexWrap: "wrap", gap: 4,
                    fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                  }}>
                    {w.stack.map(s => (
                      <span key={s} style={{
                        padding: "2px 8px", borderRadius: 3,
                        border: `1px solid ${c.line}`, background: c.bg,
                      }}>{s}</span>
                    ))}
                  </div>
                  {/* expanded content */}
                  <div style={{
                    maxHeight: expanded ? 240 : 0, overflow: "hidden",
                    transition: `max-height 400ms ${TERM_EASE}`,
                  }}>
                    <div style={{
                      marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.line}`,
                      fontSize: 13, lineHeight: 1.55, color: c.fg,
                    }}>
                      {w.summary}
                      {w.award && (
                        <div style={{
                          marginTop: 10, fontFamily: termStyles.fontMono, fontSize: 11,
                          letterSpacing: "0.08em",
                        }}>★ {w.award}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div style={{
                  padding: "10px 14px", borderTop: `1px solid ${c.line}`,
                  display: "flex", justifyContent: "space-between",
                  fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
                }}>
                  <span>{w.role.toLowerCase()}</span>
                  <span style={{ color: c.fg }}>{expanded ? "close −" : "details +"}</span>
                </div>
              </article>
            );
          })}
        </div>
      </MobSection>

      {/* SERVICES — stacked cards */}
      <MobSection id="services" label="04 Services" n="04">
        <SectionMobHead c={c} n="04" label="what i build" meta="4 engagements"/>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
          {SERVICES.map((s, i) => {
            const [ref, shown] = useReveal(i * 80);
            return (
              <div key={s.n} ref={ref} style={{
                border: `1px solid ${c.line}`, borderRadius: 10,
                background: c.panel, padding: 18, ...revealStyle(shown),
              }}>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                  letterSpacing: "0.08em", marginBottom: 10,
                }}>
                  <span>/service/{s.n}</span>
                  <span style={{
                    padding: "2px 8px", border: `1px solid ${c.line}`, borderRadius: 3,
                    background: c.kbdBg, color: c.fg,
                  }}>active</span>
                </div>
                <div style={{
                  fontFamily: termStyles.fontDisplay, fontWeight: 500,
                  fontSize: 20, letterSpacing: "-0.02em", lineHeight: 1.2,
                }}>{s.title}</div>
                <p style={{ fontSize: 13, lineHeight: 1.55, color: c.fg, marginTop: 8, marginBottom: 0 }}>
                  {s.body}
                </p>
                <div style={{
                  marginTop: 12, display: "flex", flexWrap: "wrap", gap: 4,
                  fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                }}>
                  {s.deliverables.map(d => (
                    <span key={d} style={{
                      padding: "2px 8px", borderRadius: 3,
                      border: `1px solid ${c.line}`, background: c.bg,
                    }}>{d}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </MobSection>

      {/* PROCESS mobile */}
      <MobSection id="process" label="05 Process" n="05">
        <SectionMobHead c={c} n="05" label="how i work" meta="~5 weeks typical"/>
        <ol style={{ listStyle: "none", margin: "16px 0 0", padding: 0, position: "relative" }}>
          <div style={{ position: "absolute", left: 12, top: 8, bottom: 8, width: 1, background: c.line }}/>
          {PROCESS_STEPS.map((s, i) => {
            const [ref, shown] = useReveal(i * 90);
            return (
              <li key={s.n} ref={ref} style={{
                position: "relative", paddingLeft: 40, paddingBottom: 18,
                ...revealStyle(shown, 10),
              }}>
                <span style={{
                  position: "absolute", left: 4, top: 2,
                  width: 18, height: 18, borderRadius: "50%",
                  background: c.bg, border: `1px solid ${c.lineStrong}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: termStyles.fontMono, fontSize: 9, color: c.fg,
                }}>{s.n}</span>
                <div style={{
                  border: `1px solid ${c.line}`, borderRadius: 10,
                  background: c.panel, padding: "14px 16px",
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    marginBottom: 6,
                  }}>
                    <div style={{
                      fontFamily: termStyles.fontDisplay, fontWeight: 500,
                      fontSize: 18, letterSpacing: "-0.02em",
                    }}>{s.title}</div>
                    <span style={{
                      fontFamily: termStyles.fontMono, fontSize: 9, color: c.fg,
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      padding: "2px 7px", borderRadius: 3,
                      background: c.kbdBg, border: `1px solid ${c.line}`,
                    }}>{s.status}</span>
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: c.fg, margin: 0 }}>{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </MobSection>

      {/* STACK — accordion-like columns stacked */}
      <MobSection id="stack" label="06 Stack" n="06">
        <SectionMobHead c={c} n="06" label="technical stack"/>
        <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
          {STACK.map(g => (
            <div key={g.cat} style={{
              border: `1px solid ${c.line}`, borderRadius: 10, overflow: "hidden",
              background: c.panel,
            }}>
              <div style={{
                padding: "10px 14px", borderBottom: `1px solid ${c.line}`,
                display: "flex", justifyContent: "space-between",
                fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                <span style={{ color: c.fg }}>{g.cat}</span>
                <span>{String(g.items.length).padStart(2, "0")}</span>
              </div>
              <div style={{ padding: "4px 14px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
                {g.items.map(it => (
                  <span key={it} style={{
                    padding: "4px 10px", borderRadius: 999,
                    background: c.bg, border: `1px solid ${c.line}`,
                    fontFamily: termStyles.fontMono, fontSize: 11, color: c.fg,
                  }}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MobSection>

      {/* WRITING */}
      <MobSection id="writing" label="07 Writing" n="07">
        <SectionMobHead c={c} n="07" label="writing" meta="forthcoming"/>
        <div style={{ marginTop: 12 }}>
          {WRITING.map((w, i) => (
            <div key={i} style={{
              padding: "14px 0",
              borderTop: `1px solid ${c.line}`,
              borderBottom: i === WRITING.length - 1 ? `1px solid ${c.line}` : "none",
            }}>
              <div style={{
                fontFamily: termStyles.fontDisplay, fontSize: 18, fontWeight: 500,
                letterSpacing: "-0.01em", color: c.fg,
              }}>{w.title}</div>
              <div style={{
                marginTop: 6, display: "flex", justifyContent: "space-between",
                fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
                letterSpacing: "0.08em",
              }}>
                <span>{w.kind.toLowerCase()}</span>
                <span>{w.date}</span>
              </div>
            </div>
          ))}
        </div>
      </MobSection>

      {/* CONTACT */}
      <MobSection id="contact" label="08 Contact" n="08">
        <SectionMobHead c={c} n="08" label="contact"/>
        <h2 style={{
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: 36, letterSpacing: "-0.035em", lineHeight: 1.0,
          margin: "20px 0 0",
        }}>
          2 engagements<br/>
          <span style={{ color: c.dim }}>available Q3 2026.</span>
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 14 }}>
          Write directly. I reply within one business day with either a
          scoping call or a referral to someone better suited.
        </p>
        <MobileCopyEmail c={c}/>
        {/* channels */}
        <div style={{
          marginTop: 20, border: `1px solid ${c.line}`, borderRadius: 10,
          overflow: "hidden", background: c.panel,
          fontFamily: termStyles.fontMono, fontSize: 12,
        }}>
          {[
            ["linkedin", "/in/leandrosoria"],
            ["github",   "@leandrosoria"],
            ["read.cv",  "leandrosoria"],
            ["intro",    "cal.com/leandrosoria/30"],
          ].map(([k, v], i, arr) => (
            <div key={k} style={{
              padding: "12px 14px",
              borderBottom: i < arr.length - 1 ? `1px solid ${c.line}` : "none",
              display: "grid", gridTemplateColumns: "90px 1fr",
            }}>
              <span style={{ color: c.dim }}>{k}</span>
              <span style={{ color: c.fg }}>{v}</span>
            </div>
          ))}
        </div>
      </MobSection>

      <footer style={{
        padding: "20px 16px 100px",
        display: "grid", gridTemplateColumns: "1fr 1fr",
        fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
        letterSpacing: "0.06em", gap: 6,
      }}>
        <div>© 2026 L. Soria</div>
        <div style={{ textAlign: "right" }}>v03m · Terminal</div>
        <div>build 2026.04.22</div>
        <div style={{ textAlign: "right" }}>end-of-document</div>
      </footer>

      {/* bottom tab bar */}
      <nav style={{
        position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 20,
        background: c.bg, borderTop: `1px solid ${c.lineStrong}`,
        padding: "8px 6px calc(8px + env(safe-area-inset-bottom, 0px))",
        display: "grid", gridTemplateColumns: `repeat(${MOB_NAV.length}, 1fr)`,
        marginTop: -76,
      }}>
        {MOB_NAV.map(n => (
          <button key={n.id} onClick={() => scrollTo(n.id)} style={{
            all: "unset", cursor: "pointer",
            padding: "8px 4px", textAlign: "center",
            fontFamily: termStyles.fontMono, fontSize: 10,
            color: active === n.id ? c.fg : c.dim,
            letterSpacing: "0.06em", transition: `color 200ms ${TERM_EASE}`,
          }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{n.icon}</div>
            <div>{n.label.toLowerCase()}</div>
          </button>
        ))}
      </nav>
    </div>
  );
}

function MobSection({ id, label, children }) {
  return (
    <section data-section={id} data-screen-label={label} style={{
      padding: "36px 16px",
      borderBottom: "1px solid rgba(236,232,221,0.08)",
    }}>
      <div className="container">{children}</div>
    </section>
  );
}

function SectionMobHead({ c, n, label, meta }) {
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      paddingBottom: 10, borderBottom: `1px solid ${c.line}`,
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <span style={{
          fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
          letterSpacing: "0.1em", textTransform: "uppercase",
        }}>§{n}</span>
        <h2 style={{
          fontFamily: termStyles.fontDisplay, fontWeight: 500,
          fontSize: 20, letterSpacing: "-0.02em", margin: 0,
        }}>{label}</h2>
      </div>
      {meta && <span style={{
        fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
      }}>{meta}</span>}
    </div>
  );
}

function MobileCopyEmail({ c }) {
  const [copied, setCopied] = React.useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button onClick={copy} style={{
      all: "unset", cursor: "pointer", marginTop: 22,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 18px", borderRadius: 10,
      background: c.fg, color: c.bg,
      fontFamily: termStyles.fontMono, fontSize: 13, width: "100%", boxSizing: "border-box",
    }}>
      <span>{copied ? "copied ✓" : PROFILE.email}</span>
      <span style={{ fontSize: 11, opacity: 0.6 }}>{copied ? "" : "copy"}</span>
    </button>
  );
}

Object.assign(window, { TerminalVariantV2, TerminalMobile });

// ─────────────────────────────────────────────
// V3.1 FOOTER — sitemap + brand closer
// ─────────────────────────────────────────────
function TermFooterV2({ c, scrollTo }) {
  return (
    <footer style={{
      padding: "80px 24px 24px",
      borderTop: `1px solid ${c.line}`,
      background: c.bg,
    }}>
      {/* Giant wordmark */}
      <div style={{
        fontFamily: termStyles.fontDisplay, fontWeight: 500,
        fontSize: "clamp(72px, 13vw, 220px)",
        letterSpacing: "-0.05em", lineHeight: 0.9,
        margin: 0, color: c.fg,
        borderBottom: `1px solid ${c.line}`,
        paddingBottom: 40, marginBottom: 40,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        gap: 40, flexWrap: "wrap",
      }}>
        <span>Leandro Soria.</span>
        <span style={{
          fontFamily: termStyles.fontMono, fontSize: 12,
          color: c.dim, letterSpacing: "0.08em",
          textTransform: "uppercase", alignSelf: "flex-end",
          paddingBottom: 8, whiteSpace: "nowrap",
        }}>↑ back to top</span>
      </div>

      {/* Sitemap grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32,
        paddingBottom: 32, borderBottom: `1px solid ${c.line}`,
      }}>
        <FooterCol c={c} title="index" items={[
          ["About",   () => scrollTo?.("about")],
          ["Work",    () => scrollTo?.("work")],
          ["Services", () => scrollTo?.("services")],
          ["Process", () => scrollTo?.("process")],
          ["Stack",   () => scrollTo?.("stack")],
          ["Writing", () => scrollTo?.("writing")],
        ]}/>
        <FooterCol c={c} title="elsewhere" items={[
          ["LinkedIn /in/leandrosoria",  null],
          ["GitHub @leandrosoria",       null],
          ["Read.cv/leandrosoria",       null],
          ["Cal.com/leandrosoria/30",    null],
        ]}/>
        <FooterCol c={c} title="colophon" items={[
          ["Inter · JetBrains Mono", null],
          ["No frameworks harmed",    null],
          ["Hand-built in React",     null],
          ["Buenos Aires · GMT-3",    null],
        ]}/>
        <div>
          <div style={{
            fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
            letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14,
          }}>now</div>
          <div style={{
            fontFamily: termStyles.fontMono, fontSize: 12, lineHeight: 1.7,
            color: c.fg,
          }}>
            <div><span style={{ color: c.dim }}>mon–fri  </span>deep work 09→14 GMT-3</div>
            <div><span style={{ color: c.dim }}>reply eta  </span>&lt; 24h business days</div>
            <div style={{ marginTop: 8 }}>
              <span style={{
                display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                background: "#7fd37f", marginRight: 8, verticalAlign: "middle",
              }}/>
              2 slots · Q3 2026
            </div>
          </div>
        </div>
      </div>

      {/* Meta row */}
      <div style={{
        paddingTop: 24,
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        fontFamily: termStyles.fontMono, fontSize: 11, color: c.dim,
        letterSpacing: "0.06em",
      }}>
        <div>© 2026 Leandro Soria</div>
        <div>v03.1 · The Terminal</div>
        <div>build 2026.04.22</div>
        <div style={{ textAlign: "right" }}>end-of-document</div>
      </div>
    </footer>
  );
}

function FooterCol({ c, title, items }) {
  return (
    <div>
      <div style={{
        fontFamily: termStyles.fontMono, fontSize: 10, color: c.dim,
        letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 14,
      }}>{title}</div>
      <div style={{
        fontFamily: termStyles.fontMono, fontSize: 12, lineHeight: 1.9,
      }}>
        {items.map(([label, onClick], i) => (
          <div key={i}>
            <button
              data-cursor
              onClick={onClick || undefined}
              style={{
                all: "unset", cursor: onClick ? "pointer" : "default",
                color: c.fg,
                borderBottom: "1px solid transparent",
                transition: `border-color 150ms ${TERM_EASE}, color 150ms ${TERM_EASE}`,
              }}
              onMouseEnter={(e) => { if (onClick) e.currentTarget.style.borderBottomColor = c.fg; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderBottomColor = "transparent"; }}
            >
              {label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Expose variants to window so Portfolio.html can use them across Babel scripts
Object.assign(window, { TerminalVariantV2, TerminalMobile });


export { TerminalVariantV2 };
export { TerminalMobile };
export { TermProcess };
