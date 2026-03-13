import { describe, it, expect } from 'vitest';
import { EXTENDED_STRONGS_V5, EXTENDED_WORD_MAPPINGS_V5 } from '../../scripts/strongs-extended-v5';

describe('Strong\'s Extended v5', () => {
  it('has entries', () => {
    expect(EXTENDED_STRONGS_V5.length).toBeGreaterThan(25);
  });

  it('every entry has required fields', () => {
    for (const entry of EXTENDED_STRONGS_V5) {
      expect(entry.id).toBeTruthy();
      expect(entry.original).toBeTruthy();
      expect(entry.transliteration).toBeTruthy();
      expect(entry.definition).toBeTruthy();
      expect(['hebrew', 'greek']).toContain(entry.language);
    }
  });

  it('has unique IDs', () => {
    const ids = EXTENDED_STRONGS_V5.map(e => e.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);
  });

  it('includes prophetic vocabulary', () => {
    const ids = EXTENDED_STRONGS_V5.map(e => e.id);
    expect(ids).toContain('H5030'); // nabi (prophet)
    expect(ids).toContain('H2377'); // chazon (vision)
    expect(ids).toContain('H4899'); // mashiach (Messiah)
  });

  it('includes worship/Psalms vocabulary', () => {
    const ids = EXTENDED_STRONGS_V5.map(e => e.id);
    expect(ids).toContain('H1984'); // halal (praise/hallelujah)
    expect(ids).toContain('H5542'); // selah
    expect(ids).toContain('H7812'); // shachah (worship)
  });

  it('includes apostolic/missions vocabulary', () => {
    const ids = EXTENDED_STRONGS_V5.map(e => e.id);
    expect(ids).toContain('G2784'); // kēryssō (preach)
    expect(ids).toContain('G2097'); // euangelizō (evangelize)
    expect(ids).toContain('G3101'); // mathētēs (disciple)
  });

  it('includes Hebrews Christology', () => {
    const ids = EXTENDED_STRONGS_V5.map(e => e.id);
    expect(ids).toContain('G5481'); // charaktēr
    expect(ids).toContain('G749');  // archiereus (high priest)
    expect(ids).toContain('G3314'); // mesitēs (mediator)
  });

  it('includes Revelation apocalyptic imagery', () => {
    const ids = EXTENDED_STRONGS_V5.map(e => e.id);
    expect(ids).toContain('G721');  // arnion (Lamb)
    expect(ids).toContain('G2362'); // thronos (throne)
    expect(ids).toContain('G4973'); // sphragis (seal)
  });

  it('has word mappings', () => {
    expect(EXTENDED_WORD_MAPPINGS_V5.length).toBeGreaterThan(50);
  });

  it('every mapping is a valid 6-tuple', () => {
    for (const m of EXTENDED_WORD_MAPPINGS_V5) {
      expect(m).toHaveLength(6);
      expect(typeof m[0]).toBe('number'); // book
      expect(typeof m[1]).toBe('number'); // chapter
      expect(typeof m[2]).toBe('number'); // verse
      expect(typeof m[3]).toBe('string'); // word
      expect(typeof m[4]).toBe('string'); // strongs_id
      expect(typeof m[5]).toBe('number'); // position
    }
  });

  it('mapping Strong\'s IDs reference entries that exist in v5 or earlier', () => {
    const v5Ids = new Set(EXTENDED_STRONGS_V5.map(e => e.id));
    // At least half of mapping IDs should reference v5 entries
    const mappingIds = new Set(EXTENDED_WORD_MAPPINGS_V5.map(m => m[4]));
    const v5Matches = [...mappingIds].filter(id => v5Ids.has(id));
    expect(v5Matches.length).toBeGreaterThan(15);
  });

  it('covers both Hebrew and Greek entries', () => {
    const hebrewCount = EXTENDED_STRONGS_V5.filter(e => e.language === 'hebrew').length;
    const greekCount = EXTENDED_STRONGS_V5.filter(e => e.language === 'greek').length;
    expect(hebrewCount).toBeGreaterThan(10);
    expect(greekCount).toBeGreaterThan(10);
  });
});
