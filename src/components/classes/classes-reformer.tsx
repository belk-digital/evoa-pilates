"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/about/eyebrow";
import { cn } from "@/lib/utils";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type PartId = "carriage" | "springs" | "footbar" | "straps" | "headrest";

/* label = where the name tag sits over the drawing, in the drawing's own units (640 x 300) */
const parts: { id: PartId; name: string; text: string; label: [number, number] }[] = [
  {
    id: "carriage",
    name: "The carriage",
    text: "The padded platform that glides on wheels along the frame. You lie, sit or kneel on it, and it moves with you.",
    label: [340, 128],
  },
  {
    id: "springs",
    name: "The springs",
    text: "Spring tension sets the resistance. Heavier is not always harder: a light spring often asks for more control.",
    label: [146, 160],
  },
  {
    id: "footbar",
    name: "The footbar",
    text: "Something firm to push against, and a place to anchor feet or hands as the carriage travels.",
    label: [88, 84],
  },
  {
    id: "straps",
    name: "The straps",
    text: "Adjustable loops that let arms and legs move through space against the springs, taking the work into the whole body.",
    label: [214, 62],
  },
  {
    id: "headrest",
    name: "Headrest and shoulder blocks",
    text: "They keep you supported and aligned, so the effort stays where it should and the neck stays quiet.",
    label: [494, 108],
  },
];

const VB = { x: 20, y: 40, w: 600, h: 245 };

/* a zigzag spring from x1 to x2 at height y */
const spring = (x1: number, x2: number, y: number, coils = 7) => {
  const step = (x2 - x1) / coils;
  let d = `M${x1} ${y}`;
  for (let i = 0; i < coils; i++) d += `l${step / 2} ${i % 2 ? 8 : -8}l${step / 2} ${i % 2 ? -8 : 8}`;
  return d;
};

/* The reformer, side on, as a flat mid-century drawing. Each part lights up (gold outline) while the rest sit back. */
function ReformerDrawing({ active, onPick }: { active: PartId; onPick: (id: PartId) => void }) {
  const dim = (id: PartId) => (active === id ? 1 : 0.5);
  const halo = (id: PartId) => ({
    stroke: active === id ? "#b08d3c" : "transparent",
    strokeWidth: 3,
  });
  const group = (id: PartId) => ({
    style: { opacity: dim(id), transition: "opacity 0.5s ease", cursor: "pointer" } as React.CSSProperties,
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && onPick(id),
    onClick: () => onPick(id),
  });

  return (
    <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
      {/* floor, and the frame the carriage rides on */}
      <line x1="10" y1="274" x2="630" y2="274" stroke="#2b3220" strokeOpacity="0.25" />
      <rect x="52" y="250" width="44" height="24" rx="4" fill="#2f3a1c" />
      <rect x="544" y="250" width="44" height="24" rx="4" fill="#2f3a1c" />
      <rect x="40" y="214" width="560" height="38" rx="19" fill="#c4a96a" />
      <path d="M60 226H580" stroke="#f3ede3" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />

      {/* springs, running from the foot end to the carriage */}
      <g {...group("springs")}>
        <rect x="100" y="170" width="92" height="42" fill="transparent" />
        {[182, 193, 204].map((y, i) => (
          <g key={y}>
            <path d={spring(106, 188, y)} fill="none" stroke={["#2f3a1c", "#5e4b20", "#8fa08a"][i]} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="104" cy={y} r="3.5" fill="#2f3a1c" />
            <circle cx="190" cy={y} r="3.5" fill="#2f3a1c" />
          </g>
        ))}
        <rect x="98" y="170" width="96" height="42" rx="8" fill="none" {...halo("springs")} />
      </g>

      {/* carriage on wheels, with its cushion */}
      <g {...group("carriage")}>
        <rect x="190" y="174" width="304" height="34" rx="17" fill="#8fa08a" {...halo("carriage")} />
        <circle cx="226" cy="210" r="7" fill="#2f3a1c" />
        <circle cx="458" cy="210" r="7" fill="#2f3a1c" />
        <rect x="198" y="152" width="288" height="26" rx="13" fill="#f3ede3" stroke="#2b3220" strokeOpacity="0.3" />
      </g>

      {/* head end: shoulder blocks and headrest */}
      <g {...group("headrest")}>
        <rect x="436" y="128" width="12" height="26" rx="4" fill="#2f3a1c" {...halo("headrest")} />
        <rect x="454" y="128" width="12" height="26" rx="4" fill="#2f3a1c" {...halo("headrest")} />
        <rect x="474" y="132" width="52" height="20" rx="10" fill="#e6dcc6" stroke={active === "headrest" ? "#b08d3c" : "#2b3220"} strokeOpacity={active === "headrest" ? 1 : 0.3} strokeWidth={active === "headrest" ? 3 : 1} />
      </g>

      {/* foot end: footbar on its posts */}
      <g {...group("footbar")}>
        <rect x="86" y="118" width="12" height="98" rx="5" fill="#2f3a1c" {...halo("footbar")} />
        <rect x="62" y="104" width="64" height="16" rx="8" fill="#5e4b20" {...halo("footbar")} />
      </g>

      {/* pulley post, ropes and handles */}
      <g {...group("straps")}>
        <rect x="132" y="66" width="10" height="150" rx="5" fill="#2f3a1c" {...halo("straps")} />
        <circle cx="137" cy="62" r="11" fill="#f3ede3" stroke="#2f3a1c" strokeWidth="3" />
        <path d="M137 72C172 82 224 108 262 150M137 72C168 92 262 118 304 152" fill="none" stroke="#5e4b20" strokeWidth="3" strokeLinecap="round" />
        <circle cx="262" cy="152" r="9" fill="#c4a96a" stroke={active === "straps" ? "#b08d3c" : "#2f3a1c"} strokeWidth="3" />
        <circle cx="304" cy="153" r="9" fill="#c4a96a" stroke={active === "straps" ? "#b08d3c" : "#2f3a1c"} strokeWidth="3" />
      </g>
    </svg>
  );
}

export function ClassesReformer() {
  const [active, setActive] = React.useState<PartId>("carriage");
  const current = parts.find((p) => p.id === active) ?? parts[0];

  return (
    <section data-header-theme="light" className="relative w-full bg-mint px-3 pb-3 pt-10 text-ink sm:px-6 sm:pt-14 lg:px-10 lg:pt-20">
      <div className="rounded-[36px] bg-plaster px-6 py-14 sm:rounded-[48px] sm:px-10 sm:py-20 lg:rounded-[64px] lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <Reveal>
                <Eyebrow>New to the machine?</Eyebrow>
              </Reveal>
              <motion.h2 {...wipeProps} className="mt-5 font-display text-[40px] font-light leading-[1.1] tracking-normal sm:text-[54px] lg:text-[68px]">
                <SparkText>Meet the reformer.</SparkText>
              </motion.h2>
            </div>
            <Reveal delay={0.2}>
              <p className="max-w-sm font-sans text-[15px] font-light leading-relaxed text-ink-muted sm:text-[16.5px]">
                It looks technical and is not. Five parts, each doing one simple thing. Point at one to see it.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-14">
            {/* the drawing, with a name tag over the part that is lit */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: EASE }}
              className="relative rounded-[28px] bg-mint px-3 pb-4 pt-8 sm:rounded-[36px] sm:px-6 sm:pb-6 sm:pt-10 lg:col-span-7"
            >
              <div className="relative">
                <ReformerDrawing active={active} onPick={setActive} />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  {parts.map((p) => (
                    <span
                      key={p.id}
                      style={{ left: `${((p.label[0] - VB.x) / VB.w) * 100}%`, top: `${((p.label[1] - VB.y) / VB.h) * 100}%` }}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 font-sans text-[9.5px] font-medium uppercase tracking-[0.16em] text-white transition-all duration-500 sm:text-[10.5px]",
                        active === p.id ? "scale-100 opacity-100" : "scale-90 opacity-0"
                      )}
                    >
                      {p.name.replace("The ", "").replace(" and shoulder blocks", "")}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* the parts: a list you can point at or tap */}
            <div className="lg:col-span-5">
              <div role="tablist" aria-label="Parts of the reformer" className="flex flex-col">
                {parts.map((p) => {
                  const on = p.id === active;
                  return (
                    <div key={p.id} className="border-t border-ink/10 last:border-b">
                      <button
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => setActive(p.id)}
                        onPointerEnter={(e) => e.pointerType === "mouse" && setActive(p.id)}
                        className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                      >
                        <span className={cn("font-title text-[24px] font-normal leading-none tracking-[-0.01em] transition-colors duration-300 sm:text-[28px]", on ? "text-ink" : "text-ink/50 group-hover:text-ink/80")}>
                          {p.name}
                        </span>
                        <span aria-hidden className={cn("h-1.5 rounded-full bg-spark transition-all duration-500 ease-out", on ? "w-6 opacity-100" : "w-1.5 opacity-30")} />
                      </button>
                      <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out", on ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                        <div className="overflow-hidden">
                          <p className="max-w-md pb-5 font-sans text-[14px] font-light leading-relaxed text-ink-muted">{p.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="sr-only" aria-live="polite">
                {current.name}: {current.text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
