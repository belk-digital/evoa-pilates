"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/components/intro/fly";

export const EVOA_LETTERS = ["e", "v", "o", "a"] as const;

/* One letter of the intro's wordmark. It is set exactly as the hero's giant "evoa" is (light sans, the same line height and
   tracking), so the two match when the letter lands. The outer span is what flies (the hand-off measures and moves it); the
   inner one rises into place, revealed from the bottom edge upward with a hard edge (no fade, no blur). */
export function RiseLetter({ letter, delay, setRef, className }: { letter: string; delay: number; setRef: (el: HTMLSpanElement | null) => void; className?: string }) {
  return (
    <span ref={setRef} className={cn("inline-block font-sans font-light leading-[0.74] tracking-[-0.06em]", className)}>
      <motion.span
        className="inline-block"
        initial={{ y: "100%", clipPath: "inset(100% 0 0 0)" }}
        animate={{ y: "0%", clipPath: "inset(-60% -60% -60% -60%)" }}
        transition={{ duration: 1.15, delay, ease: EASE_OUT }}
      >
        {letter}
      </motion.span>
    </span>
  );
}
