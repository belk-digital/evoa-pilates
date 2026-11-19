import { IntroProvider } from "@/components/intro/intro-context";
import { Hero } from "@/components/home/hero";
import { FontTheme } from "@/components/home/font-theme"; // TEMPORARY: the font-pairing chooser (see font-theme.tsx)
import { PhilosophyStatement } from "@/components/home/philosophy-statement";
import { Experience } from "@/components/home/experience";
import { Spaces } from "@/components/home/spaces";
// Disabled for now (component kept, we may use it on another page later): import { DayAtEvoa } from "@/components/home/day-at-evoa";
// Disabled for now (component kept): import { SampleBoard } from "@/components/home/sample-board";
// Disabled for now (component kept): import { HouseRules } from "@/components/home/house-rules";
// Replaced by TwoDisciplines (the client's mat and reformer copy): import { ClassGuide } from "@/components/home/class-guide";
import { TwoDisciplines } from "@/components/home/two-disciplines";
// Replaced by the Membership page's arch cards: import { ClubMembership } from "@/components/home/club-membership";
import { MembershipMonthly } from "@/components/membership/membership-plans";
import { ClosingManifesto } from "@/components/home/closing-manifesto";
import { Faq } from "@/components/home/faq";

export default function HomePage() {
  return (
    <IntroProvider>
      <FontTheme />
      <div className="relative w-full">
        <Hero />
        <PhilosophyStatement />
      </div>
      <Experience />
      <Spaces />
      {/* <DayAtEvoa /> disabled: the sun-through-the-day scene is kept in components/home/day-at-evoa.tsx for another page */}
      {/* <SampleBoard /> disabled: material finishes suit an About page better than the homepage */}
      {/* <HouseRules /> disabled: replaced by TwoDisciplines (classes + first-visit guide) */}
      <TwoDisciplines />
      <div id="membership">
        <MembershipMonthly toMembershipPage />
      </div>
      <ClosingManifesto />
      <Faq plain />
    </IntroProvider>
  );
}
