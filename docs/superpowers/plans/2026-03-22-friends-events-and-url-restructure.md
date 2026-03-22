# Friends Events + URL Restructure

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add "Shiphaus Friends" affiliate events and flatten the URL structure from `/chapter/[id]/event/[eventId]` to `/[city]/[eventSlug]`.

**Architecture:** Events gain a `slug` field for clean URLs and an optional `isFriends` flag with `organizer` metadata. Route files move from nested `/chapter/[id]/` to flat `/[city]/`. Old URLs redirect via middleware. First Friends event: Silly Hacks 2026 under New York.

**Tech Stack:** Next.js App Router, TypeScript, Upstash Redis, Framer Motion

---

## File Map

### Modified files
| File | Change |
|------|--------|
| `src/types/index.ts` | Add `slug`, `isFriends`, `organizer` to Event type |
| `src/lib/data.ts` | Add slugs to existing events, add Silly Hacks 2026 entry |
| `src/lib/redis-data.ts` | Serialize/deserialize new Event fields |
| `src/middleware.ts` | Add redirects for old `/chapter/` URLs |
| `src/components/Navbar.tsx` | Update links from `/chapter/{id}` to `/{id}` |
| `src/components/NavCityLink.tsx` | Update href pattern |
| `src/components/ChapterCard.tsx` | Update link from `/chapter/{id}` to `/{id}` |
| `src/app/page.tsx` | Update hero event links, sign-in callbacks |
| `src/app/sitemap.ts` | Update URL patterns |
| `src/app/api/submit/route.ts` | No change (uses chapterId/eventId internally) |
| `src/components/SubmitProjectModal.tsx` | No change |

### New files
| File | Purpose |
|------|---------|
| `src/app/[city]/page.tsx` | City/chapter page (moved from `chapter/[id]/page.tsx`) |
| `src/app/[city]/layout.tsx` | City layout + metadata (moved from `chapter/[id]/layout.tsx`) |
| `src/app/[city]/[eventSlug]/page.tsx` | Event detail page (moved from `chapter/[id]/event/[eventId]/page.tsx`) |

### Deleted files (after new routes verified)
| File | Reason |
|------|--------|
| `src/app/chapter/[id]/page.tsx` | Replaced by `src/app/[city]/page.tsx` |
| `src/app/chapter/[id]/layout.tsx` | Replaced by `src/app/[city]/layout.tsx` |
| `src/app/chapter/[id]/event/[eventId]/page.tsx` | Replaced by `src/app/[city]/[eventSlug]/page.tsx` |

---

## Lookup Strategy

Events get a `slug` field used for URLs. Lookup helper:

```typescript
// in data.ts
export function getEventBySlug(chapterId: string, slug: string): Event | undefined {
  return events.find(e => e.chapterId === chapterId && (e.slug === slug || e.id === slug));
}
```

This falls back to matching by `id` so old bookmarks with event IDs still work. City route validates against known chapter IDs and returns `notFound()` for unknown cities.

---

## Task 1: Type + Data Model Changes

**Files:**
- Modify: `src/types/index.ts:21-37`
- Modify: `src/lib/data.ts:56-128`

- [ ] **Step 1: Add new fields to Event type**

In `src/types/index.ts`, add `slug`, `isFriends`, and `organizer` to the Event interface:

```typescript
export interface Event {
  id: string;
  chapterId: string;
  title: string;
  slug?: string;          // URL slug — falls back to id if not set
  date: string;
  location: string;
  builderCount?: number;
  projectCount?: number;
  status?: EventStatus;
  lumaUrl?: string;
  imageUrl?: string;
  hostedBy?: {
    name: string;
    url: string;
    tagline?: string;
  };
  isFriends?: boolean;    // true = Shiphaus Friends event (external organizer)
  organizer?: {
    name: string;
    url?: string;
    avatar?: string;
  };
}
```

- [ ] **Step 2: Add slugs to existing events and add Silly Hacks**

In `src/lib/data.ts`, add `slug` to each existing event and append the Silly Hacks entry:

```typescript
// Existing events — add slug field:
{ id: 'ny-zero-to-one',              slug: 'shiphaus-1',  ... },
{ id: 'ny-shiphaus-jan-2026',        slug: 'shiphaus-2',  ... },
{ id: 'ns-shiphaus-feb-2026',        slug: 'shiphaus-1',  ... },  // malaysia
{ id: 'ny-shiphaus-3-feb-2026',      slug: 'shiphaus-3',  ... },
{ id: 'chicago-shiphaus-1-feb-2026', slug: 'shiphaus-1',  ... },  // chicago
{ id: 'chicago-shiphaus-2-apr-2026', slug: 'shiphaus-2',  ... },  // chicago

// New event — append to events array:
{
  id: 'ny-silly-hacks-2026',
  chapterId: 'new-york',
  slug: 'silly-hacks-2026',
  title: 'Silly Hacks 2026',
  date: '2026-03-28T10:00:00',
  location: 'New York, NY',
  status: 'active',
  lumaUrl: 'https://luma.com/2kmjexb1',
  isFriends: true,
  organizer: {
    name: 'Bobby Thakkar',
    url: 'https://dino.rest',
  },
},
```

- [ ] **Step 3: Add lookup helper**

In `src/lib/data.ts`, add:

```typescript
export function getEventBySlug(chapterId: string, slug: string): Event | undefined {
  return events.find(e => e.chapterId === chapterId && (e.slug === slug || e.id === slug));
}
```

- [ ] **Step 4: Verify build**

Run: `cd /Users/slobo/Documents/coding/shiphaus.org && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 5: Commit**

```bash
git add src/types/index.ts src/lib/data.ts
git commit -m "add friends event type, slugs, and silly hacks 2026 data"
```

---

## Task 2: Redis Serialization

**Files:**
- Modify: `src/lib/redis-data.ts:57-86`

- [ ] **Step 1: Update serializeEvent**

Add `isFriends`, `organizer`, and `slug` to the serializer:

```typescript
function serializeEvent(event: Event): Record<string, string> {
  return {
    id: event.id,
    chapterId: event.chapterId,
    title: event.title,
    slug: event.slug || '',
    date: event.date,
    location: event.location,
    builderCount: String(event.builderCount),
    projectCount: String(event.projectCount),
    status: event.status || 'closed',
    lumaUrl: event.lumaUrl || '',
    imageUrl: event.imageUrl || '',
    isFriends: event.isFriends ? '1' : '0',
    organizer: event.organizer ? JSON.stringify(event.organizer) : '',
  };
}
```

- [ ] **Step 2: Update deserializeEvent**

```typescript
function deserializeEvent(data: Record<string, string>): Event {
  const organizer = data.organizer
    ? (typeof data.organizer === 'string' ? JSON.parse(data.organizer) : data.organizer)
    : undefined;
  return {
    id: data.id,
    chapterId: data.chapterId,
    title: data.title || data.name || '',
    slug: data.slug || undefined,
    date: data.date,
    location: data.location,
    builderCount: parseInt(data.builderCount, 10),
    projectCount: parseInt(data.projectCount, 10),
    status: data.status || undefined,
    lumaUrl: data.lumaUrl || undefined,
    imageUrl: data.imageUrl || undefined,
    isFriends: data.isFriends === '1' || data.isFriends === 1,
    organizer: organizer || undefined,
  } as Event;
}
```

Note: `hostedBy` is still not serialized (known issue in CONTRIBUTING.md). Don't fix it here — separate concern.

- [ ] **Step 3: Verify build**

Run: `cd /Users/slobo/Documents/coding/shiphaus.org && npx tsc --noEmit`
Expected: No type errors

- [ ] **Step 4: Commit**

```bash
git add src/lib/redis-data.ts
git commit -m "serialize friends event fields in redis"
```

---

## Task 3: URL Restructure — New Route Files

**Files:**
- Create: `src/app/[city]/page.tsx`
- Create: `src/app/[city]/layout.tsx`
- Create: `src/app/[city]/[eventSlug]/page.tsx`

The content of these files is the same as the existing chapter/event pages with these changes:
1. Route param: `params.id` → `params.city`
2. Event lookup: `params.eventId` → `params.eventSlug`, use `getEventBySlug()`
3. All internal links: `/chapter/${chapterId}` → `/${chapterId}`
4. All internal links: `/chapter/${chapterId}/event/${eventId}` → `/${chapterId}/${event.slug || event.id}`
5. Sign-in callbacks: same pattern
6. City validation: return `notFound()` if city doesn't match a known chapter

- [ ] **Step 1: Create city layout**

Create `src/app/[city]/layout.tsx` — same as current `src/app/chapter/[id]/layout.tsx` but:
- Param: `params.city` instead of `params.id`
- URLs: `/${id}` instead of `/chapter/${id}`

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { chapters } from '@/lib/data';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const chapter = chapters.find(c => c.id === city);
  if (!chapter) return {};

  return {
    title: `${chapter.city} Chapter`,
    description: `Shiphaus ${chapter.city} -- one-day build events where builders ship real products.`,
    openGraph: {
      title: `${chapter.city} Chapter | Shiphaus`,
      description: `Shiphaus ${chapter.city} -- one-day build events where builders ship real products.`,
      url: `https://shiphaus.org/${city}`,
    },
    alternates: {
      canonical: `https://shiphaus.org/${city}`,
    },
  };
}

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- [ ] **Step 2: Create city page**

Create `src/app/[city]/page.tsx` — copy from `src/app/chapter/[id]/page.tsx` with these search-and-replace changes:

| Find | Replace |
|------|---------|
| `params.id as string` | `params.city as string` |
| `` `/chapter/${chapterId}` `` | `` `/${chapterId}` `` |
| `` `/chapter/${chapterId}/event/${event.id}` `` | `` `/${chapterId}/${event.slug \|\| event.id}` `` |
| `getChapter(chapterId)` | `getChapter(chapterId)` + add `notFound()` guard |

Add at top of `ChapterContent`:
```typescript
import { notFound } from 'next/navigation';
// ... in component body:
if (!chapter) notFound();
```

Also add to imports:
```typescript
import { getEventBySlug } from '@/lib/data';
```

- [ ] **Step 3: Create event page**

Create `src/app/[city]/[eventSlug]/page.tsx` — copy from `src/app/chapter/[id]/event/[eventId]/page.tsx` with:

| Find | Replace |
|------|---------|
| `params.id as string` | `params.city as string` |
| `params.eventId as string` | `params.eventSlug as string` |
| `getEvent(eventId)` | `getEventBySlug(chapterId, eventSlug)` |
| `` `/chapter/${chapterId}` `` | `` `/${chapterId}` `` |

The static event lookup becomes:
```typescript
const eventSlug = params.eventSlug as string;
const staticEvent = getEventBySlug(chapterId, eventSlug);
// Keep eventId for API calls — use the matched event's actual id
const eventId = staticEvent?.id || eventSlug;
```

- [ ] **Step 4: Verify new routes render**

Run dev server, test:
- `http://localhost:3000/new-york` — should show NY chapter page
- `http://localhost:3000/new-york/shiphaus-1` — should show first event
- `http://localhost:3000/new-york/silly-hacks-2026` — should show Silly Hacks
- `http://localhost:3000/chicago` — should show Chicago
- `http://localhost:3000/fakecity` — should 404

- [ ] **Step 5: Commit**

```bash
git add src/app/[city]/
git commit -m "add new flat url routes for cities and events"
```

---

## Task 4: Update All Internal Links

**Files:**
- Modify: `src/components/Navbar.tsx:31,72`
- Modify: `src/components/NavCityLink.tsx` (href prop passed in)
- Modify: `src/components/ChapterCard.tsx:41`
- Modify: `src/app/page.tsx` (hero event links, if any direct chapter links)

- [ ] **Step 1: Update Navbar**

In `src/components/Navbar.tsx`, change all occurrences:
```
/chapter/${chapter.id}  →  /${chapter.id}
```

Lines 31 and 72 (desktop and mobile nav links).

- [ ] **Step 2: Update ChapterCard**

In `src/components/ChapterCard.tsx`, line 41:
```
/chapter/${chapter.id}  →  /${chapter.id}
```

- [ ] **Step 3: Update homepage**

In `src/app/page.tsx`, check for any direct `/chapter/` links. The hero section links to Luma (external), not chapter pages. The ChaptersSection uses `<ChapterCard>` which is already updated. Verify no other `/chapter/` references.

- [ ] **Step 4: Grep for remaining `/chapter/` references**

Run: `grep -rn '"/chapter/' src/`

Fix any remaining references. Expected locations:
- Sign-in callback URLs in city page and event page (already handled in Task 3)
- About page or other pages linking to chapters

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.tsx src/components/ChapterCard.tsx src/app/page.tsx
git commit -m "update all internal links to new flat url structure"
```

---

## Task 5: Redirects for Old URLs

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Add redirect rules**

In `src/middleware.ts`, add redirect handling before the admin check:

```typescript
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Redirect old /chapter/ URLs to new flat structure
  // /chapter/{id}/event/{eventId} → /{id}/{eventId}
  const chapterEventMatch = path.match(/^\/chapter\/([^/]+)\/event\/([^/]+)$/);
  if (chapterEventMatch) {
    const [, chapterId, eventId] = chapterEventMatch;
    return NextResponse.redirect(new URL(`/${chapterId}/${eventId}`, req.url), 301);
  }

  // /chapter/{id} → /{id}
  const chapterMatch = path.match(/^\/chapter\/([^/]+)$/);
  if (chapterMatch) {
    const [, chapterId] = chapterMatch;
    return NextResponse.redirect(new URL(`/${chapterId}`, req.url), 301);
  }

  // Existing admin middleware...
  const isAdminApi = path.startsWith('/api/admin');
  if (!isAdminApi) {
    return NextResponse.next();
  }
  // ... rest unchanged
}
```

- [ ] **Step 2: Update matcher**

```typescript
export const config = {
  matcher: ['/api/admin/:path*', '/chapter/:path*'],
};
```

- [ ] **Step 3: Test redirects**

- `http://localhost:3000/chapter/new-york` → should 301 to `/new-york`
- `http://localhost:3000/chapter/new-york/event/ny-zero-to-one` → should 301 to `/new-york/ny-zero-to-one`

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "add 301 redirects from old /chapter/ urls"
```

---

## Task 6: Delete Old Route Files

**Files:**
- Delete: `src/app/chapter/[id]/page.tsx`
- Delete: `src/app/chapter/[id]/layout.tsx`
- Delete: `src/app/chapter/[id]/event/[eventId]/page.tsx`
- Delete: `src/app/chapter/` directory

- [ ] **Step 1: Verify new routes work completely**

Test all cities and events on new URLs. Verify sign-in flow, project submission, and admin features all work at new paths.

- [ ] **Step 2: Delete old route files**

```bash
rm -rf src/app/chapter/
```

- [ ] **Step 3: Verify no broken imports**

Run: `npx tsc --noEmit`
Run: `grep -rn 'chapter/\[id\]' src/` — should return nothing

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "remove old /chapter/ route files"
```

---

## Task 7: Friends Badge + Visual Treatment

**Files:**
- Modify: `src/app/[city]/page.tsx` (StatusBadge area, event card)
- Modify: `src/app/[city]/[eventSlug]/page.tsx` (event header)
- Modify: `src/app/page.tsx` (hero upcoming events, if Friends events appear)

- [ ] **Step 1: Add Friends badge to city page event cards**

In the event card rendering in the city page, add a "Friends" badge next to the event title when `event.isFriends` is true:

```tsx
<div className="flex items-center gap-3 mb-2">
  <h3 className="text-xl font-bold">{event.title}</h3>
  {event.isFriends && (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
      Friends
    </span>
  )}
  <StatusBadge status={status} />
</div>
```

- [ ] **Step 2: Add organizer line to city page event cards**

Below the event date/location metadata, when `event.organizer` exists:

```tsx
{event.organizer && (
  <p className="mt-2 text-sm text-[var(--text-muted)] font-body">
    Organized by{' '}
    {event.organizer.url ? (
      <a href={event.organizer.url} target="_blank" rel="noopener noreferrer"
         className="text-[var(--accent)] hover:underline font-medium">
        {event.organizer.name}
      </a>
    ) : (
      <span className="font-medium">{event.organizer.name}</span>
    )}
  </p>
)}
```

- [ ] **Step 3: Add Friends badge + organizer to event detail page**

Same pattern in `src/app/[city]/[eventSlug]/page.tsx` event header section. Add Friends badge next to title and organizer line below hostedBy.

- [ ] **Step 4: Update hero upcoming events on homepage**

In `src/app/page.tsx` HeroSection, the upcoming events list should show the Friends badge if applicable. Add after the event title span:

```tsx
{event.isFriends && (
  <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
    Friends
  </span>
)}
```

- [ ] **Step 5: Visual check**

Verify on localhost:
- Silly Hacks shows "Friends" badge + "Organized by Bobby Thakkar" on the NY city page
- Silly Hacks event detail page shows the same
- Regular Shiphaus events do NOT show any Friends badge
- Homepage upcoming events show Friends badge if Silly Hacks is upcoming

- [ ] **Step 6: Commit**

```bash
git add src/app/[city]/ src/app/page.tsx
git commit -m "add friends badge and organizer display for affiliate events"
```

---

## Task 8: Sitemap + Metadata Cleanup

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Update sitemap URLs and add event pages**

```typescript
import { MetadataRoute } from 'next';
import { chapters, events } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shiphaus.org';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/start-a-chapter`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/setup`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/reports/best-one-day-hackathons-2026`, lastModified: new Date('2026-02-22'), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const cityPages: MetadataRoute.Sitemap = chapters.map(chapter => ({
    url: `${baseUrl}/${chapter.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const eventPages: MetadataRoute.Sitemap = events.map(event => ({
    url: `${baseUrl}/${event.chapterId}/${event.slug || event.id}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...eventPages];
}
```

- [ ] **Step 2: Verify sitemap**

Run: `curl http://localhost:3000/sitemap.xml`
Check: URLs use new flat structure, event pages are included.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "update sitemap with flat urls and event pages"
```

---

## Summary of URL Changes

| Before | After |
|--------|-------|
| `/chapter/new-york` | `/new-york` |
| `/chapter/chicago` | `/chicago` |
| `/chapter/malaysia` | `/malaysia` |
| `/chapter/new-york/event/ny-zero-to-one` | `/new-york/shiphaus-1` |
| `/chapter/new-york/event/ny-shiphaus-3-feb-2026` | `/new-york/shiphaus-3` |
| `/chapter/chicago/event/chicago-shiphaus-1-feb-2026` | `/chicago/shiphaus-1` |
| (new) | `/new-york/silly-hacks-2026` |

All old URLs 301 redirect to new ones.

## Luma Instructions for Bobby

After implementation, tell Bobby:
1. Go to the Silly Hacks Luma event → Edit → Hosts → add Shiphaus (your Luma account) as co-host
2. Add to event description: "Submit your project at shiphaus.org/new-york/silly-hacks-2026"
3. After the event, send builders to that URL to submit their projects
