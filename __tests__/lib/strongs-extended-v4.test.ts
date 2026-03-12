import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V4, EXTENDED_WORD_MAPPINGS_V4 } from '../../scripts/strongs-extended-v4';

describe('Extended Strong\'s v4', () => {
  it('should have all required fields for each entry', () => {
    for (const entry of EXTENDED_STRONGS_V4) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('should have at least 30 entries', () => {
    expect(EXTENDED_STRONGS_V4.length).toBeGreaterThanOrEqual(30);
  });

  it('should have unique IDs', () => {
    const ids = EXTENDED_STRONGS_V4.map(e => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should have proper ID format (H/G prefix)', () => {
    for (const entry of EXTENDED_STRONGS_V4) {
      expect(entry.id).toMatch(/^[HG]/);
    }
  });

  it('should include Aramaic terms (stored as hebrew)', () => {
    const aramaicTerms = EXTENDED_STRONGS_V4.filter(e =>
      e.definition.toLowerCase().includes('aramaic')
    );
    expect(aramaicTerms.length).toBeGreaterThanOrEqual(3);
  });

  it('should include covenant/Torah vocabulary', () => {
    const covenantTerms = EXTENDED_STRONGS_V4.filter(e =>
      e.transliteration === 'torah' || e.transliteration === 'choq' || e.transliteration === 'mishpat'
    );
    expect(covenantTerms.length).toBeGreaterThanOrEqual(3);
  });

  it('should include Johannine theological terms', () => {
    const johannine = EXTENDED_STRONGS_V4.filter(e =>
      e.transliteration === 'paraklētos' || e.transliteration === 'monogenēs' || e.transliteration === 'kosmos'
    );
    expect(johannine.length).toBeGreaterThanOrEqual(3);
  });

  it('should include ecclesiological terms', () => {
    const ecclesia = EXTENDED_STRONGS_V4.filter(e =>
      e.transliteration === 'episkopos' || e.transliteration === 'diakonos' || e.transliteration === 'presbyteros'
    );
    expect(ecclesia.length).toBe(3);
  });

  it('should include eschatological terms', () => {
    const eschatology = EXTENDED_STRONGS_V4.filter(e =>
      e.transliteration === 'parousia' || e.transliteration === 'anastasis'
    );
    expect(eschatology.length).toBeGreaterThanOrEqual(2);
  });

  it('should have Hebrew and Greek entries', () => {
    const hebrew = EXTENDED_STRONGS_V4.filter(e => e.language === 'hebrew');
    const greek = EXTENDED_STRONGS_V4.filter(e => e.language === 'greek');
    expect(hebrew.length).toBeGreaterThan(5);
    expect(greek.length).toBeGreaterThan(5);
  });
});

describe('Extended Word Mappings v4', () => {
  it('should have valid tuple format [book, chapter, verse, word, strongsId, position]', () => {
    for (const mapping of EXTENDED_WORD_MAPPINGS_V4) {
      expect(mapping).toHaveLength(6);
      expect(typeof mapping[0]).toBe('number'); // book
      expect(typeof mapping[1]).toBe('number'); // chapter
      expect(typeof mapping[2]).toBe('number'); // verse
      expect(typeof mapping[3]).toBe('string'); // word
      expect(typeof mapping[4]).toBe('string'); // strongs_id
      expect(typeof mapping[5]).toBe('number'); // position
    }
  });

  it('should have at least 80 mappings', () => {
    expect(EXTENDED_WORD_MAPPINGS_V4.length).toBeGreaterThanOrEqual(80);
  });

  it('should reference valid book numbers (1-66)', () => {
    for (const [book] of EXTENDED_WORD_MAPPINGS_V4) {
      expect(book).toBeGreaterThanOrEqual(1);
      expect(book).toBeLessThanOrEqual(66);
    }
  });

  it('should include OT and NT mappings', () => {
    const ot = EXTENDED_WORD_MAPPINGS_V4.filter(m => m[0] <= 39);
    const nt = EXTENDED_WORD_MAPPINGS_V4.filter(m => m[0] >= 40);
    expect(ot.length).toBeGreaterThan(10);
    expect(nt.length).toBeGreaterThan(10);
  });

  it('should include Daniel mappings (Aramaic passages)', () => {
    const daniel = EXTENDED_WORD_MAPPINGS_V4.filter(m => m[0] === 27);
    expect(daniel.length).toBeGreaterThanOrEqual(4);
  });

  it('should include John prologue mappings (John 1:1-5)', () => {
    const johnPrologue = EXTENDED_WORD_MAPPINGS_V4.filter(
      m => m[0] === 43 && m[1] === 1 && m[2] <= 5
    );
    expect(johnPrologue.length).toBeGreaterThanOrEqual(4);
  });

  it('should include Paraclete references (John 14-16)', () => {
    const paraclete = EXTENDED_WORD_MAPPINGS_V4.filter(
      m => m[4] === 'G3875'
    );
    expect(paraclete.length).toBeGreaterThanOrEqual(3);
  });
});
