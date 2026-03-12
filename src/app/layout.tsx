import type { Metadata } from 'next';
import { Instrument_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const viewport = {
  viewportFit: 'cover' as const,
  themeColor: '#FAFAF8',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://shiphaus.org'),
  title: {
    default: 'Shiphaus | Build in a Day',
    template: '%s | Shiphaus',
  },
  description: 'A global community of builders who come together to ship products in a single day. Join chapters in New York, Chicago, and Malaysia.',
  keywords: ['hackathon', 'builder', 'ship', 'startup', 'community', 'coding', 'one-day hackathon', 'build event'],
  openGraph: {
    title: 'Shiphaus | Build in a Day',
    description: 'A global community of builders who come together to ship products in a single day.',
    url: 'https://shiphaus.org',
    siteName: 'Shiphaus',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Shiphaus - Build in a Day' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shiphaus | Build in a Day',
    description: 'A global community of builders who come together to ship products in a single day.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://shiphaus.org',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${newsreader.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Shiphaus',
              url: 'https://shiphaus.org',
              logo: 'https://shiphaus.org/shiphaus_logo_new.png',
              description: 'A global community of builders who come together to ship products in a single day.',
              sameAs: [
                'https://x.com/gofordylan',
                'https://x.com/AlexSlobodnik',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 flex flex-col pt-[calc(4rem+env(safe-area-inset-top))]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
