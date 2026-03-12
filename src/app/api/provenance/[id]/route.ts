import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
  const db = getDb();
  const id = parseInt(params.id);

  const entry = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(id) as any;
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Build full chain (ancestors)
  const ancestors: any[] = [];
  let current = entry;
  while (current?.parent_word_id) {
    const parent = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(current.parent_word_id) as any;
    if (parent) { ancestors.push(parent); current = parent; } else break;
  }

  // Children
  const children = db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ?').all(id) as any[];

  // Siblings (same parent)
  const siblings = entry.parent_word_id
    ? (db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ? AND id != ?').all(entry.parent_word_id, id) as any[])
    : [];

  const parse = (e: any) => ({
    ...e,
    manuscript_sources: JSON.parse(e.manuscript_sources || '[]'),
    textual_variants: JSON.parse(e.textual_variants || '[]'),
    academic_refs: JSON.parse(e.academic_refs || '{}'),
  });

  return NextResponse.json({
    entry: parse(entry),
    ancestors: ancestors.map(parse),
    children: children.map(parse),
    siblings: siblings.map(parse),
  });
  } catch (error) {
    return handleApiError(error);
  }
}
