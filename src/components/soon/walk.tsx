"use client";

import * as React from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { EASE_DOOR, EASE_OUT } from "@/components/intro/fly";
import { FOREST, GOLD } from "@/components/intro/palette";
import { PHOTO, TopBar, WaitlistForm } from "@/components/soon/shared";

/* THE COMING-SOON PAGE: WALK THROUGH. A small arched door stands on sage, with the studio visible in it. As the visitor
   scrolls, the arch grows until it is the whole screen (the studio), and in that room another small arch appears: the next
   door. Studio, mat, reformer, and then the last door opens onto the email form. It is the building, walked through one arch
   at a time, and it uses the same arch-that-grows move as the site's entrance. */

type RoomData = { photo: string; portrait?: string; no: string; title: string; line: string };
const ROOMS: RoomData[] = [
  // (the studio keeps its wide photograph on phones too: its middle strip is the arch with the woman walking through it)
  { photo: PHOTO.doorway, no: "01", title: "The studio", line: "Movement with intention. Strength with soul." },
  { photo: PHOTO.mat, portrait: PHOTO.matPortrait, no: "02", title: "Mat", line: "Your own body and breath, on the floor." },
  { photo: PHOTO.reformer, portrait: PHOTO.reformerPortrait, no: "03", title: "Reformer", line: "The machine adds springs for resistance and support." },
];

/* A room's photograph: the wide one, or on a screen that is taller than it is wide (a phone, or a tablet held upright) the
   portrait one, which fills that shape. The browser picks by itself, and again if the device is turned. */
function RoomPhoto({ room }: { room: RoomData }) {
  return (
    <picture className="block h-full w-full">
      {room.portrait && <source media="(max-aspect-ratio: 4/5)" srcSet={room.portrait} />}
      <motion.img src={room.photo} alt="" draggable={false} className="h-full w-full select-none object-cover" />
    </picture>
  );
}
const LAST = ROOMS.length; // the last room is the form
const START = -0.06; // where the first door is born (before the page starts, so it is already there)
const GAP = 0.27; // how much of the scroll each room takes
const BORN = 0.05; // how long a door takes to appear
const GROW_AT = 0.07; // when, after it appears, a door starts to grow
const GROW = 0.14; // how long it takes to grow

/* THE ENTRANCE builds the first screen, so it ends exactly where the page begins (nothing jumps). On the plain sage a forest
   door rises out of the ground, then swings open away from the visitor on its left hinge, slowly and with real weight, to show
   the studio inside the arch; then the logo, the words and the hint arrive, each with a hard-edged wipe. Scrolling is held
   until it is over. It plays once per browser tab, never with reduced motion, and adding ?intro to the address plays it again.
   These are seconds after it starts. */
const SEEN_KEY = "evoa-soon-intro";
const SWING = 3.0; // how long the door takes to swing open
const T = { door: 0.15, swing: 1.1, bar: 3.0, kicker: 3.1, title: 3.2, hint: 3.9, end: 4.6 };

/* How the door moves, as an angle in degrees (0 closed, 90 square to the wall), with the time of each stage as a share of SWING:
   a little push that frees the latch (it moves a hair and stops), a pause, then the real push: it starts slowly, picks up speed,
   and carries on past square to the wall, slowing as friction and the hinge take the energy away; it meets its stop, recoils a
   little, and settles. Past 90 degrees its face turns away from the viewer, so it is gone, leaving only its edge. */
const SWING_ANGLES = [0, 2.2, 2.2, 97, 91, 92.5];
const SWING_TIMES = [0, 0.1, 0.17, 0.8, 0.92, 1];
const SWING_EASE: ("easeOut" | "linear" | "easeInOut" | [number, number, number, number])[] = ["easeOut", "linear", [0.5, 0, 0.2, 1], "easeInOut", "easeInOut"];
type Intro = "pending" | "play" | "done"; // pending: the first paint (everything hidden); done: finished, or skipped

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 16 * t ** 5 : 1 - (-2 * t + 2) ** 5 / 2);

/* the width of a door. It is a CSS expression, not a measured number, so the arches are right from the very first paint on any
   screen and follow the window by themselves. */
const DOOR = "min(300px, 60vw, 29dvh)";

/* The window of room k at scroll position p: it appears as a small arched door, then grows to fill the screen. Every edge is a
   calc() expression: half a door width in from the sides, three quarters of a door width (half the door's height) in from the
   top and bottom, all shrinking to zero as it grows. The same edges size both the arch-shaped clip AND the photograph's own
   box, so the photograph always exactly fills the window: it is fitted to the little door at first (the whole scene, the way
   you would see it through a real doorway) and grows with the window until it fills the screen, as if walking toward it.
   (Before, the photograph was always full-screen and the small door only showed its middle, which was a close-up of the
   woman's back.) */
function geom(p: number, k: number) {
  const s = START + k * GAP;
  const born = clamp01((p - s) / BORN);
  if (born <= 0) return { side: "50%", end: "50%", r: "0px" }; // not there yet
  const scale = 0.55 + 0.45 * easeOut(born);
  const rest = (1 - easeInOut(clamp01((p - s - GROW_AT) / GROW))).toFixed(4); // 1 while a small door, 0 once it fills the screen
  const halfW = `${DOOR} * ${(scale / 2).toFixed(4)}`;
  const halfH = `${DOOR} * ${(scale * 0.75).toFixed(4)}`;
  return {
    side: `calc((50% - ${halfW}) * ${rest})`,
    end: `calc((50% - ${halfH}) * ${rest})`,
    r: `calc(${halfW} * ${rest})`,
  };
}

/* a line of text that rises from behind its own edge as the room arrives. The edge is a clip-path that reaches a little past the
   line (room for the tails of g, j, p and y), not overflow-hidden, which cut them off; so the hidden position is far enough down
   (135%) to stay behind that edge. */
function Rise({ p, from, to, className, children }: { p: MotionValue<number>; from: number; to: number; className?: string; children: React.ReactNode }) {
  const y = useTransform(p, [from, to], ["135%", "0%"]);
  return (
    <span className="block" style={{ clipPath: "inset(-0.1em -0.2em -0.28em -0.2em)" }}>
      <motion.span className={`block ${className ?? ""}`} style={{ y }}>
        {children}
      </motion.span>
    </span>
  );
}

/* a line of text that rises from behind its own edge when the entrance reaches it (same edge as Rise, for the same reason) */
function In({ on, instant, delay, className, children }: { on: boolean; instant: boolean; delay: number; className?: string; children: React.ReactNode }) {
  return (
    <span className="block" style={{ clipPath: "inset(-0.1em -0.2em -0.28em -0.2em)" }}>
      <motion.span
        className={`block ${className ?? ""}`}
        initial={{ y: "135%" }}
        animate={{ y: on ? "0%" : "135%" }}
        transition={{ duration: instant ? 0 : 1.1, delay: instant ? 0 : delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Room({ k, p, hidden = false }: { k: number; p: MotionValue<number>; hidden?: boolean }) {
  const clipPath = useTransform(p, (v) => {
    const g = geom(v, k);
    return `inset(${g.end} ${g.side} ${g.end} ${g.side} round ${g.r} ${g.r} 0px 0px)`;
  });
  const side = useTransform(p, (v) => geom(v, k).side);
  const end = useTransform(p, (v) => geom(v, k).end);
  const s = START + k * GAP;
  const grown = s + GROW_AT + GROW; // the scroll position where this room has filled the screen
  const room = ROOMS[k];
  // the last room's form only shows once the room has filled the screen (not in the little door it starts as)
  const formOpacity = useTransform(p, (v) => clamp01((v - (grown - 0.04)) / 0.02));

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath, backgroundColor: FOREST, opacity: hidden ? 0 : 1 }}>
      {room ? (
        <>
          {/* the photograph's box is the same size as the window, and the picture covers it */}
          <motion.div className="absolute overflow-hidden" style={{ top: end, bottom: end, left: side, right: side }}>
            <RoomPhoto room={room} />
          </motion.div>
          {/* a flat tint so the words read on the photograph; a little more on a tall screen, where they sit over more picture */}
          <div className="absolute inset-0 bg-forest/22 portrait:bg-forest/32" />
          <div className="absolute inset-x-0 bottom-0 px-6 pb-[16dvh] text-bone sm:px-12 sm:pb-[14dvh]">
            <Rise p={p} from={grown - 0.04} to={grown + 0.02} className="font-sans text-[11px] font-medium uppercase tracking-[0.36em]">
              {room.no}
            </Rise>
            <Rise p={p} from={grown - 0.035} to={grown + 0.03} className="mt-2 font-display text-[clamp(44px,9vw,120px)] leading-[1.02]">
              {room.title}
            </Rise>
            <Rise p={p} from={grown - 0.03} to={grown + 0.04} className="mt-3 max-w-[34ch] font-sans text-[15px] font-light leading-relaxed text-bone/90 sm:text-[17px]">
              {room.line}
            </Rise>
          </div>
        </>
      ) : (
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center text-mint" style={{ opacity: formOpacity }}>
          <Rise p={p} from={grown - 0.04} to={grown + 0.02} className="font-sans text-[11px] font-medium uppercase tracking-[0.36em]">
            The last door
          </Rise>
          <Rise p={p} from={grown - 0.035} to={grown + 0.03} className="mt-3 font-display text-[clamp(36px,7vw,84px)] leading-[1.05]">
            Be first through it.
          </Rise>
          <Rise p={p} from={grown - 0.03} to={grown + 0.04} className="mb-8 mt-3 font-sans text-[14px] font-light tracking-wide text-mint/80">
            Houston, Texas. Opening soon.
          </Rise>
          <WaitlistForm tone="dark" />
        </motion.div>
      )}
    </motion.div>
  );
}

/* for visitors who prefer reduced motion: the same rooms, one under the other */
function StaticWalk() {
  return (
    <div data-soon-page className="bg-mint text-forest">
      <TopBar />
      <div className="flex min-h-[100dvh] flex-col items-center justify-center px-6 text-center">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.42em]">Evolution of Awareness</p>
        <h1 className="mt-2 font-display text-[clamp(40px,8vw,84px)] leading-[1.05]">Opening soon.</h1>
      </div>
      {ROOMS.map((r) => (
        <div key={r.no} className="relative flex min-h-[80dvh] items-end overflow-hidden bg-forest px-6 pb-14 text-bone sm:px-12">
          <div className="absolute inset-0">
            <RoomPhoto room={r} />
          </div>
          <div className="absolute inset-0 bg-forest/35" />
          <div className="relative">
            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.36em]">{r.no}</p>
            <h2 className="mt-2 font-display text-[clamp(40px,8vw,100px)] leading-[1.02]">{r.title}</h2>
            <p className="mt-3 max-w-[34ch] font-sans text-[16px] font-light">{r.line}</p>
          </div>
        </div>
      ))}
      <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-forest px-5 text-center text-mint">
        <h2 className="mb-8 font-display text-[clamp(34px,6vw,72px)] leading-[1.05]">Be first through it.</h2>
        <WaitlistForm tone="dark" />
      </div>
    </div>
  );
}

export function Walk() {
  const reduce = useReducedMotion();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const { scrollYProgress: p } = useScroll({ target: stageRef, offset: ["start start", "end end"] });

  useMotionValueEvent(p, "change", (v) => {
    const idx = Math.min(LAST, Math.max(0, Math.floor((v - START + 0.02) / GAP)));
    setActive((a) => (a === idx ? a : idx));
  });

  const hintOpacity = useTransform(p, [0, 0.06], [1, 0]);

  // the entrance: decided once after the first paint, then run on a timeline
  const [intro, setIntro] = React.useState<Intro>("pending");
  const [swing, setSwing] = React.useState(false); // the door has started to swing
  const angle = useMotionValue(0); // how far the entrance door is open, in degrees
  const edge = useMotionValue(1); // how visible the door's edge is (it fades at the very end)
  const shade = useTransform(angle, [0, 90], [0, 0.6]); // the face gets darker as it turns away from the light

  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const replay = new URLSearchParams(window.location.search).has("intro");
      let seen = false;
      try {
        seen = !!window.sessionStorage.getItem(SEEN_KEY);
      } catch {
        /* storage blocked: treat the visit as new */
      }
      if (reduceMotion || (seen && !replay)) {
        setIntro("done");
        return;
      }
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      setIntro("play");
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // while it plays the page is held at the top and cannot be scrolled (a reload or ?intro while scrolled would otherwise have
  // the browser restore the old position under it); when it ends, everything is released
  React.useEffect(() => {
    if (intro !== "play") return;
    const stop = (e: Event) => {
      e.preventDefault();
      e.stopImmediatePropagation(); // the smooth-scroll library listens to the wheel too, so stop it before it sees it
    };
    const stopKeys = (e: KeyboardEvent) => {
      if ([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) e.preventDefault();
    };
    const opts = { capture: true, passive: false } as const;
    window.addEventListener("wheel", stop, opts);
    window.addEventListener("touchmove", stop, opts);
    window.addEventListener("keydown", stopKeys);
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const keepTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", keepTop);
    const swingTimer = window.setTimeout(() => setSwing(true), T.swing * 1000);
    const endTimer = window.setTimeout(() => setIntro("done"), T.end * 1000);
    return () => {
      window.removeEventListener("wheel", stop, opts);
      window.removeEventListener("touchmove", stop, opts);
      window.removeEventListener("keydown", stopKeys);
      window.removeEventListener("scroll", keepTop);
      window.history.scrollRestoration = restoration === "manual" ? "auto" : restoration;
      window.clearTimeout(swingTimer);
      window.clearTimeout(endTimer);
    };
  }, [intro]);

  // the door swings open once the entrance says so
  React.useEffect(() => {
    if (!swing) return;
    const a = animate(angle, SWING_ANGLES, { duration: SWING, times: SWING_TIMES, ease: SWING_EASE });
    const e = animate(edge, [1, 1, 0], { duration: SWING, times: [0, 0.86, 1], ease: "linear" });
    return () => {
      a.stop();
      e.stop();
    };
  }, [swing, angle, edge]);

  if (reduce) return <StaticWalk />;

  const on = intro !== "pending"; // the entrance has started (or was skipped)
  const instant = intro === "done"; // skipped, or over: no motion
  const firstDoorShown = intro === "done" || swing; // the first door's picture is visible once the door starts to swing

  return (
    <div data-soon-page ref={stageRef} className="relative h-[720dvh] bg-mint">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-mint text-forest">
        <TopBar tone={active === 0 ? "light" : "dark"} show={on} delay={T.bar} instant={instant} />

        {/* the first screen: the first door, with the words round it */}
        <motion.div className="absolute inset-x-0 top-[13dvh] text-center sm:top-[11dvh]" style={{ opacity: hintOpacity }}>
          <p className="font-sans text-[10px] font-medium uppercase tracking-[0.42em] sm:text-[11px]">
            <In on={on} instant={instant} delay={T.kicker}>
              Evolution of Awareness
            </In>
          </p>
          <h1 className="mt-2">
            <In on={on} instant={instant} delay={T.title} className="font-display text-[clamp(34px,6vw,64px)] leading-[1.05]">
              Opening soon.
            </In>
          </h1>
        </motion.div>
        <motion.p className="absolute inset-x-0 bottom-[17dvh] text-center font-sans text-[11px] font-medium uppercase tracking-[0.34em]" style={{ opacity: hintOpacity }}>
          <In on={on} instant={instant} delay={T.hint}>
            Scroll to step through
          </In>
        </motion.p>

        {Array.from({ length: LAST + 1 }, (_, k) => (
          <Room key={k} k={k} p={p} hidden={k === 0 && !firstDoorShown} />
        ))}

        {/* the entrance's door: the frame covers the first door exactly (same size, same place) and rises out of the ground. In it
            hangs a real door in 3D, hinged on its left, that swings open AWAY from the visitor (into the studio), so it stays
            inside the opening. As it turns, its face darkens and its edge (the thickness of the door) comes into view. When it
            is open and gone, the real first door is there, unchanged. */}
        {intro === "play" && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 top-1/2 z-10 overflow-hidden"
            style={{
              width: DOOR,
              height: `calc(${DOOR} * 1.5)`,
              marginLeft: `calc(${DOOR} / -2)`,
              marginTop: `calc(${DOOR} * -0.75)`,
              borderRadius: `calc(${DOOR} / 2) calc(${DOOR} / 2) 0 0`,
              perspective: `calc(${DOOR} * 3.4)`,
            }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 0.95, delay: T.door, ease: EASE_DOOR }}
          >
            <motion.div className="absolute inset-0" style={{ transformOrigin: "0% 50%", transformStyle: "preserve-3d", rotateY: angle }}>
              {/* the face: an ARCH, like the opening it hangs in (so its curved top turns with it, and never becomes a flat slanted
                  edge): forest, two flat panels and a gold knob (the way a mid-century door is made), and a flat shade on top */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ backgroundColor: FOREST, backfaceVisibility: "hidden", borderRadius: `calc(${DOOR} / 2) calc(${DOOR} / 2) 0 0` }}
              >
                <div className="absolute inset-x-[14%] top-[12%] h-[34%] rounded-t-full border border-[#3a4724]" />
                <div className="absolute inset-x-[14%] bottom-[8%] h-[38%] border border-[#3a4724]" />
                <div className="absolute right-[10%] top-1/2 h-4 w-4 -translate-y-1/2 rounded-full" style={{ backgroundColor: GOLD }} />
                <motion.div className="absolute inset-0 bg-black" style={{ opacity: shade }} />
              </div>
              {/* the edge: the thickness of the door, standing square to the face on its free side, going back into the room. It
                  starts where the arch springs (half a door width down), because above that the door's side is the curve. */}
              <motion.div
                className="absolute bottom-0 right-0"
                style={{ top: `calc(${DOOR} / 2)`, width: 12, backgroundColor: "#141a0a", transformOrigin: "100% 50%", rotateY: -90, opacity: edge }}
              />
            </motion.div>
          </motion.div>
        )}

        {/* where you are: one small arch per room */}
        <motion.div
          aria-hidden
          className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2 sm:right-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: instant ? 0 : 0.6, delay: instant ? 0 : T.hint }}
        >
          {Array.from({ length: LAST + 1 }, (_, i) => (
            <span key={i} className={`block h-4 w-2.5 rounded-t-full border transition-colors duration-300 ${i === active ? "border-spark-bright bg-spark-bright" : "border-white/80 mix-blend-difference"}`} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
