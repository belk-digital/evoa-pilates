/* The coming-soon waitlist. The form (components/soon/shared.tsx) posts an email address here, and this adds it to Kit, the
   client's newsletter tool, using Kit's v4 API (https://developers.kit.com). It runs on the server only, so the API key never
   reaches the browser.

   ENVIRONMENT VARIABLES (set them in Vercel for Production AND Preview, and in .env.local for local work; never in the code):
     KIT_API_KEY   a Kit v4 API key: Kit > Settings > Developer > "Add a new key". The key is shown only once.
     KIT_FORM_ID   optional: the number of a Kit form to put every signup in (it shows where they came from, and Kit's form
                   settings, such as the confirmation email for double opt-in, apply). Find it in GET /v4/forms.
     KIT_API_URL   optional, for tests only: replaces https://api.kit.com

   What it does for each signup: POST /v4/subscribers (creates the subscriber, or updates it if it is already there), then, if
   KIT_FORM_ID is set, POST /v4/forms/{id}/subscribers (adds them to the form). It is safe to submit the same address twice.

   Kit allows 120 requests a minute per API key (each signup uses 2), so about 60 signups a minute.
   Not yet confirmed against a real Kit account: whether a signup made this way is sent Kit's double opt-in confirmation email.
   Test it with the real key before launch, and set the form's opt-in option in Kit accordingly. */

const KIT_URL = (process.env.KIT_API_URL ?? "https://api.kit.com").replace(/\/$/, "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BAD_EMAIL = "Please check your email address.";
const GENERIC = "Something went wrong. Please try again in a moment.";

const fail = (status: number, message: string) => Response.json({ ok: false, message }, { status });

/* At most 5 tries a minute from one address. It lives in the memory of one server instance, so it is a best-effort brake on
   someone hammering the form (and using up Kit's own limit), not a guarantee. */
const tries = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  if (tries.size > 2000) {
    for (const [key, times] of tries) if (times[times.length - 1] < now - 60_000) tries.delete(key);
  }
  const recent = (tries.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  tries.set(ip, recent);
  return recent.length > 5;
}

function kit(path: string, body: unknown, key: string) {
  return fetch(`${KIT_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json", "X-Kit-Api-Key": key },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
}

export async function POST(request: Request) {
  // only our own pages may post here
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host) {
    let sameSite = false;
    try {
      sameSite = new URL(origin).host === host;
    } catch {
      /* a malformed origin counts as another site */
    }
    if (!sameSite) return fail(403, GENERIC);
  }

  let data: { email?: unknown; website?: unknown };
  try {
    data = await request.json();
  } catch {
    return fail(400, BAD_EMAIL);
  }

  // the bot trap: a person never sees this field. Say thanks, and throw it away.
  if (typeof data.website === "string" && data.website.trim() !== "") return Response.json({ ok: true });

  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL.test(email)) return fail(400, BAD_EMAIL);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return fail(429, "Too many tries. Please wait a minute and try again.");

  const key = process.env.KIT_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "development") {
      // so the page can be tried out locally before the Kit account exists
      console.warn("[waitlist] KIT_API_KEY is not set: pretending the signup worked (development only).");
      return Response.json({ ok: true, simulated: true });
    }
    console.error("[waitlist] KIT_API_KEY is not set, so no signup can be saved.");
    return fail(503, GENERIC);
  }

  // (emails are never written to the logs: only what went wrong)
  try {
    const created = await kit("/v4/subscribers", { email_address: email }, key);
    if (created.status === 422) return fail(400, BAD_EMAIL); // Kit says the address is not valid
    if (created.status === 429) {
      console.error("[waitlist] Kit's rate limit was reached.");
      return fail(503, "We are busy right now. Please try again in a minute.");
    }
    if (!created.ok) {
      console.error("[waitlist] Kit refused the signup. HTTP status:", created.status); // 401 means the API key is wrong
      return fail(502, GENERIC);
    }

    const formId = process.env.KIT_FORM_ID?.trim();
    if (formId && /^\d+$/.test(formId)) {
      const referer = request.headers.get("referer");
      const added = await kit(`/v4/forms/${formId}/subscribers`, { email_address: email, ...(referer ? { referrer: referer } : {}) }, key);
      // the subscriber is already on the list at this point, so a form problem is logged, not shown to the visitor
      if (!added.ok) console.error("[waitlist] Saved, but could not add the subscriber to the Kit form. HTTP status:", added.status);
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[waitlist] Could not reach Kit:", err instanceof Error ? err.name : "unknown error");
    return fail(502, GENERIC);
  }
}
