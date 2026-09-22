"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { classTypes } from "@/lib/data";

const classImages: Record<string, string> = {
  reformer: "/assets/class-reformer.webp",
  mat: "/assets/class-mat.webp",
  sculpt: "/assets/class-sculpt.webp",
  prenatal: "/assets/class-prenatal.webp",
};

export function Method() {
  const featured = classTypes.slice(0, 4);

  return (
    <section
      data-header-theme="dark"
      className="py-20 md:py-28 lg:py-32 bg-[#9d8189] text-white relative overflow-hidden"
    >
      {/* Tactile SVG Noise / Paper Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35 mix-blend-overlay z-0"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="method-section-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.52"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#method-section-noise)" />
        </svg>
      </div>

      {/* Ambient delicate glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-powder-petal/15 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-black/15 blur-3xl pointer-events-none z-0" />

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-18">
          <div className="max-w-2xl flex flex-col gap-3">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="label text-powder-petal text-[11px] sm:text-[12px] tracking-[0.28em] uppercase"
            >
              Class Formats
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-kafina text-[34px] sm:text-[44px] md:text-[52px] text-[#faf6f3] tracking-tight leading-[1.15]"
            >
              <span className="font-script text-[1.3em] leading-none inline-block -mr-1 align-baseline normal-case text-powder-petal">
                F
              </span>
              our formats. <span className="text-powder-petal font-normal">One unhurried philosophy.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] sm:text-[16px] md:text-[17px] text-white/85 leading-relaxed max-w-xl text-balance mt-1"
            >
              Every class draws from the same classical foundation — we just change the tempo and the tools.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0"
          >
            <Link
              href="/classes"
              className="group relative inline-flex items-center gap-4 rounded-full bg-white pl-7 pr-2.5 py-2.5 sm:pl-8 sm:pr-3 sm:py-3 text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] text-[#1c1815] uppercase shadow-[0_6px_24px_rgba(0,0,0,0.18)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.28)] transition-shadow duration-300"
            >
              {/* Luxury Rolling Text Track */}
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    VIEW FULL SCHEDULE
                  </span>
                  <span className="h-[18px] flex items-center text-[#9d8189] font-semibold">
                    VIEW FULL SCHEDULE
                  </span>
                </div>
              </div>

              {/* Minimalist Dark Arrow Pill with Continuous Rolling Arrow */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1815] text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-[#9d8189]">
                <div className="relative overflow-hidden w-3.5 h-3.5 flex items-center justify-center">
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.2}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:translate-x-4"
                  />
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2.2}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        {/* 4 Arch-Framed Format Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8 lg:gap-8 xl:gap-10">
          {featured.map((c, index) => {
            const imageSrc = classImages[c.slug] || "/assets/class-reformer.webp";

            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 35, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/classes"
                  className="group flex flex-col gap-5 select-none focus:outline-none"
                >
                  {/* Roman Arch Photo Window */}
                  <div className="relative w-full aspect-[3/4.2] rounded-t-full overflow-hidden bg-black/20 shadow-[0_16px_36px_rgba(0,0,0,0.22)] border border-white/15">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={c.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />

                    {/* Subtle Gradient Shadow Inside Bottom of Arch */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Floating Top Right Arrow Pill on Hover */}
                    <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={15} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Typography Below the Arch (Matching Shared Reference) */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-kafina text-[22px] sm:text-[24px] text-[#faf6f3] leading-snug group-hover:text-powder-petal transition-colors duration-250">
                        {c.name}
                      </h3>
                      <span className="text-[12px] font-sans font-light tracking-[0.14em] uppercase text-powder-petal/90 shrink-0">
                        {c.duration}
                      </span>
                    </div>

                    <span className="text-[11.5px] uppercase tracking-[0.18em] text-white/60 font-sans">
                      {c.level}
                    </span>

                    <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-white/80 line-clamp-3 group-hover:text-white/95 transition-colors mt-0.5">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
