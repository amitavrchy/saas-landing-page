# Orbit API

**Site:** [https://orbit-saas-162.netlify.app](https://orbit-saas-162.netlify.app)

**API:** [https://orbit-saas-api.onrender.com](https://orbit-saas-api.onrender.com)

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

`npm ci` fails on the current lockfile (`magicast@0.3.5` is missing). Use `npm install`.

The API listens on the port in `PORT`.

Render builds this service with `Dockerfile.render` in this directory. The root `render.yaml` points at that file, with Docker context `Server`.
