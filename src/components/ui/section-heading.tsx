import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "ink",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isCream = tone === "cream";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter && "items-center text-center",
        className
      )}
    >
      {eyebrow ? (
        <span
          className={cn(
            "label",
            isCream ? "text-rose-200" : "text-rose-500"
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "text-display-sm md:text-display-md font-kafina tracking-tight text-balance",
          isCream ? "text-cream" : "text-ink"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-[16px] md:text-[17px] leading-relaxed max-w-xl",
            isCenter && "mx-auto",
            isCream ? "text-cream/75" : "text-ink-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
