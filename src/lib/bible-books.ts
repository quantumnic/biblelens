export interface BookInfo {
  id: number;
  name: string;
  abbrev: string;
  testament: 'OT' | 'NT';
  chapters: number;
}

export const BIBLE_BOOKS: BookInfo[] = [
  { id: 1, name: 'Genesis', abbrev: 'Gen', testament: 'OT', chapters: 50 },
  { id: 2, name: 'Exodus', abbrev: 'Exod', testament: 'OT', chapters: 40 },
  { id: 3, name: 'Leviticus', abbrev: 'Lev', testament: 'OT', chapters: 27 },
  { id: 4, name: 'Numbers', abbrev: 'Num', testament: 'OT', chapters: 36 },
  { id: 5, name: 'Deuteronomy', abbrev: 'Deut', testament: 'OT', chapters: 34 },
  { id: 6, name: 'Joshua', abbrev: 'Josh', testament: 'OT', chapters: 24 },
  { id: 7, name: 'Judges', abbrev: 'Judg', testament: 'OT', chapters: 21 },
  { id: 8, name: 'Ruth', abbrev: 'Ruth', testament: 'OT', chapters: 4 },
  { id: 9, name: '1 Samuel', abbrev: '1Sam', testament: 'OT', chapters: 31 },
  { id: 10, name: '2 Samuel', abbrev: '2Sam', testament: 'OT', chapters: 24 },
  { id: 11, name: '1 Kings', abbrev: '1Kgs', testament: 'OT', chapters: 22 },
  { id: 12, name: '2 Kings', abbrev: '2Kgs', testament: 'OT', chapters: 25 },
  { id: 13, name: '1 Chronicles', abbrev: '1Chr', testament: 'OT', chapters: 29 },
  { id: 14, name: '2 Chronicles', abbrev: '2Chr', testament: 'OT', chapters: 36 },
  { id: 15, name: 'Ezra', abbrev: 'Ezra', testament: 'OT', chapters: 10 },
  { id: 16, name: 'Nehemiah', abbrev: 'Neh', testament: 'OT', chapters: 13 },
  { id: 17, name: 'Esther', abbrev: 'Esth', testament: 'OT', chapters: 10 },
  { id: 18, name: 'Job', abbrev: 'Job', testament: 'OT', chapters: 42 },
  { id: 19, name: 'Psalms', abbrev: 'Ps', testament: 'OT', chapters: 150 },
  { id: 20, name: 'Proverbs', abbrev: 'Prov', testament: 'OT', chapters: 31 },
  { id: 21, name: 'Ecclesiastes', abbrev: 'Eccl', testament: 'OT', chapters: 12 },
  { id: 22, name: 'Song of Solomon', abbrev: 'Song', testament: 'OT', chapters: 8 },
  { id: 23, name: 'Isaiah', abbrev: 'Isa', testament: 'OT', chapters: 66 },
  { id: 24, name: 'Jeremiah', abbrev: 'Jer', testament: 'OT', chapters: 52 },
  { id: 25, name: 'Lamentations', abbrev: 'Lam', testament: 'OT', chapters: 5 },
  { id: 26, name: 'Ezekiel', abbrev: 'Ezek', testament: 'OT', chapters: 48 },
  { id: 27, name: 'Daniel', abbrev: 'Dan', testament: 'OT', chapters: 12 },
  { id: 28, name: 'Hosea', abbrev: 'Hos', testament: 'OT', chapters: 14 },
  { id: 29, name: 'Joel', abbrev: 'Joel', testament: 'OT', chapters: 3 },
  { id: 30, name: 'Amos', abbrev: 'Amos', testament: 'OT', chapters: 9 },
  { id: 31, name: 'Obadiah', abbrev: 'Obad', testament: 'OT', chapters: 1 },
  { id: 32, name: 'Jonah', abbrev: 'Jonah', testament: 'OT', chapters: 4 },
  { id: 33, name: 'Micah', abbrev: 'Mic', testament: 'OT', chapters: 7 },
  { id: 34, name: 'Nahum', abbrev: 'Nah', testament: 'OT', chapters: 3 },
  { id: 35, name: 'Habakkuk', abbrev: 'Hab', testament: 'OT', chapters: 3 },
  { id: 36, name: 'Zephaniah', abbrev: 'Zeph', testament: 'OT', chapters: 3 },
  { id: 37, name: 'Haggai', abbrev: 'Hag', testament: 'OT', chapters: 2 },
  { id: 38, name: 'Zechariah', abbrev: 'Zech', testament: 'OT', chapters: 14 },
  { id: 39, name: 'Malachi', abbrev: 'Mal', testament: 'OT', chapters: 4 },
  { id: 40, name: 'Matthew', abbrev: 'Matt', testament: 'NT', chapters: 28 },
  { id: 41, name: 'Mark', abbrev: 'Mark', testament: 'NT', chapters: 16 },
  { id: 42, name: 'Luke', abbrev: 'Luke', testament: 'NT', chapters: 24 },
  { id: 43, name: 'John', abbrev: 'John', testament: 'NT', chapters: 21 },
  { id: 44, name: 'Acts', abbrev: 'Acts', testament: 'NT', chapters: 28 },
  { id: 45, name: 'Romans', abbrev: 'Rom', testament: 'NT', chapters: 16 },
  { id: 46, name: '1 Corinthians', abbrev: '1Cor', testament: 'NT', chapters: 16 },
  { id: 47, name: '2 Corinthians', abbrev: '2Cor', testament: 'NT', chapters: 13 },
  { id: 48, name: 'Galatians', abbrev: 'Gal', testament: 'NT', chapters: 6 },
  { id: 49, name: 'Ephesians', abbrev: 'Eph', testament: 'NT', chapters: 6 },
  { id: 50, name: 'Philippians', abbrev: 'Phil', testament: 'NT', chapters: 4 },
  { id: 51, name: 'Colossians', abbrev: 'Col', testament: 'NT', chapters: 4 },
  { id: 52, name: '1 Thessalonians', abbrev: '1Thess', testament: 'NT', chapters: 5 },
  { id: 53, name: '2 Thessalonians', abbrev: '2Thess', testament: 'NT', chapters: 3 },
  { id: 54, name: '1 Timothy', abbrev: '1Tim', testament: 'NT', chapters: 6 },
  { id: 55, name: '2 Timothy', abbrev: '2Tim', testament: 'NT', chapters: 4 },
  { id: 56, name: 'Titus', abbrev: 'Titus', testament: 'NT', chapters: 3 },
  { id: 57, name: 'Philemon', abbrev: 'Phlm', testament: 'NT', chapters: 1 },
  { id: 58, name: 'Hebrews', abbrev: 'Heb', testament: 'NT', chapters: 13 },
  { id: 59, name: 'James', abbrev: 'Jas', testament: 'NT', chapters: 5 },
  { id: 60, name: '1 Peter', abbrev: '1Pet', testament: 'NT', chapters: 5 },
  { id: 61, name: '2 Peter', abbrev: '2Pet', testament: 'NT', chapters: 3 },
  { id: 62, name: '1 John', abbrev: '1John', testament: 'NT', chapters: 5 },
  { id: 63, name: '2 John', abbrev: '2John', testament: 'NT', chapters: 1 },
  { id: 64, name: '3 John', abbrev: '3John', testament: 'NT', chapters: 1 },
  { id: 65, name: 'Jude', abbrev: 'Jude', testament: 'NT', chapters: 1 },
  { id: 66, name: 'Revelation', abbrev: 'Rev', testament: 'NT', chapters: 22 },
];

export function getBookById(id: number): BookInfo | undefined {
  return BIBLE_BOOKS.find(b => b.id === id);
}

export function getBookByName(name: string): BookInfo | undefined {
  const lower = name.toLowerCase();
  return BIBLE_BOOKS.find(b => 
    b.name.toLowerCase() === lower || 
    b.abbrev.toLowerCase() === lower
  );
}

export function getBookBySlug(slug: string): BookInfo | undefined {
  const lower = slug.toLowerCase().replace(/-/g, ' ');
  return BIBLE_BOOKS.find(b => 
    b.name.toLowerCase() === lower || 
    b.abbrev.toLowerCase() === lower ||
    b.name.toLowerCase().replace(/ /g, '-') === slug.toLowerCase()
  );
}
