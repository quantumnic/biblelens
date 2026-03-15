import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

const WORDS_PER_MINUTE = 200;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const book = searchParams.get('book');
    const chapter = searchParams.get('chapter');
    const translation = searchParams.get('translation') || 'KJV';
    const db = getDb();

    if (book && chapter) {
      // Single chapter reading time
      const verses = db.prepare(
        'SELECT text FROM verses WHERE book = ? AND chapter = ? AND translation = ?'
      ).all(parseInt(book), parseInt(chapter), translation) as { text: string }[];

      const totalWords = verses.reduce((sum, v) => sum + v.text.split(/\s+/).length, 0);
      const minutes = Math.ceil(totalWords / WORDS_PER_MINUTE);
      const uniqueWords = new Set(verses.flatMap(v => v.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)));

      return NextResponse.json({
        book: parseInt(book),
        chapter: parseInt(chapter),
        verses: verses.length,
        totalWords,
        uniqueWords: uniqueWords.size,
        readingTimeMinutes: minutes,
        wordsPerVerse: Math.round(totalWords / Math.max(verses.length, 1)),
      });
    }

    // All books reading time overview
    const stats = db.prepare(`
      SELECT book, COUNT(*) as verse_count, GROUP_CONCAT(text, ' ') as all_text
      FROM verses WHERE translation = ?
      GROUP BY book ORDER BY book
    `).all(translation) as { book: number; verse_count: number; all_text: string }[];

    const bookStats = stats.map(s => {
      const words = s.all_text.split(/\s+/).length;
      const minutes = Math.ceil(words / WORDS_PER_MINUTE);
      return {
        book: s.book,
        verses: s.verse_count,
        totalWords: words,
        readingTimeMinutes: minutes,
        readingTimeFormatted: minutes >= 60
          ? `${Math.floor(minutes / 60)}h ${minutes % 60}m`
          : `${minutes}m`,
      };
    });

    const totalMinutes = bookStats.reduce((sum, b) => sum + b.readingTimeMinutes, 0);

    return NextResponse.json({
      books: bookStats,
      totalReadingTimeMinutes: totalMinutes,
      totalReadingTimeFormatted: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`,
      totalWords: bookStats.reduce((sum, b) => sum + b.totalWords, 0),
    });
  } catch (error) {
    return handleApiError(error);
  }
}
