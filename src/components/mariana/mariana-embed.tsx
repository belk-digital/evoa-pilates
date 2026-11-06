"use client";

import * as React from "react";
import { mariana } from "@/lib/mariana";

declare global {
  interface Window {
    /** set once Mariana's script has been added to this document, with the embed that added it */
    __evoaMariana?: { owner: string };
  }
}

const RELOAD_KEY = "evoa-mariana-reload";

/* One Mariana integration (the buy page, the schedule or the account).

   Mariana's script looks for [data-mariana-integrations] once, when it starts, and never again. So this component does it in
   the right order: it puts the container on the page first and only then adds the script. React never owns the container's
   contents (the script puts an iframe in it), and the container is created here rather than in the markup so there is nothing
   for hydration to disagree about.

   If the script has already run in this browser tab for another embed (a client-side navigation between two embed pages, or
   the back button), it would miss this container, so the page is loaded fresh instead. MarianaNav does the same for ordinary
   link clicks so that people rarely see this. A short guard stops it from ever looping. */
export function MarianaEmbed({ route, label, minHeight = 520 }: { route: string; label: string; minHeight?: number }) {
  const hostRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId();
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (window.__evoaMariana && window.__evoaMariana.owner !== id) {
      let last = 0;
      try {
        last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
        if (Date.now() - last > 4000) sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
      } catch {
        /* storage blocked: reload anyway, once */
      }
      if (Date.now() - last > 4000) window.location.reload();
      return;
    }

    let container = host.querySelector<HTMLElement>("[data-mariana-integrations]");
    if (!container) {
      container = document.createElement("div");
      container.setAttribute("data-mariana-integrations", route);
      host.appendChild(container);
    }

    if (!window.__evoaMariana) {
      window.__evoaMariana = { owner: id };
      // the same two scripts as Mariana's snippet: polyfills for older browsers, then the integration itself
      for (const part of ["polyfills", "js"]) {
        const s = document.createElement("script");
        s.src = `${mariana.scriptBase}/${part}`;
        s.setAttribute("data-timestamp", String(Date.now()));
        (document.head || document.body).appendChild(s);
      }
    }

    const el = container;
    const observer = new MutationObserver(() => {
      if (el.childNodes.length > 0) setReady(true);
    });
    observer.observe(el, { childList: true });
    // if nothing has appeared after a while (a blocked script, a network problem), say so instead of waiting forever
    const timer = window.setTimeout(() => {
      if (el.childNodes.length === 0) setFailed(true);
    }, 15000);

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [id, route]);

  return (
    <div className="relative" style={ready ? undefined : { minHeight }}>
      <div ref={hostRef} />
      {!ready && (
        <p className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center font-sans text-[14px] font-light text-ink/55">
          {failed
            ? `We could not load ${label}. Please refresh the page, or email us and we will help.`
            : `Loading ${label}…`}
        </p>
      )}
      <noscript>
        <p className="py-10 text-center font-sans text-[14px] text-ink/70">Please enable JavaScript to see {label}.</p>
      </noscript>
    </div>
  );
}
