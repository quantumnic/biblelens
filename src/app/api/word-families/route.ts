import { NextRequest, NextResponse } from 'next/server';
import { getDb, isDatabaseAvailable } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

/**
 * Word Families API — find related Strong's entries that share etymological roots.
 * GET /api/word-families?root=H3068   → entries sharing the same root
 * GET /api/word-families?lang=hebrew&limit=20 → top word families by occurrence count
 */
export async function GET(request: NextRequest) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const root = searchParams.get('root');
    const lang = searchParams.get('lang') || 'hebrew';
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

    const db = getDb();

    if (root) {
      // Find the root entry
      const rootEntry = db.prepare('SELECT * FROM strongs WHERE id = ?').get(root) as any;
      if (!rootEntry) {
        return NextResponse.json({ error: 'Strong\'s entry not found' }, { status: 404 });
      }

      // Find related words: same language + similar root pattern
      // Use first 2-3 chars of the transliteration as a family matcher
      const transRoot = rootEntry.transliteration.replace(/[^a-zA-Z]/g, '').slice(0, 3).toLowerCase();
      const related = db.prepare(`
        SELECT s.*, COUNT(ws.id) as occurrences
        FROM strongs s
        LEFT JOIN word_strongs ws ON ws.strongs_id = s.id
        WHERE s.language = ? AND s.id != ?
          AND LOWER(REPLACE(s.transliteration, '''', '')) LIKE ?
        GROUP BY s.id
        ORDER BY occurrences DESC
        LIMIT ?
      `).all(rootEntry.language, root, `${transRoot}%`, limit) as any[];

      // Also get occurrence count for the root
      const rootOccurrences = (db.prepare(
        'SELECT COUNT(*) as c FROM word_strongs WHERE strongs_id = ?'
      ).get(root) as any)?.c || 0;

      return NextResponse.json({
        root: { ...rootEntry, occurrences: rootOccurrences },
        family: related,
        familySize: related.length + 1,
      });
    }

    // Browse mode: top word families grouped by transliteration prefix
    const entries = db.prepare(`
      SELECT s.id, s.original, s.transliteration, s.definition, s.language,
             COUNT(ws.id) as occurrences
      FROM strongs s
      LEFT JOIN word_strongs ws ON ws.strongs_id = s.id
      WHERE s.language = ?
      GROUP BY s.id
      ORDER BY occurrences DESC
      LIMIT ?
    `).all(lang, limit) as any[];

    return NextResponse.json({ language: lang, entries, total: entries.length });
  } catch (error) {
    return handleApiError(error);
  }
}
