/* The class programme. Names, lengths, levels and copy are placeholders in the brand voice until the client confirms them
   (the four from the homepage poster row plus Sculpt and Prenatal). */

export type ArtKind = "arch" | "wave" | "stripes" | "ring" | "orbs" | "sun";
export type ClassKind = "reformer" | "mat" | "prenatal" | "recovery";

export interface StudioClass {
  id: string;
  name: string;
  kind: ClassKind;
  length: string;
  level: string;
  intensity: 1 | 2 | 3;
  beginner: boolean;
  /** one short line, shown in the list */
  line: string;
  /** the fuller description, shown when the row is open */
  text: string;
  best: string;
  expect: string[];
  /** the colour of the artwork panel (brand palette) and which drawing sits on it */
  panel: string;
  art: ArtKind;
}

export const classes: StudioClass[] = [
  {
    id: "reformer-foundations",
    name: "Reformer Foundations",
    kind: "reformer",
    length: "50 min",
    level: "All levels",
    intensity: 1,
    beginner: true,
    line: "Learn the machine, begin with breath.",
    text: "The place to begin. We teach the machine, the springs and the principles of breath, alignment and control, slowly enough that every cue lands.",
    best: "First-timers and returning clients",
    expect: [
      "The reformer, springs and straps explained step by step",
      "Breath, alignment and control as the three principles",
      "Hands-on cueing and small adjustments throughout",
    ],
    panel: "#c4a96a",
    art: "arch",
  },
  {
    id: "reformer-flow",
    name: "Reformer Flow",
    kind: "reformer",
    length: "50 min",
    level: "Intermediate",
    intensity: 2,
    beginner: false,
    line: "Longer holds, fewer pauses.",
    text: "A continuous sequence that builds strength and stamina without impact. Longer holds, smoother transitions and spring changes that keep you honest.",
    best: "Building strength and stamina",
    expect: [
      "A steady, unbroken sequence with fewer pauses",
      "Spring changes that ask for control, not speed",
      "A progression you can repeat and feel week by week",
    ],
    panel: "#8fa08a",
    art: "wave",
  },
  {
    id: "reformer-sculpt",
    name: "Reformer Sculpt",
    kind: "reformer",
    length: "50 min",
    level: "Intermediate to advanced",
    intensity: 3,
    beginner: false,
    line: "Definition and power, low impact.",
    text: "A faster reformer flow layered with light weights, working the arms, glutes and deep core under tension. Strong, but never rushed.",
    best: "Definition, power and experienced movers",
    expect: [
      "A quicker tempo with light weights added to the work",
      "Arms, glutes and deep core held under steady tension",
      "Moves that reward patience and precision over speed",
    ],
    panel: "#5e4b20",
    art: "stripes",
  },
  {
    id: "classical-mat",
    name: "Classical Mat",
    kind: "mat",
    length: "55 min",
    level: "Intermediate",
    intensity: 2,
    beginner: false,
    line: "The floor repertoire, paced by breath.",
    text: "The classical floor repertoire with nothing but a mat and your own body. Spinal control and articulation, paced entirely by breath.",
    best: "Posture and deep core",
    expect: [
      "The classical order of exercises, taught with care",
      "Spinal articulation and a steady, supported core",
      "Modifications offered so everyone works at their level",
    ],
    panel: "#e6dcc6",
    art: "ring",
  },
  {
    id: "prenatal-postnatal",
    name: "Prenatal & Postnatal",
    kind: "prenatal",
    length: "50 min",
    level: "All trimesters",
    intensity: 1,
    beginner: true,
    line: "Pelvic-floor aware, for every stage.",
    text: "Pelvic-floor aware programming for pregnancy and the months after, built on an OB-reviewed curriculum. Positions and pace follow where you are.",
    best: "Pregnancy, and the months that follow",
    expect: [
      "Sequencing that is aware of the pelvic floor",
      "Positions chosen for each trimester and stage",
      "Time to rest, and a room where nothing is rushed",
    ],
    panel: "#d6d2c7",
    art: "orbs",
  },
  {
    id: "breath-stillness",
    name: "Breath & Stillness",
    kind: "recovery",
    length: "40 min",
    level: "All levels",
    intensity: 1,
    beginner: true,
    line: "Slow mobility and guided breathwork.",
    text: "Slow mobility and guided breathwork to bring the nervous system down. A class for tension, stress and recovery days, with nothing to prove.",
    best: "Stress, tension and recovery days",
    expect: [
      "Gentle mobility and long, supported stretches",
      "Guided breathwork to settle the nervous system",
      "A quiet finish before you leave",
    ],
    panel: "#2f3a1c",
    art: "sun",
  },
];

/* Links elsewhere on the page ask the programme to open a class: it scrolls there and opens the row. (A plain #hash is not
   enough, because the smooth-scroll library handles anchor clicks itself and the hash never changes.) */
export const OPEN_CLASS_EVENT = "evoa:open-class";
export function requestOpenClass(id: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CLASS_EVENT, { detail: id }));
}

/* ---- the "find your class" picker ---- */

export type Goal = "strength" | "posture" | "unwind" | "pregnancy" | "recovery";
export type Experience = "new" | "some" | "regular";

export const goals: { id: Goal; label: string }[] = [
  { id: "strength", label: "Build strength" },
  { id: "posture", label: "Improve posture" },
  { id: "unwind", label: "Unwind" },
  { id: "pregnancy", label: "Pregnancy" },
  { id: "recovery", label: "Recover from injury" },
];

export const experiences: { id: Experience; label: string }[] = [
  { id: "new", label: "New to Pilates" },
  { id: "some", label: "Some experience" },
  { id: "regular", label: "I practise often" },
];

/* The picker's answer: a class id, or "private" (a conversation first, see the private band). Strength and posture depend
   on experience; the others do not. */
export function recommend(goal: Goal, experience: Experience | null): string | "private" | "needs-experience" {
  switch (goal) {
    case "strength":
      if (!experience) return "needs-experience";
      return experience === "new" ? "reformer-foundations" : experience === "some" ? "reformer-flow" : "reformer-sculpt";
    case "posture":
      if (!experience) return "needs-experience";
      return experience === "new" ? "reformer-foundations" : "classical-mat";
    case "unwind":
      return "breath-stillness";
    case "pregnancy":
      return "prenatal-postnatal";
    case "recovery":
      return "private";
  }
}
