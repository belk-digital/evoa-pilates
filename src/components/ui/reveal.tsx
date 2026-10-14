"use client";

import * as React from "react";
import { motion, type MotionProps, type TargetAndTransition } from "framer-motion";

/* Shared entrance animations for the homepage.
   - wipe*: headings rise and are uncovered by a clip-path curtain (the clip box extends 25% above and below the
     heading, so tall glyphs, descenders and the red i-dots are never cut off while it plays).
   - <Reveal>: any other text or element fades up out of a soft blur. */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const wipeHidden: TargetAndTransition = { clipPath: "inset(-25% -5% 100% -5%)", y: 36 };
export const wipeShown: TargetAndTransition = { clipPath: "inset(-25% -5% -25% -5%)", y: 0 };
export const wipeTransition = { duration: 1, ease: EASE };

/** spread onto a motion.h2 (or any motion element) that should wipe in when scrolled into view */
export const wipeProps: MotionProps = {
  initial: wipeHidden,
  whileInView: wipeShown,
  viewport: { once: true, margin: "-60px" },
  transition: wipeTransition,
};

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
