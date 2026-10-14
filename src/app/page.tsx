import { Hero } from "@/components/home/hero";
import { PhilosophyStatement } from "@/components/home/philosophy-statement";
import { Experience } from "@/components/home/experience";
import { Spaces } from "@/components/home/spaces";
import { DayAtEvoa } from "@/components/home/day-at-evoa";
// Disabled for now (component kept): import { SampleBoard } from "@/components/home/sample-board";
// Disabled for now (component kept): import { HouseRules } from "@/components/home/house-rules";
import { ClassGuide } from "@/components/home/class-guide";
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
      <DayAtEvoa />
      {/* <SampleBoard /> disabled: material finishes suit an About page better than the homepage */}
      {/* <HouseRules /> disabled: replaced by ClassGuide (classes + first-visit guide) */}
      <ClassGuide />
      <ClubMembership />
      <ClosingManifesto />
      <Faq />
    </>
  );
}
