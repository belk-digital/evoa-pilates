"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClassArt } from "@/components/classes/class-art";
import { byKind, disciplines, type ClassKind } from "@/components/classes/classes-data";
import { cn } from "@/lib/utils";
import { RollingButton } from "@/components/about/rolling-button";

const STEPS = [
  { title: "Reserve", text: "Pick a class" },
  { title: "Arrive", text: "A few minutes early" },
  { title: "Move", text: "Grip socks on" },
  { title: "Restore", text: "Tonic at the bar" },
];

/* One discipline as a panel: its name and tagline from the client's copy, its sentence, and its four classes as rows (each with
   its own small drawing, which builds itself as it scrolls into view) that open that class on the Classes page. The mat is cream
   and the reformer deep olive, so the two read as a pair. */
function DisciplinePanel({ kind, dark, className }: { kind: ClassKind; dark?: boolean; className?: string }) {
  const d = disciplines[kind];
  const items = byKind(kind);
  return (
    <div
      className={cn(
        "flex flex-col rounded-[32px] px-6 py-10 sm:rounded-[44px] sm:px-10 sm:py-12 lg:rounded-[56px] lg:px-12 lg:py-14",
        dark ? "bg-forest text-bone" : "bg-plaster text-ink",
        className
      )}
    >
      <h3 className={cn("font-script text-[26px] leading-none sm:text-[30px]", dark ? "text-spark-bright" : "text-rust")}>{d.label}</h3>
      <p className="mt-4 font-display text-[32px] font-normal leading-[1.1] tracking-normal sm:text-[42px] lg:text-[clamp(34px,3.2vw,48px)]">{d.tagline}</p>
      <p className={cn("mt-5 max-w-md font-sans text-[14.5px] font-light leading-relaxed", dark ? "text-white/70" : "text-ink-muted")}>{d.text}</p>

      <ul className="mt-8 flex-1">
        {items.map((item) => (
          <li key={item.id}>
            <Link
              href={`/classes#${item.id}`}
              className={cn("group flex items-center gap-4 border-b py-4 first:border-t sm:gap-5", dark ? "border-white/12" : "border-ink/10")}
            >
              <span className="relative block h-14 w-11 shrink-0 overflow-hidden rounded-b-[7px] rounded-t-full" style={{ backgroundColor: item.panel }}>
                <ClassArt kind={item.art} animate className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-title text-[24px] font-normal leading-[1.1] tracking-[-0.01em] transition-colors sm:text-[26px]">
                  <span className={cn(dark ? "text-spark-bright" : "text-rust")}>{item.short}</span>
                </span>
                <span className={cn("mt-1 block font-sans text-[13px] font-light leading-snug", dark ? "text-white/65" : "text-ink/70")}>{item.line}</span>
              </span>
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
                className={cn("shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5", dark ? "text-white/50 group-hover:text-white" : "text-ink/50 group-hover:text-ink")}
              />
            </Link>
          </li>
        ))}
      </ul>

      <RollingButton href={`/classes?type=${kind}`} variant={dark ? "solid" : "dark"} className="mt-8 w-fit">
        {d.cta}
      </RollingButton>
    </div>
  );
}

/* "Two disciplines. One philosophy." from the client's copy: the mat and the reformer side by side (the reformer's panel sits a
   little lower on desktop), and a slim first-visit bar underneath. */
export function TwoDisciplines() {
  return (
    <section id="classes" data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-3 py-16 text-ink sm:px-6 sm:py-24 lg:px-10 lg:py-32">
      <div className="px-3 sm:px-4 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <h2 className="font-display text-[40px] font-normal leading-[1.08] tracking-normal sm:text-[54px] md:text-[64px] lg:col-span-7 lg:text-[clamp(56px,5.2vw,80px)]">
            Two disciplines. One philosophy.
          </h2>
          <div className="lg:col-span-5">
            <p className="font-script text-[24px] leading-none text-rust sm:text-[28px]">Find your movement.</p>
            <p className="mt-3 max-w-md font-sans text-[14.5px] font-light leading-relaxed text-ink/70 sm:text-[15.5px]">
              Whether grounded on the mat or elevated on the reformer, every EVOA class is designed to meet you where you are and inspire where you can go.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-2 lg:gap-5">
        <DisciplinePanel kind="mat" />
        <DisciplinePanel kind="reformer" dark className="lg:mt-16" />
      </div>

      {/* First visit: one slim bar */}
      <div className="mt-14 flex flex-col gap-6 border-y border-ink/15 px-3 py-6 sm:px-4 lg:mt-20 lg:px-10 min-[1400px]:flex-row min-[1400px]:items-center min-[1400px]:justify-between min-[1400px]:gap-6">
        <h3 className="font-title text-[34px] font-normal leading-none tracking-[-0.01em] sm:text-[40px]">
          Your <span className="font-script tracking-normal text-spark">first</span> visit
        </h3>

        {/* On large screens the list steps aside (display: contents) so the title, the four steps and the button are all
            items of one row, spread with equal gaps between every pair. */}
        <ol role="list" className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4 min-[1400px]:contents">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/25 font-sans text-[12px] font-medium text-rust">{i + 1}</span>
              <span className="flex flex-col">
                <span className="font-title text-[22px] leading-none">{step.title}</span>
                <span className="mt-1 font-sans text-[12px] font-light leading-snug text-ink/65">{step.text}</span>
              </span>
            </li>
          ))}
        </ol>

        <RollingButton href="/schedule" variant="dark" className="shrink-0 self-start whitespace-nowrap min-[1400px]:self-auto">
          See the schedule
        </RollingButton>
      </div>

      <p className="mt-5 px-3 font-sans text-[12px] font-light leading-relaxed text-ink/60 sm:px-4 lg:px-10">
        Grip socks required · Free cancellation up to 12 hours before class · Tell us about injuries when you book.
      </p>
    </section>
  );
}
