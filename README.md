# Shiphaus

One-day build events for builders. Start at 10. Ship by 5.

## Stack

- Next.js 16 (App Router)
- Upstash Redis (data store)
- NextAuth v5 (Google + GitHub OAuth)
- Tailwind CSS 4
- Framer Motion
- Vercel (hosting + Blob storage)

## Dev

```bash
npm install
cp .env.local.example .env.local  # fill in values
npm run seed                       # populate Redis (run once)
npm run dev
```

Runs on [localhost:3000](http://localhost:3000).

## Env vars

See `.env.local.example` for the full list. You need Upstash Redis credentials, OAuth client IDs for Google and GitHub, and an `AUTH_SECRET` for NextAuth.

## Structure

```
src/
  app/
    page.tsx                    # homepage
    chapter/[id]/page.tsx       # chapter pages (new-york, chicago, boulder, malaysia)
    projects/page.tsx           # all projects with chapter filter
    login/page.tsx              # OAuth login
    setup/page.tsx              # Claude Code install guide
    start-a-chapter/page.tsx    # chapter lead recruitment
    api/                        # API routes (see CONTRIBUTING.md)
  components/                   # shared components
  lib/
    data.ts                     # static fallback data
    redis.ts                    # Redis client
    redis-data.ts               # all CRUD operations
    auth.ts                     # NextAuth config
  types/index.ts                # TypeScript interfaces
  middleware.ts                 # admin route protection
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture details, data patterns, and how to add features.
