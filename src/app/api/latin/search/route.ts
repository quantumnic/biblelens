import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase();
  if (!q) return NextResponse.json({ error: 'q parameter required' }, { status: 400 });

  const db = getDb();

  const words = db.prepare(`
    SELECT wp.*, lw.occurrences
    FROM word_provenance wp
    LEFT JOIN latin_words lw ON lw.provenance_id = wp.id
    WHERE wp.language = 'latin' AND (wp.lemma LIKE ? OR wp.word LIKE ? OR wp.definition LIKE ?)
    LIMIT 50
  `).all(`%${q}%`, `%${q}%`, `%${q}%`) as any[];

  return NextResponse.json(words.map(w => ({
    ...w,
    manuscript_sources: JSON.parse(w.manuscript_sources || '[]'),
    textual_variants: JSON.parse(w.textual_variants || '[]'),
    academic_refs: JSON.parse(w.academic_refs || '{}'),
  })));
}
