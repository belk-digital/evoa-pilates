export const classTypes = [
  {
    slug: "reformer",
    name: "Reformer",
    duration: "50 min",
    level: "All levels",
    tone: "rose" as const,
    description:
      "Spring-loaded resistance work on the carriage — the full-body foundation of everything we teach.",
  },
  {
    slug: "mat",
    name: "Mat",
    duration: "45 min",
    level: "All levels",
    tone: "sage" as const,
    description:
      "Classical, floor-based sequencing that builds core control using nothing but your own bodyweight.",
  },
  {
    slug: "sculpt",
    name: "Reformer Sculpt",
    duration: "50 min",
    level: "Intermediate",
    tone: "bronze" as const,
    description:
      "A faster-paced reformer flow layered with light weights for extra definition through the arms and glutes.",
  },
  {
    slug: "prenatal",
    name: "Prenatal",
    duration: "50 min",
    level: "All trimesters",
    tone: "mauve" as const,
    description:
      "Pelvic-floor aware programming designed with an OB-reviewed curriculum, for every stage of pregnancy.",
  },
  {
    slug: "private",
    name: "Private 1:1",
    duration: "55 min",
    level: "Custom",
    tone: "ink" as const,
    description:
      "One-on-one time with a senior instructor — ideal for injury recovery, form correction, or a tailored plan.",
  },
  {
    slug: "stretch",
    name: "Deep Stretch",
    duration: "40 min",
    level: "All levels",
    tone: "rose" as const,
    description:
      "Assisted mobility work to close out the week — slow, guided, and deeply restorative.",
  },
] as const;

export const benefits = [
  {
    title: "Small by design",
    description: "Eight reformers per class, capped — so every cue is seen and every form is corrected.",
  },
  {
    title: "Certified, not casual",
    description: "Every instructor completes 500+ hours of classical training before they teach a single class.",
  },
  {
    title: "Programmed, not random",
    description: "Classes follow a progressive curriculum across the week, not a random shuffle of moves.",
  },
  {
    title: "A room that feels calm",
    description: "Warm light, quiet materials, and a no-mirror studio floor — movement without the performance.",
  },
];

export const instructors = [
  {
    name: "Sofia Marchetti",
    role: "Founder & Master Instructor",
    bio: "Classically trained in New York before opening Evoa to bring the same precision to a slower, warmer room.",
    tone: "rose" as const,
  },
  {
    name: "Nadia Okafor",
    role: "Lead Reformer Instructor",
    bio: "Former dance physiotherapist specializing in rehab-informed reformer programming.",
    tone: "sage" as const,
  },
  {
    name: "Priya Anand",
    role: "Prenatal & Postnatal Lead",
    bio: "OB-reviewed curriculum designer supporting clients through every trimester and beyond.",
    tone: "bronze" as const,
  },
];

export const testimonials = [
  {
    quote:
      "Evoa is the first studio that made me actually understand what my body was doing. I feel taller, longer, and so much steadier.",
    name: "Jordan R.",
    detail: "Member since 2024",
  },
  {
    quote:
      "The room itself is half the reason I come back — no blaring music, no mirrors, just really good teaching.",
    name: "Camille D.",
    detail: "Member since 2023",
  },
  {
    quote:
      "I did prenatal classes through both pregnancies here. Priya's cueing made me feel safe every single session.",
    name: "Alina M.",
    detail: "Prenatal client",
  },
  {
    quote:
      "Small class sizes mean actual hands-on corrections — I've made more progress in three months than a year elsewhere.",
    name: "Hannah W.",
    detail: "Member since 2025",
  },
];

export const pricingPlans = [
  {
    name: "Drop-In",
    price: "$38",
    unit: "/ class",
    description: "For visiting friends or a first, no-commitment try.",
    features: ["Any class format", "Reformer included", "Valid 30 days"],
    featured: false,
  },
  {
    name: "8-Class Pack",
    price: "$268",
    unit: "/ pack",
    description: "The most popular way to build a steady, once-or-twice-a-week rhythm.",
    features: ["$33.50 per class", "Any class format", "Valid 90 days", "Guest pass included"],
    featured: true,
  },
  {
    name: "Unlimited Monthly",
    price: "$219",
    unit: "/ month",
    description: "For the every-week movers who want the studio to feel like home.",
    features: ["Unlimited classes", "Priority booking", "2 guest passes / month", "Pause anytime"],
    featured: false,
  },
];

export const faqs = [
  {
    question: "I've never done Pilates before — where do I start?",
    answer:
      "Start with a Mat or Foundations Reformer class. We ask new clients to arrive 15 minutes early so an instructor can walk you through the equipment before class begins.",
  },
  {
    question: "What should I wear?",
    answer:
      "Fitted, non-baggy clothing and grip socks (available for purchase at the studio). Loose fabric can catch in the reformer springs.",
  },
  {
    question: "How far in advance can I book?",
    answer:
      "Classes open two weeks ahead. Members get 48-hour priority access before the general booking window opens.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "Cancel or move your reservation up to 12 hours before class with no penalty. Late cancellations forfeit the class credit.",
  },
];

export const schedule: Record<string, { time: string; class: string; instructor: string }[]> = {
  Monday: [
    { time: "6:00 AM", class: "Reformer", instructor: "Sofia" },
    { time: "9:00 AM", class: "Mat", instructor: "Nadia" },
    { time: "5:30 PM", class: "Reformer Sculpt", instructor: "Sofia" },
    { time: "7:00 PM", class: "Deep Stretch", instructor: "Nadia" },
  ],
  Tuesday: [
    { time: "6:30 AM", class: "Reformer", instructor: "Nadia" },
    { time: "9:30 AM", class: "Prenatal", instructor: "Priya" },
    { time: "6:00 PM", class: "Mat", instructor: "Sofia" },
  ],
  Wednesday: [
    { time: "6:00 AM", class: "Reformer", instructor: "Sofia" },
    { time: "9:00 AM", class: "Reformer Sculpt", instructor: "Nadia" },
    { time: "5:30 PM", class: "Reformer", instructor: "Sofia" },
    { time: "7:00 PM", class: "Private 1:1", instructor: "By appointment" },
  ],
  Thursday: [
    { time: "6:30 AM", class: "Mat", instructor: "Nadia" },
    { time: "9:30 AM", class: "Prenatal", instructor: "Priya" },
    { time: "6:00 PM", class: "Reformer", instructor: "Sofia" },
  ],
  Friday: [
    { time: "6:00 AM", class: "Reformer", instructor: "Sofia" },
    { time: "9:00 AM", class: "Deep Stretch", instructor: "Nadia" },
    { time: "5:00 PM", class: "Reformer Sculpt", instructor: "Sofia" },
  ],
  Saturday: [
    { time: "8:00 AM", class: "Reformer", instructor: "Sofia" },
    { time: "9:15 AM", class: "Mat", instructor: "Nadia" },
    { time: "10:30 AM", class: "Prenatal", instructor: "Priya" },
  ],
  Sunday: [
    { time: "9:00 AM", class: "Reformer", instructor: "Nadia" },
    { time: "10:15 AM", class: "Deep Stretch", instructor: "Sofia" },
  ],
};
