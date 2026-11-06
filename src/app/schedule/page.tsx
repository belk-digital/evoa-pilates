import type { Metadata } from "next";
import Link from "next/link";
import { ScheduleHero } from "@/components/schedule/schedule-hero";
import { MarianaPanel } from "@/components/mariana/mariana-panel";
import { mariana } from "@/lib/mariana";
import { siteConfig } from "@/lib/site";
import { ScheduleFaq } from "@/components/schedule/schedule-faq";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "The weekly timetable at EVOA in Houston: mat and reformer classes, eight to a room. Choose a day, then book your place online.",
};

export default function SchedulePage() {
  return (
    <>
      <ScheduleHero />
      {/* the live timetable and booking, from Mariana Tek (one integration per page) */}
      <MarianaPanel id="timetable" route={mariana.routes.schedule} label="the timetable">
        <p className="font-sans text-[13px] font-light text-ink/65">
          Times are {siteConfig.timeZoneLabel}, {siteConfig.city.split(",")[0]}. Need a package first? See{" "}
          <Link href="/pricing" className="text-rust underline underline-offset-4 transition-colors hover:text-spark">
            Membership
          </Link>
          .
        </p>
      </MarianaPanel>
      <ScheduleFaq />
    </>
  );
}
