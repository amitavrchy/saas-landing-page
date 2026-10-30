"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const LOGOS = [
  { name: "Nova", path: "M4 14 L9 4 L14 14 Z M6.5 11 H11.5" },
  { name: "Lattice", path: "M3 3 H13 V13 H3 Z M3 8 H13 M8 3 V13" },
  { name: "Pulse", path: "M2 9 H5 L7 4 L10 14 L12 9 H16" },
  { name: "Meridian", path: "M8 2 A6 6 0 1 0 8 14 A6 6 0 1 0 8 2 M8 2 V14" },
  { name: "Forge", path: "M3 13 L8 3 L13 13 M5.5 9 H10.5" },
  { name: "Helix", path: "M4 3 C10 3 6 13 12 13 M12 3 C6 3 10 13 4 13" },
  { name: "Summit", path: "M2 13 L6 5 L9 10 L12 4 L16 13" },
  { name: "Vertex", path: "M8 2 L14 13 H2 Z" },
  { name: "Cascade", path: "M3 4 H13 M5 8 H13 M7 12 H13" },
  { name: "Northwind", path: "M8 2 L10 8 L16 8 L11 11 L13 16 L8 13 L3 16 L5 11 L0 8 L6 8 Z" },
];

function LogoMark({ name, path }: { name: string; path: string }) {
  return (
    <div className="flex h-14 min-w-[160px] items-center justify-center gap-2.5 px-7 text-muted/75 transition-colors hover:text-text/80">
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path
          d={path}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-[14px] font-medium tracking-tight">{name}</span>
    </div>
  );
}

export function LogoCloud() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [Autoplay({ delay: 2800, stopOnInteraction: false })],
  );

  const items = [...LOGOS, ...LOGOS];

  return (
    <section className="py-14" aria-label="Trusted by">
      <div className="mx-auto max-w-[1120px] px-6">
        <p className="mb-8 text-center text-[12px] font-medium uppercase tracking-[0.16em] text-muted-2">
          Trusted by product teams shipping every week
        </p>
        <div className="overflow-hidden mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" ref={emblaRef}>
          <div className="flex">
            {items.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="flex-[0_0_auto]">
                <LogoMark {...logo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
