import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactSection } from "@/components/contact/contact-form";
import { ContactVisit } from "@/components/contact/contact-visit";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Write to EVOA: ask about a class, pricing or packages, and find the studio at 4743 Banning, Houston, with its opening hours.",
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
