import * as React from "react";

interface EditorialBrandSealProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function EditorialBrandSeal({
  className = "",
  ...props
}: EditorialBrandSealProps) {
  const cx = 100;
  const cy = 100;
  const textRadius = 74;
  const outerRadius = 92;
  const innerRadius = 56;

  // Top arch: EVOA PILATES centered at 0° (12 o'clock)
  // Spans from -52° to +52° (total 104°).
  const topText = "EVOA PILATES";
  const textSpan = 104;
  const step = textSpan / (topText.length - 1); // ~9.45° per char

  const topChars = topText.split("").map((char, i) => {
    const angle = -textSpan / 2 + i * step; // centered at 0°
    const rad = (angle - 90) * (Math.PI / 180);
    const x = +(cx + textRadius * Math.cos(rad)).toFixed(2);
    const y = +(cy + textRadius * Math.sin(rad)).toFixed(2);
    return { char, angle, x, y };
  });

  // Bottom arch: EVOA PILATES centered at 180° (6 o'clock)
  const bottomChars = topText.split("").map((char, i) => {
    const angle = 180 - textSpan / 2 + i * step; // centered at 180°
    const rad = (angle - 90) * (Math.PI / 180);
    const x = +(cx + textRadius * Math.cos(rad)).toFixed(2);
    const y = +(cy + textRadius * Math.sin(rad)).toFixed(2);
    return { char, angle, x, y };
  });

  // Bullets precisely centered at 90° (3 o'clock) and 270° (9 o'clock)
  const bulletEastRad = (90 - 90) * (Math.PI / 180);
  const bulletEastX = +(cx + textRadius * Math.cos(bulletEastRad)).toFixed(2);
  const bulletEastY = +(cy + textRadius * Math.sin(bulletEastRad)).toFixed(2);

  const bulletWestRad = (270 - 90) * (Math.PI / 180);
  const bulletWestX = +(cx + textRadius * Math.cos(bulletWestRad)).toFixed(2);
  const bulletWestY = +(cy + textRadius * Math.sin(bulletWestRad)).toFixed(2);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
      className={className}
      {...props}
    >
      {/* Outer Clean Hairline Ring */}
      <circle
        cx={cx}
        cy={cy}
        r={outerRadius}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* Inner Clean Hairline Ring (Hollow Center) */}
      <circle
        cx={cx}
        cy={cy}
        r={innerRadius}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* East & West Luxury Diamond Bullets */}
      <circle cx={bulletEastX} cy={bulletEastY} r="2.4" fill="currentColor" fillOpacity="0.85" />
      <circle cx={bulletWestX} cy={bulletWestY} r="2.4" fill="currentColor" fillOpacity="0.85" />

      {/* Top Arc Characters: EVOA PILATES */}
      <g
        fill="currentColor"
        className="font-sans font-medium select-none"
        style={{ fontSize: "11.5px", letterSpacing: "0.05em" }}
      >
        {topChars.map(({ char, angle, x, y }, idx) => {
          if (char === " ") return null;
          return (
            <text
              key={`top-${idx}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${angle}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}

        {/* Bottom Arc Characters: EVOA PILATES */}
        {bottomChars.map(({ char, angle, x, y }, idx) => {
          if (char === " ") return null;
          return (
            <text
              key={`bottom-${idx}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              transform={`rotate(${angle}, ${x}, ${y})`}
            >
              {char}
            </text>
          );
        })}
      </g>
    </svg>
  );
}
