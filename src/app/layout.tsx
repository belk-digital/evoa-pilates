import type { Metadata } from "next";
import { Bodoni_Moda, Montserrat } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { MarianaNav } from "@/components/mariana/mariana-nav";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

/* The client's Typography System: an elegant modern serif with an editorial luxury feel (a Didone, high-contrast serif) as the
   primary face, and a clean, architectural geometric sans (Montserrat) as the secondary one. Serif carries emotion, ritual and
   luxury (headings, statements, names); sans carries instruction, movement and clarity (text, labels, times, buttons).

   TO GO BACK to the earlier primary face (Cormorant Garamond), comment out the Bodoni_Moda block and its import, and
   uncomment the Cormorant block below (and its import). Nothing else needs to change: every serif on the site reads the
   single variable --font-primary-serif (see globals.css). Re-check heading sizes after switching, as the two faces differ in width. */
const primarySerif = Bodoni_Moda({
  variable: "--font-primary-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});

/* import { Cormorant_Garamond } from "next/font/google";
const primarySerif = Cormorant_Garamond({
  variable: "--font-primary-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
}); */

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  // lets pages use relative addresses for their share images and canonical links (see lib/site-url.ts)
  metadataBase: new URL(siteUrl),
  title: {
    default: "EVOA: Evolution of Awareness",
    template: "%s | EVOA",
  },
  description:
    "Movement with intention. Strength with soul. EVOA is a Pilates studio in Houston, Texas, for mat and reformer classes that connect body, mind and soul.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${primarySerif.variable} ${montserrat.variable} h-full antialiased`}>
      <head>
        {/* the home page's entrance (components/intro/intro-context.tsx makes the same decision): when it is going to play (the home page, a new visit or ?intro, no reduced motion), mark the page so CSS covers it from the very first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(location.pathname!=="/"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;var s=0;try{s=sessionStorage.getItem("evoa-intro")}catch(e){}if(!s||new URLSearchParams(location.search).has("intro")){document.documentElement.setAttribute("data-intro","1");history.scrollRestoration="manual"}}catch(e){}})()`,
          }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions inject attributes (e.g. __processed_…__) onto <body> before React hydrates */}
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-plaster text-ink">
        <MarianaNav />
        <SmoothScrollProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
