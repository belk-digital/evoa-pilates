"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { ArtSvg, P } from "@/components/classes/class-art";
import { PICK_PLAN_EVENT, plans, type PlanId } from "@/components/membership/membership-data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PlanChoice = PlanId | "unsure";
type Experience = "new" | "some" | "regular";

/* The plan tiles: the same one, two or three nested arches as the plan cards above, with its price. "Not sure" is a dotted arch. */
const planChoices: { id: PlanChoice; label: string; sub: string; rings: 0 | 1 | 2 | 3 }[] = [
  ...plans.map((p) => ({ id: p.id as PlanChoice, label: p.name, sub: `$${p.monthly} a month`, rings: p.rings as 0 | 1 | 2 | 3 })),
  { id: "unsure", label: "Not sure", sub: "We will help you choose", rings: 0 },
];
const experiences: { id: Experience; label: string }[] = [
  { id: "new", label: "New to Pilates" },
  { id: "some", label: "Some experience" },
  { id: "regular", label: "I practise often" },
];

const nextSteps = [
  { title: "We reply", text: "Within one working day, with times for your intro session." },
  { title: "You visit", text: "A complimentary class of eight, and a walk through the rooms." },
  { title: "You decide", text: "Choose a plan only if it feels right, and change it whenever you need." },
];

const labelCls = "font-sans text-[12.5px] font-medium tracking-[0.02em] text-ink/75";
const fieldCls =
  "w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3.5 font-sans text-[16px] font-light text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink/40 focus:bg-white aria-[invalid=true]:border-rust/60";

/* Nested arches rising from a ground line: one, two or three, innermost in gold. Zero draws a single dotted arch. */
function Rings({ rings }: { rings: 0 | 1 | 2 | 3 }) {
  const radii = rings === 0 ? [19] : [10, 19, 28].slice(0, rings);
  return (
    <ArtSvg viewBox="0 0 64 36" animate stagger={0.18} className="h-10 w-[72px]">
      <P fx="draw" d="M2 34.5H62" stroke="currentColor" strokeOpacity="0.28" />
      {[...radii].reverse().map((r) => {
        const inner = rings > 0 && r === 10;
        return (
          <P
            key={r}
            fx="draw"
            d={`M${32 - r} 34.5A${r} ${r} 0 0 1 ${32 + r} 34.5`}
            stroke={inner ? "#c4a96a" : "currentColor"}
            strokeOpacity={inner ? 1 : 0.55}
            strokeWidth={inner ? 2.2 : 1.4}
            strokeDasharray={rings === 0 ? "2 3.5" : undefined}
            strokeLinecap="round"
          />
        );
      })}
    </ArtSvg>
  );
}

/* The request form. Frontend only: nothing is sent anywhere, it validates and then shows a thank-you. */
function RequestForm() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [plan, setPlan] = React.useState<PlanChoice>("residence");
  const [experience, setExperience] = React.useState<Experience | null>(null);
  const [note, setNote] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; consent?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");

  // the plan buttons higher up choose a plan here
  React.useEffect(() => {
    const onPick = (e: Event) => setPlan((e as CustomEvent<PlanId>).detail);
    window.addEventListener(PICK_PLAN_EVENT, onPick);
    // /pricing?plan=residence (from a plan button on the homepage) opens with that plan chosen
    const raf = requestAnimationFrame(() => {
      const wanted = new URLSearchParams(window.location.search).get("plan");
      const match = planChoices.find((p) => p.id === wanted);
      if (match) setPlan(match.id);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(PICK_PLAN_EVENT, onPick);
    };
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Please enter a valid email address.";
    if (!consent) next.consent = "Please confirm that we may contact you.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setNote("");
    setExperience(null);
    setConsent(false);
    setErrors({});
    setStatus("idle");
  };

  const planLabel = planChoices.find((p) => p.id === plan)?.label ?? "";

  return (
    <div className="relative">
      {/* two small arches standing behind the sheet, peeking over its top edge */}
      <span aria-hidden className="absolute -top-9 left-10 h-16 w-12 rounded-t-full bg-terracotta sm:left-14" />
      <span aria-hidden className="absolute -top-5 left-[5.6rem] h-12 w-9 rounded-t-full bg-sage sm:left-[7.2rem]" />

      <div className="relative rounded-[32px] bg-plaster p-6 text-ink sm:rounded-[40px] sm:p-9">
        <AnimatePresence mode="wait" initial={false}>
          {status === "sent" ? (
            <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex min-h-[460px] flex-col items-start justify-center">
              <span className="relative flex h-28 w-[88px] items-end justify-center overflow-hidden rounded-t-full bg-terracotta">
                <span className="absolute inset-x-[22%] bottom-0 top-[26%] rounded-t-full bg-plaster/60" />
                <span className="relative mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-forest text-bone">
                  <Check size={20} strokeWidth={2.2} />
                </span>
              </span>
              <h3 className="mt-7 font-display text-[40px] font-light leading-[1.05] tracking-normal sm:text-[48px]">
                Thank you, {name.trim().split(" ")[0]}
                <span className="text-spark">.</span>
              </h3>
              <p className="mt-4 max-w-md font-sans text-[15px] font-light leading-relaxed text-ink-muted">
                We have your request{plan !== "unsure" ? ` for ${planLabel}` : ""}. Expect a reply at {email.trim()} within one working day, with times to come in for your complimentary intro session.
              </p>
              <button type="button" onClick={reset} className="mt-7 inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
                Send another request <ArrowUpRight size={14} strokeWidth={2.2} />
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" initial={false} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="flex flex-col gap-7">
              {/* 1: who you are */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="req-name" className={labelCls}>Your name</label>
                  <input id="req-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "req-name-err" : undefined} className={cn(fieldCls, "mt-2")} placeholder="Full name" />
                  {errors.name && <p id="req-name-err" className="mt-1.5 font-sans text-[12.5px] text-rust">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="req-email" className={labelCls}>Email</label>
                  <input id="req-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "req-email-err" : undefined} className={cn(fieldCls, "mt-2")} placeholder="you@example.com" />
                  {errors.email && <p id="req-email-err" className="mt-1.5 font-sans text-[12.5px] text-rust">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="req-phone" className={labelCls}>Phone <span className="font-light text-ink/50">(optional)</span></label>
                  <input id="req-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={cn(fieldCls, "mt-2")} placeholder="For a quick call or text" />
                </div>
              </div>

              {/* 2: which plan, as four small doorways */}
              <fieldset>
                <legend className={labelCls}>Which plan interests you?</legend>
                <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {planChoices.map((p) => {
                    const on = plan === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setPlan(p.id)}
                        className={cn(
                          "relative flex flex-col items-center rounded-[22px] border px-2.5 pb-3.5 pt-4 text-center transition-colors duration-300",
                          on ? "border-forest bg-forest text-bone" : "border-ink/10 bg-white/55 text-ink hover:border-ink/30 hover:bg-white"
                        )}
                      >
                        <Rings rings={p.rings} />
                        <span className="mt-2.5 font-title text-[21px] leading-none">{p.label}</span>
                        <span className={cn("mt-1.5 font-sans text-[11.5px] font-light leading-snug", on ? "text-white/65" : "text-ink/60")}>{p.sub}</span>
                        {on && (
                          <motion.span
                            aria-hidden
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 420, damping: 16 }}
                            className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-spark-bright text-forest"
                          >
                            <Check size={11} strokeWidth={2.8} />
                          </motion.span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* 3: experience, a sliding choice like the billing switch */}
              <fieldset>
                <legend className={labelCls}>Your experience</legend>
                <div className="mt-3 flex w-full flex-col gap-1 rounded-[26px] bg-ink/[0.06] p-1 sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:rounded-full">
                  {experiences.map((x) => {
                    const on = experience === x.id;
                    return (
                      <button
                        key={x.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setExperience(x.id)}
                        className={cn("relative rounded-full px-4 py-2.5 text-center font-sans text-[12.5px] font-normal tracking-[0.02em] transition-colors duration-300", on ? "text-bone" : "text-ink/75 hover:text-ink")}
                      >
                        {on && (
                          <motion.span layoutId="request-experience-pill" transition={{ type: "spring", stiffness: 480, damping: 22, mass: 0.9 }} className="absolute inset-0 rounded-full bg-forest" />
                        )}
                        <span className="relative z-10">{x.label}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label htmlFor="req-note" className={labelCls}>Anything we should know? <span className="font-light text-ink/50">(optional)</span></label>
                <textarea id="req-note" name="note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={cn(fieldCls, "mt-2 resize-none")} placeholder="Injuries, pregnancy, goals, or a question" />
              </div>

              <div>
                <label className="flex cursor-pointer items-start gap-3 font-sans text-[13px] font-light leading-snug text-ink/80">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="peer sr-only" />
                  <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-ink/35 text-transparent transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ink/40">
                    <Check size={12} strokeWidth={2.6} />
                  </span>
                  <span>
                    I agree that Evoa may contact me about this request. See the{" "}
                    <Link href="/privacy-policy" className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">Privacy Policy</Link>.
                  </span>
                </label>
                {errors.consent && <p className="mt-1.5 font-sans text-[12.5px] text-rust">{errors.consent}</p>}
              </div>

              <div>
                <button type="submit" disabled={status === "sending"} className="group inline-flex w-full items-center justify-between rounded-full bg-ink py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity disabled:opacity-70">
                  <span>{status === "sending" ? "Sending" : "Request membership"}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
                    <ArrowUpRight size={14} strokeWidth={2.2} />
                  </span>
                </button>
                <p className="mt-3 text-center font-script text-[19px] leading-none text-rust">nothing is charged today</p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* The request panel: deep olive, with a gold sun at the corner, soft rings behind the heading, and a short account of what
   happens next. The cream sheet carries the form, with two little arches standing behind it. */
export function MembershipRequest() {
  return (
    <section id="request" data-header-theme="dark" className="relative w-full scroll-mt-4 bg-mint px-3 pb-3 sm:px-6 lg:px-10">
      <div className="relative isolate overflow-hidden rounded-[36px] bg-forest px-6 py-16 text-bone sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-24">
        {/* sun, top right */}
        <motion.div aria-hidden="true" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }} className="pointer-events-none absolute -right-12 -top-12 -z-10 h-[120px] w-[120px] rounded-full bg-peach sm:-right-14 sm:-top-14 sm:h-[170px] sm:w-[170px] lg:-right-20 lg:-top-20 lg:h-[300px] lg:w-[300px]" />
        {/* soft rings behind the heading, mostly off the left edge */}
        <span aria-hidden className="pointer-events-none absolute -left-44 top-[8%] -z-10 hidden h-[560px] w-[560px] rounded-full border border-white/[0.07] lg:block" />
        <span aria-hidden className="pointer-events-none absolute -left-24 top-[8%] -z-10 mt-[80px] hidden h-[400px] w-[400px] rounded-full border border-white/[0.07] lg:block" />
        {/* a gold quarter, bottom left */}
        <motion.div aria-hidden="true" initial={{ x: -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4, ease: EASE }} className="pointer-events-none absolute -bottom-14 -left-14 -z-10 h-[120px] w-[120px] rounded-full bg-terracotta sm:-bottom-16 sm:-left-16 sm:h-[160px] sm:w-[160px]" />

        <div className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[42px] font-light leading-[1.06] tracking-normal text-bone sm:text-[56px] lg:text-[clamp(48px,4.8vw,76px)]">
              Let us know you are coming
            </h2>
            <p className="mt-6 max-w-md font-sans text-[15px] font-light leading-relaxed text-white/70 sm:text-[16.5px]">
              A few details and we will be in touch. There is nothing to pay yet, and no obligation to join.
            </p>

            {/* what happens next, down a thin line */}
            <ol className="relative mt-10 flex flex-col gap-7 sm:mt-12">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  {/* joins this circle to the next one, so nothing runs on past the last step */}
                  {i < nextSteps.length - 1 && <span aria-hidden className="absolute -bottom-6 left-4 top-9 w-px -translate-x-1/2 bg-white/15" />}
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 + i * 0.12 }}
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-spark-bright/70 bg-forest font-title text-[17px] leading-none text-spark-bright"
                  >
                    {i + 1}
                  </motion.span>
                  <div>
                    <p className="font-title text-[23px] font-normal leading-none text-bone">{step.title}</p>
                    <p className="mt-2 max-w-xs font-sans text-[13.5px] font-light leading-relaxed text-white/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-7">
            <RequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
