"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { MarginNote } from "@/components/ui/margin-note";
import { ArtSvg, P } from "@/components/classes/class-art";
import { compareRows, includedEverywhere, plans, requestPlan, type Cell, type Plan } from "@/components/membership/membership-data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const money = (n: number) => n.toLocaleString("en-US");

/* One, two or three nested arches rising from a ground line: the plan's level. The innermost is gold. */
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

/* Each plan is a doorway. They share one width and rise by a step as the plans go up, so the row reads as a skyline (the
   same idea as the progression on the Classes page). Everything is bottom-aligned, so the buttons and lists line up across
   the three even though the tops do not. Residence is deep olive, Atelier brushed gold. */
const cardTone: Record<Plan["id"], string> = {
  access: "bg-plaster text-ink",
  residence: "bg-forest text-bone",
  atelier: "bg-peach text-ink",
};

function PlanCard({ plan, yearly, index, href }: { plan: Plan; yearly: boolean; index: number; href?: string }) {
  const price = yearly ? plan.yearly : plan.monthly;
  const dark = plan.featured;
  const gold = plan.id === "atelier";
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      className="relative w-[82vw] max-w-[380px] shrink-0 snap-start sm:w-[46vw] lg:w-auto lg:max-w-none"
    >
      {index === 0 && (
        <span className="absolute -top-[116px] left-[20%] hidden lg:block">
          <MarginNote curl="down" tilt={-4}>
            start small, change anytime
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
        className={cn("flex flex-col rounded-b-[32px] rounded-t-[999px] px-7 pb-8 sm:px-8 lg:px-9", cardTone[plan.id])}
      >
        <div className="flex justify-center">
          <Emblem rings={plan.rings} dark={dark} />
        </div>

        <h3 className="mt-5 text-center font-display text-[44px] font-light leading-none tracking-normal sm:text-[52px]">{plan.name}</h3>
        <div className="mt-3 flex min-h-[1.75rem] justify-center">
          {plan.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-bone">
              <span className="h-1.5 w-1.5 rounded-full bg-spark-bright" />
              Most chosen
            </span>
          )}
        </div>
        <p className={cn("mx-auto mt-2 min-h-[3.2em] max-w-[19rem] text-center font-sans text-[14.5px] font-light leading-relaxed", dark ? "text-white/70" : "text-ink/70")}>{plan.line}</p>

        <div className="mt-7 flex items-end justify-center gap-2">
          <span className="pb-1.5 font-display text-[30px] font-light leading-none">$</span>
          <span className="relative inline-flex font-display text-[72px] font-light leading-[0.9] tracking-normal sm:text-[80px]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={price}
                initial={{ y: "55%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-55%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className="inline-block"
              >
                {price}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className={cn("pb-2 font-sans text-[11px] font-medium uppercase leading-[1.3] tracking-[0.18em]", dark ? "text-white/60" : "text-ink/60")}>
            a<br />month
          </span>
        </div>
        <p className={cn("mt-2 text-center font-sans text-[12.5px] font-light", dark ? "text-white/60" : "text-ink/65")}>
          {yearly ? `Billed yearly, $${money(plan.yearly * 12)} a year` : "Billed monthly, cancel with 30 days notice"}
        </p>

        {(() => {
          const cls = cn(
            "group mt-7 inline-flex w-full items-center justify-between rounded-full py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em]",
            dark ? "bg-white text-ink" : "bg-ink text-white"
          );
          const inner = (
            <>
              <span>{plan.cta}</span>
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-500 group-hover:bg-spark group-hover:text-white",
                  dark ? "bg-ink text-white" : "bg-white text-ink"
                )}
              >
                <ArrowUpRight size={14} strokeWidth={2.2} />
              </span>
            </>
          );
          return href ? (
            <Link href={href} className={cls}>
              {inner}
            </Link>
          ) : (
            <button type="button" onClick={() => requestPlan(plan.id)} className={cls}>
              {inner}
            </button>
          );
        })()}

        <div className={cn("mt-8 border-t pt-6", dark ? "border-white/10" : gold ? "border-ink/15" : "border-ink/10")}>
          <p className={cn("font-script text-[22px] leading-none", dark ? "text-spark-bright" : "text-rust")}>Best for</p>
          <p className="mt-2 font-title text-[22px] font-normal leading-[1.15]">{plan.best}</p>
          <ul className="mt-5 flex flex-col gap-3">
            {plan.perks.map((perk) => (
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

/* On the Membership page the plan buttons choose a plan in the request form further down. With `toMembershipPage` (the homepage)
   they link to that page instead, with the plan already chosen, and a link below the cards leads to the full comparison. */
export function MembershipPlans({ toMembershipPage = false }: { toMembershipPage?: boolean }) {
  const [yearly, setYearly] = React.useState(false);

  return (
    <section id="plans" data-header-theme="light" className="relative w-full scroll-mt-4 overflow-x-clip bg-mint pb-16 text-ink lg:pb-24">
      <div className="flex w-full flex-col justify-between gap-6 px-6 pb-10 sm:px-10 sm:pb-14 md:px-14 lg:flex-row lg:items-end lg:px-20">
        <h2 className="font-display text-[40px] font-light leading-[1.1] tracking-normal sm:text-[54px] lg:text-[68px]">Choose your plan</h2>

        {/* billing: the white pill springs between the options */}
        <div className="flex flex-col items-start gap-2 lg:items-end">
          <div className="inline-flex select-none items-center rounded-full border border-sage bg-mint-deep p-1">
            {([
              [false, "Pay monthly"],
              [true, "Pay yearly"],
            ] as const).map(([value, label]) => (
              <button
                key={label}
                type="button"
                aria-pressed={yearly === value}
                onClick={() => setYearly(value)}
                className={cn("relative rounded-full px-5 py-2 font-sans text-[12px] font-medium transition-colors duration-300", yearly === value ? "text-ink" : "text-deep-green hover:text-ink")}
              >
                {yearly === value && (
                  <motion.span layoutId="membership-billing-pill" transition={{ type: "spring", stiffness: 520, damping: 17, mass: 0.9 }} className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(35,43,27,0.12)]" />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>
          <p className="font-sans text-[12px] font-light text-ink/65">Pay yearly and save around 15%.</p>
        </div>
      </div>

      <div className="hide-scrollbar flex w-full snap-x snap-mandatory scroll-pl-3 items-end gap-3 overflow-x-auto overflow-y-hidden px-3 pt-4 [--lift-step:30px] sm:scroll-pl-6 sm:gap-4 sm:px-6 sm:[--lift-step:44px] lg:grid lg:snap-none lg:grid-cols-3 lg:items-end lg:gap-5 lg:overflow-visible lg:px-10 lg:pt-32 lg:[--lift-step:64px]">
        {plans.map((plan, i) => (
          <PlanCard key={plan.id} plan={plan} yearly={yearly} index={i} href={toMembershipPage ? `/pricing?plan=${plan.id}#request` : undefined} />
        ))}
      </div>

      {toMembershipPage && (
        <div className="mt-12 flex justify-center px-6">
          <Link href="/pricing#plans" className="group inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
            Compare the plans side by side <ArrowUpRight size={14} strokeWidth={2.2} />
          </Link>
        </div>
      )}
    </section>
  );
}

/* ---------------- compare ---------------- */

const capsuleV = { hidden: { scaleY: 0, opacity: 0 }, show: { scaleY: 1, opacity: 1, transition: { duration: 1.1, ease: EASE } } };
const popV = {
  hidden: { scale: 0, opacity: 0 },
  show: (i: number) => ({ scale: 1, opacity: 1, transition: { type: "spring" as const, stiffness: 300, damping: 16, delay: 0.7 + i * 0.05 } }),
};
const textV = { hidden: { opacity: 0 }, show: (i: number) => ({ opacity: 1, transition: { duration: 0.6, delay: 0.6 + i * 0.05 } }) };

/* One value: a filled gold dot with a tick, a soft empty ring, or the words. On the dark column the colours flip. */
function Mark({ value, dark, i }: { value: Cell; dark: boolean; i: number }) {
  if (value === true) {
    return (
      <motion.span variants={popV} custom={i} className={cn("flex h-7 w-7 items-center justify-center rounded-full text-forest", dark ? "bg-spark-bright" : "bg-terracotta")}>
        <Check size={14} strokeWidth={2.6} />
        <span className="sr-only">Included</span>
      </motion.span>
    );
  }
  if (value === false) {
    return (
      <span className="flex h-7 items-center justify-center">
        <span aria-hidden className={cn("h-2 w-2 rounded-full border", dark ? "border-white/30" : "border-ink/30")} />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return (
    <motion.span variants={textV} custom={i} className={cn("font-sans text-[14px] font-normal", dark ? "text-bone" : "text-ink")}>
      {value}
    </motion.span>
  );
}

/* The comparison. The three things every plan includes sit in a strip above, so the table shows only what changes. On wide
   screens Residence stands as a tall dark arch with the other two beside it; on phones each row stacks and the three
   values sit side by side under the feature, Residence's on a dark pill. */
export function MembershipCompare() {
  const n = compareRows.length;
  return (
    <section data-header-theme="light" className="relative w-full bg-mint text-ink">
      {/* a flat, full-bleed band: no rounded corners, so it reads differently from the panels on the other pages */}
      <div className="bg-plaster px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto w-full max-w-[1100px]">
          <h2 className="font-title text-[36px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[46px]">Side by side</h2>

          {/* in every plan */}
          <div className="mt-8 flex flex-col gap-4 border-y border-ink/10 py-5 sm:mt-10 lg:flex-row lg:items-center lg:gap-8">
            <p className="font-script text-[22px] leading-none text-rust">In every plan</p>
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {includedEverywhere.map((item) => (
                <li key={item} className="flex items-center gap-2.5 font-sans text-[14px] font-light text-ink/85">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-terracotta text-forest">
                    <Check size={11} strokeWidth={2.6} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* wide screens: a grid where the Residence column is a dark arch */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="relative mt-10 hidden md:grid md:grid-cols-[1.5fr_1fr_1.2fr_1fr]"
            style={{ gridTemplateRows: `170px repeat(${n}, minmax(60px, auto)) 100px` }}
          >
            <motion.div
              aria-hidden
              variants={capsuleV}
              style={{ gridColumn: 3, gridRow: `1 / span ${n + 2}`, transformOrigin: "50% 100%" }}
              className="rounded-b-[36px] rounded-t-[999px] bg-forest"
            />

            {/* heads */}
            <div style={{ gridColumn: 1, gridRow: 1 }} />
            {plans.map((p, c) => (
              <div key={p.id} style={{ gridColumn: c + 2, gridRow: 1 }} className={cn("relative z-10 flex flex-col items-center justify-end gap-2 px-4 pb-6 text-center", p.featured ? "text-bone" : "text-ink")}>
                {p.featured && (
                  <span className="rounded-full bg-white/10 px-3 py-1 font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] text-bone">Most chosen</span>
                )}
                <span className="font-title text-[30px] font-normal leading-none tracking-[-0.01em]">{p.name}</span>
                <span className={cn("font-sans text-[12.5px] font-light", p.featured ? "text-white/60" : "text-ink/60")}>${p.monthly} a month</span>
              </div>
            ))}

            {/* rows */}
            {compareRows.map((row, r) => (
              <React.Fragment key={row.label}>
                <div style={{ gridColumn: 1, gridRow: r + 2 }} className="flex items-center border-t border-ink/10 py-4 pr-4 font-sans text-[14.5px] font-normal text-ink">
                  {row.label}
                </div>
                {row.values.map((value, c) => (
                  <div
                    key={plans[c].id}
                    style={{ gridColumn: c + 2, gridRow: r + 2 }}
                    className={cn("relative z-10 flex items-center justify-center px-4 py-4", plans[c].featured ? "border-t border-white/10" : "border-t border-ink/10")}
                  >
                    <Mark value={value} dark={plans[c].featured} i={r * 3 + c} />
                  </div>
                ))}
              </React.Fragment>
            ))}

            {/* choose */}
            <div style={{ gridColumn: 1, gridRow: n + 2 }} className="border-t border-ink/10" />
            {plans.map((p, c) => (
              <div key={p.id} style={{ gridColumn: c + 2, gridRow: n + 2 }} className={cn("relative z-10 flex items-center justify-center px-4", p.featured ? "border-t border-white/10" : "border-t border-ink/10")}>
                <button
                  type="button"
                  onClick={() => requestPlan(p.id)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-5 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-300",
                    p.featured ? "bg-white text-ink hover:bg-spark-bright" : "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white"
                  )}
                >
                  Choose<span className="hidden lg:inline">&nbsp;{p.name}</span>
                </button>
              </div>
            ))}
          </motion.div>

          {/* phones: each row stacks, the three values side by side, Residence on a dark pill */}
          <div className="mt-8 md:hidden">
            {compareRows.map((row) => (
              <div key={row.label} className="border-t border-ink/10 py-4 last:border-b">
                <p className="font-sans text-[14.5px] font-normal text-ink">{row.label}</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {row.values.map((value, c) => (
                    <div key={plans[c].id} className={cn("flex min-h-[64px] flex-col items-center justify-center gap-1.5 rounded-2xl px-2 py-3 text-center", plans[c].featured ? "bg-forest" : "bg-ink/[0.04]")}>
                      <span className={cn("font-sans text-[9.5px] font-medium uppercase tracking-[0.16em]", plans[c].featured ? "text-white/55" : "text-ink/50")}>{plans[c].name}</span>
                      {value === true ? (
                        <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-forest", plans[c].featured ? "bg-spark-bright" : "bg-terracotta")}>
                          <Check size={13} strokeWidth={2.6} />
                          <span className="sr-only">Included</span>
                        </span>
                      ) : value === false ? (
                        <span className="flex h-6 items-center">
                          <span aria-hidden className={cn("h-2 w-2 rounded-full border", plans[c].featured ? "border-white/30" : "border-ink/30")} />
                          <span className="sr-only">Not included</span>
                        </span>
                      ) : (
                        <span className={cn("font-sans text-[13px] font-normal", plans[c].featured ? "text-bone" : "text-ink")}>{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
