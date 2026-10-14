import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond, Syne, Boldonse, Bonheur_Royale, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const boldonse = Boldonse({
  variable: "--font-boldonse",
  subsets: ["latin"],
  weight: ["400"],
});

const bonheurRoyale = Bonheur_Royale({
  variable: "--font-bonheur",
  subsets: ["latin"],
  weight: ["400"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "Evoa — Evolution of Awareness",
    template: "%s — Evoa",
  },
  description:
    "A private wellness club for movement, breath, and nervous system restoration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${poppins.variable} ${syne.variable} ${boldonse.variable} ${bonheurRoyale.variable} ${instrumentSerif.variable} h-full antialiased`}>
      {/* suppressHydrationWarning: browser extensions inject attributes (e.g. __processed_…__) onto <body> before React hydrates */}
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-plaster text-ink">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
