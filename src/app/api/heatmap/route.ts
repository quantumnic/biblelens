import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');

    if (!word) {
      return NextResponse.json({ error: 'word parameter required' }, { status: 400 });
    }

    const db = getDb();
    const lower = word.toLowerCase();

    // Count occurrences per book
    const rows = db.prepare(`
      SELECT book, COUNT(*) as count
      FROM verses
      WHERE translation = 'KJV' AND LOWER(text) LIKE ?
      GROUP BY book
      ORDER BY book
    `).all(`%${lower}%`) as { book: number; count: number }[];

    // Also get total verses per book for relative frequency
    const totals = db.prepare(`
      SELECT book, COUNT(*) as total
      FROM verses
      WHERE translation = 'KJV'
      GROUP BY book
      ORDER BY book
    `).all() as { book: number; total: number }[];

    const totalMap = new Map(totals.map(t => [t.book, t.total]));

    const data = rows.map(r => ({
      book: r.book,
      count: r.count,
      total: totalMap.get(r.book) || 1,
      frequency: r.count / (totalMap.get(r.book) || 1),
    }));

    return NextResponse.json({ word, data });
  } catch (error) {
    return handleApiError(error);
  }
}
