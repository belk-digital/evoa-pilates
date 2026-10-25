"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { ClassArt } from "@/components/classes/class-art";
import { PICK_TOPIC_EVENT, TOPIC_PARAM, isTopic, timeSlots, topics, type TopicId } from "@/components/contact/contact-data";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const labelCls = "font-sans text-[12.5px] font-medium tracking-[0.02em] text-ink/75";
const fieldCls =
  "w-full rounded-2xl border border-transparent bg-white/70 px-4 py-3.5 font-sans text-[16px] font-light text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink/40 focus:bg-white aria-[invalid=true]:border-rust/60";

/* The enquiry: choose what it is about on the left, write it on the right. The page is a flat, full-bleed sand band (no
   rounded corners), the same device as the other pages' one band. Frontend only: nothing is sent anywhere, it validates and
   then shows a thank-you. /contact?topic=private (or intro, membership, other) opens with that topic chosen. */
export function ContactSection() {
  const [topicId, setTopicId] = React.useState<TopicId>("intro");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [times, setTimes] = React.useState<string[]>([]);
  const [message, setMessage] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; consent?: string }>({});
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent">("idle");

  const topic = topics.find((t) => t.id === topicId) ?? topics[0];

  // arriving from a button elsewhere on the site with ?topic=... chooses that topic
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const wanted = new URLSearchParams(window.location.search).get(TOPIC_PARAM);
      if (isTopic(wanted)) setTopicId(wanted);
    });
    const onPick = (e: Event) => setTopicId((e as CustomEvent<TopicId>).detail);
    window.addEventListener(PICK_TOPIC_EVENT, onPick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(PICK_TOPIC_EVENT, onPick);
    };
  }, []);

  const toggleTime = (slot: string) => setTimes((cur) => (cur.includes(slot) ? cur.filter((s) => s !== slot) : [...cur, slot]));

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
    setTimes([]);
    setMessage("");
    setConsent(false);
    setErrors({});
    setStatus("idle");
  };

  return (
    <section id="enquire" data-header-theme="light" className="relative w-full scroll-mt-4 bg-mint text-ink">
      <div className="bg-plaster px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-14 lg:grid-cols-12 lg:gap-16">
          {/* what is it about */}
          <div className="lg:col-span-5">
            <h2 className="font-title text-[34px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[44px]">How can we help?</h2>
            <div role="radiogroup" aria-label="What is your message about?" className="mt-7 flex flex-col">
              {topics.map((t) => {
                const on = t.id === topicId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setTopicId(t.id)}
                    className={cn("group relative flex items-center gap-4 border-b border-ink/10 py-4 text-left transition-opacity duration-300 first:border-t", on ? "opacity-100" : "opacity-65 hover:opacity-100")}
                  >
                    {on && <motion.span layoutId="contact-topic-bar" transition={{ type: "spring", stiffness: 420, damping: 32 }} className="absolute -left-4 bottom-3 top-3 w-[3px] rounded-full bg-terracotta sm:-left-6" />}
                    <span className="relative block h-14 w-11 shrink-0 overflow-hidden rounded-b-[7px] rounded-t-full" style={{ backgroundColor: t.panel }}>
                      <ClassArt kind={t.art} animate className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-110" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-title text-[23px] leading-[1.1] tracking-[-0.01em] sm:text-[26px]">{t.title}</span>
                      <span className="mt-1 block font-sans text-[12.5px] font-light leading-snug text-ink/70">{t.text}</span>
                    </span>
                    <span aria-hidden className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-300", on ? "border-forest bg-forest text-bone" : "border-ink/25")}>
                      {on && <Check size={12} strokeWidth={2.6} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* the message */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              {status === "sent" ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="flex min-h-[440px] flex-col items-start justify-center">
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
                    We have your message about {topic.subject}. Expect a reply at {email.trim()} within one working day.
                  </p>
                  <button type="button" onClick={reset} className="mt-7 inline-flex items-center gap-2 font-sans text-[11.5px] font-semibold uppercase tracking-[0.2em] text-rust transition-colors hover:text-spark">
                    Send another message <ArrowUpRight size={14} strokeWidth={2.2} />
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={false} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="flex flex-col gap-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelCls}>Your name</label>
                      <input id="contact-name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? "contact-name-err" : undefined} className={cn(fieldCls, "mt-2")} placeholder="Full name" />
                      {errors.name && <p id="contact-name-err" className="mt-1.5 font-sans text-[12.5px] text-rust">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelCls}>Email</label>
                      <input id="contact-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} aria-describedby={errors.email ? "contact-email-err" : undefined} className={cn(fieldCls, "mt-2")} placeholder="you@example.com" />
                      {errors.email && <p id="contact-email-err" className="mt-1.5 font-sans text-[12.5px] text-rust">{errors.email}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="contact-phone" className={labelCls}>Phone <span className="font-light text-ink/50">(optional)</span></label>
                      <input id="contact-phone" name="phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={cn(fieldCls, "mt-2")} placeholder="For a quick call or text" />
                    </div>
                  </div>

                  {/* only for the topics that need a time */}
                  <AnimatePresence initial={false}>
                    {topic.asksTime && (
                      <motion.fieldset
                        key="times"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <legend className={labelCls}>When suits you?</legend>
                        <div className="mt-3 flex flex-wrap gap-2 pb-1">
                          {timeSlots.map((slot) => {
                            const on = times.includes(slot);
                            return (
                              <button
                                key={slot}
                                type="button"
                                aria-pressed={on}
                                onClick={() => toggleTime(slot)}
                                className={cn(
                                  "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 font-sans text-[12.5px] font-normal tracking-[0.02em] transition-colors duration-300",
                                  on ? "border-forest bg-forest text-bone" : "border-ink/20 bg-white/50 text-ink/80 hover:border-ink/40 hover:bg-white"
                                )}
                              >
                                {on && <Check size={12} strokeWidth={2.6} />}
                                {slot}
                              </button>
                            );
                          })}
                        </div>
                      </motion.fieldset>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor="contact-message" className={labelCls}>Your message <span className="font-light text-ink/50">(optional)</span></label>
                    <textarea id="contact-message" name="message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={cn(fieldCls, "mt-2 resize-none")} placeholder={topic.placeholder} />
                  </div>

                  <div>
                    <label className="flex cursor-pointer items-start gap-3 font-sans text-[13px] font-light leading-snug text-ink/80">
                      <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="peer sr-only" />
                      <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-ink/35 text-transparent transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-ink/40">
                        <Check size={12} strokeWidth={2.6} />
                      </span>
                      <span>
                        I agree that Evoa may contact me about this message. See the{" "}
                        <Link href="/privacy-policy" className="underline decoration-ink/30 underline-offset-2 hover:decoration-ink">Privacy Policy</Link>.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1.5 font-sans text-[12.5px] text-rust">{errors.consent}</p>}
                  </div>

                  <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
                    <button type="submit" disabled={status === "sending"} className="group inline-flex w-full items-center justify-between gap-8 rounded-full bg-ink py-2.5 pl-7 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity disabled:opacity-70 sm:w-auto sm:min-w-[300px]">
                      <span>{status === "sending" ? "Sending" : topic.cta}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
                        <ArrowUpRight size={14} strokeWidth={2.2} />
                      </span>
                    </button>
                    <p className="font-script text-[20px] leading-none text-rust">we reply within one working day</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
