export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  authorName: string;
  publishedAt: string;
  tags: string[];
  readingMinutes: number;
  body: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cycles-not-sprints",
    title: "Cycles, not sprints: why product orgs need a shared rhythm",
    excerpt:
      "Sprints optimized for eng ceremonies. Cycles optimize for shipped roadmap — with capacity everyone can see.",
    authorName: "Maya Okada",
    publishedAt: "2026-09-12",
    tags: ["Product", "Cycles"],
    readingMinutes: 7,
    body: [
      "Most teams inherit scrum vocabulary without inheriting scrum’s context. “Sprint” becomes a two-week guilt calendar. Capacity is a polite fiction.",
      "Orbit cycles start from a different question: what can this team honestly finish before the next stakeholder digest? Velocity is measured from merged work, not story-point theater.",
      "When PM and eng share that number, prioritization stops being a negotiation in the dark. The roadmap becomes a sequence of cycles — not a wish list with dates taped on.",
      "If your standups are archaeology, you don’t need a longer standup. You need a board that already knows what moved.",
    ],
  },
  {
    slug: "ai-triage-with-a-human-gate",
    title: "AI triage with a human gate",
    excerpt:
      "Automation that mutates your backlog without consent is how you lose trust. Here’s how Orbit keeps the human in the loop.",
    authorName: "Jordan Lee",
    publishedAt: "2026-08-28",
    tags: ["AI", "Trust"],
    readingMinutes: 5,
    body: [
      "Inbox zero for issues is a fantasy. Ranking the inbox is not.",
      "Orbit’s AI triage suggests priority, area, and assignee. It never writes until someone clicks approve. That single gate is the difference between an assistant and a liability.",
      "We also don’t train foundation models on your workspace. Suggestions use your recent cycle patterns inside your region — then stop.",
      "Teams that adopt triage report the same feeling: morning coffee becomes a review, not a rewrite.",
    ],
  },
  {
    slug: "killing-the-status-meeting",
    title: "Killing the status meeting without killing alignment",
    excerpt:
      "Alignment isn’t a calendar invite. It’s a shared view of WIP, risk, and what ships next.",
    authorName: "Riley Chen",
    publishedAt: "2026-08-04",
    tags: ["Culture", "Ops"],
    readingMinutes: 6,
    body: [
      "Status meetings exist because tools lie or people don’t open them. Fix the tool and the meeting evaporates.",
      "A good cycle board answers: what’s committed, what’s blocked, what’s at risk. A Friday digest answers the exec version of the same questions.",
      "Meridian cut three weekly status meetings after moving to Orbit. They didn’t become less aligned — they became less performative.",
      "Replace theater with artifacts. Your calendar will thank you.",
    ],
  },
  {
    slug: "migrating-from-linear",
    title: "Migrating from Linear in a day",
    excerpt:
      "Keep the calm. Gain cycles, AI triage, and stakeholder digests. A practical import playbook.",
    authorName: "Sam Okonkwo",
    publishedAt: "2026-07-19",
    tags: ["Migration", "Integrations"],
    readingMinutes: 8,
    body: [
      "You don’t need a six-month migration program to change issue trackers. You need a clean import, SSO, and a week of overlapping truth.",
      "Orbit’s Linear import maps issues, projects → cycles, and assignees. Run it on a Friday. Keep Linear read-only for a week. Cut over when the board feels boring — boring is good.",
      "The teams that struggle try to redesign process mid-migration. Don’t. Import first. Tune cycles in week two.",
    ],
  },
];

export function getPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
