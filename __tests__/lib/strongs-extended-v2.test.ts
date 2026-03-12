import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V2, EXTENDED_WORD_MAPPINGS_V2 } from '../../scripts/strongs-extended-v2';

describe('Extended Strongs V2', () => {
  it('has valid Strong\'s entries with required fields', () => {
    expect(EXTENDED_STRONGS_V2.length).toBeGreaterThan(40);
    for (const entry of EXTENDED_STRONGS_V2) {
      expect(entry.id).toMatch(/^[HG]\d+[a-z]?$/);
      expect(entry.original.length).toBeGreaterThan(0);
      expect(entry.transliteration.length).toBeGreaterThan(0);
      expect(entry.definition.length).toBeGreaterThan(0);
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('has no duplicate Strong\'s IDs', () => {
    const ids = EXTENDED_STRONGS_V2.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('has valid word-verse mappings', () => {
    expect(EXTENDED_WORD_MAPPINGS_V2.length).toBeGreaterThan(50);
    for (const [book, ch, v, word, sid, pos] of EXTENDED_WORD_MAPPINGS_V2) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
      expect(ch).toBeGreaterThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(word.length).toBeGreaterThan(0);
      expect(sid).toMatch(/^[HG]\d+[a-z]?$/);
      expect(pos).toBeGreaterThanOrEqual(0);
    }
  });

  it('includes both Hebrew and Greek entries', () => {
    const hebrew = EXTENDED_STRONGS_V2.filter(e => e.language === 'hebrew');
    const greek = EXTENDED_STRONGS_V2.filter(e => e.language === 'greek');
    expect(hebrew.length).toBeGreaterThan(10);
    expect(greek.length).toBeGreaterThan(10);
  });
});
