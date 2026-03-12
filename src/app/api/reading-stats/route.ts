import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError, getCached } from '@/lib/api-utils';

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syl = word.match(/[aeiouy]{1,2}/g);
  return syl ? syl.length : 1;
}

function fleschKincaid(text: string): { gradeLevel: number; readingEase: number } {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.replace(/[^a-z\s]/gi, '').split(/\s+/).filter(w => w.length > 0);
  const totalSyllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  const sentCount = Math.max(sentences.length, 1);
  const wordCount = Math.max(words.length, 1);

  const gradeLevel = 0.39 * (wordCount / sentCount) + 11.8 * (totalSyllables / wordCount) - 15.59;
  const readingEase = 206.835 - 1.015 * (wordCount / sentCount) - 84.6 * (totalSyllables / wordCount);

  return {
    gradeLevel: Math.round(gradeLevel * 10) / 10,
    readingEase: Math.round(readingEase * 10) / 10,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookParam = searchParams.get('book');
    const translation = searchParams.get('translation') || 'KJV';

    const db = getDb();

    if (bookParam) {
      const bookId = parseInt(bookParam);
      const cacheKey = `readstats-${bookId}-${translation}`;

      const result = getCached(cacheKey, 60000, () => {
        const chapters = db.prepare(
          'SELECT DISTINCT chapter FROM verses WHERE book = ? AND translation = ? ORDER BY chapter'
        ).all(bookId, translation) as { chapter: number }[];

        return chapters.map(({ chapter }) => {
          const verses = db.prepare(
            'SELECT text FROM verses WHERE book = ? AND chapter = ? AND translation = ?'
          ).all(bookId, chapter, translation) as { text: string }[];

          const fullText = verses.map(v => v.text).join(' ');
          const words = fullText.replace(/[^a-z\s]/gi, '').split(/\s+/).filter(w => w.length > 0);
          const uniqueWords = new Set(words.map(w => w.toLowerCase()));
          const fk = fleschKincaid(fullText);

          return {
            chapter,
            verseCount: verses.length,
            wordCount: words.length,
            uniqueWords: uniqueWords.size,
            avgWordsPerVerse: Math.round(words.length / Math.max(verses.length, 1) * 10) / 10,
            vocabularyDensity: Math.round((uniqueWords.size / Math.max(words.length, 1)) * 1000) / 1000,
            gradeLevel: fk.gradeLevel,
            readingEase: fk.readingEase,
          };
        });
      });

      return NextResponse.json({ book: parseInt(bookParam), translation, chapters: result });
    }

    // Overview: reading stats per book
    const cacheKey = `readstats-all-${translation}`;
    const result = getCached(cacheKey, 120000, () => {
      const books = db.prepare(
        'SELECT DISTINCT book FROM verses WHERE translation = ? ORDER BY book'
      ).all(translation) as { book: number }[];

      return books.map(({ book }) => {
        const verses = db.prepare(
          'SELECT text FROM verses WHERE book = ? AND translation = ?'
        ).all(book, translation) as { text: string }[];

        const fullText = verses.map(v => v.text).join(' ');
        const words = fullText.replace(/[^a-z\s]/gi, '').split(/\s+/).filter(w => w.length > 0);
        const fk = fleschKincaid(fullText);

        return { book, verseCount: verses.length, wordCount: words.length, gradeLevel: fk.gradeLevel, readingEase: fk.readingEase };
      });
    });

    return NextResponse.json({ translation, books: result });
  } catch (error) {
    return handleApiError(error);
  }
}
