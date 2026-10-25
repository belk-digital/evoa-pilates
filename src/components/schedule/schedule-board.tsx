"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { ClassArt } from "@/components/classes/class-art";
import type { ClassKind } from "@/components/classes/classes-data";
import { SpotDots, spotsText } from "@/components/schedule/schedule-bits";
import {
  DAY_NAMES,
  DAY_SHORT,
  PICK_SESSION_EVENT,
  classById,
  endTime,
  formatTime,
  sessions,
  teacherById,
  teachers,
  todayIndex,
  toMinutes,
  type Session,
  type TeacherId,
} from "@/components/schedule/schedule-data";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Kind = "all" | ClassKind;
const kinds: { id: Kind; label: string }[] = [
  { id: "all", label: "All classes" },
  { id: "reformer", label: "Reformer" },
  { id: "mat", label: "Mat" },
  { id: "prenatal", label: "Prenatal" },
  { id: "recovery", label: "Recovery" },
];

const chipBase = "inline-flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-full border px-4 font-sans text-[12px] font-normal tracking-[0.04em] transition-colors duration-300";
const chipOn = "border-ink bg-ink text-white";
const chipOff = "border-ink/20 text-ink/75 hover:border-ink/45 hover:text-ink";

type Status = "reserved" | "waitlist";

function SessionRow({ s, status, flashing, onToggle }: { s: Session; status?: Status; flashing: boolean; onToggle: (id: string, as: Status) => void }) {
  const cls = classById(s.classId);
  const t = formatTime(s.start);
  const teacher = teacherById(s.teacher);
  const full = s.free === 0;
  const mine = status === "reserved";
  const waitlisted = status === "waitlist";
  const on = mine || waitlisted;
  const left = s.free - (mine ? 1 : 0);
  const label = full ? (waitlisted ? "On the waitlist" : "Join waitlist") : mine ? "Reserved" : "Reserve";

  return (
    <li id={`session-${s.id}`} className={cn("flex flex-col gap-4 border-b border-ink/10 py-6 transition-colors duration-700 first:border-t sm:flex-row sm:items-center sm:gap-8 sm:py-7", flashing && "bg-terracotta/25")}>
      <div className="flex flex-1 items-center gap-4 sm:gap-6">
        <div className="w-[92px] shrink-0 sm:w-[140px]">
          <p className="font-display text-[34px] font-light leading-none tracking-normal sm:text-[46px]">
            {t.clock}
            <span className="ml-1 font-script text-[20px] sm:text-[24px]">{t.ampm}</span>
          </p>
          <p className="mt-1.5 font-sans text-[11.5px] font-light text-ink/60">until {endTime(s.start, cls.length)}</p>
        </div>
        <span className="relative block h-14 w-11 shrink-0 overflow-hidden rounded-b-[7px] rounded-t-full" style={{ backgroundColor: cls.panel }}>
          <ClassArt kind={cls.art} className="absolute inset-0 h-full w-full" />
        </span>
        <div className="min-w-0">
          <p className="font-title text-[24px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[28px]">{cls.name}</p>
          <p className="mt-1 font-sans text-[12.5px] font-light text-ink/70">
            with {teacher.name}
            {cls.beginner && <span className="text-rust">, beginner friendly</span>}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
        <div className="flex flex-col items-start gap-1.5 sm:items-end">
          <SpotDots free={s.free} mine={mine} />
          <span className={cn("font-sans text-[12px]", left <= 0 ? "font-light text-ink/60" : left <= 3 ? "font-medium text-rust" : "font-light text-ink/70")}>
            {waitlisted ? "You are on the list" : spotsText(s.free, mine)}
          </span>
        </div>
        <button
          type="button"
          aria-pressed={on}
          onClick={() => onToggle(s.id, full ? "waitlist" : "reserved")}
          className={cn(
            "inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
            on ? "bg-terracotta text-forest" : full ? "border border-ink/30 text-ink hover:bg-ink hover:text-white" : "bg-ink text-white hover:bg-forest"
          )}
        >
          {on && <Check size={13} strokeWidth={2.6} />}
          {label}
        </button>
      </div>
    </li>
  );
}

/* The timetable. Seven arch-shaped day tabs sit on top of a cream sheet like folder tabs, and the chosen day's tab is the
   same cream as the sheet, so the two read as one. Filters narrow the classes, each row shows the eight places in the room as
   eight small circles, and "Reserve" is a preview (frontend only): it marks the class as yours and takes one place. */
export function ScheduleBoard() {
  const [day, setDay] = React.useState(0);
  const [today, setToday] = React.useState(-1);
  const [kind, setKind] = React.useState<Kind>("all");
  const [teacher, setTeacher] = React.useState<"all" | TeacherId>("all");
  const [beginnerOnly, setBeginnerOnly] = React.useState(false);
  const [status, setStatus] = React.useState<Record<string, Status>>({});
  const [flash, setFlash] = React.useState<string | null>(null);

  // open on today (read after the first paint, so the server and the browser agree)
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const t = todayIndex(new Date());
      setToday(t);
      setDay(t);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // another button asks the timetable to show one class: pick its day, clear the filters, scroll to it and flash it
  React.useEffect(() => {
    let scrollTimer: number | undefined;
    let flashTimer: number | undefined;
    const onPick = (e: Event) => {
      const s = sessions.find((x) => x.id === (e as CustomEvent<string>).detail);
      if (!s) return;
      setKind("all");
      setTeacher("all");
      setBeginnerOnly(false);
      setDay(s.day);
      setFlash(s.id);
      scrollTimer = window.setTimeout(() => document.getElementById(`session-${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 450);
      flashTimer = window.setTimeout(() => setFlash(null), 2600);
    };
    window.addEventListener(PICK_SESSION_EVENT, onPick);
    return () => {
      window.removeEventListener(PICK_SESSION_EVENT, onPick);
      window.clearTimeout(scrollTimer);
      window.clearTimeout(flashTimer);
    };
  }, []);

  const matches = React.useCallback(
    (s: Session) => {
      const c = classById(s.classId);
      return (kind === "all" || c.kind === kind) && (teacher === "all" || s.teacher === teacher) && (!beginnerOnly || c.beginner);
    },
    [kind, teacher, beginnerOnly]
  );

  const counts = DAY_SHORT.map((_, d) => sessions.filter((s) => s.day === d && matches(s)).length);
  const rows = sessions.filter((s) => s.day === day && matches(s)).sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  const filtered = kind !== "all" || teacher !== "all" || beginnerOnly;

  const toggle = (id: string, as: Status) =>
    setStatus((cur) => {
      const next = { ...cur };
      if (next[id]) delete next[id];
      else next[id] = as;
      return next;
    });
  const clear = () => {
    setKind("all");
    setTeacher("all");
    setBeginnerOnly(false);
  };

  return (
    <section id="timetable" data-header-theme="light" className="relative w-full scroll-mt-4 bg-mint px-3 pb-16 pt-4 text-ink sm:px-6 sm:pb-24 lg:px-10 lg:pb-28">
      <div className="mx-auto w-full max-w-[1200px]">
        {/* the day tabs */}
        <div role="tablist" aria-label="Day of the week" className="grid grid-cols-7 items-end gap-1 sm:gap-1.5">
          {DAY_SHORT.map((label, d) => {
            const on = d === day;
            return (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="timetable-panel"
                onClick={() => setDay(d)}
                className={cn(
                  "relative flex flex-col items-center rounded-t-[999px] px-0.5 pb-2.5 pt-6 text-center transition-all duration-300 sm:pb-4 sm:pt-9",
                  on ? "h-[98px] bg-plaster sm:h-[128px]" : "h-[86px] bg-plaster/45 hover:bg-plaster/70 sm:h-[112px]",
                  counts[d] === 0 && !on && "opacity-60"
                )}
              >
                <span className="font-title text-[16px] font-normal leading-none sm:text-[23px]">{label}</span>
                <span aria-hidden className="mt-2 flex h-2 items-center gap-0.5 sm:gap-1">
                  {Array.from({ length: Math.min(counts[d], 5) }, (_, i) => (
                    <span key={i} className="h-1 w-1 rounded-full bg-terracotta sm:h-1.5 sm:w-1.5" />
                  ))}
                </span>
                <span aria-hidden className={cn("mt-1 h-4 font-script text-[14px] leading-none text-rust sm:text-[17px]", d === today ? "opacity-100" : "opacity-0")}>
                  today
                </span>
                <span className="sr-only">{DAY_NAMES[d]}, {counts[d]} classes{d === today ? ", today" : ""}</span>
              </button>
            );
          })}
        </div>

        {/* the sheet */}
        <div id="timetable-panel" role="tabpanel" className="rounded-b-[28px] bg-plaster px-5 pb-10 pt-8 sm:rounded-b-[40px] sm:px-10 sm:pb-14 sm:pt-10 lg:rounded-b-[52px] lg:px-14">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 aria-live="polite" className="font-display text-[44px] font-light leading-none tracking-normal sm:text-[60px] lg:text-[72px]">
                {DAY_NAMES[day]}
              </h2>
              <p className="mt-3 font-script text-[20px] leading-none text-rust">
                {siteConfig.timeZoneLabel}, {siteConfig.city.split(",")[0]}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 lg:justify-end" role="group" aria-label="Filter by class">
                {kinds.map((k) => (
                  <button key={k.id} type="button" aria-pressed={kind === k.id} onClick={() => setKind(k.id)} className={cn(chipBase, kind === k.id ? chipOn : chipOff)}>
                    {k.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 lg:justify-end">
                <div className="hide-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0" role="group" aria-label="Filter by teacher">
                  <button type="button" aria-pressed={teacher === "all"} onClick={() => setTeacher("all")} className={cn(chipBase, teacher === "all" ? chipOn : chipOff)}>
                    Any teacher
                  </button>
                  {teachers.map((t) => (
                    <button key={t.id} type="button" aria-pressed={teacher === t.id} onClick={() => setTeacher(t.id)} className={cn(chipBase, teacher === t.id ? chipOn : chipOff)}>
                      {t.first}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={beginnerOnly}
                  onClick={() => setBeginnerOnly((v) => !v)}
                  className="group flex min-h-10 items-center gap-3 font-sans text-[12px] font-normal tracking-[0.04em] text-ink/80"
                >
                  <span className={cn("relative h-6 w-11 rounded-full border transition-colors duration-300", beginnerOnly ? "border-ink bg-ink" : "border-ink/25 bg-transparent")}>
                    <span className={cn("absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-300", beginnerOnly ? "left-[22px] bg-white" : "left-1 bg-ink/50")} />
                  </span>
                  Beginner friendly
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${day}-${kind}-${teacher}-${beginnerOnly}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="mt-8 sm:mt-10">
              {rows.length ? (
                <ul>
                  {rows.map((s) => (
                    <SessionRow key={s.id} s={s} status={status[s.id]} flashing={flash === s.id} onToggle={toggle} />
                  ))}
                </ul>
              ) : (
                <div className="border-y border-ink/10 py-14 text-center">
                  <p className="font-title text-[26px] font-normal leading-tight sm:text-[30px]">
                    {filtered ? `Nothing matches on ${DAY_NAMES[day]}.` : `No classes on ${DAY_NAMES[day]}.`}
                  </p>
                  {filtered && (
                    <button type="button" onClick={clear} className="mt-3 font-sans text-[12px] font-semibold uppercase tracking-[0.18em] text-rust underline decoration-rust/40 underline-offset-4 transition-colors hover:text-spark">
                      Clear the filters
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <p className="font-sans text-[14px] font-light leading-relaxed text-ink/75">New to Evoa? Your first class is a complimentary intro session.</p>
            <Link href="/contact?topic=intro" className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
              Book your intro <ArrowUpRight size={14} strokeWidth={2.2} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
