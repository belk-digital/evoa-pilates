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
  const { state } = useIntro();
  const { content: ready, opened, instant } = state;

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

        {/* Left scrim: the headline and button sit over the brightest part of these studio shots */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-[70%] bg-gradient-to-r from-black/55 via-black/25 to-transparent pointer-events-none" />

        {/* Top gradient vignette for header and glass pill legibility */}
        <div className="absolute inset-x-0 top-0 h-40 sm:h-52 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Center subtle dark radial vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(14,24,18,0.45)_100%] pointer-events-none" />

        {/* Bottom gradient vignette: settles the photograph down into the sage card that overlaps the hero */}
        <div className="absolute inset-x-0 bottom-0 h-64 sm:h-96 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Responsive Top Spacer: pushes content safely below header */}
      <div className="w-full h-16 sm:h-24 md:h-32 shrink-0 pointer-events-none" />

      {/* Mid Section: the headline and the button, centred in the part of the hero that shows above the card */}
      <div className="relative z-20 w-full px-5 sm:px-10 md:px-16 lg:px-24 pointer-events-auto flex-1 flex flex-col justify-center">
        <div className="flex max-w-md flex-col items-start sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
          <h1
            className="font-display [font-size:calc(38px*var(--hs,1))] font-normal leading-[1.14] tracking-normal text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.85)] sm:[font-size:calc(56px*var(--hs,1))] md:[font-size:calc(68px*var(--hs,1))] lg:[font-size:calc(80px*var(--hs,1))]"
          >
            <Mask show={ready} instant={instant} delay={0.12}>
              Movement with intention.
            </Mask>
            <Mask show={ready} instant={instant} delay={0.26} className="text-peach-soft">
              Strength with soul.
            </Mask>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: instant ? 0 : 0.85, delay: ready ? 0.5 : 0, ease: EASE }}
            className="mt-8 sm:mt-12"
          >
            <Link
              href="#experience"
              className="group relative inline-flex items-center gap-3.5 sm:gap-4 rounded-full bg-white pl-6 pr-2.5 py-2.5 sm:pl-9 sm:pr-3.5 sm:py-3.5 text-[11px] sm:text-[13px] font-semibold tracking-[0.22em] text-ink uppercase shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_36px_rgba(0,0,0,0.5)] transition-shadow duration-300"
            >
              {/* Luxury Rolling Text Track */}
              <div className="relative h-[18px] shrink-0 overflow-hidden">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  {/* the long label only fits from about 390px wide; narrower phones get the short one */}
                  <span className="h-[18px] flex items-center whitespace-nowrap">
                    <span className="min-[390px]:hidden">DISCOVER EVOA</span>
                    <span className="hidden min-[390px]:inline">DISCOVER THE EVOA EXPERIENCE</span>
                  </span>
                  <span aria-hidden className="h-[18px] flex items-center whitespace-nowrap text-rust font-semibold">
                    <span className="min-[390px]:hidden">DISCOVER EVOA</span>
                    <span className="hidden min-[390px]:inline">DISCOVER THE EVOA EXPERIENCE</span>
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

      {/* Bottom spacer: the Philosophy section overlaps the hero by -mt-16 / sm:-mt-24 / md:-mt-32 (see philosophy-statement), so
          this is the same height as the top spacer, and the headline and button sit in the middle of what can actually be seen */}
      <div className="w-full h-16 sm:h-24 md:h-32 shrink-0 pointer-events-none" />
    </section>
  );
}
