import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Setup Guide',
  description: 'Get set up with Claude Code before your Shiphaus build event. Step-by-step installation guide for Mac and Windows.',
  openGraph: {
    title: 'Setup Guide | Shiphaus',
    description: 'Get set up with Claude Code before your Shiphaus build event.',
    url: 'https://shiphaus.org/setup',
  },
  alternates: {
    canonical: 'https://shiphaus.org/setup',
  },
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
