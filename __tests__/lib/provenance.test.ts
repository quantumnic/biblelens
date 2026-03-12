import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

// Mock getDb to use test database
let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

// Import after mock
import { parseJson, getProvenanceChain, getProvenanceChildren, langEmoji, langLabel, langTranslation } from '@/lib/provenance';

describe('provenance utilities', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  describe('parseJson', () => {
    it('parses valid JSON', () => {
      expect(parseJson('{"a":1}')).toEqual({ a: 1 });
      expect(parseJson('[1,2,3]')).toEqual([1, 2, 3]);
    });

    it('returns null for invalid JSON', () => {
      expect(parseJson('not json')).toBeNull();
      expect(parseJson('')).toBeNull();
    });

    it('returns null for null input', () => {
      expect(parseJson(null)).toBeNull();
    });
  });

  describe('langEmoji', () => {
    it('returns correct emoji for each language', () => {
      expect(langEmoji('hebrew')).toBe('🕎');
      expect(langEmoji('greek')).toBe('🏛️');
      expect(langEmoji('latin')).toBe('📜');
      expect(langEmoji('other')).toBe('📖');
    });
  });

  describe('langLabel', () => {
    it('returns correct label for each language', () => {
      expect(langLabel('hebrew')).toContain('Hebräisch');
      expect(langLabel('greek')).toContain('Griechisch');
      expect(langLabel('latin')).toContain('Lateinisch');
      expect(langLabel('aramaic')).toBe('aramaic');
    });
  });

  describe('langTranslation', () => {
    it('returns correct translation code', () => {
      expect(langTranslation('hebrew')).toBe('KJV');
      expect(langTranslation('greek')).toBe('KJV');
      expect(langTranslation('latin')).toBe('VUL');
      expect(langTranslation('other')).toBe('KJV');
    });
  });

  describe('getProvenanceChain', () => {
    it('builds chain from child to root', () => {
      const latinEntry = testDb.prepare(
        "SELECT * FROM word_provenance WHERE lemma = 'amor' AND language = 'latin'"
      ).get() as any;
      
      const chain = getProvenanceChain(testDb, latinEntry);
      expect(chain.length).toBeGreaterThanOrEqual(2);
      expect(chain[0].lemma).toBe('amor');
      // Chain should go back to parent
      expect(chain[chain.length - 1].language).toBe('hebrew');
    });

    it('returns single entry for root word', () => {
      const hebrewEntry = testDb.prepare(
        "SELECT * FROM word_provenance WHERE lemma = 'ahavah' AND language = 'hebrew'"
      ).get() as any;
      
      const chain = getProvenanceChain(testDb, hebrewEntry);
      expect(chain).toHaveLength(1);
      expect(chain[0].lemma).toBe('ahavah');
    });
  });

  describe('getProvenanceChildren', () => {
    it('finds children of a word', () => {
      const hebrewEntry = testDb.prepare(
        "SELECT * FROM word_provenance WHERE lemma = 'ahavah'"
      ).get() as any;
      
      const children = getProvenanceChildren(testDb, hebrewEntry.id);
      expect(children.length).toBeGreaterThanOrEqual(1);
      expect(children[0].language).toBe('greek');
    });

    it('returns empty array for leaf word', () => {
      const latinEntry = testDb.prepare(
        "SELECT * FROM word_provenance WHERE lemma = 'amor'"
      ).get() as any;
      
      const children = getProvenanceChildren(testDb, latinEntry.id);
      expect(children).toHaveLength(0);
    });
  });
});
