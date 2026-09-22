"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, Mail, User, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = React.useState(false);
  const [isLightSection, setIsLightSection] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const headerY = 55; // vertical reference point near header center
      const sections = document.querySelectorAll("section, footer");
      let currentIsLight = false;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= headerY && rect.bottom > headerY) {
          const theme = section.getAttribute("data-header-theme");
          if (theme === "light") {
            currentIsLight = true;
          } else if (theme === "dark") {
            currentIsLight = false;
          }
          break;
        }
      }

      setIsLightSection(currentIsLight);
      setScrolled(window.scrollY > 20);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Home page navigation structure matching the reference design
  if (isHome) {
    return (
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ease-[var(--ease-out-quart)] border-none border-b-0 bg-transparent",
          scrolled ? "py-3 md:py-4" : "py-4 md:py-6"
        )}
      >
        <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24">
          <div className="flex items-center justify-between">
            {/* Top-Left Stacked Logo */}
            <Link
              href="/"
              className="flex flex-col leading-none select-none hover:opacity-85 transition-opacity w-fit"
            >
              <span
                className={cn(
                  "font-sans font-light tracking-[0.25em] text-[19px] md:text-[23px] uppercase transition-colors duration-300",
                  isLightSection
                    ? "text-ink"
                    : "text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                )}
              >
                EVOA
              </span>
              <div
                className={cn(
                  "flex justify-between w-full text-[8px] md:text-[9.5px] font-sans font-light uppercase mt-1 transition-colors duration-300",
                  isLightSection
                    ? "text-dusty-mauve"
                    : "text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                )}
              >
                <span>P</span>
                <span>I</span>
                <span>L</span>
                <span>A</span>
                <span>T</span>
                <span>E</span>
                <span>S</span>
              </div>
            </Link>

            {/* Top-Center Floating Glassmorphic Pill Nav (Transparent Glass) */}
            <nav
              className={cn(
                "hidden md:flex items-center gap-8 lg:gap-12 rounded-full px-10 lg:px-14 py-3.5 md:py-4 transition-all duration-300 backdrop-blur-md",
                isLightSection
                  ? "bg-white/85 border border-ink/10 shadow-[0_8px_30px_rgba(28,24,21,0.08)]"
                  : "bg-white/[0.08] border border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
              )}
            >
              {[
                { label: "HOME", href: "/" },
                { label: "SERVICES", href: "/classes" },
                { label: "ABOUT US", href: "/about" },
                { label: "CONTACTS", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[12px] lg:text-[13px] font-medium tracking-[0.22em] uppercase transition-colors duration-200",
                    isLightSection
                      ? "text-ink/90 hover:text-dusty-mauve"
                      : "text-white/95 hover:text-rose-200"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Top-Right Call & Email Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                aria-label="Call us"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                  isLightSection
                    ? "bg-white/85 border border-ink/10 text-ink shadow-[0_8px_30px_rgba(28,24,21,0.08)] hover:bg-white hover:text-dusty-mauve"
                    : "bg-white/[0.08] border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/40 hover:text-rose-200"
                )}
              >
                <Phone size={17} strokeWidth={1.8} />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                aria-label="Email us"
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300",
                  isLightSection
                    ? "bg-white/85 border border-ink/10 text-ink shadow-[0_8px_30px_rgba(28,24,21,0.08)] hover:bg-white hover:text-dusty-mauve"
                    : "bg-white/[0.08] border border-white/20 text-white shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:bg-white/15 hover:border-white/40 hover:text-rose-200"
                )}
              >
                <Mail size={17} strokeWidth={1.8} />
              </a>
            </div>

            {/* Mobile Menu Toggle Button */}
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

        {/* Mobile Nav Overlay */}
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
                {[
                  { label: "HOME", href: "/" },
                  { label: "SERVICES", href: "/classes" },
                  { label: "ABOUT US", href: "/about" },
                  { label: "CONTACTS", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "py-3 text-[14px] font-medium tracking-[0.2em] uppercase border-b last:border-none",
                      isLightSection
                        ? "text-ink/90 border-ink/10 hover:text-dusty-mauve"
                        : "text-white/90 border-white/10 hover:text-rose-200"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-5">
                  <ButtonLink
                    href="/contact"
                    size="md"
                    className={cn(
                      "flex-1 text-center",
                      isLightSection
                        ? "bg-ink text-white hover:bg-ink-muted"
                        : "bg-white text-ink hover:bg-cream"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    BOOK A CLASS
                  </ButtonLink>
                  <div className="flex items-center gap-2.5 ml-4">
                    <a
                      href={`tel:${siteConfig.phone.replace(/[^0-9]/g, "")}`}
                      aria-label="Call us"
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border",
                        isLightSection
                          ? "border-ink/15 text-ink hover:bg-ink/5"
                          : "border-white/20 text-white hover:bg-white/10"
                      )}
                    >
                      <Phone size={17} strokeWidth={1.8} />
                    </a>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      aria-label="Email us"
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border",
                        isLightSection
                          ? "border-ink/15 text-ink hover:bg-ink/5"
                          : "border-white/20 text-white hover:bg-white/10"
                      )}
                    >
                      <Mail size={17} strokeWidth={1.8} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>
    );
  }

  // Standard Header for interior pages
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-[var(--ease-out-quart)]",
        scrolled ? "bg-cream/90 backdrop-blur-md shadow-soft" : "bg-transparent"
      )}
    >
      <Container size="wide">
        <div className="flex h-[76px] md:h-[92px] items-center justify-between">
          <Link href="/" className="flex flex-col leading-none shrink-0">
            <span className="font-serif text-[22px] md:text-[26px] text-ink">evoa</span>
            <span className="label text-rose-500 -mt-0.5">Pilates</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-[14px] tracking-wide transition-colors duration-200",
                    active ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <button
              type="button"
              aria-label="Client login"
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-muted hover:text-ink hover:bg-ink/[0.05] transition-colors"
            >
              <User size={18} strokeWidth={1.5} />
            </button>
            <ButtonLink href="/contact" size="sm">
              Book a Class
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-ink/[0.05] transition-colors"
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden overflow-hidden bg-cream border-t border-border-subtle"
          >
            <Container size="wide" className="flex flex-col gap-1 py-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-[17px] font-serif text-ink border-b border-border-subtle last:border-none"
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center gap-4 pt-5">
                <ButtonLink
                  href="/contact"
                  size="md"
                  className="flex-1"
                  onClick={() => setMenuOpen(false)}
                >
                  Book a Class
                </ButtonLink>
                <button
                  type="button"
                  aria-label="Client login"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink-muted"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
