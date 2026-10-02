"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

interface SpaceItem {
  id: string;
  num: string;
  name: string;
  system: string;
  specs: string;
  description: string;
  image: string;
}

const spaces: SpaceItem[] = [
  {
    id: "reform-room",
    num: "01",
    name: "The Reform Room.",
    system: "Musculoskeletal & Spinal Decompression",
    specs: "Eight custom reformers · Natural timber frames · Low-friction glide",
    description:
      "Spring-loaded carriage sequencing tailored for core stabilization, joint articulation, and deep functional strength without impact.",
    image: "/assets/class-reformer.webp",
  },
  {
    id: "mat-vault",
    num: "02",
    name: "The Mat Vault.",
    system: "Deep Core & Diaphragmatic Breath Integration",
    specs: "Acoustically isolated · Zero mirrors · Supportive dense matting",
    description:
      "Floor-bound discipline engaging the intrinsic stabilizers through unhurried classical sequences and rhythm-driven breathwork.",
    image: "/assets/class-mat.webp",
  },
  {
    id: "recovery-bar",
    num: "03",
    name: "The Recovery Bar.",
    system: "Cellular Hydration & Autonomic Nervous System",
    specs: "Travertine bar · Adaptogenic infusions · Cold-pressed botanicals",
    description:
      "Post-movement apothecary bar designed to regulate cortisol, replenish vital electrolytes, and transition your nervous system into ease.",
    image: "/assets/space-recovery-bar.jpg",
  },
  {
    id: "quiet-room",
    num: "04",
    name: "The Quiet Room.",
    system: "Central Nervous System & Somatic Stillness",
    specs: "Zero digital devices · Weighted oatmeal linen · Diffused warmth",
    description:
      "A private decompression lounge engineered for uninterrupted stillness, letting your body absorb and integrate the work of the studio.",
    image: "/assets/space-quiet-room.jpg",
  },
];

export function Spaces() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [manualIndex, setManualIndex] = React.useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      setManualIndex(null);
      const step = 1 / spaces.length;
      const index = Math.min(
        spaces.length - 1,
        Math.max(0, Math.floor(latest / step))
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentActive = manualIndex !== null ? manualIndex : activeIndex;
  const currentSpace = spaces[currentActive];

  const handleSelect = (idx: number) => {
    setManualIndex(idx);
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScrollHeight = containerRef.current.offsetHeight - window.innerHeight;
      const targetScroll = scrollTop + rect.top + (idx / (spaces.length - 1)) * totalScrollHeight;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="spaces"
      data-header-theme="light"
      className="relative z-20 -mt-[100vh] -mt-[100dvh] w-full h-[260vh] bg-[#d8e2dc] text-[#1c1815] overflow-x-clip rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] shadow-none border-none"
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-20 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 overflow-hidden z-10 rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px]">
        {/* Top Section Header - Matching 'The Experience' */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-6 shrink-0">
          <div className="flex flex-col">
            <h2 className="font-serif font-light text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-[#1c1815] tracking-[-0.02em] leading-tight">
              The Spaces
            </h2>
          </div>

          <div className="flex items-center gap-2.5 font-sans font-light text-[11.5px] sm:text-[12.5px] tracking-[0.24em] text-[#746859] uppercase">
            <span className="w-5 h-px bg-[#9d8189]" />
            <span>ARCHITECTURES OF REGULATION</span>
          </div>
        </div>

        {/* Center Main Split: Left Photo + Right Interactive List */}
        <div className="w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 xl:gap-24 my-auto py-4">
          {/* Left Column: Dynamic Space Photo Card */}
          <div className="w-full lg:w-[46%] xl:w-[44%] flex items-center justify-center shrink-0">
            <div className="relative w-full max-w-[480px] lg:max-w-none aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#1c1815]/5 border border-[#1c1815]/10 shadow-[0_20px_45px_rgba(28,24,21,0.08)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpace.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentSpace.image}
                    alt={currentSpace.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Reference-Style Accordion Headlines */}
          <div className="w-full lg:w-[54%] xl:w-[56%] flex flex-col justify-center">
            <div className="w-full flex flex-col">
              {spaces.map((space, idx) => {
                const isActive = idx === currentActive;

                return (
                  <div
                    key={space.id}
                    onClick={() => handleSelect(idx)}
                    className="border-t border-[#1c1815]/15 py-4 sm:py-5 lg:py-6 cursor-pointer group transition-all duration-300"
                  >
                    {/* Item Row: Headline + Numeric Index */}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className={`font-[family-name:var(--font-syne)] text-[32px] sm:text-[42px] md:text-[50px] lg:text-[56px] xl:text-[62px] leading-[1.06] tracking-tight transition-colors duration-400 select-none ${
                          isActive
                            ? "text-[#1c1815] font-semibold"
                            : "text-[#1c1815]/30 font-normal group-hover:text-[#1c1815]/65"
                        }`}
                      >
                        {space.name}
                      </h3>

                      <span
                        className={`font-sans font-light text-[12px] sm:text-[13px] tracking-widest transition-colors duration-300 select-none shrink-0 ${
                          isActive ? "text-[#9d8189] font-medium" : "text-[#1c1815]/30"
                        }`}
                      >
                        {space.num}
                      </span>
                    </div>

                    {/* Smooth Accordion Body Expansion for Active Item */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden flex flex-col pr-4"
                        >
                          <p className="font-sans font-light text-[14px] sm:text-[15.5px] md:text-[16px] text-[#1c1815]/75 leading-relaxed max-w-xl">
                            {space.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {/* Bottom Closing Line */}
              <div className="border-t border-[#1c1815]/15" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
