import { cn } from "@/lib/utils";

const TONES = {
  rose: "bg-rose-300",
  mauve: "bg-rose-500",
  sage: "bg-sage-300",
  bronze: "bg-bronze-300",
  ink: "bg-ink",
} as const;

interface PhotoPanelProps {
  tone?: keyof typeof TONES;
  caption?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PhotoPanel({ tone = "rose", caption, className, children }: PhotoPanelProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-md", TONES[tone], className)}>
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "4px 4px",
          color: "black",
        }}
      />
      {children}
      {caption ? (
        <span
          className={cn(
            "label absolute bottom-0 left-0 px-4 py-2.5 bg-ink/85",
            "text-cream"
          )}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );
}
