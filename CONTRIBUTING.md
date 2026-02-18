# Contributing to Shiphaus

## Architecture overview

### Data: two-tier pattern

This is the most important thing to understand. Data lives in two places:

1. **Static arrays** in `src/lib/data.ts` -- chapters, events, projects, testimonials. Hardcoded. Loaded instantly on page render.
2. **Upstash Redis** -- the real database. All CRUD goes through `src/lib/redis-data.ts`.

Pages load static data first, then `useEffect` fetches from the API to hydrate with Redis data. This means the site works even if Redis is down (with stale data).

### Auth

- **NextAuth v5** with Google and GitHub OAuth providers.
- JWT sessions (no database sessions).
- Admin status determined by `ADMIN_EMAILS` env var (comma-separated list). Checked at JWT creation time in `src/lib/auth.ts`.
- Sign-in auto-subscribes the user's email to the subscriber list (fire-and-forget Redis write).

### Admin protection

`src/middleware.ts` intercepts all `/api/admin/*` requests. It reads the NextAuth session cookie, makes an internal fetch to `/api/auth/session` to verify the session and check `isAdmin`. This is a workaround because Edge middleware can't import the full NextAuth library.

### Redis key schema

All keys are in `src/lib/redis-data.ts`:

```
shiphaus:project:{id}              # hash - single project
shiphaus:projects                  # set  - all project IDs
shiphaus:projects:chapter:{id}     # set  - project IDs by chapter
shiphaus:projects:event:{id}       # set  - project IDs by event
shiphaus:projects:featured         # set  - featured project IDs

shiphaus:event:{id}                # hash - single event
shiphaus:events                    # set  - all event IDs
shiphaus:events:chapter:{id}       # set  - event IDs by chapter

subscribers                        # set  - all subscriber emails
subscriber:{email}                 # hash - subscriber metadata
```

## Types

All in `src/types/index.ts`:

- **Chapter** -- a city (new-york, chicago, boulder, malaysia). Has a lead, color.
- **Event** -- a build day. Belongs to a chapter. Has status (upcoming/active/closed), optional Luma RSVP link.
- **Project** -- something someone built. Belongs to a chapter + event. Has a builder (name, avatar, uid).
- **Testimonial** -- a quote from a participant.

## API routes

### Public

| Method | Route | What it does |
|--------|-------|--------------|
| GET | `/api/events` | All events. `?chapter=` to filter. |
| GET | `/api/projects` | All projects. `?chapter=` or `?event=` to filter. |
| GET | `/api/projects/featured` | Featured projects (homepage). |
| PATCH | `/api/projects/[id]` | Edit project (must be owner or admin). |
| DELETE | `/api/projects/[id]` | Delete project (must be owner or admin). |
| POST | `/api/submit` | Submit a project. Requires auth. Rate-limited (3/min). |
| POST | `/api/subscribe` | Email signup. Rate-limited (5/hr). |
| POST | `/api/upload` | Upload event image (admin only, Vercel Blob). |

### Admin (requires `isAdmin` session)

| Method | Route | What it does |
|--------|-------|--------------|
| GET/POST | `/api/admin/events` | List / create events. |
| PATCH/DELETE | `/api/admin/events/[id]` | Update / delete event. |
| GET | `/api/admin/projects` | List all projects. |
| PATCH/DELETE | `/api/admin/projects/[id]` | Update / delete project. |
| PATCH | `/api/admin/projects/[id]/feature` | Toggle featured. |
| GET | `/api/admin/stats` | Counts (projects, featured, events). |
| GET | `/api/admin/subscribers` | All email subscribers. |

## How to add a new page

1. Create `src/app/your-page/page.tsx`.
2. Add `'use client'` at the top (current pattern -- all pages are client components).
3. Use Framer Motion for animations: `initial={{ opacity: 0, y: 20 }}`, `viewport={{ once: true }}`.
4. Follow the design system in `CLAUDE.md` (colors, typography, spacing, components).

## How to add a new API route

1. Create `src/app/api/your-route/route.ts`.
2. Export named functions: `GET`, `POST`, `PATCH`, `DELETE`.
3. For data operations, import from `src/lib/redis-data.ts` or add new functions there.
4. For auth-protected routes, either:
   - Put it under `/api/admin/` (middleware handles auth automatically), or
   - Check the session manually with `import { auth } from '@/lib/auth'`.
5. For rate limiting, see `/api/subscribe/route.ts` for the pattern (uses `@upstash/ratelimit`).

## How to add a new data type

1. Add the interface to `src/types/index.ts`.
2. Add serialize/deserialize functions in `src/lib/redis-data.ts`.
3. Add Redis key patterns to the `KEYS` object.
4. Add CRUD functions following the existing pattern (pipeline for writes, smembers + hgetall for reads).
5. Create API routes to expose it.

---

## TODO: Simplifications

Known issues and cleanup opportunities. Good first contributions.

### `hostedBy` lost in Redis serialization

`serializeEvent()` in `redis-data.ts` doesn't serialize the `hostedBy` field even though the `Event` type supports it. Events created via the admin API will lose their venue info. Either add `hostedBy: JSON.stringify(event.hostedBy)` to the serializer or keep it static-only.

### Ghost `approvedBy` field

`deserializeProject()` line 51 has `data.approvedBy` as a fallback for `submittedBy`. This field doesn't exist in the type -- it's a leftover from a rename. Safe to remove the fallback.

### `isAdmin` type hack in auth.ts

Line 55: `(session.user as unknown as Record<string, unknown>).isAdmin`. Should extend the NextAuth `Session` type properly with a `declare module` augmentation instead of the double-cast.

### Incomplete `.env.local.example`

Fixed in this PR -- was missing 5 of 8 required vars.

### Legacy `/api/subscribers` endpoint

`/api/subscribers` (protected by `ADMIN_API_KEY` Bearer token) duplicates `/api/admin/subscribers` (protected by NextAuth session). The legacy endpoint can be removed once nothing depends on it.

### All pages are `'use client'`

Every page component is a client component. Some pages (like `/setup`, `/start-a-chapter`) have no interactivity beyond animations and could be server components with client islands for the animated parts. Lower priority -- works fine as-is.

### Static data drift

The static arrays in `data.ts` and the Redis data can drift since they're independent. The seed script only runs once. Consider either: removing the static fallback (trust Redis), or generating the static data from Redis at build time.
