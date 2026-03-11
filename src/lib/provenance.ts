import { getDb } from './db';

export function parseJson(s: string | null): any {
  try { return s ? JSON.parse(s) : null; } catch { return null; }
}

export function getProvenanceByLemma(lemma: string, language: string) {
  const db = getDb();
  return db.prepare('SELECT * FROM word_provenance WHERE lemma = ? AND language = ?').get(lemma, language) as any;
}

export function getProvenanceChain(db: any, entry: any): any[] {
  const chain: any[] = [entry];
  let current = entry;
  while (current?.parent_word_id) {
    const parent = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(current.parent_word_id) as any;
    if (parent) { chain.push(parent); current = parent; } else break;
  }
  return chain;
}

export function getProvenanceChildren(db: any, id: number) {
  return db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ?').all(id) as any[];
}

export function langEmoji(lang: string) {
  if (lang === 'hebrew') return '🕎';
  if (lang === 'greek') return '🏛️';
  if (lang === 'latin') return '📜';
  return '📖';
}

export function langLabel(lang: string) {
  if (lang === 'hebrew') return 'Hebräisch (MT/OT)';
  if (lang === 'greek') return 'Griechisch (LXX/NT)';
  if (lang === 'latin') return 'Lateinisch (Vulgata)';
  return lang;
}

export function langTranslation(lang: string): string {
  if (lang === 'hebrew') return 'KJV';
  if (lang === 'greek') return 'KJV';
  if (lang === 'latin') return 'VUL';
  return 'KJV';
}
