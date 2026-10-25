"use client";

import { Faq, type FaqItem } from "@/components/home/faq";

/* Booking questions, in the same design as the homepage FAQ. Placeholder answers in the brand voice until the studio confirms
   its policies; the booking windows follow the three plans on the Membership page and the cancellation line matches Classes. */
const questions: FaqItem[] = [
  {
    id: "01",
    number: "01",
    question: "How far ahead can I book?",
    answer:
      "Access members book seven days ahead, Residence fourteen and Atelier thirty. Your first class is a complimentary intro session, which you arrange with us directly.",
  },
  {
    id: "02",
    number: "02",
    question: "What if a class is full?",
    answer:
      "Join the waitlist. If a place opens we let you know by email, and the place is yours if you take it before the class begins.",
  },
  {
    id: "03",
    number: "03",
    question: "How do I cancel or change a booking?",
    answer:
      "Free up to 12 hours before class, from your booking confirmation. After that the class is counted, because the room only holds eight and someone else may have wanted your place.",
  },
  {
    id: "04",
    number: "04",
    question: "What if I am late?",
    answer:
      "Come anyway, but we close the door five minutes after the start so the room stays calm and your warm-up is not skipped. If you arrive after that, we will help you rebook.",
  },
  {
    id: "05",
    number: "05",
    question: "Can I bring a guest?",
    answer:
      "Residence and Atelier include two guest passes a month. Otherwise, ask us and we will see what the room allows.",
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
