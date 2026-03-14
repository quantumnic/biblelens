import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V12, EXTENDED_WORD_STRONGS_V12 } from '../../scripts/strongs-extended-v12';

describe('Extended Strongs v12', () => {
  it('should have entries', () => {
    expect(EXTENDED_STRONGS_V12.length).toBeGreaterThanOrEqual(30);
  });

  it('should have unique ids', () => {
    const ids = EXTENDED_STRONGS_V12.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('each entry should have required fields', () => {
    for (const entry of EXTENDED_STRONGS_V12) {
      expect(entry.id).toMatch(/^[HG]\d+$/);
      expect(entry.original.length).toBeGreaterThan(0);
      expect(entry.transliteration.length).toBeGreaterThan(0);
      expect(entry.definition.length).toBeGreaterThan(0);
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('should have word mappings', () => {
    expect(EXTENDED_WORD_STRONGS_V12.length).toBeGreaterThan(0);
    for (const m of EXTENDED_WORD_STRONGS_V12) {
      expect(m.book).toBeGreaterThan(0);
      expect(m.chapter).toBeGreaterThan(0);
      expect(m.verse).toBeGreaterThan(0);
      expect(m.word.length).toBeGreaterThan(0);
      expect(m.strongs_id).toMatch(/^[HG]\d+$/);
    }
  });

  it('all mapping strongs_ids should exist in definitions', () => {
    const definedIds = new Set(EXTENDED_STRONGS_V12.map(e => e.id));
    for (const m of EXTENDED_WORD_STRONGS_V12) {
      expect(definedIds.has(m.strongs_id)).toBe(true);
    }
  });
});
