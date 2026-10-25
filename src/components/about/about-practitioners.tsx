"use client";

import { motion } from "framer-motion";
import { wipeProps } from "@/components/ui/reveal";
import { MarginNote } from "@/components/ui/margin-note";
import { instructors } from "@/lib/data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Names, roles and bios come from lib/data.ts (placeholders until the real team is confirmed). The portraits are
   stand-ins from the existing library; swap `image` for the real photographs. */
const extras = [
  { image: "/assets/Sunlit Laughter on the Terrazzo Floor.webp", position: "object-[62%_30%]" },
  { image: "/assets/Sunlit Pilates Pose in a Green Studio.webp", position: "object-[50%_32%]" },
  { image: "/assets/class-prenatal.webp", position: "object-[50%_40%]" },
];

/* One portrait. The founder is a tall arch; the other two are wide cards stacked beside her. The name sits on the picture. */
function Portrait({ index, lead }: { index: number; lead?: boolean }) {
  const person = instructors[index];
  const extra = extras[index];
  const first = person.name.split(" ")[0];
  const rest = person.name.split(" ").slice(1).join(" ");
  return (
    <article
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden bg-forest text-white",
        lead
          ? "aspect-[4/5] rounded-t-[999px] rounded-b-[28px] sm:aspect-[4/4.6] md:col-span-7 md:row-span-2 md:aspect-auto md:min-h-[560px] lg:min-h-[640px]"
          : "aspect-[4/3] rounded-[28px] sm:aspect-[16/9] sm:rounded-[36px] md:col-span-5 md:aspect-auto md:min-h-[270px] lg:min-h-[300px] lg:rounded-[44px]"
      )}
    >
      <div className="absolute inset-0 -z-20 overflow-hidden transition-transform duration-[1400ms] ease-out fine:group-hover:scale-[1.04]">
        <motion.img
          src={encodeURI(extra.image)}
          alt={`${person.name}, ${person.role}`}
          initial={{ scale: 1.14 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 1.8, ease: EASE }}
          className={cn("h-full w-full object-cover", extra.position)}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(35,44,20,0.9)_0%,rgba(35,44,20,0.55)_32%,rgba(35,44,20,0.06)_62%,transparent_80%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />

      <div className={cn("p-5 sm:p-7", lead && "lg:p-12 lg:pb-12")}>
        <h3 className={cn("font-display font-light leading-[1.02] tracking-normal text-white", lead ? "text-[40px] sm:text-[52px] lg:text-[64px]" : "text-[32px] sm:text-[38px] md:text-[32px] lg:text-[38px]")}>
          {first} <span className="font-script">{rest}</span>
        </h3>
        <p className="mt-1.5 font-sans text-[12px] font-normal tracking-[0.06em] text-white/80 sm:text-[13px]">{person.role}</p>
        <p className={cn("mt-3 font-sans text-[13px] font-light leading-relaxed text-white/85 sm:text-[14px]", lead ? "max-w-sm" : "max-w-md")}>{person.bio}</p>
      </div>
    </article>
  );
}

export function AboutPractitioners() {
  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-3 pb-20 text-ink sm:px-6 sm:pb-28 lg:px-10 lg:pb-36">
      {/* the number is the first word of the sentence: a large 8, then "people at most in every class, ..." on the same line */}
      <div className="px-3 pb-10 sm:px-4 sm:pb-14 lg:px-10 lg:pb-16">
        <div className="flex items-end gap-3 sm:gap-6 lg:gap-9">
          <motion.span
            aria-hidden
            {...wipeProps}
            className="block shrink-0 font-display text-[clamp(120px,32vw,150px)] font-light leading-[0.78] tracking-normal text-ink sm:text-[clamp(160px,22vw,210px)] lg:text-[clamp(200px,16vw,270px)]"
          >
            8
          </motion.span>
          <div className="pb-[0.5em] sm:pb-[0.7em] lg:pb-[1em]">
            <h2 className="max-w-[34rem] font-display text-[21px] font-light leading-[1.2] tracking-normal text-ink sm:text-[30px] lg:text-[clamp(30px,2.8vw,44px)]">
              <span className="sr-only">8 </span>people at most in every class, taught by three teachers who will{" "}
              <span className="font-script">know your name</span>.
            </h2>
            <MarginNote curl="left" tilt={-3} className="mt-3 sm:mt-4">
              and we mean it
            </MarginNote>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-12 lg:gap-5">
        <Portrait index={0} lead />
        <Portrait index={1} />
        <Portrait index={2} />
      </div>
    </section>
  );
}
