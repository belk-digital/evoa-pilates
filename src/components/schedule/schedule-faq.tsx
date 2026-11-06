"use client";

import { Faq, type FaqItem } from "@/components/home/faq";

/* Booking questions, in the same design as the homepage FAQ. Placeholder answers in the brand voice until the studio confirms
   its policies; the prices follow the Membership page and the cancellation line matches Classes. */
const questions: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "How do I book a class?",
    answer:
      "Choose a day and a class on the timetable and reserve your place. You will need a drop-in, a class pack or a monthly package, all of which are on the Membership page.",
  },
  {
    id: "02",
    number: "02",
    question: "Which package should I choose?",
    answer:
      "A mat drop-in is $28 and a reformer drop-in $42. If you come once a week, four reformer classes a month is $149; twice a week, eight is $219; three times, twelve is $289. Packs of five or ten suit a week that changes, and unlimited suits a daily practice.",
  },
  {
    id: "03",
    number: "03",
    question: "What if a class is full?",
    answer:
      "Join the waitlist. If a place opens we let you know by email, and the place is yours if you take it before the class begins.",
  },
  {
    id: "04",
    number: "04",
    question: "How do I cancel or change a booking?",
    answer:
      "Free up to 12 hours before class, from your booking confirmation. After that the class is counted, because the room only holds eight and someone else may have wanted your place.",
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
    question: "Is the timetable the same every week?",
    answer:
      "It repeats weekly, and we update it with the seasons. Any change is sent by email well before it begins.",
  },
];

export function ScheduleFaq() {
  return <Faq plain heading="Booking questions" items={questions} defaultOpenId="01" />;
}
