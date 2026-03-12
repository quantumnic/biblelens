import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

describe('Seed Data Integrity', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = createTestDb();
    seedTestDb(db);
  });

  it('all tables exist', () => {
    const tables = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    ).all() as { name: string }[];
    const names = tables.map(t => t.name);
    expect(names).toContain('verses');
    expect(names).toContain('cross_references');
    expect(names).toContain('strongs');
    expect(names).toContain('word_strongs');
    expect(names).toContain('word_provenance');
    expect(names).toContain('latin_words');
  });

  it('all indexes exist', () => {
    const indexes = db.prepare(
      "SELECT name FROM sqlite_master WHERE type='index' AND name NOT LIKE 'sqlite_%'"
    ).all() as { name: string }[];
    const names = indexes.map(i => i.name);
    expect(names).toContain('idx_verses_ref');
    expect(names).toContain('idx_verses_translation');
    expect(names).toContain('idx_crossref_from');
    expect(names).toContain('idx_crossref_to');
  });

  it('FTS table exists and is populated', () => {
    const count = db.prepare("SELECT COUNT(*) as c FROM verses_fts").get() as { c: number };
    expect(count.c).toBeGreaterThan(0);
  });

  it('verse-strongs foreign keys are valid', () => {
    const orphans = db.prepare(`
      SELECT ws.id, ws.strongs_id FROM word_strongs ws
      LEFT JOIN strongs s ON s.id = ws.strongs_id
      WHERE s.id IS NULL
    `).all();
    expect(orphans).toHaveLength(0);
  });

  it('provenance parent links are valid', () => {
    const orphans = db.prepare(`
      SELECT wp.id, wp.parent_word_id FROM word_provenance wp
      LEFT JOIN word_provenance parent ON parent.id = wp.parent_word_id
      WHERE wp.parent_word_id IS NOT NULL AND parent.id IS NULL
    `).all();
    expect(orphans).toHaveLength(0);
  });

  it('latin_words provenance links are valid', () => {
    const orphans = db.prepare(`
      SELECT lw.id, lw.provenance_id FROM latin_words lw
      LEFT JOIN word_provenance wp ON wp.id = lw.provenance_id
      WHERE lw.provenance_id IS NOT NULL AND wp.id IS NULL
    `).all();
    expect(orphans).toHaveLength(0);
  });

  it('verse data is not empty', () => {
    const c = db.prepare("SELECT COUNT(*) as c FROM verses").get() as { c: number };
    expect(c.c).toBeGreaterThan(5);
  });
});
