"use client";

import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";

interface SpaceItem {
  id: string;
  name: string;
  system: string;
  specs: string[];
  description: string;
  image: string;
  /* where the 3:2 photo is anchored when a tile crops it */
  position: string;
  /* column span on the 12-column desktop grid; the rows alternate wide / narrow */
  span: string;
}

const spaces: SpaceItem[] = [
  {
    id: "reform-room",
    name: "The Reform Room.",
    system: "Musculoskeletal & Spinal Decompression",
    specs: ["Eight custom reformers", "Natural timber frames", "Low-friction glide"],
    description:
      "Spring-loaded carriage sequencing tailored for core stabilization, joint articulation, and deep functional strength without impact.",
    image: "/assets/Sunlit Pilates Studio with Wooden Reformers.webp",
    position: "object-[40%_62%]",
    span: "lg:col-span-7",
  },
  {
    id: "mat-vault",
    name: "The Mat Vault.",
    system: "Deep Core & Diaphragmatic Breath Integration",
    specs: ["Acoustically isolated", "Zero mirrors", "Dense matting"],
    description:
      "Floor-bound discipline engaging the intrinsic stabilizers through unhurried classical sequences and rhythm-driven breathwork.",
    image: "/assets/Serene Symmetrical Pilates Studio.webp",
    position: "object-[48%_55%]",
    span: "lg:col-span-5",
  },
  {
    id: "recovery-bar",
    name: "The Recovery Bar.",
    system: "Cellular Hydration & Autonomic Nervous System",
    specs: ["Travertine bar", "Adaptogenic infusions", "Cold-pressed botanicals"],
    description:
      "Post-movement apothecary bar designed to regulate cortisol, replenish vital electrolytes, and transition your nervous system into ease.",
    image: "/assets/Sunlit Organic Cafe Bar.webp",
    position: "object-[34%_50%]",
    span: "lg:col-span-5",
  },
  {
    id: "quiet-room",
    name: "The Quiet Room.",
    system: "Central Nervous System & Somatic Stillness",
    specs: ["Zero digital devices", "Weighted oatmeal linen", "Diffused warmth"],
    description:
      "A private decompression lounge engineered for uninterrupted stillness, letting your body absorb and integrate the work of the studio.",
    image: "/assets/Sunlit Olive Green Lounge Corner.webp",
    position: "object-[42%_58%]",
    span: "lg:col-span-7",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Room name; the closing full stop is gold. */
function RoomName({ name }: { name: string }) {
  if (!name.endsWith(".")) return <>{name}</>;
  return (
    <>
      {name.slice(0, -1)}
      <span className="text-spark-bright">.</span>
    </>
  );
}

/* One room: the photo fills the tile and the words sit over it. A dark wash from the bottom (and a lighter one at the
   top) keeps the white type readable on the bright, sunlit photographs. */
function SpaceTile({ space, index }: { space: SpaceItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: (index % 2) * 0.12, ease: EASE }}
      className={`group relative isolate flex min-h-[470px] flex-col justify-between overflow-hidden rounded-[28px] bg-forest text-white sm:min-h-[540px] sm:rounded-[36px] lg:min-h-0 lg:rounded-[44px] ${space.span}`}
    >
      {/* Photo: settles in as it arrives, drifts closer on hover */}
      <div className="absolute inset-0 -z-20 overflow-hidden transition-transform duration-[1400ms] ease-out fine:group-hover:scale-[1.05]">
        <motion.img
          src={space.image}
          alt={space.name}
          initial={{ scale: 1.14 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.8, ease: EASE }}
          className={`h-full w-full object-cover ${space.position}`}
        />
      </div>

      {/* Readability washes */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(35,44,20,0.9)_0%,rgba(35,44,20,0.62)_26%,rgba(35,44,20,0.14)_56%,transparent_78%)]"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[30%] bg-gradient-to-b from-forest/55 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />

      {/* Top: which system the room works on */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.3 + (index % 2) * 0.12, ease: EASE }}
        className="flex items-start gap-3 p-5 sm:p-7 lg:p-9"
      >
        <span aria-hidden className="mt-[0.55em] h-px w-8 shrink-0 bg-spark-bright sm:w-10" />
        <p className="max-w-[17rem] font-sans text-[10.5px] font-normal uppercase leading-[1.7] tracking-[0.22em] text-white/90 [text-shadow:0_1px_12px_rgba(20,28,12,0.6)] sm:max-w-sm sm:text-[11px]">
          {space.system}
        </p>
      </motion.div>

      {/* Bottom: name, line, and the room's details as hairline pills */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.4 + (index % 2) * 0.12, ease: EASE }}
        className="p-5 pt-0 sm:p-7 sm:pt-0 lg:p-9 lg:pt-0"
      >
        <h3 className="font-display text-[40px] font-light leading-[1.02] tracking-normal text-white sm:text-[38px] md:text-[42px] lg:text-[clamp(44px,4.3vw,72px)]">
          <RoomName name={space.name} />
        </h3>

        <p className="mt-4 max-w-md font-sans text-[13.5px] font-light leading-relaxed text-white/85 sm:text-[14.5px] lg:mt-5">
          {space.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
          {space.specs.map((spec) => (
            <li
              key={spec}
              className="rounded-full border border-white/40 bg-white/[0.06] px-3.5 py-1.5 font-sans text-[10px] font-normal uppercase tracking-[0.14em] text-white/90 backdrop-blur-[3px] sm:text-[10.5px]"
            >
              {spec}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
}

export function Spaces() {
  return (
    <section
      id="spaces"
      data-header-theme="light"
      className="relative z-20 -mt-[100dvh] w-full overflow-x-clip rounded-t-[36px] bg-mint pb-16 pt-24 text-ink sm:rounded-t-[48px] sm:pb-20 sm:pt-28 md:rounded-t-[64px] lg:pb-24"
    >
      {/* Heading row */}
      <div className="flex w-full flex-col justify-between gap-3 px-6 pb-8 sm:flex-row sm:items-end sm:gap-4 sm:px-10 sm:pb-10 md:px-14 lg:px-20">
        <motion.h2
          {...wipeProps}
          className="font-display text-[40px] leading-[1.1] tracking-normal text-ink sm:text-[54px] md:text-[68px] lg:text-[76px]"
        >
          <SparkText>The Spaces.</SparkText>
        </motion.h2>

        <Reveal delay={0.25}>
          <p className="font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-ink-muted sm:text-[12.5px]">
            Architectures of Regulation
          </p>
        </Reveal>
      </div>

      {/* Full-image tiles: one column on phones, two from sm, an offset wide / narrow grid on desktop */}
      <div className="grid w-full grid-cols-1 gap-3 px-3 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:auto-rows-[clamp(460px,66dvh,620px)] lg:grid-cols-12 lg:gap-5 lg:px-10">
        {spaces.map((space, i) => (
          <SpaceTile key={space.id} space={space} index={i} />
        ))}
      </div>
    </section>
  );
}
