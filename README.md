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

## URLs

```
/new-york                    → city page (events + projects)
/new-york/shiphaus-1         → event detail page (by slug)
/new-york/silly-hacks-2026   → Shiphaus Friends event
/chicago                     → city page
/malaysia                    → city page
```

Old `/chapter/` URLs 301 redirect to the flat structure.

## Structure

```
src/
  app/
    page.tsx                    # homepage
    [city]/page.tsx             # city pages (new-york, chicago, malaysia)
    [city]/[eventSlug]/page.tsx # event detail pages
    projects/page.tsx           # all projects
    login/page.tsx              # OAuth login
    setup/page.tsx              # Claude Code install guide
    start-a-chapter/page.tsx    # chapter lead recruitment
    api/                        # API routes (see CONTRIBUTING.md)
  components/                   # shared components
  lib/
    data.ts                     # static fallback data (chapters, events, projects)
    redis.ts                    # Redis client
    redis-data.ts               # all CRUD operations
    auth.ts                     # NextAuth config
  types/index.ts                # TypeScript interfaces
  middleware.ts                 # admin route protection + /chapter/ redirects
scripts/
  migrate-redis-events.js      # one-time migration: enrich Redis events with metadata
```

## Events

Events live in Redis (source of truth) with static fallback in `data.ts`. Each event has:

- **slug** -- clean URL identifier (e.g. `shiphaus-1`, `silly-hacks-2026`)
- **organizer** -- who ran the event
- **hostedBy** -- venue credit (optional)
- **isFriends** -- true for external "Shiphaus Friends" events

Run `node scripts/migrate-redis-events.js --dry-run` to preview metadata updates. Idempotent.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture details, data patterns, and how to add features.
