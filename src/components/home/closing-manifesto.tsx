"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useLiquidGlass } from "@/components/ui/liquid-glass";
import { siteConfig } from "@/lib/site";
import { studioClock } from "@/lib/studio-time";
import { cn } from "@/lib/utils";

/* Which row of siteConfig.hours is today at the studio (Charleston, US Eastern time), or -1 until we know. */
function todayRow(): number {
  const day = studioClock().day; // Monday is 0
  return day <= 4 ? 0 : day - 4;
}

/* The closing statement over a photograph. The address and the opening hours are the studio's real ones (lib/site.ts), the
   same as the Contact page and the footer, and today's hours are marked. */
export function ClosingManifesto() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { attach: exploreGlassRef, style: exploreGlassStyle, filter: exploreGlassFilter } = useLiquidGlass<HTMLAnchorElement>();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.78, 0.65]);

  const [today, setToday] = React.useState(-1);
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setToday(todayRow()));
    return () => cancelAnimationFrame(raf);
  }, []);

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
          <h2 className="font-display text-[38px] sm:text-[52px] md:text-[64px] lg:text-[78px] leading-[1.1] text-bone tracking-normal text-balance font-light">
            Begin your <span className="font-script">recalibration</span>
          </h2>

          <p className="font-sans font-light text-[14px] sm:text-[15.5px] text-white/75 max-w-lg leading-relaxed text-balance">
            Come in for a complimentary intro session: eight people, one instructor and a room built to slow you down.
          </p>

          {/* Where and when: a glass card with the studio's real address and hours */}
          <div className="w-full mt-2 p-5 sm:p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-col sm:flex-row items-stretch justify-between gap-6 sm:gap-8 text-left shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
            {/* Location block */}
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-peach">
                <MapPin size={15} strokeWidth={1.5} />
              </div>
              <div>
                <span className="block font-script text-[22px] leading-none text-spark-bright">Find us</span>
                <span className="block font-title text-[22px] sm:text-[24px] text-white leading-tight mt-2">{siteConfig.city}</span>
                <span className="block text-[13px] text-white/65 font-light mt-1 leading-snug">{siteConfig.address}</span>
              </div>
            </div>

            {/* Subtle divider on desktop */}
            <div className="hidden sm:block w-px bg-white/15 shrink-0" />

            {/* Hours block */}
            <div className="flex items-start gap-3.5 flex-1">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5 text-peach">
                <Clock size={15} strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <span className="flex items-baseline gap-3 font-script text-[22px] leading-none text-spark-bright">
                  Opening hours
                  <span className="font-sans text-[11px] font-normal tracking-[0.06em] text-white/50">{siteConfig.timeZoneLabel}</span>
                </span>
                <ul className="mt-2.5 flex flex-col gap-1.5">
                  {siteConfig.hours.map((row, i) => {
                    const now = i === today;
                    return (
                      <li key={row.day} className="flex items-center justify-between gap-4 text-[13px] sm:text-[13.5px]">
                        <span className="flex items-center gap-2.5">
                          <span aria-hidden className={cn("h-1.5 w-1.5 rounded-full transition-colors duration-500", now ? "bg-spark-bright" : "bg-transparent")} />
                          <span className={cn(now ? "text-white" : "text-white/70", "font-light whitespace-nowrap")}>{row.day.split(" – ").map((d) => d.slice(0, 3)).join("–")}</span>
                        </span>
                        <span className={cn(now ? "text-white font-normal" : "text-white/70 font-light", "whitespace-nowrap")}>{row.time}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Buttons - Matching Hero Button Luxury Style */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-auto pt-2">
            {/* Primary: Book an Intro Session */}
            <Link
              href="/contact?topic=intro"
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
          </div>

          <p className="font-script text-[22px] sm:text-[26px] leading-none text-white/60 pt-1">eight at a time, no mirrors, no rush</p>
        </div>
      </Container>
    </section>
  );
}
