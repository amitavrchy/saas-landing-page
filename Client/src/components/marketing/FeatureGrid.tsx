"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RefreshCw,
  ListTodo,
  LayoutGrid,
  Zap,
  Sparkles,
  Blocks,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    slug: "cycles",
    icon: RefreshCw,
    title: "Cycles",
    body: "Time-boxed shipping windows with capacity, carry-over, and velocity you can trust.",
    span: "lg:col-span-2 lg:row-span-2",
    large: true,
  },
  {
    slug: "ai-triage",
    icon: Sparkles,
    title: "AI triage",
    body: "Inbound ranked, labeled, routed — approve before anything mutates.",
    span: "lg:col-span-1",
  },
  {
    slug: "automations",
    icon: Zap,
    title: "Automations",
    body: "Roll forward and close loops without babysitting status fields.",
    span: "lg:col-span-1",
  },
  {
    slug: "issues",
    icon: ListTodo,
    title: "Issues",
    body: "Fast capture, clear ownership, priorities that survive the shuffle.",
    span: "lg:col-span-1",
  },
  {
    slug: "views",
    icon: LayoutGrid,
    title: "Views",
    body: "Board, list, roadmap — one truth, many lenses.",
    span: "lg:col-span-1",
  },
  {
    slug: "integrations",
    icon: Blocks,
    title: "Integrations",
    body: "GitHub, Slack, Linear import, signed webhooks.",
    span: "lg:col-span-2",
  },
];

export function FeatureGrid() {
  return (
    <section className="section-pad border-y border-border/50" aria-labelledby="features-heading">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHeading
          id="features-heading"
          eyebrow="Platform"
          title="Everything a product org needs. Nothing it doesn’t."
          description="Six pillars. One workspace. Built for teams who measure progress in shipped work — not slide decks."
        />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.04,
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(f.span)}
            >
              <Link
                href={`/features/${f.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all duration-300",
                  "hover:border-accent/40 hover:bg-surface-2/80",
                  f.large && "min-h-[280px] sm:p-8",
                )}
              >
                <div className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-accent/0 blur-3xl transition-all duration-500 group-hover:bg-accent/15" />
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-bg">
                    <f.icon className="size-4 text-accent" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <h3
                  className={cn(
                    "font-semibold tracking-tight text-text",
                    f.large ? "text-2xl" : "text-[15px]",
                  )}
                >
                  {f.title}
                </h3>
                <p
                  className={cn(
                    "mt-2 text-muted",
                    f.large ? "max-w-sm text-[15px] leading-relaxed" : "text-[13px] leading-relaxed",
                  )}
                >
                  {f.body}
                </p>
                {f.large && (
                  <div className="mt-auto pt-8">
                    <div className="rounded-xl border border-border bg-bg p-4">
                      <div className="mb-2 flex justify-between text-[11px] text-muted">
                        <span>Cycle 24</span>
                        <span className="font-mono text-success">on track</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
                        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-accent to-cyan" />
                      </div>
                      <p className="mt-3 font-mono text-[11px] text-muted-2">
                        18/22 pts · 12d remaining
                      </p>
                    </div>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
