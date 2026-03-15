import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V16, EXTENDED_WORD_STRONGS_V16 } from '../../scripts/strongs-extended-v16';

describe('Extended Strongs V16', () => {
  it('should have entries', () => {
    expect(EXTENDED_STRONGS_V16.length).toBeGreaterThan(0);
  });

  it('all entries should have required fields', () => {
    for (const entry of EXTENDED_STRONGS_V16) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('all IDs should be unique', () => {
    const ids = EXTENDED_STRONGS_V16.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('Hebrew entries should start with H', () => {
    const hebrewEntries = EXTENDED_STRONGS_V16.filter(e => e.language === 'hebrew');
    expect(hebrewEntries.length).toBeGreaterThan(0);
    for (const entry of hebrewEntries) {
      expect(entry.id).toMatch(/^H\d+$/);
    }
  });

  it('Greek entries should start with G', () => {
    const greekEntries = EXTENDED_STRONGS_V16.filter(e => e.language === 'greek');
    expect(greekEntries.length).toBeGreaterThan(0);
    for (const entry of greekEntries) {
      expect(entry.id).toMatch(/^G\d+$/);
    }
  });

  it('should have word-strongs mappings', () => {
    expect(EXTENDED_WORD_STRONGS_V16.length).toBeGreaterThan(0);
  });

  it('all word mappings should reference valid strongs IDs', () => {
    const validIds = new Set(EXTENDED_STRONGS_V16.map(e => e.id));
    for (const mapping of EXTENDED_WORD_STRONGS_V16) {
      expect(validIds.has(mapping.strongs_id)).toBe(true);
    }
  });

  it('all word mappings should have valid book numbers', () => {
    for (const mapping of EXTENDED_WORD_STRONGS_V16) {
      expect(mapping.book).toBeGreaterThanOrEqual(1);
      expect(mapping.book).toBeLessThanOrEqual(66);
    }
  });

  it('should cover emotions, warfare, clothing, food, and numbers categories', () => {
    const defs = EXTENDED_STRONGS_V16.map(e => e.definition.toLowerCase());
    const hasEmotion = defs.some(d => d.includes('joy') || d.includes('grief') || d.includes('sorrow'));
    const hasWarfare = defs.some(d => d.includes('war') || d.includes('sword') || d.includes('shield'));
    const hasClothing = defs.some(d => d.includes('garment') || d.includes('linen') || d.includes('robe'));
    const hasFood = defs.some(d => d.includes('bread') || d.includes('wine') || d.includes('honey'));
    const hasNumbers = defs.some(d => d.includes('seven') || d.includes('twelve') || d.includes('forty'));
    expect(hasEmotion).toBe(true);
    expect(hasWarfare).toBe(true);
    expect(hasClothing).toBe(true);
    expect(hasFood).toBe(true);
    expect(hasNumbers).toBe(true);
  });

  it('should have at least 45 entries', () => {
    expect(EXTENDED_STRONGS_V16.length).toBeGreaterThanOrEqual(45);
  });
});
