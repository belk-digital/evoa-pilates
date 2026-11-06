import type { Metadata } from "next";
import { ClassesExplorer } from "@/components/classes/classes-explorer";
import { ClassesPath } from "@/components/classes/classes-path";
// Disabled for now (component kept): import { ClassesReformer } from "@/components/classes/classes-reformer";
import { ClassesTeachers } from "@/components/classes/classes-teachers";
import { ClassesPrepare } from "@/components/classes/classes-extras";
// Disabled for now (component kept): the client's classes and pricing have no private or duet sessions. import { ClassesPrivate } from "@/components/classes/classes-extras";
import { ClassesFaq } from "@/components/classes/classes-faq";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "EVOA's eight signature classes: Sculpt, Flow, Ignite and Restore on the mat, Form, Define, Power and Lengthen on the reformer. Eight people, one instructor, no mirrors.",
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
      {/* <ClassesPrivate /> disabled: private and duet sessions are not part of the client's classes or pricing for now */}
    </>
  );
}
