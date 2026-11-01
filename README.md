# Orbit

**Site:** [https://orbit-saas-162.netlify.app](https://orbit-saas-162.netlify.app)

**API:** [https://orbit-saas-api.onrender.com](https://orbit-saas-api.onrender.com)

Ship the roadmap without the chaos.

Orbit is an AI-assisted project workspace for product teams: cycles, issues, and triage in one place, with a marketing site in front and a small API behind it.

## Overview

The site is a dark, dense marketing experience for a B2B product called Orbit. It walks through the product (home, features, pricing, customers, blog, changelog, and docs) and includes login and signup screens. Copy and page content live in the Next.js app.

The API is a NestJS service on PostgreSQL. It registers users, opens a workspace and membership on signup, and stores waitlist entries, demo requests, newsletter subscribers, blog posts, and changelog entries. The footer newsletter on the site posts to that API. Login and signup screens are in the app; those forms are not submitted to the auth endpoints yet.

## Features

- Homepage with a product-board mock, logo strip, feature story, pricing teaser, FAQ, and an in-browser issue sandbox
- Product pages for cycles, issues, views, automations, AI triage, and integrations
- Pricing for Starter, Team, and Enterprise, with a monthly / annual toggle
- Customer stories, blog, changelog, and docs
- Login and signup screens
- API: register, login, and the current user (JWT)
- API: waitlist, newsletter, and demo requests
- API: public blog and changelog reads
- `GET /health` checks the process and the database

## Tech stack

![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=flat-square&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

| Layer | Stack |
| --- | --- |
| Site | Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Redux Toolkit, TanStack Query, React Hook Form, Zod, Framer Motion, Radix UI, Embla |
| API | NestJS 12, TypeScript 6, Prisma 6, PostgreSQL, Passport JWT, class-validator |
| Hosting | Netlify serves the site from `Client`. Render runs the API from `Server/Dockerfile.render`, with Postgres in that same container. |

## Project structure

```
.
├── Client/                 Next.js site
│   ├── src/app/            Marketing, login, and signup routes
│   ├── src/components/     Marketing UI and product mock
│   ├── src/content/        Blog, changelog, customers, docs, features
│   ├── src/lib/api.ts      Client for the API
│   └── package.json
├── Server/                 NestJS API
│   ├── src/                Auth, marketing, Prisma
│   ├── prisma/             Schema, migrations, seed
│   ├── Dockerfile          API image that expects Postgres elsewhere
│   ├── Dockerfile.render   API + Postgres image used on Render
│   ├── docker-compose.yml  Local Postgres
│   └── package.json
├── netlify.toml            Netlify build (base directory: Client)
├── render.yaml             Render Blueprint (repo root)
└── README.md
```

`netlify.toml` and `render.yaml` stay at the repository root so the existing Netlify and Render services keep their current settings.

## Getting started

Use Node.js 22. That is the version in `netlify.toml` and both Dockerfiles.

### Site (`Client`)

```bash
cd Client
cp .env.example .env.local
npm ci
npm run dev
```

`npm run dev` starts the Next.js dev server. Set `NEXT_PUBLIC_API_URL` in `.env.local` to the API origin. Copy the variable from `.env.example` and adjust it. If `NEXT_PUBLIC_API_URL` is unset, the client uses a built-in default that does not follow `PORT`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build (includes the TypeScript check) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

`npx tsc --noEmit` typechecks without a production build. Run it after `npm run build` so Next.js has generated its route types.

### API (`Server`)

Postgres has to be up before the API will boot. Prisma connects on startup.

```bash
cd Server
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

`npm ci` fails on the current lockfile (`magicast@0.3.5` is missing). Use `npm install` until the lockfile is regenerated. `Dockerfile.render` already installs with `npm install`. The plain `Dockerfile` runs `npm ci` and hits the same lockfile error.

The API listens on the port in `PORT`. `GET /` returns `Orbit API`. On the live service that response is [https://orbit-saas-api.onrender.com](https://orbit-saas-api.onrender.com).

Fill `JWT_SECRET` and `JWT_REFRESH_SECRET` (at least 32 characters each). Point `DATABASE_URL` at the Compose database. The database name in `.env.example` is `saas_landing_page`, which matches `docker-compose.yml`. `npx prisma generate` reads `DATABASE_URL`, so `.env` has to exist first.

The Render image is separate from Compose. It builds from this directory and bundles Postgres for the `orbit_saas` database:

```bash
docker build -f Dockerfile.render -t orbit-api .
```

| Script | What it does |
| --- | --- |
| `npm run start:dev` | Dev server with watch |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run `node dist/main` |
| `npm run lint` | Oxlint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests |

### Deploy

No dashboard changes are required for the current services.

- **Netlify** reads the root `netlify.toml`: base directory `Client`, command `npm ci && npm run build`, publish `Client/.next`, Node 22. The live site is [https://orbit-saas-162.netlify.app](https://orbit-saas-162.netlify.app).
- **Render** is a Docker web service with an empty Root Directory, so it builds from the repository root. `render.yaml` sets the Dockerfile to `./Server/Dockerfile.render` and the Docker context to `./Server`. The container listens on `PORT` and serves `GET /health` at [https://orbit-saas-api.onrender.com/health](https://orbit-saas-api.onrender.com/health).

Set `CLIENT_ORIGIN` on the Render service to [https://orbit-saas-162.netlify.app](https://orbit-saas-162.netlify.app) so the API accepts browser requests from the live site.

## Author

[Amitav Roy Chowdhury](https://github.com/amitavrchy)

## License

This repository has no `LICENSE` file. The API package is marked `UNLICENSED`.
