import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V8, EXTENDED_WORD_STRONGS_V8 } from '../../scripts/strongs-extended-v8';

describe('Extended Strong\'s v8', () => {
  it('should export non-empty arrays', () => {
    expect(EXTENDED_STRONGS_V8.length).toBeGreaterThan(0);
    expect(EXTENDED_WORD_STRONGS_V8.length).toBeGreaterThan(0);
  });

  it('should have valid Strong\'s entries with required fields', () => {
    for (const entry of EXTENDED_STRONGS_V8) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('should have unique IDs', () => {
    const ids = EXTENDED_STRONGS_V8.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have valid word-verse mappings', () => {
    for (const [book, ch, v, word, sid, pos] of EXTENDED_WORD_STRONGS_V8) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
      expect(ch).toBeGreaterThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(word).toBeTruthy();
      expect(sid).toBeTruthy();
      expect(pos).toBeGreaterThanOrEqual(0);
    }
  });

  it('should include Torah vocabulary (H8451 torah)', () => {
    const torah = EXTENDED_STRONGS_V8.find(e => e.id === 'H8451');
    expect(torah).toBeDefined();
    expect(torah!.transliteration).toBe('torah');
  });

  it('should include healing vocabulary (G2323 therapeuo)', () => {
    const heal = EXTENDED_STRONGS_V8.find(e => e.id === 'G2323');
    expect(heal).toBeDefined();
    expect(heal!.transliteration).toBe('therapeuo');
  });

  it('should include discipleship vocabulary (G3101 mathetes)', () => {
    const disc = EXTENDED_STRONGS_V8.find(e => e.id === 'G3101');
    expect(disc).toBeDefined();
    expect(disc!.transliteration).toBe('mathetes');
  });

  it('should include church/community vocabulary (G1577 ekklesia)', () => {
    const ekk = EXTENDED_STRONGS_V8.find(e => e.id === 'G1577');
    expect(ekk).toBeDefined();
    expect(ekk!.transliteration).toBe('ekklesia');
  });

  it('should have at least 33 entries', () => {
    expect(EXTENDED_STRONGS_V8.length).toBeGreaterThanOrEqual(33);
  });

  it('should have at least 40 word mappings', () => {
    expect(EXTENDED_WORD_STRONGS_V8.length).toBeGreaterThanOrEqual(40);
  });
});
