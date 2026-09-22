import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { PricingCard } from "@/components/shared/pricing-card";
import { pricingPlans } from "@/lib/data";

export function PricingTeaser() {
  return (
    <section className="py-20 md:py-28">
      <Container size="page">
        <SectionHeading
          eyebrow="Membership"
          title="Simple pricing, no surprise fees."
          description="Start with a single class or commit to a rhythm — every option unlocks the same studio."
          align="center"
          className="mx-auto max-w-2xl mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <ButtonLink href="/pricing" variant="link">
            Compare all membership details
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
