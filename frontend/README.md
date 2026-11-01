# Orbit frontend

Next.js app for the Orbit marketing site and account screens.

Setup, scripts, and deploy notes are in the repository [README](../README.md).

```bash
cp .env.example .env.local
npm ci
npm run dev
```

The dev server is [http://localhost:3000](http://localhost:3000). Point `NEXT_PUBLIC_API_URL` at the API (`http://localhost:4000` in `.env.example`).

Netlify reads `netlify.toml` in this directory. Set the site **base directory** to `frontend`.
