import { describe, it, expect } from 'vitest';
import { BIBLE_BOOKS, getBookById, getBookBySlug, BookInfo } from '@/lib/bible-books';

describe('bible-books', () => {
  it('should have 66 books', () => {
    expect(BIBLE_BOOKS).toHaveLength(66);
  });

  it('should have correct first book (Genesis)', () => {
    expect(BIBLE_BOOKS[0].name).toBe('Genesis');
    expect(BIBLE_BOOKS[0].id).toBe(1);
    expect(BIBLE_BOOKS[0].testament).toBe('OT');
    expect(BIBLE_BOOKS[0].chapters).toBe(50);
  });

  it('should have correct last book (Revelation)', () => {
    const last = BIBLE_BOOKS[65];
    expect(last.name).toBe('Revelation');
    expect(last.id).toBe(66);
    expect(last.testament).toBe('NT');
    expect(last.chapters).toBe(22);
  });

  it('should have 39 OT books and 27 NT books', () => {
    const ot = BIBLE_BOOKS.filter(b => b.testament === 'OT');
    const nt = BIBLE_BOOKS.filter(b => b.testament === 'NT');
    expect(ot).toHaveLength(39);
    expect(nt).toHaveLength(27);
  });

  it('getBookById returns correct book', () => {
    const genesis = getBookById(1);
    expect(genesis?.name).toBe('Genesis');
    const john = getBookById(43);
    expect(john?.name).toBe('John');
  });

  it('getBookById returns undefined for invalid id', () => {
    expect(getBookById(0)).toBeUndefined();
    expect(getBookById(67)).toBeUndefined();
    expect(getBookById(-1)).toBeUndefined();
  });

  it('getBookBySlug returns correct book', () => {
    expect(getBookBySlug('genesis')?.id).toBe(1);
    expect(getBookBySlug('song-of-solomon')?.id).toBe(22);
    expect(getBookBySlug('1-corinthians')?.id).toBe(46);
  });

  it('getBookBySlug returns undefined for invalid slug', () => {
    expect(getBookBySlug('nonexistent')).toBeUndefined();
    expect(getBookBySlug('')).toBeUndefined();
  });

  it('all books have valid chapter counts', () => {
    for (const book of BIBLE_BOOKS) {
      expect(book.chapters).toBeGreaterThan(0);
      expect(book.chapters).toBeLessThanOrEqual(150); // Psalms
    }
  });

  it('all books have unique ids', () => {
    const ids = BIBLE_BOOKS.map(b => b.id);
    expect(new Set(ids).size).toBe(66);
  });

  it('all books have unique slugs', () => {
    const slugs = BIBLE_BOOKS.map(b => b.name.toLowerCase().replace(/ /g, '-'));
    expect(new Set(slugs).size).toBe(66);
  });

  it('books are ordered by id', () => {
    for (let i = 1; i < BIBLE_BOOKS.length; i++) {
      expect(BIBLE_BOOKS[i].id).toBeGreaterThan(BIBLE_BOOKS[i - 1].id);
    }
  });

  it('all books have abbreviations', () => {
    for (const book of BIBLE_BOOKS) {
      expect(book.abbrev).toBeTruthy();
      expect(book.abbrev.length).toBeLessThanOrEqual(6);
    }
  });
});
