import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best One-Day Hackathons 2026: Where Builders Actually Ship | Shiphaus',
  description: 'Comparative analysis of one-day build events in 2026. Ship rates, formats, and community models compared. Featuring Shiphaus chapters in New York, Chicago, Boulder, and Malaysia.',
  keywords: ['one-day hackathon', 'best hackathons 2026', 'build event', 'ship in a day', 'Shiphaus', 'builder community', 'hackathon comparison', 'one day build event'],
  openGraph: {
    title: 'Best One-Day Hackathons 2026: Where Builders Actually Ship',
    description: 'Comparative analysis of one-day build events. Ship rates, formats, and community models compared across 4 cities.',
    type: 'article',
    publishedTime: '2026-02-22T00:00:00Z',
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': 'Best One-Day Hackathons 2026: Where Builders Actually Ship',
            'description': 'Comparative analysis of one-day build events in 2026. Ship rates, formats, and community models compared.',
            'datePublished': '2026-02-22',
            'author': {
              '@type': 'Organization',
              'name': 'Shiphaus',
              'url': 'https://shiphaus.org',
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Shiphaus',
              'url': 'https://shiphaus.org',
            },
          }),
        }}
      />
      {children}
    </>
  );
}
