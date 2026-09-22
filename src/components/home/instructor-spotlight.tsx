import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { PhotoPanel } from "@/components/ui/photo-panel";
import { instructors } from "@/lib/data";

export function InstructorSpotlight() {
  const lead = instructors[0];

  return (
    <section className="py-20 md:py-28">
      <Container
        size="page"
        className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center"
      >
        <div className="md:col-span-5">
          <PhotoPanel tone="bronze" caption={lead.name} className="aspect-[4/5] w-full" />
        </div>

        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="label text-rose-500">Meet Your Instructor</span>
          <h2 className="font-kafina tracking-tight text-display-sm md:text-display-md text-ink text-balance">
            Precision teaching, <span className="text-rose-500 font-normal">not</span> just a playlist and a
            timer.
          </h2>
          <p className="text-[16px] leading-relaxed text-ink-muted max-w-xl">
            &ldquo;I want every client to leave understanding one new thing about their body —
            not just tired, but a little wiser about how they move.&rdquo;
          </p>
          <div className="flex flex-col gap-1">
            <span className="font-serif text-[18px] text-ink">{lead.name}</span>
            <span className="text-[13px] text-ink-subtle">{lead.role}</span>
          </div>
          <ButtonLink href="/about" variant="link" className="w-fit mt-2 group">
            Meet the full teaching team
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
