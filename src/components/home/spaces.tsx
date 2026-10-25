"use client";

import { motion } from "framer-motion";

interface SpaceItem {
  id: string;
  name: string;
  /** a line of handwriting at the top of the tile: what the room is for */
  note: string;
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
    name: "The Reform Room",
    note: "where we move",
    description: "Eight custom reformers on natural timber frames, spring-loaded and quiet. The room where most classes happen.",
    image: "/assets/Sunlit Pilates Studio with Wooden Reformers.webp",
    position: "object-[40%_62%]",
    span: "lg:col-span-7",
  },
  {
    id: "mat-vault",
    name: "The Mat Vault",
    note: "where we breathe",
    description: "Acoustically isolated and free of mirrors, for floor work and the classical mat, paced entirely by breath.",
    image: "/assets/Serene Symmetrical Pilates Studio.webp",
    position: "object-[48%_55%]",
    span: "lg:col-span-5",
  },
  {
    id: "recovery-bar",
    name: "The Recovery Bar",
    note: "where we land",
    description: "A travertine bar for a tonic after class, with cold-pressed botanicals and a moment before you go.",
    image: "/assets/Sunlit Organic Cafe Bar.webp",
    position: "object-[34%_50%]",
    span: "lg:col-span-5",
  },
  {
    id: "quiet-room",
    name: "The Quiet Room",
    note: "where we rest",
    description: "A lounge for stillness: weighted oatmeal linen, diffused warmth and no devices. Stay as long as you like.",
    image: "/assets/Sunlit Olive Green Lounge Corner.webp",
    position: "object-[42%_58%]",
    span: "lg:col-span-7",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* One room: the photo fills the tile and the words sit over it. A dark wash from the bottom (and a lighter one at the
   top) keeps the white type readable on the bright, sunlit photographs. */
function SpaceTile({ space }: { space: SpaceItem }) {
  return (
    <article
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

      {/* Top: what the room is for, in handwriting */}
      <p className="p-5 font-script text-[24px] leading-none text-white/95 [text-shadow:0_1px_14px_rgba(20,28,12,0.6)] sm:p-7 sm:text-[28px] lg:p-9">
        {space.note}
      </p>

      {/* Bottom: the name and a line about it */}
      <div className="p-5 pt-0 sm:p-7 sm:pt-0 lg:p-9 lg:pt-0">
        <h3 className="font-display text-[40px] font-light leading-[1.02] tracking-normal text-white sm:text-[38px] md:text-[42px] lg:text-[clamp(44px,4.3vw,72px)]">
          {space.name}
        </h3>
        <p className="mt-4 max-w-md font-sans text-[14px] font-light leading-relaxed text-white/85 sm:text-[15px] lg:mt-5">{space.description}</p>
      </div>
    </article>
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
      <div className="w-full px-6 pb-8 sm:px-10 sm:pb-10 md:px-14 lg:px-20">
        <h2 className="font-display text-[40px] font-light leading-[1.1] tracking-normal text-ink sm:text-[54px] md:text-[68px] lg:text-[76px]">The Spaces</h2>
      </div>

      {/* Full-image tiles: one column on phones, two from sm, an offset wide / narrow grid on desktop */}
      <div className="grid w-full grid-cols-1 gap-3 px-3 sm:grid-cols-2 sm:gap-4 sm:px-6 lg:auto-rows-[clamp(460px,66dvh,620px)] lg:grid-cols-12 lg:gap-5 lg:px-10">
        {spaces.map((space) => (
          <SpaceTile key={space.id} space={space} />
        ))}
      </div>
    </section>
  );
}
