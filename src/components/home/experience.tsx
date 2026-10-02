"use client";

import * as React from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EditorialBrandSeal } from "@/components/ui/editorial-brand-seal";

interface CardTheme {
  accentName: string;
  targetBg: string;
  borderColor: string;
  tagBadge: string;
  tagColor: string;
  auroraWave1: string;
  auroraWave2: string;
  auroraWave3?: string;
  coveGradient?: string;
}

interface ExperienceItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  theme: CardTheme;
}

const experienceItems: ExperienceItem[] = [
  {
    id: "lighting",
    num: "01",
    title: "Controlled Lighting Environments",
    subtitle: "Circadian Regulation",
    description:
      "Diffused warm amber temperatures and zero harsh overheads, tuned to downshift nervous system strain from the moment you step across the threshold.",
    image: "/assets/Luxury Amber Pilates Studio.webp",
    alt: "Warm ambient amber cove lighting at Evoa reformer studio",
    theme: {
      accentName: "Amber Glow",
      targetBg: "#f7f1e6", // Warm luminous candlelit linen
      borderColor: "rgba(212, 163, 115, 0.35)",
      tagBadge: "2700K WARM ILLUMINATION",
      tagColor: "#9c6d36",
      auroraWave1:
        "radial-gradient(ellipse 70% 60% at 75% 25%, rgba(254, 250, 224, 0.9) 0%, rgba(250, 237, 205, 0.55) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 55% at 20% 70%, rgba(255, 229, 217, 0.6) 0%, rgba(250, 237, 205, 0.35) 40%, transparent 70%)",
      coveGradient:
        "linear-gradient(180deg, rgba(254, 243, 199, 0.45) 0%, transparent 60%)",
    },
  },
  {
    id: "studios",
    num: "02",
    title: "Studios Designed for Focus",
    subtitle: "Acoustic Stillness",
    description:
      "Acoustically dampened architecture with custom natural timber finishes, dedicated strictly to presence, diaphragmatic breath, and unhurried form.",
    image: "/assets/Luxurious Sunlit Pilates Studio.webp",
    alt: "Natural timber reformer studio with acoustic stillness",
    theme: {
      accentName: "Timber Stillness",
      targetBg: "#ece7de", // Grounded natural timber & oat stone
      borderColor: "rgba(184, 166, 146, 0.32)",
      tagBadge: "ACOUSTIC ISOLATION",
      tagColor: "#6c7250",
      auroraWave1:
        "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(204, 213, 174, 0.65) 0%, rgba(233, 237, 201, 0.45) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 60% at 75% 70%, rgba(233, 237, 201, 0.7) 0%, rgba(212, 163, 115, 0.16) 45%, transparent 70%)",
      coveGradient:
        "linear-gradient(180deg, rgba(233, 237, 201, 0.3) 0%, transparent 60%)",
    },
  },
  {
    id: "transitions",
    num: "03",
    title: "Silent Transitions",
    subtitle: "Spatial Continuity",
    description:
      "Curated buffer zones and threshold pauses between high-resistance reformer work, floor decompression, and restorative wellness areas.",
    image: "/assets/Serene Travertine Wellness Retreat.webp",
    alt: "Curved travertine decompression breezeway threshold",
    theme: {
      accentName: "Mineral Mist",
      targetBg: "#dfe6e1", // Misted tea-green / mineral travertine
      borderColor: "rgba(164, 185, 170, 0.35)",
      tagBadge: "BUFFER THRESHOLD",
      tagColor: "#587250",
      auroraWave1:
        "radial-gradient(ellipse 75% 60% at 25% 25%, rgba(204, 213, 174, 0.6) 0%, rgba(216, 226, 220, 0.4) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 55% at 75% 65%, rgba(216, 226, 220, 0.85) 0%, rgba(254, 250, 224, 0.38) 40%, transparent 70%)",
      coveGradient:
        "linear-gradient(180deg, rgba(204, 213, 174, 0.3) 0%, transparent 60%)",
    },
  },
  {
    id: "rituals",
    num: "04",
    title: "Recovery Rituals Instead of Cooldowns",
    subtitle: "Cellular Renewal",
    description:
      "Post-movement adaptogenic hydration, targeted lymph resets, and weighted linen relaxation tailored to integrate the physical work of your practice.",
    image: "/assets/Warmly Lit Spa Apothecary Lounge.webp",
    alt: "Herbal apothecary recovery and cellular renewal lounge",
    theme: {
      accentName: "Cellular Aurora",
      targetBg: "#eae4e6", // Restorative weighted cashmere linen
      borderColor: "rgba(204, 185, 195, 0.35)",
      tagBadge: "CELLULAR RENEWAL",
      tagColor: "#7e5c6b",
      auroraWave1:
        "radial-gradient(ellipse 70% 55% at 25% 25%, rgba(204, 213, 174, 0.55) 0%, rgba(254, 250, 224, 0.4) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 60% at 75% 70%, rgba(255, 229, 217, 0.6) 0%, rgba(222, 212, 216, 0.35) 40%, transparent 70%)",
      auroraWave3:
        "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(244, 172, 183, 0.18) 0%, transparent 65%)",
      coveGradient:
        "linear-gradient(180deg, rgba(254, 250, 224, 0.3) 0%, rgba(204, 213, 174, 0.15) 40%, transparent 65%)",
    },
  },
];

export function Experience() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll-based rotation: maps 0 -> 1 progress of the section passing the viewport to 0 -> 360 deg
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      data-header-theme="light"
      className="relative w-full overflow-x-clip bg-[#d8e2dc] text-[#1c1815] pt-4 pb-0 sm:pt-16 lg:pt-20"
    >
      {/* FULL-WIDTH CONTAINER (EDGE-TO-EDGE) */}
      <div className="relative z-10 w-full overflow-x-clip">
        {/* Full-Width Section Header */}
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 mb-10 sm:mb-18 md:mb-20 pb-6 sm:pb-10">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column: Clean Editorial Title */}
            <div className="flex flex-col flex-1 min-w-0">
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif font-light text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] text-[#1c1815] tracking-[-0.02em] leading-tight"
              >
                The Experience
              </motion.h2>
            </div>

            {/* Center Column: Scroll-Rotating Circular Editorial Brand Seal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-start lg:justify-center items-center shrink-0 self-start lg:self-center"
            >
              <motion.div
                style={{ rotate }}
                className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 text-[#1c1815] will-change-transform select-none cursor-default"
                title="Evoa Pilates Editorial Brand Seal"
              >
                <EditorialBrandSeal className="w-full h-full" />
              </motion.div>
            </motion.div>

            {/* Right Column: Architectural Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex justify-start lg:justify-end shrink-0"
            >
              <p className="font-sans font-light text-[13.5px] sm:text-[15.5px] md:text-[16.5px] leading-[1.65] text-[#1c1815]/75 lg:max-w-sm xl:max-w-md">
                Architecture, sound, lighting, and pacing engineered to guide your nervous system into deep, unhurried restoration.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Sticky Stacking Cards Deck with Scroll-Based Lighting & Color Transitions */}
        <div className="relative w-full">
          {experienceItems.map((item, index) => {
            const topOffset = isMobile ? 55 + index * 26 : 70 + index * 60;
            const zIndex = 10 + index;

            return (
              <ExperienceStickyCard
                key={item.id}
                item={item}
                index={index}
                topOffset={topOffset}
                zIndex={zIndex}
              />
            );
          })}
        </div>

        {/* Scroll-Based Manifesto Transition */}
        <ScrollManifestoTransition key="manifesto-solid-v6" />
      </div>
    </section>
  );
}

function ExperienceStickyCard({
  item,
  index,
  topOffset,
  zIndex,
}: {
  item: ExperienceItem;
  index: number;
  topOffset: number;
  zIndex: number;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Smooth scroll progress tracking from entry approaching sticky point until it docks
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 88%", `start ${topOffset + 10}px`],
  });

  // GPU compositor opacity fade for background (Zero repaint cost!)
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Border top color softens to blend with the lighting
  const borderTopColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(28,24,21,0.15)", item.theme.borderColor]
  );

  // Aurora opacity & GPU transform drift (Zero CSS filter blur - pre-computed multi-stop gradients)
  const auroraOpacity = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0.45, 1]);

  // GPU Wave 1 translation drift
  const wave1X = useTransform(scrollYProgress, [0, 1], ["-25px", "35px"]);
  const wave1Y = useTransform(scrollYProgress, [0, 1], ["-15px", "20px"]);
  const wave1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.05, 0.98]);

  // GPU Wave 2 counter-drift
  const wave2X = useTransform(scrollYProgress, [0, 1], ["30px", "-25px"]);
  const wave2Y = useTransform(scrollYProgress, [0, 1], ["15px", "-15px"]);
  const wave2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 0.95, 1.02]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        top: `${topOffset}px`,
        zIndex: zIndex,
        borderTopColor: borderTopColor,
        transform: "translateZ(0)",
      }}
      className="sticky w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] border-t shadow-[0_-8px_30px_-6px_rgba(28,24,21,0.06)] pt-5 sm:pt-9 pb-8 sm:pb-14 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-between overflow-hidden will-change-transform"
    >
      {/* Base Solid Alabaster Background */}
      <div className="absolute inset-0 bg-[#d8e2dc] -z-20 pointer-events-none" />

      {/* GPU Opacity Theme Background Fade (Zero Main-Thread Paint!) */}
      <motion.div
        style={{
          opacity: bgOpacity,
          backgroundColor: item.theme.targetBg,
        }}
        className="absolute inset-0 -z-10 pointer-events-none will-change-[opacity]"
      />

      {/* GPU-Accelerated Floating Aurora Wave 1 */}
      <motion.div
        style={{
          opacity: auroraOpacity,
          x: wave1X,
          y: wave1Y,
          scale: wave1Scale,
          background: item.theme.auroraWave1,
        }}
        className="absolute -inset-16 pointer-events-none -z-0 will-change-transform"
      />

      {/* GPU-Accelerated Floating Aurora Wave 2 */}
      <motion.div
        style={{
          opacity: auroraOpacity,
          x: wave2X,
          y: wave2Y,
          scale: wave2Scale,
          background: item.theme.auroraWave2,
        }}
        className="absolute -inset-16 pointer-events-none -z-0 will-change-transform"
      />

      {/* Optional Third Wave for extra depth (Card 04) */}
      {item.theme.auroraWave3 && (
        <motion.div
          style={{
            opacity: auroraOpacity,
            background: item.theme.auroraWave3,
          }}
          className="absolute inset-0 pointer-events-none -z-0 will-change-[opacity]"
        />
      )}

      {/* Concealed Linear Cove Overhead Light (Active on Card 01 - Controlled Lighting) */}
      {item.theme.coveGradient && (
        <motion.div
          style={{
            opacity: auroraOpacity,
            background: item.theme.coveGradient,
          }}
          className="absolute inset-x-0 top-0 h-44 pointer-events-none -z-0 will-change-[opacity]"
        />
      )}

      {/* 2-Column Editorial Split: Left (Number + Title + Paragraph below) & Right (Big Photo Window) */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 lg:gap-12 xl:gap-16 my-auto">
        {/* Left Column: Number on left, Title + Paragraph aligned together on right */}
        <div className="flex items-start gap-3.5 sm:gap-6 md:gap-7 flex-1 min-w-0 max-w-xl xl:max-w-2xl">
          <span className="font-serif font-light text-[24px] sm:text-[42px] md:text-[50px] lg:text-[56px] text-[#1c1815]/75 leading-none select-none tracking-tight shrink-0 pt-0.5 sm:pt-1">
            {item.num}
          </span>
          <div className="flex flex-col flex-1 min-w-0">
            <h3 className="font-serif font-light text-[20px] sm:text-[32px] md:text-[40px] lg:text-[48px] text-[#1c1815] leading-[1.12] tracking-[-0.015em] select-none break-words min-w-0 mb-2.5 sm:mb-4">
              {item.title}
            </h3>

            {/* Editorial Description precisely aligned with the start of the title */}
            <p className="font-sans font-light text-[13px] sm:text-[15.5px] md:text-[17px] leading-[1.62] text-[#1c1815]/75">
              {item.description}
            </p>
          </div>
        </div>

        {/* Right Column: Large Architectural Studio Photo Window */}
        <div className="relative w-full lg:w-[420px] xl:w-[480px] 2xl:w-[540px] aspect-[16/9] sm:aspect-[16/10] max-h-[220px] sm:max-h-none rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-[#e6dcc6]/40 border border-[#1c1815]/10 shadow-[0_16px_36px_rgba(28,24,21,0.09)] group hover:shadow-[0_24px_50px_rgba(28,24,21,0.18)] transition-all duration-500 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.alt}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />

          {/* Subtle floating interactive arrow pill */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1c1815] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

{/* Scroll-Based Manifesto Transition Component */}
function ScrollManifestoTransition() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Strikethrough on "NOT": draws across crisply (0.12 to 0.28)
  const strikeScale = useTransform(scrollYProgress, [0, 0.12, 0.28, 1], [0, 0, 1, 1], { clamp: true });

  // "NOT" blur and fade out right after strikethrough (0.26 to 0.38)
  const notOpacity = useTransform(scrollYProgress, [0, 0.26, 0.38, 1], [1, 1, 0, 0], { clamp: true });
  const notBlurRaw = useTransform(scrollYProgress, [0, 0.26, 0.38, 1], [0, 0, 10, 10], { clamp: true });
  const notFilter = useTransform(notBlurRaw, (v) => (v > 0.2 ? `blur(${Math.max(0, v)}px)` : "none"));

  // Word 1 "FITNESS.": slides UP and blurs out swiftly (0.26 to 0.44)
  const fitnessY = useTransform(scrollYProgress, [0, 0.26, 0.44, 1], ["0%", "0%", "-120%", "-120%"], { clamp: true });
  const fitnessOpacity = useTransform(scrollYProgress, [0, 0.26, 0.44, 1], [1, 1, 0, 0], { clamp: true });
  const fitnessBlurRaw = useTransform(scrollYProgress, [0, 0.26, 0.44, 1], [0, 0, 12, 12], { clamp: true });
  const fitnessFilter = useTransform(fitnessBlurRaw, (v) => (v > 0.2 ? `blur(${Math.max(0, v)}px)` : "none"));

  // Word 2 "RECALIBRATION.": slides UP into place and locks in 100% solid focus by 0.45
  // STAYS 100% VISIBLE (opacity: 1), SHARP (filter: none) with NO outro fade, fixed in background all the way to 1.0 while next section glides over
  const recalY = useTransform(scrollYProgress, [0, 0.28, 0.45, 1], ["120%", "120%", "0%", "0%"], { clamp: true });
  const recalOpacity = useTransform(scrollYProgress, [0, 0.28, 0.45, 1], [0, 0, 1, 1], { clamp: true });
  const recalBlurRaw = useTransform(scrollYProgress, [0, 0.28, 0.45, 1], [12, 12, 0, 0], { clamp: true });
  const recalFilter = useTransform(recalBlurRaw, (v) => (v > 0.2 ? `blur(${Math.max(0, v)}px)` : "none"));

  // Ambient silk light glow transforms
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.20, 0.45, 1], [0.65, 0.65, 1, 1], { clamp: true });
  const bloomScale = useTransform(scrollYProgress, [0, 0.25, 0.45, 1], [0.96, 0.98, 1.06, 1.06], { clamp: true });

  // Concept 2: Somatic Parasympathetic Breath Waveform transforms
  // Waves glide horizontally in opposing directions as you scroll
  const waveDrift1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const waveDrift2 = useTransform(scrollYProgress, [0, 1], [70, -70]);
  // Expands amplitude gracefully as "RECALIBRATION" locks in and stays open
  const waveAmplitude = useTransform(scrollYProgress, [0, 0.22, 0.45, 1], [0.65, 0.75, 1.25, 1.25], { clamp: true });
  const waveOpacity = useTransform(scrollYProgress, [0, 0.15, 0.45, 1], [0.4, 0.7, 0.95, 0.95], { clamp: true });

  return (
    <div ref={containerRef} className="relative w-full h-[260vh] sm:h-[280vh] mt-6 sm:mt-12 overflow-x-clip">
      {/* Sticky Screen Viewport with stacking isolation - stays fixed in background at z-10 */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full flex flex-col items-center justify-center px-3 sm:px-6 md:px-10 pointer-events-none isolate z-10">
        {/* Velvety Soft Ambient Light Diffusion: Delicate silk highlight with zero harsh borders or grey rings */}
        <motion.div
          style={{
            opacity: bloomOpacity,
            scale: bloomScale,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 will-change-transform"
        >
          <div className="w-full h-full bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(255,255,255,0.75)_0%,rgba(255,250,246,0.52)_25%,rgba(240,246,242,0.32)_50%,rgba(226,236,230,0.14)_75%,transparent_100%)]" />
        </motion.div>

        {/* Concept 2: Organic Parasympathetic Breath Waveform (SVG Layer) */}
        <motion.div
          style={{
            opacity: waveOpacity,
            scaleY: waveAmplitude,
          }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-[240px] sm:h-[380px] md:h-[480px] pointer-events-none z-0 will-change-transform"
        >
          <svg
            viewBox="0 0 1440 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Wave 3: Deep harmonic resonance ribbon (faint natural sage undertone) */}
            <motion.path
              style={{ x: waveDrift2 }}
              d="M-300 210 C 120 330, 480 70, 720 200 C 960 330, 1320 70, 1740 210"
              stroke="#5d7064"
              strokeWidth="1.2"
              strokeOpacity="0.25"
              strokeDasharray="4 6"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />

            {/* Wave 2: Secondary breath echo (soft ivory / warm porcelain ribbon) */}
            <motion.path
              style={{ x: waveDrift1 }}
              d="M-300 190 C 180 60, 460 340, 720 200 C 980 60, 1260 340, 1740 190"
              stroke="#fefae0"
              strokeWidth="1.4"
              strokeOpacity="0.55"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />

            {/* Wave 1: Primary somatic breath wave (pure luminous daylight white silk - zero color clash with purple text) */}
            <motion.path
              style={{ x: waveDrift2 }}
              d="M-300 200 C 140 90, 440 310, 720 200 C 1000 90, 1300 310, 1740 200"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeOpacity="0.85"
              strokeLinecap="round"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </motion.div>

        {/* Central Stage Lockup - Syne Display Font (var(--font-syne)) */}
        <div className="relative z-10 w-full max-w-[96vw] sm:max-w-[94vw] flex flex-col items-center justify-center text-center font-[family-name:var(--font-syne)] font-bold text-[clamp(20px,6.8vw,34px)] sm:text-[46px] md:text-[58px] lg:text-[72px] xl:text-[86px] 2xl:text-[98px] uppercase tracking-tight leading-[0.98] select-none">
          {/* Line 1: THIS IS NOT (with static "THIS IS" and struck-through "NOT") */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-7 text-[#1c1815] whitespace-nowrap">
            <span>THIS IS</span>

            {/* Word "NOT" with animated strikethrough and blur dissolve */}
            <span className="relative inline-flex items-center">
              <motion.span
                style={{
                  opacity: notOpacity,
                  filter: notFilter,
                }}
                className="text-[#5e5346] will-change-[filter,opacity]"
              >
                NOT
              </motion.span>

              {/* Dynamic Strikethrough Line */}
              <motion.span
                style={{
                  scaleX: strikeScale,
                  originX: 0,
                  opacity: notOpacity,
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2.5px] sm:h-[4px] md:h-[5px] bg-[#9d8189] rounded-full will-change-transform"
              />
            </span>
          </div>

          {/* Line 2: Vertical Switch Roller between FITNESS. and RECALIBRATION. */}
          <div className="relative w-full h-[1.24em] sm:h-[1.18em] overflow-hidden flex items-center justify-center mt-1 sm:mt-2">
            {/* Word 1: FITNESS. (slides up and blurs out) */}
            <motion.div
              style={{
                y: fitnessY,
                opacity: fitnessOpacity,
                filter: fitnessFilter,
              }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap will-change-[transform,filter,opacity]"
            >
              <span className="text-[#5e5346]">FITNESS.</span>
            </motion.div>

            {/* Word 2: RECALIBRATION. (Distinct dusty mauve accent from palette 1: #9d8189) */}
            <motion.div
              style={{
                y: recalY,
                opacity: recalOpacity,
                filter: recalFilter,
              }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-1 sm:px-2 will-change-[transform,filter,opacity]"
            >
              <span className="text-[#9d8189]">
                RECALIBRATION.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
