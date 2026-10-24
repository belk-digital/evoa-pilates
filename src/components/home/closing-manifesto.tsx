"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { useLiquidGlass } from "@/components/ui/liquid-glass";

export function ClosingManifesto() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { attach: exploreGlassRef, style: exploreGlassStyle, filter: exploreGlassFilter } = useLiquidGlass<HTMLAnchorElement>();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.78, 0.65]);

  return (
    <section
      ref={sectionRef}
      id="sanctuary"
      data-header-theme="dark"
      className="relative py-28 sm:py-36 md:py-44 text-bone overflow-hidden text-center"
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
        className="absolute inset-0 bg-forest"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-forest/80 pointer-events-none" />

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
            <span className="w-6 h-px bg-peach" />
            <span className="text-peach text-[11px] sm:text-[12px] tracking-[0.34em] uppercase font-medium">
              The Sanctuary
            </span>
            <span className="w-6 h-px bg-peach" />
          </motion.div>

          {/* Minimal Modern Headline */}
          <motion.h2
            {...wipeProps}
            className="font-display text-[38px] sm:text-[52px] md:text-[64px] lg:text-[78px] leading-[1.1] text-bone tracking-normal text-balance"
          >
            <SparkText bright>Begin Your Recalibration.</SparkText>
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
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-peach">
                <MapPin size={15} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block text-[10.5px] font-sans tracking-[0.2em] text-peach uppercase font-medium">
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
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-peach">
                <Clock size={15} strokeWidth={1.5} />
              </div>
              <div>
                <span className="flex items-center gap-2 text-[10.5px] font-sans tracking-[0.2em] text-peach uppercase font-medium">
                  <span className="relative inline-flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-spark-bright opacity-60 [animation-duration:2.8s]" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-spark-bright" />
                  </span>
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
              className="group relative w-auto inline-flex items-center justify-center gap-3.5 sm:gap-4 rounded-full bg-white pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-ink uppercase shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-shadow duration-300 select-none"
            >
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    Book an Intro Session
                  </span>
                  <span className="h-[18px] flex items-center text-rust font-semibold">
                    Book an Intro Session
                  </span>
                </div>
              </div>

              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-ink text-white transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-spark shrink-0">
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
              ref={exploreGlassRef}
              style={exploreGlassStyle}
              href="/classes"
              className="liquid-glass group relative w-auto inline-flex items-center justify-center gap-3.5 sm:gap-4 rounded-full pl-6 pr-2 py-2 sm:pl-8 sm:pr-2.5 sm:py-2.5 text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] text-white uppercase transition-all duration-300 select-none"
            >
              {exploreGlassFilter}
              <div className="relative overflow-hidden h-[18px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[18px] flex items-center">
                    Explore Classes
                  </span>
                  <span className="h-[18px] flex items-center text-peach font-semibold">
                    Explore Classes
                  </span>
                </div>
              </div>

              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/20 text-white shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6),inset_0_-1px_0.5px_rgba(255,255,255,0.2)] transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-spark shrink-0">
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
