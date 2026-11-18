/* The address the site lives at, as a full URL, for things that must be absolute: the share image, the canonical address and
   the structured data.

   Set NEXT_PUBLIC_SITE_URL (for example https://www.evoapilates.com) in Vercel once the real domain is connected. Until then it
   uses the production address Vercel gives the project (VERCEL_PROJECT_PRODUCTION_URL, which Vercel fills in by itself and which
   becomes the custom domain when there is one), and on a developer's machine, localhost. */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
