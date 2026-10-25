"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { ClassArt } from "@/components/classes/class-art";
import { SpotDots, spotsText } from "@/components/schedule/schedule-bits";
import { classById, endTime, formatTime, nextSession, requestSession, teacherById } from "@/components/schedule/schedule-data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* The next class to start, worked out from the clock in the visitor's browser (after the first paint, so the server and the
   browser always agree on what they render). */
function NextUp() {
  const [next, setNext] = React.useState<ReturnType<typeof nextSession> | null>(null);
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setNext(nextSession(new Date())));
    return () => cancelAnimationFrame(raf);
  }, []);

  const cls = next ? classById(next.session.classId) : null;
  const time = next ? formatTime(next.session.start) : null;

  return (
    <div className="min-h-[330px] rounded-[32px] bg-plaster p-6 sm:rounded-[40px] sm:p-8">
      <p className="font-script text-[26px] leading-none text-rust">Next up</p>
      {next && cls && time ? (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
          <div className="mt-5 flex items-center gap-5">
            <span className="relative block h-[88px] w-[70px] shrink-0 overflow-hidden rounded-b-[10px] rounded-t-full" style={{ backgroundColor: cls.panel }}>
              <ClassArt kind={cls.art} animate delay={0.2} className="absolute inset-0 h-full w-full" />
            </span>
            <div>
              <p className="font-display text-[54px] font-light leading-[0.9] tracking-normal sm:text-[64px]">
                {time.clock}
                <span className="ml-1 font-script text-[26px]">{time.ampm}</span>
              </p>
              <p className="mt-2 font-sans text-[13px] font-light text-ink/70">
                {next.when}, until {endTime(next.session.start, cls.length)}
              </p>
            </div>
          </div>

          <h2 className="mt-6 font-title text-[30px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[34px]">{cls.name}</h2>
          <p className="mt-1.5 font-sans text-[13.5px] font-light text-ink/75">
            with {teacherById(next.session.teacher).name}, {cls.level.toLowerCase()}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <SpotDots free={next.session.free} />
            <span className="font-sans text-[12.5px] font-light text-ink/70">{spotsText(next.session.free)}</span>
          </div>

          <button
            type="button"
            onClick={() => requestSession(next.session.id)}
            className="group mt-6 inline-flex items-center gap-4 rounded-full bg-ink py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            <span>See it below</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
              <ArrowDown size={14} strokeWidth={2.2} />
            </span>
          </button>
        </motion.div>
      ) : null}
    </div>
  );
}

/* The page's one label and animated title, with the next class on the right. */
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
          <NextUp />
        </div>
      </div>
    </section>
  );
}
