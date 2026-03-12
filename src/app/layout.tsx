import type { Metadata, Viewport } from 'next';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';

export const metadata: Metadata = {
  title: 'BibleLens — Analytical Bible Study Tool',
  description: 'Multi-translation comparison, cross-references, Strong\'s concordance, word-level etymology, manuscript evidence, and scholarly research tools for deep Bible study.',
  keywords: ['Bible', 'study', 'Strong\'s concordance', 'cross-references', 'KJV', 'ASV', 'Vulgate', 'Hebrew', 'Greek', 'Latin'],
  openGraph: {
    title: 'BibleLens — Analytical Bible Study Tool',
    description: 'Deep Bible study with multi-translation comparison, word analysis, and scholarly research.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a1208',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-parchment-950">
        <div className="flex min-h-screen">
          {children}
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
