import type { Metadata, Viewport } from "next";
import { Walk } from "@/components/soon/walk";
import { siteConfig } from "@/lib/site";
import { siteUrl } from "@/lib/site-url";

/* The "coming soon" page: a scroll through one arched door after another, ending in the email form.

   Its share image is opengraph-image.jpg (and twitter-image.jpg) in this folder: Next adds the tags for it by itself.

   Search engines may index it only when coming-soon mode is on (COMING_SOON=1 in the environment when the site is built, which
   is Production on Vercel; see src/proxy.ts). Everywhere else (previews, local work, and after launch, when this page is no
   longer the front door) it is hidden from search. */
const live = process.env.COMING_SOON === "1";

const title = "EVOA | Pilates studio opening soon in Houston, Texas";
const description = "A thoughtfully curated mat and reformer Pilates studio in Houston, Texas. Opening soon. Join the list to be first through the door.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/coming-soon" },
  robots: live ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/coming-soon",
    siteName: "EVOA: Evolution of Awareness",
    locale: "en_US",
    title: "EVOA: Opening soon in Houston, Texas",
    description: `${siteConfig.tagline} A thoughtfully curated Pilates studio for mat and reformer classes. Join the list to be first through the door.`,
  },
  twitter: {
    card: "summary_large_image",
    title: "EVOA: Opening soon in Houston, Texas",
    description: `${siteConfig.tagline} Join the list to be first through the door.`,
  },
};

/* the colour of the browser's own bar on a phone: the page's sage */
export const viewport: Viewport = { themeColor: "#b9c5b1" };

/* what search engines read about the business: the name, the place and what it is (only what is known: no hours, phone or
   opening date yet) */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  name: "EVOA: Evolution of Awareness",
  description: siteConfig.description,
  url: siteUrl,
  image: `${siteUrl}/assets/Serene%20Pilates%20Studio%20with%20Arched%20Doorway%20(1).webp`,
  slogan: siteConfig.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address,
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77027",
    addressCountry: "US",
  },
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Walk />
    </>
  );
}
