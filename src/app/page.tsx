import { Hero } from "@/components/home/hero";
import { PhilosophyStatement } from "@/components/home/philosophy-statement";
import { Experience } from "@/components/home/experience";
import { Spaces } from "@/components/home/spaces";
import { ClubMembership } from "@/components/home/club-membership";
import { ClosingManifesto } from "@/components/home/closing-manifesto";
import { Faq } from "@/components/home/faq";

export default function HomePage() {
  return (
    <>
      <div className="relative w-full">
        <Hero />
        <PhilosophyStatement />
      </div>
      <Experience />
      <Spaces />
      <ClubMembership />
      <ClosingManifesto />
      <Faq />
    </>
  );
}
