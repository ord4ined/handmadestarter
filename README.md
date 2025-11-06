# Handmade Cloud Starter (Vercel + Supabase)

**Designed for low-spec laptops.** You only need a browser.

## What this is
- **Next.js 14 App Router** app that deploys to **Vercel**.
- Uses **Supabase (Postgres)** for the database.
- Includes **Products**, **PDP**, **Reviews submission**, **Moderation API** (server-only).

## Deploy (step-by-step)

1) Create three free accounts: **GitHub**, **Vercel**, **Supabase**.
2) On Supabase:
   - Create a new project. Password can be simple for now (you can rotate later).
   - Go to **SQL Editor** and run `sql/schema.sql`, then `sql/seed.sql`.
   - Go to **Project Settings → Database**:
     - Copy **Connection string → URI** *for pooled connections* (port 6543). It looks like:

       `postgresql://USER:PASSWORD@HOST:6543/postgres?pgbouncer=true&sslmode=require`
3) On GitHub:
   - Create a new repo (public or private).
   - Upload this folder's contents to the repo (you can drag & drop in GitHub web).
4) On Vercel:
   - **New Project → Import from GitHub** → pick your repo.
   - Set Environment Variables:

     - `DATABASE_URL` = your Supabase pooled connection string (step 2).
   - Deploy. Done.

Open your site → Home page lists seeded products → click a product → submit a review → approve via moderation endpoint (see below).

## Local dev (optional)
You can also run locally if you install Node 18+:
```bash
npm install
cp .env.example .env # paste DATABASE_URL here
npm run dev
```
App runs at http://localhost:3000

## API (server-side routes)
- `GET /api/products` → list products
- `GET /api/products/[slug]` → product + media + price + rating
- `GET /api/reviews/[productId]` → published reviews
- `POST /api/reviews` → submit review (moderation pending)
- `POST /api/reviews/moderate` → approve/reject (add a secret later)

## Next steps
- Add Auth for moderation.
- Add Meilisearch or Supabase Full-Text for search.
- Add intake/QC screens (server actions).
- Add payments + shipping providers..
