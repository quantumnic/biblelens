import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');
  const verse = searchParams.get('verse');

  if (!book || !chapter || !verse) {
    return NextResponse.json({ error: 'book, chapter, verse required' }, { status: 400 });
  }

  const b = parseInt(book);
  const c = parseInt(chapter);
  const v = parseInt(verse);

  const db = getDb();

  // Bidirectional: find refs FROM this verse and TO this verse
  const fromRefs = db.prepare(`
    SELECT to_book as book, to_chapter as chapter, to_verse_start as verse_start, to_verse_end as verse_end, votes, category
    FROM cross_references
    WHERE from_book = ? AND from_chapter = ? AND from_verse_start <= ? AND from_verse_end >= ?
    ORDER BY votes DESC
    LIMIT 50
  `).all(b, c, v, v);

  const toRefs = db.prepare(`
    SELECT from_book as book, from_chapter as chapter, from_verse_start as verse_start, from_verse_end as verse_end, votes, category
    FROM cross_references
    WHERE to_book = ? AND to_chapter = ? AND to_verse_start <= ? AND to_verse_end >= ?
    ORDER BY votes DESC
    LIMIT 50
  `).all(b, c, v, v);

  // Fetch verse texts for cross-references
  const fetchVerseText = db.prepare(
    'SELECT text FROM verses WHERE book = ? AND chapter = ? AND verse = ? AND translation = ? LIMIT 1'
  );

  const enrichRefs = (refs: any[]) => refs.map(r => ({
    ...r,
    text: (fetchVerseText.get(r.book, r.chapter, r.verse_start, 'KJV') as any)?.text || ''
  }));

  return NextResponse.json({
    from: enrichRefs(fromRefs),
    to: enrichRefs(toRefs),
    total: fromRefs.length + toRefs.length
  });
}
