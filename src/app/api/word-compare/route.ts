import { NextRequest, NextResponse } from 'next/server';
import { getDb, isDatabaseAvailable } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word')?.toLowerCase();

    if (!word) {
      return NextResponse.json({ error: 'word parameter required' }, { status: 400 });
    }

    const db = getDb();

    // Count occurrences in OT vs NT
    const otCount = (db.prepare(
      "SELECT COUNT(*) as c FROM verses WHERE translation = 'KJV' AND book <= 39 AND LOWER(text) LIKE ?"
    ).get(`%${word}%`) as any).c;

    const ntCount = (db.prepare(
      "SELECT COUNT(*) as c FROM verses WHERE translation = 'KJV' AND book >= 40 AND LOWER(text) LIKE ?"
    ).get(`%${word}%`) as any).c;

    // Per-book breakdown (top 10)
    const bookBreakdown = db.prepare(`
      SELECT book, COUNT(*) as count
      FROM verses
      WHERE translation = 'KJV' AND LOWER(text) LIKE ?
      GROUP BY book
      ORDER BY count DESC
      LIMIT 10
    `).all(`%${word}%`) as { book: number; count: number }[];

    // First and last occurrence
    const firstOccurrence = db.prepare(
      "SELECT book, chapter, verse, text FROM verses WHERE translation = 'KJV' AND LOWER(text) LIKE ? ORDER BY book, chapter, verse LIMIT 1"
    ).get(`%${word}%`) as any;

    const lastOccurrence = db.prepare(
      "SELECT book, chapter, verse, text FROM verses WHERE translation = 'KJV' AND LOWER(text) LIKE ? ORDER BY book DESC, chapter DESC, verse DESC LIMIT 1"
    ).get(`%${word}%`) as any;

    return NextResponse.json({
      word,
      total: otCount + ntCount,
      oldTestament: otCount,
      newTestament: ntCount,
      ratio: ntCount > 0 ? (otCount / ntCount).toFixed(2) : 'OT only',
      bookBreakdown,
      firstOccurrence: firstOccurrence || null,
      lastOccurrence: lastOccurrence || null,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
