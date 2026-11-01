export type Customer = {
  slug: string;
  company: string;
  industry: string;
  size: string;
  logo: string;
  quote: string;
  person: string;
  role: string;
  initials: string;
  challenge: string;
  solution: string;
  results: { value: string; label: string }[];
  story: string[];
};

export const customers: Customer[] = [
  {
    slug: "meridian",
    company: "Meridian",
    industry: "Fintech",
    size: "120 people",
    logo: "Meridian",
    quote:
      "Orbit replaced three tools and the weekly status theater. Our roadmap finally matches what ships.",
    person: "Riley Chen",
    role: "VP Product",
    initials: "RC",
    challenge:
      "Three trackers, two standups, and a deck that lied about dates. PMs and eng leads could not agree on capacity.",
    solution:
      "Consolidated into Orbit cycles with shared velocity, AI triage on inbound bank ops bugs, and Slack digests for leadership.",
    results: [
      { value: "0", label: "weekly status meetings" },
      { value: "38%", label: "faster P0 close" },
      { value: "3→1", label: "tools consolidated" },
    ],
    story: [
      "Meridian’s product org had grown past sticky notes and into chaos: Jira for eng, Notion for PM, a Google Sheet for the board. Dates slipped because nobody shared a definition of “in cycle.”",
      "After a two-week Orbit pilot on the payments squad, they imported Linear history, set capacity from the last four cycles, and turned on AI triage for support-escalated bugs.",
      "Leadership now reads a Friday digest instead of booking another sync. The board view is the roadmap — not a slide that ages out by Tuesday.",
    ],
  },
  {
    slug: "cascade",
    company: "Cascade",
    industry: "Developer tools",
    size: "45 people",
    logo: "Cascade",
    quote:
      "We cut status meetings from three a week to zero. Orbit is the source of truth our eng leads actually open.",
    person: "Aisha Rahman",
    role: "Eng Lead",
    initials: "AR",
    challenge:
      "A remote eng org drowning in Slack threads. Priorities flipped daily; cycle goals were vibes.",
    solution:
      "Keyboard-first issues, saved eng-lead views, and automations that nudge stalled P1s before they rot.",
    results: [
      { value: "3→0", label: "status meetings / week" },
      { value: "2×", label: "cycle commitment hit rate" },
      { value: "90%", label: "eng adopting daily" },
    ],
    story: [
      "Cascade’s eng leads were spending Mondays reconstructing priority from Slack. Orbit’s list view with priority and blocker graph became the morning ritual.",
      "Automations ping assignees when a P1 sits untouched for 48 hours — polite, logged, and reversible.",
    ],
  },
  {
    slug: "helix",
    company: "Helix",
    industry: "Healthtech",
    size: "28 people",
    logo: "Helix",
    quote:
      "AI triage alone paid for Team plan in the first month. Inbox chaos became a ranked backlog.",
    person: "Tomás Alvarez",
    role: "Founder",
    initials: "TA",
    challenge:
      "A tiny team, a flood of clinic feedback, and no PM bandwidth to triage every message.",
    solution:
      "AI triage on a shared intake form → Orbit issues, with human approve before anything hit the cycle board.",
    results: [
      { value: "1 mo", label: "ROI on Team plan" },
      { value: "73%", label: "inbound auto-labeled" },
      { value: "4h", label: "founder time saved / week" },
    ],
    story: [
      "Helix refused to hire a full-time PM just to sort feedback. Orbit’s approve-gated triage meant the founder reviewed suggestions over coffee instead of rewriting tickets.",
    ],
  },
  {
    slug: "forge",
    company: "Forge",
    industry: "B2B SaaS",
    size: "80 people",
    logo: "Forge",
    quote:
      "The cycle board feels like Linear’s calm with Stripe’s clarity. Our PMs finally agree on capacity.",
    person: "Priya Nair",
    role: "Head of Product",
    initials: "PN",
    challenge:
      "Two PM pods estimating in story points that meant different things. Roadmaps diverged mid-quarter.",
    solution:
      "Shared cycle capacity model, roadmap view for GTM, and GitHub PR sync so “done” meant merged.",
    results: [
      { value: "100%", label: "pods on shared velocity" },
      { value: "1", label: "roadmap for GTM + eng" },
      { value: "22%", label: "fewer slipped commits" },
    ],
    story: [
      "Forge standardized on Orbit cycles across pods. Capacity is no longer a negotiation — it’s a number pulled from shipped work.",
    ],
  },
  {
    slug: "vertex",
    company: "Vertex",
    industry: "Infrastructure",
    size: "200 people",
    logo: "Vertex",
    quote:
      "Imported from three tools in an afternoon. The integrations didn’t feel like a migration project.",
    person: "Jonah Blake",
    role: "COO",
    initials: "JB",
    challenge:
      "Acquisition left them with three issue trackers and angry engineering managers.",
    solution:
      "Linear + CSV import, SSO, audit log, and a dedicated success manager on Enterprise.",
    results: [
      { value: "1d", label: "import complete" },
      { value: "3", label: "legacy tools retired" },
      { value: "SSO", label: "day-one security bar" },
    ],
    story: [
      "Vertex treated consolidation as a compliance project as much as a productivity one. Orbit Enterprise cleared legal in parallel with the import.",
    ],
  },
  {
    slug: "nova",
    company: "Nova",
    industry: "Consumer",
    size: "60 people",
    logo: "Nova",
    quote:
      "Design, eng, and growth finally share one board. Launch weeks stopped feeling like hostage situations.",
    person: "Sam Okonkwo",
    role: "Director of Product",
    initials: "SO",
    challenge:
      "Launch checklists lived in three Notion pages. Nobody knew what “blocked” meant.",
    solution:
      "Ship checklist automations + a shared launch view with blocking relations across teams.",
    results: [
      { value: "40%", label: "shorter launch crunch" },
      { value: "1", label: "shared launch view" },
      { value: "0", label: "lost checklist items" },
    ],
    story: [
      "Nova’s launch view is now a ritual: if it’s not on the board with a blocker link, it isn’t real.",
    ],
  },
];

export function getCustomer(slug: string) {
  return customers.find((c) => c.slug === slug);
}
