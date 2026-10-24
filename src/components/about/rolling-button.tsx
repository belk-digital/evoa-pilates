"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLiquidGlass } from "@/components/ui/liquid-glass";
import { cn } from "@/lib/utils";

/* The site's pill button: the label rolls up to a second copy and the arrow chip slides through on hover.
   "solid" is the white pill, "glass" the liquid-glass one for dark photos. */
export function RollingButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: string;
  variant?: "solid" | "glass";
}) {
  const solid = variant === "solid";
  const { attach: glassRef, style: glassStyle, filter: glassFilter } = useLiquidGlass<HTMLAnchorElement>(!solid);

  return (
    <Link
      ref={glassRef}
      style={glassStyle}
      href={href}
      className={cn(
        "group relative inline-flex w-auto select-none items-center justify-center gap-3.5 rounded-full py-2 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 sm:gap-4 sm:py-2.5 sm:pl-8 sm:pr-2.5 sm:text-[12px]",
        solid
          ? "bg-white text-ink shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
          : "liquid-glass text-white"
      )}
    >
      {glassFilter}
      <span className="relative block h-[18px] overflow-hidden">
        <span className="flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-1/2">
          <span className="flex h-[18px] items-center whitespace-nowrap">{children}</span>
          <span className={cn("flex h-[18px] items-center whitespace-nowrap font-semibold", solid ? "text-rust" : "text-peach")}>
            {children}
          </span>
        </span>
      </span>

      <span
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white transition-colors duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:bg-spark sm:h-8 sm:w-8",
          solid
            ? "bg-ink"
            : "bg-white/20 shadow-[inset_0_1px_0.5px_rgba(255,255,255,0.6),inset_0_-1px_0.5px_rgba(255,255,255,0.2)]"
        )}
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden">
          <ArrowUpRight
            size={12.5}
            strokeWidth={2.2}
            className="transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-4 group-hover:translate-x-4"
          />
          <ArrowUpRight
            size={12.5}
            strokeWidth={2.2}
            className="absolute -translate-x-4 translate-y-4 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-0 group-hover:translate-y-0"
          />
        </span>
      </span>
    </Link>
  );
}
