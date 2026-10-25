"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Eyebrow } from "@/components/about/eyebrow";
import { RollingButton } from "@/components/about/rolling-button";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// pages that exist today (Classes, Membership and Contact have no page of their own yet), so none of these can bounce back here
const links = [
  { label: "About", href: "/about" },
  { label: "The Spaces", href: "/#spaces" },
  { label: "Membership", href: "/#membership" },
];

/* The "0" of 404: a tall doorway in a cream frame, with the studio's own arched doorway photographed inside it. */
function PhotoDoorway() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 1.3, delay: 0.55, ease: EASE }}
      className="h-[0.84em] w-[0.5em] shrink-0 rounded-t-full bg-bone p-[0.026em]"
    >
      <div className="h-full w-full overflow-hidden rounded-t-full bg-deep-green">
        <motion.img
          src={encodeURI("/assets/Serene Pilates Studio with Arched Doorway (1).webp")}
          alt=""
          initial={{ scale: 1.25 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 2.4, delay: 0.55, ease: EASE }}
          className="h-full w-full object-cover object-[50%_58%]"
        />
      </div>
    </motion.div>
  );
}

/* A giant cream 404 on the dark green panel, the 0 a photograph of the studio doorway, with the gold and olive colour
   blocks of the full-screen menu around it. Fills one screen exactly (data-no-scroll): the numerals and the type under
   them are sized from the height and width of the screen, so nothing ever needs to scroll. */
export function NotFoundScene() {
  return (
    <section
      data-header-theme="light"
      data-no-scroll
      className="relative flex h-dvh w-full flex-col bg-mint px-3 pb-3 pt-[76px] text-ink sm:px-6 sm:pt-[92px] lg:px-10 lg:pt-[112px] short:pt-[72px]"
    >
      <div className="relative isolate flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-[36px] bg-forest px-5 sm:rounded-[48px] lg:rounded-[64px]">
        {/* colour blocks, kept to the corners so they never sit behind the numerals */}
        <motion.div
          aria-hidden="true"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.5 }}
          className="pointer-events-none absolute -right-12 -top-12 -z-10 h-[130px] w-[130px] rounded-full bg-peach sm:-right-16 sm:-top-16 sm:h-[260px] sm:w-[260px] lg:-right-20 lg:-top-24 lg:h-[420px] lg:w-[420px]"
        />
        <motion.div
          aria-hidden="true"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="pointer-events-none absolute -bottom-12 -left-12 -z-10 h-[130px] w-[130px] rounded-full bg-terracotta sm:-bottom-20 sm:-left-20 sm:h-[260px] sm:w-[260px] lg:-bottom-28 lg:-left-24 lg:h-[400px] lg:w-[400px]"
        />
        <motion.div
          aria-hidden="true"
          initial={{ y: 70, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="pointer-events-none absolute bottom-0 right-[8%] -z-10 hidden h-[120px] w-[240px] rounded-t-full bg-sage lg:block"
        />

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4, ease: EASE }}>
          <Eyebrow tone="dark">Error 404</Eyebrow>
        </motion.div>

        {/* 4 [photo doorway] 4: one size drives all three, set by whichever of screen height or width runs out first */}
        <div
          aria-hidden="true"
          className="mt-[clamp(10px,2.4dvh,28px)] flex items-end justify-center gap-[0.07em] font-display font-light text-bone"
          style={{ fontSize: "min(44dvh, 52vw)" }}
        >
          <motion.span
            initial={{ opacity: 0, y: "12%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
            className="block h-[0.64em] leading-[0.64]"
          >
            4
          </motion.span>
          <PhotoDoorway />
          <motion.span
            initial={{ opacity: 0, y: "12%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.42, ease: EASE }}
            className="block h-[0.64em] leading-[0.64]"
          >
            4
          </motion.span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
          className="mt-[clamp(14px,3.2dvh,34px)] text-center font-display text-[clamp(28px,min(5.4dvh,9.4vw),56px)] font-light leading-[1.08] tracking-normal text-bone text-balance"
        >
          <SparkText bright>This room is empty.</SparkText>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
          className="mt-[clamp(6px,1.4dvh,14px)] max-w-sm text-center font-sans text-[clamp(13px,1.9dvh,15.5px)] font-light leading-relaxed text-white/70 text-balance short:hidden"
        >
          The page you are looking for has moved or never existed. Let us take you back somewhere calm.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
          className="mt-[clamp(14px,3dvh,30px)] flex flex-col items-center gap-[clamp(12px,2.4dvh,22px)]"
        >
          <RollingButton href="/">Back to Home</RollingButton>

          <nav aria-label="Other pages" className="short:hidden">
            <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-[10.5px] font-normal uppercase tracking-[0.16em] text-white/60 sm:gap-x-7 sm:text-[11.5px] sm:tracking-[0.2em]">
              {links.map((link, i) => (
                <li key={link.href} className="flex items-center gap-3 sm:gap-7">
                  {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-spark-bright" />}
                  <Link href={link.href} className="transition-colors duration-300 hover:text-peach">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>
      </div>
    </section>
  );
}
