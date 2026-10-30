export type DocSection = {
  slug: string;
  title: string;
  items: { slug: string; title: string; body: string[] }[];
};

export const docSections: DocSection[] = [
  {
    slug: "get-started",
    title: "Get started",
    items: [
      {
        slug: "overview",
        title: "What is Orbit?",
        body: [
          "Orbit is AI-assisted project ops for product teams. You plan in cycles, build with issues and views, and ship with automations and AI triage.",
          "This docs shell mirrors the product IA. When the Nest content API is connected, these pages hydrate from Markdown — today they ship as curated seed content so the docs experience is real, not a placeholder.",
        ],
      },
      {
        slug: "quickstart",
        title: "Quickstart",
        body: [
          "1. Create a workspace and invite your core PM + eng lead.",
          "2. Import from Linear or CSV, or create your first cycle manually.",
          "3. Set capacity from the last four weeks of shipped work.",
          "4. Turn on Slack digests and (optionally) AI triage with approve gate.",
          "5. Share a roadmap view link with stakeholders — retire the status deck.",
        ],
      },
      {
        slug: "concepts",
        title: "Core concepts",
        body: [
          "Cycle — a time-boxed shipping window with capacity and a close ritual.",
          "Issue — a unit of work with priority, assignee, and optional blockers.",
          "View — a saved lens over issues (board, list, roadmap) that never forks data.",
          "Automation — a rule that moves work when conditions match, with an audit trail.",
          "AI triage — suggestions only; writes require human approve.",
        ],
      },
    ],
  },
  {
    slug: "cycles",
    title: "Cycles",
    items: [
      {
        slug: "capacity",
        title: "Capacity & velocity",
        body: [
          "Capacity defaults from median completed points (or issue count) across recent cycles. Override per cycle when you know people are out.",
          "Risk flags appear when committed work exceeds capacity by your workspace threshold (default 15%).",
        ],
      },
      {
        slug: "close",
        title: "Closing a cycle",
        body: [
          "On close, Orbit proposes carry-over, drafts a stakeholder digest, and opens the next cycle with remaining capacity hints.",
          "You can edit the digest before it sends to Slack or email.",
        ],
      },
    ],
  },
  {
    slug: "ai",
    title: "AI triage",
    items: [
      {
        slug: "how-it-works",
        title: "How triage works",
        body: [
          "Triage reads issue text and recent cycle patterns to suggest priority, area, and assignee.",
          "Nothing is written until a member clicks Approve. Reject discards the suggestion with one click.",
          "Orbit does not train foundation models on your workspace content.",
        ],
      },
      {
        slug: "regions",
        title: "Regions & privacy",
        body: [
          "US and EU regions are available. Enterprise can request dedicated VPC.",
          "See Security for DPA and subprocessors.",
        ],
      },
    ],
  },
  {
    slug: "api",
    title: "API",
    items: [
      {
        slug: "auth",
        title: "Authentication",
        body: [
          "Use workspace API keys (Team+) as Bearer tokens. Rotate keys from Settings → Developer.",
          "Signed webhooks use the same secret rotated on a 90-day recommendation.",
        ],
      },
      {
        slug: "issues",
        title: "Issues endpoint",
        body: [
          "GET /v1/issues — list with cursor pagination.",
          "POST /v1/issues — create with title, priority, cycleId optional.",
          "PATCH /v1/issues/:id — update fields; returns the full issue graph including blockers.",
        ],
      },
    ],
  },
];

export function findDoc(sectionSlug: string, itemSlug: string) {
  const section = docSections.find((s) => s.slug === sectionSlug);
  const item = section?.items.find((i) => i.slug === itemSlug);
  return { section, item };
}
