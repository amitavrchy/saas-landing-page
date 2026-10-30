"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  CalendarRange,
  GitBranch,
  Rocket,
  CheckCircle2,
  Circle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    id: "plan",
    label: "Plan",
    icon: CalendarRange,
    title: "Cycles that match how you ship",
    body: "Scope a cycle, set capacity from real velocity, and see risk before standup — not after the regret retro.",
  },
  {
    id: "build",
    label: "Build",
    icon: GitBranch,
    title: "Issues with signal, not noise",
    body: "Views, priorities, and AI triage surface what matters. Assignees know the next move without Slack archaeology.",
  },
  {
    id: "ship",
    label: "Ship",
    icon: Rocket,
    title: "Close the loop every cycle",
    body: "Automations roll incomplete work forward. Digests write themselves. Stakeholders see progress without a meeting.",
  },
];

function PlanVisual() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Cycle 24 capacity</span>
        <span className="font-mono text-xs text-muted">18 / 22 pts</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-surface-3">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent via-accent-2 to-cyan"
          initial={{ width: 0 }}
          animate={{ width: "82%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {[
        { name: "Platform", pts: 8, w: "66%", color: "from-accent to-accent-bright" },
        { name: "Growth", pts: 6, w: "50%", color: "from-accent-2 to-accent" },
        { name: "Infra", pts: 4, w: "33%", color: "from-cyan to-accent" },
      ].map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-xl border border-border bg-surface-2/80 p-3.5"
        >
          <div className="mb-2 flex items-center justify-between text-[13px]">
            <span>{r.name}</span>
            <span className="font-mono text-muted">{r.pts} pts</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-bg">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${r.color}`}
              style={{ width: r.w }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function BuildVisual() {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 text-xs text-[#b4bbea]">
        <Sparkles className="size-3.5" />
        AI suggested priority · approve to apply
      </div>
      {[
        { id: "ORB-140", title: "Auth rate-limit edge case", pri: "P0", done: false },
        { id: "ORB-138", title: "Empty state for cycle board", pri: "P1", done: false },
        { id: "ORB-135", title: "Docs: webhook retries", pri: "P2", done: true },
        { id: "ORB-133", title: "Slack digest timezone", pri: "P1", done: false },
      ].map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 border-b border-border py-3.5 last:border-0"
        >
          {item.done ? (
            <CheckCircle2 className="size-4 text-success" />
          ) : (
            <Circle className="size-4 text-muted" />
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px]">{item.title}</p>
            <p className="font-mono text-[10px] text-muted">{item.id}</p>
          </div>
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
              item.pri === "P0" && "bg-danger/15 text-danger",
              item.pri === "P1" && "bg-amber/15 text-amber",
              item.pri === "P2" && "bg-surface-3 text-muted",
            )}
          >
            {item.pri}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ShipVisual() {
  return (
    <div className="space-y-3">
      <p className="mb-1 text-sm font-medium">Release checklist · Cycle 24</p>
      {[
        { label: "All P0s closed", ok: true },
        { label: "Changelog drafted by Orbit", ok: true },
        { label: "Stakeholder digest queued", ok: true },
        { label: "Carry-over 2 issues → C25", ok: false },
        { label: "GitHub release tag linked", ok: true },
      ].map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface-2/60 px-3.5 py-3"
        >
          <span
            className={cn(
              "flex size-6 items-center justify-center rounded-lg text-[11px] font-medium",
              row.ok ? "bg-success/15 text-success" : "bg-surface-3 text-muted",
            )}
          >
            {row.ok ? "✓" : "·"}
          </span>
          <span className="text-[13px]">{row.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

const VISUALS = {
  plan: PlanVisual,
  build: BuildVisual,
  ship: ShipVisual,
};

export function ScrollStory() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const Visual = VISUALS[STEPS[active].id as keyof typeof VISUALS];

  return (
    <section ref={ref} className="section-pad relative" aria-labelledby="tour-heading">
      <motion.div
        style={{ y: glowY }}
        className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]"
      />
      <div className="relative mx-auto max-w-[1120px] px-6">
        <SectionHeading
          id="tour-heading"
          eyebrow="Product tour"
          title="One workspace. Three modes of focus."
          description="Plan capacity, build with signal, ship with receipts — without switching tools mid-cycle."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-3 lg:sticky lg:top-28">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const on = active === i;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "w-full rounded-2xl border p-5 text-left transition-all duration-300",
                    on
                      ? "border-accent/40 bg-accent/8 shadow-[0_0_40px_-16px_rgba(94,106,210,0.45)]"
                      : "border-transparent bg-transparent hover:border-border hover:bg-surface/50",
                  )}
                >
                  <div className="flex items-center gap-2.5 text-[12px] font-medium uppercase tracking-[0.12em] text-muted">
                    <Icon className={cn("size-3.5", on && "text-accent")} />
                    {step.label}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">
                    {step.body}
                  </p>
                  {on && (
                    <motion.div
                      layoutId="tour-bar"
                      className="mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-accent to-cyan"
                    />
                  )}
                </button>
              );
            })}
          </div>

          <div className="shine-border relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-surface product-glow">
            <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
