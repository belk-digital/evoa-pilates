"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

const fieldClass =
  "w-full rounded-sm border border-border-DEFAULT bg-cream px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-subtle focus:outline-none focus:border-ink/40 transition-colors";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-3 rounded-md bg-cream-warm/70 p-8">
        <span className="font-serif text-[20px] text-ink">Thank you.</span>
        <p className="text-[14px] leading-relaxed text-ink-muted">
          Someone from our front desk will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input type="text" required placeholder="First name" className={fieldClass} />
        <input type="text" required placeholder="Last name" className={fieldClass} />
      </div>
      <input type="email" required placeholder="Email address" className={fieldClass} />
      <input type="tel" placeholder="Phone (optional)" className={fieldClass} />
      <select required defaultValue="" className={fieldClass}>
        <option value="" disabled>
          I&apos;m interested in…
        </option>
        <option>Booking my first class</option>
        <option>Membership options</option>
        <option>Private sessions</option>
        <option>Something else</option>
      </select>
      <textarea rows={4} placeholder="Tell us a little about you" className={fieldClass} />
      <Button type="submit" size="lg" className="w-fit">
        Send Message
      </Button>
    </form>
  );
}
