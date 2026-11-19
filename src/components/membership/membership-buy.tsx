"use client";

import { motion } from "framer-motion";
import { MarianaEmbed } from "@/components/mariana/mariana-embed";
import { mariana } from "@/lib/mariana";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const nextSteps = [
  { title: "Choose", text: "Pick your package in the shop beside this." },
  { title: "Sign up and pay", text: "Create your account, or log in if you have one, and pay securely." },
  { title: "Book your class", text: "Reserve your first class on the schedule, mat or reformer." },
];

/* Where a package is bought: Mariana Tek's buy page, standing on a white sheet (their pages need a white or light background)
   inside the deep olive panel. The panel keeps the sun, rings and gold quarter of the earlier request section, with a short
   account of what happens next down a thin line. The package buttons higher up on the page scroll here. */
export function MembershipBuy() {
  return (
    <section id="buy" data-header-theme="dark" className="relative w-full scroll-mt-4 bg-mint px-3 pb-3 sm:px-6 lg:px-10">
      <div className="relative isolate overflow-clip rounded-[36px] bg-forest px-6 py-16 text-bone sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-24">
        {/* sun, top right */}
        <motion.div aria-hidden="true" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 150, damping: 12, delay: 0.3 }} className="pointer-events-none absolute -right-12 -top-12 -z-10 h-[120px] w-[120px] rounded-full bg-peach sm:-right-14 sm:-top-14 sm:h-[170px] sm:w-[170px] lg:-right-20 lg:-top-20 lg:h-[300px] lg:w-[300px]" />
        {/* soft rings behind the heading, mostly off the left edge */}
        <span aria-hidden className="pointer-events-none absolute -left-44 top-[8%] -z-10 hidden h-[560px] w-[560px] rounded-full border border-white/[0.07] lg:block" />
        <span aria-hidden className="pointer-events-none absolute -left-24 top-[8%] -z-10 mt-[80px] hidden h-[400px] w-[400px] rounded-full border border-white/[0.07] lg:block" />
        {/* a gold quarter, bottom left */}
        <motion.div aria-hidden="true" initial={{ x: -80, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.4, ease: EASE }} className="pointer-events-none absolute -bottom-14 -left-14 -z-10 h-[120px] w-[120px] rounded-full bg-terracotta sm:-bottom-16 sm:-left-16 sm:h-[160px] sm:w-[160px]" />

        <div className="mx-auto grid w-full max-w-[1280px] gap-14 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* stays in view while the shop beside it scrolls, when the window is tall enough to show all of it (the panel clips with
              overflow-clip, since overflow-hidden would stop this sticking) */}
          <div className="lg:col-span-4 lg:self-start lg:pt-6 lg:top-28 lg:[@media(min-height:780px)]:sticky">
            <h2 className="font-display text-[42px] font-normal leading-[1.06] tracking-normal text-bone sm:text-[56px] lg:text-[clamp(44px,4.2vw,68px)]">
              Buy your <span className="text-spark-bright">package</span>
            </h2>
            <p className="mt-6 max-w-md font-sans text-[15px] font-light leading-relaxed text-white/70 sm:text-[16.5px]">
              Choose what suits your week, then create your account and pay securely. You can book your first class straight away.
            </p>

            {/* what happens next, down a thin line */}
            <ol className="relative mt-10 flex flex-col gap-7 sm:mt-12">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="relative flex gap-5">
                  {/* joins this circle to the next one, so nothing runs on past the last step */}
                  {i < nextSteps.length - 1 && <span aria-hidden className="absolute -bottom-6 left-4 top-9 w-px -translate-x-1/2 bg-white/15" />}
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 + i * 0.12 }}
                    className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-spark-bright/70 bg-forest font-title text-[17px] leading-none text-spark-bright"
                  >
                    {i + 1}
                  </motion.span>
                  <div>
                    <p className="font-title text-[23px] font-normal leading-none text-bone">{step.title}</p>
                    <p className="mt-2 max-w-xs font-sans text-[13.5px] font-light leading-relaxed text-white/65">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-8">
            <div className="relative">
              {/* two little arches standing behind the sheet, peeking over its top edge */}
              <span aria-hidden className="absolute -top-9 left-10 h-16 w-12 rounded-t-full bg-terracotta sm:left-14" />
              <span aria-hidden className="absolute -top-5 left-[5.6rem] h-12 w-9 rounded-t-full bg-sage sm:left-[7.2rem]" />
              <div className="relative rounded-[32px] bg-white p-3 text-ink sm:rounded-[40px] sm:p-6">
                <MarianaEmbed route={mariana.routes.buy} label="the shop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
