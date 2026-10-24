import { cn } from "@/lib/utils";

/* The EVOA lockup: wordmark, "Evolution of Awareness" and the gold rule.
   - tone="light": the deep-green artwork, for LIGHT backgrounds.
   - tone="dark":  the cream artwork, for DARK backgrounds.
   The files (1600 x 622) carry transparent padding, so the image is cropped to the artwork's own bounds
   (x 119-1484, y 100-557) plus a 12px safety margin on every side, so the anti-aliased edge of the last letter is never
   clipped: x 107-1496, y 88-569. The box below has that aspect ratio and the image is offset inside it.
   Set the size from outside with a height (e.g. "h-[44px]"); the width follows. */
export function BrandLogo({
  tone,
  className,
  shadow = false,
}: {
  tone: "light" | "dark";
  className?: string;
  /** soft drop shadow, for the cream logo over photography */
  shadow?: boolean;
}) {
  const src = tone === "light" ? "/assets/main/evoa_light_transparent.webp" : "/assets/main/evoa_dark_transparent.webp";

  return (
    <span className={cn("relative block aspect-[1389/482] overflow-hidden", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={cn("absolute max-w-none select-none", shadow && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)]")}
        style={{ width: "115.19%", left: "-7.70%", top: "-18.26%" }}
      />
    </span>
  );
}
