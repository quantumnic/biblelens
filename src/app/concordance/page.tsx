import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb, isDatabaseAvailable } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default function ConcordancePage() {
  if (!isDatabaseAvailable()) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 max-w-5xl">
          <p className="text-parchment-400">Database not available. Run <code>npm run seed</code>.</p>
        </main>
      </>
    );
  }

  const db = getDb();
  const hebrewEntries = db.prepare(
    "SELECT id, original, transliteration, definition FROM strongs WHERE language = 'hebrew' ORDER BY id"
  ).all() as { id: string; original: string; transliteration: string; definition: string }[];

  const greekEntries = db.prepare(
    "SELECT id, original, transliteration, definition FROM strongs WHERE language = 'greek' ORDER BY id"
  ).all() as { id: string; original: string; transliteration: string; definition: string }[];

  // Get usage counts
  const usageCounts: Record<string, number> = {};
  const counts = db.prepare(
    'SELECT strongs_id, COUNT(*) as c FROM word_strongs GROUP BY strongs_id'
  ).all() as { strongs_id: string; c: number }[];
  for (const row of counts) {
    usageCounts[row.strongs_id] = row.c;
  }

  const renderEntry = (entry: { id: string; original: string; transliteration: string; definition: string }) => (
    <Link
      key={entry.id}
      href={`/word/${entry.id}`}
      className="block p-3 rounded-lg bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-gold-500">{entry.id}</span>
            <span className="text-lg font-serif text-parchment-100">{entry.original}</span>
          </div>
          <p className="text-sm text-parchment-300 italic">{entry.transliteration}</p>
          <p className="text-xs text-parchment-400 mt-1 line-clamp-2">{entry.definition}</p>
        </div>
        {usageCounts[entry.id] && (
          <span className="text-xs text-parchment-500 bg-parchment-800 px-2 py-0.5 rounded-full flex-shrink-0">
            {usageCounts[entry.id]} ×
          </span>
        )}
      </div>
    </Link>
  );

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">
            📖 Strong&apos;s Concordance Browser
          </h1>
          <p className="text-parchment-400 text-sm">
            Browse all {hebrewEntries.length + greekEntries.length} Strong&apos;s entries. Click any entry to view word study details.
          </p>
        </div>

        {/* Hebrew Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gold-400 mb-4 font-serif flex items-center gap-2">
            🕎 Hebrew ({hebrewEntries.length} entries)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {hebrewEntries.map(renderEntry)}
          </div>
        </section>

        {/* Greek Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gold-400 mb-4 font-serif flex items-center gap-2">
            ✝️ Greek ({greekEntries.length} entries)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {greekEntries.map(renderEntry)}
          </div>
        </section>
      </main>
    </>
  );
}
