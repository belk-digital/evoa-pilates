/* Membership content. The three plans and their prices match the homepage ("Choose your plan"). Everything is placeholder
   copy in the brand voice until the studio confirms its terms. */

export type PlanId = "access" | "residence" | "atelier";

export interface Plan {
  id: PlanId;
  name: string;
  /** the label on its button */
  cta: string;
  monthly: number;
  yearly: number;
  line: string;
  best: string;
  featured: boolean;
  /** how many nested arches its emblem carries (1 to 3) */
  rings: 1 | 2 | 3;
  perks: string[];
}

export const plans: Plan[] = [
  {
    id: "access",
    name: "Access",
    cta: "Request Access",
    monthly: 325,
    yearly: 275,
    line: "Foundational consistency and a disciplined weekly practice.",
    best: "Once or twice a week",
    featured: false,
    rings: 1,
    perks: [
      "Full studio access and amenities",
      "6 classes a month, reformer and mat",
      "Booking window of 7 days",
      "Complimentary recovery bar tonic",
      "Towel service and amenities",
    ],
  },
  {
    id: "residence",
    name: "Residence",
    cta: "Join Residence",
    monthly: 575,
    yearly: 485,
    line: "For dedicated practitioners who fold movement into every day.",
    best: "Three or more times a week",
    featured: true,
    rings: 2,
    perks: [
      "Everything in Access",
      "Unlimited classes and reservations",
      "Priority booking, 14 days ahead",
      "A weekly recovery session included",
      "2 complimentary guest passes a month",
    ],
  },
  {
    id: "atelier",
    name: "Atelier",
    cta: "Contact Concierge",
    monthly: 950,
    yearly: 805,
    line: "High-touch, bespoke programming with a private instructor.",
    best: "A tailored, one-to-one practice",
    featured: false,
    rings: 3,
    perks: [
      "Everything in Residence",
      "A weekly 1:1 private reformer session",
      "Unlimited priority booking, 30 days ahead",
      "Curated recovery protocols",
      "Private lounge access",
    ],
  },
];

export type Cell = boolean | string;

/* In every plan, so the comparison does not repeat them */
export const includedEverywhere = ["Reformer and mat classes", "Recovery bar tonic", "Towel service and amenities"];

/* Only what actually changes between the plans: [Access, Residence, Atelier] */
export const compareRows: { label: string; values: [Cell, Cell, Cell] }[] = [
  { label: "Classes each month", values: ["6", "Unlimited", "Unlimited"] },
  { label: "Booking window", values: ["7 days", "14 days", "30 days"] },
  { label: "Guest passes", values: [false, "2 a month", "2 a month"] },
  { label: "Weekly recovery session", values: [false, true, true] },
  { label: "Weekly 1:1 private session", values: [false, false, true] },
  { label: "Curated recovery protocols", values: [false, false, true] },
  { label: "Private lounge access", values: [false, false, true] },
];

/* The request form lives lower on the page; the plan buttons choose a plan in it, then scroll there. */
export const PICK_PLAN_EVENT = "evoa:pick-plan";
export function requestPlan(id: PlanId) {
  window.dispatchEvent(new CustomEvent(PICK_PLAN_EVENT, { detail: id }));
  document.getElementById("request")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
