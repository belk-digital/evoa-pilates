"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const heroImages = [
  {
    src: "/assets/hero-bg.webp",
    alt: "Evoa Pilates Sanctuary - Atmospheric Studio",
  },
  {
    src: "/assets/hero-bg-2.webp",
    alt: "Evoa Pilates Sanctuary - Mindful Reformer Movement",
  },
  {
    src: "/assets/hero-bg-3.webp",
    alt: "Evoa Pilates Sanctuary - Sculpted Core & Alignment",
  },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      data-header-theme="dark"
      className="relative w-full h-[100dvh] min-h-[100dvh] md:h-screen md:min-h-[760px] max-h-[1200px] overflow-hidden bg-[#161311] flex flex-col justify-between"
    >
      {/* Background Image Layer with Crossfading and Cinematic Scrim for High Contrast */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {heroImages.map((img, idx) => (
          <motion.img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            initial={idx === 0 ? { opacity: 0, scale: 1.06 } : false}
            animate={{
              opacity: idx === currentImageIndex ? 1 : 0,
              scale: 1.02,
            }}
            transition={{
              duration: idx === 0 && currentImageIndex === 0 ? 1.8 : 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Global atmospheric darkening tint to let white typography and thin celestial lines pop */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Top gradient vignette for header and glass pill legibility */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-52 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Center subtle dark radial vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(15,12,10,0.45)_100%] pointer-events-none" />

        {/* Bottom gradient vignette for giant 'evoa' typography contrast */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-96 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Responsive Top Spacer: pushes content safely below header */}
      <div className="w-full h-16 sm:h-24 md:h-32 shrink-0 pointer-events-none" />

      {/* Mid Section: Vertically balanced Editorial Content Block (Paragraph + CTA Button) */}
      <div className="relative z-20 w-full px-5 sm:px-10 md:px-16 lg:px-24 pointer-events-auto flex-1 flex flex-col justify-center">
        <div className="max-w-md sm:max-w-xl md:max-w-2xl flex flex-col items-start gap-4 sm:gap-6 md:gap-8">
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-light text-[16px] sm:text-[21px] md:text-[26px] lg:text-[30px] leading-[1.38] tracking-wide text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] text-balance"
          >
            Mindful movement, slow strength, and precision reformer instruction in a space that feels like an exhale.
            We create a practice where self-care becomes an art.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.025, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-3.5 sm:gap-4 rounded-full bg-white pl-6 pr-2.5 py-2.5 sm:pl-9 sm:pr-3.5 sm:py-3.5 text-[11px] sm:text-[13px] font-semibold tracking-[0.22em] text-[#1c1815] uppercase shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.5)] transition-shadow duration-300"
            >
              {/* Luxury Rolling Text Track */}
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    BOOK A CLASS
                  </span>
                  <span className="h-[18px] flex items-center text-rose-500 font-semibold">
                    BOOK A CLASS
                  </span>
                </div>
              </div>

              {/* Minimalist Dark Arrow Pill with Continuous Rolling Arrow */}
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#1c1815] text-white transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-rose-500">
                <div className="relative overflow-hidden w-3.5 h-3.5 flex items-center justify-center">
                  <ArrowUpRight
                    size={13}
                    strokeWidth={2.2}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:translate-x-4"
                  />
                  <ArrowUpRight
                    size={13}
                    strokeWidth={2.2}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Giant Bottom Typography ("evoa") - Right Aligned with Staggered Letter Entrance */}
      <div className="relative z-20 w-full overflow-hidden pointer-events-none select-none flex justify-end pr-2.5 sm:pr-8 md:pr-12 lg:pr-16 pb-0 shrink-0">
        <h1
          aria-label="evoa"
          className="font-sans font-light text-[#faf6f3] text-[34vw] xs:text-[32vw] sm:text-[28vw] md:text-[24vw] leading-[0.74] tracking-[-0.04em] translate-y-[19%] md:translate-y-[20%] text-right whitespace-nowrap drop-shadow-[0_4px_35px_rgba(0,0,0,0.7)]"
        >
          {["e", "v", "o", "a"].map((letter, index) => (
            <motion.span
              key={index}
              initial={{ y: "135%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.25,
                delay: 0.35 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>
    </section>
  );
}
