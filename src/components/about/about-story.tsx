"use client";

import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Placeholder copy in the brand voice; the founding story, names and dates come from the client. */
export function AboutStory() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-3 text-ink sm:px-6 lg:px-10">
      <div className="w-full rounded-[36px] bg-plaster px-6 py-14 sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left: the headline holds its place while the story scrolls */}
          <div className="self-start lg:sticky lg:top-32 lg:col-span-5">
            <Reveal>
              <Eyebrow>Our story</Eyebrow>
            </Reveal>
            <motion.h2
              {...wipeProps}
              className="mt-5 font-display text-[42px] font-light leading-[1.06] tracking-normal text-ink sm:text-[56px] lg:text-[clamp(48px,5vw,76px)]"
            >
              <SparkText>A quieter way to get strong.</SparkText>
            </motion.h2>
          </div>

          {/* Right: the story, then two photographs */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-serif text-[24px] font-light leading-[1.32] text-ink sm:text-[30px] lg:text-[34px]">
                EVOA began with a simple frustration: most studios teach you to push through your body, and almost
                none teach you to listen to it.
              </p>
            </Reveal>

            <div className="mt-8 flex max-w-xl flex-col gap-5 font-sans text-[15px] font-light leading-[1.8] text-ink-muted sm:mt-10 sm:text-[16px]">
              <Reveal delay={0.1}>
                <p>
                  So we built the opposite. A private club of reformers and mats, eight at a time, where every
                  sequence begins with breath and ends with a clearer sense of where you are in space. No mirrors to
                  perform for. No music to hide behind. Just precise teaching, warm light and unhurried strength.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p>
                  The name says it plainly. Evolution of Awareness: strength is what happens when attention comes
                  first. We keep the room small, the teaching close and the pace human, so the work you do here
                  follows you home.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-script text-[28px] leading-none text-rust sm:text-[32px]">The EVOA team</p>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5">
              <motion.div
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, ease: EASE }}
                className="aspect-[4/5] overflow-hidden rounded-[22px] bg-cream-warm sm:rounded-[32px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/principles-lifestyle.jpg"
                  alt="A member at the reformer, seen from behind, in soft window light"
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 72 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: 0.12, ease: EASE }}
                className="aspect-[4/5] translate-y-8 overflow-hidden rounded-[22px] bg-cream-warm sm:translate-y-16 sm:rounded-[32px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/pilates-quadrant-ring.jpg"
                  alt="Dried pampas grass in a vase against a plaster wall, a hand reaching toward it"
                  className="h-full w-full object-cover object-center"
                />
              </motion.div>
            </div>
            {/* room for the lower photograph's offset */}
            <div aria-hidden className="h-8 sm:h-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
