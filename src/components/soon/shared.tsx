"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RollingButton } from "@/components/about/rolling-button";
import { EASE_OUT } from "@/components/intro/fly";
import { BrandLogo } from "@/components/ui/brand-logo";
import { cn } from "@/lib/utils";

/* Pieces of the "coming soon" page (components/soon/walk.tsx). */

/* All of these are already in /public/assets and used elsewhere on the site */
export const PHOTO = {
  doorway: encodeURI("/assets/Serene Pilates Studio with Arched Doorway (1).webp"),
  /* Landscape photographs, for full-screen use. The portrait class photos (class-mat, class-reformer) are only 1122px wide, so
     shown full-width they were stretched about twice and looked soft. The largest photo in the project is 1672px wide, so even
     these are enlarged a little on a big screen; sharper results need larger originals. */
  mat: encodeURI("/assets/Serene Symmetrical Pilates Studio.webp"), // mats laid out on the floor
  reformer: encodeURI("/assets/Luxurious Sunlit Pilates Studio.webp"), // a reformer in the room
  /* The same two rooms as PORTRAIT photographs, for phones and tablets held upright. A wide photograph on a tall screen shows
     only its middle strip (about a third of the picture), which on these two is bare floor and a piece of machinery: it does
     not explain itself. A portrait photograph fills a tall screen, so the person and the room are in it. (class-mat.webp is a
     reformer and class-reformer.webp is a mat exercise: the files are named the wrong way round.) */
  matPortrait: encodeURI("/assets/Sunlit Pilates Pose in a Green Studio.webp"), // a mat exercise in the green-tiled studio
  reformerPortrait: "/assets/class-mat.webp", // reformer work with the straps
};

/* The wordmark and place, pinned to the top of a full-screen page. It arrives with a hard-edged wipe from the left (the logo
   first, then the place): `show` says when, `delay` how long after that, and `instant` skips the motion. */
export function TopBar({
  tone = "light",
  fixed = false,
  show = true,
  delay = 0,
  instant = false,
}: {
  tone?: "light" | "dark";
  fixed?: boolean;
  show?: boolean;
  delay?: number;
  instant?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10 sm:py-7",
        fixed ? "fixed" : "absolute",
        tone === "light" ? "text-forest" : "text-mint"
      )}
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      animate={{ clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
      transition={{ duration: instant ? 0 : 1, delay: instant ? 0 : delay, ease: EASE_OUT }}
    >
      {/* the real EVOA lockup: the green artwork on light backgrounds, the cream artwork (with a soft shadow) on photographs */}
      <BrandLogo tone={tone} shadow={tone === "dark"} className="h-[40px] sm:h-[50px]" />
      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] sm:text-[11px]">Houston, Texas</span>
    </motion.div>
  );
}

const GENERIC_ERROR = "Something went wrong. Please try again in a moment.";

/* The waitlist form. It posts the email to /api/waitlist (app/api/waitlist/route.ts), which adds it to Kit, the client's
   newsletter tool. The hidden "website" field is a trap for bots: people never see or fill it, so a filled one is thrown away. */
export function WaitlistForm({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = React.useId();
  const [email, setEmail] = React.useState("");
  const [trap, setTrap] = React.useState("");
  const [state, setState] = React.useState<"idle" | "sending" | "done" | "error">("idle");
  const [note, setNote] = React.useState("");

  const fail = (message: string) => {
    setNote(message);
    setState("error");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "sending") return;
    const address = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(address)) {
      fail("Please check your email address.");
      return;
    }
    setState("sending");
    setNote("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: address, website: trap }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!res.ok || !data?.ok) {
        fail(data?.message ?? GENERIC_ERROR);
        return;
      }
      setState("done");
    } catch {
      fail(GENERIC_ERROR);
    }
  };

  const light = tone === "light";
  return (
    <form onSubmit={submit} noValidate className={cn("w-full max-w-[430px]", className)}>
      {state === "done" ? (
        <p
          role="status"
          className={cn(
            "rounded-full border px-6 py-4 text-center font-sans text-[13px] font-medium tracking-wide",
            light ? "border-forest/35 text-forest" : "border-mint/40 text-mint"
          )}
        >
          Thank you. You are on the list.
        </p>
      ) : (
        <>
          <label htmlFor={id} className="sr-only">
            Email address
          </label>
          {/* the bot trap: off screen, out of the tab order, hidden from screen readers */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={trap}
            onChange={(e) => setTrap(e.target.value)}
            className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
          />
          <div
            className={cn(
              "flex items-center gap-2 rounded-full border p-1.5 pl-5 transition-colors",
              light ? "border-forest/35 bg-white/30 focus-within:border-forest" : "border-mint/40 bg-white/5 focus-within:border-mint"
            )}
          >
            <input
              id={id}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              className={cn(
                "min-w-0 flex-1 bg-transparent font-sans text-[14px] outline-none",
                light ? "text-forest placeholder:text-forest/55" : "text-mint placeholder:text-mint/55"
              )}
            />
            <RollingButton type="submit" variant={light ? "dark" : "solid"} disabled={state === "sending"}>
              {state === "sending" ? "Sending" : "Notify me"}
            </RollingButton>
          </div>
          <p role="status" aria-live="polite" className={cn("mt-2 min-h-4 text-center font-sans text-[11px] tracking-wide", light ? "text-rust" : "text-peach")}>
            {state === "error" ? note : ""}
          </p>
          <p className={cn("mt-1 text-center font-sans text-[11px] font-light leading-snug", light ? "text-forest/70" : "text-mint/65")}>
            By joining you agree to receive emails from EVOA about our opening. You can unsubscribe at any time.{" "}
            <Link href="/privacy-policy" className="underline underline-offset-2 transition-opacity hover:opacity-70">
              Privacy Policy
            </Link>
            .
          </p>
        </>
      )}
    </form>
  );
}
