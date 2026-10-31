"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowUpRight } from "lucide-react";
import { customers } from "@/content/customers";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4500, stopOnInteraction: true }),
  ]);

  return (
    <section
      className="section-pad border-t border-border/50"
      aria-labelledby="testimonials-heading"
    >
      <div className="page-container">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Customers"
          title="Teams that ship with Orbit"
          description="Real product orgs. Real cycle boards. Less status theater."
        />

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {customers.map((c) => (
              <Link
                key={c.slug}
                href={`/customers/${c.slug}`}
                className="group min-w-0 flex-[0_0_100%] rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-accent/35 hover:bg-surface-2/60 sm:flex-[0_0_calc(50%-8px)] lg:flex-[0_0_calc(33.333%-11px)]"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[14px] font-medium text-muted">
                    {c.company}
                  </span>
                  <ArrowUpRight className="size-3.5 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <blockquote className="text-[14px] leading-relaxed text-text">
                  “{c.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-bg font-mono text-[14px] text-muted ring-1 ring-border">
                    {c.initials}
                  </span>
                  <div>
                    <p className="text-[14px] font-medium">{c.person}</p>
                    <p className="text-[14px] text-muted">
                      {c.role}, {c.company}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/customers"
            className="inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-text"
          >
            Read all customer stories
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
