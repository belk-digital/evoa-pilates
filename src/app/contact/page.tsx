import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactSection } from "@/components/contact/contact-form";
import { ContactVisit } from "@/components/contact/contact-visit";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to Evoa Pilates: book a complimentary intro session, ask about membership or private sessions, and find the studio and its opening hours.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactSection />
      <ContactVisit />
    </>
  );
}
