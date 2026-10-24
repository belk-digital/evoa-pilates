"use client";

import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";
import { instructors } from "@/lib/data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Names, roles and bios come from lib/data.ts (placeholders until the real team is confirmed). The portraits are
   stand-ins from the existing library; swap `image` for the real photographs. */
const extras = [
  {
    image: "/assets/Sunlit Laughter on the Terrazzo Floor.webp",
    position: "object-[62%_30%]",
    specialties: ["Classical reformer", "Alignment"],
  },
  {
    image: "/assets/Sunlit Pilates Pose in a Green Studio.webp",
    position: "object-[50%_40%]",
    specialties: ["Rehab-informed", "Reformer programming"],
  },
  {
    image: "/assets/class-prenatal.webp",
    position: "object-[50%_45%]",
    specialties: ["Prenatal", "Postnatal"],
  },
];

export function AboutPractitioners() {
  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint pb-16 text-ink sm:pb-24 lg:pb-32">
      <div className="flex w-full flex-col justify-between gap-3 px-6 pb-8 lg:flex-row lg:items-end lg:gap-4 sm:px-10 sm:pb-12 md:px-14 lg:px-20">
        <motion.h2
          {...wipeProps}
          className="font-display text-[40px] font-light leading-[1.1] tracking-normal text-ink sm:text-[54px] md:text-[68px] lg:text-[76px]"
        >
          <SparkText>The Practitioners.</SparkText>
        </motion.h2>
        <Reveal delay={0.25}>
          <p className="font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-ink-muted sm:text-[12.5px]">
            A small team, deeply trained
          </p>
        </Reveal>
      </div>

      {/* Swipeable row below lg, three columns on desktop (the middle portrait sits a little lower) */}
      <div className="hide-scrollbar flex w-full snap-x snap-mandatory scroll-pl-3 gap-3 overflow-x-auto overflow-y-hidden px-3 sm:scroll-pl-6 sm:gap-4 sm:px-6 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-10">
        {instructors.map((person, i) => {
          const extra = extras[i];
          return (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 56 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 1, delay: i * 0.1, ease: EASE }}
              className={`group relative isolate flex aspect-[3/4] w-[80vw] max-w-[400px] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[28px] bg-forest text-white sm:w-[46vw] sm:rounded-[36px] lg:w-auto lg:max-w-none lg:rounded-[44px] ${
                i === 1 ? "lg:mt-14" : ""
              }`}
            >
              <div className="absolute inset-0 -z-20 overflow-hidden transition-transform duration-[1400ms] ease-out fine:group-hover:scale-[1.05]">
                <motion.img
                  src={extra.image}
                  alt={`${person.name}, ${person.role}`}
                  initial={{ scale: 1.14 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 1.8, ease: EASE }}
                  className={`h-full w-full object-cover ${extra.position}`}
                />
              </div>

              <div
                aria-hidden
                className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(35,44,20,0.92)_0%,rgba(35,44,20,0.62)_30%,rgba(35,44,20,0.1)_60%,transparent_80%)]"
              />
              <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-1/4 bg-gradient-to-b from-forest/40 to-transparent" />
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />

              <div className="flex items-start gap-3 p-5 sm:p-7">
                <span aria-hidden className="mt-[0.55em] h-px w-8 shrink-0 bg-spark-bright" />
                <p className="font-sans text-[10.5px] font-normal uppercase leading-[1.7] tracking-[0.22em] text-white/90 [text-shadow:0_1px_12px_rgba(20,28,12,0.6)] sm:text-[11px]">
                  {person.role}
                </p>
              </div>

              <div className="p-5 pt-0 sm:p-7 sm:pt-0">
                <h3 className="font-display text-[34px] font-light leading-[1.04] tracking-normal text-white sm:text-[40px] lg:text-[clamp(36px,3.2vw,50px)]">
                  {person.name.split(" ")[0]}{" "}
                  <span className="font-script">{person.name.split(" ").slice(1).join(" ")}</span>
                  <span className="text-spark-bright">.</span>
                </h3>
                <p className="mt-3 max-w-sm font-sans text-[13px] font-light leading-relaxed text-white/85 sm:text-[14px]">
                  {person.bio}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {extra.specialties.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/40 bg-white/[0.06] px-3.5 py-1.5 font-sans text-[10px] font-normal uppercase tracking-[0.14em] text-white/90 backdrop-blur-[3px] sm:text-[10.5px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
