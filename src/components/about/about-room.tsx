"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const materials = [
  {
    name: "Terrazzo",
    note: "Polished underfoot, warm in low light.",
    image: "/assets/Warm Beige Terrazzo Stone Texture.webp",
    position: "object-center",
    ratio: "aspect-[3/4]",
  },
  {
    name: "Sage tile",
    note: "Hand-set, glazed and quietly reflective.",
    image: "/assets/Sunlit Pilates Studio with Wooden Reformers.webp",
    position: "object-[50%_20%] scale-[2.7] origin-[50%_14%]",
    ratio: "aspect-[3/4.5]",
  },
  {
    name: "Travertine",
    note: "Honed stone with a soft, natural grain.",
    image: "/assets/Serene Travertine Wellness Retreat.webp",
    position: "object-[28%_50%]",
    ratio: "aspect-[3/3.7]",
  },
  {
    name: "Timber",
    note: "Natural frames, sanded smooth by hand.",
    image: "/assets/Luxurious Sunlit Pilates Studio.webp",
    position: "object-[62%_55%]",
    ratio: "aspect-[3/4.5]",
  },
  {
    name: "Linen",
    note: "Weighted, oatmeal and made to be touched.",
    image: "/assets/space-quiet-room.jpg",
    position: "object-[45%_60%]",
    ratio: "aspect-[3/4]",
  },
];

const palette = [
  { name: "Warm beige", color: "#F3EDE3" },
  { name: "Sand", color: "#E6DCC6" },
  { name: "Sage", color: "#B9C5B1" },
  { name: "Olive", color: "#8FA08A" },
  { name: "Stone", color: "#D6D2C7" },
  { name: "Brushed gold", color: "#C4A96A" },
];

export function AboutRoom() {
  return (
    <section data-header-theme="dark" className="relative w-full bg-mint px-3 pb-3 sm:px-6 lg:px-10">
      <div className="w-full overflow-hidden rounded-[36px] bg-forest px-6 py-14 text-bone sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-28">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-16">
            <h2 className="font-display text-[42px] font-light leading-[1.06] tracking-normal text-bone sm:text-[56px] lg:text-[clamp(52px,5.6vw,84px)]">
              Designed to <span className="font-script">exhale</span>
            </h2>
            <p className="max-w-md font-sans text-[14px] font-light leading-relaxed text-white/70 sm:text-[15.5px]">
              Every surface is chosen to lower the volume: stone that holds warmth, tile that catches the light,
              timber and linen you want to touch. The room does a share of the teaching.
            </p>
          </div>

          {/* Five arches: a swipeable row below lg, a skyline on desktop */}
          <div className="hide-scrollbar -mx-6 mt-12 flex snap-x snap-mandatory scroll-pl-6 gap-4 overflow-x-auto px-6 sm:-mx-10 sm:mt-16 sm:scroll-pl-10 sm:px-10 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-5 lg:items-end lg:gap-5 lg:overflow-visible lg:px-0">
            {materials.map((item, i) => (
              <motion.figure
                key={item.name}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 1, delay: i * 0.08, ease: EASE }}
                className="group w-[58vw] max-w-[250px] shrink-0 snap-start sm:w-[34vw] lg:w-auto lg:max-w-none"
              >
                <div className={`relative w-full overflow-hidden rounded-t-[999px] rounded-b-[16px] bg-deep-green ${item.ratio}`}>
                  <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out fine:group-hover:scale-[1.06]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={`${item.name} in the Evoa studio`} className={`h-full w-full object-cover ${item.position}`} />
                  </div>
                  <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />
                </div>
                <figcaption className="mt-4">
                  <span className="block font-title text-[26px] font-normal leading-none text-bone">{item.name}</span>
                  <span className="mt-2 block font-sans text-[12px] font-light leading-snug text-white/60">{item.note}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          {/* The palette the room (and this site) is drawn from */}
          <div className="mt-14 flex flex-col gap-5 border-t border-white/10 pt-8 sm:mt-20 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-script text-[22px] leading-none text-spark-bright sm:text-[26px]">Colours drawn from the room</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-4">
              {palette.map((swatch) => (
                <li key={swatch.name} className="flex items-center gap-3">
                  <span aria-hidden className="h-7 w-7 rounded-full ring-1 ring-white/25" style={{ backgroundColor: swatch.color }} />
                  <span className="font-sans text-[12.5px] font-light tracking-[0.04em] text-white/75">{swatch.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
