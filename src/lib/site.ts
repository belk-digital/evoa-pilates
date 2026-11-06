export const siteConfig = {
  name: "EVOA",
  /* The brand line from the client's copy, and the descriptor that sits beside "Evolution of Awareness" */
  tagline: "Movement with intention. Strength with soul.",
  descriptor: "Cuerpo + Alma",
  description:
    "EVOA is a thoughtfully curated Pilates studio in Houston, Texas, rooted in the connection between body, mind and soul. Mat and reformer classes, eight to a room.",
  email: "hello@evoapilates.com",
  phone: "Phone number to be confirmed",
  /* The studio's address (given by the client). `address` is the street line and `city` the rest, so each can be shown on its
     own line; `fullAddress` is the two together, for the footer and the legal pages. */
  address: "4743 Banning",
  city: "Houston, Texas 77027",
  fullAddress: "4743 Banning, Houston, Texas 77027",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=4743%20Banning%2C%20Houston%2C%20Texas%2077027",
  /* Every time on the site (today's hours, the next class) follows the studio's own clock. Houston is on US Central time,
     daylight saving included. To move the studio, change these two lines and the address above. */
  timeZone: "America/Chicago",
  timeZoneLabel: "Central Time",
  hours: [
    { day: "Monday – Friday", time: "6:00am – 8:00pm" },
    { day: "Saturday", time: "8:00am – 4:00pm" },
    { day: "Sunday", time: "9:00am – 2:00pm" },
  ],
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    tiktok: "https://tiktok.com",
  },
  nav: [
    { label: "About", href: "/about" },
    { label: "Classes", href: "/classes" },
    { label: "Schedule", href: "/schedule" },
    { label: "Membership", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
};
