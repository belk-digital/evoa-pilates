"use client";

import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";

/* The My Account page's label and animated title. The account itself is Mariana's embed below. */
export function AccountHero() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-12 pt-28 text-ink sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-40">
      <div className="px-3 sm:px-4 lg:px-10">
        <Eyebrow>My account</Eyebrow>
        <motion.h1
          {...wipeProps}
          className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-light leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
        >
          <span className="block">Your</span>
          <span className="block">
            <SparkText>account.</SparkText>
          </span>
        </motion.h1>
        <p className="mt-6 max-w-[30rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
          Log in or create an account to book classes, see your reservations and manage your packages.
        </p>
      </div>
    </section>
  );
}
