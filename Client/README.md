# Orbit site

**Site:** [https://orbit-saas-162.netlify.app](https://orbit-saas-162.netlify.app)

**API:** [https://orbit-saas-api.onrender.com](https://orbit-saas-api.onrender.com)

Next.js app for the Orbit marketing site, plus login and signup screens.

Setup, scripts, and deploy notes are in the repository [README](../README.md).

```bash
cp .env.example .env.local
npm ci
npm run dev
```

`npm run dev` starts the dev server. Set `NEXT_PUBLIC_API_URL` in `.env.local` to the API origin. The sample is in `.env.example`.
