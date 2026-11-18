import { NextResponse, type NextRequest } from "next/server";

/* COMING-SOON MODE. (Next 16 calls this file "proxy"; it used to be "middleware".) It runs before every page.

   When the environment variable COMING_SOON is "1" (set it for Production only, in Vercel), the public sees only the
   coming-soon page: every other address sends them to /coming-soon. The privacy policy and the terms stay open (the booking
   system needs their web addresses, and the form's consent line links to the first). The waitlist form's API and all images,
   fonts and scripts are never touched (see the matcher at the bottom).

   The client and the team still see the WHOLE site, on the same address, through a private link:
       https://<the site>/?preview=<PREVIEW_KEY>
   That sets a cookie (30 days, this browser only) and sends you to the page you asked for; after that every page works as
   normal. To switch it off in a browser, open  /?preview=off . PREVIEW_KEY is a second environment variable (a long random
   string). If it is not set, nobody can get in. To lock out everyone who has the link, change PREVIEW_KEY and redeploy.

   When COMING_SOON is not "1" (every Preview deployment, local work, and after launch) this does nothing and the whole site is
   public. Launch day: delete COMING_SOON in Vercel and redeploy.

   This is a shared secret link, not a login: anyone who is given the link can use it, so keep sensitive things out of the site
   until launch. */

const COOKIE = "evoa_preview";
const THIRTY_DAYS = 60 * 60 * 24 * 30;
const PUBLIC_PAGES = new Set(["/coming-soon", "/privacy-policy", "/terms-of-services"]);

export function proxy(request: NextRequest) {
  if (process.env.COMING_SOON !== "1") return NextResponse.next();

  const key = process.env.PREVIEW_KEY?.trim();
  const { pathname, searchParams } = request.nextUrl;

  // 1. someone using the private link (or turning it off): set or clear the cookie, and go on to the same page without ?preview
  const offered = searchParams.get("preview");
  if (offered !== null) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete("preview");
    const response = NextResponse.redirect(clean);
    if (offered === "off") {
      response.cookies.delete(COOKIE);
    } else if (key && offered === key) {
      response.cookies.set(COOKIE, key, {
        httpOnly: true,
        secure: request.nextUrl.protocol === "https:",
        sameSite: "lax",
        path: "/",
        maxAge: THIRTY_DAYS,
      });
    }
    return response;
  }

  // 2. someone who has the cookie: the whole site (the cookie holds the key, so changing PREVIEW_KEY ends it)
  if (key && request.cookies.get(COOKIE)?.value === key) return NextResponse.next();

  // 3. the public: the pages that are always open, and the coming-soon page for everything else
  if (PUBLIC_PAGES.has(pathname)) return NextResponse.next();
  return NextResponse.redirect(new URL("/coming-soon", request.url)); // a temporary (307) redirect
}

/* Everything except the waitlist API, Next's own files, and plain asset files (images, fonts, scripts and so on). Pages, and
   odd files such as .html, do go through it. (The values here must be constants.) */
export const config = {
  matcher: ["/((?!api/|_next/|.*\\.(?:ico|png|jpe?g|webp|avif|svg|gif|woff2?|ttf|otf|css|js|json|txt|xml|map|mp4|webm|pdf)$).*)"],
};
