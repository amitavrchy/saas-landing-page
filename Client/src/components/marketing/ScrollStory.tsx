"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Circle,
  GitBranch,
  Flag,
  Layers2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    label: "Plan with purpose",
    body: "Turn the big picture into a clear next step. Set priorities, scope a cycle, and give everyone a shared direction.",
    name: "A little structure. A lot of momentum.",
    sub: "Cycle 24 · Product & engineering",
  },
  {
    label: "Build in your flow",
    body: "Keep issues, decisions, and the people behind them in sync. Less chasing context. More time making things.",
    name: "The right work. Right in front of you.",
    sub: "My issues · This week's priorities",
  },
  {
    label: "Ship with confidence",
    body: "Close the loop with automatic carry-over, clear progress, and updates your team can actually use.",
    name: "From in progress to in the world.",
    sub: "Release checklist · Website 2.0",
  },
];
export function ScrollStory() {
  const [active, setActive] = useState(0);
  return (
    <section
      className="workflow-section section-pad"
      aria-labelledby="tour-heading"
    >
      <div className="page-container">
        <div className="section-topline">
          <span className="eyebrow">
            <span /> BUILT FOR THE WAY YOU WORK
          </span>
          <span className="section-index">01 / THE WORKFLOW</span>
        </div>
        <div className="workflow-layout">
          <div className="workflow-copy">
            <h2 id="tour-heading" className="section-display">
              From big picture.
              <br />
              <span>To shipped detail.</span>
            </h2>
            <p className="section-description">
              A calm place for ambitious work. Everything you need to move
              forward, beautifully connected.
            </p>
            <div
              className="workflow-steps"
              role="tablist"
              aria-label="Product workflow"
            >
              {STEPS.map((step, index) => (
                <button
                  key={step.label}
                  id={"workflow-tab-" + index}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  aria-controls="workflow-panel"
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    if (
                      event.key === "ArrowDown" ||
                      event.key === "ArrowRight" ||
                      event.key === "ArrowUp" ||
                      event.key === "ArrowLeft" ||
                      event.key === "Home" ||
                      event.key === "End"
                    ) {
                      event.preventDefault();
                      const next =
                        event.key === "Home"
                          ? 0
                          : event.key === "End"
                            ? 2
                            : (active +
                                (event.key === "ArrowUp" ||
                                event.key === "ArrowLeft"
                                  ? 2
                                  : 1)) %
                              3;
                      setActive(next);
                      document.getElementById("workflow-tab-" + next)?.focus();
                    }
                  }}
                  tabIndex={active === index ? 0 : -1}
                  className={cn("workflow-step", active === index && "active")}
                >
                  <span className="step-number">0{index + 1}</span>
                  <div>
                    <h3>{step.label}</h3>
                    {active === index && <p>{step.body}</p>}
                  </div>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
            <Link href="/features" className="text-link">
              Take a closer look <ArrowRight size={14} />
            </Link>
          </div>
          <div
            id="workflow-panel"
            role="tabpanel"
            aria-labelledby={"workflow-tab-" + active}
            className="workflow-visual"
          >
            <div className="workflow-window-bar">
              <div>
                <i />
                <i />
                <i />
              </div>
              <span>orbit / {["cycles", "my-issues", "releases"][active]}</span>
              <Layers2 size={12} />
            </div>
            <div className="workflow-panel-content" key={active}>
              <div className="workflow-panel-icon">
                {active === 0 ? (
                  <Flag size={20} />
                ) : active === 1 ? (
                  <GitBranch size={20} />
                ) : (
                  <Check size={20} />
                )}
              </div>
              <p className="eyebrow">A WORKSPACE THAT MOVES WITH YOU</p>
              <h3>{STEPS[active].name}</h3>
              <p className="workflow-panel-sub">{STEPS[active].sub}</p>
              {active === 0 ? (
                <>
                  <div className="capacity-label">
                    <span>Cycle capacity</span>
                    <strong>
                      18 <span>/ 22 points</span>
                    </strong>
                  </div>
                  <div className="capacity-track">
                    <span />
                  </div>
                  <div className="capacity-legend">
                    <span>
                      <i /> Planned work
                    </span>
                    <span>Room to breathe.</span>
                  </div>
                  <div className="cycle-chart">
                    <div className="chart-grid" />
                    {[24, 39, 31, 56, 47, 65, 60, 77, 68, 88, 76, 95].map(
                      (height, index) => (
                        <span key={index} style={{ height: height + "%" }} />
                      ),
                    )}
                    <span className="chart-target">YOUR MOMENTUM ↗</span>
                  </div>
                  <div className="chart-bottom">
                    <span>MON</span>
                    <span>FRI</span>
                    <span>WED</span>
                    <span>FRI</span>
                  </div>
                </>
              ) : active === 1 ? (
                <div className="workflow-issue-list">
                  {[
                    "Design the command menu",
                    "Connect project updates to Slack",
                    "Refine the new dashboard",
                    "Write the release notes",
                  ].map((title, index) => (
                    <div key={title}>
                      <Circle size={14} />
                      <span>
                        <small>ORB-{140 - index}</small>
                        {title}
                      </span>
                      <span
                        className={
                          "person-avatar avatar-" +
                          ["peach", "mint", "lavender", "blue"][index]
                        }
                      >
                        {["AK", "JL", "MR", "SN"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="release-checklist">
                  {[
                    "All priority issues resolved",
                    "Changelog ready for review",
                    "Stakeholder digest queued",
                    "Carry-over planned for Cycle 25",
                  ].map((title) => (
                    <div key={title}>
                      <span>
                        <Check size={12} />
                      </span>
                      {title}
                    </div>
                  ))}
                  <p>
                    <Sparkles size={13} /> Less follow-up. More forward.
                  </p>
                </div>
              )}
            </div>
            <div className="workflow-panel-footer">
              <span className="status-dot" />{" "}
              {
                [
                  "A realistic plan is a powerful thing.",
                  "Context included. Distractions optional.",
                  "Another good idea, out in the world.",
                ][active]
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
