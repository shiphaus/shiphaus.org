import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start a Chapter',
  description: 'Run Shiphaus in your city. Lead a one-day build event where builders ship real products together.',
  openGraph: {
    title: 'Start a Chapter | Shiphaus',
    description: 'Run Shiphaus in your city. Lead a one-day build event where builders ship real products.',
    url: 'https://shiphaus.org/start-a-chapter',
  },
  alternates: {
    canonical: 'https://shiphaus.org/start-a-chapter',
  },
};

export default function StartAChapterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
