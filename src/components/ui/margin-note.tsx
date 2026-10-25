"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Curl = "down-left" | "down-right" | "down" | "up" | "left" | "none";

/* Where the little hand-drawn arrow goes, as a path on a 44 x 36 sheet. It leaves the end of the words and bends toward
   what they point at. */
const arrows: Record<Exclude<Curl, "none">, { d: string; head: string; className: string }> = {
  "down-left": { d: "M40 3C36 18 24 26 6 29", head: "M13 22 5 29.5 14 34", className: "mt-1 -ml-6" },
  "down-right": { d: "M4 3C8 18 20 26 38 29", head: "M31 22 39 29.5 30 34", className: "mt-1 ml-6" },
  down: { d: "M22 2C18 12 26 22 22 31", head: "M15 25 22 33 29 25", className: "mt-1 ml-3" },
  up: { d: "M22 34C26 24 18 14 22 5", head: "M15 12 22 4 29 12", className: "mb-1 ml-3" },
  left: { d: "M40 8C32 4 18 4 5 14", head: "M6 6 4.5 15 13 17.5", className: "-mt-1 -ml-7" },
};

/* A line of handwriting in the margin: Cormorant italic in the deep gold-brown, set a few degrees off true, with an arrow
   that draws itself the first time it scrolls into view. Used sparingly, as a human aside ("start here"), never for
   information that matters. */
export function MarginNote({
  children,
  curl = "down-left",
  tone = "light",
  tilt = -3,
  className,
}: {
  children: React.ReactNode;
  curl?: Curl;
  tone?: "light" | "dark";
  /** degrees; a negative angle leans back */
  tilt?: number;
  className?: string;
}) {
  const arrow = curl === "none" ? null : arrows[curl];
  return (
    <motion.span
      aria-hidden
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={cn("pointer-events-none inline-flex select-none", curl === "up" ? "flex-col-reverse" : "flex-col", tone === "dark" ? "text-spark-bright" : "text-rust", className)}
      style={{ rotate: `${tilt}deg` }}
    >
      <motion.span
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } } }}
        className="whitespace-nowrap font-script text-[22px] leading-none sm:text-[26px]"
      >
        {children}
      </motion.span>
      {arrow && (
        <svg viewBox="0 0 44 36" className={cn("h-9 w-11", arrow.className)} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <motion.path
            d={arrow.d}
            variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.7, delay: 1.1, ease: [0.16, 1, 0.3, 1] } } }}
          />
          <motion.path
            d={arrow.head}
            variants={{ hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 0.3, delay: 1.7 } } }}
          />
        </svg>
      )}
    </motion.span>
  );
}
