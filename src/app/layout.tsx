import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import "./globals.css";

// Brand board: Cormorant Garamond Light (primary: headings) + Montserrat Light (secondary: text)
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Evoa: Evolution of Awareness",
    template: "%s | Evoa",
  },
  description:
    "A private wellness club for movement, breath, and nervous system restoration.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable} h-full antialiased`}>
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
