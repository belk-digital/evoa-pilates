"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/* One quote at a time, set very large and left-aligned instead of centred. As the section scrolls past, the quote drifts
   slowly sideways while the gold mark drifts the other way. The names on the right are the controls; the gold line under
   the chosen name fills as the quote runs its course, and then the next one takes its place. Every quote shares one grid
   cell, so nothing shifts when it changes. Only keyboard focus pauses it. */
export function AboutVoices() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = testimonials.length;
  const reduce = useReducedMotion();

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  // small enough that the quote never reaches the names beside it, or leaves the page margin, at any width
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? ["0vw", "0vw"] : ["1.5vw", "-3vw"]);
  const counterDrift = useTransform(scrollYProgress, [0, 1], reduce ? ["0vw", "0vw"] : ["-1vw", "3vw"]);

  React.useEffect(() => {
    if (paused || reduce) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % total), INTERVAL);
    return () => window.clearTimeout(id);
  }, [paused, reduce, total, active]);

  return (
    <section ref={sectionRef} data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-6 py-20 text-ink sm:px-10 sm:py-28 md:px-14 lg:px-20 lg:py-36">
      <div
        className="grid gap-10 lg:grid-cols-12 lg:gap-12"
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="relative lg:col-span-9">
          <motion.span
            aria-hidden
            style={{ x: counterDrift }}
            className="pointer-events-none absolute -top-6 left-0 block font-display text-[110px] font-light leading-[0.7] text-spark sm:-top-8 sm:text-[160px] lg:text-[220px]"
          >
            &ldquo;
          </motion.span>

          <motion.div style={{ x: drift }} className="relative grid pt-14 sm:pt-20 lg:pt-28" aria-live="polite">
            {testimonials.map((t, i) => (
              <motion.figure
                key={t.name}
                aria-hidden={i !== active}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 14, filter: i === active ? "blur(0px)" : "blur(6px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn("col-start-1 row-start-1", i !== active && "pointer-events-none")}
              >
                <blockquote className="font-script text-[30px] font-light leading-[1.12] text-ink text-balance sm:text-[46px] lg:text-[clamp(50px,5.4vw,86px)]">
                  {t.quote}
                </blockquote>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        {/* who said it: the names are the controls */}
        <div role="tablist" aria-label="Member quotes" className="grid grid-cols-2 gap-x-6 gap-y-2 self-end lg:col-span-3 lg:flex lg:flex-col lg:gap-0">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn("relative py-3 text-left transition-opacity duration-500 lg:py-4", i === active ? "opacity-100" : "opacity-45 hover:opacity-75")}
            >
              <span className="block font-title text-[22px] font-normal leading-none text-ink sm:text-[26px]">{t.name}</span>
              <span className="mt-1.5 block font-sans text-[12px] font-light tracking-[0.04em] text-ink-muted">{t.detail}</span>
              <span aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/15" />
              {i === active && (
                <span
                  key={`${i}-${paused}`}
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left bg-spark"
                  style={paused || reduce ? undefined : { animation: `evoa-fill ${INTERVAL}ms linear forwards` }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
