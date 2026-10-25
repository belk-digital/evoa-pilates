"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { ArtSvg, P } from "@/components/classes/class-art";

const points = ["50 minutes with an instructor, in a class of eight", "A walk through the rooms and the recovery bar", "Nothing to sign, nothing to buy"];

/* Title on the left, the first-visit offer on the right (the homepage FAQ promises a complimentary intro session). */
export function MembershipIntro() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-12 pt-28 text-ink sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40">
      <div className="grid gap-10 px-3 sm:px-4 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10">
        <div className="lg:col-span-7">
          <Eyebrow>Membership</Eyebrow>
          <motion.h1
            {...wipeProps}
            className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-light leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
          >
            <span className="block">Find your</span>
            <span className="block">
              <SparkText>rhythm.</SparkText>
            </span>
          </motion.h1>
          <p className="mt-6 max-w-[29rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
            Three ways to belong, one standard: eight people, one instructor, no mirrors. Begin with a complimentary intro session, then choose the rhythm that suits your week.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[32px] bg-plaster p-6 sm:rounded-[40px] sm:p-8">
            <div className="flex items-center gap-3">
              <ArtSvg viewBox="0 0 22 28" animate className="h-7 w-[22px] shrink-0">
                <P fx="rise" d="M1 28V11a10 10 0 0 1 20 0v17Z" fill="#c4a96a" />
                <P fx="rise" d="M6 28V12a5 5 0 0 1 10 0v16Z" fill="#f3ede3" />
              </ArtSvg>
              <p className="font-script text-[24px] leading-none text-rust">New to Evoa</p>
            </div>
            <h2 className="mt-4 font-title text-[30px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[36px]">Start with a complimentary intro session</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {points.map((point) => (
                <li key={point} className="flex gap-3 font-sans text-[14px] font-light leading-snug text-ink/80">
                  <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/contact?topic=intro"
                className="group inline-flex items-center gap-4 rounded-full bg-ink py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
              >
                <span>Book your intro</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark"
              >
                See the plans <ArrowUpRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
