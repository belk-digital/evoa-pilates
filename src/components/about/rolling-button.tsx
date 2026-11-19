"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLiquidGlass } from "@/components/ui/liquid-glass";
import { cn } from "@/lib/utils";

/* The site's pill button, built to behave exactly like the header's "Request Membership" button: on hover the label rolls up
   to a second copy in a warmer colour, the arrow in the chip slides out while a fresh one slides in, the chip turns spark, and
   the shadow lifts. Every pill on the site should be this component, so they all move the same way.

   variant  "solid"  white pill, ink chip (for dark panels and photographs)
            "dark"   ink pill, white chip (for light panels)
            "glass"  liquid glass over photographs (links only)
   block    full width, label at the left and the chip at the right (forms, cards)
   arrow    "up-right" (default) for going somewhere, "down" for scrolling to something on the same page
   Pass href for a link; otherwise it is a real <button> (type, onClick, disabled). */
type Variant = "solid" | "dark" | "glass";

type Common = {
  children: string;
  /** a shorter label for screens narrower than 640px, where the full one would not fit (for example "Reformer classes" for "Explore reformer classes") */
  short?: string;
  variant?: Variant;
  block?: boolean;
  arrow?: "up-right" | "down";
  className?: string;
};
type LinkProps = Common & { href: string; onClick?: React.MouseEventHandler<HTMLAnchorElement>; type?: never; disabled?: never };
type ButtonProps = Common & { href?: undefined; type?: "button" | "submit"; onClick?: React.MouseEventHandler<HTMLButtonElement>; disabled?: boolean };

const EASE = "ease-[cubic-bezier(0.25,1,0.5,1)]";

export function RollingButton(props: LinkProps | ButtonProps) {
  const { children, short, variant = "solid", block = false, arrow = "up-right", className } = props;
  const label = short ? (
    <>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{children}</span>
    </>
  ) : (
    children
  );
  const Arrow = arrow === "down" ? ArrowDown : ArrowUpRight;
  // where the old arrow leaves to, and where the new one waits before it slides in
  const leave = arrow === "down" ? "group-hover:translate-y-4" : "group-hover:-translate-y-4 group-hover:translate-x-4";
  const wait = arrow === "down" ? "-translate-y-4" : "-translate-x-4 translate-y-4";
  const glass = variant === "glass" && props.href !== undefined;
  const { attach: glassRef, style: glassStyle, filter: glassFilter } = useLiquidGlass<HTMLAnchorElement>(glass);

  const classes = cn(
    "group relative inline-flex select-none items-center rounded-full py-2 pl-6 pr-2 text-[11px] font-semibold uppercase tracking-[0.2em] max-[340px]:pl-4 max-[340px]:tracking-[0.1em] transition-[box-shadow,opacity] duration-300 disabled:pointer-events-none disabled:opacity-70 sm:py-2.5 sm:pl-8 sm:pr-2.5 sm:text-[12px]",
    block ? "w-full justify-between gap-4 max-[340px]:gap-2" : "w-auto justify-center gap-3.5 sm:gap-4",
    variant === "solid" && "bg-white text-ink shadow-[0_6px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]",
    variant === "dark" && "bg-ink text-white shadow-[0_4px_16px_rgba(35,43,27,0.14)] hover:shadow-[0_8px_24px_rgba(35,43,27,0.25)]",
    variant === "glass" && "liquid-glass text-white",
    className
  );

  const content = (
    <>
      {glassFilter}
      {/* rolling label: two copies stacked, the track slides up by half its height on hover */}
      <span className="relative block h-[18px] overflow-hidden">
        <span className={cn("flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2", EASE)}>
          <span className="flex h-[18px] items-center whitespace-nowrap">{label}</span>
          <span aria-hidden className={cn("flex h-[18px] items-center whitespace-nowrap font-semibold", variant === "solid" ? "text-rust" : "text-peach")}>
            {label}
          </span>
        </span>
      </span>

      {/* arrow chip: turns spark on hover, the arrow leaves up and to the right as a new one arrives from below left */}
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500 group-hover:bg-spark group-hover:text-white sm:h-9 sm:w-9",
          EASE,
          variant === "solid" && "bg-ink text-white",
          variant === "dark" && "bg-white text-ink",
          variant === "glass" && "bg-white/15 text-white"
        )}
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center overflow-hidden">
          <Arrow size={12.5} strokeWidth={2.2} className={cn("transition-transform duration-500", leave, EASE)} />
          <Arrow
            size={12.5}
            strokeWidth={2.2}
            className={cn("absolute transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0", wait, EASE)}
          />
        </span>
      </span>
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link ref={glassRef} style={glassStyle} href={props.href} onClick={props.onClick} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={classes}>
      {content}
    </button>
  );
}
