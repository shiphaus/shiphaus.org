/**
 * One-time migration: enrich Redis events with static metadata (slugs, hostedBy, etc.)
 * and seed any static-only events (Silly Hacks) into Redis.
 *
 * Safe to run multiple times — it's idempotent.
 *
 * Usage: node scripts/migrate-redis-events.js [--dry-run]
 */

const { Redis } = require('@upstash/redis');
require('dotenv').config({ path: '.env.local' });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Static event data — source of truth for metadata
const STATIC_EVENTS = [
  {
    id: 'ny-zero-to-one',
    chapterId: 'new-york',
    slug: 'shiphaus-1',
    title: 'Shiphaus NY #1',
    date: '2026-01-11T10:00:00',
    location: 'New York',
    builderCount: 14,
    projectCount: 14,
    organizer: { name: 'Dylan', url: 'https://dylanbrodeur.org' },
  },
  {
    id: 'ny-shiphaus-jan-2026',
    chapterId: 'new-york',
    slug: 'shiphaus-2',
    title: 'Shiphaus NY #2',
    date: '2026-01-24T10:00:00',
    location: 'Upstate New York',
    builderCount: 6,
    projectCount: 6,
    organizer: { name: 'Slobo', url: 'https://justslobo.com' },
  },
  {
    id: 'ns-shiphaus-feb-2026',
    chapterId: 'malaysia',
    slug: 'shiphaus-1',
    title: 'Shiphaus NS #1',
    date: '2026-02-13T10:00:00',
    location: 'NS Library',
    builderCount: 3,
    projectCount: 3,
    lumaUrl: 'https://lu.ma/1vaocqic',
    organizer: { name: 'Dylan', url: 'https://dylanbrodeur.org' },
  },
  {
    id: 'ny-shiphaus-3-feb-2026',
    chapterId: 'new-york',
    slug: 'shiphaus-3',
    title: 'Shiphaus #3',
    date: '2026-02-22T15:00:00',
    location: 'Brooklyn, NY',
    builderCount: 13,
    projectCount: 13,
    status: 'closed',
    lumaUrl: 'https://luma.com/7m6wvfq3',
    hostedBy: { name: 'Asylum.vc', url: 'https://www.asylum.vc/', tagline: 'artists, not assets' },
    organizer: { name: 'Slobo', url: 'https://justslobo.com' },
  },
  {
    id: 'chicago-shiphaus-1-feb-2026',
    chapterId: 'chicago',
    slug: 'shiphaus-1',
    title: 'Shiphaus CHI #1',
    date: '2026-02-28T10:00:00',
    location: 'Chicago, IL',
    builderCount: 8,
    projectCount: 8,
    status: 'closed',
    lumaUrl: 'https://luma.com/7ycej8br',
    hostedBy: { name: 'Portal Innovations', url: 'https://www.portalinnovations.com/' },
    organizer: { name: 'Kirill Polevoy', url: 'https://x.com/polevoy_kirill' },
  },
  {
    id: 'chicago-shiphaus-2-apr-2026',
    chapterId: 'chicago',
    slug: 'shiphaus-2',
    title: 'Shiphaus CHI #2',
    date: '2026-04-04T10:30:00',
    location: 'Chicago, IL',
    lumaUrl: 'https://luma.com/m8qkn2w3',
    hostedBy: { name: 'Wildman BT', url: 'https://www.wildmanbt.com/' },
    organizer: { name: 'Kirill Polevoy', url: 'https://x.com/polevoy_kirill' },
  },
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
    organizer: { name: 'Bobby Thakkar', url: 'https://dino.rest' },
  },
];

const DAY = 86400000;

async function migrate(dryRun) {
  const allRedisIds = await redis.smembers('shiphaus:events');
  const redisEvents = [];
  for (const id of allRedisIds) {
    const data = await redis.hgetall('shiphaus:event:' + id);
    redisEvents.push({ ...data, id });
  }

  console.log(`Found ${redisEvents.length} Redis events, ${STATIC_EVENTS.length} static events\n`);

  // Step 1: Enrich existing Redis events with static metadata
  for (const re of redisEvents) {
    const se = STATIC_EVENTS.find(s =>
      s.chapterId === re.chapterId &&
      Math.abs(new Date(s.date).getTime() - new Date(re.date).getTime()) < 2 * DAY
    );

    if (!se) {
      console.log(`SKIP  ${re.id} (${re.title}) — no static match`);
      continue;
    }

    const updates = {};
    if (se.slug && re.slug !== se.slug) updates.slug = se.slug;
    if (se.hostedBy && !re.hostedBy) updates.hostedBy = JSON.stringify(se.hostedBy);
    if (se.isFriends && re.isFriends !== '1' && re.isFriends !== 1 && re.isFriends !== true) updates.isFriends = '1';
    if (se.organizer && !re.organizer) updates.organizer = JSON.stringify(se.organizer);

    if (Object.keys(updates).length === 0) {
      console.log(`OK    ${re.id} (${re.title}) — already up to date`);
      continue;
    }

    console.log(`PATCH ${re.id} (${re.title}) ← ${Object.keys(updates).join(', ')}`);
    if (!dryRun) {
      await redis.hset('shiphaus:event:' + re.id, updates);
    }
  }

  // Step 2: Seed static-only events (no Redis counterpart)
  for (const se of STATIC_EVENTS) {
    const hasRedis = redisEvents.some(re =>
      re.chapterId === se.chapterId &&
      Math.abs(new Date(se.date).getTime() - new Date(re.date).getTime()) < 2 * DAY
    );

    if (hasRedis) continue;

    const data = {
      id: se.id,
      chapterId: se.chapterId,
      title: se.title,
      slug: se.slug || '',
      date: se.date,
      location: se.location,
      builderCount: String(se.builderCount ?? 0),
      projectCount: String(se.projectCount ?? 0),
      status: se.status || 'closed',
      lumaUrl: se.lumaUrl || '',
      imageUrl: '',
      isFriends: se.isFriends ? '1' : '0',
      organizer: se.organizer ? JSON.stringify(se.organizer) : '',
      hostedBy: se.hostedBy ? JSON.stringify(se.hostedBy) : '',
    };

    console.log(`SEED  ${se.id} (${se.title})`);
    if (!dryRun) {
      const pipeline = redis.pipeline();
      pipeline.hset('shiphaus:event:' + se.id, data);
      pipeline.sadd('shiphaus:events', se.id);
      pipeline.sadd('shiphaus:events:chapter:' + se.chapterId, se.id);
      await pipeline.exec();
    }
  }

  // Step 3: Verify
  if (!dryRun) {
    console.log('\n=== VERIFICATION ===');
    const finalIds = await redis.smembers('shiphaus:events');
    for (const id of finalIds) {
      const e = await redis.hgetall('shiphaus:event:' + id);
      const projCount = await redis.scard('shiphaus:projects:event:' + id);
      console.log(`${id} | ${e.title} | slug:${e.slug || '(none)'} | ${projCount} projects | hostedBy:${e.hostedBy ? 'yes' : 'no'}`);
    }
  }

  console.log(`\n${dryRun ? 'DRY RUN — no changes made' : 'DONE'}`);
}

const dryRun = process.argv.includes('--dry-run');
migrate(dryRun).catch(e => { console.error(e); process.exit(1); });
