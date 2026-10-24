"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";

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
    question: "What should I wear or bring to my first class?",
    answer:
      "Comfortable form-fitting athletic wear that allows effortless range of motion. Grip socks are required on all reformers for grip and hygiene. Filtered water, towels, and lockers are fully provided.",
  },
  {
    id: "02",
    number: "02",
    question: "What's included in the membership?",
    answer:
      "Full access to reformer and mat studios, personalized spring resistance setups, complimentary grip amenities, towel service, private locker access, and priority booking on all weekly sessions.",
  },
  {
    id: "03",
    number: "03",
    question: "I'm a beginner. Which class should I start with?",
    answer:
      "Our Foundation Reformer class is crafted specifically for newcomers. Every class is strictly capped at eight reformers so your instructor can guide your alignment, springs, and pacing individually.",
  },
  {
    id: "04",
    number: "04",
    question: "What is your cancellation policy?",
    answer:
      "We operate a 12-hour cancellation window for all group classes and 24 hours for private appointments. Cancellations within this window immediately credit back to your account.",
  },
  {
    id: "05",
    number: "05",
    question: "Can I attend with injuries or prenatal conditions?",
    answer:
      "Yes. All instructors hold 500+ hours of classical training with rehabilitation and prenatal certification. Notify your instructor before class so custom modifications can be prepared.",
  },
  {
    id: "06",
    number: "06",
    question: "How do I reserve a class or private session?",
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
      className="py-20 sm:py-24 md:py-28 lg:py-36 bg-mint text-neutral-900 w-full overflow-hidden relative"
    >
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 relative z-10">
        {/* Top-Left Heading with Smooth Entrance */}
        <div className="mb-14 sm:mb-20 md:mb-24 pt-2 pr-6">
          <motion.h2
            {...wipeProps}
            className="font-display text-[44px] sm:text-[60px] md:text-[78px] lg:text-[92px] text-neutral-900 tracking-normal leading-[1.05] pr-4 inline-block transform-gpu"
          >
            <SparkText iDots={false}>Have questions?</SparkText>
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
                  className="w-full py-7 sm:py-8 md:py-10 grid grid-cols-12 gap-4 items-start text-left cursor-pointer group focus:outline-none"
                >
                  {/* Far-Left Number: 01, 02... */}
                  <div className="col-span-2 sm:col-span-1 md:col-span-1">
                    <span className="font-sans text-[13px] sm:text-[14px] md:text-[15px] font-medium text-ink/60 tracking-widest select-none block pt-1.5 sm:pt-2">
                      {faq.number}
                    </span>
                  </div>

                  {/* Small gutter so the question lines up under the heading rhythm */}
                  <div className="hidden md:block md:col-span-1 lg:col-span-2" />

                  {/* Question and Expandable Answer */}
                  <div className="col-span-9 sm:col-span-10 md:col-span-9 lg:col-span-8 pr-4 sm:pr-8">
                    <h3 className="font-title text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-normal tracking-normal text-ink leading-[1.2] transition-colors group-hover:text-black">
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
                          <p className="font-sans font-normal text-[15px] sm:text-[16px] md:text-[17px] leading-[1.7] text-ink/85 pt-4 pb-1 max-w-2xl">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Far-right arrow: points down when closed, flips to point up when open */}
                  <div className="col-span-1 flex justify-end select-none pt-1 sm:pt-1.5">
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                      className={`inline-flex transition-colors duration-300 ${isOpen ? "text-spark" : "text-ink"}`}
                    >
                      <ChevronDown className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.4} />
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
