"use client";

import * as React from "react";
import { schedule } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const days = Object.keys(schedule);

export function ScheduleTable() {
  const [activeDay, setActiveDay] = React.useState(days[0]);
  const classes = schedule[activeDay];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-[13px] tracking-wide transition-colors",
              activeDay === day
                ? "bg-ink text-cream"
                : "bg-transparent text-ink-muted border border-ink/10 hover:border-ink/30"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex flex-col divide-y divide-border-DEFAULT border-t border-b border-border-DEFAULT">
        {classes.map((c) => (
          <div
            key={`${activeDay}-${c.time}-${c.class}`}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-5"
          >
            <span className="w-24 shrink-0 text-[13px] text-ink-subtle tracking-wide">
              {c.time}
            </span>
            <div className="flex-1 flex flex-col">
              <span className="font-serif text-[18px] text-ink">{c.class}</span>
              <span className="text-[13px] text-ink-muted">with {c.instructor}</span>
            </div>
            <Button variant="outline" size="sm" className="w-fit sm:w-auto">
              Reserve Spot
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
