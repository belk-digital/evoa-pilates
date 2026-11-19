"use client";

import * as React from "react";
import {
  Abril_Fatface,
  Cinzel,
  Cormorant_Garamond,
  DM_Sans,
  EB_Garamond,
  Instrument_Sans,
  Instrument_Serif,
  Italiana,
  Josefin_Sans,
  Jost,
  Karla,
  Lato,
  Lora,
  Marcellus,
  Merriweather,
  Open_Sans,
  Outfit,
  Playfair_Display,
  Source_Sans_3,
  Syne,
  Work_Sans,
  Yeseva_One,
  Young_Serif,
} from "next/font/google";
import { cn } from "@/lib/utils";

/* TEMPORARY, FOR CHOOSING THE SITE'S FONTS. A small button at the bottom right of the home page opens a list of font pairings;
   picking one changes the fonts of the WHOLE home page at once (the headings AND the text, as a pair), so it can be judged in
   place, and sent to the client to choose from. Other pages are not touched: leaving the home page puts the real fonts back.

   How it works: every font on the site goes through two CSS variables set on <html> (--font-primary-serif for headings and
   --font-montserrat for text), so this only has to swap those two, plus the size and weight the heading font needs. The choice is
   kept in the address (/?hf=playfair) and in the browser tab, and "Copy link" gives the client a link to send back.

   To remove it once a pairing is chosen: delete this file and its two lines in app/page.tsx; then apply the chosen pairing for
   real in app/layout.tsx.

   What is real and what is not: every font here is a real, free Google font, with one exception. Derivia is not a Google font
   (the pages it is offered on only give a personal-use licence) and its pair, Cochin, is Apple's paid system font, so that option
   shows a free stand-in (Cormorant Garamond). Real files with a web-font licence would replace it, with next/font/local.
   Fonts are not preloaded: a font is only fetched when its option is picked. */
const playfair = Playfair_Display({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", preload: false });
const merriweather = Merriweather({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", preload: false });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", preload: false });
const yeseva = Yeseva_One({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const abril = Abril_Fatface({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap", preload: false });
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap", preload: false });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], display: "swap", preload: false });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], display: "swap", preload: false });
const marcellus = Marcellus({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const lato = Lato({ subsets: ["latin"], weight: ["300", "400", "700"], display: "swap", preload: false });
const cinzel = Cinzel({ subsets: ["latin"], display: "swap", preload: false });
const sourceSans = Source_Sans_3({ subsets: ["latin"], display: "swap", preload: false });
const syne = Syne({ subsets: ["latin"], display: "swap", preload: false });
const dmSans = DM_Sans({ subsets: ["latin"], display: "swap", preload: false });
const lora = Lora({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", preload: false });
const garamond = EB_Garamond({ subsets: ["latin"], style: ["normal", "italic"], display: "swap", preload: false });
const workSans = Work_Sans({ subsets: ["latin"], display: "swap", preload: false });
const youngSerif = Young_Serif({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const karla = Karla({ subsets: ["latin"], display: "swap", preload: false });
const outfit = Outfit({ subsets: ["latin"], display: "swap", preload: false });
const italiana = Italiana({ subsets: ["latin"], weight: "400", display: "swap", preload: false });
const jost = Jost({ subsets: ["latin"], display: "swap", preload: false });

type Theme = {
  key: string;
  /** "Heading font + text font" */
  name: string;
  /** the feeling, in a few words */
  mood: string;
  note: string;
  /** the heading font (the site's --font-primary-serif); empty keeps the site's own */
  heading: string;
  /** the text font (the site's --font-montserrat); empty keeps Montserrat */
  body: string;
  /** the weight headings are set in */
  weight: number;
  /** a different font fills the line differently, so the hero headline's size is nudged to match the others */
  scale: number;
};

const REAL = "Both fonts are real and free (Google Fonts).";

const THEMES: Theme[] = [
  { key: "bodoni", name: "Bodoni Moda + Montserrat", mood: "The current look", note: "The site as it is now.", heading: "", body: "", weight: 400, scale: 1 },
  { key: "playfair", name: "Playfair Display + Montserrat", mood: "Classic luxury", note: REAL, heading: playfair.style.fontFamily, body: "", weight: 700, scale: 0.92 },
  { key: "merriweather", name: "Merriweather + Open Sans", mood: "Warm and very readable", note: REAL, heading: merriweather.style.fontFamily, body: openSans.style.fontFamily, weight: 400, scale: 0.84 },
  {
    key: "derivia",
    name: "Derivia + Cochin",
    mood: "Refined and light (stand-in)",
    note: "Shows Cormorant Garamond as a stand-in: Derivia is not a free web font and Cochin is Apple's paid font. Send the files with a web licence and I will use them.",
    heading: cormorant.style.fontFamily,
    body: "",
    weight: 500,
    scale: 1.14,
  },
  { key: "yeseva", name: "Yeseva One + Josefin Sans", mood: "Elegant display", note: REAL, heading: yeseva.style.fontFamily, body: josefin.style.fontFamily, weight: 400, scale: 0.92 },
  { key: "abril", name: "Abril Fatface + Montserrat", mood: "Bold editorial", note: REAL, heading: abril.style.fontFamily, body: "", weight: 400, scale: 0.9 },
  { key: "instrument", name: "Instrument Serif + Instrument Sans", mood: "Modern editorial", note: REAL, heading: instrumentSerif.style.fontFamily, body: instrumentSans.style.fontFamily, weight: 400, scale: 1.12 },
  { key: "marcellus", name: "Marcellus + Lato", mood: "Calm, classical, spa-like", note: REAL, heading: marcellus.style.fontFamily, body: lato.style.fontFamily, weight: 400, scale: 0.98 },
  { key: "cinzel", name: "Cinzel + Source Sans 3", mood: "Roman capitals", note: REAL, heading: cinzel.style.fontFamily, body: sourceSans.style.fontFamily, weight: 500, scale: 0.78 },
  { key: "syne", name: "Syne + DM Sans", mood: "Bold, modern, artful", note: REAL, heading: syne.style.fontFamily, body: dmSans.style.fontFamily, weight: 600, scale: 0.84 },
  { key: "deco", name: "Josefin Sans + Lora", mood: "Art deco, retro", note: REAL, heading: josefin.style.fontFamily, body: lora.style.fontFamily, weight: 400, scale: 0.94 },
  { key: "garamond", name: "EB Garamond + Work Sans", mood: "Classic, bookish", note: REAL, heading: garamond.style.fontFamily, body: workSans.style.fontFamily, weight: 400, scale: 1.12 },
  { key: "youngserif", name: "Young Serif + Karla", mood: "Warm, mid-century", note: REAL, heading: youngSerif.style.fontFamily, body: karla.style.fontFamily, weight: 400, scale: 0.94 },
  { key: "outfit", name: "Outfit + Outfit", mood: "Minimal, geometric", note: "One font for everything. It is real and free (Google Fonts).", heading: outfit.style.fontFamily, body: outfit.style.fontFamily, weight: 300, scale: 0.98 },
  { key: "italiana", name: "Italiana + Jost", mood: "Fashion, hairline-thin", note: REAL, heading: italiana.style.fontFamily, body: jost.style.fontFamily, weight: 400, scale: 1.08 },
];

const STORE = "evoa-hf";

/* A non-Bodoni heading font has its own optical sizing, and the site pins Bodoni's (see globals.css), so while a pairing is on,
   let the fonts size themselves, and set headings in the pairing's weight (even over a class that asks for another, so a font with
   one weight is never faked into bold). */
const RULES = `
html[data-hf] body { font-optical-sizing: auto; font-variation-settings: normal; }
html[data-hf] :is(h1, h2, h3, h4, h5, h6) { font-weight: var(--hf-weight, 400) !important; }
`;

const VARS = ["--font-primary-serif", "--font-montserrat", "--hs", "--hf-weight"];

function apply(theme: Theme | null) {
  const root = document.documentElement;
  if (!theme || theme.key === "bodoni") {
    VARS.forEach((v) => root.style.removeProperty(v));
    root.removeAttribute("data-hf");
    return;
  }
  root.style.setProperty("--font-primary-serif", theme.heading);
  if (theme.body) root.style.setProperty("--font-montserrat", theme.body);
  else root.style.removeProperty("--font-montserrat");
  root.style.setProperty("--hs", String(theme.scale));
  root.style.setProperty("--hf-weight", String(theme.weight));
  root.setAttribute("data-hf", theme.key);
}

export function FontTheme() {
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState("bodoni");
  const [copied, setCopied] = React.useState(false);

  // the starting choice: the address, else what this tab last chose (read after the first paint)
  React.useEffect(() => {
    const id = requestAnimationFrame(() => {
      let wanted = new URLSearchParams(window.location.search).get("hf");
      if (!wanted) {
        try {
          wanted = window.sessionStorage.getItem(STORE);
        } catch {
          /* storage blocked */
        }
      }
      if (wanted && THEMES.some((t) => t.key === wanted)) setKey(wanted);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  // apply the choice; and when the home page is left, put the real fonts back
  React.useEffect(() => {
    apply(THEMES.find((t) => t.key === key) ?? null);
  }, [key]);
  React.useEffect(() => () => apply(null), []);

  const choose = (next: string) => {
    setKey(next);
    setCopied(false);
    try {
      window.sessionStorage.setItem(STORE, next);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    url.searchParams.set("hf", next);
    window.history.replaceState(null, "", url);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* the address bar already holds the link */
    }
  };

  const active = THEMES.find((t) => t.key === key) ?? THEMES[0];

  return (
    <>
      <style>{RULES}</style>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded="false"
          className="fixed bottom-4 right-4 z-[45] flex items-center gap-2.5 rounded-full bg-forest py-2.5 pl-4 pr-5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-mint shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-deep-green"
        >
          <span className="font-display text-[18px] normal-case leading-none tracking-normal">Aa</span>
          Fonts
        </button>
      ) : (
        <div
          role="dialog"
          aria-label="Choose a font pairing"
          // the site's smooth-scroll library (Lenis) takes over the wheel and touch for the whole page, which stopped this list
          // from scrolling; this attribute tells it to leave the panel alone
          data-lenis-prevent
          className="fixed bottom-4 right-4 z-[45] flex max-h-[min(80dvh,660px)] w-[min(94vw,390px)] flex-col overflow-hidden rounded-2xl bg-forest text-mint shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        >
          <div className="flex items-center justify-between gap-2 px-4 pb-2 pt-3.5">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em]">Choose a font pairing</p>
            <div className="flex items-center gap-1">
              <button type="button" onClick={copyLink} className="rounded-full px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-mint/85 transition-colors hover:bg-white/10">
                {copied ? "Copied" : "Copy link"}
              </button>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="grid h-8 w-8 place-items-center rounded-full text-[18px] leading-none text-mint/85 transition-colors hover:bg-white/10">
                ×
              </button>
            </div>
          </div>
          <p className="px-4 pb-2 font-sans text-[11px] font-light leading-snug text-mint/70">Changes the headings and the text of the whole home page. Pick one, scroll to see it everywhere, then copy the link.</p>
          <ul className="flex-1 overflow-y-auto overscroll-contain px-2 pb-2">
            {THEMES.map((t) => (
              <li key={t.key}>
                <button
                  type="button"
                  onClick={() => choose(t.key)}
                  aria-pressed={t.key === key}
                  className={cn("flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors", t.key === key ? "bg-mint text-forest" : "hover:bg-white/10")}
                >
                  <span className={cn("mt-1 h-3 w-3 shrink-0 rounded-full border", t.key === key ? "border-forest bg-forest" : "border-mint/60")} />
                  <span className="block min-w-0">
                    <span className="block font-sans text-[13px] font-semibold leading-snug">{t.name}</span>
                    <span className={cn("block font-sans text-[11px] font-light", t.key === key ? "text-forest/75" : "text-mint/65")}>{t.mood}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="border-t border-white/10 px-4 py-2.5 font-sans text-[11px] font-light leading-snug text-mint/80">{active.note}</p>
        </div>
      )}
    </>
  );
}
