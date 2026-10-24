"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Reveal, wipeProps } from "@/components/ui/reveal";
import { SparkText } from "@/components/ui/spark-text";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

/* A quiet, readable long-form page: cream panel on the sage canvas (same as Classes and the footer card),
   a sticky contents list on large screens that follows your place, numbered sections in Cormorant. */
export function LegalPage({
  title,
  noun,
  updated,
  intro,
  sections,
  other,
}: {
  /** page heading, e.g. "Privacy Policy." (the full stop turns gold) */
  title: string;
  /** used in the closing line, e.g. "this policy" */
  noun: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
  other: { label: string; href: string };
}) {
  const [active, setActive] = React.useState(sections[0]?.id ?? "");
  const tocRef = React.useRef<HTMLDetailsElement>(null);

  // follow the section that is crossing the upper part of the screen
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-legal-id]"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-legal-id") ?? "");
        });
      },
      { rootMargin: "-22% 0px -68% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      data-header-theme="light"
      className="relative w-full bg-mint px-3 pb-10 pt-24 text-ink sm:px-6 sm:pt-28 lg:px-10 lg:pb-20 lg:pt-32"
    >
      <div className="w-full rounded-[36px] bg-plaster px-6 py-14 shadow-[0_30px_70px_rgba(35,43,27,0.08)] sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px]">
        <header className="max-w-3xl">
          <Reveal>
            <div className="flex items-center gap-2.5 font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-ink-muted sm:text-[12.5px]">
              <span className="h-px w-5 bg-terracotta" />
              <span>Legal</span>
            </div>
          </Reveal>

          <motion.h1
            {...wipeProps}
            className="mt-5 font-serif text-[46px] font-light leading-[1.05] tracking-normal sm:text-[66px] lg:text-[84px]"
          >
            <SparkText>{title}</SparkText>
          </motion.h1>

          <Reveal delay={0.15}>
            <p className="mt-6 font-sans text-[12px] font-normal uppercase tracking-[0.2em] text-ink/55">
              Last updated {updated}
            </p>
            <p className="mt-6 max-w-2xl font-sans text-[15.5px] font-light leading-[1.8] text-ink/75 sm:text-[16.5px]">
              {intro}
            </p>
          </Reveal>
        </header>

        <details ref={tocRef} className="group mt-10 rounded-2xl bg-cream lg:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 font-sans text-[12px] font-medium uppercase tracking-[0.2em] text-ink/70 [&::-webkit-details-marker]:hidden">
            On this page
            <ChevronDown size={18} strokeWidth={1.5} className="transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <ol className="px-5 pb-4" onClick={() => tocRef.current?.removeAttribute("open")}>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-baseline gap-3 border-t border-ink/10 py-3 font-sans text-[14px] leading-snug text-ink/75 transition-colors hover:text-ink"
                >
                  <span className="w-6 shrink-0 text-[11px] tracking-[0.12em] text-spark">{String(i + 1).padStart(2, "0")}</span>
                  <span>{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </details>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Contents: follows your place on large screens */}
          <aside className="hidden lg:col-span-4 lg:block">
            <nav
              aria-label="On this page"
              data-lenis-prevent
              className="hide-scrollbar sticky top-28 max-h-[calc(100dvh-9rem)] overflow-y-auto border-l border-ink/10 pl-6"
            >
              <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-ink/50">On this page</p>
              <ol className="flex flex-col">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={cn(
                        "flex items-baseline gap-3 py-1.5 font-sans text-[13px] leading-snug transition-colors",
                        active === s.id ? "text-ink" : "text-ink/50 hover:text-ink/80"
                      )}
                    >
                      <span
                        className={cn(
                          "w-5 shrink-0 text-[11px] tracking-[0.12em] transition-colors",
                          active === s.id ? "text-spark" : "text-ink/35"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="lg:col-span-8">
            {sections.map((s, i) => (
              <motion.section
                key={s.id}
                data-legal-id={s.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative border-t border-ink/10 py-10 first:border-t-0 first:pt-0 sm:py-12 sm:first:pt-0"
              >
                {/* anchor sits above the heading so jumps clear the fixed header */}
                <span id={s.id} aria-hidden="true" className="absolute -top-28" />
                <div className="flex items-baseline gap-4 sm:gap-5">
                  <span className="shrink-0 font-sans text-[12px] tracking-[0.2em] text-spark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-serif text-[30px] font-normal leading-[1.1] tracking-[-0.01em] sm:text-[38px]">
                    {s.title}
                  </h2>
                </div>
                <div className="legal-body mt-5 sm:ml-[2.6rem]">{s.content}</div>
              </motion.section>
            ))}

            <div className="mt-14 flex flex-col gap-6 rounded-[28px] bg-cream p-7 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-9">
              <div>
                <p className="font-serif text-[28px] font-normal leading-[1.1] sm:text-[32px]">Questions about {noun}?</p>
                <p className="mt-2 font-sans text-[14px] font-light leading-relaxed text-ink/70">
                  Write to{" "}
                  <a href={`mailto:${siteConfig.email}`} className="text-rust underline underline-offset-4 hover:text-spark">
                    {siteConfig.email}
                  </a>{" "}
                  and a person will reply.
                </p>
              </div>
              <Link
                href={other.href}
                className="group inline-flex shrink-0 items-center gap-4 self-start rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white sm:self-auto"
              >
                <span>{other.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
                  <ArrowUpRight size={14} strokeWidth={2.2} />
                </span>
              </Link>
            </div>
          </article>
        </div>
        </div>
      </div>
    </section>
  );
}
