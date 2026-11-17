import { animate } from "framer-motion";
import type { IntroApi } from "@/components/intro/intro-context";

/* Expo in-out: almost still, a long smooth rush, almost still again. The door and the letters move on this. */
export const EASE_DOOR: [number, number, number, number] = [0.87, 0, 0.13, 1];
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* The end of the entrance: the four letters travel onto the four letters of the giant "evoa" in the hero (same place, same
   size), so what has been playing becomes the page itself.

   They do not slide in a straight line. Across drifts slowly out and in, while down drops quickly and settles, so each letter
   follows a curve, and at the end it is exactly on the hero's.

   The letters are clipped at the top edge of the card that overlaps the hero, so as they come to rest the lower part sinks
   behind that edge exactly as the real letters do. Then the hero's own letters are shown in their place, and the overlay is
   removed one frame later, so there is no pop. */
export async function handoff(
  api: IntroApi,
  from: (HTMLElement | null)[],
  layer: HTMLElement | null,
  opts: { duration?: number; delay?: number; stagger?: number } = {}
) {
  const { duration = 1.35, delay = 0, stagger = 0.07 } = opts;
  const to = api.letterEls.current;

  const card = document.getElementById("philosophy");
  // the layer fills the area inside the scrollbars, so measure that (window.innerHeight also counts a horizontal scrollbar)
  const viewH = document.documentElement.clientHeight;
  const cardTop = card ? card.getBoundingClientRect().top : viewH;
  if (layer) layer.style.clipPath = `inset(0 0 ${Math.max(0, viewH - cardTop)}px 0)`;

  const jobs: Promise<void>[] = [];
  from.forEach((el, i) => {
    const target = to[i];
    if (!el || !target) return;
    const a = el.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const at = delay + i * stagger;
    jobs.push(animate(el, { x: b.left + b.width / 2 - (a.left + a.width / 2) }, { duration, delay: at, ease: [0.65, 0, 0.35, 1] }).then(() => undefined));
    jobs.push(animate(el, { y: b.top + b.height / 2 - (a.top + a.height / 2) }, { duration, delay: at, ease: [0.22, 1, 0.36, 1] }).then(() => undefined));
    jobs.push(animate(el, { scale: b.height / a.height }, { duration, delay: at, ease: EASE_DOOR }).then(() => undefined));
  });
  await Promise.all(jobs);

  api.showLetters();
  await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  api.finish();
}
