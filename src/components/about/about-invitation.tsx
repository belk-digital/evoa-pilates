"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RollingButton } from "@/components/about/rolling-button";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutInvitation() {
  const tileRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tileRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section data-header-theme="dark" className="relative w-full bg-mint px-3 sm:px-6 lg:px-10">
      <div
        ref={tileRef}
        className="relative isolate flex min-h-[540px] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] bg-forest px-6 py-20 text-center text-white sm:min-h-[600px] sm:rounded-[36px] sm:px-10 lg:min-h-[680px] lg:rounded-[44px]"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[8%] -z-20 h-[116%]">
          <motion.img
            src="/assets/space-recovery-bar.jpg"
            alt=""
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-forest/45" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(35,44,20,0.5)_0%,rgba(35,44,20,0.35)_60%,rgba(35,44,20,0.6)_100%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />

        <div className="flex max-w-3xl flex-col items-center gap-6 sm:gap-7">
          <h2 className="font-display text-[42px] font-light leading-[1.08] tracking-normal text-bone text-balance sm:text-[60px] lg:text-[84px]">
            Come and see the room
          </h2>

          <p className="max-w-lg font-sans text-[14px] font-light leading-relaxed text-white/75 text-balance sm:text-[15.5px]">
            Book an intro session and feel the difference of a small room, close teaching and a pace that is yours.
          </p>

          <div className="flex flex-col items-center justify-center gap-3.5 pt-2 sm:flex-row sm:gap-4">
            <RollingButton href="/contact?topic=intro">Book an Intro Session</RollingButton>
            <RollingButton href="/#membership" variant="glass">
              View Membership
            </RollingButton>
          </div>
        </div>
      </div>
    </section>
  );
}
