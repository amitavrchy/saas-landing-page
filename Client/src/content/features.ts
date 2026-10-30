export type Feature = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  promise: string;
  body: string[];
  bullets: string[];
  metric: { value: string; label: string };
};

export const features: Feature[] = [
  {
    slug: "cycles",
    title: "Cycles",
    eyebrow: "Plan",
    summary:
      "Time-boxed shipping windows with capacity, carry-over, and velocity you can defend in a board meeting.",
    promise: "Scope what fits. See risk before standup.",
    body: [
      "Cycles replace the vague quarter with a rhythm your eng and PM orgs can share. Set capacity from historical velocity, pull work that fits, and watch burn against commitment in real time.",
      "When the cycle ends, Orbit drafts the carry-over, writes a stakeholder digest, and opens the next window — without a retro that becomes another status meeting.",
    ],
    bullets: [
      "Capacity planning from real velocity",
      "Automatic carry-over with rationale",
      "Stakeholder digests on close",
      "Risk flags when WIP exceeds plan",
    ],
    metric: { value: "2.4×", label: "faster cycle close vs spreadsheet teams" },
  },
  {
    slug: "issues",
    title: "Issues",
    eyebrow: "Build",
    summary:
      "Fast capture, clear ownership, and priorities that survive Slack archaeology and weekly reshuffles.",
    promise: "Every issue has a next move.",
    body: [
      "Orbit issues are engineered for speed: keyboard-first create, inline properties, and assignees that stick. Priority is a first-class signal — not a forgotten dropdown.",
      "Sub-issues, blocking relations, and cycle membership keep the graph honest so “what’s blocking launch?” is a view, not a scavenger hunt.",
    ],
    bullets: [
      "Keyboard-first create & triage",
      "Blocking & related graph",
      "Priority that surfaces in every view",
      "Activity without notification spam",
    ],
    metric: { value: "12s", label: "median time to create + assign" },
  },
  {
    slug: "views",
    title: "Views",
    eyebrow: "Build",
    summary:
      "Board, list, and roadmap — filtered for every role, always reading the same underlying work.",
    promise: "One source of truth. Many lenses.",
    body: [
      "PMs live in roadmap. Eng leads live on the board. Founders want a one-screen pulse. Views are saved filters over the same issues — never a second database that drifts.",
      "Share a view link in Slack and everyone lands on the same cut of reality, with live updates as the cycle moves.",
    ],
    bullets: [
      "Board, list, timeline, roadmap",
      "Saved filters per role",
      "Shareable live links",
      "No duplicate “shadow” trackers",
    ],
    metric: { value: "1", label: "source of truth across the org" },
  },
  {
    slug: "automations",
    title: "Automations",
    eyebrow: "Ship",
    summary:
      "Roll forward, notify, and close loops without babysitting status fields every Friday.",
    promise: "Busywork runs itself.",
    body: [
      "When an issue stalls past SLA, when a cycle closes, when a PR merges — Automations move the board the way your team already agreed, with an audit trail you can trust.",
      "Templates cover the common loops; custom rules cover the weird ones. No Zapier spaghetti required for the basics.",
    ],
    bullets: [
      "Cycle close & carry-over rules",
      "SLA stall nudges",
      "PR-linked status updates",
      "Audit trail on every run",
    ],
    metric: { value: "6h", label: "status busywork saved / eng lead / week" },
  },
  {
    slug: "ai-triage",
    title: "AI triage",
    eyebrow: "Ship",
    summary:
      "Inbound noise ranked, labeled, and routed — you always approve before anything mutates.",
    promise: "Signal first. Chaos optional.",
    body: [
      "Paste a bug report, a customer email, or a Slack dump. Orbit suggests priority, area, and assignee from your recent cycle patterns. Nothing writes without your OK.",
      "We never train foundation models on your workspace content. Triage runs in your region with an explicit human gate.",
    ],
    bullets: [
      "Priority & area suggestions",
      "Assignee from cycle patterns",
      "Human approve gate",
      "No training on your data",
    ],
    metric: { value: "73%", label: "inbound auto-labeled before standup" },
  },
  {
    slug: "integrations",
    title: "Integrations",
    eyebrow: "Connect",
    summary:
      "GitHub, Slack, Linear import, and webhooks — plug into the stack you already run.",
    promise: "Meet teams where work already happens.",
    body: [
      "Import from Linear in an afternoon. Mirror PRs to issues. Push digests to Slack channels your execs already read. Webhooks cover the long tail.",
      "Enterprise gets SCIM, audit export, and signed webhook secrets — without forcing a six-month integration project.",
    ],
    bullets: [
      "Linear & CSV import",
      "GitHub PR sync",
      "Slack digests & commands",
      "Signed webhooks + SCIM",
    ],
    metric: { value: "1d", label: "typical Linear → Orbit migration" },
  },
];

export function getFeature(slug: string) {
  return features.find((f) => f.slug === slug);
}
