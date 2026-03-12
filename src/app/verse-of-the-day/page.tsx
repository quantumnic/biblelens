import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb, isDatabaseAvailable } from '@/lib/db';
import { getBookById } from '@/lib/bible-books';

export const dynamic = 'force-dynamic';

// Same curated list as the API
const NOTABLE_VERSES: [number, number, number][] = [
  [1,1,1],[19,23,1],[19,23,4],[19,46,1],[19,46,10],[19,91,1],[19,91,2],
  [19,119,105],[19,27,1],[19,37,4],[19,37,5],[19,34,8],[19,100,4],
  [20,3,5],[20,3,6],[20,4,23],[20,22,6],[20,16,3],[20,16,9],
  [23,40,31],[23,41,10],[23,43,2],[23,53,5],[23,55,8],[23,55,9],
  [24,29,11],[24,29,13],[24,33,3],
  [40,5,3],[40,5,14],[40,5,16],[40,6,33],[40,7,7],[40,11,28],[40,28,19],[40,28,20],
  [41,10,27],[41,11,24],
  [42,6,31],[42,11,9],[42,12,7],
  [43,1,1],[43,3,16],[43,8,32],[43,10,10],[43,11,25],[43,13,34],[43,14,6],[43,14,27],[43,15,13],[43,16,33],
  [44,1,8],[44,2,38],
  [45,3,23],[45,5,8],[45,6,23],[45,8,1],[45,8,28],[45,8,31],[45,8,38],[45,10,9],[45,12,2],[45,12,12],[45,15,13],
  [46,10,13],[46,13,4],[46,13,13],[46,15,58],[46,16,13],
  [47,4,18],[47,5,17],[47,12,9],
  [48,2,20],[48,5,22],[48,6,9],
  [49,2,8],[49,2,10],[49,3,20],[49,4,32],[49,6,10],
  [50,1,6],[50,2,3],[50,4,6],[50,4,8],[50,4,13],
  [51,3,23],[51,3,12],
  [52,5,16],[52,5,17],[52,5,18],
  [55,1,7],[55,3,16],
  [58,4,12],[58,4,16],[58,11,1],[58,11,6],[58,12,1],[58,12,2],[58,13,5],[58,13,8],
  [59,1,2],[59,1,5],[59,4,8],
  [60,5,7],[60,3,15],
  [62,1,9],[62,3,16],[62,4,7],[62,4,8],[62,4,19],
  [66,3,20],[66,21,4],
];

export default function VerseOfTheDayPage() {
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const idx = dayOfYear % NOTABLE_VERSES.length;
  const [book, chapter, verse] = NOTABLE_VERSES[idx];

  const db = getDb();
  const bookInfo = getBookById(book);
  const slug = bookInfo?.name.toLowerCase().replace(/ /g, '-') || '';

  const translations = ['KJV', 'ASV', 'WEB', 'VUL'];
  const texts: { translation: string; text: string }[] = [];
  for (const t of translations) {
    const row = db.prepare(
      'SELECT text FROM verses WHERE book = ? AND chapter = ? AND verse = ? AND translation = ?'
    ).get(book, chapter, verse, t) as { text: string } | undefined;
    if (row) texts.push({ translation: t, text: row.text });
  }

  // Get cross-references count
  const xrefCount = (db.prepare(`
    SELECT COUNT(*) as c FROM cross_references
    WHERE (from_book = ? AND from_chapter = ? AND from_verse_start <= ? AND from_verse_end >= ?)
       OR (to_book = ? AND to_chapter = ? AND to_verse_start <= ? AND to_verse_end >= ?)
  `).get(book, chapter, verse, verse, book, chapter, verse, verse) as any)?.c || 0;

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-4xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-6">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Verse of the Day</span>
        </div>

        <div className="text-center mb-8">
          <p className="text-sm text-parchment-500 mb-2">{dateStr}</p>
          <h1 className="text-4xl font-bold font-serif text-gold-400 mb-2">✨ Verse of the Day</h1>
        </div>

        {/* Main verse card */}
        <div className="bg-parchment-900 border border-gold-500/30 rounded-2xl p-8 mb-8 text-center shadow-lg shadow-gold-600/5">
          <Link href={`/reader/${slug}/${chapter}#v${verse}`} className="hover:opacity-90 transition-opacity">
            <h2 className="text-xl font-semibold text-gold-400 mb-4 font-serif">
              {bookInfo?.name} {chapter}:{verse}
            </h2>
            <blockquote className="text-2xl text-parchment-100 font-serif leading-relaxed italic max-w-2xl mx-auto">
              &ldquo;{texts[0]?.text}&rdquo;
            </blockquote>
            <p className="text-xs text-parchment-500 mt-4">— {texts[0]?.translation}</p>
          </Link>
        </div>

        {/* Other translations */}
        <div className="space-y-3 mb-8">
          <h3 className="text-sm font-semibold text-parchment-400 uppercase tracking-wider">Other Translations</h3>
          {texts.slice(1).map(t => (
            <div key={t.translation} className="bg-parchment-900 border border-parchment-800 rounded-xl p-4">
              <span className="text-xs font-mono font-bold text-gold-400 mr-2">{t.translation}</span>
              <p className="text-sm text-parchment-300 font-serif mt-1 leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href={`/reader/${slug}/${chapter}#v${verse}`}
            className="p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 text-center transition-all">
            <span className="text-lg">📖</span>
            <p className="text-xs text-parchment-400 mt-1">Read in Context</p>
          </Link>
          <Link href={`/compare?book=${book}&chapter=${chapter}&verse=${verse}`}
            className="p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 text-center transition-all">
            <span className="text-lg">⚖️</span>
            <p className="text-xs text-parchment-400 mt-1">Compare All</p>
          </Link>
          <Link href={`/reader/${slug}/${chapter}#v${verse}`}
            className="p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 text-center transition-all">
            <span className="text-lg">🔗</span>
            <p className="text-xs text-parchment-400 mt-1">{xrefCount} Cross-Refs</p>
          </Link>
          <Link href={`/analytics?book=${book}`}
            className="p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 text-center transition-all">
            <span className="text-lg">📊</span>
            <p className="text-xs text-parchment-400 mt-1">Book Analytics</p>
          </Link>
        </div>
      </main>
    </>
  );
}
