import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { chapters } from '@/lib/data';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const chapter = chapters.find(c => c.id === city);
  if (!chapter) notFound();

  return {
    title: `${chapter.city} Chapter`,
    description: `Shiphaus ${chapter.city} -- one-day build events where builders ship real products.`,
    openGraph: {
      title: `${chapter.city} Chapter | Shiphaus`,
      description: `Shiphaus ${chapter.city} -- one-day build events where builders ship real products.`,
      url: `https://shiphaus.org/${city}`,
    },
    alternates: {
      canonical: `https://shiphaus.org/${city}`,
    },
  };
}

export default function CityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
