import type { Metadata } from "next";
import { MembershipIntro } from "@/components/membership/membership-intro";
import { MembershipPlans, MembershipCompare } from "@/components/membership/membership-plans";
import { MembershipSteps } from "@/components/membership/membership-steps";
import { MembershipRequest } from "@/components/membership/membership-request";
import { MembershipFaq } from "@/components/membership/membership-faq";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Three ways to belong at Evoa: Access, Residence and Atelier. Begin with a complimentary intro session, then choose the rhythm that suits your week.",
};

export default function PricingPage() {
  return (
    <>
      <MembershipIntro />
      <MembershipPlans />
      <MembershipCompare />
      <MembershipSteps />
      <MembershipRequest />
      <MembershipFaq />
    </>
  );
}
