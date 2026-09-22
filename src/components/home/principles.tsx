"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const principles = [
  {
    id: "invest",
    title: "INVEST",
    description: "Choose the equipment to the exercises you love the most",
    position: "top",
    nodeStyle: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    textStyle:
      "bottom-full left-1/2 -translate-x-1/2 mb-1.5 min-[390px]:mb-2 sm:mb-3.5 text-center items-center w-[140px] min-[390px]:w-[160px] sm:w-[210px] md:w-[240px]",
  },
  {
    id: "sleep",
    title: "SLEEP ENOUGH",
    description: "Do a stretch and then you feel your best",
    position: "right",
    nodeStyle: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    textStyle:
      "top-1/2 left-full -translate-y-1/2 ml-1.5 min-[390px]:ml-2 sm:ml-3.5 text-left items-start w-[72px] min-[390px]:w-[84px] sm:w-[150px] md:w-[190px] lg:w-[220px]",
  },
  {
    id: "active",
    title: "STAY ACTIVE",
    description: "Doing your pilates workout daily",
    position: "bottom",
    nodeStyle: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    textStyle:
      "top-full left-1/2 -translate-x-1/2 mt-1.5 min-[390px]:mt-2 sm:mt-3.5 text-center items-center w-[140px] min-[390px]:w-[160px] sm:w-[210px] md:w-[240px]",
  },
  {
    id: "positive",
    title: "STAY POSITIVE",
    description: "And enjoy your workout",
    position: "left",
    nodeStyle: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    textStyle:
      "top-1/2 right-full -translate-y-1/2 mr-1.5 min-[390px]:mr-2 sm:mr-3.5 text-right items-end w-[72px] min-[390px]:w-[84px] sm:w-[150px] md:w-[190px] lg:w-[220px]",
  },
];

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth GPU-accelerated parallax translation for the full-bleed background
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={sectionRef}
      data-header-theme="dark"
      className="relative w-full aspect-[4/3.2] sm:aspect-[16/10] md:aspect-[16/9] min-h-[480px] min-[390px]:min-h-[520px] sm:min-h-[580px] md:min-h-[640px] text-[#faf6f3] overflow-hidden select-none bg-[#120f0d] flex items-center justify-center px-2 sm:px-4"
    >
      {/* Background Image Layer with Cinematic Parallax Translation */}
      <motion.div
        style={{ y: bgY }}
        className="absolute -top-[12%] -bottom-[12%] inset-x-0 w-full h-[124%] pointer-events-none will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/principles-lifestyle.jpg"
          alt="Principles of Pilates lifestyle"
          className="w-full h-full object-cover object-center scale-105"
        />
      </motion.div>

      {/* Atmospheric Gradient Scrims for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(10,8,7,0.55)_100%)] pointer-events-none" />

      {/* Center Circular Orbit & Centered Heading & 4 Interactive Nodes */}
      <div className="relative z-10 flex items-center justify-center pointer-events-auto">
        {/* Sizing Wrapper for the Orbit Ring with Celestial Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.05, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[140px] h-[140px] min-[390px]:w-[155px] min-[390px]:h-[155px] sm:w-[240px] sm:h-[240px] md:w-[310px] md:h-[310px] lg:w-[370px] lg:h-[370px]"
        >
          {/* Headline Positioned in the Exact Center of the Circle */}
          <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-20 px-1 sm:px-4 select-none">
            <motion.h2
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transform-gpu select-none"
            >
              <span className="font-kafina text-[13px] min-[390px]:text-[14.5px] sm:text-[22px] md:text-[27px] lg:text-[33px] leading-tight text-white tracking-tight whitespace-nowrap block">
                <span className="font-script text-[1.3em] leading-none inline-block -mr-0.5 align-baseline normal-case text-powder-petal">
                  P
                </span>
                rinciples of
              </span>
              <span className="font-kafina font-light text-[11px] min-[390px]:text-[12.5px] sm:text-[18px] md:text-[23px] lg:text-[28px] leading-tight text-white/95 tracking-tight whitespace-nowrap block mt-0.5 sm:mt-1.5">
                Pilates lifestyle
              </span>
            </motion.h2>
          </div>

          {/* SVG Architectural Orbit Ring */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full pointer-events-none overflow-visible drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]"
          >
            <circle
              cx="250"
              cy="250"
              r="248"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="1.2"
            />
            {/* Subtle inner concentric dashed ring */}
            <circle
              cx="250"
              cy="250"
              r="248"
              fill="none"
              stroke="#ffe5d9"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.35"
            />
          </svg>

          {/* 4 Interactive Nodes along the Orbit */}
          {principles.map((node, index) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.75,
                delay: 0.15 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute ${node.nodeStyle} group cursor-pointer z-30 select-none`}
            >
              {/* Concentric Node Circle Pin */}
              <div className="relative flex items-center justify-center">
                {/* Ambient Pulse Ripple */}
                <span className="absolute w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-white/20 animate-ping pointer-events-none" />

                {/* Outer Ring */}
                <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-[1.5px] sm:border-2 border-white bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-125 group-hover:border-powder-petal group-hover:shadow-[0_0_20px_rgba(255,229,217,0.8)]">
                  {/* Inner Dot */}
                  <div className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-white transition-colors duration-300 group-hover:bg-powder-petal" />
                </div>
              </div>

              {/* Node Text Content */}
              <div
                className={`absolute ${node.textStyle} flex flex-col pointer-events-none`}
              >
                <span className="font-sans font-medium text-[8.5px] min-[390px]:text-[9.5px] sm:text-[11.5px] md:text-[12.5px] tracking-[0.12em] sm:tracking-[0.22em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-colors duration-300 group-hover:text-powder-petal leading-tight">
                  {node.title}
                </span>
                <p className="font-sans font-light text-[7.5px] min-[390px]:text-[8.5px] sm:text-[11px] md:text-[12px] leading-[1.25] sm:leading-[1.4] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-0.5 sm:mt-1 transition-colors duration-300 group-hover:text-white">
                  {node.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
