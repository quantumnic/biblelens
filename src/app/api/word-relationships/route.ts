import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const strongsId = searchParams.get('id');
    const db = getDb();

    if (!strongsId) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    // Get the source entry
    const entry = db.prepare('SELECT * FROM strongs WHERE id = ?').get(strongsId) as any;
    if (!entry) {
      return NextResponse.json({ error: "Strong's number not found" }, { status: 404 });
    }

    // Find co-occurring Strong's numbers (words that appear in the same verses)
    const coOccurrences = db.prepare(`
      SELECT s.id, s.original, s.transliteration, s.definition, s.language,
             COUNT(DISTINCT ws2.book || '-' || ws2.chapter || '-' || ws2.verse) as shared_verses
      FROM word_strongs ws1
      JOIN word_strongs ws2 ON ws1.book = ws2.book AND ws1.chapter = ws2.chapter AND ws1.verse = ws2.verse
      JOIN strongs s ON s.id = ws2.strongs_id
      WHERE ws1.strongs_id = ? AND ws2.strongs_id != ?
      GROUP BY s.id
      ORDER BY shared_verses DESC
      LIMIT 15
    `).all(strongsId, strongsId) as any[];

    // Find words from the same language family (same prefix range)
    const lang = strongsId.charAt(0);
    const num = parseInt(strongsId.substring(1));
    const rangeStart = `${lang}${Math.max(1, num - 20)}`;
    const rangeEnd = `${lang}${num + 20}`;
    const sameFamily = db.prepare(`
      SELECT id, original, transliteration, definition, language
      FROM strongs
      WHERE id >= ? AND id <= ? AND id != ?
      ORDER BY id
      LIMIT 10
    `).all(rangeStart, rangeEnd, strongsId) as any[];

    // Get verse distribution across testaments
    const otCount = db.prepare(`
      SELECT COUNT(DISTINCT book || '-' || chapter || '-' || verse) as c
      FROM word_strongs WHERE strongs_id = ? AND book <= 39
    `).get(strongsId) as any;

    const ntCount = db.prepare(`
      SELECT COUNT(DISTINCT book || '-' || chapter || '-' || verse) as c
      FROM word_strongs WHERE strongs_id = ? AND book >= 40
    `).get(strongsId) as any;

    return NextResponse.json({
      entry,
      coOccurrences,
      sameFamily,
      distribution: {
        oldTestament: otCount?.c || 0,
        newTestament: ntCount?.c || 0,
      },
    });
  } catch (error) {
    return handleApiError(error);
  }
}
