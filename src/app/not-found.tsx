import type { Metadata } from "next";
import { NotFoundScene } from "@/components/not-found/not-found-scene";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for has moved or never existed.",
};

export default function NotFound() {
  return <NotFoundScene />;
}
