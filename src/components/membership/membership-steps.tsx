"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ClassArt } from "@/components/classes/class-art";
import type { ArtKind } from "@/components/classes/classes-data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const steps: { title: string; text: string; panel: string; art: ArtKind }[] = [
  {
    title: "Request",
    text: "Tell us a little about you and what you are after. No payment, no pressure, and a reply within one working day.",
    panel: "#c4a96a",
    art: "arch",
  },
  {
    title: "Meet",
    text: "Come in for a complimentary intro session. Meet an instructor, take a class of eight and see the rooms.",
    panel: "#e6dcc6",
    art: "ring",
  },
  {
    title: "Move",
    text: "Choose the plan that suits your week and book your first class. You can change it whenever your rhythm does.",
    panel: "#2f3a1c",
    art: "sun",
  },
];

/* How it works as a path. A thin line runs down the middle of the page and a gold line draws itself along it as you
   scroll; each step stands on one side of it, alternating left and right, and its marker fills the moment the line
   reaches it. On phones the line moves to the left edge and every step sits to its right. */
export function MembershipSteps() {
  const trackRef = React.useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 65%"] });
  const grow = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 });

  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-6 pb-20 pt-20 text-ink sm:px-10 sm:pb-28 sm:pt-28 md:px-14 lg:px-20 lg:pb-36 lg:pt-36">
      <h2 className="font-display text-[30px] font-light leading-[1.18] tracking-normal sm:text-[40px] lg:mx-auto lg:max-w-3xl lg:text-center lg:text-[clamp(38px,3.6vw,52px)]">
        From hello to your first class in three steps, and nothing to pay until you have been.
      </h2>

      <div className="relative mx-auto mt-14 max-w-[1100px] sm:mt-20">
        <ol className="grid [--gap:4rem] gap-y-[var(--gap)] sm:[--gap:5rem] lg:[--gap:7rem]">
          {/* the path: a faint line, and the gold one that draws along it. It starts at the centre of marker 1 and ends at the
              centre of the last marker (it spans every row but the last, then reaches down into it), so nothing runs on past. */}
          <li
            ref={trackRef}
            aria-hidden
            className="pointer-events-none relative col-start-1 mt-[22px] h-[calc(100%+var(--gap))] self-start"
            style={{ gridRow: `1 / span ${steps.length - 1}` }}
          >
            <span className="absolute inset-y-0 left-[22px] w-px -translate-x-1/2 bg-ink/15 lg:left-1/2" />
            <motion.span
              style={{ scaleY: reduce ? 1 : grow }}
              className="absolute inset-y-0 left-[22px] w-px origin-top -translate-x-1/2 bg-spark lg:left-1/2"
            />
          </li>

          {steps.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={step.title}
                style={{ gridRow: i + 1 }}
                className="relative z-10 col-start-1 pl-[76px] lg:grid lg:grid-cols-2 lg:gap-x-0 lg:pl-0"
              >
                {/* marker on the line: fills gold as the line reaches it */}
                <motion.span
                  initial={{ backgroundColor: "rgba(185,197,177,1)", color: "rgba(43,50,32,1)", scale: 0.85 }}
                  whileInView={{ backgroundColor: "rgba(224,197,122,1)", color: "rgba(35,44,20,1)", scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className="absolute left-[22px] top-0 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-ink/25 font-title text-[22px] font-normal leading-none lg:left-1/2"
                >
                  {i + 1}
                </motion.span>

                <div className={cn("flex flex-col gap-5 sm:flex-row sm:gap-6", left ? "lg:col-start-1 lg:flex-row-reverse lg:justify-self-end lg:pr-20" : "lg:col-start-2 lg:justify-self-start lg:pl-20")}>
                  {/* the tile forms first (the coloured arch grows up from its base), then the drawing builds itself inside it, layer by layer;
                      an unclipped wrapper watches for the scroll and both follow its "show" state */}
                  <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} className="h-[136px] w-[112px] shrink-0">
                    <motion.div
                      variants={{
                        hidden: { clipPath: "inset(100% 0 0 0)" },
                        show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 0.9, delay: 0.1, ease: EASE } },
                      }}
                      className="group relative h-full w-full overflow-hidden rounded-t-full rounded-b-[14px]"
                      style={{ backgroundColor: step.panel }}
                    >
                      <ClassArt
                        kind={step.art}
                        animate
                        trigger="parent"
                        delay={0.6}
                        className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </motion.div>
                  </motion.div>

                  <div className="max-w-xs">
                    <h3 className="font-title text-[32px] font-normal leading-none tracking-[-0.01em]">{step.title}</h3>
                    <p className="mt-3 font-sans text-[14.5px] font-light leading-relaxed text-ink/80">{step.text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
