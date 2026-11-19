"use client";

import * as React from "react";
import { motion } from "framer-motion";
import type { IntroApi } from "@/components/intro/intro-context";
import { EASE_DOOR } from "@/components/intro/fly";
import { SAGE } from "@/components/intro/palette";

/* The entrance uses only what carries over into the hero, so nothing is lost on the way: the arch door (its window is the hero
   photograph itself), and the sage of the cover, which is the colour of the section below the hero: the cover is not wiped
   away, it is left behind as that section.

   Timeline, in ms after the overlay appears:
     0            flat sage, the same as the section below the hero
     OPEN_AT      the door leaf lifts like a shutter (LEAF_S), showing the studio inside an arch
     +GROW_AFTER  the arch grows past the edges of the screen (GROW_S) until it is the hero, and the hero's headline rises
     +GROW_S      the overlay is removed (the arch has long since covered the whole screen, so nothing changes at that moment) */
const OPEN_AT = 350;
const LEAF_S = 0.7;
const GROW_AFTER = 1000; // ms after the door starts to open
const GROW_S = 1.3;
const PHOTO_WAIT = 4000; // ms: the longest the door waits for the studio photograph
const BLEED = 200; // px: how far the cover reaches past each edge of the screen

/* scale from the middle of the screen, so the arch grows around the point the door stands on */
const FROM_CENTRE = { transformBox: "view-box" as const, transformOrigin: "50% 50%" };

/* The door lifts onto the real hero, and the entrance only plays on a first visit, when the photograph is not cached yet. So the
   door waits until the photograph has loaded and decoded (never longer than `max` ms), so the arch can never open onto an empty
   dark screen on a slow connection. */
function heroPhotoReady(max: number): Promise<void> {
  const img = document.querySelector<HTMLImageElement>("section[data-header-theme='dark'] img");
  if (!img) return Promise.resolve();
  return new Promise((resolve) => {
    const cap = window.setTimeout(resolve, max);
    img
      .decode()
      .catch(() => undefined)
      .then(() => {
        window.clearTimeout(cap);
        resolve();
      });
  });
}

function layout(W: number, H: number) {
  // the door: as wide as the screen comfortably allows, one and a half times as tall as it is wide, centred on the screen
  const aw = Math.round(Math.min(340, Math.max(200, W * 0.2), H * 0.3));
  const doorH = aw * 1.5;
  const cx = W / 2;
  const topDoor = Math.round(H / 2 - doorH / 2);
  const bottom = topDoor + doorH;
  const r = aw / 2;
  // how far the arch must grow for its round top to cover the corners of the screen (with a margin)
  const u = (-0.25 * H + Math.sqrt(0.0625 * H * H + 0.1875 * (W * W + H * H))) / 0.375;
  return {
    W,
    H,
    door: `M${cx - r} ${bottom}V${topDoor + r}A${r} ${r} 0 0 1 ${cx + r} ${topDoor + r}V${bottom}Z`,
    // the door leaf: a slab a little bigger than the door, which lifts to show the studio behind it
    leaf: { x: cx - r - 2, y: topDoor - 2, w: aw + 4, h: doorH + 4 },
    grow: (1.25 * Math.max(u, W, 0.7 * H)) / aw,
  };
}

/* THE DOORWAY. The screen is flat sage, the colour of the section below the hero. A hidden door lifts like a shutter and the
   studio appears in an arch. The arch grows past the edges of the screen, pushing the studio photograph in, and the headline
   rises behind it. The sage cover is never wiped away: where the hero ends, the real section below it is the same sage, so the
   cover simply becomes that section. */
export function DoorwayIntro({ api }: { api: IntroApi }) {
  // the size of the area the overlay really fills: window.innerWidth also counts the scrollbar, which the fixed overlay does not cover
  const [g] = React.useState(() => layout(document.documentElement.clientWidth, document.documentElement.clientHeight));
  const [open, setOpen] = React.useState(false); // the door leaf lifts
  const [grow, setGrow] = React.useState(false); // the arch grows past the edges of the screen
  const [leaf, setLeaf] = React.useState(true); // the door leaf exists until it has lifted clear
  const maskId = React.useId().replace(/:/g, "");

  React.useEffect(() => {
    const timers: number[] = [];
    let cancelled = false;
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const t0 = performance.now();
    // the door opens after a short beat on the plain sage (OPEN_AT) and once the photograph has loaded, whichever is later
    void heroPhotoReady(PHOTO_WAIT).then(() => {
      if (cancelled) return;
      const wait = Math.max(0, OPEN_AT - (performance.now() - t0));
      at(wait, () => {
        setOpen(true);
        api.markOpen();
      });
      at(wait + GROW_AFTER, () => {
        setGrow(true);
        setLeaf(false);
      });
      at(wait + GROW_AFTER + 150, () => api.startContent());
      // the arch has covered the whole screen by now, so removing the overlay changes nothing that can be seen
      at(wait + GROW_AFTER + GROW_S * 1000 + 100, () => api.finish());
    });
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [api]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" aria-hidden>
      {/* the cover reaches well past the edges of the screen (and the svg may draw outside its box), so a rounding difference, a
          scrollbar or a resize while it plays can never leave a strip of the page showing */}
      <svg className="absolute inset-0 h-full w-full overflow-visible" width={g.W} height={g.H} viewBox={`0 0 ${g.W} ${g.H}`}>
        <defs>
          {/* the cover, with the door cut out of it: what shows through the door is the real page. The leaf (white) sits over the
              door until it lifts; once it has gone, the door is a window that grows until it is the whole screen */}
          <mask id={maskId} maskUnits="userSpaceOnUse" x={-BLEED} y={-BLEED} width={g.W + 2 * BLEED} height={g.H + 2 * BLEED}>
            <rect x={-BLEED} y={-BLEED} width={g.W + 2 * BLEED} height={g.H + 2 * BLEED} fill="white" />
            <motion.g style={FROM_CENTRE} initial={{ scale: 1 }} animate={{ scale: grow ? g.grow : 1 }} transition={{ duration: GROW_S, ease: EASE_DOOR }}>
              <path d={g.door} fill="black" />
            </motion.g>
            {leaf && (
              <motion.g initial={{ y: 0 }} animate={{ y: open ? -g.leaf.h : 0 }} transition={{ duration: LEAF_S, ease: EASE_DOOR }}>
                <rect x={g.leaf.x} y={g.leaf.y} width={g.leaf.w} height={g.leaf.h} fill="white" />
              </motion.g>
            )}
          </mask>
        </defs>
        <rect x={-BLEED} y={-BLEED} width={g.W + 2 * BLEED} height={g.H + 2 * BLEED} fill={SAGE} mask={`url(#${maskId})`} />
      </svg>
    </div>
  );
}
