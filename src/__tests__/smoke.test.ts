import { describe, it, expect } from 'vitest';
import { chapters, events, getChapter, getEventBySlug } from '../lib/data';

describe('data helpers', () => {
  it('getChapter returns known chapters', () => {
    expect(getChapter('new-york')?.city).toBe('New York');
    expect(getChapter('chicago')?.city).toBe('Chicago');
    expect(getChapter('malaysia')?.city).toBe('Network School');
  });

  it('getChapter returns undefined for unknown cities', () => {
    expect(getChapter('reports')).toBeUndefined();
    expect(getChapter('about')).toBeUndefined();
    expect(getChapter('projects')).toBeUndefined();
    expect(getChapter('login')).toBeUndefined();
  });

  it('every event has a slug', () => {
    for (const event of events) {
      expect(event.slug, `${event.id} missing slug`).toBeTruthy();
    }
  });

  it('slugs are unique within a chapter', () => {
    const seen = new Map<string, Set<string>>();
    for (const event of events) {
      if (!seen.has(event.chapterId)) seen.set(event.chapterId, new Set());
      const chapterSlugs = seen.get(event.chapterId)!;
      expect(chapterSlugs.has(event.slug!), `duplicate slug "${event.slug}" in ${event.chapterId}`).toBe(false);
      chapterSlugs.add(event.slug!);
    }
  });

  it('getEventBySlug finds by slug', () => {
    const event = getEventBySlug('new-york', 'shiphaus-1');
    expect(event?.title).toBe('Shiphaus NY #1');
  });

  it('getEventBySlug finds by id fallback', () => {
    const event = getEventBySlug('new-york', 'ny-zero-to-one');
    expect(event?.title).toBe('Shiphaus NY #1');
  });

  it('getEventBySlug returns undefined for unknown slug', () => {
    expect(getEventBySlug('new-york', 'nonexistent')).toBeUndefined();
  });

  it('getEventBySlug returns undefined for wrong chapter', () => {
    expect(getEventBySlug('chicago', 'silly-hacks-2026')).toBeUndefined();
  });

  it('no chapter id collides with static routes', () => {
    const staticRoutes = ['about', 'projects', 'login', 'setup', 'start-a-chapter', 'reports', 'api'];
    for (const route of staticRoutes) {
      expect(chapters.find(c => c.id === route), `chapter id "${route}" collides with static route`).toBeUndefined();
    }
  });

  it('silly hacks is a friends event', () => {
    const event = getEventBySlug('new-york', 'silly-hacks-2026');
    expect(event?.isFriends).toBe(true);
    expect(event?.organizer?.name).toBe('Bobby Thakkar');
  });
});
