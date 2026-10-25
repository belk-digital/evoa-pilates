"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MarginNote } from "@/components/ui/margin-note";
import { ClassArt } from "@/components/classes/class-art";
import { classes, requestOpenClass } from "@/components/classes/classes-data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* the doorways build themselves: each coloured arch rises from the ground line, the two arches inside it follow, then the level appears */
const riseV = { hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: EASE } } };
const fadeV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7 } } };
const fromBase = { transformOrigin: "50% 100%" } as const;

/* The reformer path as three doorways of the same width that step up in height: Foundations, Flow, Sculpt. A little arrow
   sits on the ground line between each pair. On phones the doorways become short tiles beside their text. The other paths
   (mat, prenatal, stillness) sit under the heading on the left, so both sides of the section carry weight. */
const steps = [
  {
    id: "reformer-foundations",
    name: "Foundations",
    tag: "Begin",
    color: "#c4a96a",
    on: "#2f3a1c",
    heights: { phone: 92, wide: 190 },
    dots: 1,
    ready:
      "Begin here. You are ready for Flow when the springs, straps and breath feel familiar and you are no longer thinking about where your hands go.",
  },
  {
    id: "reformer-flow",
    name: "Flow",
    tag: "Build",
    color: "#8fa08a",
    on: "#2f3a1c",
    heights: { phone: 112, wide: 250 },
    dots: 2,
    ready:
      "You are ready for Sculpt when you can hold a position steadily, change springs calmly and finish a class with your form intact.",
  },
  {
    id: "reformer-sculpt",
    name: "Sculpt",
    tag: "Refine",
    color: "#5e4b20",
    on: "#f3ede3",
    heights: { phone: 132, wide: 310 },
    dots: 3,
    ready: "The top of the reformer path: faster, with light weights, and still low impact. Many people stay here for years.",
  },
];

const alongside = [
  { id: "classical-mat", text: "Posture and deep core, at any point on the path" },
  { id: "prenatal-postnatal", text: "Its own path, shaped by where you are" },
  { id: "breath-stillness", text: "A gentle class for every level, any week" },
].map((item) => ({ ...item, cls: classes.find((c) => c.id === item.id)! }));

export function ClassesPath() {
  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-6 pb-8 pt-16 text-ink sm:px-10 sm:pt-24 md:px-14 lg:px-20 lg:pb-12 lg:pt-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-10">
        {/* heading and lede */}
        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
          <h2 className="font-display text-[40px] font-light leading-[1.1] tracking-normal sm:text-[54px] lg:text-[clamp(44px,4.6vw,68px)]">Your progression</h2>
          <p className="mt-6 max-w-sm font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[16.5px]">
            Most people begin in Foundations and move on when it feels easy, not when a calendar says so. Nobody is moved up before they are ready.
          </p>
        </div>

        {/* the three doorways */}
        <div className="lg:col-span-8 lg:col-start-5 lg:row-span-2 lg:row-start-1">
          <ol className="relative grid gap-8 md:grid-cols-3 md:items-start md:gap-5 lg:gap-6">
            {steps.map((step, i) => (
              <motion.li
                key={step.id}
                className="flex gap-5 md:flex-col md:gap-6"
              >
                <div className="relative shrink-0 md:flex md:h-[310px] md:w-full md:items-end md:border-b md:border-ink/30">
                  {i === 0 && (
                    <span className="absolute left-6 top-2 hidden md:block">
                      <MarginNote curl="down" tilt={-5}>
                        start here
                      </MarginNote>
                    </span>
                  )}
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.28, delayChildren: 0.15 + i * 0.12 } } }}
                    className="relative w-[74px] h-[var(--hp)] md:h-[var(--hw)] md:w-[clamp(150px,76%,220px)]"
                    style={{ color: step.on, "--hp": `${step.heights.phone}px`, "--hw": `${step.heights.wide}px` } as CSSProperties}
                  >
                    <motion.div variants={riseV} aria-hidden className="absolute inset-0 rounded-t-full" style={{ ...fromBase, backgroundColor: step.color }} />
                    <motion.div variants={riseV} aria-hidden className="absolute inset-x-[17%] bottom-0 top-[13%] rounded-t-full bg-white/[0.16]" style={fromBase} />
                    <motion.div variants={riseV} aria-hidden className="absolute inset-x-[34%] bottom-0 top-[32%] rounded-t-full bg-white/[0.16]" style={fromBase} />
                    {/* the level, named and counted */}
                    <motion.div variants={fadeV} className="absolute inset-x-0 top-[7%] flex flex-col items-center gap-2 md:top-[9%] md:gap-2.5">
                      <span className="hidden font-sans text-[10.5px] font-medium uppercase tracking-[0.24em] md:block">{step.tag}</span>
                      <span role="img" aria-label={`Intensity ${step.dots} of 3`} className="flex items-center gap-1 md:gap-1.5">
                        {[1, 2, 3].map((n) => (
                          <span key={n} className="h-1.5 w-1.5 rounded-full bg-current md:h-2 md:w-2" style={{ opacity: n <= step.dots ? 1 : 0.28 }} />
                        ))}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>

                <div className="min-w-0">
                  <h3 className="font-title text-[32px] font-normal leading-none tracking-[-0.01em] sm:text-[36px] md:text-[28px] lg:text-[30px] xl:text-[38px]">{step.name}</h3>
                  <p className="mt-3 font-sans text-[14.5px] font-light leading-relaxed text-ink/80">{step.ready}</p>
                  <button
                    type="button"
                    onClick={() => requestOpenClass(step.id)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink/25 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                  >
                    See the class <ArrowUpRight size={13} strokeWidth={2.2} />
                  </button>
                </div>
              </motion.li>
            ))}

            {/* on the ground line, between each pair: the way forward */}
            {[1, 2].map((n) => (
              <span
                key={n}
                aria-hidden
                style={{ left: `${(n * 100) / 3}%`, top: 310 }}
                className="absolute hidden h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink/30 bg-mint text-ink/70 md:flex"
              >
                <ArrowRight size={12} strokeWidth={1.8} />
              </span>
            ))}
          </ol>
        </div>

        {/* the other paths: on the left, under the heading, on large screens */}
        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:self-end">
          <p className="font-script text-[24px] leading-none text-rust">Alongside the reformer</p>
          <ul className="mt-4 border-t border-ink/10">
            {alongside.map((item) => (
              <li key={item.id} className="border-b border-ink/10">
                <button type="button" onClick={() => requestOpenClass(item.id)} className="group flex w-full items-center gap-4 py-4 text-left">
                  <span className="relative block h-14 w-11 shrink-0 overflow-hidden rounded-t-full rounded-b-[7px]" style={{ backgroundColor: item.cls.panel }}>
                    <ClassArt kind={item.cls.art} animate className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-title text-[22px] font-normal leading-[1.1] tracking-[-0.01em] transition-colors group-hover:text-rust sm:text-[24px]">{item.cls.name}</span>
                    <span className="mt-1 block font-sans text-[12.5px] font-light leading-snug text-ink/70">{item.text}</span>
                  </span>
                  <ArrowUpRight size={16} strokeWidth={1.8} className="shrink-0 text-ink/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
