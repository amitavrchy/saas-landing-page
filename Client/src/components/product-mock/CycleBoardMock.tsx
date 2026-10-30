"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Circle,
  CheckCircle2,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Issue = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  status: "todo" | "progress" | "done";
  assignee: string;
  ai?: boolean;
};

const INITIAL: Issue[] = [
  {
    id: "ORB-128",
    title: "Rewrite cycle velocity chart",
    priority: "high",
    status: "progress",
    assignee: "AK",
  },
  {
    id: "ORB-131",
    title: "AI triage for inbound bugs",
    priority: "high",
    status: "todo",
    assignee: "MR",
    ai: true,
  },
  {
    id: "ORB-119",
    title: "Stripe webhook idempotency",
    priority: "medium",
    status: "done",
    assignee: "JL",
  },
  {
    id: "ORB-134",
    title: "Mobile nav focus trap",
    priority: "low",
    status: "todo",
    assignee: "SN",
  },
];

const PriorityIcon = {
  high: SignalHigh,
  medium: SignalMedium,
  low: SignalLow,
};

const COLUMNS = [
  { key: "todo" as const, label: "Todo", color: "text-muted" },
  { key: "progress" as const, label: "In Progress", color: "text-accent" },
  { key: "done" as const, label: "Done", color: "text-success" },
];

export function CycleBoardMock({ className }: { className?: string }) {
  const [issues, setIssues] = useState(INITIAL);
  const [cursor, setCursor] = useState({ x: 62, y: 48 });
  const [clickPulse, setClickPulse] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timers: number[] = [];

    const run = () => {
      // Move cursor toward ORB-131
      setCursor({ x: 28, y: 42 });
      timers.push(
        window.setTimeout(() => {
          setClickPulse(true);
          setPhase(1);
          setIssues((prev) =>
            prev.map((i) =>
              i.id === "ORB-131" ? { ...i, status: "progress" as const } : i,
            ),
          );
        }, 900),
      );
      timers.push(
        window.setTimeout(() => setClickPulse(false), 1100),
      );

      // Move to done column and complete another
      timers.push(
        window.setTimeout(() => {
          setCursor({ x: 72, y: 36 });
        }, 2200),
      );
      timers.push(
        window.setTimeout(() => {
          setClickPulse(true);
          setPhase(2);
          setIssues((prev) =>
            prev.map((i) =>
              i.id === "ORB-128" ? { ...i, status: "done" as const } : i,
            ),
          );
        }, 3000),
      );
      timers.push(
        window.setTimeout(() => setClickPulse(false), 3200),
      );

      // Reset loop
      timers.push(
        window.setTimeout(() => {
          setIssues(INITIAL);
          setCursor({ x: 62, y: 48 });
          setPhase(0);
        }, 5200),
      );
    };

    run();
    const loop = window.setInterval(run, 6000);
    return () => {
      window.clearInterval(loop);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="ml-3 flex flex-1 items-center gap-2">
          <span className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted">
            orbit.app / acme / cycle-24
          </span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-md bg-accent/15 px-2 py-0.5 text-[11px] font-medium text-[#9aa3ea]">
            Cycle 24 · 12d left
          </span>
        </div>
      </div>

      {/* Sidebar + board */}
      <div className="flex min-h-[340px] sm:min-h-[400px]">
        <aside className="hidden w-44 shrink-0 border-r border-border p-3 sm:block">
          <p className="mb-2 px-2 text-[10px] font-medium uppercase tracking-wider text-muted">
            Workspace
          </p>
          {["Cycles", "Issues", "Views", "Roadmap", "Insights"].map((item, i) => (
            <div
              key={item}
              className={cn(
                "rounded-md px-2 py-1.5 text-[12px]",
                i === 0
                  ? "bg-surface-2 text-text"
                  : "text-muted",
              )}
            >
              {item}
            </div>
          ))}
          <div className="mt-6 rounded-lg border border-accent/30 bg-accent/10 p-2.5">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#b4bbea]">
              <Sparkles className="size-3" />
              AI triage
            </div>
            <p className="mt-1 text-[10px] leading-snug text-muted">
              {phase >= 1
                ? "3 issues auto-prioritized"
                : "Watching inbound…"}
            </p>
          </div>
        </aside>

        <div className="relative flex-1 overflow-hidden p-3 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h3 className="text-[13px] font-medium text-text">Cycle 24</h3>
              <p className="text-[11px] text-muted">Ship roadmap v2 · 18 issues</p>
            </div>
            <div className="flex -space-x-1.5">
              {["AK", "MR", "JL", "SN"].map((a) => (
                <span
                  key={a}
                  className="flex size-6 items-center justify-center rounded-full border border-bg bg-surface-2 font-mono text-[9px] text-muted"
                >
                  {a}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {COLUMNS.map((col) => {
              const colIssues = issues.filter((i) => i.status === col.key);
              return (
                <div key={col.key} className="min-h-[200px]">
                  <div className="mb-2 flex items-center gap-1.5 px-1">
                    <span className={cn("text-[11px] font-medium", col.color)}>
                      {col.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted">
                      {colIssues.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <AnimatePresence mode="popLayout">
                      {colIssues.map((issue) => {
                        const Icon = PriorityIcon[issue.priority];
                        return (
                          <motion.div
                            key={issue.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="rounded-lg border border-border bg-surface-2 p-2.5"
                          >
                            <div className="flex items-start gap-2">
                              {issue.status === "done" ? (
                                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
                              ) : (
                                <Circle className="mt-0.5 size-3.5 shrink-0 text-muted" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p
                                  className={cn(
                                    "text-[12px] leading-snug text-text",
                                    issue.status === "done" &&
                                      "text-muted line-through",
                                  )}
                                >
                                  {issue.title}
                                </p>
                                <div className="mt-1.5 flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-muted">
                                    {issue.id}
                                  </span>
                                  <Icon
                                    className={cn(
                                      "size-3",
                                      issue.priority === "high" && "text-danger",
                                      issue.priority === "medium" &&
                                        "text-[#FEBC2E]",
                                      issue.priority === "low" && "text-muted",
                                    )}
                                  />
                                  {issue.ai && (
                                    <span className="rounded bg-accent-2/20 px-1 py-px text-[9px] text-[#c4b5fd]">
                                      AI
                                    </span>
                                  )}
                                  <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-bg font-mono text-[8px] text-muted">
                                    {issue.assignee}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ghost cursor */}
          <motion.div
            className="pointer-events-none absolute z-10 hidden sm:block"
            animate={{
              left: `${cursor.x}%`,
              top: `${cursor.y}%`,
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
              <path
                d="M1 1L1 18.5L5.5 14.5L9.5 22L12 21L8 13.5L14.5 13.5L1 1Z"
                fill="white"
                stroke="#07070A"
                strokeWidth="1"
              />
            </svg>
            {clickPulse && (
              <span className="absolute left-0 top-0 size-6 -translate-x-1 -translate-y-1 rounded-full border-2 border-white/60 animate-ping" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
