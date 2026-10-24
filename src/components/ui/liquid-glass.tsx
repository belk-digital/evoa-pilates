"use client";

import * as React from "react";

/* Edge refraction for the .liquid-glass look (see globals.css).
   The CSS alone gives a clear pane with rim light. What makes Apple's glass "liquid" is that the picture behind it bends
   along the rim, like a thick lens. Chromium (Chrome, Edge, Opera) can do that: backdrop-filter accepts an SVG filter, and
   feDisplacementMap shifts each backdrop pixel by an amount read from a map image. We draw that map for the element's
   own size and corner radius (the pill, the round buttons and the CTAs are all different): neutral grey in the middle, and
   toward the rim a growing push that makes the backdrop be sampled from further in. Safari and Firefox cannot use SVG
   filters in backdrop-filter, so they keep the plain CSS glass. The rim also splits the red, green and blue channels by
   a few percent (chromatic aberration), the way the liquid-glass-react demo does, which is what makes the edge read as
   thick glass rather than a blur.

   Usage:
     const glass = useLiquidGlass<HTMLAnchorElement>();
     <a ref={glass.attach} style={glass.style} className="liquid-glass ...">{glass.filter} ...</a> */

const isChromium = () => {
  if (typeof navigator === "undefined") return false;
  const brands = (navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } }).userAgentData?.brands;
  return !!brands?.some((b) => /chromium/i.test(b.brand));
};

/* A w x h displacement map for a rounded rectangle of corner radius r. depth is the distance in from the rim; inside the
   bezel the backdrop is pulled from further in, most strongly at the rim itself. R = x push, G = y push, 128 = none. */
function makeDisplacementMap(w: number, h: number, r: number, bezel: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const image = ctx.createImageData(w, h);
  const hw = w / 2;
  const hh = h / 2;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);

      // signed distance to the rim (negative inside) and the outward normal there
      let d: number;
      let nx: number;
      let ny: number;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy);
        d = len - r;
        nx = (Math.sign(px) * qx) / len;
        ny = (Math.sign(py) * qy) / len;
      } else if (qx > qy) {
        d = qx - r;
        nx = Math.sign(px) || 1;
        ny = 0;
      } else {
        d = qy - r;
        nx = 0;
        ny = Math.sign(py) || 1;
      }

      const depth = -d;
      let push = 0;
      if (depth >= 0 && depth < bezel) push = Math.pow(1 - depth / bezel, 2.2);

      const i = (y * w + x) * 4;
      image.data[i] = Math.round(128 - nx * push * 127);
      image.data[i + 1] = Math.round(128 - ny * push * 127);
      image.data[i + 2] = 128;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas.toDataURL("image/png");
}

export function useLiquidGlass<T extends HTMLElement>(enabled = true, { bezel = 22 }: { bezel?: number } = {}) {
  // a callback ref held in state (not a ref object), so the element is available to the effect below and the hook can be
  // destructured freely in JSX
  const [node, setNode] = React.useState<T | null>(null);
  const id = "lg" + React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const [lens, setLens] = React.useState<{ w: number; h: number; map: string; push: number } | null>(null);

  React.useEffect(() => {
    const el = node;
    if (!enabled || !el || !isChromium()) return;

    let raf = 0;
    const build = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;
      const radius = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
      const depth = Math.min(bezel, Math.min(w, h) / 2);
      setLens((prev) =>
        prev && prev.w === w && prev.h === h ? prev : { w, h, map: makeDisplacementMap(w, h, radius, depth), push: depth }
      );
    };

    build();
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(build);
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [node, enabled, bezel]);

  const on = enabled && lens !== null;

  const filter = on ? (
    <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
      <filter
        id={id}
        x="0"
        y="0"
        width={lens.w}
        height={lens.h}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feImage href={lens.map} x="0" y="0" width={lens.w} height={lens.h} preserveAspectRatio="none" result="map" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={lens.push * 2.4} xChannelSelector="R" yChannelSelector="G" result="dispR" />
        <feColorMatrix in="dispR" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="chR" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={lens.push * 2.4 * 0.93} xChannelSelector="R" yChannelSelector="G" result="dispG" />
        <feColorMatrix in="dispG" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="chG" />
        <feDisplacementMap in="SourceGraphic" in2="map" scale={lens.push * 2.4 * 0.86} xChannelSelector="R" yChannelSelector="G" result="dispB" />
        <feColorMatrix in="dispB" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="chB" />
        <feBlend in="chG" in2="chB" mode="screen" result="chGB" />
        <feBlend in="chR" in2="chGB" mode="screen" />
      </filter>
    </svg>
  ) : null;

  // blur first, then bend: the light blur keeps text over the glass readable and the fringes crisp
  const value = `blur(3px) saturate(1.3) url(#${id})`;
  const style: React.CSSProperties | undefined = on ? { backdropFilter: value, WebkitBackdropFilter: value } : undefined;

  return { attach: setNode, style, filter };
}
