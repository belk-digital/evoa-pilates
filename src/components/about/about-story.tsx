"use client";

/* Placeholder copy in the brand voice; the founding story, names and dates come from the client.
   This is the page's one flat, full-bleed band: no rounded corners, so it reads differently from the panels around it. */
export function AboutStory() {
  return (
    <section data-header-theme="light" className="relative w-full bg-mint pt-6 text-ink sm:pt-10 lg:pt-14">
      <div className="w-full bg-plaster px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-32">
        <div className="mx-auto grid w-full max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Left: the headline holds its place while the story scrolls */}
          <div className="self-start lg:sticky lg:top-32 lg:col-span-5">
            <h2 className="font-display text-[38px] font-light leading-[1.08] tracking-normal text-ink sm:text-[50px] lg:text-[clamp(42px,4.2vw,64px)]">
              A quieter way to get <span className="font-script">strong</span>
            </h2>
          </div>

          {/* Right: the story, then two photographs */}
          <div className="lg:col-span-7">
            <p className="font-serif text-[24px] font-light leading-[1.32] text-ink sm:text-[30px] lg:text-[34px]">
              EVOA began with a simple frustration: most studios teach you to push through your body, and almost none
              teach you to listen to it.
            </p>

            <div className="mt-8 flex max-w-xl flex-col gap-5 font-sans text-[15px] font-light leading-[1.8] text-ink-muted sm:mt-10 sm:text-[16px]">
              <p>
                So we built the opposite. A private club of reformers and mats, eight at a time, where every sequence
                begins with breath and ends with a clearer sense of where you are in space. No mirrors to perform for.
                No music to hide behind. Just precise teaching, warm light and unhurried strength.
              </p>
              <p>
                The name says it plainly. Evolution of Awareness: strength is what happens when attention comes first.
                We keep the room small, the teaching close and the pace human, so the work you do here follows you home.
              </p>
              <p className="font-script text-[28px] leading-none text-rust sm:text-[32px]">The EVOA team</p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5">
              <div className="aspect-[4/5] overflow-hidden rounded-[22px] bg-cream-warm sm:rounded-[32px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/principles-lifestyle.jpg"
                  alt="A member at the reformer, seen from behind, in soft window light"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="aspect-[4/5] translate-y-8 overflow-hidden rounded-[22px] bg-cream-warm sm:translate-y-16 sm:rounded-[32px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/pilates-quadrant-ring.jpg"
                  alt="Dried pampas grass in a vase against a plaster wall, a hand reaching toward it"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            {/* room for the lower photograph's offset */}
            <div aria-hidden className="h-8 sm:h-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
