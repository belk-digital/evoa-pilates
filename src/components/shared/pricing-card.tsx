import { Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { pricingPlans } from "@/lib/data";

export function PricingCard({ plan }: { plan: (typeof pricingPlans)[number] }) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-8 rounded-lg p-8 md:p-10 transition-shadow",
        plan.featured
          ? "bg-ink text-cream shadow-lift"
          : "bg-cream border border-border-DEFAULT text-ink hover:shadow-soft"
      )}
    >
      {plan.featured ? (
        <span className="absolute -top-3 left-8 label bg-rose-500 text-cream px-3 py-1.5 rounded-sm">
          Most Popular
        </span>
      ) : null}

      <div className="flex flex-col gap-2">
        <h3 className={cn("font-kafina text-[22px]", plan.featured ? "text-cream" : "text-ink")}>
          {plan.name}
        </h3>
        <p className={cn("text-[14px] leading-relaxed", plan.featured ? "text-cream/65" : "text-ink-muted")}>
          {plan.description}
        </p>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="font-serif text-[42px] leading-none">{plan.price}</span>
        <span className={cn("text-[13px]", plan.featured ? "text-cream/60" : "text-ink-subtle")}>
          {plan.unit}
        </span>
      </div>

      <ul className="flex flex-col gap-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-3 text-[14px]">
            <Check size={15} className={plan.featured ? "text-rose-300" : "text-rose-500"} strokeWidth={2} />
            <span className={plan.featured ? "text-cream/85" : "text-ink-soft"}>{f}</span>
          </li>
        ))}
      </ul>

      <ButtonLink
        href="/contact"
        variant={plan.featured ? "rose" : "outline"}
        size="md"
        className="mt-auto w-full"
      >
        Get Started
      </ButtonLink>
    </div>
  );
}
