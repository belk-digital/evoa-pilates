"use client";

import * as React from "react";
import { DoorwayIntro } from "@/components/intro/doorway";

/* The home page's entrance: "the Doorway" (components/intro/doorway.tsx), a full-screen overlay that ends by handing its
   letters to the hero's giant "evoa". The hero reads this context to know when to reveal its own text and letters.

   It plays once per visit (per browser tab), only on the home page, and never for anyone who has asked for reduced motion
   (they get the page at once, with no movement). Adding ?intro to the address plays it again, for review.
   A small script in the layout makes the same decision before the first paint, so the page is already covered when the
   entrance is going to play (see globals.css) and never flashes. */
const SEEN_KEY = "evoa-intro";

type State = {
  /** pending: not decided yet (the first render); playing: the overlay is running; done */
  phase: "pending" | "playing" | "done";
  /** the hero's text and button may begin to appear */
  content: boolean;
  /** the hero's giant letters: held back while the overlay owns them, then shown, or rising by themselves */
  letters: "hidden" | "rise" | "show";
  /** the door has opened (the studio photograph starts to push in) */
  opened: boolean;
  /** reduced motion: everything appears at once */
  instant: boolean;
};

export interface IntroApi {
  /** the hero registers its four giant letters here, so the overlay can fly onto them */
  letterEls: React.MutableRefObject<(HTMLElement | null)[]>;
  markOpen: () => void;
  startContent: () => void;
  showLetters: () => void;
  finish: () => void;
}

const NOOP_API: IntroApi = { letterEls: { current: [] }, markOpen: () => {}, startContent: () => {}, showLetters: () => {}, finish: () => {} };
const DONE: State = { phase: "done", content: true, letters: "rise", opened: true, instant: false };

const IntroContext = React.createContext<{ state: State; api: IntroApi }>({ state: DONE, api: NOOP_API });

export function useIntro() {
  return React.useContext(IntroContext);
}

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<State>({ phase: "pending", content: false, letters: "hidden", opened: false, instant: false });
  const letterEls = React.useRef<(HTMLElement | null)[]>([]);

  // decide, once, after the first paint (so the server and the browser agree on what they render)
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const replay = new URLSearchParams(window.location.search).has("intro");
      let seen = false;
      try {
        seen = !!window.sessionStorage.getItem(SEEN_KEY);
      } catch {
        /* storage blocked: treat the visit as new */
      }
      if (reduce) {
        document.documentElement.removeAttribute("data-intro");
        setState({ phase: "done", content: true, letters: "show", opened: true, instant: true });
      } else if (seen && !replay) {
        document.documentElement.removeAttribute("data-intro");
        setState(DONE);
      } else {
        try {
          window.sessionStorage.setItem(SEEN_KEY, "1");
        } catch {
          /* ignore */
        }
        document.documentElement.setAttribute("data-intro-playing", "1");
        setState({ phase: "playing", content: false, letters: "hidden", opened: false, instant: false });
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const api = React.useMemo<IntroApi>(
    () => ({
      letterEls,
      markOpen: () => setState((s) => ({ ...s, opened: true })),
      startContent: () => setState((s) => ({ ...s, content: true })),
      showLetters: () => setState((s) => ({ ...s, letters: "show" })),
      finish: () => {
        document.documentElement.removeAttribute("data-intro-playing");
        document.documentElement.removeAttribute("data-intro");
        setState((s) => ({ ...s, phase: "done", content: true, letters: "show", opened: true }));
      },
    }),
    []
  );

  // while the overlay plays, the page behind it does not scroll; and if anything ever goes wrong, it still ends
  React.useEffect(() => {
    if (state.phase !== "playing") return;
    // caught in the capture phase and stopped there, so the smooth-scroll library (which also listens for the wheel) never sees it
    const stop = (e: Event) => {
      e.preventDefault();
      e.stopImmediatePropagation();
    };
    const stopKeys = (e: KeyboardEvent) => {
      if ([" ", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End"].includes(e.key)) e.preventDefault();
    };
    const opts = { capture: true, passive: false } as const;
    window.addEventListener("wheel", stop, opts);
    window.addEventListener("touchmove", stop, opts);
    window.addEventListener("keydown", stopKeys);
    // the entrance always plays from the top of the page. A reload (or ?intro) while scrolled would otherwise have the browser
    // restore the old scroll position under the overlay, and the door would open onto the middle of the page. The layout's
    // head script already turns restoration off; this also holds the page at the top while the entrance plays.
    const restoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    const keepTop = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };
    window.addEventListener("scroll", keepTop);
    // the page was covered by CSS from the first paint; now that the overlay is up, that cover can go
    const uncover = requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.removeAttribute("data-intro")));
    const failsafe = window.setTimeout(() => api.finish(), 9000);
    return () => {
      window.removeEventListener("wheel", stop, opts);
      window.removeEventListener("touchmove", stop, opts);
      window.removeEventListener("keydown", stopKeys);
      window.removeEventListener("scroll", keepTop);
      window.history.scrollRestoration = restoration === "manual" ? "auto" : restoration;
      cancelAnimationFrame(uncover);
      window.clearTimeout(failsafe);
    };
  }, [state.phase, api]);

  const value = React.useMemo(() => ({ state, api }), [state, api]);

  return (
    <IntroContext.Provider value={value}>
      {children}
      {state.phase === "playing" && <DoorwayIntro api={api} />}
    </IntroContext.Provider>
  );
}
