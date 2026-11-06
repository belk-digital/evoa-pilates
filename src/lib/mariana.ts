/* Mariana Tek web integrations: booking, buying and the customer account, embedded in our own pages.

   THESE ARE THE SANDBOX VALUES from Mariana Tek (dummy data). Before launch Mariana provides production values: set the three
   NEXT_PUBLIC_MARIANA_* environment variables (or change the defaults below). The location and region IDs differ between the
   sandbox and production, so all three must be swapped together. Docs: https://docs.marianatek.com/docs/web-integrations */

const tenant = process.env.NEXT_PUBLIC_MARIANA_TENANT ?? "evoapilates.sandbox";
const locationId = process.env.NEXT_PUBLIC_MARIANA_LOCATION_ID ?? "48730";
const regionId = process.env.NEXT_PUBLIC_MARIANA_REGION_ID ?? "48547";

export const mariana = {
  tenant,
  locationId,
  regionId,

  /** where Mariana's script is served from (the snippet in their docs builds the same address) */
  scriptBase: `https://${tenant}.marianaiframes.com`,
  /** login, create account and password reset live on Mariana's own domain and cannot be embedded */
  resetPasswordUrl: `https://${tenant}.marianatek.com/auth/password_reset_email/`,

  /** the value of data-mariana-integrations for each page. One studio, so the location is fixed (and location navigation is
      switched off on Mariana's side, which is a request to their support, not a setting here) */
  routes: {
    account: "/account",
    buy: `/buy/${locationId}`,
    schedule: `/schedule/daily/${regionId}?locations=${locationId}`,
  },

  /** our pages that host an embed. Mariana's script looks for its container once, when it loads, so a second embed page in
      the same browser session must be a full page load (see MarianaNav and MarianaEmbed) */
  embedPaths: ["/schedule", "/pricing", "/account"],
} as const;
