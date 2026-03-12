/** Core verse from the database */
export interface Verse {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

/** Cross-reference entry */
export interface CrossReference {
  id: number;
  from_book: number;
  from_chapter: number;
  from_verse_start: number;
  from_verse_end: number;
  to_book: number;
  to_chapter: number;
  to_verse_start: number;
  to_verse_end: number;
  votes: number;
  category: string;
}

/** Strong's concordance entry */
export interface StrongsEntry {
  id: string;
  original: string;
  transliteration: string;
  definition: string;
  language: 'hebrew' | 'greek';
}

/** Word-Strong's mapping */
export interface WordStrongs {
  id: number;
  book: number;
  chapter: number;
  verse: number;
  word: string;
  strongs_id: string;
  position: number;
}

/** Word provenance / etymology chain */
export interface WordProvenance {
  id: number;
  word: string;
  language: string;
  lemma: string;
  definition: string;
  etymology: string | null;
  proto_root: string | null;
  first_occurrence: string | null;
  parent_word_id: number | null;
  manuscript_sources: string; // JSON array
  textual_variants: string; // JSON array
  academic_refs: string; // JSON object
  logeion_url: string | null;
  perseus_url: string | null;
  part_of_speech: string | null;
}

/** Latin word entry */
export interface LatinWord {
  id: number;
  word: string;
  lemma: string;
  definition: string | null;
  part_of_speech: string | null;
  etymology: string | null;
  occurrences: number;
  provenance_id: number | null;
}

/** Bible book info */
export interface BookInfo {
  id: number;
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'OT' | 'NT';
}
