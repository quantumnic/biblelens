import { notFound } from 'next/navigation';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import VerseDisplay from '@/components/VerseDisplay';
import KeyboardNav from '@/components/KeyboardNav';
import ChapterTools from '@/components/ChapterTools';
import { getBookBySlug, getBookById, BIBLE_BOOKS } from '@/lib/bible-books';
import { getDb } from '@/lib/db';

import type { Metadata } from 'next';

interface Props {
  params: { book: string; chapter: string };
  searchParams: { translations?: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const bookInfo = getBookBySlug(params.book);
  const title = bookInfo ? `${bookInfo.name} ${params.chapter} — BibleLens` : 'BibleLens';
  return {
    title,
    description: bookInfo ? `Read ${bookInfo.name} chapter ${params.chapter} with multi-translation comparison, Strong's concordance, and cross-references.` : undefined,
  };
}

export default function ReaderPage({ params, searchParams }: Props) {
  const bookInfo = getBookBySlug(params.book);
  if (!bookInfo) notFound();
  
  const chapter = parseInt(params.chapter);
  if (isNaN(chapter) || chapter < 1 || chapter > bookInfo.chapters) notFound();

  const selectedTranslations = searchParams.translations?.split(',') || ['KJV', 'ASV'];
  
  const db = getDb();
  
  // Get verses for all selected translations
  const verses = db.prepare(`
    SELECT book, chapter, verse, text, translation 
    FROM verses 
    WHERE book = ? AND chapter = ? AND translation IN (${selectedTranslations.map(() => '?').join(',')})
    ORDER BY verse, translation
  `).all(bookInfo.id, chapter, ...selectedTranslations) as any[];

  // Get Strong's words for this chapter
  const strongsWords: Record<string, any[]> = {};
  const words = db.prepare(`
    SELECT ws.book, ws.chapter, ws.verse, ws.word, ws.strongs_id, ws.position, 
           s.original, s.transliteration, s.definition, s.language
    FROM word_strongs ws
    JOIN strongs s ON s.id = ws.strongs_id
    WHERE ws.book = ? AND ws.chapter = ?
    ORDER BY ws.verse, ws.position
  `).all(bookInfo.id, chapter) as any[];
  
  for (const w of words) {
    const key = `${w.book}-${w.chapter}-${w.verse}`;
    if (!strongsWords[key]) strongsWords[key] = [];
    strongsWords[key].push(w);
  }

  // Load Latin word provenance for VUL hover
  const latinWords: Record<string, any[]> = {};
  if (selectedTranslations.includes('VUL')) {
    const allLatinProv = db.prepare(
      `SELECT * FROM word_provenance WHERE language = 'latin'`
    ).all() as any[];

    for (const prov of allLatinProv) {
      const lemma = prov.lemma.toLowerCase();
      // Build chain for each word
      const chain: any[] = [prov];
      let current = prov;
      while (current?.parent_word_id) {
        const parent = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(current.parent_word_id) as any;
        if (parent) { chain.push(parent); current = parent; } else break;
      }
      latinWords[lemma] = [{ ...prov, chain }];
      // Also index by word (may differ from lemma)
      const word = prov.word.toLowerCase();
      if (word !== lemma && !latinWords[word]) {
        latinWords[word] = [{ ...prov, chain }];
      }
    }
  }

  // Available translations
  const allTranslations = db.prepare(
    'SELECT DISTINCT translation FROM verses ORDER BY translation'
  ).all() as { translation: string }[];

  // Reading time estimate (avg 200 wpm for careful reading)
  const kjvVerses = verses.filter((v: any) => v.translation === selectedTranslations[0]);
  const totalWords = kjvVerses.reduce((sum: number, v: any) => sum + v.text.split(/\s+/).length, 0);
  const readingTimeMin = Math.max(1, Math.round(totalWords / 200));

  // Prev/Next chapter
  const prevChapter = chapter > 1 ? chapter - 1 : null;
  const nextChapter = chapter < bookInfo.chapters ? chapter + 1 : null;
  
  // Prev/Next book
  const bookIdx = BIBLE_BOOKS.findIndex(b => b.id === bookInfo.id);
  const prevBook = bookIdx > 0 ? BIBLE_BOOKS[bookIdx - 1] : null;
  const nextBook = bookIdx < BIBLE_BOOKS.length - 1 ? BIBLE_BOOKS[bookIdx + 1] : null;

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
            <Link href="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-parchment-400">{bookInfo.testament}</span>
            <span>/</span>
            <span className="text-gold-400">{bookInfo.name}</span>
          </div>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold font-serif text-parchment-100">
                {bookInfo.name} <span className="text-gold-400">{chapter}</span>
              </h1>
              <div className="flex items-center gap-3 mt-1 text-xs text-parchment-500">
                <span>📖 {kjvVerses.length} verses</span>
                <span>•</span>
                <span>⏱️ ~{readingTimeMin} min read</span>
                <span>•</span>
                <span>📝 {totalWords.toLocaleString()} words</span>
              </div>
            </div>
            
            {/* Translation selector */}
            <div className="flex flex-wrap gap-2">
              {allTranslations.map(t => {
                const isActive = selectedTranslations.includes(t.translation);
                const newTranslations = isActive
                  ? selectedTranslations.filter(x => x !== t.translation)
                  : [...selectedTranslations, t.translation];
                
                return (
                  <Link
                    key={t.translation}
                    href={`/reader/${params.book}/${chapter}?translations=${newTranslations.join(',')}`}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      isActive 
                        ? 'bg-gold-600 text-parchment-950 border-gold-600 font-semibold' 
                        : 'bg-parchment-900 text-parchment-400 border-parchment-700 hover:border-gold-500'
                    }`}
                  >
                    {t.translation}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Verses */}
        <VerseDisplay
          verses={verses}
          translations={selectedTranslations}
          strongsWords={strongsWords}
          latinWords={latinWords}
        />

        {/* Chapter Tools */}
        <ChapterTools book={bookInfo.id} chapter={chapter} />

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-parchment-800">
          <div>
            {prevChapter ? (
              <Link href={`/reader/${params.book}/${prevChapter}?translations=${selectedTranslations.join(',')}`} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
                ← Chapter {prevChapter}
              </Link>
            ) : prevBook ? (
              <Link href={`/reader/${prevBook.name.toLowerCase().replace(/ /g, '-')}/${prevBook.chapters}`} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
                ← {prevBook.name} {prevBook.chapters}
              </Link>
            ) : null}
          </div>
          
          {/* Chapter selector */}
          <div className="flex flex-wrap gap-1 justify-center max-w-md">
            {Array.from({ length: bookInfo.chapters }, (_, i) => i + 1).map(ch => (
              <Link
                key={ch}
                href={`/reader/${params.book}/${ch}?translations=${selectedTranslations.join(',')}`}
                className={`w-8 h-8 flex items-center justify-center text-xs rounded transition-colors ${
                  ch === chapter
                    ? 'bg-gold-600 text-parchment-950 font-bold'
                    : 'bg-parchment-900 text-parchment-400 hover:bg-parchment-800'
                }`}
              >
                {ch}
              </Link>
            ))}
          </div>

          <div>
            {nextChapter ? (
              <Link href={`/reader/${params.book}/${nextChapter}?translations=${selectedTranslations.join(',')}`} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
                Chapter {nextChapter} →
              </Link>
            ) : nextBook ? (
              <Link href={`/reader/${nextBook.name.toLowerCase().replace(/ /g, '-')}/1`} className="text-sm text-gold-400 hover:text-gold-300 transition-colors">
                {nextBook.name} 1 →
              </Link>
            ) : null}
          </div>
        </div>

        <KeyboardNav
          bookSlug={params.book}
          chapter={chapter}
          maxChapter={bookInfo.chapters}
          prevBookSlug={prevBook ? prevBook.name.toLowerCase().replace(/ /g, '-') : undefined}
          prevBookMaxChapter={prevBook?.chapters}
          nextBookSlug={nextBook ? nextBook.name.toLowerCase().replace(/ /g, '-') : undefined}
        />
      </main>
    </>
  );
}
