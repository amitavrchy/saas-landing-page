"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowRight, Command } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { CycleBoardMock } from "@/components/product-mock/CycleBoardMock";
import { cn } from "@/lib/utils";
import type { MouseEvent } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(20);

  function onMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  }

  const spotlight = useMotionTemplate`radial-gradient(700px circle at ${mouseX}% ${mouseY}%, rgba(94,106,210,0.16), transparent 45%)`;

  return (
    <section
      className="relative overflow-hidden hero-aurora"
      onMouseMove={onMove}
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight }}
      />
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" />
      <div className="noise pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-[1120px] px-6 pb-10 pt-16 sm:pb-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.55, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-[12px] text-muted glass"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 rounded-full bg-success animate-pulse-dot" />
              <span className="size-1.5 rounded-full bg-success" />
            </span>
            <span className="text-text/90">Orbit 2.0</span>
            <span className="text-border-strong">·</span>
            <span>Cycles &amp; AI triage</span>
            <ArrowRight className="size-3 opacity-60" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.55, ease }}
            className="mb-4 text-[13px] font-semibold tracking-[0.2em] uppercase text-accent"
          >
            Orbit
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.55, ease }}
            className="display text-[clamp(2.35rem,6.5vw,5rem)] text-text"
          >
            Ship the roadmap
            <br />
            <span className="accent-gradient-text">without the chaos.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.55, ease }}
            className="mx-auto mt-6 max-w-lg lead"
          >
            AI-assisted project ops for product teams. Cycles, issues, and
            triage that keep shipping honest — not busy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.55, ease }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "min-w-[160px] shadow-[0_0_40px_-8px_rgba(94,106,210,0.55)]",
              )}
            >
              Start free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/#demo"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "min-w-[160px] gap-2",
              )}
            >
              <Command className="size-3.5" />
              Try live demo
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.55, ease }}
            className="mt-5 text-[12px] text-muted-2"
          >
            Free for 3 seats · No card · Import from Linear in a day
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.65, ease }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          <div className="absolute -inset-x-10 -top-10 bottom-0 bg-[radial-gradient(ellipse_at_top,rgba(94,106,210,0.2),transparent_55%)] blur-2xl" />
          <div className="absolute inset-x-8 -bottom-4 h-24 rounded-[100%] bg-accent/20 blur-3xl" />
          <div className="relative animate-float shine-border rounded-xl product-glow">
            <CycleBoardMock />
          </div>
        </motion.div>
      </div>

      <div className="hairline mx-auto max-w-[1120px]" />
    </section>
  );
}
