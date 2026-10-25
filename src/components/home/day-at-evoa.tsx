"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { seededChips } from "@/lib/patterns";

interface Stop {
  id: string;
  time: string;
  start: number;
  at: number;
  title: string;
  room: string;
  accent: string;
  accentText: string;
  text: string;
  session: { name: string; length: string; level: string };
}

// `start` = scroll progress where the stop becomes active; `at` = where its time sits on the rail.
const STOPS: Stop[] = [
  {
    id: "first-light",
    time: "06:30",
    start: 0,
    at: 0,
    title: "First Light.",
    room: "The Reform Room",
    accent: "var(--color-terracotta)",
    accentText: "var(--color-rust)",
    text: "The doors open to low sun and warm sconces. Eight reformers, no music, no mirrors. The day's first class begins in near-silence.",
    session: { name: "Reformer Foundations", length: "50 min", level: "All levels" },
  },
  {
    id: "morning",
    time: "09:30",
    start: 0.15,
    at: 0.222,
    title: "Morning.",
    room: "The Mat Vault",
    accent: "var(--color-teak)",
    accentText: "var(--color-teak)",
    text: "Clean light across the floor. Classical mat work, paced by breath rather than a playlist.",
    session: { name: "Classical Mat", length: "55 min", level: "Intermediate" },
  },
  {
    id: "midday",
    time: "12:30",
    start: 0.36,
    at: 0.444,
    title: "Midday.",
    room: "The Recovery Bar",
    accent: "var(--color-sage)",
    accentText: "var(--color-sage-700)",
    text: "The room is at its brightest. Step away from the work, take something cold and slow, and let the body catch up.",
    session: { name: "Recovery Reset", length: "30 min", level: "All members" },
  },
  {
    id: "golden-hour",
    time: "17:30",
    start: 0.7,
    at: 0.815,
    title: "Golden Hour.",
    room: "The Reform Room",
    accent: "var(--color-terracotta)",
    accentText: "var(--color-rust)",
    text: "Long light returns and the room turns amber. The evening sessions run slower by design.",
    session: { name: "Reformer Flow", length: "50 min", level: "Intermediate" },
  },
  {
    id: "after-dark",
    time: "20:00",
    start: 0.9,
    at: 1,
    title: "After Dark.",
    room: "The Quiet Room",
    accent: "var(--color-deep-green)",
    accentText: "var(--color-deep-green)",
    text: "Sconces on, devices left at the door. The last hour of the day belongs to stillness.",
    session: { name: "Breath & Stillness", length: "40 min", level: "All levels" },
  },
];

const C = {
  peachSoft: "#f0e8d6",
  mint: "#b9c5b1",
  cream: "#f3ede3",
  haze: "#eadfc4",
  peach: "#e6dcc6",
  terracotta: "#c4a96a",
  forest: "#232c14",
};

const ARCH = "M230 400 V210 A170 170 0 0 1 570 210 V400 Z";
const CHIP_TONES = ["fill-sage", "fill-teak", "fill-bone", "fill-terracotta"];

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);

function useShadow(s: MotionValue<number>, left: number, right: number, height: number) {
  return useTransform(s, (v) => {
    const len = 220 * (1 - 2 * clamp01(v)) * (height / 150);
    return `M${left} 470 L${right} 470 L${right + len} 492 L${left + len} 492 Z`;
  });
}

function DayScene({ p }: { p: MotionValue<number> }) {
  const uid = React.useId().replace(/:/g, "");
  const chips = React.useMemo(() => seededChips(11, 46, 800, 160, 4, 11, CHIP_TONES.length), []);

  // sun clears the hills at first light, arcs over the room, and sets behind them at ~19:30
  const s = useTransform(p, (v) => 0.03 + 1.02 * (clamp01(v) / 0.93));
  const sunX = useTransform(s, (v) => 270 + 260 * v);
  const sunY = useTransform(s, (v) => 360 - 250 * Math.sin(Math.PI * v));

  const sky = useTransform(
    p,
    [0, 0.21, 0.43, 0.65, 0.79, 0.9, 0.97],
    [C.peachSoft, C.mint, C.cream, C.haze, C.peach, C.terracotta, C.forest]
  );
  const warmTint = useTransform(p, [0, 0.5, 0.79, 1], [C.peach, C.peach, C.terracotta, C.terracotta]);
  const warmOpacity = useTransform(p, [0, 0.12, 0.3, 0.55, 0.7, 0.8, 0.9], [0.34, 0.14, 0, 0, 0.22, 0.3, 0.12]);
  const nightOpacity = useTransform(p, [0, 0.84, 0.93, 1], [0, 0, 0.52, 0.6]);
  const lampOn = useTransform(p, [0, 0.1, 0.22, 0.84, 0.93, 1], [0.9, 0.5, 0, 0, 0.9, 1]);
  const shadowOpacity = useTransform(p, [0, 0.04, 0.86, 0.92], [0.14, 0.22, 0.22, 0]);

  const patch = useTransform(sunX, (x) => {
    const off = (400 - x) * 1.5;
    return `230,400 570,400 ${590 + off},560 ${210 + off},560`;
  });
  const patchOpacity = useTransform(s, (v) => (v < 0 || v > 1 ? 0 : 0.12 + 0.45 * Math.sin(Math.PI * v)));

  const moonX = useTransform(p, [0.9, 1], [360, 430]);
  const moonY = useTransform(p, [0.9, 1], [290, 150]);
  const moonOpacity = useTransform(p, [0.9, 0.95, 1], [0, 1, 1]);

  const shBall = useShadow(s, 83, 167, 84);
  const shBench = useShadow(s, 190, 320, 50);
  const shArch = useShadow(s, 600, 690, 115);
  const shPillar = useShadow(s, 722, 768, 160);

  return (
    <svg
      viewBox="0 0 800 560"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="An illustrated Evoa room as the light moves from first light to after dark"
      className="h-full w-full"
    >
      <defs>
        <pattern id={`${uid}-stack`} width="36" height="108" patternUnits="userSpaceOnUse">
          <rect width="36" height="108" className="fill-mint" />
          <rect width="36" height="1.6" className="fill-forest" opacity="0.28" />
          <rect width="1.6" height="108" className="fill-forest" opacity="0.28" />
        </pattern>
        <clipPath id={`${uid}-arch`}>
          <path d={ARCH} />
        </clipPath>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor="#e6dcc6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#e6dcc6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* wall: stack-bond tile */}
      <rect width="800" height="400" fill={`url(#${uid}-stack)`} />

      {/* window: sky, sun, hills */}
      <g clipPath={`url(#${uid}-arch)`}>
        <motion.rect x="225" y="35" width="350" height="370" style={{ fill: sky }} />
        <motion.g style={{ x: sunX, y: sunY }}>
          <circle r="46" className="fill-peach" opacity="0.5" />
          <circle r="27" className="fill-spark" />
        </motion.g>
        <circle cx="330" cy="440" r="112" className="fill-sage" />
        <circle cx="480" cy="455" r="128" className="fill-sage-700" />
      </g>

      {/* floor */}
      <rect y="400" width="800" height="160" fill="#ebdfc6" />
      <g transform="translate(0 400)" opacity="0.6">
        {chips.map((c, i) => (
          <polygon key={i} points={c.points} className={CHIP_TONES[c.tone]} />
        ))}
      </g>
      <rect y="396" width="800" height="8" className="fill-forest" opacity="0.2" />

      {/* light patch + hard shadows */}
      <motion.polygon points={patch} className="fill-bone" style={{ opacity: patchOpacity }} />
      <motion.path d={shBall} className="fill-forest" style={{ opacity: shadowOpacity }} />
      <motion.path d={shBench} className="fill-forest" style={{ opacity: shadowOpacity }} />
      <motion.path d={shArch} className="fill-forest" style={{ opacity: shadowOpacity }} />
      <motion.path d={shPillar} className="fill-forest" style={{ opacity: shadowOpacity }} />

      {/* objects */}
      <circle cx="125" cy="428" r="42" className="fill-sage" />
      <rect x="190" y="420" width="130" height="50" className="fill-deep-green" />
      <rect x="190" y="420" width="130" height="6" className="fill-bone" opacity="0.18" />
      <path d="M600 470 V400 A45 45 0 0 1 690 400 V470 Z" className="fill-terracotta" />
      <rect x="722" y="310" width="46" height="160" className="fill-teak" />

      {/* ambient light */}
      <motion.rect width="800" height="560" style={{ fill: warmTint, opacity: warmOpacity, mixBlendMode: "multiply" }} />
      <motion.rect width="800" height="560" className="fill-forest" style={{ opacity: nightOpacity }} />

      {/* moon + frame */}
      <g clipPath={`url(#${uid}-arch)`}>
        <motion.g style={{ x: moonX, y: moonY, opacity: moonOpacity }}>
          <circle r="30" className="fill-bone" />
          <circle cx="12" cy="-7" r="26" className="fill-forest" />
        </motion.g>
      </g>
      <path d={ARCH} fill="none" strokeWidth="12" className="stroke-cream" />
      <rect x="214" y="396" width="372" height="12" className="fill-cream" />

      {/* sconces */}
      {[120, 680].map((x) => (
        <g key={x}>
          <motion.circle cx={x} cy="170" r="170" fill={`url(#${uid}-glow)`} style={{ opacity: lampOn }} />
          <circle cx={x} cy="170" r="28" className="fill-peach" />
          <circle cx={x} cy="170" r="12" className="fill-bone" />
        </g>
      ))}
      <motion.ellipse cx="125" cy="470" rx="150" ry="30" fill={`url(#${uid}-glow)`} style={{ opacity: lampOn }} />
      <motion.ellipse cx="675" cy="470" rx="150" ry="30" fill={`url(#${uid}-glow)`} style={{ opacity: lampOn }} />
    </svg>
  );
}

function Clock({ p }: { p: MotionValue<number> }) {
  const [label, setLabel] = React.useState("06:30");
  useMotionValueEvent(p, "change", (v) => {
    const total = 390 + Math.round((clamp01(v) * 810) / 5) * 5;
    const next = `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
    setLabel((prev) => (prev === next ? prev : next));
  });
  return (
    <div
      aria-hidden="true"
      className="font-title text-[64px] sm:text-[96px] lg:text-[128px] max-md:compact:text-[52px] short:text-[52px] font-light leading-none tabular-nums tracking-tight text-ink"
    >
      {label}
    </div>
  );
}

export function DayAtEvoa() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const [active, setActive] = React.useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    let idx = 0;
    for (let i = 0; i < STOPS.length; i++) if (v >= STOPS[i].start) idx = i;
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const knobLeft = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const fillWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const stop = STOPS[active];

  const goTo = (at: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    window.scrollTo({ top: top + at * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  return (
    <section id="day" data-header-theme="light" className="relative w-full bg-mint text-ink">
      <div ref={containerRef} className="relative h-[430vh]">
        <div className="sticky top-0 flex h-[100dvh] w-full flex-col px-6 pb-5 pt-20 [--scene-h:38dvh] sm:px-10 sm:pb-8 sm:pt-24 md:px-14 md:pt-28 md:[--scene-h:36dvh] lg:px-20 max-md:compact:pb-3 max-md:compact:pt-[72px] compact:[--scene-h:30dvh] short:px-6 short:pb-3 short:pt-[84px]">
          <div className="flex w-full shrink-0 flex-col gap-2 pb-3 sm:pb-5 lg:flex-row lg:items-end lg:justify-between lg:pb-6 short:pb-2">
            <h2 className="font-display text-[38px] font-light leading-[1.1] tracking-normal sm:text-[52px] md:text-[64px] lg:text-[72px] max-md:compact:text-[32px] short:text-[26px]">
              A Day at Evoa
            </h2>
            <p className="font-script text-[22px] leading-none text-rust sm:text-[26px] short:hidden">
              from 6:30 to 8:00<span className="hidden sm:inline">, scroll to move the sun</span>
            </p>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-1 [align-content:center] items-start gap-4 lg:grid-cols-12 lg:items-center lg:gap-14 short:grid-cols-12 short:items-center short:gap-6">
            <div className="order-2 flex flex-col gap-3 sm:gap-5 lg:order-1 lg:col-span-5 compact:gap-2 short:order-1 short:col-span-5">
              <Clock p={scrollYProgress} />

              <div className="min-h-[150px] sm:min-h-[180px] lg:min-h-[240px] max-md:compact:min-h-[128px] lg:compact:min-h-[180px] short:min-h-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stop.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col gap-2 sm:gap-3"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stop.accent }} />
                      <span
                        className="font-sans text-[11px] font-medium uppercase tracking-[0.24em] sm:text-[12px]"
                        style={{ color: stop.accentText }}
                      >
                        {stop.room}
                      </span>
                    </div>
                    <h3 className="font-title text-[34px] font-normal leading-[1.05] tracking-[-0.01em] text-ink sm:text-[46px] lg:text-[56px] short:text-[30px]">
                      {stop.title}
                    </h3>
                    <p className="max-w-md font-sans text-[13.5px] font-light leading-relaxed text-ink/75 sm:text-[15.5px] short:text-[12.5px]">
                      {stop.text}
                    </p>
                    <dl className="mt-2 hidden max-w-md grid-cols-[1.6fr_1fr_1fr] gap-4 border-t border-ink/15 pt-3 lg:grid compact:hidden short:hidden">
                      {(
                        [
                          ["Class", stop.session.name],
                          ["Length", stop.session.length],
                          ["Level", stop.session.level],
                        ] as const
                      ).map(([label, value]) => (
                        <div key={label} className="flex flex-col gap-1">
                          <dt className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink/60">{label}</dt>
                          <dd className="font-sans text-[13.5px] font-light leading-snug text-ink">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative mt-1 h-11 w-full select-none">
                <div className="absolute left-0 right-0 top-3 h-px bg-ink/20" />
                <motion.div className="absolute left-0 top-3 h-px bg-ink" style={{ width: fillWidth }} />
                {STOPS.map((st, i) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => goTo(st.at)}
                    aria-label={`Jump to ${st.time}, ${st.title}`}
                    className={`absolute top-0 flex flex-col gap-1.5 text-ink/50 transition-colors hover:text-ink ${
                      i === 0
                        ? "items-start"
                        : i === STOPS.length - 1
                          ? "-translate-x-full items-end"
                          : "-translate-x-1/2 items-center"
                    }`}
                    style={{ left: `${st.at * 100}%` }}
                  >
                    <span
                      className={`mt-[9px] h-1.5 w-1.5 rounded-full transition-colors ${i <= active ? "bg-ink" : "bg-ink/25"}`}
                    />
                    <span className={`font-sans text-[10px] tracking-[0.14em] ${i === active ? "text-ink" : ""}`}>{st.time}</span>
                  </button>
                ))}
                <motion.span
                  aria-hidden="true"
                  className="absolute top-[12px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark ring-4 ring-mint"
                  style={{ left: knobLeft }}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 48, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-1 mx-auto aspect-[10/7] w-[min(100%,calc(var(--scene-h)*1.4286))] overflow-hidden rounded-2xl border-2 shadow-[0_20px_45px_rgba(35,43,27,0.1)] transition-colors duration-500 sm:rounded-3xl lg:order-2 lg:col-span-7 lg:ml-auto lg:mr-0 lg:w-[min(100%,calc((100dvh_-_260px)*1.4286))] short:order-2 short:col-span-7 short:ml-auto short:mr-0 short:w-[min(100%,calc((100dvh_-_130px)*1.4286))]"
              style={{ borderColor: stop.accent }}
            >
              <DayScene p={scrollYProgress} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
