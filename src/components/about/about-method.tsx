"use client";

import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const phases = [
  {
    title: "Assess.",
    line: "We begin with you.",
    text: "Your first session is a conversation before it is a workout. We learn how you move, what you carry and what you want from your body.",
    details: ["Intro consultation", "Movement and posture screen", "Injuries, goals and history"],
  },
  {
    title: "Sequence.",
    line: "We build it slowly.",
    text: "Small groups and progressive programming, so each class prepares the next and nothing is rushed past the point you can feel it.",
    details: ["Eight practitioners, at most", "Reformer and mat progressions", "Hands-on cueing in every class"],
  },
  {
    title: "Integrate.",
    line: "We make it last.",
    text: "Every session closes with breath and stillness, so the work settles into the nervous system and goes home with you.",
    details: ["Breath and downshift finish", "Time in the Quiet Room", "Progress reviewed each month"],
  },
];

/* A little arch rising out of a baseline: one, two, then three rings as the phases build. The innermost is gold. */
function PhaseGlyph({ rings }: { rings: number }) {
  const radii = [10, 19, 28].slice(0, rings);
  return (
    <svg viewBox="0 0 64 36" className="h-11 w-20 text-ink" fill="none" aria-hidden>
      <path d="M2 34.5H62" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" />
      {radii.map((r, i) => (
        <path
          key={r}
          d={`M${32 - r} 34.5A${r} ${r} 0 0 1 ${32 + r} 34.5`}
          stroke={i === 0 ? "#c4a96a" : "currentColor"}
          strokeOpacity={i === 0 ? 1 : 0.45}
          strokeWidth={i === 0 ? 2 : 1.2}
        />
      ))}
    </svg>
  );
}

export function AboutMethod() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-16 text-ink sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
      <div className="flex w-full flex-col justify-between gap-3 px-3 pb-8 lg:flex-row lg:items-end lg:gap-4 sm:px-4 sm:pb-12 lg:px-10">
        <motion.h2
          {...wipeProps}
          className="font-display text-[40px] font-light leading-[1.1] tracking-normal text-ink sm:text-[54px] md:text-[68px] lg:text-[76px]"
        >
          <SparkText>The EVOA Method.</SparkText>
        </motion.h2>
        <Reveal delay={0.25}>
          <p className="font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-ink-muted sm:text-[12.5px]">
            Three phases, one pace
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {phases.map((phase, i) => (
          <motion.article
            key={phase.title}
            initial={{ opacity: 0, y: 56 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
            className="flex flex-col rounded-[32px] bg-plaster p-7 sm:rounded-[40px] sm:p-9 md:grid md:grid-cols-12 md:gap-x-12 lg:flex lg:rounded-[44px] lg:p-10"
          >
            <div className="md:col-span-5 lg:col-span-12">
              <PhaseGlyph rings={i + 1} />
              <h3 className="mt-8 font-display text-[44px] font-light leading-[1.05] tracking-normal text-ink sm:text-[52px]">
                <SparkText>{phase.title}</SparkText>
              </h3>
              <p className="mt-2 font-script text-[22px] leading-tight text-rust sm:text-[24px]">{phase.line}</p>
            </div>

            <div className="mt-5 md:col-span-7 md:mt-0 md:self-end lg:col-span-12 lg:mt-5">
            <p className="font-sans text-[14px] font-light leading-relaxed text-ink-muted sm:text-[15px]">{phase.text}</p>

            <ul className="mt-8 flex flex-col border-t border-ink/10 pt-2">
              {phase.details.map((detail) => (
                <li
                  key={detail}
                  className="flex items-center gap-3 border-b border-ink/[0.07] py-3.5 font-sans text-[12px] font-normal uppercase tracking-[0.16em] text-ink/75 last:border-b-0"
                >
                  <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {detail}
                </li>
              ))}
            </ul>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
