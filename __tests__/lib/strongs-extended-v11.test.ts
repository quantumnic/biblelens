import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V11, EXTENDED_WORD_STRONGS_V11 } from '../../scripts/strongs-extended-v11';

describe("Strong's Extended v11 — Prayer, Worship, Kingship, Wisdom, Judgment, Healing", () => {
  it('should have at least 30 new entries', () => {
    expect(EXTENDED_STRONGS_V11.length).toBeGreaterThanOrEqual(30);
  });

  it('every entry has required fields', () => {
    for (const entry of EXTENDED_STRONGS_V11) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('IDs follow H/G prefix convention', () => {
    for (const entry of EXTENDED_STRONGS_V11) {
      expect(entry.id).toMatch(/^[HG]\d+[a-z]?$/);
    }
  });

  it('has both Hebrew and Greek entries', () => {
    const hebrew = EXTENDED_STRONGS_V11.filter(e => e.language === 'hebrew');
    const greek = EXTENDED_STRONGS_V11.filter(e => e.language === 'greek');
    expect(hebrew.length).toBeGreaterThan(5);
    expect(greek.length).toBeGreaterThan(5);
  });

  it('no duplicate IDs within v11', () => {
    const ids = EXTENDED_STRONGS_V11.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('covers prayer/worship theme', () => {
    const prayerIds = ['H8605', 'H7812', 'H1984', 'G4335', 'G4352'];
    for (const id of prayerIds) {
      expect(EXTENDED_STRONGS_V11.find(e => e.id === id)).toBeDefined();
    }
  });

  it('covers kingship/authority theme', () => {
    const kingIds = ['H4428', 'G935', 'G1849', 'G2362'];
    for (const id of kingIds) {
      expect(EXTENDED_STRONGS_V11.find(e => e.id === id)).toBeDefined();
    }
  });

  it('covers wisdom/instruction theme', () => {
    const wisdomIds = ['H998', 'H4148', 'G4678', 'G1108'];
    for (const id of wisdomIds) {
      expect(EXTENDED_STRONGS_V11.find(e => e.id === id)).toBeDefined();
    }
  });

  it('covers judgment/justice theme', () => {
    const justiceIds = ['H6664', 'H8199', 'G2920', 'G1343'];
    for (const id of justiceIds) {
      expect(EXTENDED_STRONGS_V11.find(e => e.id === id)).toBeDefined();
    }
  });

  it('covers healing/miracles theme', () => {
    const healingIds = ['G2323', 'G4592', 'G1411', 'G5059'];
    for (const id of healingIds) {
      expect(EXTENDED_STRONGS_V11.find(e => e.id === id)).toBeDefined();
    }
  });

  it('word mappings reference valid Strong IDs', () => {
    const validIds = new Set(EXTENDED_STRONGS_V11.map(e => e.id));
    for (const mapping of EXTENDED_WORD_STRONGS_V11) {
      expect(validIds.has(mapping.strongs_id)).toBe(true);
    }
  });

  it('word mappings have valid book/chapter/verse', () => {
    for (const m of EXTENDED_WORD_STRONGS_V11) {
      expect(m.book).toBeGreaterThanOrEqual(1);
      expect(m.book).toBeLessThanOrEqual(66);
      expect(m.chapter).toBeGreaterThanOrEqual(1);
      expect(m.verse).toBeGreaterThanOrEqual(1);
      expect(m.word).toBeTruthy();
    }
  });

  it('has at least 30 word mappings', () => {
    expect(EXTENDED_WORD_STRONGS_V11.length).toBeGreaterThanOrEqual(30);
  });
});
