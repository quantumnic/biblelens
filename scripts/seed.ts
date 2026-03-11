import Database from 'better-sqlite3';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'bible.db');
const BASE_URL = 'https://raw.githubusercontent.com/scrollmapper/bible_databases/master/formats';

const BOOK_MAP: Record<string, number> = {
  'Genesis':1,'Exodus':2,'Leviticus':3,'Numbers':4,'Deuteronomy':5,
  'Joshua':6,'Judges':7,'Ruth':8,
  '1 Samuel':9,'I Samuel':9,'2 Samuel':10,'II Samuel':10,
  '1 Kings':11,'I Kings':11,'2 Kings':12,'II Kings':12,
  '1 Chronicles':13,'I Chronicles':13,'2 Chronicles':14,'II Chronicles':14,
  'Ezra':15,'Nehemiah':16,'Esther':17,'Job':18,'Psalms':19,'Psalm':19,
  'Proverbs':20,'Ecclesiastes':21,'Song of Solomon':22,'Song of Songs':22,
  'Isaiah':23,'Jeremiah':24,'Lamentations':25,'Ezekiel':26,'Daniel':27,
  'Hosea':28,'Joel':29,'Amos':30,'Obadiah':31,'Jonah':32,'Micah':33,
  'Nahum':34,'Habakkuk':35,'Zephaniah':36,'Haggai':37,'Zechariah':38,'Malachi':39,
  'Matthew':40,'Mark':41,'Luke':42,'John':43,'Acts':44,'Romans':45,
  '1 Corinthians':46,'I Corinthians':46,'2 Corinthians':47,'II Corinthians':47,
  'Galatians':48,'Ephesians':49,'Philippians':50,'Colossians':51,
  '1 Thessalonians':52,'I Thessalonians':52,'2 Thessalonians':53,'II Thessalonians':53,
  '1 Timothy':54,'I Timothy':54,'2 Timothy':55,'II Timothy':55,
  'Titus':56,'Philemon':57,'Hebrews':58,'James':59,
  '1 Peter':60,'I Peter':60,'2 Peter':61,'II Peter':61,
  '1 John':62,'I John':62,'2 John':63,'II John':63,'3 John':64,'III John':64,
  'Jude':65,'Revelation':66,'Revelation of John':66
};

interface ScrollmapperBible {
  translation: string;
  books: { name: string; chapters: { chapter: number; verses: { verse: number; text: string }[] }[] }[];
}

async function downloadBible(filename: string): Promise<ScrollmapperBible> {
  const url = `${BASE_URL}/json/${filename}`;
  console.log(`  Downloading ${url}...`);
  const { data } = await axios.get(url);
  return data;
}

function flattenBible(bible: ScrollmapperBible): { book: number; chapter: number; verse: number; text: string }[] {
  const result: { book: number; chapter: number; verse: number; text: string }[] = [];
  for (const bookData of bible.books) {
    const bookId = BOOK_MAP[bookData.name];
    if (!bookId) { console.log(`  Unknown book: ${bookData.name}, skipping`); continue; }
    for (const ch of bookData.chapters) {
      for (const v of ch.verses) {
        result.push({ book: bookId, chapter: ch.chapter, verse: v.verse, text: v.text });
      }
    }
  }
  return result;
}

async function main() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');

  // ── Schema ──────────────────────────────────────────────────
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
      position INTEGER NOT NULL
    );
    CREATE INDEX idx_word_strongs_ref ON word_strongs(book, chapter, verse);
    CREATE INDEX idx_word_strongs_id ON word_strongs(strongs_id);

    CREATE VIRTUAL TABLE IF NOT EXISTS verses_fts USING fts5(text, content=verses, content_rowid=id);

    -- Word Provenance: full etymology chain across languages
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
      manuscript_sources TEXT,
      textual_variants TEXT,
      academic_refs TEXT,
      logeion_url TEXT,
      perseus_url TEXT,
      part_of_speech TEXT,
      FOREIGN KEY (parent_word_id) REFERENCES word_provenance(id)
    );
    CREATE INDEX idx_provenance_lemma ON word_provenance(lemma);
    CREATE INDEX idx_provenance_language ON word_provenance(language);
    CREATE INDEX idx_provenance_word ON word_provenance(word);
    CREATE INDEX idx_provenance_parent ON word_provenance(parent_word_id);

    -- Latin words (quick lookup for Vulgata reader)
    CREATE TABLE IF NOT EXISTS latin_words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      word TEXT NOT NULL UNIQUE,
      lemma TEXT,
      definition TEXT,
      part_of_speech TEXT,
      etymology TEXT,
      occurrences INTEGER DEFAULT 0,
      provenance_id INTEGER,
      FOREIGN KEY (provenance_id) REFERENCES word_provenance(id)
    );
    CREATE INDEX idx_latin_words_lemma ON latin_words(lemma);

    -- Verse-level latin word positions
    CREATE TABLE IF NOT EXISTS verse_latin_words (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      verse_id INTEGER,
      word TEXT,
      position INTEGER,
      lemma TEXT
    );
    CREATE INDEX idx_vlw_verse ON verse_latin_words(verse_id);
    CREATE INDEX idx_vlw_word ON verse_latin_words(word);
  `);

  // ── Load Bible Translations ─────────────────────────────────
  const insertVerse = db.prepare('INSERT INTO verses (id, book, chapter, verse, text, translation) VALUES (?, ?, ?, ?, ?, ?)');

  const insertBible = db.transaction((verses: { book: number; chapter: number; verse: number; text: string }[], translation: string, idOffset: number) => {
    for (const v of verses) {
      const id = idOffset + v.book * 1000000 + v.chapter * 1000 + v.verse;
      insertVerse.run(id, v.book, v.chapter, v.verse, v.text, translation);
    }
  });

  const translations: { file: string; name: string; offset: number }[] = [
    { file: 'KJV.json', name: 'KJV', offset: 0 },
    { file: 'ASV.json', name: 'ASV', offset: 100000000 },
    { file: 'BBE.json', name: 'WEB', offset: 200000000 },
    { file: 'YLT.json', name: 'YLT', offset: 300000000 },
    { file: 'Vulgate.json', name: 'VUL', offset: 400000000 },
  ];

  for (const t of translations) {
    try {
      console.log(`Loading ${t.name}...`);
      const bible = await downloadBible(t.file);
      const flat = flattenBible(bible);
      console.log(`  ${t.name}: ${flat.length} verses`);
      insertBible(flat, t.name, t.offset);
      console.log(`  ${t.name} loaded.`);
    } catch (e: any) {
      console.log(`  ${t.name} failed: ${e.message}`);
    }
  }

  // Build FTS index
  console.log('Building full-text search index...');
  db.exec(`INSERT INTO verses_fts(rowid, text) SELECT id, text FROM verses`);

  // ── Cross-references ────────────────────────────────────────
  console.log('Loading cross-references...');
  try {
    const insertXref = db.prepare(`INSERT INTO cross_references
      (from_book, from_chapter, from_verse_start, from_verse_end, to_book, to_chapter, to_verse_start, to_verse_end, votes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`);

    let xrefCount = 0;
    const parseXrefSql = (sql: string): number => {
      let count = 0;
      const regex = /VALUES\s*\('([^']+)',\s*(\d+),\s*(\d+),\s*'([^']+)',\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/gi;
      let match;
      while ((match = regex.exec(sql)) !== null) {
        const fb = BOOK_MAP[match[1]], tb = BOOK_MAP[match[4]];
        if (fb && tb) {
          insertXref.run(fb, parseInt(match[2]), parseInt(match[3]), parseInt(match[3]),
            tb, parseInt(match[5]), parseInt(match[6]), parseInt(match[7]) || parseInt(match[6]), parseInt(match[8]) || 0);
          count++;
        }
      }
      return count;
    };
    const batchInsert = db.transaction((sql: string) => parseXrefSql(sql));

    for (let i = 0; i <= 6; i++) {
      try {
        const { data: sqlText } = await axios.get(`${BASE_URL}/sql/extras/cross_references_${i}.sql`, { responseType: 'text' });
        const c = batchInsert(sqlText);
        xrefCount += c;
        console.log(`  Loaded ${c} cross-references from file ${i}. Total: ${xrefCount}`);
      } catch { console.log(`  Cross-references file ${i} not found.`); }
    }
  } catch (e: any) {
    console.log(`  Cross-references loading failed: ${e.message}`);
  }

  // ── Strong's Concordance ────────────────────────────────────
  console.log("Seeding Strong's concordance...");
  const strongsData = [
    { id: 'H430', original: 'אֱלֹהִים', transliteration: 'Elohim', definition: 'God, gods, judges, angels — the supreme God', language: 'hebrew' },
    { id: 'H3068', original: 'יְהוָה', transliteration: 'YHWH / Yahweh', definition: 'The proper name of the God of Israel, the self-Existent or Eternal', language: 'hebrew' },
    { id: 'H1254', original: 'בָּרָא', transliteration: 'bara', definition: 'To create, shape, form — always with God as subject', language: 'hebrew' },
    { id: 'H776', original: 'אֶרֶץ', transliteration: 'erets', definition: 'Earth, land, ground, country, territory', language: 'hebrew' },
    { id: 'H8064', original: 'שָׁמַיִם', transliteration: 'shamayim', definition: 'Heaven, heavens, sky — the visible heavens, the abode of God', language: 'hebrew' },
    { id: 'H1', original: 'אָב', transliteration: 'ab', definition: 'Father, chief, principal, ancestor, originator', language: 'hebrew' },
    { id: 'H157', original: 'אָהַב', transliteration: 'ahab', definition: 'To love, to be a friend; human love for another, love of God', language: 'hebrew' },
    { id: 'H1285', original: 'בְּרִית', transliteration: 'berith', definition: 'Covenant, alliance, pledge', language: 'hebrew' },
    { id: 'H2617', original: 'חֶסֶד', transliteration: 'chesed', definition: 'Lovingkindness, mercy, goodness, faithfulness — covenant loyalty', language: 'hebrew' },
    { id: 'H3444', original: 'יְשׁוּעָה', transliteration: 'yeshuah', definition: 'Salvation, deliverance, rescue, safety, welfare', language: 'hebrew' },
    { id: 'H4899', original: 'מָשִׁיחַ', transliteration: 'mashiach', definition: 'Anointed, Messiah — the anointed one', language: 'hebrew' },
    { id: 'H7307', original: 'רוּחַ', transliteration: 'ruach', definition: 'Wind, breath, mind, spirit — the Spirit of God', language: 'hebrew' },
    { id: 'H7965', original: 'שָׁלוֹם', transliteration: 'shalom', definition: 'Peace, completeness, welfare, soundness', language: 'hebrew' },
    { id: 'H8451', original: 'תּוֹרָה', transliteration: 'torah', definition: 'Law, direction, instruction', language: 'hebrew' },
    { id: 'H6662', original: 'צַדִּיק', transliteration: 'tsaddiq', definition: 'Just, righteous, correct', language: 'hebrew' },
    { id: 'H539', original: 'אָמַן', transliteration: 'aman', definition: 'To believe, to be faithful, confirmed', language: 'hebrew' },
    { id: 'H1984', original: 'הָלַל', transliteration: 'halal', definition: 'To praise, shine, boast, celebrate', language: 'hebrew' },
    { id: 'H5315', original: 'נֶפֶשׁ', transliteration: 'nephesh', definition: 'Soul, self, life, creature, person', language: 'hebrew' },
    { id: 'H3820', original: 'לֵב', transliteration: 'leb', definition: 'Heart, mind, inner person', language: 'hebrew' },
    { id: 'H1697', original: 'דָּבָר', transliteration: 'dabar', definition: 'Word, speech, thing, matter', language: 'hebrew' },
    { id: 'H2403', original: 'חַטָּאָה', transliteration: 'chattaah', definition: 'Sin, sin offering', language: 'hebrew' },
    { id: 'H3478', original: 'יִשְׂרָאֵל', transliteration: 'Yisrael', definition: 'Israel — he who strives with God', language: 'hebrew' },
    { id: 'H4428', original: 'מֶלֶךְ', transliteration: 'melek', definition: 'King, royal, ruler', language: 'hebrew' },
    { id: 'H5650', original: 'עֶבֶד', transliteration: 'ebed', definition: 'Servant, slave, worshipper', language: 'hebrew' },
    { id: 'H5414', original: 'נָתַן', transliteration: 'natan', definition: 'To give, put, set', language: 'hebrew' },
    { id: 'G2316', original: 'θεός', transliteration: 'theos', definition: 'God, a deity — the supreme Divinity', language: 'greek' },
    { id: 'G2424', original: 'Ἰησοῦς', transliteration: 'Iēsous', definition: 'Jesus — Yahweh saves, the Son of God', language: 'greek' },
    { id: 'G5547', original: 'Χριστός', transliteration: 'Christos', definition: 'Christ, Anointed One — the Messiah', language: 'greek' },
    { id: 'G4151', original: 'πνεῦμα', transliteration: 'pneuma', definition: 'Spirit, wind, breath — the Holy Spirit', language: 'greek' },
    { id: 'G26', original: 'ἀγάπη', transliteration: 'agapē', definition: 'Love, charity — unconditional love', language: 'greek' },
    { id: 'G4102', original: 'πίστις', transliteration: 'pistis', definition: 'Faith, belief, trust', language: 'greek' },
    { id: 'G5485', original: 'χάρις', transliteration: 'charis', definition: 'Grace, favor — divine influence', language: 'greek' },
    { id: 'G1515', original: 'εἰρήνη', transliteration: 'eirēnē', definition: 'Peace, quietness, rest', language: 'greek' },
    { id: 'G1680', original: 'ἐλπίς', transliteration: 'elpis', definition: 'Hope, expectation', language: 'greek' },
    { id: 'G4991', original: 'σωτηρία', transliteration: 'sōtēria', definition: 'Salvation, deliverance', language: 'greek' },
    { id: 'G932', original: 'βασιλεία', transliteration: 'basileia', definition: 'Kingdom, sovereignty', language: 'greek' },
    { id: 'G3056', original: 'λόγος', transliteration: 'logos', definition: 'Word, speech, reason — the divine Word', language: 'greek' },
    { id: 'G2222', original: 'ζωή', transliteration: 'zōē', definition: 'Life — spiritual and eternal life', language: 'greek' },
    { id: 'G266', original: 'ἁμαρτία', transliteration: 'hamartia', definition: 'Sin, offense — missing the mark', language: 'greek' },
    { id: 'G1342', original: 'δίκαιος', transliteration: 'dikaios', definition: 'Righteous, just, upright', language: 'greek' },
    { id: 'G2889', original: 'κόσμος', transliteration: 'kosmos', definition: 'World, universe, order', language: 'greek' },
    { id: 'G1577', original: 'ἐκκλησία', transliteration: 'ekklēsia', definition: 'Church, assembly, congregation', language: 'greek' },
    { id: 'G2098', original: 'εὐαγγέλιον', transliteration: 'euangelion', definition: 'Gospel, good news', language: 'greek' },
    { id: 'G4561', original: 'σάρξ', transliteration: 'sarx', definition: 'Flesh, body, human nature', language: 'greek' },
    { id: 'G4396', original: 'προφήτης', transliteration: 'prophētēs', definition: 'Prophet, foreteller', language: 'greek' },
    { id: 'G1849', original: 'ἐξουσία', transliteration: 'exousia', definition: 'Authority, power, right', language: 'greek' },
    { id: 'G3551', original: 'νόμος', transliteration: 'nomos', definition: 'Law, regulation, principle', language: 'greek' },
    { id: 'G1325', original: 'δίδωμι', transliteration: 'didōmi', definition: 'To give, grant, bestow', language: 'greek' },
    { id: 'G4100', original: 'πιστεύω', transliteration: 'pisteuō', definition: 'To believe, trust, have faith', language: 'greek' },
    { id: 'G3962', original: 'πατήρ', transliteration: 'patēr', definition: 'Father — God as Father', language: 'greek' },
  ];

  const insertStrong = db.prepare('INSERT INTO strongs (id, original, transliteration, definition, language) VALUES (?, ?, ?, ?, ?)');
  db.transaction(() => {
    for (const s of strongsData) insertStrong.run(s.id, s.original, s.transliteration, s.definition, s.language);
  })();

  // Word-strongs mappings
  const insertWordStrong = db.prepare('INSERT INTO word_strongs (book, chapter, verse, word, strongs_id, position) VALUES (?, ?, ?, ?, ?, ?)');
  db.transaction(() => {
    const mappings = [
      [1,1,1,'God','H430',4],[1,1,1,'created','H1254',5],[1,1,1,'heaven','H8064',7],[1,1,1,'earth','H776',10],
      [43,1,1,'Word','G3056',6],[43,1,1,'God','G2316',12],
      [43,3,16,'God','G2316',2],[43,3,16,'loved','G26',4],[43,3,16,'world','G2889',6],[43,3,16,'Son','G2424',12],[43,3,16,'believeth','G4100',15],[43,3,16,'life','G2222',23],
      [45,3,23,'sinned','G266',4],
      [49,2,8,'grace','G5485',4],[49,2,8,'faith','G4102',9],
      [19,23,1,'LORD','H3068',2],
      [19,119,105,'word','H1697',2],
    ];
    for (const [book,ch,v,word,sid,pos] of mappings) {
      insertWordStrong.run(book, ch, v, word, sid, pos);
    }
  })();
  console.log("Strong's concordance seeded.");

  // ── Word Provenance ─────────────────────────────────────────
  console.log('Seeding word provenance data...');
  const provenanceData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'provenance.json'), 'utf-8'));

  const insertProvenance = db.prepare(`INSERT INTO word_provenance
    (word, language, lemma, definition, etymology, proto_root, first_occurrence,
     parent_word_id, manuscript_sources, textual_variants, academic_refs,
     logeion_url, perseus_url, part_of_speech)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  // Two passes: first insert all, then resolve parent links
  const lemmaToId: Record<string, number> = {};

  db.transaction(() => {
    for (const entry of provenanceData) {
      const result = insertProvenance.run(
        entry.word, entry.language, entry.lemma, entry.definition,
        entry.etymology || null, entry.proto_root || null, entry.first_occurrence || null,
        null, // parent_word_id resolved in pass 2
        JSON.stringify(entry.manuscript_sources || []),
        JSON.stringify(entry.textual_variants || []),
        JSON.stringify(entry.academic_refs || {}),
        entry.logeion_url || null, entry.perseus_url || null,
        entry.part_of_speech || null
      );
      const id = Number(result.lastInsertRowid);
      lemmaToId[`${entry.language}:${entry.lemma}`] = id;
    }
  })();

  // Pass 2: resolve parent links
  const updateParent = db.prepare('UPDATE word_provenance SET parent_word_id = ? WHERE id = ?');
  db.transaction(() => {
    for (const entry of provenanceData) {
      if (entry.parent_lemma && entry.parent_language) {
        const childId = lemmaToId[`${entry.language}:${entry.lemma}`];
        const parentId = lemmaToId[`${entry.parent_language}:${entry.parent_lemma}`];
        if (childId && parentId) {
          updateParent.run(parentId, childId);
        }
      }
    }
  })();
  console.log(`  ${provenanceData.length} word provenance entries seeded.`);

  // ── Latin Words table ───────────────────────────────────────
  console.log('Populating latin_words from provenance...');
  const latinEntries = provenanceData.filter((e: any) => e.language === 'latin');
  const insertLatinWord = db.prepare(`INSERT OR IGNORE INTO latin_words
    (word, lemma, definition, part_of_speech, etymology, provenance_id) VALUES (?, ?, ?, ?, ?, ?)`);

  db.transaction(() => {
    for (const entry of latinEntries) {
      const provId = lemmaToId[`latin:${entry.lemma}`];
      insertLatinWord.run(entry.word, entry.lemma, entry.definition, entry.part_of_speech, entry.etymology, provId || null);
    }
  })();

  // Count Vulgate occurrences for each latin word
  console.log('Counting Latin word occurrences in Vulgate...');
  const vulVerses = db.prepare("SELECT id, text FROM verses WHERE translation = 'VUL'").all() as { id: number; text: string }[];
  const wordCounts: Record<string, number> = {};
  const latinWordSet = new Set(latinEntries.map((e: any) => e.lemma.toLowerCase()));

  for (const v of vulVerses) {
    const words = v.text.toLowerCase().replace(/[^a-zàáâãäåèéêëìíîïòóôõöùúûüý]/g, ' ').split(/\s+/).filter(Boolean);
    for (const w of words) {
      if (latinWordSet.has(w)) {
        wordCounts[w] = (wordCounts[w] || 0) + 1;
      }
    }
  }

  const updateOccurrences = db.prepare('UPDATE latin_words SET occurrences = ? WHERE lemma = ?');
  db.transaction(() => {
    for (const [word, count] of Object.entries(wordCounts)) {
      updateOccurrences.run(count, word);
    }
  })();
  console.log(`  Latin word occurrences counted.`);

  db.close();
  console.log('\n✅ Database seeded successfully!');

  const statsDb = new Database(DB_PATH, { readonly: true });
  const verseCount = statsDb.prepare('SELECT COUNT(*) as c FROM verses').get() as any;
  const xrefCount = statsDb.prepare('SELECT COUNT(*) as c FROM cross_references').get() as any;
  const provCount = statsDb.prepare('SELECT COUNT(*) as c FROM word_provenance').get() as any;
  const translationStats = statsDb.prepare('SELECT translation, COUNT(*) as c FROM verses GROUP BY translation').all();
  console.log(`Total verses: ${verseCount.c}`);
  console.log(`Cross-references: ${xrefCount.c}`);
  console.log(`Word provenance entries: ${provCount.c}`);
  console.log('Translations:', translationStats);
  statsDb.close();
}

main().catch(console.error);
