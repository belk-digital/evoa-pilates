"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

/* One quote at a time, set large. Every quote shares one grid cell, so the block is always as tall as the longest one
   and nothing shifts when it changes. Advances itself unless the pointer is over it or motion is reduced. */
export function AboutVoices() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const total = testimonials.length;

  React.useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % total), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, total, active]);

  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-6 py-20 text-ink sm:px-10 sm:py-28 lg:py-36">
      <div
        className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <Reveal>
          <Eyebrow>In their words</Eyebrow>
        </Reveal>

        <Reveal delay={0.1}>
          <span aria-hidden className="mt-8 block font-display text-[88px] font-light leading-[0.6] text-spark sm:text-[120px]">
            &ldquo;
          </span>
        </Reveal>

        <div className="mt-4 grid w-full" aria-live="polite">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              aria-hidden={i !== active}
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 14, filter: i === active ? "blur(0px)" : "blur(6px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={cn("col-start-1 row-start-1 flex flex-col items-center", i !== active && "pointer-events-none")}
            >
              <blockquote className="font-script text-[26px] font-light leading-[1.22] text-ink text-balance sm:text-[38px] lg:text-[48px]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex flex-col items-center gap-1 sm:mt-10">
                <span className="font-sans text-[12px] font-normal uppercase tracking-[0.22em] text-ink">{t.name}</span>
                <span className="font-sans text-[12px] font-light tracking-[0.06em] text-ink-muted">{t.detail}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div role="tablist" aria-label="Member quotes" className="mt-10 flex items-center justify-center gap-1 sm:mt-14">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show quote from ${t.name}`}
              onClick={() => setActive(i)}
              className="flex h-6 items-center px-1"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-500 ease-out",
                  i === active ? "w-8 bg-spark" : "w-2 bg-ink/20"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
