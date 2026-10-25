"use client";

import { Faq, type FaqItem } from "@/components/home/faq";

/* Same design as the homepage FAQ. Placeholder answers in the brand voice until the studio confirms its terms. */
const questions: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "What happens after I request membership?",
    answer:
      "We reply within one working day to arrange your complimentary intro session. You meet an instructor, take a class and see the rooms. Only then do you choose a plan, and only if it feels right.",
  },
  {
    id: "02",
    number: "02",
    question: "Is there a joining fee or a contract?",
    answer:
      "No joining fee. Monthly plans renew each month and you can cancel with 30 days notice. Yearly plans are billed once a year at the lower monthly rate.",
  },
  {
    id: "03",
    number: "03",
    question: "Can I pause my membership?",
    answer:
      "Yes. You can pause for up to two months a year for travel, injury or pregnancy, and your place and plan are held for your return.",
  },
  {
    id: "04",
    number: "04",
    question: "Do unused classes roll over?",
    answer:
      "On Access, the 6 classes each month do not roll over, so we suggest a steady weekly rhythm. Residence and Atelier are unlimited, so there is nothing to carry.",
  },
  {
    id: "05",
    number: "05",
    question: "Can I bring a guest?",
    answer:
      "Residence and Atelier include 2 complimentary guest passes a month. On Access, a friend is welcome to join an intro session or a drop-in class.",
  },
  {
    id: "06",
    number: "06",
    question: "How do I change plans?",
    answer: "Any time. A change takes effect from your next billing date, and we will help you move without losing a class you have already booked.",
  },
  {
    id: "07",
    number: "07",
    question: "Are there student, teacher or corporate rates?",
    answer: "We offer them case by case. Tell us a little in your request and we will come back with what is possible.",
  },
];

export function MembershipFaq() {
  return <Faq plain heading="Membership questions" items={questions} defaultOpenId="01" />;
}
