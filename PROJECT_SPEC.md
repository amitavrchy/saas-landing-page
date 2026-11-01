# SaaS Landing Page — Project Build Spec (Agent-Ready)

> Stack: Next.js Client (Redux Toolkit, React Query, RHF/zod, framer-motion, lucide, **radix accordion/dialog**, **embla-carousel**). NestJS + Prisma + Postgres + JWT. Optional adds: `cmdk`, `class-variance-authority`, `@radix-ui/react-tabs`, `@radix-ui/react-navigation-menu`, `recharts` (usage charts in dashboard), `resend` or nodemailer on server for waitlist.

---

## 1. Vision & Audience

**Vision:** A conversion-first marketing site + lightweight product shell for a fictional B2B SaaS — **“Orbit”**, an AI-assisted project ops tool for product teams. Aesthetic: Linear quiet confidence × Vercel density/motion × Stripe pricing clarity. Dark theme, product UI as proof, one promise above the fold.

**Audience:** Product managers, eng leads, startup founders evaluating tools (ICP: 5–200 person product orgs).

**Promise:** “Ship the roadmap without the chaos.”

---

## 2. References

| Site | Steal | Link |
|------|-------|------|
| Linear | Quiet hero, product screenshot as proof, restraint | https://linear.app |
| Vercel | Section-as-story scroll, live demos, density | https://vercel.com |
| Stripe | Pricing architecture, trust inline, meaningful gradient | https://stripe.com |
| Cursor / Lovable | Bold one-claim hero, try-in-page | https://cursor.com |
| Framer | Ambient brand motion | https://www.framer.com |
| Stripe Awwwards | Nominee craft reference | https://www.awwwards.com/sites/stripe |

**2026 patterns:** Real product UI > illustrations; headlines ≤ 12 words; logos just below hero; transparent pricing; interactive in-page demo widget.

---

## 3. Design System

### Color
| Token | Hex |
|-------|-----|
| `--bg` | `#07070A` |
| `--surface` | `#111116` |
| `--surface-2` | `#1A1A22` |
| `--border` | `#2A2A35` |
| `--text` | `#ECECF1` |
| `--muted` | `#9B9BA8` |
| `--accent` | `#5E6AD2` (Linear-like indigo) |
| `--accent-2` | `#8B5CF6` |
| `--success` | `#3DD68C` |
| `--danger` | `#F87171` |
| Gradient mesh | `#5E6AD2` → `#8B5CF6` → `#22D3EE` at 8% opacity for hero aura |

### Typography
- **Sans:** `Geist` or `Inter` — UI everywhere.
- **Display optional:** `Cal Sans` / `Geist` bold for hero.
- **Mono:** `Geist Mono` / `JetBrains Mono` for code snippets & pricing math.
- Type scale: 13–14 body, 16 lead, 32/48/72 display.

### Motion
- Hero fade-up stagger children 60ms, 500ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- Feature section: scroll-linked opacity/y with framer `useScroll` / `useTransform`.
- Accordion 250ms; Embla autoplay logos 3s; button press scale 0.98 / 100ms.
- No decorative bounce; motion = explanation.

### Spacing
Max width marketing `1120px`; padding `px-6`; section `py-28`. Radius `12px` cards, `8px` controls.

---

## 4. Sitemap

### `/` Marketing home
1. Announcement pill (“Orbit 2.0 — Cycles & AI triage”)
2. Hero: H1 + sub + primary CTA “Start free” + secondary “Book demo”; **product UI mock** (animated checklist / cycle board) — not abstract art
3. Logo cloud (Embla infinite)
4. Social proof quote
5. **Product tour tabs** (Radix Tabs): Plan / Build / Ship — each with UI panel + copy
6. Feature grid (6): cycles, issues, views, automations, AI triage, integrations
7. Interactive mini-demo: create a fake issue client-side (local state) — conversion lift pattern
8. Testimonials Embla
9. Pricing teaser strip → `/pricing`
10. FAQ accordion (Radix)
11. Final CTA band
12. Footer

### `/pricing`
Stripe-style: usage math explainer, 3 tiers (Starter / Team / Enterprise) with ICP names (“for solo PMs”, “for product teams”, “for orgs”), feature comparison table, FAQ, annual toggle.

### `/features` · `/features/[slug]`
Deep pages for key pillars with diagrams and motion.

### `/customers` · `/customers/[slug]`
Case study layout.

### `/blog` · `/blog/[slug]`
SEO content from API.

### `/changelog`
Timeline of releases.

### `/docs` (stub)
Left nav + MD content placeholder.

### Auth & app shell
`/login` `/signup` `/app` (dashboard home), `/app/settings`, `/app/billing` (mock).
Waitlist capture if “coming soon” mode flag.

### Admin
`/admin/posts` for blog CMS MVP.

**Signature interactions:** Animated product window with cursor ghost clicking issues; gradient that reacts subtly to pointer; pricing toggle spring; FAQ height animate.

---

## 5. Features

### MVP
- Full marketing pages above with seed content
- Auth + organizations (workspace) model
- Waitlist / contact demo form → Nest
- Pricing page static + checkout stub (POST intent)
- Blog CRUD admin + public
- Dashboard shell with fake metrics (React Query to `/metrics`)
- Newsletter subscribe

### Stretch
- Stripe Checkout real integration
- Interactive sandbox that persists demo project per session
- Theme toggle (dark default)
- i18n
- Changelog from git tags
- Onboarding checklist in `/app`

---

## 6. Frontend Architecture

```
Client/src/
  app/(marketing)/ page, pricing, features, blog, customers, changelog
  app/(auth)/ login, signup
  app/(app)/ app/...
  components/marketing/ (Hero, LogoCloud, FeatureTabs, PricingCards, Faq)
  components/product-mock/ (CycleBoardMock)
  components/ui/ (radix wrappers)
  features/auth/authSlice.ts
  features/ui/uiSlice.ts
  lib/api.ts
```

**Redux:** `auth`, `ui` (mobile nav, pricing yearly bool).
**React Query:** blog, changelog, waitlist mutation, `/me`, dashboard metrics.
**Adds:** `@radix-ui/react-tabs`, `cmdk`, `cva`, `recharts`.

---

## 7. Backend

### Prisma

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }

enum Role { USER ADMIN }
enum Plan { FREE STARTER TEAM ENTERPRISE }

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String
  name         String
  role         Role     @default(USER)
  createdAt    DateTime @default(now())
  memberships  Membership[]
  waitlist     WaitlistEntry?
}

model Organization {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(FREE)
  createdAt DateTime @default(now())
  members   Membership[]
}

model Membership {
  id             String @id @default(cuid())
  userId         String
  organizationId String
  role           String @default("member")
  user           User @relation(fields: [userId], references: [id], onDelete: Cascade)
  organization   Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  @@unique([userId, organizationId])
}

model WaitlistEntry {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  company   String?
  userId    String?  @unique
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
}

model DemoRequest {
  id        String   @id @default(cuid())
  name      String
  email     String
  company   String?
  message   String?
  createdAt DateTime @default(now())
}

model BlogPost {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  excerpt     String
  body        String
  coverImage  String?
  publishedAt DateTime?
  authorName  String
  tags        String[]
  createdAt   DateTime  @default(now())
}

model ChangelogEntry {
  id          String   @id @default(cuid())
  title       String
  body        String
  version     String?
  publishedAt DateTime @default(now())
}

model Subscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
}
```

### Endpoints

| Method | Path | Auth |
|--------|------|------|
| POST | `/auth/register` `/auth/login` | public |
| GET | `/auth/me` | JWT |
| POST | `/waitlist` | public |
| POST | `/demo-requests` | public |
| POST | `/subscribers` | public |
| GET | `/blog` `/blog/:slug` | public |
| POST/PATCH/DELETE | `/blog` | ADMIN |
| GET | `/changelog` | public |
| GET | `/metrics/overview` | JWT | fake KPIs |
| CRUD | `/organizations` | JWT |

---

## 8. Perf / A11y / SEO

- Lighthouse Perf/Best Practices/SEO ≥ 95; A11y ≥ 95.
- Prefer CSS/Framer over Lottie-heavy heroes; lazy Embla.
- Semantic landmarks; accordion keyboard; focus visible rings on dark (`ring-accent`).
- OG images per blog; FAQ JSON-LD; PricingOffer schema optional.

---

## 9. Build Order

1. Design tokens + marketing layout shell
2. Home sections static → wire waitlist API
3. Pricing + FAQ
4. Auth + org bootstrap on signup
5. Blog + changelog
6. `/app` shell metrics
7. Motion polish + SEO
8. Stretch Stripe

## 10. Acceptance

- [ ] Hero shows real product UI mock, not stock illustration
- [ ] Pricing has 3 ICP-named tiers + annual toggle
- [ ] Waitlist persists to Postgres
- [ ] Blog list/detail SEO metadata
- [ ] Signup creates User + Organization + Membership
- [ ] Accordion/Dialog accessible via Radix
- [ ] Dark theme consistent; no zustand
