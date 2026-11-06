import type { Metadata } from "next";
import { MembershipIntro } from "@/components/membership/membership-intro";
import { MembershipMonthly, MembershipUnlimited, MembershipPacks, MembershipValue } from "@/components/membership/membership-plans";
import { MembershipSteps } from "@/components/membership/membership-steps";
import { MembershipBuy } from "@/components/membership/membership-buy";
import { MembershipFaq } from "@/components/membership/membership-faq";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "EVOA pricing: drop-ins from $28, class packs, monthly reformer packages and unlimited mat or mat and reformer access. Eight people, one instructor, no mirrors. Buy online.",
};

export default function PricingPage() {
  return (
    <>
      <MembershipIntro />
      <MembershipMonthly />
      <MembershipUnlimited />
      <MembershipPacks />
      <MembershipValue />
      <MembershipSteps />
      <MembershipBuy />
      <MembershipFaq />
    </>
  );
}
