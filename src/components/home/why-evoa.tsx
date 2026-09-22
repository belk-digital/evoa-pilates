"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { benefits } from "@/lib/data";

function FourPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0 C12 6.627 6.627 12 0 12 C6.627 12 12 17.373 12 24 C12 17.373 17.373 12 24 12 C17.373 12 12 6.627 12 0 Z" />
    </svg>
  );
}

export function WhyEvoa() {
  return (
    <section
      data-header-theme="light"
      className="py-14 sm:py-16 md:py-20 lg:py-24 bg-[#faf6f3] text-ink relative overflow-hidden"
    >
      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <div className="flex items-center gap-2.5 mb-2.5">
            <FourPointStar className="w-2.5 h-2.5 text-dusty-mauve/50" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="label text-dusty-mauve text-[11px] sm:text-[11.5px] tracking-[0.28em] uppercase"
            >
              Why Evoa
            </motion.span>
            <FourPointStar className="w-2.5 h-2.5 text-dusty-mauve/50" />
          </div>

          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.04 }}
              className="font-kafina text-[28px] sm:text-[34px] md:text-[40px] text-ink tracking-tight leading-[1.18] text-balance"
            >
              The details we refuse <br className="hidden sm:block" />
              to compromise on.
            </motion.h2>

            {/* Subtle floating star beside heading */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2.5 -right-5 text-dusty-mauve/45 hidden sm:block pointer-events-none"
            >
              <FourPointStar className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* 4 Minimalist Modern Light Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.04 * i,
              }}
              className="group relative flex flex-col justify-between p-6 sm:p-6.5 lg:p-7 rounded-2xl bg-white/80 backdrop-blur-md border border-[#9d8189]/12 hover:border-[#9d8189]/30 hover:bg-white transition-all duration-400 shadow-[0_4px_20px_rgba(157,129,137,0.06)] hover:shadow-[0_10px_30px_rgba(157,129,137,0.12)]"
            >
              {/* Top Accent: Clean Tag & Star Icon */}
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11.5px] font-medium tracking-[0.24em] text-dusty-mauve transition-colors uppercase">
                    0{i + 1}
                  </span>
                  <FourPointStar className="w-3 h-3 text-dusty-mauve/30 group-hover:text-dusty-mauve group-hover:rotate-45 transition-all duration-400" />
                </div>

                <h3 className="font-kafina text-[18px] sm:text-[19px] text-ink tracking-tight leading-snug group-hover:text-dusty-mauve transition-colors duration-250">
                  {b.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-ink-muted transition-colors">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
