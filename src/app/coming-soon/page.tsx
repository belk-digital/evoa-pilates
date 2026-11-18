import type { Metadata } from "next";
import { Walk } from "@/components/soon/walk";

/* The "coming soon" page: a scroll through one arched door after another, ending in the email form.

   Search engines may index it only when coming-soon mode is on (COMING_SOON=1 in the environment when the site is built, which
   is Production on Vercel; see src/proxy.ts). Everywhere else (previews, local work, and after launch, when this page is no
   longer the front door) it is hidden from search. */
const live = process.env.COMING_SOON === "1";

export const metadata: Metadata = {
  title: "Opening soon",
  description: "EVOA, a Pilates studio in Houston, Texas, is opening soon. Movement with intention. Strength with soul. Join the list to be first through the door.",
  robots: live ? { index: true, follow: true } : { index: false, follow: false },
};

export default function Page() {
  return <Walk />;
}
