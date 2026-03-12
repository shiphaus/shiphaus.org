import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Every product built at Shiphaus events. Live apps shipped in a single day by builders in New York, Chicago, and Malaysia.',
  openGraph: {
    title: 'Projects | Shiphaus',
    description: 'Every product built at Shiphaus events. Live apps shipped in a single day.',
    url: 'https://shiphaus.org/projects',
  },
  alternates: {
    canonical: 'https://shiphaus.org/projects',
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
