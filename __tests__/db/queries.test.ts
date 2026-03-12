import { describe, it, expect, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

describe('Database Queries', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = createTestDb();
    seedTestDb(db);
  });

  describe('verses', () => {
    it('can query verses by book and chapter', () => {
      const rows = db.prepare('SELECT * FROM verses WHERE book = ? AND chapter = ?').all(1, 1);
      expect(rows.length).toBeGreaterThan(0);
    });

    it('can query by translation', () => {
      const kjv = db.prepare("SELECT * FROM verses WHERE translation = 'KJV'").all();
      const asv = db.prepare("SELECT * FROM verses WHERE translation = 'ASV'").all();
      expect(kjv.length).toBeGreaterThan(0);
      expect(asv.length).toBeGreaterThan(0);
    });

    it('can get distinct translations', () => {
      const translations = db.prepare('SELECT DISTINCT translation FROM verses ORDER BY translation').all() as { translation: string }[];
      const names = translations.map(t => t.translation);
      expect(names).toContain('KJV');
      expect(names).toContain('ASV');
      expect(names).toContain('VUL');
    });

    it('FTS search works', () => {
      const results = db.prepare(
        "SELECT v.* FROM verses_fts fts JOIN verses v ON v.id = fts.rowid WHERE fts.text MATCH 'beginning'"
      ).all();
      expect(results.length).toBeGreaterThan(0);
    });

    it('FTS search is case-insensitive', () => {
      const r1 = db.prepare(
        "SELECT COUNT(*) as c FROM verses_fts WHERE text MATCH 'god'"
      ).get() as { c: number };
      expect(r1.c).toBeGreaterThan(0);
    });
  });

  describe('cross_references', () => {
    it('can query cross-references from a verse', () => {
      const refs = db.prepare(
        'SELECT * FROM cross_references WHERE from_book = ? AND from_chapter = ?'
      ).all(43, 3);
      expect(refs.length).toBeGreaterThan(0);
    });

    it('bidirectional query works', () => {
      const toRefs = db.prepare(
        'SELECT * FROM cross_references WHERE to_book = ? AND to_chapter = ? AND to_verse_start <= ? AND to_verse_end >= ?'
      ).all(45, 5, 8, 8);
      expect(toRefs.length).toBeGreaterThan(0);
    });
  });

  describe('strongs', () => {
    it('can query by id', () => {
      const entry = db.prepare('SELECT * FROM strongs WHERE id = ?').get('G26') as any;
      expect(entry).toBeDefined();
      expect(entry.transliteration).toBe('agapē');
      expect(entry.language).toBe('greek');
    });

    it('can list all entries', () => {
      const all = db.prepare('SELECT * FROM strongs').all();
      expect(all.length).toBeGreaterThanOrEqual(5);
    });

    it('has Hebrew and Greek entries', () => {
      const hebrew = db.prepare("SELECT COUNT(*) as c FROM strongs WHERE language = 'hebrew'").get() as { c: number };
      const greek = db.prepare("SELECT COUNT(*) as c FROM strongs WHERE language = 'greek'").get() as { c: number };
      expect(hebrew.c).toBeGreaterThan(0);
      expect(greek.c).toBeGreaterThan(0);
    });
  });

  describe('word_strongs', () => {
    it('can join with strongs', () => {
      const words = db.prepare(`
        SELECT ws.word, ws.strongs_id, s.original, s.transliteration, s.definition
        FROM word_strongs ws
        JOIN strongs s ON s.id = ws.strongs_id
        WHERE ws.book = ? AND ws.chapter = ? AND ws.verse = ?
        ORDER BY ws.position
      `).all(1, 1, 1);
      expect(words.length).toBeGreaterThan(0);
    });
  });

  describe('word_provenance', () => {
    it('can query by language', () => {
      const hebrew = db.prepare("SELECT * FROM word_provenance WHERE language = 'hebrew'").all();
      const greek = db.prepare("SELECT * FROM word_provenance WHERE language = 'greek'").all();
      const latin = db.prepare("SELECT * FROM word_provenance WHERE language = 'latin'").all();
      expect(hebrew.length).toBeGreaterThan(0);
      expect(greek.length).toBeGreaterThan(0);
      expect(latin.length).toBeGreaterThan(0);
    });

    it('parent-child relationships work', () => {
      const latin = db.prepare(
        "SELECT * FROM word_provenance WHERE language = 'latin' AND parent_word_id IS NOT NULL"
      ).get() as any;
      expect(latin).toBeDefined();
      
      const parent = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(latin.parent_word_id) as any;
      expect(parent).toBeDefined();
    });

    it('can traverse full chain', () => {
      const latin = db.prepare("SELECT * FROM word_provenance WHERE lemma = 'amor'").get() as any;
      let current = latin;
      const chain = [current];
      while (current?.parent_word_id) {
        current = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(current.parent_word_id) as any;
        if (current) chain.push(current);
      }
      // amor -> agape -> ahavah
      expect(chain.length).toBe(3);
      expect(chain[0].language).toBe('latin');
      expect(chain[1].language).toBe('greek');
      expect(chain[2].language).toBe('hebrew');
    });
  });

  describe('latin_words', () => {
    it('has occurrence count', () => {
      const word = db.prepare("SELECT * FROM latin_words WHERE lemma = 'amor'").get() as any;
      expect(word).toBeDefined();
      expect(word.occurrences).toBe(42);
    });

    it('links to provenance', () => {
      const word = db.prepare("SELECT * FROM latin_words WHERE lemma = 'amor'").get() as any;
      expect(word.provenance_id).toBeDefined();
      const prov = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(word.provenance_id) as any;
      expect(prov).toBeDefined();
    });
  });
});
