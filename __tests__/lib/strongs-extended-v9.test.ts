import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V9, EXTENDED_WORD_STRONGS_V9 } from '../../scripts/strongs-extended-v9';

describe('Strong\'s Extended v9 — Worship, Prophecy, Nature, Suffering', () => {
  it('should have at least 30 new entries', () => {
    expect(EXTENDED_STRONGS_V9.length).toBeGreaterThanOrEqual(30);
  });

  it('every entry has required fields', () => {
    for (const entry of EXTENDED_STRONGS_V9) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('IDs follow H/G prefix convention', () => {
    for (const entry of EXTENDED_STRONGS_V9) {
      expect(entry.id).toMatch(/^[HG]\d+[a-z]?$/);
    }
  });

  it('has both Hebrew and Greek entries', () => {
    const hebrew = EXTENDED_STRONGS_V9.filter(e => e.language === 'hebrew');
    const greek = EXTENDED_STRONGS_V9.filter(e => e.language === 'greek');
    expect(hebrew.length).toBeGreaterThan(5);
    expect(greek.length).toBeGreaterThan(5);
  });

  it('no duplicate IDs within v9', () => {
    const ids = EXTENDED_STRONGS_V9.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has worship/praise entries', () => {
    const worship = EXTENDED_STRONGS_V9.filter(e =>
      e.definition.toLowerCase().includes('praise') ||
      e.definition.toLowerCase().includes('worship')
    );
    expect(worship.length).toBeGreaterThan(3);
  });

  it('has prophecy/eschatology entries', () => {
    const prophecy = EXTENDED_STRONGS_V9.filter(e =>
      e.definition.toLowerCase().includes('prophe') ||
      e.definition.toLowerCase().includes('revelation') ||
      e.definition.toLowerCase().includes('eschatol')
    );
    expect(prophecy.length).toBeGreaterThan(2);
  });

  it('word mappings reference valid Strong\'s IDs from v9', () => {
    const v9Ids = new Set(EXTENDED_STRONGS_V9.map(e => e.id));
    for (const [,,,,sid] of EXTENDED_WORD_STRONGS_V9) {
      expect(v9Ids.has(sid)).toBe(true);
    }
  });

  it('word mappings have valid book/chapter/verse ranges', () => {
    for (const [book, ch, v, word, sid, pos] of EXTENDED_WORD_STRONGS_V9) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
      expect(ch).toBeGreaterThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(word).toBeTruthy();
      expect(pos).toBeGreaterThanOrEqual(1);
    }
  });
});
