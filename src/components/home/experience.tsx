"use client";

import * as React from "react";
import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EditorialBrandSeal } from "@/components/ui/editorial-brand-seal";
import { SparkText } from "@/components/ui/spark-text";
import { wipeHidden, wipeShown, wipeTransition } from "@/components/ui/reveal";

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
  accent: string; // the one word of the title set in the script face
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
    accent: "Lighting",
    subtitle: "Circadian Regulation",
    description:
      "Diffused warm amber temperatures and zero harsh overheads, tuned to downshift nervous system strain from the moment you step across the threshold.",
    image: "/assets/Warm Modern Pilates Studio (1).webp",
    alt: "Concealed amber cove lighting and round sconces warming the sage tile wall of the Evoa studio at dusk",
    theme: {
      accentName: "Amber Glow",
      targetBg: "#f4e4d0", // Peach-glaze sconce light
      borderColor: "rgba(237, 184, 153, 0.45)",
      tagBadge: "2700K WARM ILLUMINATION",
      tagColor: "#8a5a2b",
      auroraWave1:
        "radial-gradient(ellipse 70% 60% at 75% 25%, rgba(248, 224, 198, 0.9) 0%, rgba(243, 214, 184, 0.55) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 55% at 20% 70%, rgba(237, 184, 153, 0.5) 0%, rgba(243, 214, 184, 0.3) 40%, transparent 70%)",
      coveGradient:
        "linear-gradient(180deg, rgba(250, 226, 186, 0.5) 0%, transparent 60%)",
    },
  },
  {
    id: "studios",
    num: "02",
    title: "Studios Designed for Focus",
    accent: "Focus",
    subtitle: "Acoustic Stillness",
    description:
      "Acoustically dampened architecture with custom natural timber finishes, dedicated strictly to presence, diaphragmatic breath, and unhurried form.",
    image: "/assets/Sunlit Minimalist Pilates Studio.webp",
    alt: "A calm Evoa studio with timber slat walls, sage tile and a row of reformers in soft daylight",
    theme: {
      accentName: "Timber Stillness",
      targetBg: "#e8ddc8", // Teak-toned oat
      borderColor: "rgba(122, 74, 43, 0.28)",
      tagBadge: "ACOUSTIC ISOLATION",
      tagColor: "#7a4a2b",
      auroraWave1:
        "radial-gradient(ellipse 70% 55% at 20% 30%, rgba(214, 190, 150, 0.55) 0%, rgba(232, 221, 200, 0.45) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 60% at 75% 70%, rgba(225, 208, 176, 0.7) 0%, rgba(196, 103, 63, 0.12) 45%, transparent 70%)",
      coveGradient:
        "linear-gradient(180deg, rgba(232, 221, 200, 0.4) 0%, transparent 60%)",
    },
  },
  {
    id: "transitions",
    num: "03",
    title: "Silent Transitions",
    accent: "Silent",
    subtitle: "Spatial Continuity",
    description:
      "Curated buffer zones and threshold pauses between high-resistance reformer work, floor decompression, and restorative wellness areas.",
    image: "/assets/Serene Pilates Studio with Arched Doorway (1).webp",
    alt: "A woman walking quietly through an arched doorway between two rooms of the Evoa studio",
    theme: {
      accentName: "Mineral Mist",
      targetBg: "#d3e0ce", // Glazed mint tile
      borderColor: "rgba(143, 165, 131, 0.4)",
      tagBadge: "BUFFER THRESHOLD",
      tagColor: "#3e5a47",
      auroraWave1:
        "radial-gradient(ellipse 75% 60% at 25% 25%, rgba(175, 198, 165, 0.6) 0%, rgba(203, 218, 198, 0.4) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 55% at 75% 65%, rgba(203, 218, 198, 0.85) 0%, rgba(239, 231, 214, 0.38) 40%, transparent 70%)",
      coveGradient:
        "linear-gradient(180deg, rgba(175, 198, 165, 0.3) 0%, transparent 60%)",
    },
  },
  {
    id: "rituals",
    num: "04",
    title: "Recovery Rituals Instead of Cooldowns",
    accent: "Rituals",
    subtitle: "Cellular Renewal",
    description:
      "Post-movement adaptogenic hydration, targeted lymph resets, and weighted linen relaxation tailored to integrate the physical work of your practice.",
    image: "/assets/Steaming Tea in a Sunlit Wellness Studio.webp",
    alt: "Steaming tonic cups and a glass carafe on the travertine Recovery Bar with its star-tile front",
    theme: {
      accentName: "Cellular Aurora",
      targetBg: "#f0c7a6", // Terracotta clay
      borderColor: "rgba(196, 103, 63, 0.38)",
      tagBadge: "CELLULAR RENEWAL",
      tagColor: "#96421f",
      auroraWave1:
        "radial-gradient(ellipse 70% 55% at 25% 25%, rgba(143, 165, 131, 0.4) 0%, rgba(239, 231, 214, 0.4) 45%, transparent 75%)",
      auroraWave2:
        "radial-gradient(ellipse 65% 60% at 75% 70%, rgba(228, 150, 104, 0.5) 0%, rgba(232, 176, 140, 0.3) 40%, transparent 70%)",
      auroraWave3:
        "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(196, 103, 63, 0.22) 0%, transparent 65%)",
      coveGradient:
        "linear-gradient(180deg, rgba(246, 224, 206, 0.35) 0%, rgba(143, 165, 131, 0.12) 40%, transparent 65%)",
    },
  },
];

export function Experience() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

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
      className="relative w-full overflow-x-clip bg-mint text-ink pt-4 pb-0 sm:pt-16 lg:pt-20"
    >
      {/* FULL-WIDTH CONTAINER (EDGE-TO-EDGE) */}
      <div className="relative z-10 w-full overflow-x-clip">
        {/* Full-Width Section Header */}
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 mb-10 sm:mb-18 md:mb-20 pb-6 sm:pb-10">
          <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-8 lg:gap-12">
            {/* Left Column: Clean Editorial Title */}
            <div className="flex flex-col flex-1 min-w-0">
              <motion.h2
                initial={wipeHidden}
                animate={isInView ? wipeShown : {}}
                transition={wipeTransition}
                className="font-display text-[30px] sm:text-[42px] md:text-[52px] lg:text-[60px] text-ink tracking-normal leading-[1.4]"
              >
                <SparkText>The Experience</SparkText>
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
                className="w-24 h-24 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 relative text-rust will-change-transform select-none cursor-default"
                title="Evoa Pilates Editorial Brand Seal"
              >
                <EditorialBrandSeal className="w-full h-full" />
                <span className="absolute left-1/2 top-1/2 h-2 w-2 sm:h-2.5 sm:w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark" />
              </motion.div>
            </motion.div>

            {/* Right Column: Architectural Description */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex justify-start lg:justify-end shrink-0"
            >
              <p className="font-sans font-light text-[13.5px] sm:text-[15.5px] md:text-[16.5px] leading-[1.65] text-ink/75 lg:max-w-sm xl:max-w-md">
                Architecture, sound, lighting, and pacing engineered to guide your nervous system into deep, unhurried restoration.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Rounded cream panels on the mint page (same look as the Classes panel and the footer card).
            Below lg they are a swipeable row, on lg a 2 x 2 grid, so the section stays short.
            Each panel's colour wash blooms as it crosses the screen. */}
        <div className="hide-scrollbar relative flex w-full snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden px-3 py-3 sm:gap-4 sm:px-6 lg:grid lg:snap-none lg:grid-cols-2 lg:gap-5 lg:overflow-visible lg:px-10 lg:py-0">
          {experienceItems.map((item) => (
            <ExperienceStickyCard key={item.id} item={item} />
          ))}
        </div>

        {/* Scroll-Based Manifesto Transition */}
        <ScrollManifestoTransition key="manifesto-solid-v6" />
      </div>
    </section>
  );
}

/* Card title in the serif, with one key word picked out in the script face (rust, a touch larger
   since the script's letters run small; its line-height is pinched so it doesn't open up the line). */
function CardTitle({ title, accent }: { title: string; accent: string }) {
  const at = title.indexOf(accent);
  if (at < 0) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="font-script text-rust text-[1.4em] leading-[0.7] tracking-normal">{accent}</span>
      {title.slice(at + accent.length)}
    </>
  );
}

/* One experience: a plain cream panel (same cream as the Classes panel) on the mint page. The colour
   comes from the photo, so the panel itself stays quiet. */
function ExperienceStickyCard({ item }: { item: ExperienceItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex w-[84vw] max-w-[440px] shrink-0 snap-center flex-col overflow-hidden rounded-[32px] bg-plaster p-4 shadow-[0_24px_60px_rgba(36,26,20,0.07)] sm:w-[58vw] sm:rounded-[40px] sm:p-5 lg:w-auto lg:max-w-none lg:rounded-[52px] lg:p-6">
      {/* Photo on top, then number + title + text */}
      <div className="relative z-10 flex w-full flex-1 flex-col gap-5 sm:gap-6">
        <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-ink/10 bg-cream-line/40 shadow-[0_16px_36px_rgba(36,26,20,0.09)] transition-all duration-500 hover:shadow-[0_24px_50px_rgba(36,26,20,0.18)] sm:rounded-[20px] lg:aspect-[2/1] lg:rounded-[28px]">
          <motion.img
            initial={{ scale: 1.18 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            src={item.image}
            alt={item.alt}
            className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-20" />

          {/* Subtle floating interactive arrow pill */}
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-9 sm:w-9">
            <ArrowUpRight size={14} strokeWidth={2.2} />
          </div>
        </div>

        <div className="flex items-start gap-4 px-2 pb-2 sm:gap-5 sm:px-3 sm:pb-3">
          <span className="shrink-0 select-none pt-1 font-serif text-[22px] font-light leading-none tracking-tight text-ink/60 sm:text-[28px]">
            {item.num}
          </span>
          <div className="flex min-w-0 flex-1 flex-col">
            <h3 className="mb-2.5 min-w-0 select-none break-words font-title text-[28px] font-normal leading-[1.08] tracking-[-0.01em] text-ink sm:mb-3 sm:text-[34px] lg:text-[38px] xl:text-[42px]">
              <CardTitle title={item.title} accent={item.accent} />
            </h3>
            <p className="font-sans text-[13.5px] font-light leading-[1.62] text-ink/75 sm:text-[15px]">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Manifesto: "This is not Fitness." -> "Recalibration." ----
   One pinned stage driven by the scroll progress p (0..1) of the tall container below.
   The next section (Spaces) starts sliding over the stage at roughly p = 0.58-0.62, so the
   whole sequence lands by ~0.55:
     0.05-0.30  fitness clichés are struck out in red, one by one, drifting behind the headline
     0.24-0.32  the main "not" is struck
     0.30-0.50  "Fitness." rolls out, "Recalibration." rolls in
     0.30-0.55  the sunrise rises from the horizon                                              */

const CLICHES: Array<{ word: string; x: number; y: number; drift: number }> = [
  { word: "SWEAT", x: 17, y: 15, drift: 26 },
  { word: "BURN", x: 50, y: 11, drift: -18 },
  { word: "NO PAIN, NO GAIN", x: 74, y: 20, drift: 30 },
  { word: "REPS", x: 31, y: 26, drift: -24 },
  { word: "HIIT", x: 90, y: 30, drift: 16 },
  { word: "GRIND", x: 46, y: 74, drift: -22 },
  { word: "SHRED", x: 84, y: 78, drift: 20 },
  { word: "CALORIES", x: 22, y: 82, drift: -28 },
  { word: "PERSONAL BEST", x: 62, y: 88, drift: 24 },
  { word: "LEG DAY", x: 12, y: 90, drift: -16 },
];

/* Concentric sunrise rings, outermost first (hex = palette tokens: mint-deep, peach-soft,
   pastel-pink, terracotta, deep-green). */
const SUN_RINGS = [
  { r: 495, fill: "#b4c9ae", opacity: 0.5 },
  { r: 400, fill: "#f8e0ce", opacity: 1 },
  { r: 305, fill: "#f3cdb0", opacity: 1 },
  { r: 215, fill: "#c4673f", opacity: 1 },
  { r: 125, fill: "#2c4234", opacity: 1 },
];

/* A fitness cliché that gets crossed out by a red line as you scroll, then fades with the swap. */
function Cliche({
  progress,
  word,
  x,
  y,
  drift,
  index,
}: {
  progress: MotionValue<number>;
  word: string;
  x: number;
  y: number;
  drift: number;
  index: number;
}) {
  const start = 0.06 + index * 0.022;
  const end = start + 0.035;
  const opacity = useTransform(progress, [0, 0.05, start, end, 0.3, 0.44], [0, 0.75, 0.75, 0.4, 0.4, 0]);
  const strike = useTransform(progress, [start, end], [0, 1], { clamp: true });
  const driftY = useTransform(progress, [0, 1], [drift, -drift]);

  return (
    <motion.span
      style={{ left: `${x}%`, top: `${y}%`, y: driftY, opacity }}
      className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.28em] text-ink-muted sm:text-[12px] lg:text-[14px]"
    >
      <span className="relative inline-block">
        {word}
        <motion.span
          style={{ scaleX: strike }}
          className="absolute left-0 right-0 top-1/2 h-[1.5px] origin-left bg-spark"
        />
      </span>
    </motion.span>
  );
}

/* Mid-century sunrise: concentric half-discs on the horizon with a small red sun, breathing slowly. */
function Sunrise({ progress }: { progress: MotionValue<number> }) {
  const y = useTransform(progress, [0.3, 0.55], ["40%", "0%"], { clamp: true });
  const opacity = useTransform(progress, [0.3, 0.44], [0, 1], { clamp: true });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
      <motion.div style={{ y, opacity }} className="w-[min(140vw,1200px,110dvh)] will-change-transform">
        <svg viewBox="0 0 1000 500" fill="none" className="block h-auto w-full" xmlns="http://www.w3.org/2000/svg">
          {SUN_RINGS.map((ring, i) => (
            <circle
              key={ring.r}
              cx="500"
              cy="500"
              r={ring.r}
              className="sun-ring"
              style={{ fill: ring.fill, opacity: ring.opacity, animationDelay: `${-i * 0.9}s` }}
            />
          ))}
          <circle className="sun-dot" cx="500" cy="425" r="15" style={{ fill: "#ff5a3c" }} />
        </svg>
      </motion.div>
    </div>
  );
}

/* Scroll-Based Manifesto Transition Component */
function ScrollManifestoTransition() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Strikethrough on "not": the last stroke of the sequence (0.24 to 0.32)
  const strikeScale = useTransform(scrollYProgress, [0, 0.24, 0.32, 1], [0, 0, 1, 1], { clamp: true });

  // "not" blurs and fades right after being struck (0.31 to 0.40)
  const notOpacity = useTransform(scrollYProgress, [0, 0.31, 0.4, 1], [1, 1, 0, 0], { clamp: true });
  const notBlurRaw = useTransform(scrollYProgress, [0, 0.31, 0.4, 1], [0, 0, 10, 10], { clamp: true });
  const notFilter = useTransform(notBlurRaw, (v) => (v > 0.2 ? `blur(${Math.max(0, v)}px)` : "none"));

  // "Fitness.": slides UP and blurs out (0.32 to 0.46)
  const fitnessY = useTransform(scrollYProgress, [0, 0.32, 0.46, 1], ["0%", "0%", "-120%", "-120%"], { clamp: true });
  const fitnessOpacity = useTransform(scrollYProgress, [0, 0.32, 0.46, 1], [1, 1, 0, 0], { clamp: true });
  const fitnessBlurRaw = useTransform(scrollYProgress, [0, 0.32, 0.46, 1], [0, 0, 12, 12], { clamp: true });
  const fitnessFilter = useTransform(fitnessBlurRaw, (v) => (v > 0.2 ? `blur(${Math.max(0, v)}px)` : "none"));

  // "Recalibration.": slides UP into place and locks in sharp by 0.50; stays put while the next
  // section glides over the stage
  const recalY = useTransform(scrollYProgress, [0, 0.34, 0.5, 1], ["120%", "120%", "0%", "0%"], { clamp: true });
  const recalOpacity = useTransform(scrollYProgress, [0, 0.34, 0.5, 1], [0, 0, 1, 1], { clamp: true });
  const recalBlurRaw = useTransform(scrollYProgress, [0, 0.34, 0.5, 1], [12, 12, 0, 0], { clamp: true });
  const recalFilter = useTransform(recalBlurRaw, (v) => (v > 0.2 ? `blur(${Math.max(0, v)}px)` : "none"));

  // Ambient silk light glow transforms
  const bloomOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 1], [0.65, 0.65, 1, 1], { clamp: true });
  const bloomScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 1], [0.96, 0.98, 1.06, 1.06], { clamp: true });

  return (
    <div ref={containerRef} className="relative w-full h-[340vh] sm:h-[360vh] mt-6 sm:mt-12 overflow-x-clip">
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
          <div className="w-full h-full bg-[radial-gradient(ellipse_75%_60%_at_50%_50%,rgba(250,236,218,0.8)_0%,rgba(248,230,208,0.55)_25%,rgba(237,226,204,0.32)_50%,rgba(220,226,206,0.14)_75%,transparent_100%)]" />
        </motion.div>

        {/* Mid-century sunrise rising from the horizon as the word changes */}
        <Sunrise progress={scrollYProgress} />

        {/* Fitness clichés that get crossed out, drifting at different depths behind the headline */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
          {CLICHES.map((c, i) => (
            <Cliche key={c.word} progress={scrollYProgress} index={i} {...c} />
          ))}
        </div>

        {/* Central Stage Lockup - Boldonse display (font-display) with red points on every i and . */}
        <h2 className="relative z-10 flex w-full max-w-[96vw] flex-col items-center justify-center text-center font-display font-normal leading-none tracking-normal select-none [font-size:clamp(26px,min(8.6vw,17dvh),112px)]">
          {/* Line 1: "This is not" (static "This is" + struck-through "not") */}
          <span className="flex h-[1.5em] items-center justify-center gap-[0.28em] whitespace-nowrap text-ink">
            <span>
              <SparkText>This is</SparkText>
            </span>

            {/* "not" with animated strikethrough and blur dissolve */}
            <span className="relative inline-flex items-center">
              <motion.span
                style={{
                  opacity: notOpacity,
                  filter: notFilter,
                }}
                className="text-ink-muted will-change-[filter,opacity]"
              >
                not
              </motion.span>

              {/* Dynamic Strikethrough Line */}
              <motion.span
                style={{
                  scaleX: strikeScale,
                  originX: 0,
                  opacity: notOpacity,
                }}
                className="absolute left-0 top-[58%] -translate-y-1/2 w-full h-[max(2.5px,0.05em)] bg-spark rounded-full will-change-transform"
              />
            </span>
          </span>

          {/* Line 2: Vertical Switch Roller between "Fitness." and "Recalibration." */}
          <span className="relative flex h-[1.5em] w-full items-center justify-center overflow-hidden">
            {/* Word 1: Fitness. (slides up and blurs out) */}
            <motion.span
              style={{
                y: fitnessY,
                opacity: fitnessOpacity,
                filter: fitnessFilter,
              }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap will-change-[transform,filter,opacity]"
            >
              <span className="text-ink-muted">
                <SparkText>Fitness.</SparkText>
              </span>
            </motion.span>

            {/* Word 2: Recalibration. - deep green so the red points read clearly */}
            <motion.span
              style={{
                y: recalY,
                opacity: recalOpacity,
                filter: recalFilter,
              }}
              className="absolute inset-0 flex items-center justify-center whitespace-nowrap px-1 sm:px-2 will-change-[transform,filter,opacity]"
            >
              <span className="text-deep-green">
                <SparkText>Recalibration.</SparkText>
              </span>
            </motion.span>
          </span>
        </h2>
      </div>
    </div>
  );
}
