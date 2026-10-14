"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";

interface Tier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  featured: boolean;
  ctaText: string;
  btnStyle: "light" | "secondary" | "dark";
  headerBg: string;
  border: string;
  headerText: string;
  check: string;
  perks: string[];
}

const tiers: Tier[] = [
  {
    id: "access",
    name: "Access",
    monthlyPrice: 325,
    annualPrice: 275,
    description: "Perfect for foundational consistency and disciplined weekly practice.",
    featured: false,
    ctaText: "Request Access",
    btnStyle: "light",
    headerBg: "bg-sage",
    border: "border-sage",
    headerText: "text-ink",
    check: "text-sage-700",
    perks: [
      "Full studio access & amenities",
      "6 classes / month (reformer & mat)",
      "Standard booking window (7 days)",
      "Complimentary recovery bar tonic",
      "Towel service & amenities",
    ],
  },
  {
    id: "residence",
    name: "Residence",
    monthlyPrice: 575,
    annualPrice: 485,
    description: "For dedicated practitioners who integrate daily somatic wellness.",
    featured: true,
    ctaText: "Join Residence",
    btnStyle: "dark",
    headerBg: "bg-forest",
    border: "border-deep-green",
    headerText: "text-bone",
    check: "text-deep-green",
    perks: [
      "Everything in Access",
      "Unlimited studio & class reservations",
      "Priority booking (14 days advance)",
      "Weekly recovery session included",
      "2 complimentary guest passes / month",
    ],
  },
  {
    id: "atelier",
    name: "Atelier",
    monthlyPrice: 950,
    annualPrice: 805,
    description: "High-touch, bespoke programming with dedicated private instruction.",
    featured: false,
    ctaText: "Contact Concierge",
    btnStyle: "dark",
    headerBg: "bg-rust",
    border: "border-rust",
    headerText: "text-bone",
    check: "text-rust",
    perks: [
      "Everything in Residence",
      "Weekly 1:1 private reformer session",
      "Unlimited priority booking (30 days)",
      "Curated kinetic recovery protocols",
      "Priority private lounge access",
    ],
  },
];

export function ClubMembership() {
  const [billingCycle, setBillingCycle] = React.useState<"monthly" | "yearly">("monthly");
  const [activeIdx, setActiveIdx] = React.useState(1); // Default to middle card (Residence)
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Function to reliably center the middle card
  const centerMiddleCard = React.useCallback((behavior: ScrollBehavior = "instant") => {
    if (scrollRef.current && cardRefs.current[1] && window.innerWidth < 768) {
      const container = scrollRef.current;
      const targetCard = cardRefs.current[1];
      if (targetCard) {
        const scrollTarget =
          targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
        container.scrollTo({ left: scrollTarget, behavior });
      }
    }
  }, []);

  // Center middle card on initial load and window resize
  React.useEffect(() => {
    centerMiddleCard("instant");
    const t1 = setTimeout(() => centerMiddleCard("instant"), 60);
    const t2 = setTimeout(() => centerMiddleCard("instant"), 250);

    const onResize = () => {
      if (window.innerWidth < 768) {
        centerMiddleCard("instant");
      }
    };

    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", onResize);
    };
  }, [centerMiddleCard]);

  // Update active card on mobile scroll so whichever card is in the center is always active
  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current || window.innerWidth >= 768) return;
    const container = scrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;
    let closest = 1;
    let minDiff = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const elCenter = el.offsetLeft + el.clientWidth / 2;
      const diff = Math.abs(center - elCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });
    setActiveIdx(closest);
  }, []);

  // Smooth scroll to a card on mobile tap
  const scrollToCard = (idx: number) => {
    if (!scrollRef.current || !cardRefs.current[idx] || window.innerWidth >= 768) return;
    const container = scrollRef.current;
    const targetCard = cardRefs.current[idx];
    if (targetCard) {
      const scrollTarget =
        targetCard.offsetLeft - (container.clientWidth - targetCard.clientWidth) / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  };

  return (
    <section
      id="membership"
      data-header-theme="light"
      className="pt-16 pb-12 sm:pt-24 sm:pb-16 bg-mint text-ink border-none shadow-none overflow-hidden"
    >
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Section Header: "Choose your plan" */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-14">
          <motion.h2 {...wipeProps} className="font-display text-[32px] sm:text-[44px] md:text-[54px] lg:text-[60px] text-ink tracking-normal leading-[1.4]">
            <SparkText>Choose your plan.</SparkText>
          </motion.h2>

          {/* Billing toggle: the white pill springs between the options (overshoots, then settles) */}
          <Reveal delay={0.2} className="mt-5 sm:mt-6">
          <div className="inline-flex items-center p-1 rounded-full bg-mint-deep border border-sage select-none shadow-[inset_0_1px_2px_rgba(36,26,20,0.06)]">
            <div className="flex items-center overflow-hidden rounded-full">
            {(
              [
                ["monthly", "Pay monthly"],
                ["yearly", "Pay yearly"],
              ] as const
            ).map(([cycle, label]) => (
              <motion.button
                key={cycle}
                type="button"
                onClick={() => setBillingCycle(cycle)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 14 }}
                className={`relative px-4 py-1.5 rounded-full text-[12px] font-medium transition-colors duration-300 ${
                  billingCycle === cycle ? "text-ink" : "text-deep-green hover:text-ink"
                }`}
              >
                {billingCycle === cycle && (
                  <motion.span
                    layoutId="billing-pill"
                    transition={{ type: "spring", stiffness: 520, damping: 17, mass: 0.9 }}
                    className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(36,26,20,0.12)]"
                  />
                )}
                <span className="relative z-10">{label}</span>
              </motion.button>
            ))}
            </div>
          </div>
          </Reveal>
        </div>

        {/* Responsive Track: Horizontal Snapping Scroll on Mobile, Standard 3-Column Grid on Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 -mx-4 sm:-mx-6 md:mx-0 px-[16vw] sm:px-[19vw] md:px-0 gap-3.5 sm:gap-4.5 md:gap-7 lg:gap-8 overflow-x-auto md:overflow-visible no-scrollbar snap-x snap-mandatory md:snap-none scroll-smooth md:scroll-auto items-center py-4 md:py-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {tiers.map((tier, idx) => {
            const currentPrice = billingCycle === "yearly" ? tier.annualPrice : tier.monthlyPrice;
            const isCenterOnMobile = activeIdx === idx;

            return (
              <motion.div
                key={tier.id}
                initial={{ y: 56, filter: "blur(8px)" }}
                whileInView={{ y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => scrollToCard(idx)}
                className={`w-[68vw] sm:w-[62vw] max-w-[290px] md:w-auto md:max-w-none shrink-0 snap-center md:snap-align-none rounded-[22px] sm:rounded-[24px] overflow-hidden flex flex-col relative transition-transform duration-300 origin-center cursor-pointer md:cursor-default ${
                  isCenterOnMobile
                    ? "scale-100 opacity-100 z-10 shadow-[0_4px_16px_rgba(36,26,20,0.06)] border border-deep-green/20"
                    : "scale-[0.88] sm:scale-[0.90] opacity-75 z-0"
                } ${
                  tier.featured
                    ? "md:scale-[1.05] md:opacity-100 md:z-10 md:shadow-[0_8px_20px_rgba(36,26,20,0.06)] bg-forest border border-deep-green/40"
                    : `md:scale-[0.96] md:opacity-95 md:z-0 md:shadow-[0_2px_10px_rgba(36,26,20,0.03)] border ${tier.headerBg} ${tier.border}`
                }`}
              >
                {/* Curve Layer 1: Top Header Area with Identical Height across all cards */}
                {tier.featured ? (
                  // Featured Card: Dark Fluid Silk Wave Artwork Header (Layer 1)
                  <div className="relative h-[72px] sm:h-[80px] w-full overflow-hidden bg-forest">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/dark-fluid-banner.jpg"
                      alt=""
                      className="w-full h-full object-cover object-center scale-105"
                    />
                    <div className="absolute inset-0 bg-deep-green mix-blend-color pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
                    <h3 className="absolute top-3.5 sm:top-4.5 left-4.5 sm:left-6 text-[15px] sm:text-[17px] font-semibold text-white tracking-tight z-10 drop-shadow-sm">
                      {tier.name}
                    </h3>
                    <span className="absolute top-3.5 sm:top-4.5 right-4 sm:right-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-forest/70 px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.16em] text-bone">
                      <span className="h-1.5 w-1.5 rounded-full bg-spark-bright" />
                      Most chosen
                    </span>
                  </div>
                ) : (
                  // Non-featured Cards: Outer Light Header Area (Layer 1)
                  <div className={`h-[72px] sm:h-[80px] px-4.5 sm:px-6 pt-3.5 sm:pt-4.5 flex items-start ${tier.headerBg}`}>
                    <h3 className={`text-[15px] sm:text-[17px] font-semibold ${tier.headerText} tracking-tight`}>
                      {tier.name}
                    </h3>
                  </div>
                )}

                {/* Curve Layer 2: Overlapping White Body Sheet with Identical Top Alignment */}
                <div
                  className={`relative z-10 bg-cream rounded-t-[18px] sm:rounded-t-[22px] px-4 sm:px-6 pt-4.5 sm:pt-5 pb-5 sm:pb-6 flex-1 flex flex-col -mt-4 sm:-mt-4.5 ${
                    tier.featured
                      ? "shadow-[0_-8px_24px_rgba(0,0,0,0.12),0_-1px_3px_rgba(0,0,0,0.06)] border-t border-white/60"
                      : "shadow-[0_-5px_16px_rgba(36,26,20,0.03),0_-1px_2px_rgba(36,26,20,0.02)] border-t border-cream-line/80"
                  }`}
                >
                  {/* Plan Short Description with uniform height so price boxes align perfectly */}
                  <p className="text-[12px] sm:text-[13px] text-ink-muted leading-relaxed min-h-[38px] sm:min-h-[42px] mb-4 sm:mb-5">
                    {tier.description}
                  </p>

                  {/* Curve Layer 3: Inset Price & CTA Box */}
                  <div className="rounded-[14px] bg-cream border border-cream-line p-3.5 sm:p-4.5 mb-4 sm:mb-5 shadow-[inset_0_1px_2px_rgba(16,24,40,0.02)]">
                    {/* Price Row with vertically centered USD / month badge */}
                    <div className="flex items-center gap-1.5 mb-3 sm:mb-3.5">
                      <div className="flex items-baseline text-ink leading-none">
                        <span className="text-[18px] sm:text-[22px] font-medium mr-0.5">$</span>
                        <span className="relative inline-flex text-[28px] sm:text-[34px] font-bold tracking-tight">
                          <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                              key={currentPrice}
                              initial={{ y: "65%", opacity: 0, scale: 0.85 }}
                              animate={{ y: "0%", opacity: 1, scale: 1 }}
                              exit={{ y: "-65%", opacity: 0, scale: 0.85 }}
                              transition={{ type: "spring", stiffness: 420, damping: 15 }}
                              className="inline-block"
                            >
                              {currentPrice}
                            </motion.span>
                          </AnimatePresence>
                        </span>
                      </div>
                      <div className="flex flex-col text-[8px] sm:text-[9px] leading-[1.1] text-ink-muted font-semibold uppercase tracking-wider">
                        <span>USD /</span>
                        <span>month</span>
                      </div>
                    </div>

                    {/* Action Button inside Inset Box */}
                    <Link
                      href="/contact"
                      className={`w-full inline-flex items-center justify-center py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-[10px] text-[12px] sm:text-[13px] transition-all text-center ${
                        tier.btnStyle === "dark"
                          ? "bg-ink hover:bg-spark text-white font-medium shadow-xs transition-colors"
                          : tier.btnStyle === "secondary"
                          ? "bg-cream-flat hover:bg-cream-line text-ink font-semibold shadow-xs"
                          : "bg-cream-flat hover:bg-cream-line text-ink-muted font-medium"
                      }`}
                    >
                      {tier.ctaText}
                    </Link>
                  </div>

                  {/* Features Checklist with clean minimal checkmarks matching reference */}
                  <ul className="space-y-2.5 sm:space-y-3 pb-1">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 sm:gap-2.5 text-[12px] sm:text-[13px] text-ink-muted leading-snug"
                      >
                        <span className={`${tier.check} text-[11px] sm:text-[12px] font-bold select-none shrink-0 mt-[1px]`}>
                          ✓
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
