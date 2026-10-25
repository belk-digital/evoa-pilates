import { CAPACITY } from "@/components/schedule/schedule-data";
import { cn } from "@/lib/utils";

/* Eight small circles, one for each place in the room: filled when taken, open when free, and gold for the one you reserve. */
export function SpotDots({ free, mine = false, className }: { free: number; mine?: boolean; className?: string }) {
  const left = free - (mine ? 1 : 0);
  const taken = CAPACITY - left;
  return (
    <span role="img" aria-label={`${left} of ${CAPACITY} places free`} className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: CAPACITY }, (_, i) => {
        const isTaken = i < taken;
        const isMine = mine && i === taken - 1;
        return (
          <span
            key={i}
            aria-hidden
            className={cn(
              "h-2 w-2 rounded-full border transition-colors duration-300",
              isMine ? "border-spark bg-terracotta" : isTaken ? "border-ink bg-ink" : "border-ink/30 bg-transparent"
            )}
          />
        );
      })}
    </span>
  );
}

export function spotsText(free: number, mine = false): string {
  const left = free - (mine ? 1 : 0);
  if (left <= 0) return "Full";
  if (left === 1) return "1 place left";
  if (left <= 3) return `${left} places left`;
  return `${left} places`;
}
