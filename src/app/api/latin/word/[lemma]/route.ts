import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest, { params }: { params: { lemma: string } }) {
  try {
  const db = getDb();
  const lemma = decodeURIComponent(params.lemma).toLowerCase();

  // Get word provenance
  const prov = db.prepare(`SELECT * FROM word_provenance WHERE lemma = ? AND language = 'latin'`).get(lemma) as any;
  if (!prov) {
    return NextResponse.json({ error: 'Word not found' }, { status: 404 });
  }

  // Get etymology chain (walk up parents)
  const chain: any[] = [prov];
  let current = prov;
  while (current?.parent_word_id) {
    const parent = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(current.parent_word_id) as any;
    if (parent) { chain.push(parent); current = parent; } else break;
  }

  // Get children (words derived from this)
  const children = db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ?').all(prov.id);

  // Find occurrences in Vulgate
  const occurrences = db.prepare(`
    SELECT id, book, chapter, verse, text FROM verses
    WHERE translation = 'VUL' AND LOWER(text) LIKE ?
    ORDER BY book, chapter, verse LIMIT 100
  `).all(`%${lemma}%`) as any[];

  return NextResponse.json({
    word: prov,
    chain: chain.map(c => ({ ...c, manuscript_sources: JSON.parse(c.manuscript_sources || '[]'), textual_variants: JSON.parse(c.textual_variants || '[]'), academic_refs: JSON.parse(c.academic_refs || '{}') })),
    children,
    occurrences: occurrences.map(o => ({
      ...o,
      ref: `${o.book}:${o.chapter}:${o.verse}`,
    })),
  });
  } catch (error) {
    return handleApiError(error);
  }
}
