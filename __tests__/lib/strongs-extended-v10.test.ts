import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V10, EXTENDED_WORD_STRONGS_V10 } from '../../scripts/strongs-extended-v10';

describe('Strong\'s Extended v10 — Law, Temple, Sacrifice, Angels, Covenant', () => {
  it('should have at least 30 new entries', () => {
    expect(EXTENDED_STRONGS_V10.length).toBeGreaterThanOrEqual(30);
  });

  it('every entry has required fields', () => {
    for (const entry of EXTENDED_STRONGS_V10) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('IDs follow H/G prefix convention', () => {
    for (const entry of EXTENDED_STRONGS_V10) {
      expect(entry.id).toMatch(/^[HG]\d+[a-z]?$/);
    }
  });

  it('has both Hebrew and Greek entries', () => {
    const hebrew = EXTENDED_STRONGS_V10.filter(e => e.language === 'hebrew');
    const greek = EXTENDED_STRONGS_V10.filter(e => e.language === 'greek');
    expect(hebrew.length).toBeGreaterThan(5);
    expect(greek.length).toBeGreaterThan(5);
  });

  it('no duplicate IDs within v10', () => {
    const ids = EXTENDED_STRONGS_V10.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has law/torah entries', () => {
    const law = EXTENDED_STRONGS_V10.filter(e =>
      e.definition.toLowerCase().includes('law') ||
      e.definition.toLowerCase().includes('commandment') ||
      e.definition.toLowerCase().includes('statute')
    );
    expect(law.length).toBeGreaterThan(2);
  });

  it('has temple/tabernacle entries', () => {
    const temple = EXTENDED_STRONGS_V10.filter(e =>
      e.definition.toLowerCase().includes('temple') ||
      e.definition.toLowerCase().includes('tabernacle') ||
      e.definition.toLowerCase().includes('sanctuary')
    );
    expect(temple.length).toBeGreaterThan(2);
  });

  it('has sacrifice/offering entries', () => {
    const sacrifice = EXTENDED_STRONGS_V10.filter(e =>
      e.definition.toLowerCase().includes('offering') ||
      e.definition.toLowerCase().includes('sacrifice')
    );
    expect(sacrifice.length).toBeGreaterThan(3);
  });

  it('has angel/spiritual being entries', () => {
    const angels = EXTENDED_STRONGS_V10.filter(e =>
      e.definition.toLowerCase().includes('angel') ||
      e.definition.toLowerCase().includes('seraph') ||
      e.definition.toLowerCase().includes('cherub') ||
      e.definition.toLowerCase().includes('spirit')
    );
    expect(angels.length).toBeGreaterThan(3);
  });

  it('word mappings reference valid Strong\'s IDs from v10', () => {
    const v10Ids = new Set(EXTENDED_STRONGS_V10.map(e => e.id));
    for (const m of EXTENDED_WORD_STRONGS_V10) {
      expect(v10Ids.has(m.strongs_id)).toBe(true);
    }
  });

  it('word mappings have valid book/chapter/verse ranges', () => {
    for (const m of EXTENDED_WORD_STRONGS_V10) {
      expect(m.book).toBeGreaterThanOrEqual(1);
      expect(m.book).toBeLessThanOrEqual(66);
      expect(m.chapter).toBeGreaterThanOrEqual(1);
      expect(m.verse).toBeGreaterThanOrEqual(1);
      expect(m.word).toBeTruthy();
    }
  });
});
