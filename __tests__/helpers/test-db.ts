import Database from 'better-sqlite3';

export function createTestDb(): Database.Database {
  const db = new Database(':memory:');
  db.pragma('journal_mode = WAL');

  // Create schema
  db.exec(`
    CREATE TABLE IF NOT EXISTS verses (
      id INTEGER PRIMARY KEY,
      book INTEGER NOT NULL,
      chapter INTEGER NOT NULL,
      verse INTEGER NOT NULL,
      text TEXT NOT NULL,
      translation TEXT NOT NULL DEFAULT 'KJV'
    );
    CREATE INDEX idx_verses_ref ON verses(book, chapter, verse, translation);
    CREATE INDEX idx_verses_translation ON verses(translation);

    CREATE TABLE IF NOT EXISTS cross_references (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      from_book INTEGER NOT NULL,
      from_chapter INTEGER NOT NULL,
      from_verse_start INTEGER NOT NULL,
      from_verse_end INTEGER NOT NULL,
      to_book INTEGER NOT NULL,
      to_chapter INTEGER NOT NULL,
      to_verse_start INTEGER NOT NULL,
      to_verse_end INTEGER NOT NULL,
      votes INTEGER DEFAULT 0,
      category TEXT DEFAULT 'thematic'
    );
    CREATE INDEX idx_crossref_from ON cross_references(from_book, from_chapter, from_verse_start);
    CREATE INDEX idx_crossref_to ON cross_references(to_book, to_chapter, to_verse_start);

    CREATE TABLE IF NOT EXISTS strongs (
      id TEXT PRIMARY KEY,
      original TEXT NOT NULL,
      transliteration TEXT NOT NULL,
      definition TEXT NOT NULL,
      language TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS word_strongs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      book INTEGER NOT NULL,
      chapter INTEGER NOT NULL,
      verse INTEGER NOT NULL,
      word TEXT NOT NULL,
      strongs_id TEXT NOT NULL,
      position INTEGER DEFAULT 0
    );
    CREATE INDEX idx_ws_verse ON word_strongs(book, chapter, verse);
    CREATE INDEX idx_ws_strongs ON word_strongs(strongs_id);

    CREATE TABLE IF NOT EXISTS word_provenance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      language TEXT NOT NULL,
      lemma TEXT NOT NULL,
      definition TEXT NOT NULL,
      etymology TEXT,
      proto_root TEXT,
      first_occurrence TEXT,
      parent_word_id INTEGER,
      manuscript_sources TEXT DEFAULT '[]',
      textual_variants TEXT DEFAULT '[]',
      academic_refs TEXT DEFAULT '{}',
      logeion_url TEXT,
      perseus_url TEXT,
      part_of_speech TEXT
    );

    CREATE TABLE IF NOT EXISTS latin_words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL,
      lemma TEXT NOT NULL UNIQUE,
      definition TEXT,
      part_of_speech TEXT,
      etymology TEXT,
      occurrences INTEGER DEFAULT 0,
      provenance_id INTEGER
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS verses_fts USING fts5(text, content='verses', content_rowid='id');
  `);

  return db;
}

export function seedTestDb(db: Database.Database): void {
  // Seed verses
  const insertVerse = db.prepare(
    'INSERT INTO verses (book, chapter, verse, text, translation) VALUES (?, ?, ?, ?, ?)'
  );

  const verses = [
    [1, 1, 1, 'In the beginning God created the heaven and the earth.', 'KJV'],
    [1, 1, 2, 'And the earth was without form, and void; and darkness was upon the face of the deep.', 'KJV'],
    [1, 1, 3, 'And God said, Let there be light: and there was light.', 'KJV'],
    [1, 1, 1, 'In the beginning God created the heavens and the earth.', 'ASV'],
    [1, 1, 1, 'in principio creavit Deus caelum et terram', 'VUL'],
    [43, 3, 16, 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.', 'KJV'],
    [43, 3, 16, 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth on him should not perish, but have eternal life.', 'ASV'],
    [19, 23, 1, 'The LORD is my shepherd; I shall not want.', 'KJV'],
    [45, 8, 28, 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.', 'KJV'],
    [50, 4, 13, 'I can do all things through Christ which strengtheneth me.', 'KJV'],
  ];

  db.transaction(() => {
    for (const v of verses) {
      insertVerse.run(...v);
    }
  })();

  // Rebuild FTS index
  db.exec(`INSERT INTO verses_fts(verses_fts) VALUES('rebuild')`);

  // Seed cross-references
  const insertXref = db.prepare(
    'INSERT INTO cross_references (from_book, from_chapter, from_verse_start, from_verse_end, to_book, to_chapter, to_verse_start, to_verse_end, votes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    insertXref.run(43, 3, 16, 16, 45, 5, 8, 8, 100);
    insertXref.run(1, 1, 1, 1, 43, 1, 1, 1, 50);
    insertXref.run(19, 23, 1, 1, 43, 10, 11, 11, 30);
  })();

  // Seed Strong's
  const insertStrong = db.prepare(
    'INSERT INTO strongs (id, original, transliteration, definition, language) VALUES (?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    insertStrong.run('G26', 'ἀγάπη', 'agapē', 'Love, affection, good will', 'greek');
    insertStrong.run('H430', 'אֱלֹהִים', 'elohim', 'God, gods, judges', 'hebrew');
    insertStrong.run('H1254', 'בָּרָא', 'bara', 'To create, shape, form', 'hebrew');
    insertStrong.run('G2316', 'θεός', 'theos', 'God, the supreme Deity', 'greek');
    insertStrong.run('G3056', 'λόγος', 'logos', 'Word, speech, reason', 'greek');
  })();

  // Seed word-strongs mappings
  const insertWS = db.prepare(
    'INSERT INTO word_strongs (book, chapter, verse, word, strongs_id, position) VALUES (?, ?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    insertWS.run(1, 1, 1, 'God', 'H430', 4);
    insertWS.run(1, 1, 1, 'created', 'H1254', 5);
    insertWS.run(43, 3, 16, 'God', 'G2316', 2);
    insertWS.run(43, 3, 16, 'loved', 'G26', 4);
  })();

  // Seed word provenance
  const insertProv = db.prepare(`INSERT INTO word_provenance
    (word, language, lemma, definition, etymology, proto_root, first_occurrence,
     parent_word_id, manuscript_sources, textual_variants, academic_refs,
     logeion_url, perseus_url, part_of_speech)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  db.transaction(() => {
    insertProv.run('אהבה', 'hebrew', 'ahavah', 'Love, affection', 'From root א-ה-ב', '*ʔhb', 'Genesis 29:20', null, '["MT","DSS"]', '[]', '{"BDB":"p.12"}', null, null, 'noun');
    insertProv.run('ἀγάπη', 'greek', 'agape', 'Love, charity', 'From ἀγαπάω', null, 'Septuagint', 1, '["P46","Sinaiticus"]', '[]', '{"BDAG":"p.5"}', 'https://logeion.uchicago.edu/agape', null, 'noun');
    insertProv.run('amor', 'latin', 'amor', 'Love, desire', 'From PIE *h₂em-', '*h₂em-', 'Ennius', 2, '["Codex Amiatinus"]', '["caritas"]', '{"OLD":"p.120"}', 'https://logeion.uchicago.edu/amor', 'https://perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.04.0059:entry=amor', 'noun');
  })();

  // Seed latin_words
  const insertLatin = db.prepare(
    'INSERT OR IGNORE INTO latin_words (word, lemma, definition, part_of_speech, etymology, occurrences, provenance_id) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );
  db.transaction(() => {
    insertLatin.run('amor', 'amor', 'Love, desire', 'noun', 'From PIE *h₂em-', 42, 3);
  })();
}
