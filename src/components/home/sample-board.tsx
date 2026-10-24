"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrickWall, Footprints } from "lucide-react";
import { SparkText } from "@/components/ui/spark-text";

type Surface = "Wall" | "Floor";
type Filter = "all" | "wall" | "floor";

interface Material {
  src: string;
  position?: string;
  alt: string;
  surface: Surface;
  code: string;
  name: string;
  spec: string;
  room: string;
  role: string;
  accent: string;
  accentText: string;
  tilt: number;
}

const asset = (file: string) => `/assets/${encodeURIComponent(file)}.webp`;

const MATERIALS: Material[] = [
  {
    src: asset("Warm Beige Terrazzo Stone Texture"),
    alt: "Warm beige terrazzo with large taupe and amber stone chips",
    surface: "Floor",
    code: "S-01",
    name: "Warm Beige Terrazzo",
    spec: "Honed stone aggregate · sand matrix · taupe and amber chips",
    room: "The Reform Room",
    role: "Warmth underfoot. A soft, honed stone floor with a little geology in it.",
    accent: "var(--color-terracotta)",
    accentText: "var(--color-rust)",
    tilt: -3,
  },
  {
    src: asset("Repeating Terracotta Star Tilework"),
    alt: "Glazed relief tile with terracotta stars in olive green frames",
    surface: "Floor",
    code: "S-02",
    name: "Terracotta Star Tile",
    spec: "Glazed relief tile · terracotta star · olive frame · pale grout",
    room: "The Recovery Bar",
    role: "Terracotta warms, olive grounds. A pattern that repeats like a slow pulse.",
    accent: "var(--color-sage)",
    accentText: "var(--color-sage-700)",
    tilt: 2.5,
  },
  {
    src: asset("Warm Glow on Tiled Wall"),
    alt: "Pale sage stack-bond tile wall with a peach glass sconce and a dark door frame",
    surface: "Wall",
    code: "S-03",
    name: "Sage Stack-Bond Tile",
    spec: "Vertical stack bond · pale sage glaze · dark grout · peach glass sconce",
    room: "The Quiet Room",
    role: "Pale tile, a peach glass sconce, a black door frame. The glow you walk toward.",
    accent: "var(--color-deep-green)",
    accentText: "var(--color-deep-green)",
    tilt: -1.5,
  },
  {
    src: asset("Botanical Leaves on a Misty Green Panel"),
    position: "center 20%",
    alt: "Deep green painted panel with a soft pool of light and a few living leaves at its edge",
    surface: "Wall",
    code: "S-04",
    name: "Misty Green Panel",
    spec: "Deep green painted panel · soft light wash · living leaves",
    room: "The Mat Vault",
    role: "A deep, quiet wall. Light pools on it; voices don't.",
    accent: "var(--color-teak)",
    accentText: "var(--color-teak)",
    tilt: 3,
  },
];

const PALETTE = [
  { name: "Mint Tile", role: "Calm", hex: "#cbdac6" },
  { name: "Terracotta", role: "Warmth", hex: "#c4673f" },
  { name: "Teak", role: "Craft", hex: "#7a4a2b" },
  { name: "Deep Green", role: "Depth", hex: "#2c4234" },
  { name: "Peach Glaze", role: "Glow", hex: "#edb899" },
  { name: "Spark Red", role: "Action, sparingly", hex: "#d2381f" },
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "wall", label: "Walls" },
  { id: "floor", label: "Floors" },
];

const matches = (m: Material, f: Filter) => f === "all" || m.surface.toLowerCase() === f;
const pad = (n: number) => String(n).padStart(2, "0");

function SurfaceTag({ surface }: { surface: Surface }) {
  const Icon = surface === "Wall" ? BrickWall : Footprints;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-cream/80 px-2 py-0.5 font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
      <Icon size={11} strokeWidth={2} aria-hidden="true" />
      {surface}
    </span>
  );
}

function Texture({ m }: { m: Material }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={m.src}
      alt={m.alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      className="h-full w-full object-cover"
      style={{ objectPosition: m.position ?? "center" }}
    />
  );
}

export function SampleBoard() {
  const [current, setCurrent] = React.useState(0);
  const [previous, setPrevious] = React.useState<number | null>(null);
  const [filter, setFilter] = React.useState<Filter>("all");
  const m = MATERIALS[current];

  const visible = MATERIALS.map((mat, i) => ({ mat, i })).filter(({ mat }) => matches(mat, filter));
  const counts: Record<Filter, number> = {
    all: MATERIALS.length,
    wall: MATERIALS.filter((x) => x.surface === "Wall").length,
    floor: MATERIALS.filter((x) => x.surface === "Floor").length,
  };

  const select = (i: number) => {
    if (i === current) return;
    setPrevious(current);
    setCurrent(i);
  };

  const applyFilter = (f: Filter) => {
    setFilter(f);
    if (!matches(MATERIALS[current], f)) {
      const first = MATERIALS.findIndex((x) => matches(x, f));
      if (first >= 0) select(first);
    }
  };

  return (
    <section id="sample-board" data-header-theme="light" className="relative w-full bg-peach-soft text-ink">
      <div className="mx-auto w-full max-w-[1500px] px-6 py-20 sm:px-10 sm:py-28 md:px-14 lg:px-20">
        <div className="flex w-full flex-col gap-4 pb-8 sm:pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-[32px] leading-[1.4] tracking-normal sm:text-[44px] md:text-[54px] lg:text-[58px]">
              <SparkText>The Sample Board</SparkText>
            </h2>
            <p className="max-w-md font-sans text-[14px] font-light leading-relaxed text-ink/70 sm:text-[15.5px]">
              Every wall and floor in the house, pinned. Choose a sample to see where it lives.
            </p>
          </div>
          <div className="flex items-center gap-2.5 font-sans text-[11.5px] font-light uppercase tracking-[0.24em] text-ink-muted sm:text-[12.5px]">
            <span className="h-px w-5 transition-colors duration-500" style={{ backgroundColor: m.accent }} />
            <span>Finish schedule · {pad(MATERIALS.length)} samples</span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="relative lg:col-span-7">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 shadow-[0_24px_50px_rgba(35,43,27,0.14)] transition-colors duration-500 sm:rounded-3xl"
              style={{ borderColor: m.accent }}
            >
              {previous !== null && (
                <div className="absolute inset-0">
                  <Texture m={MATERIALS[previous]} />
                </div>
              )}
              <motion.div
                key={m.code}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                onAnimationComplete={() => setPrevious(null)}
                className="absolute inset-0"
              >
                <Texture m={m} />
              </motion.div>
            </div>

            <div className="mt-4 sm:absolute sm:bottom-5 sm:left-5 sm:mt-0 sm:max-w-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={m.code}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl bg-cream/95 p-4 shadow-[0_12px_30px_rgba(35,43,27,0.18)] sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2">
                      <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-muted">
                        {m.code}
                      </span>
                      <SurfaceTag surface={m.surface} />
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.accent }} />
                      <span
                        className="font-sans text-[10.5px] font-medium uppercase tracking-[0.2em]"
                        style={{ color: m.accentText }}
                      >
                        {m.room}
                      </span>
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-serif text-[24px] leading-tight text-ink sm:text-[28px]">{m.name}</h3>
                  <p className="mt-1 font-sans text-[12.5px] font-light text-ink/65 sm:text-[13px]">{m.spec}</p>
                  <p className="mt-2 border-t border-ink/10 pt-2 font-sans text-[13px] font-light leading-snug text-ink/85 sm:text-[14px]">
                    {m.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-label="Filter samples by surface"
              className="mb-8 inline-flex rounded-full border border-ink/15 bg-cream/60 p-1"
            >
              {FILTERS.map((f) => {
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => applyFilter(f.id)}
                    className={`rounded-full px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 ${
                      on ? "bg-ink text-cream" : "text-ink/60 hover:text-ink"
                    }`}
                  >
                    {f.label} <span className="opacity-60">{pad(counts[f.id])}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid max-w-[560px] grid-cols-2 items-start gap-x-6 gap-y-9 sm:gap-x-8">
              <AnimatePresence mode="popLayout">
                {visible.map(({ mat, i }) => {
                  const isActive = i === current;
                  return (
                    <motion.button
                      key={mat.code}
                      layout
                      type="button"
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      aria-label={`${mat.name}, ${mat.surface.toLowerCase()}, ${mat.room}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1, rotate: isActive ? 0 : mat.tilt, y: isActive ? -8 : 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ rotate: 0, y: -8 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="group relative flex flex-col gap-2 text-left focus:outline-none"
                    >
                      <span
                        className={`absolute -top-2.5 left-1/2 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-spark shadow-md ring-2 ring-peach-soft transition-all duration-300 ${
                          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                        }`}
                      />
                      <span className="block aspect-square w-full overflow-hidden rounded-md border border-ink/15 shadow-[0_10px_24px_rgba(35,43,27,0.18)] transition-shadow duration-300 group-hover:shadow-[0_16px_30px_rgba(35,43,27,0.24)] group-focus-visible:ring-2 group-focus-visible:ring-ink">
                        <Texture m={mat} />
                      </span>
                      <span className="flex flex-col">
                        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-ink-muted">
                          {mat.code} · {mat.surface}
                        </span>
                        <span className="font-serif text-[15px] leading-tight text-ink sm:text-[17px]">{mat.name}</span>
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            <p className="mt-8 font-sans text-[11px] font-light uppercase leading-relaxed tracking-[0.18em] text-ink/55">
              Pin a sample to read its room.
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 border-t border-ink/15 sm:grid-cols-3 lg:mt-24 lg:grid-cols-6">
          {PALETTE.map((c) => (
            <div
              key={c.name}
              className="flex items-center gap-3 border-b border-ink/10 px-1 py-4 sm:px-3 lg:border-b-0 lg:border-r lg:border-ink/10 lg:last:border-r-0"
            >
              <span
                className="h-9 w-9 shrink-0 rounded-full border border-ink/10"
                style={{ backgroundColor: c.hex }}
                aria-hidden="true"
              />
              <span className="flex flex-col">
                <span className="font-serif text-[17px] leading-tight text-ink">{c.name}</span>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                  {c.role}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
