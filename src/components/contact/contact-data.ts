import type { ArtKind } from "@/components/classes/classes-data";

/* What people can write to us about. Each topic has its own small drawing (the same artwork as the classes), the line shown
   under it, the label on the send button and the hint inside the message box. `asksTime` shows the "when suits you" choice. */
export type TopicId = "class" | "pricing" | "other";

export interface Topic {
  id: TopicId;
  title: string;
  /** what the thank-you line says the message was about */
  subject: string;
  text: string;
  panel: string;
  art: ArtKind;
  cta: string;
  placeholder: string;
  asksTime: boolean;
}

export const topics: Topic[] = [
  {
    id: "class",
    title: "Book a class",
    subject: "booking a class",
    text: "Tell us what you would like to try and when, and we will help you book.",
    panel: "#c4a96a",
    art: "arch",
    cta: "Request a class",
    placeholder: "Anything we should know before you come? Injuries, goals, or the class you have in mind.",
    asksTime: true,
  },
  {
    id: "pricing",
    title: "Pricing & packages",
    subject: "pricing and packages",
    text: "Drop-ins, class packs, monthly and unlimited: which one suits your week.",
    panel: "#8fa08a",
    art: "stripes",
    cta: "Send my question",
    placeholder: "What would you like to know about the packages?",
    asksTime: false,
  },
  {
    id: "other",
    title: "Something else",
    subject: "your question",
    text: "Press, partnerships, lost property, or anything at all.",
    panel: "#2f3a1c",
    art: "wave",
    cta: "Send message",
    placeholder: "How can we help?",
    asksTime: false,
  },
];

export const timeSlots = ["Mornings", "Midday", "Evenings", "Weekends"];

/* /contact?topic=pricing (or class, other) opens the page with that topic already chosen */
export const TOPIC_PARAM = "topic";
export function isTopic(value: string | null): value is TopicId {
  return topics.some((t) => t.id === value);
}

/* A button elsewhere on the page chooses a topic in the form, then scrolls to it */
export const PICK_TOPIC_EVENT = "evoa:pick-topic";
export function requestTopic(id: TopicId) {
  window.dispatchEvent(new CustomEvent(PICK_TOPIC_EVENT, { detail: id }));
  document.getElementById("enquire")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
