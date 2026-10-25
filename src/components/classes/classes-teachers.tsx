"use client";

import { motion } from "framer-motion";
import { requestOpenClass } from "@/components/classes/classes-data";
import { instructors } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Names, roles and bios come from lib/data.ts (placeholders until the real team is confirmed); the portraits are the same
   stand-ins the About page uses. "teaches" links straight to those classes in the programme above. The three arches differ
   in width and height on purpose: they form a skyline, and the tallest rises out of the sand band into the sage above it. */
const extras = [
  {
    image: "/assets/Sunlit Laughter on the Terrazzo Floor.webp",
    position: "object-[62%_28%]",
    place: "w-[82%] sm:w-[64%] md:w-[54%] lg:col-span-5 lg:w-auto",
    ratio: "aspect-[4/5.2] lg:aspect-[4/5.4]",
    teaches: [
      { id: "reformer-foundations", label: "Foundations" },
      { id: "classical-mat", label: "Classical Mat" },
    ],
  },
  {
    image: "/assets/Sunlit Pilates Pose in a Green Studio.webp",
    position: "object-[50%_38%]",
    place: "ml-auto w-[68%] sm:w-[52%] md:w-[44%] lg:col-span-4 lg:ml-0 lg:w-auto",
    ratio: "aspect-[4/4.7]",
    teaches: [
      { id: "reformer-flow", label: "Flow" },
      { id: "reformer-sculpt", label: "Sculpt" },
    ],
  },
  {
    image: "/assets/class-prenatal.webp",
    position: "object-[50%_42%]",
    place: "w-[60%] sm:w-[46%] md:w-[38%] lg:col-span-3 lg:w-auto",
    ratio: "aspect-[4/4.4]",
    teaches: [
      { id: "prenatal-postnatal", label: "Prenatal & Postnatal" },
      { id: "breath-stillness", label: "Breath & Stillness" },
    ],
  },
];

export function ClassesTeachers() {
  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint pt-20 text-ink sm:pt-28 lg:pt-36">
      {/* a sentence is the heading */}
      <div className="px-6 pb-10 sm:px-10 sm:pb-14 md:px-14 lg:px-20 lg:pb-16">
        <h2 className="max-w-3xl font-display text-[30px] font-light leading-[1.18] tracking-normal sm:text-[40px] lg:text-[clamp(38px,3.6vw,52px)]">
          Three instructors, each trained for the work. Choose a class and you choose a teacher.
        </h2>
      </div>

      <div className="relative isolate [--poke:56px] sm:[--poke:84px] lg:[--poke:clamp(110px,13vw,200px)]">
        {/* the sand band; the first arch starts above its top edge */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 top-[var(--poke)] -z-10 bg-plaster" />

        <div className="flex flex-col gap-14 px-6 pb-20 sm:gap-16 sm:px-10 md:px-14 lg:grid lg:grid-cols-12 lg:items-end lg:gap-x-10 lg:px-20 lg:pb-28">
          {instructors.map((person, i) => {
            const extra = extras[i];
            return (
              <article key={person.name} className={cn("group", extra.place)}>
                <div className={cn("relative overflow-hidden rounded-t-[999px] rounded-b-[22px] bg-deep-green", extra.ratio)}>
                  <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out fine:group-hover:scale-[1.05]">
                    <motion.img
                      src={encodeURI(extra.image)}
                      alt={`${person.name}, ${person.role}`}
                      initial={{ scale: 1.12 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 1.8, ease: EASE }}
                      className={cn("h-full w-full object-cover", extra.position)}
                    />
                  </div>
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
                </div>

                <div className="mt-5 max-w-sm">
                  <h3 className="font-display text-[34px] font-light leading-[1.04] tracking-normal sm:text-[40px]">
                    {person.name.split(" ")[0]} <span className="font-script">{person.name.split(" ").slice(1).join(" ")}</span>
                  </h3>
                  <p className="mt-2 font-sans text-[12.5px] font-normal tracking-[0.04em] text-ink-muted">{person.role}</p>
                  <p className="mt-3 font-sans text-[13.5px] font-light leading-relaxed text-ink/75">{person.bio}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="font-script text-[20px] leading-none text-rust">teaches</span>
                    {extra.teaches.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => requestOpenClass(t.id)}
                        className="rounded-full border border-ink/20 px-3.5 py-1.5 font-sans text-[11.5px] font-normal tracking-[0.04em] text-ink/80 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-white"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
