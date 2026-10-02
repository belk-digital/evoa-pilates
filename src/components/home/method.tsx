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
    <section data-header-theme="light" className="py-20 md:py-28 lg:py-32 bg-cream text-ink relative overflow-hidden">
      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-18">
          <div className="max-w-2xl flex flex-col gap-3">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="label text-rose-500 text-[11px] sm:text-[12px] tracking-[0.28em] uppercase"
            >
              Class Formats
            </motion.span>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.04 }}
              className="font-serif text-[34px] sm:text-[44px] md:text-[52px] text-ink tracking-tight leading-[1.15]"
            >
              Four formats. <span className="text-rose-500 font-normal">One unhurried philosophy.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-[15px] sm:text-[16px] md:text-[17px] text-ink-muted leading-relaxed max-w-xl text-balance mt-1"
            >
              Every class draws from the same classical foundation — we just change the tempo and the tools.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="shrink-0"
          >
            <Link
              href="/classes"
              className="group relative inline-flex items-center gap-4 rounded-full bg-ink pl-7 pr-2.5 py-2.5 sm:pl-8 sm:pr-3 sm:py-3 text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] text-cream uppercase shadow-soft hover:shadow-lift transition-shadow duration-300"
            >
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">VIEW FULL SCHEDULE</span>
                  <span className="h-[18px] flex items-center text-rose-300 font-semibold">
                    VIEW FULL SCHEDULE
                  </span>
                </div>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cream text-ink transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-rose-500 group-hover:text-cream">
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
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.04 * index }}
              >
                <Link href="/classes" className="group flex flex-col gap-5 select-none focus:outline-none">
                  {/* Roman Arch Photo Window */}
                  <div className="relative w-full aspect-[3/4.2] rounded-t-full overflow-hidden bg-ink/10 shadow-soft border border-ink/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt={c.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-4 right-4 h-9 w-9 rounded-full bg-white/70 backdrop-blur-md border border-white/60 flex items-center justify-center text-ink opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight size={15} strokeWidth={2} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-[22px] sm:text-[24px] text-ink leading-snug group-hover:text-rose-500 transition-colors duration-250">
                        {c.name}
                      </h3>
                      <span className="text-[12px] font-sans font-light tracking-[0.14em] uppercase text-rose-500/90 shrink-0">
                        {c.duration}
                      </span>
                    </div>

                    <span className="text-[11.5px] uppercase tracking-[0.18em] text-ink-subtle font-sans">
                      {c.level}
                    </span>

                    <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-ink-muted line-clamp-3 group-hover:text-ink transition-colors mt-0.5">
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
