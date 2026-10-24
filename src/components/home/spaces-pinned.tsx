"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { SparkText } from "@/components/ui/spark-text";
import { Reveal, wipeProps } from "@/components/ui/reveal";

interface SpaceItem {
  id: string;
  name: string;
  system: string;
  specs: string;
  description: string;
  image: string;
}

const spaces: SpaceItem[] = [
  {
    id: "reform-room",
    name: "The Reform Room.",
    system: "Musculoskeletal & Spinal Decompression",
    specs: "Eight custom reformers · Natural timber frames · Low-friction glide",
    description:
      "Spring-loaded carriage sequencing tailored for core stabilization, joint articulation, and deep functional strength without impact.",
    image: "/assets/Sunlit Pilates Studio with Wooden Reformers.webp",
  },
  {
    id: "mat-vault",
    name: "The Mat Vault.",
    system: "Deep Core & Diaphragmatic Breath Integration",
    specs: "Acoustically isolated · Zero mirrors · Supportive dense matting",
    description:
      "Floor-bound discipline engaging the intrinsic stabilizers through unhurried classical sequences and rhythm-driven breathwork.",
    image: "/assets/Serene Symmetrical Pilates Studio.webp",
  },
  {
    id: "recovery-bar",
    name: "The Recovery Bar.",
    system: "Cellular Hydration & Autonomic Nervous System",
    specs: "Travertine bar · Adaptogenic infusions · Cold-pressed botanicals",
    description:
      "Post-movement apothecary bar designed to regulate cortisol, replenish vital electrolytes, and transition your nervous system into ease.",
    image: "/assets/Sunlit Organic Cafe Bar.webp",
  },
  {
    id: "quiet-room",
    name: "The Quiet Room.",
    system: "Central Nervous System & Somatic Stillness",
    specs: "Zero digital devices · Weighted oatmeal linen · Diffused warmth",
    description:
      "A private decompression lounge engineered for uninterrupted stillness, letting your body absorb and integrate the work of the studio.",
    image: "/assets/Sunlit Olive Green Lounge Corner.webp",
  },
];

/* Previous pinned-stage version of The Spaces (photo on the left, room list on the right). Kept for reference, not
   used on the page: the live section is spaces.tsx (full-image tiles with text over them). */

/*
 * Two layouts share one component.
 *  - "pin"  (>=1024px wide AND >=600px tall): the stage pins to the viewport and scroll progress
 *    walks through the rooms. This must match the `pin` variant in globals.css.
 *  - everywhere else (phones, portrait tablets, landscape phones, short laptops): nothing pins.
 *    The photo is held just under the header while the room list scrolls past it, and the row
 *    crossing the line under the photo becomes the active room. Content is never clipped.
 */
const PIN_QUERY = "(min-width: 1024px) and (min-height: 600px)";
const SHORT_QUERY = "(max-height: 520px) and (orientation: landscape)";

/* Room name; the closing full stop turns red on the active room. */
function RoomName({ name, active }: { name: string; active: boolean }) {
  if (!name.endsWith(".")) return <>{name}</>;
  return (
    <>
      {name.slice(0, -1)}
      <span className={`transition-colors duration-300 ${active ? "text-spark" : ""}`}>.</span>
    </>
  );
}

export function SpacesPinned() {
  const containerRef = React.useRef<HTMLElement>(null);
  const bandRef = React.useRef<HTMLDivElement>(null);
  const rowRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [stuck, setStuck] = React.useState(false);

  const { scrollY } = useScroll();

  // Viewport Y that a row must reach to count as "current" in the non-pinned layout.
  const activationLine = React.useCallback(() => {
    if (window.matchMedia(SHORT_QUERY).matches) return window.innerHeight * 0.45;
    const band = bandRef.current;
    return (band ? band.getBoundingClientRect().bottom : 0) + 120;
  }, []);

  const update = React.useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    let next = 0;
    let isStuck = false;
    if (window.matchMedia(PIN_QUERY).matches) {
      const total = el.offsetHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -el.getBoundingClientRect().top / total)) : 0;
      next = Math.min(spaces.length - 1, Math.floor(progress * spaces.length));
    } else {
      const line = activationLine();
      rowRefs.current.forEach((row, i) => {
        if (row && row.getBoundingClientRect().top <= line) next = i;
      });
      const band = bandRef.current;
      if (band) {
        const offset = parseFloat(getComputedStyle(band).top) || 0;
        isStuck = Math.abs(band.getBoundingClientRect().top - offset) <= 2;
      }
    }
    setActiveIndex(next);
    setStuck(isStuck);
  }, [activationLine]);

  useMotionValueEvent(scrollY, "change", update);

  React.useEffect(() => {
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const currentSpace = spaces[activeIndex];

  const handleSelect = (idx: number) => {
    setActiveIndex(idx);
    const el = containerRef.current;
    if (!el) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    let target: number;
    if (window.matchMedia(PIN_QUERY).matches) {
      const totalScrollHeight = el.offsetHeight - window.innerHeight;
      target = scrollTop + el.getBoundingClientRect().top + (idx / (spaces.length - 1)) * totalScrollHeight;
    } else {
      const row = rowRefs.current[idx];
      if (!row) return;
      target = scrollTop + row.getBoundingClientRect().top - activationLine() + 4;
    }
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="spaces"
      data-header-theme="light"
      className="relative z-20 -mt-[100vh] -mt-[100dvh] w-full min-h-[100dvh] bg-mint text-ink overflow-x-clip rounded-t-[36px] sm:rounded-t-[48px] md:rounded-t-[64px] shadow-none border-none pin:h-[260vh]"
    >
      {/* Non-pinned layouts: while the photo is held, rows scroll beneath the (transparent) header,
          so a mint cover keeps the logo and menu button on a clean surface. */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-x-0 top-0 z-20 h-[64px] bg-mint transition-opacity duration-200 md:h-[72px] short:h-[84px] pin:hidden ${
          stuck ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Stage: pinned full-viewport on large screens, ordinary flowing content everywhere else */}
      <div className="relative z-10 flex w-full flex-col px-6 pt-24 pb-10 sm:px-10 sm:pt-28 md:px-14 lg:px-20 pin:sticky pin:top-0 pin:h-[100dvh] pin:justify-between pin:overflow-hidden pin:pt-[clamp(84px,12dvh,112px)] pin:pb-[clamp(16px,4dvh,48px)]">
        {/* Top Section Header - Matching 'The Experience' */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 pb-3 sm:pb-6 shrink-0">
          <div className="flex flex-col">
            <motion.h2 {...wipeProps} className="font-display text-[40px] sm:text-[54px] md:text-[68px] pin:[font-size:clamp(40px,8.2dvh,76px)] text-ink tracking-normal leading-[1.1]">
              <SparkText>The Spaces.</SparkText>
            </motion.h2>
          </div>

          <Reveal delay={0.25}>
            <p className="font-sans font-light text-[11.5px] sm:text-[12.5px] tracking-[0.24em] text-ink-muted uppercase">
              Architectures of Regulation
            </p>
          </Reveal>
        </div>

        {/* Photo + room list: side by side when pinned (or landscape-short), stacked otherwise */}
        <div className="mt-3 flex w-full flex-col items-stretch short:flex-row short:items-start short:gap-8 pin:my-auto pin:mt-0 pin:flex-1 pin:flex-row pin:items-center pin:justify-between pin:gap-[clamp(40px,6vw,96px)] pin:py-4">
          {/* Dynamic space photo. Non-pinned: held under the header while the list scrolls past. */}
          <div
            ref={bandRef}
            className="sticky top-[64px] z-20 flex w-full shrink-0 items-center justify-center bg-mint pt-2 pb-3 after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:h-5 after:bg-gradient-to-b after:from-mint after:to-transparent md:top-[72px] short:top-[84px] short:w-[42%] short:bg-transparent short:p-0 short:after:hidden pin:static pin:w-[46%] pin:bg-transparent pin:p-0 pin:after:hidden"
          >
            <div
              className="relative h-[clamp(150px,32dvh,340px)] w-full overflow-hidden rounded-2xl bg-ink/5 sm:h-[clamp(200px,34dvh,380px)] sm:rounded-3xl short:h-[min(calc(100dvh-132px),300px)] pin:aspect-[16/11] pin:h-auto pin:max-h-[56dvh]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSpace.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentSpace.image}
                    alt={currentSpace.name}
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Room list: accordion when pinned, always-open rows (no layout shift) otherwise */}
          <div className="mt-5 flex w-full flex-col justify-center pb-[max(10dvh,calc(74dvh_-_400px))] sm:pb-[max(10dvh,calc(72dvh_-_408px))] short:mt-0 short:min-w-0 short:flex-1 short:pb-[30dvh] pin:mt-0 pin:w-[54%] pin:pb-0">
            <div className="w-full flex flex-col">
              {spaces.map((space, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={space.id}
                    ref={(node) => {
                      rowRefs.current[idx] = node;
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    onClick={() => handleSelect(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelect(idx);
                      }
                    }}
                    className="border-t border-ink/10 py-5 pin:py-[clamp(8px,1.8dvh,20px)] cursor-pointer group outline-none transition-colors duration-300 focus-visible:bg-ink/5"
                  >
                    {/* Item Row: Headline */}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3
                        className={`font-title text-[34px] min-[380px]:text-[38px] sm:text-[50px] md:text-[60px] short:text-[30px] pin:[font-size:clamp(38px,min(7.6dvh,5vw),84px)] leading-[1.05] tracking-[-0.01em] transition-colors duration-400 select-none ${
                          isActive
                            ? "text-ink font-normal"
                            : "text-ink/30 font-normal group-hover:text-ink/60"
                        }`}
                      >
                        <RoomName name={space.name} active={isActive} />
                      </h3>
                    </div>

                    {/* Non-pinned: description is always present so rows never change height mid-scroll */}
                    <p
                      className={`mt-3 max-w-md pr-2 font-sans font-light text-[14px] sm:text-[15.5px] leading-relaxed transition-colors duration-300 pin:hidden ${
                        isActive ? "text-ink/70" : "text-ink/45"
                      }`}
                    >
                      {space.description}
                    </p>

                    {/* Pinned: smooth accordion expansion for the active item */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="hidden overflow-hidden pr-4 pin:flex pin:flex-col"
                        >
                          <p className="font-sans font-light text-[14px] sm:text-[15.5px] pin:[font-size:clamp(13.5px,1.9dvh,16px)] text-ink/70 leading-relaxed max-w-md">
                            {space.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              {/* Bottom Closing Line */}
              <div className="border-t border-ink/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
