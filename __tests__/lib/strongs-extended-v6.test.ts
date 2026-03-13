import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V6, EXTENDED_WORD_STRONGS_V6 } from '../../scripts/strongs-extended-v6';

describe('EXTENDED_STRONGS_V6', () => {
  it('should have at least 30 entries', () => {
    expect(EXTENDED_STRONGS_V6.length).toBeGreaterThanOrEqual(30);
  });

  it('each entry should have required fields', () => {
    for (const entry of EXTENDED_STRONGS_V6) {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('original');
      expect(entry).toHaveProperty('transliteration');
      expect(entry).toHaveProperty('definition');
      expect(entry).toHaveProperty('language');
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('should have unique IDs', () => {
    const ids = EXTENDED_STRONGS_V6.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Hebrew entries start with H', () => {
    const hebrew = EXTENDED_STRONGS_V6.filter(e => e.language === 'hebrew');
    expect(hebrew.length).toBeGreaterThan(0);
    for (const e of hebrew) {
      expect(e.id).toMatch(/^H/);
    }
  });

  it('Greek entries start with G', () => {
    const greek = EXTENDED_STRONGS_V6.filter(e => e.language === 'greek');
    expect(greek.length).toBeGreaterThan(0);
    for (const e of greek) {
      expect(e.id).toMatch(/^G/);
    }
  });

  it('word-strongs mappings reference valid strongs IDs', () => {
    const ids = new Set(EXTENDED_STRONGS_V6.map(e => e.id));
    for (const mapping of EXTENDED_WORD_STRONGS_V6) {
      expect(ids).toContain(mapping[4]);
    }
  });

  it('word-strongs mappings have valid book numbers (1-66)', () => {
    for (const [book] of EXTENDED_WORD_STRONGS_V6) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
    }
  });
});
