"use client";

import { Faq, type FaqItem } from "@/components/home/faq";

/* The class questions use the homepage FAQ's design exactly (big heading, numbered rows, a chevron on the right); only the
   heading and the questions differ. Placeholder answers in the brand voice until the studio confirms its policies. */
const questions: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "What should I wear?",
    answer:
      "Fitted, comfortable layers you can move in, so we can see your alignment. Grip socks are required on the reformer and the mat (we sell them at the front desk). Please leave watches and bracelets in your locker.",
  },
  {
    id: "02",
    number: "02",
    question: "I have never done Pilates. Where do I start?",
    answer:
      "Begin with EVOA Form on the reformer, or EVOA Flow or Restore on the mat. Either way you will be shown everything slowly, and nobody is expected to know the machine.",
  },
  {
    id: "03",
    number: "03",
    question: "Can I take classes with an injury?",
    answer:
      "Usually, yes. Tell us about injuries, surgery or anything recurring when you book and your instructor will adapt the class. For anything more involved, speak to us before you book and we will suggest the right class.",
  },
  {
    id: "04",
    number: "04",
    question: "What is the difference between mat and reformer?",
    answer:
      "Mat classes use your own body and breath on the floor. Reformer classes add the machine, whose springs give resistance and support. Both follow the same philosophy, and many members take both.",
  },
  {
    id: "05",
    number: "05",
    question: "What if I am late?",
    answer:
      "Come anyway, but we close the door five minutes after the start so the room stays calm and your warm-up is not skipped. If you arrive after that, we will help you rebook.",
  },
  {
    id: "06",
    number: "06",
    question: "How do I cancel or change a booking?",
    answer:
      "Free up to 12 hours before class, from your booking confirmation. After that the class is counted, because the room only holds eight and someone else may have wanted your place.",
  },
  {
    id: "07",
    number: "07",
    question: "Do I need to bring anything?",
    answer: "Only grip socks and water. Reformers, mats, props and towels are all here, and there is a tonic at the bar afterwards.",
  },
];

export function ClassesFaq() {
  return <Faq plain heading="Class questions" items={questions} defaultOpenId="01" />;
}
