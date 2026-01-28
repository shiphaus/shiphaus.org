# Shiphaus

One-day build events for builders. Start at 10. Ship by 5.

## Stack

- Next.js 15 (App Router)
- Tailwind CSS 4
- Framer Motion
- Deployed on Vercel

## Dev

```bash
npm install
npm run dev
```

Runs on [localhost:3000](http://localhost:3000).

## Structure

- `src/app/page.tsx` -- homepage
- `src/app/chapter/[id]/page.tsx` -- chapter pages
- `src/app/projects/page.tsx` -- all projects
- `src/lib/data.ts` -- all data (hardcoded for now)
- `src/components/` -- shared components
- `public/icons/` -- pixel art icons (generated via Gemini)
