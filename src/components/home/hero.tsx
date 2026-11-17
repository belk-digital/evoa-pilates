"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useIntro } from "@/components/intro/intro-context";
import { cn } from "@/lib/utils";

// The previous white-studio stills (white-*.jpg) are still in /public/assets, just unused.
const heroImages = [
  {
    src: encodeURI("/assets/Sunlit Sage Pilates Studio.webp"),
    alt: "EVOA studio in daylight: sage tile wall with round sconces, terrazzo floor and timber reformers",
  },
  {
    src: encodeURI("/assets/Warm Dusk Pilates Studio.webp"),
    alt: "EVOA studio at dusk: warm sconce glow on sage tile, polished terrazzo floor and timber reformers",
  },
];

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* A line of the headline that rises into view from behind its own edge. The edge is a clip-path rather than overflow-hidden, so
   it can reach a little past the line (room for descenders) without changing the layout. */
function Mask({ show, delay = 0, instant, className, children }: { show: boolean; delay?: number; instant?: boolean; className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("block", className)} style={{ clipPath: "inset(-0.1em -0.3em -0.18em -0.3em)" }}>
      <motion.span
        className="block"
        initial={{ y: "130%" }}
        animate={{ y: show ? "0%" : "130%" }}
        transition={{ duration: instant ? 0 : 1.15, ease: EASE, delay: show ? delay : 0 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const { state, api } = useIntro();
  const { content: ready, letters, opened, instant } = state;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      data-header-theme="dark"
      className="sticky top-0 h-[76dvh] min-h-[500px] sm:h-screen sm:h-[100dvh] sm:min-h-[100dvh] w-full overflow-hidden bg-forest flex flex-col justify-between z-10"
    >
      {/* Background Image Layer with Crossfading and Cinematic Scrim for High Contrast */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {heroImages.map((img, idx) => {
          // the first photograph pushes in from a little closer as the door opens (or straight away on a repeat visit)
          const settle = opened && !instant && idx === 0 && currentImageIndex === 0;
          return (
            <motion.img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={idx === 0 ? { opacity: 0, scale: 1.06 } : false}
              animate={{
                opacity: idx === currentImageIndex ? 1 : 0,
                scale: settle ? [1.18, 1.02] : 1.02,
              }}
              transition={{
                duration: settle ? 3.2 : idx === 0 && currentImageIndex === 0 ? 1.8 : 1.6,
                ease: EASE,
              }}
            />
          );
        })}

        {/* Global atmospheric darkening tint to let white typography and thin celestial lines pop */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />

        {/* Left scrim: the tagline and buttons sit over the brightest part of these studio shots */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />

        {/* Top gradient vignette for header and glass pill legibility */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-52 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Center subtle dark radial vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(14,24,18,0.45)_100%] pointer-events-none" />

        {/* Bottom gradient vignette for giant 'evoa' typography contrast */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-96 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Responsive Top Spacer: pushes content safely below header */}
      <div className="w-full h-16 sm:h-24 md:h-32 shrink-0 pointer-events-none" />

      {/* Mid Section: Vertically balanced Editorial Content Block (Paragraph + CTA Button) */}
      <div className="relative z-20 w-full px-5 sm:px-10 md:px-16 lg:px-24 pointer-events-auto flex-1 flex flex-col justify-center">
        <div className="flex max-w-md flex-col items-start sm:max-w-xl md:max-w-3xl">
          <div className="flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: ready ? 1 : 0, letterSpacing: ready ? "0.32em" : "0.6em" }}
              transition={{ duration: instant ? 0 : 1.4, ease: EASE, delay: ready ? 0.05 : 0 }}
              className="label mb-6 text-peach-soft tracking-[0.32em] text-[11px] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] sm:mb-8 sm:text-[13px]"
            >
              <span className="whitespace-nowrap">Evolution of Awareness</span>
              <span className="mx-1.5 hidden text-peach-soft/60 sm:inline">·</span>{" "}
              <span className="whitespace-nowrap">Cuerpo + Alma</span>
            </motion.span>
            <h1 className="font-display text-[34px] font-normal leading-[1.14] tracking-normal text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] sm:text-[46px] md:text-[54px] lg:text-[60px]">
              <Mask show={ready} instant={instant} delay={0.12}>
                Movement with intention.
              </Mask>
              <Mask show={ready} instant={instant} delay={0.26} className="text-peach-soft">
                Strength with soul.
              </Mask>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: instant ? 0 : 1, ease: EASE, delay: ready ? 0.6 : 0 }}
              className="mt-6 font-sans text-[15px] font-light leading-relaxed tracking-wide text-white/85 drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)] sm:mt-8 sm:text-[17px] md:text-[19px]"
            >
              A different kind of Pilates experience.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: instant ? 0 : 0.85, delay: ready ? 0.85 : 0, ease: EASE }}
            className="mt-10 sm:mt-14"
          >
            <Link
              href="#experience"
              className="group relative inline-flex items-center gap-3.5 sm:gap-4 rounded-full bg-white pl-6 pr-2.5 py-2.5 sm:pl-9 sm:pr-3.5 sm:py-3.5 text-[11px] sm:text-[13px] font-semibold tracking-[0.22em] text-ink uppercase shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.5)] transition-shadow duration-300"
            >
              {/* Luxury Rolling Text Track */}
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    DISCOVER THE EVOA EXPERIENCE
                  </span>
                  <span className="h-[18px] flex items-center text-rust font-semibold">
                    DISCOVER THE EVOA EXPERIENCE
                  </span>
                </div>
              </div>

              {/* Minimalist Dark Arrow Pill with Continuous Rolling Arrow */}
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-ink text-white transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-spark">
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

      {/* Giant Bottom Typography ("evoa") - Right Aligned with Staggered Letter Entrance. Set in the light geometric sans: at this
          size only the tops of the letters show above the card, and the sans gives clean arcs (like the site's doorways)
          where the Didone looked clumsy.
          The Philosophy section overlaps the hero by -mt-16 / sm:-mt-24 / md:-mt-32 (see philosophy-statement),
          so below lg the bottom padding is the overlap minus ~20% of the letter height: the word sits tucked
          slightly under the card's top edge instead of being half covered.
          Each letter is a static outer span (the entrance overlays measure it, to land exactly on it) with the moving one inside. */}
      <div className="relative z-20 w-full overflow-hidden pointer-events-none select-none flex justify-end pr-2.5 sm:pr-8 md:pr-12 lg:pr-16 pb-[48px] sm:pb-[74px] md:pb-[calc(98px+1.5vw)] lg:pb-[calc(5rem+3vw)] shrink-0">
        <div
          aria-hidden
          className="font-sans font-light text-mint text-[46vw] xs:text-[43vw] sm:text-[38vw] md:text-[30vw] lg:text-[28vw] leading-[0.74] tracking-[-0.06em] translate-y-[6%] sm:translate-y-[4%] md:translate-y-[2%] text-right whitespace-nowrap drop-shadow-none"
        >
          {["e", "v", "o", "a"].map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                api.letterEls.current[index] = el;
              }}
              className="inline-block"
            >
              <motion.span
                initial={{ y: "135%", opacity: 0 }}
                animate={
                  letters === "rise"
                    ? { y: "0%", opacity: 1 }
                    : letters === "show"
                      ? { y: "0%", opacity: 1 }
                      : { y: "135%", opacity: 0 }
                }
                transition={
                  letters === "rise"
                    ? { duration: 1.25, delay: 0.35 + index * 0.12, ease: EASE }
                    : { duration: 0 }
                }
                className="inline-block"
              >
                {letter}
              </motion.span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
