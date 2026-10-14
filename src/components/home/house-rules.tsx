"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";

const RULES = [
  {
    n: "01",
    title: "Phones stay at the door.",
    text: "Every member gets a locker for every device. The studio is a room, not a feed.",
  },
  {
    n: "02",
    title: "Eight to a room.",
    text: "Capacity is capped so every spring is set for you and every correction is personal.",
  },
  {
    n: "03",
    title: "No mirrors.",
    text: "You listen to the movement, not the reflection. Nothing in the room performs for you.",
  },
  {
    n: "04",
    title: "Silent transitions.",
    text: "Between rooms, we don't speak. Take the long way and let your breath catch up.",
  },
  {
    n: "05",
    title: "Access is limited by design.",
    text: "A private club only works while it stays private. Membership opens in small numbers.",
  },
];

function Sconce() {
  return (
    <div className="relative h-28 w-28" aria-hidden="true">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(237,184,153,0.55) 0%, transparent 70%)" }}
        animate={{ opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-peach" />
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone" />
    </div>
  );
}

function RuleRow({ rule }: { rule: (typeof RULES)[number] }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const active = useInView(ref, { margin: "-40% 0px -40% 0px" });

  return (
    <div
      ref={ref}
      className="relative border-t py-9 transition-colors duration-500 sm:py-12 lg:py-14"
      style={{ borderTopColor: active ? "rgba(237,184,153,0.7)" : "rgba(246,240,227,0.15)" }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(237,184,153,0.2) 0%, transparent 68%)" }}
      />
      <div className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-5 sm:gap-x-8">
        <span
          className={`font-[family-name:var(--font-syne)] text-[14px] tracking-[0.2em] transition-colors duration-500 sm:text-[16px] ${
            active ? "text-spark-bright" : "text-bone/35"
          }`}
        >
          {rule.n}
        </span>
        <div className="flex flex-col gap-3">
          <h3
            className={`font-[family-name:var(--font-syne)] text-[28px] leading-[1.06] tracking-tight transition-colors duration-500 sm:text-[40px] md:text-[48px] lg:text-[54px] ${
              active ? "text-bone" : "text-bone/30"
            }`}
          >
            {rule.title}
          </h3>
          <p
            className={`max-w-xl font-sans text-[14px] font-light leading-relaxed transition-colors duration-500 sm:text-[16px] ${
              active ? "text-bone/75" : "text-bone/25"
            }`}
          >
            {rule.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HouseRules() {
  return (
    <section id="house-rules" data-header-theme="dark" className="relative w-full overflow-x-clip bg-forest text-bone">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(246,240,227,0.06) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(246,240,227,0.06) 1.5px, transparent 1.5px)",
          backgroundSize: "40px 120px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-10 px-6 py-24 sm:px-10 md:px-14 lg:grid-cols-12 lg:gap-16 lg:px-20 lg:py-36">
        <div className="lg:col-span-4">
          <div className="flex flex-col gap-5 lg:sticky lg:top-32">
            <Sconce />
            <div className="flex items-center gap-2.5 font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-peach sm:text-[12.5px]">
              <span className="h-px w-5 bg-peach" />
              <span>The door policy</span>
            </div>
            <h2 className="font-display text-[38px] leading-[1.4] tracking-normal sm:text-[52px] lg:text-[68px]">
              <SparkText bright>House Rules.</SparkText>
            </h2>
            <p className="max-w-xs font-sans text-[14.5px] font-light leading-relaxed text-bone/70 sm:text-[15.5px]">
              Five things we ask of every member. Nothing here is loud, and nothing is optional.
            </p>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-col">
            {RULES.map((rule) => (
              <RuleRow key={rule.n} rule={rule} />
            ))}
            <div className="border-t border-bone/15 pt-10">
              <Link
                href="#membership"
                className="group inline-flex items-center gap-4 rounded-full bg-bone py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-ink shadow-[0_6px_24px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.5)]"
              >
                <span>Request membership</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white transition-colors duration-500 group-hover:bg-spark">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
