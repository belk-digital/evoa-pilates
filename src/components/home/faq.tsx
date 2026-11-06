"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";
import { wipeProps } from "@/components/ui/reveal";

export interface FaqItem {
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
      "Comfortable, fitted clothing that lets you move freely, so your instructor can see your alignment. Grip socks are required on the reformer and the mat. Filtered water, towels and lockers are provided.",
  },
  {
    id: "02",
    number: "02",
    question: "How does pricing work?",
    answer:
      "A drop-in is $28 for a mat class and $42 for a reformer class. Class packs, monthly reformer packages and unlimited access bring the price of each class down. Everything is on the Membership page.",
  },
  {
    id: "03",
    number: "03",
    question: "I'm a beginner. Which class should I start with?",
    answer:
      "EVOA Form on the reformer is built around the essentials: alignment, precision and control. On the mat, begin with EVOA Flow or Restore. Every class is capped at eight, so your instructor can guide you individually.",
  },
  {
    id: "04",
    number: "04",
    question: "What is your cancellation policy?",
    answer:
      "You can cancel free up to 12 hours before class. After that the class is counted, because the room only holds eight and someone else may have wanted your place.",
  },
  {
    id: "05",
    number: "05",
    question: "Can I attend with an injury?",
    answer:
      "Usually, yes. Tell your instructor about injuries before class so modifications can be prepared. For anything more involved, speak to us before you book and we will suggest the right class.",
  },
  {
    id: "06",
    number: "06",
    question: "How do I reserve a class?",
    answer:
      "Choose a class on the schedule and reserve your place online. You will need a drop-in, a class pack or a monthly package, all of which you can request on the Membership page.",
  },
];

/* The homepage uses it as is. Other pages (Classes) pass their own heading and questions and get the same design. */
export function Faq({
  heading = "Have questions?",
  items = faqs,
  defaultOpenId = "02",
  plain = false,
}: {
  heading?: string;
  items?: FaqItem[];
  defaultOpenId?: string | null;
  /** a quieter heading for inner pages: no wipe and no gold full stop, smaller, so it does not repeat the page title's recipe */
  plain?: boolean;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

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
        <div className={plain ? "mb-8 sm:mb-12 pt-2 pr-6" : "mb-14 sm:mb-20 md:mb-24 pt-2 pr-6"}>
          {plain ? (
            <h2 className="font-title text-[34px] sm:text-[44px] md:text-[52px] font-normal text-ink tracking-[-0.01em] leading-[1.1]">{heading}</h2>
          ) : (
            <motion.h2
              {...wipeProps}
              className="font-display text-[44px] sm:text-[60px] md:text-[78px] lg:text-[92px] text-neutral-900 tracking-normal leading-[1.05] pr-4 inline-block transform-gpu"
            >
              <SparkText iDots={false}>{heading}</SparkText>
            </motion.h2>
          )}
        </div>

        {/* Full-Width Minimalist Accordion List with Staggered Entrance */}
        <div className="w-full border-t border-black/15 divide-y divide-black/15">
          {items.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                key={faq.id}
                initial={plain ? false : { opacity: 0, y: 20 }}
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
