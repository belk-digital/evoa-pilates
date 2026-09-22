import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Method } from "@/components/home/method";
import { WhyEvoa } from "@/components/home/why-evoa";
import { Principles } from "@/components/home/principles";
import { Faq } from "@/components/home/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Method />
      <WhyEvoa />
      <Principles />
      <Faq />
    </>
  );
}
