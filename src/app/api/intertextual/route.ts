import { NextRequest, NextResponse } from 'next/server';
import { getDb, isDatabaseAvailable, DatabaseNotAvailableError } from '@/lib/db';

// Intertextual connections — identifies shared vocabulary and thematic links between passages
// This goes beyond simple cross-references by analyzing shared Strong's numbers

export async function GET(req: NextRequest) {
  if (!isDatabaseAvailable()) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const book = parseInt(searchParams.get('book') || '0');
    const chapter = parseInt(searchParams.get('chapter') || '0');
    const verse = parseInt(searchParams.get('verse') || '0');

    if (!book || !chapter || !verse) {
      return NextResponse.json({ error: 'book, chapter, and verse are required' }, { status: 400 });
    }

    const db = getDb();

    // Get Strong's words for this verse
    const verseWords = db.prepare(`
      SELECT ws.strongs_id, ws.word, s.original, s.transliteration, s.definition, s.language
      FROM word_strongs ws
      JOIN strongs s ON s.id = ws.strongs_id
      WHERE ws.book = ? AND ws.chapter = ? AND ws.verse = ?
    `).all(book, chapter, verse) as any[];

    if (verseWords.length === 0) {
      return NextResponse.json({ data: [], sourceWords: [] });
    }

    const strongsIds = verseWords.map((w: any) => w.strongs_id);

    // Find other verses sharing these Strong's numbers
    const placeholders = strongsIds.map(() => '?').join(',');
    const connections = db.prepare(`
      SELECT ws.book, ws.chapter, ws.verse, ws.strongs_id, ws.word,
             s.transliteration, s.definition
      FROM word_strongs ws
      JOIN strongs s ON s.id = ws.strongs_id
      WHERE ws.strongs_id IN (${placeholders})
        AND NOT (ws.book = ? AND ws.chapter = ? AND ws.verse = ?)
      ORDER BY ws.book, ws.chapter, ws.verse
    `).all(...strongsIds, book, chapter, verse) as any[];

    // Group by verse and count shared words
    const verseMap: Record<string, { book: number; chapter: number; verse: number; sharedWords: any[]; text?: string }> = {};
    for (const c of connections) {
      const key = `${c.book}-${c.chapter}-${c.verse}`;
      if (!verseMap[key]) {
        verseMap[key] = { book: c.book, chapter: c.chapter, verse: c.verse, sharedWords: [] };
      }
      if (!verseMap[key].sharedWords.find((w: any) => w.strongs_id === c.strongs_id)) {
        verseMap[key].sharedWords.push({
          strongs_id: c.strongs_id,
          word: c.word,
          transliteration: c.transliteration,
          definition: c.definition,
        });
      }
    }

    // Sort by number of shared words (most connections first), take top 20
    const ranked = Object.values(verseMap)
      .sort((a, b) => b.sharedWords.length - a.sharedWords.length)
      .slice(0, 20);

    // Fetch verse text for top results
    for (const r of ranked) {
      const row = db.prepare(
        "SELECT text FROM verses WHERE book = ? AND chapter = ? AND verse = ? AND translation = 'KJV'"
      ).get(r.book, r.chapter, r.verse) as { text: string } | undefined;
      r.text = row?.text || '';
    }

    return NextResponse.json({
      data: ranked,
      sourceWords: verseWords.map((w: any) => ({
        strongs_id: w.strongs_id,
        word: w.word,
        original: w.original,
        transliteration: w.transliteration,
        definition: w.definition,
        language: w.language,
      })),
    });
  } catch (err) {
    if (err instanceof DatabaseNotAvailableError) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }
    throw err;
  }
}
