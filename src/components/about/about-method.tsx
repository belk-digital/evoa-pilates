"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArtSvg, P } from "@/components/classes/class-art";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const phases = [
  {
    title: "Assess",
    line: "We begin with you.",
    text: "Your first session is a conversation before it is a workout. We learn how you move, what you carry and what you want from your body.",
    details: ["Intro consultation", "Movement and posture screen", "Injuries, goals and history"],
  },
  {
    title: "Sequence",
    line: "We build it slowly.",
    text: "Small groups and progressive programming, so each class prepares the next and nothing is rushed past the point you can feel it.",
    details: ["Eight practitioners, at most", "Reformer and mat progressions", "Hands-on cueing in every class"],
  },
  {
    title: "Integrate",
    line: "We make it last.",
    text: "Every session closes with breath and stillness, so the work settles into the nervous system and goes home with you.",
    details: ["Breath and downshift finish", "Time in the Quiet Room", "Progress reviewed each month"],
  },
];

/* A little arch rising out of a baseline: one, two, then three rings as the phases build. The innermost is gold. */
function PhaseGlyph({ rings }: { rings: number }) {
  const radii = [10, 19, 28].slice(0, rings);
  return (
    <ArtSvg viewBox="0 0 64 36" animate stagger={0.22} className="h-11 w-20 text-ink">
      <P fx="draw" d="M2 34.5H62" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      {[...radii].reverse().map((r) => {
        const inner = r === 10;
        return (
          <P
            key={r}
            fx="draw"
            d={`M${32 - r} 34.5A${r} ${r} 0 0 1 ${32 + r} 34.5`}
            stroke={inner ? "#c4a96a" : "currentColor"}
            strokeOpacity={inner ? 1 : 0.45}
            strokeWidth={inner ? 2 : 1.2}
          />
        );
      })}
    </ArtSvg>
  );
}

const treadV = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } } };
const riserV = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.1, delay: 0.25, ease: EASE } } };
const nodeV = { hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 14 } } };

/* The method as a staircase: each phase is an L (a tread along the top, a riser down the left) that sits lower and
   further right than the one before, and the lines draw themselves as it scrolls in. No cards, just the sage canvas. */
export function AboutMethod() {
  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-6 pb-20 text-ink sm:px-10 sm:pb-28 md:px-14 lg:px-20 lg:pb-36">
      <h2 className="max-w-md font-title text-[28px] font-normal leading-[1.15] tracking-[-0.01em] sm:text-[34px]">
        How we teach: three phases, at one pace.
      </h2>

      <ol className="mt-12 flex flex-col gap-12 [--step:6vw] sm:mt-16 sm:gap-16 lg:[--step:10vw]">
        {phases.map((phase, i) => (
          <motion.li
            key={phase.title}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, show: { transition: { delayChildren: 0.05 } } }}
            style={{ marginLeft: `calc(var(--step) * ${i})` } as CSSProperties}
            className="relative pb-2 pl-5 pt-7 sm:pl-9 sm:pt-9 lg:pl-14 lg:pt-12"
          >
            <motion.span aria-hidden variants={treadV} className="absolute left-0 right-0 top-0 h-px origin-left bg-ink/30" />
            <motion.span aria-hidden variants={riserV} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-ink/30" />
            <motion.span aria-hidden variants={nodeV} className="absolute -left-[5px] -top-[5px] h-[10px] w-[10px] rounded-full bg-spark" />

            <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
              <div>
                <PhaseGlyph rings={i + 1} />
                <h3 className="mt-6 font-display text-[52px] font-light leading-[1] tracking-normal text-ink sm:text-[68px] lg:text-[clamp(64px,6.4vw,96px)]">
                  {phase.title}
                </h3>
                <p className="mt-2 font-script text-[22px] leading-tight text-rust sm:text-[26px]">{phase.line}</p>
              </div>

              <div className="max-w-md lg:pb-2">
                <p className="font-sans text-[14px] font-light leading-relaxed text-ink-muted sm:text-[15px]">{phase.text}</p>
                <ul className="mt-5 flex flex-col gap-2 font-sans text-[13px] font-light text-ink/80">
                  {phase.details.map((detail) => (
                    <li key={detail} className="flex items-center gap-3">
                      <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
