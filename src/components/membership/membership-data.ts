/* Membership and pricing content, from the client's price table: drop-ins, class packs, monthly reformer packages and unlimited.
   The prices are the client's proposal and are to be confirmed; the descriptions around them are placeholder copy in the brand
   voice. Prices per class are the client's too, and each can be checked: price divided by classes. */

export type PackageKind = "dropin" | "pack" | "monthly" | "unlimited";
export type Discipline = "mat" | "reformer" | "both";

export interface Pkg {
  id: string;
  kind: PackageKind;
  discipline: Discipline;
  name: string;
  price: number;
  /** classes included, where the number is fixed */
  classes?: number;
  /** price per class, where it is fixed (unlimited is priced by use) */
  perClass?: number;
  best?: string;
}

export const packages: Pkg[] = [
  { id: "dropin-mat", kind: "dropin", discipline: "mat", name: "Mat drop-in", price: 28, classes: 1, perClass: 28 },
  { id: "dropin-reformer", kind: "dropin", discipline: "reformer", name: "Reformer drop-in", price: 42, classes: 1, perClass: 42 },

  { id: "pack-mat-5", kind: "pack", discipline: "mat", name: "5 mat classes", price: 125, classes: 5, perClass: 25 },
  { id: "pack-mat-10", kind: "pack", discipline: "mat", name: "10 mat classes", price: 230, classes: 10, perClass: 23 },
  { id: "pack-reformer-5", kind: "pack", discipline: "reformer", name: "5 reformer classes", price: 190, classes: 5, perClass: 38 },
  { id: "pack-reformer-10", kind: "pack", discipline: "reformer", name: "10 reformer classes", price: 350, classes: 10, perClass: 35 },

  { id: "monthly-4", kind: "monthly", discipline: "reformer", name: "Four a month", price: 149, classes: 4, perClass: 37.25, best: "About once a week" },
  { id: "monthly-8", kind: "monthly", discipline: "reformer", name: "Eight a month", price: 219, classes: 8, perClass: 27.38, best: "About twice a week" },
  { id: "monthly-12", kind: "monthly", discipline: "reformer", name: "Twelve a month", price: 289, classes: 12, perClass: 24.08, best: "About three times a week" },

  { id: "unlimited-mat", kind: "unlimited", discipline: "mat", name: "Unlimited Mat", price: 179 },
  { id: "unlimited-both", kind: "unlimited", discipline: "both", name: "Unlimited Mat + Reformer", price: 329 },
];

export const packageById = (id: string) => packages.find((p) => p.id === id);
export const byKind = (kind: PackageKind) => packages.filter((p) => p.kind === kind);

/* "$37.25", "$28": whole dollars without cents, otherwise two decimals */
export const money = (n: number) => `$${Number.isInteger(n) ? n.toLocaleString("en-US") : n.toFixed(2)}`;
export const perClassText = (p: Pkg) => (p.perClass ? `${money(p.perClass)} a class` : "Priced by use");

/* The package buttons on the page scroll to the buy section (Mariana Tek's shop), where the package is chosen and paid for. */
export function goToBuy() {
  document.getElementById("buy")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
