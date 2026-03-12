import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const translation = searchParams.get('translation') || 'KJV';
  const limit = Math.min(parseInt(searchParams.get('limit') || '100'), 500);

  const db = getDb();

  let query: string;
  let params: any[];

  if (book) {
    query = 'SELECT text FROM verses WHERE book = ? AND translation = ?';
    params = [parseInt(book), translation];
  } else {
    query = 'SELECT text FROM verses WHERE translation = ?';
    params = [translation];
  }

  const rows = db.prepare(query).all(...params) as { text: string }[];

  // Build full word frequency map
  const freq: Record<string, number> = {};
  const firstOccurrence: Record<string, { book: number; chapter: number; verse: number }> = {};

  if (book) {
    // Simple in-book hapax
    for (const row of rows) {
      const words = row.text.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/);
      for (const w of words) {
        if (w.length > 3) freq[w] = (freq[w] || 0) + 1;
      }
    }
  } else {
    // Global hapax — need verse references too
    const allVerses = db.prepare(
      'SELECT book, chapter, verse, text FROM verses WHERE translation = ?'
    ).all(translation) as { book: number; chapter: number; verse: number; text: string }[];

    for (const v of allVerses) {
      const words = v.text.toLowerCase().replace(/[^a-z\s'-]/g, '').split(/\s+/);
      for (const w of words) {
        if (w.length > 3) {
          freq[w] = (freq[w] || 0) + 1;
          if (!firstOccurrence[w]) firstOccurrence[w] = { book: v.book, chapter: v.chapter, verse: v.verse };
        }
      }
    }
  }

  // Filter hapax legomena (count === 1)
  const hapax = Object.entries(freq)
    .filter(([, count]) => count === 1)
    .slice(0, limit)
    .map(([word]) => ({
      word,
      ...(firstOccurrence[word] || {}),
    }));

  return NextResponse.json({
    type: 'hapax-legomena',
    count: hapax.length,
    totalUniqueWords: Object.keys(freq).length,
    data: hapax,
  });
  } catch (error) {
    return handleApiError(error);
  }
}
