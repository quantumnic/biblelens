import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = new URL(request.url);
  const strongs = searchParams.get('strongs');
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');
  const verse = searchParams.get('verse');

  const db = getDb();

  if (strongs) {
    // Get Strong's entry
    const entry = db.prepare('SELECT * FROM strongs WHERE id = ?').get(strongs);
    if (!entry) {
      return NextResponse.json({ error: 'Strong\'s number not found' }, { status: 404 });
    }

    // Get all occurrences
    const occurrences = db.prepare(`
      SELECT ws.book, ws.chapter, ws.verse, ws.word, ws.position, v.text
      FROM word_strongs ws
      LEFT JOIN verses v ON v.book = ws.book AND v.chapter = ws.chapter AND v.verse = ws.verse AND v.translation = 'KJV'
      WHERE ws.strongs_id = ?
      ORDER BY ws.book, ws.chapter, ws.verse
    `).all(strongs);

    return NextResponse.json({ entry, occurrences });
  }

  if (book && chapter && verse) {
    // Get words with Strong's for a specific verse
    const words = db.prepare(`
      SELECT ws.word, ws.strongs_id, ws.position, s.original, s.transliteration, s.definition, s.language
      FROM word_strongs ws
      JOIN strongs s ON s.id = ws.strongs_id
      WHERE ws.book = ? AND ws.chapter = ? AND ws.verse = ?
      ORDER BY ws.position
    `).all(parseInt(book), parseInt(chapter), parseInt(verse));

    return NextResponse.json({ words });
  }

  // List all Strong's entries
  const all = db.prepare('SELECT id, original, transliteration, language FROM strongs ORDER BY id').all();
  return NextResponse.json({ entries: all });
  } catch (error) {
    return handleApiError(error);
  }
}
