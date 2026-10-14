"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [{ label: "Home", href: "/" }, ...siteConfig.nav];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [isLightSection, setIsLightSection] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuHover, setMenuHover] = React.useState<string | null>(null);
  // The full-screen menu is always dark, so the logo and burger turn light while it is open
  const onLight = isLightSection && !menuOpen;

  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1280) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  React.useEffect(() => {
    let ticking = false;

    const detectIsLightSection = (): boolean => {
      // 1. Direct visual check using document.elementsFromPoint underneath the header bar
      if (typeof document !== "undefined" && typeof document.elementsFromPoint === "function") {
        const yCheck = 60;
        const testPoints = [
          { x: window.innerWidth / 2, y: yCheck },
          { x: Math.min(140, window.innerWidth - 30), y: yCheck },
          { x: Math.max(30, window.innerWidth - 140), y: yCheck },
        ];

        for (const pt of testPoints) {
          const elements = document.elementsFromPoint(pt.x, pt.y);
          for (const el of elements) {
            if (el.closest("header")) continue;
            const themedParent = el.closest<HTMLElement>("[data-header-theme]");
            if (themedParent) {
              const theme = themedParent.getAttribute("data-header-theme");
              if (theme === "light") return true;
              if (theme === "dark") return false;
            }
          }
        }
      }

      // 2. High-precision boundary check covering the entire header vertical span (0 to 95px)
      const sections = document.querySelectorAll<HTMLElement>("section[data-header-theme], footer[data-header-theme]");
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        // Section is touching or passing behind the header
        if (rect.top <= 95 && rect.bottom >= 30) {
          const theme = section.getAttribute("data-header-theme");
          if (theme === "light") return true;
          if (theme === "dark") return false;
        }
      }

      // Default fallback: if at page top on homepage, Hero is dark; otherwise light
      if (window.scrollY < 40) return false;
      return true;
    };

    const updateHeader = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isLight = detectIsLightSection();
          setIsLightSection((prev) => (prev !== isLight ? isLight : prev));
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader, { passive: true });
    window.addEventListener("lenis-scroll", updateHeader, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
      window.removeEventListener("lenis-scroll", updateHeader);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-[var(--ease-out-quart)]",
        scrolled ? "py-3 md:py-4" : "py-4 md:py-6"
      )}
    >
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex flex-col leading-none select-none hover:opacity-85 transition-opacity w-fit"
          >
            <span
              className={cn(
                "font-sans font-light tracking-[0.25em] text-[19px] md:text-[23px] uppercase transition-colors duration-300",
                onLight ? "text-ink" : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              )}
            >
              EVOA
            </span>
            <div
              className={cn(
                "flex justify-between w-full text-[8px] md:text-[9.5px] font-sans font-light uppercase mt-1 transition-colors duration-300",
                onLight
                  ? "text-rust"
                  : "text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              )}
            >
              {["P", "I", "L", "A", "T", "E", "S"].map((letter, i) => (
                <span key={i}>{letter}</span>
              ))}
            </div>
          </Link>

          <nav
            className={cn(
              "hidden xl:flex items-center gap-8 lg:gap-12 rounded-full px-10 lg:px-14 py-3.5 md:py-4 transition-all duration-300 backdrop-blur-md",
              isLightSection
                ? "bg-white/85 border border-ink/10 shadow-[0_8px_30px_rgba(36,26,20,0.08)]"
                : "bg-white/[0.08] border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
            )}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[12px] lg:text-[13px] font-medium tracking-[0.22em] uppercase transition-colors duration-200 after:absolute after:left-1/2 after:-bottom-2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:transition-transform after:duration-300",
                  isLightSection ? "after:bg-spark" : "after:bg-spark-bright",
                  pathname === item.href ? "after:scale-100" : "after:scale-0 hover:after:scale-100",
                  pathname === item.href
                    ? isLightSection
                      ? "text-rust"
                      : "text-peach"
                    : isLightSection
                      ? "text-ink/90 hover:text-rust"
                      : "text-white/95 hover:text-peach"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email us"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                isLightSection
                  ? "bg-white/85 border border-ink/10 text-ink shadow-[0_8px_30px_rgba(36,26,20,0.08)] hover:bg-white hover:text-rust"
                  : "bg-white/[0.08] border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/40 hover:text-peach"
              )}
            >
              <Mail size={17} strokeWidth={1.8} />
            </a>
            <Link
              href="/pricing"
              className={cn(
                "group relative inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-[11px] lg:text-[11.5px] font-semibold tracking-[0.2em] uppercase transition-shadow duration-300 select-none",
                isLightSection
                  ? "bg-ink text-white shadow-[0_4px_16px_rgba(36,26,20,0.14)] hover:shadow-[0_8px_24px_rgba(36,26,20,0.25)]"
                  : "bg-white text-ink shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.4)]"
              )}
            >
              {/* Luxury Rolling Text Track */}
              <div className="relative overflow-hidden h-[16px]">
                <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                  <span className="h-[16px] flex items-center">
                    Request Membership
                  </span>
                  <span
                    className={cn(
                      "h-[16px] flex items-center font-semibold",
                      isLightSection ? "text-peach" : "text-rust"
                    )}
                  >
                    Request Membership
                  </span>
                </div>
              </div>

              {/* Minimalist Arrow Pill with Continuous Rolling Arrow */}
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0",
                  isLightSection
                    ? "bg-white text-ink group-hover:bg-spark group-hover:text-white"
                    : "bg-ink text-white group-hover:bg-spark"
                )}
              >
                <div className="relative overflow-hidden w-3 h-3 flex items-center justify-center">
                  <ArrowUpRight
                    size={11.5}
                    strokeWidth={2.4}
                    className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-3.5 group-hover:translate-x-3.5"
                  />
                  <ArrowUpRight
                    size={11.5}
                    strokeWidth={2.4}
                    className="absolute transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] translate-y-3.5 -translate-x-3.5 group-hover:translate-y-0 group-hover:translate-x-0"
                  />
                </div>
              </div>
            </Link>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "xl:hidden relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              onLight ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
            )}
          >
            <span className="relative block h-[14px] w-[22px]">
              <motion.span
                className="absolute left-0 top-0 block h-[1.5px] w-full rounded bg-current"
                animate={menuOpen ? { y: 6.25, rotate: 45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              />
              <motion.span
                className="absolute left-0 top-[6.25px] block h-[1.5px] w-full rounded bg-current"
                animate={menuOpen ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute bottom-0 left-0 block h-[1.5px] w-full rounded bg-current"
                animate={menuOpen ? { y: -6.25, rotate: -45 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Full-screen menu: a cream mid-century arch (like the doorway in the studio) on dark green.
          The links rise inside it and a red dot springs to whichever one you point at or are on. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            data-lenis-prevent
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="hide-scrollbar xl:hidden fixed inset-0 z-0 overflow-x-hidden overflow-y-auto overscroll-contain bg-forest text-ink"
          >
            {/* colour-block shapes behind the arch (clipped in their own layer so they never add scroll area) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              aria-hidden="true"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 11, delay: 0.55 }}
              className="pointer-events-none absolute -right-16 top-24 h-[220px] w-[220px] rounded-full bg-peach sm:right-[8%] sm:h-[280px] sm:w-[280px]"
            />
            <motion.div
              aria-hidden="true"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute -bottom-28 -left-24 h-[260px] w-[260px] rounded-full bg-terracotta sm:left-[6%] sm:h-[320px] sm:w-[320px]"
            />
            </div>

            <div className="relative mx-auto flex min-h-full w-full max-w-[480px] flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[84px] sm:pt-[96px]">
              <motion.div
                initial={{ y: "55%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
                className="flex flex-1 flex-col items-center rounded-b-[28px] rounded-t-[240px] bg-plaster px-6 pb-7 pt-24 shadow-[0_30px_60px_rgba(0,0,0,0.35)] sm:pt-28"
              >
                <nav aria-label="Mobile" className="my-auto w-full py-4">
                  <ul className="flex flex-col items-center gap-0.5 sm:gap-1" onPointerLeave={() => setMenuHover(null)}>
                    {NAV.map((item, i) => {
                      const dotOn = (menuHover ?? NAV.find((n) => n.href === pathname)?.href) === item.href;
                      return (
                        <li key={item.href} className="relative w-full">
                          <motion.div
                            initial={{ y: 28, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.75, delay: 0.4 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                            className="relative flex justify-center"
                          >
                            {dotOn && (
                              <motion.span
                                layoutId="menu-dot"
                                aria-hidden="true"
                                transition={{ type: "spring", stiffness: 520, damping: 17, mass: 0.9 }}
                                className="absolute left-[14%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-spark sm:left-[18%]"
                              />
                            )}
                            <Link
                              href={item.href}
                              onClick={() => setMenuOpen(false)}
                              onPointerEnter={() => setMenuHover(item.href)}
                              onFocus={() => setMenuHover(item.href)}
                              className="py-1.5 font-title text-[clamp(30px,5.6dvh,58px)] leading-[1.1] tracking-[-0.01em] text-ink transition-colors hover:text-rust focus-visible:text-rust"
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + NAV.length * 0.07 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full"
                >
                  <Link
                    href="/pricing"
                    onClick={() => setMenuOpen(false)}
                    className="group inline-flex w-full items-center justify-between rounded-full bg-ink py-2.5 pl-6 pr-2.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
                  >
                    <span>Request Membership</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-colors duration-500 group-hover:bg-spark group-hover:text-white">
                      <ArrowUpRight size={14} strokeWidth={2.2} />
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
