"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";

/* Classes: four mid-century "posters" + a slim first-visit bar. Replaces House Rules on the homepage.
   Class names, lengths, levels and the fine print are placeholder copy until the client confirms them. */

type ArtKey = "arch" | "wave" | "ring" | "sun";

interface StudioClass {
  id: string;
  name: string;
  length: string;
  level: string;
  intensity: 1 | 2 | 3;
  best: string;
  text: string;
  panel: string; // poster colour (palette: terracotta, sage, peach, deep green)
  art: ArtKey;
}

const CLASSES: StudioClass[] = [
  {
    id: "foundations",
    name: "Reformer Foundations",
    length: "50 min",
    level: "All levels",
    intensity: 1,
    best: "First-timers and returning clients",
    text: "Learn the machine, the springs and the principles: breath, alignment, control. The place to begin.",
    panel: "#c4a96a",
    art: "arch",
  },
  {
    id: "flow",
    name: "Reformer Flow",
    length: "50 min",
    level: "Intermediate",
    intensity: 2,
    best: "Building strength and stamina",
    text: "A continuous sequence with longer holds and fewer pauses. Strength and stability, without impact.",
    panel: "#8fa08a",
    art: "wave",
  },
  {
    id: "mat",
    name: "Classical Mat",
    length: "55 min",
    level: "Intermediate",
    intensity: 2,
    best: "Posture and deep core",
    text: "The classical floor repertoire, paced by breath. Spinal control and articulation with nothing but a mat.",
    panel: "#e6dcc6",
    art: "ring",
  },
  {
    id: "stillness",
    name: "Breath & Stillness",
    length: "40 min",
    level: "All levels",
    intensity: 1,
    best: "Stress, tension and recovery days",
    text: "Slow mobility and guided breathwork to bring the nervous system down. Nothing to prove.",
    panel: "#2f3a1c",
    art: "sun",
  },
];

const STEPS = [
  { title: "Reserve", text: "Pick Foundations" },
  { title: "Arrive", text: "Ten minutes early" },
  { title: "Move", text: "Grip socks on" },
  { title: "Restore", text: "Tonic at the bar" },
];

/* Poster artwork (300 x 440, slice-fitted). Focal shapes sit in the upper two-thirds so the caption
   band never covers them. The small dot in each turns red on hover: one spark per poster. */
const DOT = "transition-colors duration-500 group-hover:fill-spark group-focus-within:fill-spark";

function Art({ kind }: { kind: ArtKey }) {
  return (
    <svg
      viewBox="0 0 300 440"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.035]"
    >
      {kind === "arch" && (
        <>
          <path d="M70 360V170a80 80 0 0 1 160 0v190Z" fill="#f3ede3" />
          <path d="M100 360V176a50 50 0 0 1 100 0v184Z" fill="#e6dcc6" />
          <circle cx="150" cy="196" r="15" className={`fill-forest ${DOT}`} />
          <path d="M0 360a64 64 0 0 1 128 0Z" fill="#2f3a1c" />
          <rect x="236" y="34" width="32" height="32" fill="#e6dcc6" />
        </>
      )}
      {kind === "wave" && (
        <>
          <path d="M-20 130q40-36 80 0t80 0t80 0t80 0t80 0" stroke="#f3ede3" strokeWidth="15" fill="none" />
          <path d="M-20 186q40-36 80 0t80 0t80 0t80 0t80 0" stroke="#2f3a1c" strokeOpacity="0.6" strokeWidth="15" fill="none" />
          <path d="M-20 242q40-36 80 0t80 0t80 0t80 0t80 0" stroke="#e6dcc6" strokeWidth="15" fill="none" />
          <path d="M-20 298q40-36 80 0t80 0t80 0t80 0t80 0" stroke="#c4a96a" strokeWidth="15" fill="none" />
          <circle cx="238" cy="62" r="28" fill="#e6dcc6" />
          <circle cx="238" cy="62" r="7" className={`fill-forest ${DOT}`} />
        </>
      )}
      {kind === "ring" && (
        <>
          <circle cx="150" cy="210" r="140" fill="#c4a96a" />
          <circle cx="150" cy="210" r="104" fill="#f3ede3" />
          <circle cx="150" cy="210" r="68" fill="#c4a96a" />
          <circle cx="150" cy="210" r="32" fill="#f3ede3" />
          <circle cx="150" cy="210" r="11" className={`fill-forest ${DOT}`} />
        </>
      )}
      {kind === "sun" && (
        <>
          <circle cx="60" cy="70" r="3" fill="#f3ede3" />
          <circle cx="232" cy="112" r="2.5" fill="#f3ede3" />
          <circle cx="196" cy="52" r="3" fill="#f3ede3" />
          <circle cx="104" cy="140" r="2" fill="#f3ede3" />
          <path d="M0 360a150 150 0 0 1 300 0Z" fill="#b9c5b1" />
          <path d="M38 360a112 112 0 0 1 224 0Z" fill="#e6dcc6" />
          <path d="M76 360a74 74 0 0 1 148 0Z" fill="#c4a96a" />
          <path d="M114 360a36 36 0 0 1 72 0Z" fill="#f3ede3" />
          <circle cx="150" cy="342" r="8" className={`fill-terracotta ${DOT}`} />
        </>
      )}
    </svg>
  );
}

function Poster({
  item,
  index,
  marquee = false,
  duplicate = false,
}: {
  item: StudioClass;
  index: number;
  /** small-screen marquee card: fixed width, no entrance animation */
  marquee?: boolean;
  /** an extra copy that makes the marquee loop seamless: hidden from screen readers, out of the tab order */
  duplicate?: boolean;
}) {
  return (
    <motion.article
      initial={marquee ? false : { opacity: 0, y: 28 }}
      whileInView={marquee ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={duplicate || undefined}
      className={`group relative aspect-[3/4.4] overflow-hidden rounded-md transition-transform duration-500 hover:-translate-y-1.5 focus-within:-translate-y-1.5 lg:shadow-[0_18px_36px_rgba(35,43,27,0.14)] ${
        marquee ? "mr-4 w-[72vw] max-w-[300px] shrink-0 sm:w-[44vw] sm:max-w-[340px]" : ""
      }`}
      style={{ backgroundColor: item.panel }}
    >
      <Art kind={item.art} />

      {/* print keyline */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-sm border border-bone/50" />

      <span
        role="img"
        aria-label={`Intensity ${item.intensity} of 3`}
        className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-bone px-2.5 py-1.5"
      >
        {[1, 2, 3].map((n) => (
          <span key={n} className={`h-1.5 w-1.5 rounded-full ${n <= item.intensity ? "bg-forest" : "bg-forest/20"}`} />
        ))}
      </span>

      {/* caption band: name always; details open upward on hover/focus (always open on touch screens) */}
      <div className="absolute inset-x-0 bottom-0 bg-bone px-5 pb-5 pt-4 text-ink">
        <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink/60">
          {item.length} · {item.level}
        </p>
        <h3 className="mt-1.5 font-title text-[30px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[32px]">
          {item.name}
        </h3>

        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out fine:grid-rows-[0fr] fine:group-focus-within:grid-rows-[1fr] fine:group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="mt-3 font-sans text-[13px] font-light leading-relaxed text-ink/75">{item.text}</p>
            <p className="mt-2 font-sans text-[12px] font-light leading-snug text-ink/60">
              <span className="font-medium text-ink/70">Best for</span> · {item.best}
            </p>
            <Link
              href="#membership"
              tabIndex={duplicate ? -1 : undefined}
              className="mt-3 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark"
            >
              Reserve a place
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* Small screens: the posters drift sideways on their own and can also be swiped at any time.
   Three copies sit in a native scroll container; the position is kept inside the middle copy (jumping by one
   copy's width is invisible, the copies are identical), so it loops forever in both directions.
   Auto-drift pauses while you touch / hover, then resumes after a short idle. */
function PosterMarquee() {
  const viewportRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 36; // px per second
    const IDLE_MS = 1500; // pause after the last touch / wheel / scroll before drifting again

    let half = 0; // width of one copy
    let pos = 0; // float scroll position (scrollLeft is rounded by the browser)
    let raf = 0;
    let last = 0;
    let lastInteraction = 0;
    let visible = false;
    let hovering = false;
    let ignoreScroll = false;

    const setScroll = (x: number) => {
      if (Math.abs(el.scrollLeft - x) < 0.5) return;
      ignoreScroll = true;
      el.scrollLeft = x;
    };

    const measure = () => {
      const oldHalf = half;
      half = el.scrollWidth / 3;
      if (half <= 0) return;
      const progress = oldHalf > 0 ? ((pos - oldHalf) % oldHalf) / oldHalf : 0;
      pos = half + Math.max(0, progress) * half;
      setScroll(pos);
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min((t - last) / 1000, 0.1) : 0;
      last = t;
      if (reduceMotion || !visible || hovering || half <= 0 || t - lastInteraction < IDLE_MS) {
        pos = el.scrollLeft; // stay in sync while paused
        return;
      }
      pos += SPEED * dt;
      if (pos >= half * 2) pos -= half;
      setScroll(pos);
    };

    const onScroll = () => {
      if (ignoreScroll) {
        ignoreScroll = false;
        return;
      }
      lastInteraction = performance.now();
      if (half <= 0) return;
      const x = el.scrollLeft;
      if (x < half) setScroll(x + half);
      else if (x >= half * 2) setScroll(x - half);
      pos = el.scrollLeft;
    };

    const mark = () => {
      lastInteraction = performance.now();
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hovering = true;
    };
    const leave = () => {
      hovering = false;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(el);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", mark, { passive: true });
    el.addEventListener("touchmove", mark, { passive: true });
    el.addEventListener("wheel", mark, { passive: true });
    el.addEventListener("pointerdown", mark, { passive: true });
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", mark);
      el.removeEventListener("touchmove", mark);
      el.removeEventListener("wheel", mark);
      el.removeEventListener("pointerdown", mark);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={viewportRef}
      className="marquee-viewport -mx-6 mt-12 py-2 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] sm:-mx-10 md:-mx-14 lg:hidden"
    >
      <div className="marquee-track">
        {[0, 1, 2].map((copy) =>
          CLASSES.map((item, i) => (
            <Poster key={`${copy}-${item.id}`} item={item} index={i} marquee duplicate={copy !== 1} />
          ))
        )}
      </div>
    </div>
  );
}

export function ClassGuide() {
  return (
    <section
      id="classes"
      data-header-theme="light"
      className="relative w-full overflow-x-clip bg-mint px-3 py-10 text-ink sm:px-6 sm:py-14 lg:px-10 lg:py-20"
    >
      {/* ... with the cream as a curved panel holding everything */}
      <div className="relative w-full overflow-hidden rounded-[36px] bg-plaster px-6 py-16 shadow-[0_30px_70px_rgba(35,43,27,0.08)] sm:rounded-[48px] sm:px-10 sm:py-20 md:px-14 lg:rounded-[64px] lg:px-16 lg:py-24">
        {/* Header */}
        <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-7">
            <Reveal>
              <div className="flex items-center gap-2.5 font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-ink-muted sm:text-[12.5px]">
                <span className="h-px w-5 bg-terracotta" />
                <span>Classes</span>
              </div>
            </Reveal>
            <motion.h2 {...wipeProps} className="font-display text-[40px] leading-[1.1] tracking-normal sm:text-[54px] md:text-[66px] lg:text-[74px]">
              <SparkText>Find Your Class.</SparkText>
            </motion.h2>
          </div>

          <Reveal delay={0.2} className="lg:col-span-5 lg:justify-self-end">
            <p className="max-w-md font-sans text-[14.5px] font-light leading-relaxed text-ink/70 sm:text-[15.5px]">
              Four ways to move, one standard: eight people, one instructor, no mirrors. New to the reformer? Start with
              Foundations.
            </p>
          </Reveal>
        </div>

        {/* Small screens: drifting, swipeable marquee */}
        <PosterMarquee />

        {/* Large screens: four-up grid */}
        <div className="mt-16 hidden grid-cols-4 gap-5 lg:grid">
          {CLASSES.map((item, i) => (
            <Poster key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* First visit: one slim bar */}
        <Reveal className="mt-14 flex flex-col gap-6 border-y border-ink/15 py-6 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <h3 className="font-title text-[34px] font-normal leading-none tracking-[-0.01em] sm:text-[40px]">
            Your <span className="font-script tracking-normal text-spark">first</span> visit
          </h3>

          <ol className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 lg:flex-1 lg:justify-center lg:gap-x-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/25 font-sans text-[12px] font-medium text-rust">
                  {i + 1}
                </span>
                <span className="flex flex-col">
                  <span className="font-title text-[22px] leading-none">{step.title}</span>
                  <span className="mt-1 font-sans text-[12px] font-light leading-snug text-ink/65">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <Link
            href="#membership"
            className="group inline-flex items-center gap-4 self-start rounded-full bg-ink py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_6px_24px_rgba(35,43,27,0.18)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(35,43,27,0.3)] lg:self-auto"
          >
            <span>Request membership</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
              <ArrowUpRight size={13} strokeWidth={2.2} />
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-5 font-sans text-[12px] font-light leading-relaxed text-ink/60">
            Grip socks required · Free cancellation up to 12 hours before class · Tell us about injuries or pregnancy
            when you book.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
