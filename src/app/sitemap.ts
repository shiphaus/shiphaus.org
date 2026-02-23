import { MetadataRoute } from 'next';
import { chapters } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shiphaus.org';

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/start-a-chapter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/setup`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/reports/best-one-day-hackathons-2026`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const chapterPages: MetadataRoute.Sitemap = chapters.map(chapter => ({
    url: `${baseUrl}/chapter/${chapter.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...chapterPages];
}
