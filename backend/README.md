# Orbit API

NestJS API for auth, waitlist, newsletter, demo requests, blog, and changelog.

Setup, scripts, and deploy notes are in the repository [README](../README.md).

```bash
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

The API listens on [http://localhost:4000](http://localhost:4000).

Render builds this service from the repo-root `render.yaml` using `Dockerfile.render` in this directory. `npm ci` fails on the current lockfile; use `npm install`.
