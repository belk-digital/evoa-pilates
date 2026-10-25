import { siteConfig } from "@/lib/site";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* What day and time it is at the studio, whatever the visitor's own clock says. The studio is in Charleston, so this reads
   US Eastern time (siteConfig.timeZone), daylight saving included. `day` counts Monday as 0, as the timetable does, and
   `minutes` is the number of minutes since midnight there. */
export function studioClock(now: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: siteConfig.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: Math.max(0, WEEKDAYS.indexOf(get("weekday"))),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}
