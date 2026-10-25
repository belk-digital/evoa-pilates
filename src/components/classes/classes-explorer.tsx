"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { ArtSvg, ClassArt, P } from "@/components/classes/class-art";
import {
  classes,
  experiences,
  OPEN_CLASS_EVENT,
  goals,
  recommend,
  type ClassKind,
  type Experience,
  type Goal,
  type StudioClass,
} from "@/components/classes/classes-data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const INTENSITY = ["", "Gentle", "Steady", "Strong"] as const;

type Filter = "all" | ClassKind;
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "reformer", label: "Reformer" },
  { id: "mat", label: "Mat" },
  { id: "prenatal", label: "Prenatal" },
  { id: "recovery", label: "Recovery" },
];

function Dots({ n }: { n: 1 | 2 | 3 }) {
  return (
    <span role="img" aria-label={`Intensity: ${INTENSITY[n]}`} className="inline-flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <span key={i} className={cn("h-1.5 w-1.5 rounded-full", i <= n ? "bg-ink" : "bg-ink/20")} />
      ))}
    </span>
  );
}

function InkPill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-4 rounded-full bg-ink py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
    >
      <span>{children}</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
        <ArrowUpRight size={14} strokeWidth={2.2} />
      </span>
    </Link>
  );
}

const chipBase =
  "inline-flex min-h-10 items-center rounded-full border px-4 font-sans text-[12px] font-normal tracking-[0.04em] transition-colors duration-300";
const chipOn = "border-ink bg-ink text-white";
const chipOff = "border-ink/20 text-ink/75 hover:border-ink/45 hover:text-ink";

/* ---------------- the picker ---------------- */

function Finder({ onShow }: { onShow: (id: string) => void }) {
  const [goal, setGoal] = React.useState<Goal | null>(null);
  const [experience, setExperience] = React.useState<Experience | null>(null);

  const result = goal ? recommend(goal, experience) : null;
  const match = result && result !== "private" && result !== "needs-experience" ? classes.find((c) => c.id === result) : null;

  return (
    <div className="rounded-[32px] bg-plaster p-6 sm:rounded-[40px] sm:p-8">
      <div className="flex items-center gap-3">
        <ArtSvg viewBox="0 0 22 28" animate className="h-7 w-[22px] shrink-0">
          <P fx="rise" d="M1 28V11a10 10 0 0 1 20 0v17Z" fill="#c4a96a" />
          <P fx="rise" d="M6 28V12a5 5 0 0 1 10 0v16Z" fill="#f3ede3" />
        </ArtSvg>
        <h2 className="font-title text-[26px] font-normal leading-none tracking-[-0.01em] sm:text-[30px]">Find your class</h2>
      </div>

      <fieldset className="mt-6">
        <legend className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">What are you after?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {goals.map((g) => (
            <button key={g.id} type="button" aria-pressed={goal === g.id} onClick={() => setGoal(g.id)} className={cn(chipBase, goal === g.id ? chipOn : chipOff)}>
              {g.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">Your experience</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {experiences.map((e) => (
            <button key={e.id} type="button" aria-pressed={experience === e.id} onClick={() => setExperience(e.id)} className={cn(chipBase, experience === e.id ? chipOn : chipOff)}>
              {e.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div aria-live="polite" className="mt-6 min-h-[118px] border-t border-ink/10 pt-5">
        <AnimatePresence mode="wait" initial={false}>
          {result === null && (
            <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="font-sans text-[13.5px] font-light leading-relaxed text-ink-muted">
              Choose what you are after and we will suggest where to begin.
            </motion.p>
          )}
          {result === "needs-experience" && (
            <motion.p key="needs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="font-sans text-[13.5px] font-light leading-relaxed text-ink-muted">
              And how well do you know Pilates? That decides which level suits you.
            </motion.p>
          )}
          {(match || result === "private") && (
            <motion.div
              key={match ? match.id : "private"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-start gap-4"
            >
              <span
                className="relative block h-[72px] w-[58px] shrink-0 overflow-hidden rounded-t-full rounded-b-[10px]"
                style={{ backgroundColor: match ? match.panel : "#8fa08a" }}
              >
                <ClassArt kind={match ? match.art : "arch"} animate className="absolute inset-0 h-full w-full" />
              </span>
              <div className="min-w-0">
                <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">We would start you with</p>
                <p className="mt-1 font-title text-[26px] font-normal leading-[1.05] tracking-[-0.01em]">{match ? match.name : "Private & Duet"}</p>
                <p className="mt-1 font-sans text-[13px] font-light leading-snug text-ink-muted">
                  {match ? match.best : "A conversation first, then 55 minutes shaped around you."}
                </p>
                {match ? (
                  <button type="button" onClick={() => onShow(match.id)} className="mt-2.5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
                    See the class <ArrowUpRight size={13} strokeWidth={2.2} />
                  </button>
                ) : (
                  <Link href="#private" className="mt-2.5 inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
                    Ask about privates <ArrowUpRight size={13} strokeWidth={2.2} />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------------- the programme ---------------- */

function ClassRow({ item, open, onToggle }: { item: StudioClass; open: boolean; onToggle: () => void }) {
  const panelId = `panel-${item.id}`;
  return (
    <li id={item.id} className="scroll-mt-28 border-t border-ink/10 last:border-b">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-4 py-5 text-left md:grid-cols-[84px_minmax(0,1.25fr)_minmax(0,1fr)_auto] md:gap-x-8 md:py-7"
        >
          <span className="relative block h-[76px] w-[62px] overflow-hidden rounded-t-full rounded-b-[10px] md:h-[104px] md:w-[84px]" style={{ backgroundColor: item.panel }}>
            <ClassArt kind={item.art} animate className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110" />
          </span>

          <span className="block min-w-0">
            <span className="block font-title text-[28px] font-normal leading-[1.02] tracking-[-0.01em] sm:text-[34px] lg:text-[42px]">{item.name}</span>
            <span className="mt-2 hidden font-sans text-[13.5px] font-light leading-snug text-ink-muted md:block">{item.line}</span>
            {/* small screens: the details sit under the name */}
            <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10.5px] font-normal uppercase tracking-[0.16em] text-ink/65 md:hidden">
              <span>{item.length}</span>
              <Dots n={item.intensity} />
              <span>{item.level}</span>
            </span>
          </span>

          <span className="hidden flex-col gap-2.5 font-sans text-[11px] font-normal uppercase tracking-[0.18em] text-ink/70 md:flex">
            <span>
              {item.length} <span className="text-ink/30">/</span> {item.level}
            </span>
            <span className="flex items-center gap-2.5">
              <Dots n={item.intensity} />
              <span>{INTENSITY[item.intensity]}</span>
            </span>
          </span>

          <span
            aria-hidden="true"
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-500 ease-out",
              open ? "rotate-45 border-ink bg-ink text-white" : "border-ink/20 text-ink group-hover:border-ink/50"
            )}
          >
            <Plus size={16} strokeWidth={1.6} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={item.name}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-9 pt-1 md:grid-cols-12 md:gap-10 md:pb-12">
              <div className="hidden md:col-span-4 md:block lg:col-span-3">
                <div className="relative aspect-[5/6] overflow-hidden rounded-t-full rounded-b-[18px]" style={{ backgroundColor: item.panel }}>
                  <ClassArt kind={item.art} animate delay={0.25} className="absolute inset-0 h-full w-full" />
                </div>
              </div>

              <div className="md:col-span-8 lg:col-span-9">
                <p className="max-w-2xl font-serif text-[22px] font-light leading-[1.35] text-ink sm:text-[26px]">{item.text}</p>

                <div className="mt-7 grid gap-7 sm:grid-cols-2 sm:gap-10">
                  <div>
                    <p className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">What to expect</p>
                    <ul className="mt-3 flex flex-col gap-2.5">
                      {item.expect.map((line) => (
                        <li key={line} className="flex gap-3 font-sans text-[14px] font-light leading-snug text-ink/80">
                          <span aria-hidden className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <dl className="flex flex-col gap-4">
                    <div>
                      <dt className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">Best for</dt>
                      <dd className="mt-1.5 font-sans text-[14px] font-light leading-snug text-ink/80">{item.best}</dd>
                    </div>
                    <div>
                      <dt className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">In the room</dt>
                      <dd className="mt-1.5 font-sans text-[14px] font-light leading-snug text-ink/80">Eight people, one instructor, no mirrors</dd>
                    </div>
                  </dl>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <InkPill href="/contact?topic=intro">Book an intro session</InkPill>
                  <Link href="/schedule" className="inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
                    See the schedule <ArrowUpRight size={14} strokeWidth={2.2} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ---------------- both sections share one state ---------------- */

export function ClassesExplorer() {
  const [filter, setFilter] = React.useState<Filter>("all");
  const [beginnerOnly, setBeginnerOnly] = React.useState(false);
  const [open, setOpen] = React.useState<string | null>("reformer-foundations");

  const goTo = React.useCallback((id: string) => {
    setFilter("all");
    setBeginnerOnly(false);
    setOpen(id);
    // wait for the row that was open to finish folding away (it sits above and shifts everything), then scroll
    window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 650);
  }, []);

  // /classes#reformer-flow opens that class, on arrival and whenever the hash changes
  React.useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (classes.some((c) => c.id === id)) goTo(id);
    };
    const fromEvent = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (classes.some((c) => c.id === id)) goTo(id);
    };
    const raf = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    window.addEventListener(OPEN_CLASS_EVENT, fromEvent);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", fromHash);
      window.removeEventListener(OPEN_CLASS_EVENT, fromEvent);
    };
  }, [goTo]);

  const visible = classes.filter((c) => (filter === "all" || c.kind === filter) && (!beginnerOnly || c.beginner));

  return (
    <>
      {/* Title and the picker */}
      <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-12 pt-28 text-ink sm:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pb-20 lg:pt-40">
        <div className="grid gap-10 px-3 sm:px-4 lg:grid-cols-12 lg:items-center lg:gap-14 lg:px-10">
          <div className="lg:col-span-7">
            <Eyebrow>Classes</Eyebrow>
            <motion.h1
              {...wipeProps}
              className="mt-5 font-display text-[clamp(42px,11.5vw,72px)] font-light leading-[0.98] tracking-normal text-ink sm:text-[clamp(56px,8.6vw,92px)] lg:text-[clamp(72px,7.2vw,124px)]"
            >
              <span className="block">Begin where</span>
              <span className="block">
                <SparkText>you are.</SparkText>
              </span>
            </motion.h1>
            <p className="mt-6 max-w-[28rem] font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[17px]">
              One standard in every room: eight people, one instructor, no mirrors. Tell us what you are after and we will suggest a first class.
            </p>
          </div>

          <div className="lg:col-span-5">
            <Finder onShow={goTo} />
          </div>
        </div>
      </section>

      {/* The programme */}
      <section id="programme" data-header-theme="light" className="relative w-full bg-mint px-3 pb-3 text-ink sm:px-6 lg:px-10">
        <div className="rounded-[36px] bg-plaster px-5 py-12 sm:rounded-[48px] sm:px-10 sm:py-16 lg:rounded-[64px] lg:px-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
              <h2 className="font-title text-[34px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[44px]">
                The programme
              </h2>
              <div>
                <p className="flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[10.5px] font-normal uppercase tracking-[0.18em] text-ink/65">
                  <span className="flex items-center gap-2">
                    <Dots n={1} /> Gentle
                  </span>
                  <span className="flex items-center gap-2">
                    <Dots n={2} /> Steady
                  </span>
                  <span className="flex items-center gap-2">
                    <Dots n={3} /> Strong
                  </span>
                </p>
              </div>
            </div>

            {/* filters */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:mt-10">
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter classes">
                {filters.map((f) => (
                  <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)} className={cn(chipBase, filter === f.id ? chipOn : chipOff)}>
                    {f.label}
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

            <ul className="mt-6 sm:mt-8">
              {visible.map((item) => (
                <ClassRow key={item.id} item={item} open={open === item.id} onToggle={() => setOpen((cur) => (cur === item.id ? null : item.id))} />
              ))}
            </ul>

            <p className="mt-6 font-sans text-[12px] font-light leading-relaxed text-ink/60">
              Grip socks required, free cancellation up to 12 hours before class. Tell us about injuries or pregnancy when you book.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
