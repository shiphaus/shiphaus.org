import { MetadataRoute } from 'next';
import { chapters } from '@/lib/data';

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

  const chapterPages: MetadataRoute.Sitemap = chapters.map(chapter => ({
    url: `${baseUrl}/chapter/${chapter.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...chapterPages];
}
