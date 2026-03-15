import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V13, EXTENDED_WORD_STRONGS_V13 } from '../../scripts/strongs-extended-v13';

describe('strongs-extended-v13', () => {
  it('should have entries', () => {
    expect(EXTENDED_STRONGS_V13.length).toBeGreaterThan(30);
  });

  it('each entry should have required fields', () => {
    for (const entry of EXTENDED_STRONGS_V13) {
      expect(entry.id).toMatch(/^[HG]\d+$/);
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('should have no duplicate IDs', () => {
    const ids = EXTENDED_STRONGS_V13.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('word mappings should reference valid strongs IDs', () => {
    const ids = new Set(EXTENDED_STRONGS_V13.map(e => e.id));
    for (const m of EXTENDED_WORD_STRONGS_V13) {
      expect(ids.has(m.strongs_id)).toBe(true);
      expect(m.book).toBeGreaterThan(0);
      expect(m.chapter).toBeGreaterThan(0);
      expect(m.verse).toBeGreaterThan(0);
      expect(m.word).toBeTruthy();
    }
  });

  it('should cover priesthood, kingship, and wisdom themes', () => {
    const defs = EXTENDED_STRONGS_V13.map(e => e.definition.toLowerCase()).join(' ');
    expect(defs).toContain('priest');
    expect(defs).toContain('king');
    expect(defs).toContain('wisdom');
    expect(defs).toContain('temple');
    expect(defs).toContain('throne');
  });
});
