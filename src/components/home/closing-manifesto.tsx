"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function ClosingManifesto() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.78, 0.65]);

  return (
    <section
      ref={sectionRef}
      id="sanctuary"
      data-header-theme="dark"
      className="relative py-28 sm:py-36 md:py-44 text-[#faf6f3] overflow-hidden text-center"
    >
      {/* Cinematic parallax background */}
      <motion.div style={{ scale: imageScale, y: imageY }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/principles-lifestyle.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      <motion.div
        style={{ opacity: scrimOpacity }}
        className="absolute inset-0 bg-[#141210]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-transparent to-[#121110]/80 pointer-events-none" />

      <Container size="content" className="relative z-10">
        <div className="flex flex-col items-center gap-6 sm:gap-7 max-w-2xl mx-auto">
          {/* Eyebrow Label */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 select-none"
          >
            <span className="w-6 h-px bg-[#c6a29a]" />
            <span className="text-[#c6a29a] text-[11px] sm:text-[12px] tracking-[0.34em] uppercase font-medium">
              The Sanctuary
            </span>
            <span className="w-6 h-px bg-[#c6a29a]" />
          </motion.div>

          {/* Minimal Modern Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif font-light text-[36px] sm:text-[48px] md:text-[58px] lg:text-[64px] leading-[1.12] text-[#faf6f3] tracking-tight text-balance"
          >
            Begin Your Recalibration.
          </motion.h2>

          {/* Concise Sub-statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans font-light text-[14px] sm:text-[15.5px] text-white/70 max-w-lg leading-relaxed text-balance"
          >
            Intimate reformer sequencing and somatic restoration designed to release tension and recalibrate your nervous system.
          </motion.p>

          {/* Minimal Modern Glass Pill for Location & Timings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full mt-2 p-4 sm:p-5 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6 text-left shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
          >
            {/* Location Block */}
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#c6a29a]">
                <MapPin size={15} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[10.5px] font-sans tracking-[0.2em] text-[#c6a29a] uppercase font-medium">
                  Location
                </span>
                <span className="block text-[13px] sm:text-[13.5px] text-white/90 font-light mt-0.5 leading-snug">
                  74 Franklin St, Tribeca, NYC
                </span>
              </div>
            </div>

            {/* Subtle Divider on desktop */}
            <div className="hidden sm:block w-px h-9 bg-white/15 shrink-0" />

            {/* Hours Block */}
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-[#c6a29a]">
                <Clock size={15} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[10.5px] font-sans tracking-[0.2em] text-[#c6a29a] uppercase font-medium">
                  Studio Timings
                </span>
                <span className="block text-[13px] sm:text-[13.5px] text-white/90 font-light mt-0.5 leading-snug">
                  Mon – Fri: 06:30 – 20:30 <br className="sm:hidden" />
                  <span className="hidden sm:inline">· </span>Weekends: 08:00 – 17:00
                </span>
              </div>
            </div>
          </motion.div>

          {/* CTA Buttons - Matching Hero Button Luxury Style */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-auto pt-2"
          >
            {/* Primary: Book an Intro Session */}
            <Link
              href="/contact"
              className="group relative w-auto inline-flex items-center justify-center gap-3.5 sm:gap-4 rounded-full bg-white pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-[#1c1815] uppercase shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-shadow duration-300 select-none"
            >
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    Book an Intro Session
                  </span>
                  <span className="h-[18px] flex items-center text-rose-500 font-semibold">
                    Book an Intro Session
                  </span>
                </div>
              </div>

              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#1c1815] text-white transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-rose-500 shrink-0">
                <div className="relative overflow-hidden w-3.5 h-3.5 flex items-center justify-center">
                  <ArrowUpRight
                    size={12.5}
                    strokeWidth={2.2}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:translate-x-4"
                  />
                  <ArrowUpRight
                    size={12.5}
                    strokeWidth={2.2}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0"
                  />
                </div>
              </div>
            </Link>

            {/* Secondary: Explore Classes */}
            <Link
              href="/classes"
              className="group relative w-auto inline-flex items-center justify-center gap-3.5 sm:gap-4 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/20 hover:border-white/40 pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 select-none"
            >
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    Explore Classes
                  </span>
                  <span className="h-[18px] flex items-center text-rose-200 font-semibold">
                    Explore Classes
                  </span>
                </div>
              </div>

              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-rose-500 shrink-0">
                <div className="relative overflow-hidden w-3.5 h-3.5 flex items-center justify-center">
                  <ArrowUpRight
                    size={12.5}
                    strokeWidth={2.2}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:translate-x-4"
                  />
                  <ArrowUpRight
                    size={12.5}
                    strokeWidth={2.2}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-4 -translate-x-4 group-hover:translate-y-0 group-hover:translate-x-0"
                  />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Micro-assurance Tag */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans font-light text-[11px] sm:text-[11.5px] text-white/40 tracking-[0.22em] uppercase pt-1"
          >
            Intimate reformer sequencing · 8 practitioners max · Zero mirrors
          </motion.p>
        </div>
      </Container>
    </section>
  );
}
