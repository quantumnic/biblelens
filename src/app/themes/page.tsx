import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import ThemeExplorer from '@/components/ThemeExplorer';

export const dynamic = 'force-dynamic';

export default function ThemesPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <Link href="/" className="text-gold-400 hover:text-gold-300 text-sm">&larr; Home</Link>
        </div>
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🎨 Theological Themes</h1>
        <p className="text-parchment-400 mb-8 max-w-2xl">
          Explore the major theological themes of Scripture organized by category. Each theme includes its Hebrew and Greek vocabulary, key verses, and a brief overview — a gateway into deeper word study.
        </p>
        <ThemeExplorer />
      </main>
    </>
  );
}
