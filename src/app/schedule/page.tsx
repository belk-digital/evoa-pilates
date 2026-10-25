import type { Metadata } from "next";
import { ScheduleHero } from "@/components/schedule/schedule-hero";
import { ScheduleBoard } from "@/components/schedule/schedule-board";
import { ScheduleFaq } from "@/components/schedule/schedule-faq";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The weekly timetable at Evoa Pilates: reformer, mat, prenatal and stillness classes, eight to a room. Choose a day and the time that suits you.",
};

export default function SchedulePage() {
  return (
    <>
      <ScheduleHero />
      <ScheduleBoard />
      <ScheduleFaq />
    </>
  );
}
