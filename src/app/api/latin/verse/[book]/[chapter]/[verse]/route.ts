import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest, { params }: { params: { book: string; chapter: string; verse: string } }) {
  const db = getDb();
  const book = parseInt(params.book);
  const chapter = parseInt(params.chapter);
  const verse = parseInt(params.verse);

  // Get Vulgate text
  const vulVerse = db.prepare(
    "SELECT text FROM verses WHERE book = ? AND chapter = ? AND verse = ? AND translation = 'VUL'"
  ).get(book, chapter, verse) as any;

  if (!vulVerse) return NextResponse.json({ error: 'Verse not found' }, { status: 404 });

  // Parse words
  const words = vulVerse.text.replace(/[^a-zàáâãäåèéêëìíîïòóôõöùúûüý\s]/gi, '').split(/\s+/).filter(Boolean);

  // Match each word to provenance
  const result = words.map((w: string, i: number) => {
    const lower = w.toLowerCase();
    const prov = db.prepare(
      `SELECT wp.*, lw.occurrences FROM word_provenance wp
       LEFT JOIN latin_words lw ON lw.provenance_id = wp.id
       WHERE wp.language = 'latin' AND (wp.lemma = ? OR wp.word = ?)`
    ).get(lower, lower) as any;

    return {
      word: w,
      position: i,
      provenance: prov ? {
        ...prov,
        manuscript_sources: JSON.parse(prov.manuscript_sources || '[]'),
        textual_variants: JSON.parse(prov.textual_variants || '[]'),
        academic_refs: JSON.parse(prov.academic_refs || '{}'),
      } : null,
    };
  });

  return NextResponse.json({ book, chapter, verse, text: vulVerse.text, words: result });
}
