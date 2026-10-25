"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { requestTopic } from "@/components/contact/contact-data";
import { siteConfig } from "@/lib/site";
import { studioClock } from "@/lib/studio-time";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Which row of siteConfig.hours today falls in (Monday to Friday, Saturday, Sunday), or -1 until we know. "Today" is today in
   Charleston (US Eastern time), not on the visitor's own clock, and it is read after the first paint so the server and the
   browser always agree on what they render. */
function todayRow(): number {
  const day = studioClock().day; // Monday is 0
  return day <= 4 ? 0 : day - 4;
}

/* "Monday – Friday" becomes "Mon–Fri", "Saturday" becomes "Sat": three letters a day, so the hours fit their small doorways */
const shortDays = (label: string) =>
  label
    .split(" – ")
    .map((d) => d.slice(0, 3))
    .join("–");

/* What a first visit is like, in four steps, with a photograph of each place from the studio. The copy follows what the rest of
   the site already promises (eight at a time, fifty minutes, a tonic at the bar). The second and fourth sit a little lower. */
const firstVisit = [
  {
    n: 1,
    title: "Arrive",
    text: "Someone greets you by name and shows you around.",
    image: "/assets/Warmly Lit Spa Apothecary Lounge.webp",
    position: "object-[38%_50%]",
    ratio: "aspect-[4/5]",
  },
  {
    n: 2,
    title: "Settle",
    text: "Shoes off, a quiet place to change, a moment to breathe.",
    image: "/assets/space-quiet-room.jpg",
    position: "object-[45%_60%]",
    ratio: "aspect-[4/4.5]",
  },
  {
    n: 3,
    title: "Move",
    text: "Fifty minutes, eight people, one instructor.",
    image: "/assets/Sunlit Minimalist Pilates Studio.webp",
    position: "object-[50%_55%]",
    ratio: "aspect-[4/4.5]",
  },
  {
    n: 4,
    title: "Recover",
    text: "A tonic at the bar, and time to land before you leave.",
    image: "/assets/Sunlit Organic Cafe Bar.webp",
    position: "object-[42%_50%]",
    ratio: "aspect-[4/5]",
  },
];

function FirstVisit() {
  return (
    <div>
      <p className="font-script text-[26px] leading-none text-rust sm:text-[30px]">What a first visit looks like</p>
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 pb-10 sm:gap-x-5 sm:gap-y-10 sm:pb-12">
        {firstVisit.map((step, i) => (
          <figure key={step.title} className={cn("group", i % 2 === 1 && "translate-y-8 sm:translate-y-12")}>
            <div className={cn("relative overflow-hidden rounded-[22px] bg-deep-green sm:rounded-[32px]", step.ratio)}>
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-out fine:group-hover:scale-[1.05]">
                <motion.img
                  src={encodeURI(step.image)}
                  alt={`${step.title}: ${step.text}`}
                  initial={{ scale: 1.14 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 1.8, ease: EASE }}
                  className={cn("h-full w-full object-cover", step.position)}
                />
              </div>
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/20" />
              {/* a gold disc with the step's number, sitting on the photograph's corner */}
              <motion.span
                aria-hidden
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.3 + i * 0.12 }}
                className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-title text-[20px] leading-none text-forest sm:left-4 sm:top-4 sm:h-11 sm:w-11 sm:text-[24px]"
              >
                {step.n}
              </motion.span>
            </div>
            <figcaption className="mt-4">
              <span className="block font-title text-[24px] font-normal leading-none tracking-[-0.01em] sm:text-[28px]">{step.title}</span>
              <span className="mt-2 block max-w-[17rem] font-sans text-[12.5px] font-light leading-snug text-ink/75 sm:text-[13.5px]">{step.text}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* Find the studio: what a first visit looks like, the address and the opening hours with today's row marked, and a way on. */
export function ContactVisit() {
  const [today, setToday] = React.useState(-1);
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setToday(todayRow()));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="visit" data-header-theme="light" className="relative w-full scroll-mt-4 overflow-x-clip bg-mint px-6 py-20 text-ink sm:px-10 sm:py-28 md:px-14 lg:px-20 lg:py-36">
      <div className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-12 lg:items-start lg:gap-16">
        <div className="lg:col-span-7">
          <FirstVisit />
        </div>

        {/* the details sit on a cream sheet, and stay in view while the four photographs scroll past */}
        <div className="relative lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          {/* two small arches standing behind the sheet, peeking over its top edge (the same detail as the membership request) */}
          <span aria-hidden className="absolute -top-8 right-10 h-14 w-11 rounded-t-full bg-terracotta sm:right-12" />
          <span aria-hidden className="absolute -top-4 right-[5.4rem] h-10 w-8 rounded-t-full bg-sage sm:right-[6.4rem]" />

          <div className="relative rounded-[32px] bg-plaster p-7 sm:rounded-[40px] sm:p-9">
            <h2 className="font-display text-[38px] font-light leading-[1.1] tracking-normal sm:text-[46px]">Find the studio</h2>

            {/* the address, with a small doorway as its mark */}
            <address className="mt-7 flex items-start gap-4 not-italic">
              <span aria-hidden className="relative mt-0.5 flex h-12 w-9 shrink-0 items-end justify-center overflow-hidden rounded-t-full bg-forest">
                <span className="mb-2 h-3.5 w-3.5 rounded-t-full bg-terracotta" />
              </span>
              <div className="min-w-0">
                <p className="font-title text-[24px] font-normal leading-[1.2] sm:text-[27px]">{siteConfig.address}</p>
                <p className="mt-1 font-sans text-[13px] font-normal tracking-[0.04em] text-ink/70">{siteConfig.city}</p>
                <p className="mt-3 max-w-xs font-sans text-[13.5px] font-light leading-relaxed text-ink-muted">
                  Classes, intro sessions and private appointments are by booking, so someone is always ready to welcome you.
                </p>
              </div>
            </address>

            {/* the opening hours as three small doorways; today's is lit */}
            <p className="mt-9 flex items-baseline gap-3 font-script text-[24px] leading-none text-rust">
              Opening hours
              <span className="font-sans text-[11.5px] font-normal not-italic tracking-[0.06em] text-ink/55">{siteConfig.timeZoneLabel}</span>
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
              {siteConfig.hours.map((row, i) => {
                const now = i === today;
                const [open, close] = row.time.split(" – ");
                return (
                  <li
                    key={row.day}
                    className={cn(
                      "flex flex-col items-center rounded-b-[24px] rounded-t-[999px] px-1.5 pb-4 pt-9 text-center transition-colors duration-500 sm:pt-11",
                      now ? "bg-forest text-bone" : "bg-white/60 text-ink"
                    )}
                  >
                    <span className="font-title text-[19px] font-normal leading-none tracking-[-0.01em] sm:text-[22px]">{shortDays(row.day)}</span>
                    <span className={cn("mt-3 font-sans text-[12.5px] leading-snug sm:text-[13.5px]", now ? "font-normal" : "font-light")}>{open}</span>
                    <span className={cn("font-script text-[16px] leading-none", now ? "text-spark-bright" : "text-rust")}>to</span>
                    <span className={cn("font-sans text-[12.5px] leading-snug sm:text-[13.5px]", now ? "font-normal" : "font-light")}>{close}</span>
                    <span className={cn("mt-2.5 h-5 font-script text-[18px] leading-none text-spark-bright transition-opacity duration-500", now ? "opacity-100" : "opacity-0")} aria-hidden={!now}>
                      today
                    </span>
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={() => requestTopic("intro")}
              className="group mt-8 inline-flex w-full items-center justify-between whitespace-nowrap rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white sm:pl-7 sm:text-[12px] sm:tracking-[0.2em]"
            >
              <span>Book an intro session</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
