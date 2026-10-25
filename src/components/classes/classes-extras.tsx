"use client";

import { motion } from "framer-motion";
import { MarginNote } from "@/components/ui/margin-note";
import { RollingButton } from "@/components/about/rolling-button";
import { ArtSvg, C, P, R } from "@/components/classes/class-art";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Each column gets a small flat still life on an arch-topped tile (112 x 136), in the brand palette, that builds itself
   piece by piece when it scrolls into view:
   Bring: a water bottle, grip socks and a folded layer under a low sun.
   We provide: a tonic glass with a lemon, a stack of towels and a rolled mat.
   Tell us: two speech bubbles. */
const GROUND = <R fx="fade" x="0" y="118" width="112" height="18" fill="#2b3220" fillOpacity="0.16" />;

const prepare = [
  {
    title: "Bring",
    panel: "#c4a96a",
    art: (
      <>
        {GROUND}
        <C fx="pop" cx="56" cy="52" r="23" fill="#f3ede3" />
        {/* water bottle */}
        <R fx="rise" x="46" y="62" width="22" height="56" rx="9" fill="#2f3a1c" />
        <R fx="pop" x="51" y="52" width="12" height="13" rx="3" fill="#e6dcc6" />
        <R fx="fade" x="46" y="82" width="22" height="15" fill="#f3ede3" />
        <C fx="pop" cx="57" cy="89.5" r="3" fill="#c4a96a" />
        {/* a pair of grip socks */}
        <R fx="rise" x="22" y="92" width="22" height="26" rx="9" fill="#e6dcc6" />
        <R fx="rise" x="10" y="102" width="24" height="16" rx="7" fill="#f3ede3" />
        {[15, 19].map((x) => (
          <C key={x} fx="pop" cx={x} cy="110" r="1.6" fill="#2f3a1c" />
        ))}
        {[29, 35, 41].map((x) => (
          <C key={x} fx="pop" cx={x} cy="110" r="1.6" fill="#2f3a1c" />
        ))}
        {/* a folded layer */}
        <R fx="rise" x="76" y="106" width="28" height="12" rx="5" fill="#8fa08a" />
        <R fx="rise" x="79" y="94" width="23" height="14" rx="5" fill="#e6dcc6" />
      </>
    ),
  },
  {
    title: "We provide",
    panel: "#8fa08a",
    art: (
      <>
        {GROUND}
        {/* a stack of towels, built from the bottom up */}
        <R fx="rise" x="10" y="108" width="34" height="10" rx="4" fill="#f3ede3" />
        <R fx="rise" x="13" y="98" width="30" height="10" rx="4" fill="#e6dcc6" />
        <R fx="rise" x="11" y="88" width="30" height="10" rx="4" fill="#c4a96a" />
        {/* tonic: tray, glass, drink, straw, lemon on the rim */}
        <R fx="rise" x="34" y="88" width="46" height="6" rx="3" fill="#2f3a1c" />
        <P fx="fade" d="M38 40H74L69 88H43Z" fill="#f3ede3" fillOpacity="0.5" />
        <P fx="rise" d="M41 62H71L69 88H43Z" fill="#c4a96a" />
        <P fx="draw" d="M52 26 58 70" stroke="#2f3a1c" strokeWidth="3" strokeLinecap="round" />
        <C fx="pop" cx="73" cy="40" r="9" fill="#e0c57a" />
        <P fx="draw" d="M73 32V48M65 40H81" stroke="#f3ede3" strokeWidth="1.5" />
        {/* a rolled mat */}
        <C fx="pop" cx="84" cy="102" r="17" fill="#f3ede3" />
        <C fx="pop" cx="84" cy="102" r="11" fill="#e6dcc6" />
        <C fx="pop" cx="84" cy="102" r="5" fill="#c4a96a" />
        <C fx="pop" cx="84" cy="102" r="1.8" fill="#2f3a1c" />
      </>
    ),
  },
  {
    title: "Tell us",
    panel: "#e6dcc6",
    art: (
      <>
        {GROUND}
        <C fx="pop" cx="56" cy="28" r="9" fill="#8fa08a" />
        {/* two speech bubbles, one answering the other */}
        <P fx="fade" d="M24 82 18 98 38 86Z" fill="#c4a96a" />
        <R fx="pop" x="14" y="46" width="62" height="40" rx="17" fill="#c4a96a" />
        {[34, 45, 56].map((x) => (
          <C key={x} fx="pop" cx={x} cy="66" r="3.2" fill="#f3ede3" />
        ))}
        <P fx="fade" d="M88 116 96 130 76 118Z" fill="#2f3a1c" />
        <R fx="pop" x="38" y="80" width="62" height="38" rx="17" fill="#2f3a1c" />
        <R fx="left" x="52" y="94" width="36" height="4.5" rx="2.25" fill="#e6dcc6" />
        <R fx="left" x="52" y="104" width="22" height="4.5" rx="2.25" fill="#8fa08a" />
      </>
    ),
  },
];

/* A small arch tile with its drawing, set inside a line of text at the size of the type around it. */
function InlineTile({ index }: { index: number }) {
  const col = prepare[index];
  return (
    <span
      aria-hidden
      className="relative mx-[0.2em] -my-[0.2em] inline-block h-[1.5em] w-[1.23em] overflow-hidden rounded-t-full rounded-b-[0.1em] [vertical-align:-0.2em] sm:my-0 sm:h-[1.2em] sm:w-[0.98em] sm:[vertical-align:-0.14em] lg:h-[1em] lg:w-[0.82em] lg:[vertical-align:-0.1em]"
      style={{ backgroundColor: col.panel }}
    >
      <ArtSvg viewBox="0 0 112 136" animate delay={0.2} stagger={0.1} className="absolute inset-0 h-full w-full">
        {col.art}
      </ArtSvg>
    </span>
  );
}

/* A lead word, its picture and the first word after it, kept together so the picture is never stranded at the end of a line
   and the sentence never starts a line with a lone word. */
function Lead({ index, next, children }: { index: number; next: string; children: string }) {
  return (
    <span className="whitespace-nowrap">
      <span className="font-script text-rust">{children}</span>
      <InlineTile index={index} />
      {next}
    </span>
  );
}

/* Before you come, written as one sentence instead of three lists. Each part has its small picture inline: the things to
   bring, the things we provide, what to tell us. The pictures build themselves layer by layer when they scroll into view.
   The sentence is set wide (it fills most of the page on large screens) and the handwritten aside closes it on the same line. */
export function ClassesPrepare() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-6 pb-20 pt-20 text-ink sm:px-10 sm:pb-24 sm:pt-28 md:px-14 lg:px-20 lg:pb-32 lg:pt-36">
      <h2 className="sr-only">Before you come</h2>
      <p className="max-w-[84rem] text-pretty font-display text-[29px] font-light leading-[1.36] tracking-normal sm:text-[42px] lg:text-[clamp(46px,4.2vw,76px)] lg:leading-[1.3]">
        <span className="text-ink-muted">Before you come,</span> <Lead index={0} next="grip">bring</Lead> socks, a water bottle and layers that stay put.{" "}
        <Lead index={1} next="the">We provide</Lead> reformers, mats, towels and a tonic at the bar. <Lead index={2} next="about">Tell us</Lead> injuries, pregnancy or how
        today feels, and we will{" "}
        <span className="whitespace-nowrap">
          adjust.
          <MarginNote curl="none" tilt={-3} className="ml-5 align-middle">
            that is really all
          </MarginNote>
        </span>
      </p>
    </section>
  );
}

/* the private band's picture: each shape rises from the ground (or pops open) in turn */
const rise = { hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: EASE } } };
const pop = { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 150, damping: 12 } } };
const fromBase = { transformOrigin: "50% 100%" } as const;

/* Private and duet sessions: the dark panel, with the arches and colour blocks of the full-screen menu. */
export function ClassesPrivate() {
  return (
    <section id="private" data-header-theme="dark" className="relative w-full scroll-mt-4 bg-mint px-3 pb-3 sm:px-6 lg:px-10">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-forest px-6 py-14 text-bone sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-[42px] font-light leading-[1.06] tracking-normal text-bone sm:text-[56px] lg:text-[clamp(52px,5.6vw,84px)]">
              Prefer one to one?
            </h2>
            <p className="mt-6 max-w-lg font-sans text-[15px] font-light leading-relaxed text-white/70 sm:text-[16.5px]">
              Fifty-five minutes with a senior instructor, shaped around you. Injury recovery, pregnancy, form, or a goal you have not said out loud yet. Bring someone and make it a duet.
            </p>

            <ul className="mt-8 flex flex-col gap-3.5 border-t border-white/10 pt-8 font-sans text-[14px] font-light text-white/80">
              {["Begins with a conversation, not a class", "Injury-aware and pregnancy-aware programming", "Reformer or mat, whichever suits you"].map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-spark-bright" />
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-start gap-3.5 sm:flex-row sm:items-center sm:gap-4">
              <RollingButton href="/contact?topic=private">Enquire about privates</RollingButton>
              <RollingButton href="/#membership" variant="glass">
                View Membership
              </RollingButton>
            </div>
          </div>

          {/* colour blocks and arches, built layer by layer: the cream arch, the gold arch inside it, the sage half-disc, the sun, the dot */}
          <motion.div
            aria-hidden="true"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.22, delayChildren: 0.2 } } }}
            className="relative mx-auto aspect-[1/1.02] w-full max-w-[420px] lg:col-span-5 lg:max-w-none"
          >
            <motion.div variants={rise} style={fromBase} className="absolute bottom-0 left-[6%] h-[82%] w-[46%] rounded-t-full bg-plaster" />
            <motion.div variants={rise} style={fromBase} className="absolute bottom-0 left-[14%] h-[60%] w-[30%] rounded-t-full bg-terracotta" />
            <motion.span variants={pop} className="absolute bottom-[52%] left-[29%] h-3 w-3 -translate-x-1/2 rounded-full bg-forest" />
            <motion.div variants={rise} style={fromBase} className="absolute bottom-0 right-0 h-[38%] w-[48%] rounded-t-full bg-sage" />
            <motion.div variants={pop} className="absolute right-[2%] top-0 h-[58%] w-[58%] rounded-full bg-peach" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
