"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Four nested arches, the same doorway shape as the logo and the Room section. Awareness is the small arch in the middle
   and each principle widens it, so the diagram reads as awareness rising outward. Pointing at an arch (or choosing a name
   underneath) brings its principle forward, and it keeps walking outward by itself every few seconds (choosing one just
   restarts the clock). Only keyboard focus pauses it. */
const principles = [
  {
    label: "Awareness",
    title: "Awareness before effort.",
    text: "Every sequence begins by noticing: breath, weight, alignment. Strength built on attention lasts longer than strength built on force.",
  },
  {
    label: "Precision",
    title: "Precision over intensity.",
    text: "Smaller movements, exactly placed. We would rather you do eight honest repetitions than twenty hurried ones.",
  },
  {
    label: "Breath",
    title: "Breath is the first instrument.",
    text: "Breath sets the tempo of every class, steadies the nervous system and teaches the deep core to work without gripping.",
  },
  {
    label: "Rest",
    title: "Rest is part of the work.",
    text: "Recovery is programmed, not apologised for. Unhurried transitions, a quiet room and time to land before you leave.",
  },
];

// diagram geometry (SVG units): arches share a centre line and a ground line, and grow by 50 per principle
const VB = { x: 0, y: 40, w: 480, h: 300 };
const CX = 240;
const GROUND = 330;
const STRAIGHT = 70;
const radius = (i: number) => 64 + i * 50;
const archPath = (i: number) => {
  const r = radius(i);
  const top = GROUND - STRAIGHT;
  return `M${CX - r} ${GROUND}V${top}A${r} ${r} 0 0 1 ${CX + r} ${top}V${GROUND}Z`;
};
// where each name sits: just under the apex of its arch, as a share of the diagram's size
const labelTop = (i: number) => ((GROUND - STRAIGHT - radius(i) + 26 - VB.y) / VB.h) * 100;

// each principle has its own colour from the brand palette: gold, sand, olive, deep olive. A soft tint of it shows on the
// arch at rest (so the whole diagram runs from a warm centre to a dark outer edge) and the full colour fills the arch
// when it is the one in front. accent colours the marker in the list below; light is the label colour on the lit arch.
const tones = [
  { idle: "#c9c6a6", lit: "#ecdca4", stroke: "#c4a96a", accent: "#b08d3c", light: false },
  { idle: "#d2d4c0", lit: "#eadfc8", stroke: "#bfae86", accent: "#8a7650", light: false },
  { idle: "#b0bea9", lit: "#8fa08a", stroke: "#6f8268", accent: "#6f8268", light: false },
  { idle: "#9aa78f", lit: "#2f3a1c", stroke: "#232c14", accent: "#2f3a1c", light: true },
];

const AUTO_MS = 3500;

export function AboutPrinciples() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const blockRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(blockRef, { margin: "-15% 0px -15% 0px" });

  // walk outward on its own while it is on screen, unless motion is reduced; the timer restarts whenever the lit arch changes
  React.useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % principles.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, inView]);

  return (
    <section data-header-theme="light" className="relative w-full bg-mint pb-16 pt-20 text-ink sm:pb-24 sm:pt-28 lg:pb-32 lg:pt-36">
      <div className="w-full px-6 pb-8 sm:px-10 sm:pb-12 md:px-14 lg:px-20 lg:pb-14">
        <h2 className="max-w-md font-title text-[28px] font-normal leading-[1.15] tracking-[-0.01em] text-ink sm:text-[34px]">
          Four things we hold ourselves to, widening like a doorway.
        </h2>
      </div>

      <div
        ref={blockRef}
        className="grid items-center gap-9 px-6 sm:gap-12 sm:px-10 md:px-14 lg:grid-cols-12 lg:gap-10 lg:px-20"
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        {/* The arches */}
        <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
          <svg
            viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
            className="block h-auto w-full overflow-visible"
            aria-hidden="true"
          >
            <line x1="8" y1={GROUND} x2={VB.w - 8} y2={GROUND} stroke="#2b3220" strokeOpacity="0.22" strokeWidth="1" />
            {/* outermost first, so each smaller arch sits on top of the one around it */}
            {[3, 2, 1, 0].map((i) => (
              <motion.path
                key={i}
                d={archPath(i)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: (3 - i) * 0.08 + 0.1, ease: EASE }}
                fill={active === i ? tones[i].lit : tones[i].idle}
                stroke={active === i ? tones[i].stroke : "#2b3220"}
                strokeOpacity={active === i ? 1 : 0.16}
                strokeWidth={active === i ? 1.6 : 1}
                style={{ transition: "fill 0.7s ease, stroke 0.7s ease, stroke-opacity 0.7s ease", cursor: "pointer" }}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onClick={() => setActive(i)}
              />
            ))}
            <circle cx={CX} cy={GROUND - 42} r="6" fill="#977628" />
          </svg>

          {/* names, set under each arch's apex (plain text; the buttons below are the accessible controls) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {principles.map((p, i) => (
              <span
                key={p.label}
                style={{ top: `${labelTop(i)}%` }}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[9.5px] font-normal uppercase tracking-[0.2em] transition-colors duration-500 sm:text-[11px] sm:tracking-[0.24em]",
                  active === i ? (tones[i].light ? "text-bone" : "text-ink") : "text-ink/55"
                )}
              >
                {p.label}
              </span>
            ))}
          </div>
        </div>

        {/* The principle in front */}
        <div className="lg:col-span-6 lg:pl-10">
          <div className="grid" aria-live="polite">
            {principles.map((p, i) => (
              <motion.div
                key={p.label}
                aria-hidden={i !== active}
                initial={false}
                animate={{
                  opacity: i === active ? 1 : 0,
                  y: i === active ? 0 : 16,
                  filter: i === active ? "blur(0px)" : "blur(6px)",
                }}
                transition={{ duration: 0.7, ease: EASE }}
                className={cn("col-start-1 row-start-1", i !== active && "pointer-events-none")}
              >
                <h3 className="font-display text-[38px] font-light leading-[1.05] tracking-normal text-ink sm:text-[54px] lg:text-[clamp(46px,4.6vw,72px)]">
                  {p.title}
                </h3>
                <p className="mt-5 max-w-md font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div role="tablist" aria-label="Principles" className="mt-8 grid grid-cols-2 gap-x-4 border-t border-ink/10 pt-3 sm:mt-12 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3 sm:pt-6">
            {principles.map((p, i) => (
              <button
                key={p.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "group flex min-h-11 items-center gap-2.5 font-sans text-[11px] font-normal uppercase tracking-[0.2em] transition-colors duration-300 sm:min-h-0 sm:text-[11.5px] sm:tracking-[0.22em]",
                  i === active ? "text-ink" : "text-ink/45 hover:text-ink/75"
                )}
              >
                <span
                  aria-hidden
                  style={{ backgroundColor: tones[i].accent }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 ease-out",
                    i === active ? "w-5 opacity-100" : "w-1.5 opacity-40"
                  )}
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
