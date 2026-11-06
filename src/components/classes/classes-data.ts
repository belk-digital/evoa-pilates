/* The class programme: EVOA's eight signature classes, four on the mat and four on the reformer, with the names, descriptions
   and level tags from the client's copy (CUERPO + ALMA). The client did not give lengths, the mat classes' level tags or the
   "best for" and "what to expect" lines; those are placeholders in the same voice, to be confirmed. */

export type ArtKind = "arch" | "wave" | "stripes" | "ring" | "orbs" | "sun" | "burst" | "reach";
export type ClassKind = "mat" | "reformer";

export interface StudioClass {
  id: string;
  /** the class's full name, as the client writes it */
  name: string;
  /** the name without the brand, for lists inside a discipline ("Form") */
  short: string;
  kind: ClassKind;
  length: string;
  /** who it suits: "All levels", "Intermediate to advanced" */
  level: string;
  /** what it works on: the client's tag ("Foundational", "Sculpt", "High intensity", "Stretch + Mobility") */
  focus: string;
  intensity: 1 | 2 | 3;
  beginner: boolean;
  /** one short line, shown in the list (the client's one-liner) */
  line: string;
  /** the fuller description, shown when the row is open (the client's description) */
  text: string;
  best: string;
  expect: string[];
  /** the colour of the artwork panel (brand palette) and which drawing sits on it */
  panel: string;
  art: ArtKind;
}

export const classes: StudioClass[] = [
  /* ---- Mat ---- */
  {
    id: "mat-sculpt",
    name: "EVOA Sculpt",
    short: "Sculpt",
    kind: "mat",
    length: "50 min",
    level: "All levels",
    focus: "Full body",
    intensity: 2,
    beginner: true,
    line: "Strengthen, tone and define through intentional full-body movement.",
    text: "A dynamic, full-body mat Pilates class combining controlled movements, deep core work and targeted muscle endurance to sculpt, strengthen and define.",
    best: "Full-body strength and core endurance",
    expect: [
      "Controlled movements through the whole body",
      "Deep core work from the first breath",
      "Targeted muscle endurance, built steadily",
    ],
    panel: "#d6d2c7",
    art: "orbs",
  },
  {
    id: "mat-flow",
    name: "EVOA Flow",
    short: "Flow",
    kind: "mat",
    length: "50 min",
    level: "All levels",
    focus: "Balance + flexibility",
    intensity: 2,
    beginner: true,
    line: "Move seamlessly through fluid sequences that inspire balance and connection.",
    text: "A seamless blend of classical Pilates, fluid movement and mindful breathing designed to improve flexibility, balance and body awareness.",
    best: "Balance, flexibility and body awareness",
    expect: [
      "Classical Pilates, linked into one fluid sequence",
      "Mindful breathing that sets the tempo",
      "Balance and flexibility that you can feel build",
    ],
    panel: "#8fa08a",
    art: "wave",
  },
  {
    id: "mat-ignite",
    name: "EVOA Ignite",
    short: "Ignite",
    kind: "mat",
    length: "50 min",
    level: "Intermediate to advanced",
    focus: "Higher intensity",
    intensity: 3,
    beginner: false,
    line: "Challenge your strength and stamina with energizing, dynamic movement.",
    text: "An energizing, higher-intensity mat experience featuring powerful sequences, continuous movement and core-focused conditioning to build strength and stamina.",
    best: "Strength and stamina",
    expect: [
      "Powerful sequences with continuous movement",
      "Core-focused conditioning throughout",
      "A higher intensity, with form still first",
    ],
    panel: "#d9c58e",
    art: "burst",
  },
  {
    id: "mat-restore",
    name: "EVOA Restore",
    short: "Restore",
    kind: "mat",
    length: "50 min",
    level: "All levels",
    focus: "Stretch + breathwork",
    intensity: 1,
    beginner: true,
    line: "Slow down, stretch deeply and reconnect with your body.",
    text: "A slower, intentional practice combining gentle Pilates, deep stretching, mobility and breathwork to release tension and reconnect body and mind.",
    best: "Tension, stress and recovery days",
    expect: [
      "Gentle Pilates at an unhurried pace",
      "Deep stretching and mobility",
      "Breathwork to release tension",
    ],
    panel: "#2f3a1c",
    art: "sun",
  },

  /* ---- Reformer ---- */
  {
    id: "reformer-form",
    name: "EVOA Form",
    short: "Form",
    kind: "reformer",
    length: "50 min",
    level: "All levels",
    focus: "Foundational",
    intensity: 1,
    beginner: true,
    line: "Build your foundation through alignment, precision and control.",
    text: "A foundational reformer experience focused on precision, alignment and controlled movement. Build core strength, improve posture and master the essentials of Pilates.",
    best: "First-timers and anyone returning to the essentials",
    expect: [
      "The reformer, springs and straps explained step by step",
      "Precision, alignment and control in every movement",
      "Core strength and posture, built from the foundation",
    ],
    panel: "#c4a96a",
    art: "arch",
  },
  {
    id: "reformer-define",
    name: "EVOA Define",
    short: "Define",
    kind: "reformer",
    length: "50 min",
    level: "All levels",
    focus: "Sculpt",
    intensity: 2,
    beginner: true,
    line: "Sculpt and strengthen with purposeful resistance.",
    text: "A full-body sculpting experience combining resistance, slow controlled sequences and targeted muscle engagement to build strength, stability and definition.",
    best: "Strength, stability and definition",
    expect: [
      "Purposeful resistance across the whole body",
      "Slow, controlled sequences",
      "Targeted muscle engagement, never rushed",
    ],
    panel: "#e6dcc6",
    art: "ring",
  },
  {
    id: "reformer-power",
    name: "EVOA Power",
    short: "Power",
    kind: "reformer",
    length: "50 min",
    level: "Intermediate to advanced",
    focus: "High intensity",
    intensity: 3,
    beginner: false,
    line: "Elevate your practice through dynamic, athletic movement.",
    text: "An athletic reformer class featuring challenging resistance, dynamic transitions and endurance-driven sequences designed to elevate strength, stamina and total-body conditioning.",
    best: "Experienced movers who want a challenge",
    expect: [
      "Challenging resistance and dynamic transitions",
      "Endurance-driven sequences",
      "Total-body conditioning, athletic and precise",
    ],
    panel: "#5e4b20",
    art: "stripes",
  },
  {
    id: "reformer-lengthen",
    name: "EVOA Lengthen",
    short: "Lengthen",
    kind: "reformer",
    length: "50 min",
    level: "All levels",
    focus: "Stretch + mobility",
    intensity: 1,
    beginner: true,
    line: "Restore mobility, enhance flexibility and find balance.",
    text: "A restorative reformer practice blending gentle resistance, intentional stretching and fluid movement to enhance mobility, release tension and create a sense of balance.",
    best: "Mobility, flexibility and release",
    expect: [
      "Gentle resistance with long, supported stretches",
      "Intentional stretching and fluid movement",
      "A sense of balance and release by the end",
    ],
    panel: "#b9c5b1",
    art: "reach",
  },
];

/* The two disciplines, in the client's words ("Two disciplines. One philosophy."). The mat comes first, as in the client's copy. */
export const disciplineOrder: ClassKind[] = ["mat", "reformer"];

export const disciplines: Record<ClassKind, { label: string; short: string; tagline: string; text: string; cta: string }> = {
  mat: {
    label: "The Mat Experience",
    short: "Mat",
    tagline: "Grounded in strength. Guided by flow.",
    text: "Discover the power of movement in its purest form. Our mat classes blend core strength, sculpting, flexibility and mindful movement.",
    cta: "Explore Mat Classes",
  },
  reformer: {
    label: "The Reformer Experience",
    short: "Reformer",
    tagline: "Precision in every movement. Power in every detail.",
    text: "Our reformer classes combine thoughtful resistance, controlled movement and innovative sequencing to create a transformative Pilates experience.",
    cta: "Explore Reformer Classes",
  },
};

export const byKind = (kind: ClassKind) => classes.filter((c) => c.kind === kind);

/* Links elsewhere on the page ask the programme to open a class: it scrolls there and opens the row. (A plain #hash is not
   enough, because the smooth-scroll library handles anchor clicks itself and the hash never changes.) */
export const OPEN_CLASS_EVENT = "evoa:open-class";
export function requestOpenClass(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CLASS_EVENT, { detail: id }));
}

/* ---- the "find your class" picker ---- */

export type Goal = "strength" | "stamina" | "posture" | "unwind" | "mobility";
export type Experience = "new" | "some" | "regular";

export const goals: { id: Goal; label: string }[] = [
  { id: "strength", label: "Build strength" },
  { id: "stamina", label: "Build stamina" },
  { id: "posture", label: "Improve posture" },
  { id: "unwind", label: "Unwind" },
  { id: "mobility", label: "Stretch and mobility" },
];

export const experiences: { id: Experience; label: string }[] = [
  { id: "new", label: "New to Pilates" },
  { id: "some", label: "Some experience" },
  { id: "regular", label: "I practise often" },
];

/* The picker's answer: a class id, or "needs-experience" when the goal depends on how well you know Pilates. Strength, stamina
   and posture depend on experience; unwinding and mobility do not. */
export function recommend(goal: Goal, experience: Experience | null): string | "needs-experience" {
  switch (goal) {
    case "strength":
      if (!experience) return "needs-experience";
      return experience === "new" ? "reformer-form" : experience === "some" ? "reformer-define" : "reformer-power";
    case "stamina":
      if (!experience) return "needs-experience";
      return experience === "new" ? "mat-sculpt" : experience === "some" ? "mat-ignite" : "reformer-power";
    case "posture":
      if (!experience) return "needs-experience";
      return experience === "new" ? "reformer-form" : "mat-flow";
    case "unwind":
      return "mat-restore";
    case "mobility":
      return "reformer-lengthen";
  }
}
