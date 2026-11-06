"use client";

import { Faq, type FaqItem } from "@/components/home/faq";

/* Same design as the homepage FAQ. Placeholder answers in the brand voice until the studio confirms its terms; the descriptions of
   each package follow the client's price table (drop-in, class packs, monthly reformer, unlimited). */
const questions: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "What happens after I buy a package?",
    answer:
      "It is added to your account straight away. Then you book your first class on the schedule, mat or reformer.",
  },
  {
    id: "02",
    number: "02",
    question: "What is the difference between a drop-in, a pack and a monthly package?",
    answer:
      "A drop-in is a single class. A pack is five or ten classes that you use as your week allows. A monthly package gives you a set number of reformer classes each month, or unlimited classes.",
  },
  {
    id: "03",
    number: "03",
    question: "Can I use a mat pack for reformer classes?",
    answer:
      "Mat packs are for mat classes and reformer packs are for reformer classes. Unlimited Mat + Reformer covers both, and Unlimited Mat covers every mat class.",
  },
  {
    id: "04",
    number: "04",
    question: "What does unlimited mean?",
    answer:
      "Book as many classes as you like, within the studio's booking rules. Because the price is monthly, each class costs less the more you come.",
  },
  {
    id: "05",
    number: "05",
    question: "How do I change my package or cancel a class?",
    answer:
      "Write to us and we will help you change your package. A class can be cancelled free up to 12 hours before it begins, because the room only holds eight.",
  },
  {
    id: "06",
    number: "06",
    question: "Are there student, teacher or corporate rates?",
    answer: "We offer them case by case. Tell us a little in your request and we will come back with what is possible.",
  },
];

export function MembershipFaq() {
  return <Faq plain heading="Membership questions" items={questions} defaultOpenId="01" />;
}
