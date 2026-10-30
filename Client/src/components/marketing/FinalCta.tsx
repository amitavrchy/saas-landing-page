"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden section-pad">
      <div className="pointer-events-none absolute inset-0 hero-aurora opacity-80" />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-30" />
      <div className="relative mx-auto max-w-[1120px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="shine-border mx-auto max-w-3xl rounded-3xl border border-border bg-surface/80 px-8 py-14 text-center glass sm:px-12"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-accent">
            Orbit
          </p>
          <h2 className="display mt-4 text-[clamp(1.75rem,4vw,2.75rem)]">
            Ready to ship without the chaos?
          </h2>
          <p className="lead mx-auto mt-4 max-w-md">
            Join product teams who replaced status theater with Orbit. Free to
            start — upgrade when you&apos;re ready.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "shadow-[0_0_40px_-8px_rgba(94,106,210,0.55)]",
              )}
            >
              Start free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
            >
              See pricing
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
