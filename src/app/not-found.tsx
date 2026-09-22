import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-[#faf6f3] text-ink py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-powder-petal/25 blur-3xl rounded-full pointer-events-none -z-0" />

      <Container size="content" className="text-center relative z-10">
        <span className="font-sans text-[12px] sm:text-[13px] tracking-[0.28em] uppercase text-dusty-mauve font-medium mb-3 block">
          404 Error
        </span>
        <h1 className="font-sans font-light text-[42px] sm:text-[54px] md:text-[64px] tracking-tight text-ink leading-tight mb-4">
          Page not found
        </h1>
        <p className="font-sans font-light text-[15px] sm:text-[16px] text-ink-muted leading-relaxed max-w-md mx-auto mb-8">
          The page you are looking for does not exist or has been moved. Return to the sanctuary.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-full bg-[#1c1815] text-[#faf6f3] px-8 py-3.5 text-[12px] sm:text-[13px] font-semibold tracking-[0.22em] uppercase hover:bg-dusty-mauve transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
        >
          Back to Homepage
        </Link>
      </Container>
    </section>
  );
}
