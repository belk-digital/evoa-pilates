import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans font-medium transition-all duration-300 ease-[var(--ease-out-quart)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-ink text-cream hover:bg-rose-700 shadow-soft hover:shadow-lift",
        rose: "bg-rose-500 text-cream hover:bg-rose-700 shadow-soft hover:shadow-lift",
        outline: "bg-transparent text-ink border border-ink/20 hover:border-ink hover:bg-ink/[0.03]",
        ghost: "bg-transparent text-ink hover:bg-ink/[0.05]",
        light: "bg-cream text-ink hover:bg-white border border-ink/10",
        link: "bg-transparent text-rose-700 underline underline-offset-4 decoration-rose-300 hover:decoration-rose-700 px-0 py-0 h-auto rounded-none",
      },
      size: {
        sm: "text-[13px] px-5 py-2.5 h-10",
        md: "text-[14px] px-7 py-3.5 h-12",
        lg: "text-[15px] px-9 py-4.5 h-14",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants> {}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <Link ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  )
);
ButtonLink.displayName = "ButtonLink";

export { Button, ButtonLink, buttonVariants };
