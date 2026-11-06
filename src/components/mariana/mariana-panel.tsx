import type { ReactNode } from "react";
import { MarianaEmbed } from "@/components/mariana/mariana-embed";

/* The place an embed sits. Mariana's pages only work over a white or light background (not dark), so the embed stands on a
   white sheet with a soft shadow, on the page's sage canvas. */
export function MarianaPanel({
  id,
  route,
  label,
  children,
}: {
  id: string;
  route: string;
  label: string;
  /** a line or two under the embed (help, links) */
  children?: ReactNode;
}) {
  return (
    <section id={id} data-header-theme="light" className="relative w-full scroll-mt-4 bg-mint px-3 pb-16 text-ink sm:px-6 sm:pb-24 lg:px-10 lg:pb-32">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="rounded-[28px] bg-white p-3 shadow-[0_24px_70px_rgba(35,43,27,0.10)] sm:rounded-[40px] sm:p-6 lg:p-10">
          <MarianaEmbed route={route} label={label} />
        </div>
        {children ? <div className="px-3 pt-6 sm:px-6">{children}</div> : null}
      </div>
    </section>
  );
}
