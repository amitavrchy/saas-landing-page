# Orbit

A marketing site and API for Orbit, the project workspace that keeps cycles, issues, and shipping in one place.

**Less chaos. More shipping.**

## Live demo

> **TODO:** No public frontend or API URL is configured.
>
> Checked and empty: the GitHub repository homepage field, this README before this rewrite, both `package.json` files, `netlify.toml`, `render.yaml`, `.env.example` files, and CORS / API base URLs in code. Those files only name local addresses (`http://localhost:3000` for the site, `http://localhost:4000` for the API) and the host products (Netlify, Render). They do not include a deployed URL.

- **Frontend:** TODO — add the Netlify site URL here once the site is published.
- **API:** TODO — add the Render service URL here once the service is published.

## Overview

Orbit is a dark, dense marketing site for a B2B project-ops product, with a small account flow and a NestJS API behind it. The site tells the product story (home, product, pricing, customers, blog, changelog, docs) and includes login and signup. The API stores users, waitlist and demo requests, newsletter subscribers, blog posts, and changelog entries in Postgres.

The product promise on the homepage: bring projects, people, and priorities into one clear orbit.

## Features

- Homepage with a product-board mock, logo strip, feature story, pricing teaser, FAQ, and an in-page demo
- Product pages for cycles, issues, views, automations, triage, and integrations
- Pricing, customer stories, blog, changelog, and docs
- Login and signup screens
- API for register, login, and the current user (JWT)
- API for waitlist, newsletter signup, and demo requests
- Public blog and changelog reads
- `GET /health` for the Render health check

## Tech stack

![Next.js](https://img.shields.io/badge/Next.js-16-111111?style=flat-square)
![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square)
![NestJS](https://img.shields.io/badge/NestJS-12-E0234E?style=flat-square)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square)

| Layer | Stack |
| --- | --- |
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, Redux Toolkit, TanStack Query, React Hook Form, Zod, Framer Motion, Radix UI, Embla |
| Backend | NestJS 12, Prisma 6, PostgreSQL, Passport JWT, class-validator |
| Hosting | Netlify for the site. Render runs the API from `backend/Dockerfile.render`, with Postgres in that same container. |

## Project structure

```
.
├── frontend/                 Next.js site
│   ├── src/                  App routes, marketing UI, content, API client
│   ├── public/
│   ├── netlify.toml          Netlify build (used when base directory is frontend)
│   └── package.json
├── backend/                  NestJS API
│   ├── src/                  Auth, marketing, Prisma
│   ├── prisma/               Schema, migrations, seed
│   ├── Dockerfile            Image for a standalone API container
│   ├── Dockerfile.render     API + Postgres image used by Render
│   ├── docker-compose.yml    Local Postgres
│   └── package.json
├── render.yaml               Render Blueprint (must stay at the repo root)
├── PROJECT_SPEC.md           Original product and build spec
└── README.md
```

Repo-level files stay at the root: this README, `.gitignore`, `PROJECT_SPEC.md`, and `render.yaml`. Render only discovers a Blueprint named `render.yaml` at the repository root.

## Getting started

Use Node.js 22 (the version pinned in `frontend/netlify.toml` and both Dockerfiles).

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_API_URL` in `.env.local`. The sample value is `http://localhost:4000`, which matches the API port. If the variable is missing, the client falls back to `http://localhost:3001`.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

There is no separate typecheck script. `npm run build` runs the TypeScript check, and `npx tsc --noEmit` works on its own.

### Backend

Postgres has to be up before the API will boot. Prisma connects on startup.

```bash
cd backend
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

The API listens on [http://localhost:4000](http://localhost:4000). Fill `JWT_SECRET` and `JWT_REFRESH_SECRET` (at least 32 characters each). `DATABASE_URL` in `.env.example` points at the Compose database `saas_landing_page` on port 5432. `npx prisma generate` reads that variable, so `.env` has to exist first.

`npm ci` in `backend/` currently fails: the lockfile is out of date (`magicast@0.3.5` is missing). Use `npm install` until the lockfile is regenerated.

| Script | What it does |
| --- | --- |
| `npm run start:dev` | Dev server with watch |
| `npm run build` | Compile to `dist/` |
| `npm run start:prod` | Run `node dist/main` |
| `npm run lint` | Oxlint |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | End-to-end tests |

### Deploy settings to update by hand

**Netlify.** `netlify.toml` now lives in `frontend/` and no longer sets `base`. In the site’s build settings, set **Base directory** to `frontend`. Build command: `npm ci && npm run build`. Publish directory: `.next` (the Next.js plugin may override this). Node 22.

If the UI base directory is still `Client`, or still empty from when the root `netlify.toml` set `base = "Client"`, the next build will not find this app until it is `frontend`.

**Render.** `render.yaml` stays at the repo root. Its Dockerfile path is `./backend/Dockerfile.render` and the Docker context is `./backend`. Sync the Blueprint so an existing service picks up those paths. If the service was created by hand with root directory or Docker context `Server`, change that to `backend` and the Dockerfile path to `./backend/Dockerfile.render`.

`CLIENT_ORIGIN` is declared with `sync: false` and has no value in the Blueprint. Set it in the Render dashboard to the frontend origin (local default is `http://localhost:3000`). The container image still uses its own `WORKDIR /app/backend`; that path is inside the image, not the Git root.

## Author

[Amitav Roy Chowdhury](https://github.com/amitavrchy)

## License

This repository has no `LICENSE` file. The API package (`backend/package.json`) is marked `UNLICENSED`. All rights reserved by the author.
