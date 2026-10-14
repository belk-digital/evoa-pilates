// Deterministic (no trig, no Math.random) so server and client render identical SVG.
function mulberry(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const HEX: [number, number][] = [
  [1, 0],
  [0.5, 0.87],
  [-0.5, 0.87],
  [-1, 0],
  [-0.5, -0.87],
  [0.5, -0.87],
];

export interface Chip {
  points: string;
  tone: number;
}

export function seededChips(
  seed: number,
  count: number,
  width: number,
  height: number,
  minR: number,
  maxR: number,
  tones: number
): Chip[] {
  const rnd = mulberry(seed);
  const chips: Chip[] = [];
  for (let i = 0; i < count; i++) {
    const cx = rnd() * width;
    const cy = rnd() * height;
    const r = minR + rnd() * rnd() * (maxR - minR);
    const stretch = 0.7 + rnd() * 0.6;
    const points = HEX.map(([dx, dy]) => {
      const jitter = 0.65 + rnd() * 0.5;
      return `${(cx + dx * r * jitter * stretch).toFixed(1)},${(cy + dy * r * jitter).toFixed(1)}`;
    }).join(" ");
    chips.push({ points, tone: Math.floor(rnd() * tones) });
  }
  return chips;
}
