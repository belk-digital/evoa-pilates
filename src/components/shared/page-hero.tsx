import { Container } from "@/components/ui/container";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="pt-16 md:pt-24 pb-14 md:pb-20">
      <Container size="page" className="flex flex-col items-center text-center gap-5">
        <span className="label text-rose-500">{eyebrow}</span>
        <h1 className="font-sans font-light tracking-tight text-display-sm md:text-display-lg text-ink text-balance max-w-3xl">
          {title}
        </h1>
        {description ? (
          <p className="text-[16px] md:text-[18px] text-ink-muted max-w-xl leading-relaxed">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
