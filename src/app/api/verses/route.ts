import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');
  const verse = searchParams.get('verse');
  const translation = searchParams.get('translation');

  if (!book || !chapter) {
    return NextResponse.json({ error: 'book and chapter required' }, { status: 400 });
  }

  const db = getDb();
  let query = 'SELECT book, chapter, verse, text, translation FROM verses WHERE book = ? AND chapter = ?';
  const params: any[] = [parseInt(book), parseInt(chapter)];

  if (verse) {
    query += ' AND verse = ?';
    params.push(parseInt(verse));
  }
  if (translation) {
    query += ' AND translation = ?';
    params.push(translation);
  }

  query += ' ORDER BY verse, translation';

  const rows = db.prepare(query).all(...params);
  return NextResponse.json(rows);
}
