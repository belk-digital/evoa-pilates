"use client";

import { motion } from "framer-motion";
import { RollingButton } from "@/components/about/rolling-button";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { siteConfig } from "@/lib/site";

const steps = [
  { title: "Choose a class", text: "Pick a day and a time on the timetable below." },
  { title: "Log in or sign up", text: "It takes a minute, and your bookings live in your account." },
  { title: "Book your place", text: "Use a drop-in, or a class pack or monthly package from Membership." },
];

/* How booking works, in three short steps. The timetable itself is Mariana Tek's (the embed below), so this card has no
   class data of its own. */
function HowToBook() {
  return (
    <div className="rounded-[32px] bg-plaster p-6 sm:rounded-[40px] sm:p-8">
      <p className="font-script text-[26px] leading-none text-rust">Booking a class</p>
      <ol className="mt-6 flex flex-col gap-5">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/25 font-sans text-[12px] font-medium text-rust">{i + 1}</span>
            <div>
              <p className="font-title text-[22px] leading-none">{step.title}</p>
              <p className="mt-1.5 font-sans text-[13.5px] font-light leading-snug text-ink/70">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-6 font-sans text-[12.5px] font-light text-ink/60">
        All times are {siteConfig.timeZoneLabel}, {siteConfig.city.split(",")[0]}.
      </p>
      <RollingButton variant="dark" arrow="down" href="#timetable" className="mt-5">
        See the timetable
      </RollingButton>
    </div>
  );
}

/* The page's one label and animated title, with how booking works on the right. */
export function ScheduleHero() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-12 pt-28 text-ink sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40">
      <div className="grid gap-10 px-3 sm:px-4 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10">
        <div className="lg:col-span-7">
          <Eyebrow>Schedule</Eyebrow>
          <motion.h1
            {...wipeProps}
            className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-light leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
          >
            <span className="block">Find your</span>
            <span className="block">
              <SparkText>hour.</SparkText>
            </span>
          </motion.h1>
          <p className="mt-6 max-w-[28rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
            Classes run all week, eight to a room. Choose a day, then the time that suits you.
          </p>
        </div>

        <div className="lg:col-span-5">
          <HowToBook />
        </div>
      </div>
    </section>
  );
}
