import { Metadata } from 'next';
import { chapters } from '@/lib/data';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const chapter = chapters.find(c => c.id === id);
  const city = chapter?.city || id;

  return {
    title: `${city} Chapter`,
    description: `Shiphaus ${city} -- one-day build events where builders ship real products. See past events, projects, and upcoming dates.`,
    openGraph: {
      title: `${city} Chapter | Shiphaus`,
      description: `Shiphaus ${city} -- one-day build events where builders ship real products.`,
      url: `https://shiphaus.org/chapter/${id}`,
    },
    alternates: {
      canonical: `https://shiphaus.org/chapter/${id}`,
    },
  };
}

export default function ChapterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
