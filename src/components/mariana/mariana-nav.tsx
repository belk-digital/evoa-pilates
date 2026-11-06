"use client";

import * as React from "react";
import { mariana } from "@/lib/mariana";

/* Mariana's script only finds its container once per page load, so after it has run in this tab, a click on a link to one of
   our embed pages is made a full page load instead of a client-side navigation (otherwise the next embed would stay empty).
   Until the script has run, links behave as normal, so the first embed page is still instant. */
export function MarianaNav() {
  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!window.__evoaMariana) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (!(mariana.embedPaths as readonly string[]).includes(url.pathname)) return;
      if (url.pathname === window.location.pathname) return; // same page (an in-page anchor): leave it alone
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(url.href);
    };
    // capture phase, so it runs before the router's own link handler
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
