"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { MarginNote } from "@/components/ui/margin-note";
import { ArtSvg, P } from "@/components/classes/class-art";
import { byKind, money, packageById, perClassText, goToBuy, type Pkg } from "@/components/membership/membership-data";
import { cn } from "@/lib/utils";
import { RollingButton } from "@/components/about/rolling-button";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* One, two or three nested arches rising from a ground line: the package's level. The innermost is gold. */
function Emblem({ rings, dark }: { rings: 1 | 2 | 3; dark: boolean }) {
  const radii = [10, 19, 28].slice(0, rings);
  return (
    <ArtSvg viewBox="0 0 64 36" animate stagger={0.22} className="h-14 w-[100px]">
      <P fx="draw" d="M2 34.5H62" stroke={dark ? "#f3ede3" : "#2b3220"} strokeOpacity="0.25" />
      {[...radii].reverse().map((r) => {
        const inner = r === 10;
        return (
          <P
            key={r}
            fx="draw"
            d={`M${32 - r} 34.5A${r} ${r} 0 0 1 ${32 + r} 34.5`}
            stroke={inner ? "#c4a96a" : dark ? "#f3ede3" : "#2b3220"}
            strokeOpacity={inner ? 1 : 0.5}
            strokeWidth={inner ? 2.2 : 1.3}
          />
        );
      })}
    </ArtSvg>
  );
}

/* ---------------- monthly: three doorways that step up ---------------- */

/* Each monthly package is a doorway. They share one width and rise by a step as the number of classes goes up, so the row reads
   as a skyline (the same idea as the progression on the Classes page). Everything is bottom-aligned, so the buttons and lists line
   up across the three even though the tops do not. The middle one is deep olive, the last brushed gold. */
const cardTone = ["bg-plaster text-ink", "bg-forest text-bone", "bg-peach text-ink"];

function MonthlyCard({ pkg, index, href }: { pkg: Pkg; index: number; href?: string }) {
  const dark = index === 1;
  const gold = index === 2;
  const perks = [`${pkg.classes} reformer classes every month`, "Form, Define, Power and Lengthen", "Reserve your place on the schedule"];
  // the deep olive card takes the white pill, the other two the ink one
  const tone = dark ? "solid" : "dark";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="relative w-[82vw] max-w-[380px] shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none"
    >
      {index === 0 && (
        <span className="absolute -top-[146px] left-[8%] hidden lg:block">
          {/* two lines, so it stays inside the first card's width and never reaches the taller arch beside it; the arrow
              points on along the steps, as the note is about all three packages */}
          <MarginNote curl="right" tilt={-4}>
            the more you come,
            <br />
            the less each class costs
          </MarginNote>
        </span>
      )}

      {/* the card grows up from the ground line */}
      <motion.article
        variants={{
          hidden: { clipPath: "inset(100% 0 0 0)" },
          show: { clipPath: "inset(0% 0 0 0)", transition: { duration: 1.1, delay: index * 0.12, ease: EASE } },
        }}
        style={{ paddingTop: `calc(3.25rem + var(--lift-step) * ${index})` }}
        className={cn("flex flex-col rounded-b-[32px] rounded-t-[999px] px-7 pb-8 sm:px-8 lg:px-9", cardTone[index])}
      >
        <div className="flex justify-center">
          <Emblem rings={(index + 1) as 1 | 2 | 3} dark={dark} />
        </div>

        <p className={cn("mt-4 text-center font-script text-[22px] leading-none", dark ? "text-spark-bright" : "text-rust")}>Reformer</p>
        <h3 className="mt-2 text-center font-display text-[40px] font-normal leading-none tracking-normal sm:text-[46px]">{pkg.name}</h3>
        <div className="mt-4 flex justify-center">
          <span className={cn("rounded-full px-3.5 py-1.5 font-sans text-[12px] font-light", dark ? "bg-white/10 text-bone" : "bg-ink/[0.06] text-ink/80")}>{pkg.best}</span>
        </div>

        <div className="mt-7 flex items-end justify-center gap-2">
          <span className="pb-1.5 font-display text-[28px] leading-none">$</span>
          <span className="font-display text-[68px] font-normal leading-[0.9] tracking-normal sm:text-[76px]">{pkg.price}</span>
          <span className={cn("pb-2 font-sans text-[11px] font-medium uppercase leading-[1.3] tracking-[0.18em]", dark ? "text-white/60" : "text-ink/60")}>
            a<br />month
          </span>
        </div>
        <p className={cn("mt-2 text-center font-sans text-[13px] font-light", dark ? "text-white/65" : "text-ink/70")}>{perClassText(pkg)}</p>

        {href ? (
          <RollingButton href={href} variant={tone} block className="mt-7">
            Buy now
          </RollingButton>
        ) : (
          <RollingButton variant={tone} block className="mt-7" onClick={goToBuy}>
            Buy now
          </RollingButton>
        )}

        <div className={cn("mt-8 border-t pt-6", dark ? "border-white/10" : gold ? "border-ink/15" : "border-ink/10")}>
          <p className={cn("font-script text-[22px] leading-none", dark ? "text-spark-bright" : "text-rust")}>Included</p>
          <ul className="mt-4 flex flex-col gap-3">
            {perks.map((perk) => (
              <li key={perk} className={cn("flex items-start gap-3 font-sans text-[13.5px] font-light leading-snug", dark ? "text-white/80" : "text-ink/80")}>
                <span className={cn("mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full", dark ? "bg-spark-bright/20 text-spark-bright" : gold ? "bg-forest/15 text-forest" : "bg-terracotta/25 text-rust")}>
                  <Check size={11} strokeWidth={2.6} />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </motion.article>
    </motion.div>
  );
}

/* On the Membership page the buttons scroll to the buy section further down. With `toMembershipPage` (the homepage)
   they link to that section of the Membership page instead, and a link below the cards leads to every option. */
export function MembershipMonthly({ toMembershipPage = false }: { toMembershipPage?: boolean }) {
  const monthly = byKind("monthly");
  return (
    <section id="plans" data-header-theme="light" className="relative w-full scroll-mt-4 overflow-x-clip bg-mint pb-16 text-ink lg:pb-24">
      <div className="flex w-full flex-col justify-between gap-6 px-6 pb-10 sm:px-10 sm:pb-14 md:px-14 lg:flex-row lg:items-end lg:px-20">
        <h2 className="font-display text-[40px] font-normal leading-[1.1] tracking-normal sm:text-[54px] lg:text-[68px]">Choose your access</h2>
        <p className="max-w-sm font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[16.5px]">
          Monthly reformer packages. Choose the rhythm that suits your week, and change it whenever your week changes.
        </p>
      </div>

      <div className="hide-scrollbar flex w-full snap-x snap-mandatory scroll-pl-3 items-end gap-3 overflow-x-auto overflow-y-hidden px-3 pt-4 [--lift-step:30px] sm:scroll-pl-6 sm:gap-4 sm:px-6 sm:[--lift-step:44px] lg:grid lg:snap-none lg:grid-cols-3 lg:items-end lg:gap-5 lg:overflow-visible lg:px-10 lg:pt-32 lg:[--lift-step:64px]">
        {monthly.map((pkg, i) => (
          <MonthlyCard key={pkg.id} pkg={pkg} index={i} href={toMembershipPage ? `/pricing#buy` : undefined} />
        ))}
      </div>

      {toMembershipPage && (
        <div className="mt-12 flex justify-center px-6">
          <Link href="/pricing" className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
            See unlimited, class packs and drop-ins <ArrowUpRight size={14} strokeWidth={2.2} />
          </Link>
        </div>
      )}
    </section>
  );
}

/* ---------------- unlimited: a dark panel with two options ---------------- */

const rise = { hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 1, ease: EASE } } };
const pop = { hidden: { scale: 0, opacity: 0 }, show: { scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 150, damping: 12 } } };
const fromBase = { transformOrigin: "50% 100%" } as const;

export function MembershipUnlimited() {
  const options = byKind("unlimited");
  return (
    <section id="unlimited" data-header-theme="dark" className="relative w-full scroll-mt-4 bg-mint px-3 pb-3 sm:px-6 lg:px-10">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-forest px-6 py-14 text-bone sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[44px] font-normal leading-[1.06] tracking-normal text-bone sm:text-[58px] lg:text-[clamp(52px,5.4vw,84px)]">Unlimited</h2>
            <p className="mt-6 max-w-md font-sans text-[15px] font-light leading-relaxed text-white/70 sm:text-[16.5px]">
              For a daily practice. Book as often as you like, and the more you come, the lower the price of each class.
            </p>

            {/* arches and a sun, built layer by layer */}
            <motion.div
              aria-hidden="true"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } } }}
              className="relative mt-10 hidden h-[220px] w-full max-w-[360px] lg:block"
            >
              <motion.div variants={rise} style={fromBase} className="absolute bottom-0 left-[4%] h-[86%] w-[38%] rounded-t-full bg-plaster" />
              <motion.div variants={rise} style={fromBase} className="absolute bottom-0 left-[11%] h-[60%] w-[24%] rounded-t-full bg-terracotta" />
              <motion.div variants={rise} style={fromBase} className="absolute bottom-0 left-[46%] h-[44%] w-[32%] rounded-t-full bg-sage" />
              <motion.div variants={pop} className="absolute right-[6%] top-0 h-[56%] w-[26%] rounded-full bg-peach" />
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-7">
            {options.map((pkg) => (
              <div key={pkg.id} className="flex flex-col gap-6 rounded-[28px] border border-white/12 bg-white/[0.05] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:rounded-[36px] sm:p-8">
                <div className="min-w-0">
                  <h3 className="font-title text-[30px] font-normal leading-[1.05] tracking-[-0.01em] sm:text-[36px]">
                    {/* the serif's "+" loses its thin horizontal stroke on screen, so it is set in the sans */}
                    {pkg.name.split(" + ").map((part, i) => (
                      <React.Fragment key={part}>
                        {i > 0 && <span className="mx-[0.28em] font-sans text-[0.62em] font-light align-[0.12em]">+</span>}
                        {part}
                      </React.Fragment>
                    ))}
                  </h3>
                  <p className="mt-2 max-w-xs font-sans text-[13.5px] font-light leading-relaxed text-white/65">
                    {pkg.discipline === "mat"
                      ? "Every mat class: Sculpt, Flow, Ignite and Restore."
                      : "Every class: all four on the mat and all four on the reformer."}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 sm:shrink-0 sm:flex-col sm:items-end sm:gap-4">
                  <p className="whitespace-nowrap font-display leading-none">
                    <span className="text-[56px] sm:text-[64px]">{money(pkg.price)}</span>
                    <span className="ml-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/55">a month</span>
                  </p>
                  <RollingButton variant="solid" onClick={goToBuy}>
                    Buy now
                  </RollingButton>
                </div>
              </div>
            ))}
            <p className="mt-1 font-script text-[22px] leading-none text-spark-bright">priced by use: each class costs less the more you come</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- packs and single classes: a flat sand band ---------------- */

/* One line in a list: what you get on the left, what it costs on the right. The whole line chooses it. */
function PriceLine({ pkg, label }: { pkg: Pkg; label: string }) {
  return (
    <li>
      <button
        type="button"
        onClick={goToBuy}
        className="group grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-ink/10 py-4 text-left transition-colors first:border-t hover:border-ink/25"
      >
        <span className="min-w-0">
          <span className="block font-title text-[24px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[26px]">{label}</span>
          <span className="mt-1 block font-sans text-[12.5px] font-light text-ink/65">{perClassText(pkg)}</span>
        </span>
        <span className="font-display text-[34px] font-normal leading-none sm:text-[40px]">{money(pkg.price)}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
          <ArrowUpRight size={14} strokeWidth={2} />
        </span>
      </button>
    </li>
  );
}

export function MembershipPacks() {
  const packs = byKind("pack");
  const dropins = byKind("dropin");
  return (
    <section id="packs" data-header-theme="light" className="relative w-full scroll-mt-4 bg-mint text-ink">
      {/* a flat, full-bleed band: no rounded corners, so it reads differently from the panels around it */}
      <div className="mt-3 bg-plaster px-6 py-16 sm:mt-6 sm:px-10 sm:py-24 lg:mt-10 lg:px-16 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-16 lg:grid-cols-12 lg:gap-14">
          {/* packs */}
          <div className="lg:col-span-7">
            <h2 className="font-title text-[36px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[46px]">Class packs</h2>
            <p className="mt-3 max-w-md font-sans text-[14.5px] font-light leading-relaxed text-ink-muted">Buy a few classes and use them as your week allows. The larger the pack, the lower the price of each class.</p>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 sm:gap-8">
              {(["mat", "reformer"] as const).map((discipline) => (
                <div key={discipline}>
                  <p className="font-script text-[26px] leading-none text-rust">{discipline === "mat" ? "Mat" : "Reformer"}</p>
                  <ul className="mt-4">
                    {packs
                      .filter((p) => p.discipline === discipline)
                      .map((pkg) => (
                        <PriceLine key={pkg.id} pkg={pkg} label={`${pkg.classes} classes`} />
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* a single class, as two small doorways */}
          <div className="lg:col-span-5">
            <h2 className="font-title text-[36px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[46px]">Single class</h2>
            <p className="mt-3 max-w-sm font-sans text-[14.5px] font-light leading-relaxed text-ink-muted">Pay for the class you take, nothing more. A good way to find the one that suits you.</p>
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
              {dropins.map((pkg, i) => (
                <li key={pkg.id}>
                  <button
                    type="button"
                    onClick={goToBuy}
                    className={cn(
                      "group flex w-full flex-col items-center rounded-b-[24px] rounded-t-[999px] px-3 pb-6 pt-12 text-center transition-colors duration-300 sm:pt-16",
                      i === 0 ? "bg-white/60 text-ink hover:bg-white" : "bg-forest text-bone hover:bg-deep-green"
                    )}
                  >
                    <span className={cn("font-script text-[24px] leading-none", i === 0 ? "text-rust" : "text-spark-bright")}>{pkg.discipline === "mat" ? "Mat" : "Reformer"}</span>
                    <span className="mt-3 font-display text-[52px] font-normal leading-none sm:text-[64px]">{money(pkg.price)}</span>
                    <span className={cn("mt-2 font-sans text-[12px] font-light", i === 0 ? "text-ink/65" : "text-white/65")}>a class</span>
                    <span className={cn("mt-5 inline-flex items-center gap-1.5 font-sans text-[10.5px] font-semibold uppercase tracking-[0.18em]", i === 0 ? "text-rust" : "text-spark-bright")}>
                      Choose <ArrowUpRight size={12} strokeWidth={2.2} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- value: what each class costs ---------------- */

const barLabel = (p: Pkg) => (p.kind === "dropin" ? "Drop-in" : p.kind === "pack" ? `${p.classes} classes` : `${p.classes} a month`);

function Bars({ title, items, max }: { title: string; items: Pkg[]; max: number }) {
  const lowest = Math.min(...items.map((i) => i.perClass ?? Infinity));
  return (
    <div>
      <p className="font-script text-[26px] leading-none text-rust">{title}</p>
      <ul className="mt-6 flex flex-col gap-4">
        {items.map((p, i) => (
          <li key={p.id} className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 sm:grid-cols-[7.5rem_1fr_auto] sm:gap-4">
            <span className="font-sans text-[13px] font-light text-ink/80">{barLabel(p)}</span>
            <span className="h-3.5 overflow-hidden rounded-full bg-ink/[0.07]">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: EASE }}
                className="block h-full origin-left rounded-full"
                style={{ width: `${((p.perClass ?? 0) / max) * 100}%`, backgroundColor: p.perClass === lowest ? "#c4a96a" : "#8fa08a" }}
              />
            </span>
            <span className={cn("w-[3.6rem] text-right font-title text-[20px] leading-none sm:text-[22px]", p.perClass === lowest ? "text-rust" : "text-ink")}>{money(p.perClass ?? 0)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* The price of one class in every package, as bars on one shared scale. The lowest in each discipline is gold. */
export function MembershipValue() {
  const fixed = (ids: string[]) => ids.map((id) => packageById(id)!).sort((a, b) => (b.perClass ?? 0) - (a.perClass ?? 0));
  const mat = fixed(["dropin-mat", "pack-mat-5", "pack-mat-10"]);
  const reformer = fixed(["dropin-reformer", "pack-reformer-5", "pack-reformer-10", "monthly-4", "monthly-8", "monthly-12"]);
  const max = Math.max(...[...mat, ...reformer].map((p) => p.perClass ?? 0));
  return (
    <section data-header-theme="light" className="relative w-full overflow-x-clip bg-mint px-6 py-20 text-ink sm:px-10 sm:py-28 md:px-14 lg:px-20 lg:py-36">
      <div className="mx-auto w-full max-w-[1100px]">
        <h2 className="max-w-3xl font-display text-[32px] font-normal leading-[1.15] tracking-normal sm:text-[44px] lg:text-[clamp(40px,3.8vw,56px)]">
          The more you come, the less each class costs.
        </h2>
        <p className="mt-5 max-w-lg font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[16.5px]">
          The price of one class in every package, on one scale. Unlimited is priced by use, so it falls further the more you book.
        </p>
        <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-16">
          <Bars title="Mat" items={mat} max={max} />
          <Bars title="Reformer" items={reformer} max={max} />
        </div>
      </div>
    </section>
  );
}
