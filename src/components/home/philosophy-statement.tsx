"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";

export function PhilosophyStatement() {
  const containerRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeHover, setActiveHover] = React.useState<"left" | "right" | "center" | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section
      id="philosophy"
      // min-h-[100dvh]: the hero is sticky inside the wrapper this section shares with it, and only stays
      // hidden once it unsticks if this section is at least a full screen tall; shorter, and the hero
      // is seen scrolling away above it.
      ref={containerRef}
      data-header-theme="light"
      className="relative -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-36 z-30 bg-mint text-ink rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[60px] lg:rounded-t-[72px] shadow-none border-t-0 border-b-0 pt-14 pb-6 sm:pt-28 sm:pb-28 lg:pt-36 lg:pb-36 overflow-hidden min-h-[100dvh] flex flex-col justify-center"
    >
      <Container size="wide" className="relative z-10 w-full px-4 sm:px-6">
        {/* Clean Editorial Serif Headline */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-6 sm:mb-14 md:mb-16 select-none">
          <motion.h2
            {...wipeProps}
            className="font-display text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px] text-ink tracking-normal leading-[1.1]"
          >
            <SparkText>The Philosophy</SparkText>
          </motion.h2>
        </div>

        {/* 3-Card Editorial Polaroid / Paper Note Collage */}
        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center min-h-[380px] min-[400px]:min-h-[420px] sm:min-h-[620px] md:min-h-[700px] py-2 sm:py-8 select-none">
          {/* Left Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 40 : 80, y: 30, rotate: 0, scale: 0.88 }}
            animate={
              !isInView
                ? { opacity: 0, x: isMobile ? 40 : 80, y: 30, rotate: 0, scale: 0.88 }
                : activeHover === "left"
                ? {
                    opacity: 1,
                    x: isMobile ? -24 : -110,
                    y: isMobile ? -12 : -16,
                    rotate: isMobile ? -12 : -15,
                    scale: isMobile ? 1.05 : 1.08,
                    zIndex: 40,
                    boxShadow: "0 32px 70px rgba(35,43,27,0.24)",
                    transition: { type: "spring", stiffness: 420, damping: 18, mass: 0.75 },
                  }
                : activeHover === "center"
                ? {
                    opacity: 1,
                    x: isMobile ? -10 : -30,
                    y: 4,
                    rotate: -11,
                    scale: 0.98,
                    zIndex: 10,
                    boxShadow: "0 20px 45px rgba(35,43,27,0.12)",
                    transition: { type: "spring", stiffness: 350, damping: 22 },
                  }
                : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: -8,
                    scale: 1,
                    zIndex: 10,
                    boxShadow: "0 20px 45px rgba(35,43,27,0.12)",
                    transition: { type: "spring", stiffness: 180, damping: 15, delay: 0.25 },
                  }
            }
            onMouseEnter={() => setActiveHover("left")}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setActiveHover((prev) => (prev === "left" ? null : "left"))}
            className="absolute left-0 min-[380px]:left-1 min-[440px]:left-3 sm:left-6 md:left-10 lg:left-12 w-[160px] min-[360px]:w-[180px] min-[420px]:w-[210px] sm:w-[290px] md:w-[350px] lg:w-[390px] aspect-[3/4] bg-white p-2 min-[360px]:p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl border border-cream-line/80 cursor-pointer"
          >
            <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-cream-warm/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI("/assets/Sunlit Laughter on the Terrazzo Floor.webp")}
                alt="A member laughing on the terrazzo floor of the Evoa studio, sage tile wall and warm sconce behind her"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>

          {/* Right Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? -40 : -80, y: 30, rotate: 0, scale: 0.88 }}
            animate={
              !isInView
                ? { opacity: 0, x: isMobile ? -40 : -80, y: 30, rotate: 0, scale: 0.88 }
                : activeHover === "right"
                ? {
                    opacity: 1,
                    x: isMobile ? 24 : 110,
                    y: isMobile ? -12 : -16,
                    rotate: isMobile ? 12 : 15,
                    scale: isMobile ? 1.05 : 1.08,
                    zIndex: 40,
                    boxShadow: "0 32px 70px rgba(35,43,27,0.24)",
                    transition: { type: "spring", stiffness: 420, damping: 18, mass: 0.75 },
                  }
                : activeHover === "center"
                ? {
                    opacity: 1,
                    x: isMobile ? 10 : 30,
                    y: 4,
                    rotate: 11,
                    scale: 0.98,
                    zIndex: 10,
                    boxShadow: "0 20px 45px rgba(35,43,27,0.12)",
                    transition: { type: "spring", stiffness: 350, damping: 22 },
                  }
                : {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    rotate: 8,
                    scale: 1,
                    zIndex: 10,
                    boxShadow: "0 20px 45px rgba(35,43,27,0.12)",
                    transition: { type: "spring", stiffness: 180, damping: 15, delay: 0.38 },
                  }
            }
            onMouseEnter={() => setActiveHover("right")}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setActiveHover((prev) => (prev === "right" ? null : "right"))}
            className="absolute right-0 min-[380px]:right-1 min-[440px]:right-3 sm:right-6 md:right-10 lg:right-12 w-[160px] min-[360px]:w-[180px] min-[420px]:w-[210px] sm:w-[290px] md:w-[350px] lg:w-[390px] aspect-[3/4] bg-white p-2 min-[360px]:p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl border border-cream-line/80 cursor-pointer"
          >
            <div className="relative w-full h-full rounded-lg sm:rounded-xl overflow-hidden bg-cream-warm/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={encodeURI("/assets/Sunlit Pilates Pose in a Green Studio.webp")}
                alt="A member holding a Pilates mat exercise in profile, sage tile wall and terrazzo floor"
                className="w-full h-full object-cover object-center -scale-x-100 transition-transform duration-500 ease-out"
              />
            </div>
          </motion.div>

          {/* Center Paper Note Card (ALWAYS ON TOP at z-30 unless another card pops up) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={
              !isInView
                ? { opacity: 0, scale: 0.88, y: 40 }
                : activeHover === "center"
                ? {
                    opacity: 1,
                    y: -8,
                    scale: 1.025,
                    zIndex: 30,
                    boxShadow: "0 32px 75px rgba(35,43,27,0.22)",
                    transition: { type: "spring", stiffness: 380, damping: 20 },
                  }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    zIndex: 30,
                    boxShadow: "0 22px 55px rgba(35,43,27,0.14)",
                    transition: { type: "spring", stiffness: 210, damping: 20, delay: 0.1 },
                  }
            }
            onMouseEnter={() => setActiveHover("center")}
            onMouseLeave={() => setActiveHover(null)}
            onClick={() => setActiveHover((prev) => (prev === "center" ? null : "center"))}
            className="relative z-30 w-[76%] min-[360px]:w-[74%] min-[420px]:w-[70%] sm:w-[65%] md:w-[60%] lg:w-[52%] max-w-[490px] bg-cream p-5 min-[360px]:p-6 min-[420px]:p-7 sm:p-10 md:p-12 lg:p-14 rounded-2xl sm:rounded-3xl border border-cream-line flex flex-col justify-center cursor-pointer sm:cursor-default"
          >
            {/* Subtle Vertical Paper Fold Crease Gradient */}
            <div className="absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/[0.015] to-transparent pointer-events-none" />

            <div className="flex flex-col gap-3 sm:gap-5 relative z-10 text-left">
              <h3 className="font-serif font-light text-[18px] min-[360px]:text-[20px] min-[420px]:text-[23px] sm:text-[30px] md:text-[36px] lg:text-[38px] leading-[1.22] text-ink tracking-tight">
                We do not train the body to perform.{" "}
                <span className="font-script text-rust font-normal tracking-normal leading-[1.2] block mt-1 sm:mt-1.5">
                  We guide it back into alignment.
                </span>
              </h3>

              <div className="w-8 sm:w-12 h-px bg-terracotta/40 my-1 sm:my-2" />

              <p className="font-sans font-light text-[12px] min-[360px]:text-[13px] sm:text-[15px] md:text-[16px] leading-[1.58] sm:leading-[1.68] text-ink-muted">
                EVOA is a structured environment where movement becomes architecture for internal clarity.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
