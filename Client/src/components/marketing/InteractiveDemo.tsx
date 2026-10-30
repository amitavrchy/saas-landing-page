"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Sparkles, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

type DemoIssue = {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
};

const SEED: DemoIssue[] = [
  { id: "1", title: "Design empty cycle state", priority: "medium" },
  { id: "2", title: "Wire Slack digest", priority: "high" },
];

export function InteractiveDemo() {
  const [issues, setIssues] = useState<DemoIssue[]>(SEED);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<DemoIssue["priority"]>("medium");
  const [aiHint, setAiHint] = useState<string | null>(null);

  function addIssue(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    const id = String(Date.now());
    let nextPriority = priority;
    const lower = trimmed.toLowerCase();

    if (
      lower.includes("bug") ||
      lower.includes("crash") ||
      lower.includes("urgent") ||
      lower.includes("outage")
    ) {
      nextPriority = "high";
      setAiHint("AI triage · flagged high urgency — suggested P0. Approve to keep.");
    } else if (lower.includes("docs") || lower.includes("typo")) {
      nextPriority = "low";
      setAiHint("AI triage · low urgency — fine for next cycle.");
    } else {
      setAiHint("AI triage · queued for Cycle 24 capacity check.");
    }

    setIssues((prev) => [
      { id, title: trimmed, priority: nextPriority },
      ...prev,
    ]);
    setTitle("");
    window.setTimeout(() => setAiHint(null), 4000);
  }

  return (
    <section id="demo" className="section-pad" aria-labelledby="demo-heading">
      <div className="mx-auto max-w-[1120px] px-6">
        <SectionHeading
          id="demo-heading"
          eyebrow="Interactive"
          title="Try it — create an issue right here"
          description="No signup. Local demo with a taste of AI triage. Type “bug” or “docs” and watch Orbit react."
        />

        <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <form
            onSubmit={addIssue}
            className="shine-border relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-7"
          >
            <div className="absolute inset-x-0 top-0 h-px shimmer-line" />
            <div className="mb-5 flex items-center gap-2 text-[12px] text-muted">
              <Keyboard className="size-3.5" />
              Live sandbox · state stays in this browser
            </div>

            <label htmlFor="issue-title" className="text-[13px] font-medium">
              Issue title
            </label>
            <input
              id="issue-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix login bug on mobile"
              className="mt-2 h-12 w-full rounded-xl border border-border bg-bg px-4 text-sm text-text placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />

            <p className="mt-5 text-[13px] font-medium">Priority</p>
            <div className="mt-2 flex gap-2">
              {(["high", "medium", "low"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    "rounded-lg border px-3.5 py-2 text-[12px] capitalize transition-all",
                    priority === p
                      ? "border-accent bg-accent/15 text-text"
                      : "border-border text-muted hover:text-text",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>

            <Button type="submit" className="mt-6 w-full" size="lg">
              <Plus className="size-4" />
              Create issue
            </Button>

            <AnimatePresence>
              {aiHint && (
                <motion.p
                  initial={{ opacity: 0, y: 8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex items-start gap-2 overflow-hidden rounded-xl border border-accent/30 bg-accent/10 px-3.5 py-3 text-[12px] leading-relaxed text-[#b4bbea]"
                >
                  <Sparkles className="mt-0.5 size-3.5 shrink-0" />
                  {aiHint}
                </motion.p>
              )}
            </AnimatePresence>
          </form>

          <div className="rounded-2xl border border-border bg-bg-elevated p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[13px] font-medium">Your board</p>
              <span className="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                {issues.length} open
              </span>
            </div>
            <ul className="space-y-2">
              <AnimatePresence mode="popLayout">
                {issues.map((issue) => (
                  <motion.li
                    key={issue.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3.5 py-3"
                  >
                    <span
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        issue.priority === "high" && "bg-danger shadow-[0_0_8px_var(--danger)]",
                        issue.priority === "medium" && "bg-amber",
                        issue.priority === "low" && "bg-muted",
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate text-[13px]">
                      {issue.title}
                    </span>
                    <button
                      type="button"
                      aria-label={`Remove ${issue.title}`}
                      onClick={() =>
                        setIssues((prev) => prev.filter((i) => i.id !== issue.id))
                      }
                      className="rounded-lg p-1.5 text-muted hover:bg-surface-2 hover:text-danger"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
              {issues.length === 0 && (
                <li className="py-12 text-center text-[13px] text-muted">
                  Board is clear. Add an issue to begin.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
