"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const leftBenefits = [
  {
    title: "Deep Joint Mobility",
    description: "Release spinal compression and restore fluid, effortless daily movement.",
  },
  {
    title: "Lean, Stabilizing Strength",
    description: "Spring-loaded resistance that sculpts long, resilient muscle without burnout.",
  },
  {
    title: "Nervous System Reset",
    description: "Rhythmic breathwork that downshifts stress while engaging your deepest core.",
  },
];

const rightBenefits = [
  {
    title: "Spinal Decompression",
    description: "Decompress vertebrae and eliminate chronic low-back tension permanently.",
  },
  {
    title: "Unfiltered Presence",
    description: "A mirrorless sanctuary built for listening to your form — not performing for a room.",
  },
  {
    title: "Architectural Posture",
    description: "Stand taller, breathe deeper, and carry natural poise far beyond the studio.",
  },
];

export function Intro() {
  return (
    <section
      data-header-theme="light"
      className="pt-12 sm:pt-14 md:pt-16 lg:pt-18 pb-20 md:pb-28 lg:pb-32 bg-[#faf6f3] relative overflow-hidden"
    >
      {/* Ambient Powder Petal Soft Glow behind Ring (zero-cost radial gradient instead of blur-3xl) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full bg-[radial-gradient(circle,rgba(255,229,217,0.45)_0%,transparent_70%)] pointer-events-none -z-10" />

      <Container size="wide">
        {/* Header Block with Palette 1 Eyebrow and Accent */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 lg:mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="label text-dusty-mauve text-[11px] sm:text-[12px] tracking-[0.28em] uppercase mb-2.5"
          >
            The Philosophy
          </motion.span>

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="font-kafina text-[38px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-ink tracking-tight"
          >
            <span className="font-script text-[1.3em] leading-none inline-block -mr-1 align-baseline normal-case text-dusty-mauve">
              M
            </span>
            ovement, <span className="text-dusty-mauve font-normal">Refined.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-[15px] sm:text-[16px] md:text-[18px] text-ink-muted leading-[1.65] mt-3 sm:mt-4 max-w-2xl text-balance"
          >
            No chaotic playlists. No careless reps. We combine classical reformer precision
            with nervous-system recovery — building enduring strength from your deepest core
            in a space that feels like an exhale.
          </motion.p>
        </div>

        {/* 3-Column Display: Left Features | Center Ring | Right Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center max-w-6xl mx-auto">
          {/* Left Column with Spaced-Out Points & Palette 1 Numerals */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-10 sm:gap-14 lg:gap-20 order-2 lg:order-1 text-center lg:text-left py-1 lg:py-2">
            {leftBenefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 * index,
                }}
                className="group flex flex-col gap-2"
              >
                <span className="label text-dusty-mauve text-[11px] tracking-[0.24em]">
                  0{index + 1}
                </span>
                <h3 className="font-kafina text-[20px] sm:text-[22px] md:text-[24px] text-ink group-hover:text-dusty-mauve transition-colors duration-250 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14.5px] text-ink-muted leading-relaxed max-w-[280px] mx-auto lg:mx-0">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Center Column: Enlarged 4-Quadrant Ring Donut */}
          <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 px-2 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[470px] md:h-[470px] lg:w-[490px] lg:h-[490px] xl:w-[520px] xl:h-[520px] group select-none"
            >
              {/* Hardware-accelerated soft shadow layer (avoids SVG drop-shadow filter repaint) */}
              <div className="absolute inset-6 rounded-full bg-[#1c1815]/[0.07] blur-2xl pointer-events-none -z-10" />

              <svg
                viewBox="0 0 500 500"
                className="w-full h-full overflow-visible transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.02]"
                aria-label="Pilates Movement Harmony Ring"
              >
                <defs>
                  {/* Mask slicing donut ring into 4 distinct quadrants separated by clean gaps */}
                  <mask id="pilates-quadrants-mask">
                    <rect width="500" height="500" fill="black" />
                    {/* Donut Ring shape (outer radius 236, inner radius 130) */}
                    <circle cx="250" cy="250" r="236" fill="white" />
                    <circle cx="250" cy="250" r="130" fill="black" />
                    {/* Crosshair gaps (9px spacing) */}
                    <rect x="245.5" y="0" width="9" height="500" fill="black" />
                    <rect x="0" y="245.5" width="500" height="9" fill="black" />
                  </mask>
                </defs>

                {/* Subtle Palette 1 Alabaster-Grey Concentric Architectural Lines */}
                <circle
                  cx="250"
                  cy="250"
                  r="242"
                  fill="none"
                  stroke="#d8e2dc"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  opacity="0.75"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="124"
                  fill="none"
                  stroke="#d8e2dc"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  opacity="0.75"
                />

                {/* Static Ring Mask Group */}
                <g mask="url(#pilates-quadrants-mask)">
                  <image
                    href="/assets/pilates-quadrant-ring.jpg"
                    x="-60"
                    y="-160"
                    width="620"
                    height="820"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
              </svg>
            </motion.div>
          </div>

          {/* Right Column with Spaced-Out Points & Palette 1 Numerals */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-10 sm:gap-14 lg:gap-20 order-3 text-center lg:text-left py-1 lg:py-2">
            {rightBenefits.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 * index,
                }}
                className="group flex flex-col gap-2"
              >
                <span className="label text-dusty-mauve text-[11px] tracking-[0.24em]">
                  0{index + 4}
                </span>
                <h3 className="font-kafina text-[20px] sm:text-[22px] md:text-[24px] text-ink group-hover:text-dusty-mauve transition-colors duration-250 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[13.5px] sm:text-[14.5px] text-ink-muted leading-relaxed max-w-[280px] mx-auto lg:mx-0">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
