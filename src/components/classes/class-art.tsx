"use client";

import { createContext, useContext, type ComponentProps, type CSSProperties, type ReactNode, type SVGProps } from "react";
import { MotionConfig, motion, type Variants } from "framer-motion";
import type { ArtKind } from "@/components/classes/classes-data";

/* Flat, mid-century artwork for the site: arches, discs, stripes and rings in the brand palette, drawn as SVG.

   Everything here can BUILD ITSELF layer by layer the first time it scrolls into view. Draw a picture with <ArtSvg
   animate> and the shape components below (P path, C circle, R rect, G group), giving each layer an effect:
     rise  grows up from its base (arches, bars, half-discs)      pop   opens from its centre, with a small spring (dots, rings)
     left  slides in from the left                                  fade  simply fades in (stars, ground lines)
     draw  a stroke draws itself along its length (waves, outline arches)
   Layers play in the order they appear in the markup. Without `animate` the picture is static, exactly as drawn. Users who
   prefer reduced motion get the layers fading in without the movement. */

export type Fx = "rise" | "pop" | "left" | "fade" | "draw";

const EASE = [0.16, 1, 0.3, 1] as const;
const variants: Record<Fx, Variants> = {
  rise: { hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 0.95, ease: EASE } } },
  pop: { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 240, damping: 15 } } },
  left: { hidden: { x: -70, opacity: 0 }, show: { x: 0, opacity: 1, transition: { duration: 0.95, ease: EASE } } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.7 } } },
  draw: { hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: EASE } } },
};
const origin = (fx: Fx): CSSProperties => ({ transformBox: "fill-box", transformOrigin: fx === "rise" ? "50% 100%" : "50% 50%" });

const AnimContext = createContext(false);

export function P({ fx = "fade", ...rest }: SVGProps<SVGPathElement> & { fx?: Fx }) {
  const animated = useContext(AnimContext);
  if (!animated) return <path {...rest} />;
  return <motion.path {...(rest as ComponentProps<typeof motion.path>)} variants={variants[fx]} style={origin(fx)} />;
}
export function C({ fx = "pop", ...rest }: SVGProps<SVGCircleElement> & { fx?: Fx }) {
  const animated = useContext(AnimContext);
  if (!animated) return <circle {...rest} />;
  return <motion.circle {...(rest as ComponentProps<typeof motion.circle>)} variants={variants[fx]} style={origin(fx)} />;
}
export function R({ fx = "rise", ...rest }: SVGProps<SVGRectElement> & { fx?: Fx }) {
  const animated = useContext(AnimContext);
  if (!animated) return <rect {...rest} />;
  return <motion.rect {...(rest as ComponentProps<typeof motion.rect>)} variants={variants[fx]} style={origin(fx)} />;
}
export function G({ fx = "fade", children, ...rest }: SVGProps<SVGGElement> & { fx?: Fx; children?: ReactNode }) {
  const animated = useContext(AnimContext);
  if (!animated) return <g {...rest}>{children}</g>;
  return (
    <motion.g {...(rest as ComponentProps<typeof motion.g>)} variants={variants[fx]} style={origin(fx)}>
      {children}
    </motion.g>
  );
}

/* The drawing sheet. trigger "self" starts it when the drawing itself scrolls into view; "parent" lets a motion ancestor
   with initial="hidden" and whileInView="show" start it (use that when the drawing sits inside something clipped or scaled
   from nothing, which never counts as in view). `delay` waits before the first layer, `stagger` spaces the layers. */
export function ArtSvg({
  viewBox,
  className,
  animate = false,
  delay = 0,
  stagger = 0.14,
  trigger = "self",
  preserveAspectRatio,
  children,
}: {
  viewBox: string;
  className?: string;
  animate?: boolean;
  delay?: number;
  stagger?: number;
  trigger?: "self" | "parent";
  preserveAspectRatio?: string;
  children: ReactNode;
}) {
  if (!animate) {
    return (
      <svg viewBox={viewBox} preserveAspectRatio={preserveAspectRatio} aria-hidden="true" className={className} fill="none">
        {children}
      </svg>
    );
  }
  return (
    <MotionConfig reducedMotion="user">
      <AnimContext.Provider value>
        <motion.svg
          viewBox={viewBox}
          preserveAspectRatio={preserveAspectRatio}
          aria-hidden="true"
          className={className}
          fill="none"
          {...(trigger === "self" ? { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.4 } } : {})}
          variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
        >
          {children}
        </motion.svg>
      </AnimContext.Provider>
    </MotionConfig>
  );
}

/* One piece of artwork per class, drawn on a 300 x 360 sheet and slice-fitted so it fills any tile (the small arch tile in
   a row, or the larger panel when a row is open). The background colour is set by the caller. */
export function ClassArt({
  kind,
  className,
  animate = false,
  delay = 0,
  trigger = "self",
}: {
  kind: ArtKind;
  className?: string;
  /** build the drawing layer by layer the first time it scrolls into view */
  animate?: boolean;
  /** seconds to wait before the first layer (so a tile can finish forming first) */
  delay?: number;
  trigger?: "self" | "parent";
}) {
  return (
    <ArtSvg viewBox="0 0 300 360" preserveAspectRatio="xMidYMid slice" className={className} animate={animate} delay={delay} trigger={trigger}>
      {kind === "arch" && (
        <>
          <P fx="rise" d="M60 360V150a90 90 0 0 1 180 0v210Z" fill="#f3ede3" />
          <P fx="rise" d="M96 360V158a54 54 0 0 1 108 0v202Z" fill="#e6dcc6" />
          <C fx="pop" cx="150" cy="190" r="14" fill="#2f3a1c" />
          <P fx="left" d="M0 360a60 60 0 0 1 120 0Z" fill="#2f3a1c" />
          <R fx="pop" x="238" y="28" width="30" height="30" fill="#e6dcc6" />
        </>
      )}
      {kind === "wave" && (
        <>
          <P fx="draw" d="M-20 120q40-34 80 0t80 0t80 0t80 0t80 0" stroke="#f3ede3" strokeWidth="16" fill="none" />
          <P fx="draw" d="M-20 172q40-34 80 0t80 0t80 0t80 0t80 0" stroke="#2f3a1c" strokeOpacity="0.6" strokeWidth="16" fill="none" />
          <P fx="draw" d="M-20 224q40-34 80 0t80 0t80 0t80 0t80 0" stroke="#e6dcc6" strokeWidth="16" fill="none" />
          <P fx="draw" d="M-20 276q40-34 80 0t80 0t80 0t80 0t80 0" stroke="#c4a96a" strokeWidth="16" fill="none" />
          <C fx="pop" cx="232" cy="56" r="26" fill="#e6dcc6" />
          <C fx="pop" cx="232" cy="56" r="7" fill="#2f3a1c" />
        </>
      )}
      {kind === "stripes" && (
        <>
          <R fx="rise" x="34" y="150" width="46" height="260" rx="23" fill="#f3ede3" />
          <R fx="rise" x="94" y="100" width="46" height="310" rx="23" fill="#c4a96a" />
          <R fx="rise" x="154" y="60" width="46" height="350" rx="23" fill="#e6dcc6" />
          <R fx="rise" x="214" y="120" width="46" height="290" rx="23" fill="#8fa08a" />
          <C fx="pop" cx="57" cy="76" r="14" fill="#c4a96a" />
        </>
      )}
      {kind === "ring" && (
        <>
          <C fx="pop" cx="150" cy="170" r="134" fill="#c4a96a" />
          <C fx="pop" cx="150" cy="170" r="100" fill="#f3ede3" />
          <C fx="pop" cx="150" cy="170" r="66" fill="#c4a96a" />
          <C fx="pop" cx="150" cy="170" r="32" fill="#f3ede3" />
          <C fx="pop" cx="150" cy="170" r="10" fill="#2f3a1c" />
        </>
      )}
      {kind === "orbs" && (
        <>
          <C fx="left" cx="112" cy="180" r="86" fill="#c4a96a" />
          <C fx="pop" cx="188" cy="180" r="86" fill="#f3ede3" />
          <P fx="fade" d="M150 105.5A86 86 0 0 1 150 254.5A86 86 0 0 1 150 105.5Z" fill="#8fa08a" />
          <C fx="pop" cx="150" cy="180" r="9" fill="#2f3a1c" />
          <P fx="rise" d="M0 360a70 70 0 0 1 140 0Z" fill="#8fa08a" />
        </>
      )}
      {kind === "sun" && (
        <>
          <C fx="fade" cx="58" cy="64" r="3" fill="#f3ede3" />
          <C fx="fade" cx="236" cy="104" r="2.5" fill="#f3ede3" />
          <C fx="fade" cx="196" cy="46" r="3" fill="#f3ede3" />
          <C fx="fade" cx="104" cy="132" r="2" fill="#f3ede3" />
          <P fx="rise" d="M0 360a150 150 0 0 1 300 0Z" fill="#b9c5b1" />
          <P fx="rise" d="M38 360a112 112 0 0 1 224 0Z" fill="#e6dcc6" />
          <P fx="rise" d="M76 360a74 74 0 0 1 148 0Z" fill="#c4a96a" />
          <P fx="rise" d="M114 360a36 36 0 0 1 72 0Z" fill="#f3ede3" />
        </>
      )}
    </ArtSvg>
  );
}
