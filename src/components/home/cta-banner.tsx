import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="py-20 md:py-28">
      <Container size="page">
        <div className="relative overflow-hidden rounded-xl bg-rose-500 px-8 py-16 md:px-20 md:py-24 text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="label text-rose-100">Your First Class Is On Us</span>
            <h2 className="font-kafina tracking-tight text-display-sm md:text-display-lg text-cream text-balance max-w-2xl">
              Come feel the difference a quiet room makes.
            </h2>
            <p className="text-[16px] text-cream/85 max-w-md leading-relaxed">
              New clients take their first Reformer or Mat class complimentary — no strings, no
              pressure to commit.
            </p>
            <ButtonLink href="/contact" variant="light" size="lg" className="mt-2">
              Claim Your Free Class
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
