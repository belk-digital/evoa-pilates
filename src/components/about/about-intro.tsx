"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutIntro() {
  const tileRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: tileRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section
      data-header-theme="light"
      className="relative w-full bg-mint px-3 pb-3 pt-28 text-ink sm:px-6 sm:pb-6 sm:pt-32 lg:px-10 lg:pb-10 lg:pt-40"
    >
      {/* Title and lede: the page's one label and one animated title */}
      <div className="flex flex-col gap-7 px-3 pb-10 sm:px-4 sm:pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:px-10 lg:pb-16">
        <div>
          <Eyebrow>About EVOA</Eyebrow>
          <motion.h1
            {...wipeProps}
            className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-light leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
          >
            <span className="block">Evolution of</span>
            <span className="block">
              <SparkText>Awareness.</SparkText>
            </span>
          </motion.h1>
        </div>

        <p className="max-w-[26rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px] lg:pb-4">
          A private reformer and mat Pilates club for people who want to feel their body, not punish it. Eight at a
          time, no mirrors, no rush.
        </p>
      </div>

      {/* Wide studio photograph, with a line of handwriting on it */}
      <div
        ref={tileRef}
        className="relative isolate aspect-[4/5] w-full overflow-hidden rounded-[36px] bg-forest sm:aspect-[16/10] sm:rounded-[48px] lg:aspect-[21/9] lg:rounded-[64px]"
      >
        <motion.div style={{ y: imageY }} className="absolute inset-x-0 -top-[8%] -z-20 h-[116%]">
          <motion.img
            src={encodeURI("/assets/Serene Pilates Studio with Arched Doorway (1).webp")}
            alt="The Evoa studio: sage tile, an arched doorway and timber reformers on a terrazzo floor"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: EASE }}
            className="h-full w-full object-cover object-[50%_60%]"
          />
        </motion.div>

        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(35,44,20,0.6)_0%,rgba(35,44,20,0.2)_26%,transparent_52%)]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15" />

        <p className="absolute bottom-5 left-6 font-script text-[26px] leading-none text-white/95 sm:bottom-8 sm:left-10 sm:text-[34px] lg:bottom-10 lg:left-14 lg:text-[40px]">
          the studio, before the first class
        </p>
      </div>
    </section>
  );
}
