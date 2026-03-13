import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V7, EXTENDED_WORD_STRONGS_V7 } from '../../scripts/strongs-extended-v7';

describe('Extended Strong\'s v7', () => {
  it('should export non-empty arrays', () => {
    expect(EXTENDED_STRONGS_V7.length).toBeGreaterThan(0);
    expect(EXTENDED_WORD_STRONGS_V7.length).toBeGreaterThan(0);
  });

  it('should have valid Strong\'s entries with required fields', () => {
    for (const entry of EXTENDED_STRONGS_V7) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('should have unique IDs', () => {
    const ids = EXTENDED_STRONGS_V7.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('should have valid word-verse mappings', () => {
    for (const [book, ch, v, word, sid, pos] of EXTENDED_WORD_STRONGS_V7) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
      expect(ch).toBeGreaterThanOrEqual(1);
      expect(v).toBeGreaterThanOrEqual(1);
      expect(word).toBeTruthy();
      expect(sid).toBeTruthy();
      expect(pos).toBeGreaterThanOrEqual(0);
    }
  });

  it('should include creation vocabulary (H1254 bara)', () => {
    const bara = EXTENDED_STRONGS_V7.find(e => e.id === 'H1254');
    expect(bara).toBeDefined();
    expect(bara!.transliteration).toBe('bara');
  });

  it('should include apocalyptic vocabulary (G602 apokalupsis)', () => {
    const apok = EXTENDED_STRONGS_V7.find(e => e.id === 'G602');
    expect(apok).toBeDefined();
    expect(apok!.transliteration).toBe('apokalupsis');
  });

  it('should include worship vocabulary', () => {
    const halal = EXTENDED_STRONGS_V7.find(e => e.id === 'H1984');
    const proskuneo = EXTENDED_STRONGS_V7.find(e => e.id === 'G4352');
    expect(halal).toBeDefined();
    expect(proskuneo).toBeDefined();
  });

  it('should have at least 30 entries', () => {
    expect(EXTENDED_STRONGS_V7.length).toBeGreaterThanOrEqual(30);
  });

  it('should have at least 30 word mappings', () => {
    expect(EXTENDED_WORD_STRONGS_V7.length).toBeGreaterThanOrEqual(30);
  });
});
