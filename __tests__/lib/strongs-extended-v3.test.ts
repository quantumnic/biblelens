import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V3, EXTENDED_WORD_MAPPINGS_V3 } from '../../scripts/strongs-extended-v3';

describe('Strong\'s Extended v3', () => {
  it('should have at least 30 new entries', () => {
    expect(EXTENDED_STRONGS_V3.length).toBeGreaterThanOrEqual(30);
  });

  it('should have Hebrew and Greek entries', () => {
    const hebrew = EXTENDED_STRONGS_V3.filter(e => e.language === 'hebrew');
    const greek = EXTENDED_STRONGS_V3.filter(e => e.language === 'greek');
    expect(hebrew.length).toBeGreaterThan(10);
    expect(greek.length).toBeGreaterThan(10);
  });

  it('should have unique IDs', () => {
    const ids = EXTENDED_STRONGS_V3.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('should have correct ID prefixes', () => {
    for (const entry of EXTENDED_STRONGS_V3) {
      if (entry.language === 'hebrew') {
        expect(entry.id).toMatch(/^H\d+/);
      } else {
        expect(entry.id).toMatch(/^G\d+/);
      }
    }
  });

  it('should have non-empty definitions', () => {
    for (const entry of EXTENDED_STRONGS_V3) {
      expect(entry.definition.length).toBeGreaterThan(5);
    }
  });

  it('should have word mappings with valid book numbers', () => {
    for (const [book, ch, v, word, sid, pos] of EXTENDED_WORD_MAPPINGS_V3) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
      expect(ch).toBeGreaterThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(word.length).toBeGreaterThan(0);
      expect(sid).toMatch(/^[HG]\d+/);
      expect(pos).toBeGreaterThanOrEqual(1);
    }
  });

  it('should have mappings covering OT and NT', () => {
    const otMappings = EXTENDED_WORD_MAPPINGS_V3.filter(([b]) => b <= 39);
    const ntMappings = EXTENDED_WORD_MAPPINGS_V3.filter(([b]) => b >= 40);
    expect(otMappings.length).toBeGreaterThan(10);
    expect(ntMappings.length).toBeGreaterThan(10);
  });

  it('should include key theological terms', () => {
    const defs = EXTENDED_STRONGS_V3.map(e => e.definition.toLowerCase());
    const terms = ['messiah', 'worship', 'atone', 'forgive', 'salvation', 'gospel', 'repent'];
    for (const term of terms) {
      expect(defs.some(d => d.includes(term))).toBe(true);
    }
  });
});
