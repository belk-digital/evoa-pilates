"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer
      data-header-theme="light"
      className="bg-[#d8e2dc] p-4 sm:p-6 md:p-8 lg:p-10 relative overflow-hidden"
    >
      {/* Tactile SVG Noise Overlay matching FAQ section */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply z-0"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="footer-bg-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.52"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#footer-bg-noise)" />
        </svg>
      </div>

      {/* Inner Floating Dark Card with Even All-Side Margins & Smooth Entrance */}
      <motion.div
        initial={{ opacity: 0, y: 36, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full bg-[#121110] text-[#faf6f3] rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[3rem] p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden min-h-[580px] lg:min-h-[640px] flex flex-col justify-between"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start relative z-10">
          {/* Top-Left: Mission & Seamless Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between max-w-lg"
          >
            <p className="font-sans font-light text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65] text-white/70 max-w-md">
              We offer mindful reformer and classical mat Pilates designed for posture, longevity, and deep core strength. A quiet sanctuary for intentional movement.
            </p>

            {/* Seamless Newsletter Subscription Field */}
            <div className="mt-8 sm:mt-10 max-w-sm">
              <span className="block font-sans text-[11px] tracking-[0.24em] uppercase text-white/45 mb-2">
                Newsletter
              </span>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center border-b border-white/20 focus-within:border-white transition-colors duration-300 py-1 group"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-2 text-[14px] text-white placeholder:text-white/35 focus:outline-none font-sans font-light"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-8 w-8 shrink-0 items-center justify-center text-white/60 group-hover:text-white hover:text-white hover:translate-x-1 transition-all duration-200 cursor-pointer"
                >
                  <ArrowRight size={16} strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </motion.div>

          {/* Top-Right: Navigation Columns matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 grid grid-cols-2 gap-8 sm:gap-12 lg:pl-16"
          >
            {/* Extra Links */}
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[12px] sm:text-[13px] font-medium tracking-[0.06em] text-white select-none">
                Extra links
              </span>
              <nav className="flex flex-col gap-2.5">
                {[
                  { label: "Home", href: "/" },
                  { label: "Classes", href: "/classes" },
                  { label: "Philosophy", href: "/#philosophy" },
                  { label: "Why Evoa", href: "/#why-evoa" },
                  { label: "About Us", href: "/about" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans font-light text-[13.5px] sm:text-[14px] text-white/60 hover:text-white transition-colors duration-200 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Media */}
            <div className="flex flex-col gap-4">
              <span className="font-sans text-[12px] sm:text-[13px] font-medium tracking-[0.06em] text-white select-none">
                Social Media
              </span>
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "Instagram", href: siteConfig.social.instagram },
                  { label: "YouTube", href: siteConfig.social.facebook },
                  { label: "Facebook", href: siteConfig.social.facebook },
                  { label: "X", href: siteConfig.social.tiktok },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-light text-[13.5px] sm:text-[14px] text-white/60 hover:text-white transition-colors duration-200 w-fit"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 flex items-end justify-between">
          {/* Bottom-Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 relative z-10 max-w-sm pb-1 sm:pb-2"
          >
            <span className="font-sans text-[12px] sm:text-[13px] font-medium tracking-[0.06em] text-white mb-1 select-none">
              Contact
            </span>
            <div className="flex flex-col gap-1 font-sans font-light text-[13px] sm:text-[13.5px] text-white/60 leading-relaxed">
              <p>142 Mercer Street, Soho</p>
              <p>New York, NY 10012</p>
            </div>
            <div className="flex flex-col gap-1 font-sans font-light text-[13px] sm:text-[13.5px] text-white/60 pt-2">
              <a href="mailto:hello@evoapilates.com" className="hover:text-white transition-colors w-fit">
                hello@evoapilates.com
              </a>
              <a href="tel:+12125550198" className="hover:text-white transition-colors w-fit">
                (212) 555-0198
              </a>
            </div>
            <p className="text-[11px] text-white/30 pt-3">
              © {new Date().getFullYear()} Evoa Pilates. All rights reserved.
            </p>
          </motion.div>
        </div>

        {/* Giant Architectural Wordmark ("evoa") Cut Off at the Extreme Bottom Edge (Matching Hero H1) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
              },
            },
          }}
          className="absolute right-0 bottom-0 pointer-events-none select-none overflow-hidden leading-none z-0 pr-4 sm:pr-8 md:pr-12 lg:pr-14 flex justify-end items-end"
        >
          <span
            aria-label="evoa"
            className="font-sans font-light text-[#faf6f3] text-[25vw] sm:text-[22vw] md:text-[19vw] lg:text-[220px] xl:text-[260px] 2xl:text-[290px] leading-[0.74] tracking-[-0.04em] translate-y-[21%] md:translate-y-[20%] text-right whitespace-nowrap drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] block"
          >
            {["e", "v", "o", "a"].map((letter, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { y: "135%", opacity: 0, filter: "blur(4px)" },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                      duration: 1.25,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </motion.div>
      </motion.div>
    </footer>
  );
}
