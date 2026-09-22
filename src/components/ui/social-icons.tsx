import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M14 8.5h2V5.2c-.35-.05-1.55-.2-2.96-.2-2.94 0-4.95 1.8-4.95 5.1V13H5.5v3.6h2.6V21h3.7v-4.4h2.6l.4-3.6h-3V10.6c0-1.05.28-1.77 1.8-1.77Z" />
    </svg>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} width={16} height={16} {...props}>
      <path d="M14 4v10.2a2.8 2.8 0 1 1-2.2-2.74" />
      <path d="M14 4c.4 2.2 2 3.9 4.2 4.2" />
    </svg>
  );
}
