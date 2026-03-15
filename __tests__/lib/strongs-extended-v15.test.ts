import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V15, EXTENDED_WORD_STRONGS_V15 } from '../../scripts/strongs-extended-v15';

describe('Strong\'s Extended v15', () => {
  it('should have entries', () => {
    expect(EXTENDED_STRONGS_V15.length).toBeGreaterThanOrEqual(30);
  });

  it('should have valid Strong\'s IDs', () => {
    for (const entry of EXTENDED_STRONGS_V15) {
      expect(entry.id).toMatch(/^[HG]\d+$/);
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('Hebrew entries start with H', () => {
    const hebrew = EXTENDED_STRONGS_V15.filter(e => e.language === 'hebrew');
    expect(hebrew.length).toBeGreaterThan(0);
    for (const entry of hebrew) {
      expect(entry.id).toMatch(/^H\d+$/);
    }
  });

  it('Greek entries start with G', () => {
    const greek = EXTENDED_STRONGS_V15.filter(e => e.language === 'greek');
    expect(greek.length).toBeGreaterThan(0);
    for (const entry of greek) {
      expect(entry.id).toMatch(/^G\d+$/);
    }
  });

  it('should have no duplicate IDs', () => {
    const ids = EXTENDED_STRONGS_V15.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('word mappings should reference valid Strong\'s IDs', () => {
    const validIds = new Set(EXTENDED_STRONGS_V15.map(e => e.id));
    for (const mapping of EXTENDED_WORD_STRONGS_V15) {
      expect(validIds.has(mapping.strongs_id)).toBe(true);
    }
  });

  it('word mappings should have valid book/chapter/verse', () => {
    for (const mapping of EXTENDED_WORD_STRONGS_V15) {
      expect(mapping.book).toBeGreaterThanOrEqual(1);
      expect(mapping.book).toBeLessThanOrEqual(66);
      expect(mapping.chapter).toBeGreaterThanOrEqual(1);
      expect(mapping.verse).toBeGreaterThanOrEqual(1);
      expect(mapping.word).toBeTruthy();
    }
  });

  it('should cover Music/Worship, Law/Torah, Family, Nature themes', () => {
    const defs = EXTENDED_STRONGS_V15.map(e => e.definition.toLowerCase());
    expect(defs.some(d => d.includes('praise') || d.includes('sing') || d.includes('worship'))).toBe(true);
    expect(defs.some(d => d.includes('law') || d.includes('commandment') || d.includes('torah'))).toBe(true);
    expect(defs.some(d => d.includes('family') || d.includes('house') || d.includes('brother'))).toBe(true);
    expect(defs.some(d => d.includes('seed') || d.includes('harvest') || d.includes('vine'))).toBe(true);
  });
});
