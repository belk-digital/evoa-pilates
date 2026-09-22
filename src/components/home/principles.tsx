"use client";

import { motion } from "framer-motion";

const principles = [
  {
    id: "invest",
    title: "INVEST",
    description: "Choose the equipment to the exercises you love the most",
    position: "top",
    // Position on a 500x500 reference coordinate space
    nodeStyle: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    textStyle: "bottom-full left-1/2 -translate-x-1/2 mb-4 text-center items-center",
  },
  {
    id: "sleep",
    title: "SLEEP ENOUGH",
    description: "Do a stretch and then you feel your best",
    position: "right",
    nodeStyle: "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
    textStyle: "top-1/2 left-full translate-y-[-50%] ml-4 sm:ml-5 text-left items-start",
  },
  {
    id: "active",
    title: "STAY ACTIVE",
    description: "Doing your pilates workout daily",
    position: "bottom",
    nodeStyle: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    textStyle: "top-full left-1/2 -translate-x-1/2 mt-4 text-center items-center",
  },
  {
    id: "positive",
    title: "STAY POSITIVE",
    description: "And enjoy your workout",
    position: "left",
    nodeStyle: "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
    textStyle: "top-1/2 right-full translate-y-[-50%] mr-4 sm:mr-5 text-right items-end",
  },
];

export function Principles() {
  return (
    <section
      data-header-theme="dark"
      className="relative w-full aspect-[16/10] md:aspect-[16/9] min-h-[560px] md:min-h-[640px] text-[#faf6f3] overflow-hidden select-none bg-[#120f0d]"
    >
      {/* Background Image Layer - Full Bleed 16:9 Edge-to-Edge */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/principles-lifestyle.jpg"
        alt="Principles of Pilates lifestyle"
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02]"
      />

      {/* Atmospheric Gradient Scrims for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,rgba(10,8,7,0.5)_100%] pointer-events-none" />

      {/* Center Circular Orbit & Centered Heading & 4 Interactive Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        {/* Sizing Wrapper for the Orbit Ring with Celestial Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.15, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] md:w-[360px] md:h-[360px] lg:w-[400px] lg:h-[400px]"
        >
          {/* Headline Positioned in the Exact Center of the Circle */}
          <div className="absolute inset-0 flex items-center justify-center text-center pointer-events-none z-20 px-4 select-none">
            <motion.h2
              initial={{ opacity: 0, scale: 0.88, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="font-kafina text-[21px] sm:text-[26px] md:text-[31px] lg:text-[35px] leading-[1.08] text-white tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
            >
              <span className="font-script text-[1.45em] leading-none inline-block -mr-1 align-baseline normal-case text-powder-petal">
                P
              </span>
              rinciples of <br />
              <span className="font-light">Pilates lifestyle</span>
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
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`absolute ${node.nodeStyle} group cursor-pointer z-30 select-none`}
            >
              {/* Concentric Node Circle Pin */}
              <div className="relative flex items-center justify-center">
                {/* Ambient Pulse Ripple */}
                <span className="absolute w-8 h-8 rounded-full bg-white/20 animate-ping pointer-events-none" />

                {/* Outer Ring */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:scale-125 group-hover:border-powder-petal group-hover:shadow-[0_0_20px_rgba(255,229,217,0.8)]">
                  {/* Inner Dot */}
                  <div className="w-2.5 h-2.5 rounded-full bg-white transition-colors duration-300 group-hover:bg-powder-petal" />
                </div>
              </div>

              {/* Node Text Content */}
              <div
                className={`absolute ${node.textStyle} w-[160px] sm:w-[190px] md:w-[220px] flex flex-col pointer-events-none`}
              >
                <span className="font-sans font-medium text-[11px] sm:text-[12px] md:text-[12.5px] tracking-[0.22em] uppercase text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] transition-colors duration-300 group-hover:text-powder-petal">
                  {node.title}
                </span>
                <p className="font-sans font-light text-[10.5px] sm:text-[11.5px] md:text-[12px] leading-[1.4] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-1 transition-colors duration-300 group-hover:text-white">
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
