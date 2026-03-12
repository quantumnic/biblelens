import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const bookFilter = searchParams.get('book');
    const testament = searchParams.get('testament');
    const translation = searchParams.get('translation') || 'KJV';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!q) {
      return NextResponse.json({ error: 'q parameter required' }, { status: 400 });
    }

    const db = getDb();
    
    let query = `
      SELECT v.book, v.chapter, v.verse, v.text, v.translation
      FROM verses_fts fts
      JOIN verses v ON v.id = fts.rowid
      WHERE fts.text MATCH ? AND v.translation = ?
    `;
    const params: (string | number)[] = [q, translation];

    if (bookFilter) {
      query += ' AND v.book = ?';
      params.push(parseInt(bookFilter));
    }

    if (testament === 'OT') {
      query += ' AND v.book <= 39';
    } else if (testament === 'NT') {
      query += ' AND v.book >= 40';
    }

    query += ` ORDER BY v.book, v.chapter, v.verse LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const rows = db.prepare(query).all(...params);
    
    let countQuery = `
      SELECT COUNT(*) as total
      FROM verses_fts fts
      JOIN verses v ON v.id = fts.rowid
      WHERE fts.text MATCH ? AND v.translation = ?
    `;
    const countParams: (string | number)[] = [q, translation];
    if (bookFilter) {
      countQuery += ' AND v.book = ?';
      countParams.push(parseInt(bookFilter));
    }
    if (testament === 'OT') countQuery += ' AND v.book <= 39';
    else if (testament === 'NT') countQuery += ' AND v.book >= 40';
    
    const total = (db.prepare(countQuery).get(...countParams) as { total: number }).total;
    
    return NextResponse.json({ results: rows, total, limit, offset });
  } catch (error) {
    return handleApiError(error);
  }
}
