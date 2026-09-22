"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "WHAT SHOULD I WEAR OR BRING TO MY FIRST CLASS?",
    answer:
      "Comfortable form-fitting athletic wear that allows effortless range of motion. Grip socks are required on all reformers for grip and hygiene. Filtered water, towels, and lockers are fully provided.",
  },
  {
    id: "02",
    number: "02",
    question: "WHAT'S INCLUDED IN THE MEMBERSHIP?",
    answer:
      "Full access to reformer and mat studios, personalized spring resistance setups, complimentary grip amenities, towel service, private locker access, and priority booking on all weekly sessions.",
  },
  {
    id: "03",
    number: "03",
    question: "I AM A BEGINNER. WHICH CLASS SHOULD I START WITH?",
    answer:
      "Our Foundation Reformer class is crafted specifically for newcomers. Every class is strictly capped at eight reformers so your instructor can guide your alignment, springs, and pacing individually.",
  },
  {
    id: "04",
    number: "04",
    question: "WHAT IS YOUR CANCELLATION POLICY?",
    answer:
      "We operate a 12-hour cancellation window for all group classes and 24 hours for private appointments. Cancellations within this window immediately credit back to your account.",
  },
  {
    id: "05",
    number: "05",
    question: "CAN I ATTEND WITH INJURIES OR PRENATAL CONDITIONS?",
    answer:
      "Yes. All instructors hold 500+ hours of classical training with rehabilitation and prenatal certification. Notify your instructor before class so custom modifications can be prepared.",
  },
  {
    id: "06",
    number: "06",
    question: "HOW DO I RESERVE A CLASS OR PRIVATE SESSION?",
    answer:
      "You can reserve your reformer directly online through our schedule page or mobile portal. First-time visitors can claim a complimentary introductory reformer session.",
  },
];

export function Faq() {
  // Item 02 open by default, exactly matching the reference screenshot
  const [openId, setOpenId] = useState<string | null>("02");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      data-header-theme="light"
      className="py-20 sm:py-24 md:py-28 lg:py-36 bg-[#d8e2dcff] text-neutral-900 w-full overflow-hidden relative"
    >
      {/* Tactile SVG Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply z-0"
        aria-hidden="true"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="faq-section-noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.52"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#faq-section-noise)" />
        </svg>
      </div>

      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative z-10">
        {/* Top-Left Heading with Smooth Entrance */}
        <div className="mb-14 sm:mb-20 md:mb-24 pt-2 pr-6">
          <motion.h2
            initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="font-kafina text-[44px] sm:text-[56px] md:text-[68px] lg:text-[78px] text-neutral-900 tracking-tight leading-[1.12] pr-4 inline-block"
          >
            Have questions?
          </motion.h2>
        </div>

        {/* Full-Width Minimalist Accordion List with Staggered Entrance */}
        <div className="w-full border-t border-black/15 divide-y divide-black/15">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.75,
                  delay: 0.08 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-8 sm:py-9 md:py-11 grid grid-cols-12 gap-4 items-start text-left cursor-pointer group focus:outline-none"
                >
                  {/* Far-Left Number: 01, 02... */}
                  <div className="col-span-2 sm:col-span-1 md:col-span-1">
                    <span className="font-sans text-[13px] sm:text-[14px] md:text-[15px] text-neutral-800/50 tracking-widest select-none block pt-1">
                      {faq.number}
                    </span>
                  </div>

                  {/* Wide Negative Space / Spacer matching reference layout */}
                  <div className="hidden md:block md:col-span-4 lg:col-span-5" />

                  {/* Question and Expandable Answer (starts at ~50% across) */}
                  <div className="col-span-9 sm:col-span-10 md:col-span-6 lg:col-span-5 pr-6">
                    <h3 className="font-kafina text-[16px] sm:text-[18px] md:text-[20px] lg:text-[21px] tracking-[0.08em] sm:tracking-[0.10em] uppercase text-neutral-900 leading-snug group-hover:text-black transition-colors">
                      {faq.question}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.2, delay: 0.06 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                              opacity: { duration: 0.1 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans font-light text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65] text-neutral-800/80 pt-3.5 max-w-xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Far-Right Plus / Close Icon */}
                  <div className="col-span-1 text-right select-none pt-0.5">
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="inline-block text-[22px] sm:text-[26px] md:text-[28px] font-extralight text-neutral-900 leading-none"
                    >
                      +
                    </motion.span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
