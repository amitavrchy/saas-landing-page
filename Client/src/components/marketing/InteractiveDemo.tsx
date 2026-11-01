"use client";
import { useRef, useState } from "react";
import { Check, Keyboard, Plus, Sparkles, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Priority = "high" | "medium" | "low";
type DemoIssue = { id: number; title: string; priority: Priority };
const SEED: DemoIssue[] = [
  { id: 1, title: "Design the empty cycle state", priority: "medium" },
  { id: 2, title: "Connect the Slack digest", priority: "high" },
];
export function InteractiveDemo() {
  const [issues, setIssues] = useState(SEED);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [hint, setHint] = useState("");
  const counter = useRef(3);
  function addIssue(event: React.FormEvent) {
    event.preventDefault();
    if (!title.trim()) return;
    const lower = title.toLowerCase();
    const suggested: Priority = /bug|crash|urgent|outage/.test(lower)
      ? "high"
      : /docs|typo/.test(lower)
        ? "low"
        : priority;
    setIssues((items) => [
      { id: counter.current++, title: title.trim(), priority: suggested },
      ...items,
    ]);
    setHint(
      "Demo triage: " +
        (suggested === "high"
          ? "flagged as high priority. Looks like something to tackle first."
          : suggested === "low"
            ? "suggested low priority. A good fit for your next cycle."
            : "added to your board. One less thing to keep in your head."),
    );
    setTitle("");
  }
  return (
    <section
      id="demo"
      className="sandbox-section section-pad"
      aria-labelledby="demo-heading"
    >
      <div className="page-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span /> GO ON. MAKE YOURSELF AT HOME.
          </span>
          <span className="section-index">03 / YOUR FIRST ORBIT</span>
        </div>
        <div className="sandbox-header">
          <h2 id="demo-heading" className="section-display">
            A little less explaining.
            <br />
            <span>A little more trying.</span>
          </h2>
          <p>
            Take Orbit for a spin. Add an issue and see it land on your board.
            Try “bug” or “docs” for a simple triage preview.
          </p>
        </div>
        <div className="sandbox-content">
          <form className="sandbox-form" onSubmit={addIssue}>
            <div className="sandbox-form-header">
              <Keyboard size={14} /> Your sandbox. No signup required.
            </div>
            <label htmlFor="issue-title">What&apos;s the next big thing?</label>
            <input
              id="issue-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Fix the login bug on mobile"
              required
              maxLength={160}
            />
            <p className="sandbox-priority-label" id="sandbox-priority-label">
              Priority
            </p>
            <div
              className="sandbox-priorities"
              role="group"
              aria-labelledby="sandbox-priority-label"
            >
              {(["high", "medium", "low"] as const).map((item) => (
                <button
                  type="button"
                  key={item}
                  aria-pressed={priority === item}
                  className={cn(priority === item && "selected")}
                  onClick={() => setPriority(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button type="submit">
              <Plus size={14} /> Create your first issue
            </Button>
            <div aria-live="polite">
              {hint && (
                <p className="sandbox-hint">
                  <Sparkles size={13} />
                  {hint}
                </p>
              )}
            </div>
          </form>
          <div className="sandbox-board">
            <div className="sandbox-board-header">
              <h3>Your next chapter</h3>
              <span>{issues.length} open issues</span>
            </div>
            <ul>
              {issues.map((issue) => (
                <li className="sandbox-issue" key={issue.id}>
                  <span
                    className={"priority-dot priority-" + issue.priority}
                    aria-label={issue.priority + " priority"}
                  />
                  <span>{issue.title}</span>
                  <button
                    type="button"
                    aria-label={"Remove " + issue.title}
                    onClick={() =>
                      setIssues((items) =>
                        items.filter((item) => item.id !== issue.id),
                      )
                    }
                  >
                    <Trash2 size={13} />
                  </button>
                </li>
              ))}
            </ul>
            {issues.length === 0 && (
              <p className="sandbox-empty">
                A clean slate. Add something worth building.
              </p>
            )}
            <p className="sandbox-board-note">
              <Check size={11} /> Demo only. Your changes reset when you
              refresh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
