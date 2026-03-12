import Sidebar from '@/components/Sidebar';
import { getDb } from '@/lib/db';
import { getBookById, BIBLE_BOOKS } from '@/lib/bible-books';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { book?: string; chapter?: string; verse?: string };
}

function diffWords(texts: string[]): { text: string; isDiff: boolean }[][] {
  if (texts.length < 2) return texts.map(t => [{ text: t, isDiff: false }]);
  
  const wordArrays = texts.map(t => t.split(/\s+/));
  const baseWords = wordArrays[0].map(w => w.toLowerCase().replace(/[^a-z]/g, ''));
  
  return wordArrays.map((words, ti) => {
    if (ti === 0) return words.map(w => ({ text: w + ' ', isDiff: false }));
    return words.map(w => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      const isDiff = !baseWords.includes(clean);
      return { text: w + ' ', isDiff };
    });
  });
}

export default function ComparePage({ searchParams }: Props) {
  const bookId = parseInt(searchParams.book || '43'); // Default: John
  const chapter = parseInt(searchParams.chapter || '3');
  const verse = parseInt(searchParams.verse || '16');
  
  const bookInfo = getBookById(bookId);
  
  const db = getDb();
  const allTranslations = db.prepare(
    'SELECT DISTINCT translation FROM verses ORDER BY translation'
  ).all() as { translation: string }[];
  
  const verses = db.prepare(`
    SELECT translation, text FROM verses
    WHERE book = ? AND chapter = ? AND verse = ?
    ORDER BY translation
  `).all(bookId, chapter, verse) as { translation: string; text: string }[];
  
  const texts = verses.map(v => v.text);
  const diffs = diffWords(texts);
  
  // Navigation helpers
  const maxVerse = (db.prepare(
    'SELECT MAX(verse) as m FROM verses WHERE book = ? AND chapter = ? AND translation = ?'
  ).get(bookId, chapter, 'KJV') as any)?.m || 1;

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
            <Link href="/" className="hover:text-gold-400">Home</Link>
            <span>/</span>
            <span className="text-gold-400">Translation Comparison</span>
          </div>
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-4">
            ⚖️ Compare Translations
          </h1>
        </div>

        {/* Verse Selector */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 mb-6">
          <form className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs text-parchment-500 block mb-1">Book</label>
              <select
                name="book"
                defaultValue={bookId}
                className="bg-parchment-800 text-parchment-200 rounded-lg px-3 py-2 text-sm border border-parchment-700 focus:border-gold-500 focus:outline-none"
              >
                {BIBLE_BOOKS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-parchment-500 block mb-1">Chapter</label>
              <input type="number" name="chapter" defaultValue={chapter} min={1} max={bookInfo?.chapters || 150}
                className="bg-parchment-800 text-parchment-200 rounded-lg px-3 py-2 text-sm border border-parchment-700 w-20 focus:border-gold-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-parchment-500 block mb-1">Verse</label>
              <input type="number" name="verse" defaultValue={verse} min={1}
                className="bg-parchment-800 text-parchment-200 rounded-lg px-3 py-2 text-sm border border-parchment-700 w-20 focus:border-gold-500 focus:outline-none" />
            </div>
            <button type="submit" className="px-4 py-2 bg-gold-600 text-parchment-950 rounded-lg font-semibold hover:bg-gold-500 transition-colors text-sm">
              Compare
            </button>
          </form>
        </div>

        {/* Reference */}
        <h2 className="text-xl font-serif text-gold-400 mb-4">
          {bookInfo?.name} {chapter}:{verse}
        </h2>

        {/* Comparison Grid */}
        <div className="space-y-4">
          {verses.map((v, i) => (
            <div key={v.translation} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-gold-600 text-parchment-950">
                  {v.translation}
                </span>
              </div>
              <p className="bible-text text-parchment-100 text-lg leading-relaxed">
                {diffs[i]?.map((part, j) => (
                  <span key={j} className={part.isDiff ? 'diff-highlight' : ''}>
                    {part.text}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        {/* Nav */}
        <div className="flex justify-between mt-6">
          {verse > 1 && (
            <Link href={`/compare?book=${bookId}&chapter=${chapter}&verse=${verse - 1}`} className="text-sm text-gold-400 hover:text-gold-300">
              ← Verse {verse - 1}
            </Link>
          )}
          <div />
          {verse < maxVerse && (
            <Link href={`/compare?book=${bookId}&chapter=${chapter}&verse=${verse + 1}`} className="text-sm text-gold-400 hover:text-gold-300">
              Verse {verse + 1} →
            </Link>
          )}
        </div>
      </main>
    </>
  );
}
