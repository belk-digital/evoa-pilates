"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 md:py-28 bg-rose-100">
      <Container size="page">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <SectionHeading
            eyebrow="In Their Words"
            title="What moving here actually feels like."
          />
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => emblaApi?.scrollPrev()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-ink/[0.05] transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => emblaApi?.scrollNext()}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink hover:bg-ink/[0.05] transition-colors"
            >
              <ArrowRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-0 shrink-0 grow-0 basis-[85%] sm:basis-[60%] lg:basis-[38%]"
              >
                <div className="h-full flex flex-col gap-6 rounded-md bg-cream p-8 md:p-10 shadow-soft">
                  <Quote size={26} className="text-rose-300" strokeWidth={1.5} />
                  <p className="font-serif text-[19px] leading-relaxed text-ink text-balance">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex flex-col gap-0.5">
                    <span className="text-[14px] font-medium text-ink">{t.name}</span>
                    <span className="text-[12px] text-ink-subtle">{t.detail}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-6 bg-rose-500" : "w-1.5 bg-ink/20"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
