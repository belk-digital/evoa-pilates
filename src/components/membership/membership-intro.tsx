"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { ArtSvg, P } from "@/components/classes/class-art";
import { money, packageById } from "@/components/membership/membership-data";
import { cn } from "@/lib/utils";
import { RollingButton } from "@/components/about/rolling-button";

const starters = [packageById("dropin-mat")!, packageById("dropin-reformer")!];

/* Title on the left, the way to start on the right: a single class, mat or reformer, at its drop-in price. */
export function MembershipIntro() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-12 pt-28 text-ink sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40">
      <div className="grid gap-10 px-3 sm:px-4 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10">
        <div className="lg:col-span-7">
          <Eyebrow>Membership</Eyebrow>
          <motion.h1
            {...wipeProps}
            className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-normal leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
          >
            <span className="block">Find your</span>
            <span className="block">
              <SparkText>rhythm.</SparkText>
            </span>
          </motion.h1>
          <p className="mt-6 max-w-[29rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
            Drop in, build a pack or take a monthly rhythm. Mat or reformer, one standard: eight people, one instructor, no mirrors.
          </p>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-[32px] bg-plaster p-6 sm:rounded-[40px] sm:p-8">
            <div className="flex items-center gap-3">
              <ArtSvg viewBox="0 0 22 28" animate className="h-7 w-[22px] shrink-0">
                <P fx="rise" d="M1 28V11a10 10 0 0 1 20 0v17Z" fill="#c4a96a" />
                <P fx="rise" d="M6 28V12a5 5 0 0 1 10 0v16Z" fill="#f3ede3" />
              </ArtSvg>
              <p className="font-script text-[24px] leading-none text-rust">New to EVOA?</p>
            </div>
            <h2 className="mt-4 font-title text-[30px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[36px]">Start with a single class</h2>

            {/* the two drop-in prices, as two small doorways */}
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {starters.map((pkg, i) => (
                <li
                  key={pkg.id}
                  className={cn(
                    "flex flex-col items-center rounded-b-[20px] rounded-t-[999px] px-3 pb-5 pt-10 text-center",
                    i === 0 ? "bg-white/60 text-ink" : "bg-forest text-bone"
                  )}
                >
                  <span className={cn("font-script text-[22px] leading-none", i === 0 ? "text-rust" : "text-spark-bright")}>{pkg.discipline === "mat" ? "Mat" : "Reformer"}</span>
                  <span className="mt-2 font-display text-[44px] font-normal leading-none">{money(pkg.price)}</span>
                  <span className={cn("mt-1.5 font-sans text-[12px] font-light", i === 0 ? "text-ink/65" : "text-white/65")}>a class</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-sans text-[13.5px] font-light leading-snug text-ink/75">No commitment: pay for the class you take, and find the one that suits you.</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <RollingButton href="/schedule" variant="dark">
                See the schedule
              </RollingButton>
              <button
                type="button"
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark"
              >
                See every option <ArrowUpRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
