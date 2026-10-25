"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { MarginNote } from "@/components/ui/margin-note";
import { Eyebrow } from "@/components/about/eyebrow";
import { siteConfig } from "@/lib/site";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const hasDigits = (value: string) => /\d/.test(value);

/* The page's one label and animated title. On the right, the lounge as a tall doorway (an arch), with a gold sun behind it
   and a line of handwriting. Below the lede, the three ways to reach us as a plain list: write, call, visit. */
export function ContactHero() {
  const goToVisit = () => document.getElementById("visit")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-3 pb-16 pt-28 text-ink sm:px-6 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-40">
      <div className="grid gap-14 px-3 sm:px-4 lg:grid-cols-12 lg:items-center lg:gap-10 lg:px-10">
        <div className="lg:col-span-7">
          <Eyebrow>Contact</Eyebrow>
          <motion.h1
            {...wipeProps}
            className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-light leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
          >
            <span className="block">Come and say</span>
            <span className="block">
              <SparkText>hello.</SparkText>
            </span>
          </motion.h1>
          <p className="mt-6 max-w-[30rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
            A question, an intro session or a private enquiry: write to us and the front desk will reply within one working day.
          </p>

          <dl className="mt-10 max-w-[36rem] border-t border-ink/10 sm:mt-12">
            <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4">
              <dt className="font-script text-[22px] leading-none text-rust">write</dt>
              <dd className="min-w-0 text-right font-title text-[21px] leading-tight sm:text-[26px]">
                <a href={`mailto:${siteConfig.email}`} className="break-words transition-colors hover:text-rust">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4">
              <dt className="font-script text-[22px] leading-none text-rust">call</dt>
              <dd className="min-w-0 text-right font-title text-[21px] leading-tight sm:text-[26px]">
                {hasDigits(siteConfig.phone) ? (
                  <a href={`tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-rust">
                    {siteConfig.phone}
                  </a>
                ) : (
                  <span className="text-ink/70">{siteConfig.phone}</span>
                )}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-4">
              <dt className="font-script text-[22px] leading-none text-rust">visit</dt>
              <dd className="min-w-0 text-right font-title text-[21px] leading-tight sm:text-[26px]">
                <button type="button" onClick={goToVisit} className="inline-flex items-center gap-2 transition-colors hover:text-rust">
                  Find the studio <ArrowDown size={16} strokeWidth={1.8} />
                </button>
              </dd>
            </div>
          </dl>
        </div>

        {/* the doorway */}
        <div className="relative mx-auto w-[84%] max-w-[440px] lg:col-span-5 lg:w-full lg:max-w-none">
          <motion.span
            aria-hidden
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }}
            className="absolute -right-5 -top-5 -z-0 h-24 w-24 rounded-full bg-terracotta sm:-right-8 sm:-top-8 sm:h-32 sm:w-32"
          />
          <div className="relative z-10 aspect-[4/5.2] overflow-hidden rounded-b-[28px] rounded-t-[999px] bg-forest">
            <motion.img
              src={encodeURI("/assets/Sunlit Olive Green Lounge Corner.webp")}
              alt="The studio lounge: a low sofa with a woven throw, an olive tree and a warm wall lamp against green tile"
              initial={{ scale: 1.14 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: EASE }}
              className="h-full w-full object-cover object-[28%_50%]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
          </div>
          <span className="absolute -left-2 top-[34%] z-20 hidden xl:block">
            <MarginNote curl="down-right" tilt={-5} className="-translate-x-full">
              stay for a tonic afterwards
            </MarginNote>
          </span>
        </div>
      </div>
    </section>
  );
}
