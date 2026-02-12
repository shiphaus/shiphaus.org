import { config } from 'dotenv';
import { Redis } from '@upstash/redis';

config({ path: '.env.local' });

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Migrate orphaned submissions to project records and re-seed hardcoded projects.
 *
 * The old API merged submission data into project responses on every request,
 * masking the fact that the `shiphaus:projects` SET was empty. This script:
 * 1. Re-seeds the 20 hardcoded NY projects from the seed data
 * 2. Converts any submission records in Redis into proper project records
 */

// ─── Hardcoded seed projects (same as scripts/seed.ts) ───────

const seedProjects = [
  { id: 'proj-kings-game', title: 'Kings Game', description: 'A fast, constraint-based logic puzzle in the same family as Sudoku. Place exactly one King in every row, column, and region within a 8x8 grid.', deployedUrl: 'https://kings-puzzle.vercel.app/', githubUrl: 'https://github.com/gskrovina/kings-puzzle', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Garrett Skrovina', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKWgO70di1Sjskv7bR0UBh1kXRYW7ZXFWgcN9b-RGSBz6KNldHI=s96-c', uid: 'garrett-skrovina' } },
  { id: 'proj-browser-rpc', title: 'Browser RPC', description: 'A local RPC proxy that routes Ethereum transactions through your browser wallet for easier and more secure scripting.', deployedUrl: 'https://www.npmjs.com/package/browser-rpc', githubUrl: 'https://github.com/gskril/browser-rpc', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Greg Skriloff', avatar: 'https://pbs.twimg.com/profile_images/1134494299104731136/NQ0AB5DD_400x400.jpg', uid: 'greg-skriloff' } },
  { id: 'proj-stash-md-1', title: 'Stash MD', description: 'Extend what Claude can do. Install or share Claude skills in seconds.', deployedUrl: 'https://stash.md', githubUrl: 'https://github.com/aslobodnik/stashmd', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Alex Slobodnik', avatar: '/avatars/slobo.jpeg', uid: 'alex-slobodnik' } },
  { id: 'proj-matrix-site', title: 'Matrix Site', description: 'Personal portfolio site with a hand-built matrix animation that creates gravity wells distorting characters when you scroll.', deployedUrl: 'https://www.dereknelson.dev/', githubUrl: 'https://github.com/dereknelson/portfolio/', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Derek Nelson', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLJLLPP8wssdy_4YToPU-_V4odfQ2IAWUKLWdcBmM-t-fRU=s96-c', uid: 'derek-nelson' } },
  { id: 'proj-relate', title: 'Relate', description: "Helps people make sense of relationship conflicts by showing what's really driving them emotionally, so they can move forward with clarity.", deployedUrl: 'https://relateapp.io/', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Chris Carlson', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIX80qDaO2pmOnxNi8zJlzeaxNlNUkdXW7MLt9KAobtxUb5OWf2=s96-c', uid: 'chris-carlson' } },
  { id: 'proj-slingshot', title: 'Slingshot', description: 'A high-signal directory of cracked builders.', deployedUrl: 'https://builders.slingshot.ac/', githubUrl: 'https://github.com/igoryuzo', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Igor Yuzovitskiy', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLw1SkzwZnMSs9IVER_3LkEUNAtpAnaeErDTYvwiZXqXDTI-qNrog=s96-c', uid: 'igor-yuzovitskiy' } },
  { id: 'proj-dillydally', title: 'Dillydally', description: "Your detour guide: for when you don't want the fastest route, you want the funnest, most dynamic, interesting route.", deployedUrl: 'https://dillydally.today', githubUrl: 'https://github.com/leftwayai/dillydally', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Daniel James', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKpkg_1c12b754d8GpH1Uxz6RDEV5_QQTIqjggxLzmKvQhK78iIoQ=s96-c', uid: 'daniel-james' } },
  { id: 'proj-vitalik-reader', title: 'Vitalik Reader', description: "Vitalik's posts for dumb people and more fun social and reading features.", deployedUrl: 'https://vitalikreader.xyz', githubUrl: 'https://github.com/pu5ha/vitalik-reader', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Jason Chaskin', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLGK3Ws_0tGRenGmP-WjTS2cuPRf-XSg6vyDYycN0grchPsl7k=s96-c', uid: 'jason-chaskin' } },
  { id: 'proj-gifto', title: 'Gifto', description: 'The key to thoughtful gift giving. Track who and what to get for friends and family and get reminded when to buy.', deployedUrl: 'https://gifto-plum.vercel.app/', githubUrl: 'https://github.com/dbro20/gifto', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Dylan Brodeur', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIqSddDDj3zpXMWiIHz7It2SXAf3baAv2nWspKsbMo4l2fkFiJ9qA=s96-c', uid: 'dylan-brodeur' } },
  { id: 'proj-prompt-arena', title: 'Prompt Arena', description: 'A weekly contest for creating memes as miniapps. Like Chopped or Yapster, but for viral miniapps.', deployedUrl: 'https://base.app/app/promptarena.xyz', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Dylan Steck', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocJCzP9nEUDQ1xASfXQPeGkY6HgZW5VjJ1Cda_fO6r-41mrYIbaGhQ=s96-c', uid: 'dylan-steck' } },
  { id: 'proj-peeples-donuts', title: 'Peeples Donuts', description: 'Mining pool for the donut ecosystem.', deployedUrl: 'https://peeplesdonuts.shop', githubUrl: 'https://github.com/saltoriousSIG/peeples-web-app', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Saltorious', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocItib6nO88aNB4Vx6Twk3UKR26snRA_8CjwE9sP3T2QKR5HGA=s96-c', uid: 'saltorious' } },
  { id: 'proj-expedition-33', title: 'Expedition 33', description: 'Yearlong Personal OS.', deployedUrl: 'https://expedition-beta.vercel.app/', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Steen', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLbOyQ5BQolZtLkhfRGA5OuxMqLTsRJVTOVgygqMLsA9Xu4bDd8=s96-c', uid: 'steen' } },
  { id: 'proj-x407', title: 'x407 Prototype', description: 'A protocol for internet-native decentralized identity for humans and agents. Works alone or with x402.', deployedUrl: 'https://x407demo.vercel.app/', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Wayne Chang', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocK3863tlvCT_VsDLQnpdr25F0LrKdVRbY3LTYwoSYMHV8AuPfo=s96-c', uid: 'wayne-chang' } },
  { id: 'proj-dino-rest', title: 'Dino.rest', description: 'Competitive productivity.', deployedUrl: 'https://dino.rest/', githubUrl: 'https://github.com/bobbyslife/DinoTamagotchi', createdAt: '2026-01-11', chapterId: 'new-york', eventId: 'ny-zero-to-one', builder: { name: 'Bobby Thakkar', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLouzmoT4wJB02F0qX5Gqiire4JN2-u7ZfqWTbHOivR99qXSvAQ=s96-c', uid: 'bobby-thakkar' } },
  { id: 'proj-stash-md-2', title: 'Stash.md', description: 'Share Claude skills and see what they do.', deployedUrl: 'https://stash.md', githubUrl: 'https://github.com/aslobodnik/stashmd', createdAt: '2026-01-24', chapterId: 'new-york', eventId: 'ny-shiphaus-jan-2026', builder: { name: 'Alex Slobodnik', avatar: '/avatars/slobo.jpeg', uid: 'alex-slobodnik-2' } },
  { id: 'proj-amnesia', title: 'Amnesia', description: 'Notes app that deletes itself every 24 hours.', githubUrl: 'https://github.com/dawsbot/amnesia', createdAt: '2026-01-24', chapterId: 'new-york', eventId: 'ny-shiphaus-jan-2026', builder: { name: 'Dawson Botsford', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=DawsonBotsford&backgroundColor=d1f4d1', uid: 'dawson-botsford' } },
  { id: 'proj-numa', title: 'Numa', description: 'AI Assistants in WhatsApp.', createdAt: '2026-01-24', chapterId: 'new-york', eventId: 'ny-shiphaus-jan-2026', builder: { name: 'Igor Yuzo', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocLw1SkzwZnMSs9IVER_3LkEUNAtpAnaeErDTYvwiZXqXDTI-qNrog=s96-c', uid: 'igor-yuzo' } },
  { id: 'proj-dune-downloader', title: 'Dune Downloader', description: 'Export Query Results from Dune for a small fee instead of expensive plan.', deployedUrl: 'https://dune.gregskril.com/', createdAt: '2026-01-24', chapterId: 'new-york', eventId: 'ny-shiphaus-jan-2026', builder: { name: 'Greg Skriloff', avatar: 'https://pbs.twimg.com/profile_images/1134494299104731136/NQ0AB5DD_400x400.jpg', uid: 'greg-skriloff-2' } },
  { id: 'proj-mochi', title: 'Mochi', description: 'AI assistant in iMessage.', createdAt: '2026-01-24', chapterId: 'new-york', eventId: 'ny-shiphaus-jan-2026', builder: { name: 'Dylan Brodeur', avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIqSddDDj3zpXMWiIHz7It2SXAf3baAv2nWspKsbMo4l2fkFiJ9qA=s96-c', uid: 'dylan-brodeur-2' } },
  { id: 'proj-tumbleops', title: 'TumbleOps', description: 'Servicing SaaS for Laundromats.', githubUrl: 'https://github.com/kirillpolevoy/tumbleops', createdAt: '2026-01-24', chapterId: 'new-york', eventId: 'ny-shiphaus-jan-2026', builder: { name: 'Kirill Polevoy', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=KirillPolovey&backgroundColor=c0aede', uid: 'kirill-polovey' } },
];

async function migrate() {
  console.log('=== Migration: Restore project records ===\n');

  // 1. Re-seed hardcoded projects
  console.log('Step 1: Re-seeding hardcoded projects...');
  let seeded = 0;
  for (let i = 0; i < seedProjects.length; i++) {
    const project = seedProjects[i];
    const isFeatured = i < 6;
    const data: Record<string, string> = {
      id: project.id,
      title: project.title,
      description: project.description,
      deployedUrl: project.deployedUrl || '',
      githubUrl: project.githubUrl || '',
      createdAt: project.createdAt,
      chapterId: project.chapterId,
      eventId: project.eventId || '',
      builder: JSON.stringify(project.builder),
      type: '',
      featured: isFeatured ? '1' : '0',
      submittedBy: '',
    };

    const pipeline = redis.pipeline();
    pipeline.hset(`shiphaus:project:${project.id}`, data);
    pipeline.sadd('shiphaus:projects', project.id);
    pipeline.sadd(`shiphaus:projects:chapter:${project.chapterId}`, project.id);
    if (project.eventId) {
      pipeline.sadd(`shiphaus:projects:event:${project.eventId}`, project.id);
    }
    if (isFeatured) {
      pipeline.sadd('shiphaus:projects:featured', project.id);
    }
    await pipeline.exec();
    seeded++;
    console.log(`  [seed] ${project.title}${isFeatured ? ' (featured)' : ''}`);
  }
  console.log(`  Seeded ${seeded} hardcoded projects.\n`);

  // 2. Find and migrate orphaned submissions
  console.log('Step 2: Migrating orphaned submissions...');

  // Check all submission keys: sorted set + per-event sets + per-user sets
  const pendingIds = await redis.zrange('shiphaus:submissions:pending', 0, -1);
  console.log(`  Found ${pendingIds.length} IDs in submissions:pending sorted set`);

  // Also scan for submission hashes directly
  let cursor = '0';
  const allSubIds = new Set<string>();
  do {
    const [nextCursor, keys] = await redis.scan(cursor as unknown as number, {
      match: 'shiphaus:submission:*',
      count: 100,
    });
    cursor = String(nextCursor);
    for (const key of keys) {
      const id = (key as string).replace('shiphaus:submission:', '');
      allSubIds.add(id);
    }
  } while (cursor !== '0');

  // Also add IDs from the sorted set
  for (const id of pendingIds) {
    allSubIds.add(id as string);
  }

  console.log(`  Found ${allSubIds.size} total submission hashes in Redis`);

  let migrated = 0;
  let skipped = 0;
  for (const subId of allSubIds) {
    const data = await redis.hgetall(`shiphaus:submission:${subId}`) as Record<string, string> | null;
    if (!data || !data.id) {
      skipped++;
      continue;
    }

    // Check if a project already exists for this submission
    const projId = `proj-${subId.replace('sub-', '')}`;
    const existingProject = await redis.exists(`shiphaus:project:${projId}`);
    if (existingProject) {
      // Project exists but might not be in the SETs — ensure it's indexed
      const pipeline = redis.pipeline();
      pipeline.sadd('shiphaus:projects', projId);
      if (data.chapterId) pipeline.sadd(`shiphaus:projects:chapter:${data.chapterId}`, projId);
      if (data.eventId) pipeline.sadd(`shiphaus:projects:event:${data.eventId}`, projId);
      await pipeline.exec();
      console.log(`  [reindex] ${data.title} (project hash exists, ensured SET membership)`);
      migrated++;
      continue;
    }

    // Create project from submission
    const chapterId = data.chapterId || 'new-york';
    const projectData: Record<string, string> = {
      id: projId,
      title: data.title || '',
      description: data.description || '',
      deployedUrl: data.deployedUrl || '',
      githubUrl: data.githubUrl || '',
      createdAt: data.submittedAt || new Date().toISOString(),
      chapterId,
      eventId: data.eventId || '',
      builder: JSON.stringify({
        name: data.builderName || 'Unknown',
        avatar: data.builderAvatar || `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(data.builderName || 'Unknown')}&backgroundColor=c0aede`,
        uid: (data.builderName || 'unknown').toLowerCase().replace(/\s+/g, '-'),
      }),
      type: data.type || '',
      featured: '0',
      submittedBy: data.submittedBy || '',
    };

    const pipeline = redis.pipeline();
    pipeline.hset(`shiphaus:project:${projId}`, projectData);
    pipeline.sadd('shiphaus:projects', projId);
    pipeline.sadd(`shiphaus:projects:chapter:${chapterId}`, projId);
    if (data.eventId) {
      pipeline.sadd(`shiphaus:projects:event:${data.eventId}`, projId);
    }
    await pipeline.exec();
    migrated++;
    console.log(`  [migrate] ${data.title} → ${projId} (chapter: ${chapterId})`);
  }

  console.log(`\n  Migrated/reindexed ${migrated} submissions, skipped ${skipped} empty records.`);

  // 3. Verify
  console.log('\nStep 3: Verification...');
  const totalProjects = await redis.scard('shiphaus:projects');
  const featuredProjects = await redis.scard('shiphaus:projects:featured');
  const nyProjects = await redis.scard('shiphaus:projects:chapter:new-york');
  const myProjects = await redis.scard('shiphaus:projects:chapter:malaysia');
  console.log(`  Total projects: ${totalProjects}`);
  console.log(`  Featured: ${featuredProjects}`);
  console.log(`  New York: ${nyProjects}`);
  console.log(`  Malaysia: ${myProjects}`);

  console.log('\nDone!');
}

migrate().catch(console.error);
