"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { faqs } from "@/lib/data";

export function FaqAccordion({ items }: { items: readonly (typeof faqs)[number][] }) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-border-DEFAULT border-t border-b border-border-DEFAULT">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-serif text-[17px] md:text-[19px] text-ink">
                {item.question}
              </span>
              <Plus
                size={18}
                strokeWidth={1.5}
                className={cn(
                  "shrink-0 text-rose-500 transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-[var(--ease-out-quart)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 text-[15px] leading-relaxed text-ink-muted max-w-2xl">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
