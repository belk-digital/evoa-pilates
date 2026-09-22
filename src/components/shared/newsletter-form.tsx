"use client";

import { ArrowRight } from "lucide-react";

export function NewsletterForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center border-b border-cream/25 focus-within:border-cream/70 transition-colors"
    >
      <input
        type="email"
        required
        placeholder="Email address"
        className="w-full bg-transparent py-2.5 text-[14px] text-cream placeholder:text-cream/40 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-9 w-9 shrink-0 items-center justify-center text-cream/70 hover:text-cream transition-colors"
      >
        <ArrowRight size={16} strokeWidth={1.5} />
      </button>
    </form>
  );
}
