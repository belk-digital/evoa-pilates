import * as React from "react";

/**
 * Heading text with the site's red "spark" on every point: the dot of each "i", plus the whole
 * . ? ! marks. Light backgrounds use --color-spark; pass `bright` on dark ones
 * (--color-spark-bright).
 *
 * The i-dot is coloured with a hard-stop gradient clipped to the glyph (see .spark-i in
 * globals.css); the split is tuned to Boldonse, so re-measure it if the h2 font changes.
 */
export function SparkText({
  children,
  bright = false,
  iDots = false,
}: {
  children: string;
  bright?: boolean;
  /** colour the dot of each "i" (tuned to Boldonse; off by default now that headings are Cormorant) */
  iDots?: boolean;
}) {
  const tone = bright ? " on-dark" : "";
  const nodes: React.ReactNode[] = [];
  let run = "";

  const flush = () => {
    if (run) nodes.push(run);
    run = "";
  };

  Array.from(children).forEach((ch, i) => {
    if (ch === "i" && iDots) {
      flush();
      nodes.push(
        <span key={i} className={`spark-i${tone}`}>
          i
        </span>
      );
    } else if (ch === "." || ch === "?" || ch === "!") {
      flush();
      nodes.push(
        <span key={i} className={`spark-mark${tone}`}>
          {ch}
        </span>
      );
    } else {
      run += ch;
    }
  });
  flush();

  return <>{nodes}</>;
}
