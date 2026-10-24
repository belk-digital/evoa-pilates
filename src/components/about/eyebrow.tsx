import * as React from "react";
import { cn } from "@/lib/utils";

/* Small uppercase label with a hairline in front of it; the same line-and-label the legal pages use. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 font-sans text-[11.5px] font-light uppercase tracking-[0.24em] sm:text-[12.5px]",
        dark ? "text-peach" : "text-ink-muted",
        className
      )}
    >
      <span className={cn("h-px w-5", dark ? "bg-peach" : "bg-terracotta")} />
      <span>{children}</span>
    </div>
  );
}
