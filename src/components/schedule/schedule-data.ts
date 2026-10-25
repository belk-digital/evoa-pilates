import { classes, type StudioClass } from "@/components/classes/classes-data";
import { instructors } from "@/lib/data";
import { studioClock } from "@/lib/studio-time";

/* A week of placeholder sessions, built from the real programme (classes-data.ts), the real teachers (lib/data.ts) and the
   opening hours in lib/site.ts (Monday to Friday 6am to 8pm, Saturday 8am to 4pm, Sunday 9am to 2pm). Replace SESSIONS with
   the studio's real timetable. Each teacher teaches the classes shown on the Classes page. `free` is how many of the eight
   places are still open; 0 is a full class with a waitlist. */

export const CAPACITY = 8;

export const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const DAY_SHORT = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type TeacherId = "emily" | "olivia" | "grace";

export const teachers = instructors.map((p) => ({
  id: p.name.split(" ")[0].toLowerCase() as TeacherId,
  name: p.name,
  first: p.name.split(" ")[0],
}));

export interface Session {
  id: string;
  /** 0 is Monday */
  day: number;
  /** 24-hour "HH:MM" */
  start: string;
  classId: string;
  teacher: TeacherId;
  free: number;
}

const make = (day: number, start: string, classId: string, teacher: TeacherId, free: number): Session => ({
  id: `${DAY_SHORT[day].toLowerCase()}-${start.replace(":", "")}`,
  day,
  start,
  classId,
  teacher,
  free,
});

export const sessions: Session[] = [
  // Monday
  make(0, "06:30", "reformer-foundations", "emily", 3),
  make(0, "09:00", "classical-mat", "emily", 5),
  make(0, "12:15", "breath-stillness", "grace", 6),
  make(0, "17:30", "reformer-flow", "olivia", 2),
  make(0, "19:00", "reformer-sculpt", "olivia", 0),
  // Tuesday
  make(1, "06:30", "reformer-flow", "olivia", 4),
  make(1, "09:30", "prenatal-postnatal", "grace", 3),
  make(1, "12:15", "reformer-foundations", "emily", 5),
  make(1, "18:00", "classical-mat", "emily", 4),
  // Wednesday
  make(2, "06:00", "reformer-sculpt", "olivia", 1),
  make(2, "09:00", "reformer-foundations", "emily", 6),
  make(2, "17:30", "reformer-flow", "olivia", 3),
  make(2, "19:00", "breath-stillness", "grace", 7),
  // Thursday
  make(3, "06:30", "classical-mat", "emily", 5),
  make(3, "09:30", "prenatal-postnatal", "grace", 2),
  make(3, "12:15", "reformer-flow", "olivia", 4),
  make(3, "18:00", "reformer-foundations", "emily", 0),
  // Friday
  make(4, "06:00", "reformer-flow", "olivia", 4),
  make(4, "09:00", "breath-stillness", "grace", 6),
  make(4, "12:15", "reformer-sculpt", "olivia", 3),
  make(4, "17:00", "reformer-foundations", "emily", 5),
  // Saturday
  make(5, "08:00", "reformer-sculpt", "olivia", 2),
  make(5, "09:15", "reformer-foundations", "emily", 4),
  make(5, "10:30", "prenatal-postnatal", "grace", 5),
  make(5, "12:00", "breath-stillness", "grace", 7),
  make(5, "13:30", "classical-mat", "emily", 6),
  // Sunday
  make(6, "09:00", "reformer-foundations", "emily", 3),
  make(6, "10:15", "reformer-flow", "olivia", 5),
  make(6, "11:30", "breath-stillness", "grace", 8),
];

export const classById = (id: string): StudioClass => classes.find((c) => c.id === id) ?? classes[0];
export const teacherById = (id: TeacherId) => teachers.find((t) => t.id === id) ?? teachers[0];

/* ---- time helpers ---- */

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "06:30" becomes { clock: "6:30", ampm: "am" } */
export function formatTime(hhmm: string): { clock: string; ampm: "am" | "pm" } {
  const [h, m] = hhmm.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return { clock: `${hour}:${String(m).padStart(2, "0")}`, ampm };
}

/** the time a class ends, from its start and its length ("50 min") */
export function endTime(start: string, length: string): string {
  const mins = toMinutes(start) + parseInt(length, 10);
  const t = formatTime(`${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`);
  return `${t.clock} ${t.ampm}`;
}

/** Today at the studio (Charleston, US Eastern time), with Monday as 0 as in the timetable */
export const todayIndex = (now: Date) => studioClock(now).day;

/* The next class to start: later today if there is one, otherwise the first of the next day that has any. */
export function nextSession(now: Date): { session: Session; when: string } {
  const { day: today, minutes: minutesNow } = studioClock(now);
  for (let offset = 0; offset < 8; offset++) {
    const day = (today + offset) % 7;
    const list = sessions.filter((s) => s.day === day && (offset > 0 || toMinutes(s.start) > minutesNow)).sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
    if (list.length) {
      const when = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : DAY_NAMES[day];
      return { session: list[0], when };
    }
  }
  return { session: sessions[0], when: DAY_NAMES[sessions[0].day] };
}

/* A button elsewhere asks the timetable to show a session: it picks that day and scrolls to the row. */
export const PICK_SESSION_EVENT = "evoa:pick-session";
export function requestSession(id: string) {
  window.dispatchEvent(new CustomEvent(PICK_SESSION_EVENT, { detail: id }));
  document.getElementById("timetable")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
