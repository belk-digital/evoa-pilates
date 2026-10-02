"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Mail, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [{ label: "Home", href: "/" }, ...siteConfig.nav];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [isLightSection, setIsLightSection] = React.useState(true);
  const [menuOpen, setMenuOpen] = React.useState(false);

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
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex flex-col leading-none select-none hover:opacity-85 transition-opacity w-fit"
          >
            <span
              className={cn(
                "font-sans font-light tracking-[0.25em] text-[19px] md:text-[23px] uppercase transition-colors duration-300",
                isLightSection ? "text-ink" : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              )}
            >
              EVOA
            </span>
            <div
              className={cn(
                "flex justify-between w-full text-[8px] md:text-[9.5px] font-sans font-light uppercase mt-1 transition-colors duration-300",
                isLightSection
                  ? "text-rose-500"
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
              "hidden md:flex items-center gap-8 lg:gap-12 rounded-full px-10 lg:px-14 py-3.5 md:py-4 transition-all duration-300 backdrop-blur-md",
              isLightSection
                ? "bg-white/85 border border-ink/10 shadow-[0_8px_30px_rgba(28,24,21,0.08)]"
                : "bg-white/[0.08] border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
            )}
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[12px] lg:text-[13px] font-medium tracking-[0.22em] uppercase transition-colors duration-200",
                  pathname === item.href
                    ? isLightSection
                      ? "text-rose-500"
                      : "text-rose-200"
                    : isLightSection
                      ? "text-ink/90 hover:text-rose-500"
                      : "text-white/95 hover:text-rose-200"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${siteConfig.email}`}
              aria-label="Email us"
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                isLightSection
                  ? "bg-white/85 border border-ink/10 text-ink shadow-[0_8px_30px_rgba(28,24,21,0.08)] hover:bg-white hover:text-rose-500"
                  : "bg-white/[0.08] border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/40 hover:text-rose-200"
              )}
            >
              <Mail size={17} strokeWidth={1.8} />
            </a>
            <Link
              href="/pricing"
              className={cn(
                "group relative inline-flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 text-[11px] lg:text-[11.5px] font-semibold tracking-[0.2em] uppercase transition-shadow duration-300 select-none",
                isLightSection
                  ? "bg-ink text-white shadow-[0_4px_16px_rgba(28,24,21,0.14)] hover:shadow-[0_8px_24px_rgba(28,24,21,0.25)]"
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
                      isLightSection ? "text-rose-300" : "text-rose-500"
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
                    ? "bg-white text-ink group-hover:bg-rose-500 group-hover:text-white"
                    : "bg-ink text-white group-hover:bg-rose-500"
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
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className={cn(
              "md:hidden flex h-10 w-10 items-center justify-center rounded-full transition-colors",
              isLightSection ? "text-ink hover:bg-ink/5" : "text-white hover:bg-white/10"
            )}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className={cn(
              "md:hidden overflow-hidden backdrop-blur-xl border-t mt-3",
              isLightSection
                ? "bg-white/95 border-ink/10 text-ink shadow-lg"
                : "bg-ink/95 border-white/15 text-white"
            )}
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "py-3 text-[14px] font-medium tracking-[0.2em] uppercase border-b last:border-none",
                    isLightSection
                      ? "text-ink/90 border-ink/10 hover:text-rose-500"
                      : "text-white/90 border-white/10 hover:text-rose-200"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-5">
                <Link
                  href="/pricing"
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "group relative flex-1 inline-flex items-center justify-between rounded-full pl-5 pr-2 py-2 text-[11.5px] font-semibold tracking-[0.2em] uppercase transition-colors select-none",
                    isLightSection ? "bg-ink text-white" : "bg-white text-ink"
                  )}
                >
                  <div className="relative overflow-hidden h-[16px]">
                    <div className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
                      <span className="h-[16px] flex items-center">
                        Request Membership
                      </span>
                      <span
                        className={cn(
                          "h-[16px] flex items-center font-semibold",
                          isLightSection ? "text-rose-300" : "text-rose-500"
                        )}
                      >
                        Request Membership
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                      isLightSection
                        ? "bg-white text-ink group-hover:bg-rose-500 group-hover:text-white"
                        : "bg-ink text-white group-hover:bg-rose-500"
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
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email us"
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ml-3",
                    isLightSection ? "border-ink/15 text-ink hover:bg-ink/5" : "border-white/20 text-white hover:bg-white/10"
                  )}
                >
                  <Mail size={17} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
