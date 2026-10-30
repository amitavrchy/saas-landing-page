export type ChangelogEntry = {
  version: string;
  date: string;
  title: string;
  tags: ("New" | "Improved" | "Fix")[];
  body: string[];
};

export const changelog: ChangelogEntry[] = [
  {
    version: "2.0.0",
    date: "2026-10-14",
    title: "Orbit 2.0 — Cycles & AI triage",
    tags: ["New"],
    body: [
      "Cycles are now first-class: capacity, carry-over, risk flags, and stakeholder digests on close.",
      "AI triage suggests priority, area, and assignee with an approve gate. No silent mutations.",
      "New roadmap view with shareable live links for GTM and leadership.",
    ],
  },
  {
    version: "1.8.2",
    date: "2026-09-22",
    title: "Faster board, clearer blockers",
    tags: ["Improved", "Fix"],
    body: [
      "Board virtualization for workspaces with 2k+ issues — drag stays at 60fps.",
      "Blocker graph now shows transitive risk on cycle commit.",
      "Fixed Slack digest double-send when a cycle closed twice in one minute.",
    ],
  },
  {
    version: "1.8.0",
    date: "2026-09-01",
    title: "Automations 2 and GitHub sync",
    tags: ["New", "Improved"],
    body: [
      "Automation templates for SLA nudges, PR-linked status, and cycle close.",
      "GitHub PR sync maps merges to issue done-states with signed webhooks.",
      "Audit trail export for Team and Enterprise.",
    ],
  },
  {
    version: "1.7.4",
    date: "2026-08-11",
    title: "Linear import polish",
    tags: ["Improved", "Fix"],
    body: [
      "Import preserves priority and labels with fewer collisions.",
      "Fixed assignee mapping when emails differed by casing.",
    ],
  },
  {
    version: "1.7.0",
    date: "2026-07-28",
    title: "Views you can share",
    tags: ["New"],
    body: [
      "Saved views per role with live share links.",
      "Keyboard shortcuts for create, assign, and cycle move.",
    ],
  },
  {
    version: "1.6.0",
    date: "2026-06-30",
    title: "Enterprise foundations",
    tags: ["New"],
    body: [
      "SSO / SAML, SCIM, and EU data residency options.",
      "Audit log retention controls for compliance reviews.",
    ],
  },
];
