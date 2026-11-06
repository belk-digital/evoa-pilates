import type { Metadata } from "next";
import { AboutIntro } from "@/components/about/about-intro";
import { AboutStory } from "@/components/about/about-story";
import { AboutPrinciples } from "@/components/about/about-principles";
import { AboutMethod } from "@/components/about/about-method";
import { AboutPractitioners } from "@/components/about/about-practitioners";
import { AboutRoom } from "@/components/about/about-room";
import { AboutVoices } from "@/components/about/about-voices";
import { AboutInvitation } from "@/components/about/about-invitation";

export const metadata: Metadata = {
  title: "About",
  description:
    "EVOA is the art of intentional movement that connects the body and soul: a Pilates studio in Houston with mat and reformer classes, eight to a room, no mirrors.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <AboutStory />
      <AboutPrinciples />
      <AboutMethod />
      <AboutPractitioners />
      <AboutRoom />
      <AboutVoices />
      <AboutInvitation />
    </>
  );
}
