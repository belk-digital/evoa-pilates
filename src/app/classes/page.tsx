import type { Metadata } from "next";
import { ClassesExplorer } from "@/components/classes/classes-explorer";
import { ClassesPath } from "@/components/classes/classes-path";
// Disabled for now (component kept): import { ClassesReformer } from "@/components/classes/classes-reformer";
import { ClassesTeachers } from "@/components/classes/classes-teachers";
import { ClassesPrepare, ClassesPrivate } from "@/components/classes/classes-extras";
import { ClassesFaq } from "@/components/classes/classes-faq";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Pilates classes at Evoa: reformer foundations, flow and sculpt, classical mat, prenatal and postnatal, and breath and stillness. Eight people, one instructor, no mirrors.",
};

export default function ClassesPage() {
  return (
    <>
      <ClassesExplorer />
      <ClassesPath />
      {/* <ClassesReformer /> disabled: the "Meet the reformer" diagram is not needed on the page for now */}
      <ClassesTeachers />
      <ClassesPrepare />
      <ClassesFaq />
      <ClassesPrivate />
    </>
  );
}
