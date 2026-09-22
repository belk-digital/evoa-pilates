import type { Metadata } from "next";
import { Adamina, Poppins, Pinyon_Script } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

const adamina = Adamina({
  variable: "--font-adamina",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const pinyonScript = Pinyon_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Evoa Pilates — Boutique Reformer & Mat Studio",
    template: "%s — Evoa Pilates",
  },
  description:
    "A boutique reformer & mat Pilates studio built around slow strength, precise movement, and a space that feels like an exhale.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${adamina.variable} ${poppins.variable} ${pinyonScript.variable} h-full antialiased`}>
      <head>
        <link
          href="https://db.onlinewebfonts.com/c/3c25a54b673cca21f6c3c4ef254785c0?family=kafina"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
