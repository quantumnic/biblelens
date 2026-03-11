import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BibleLens — Analytical Bible Study Tool',
  description: 'Multi-translation comparison, cross-references, Strong\'s concordance, word-level analysis',
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
      </body>
    </html>
  );
}
