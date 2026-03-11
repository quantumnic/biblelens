import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb } from '@/lib/db';
import { getBookById } from '@/lib/bible-books';

interface Props {
  params: { word: string };
}

function parseJson(s: string | null): any {
  try { return s ? JSON.parse(s) : null; } catch { return null; }
}

function getChain(db: any, entry: any): any[] {
  const chain: any[] = [entry];
  let current = entry;
  while (current?.parent_word_id) {
    const parent = db.prepare('SELECT * FROM word_provenance WHERE id = ?').get(current.parent_word_id) as any;
    if (parent) { chain.push(parent); current = parent; } else break;
  }
  return chain;
}

function langEmoji(lang: string) {
  if (lang === 'hebrew') return '🕎';
  if (lang === 'greek') return '🏛️';
  if (lang === 'latin') return '📜';
  return '📖';
}

function langLabel(lang: string) {
  if (lang === 'hebrew') return 'Hebräisch (Masoretischer Text)';
  if (lang === 'greek') return 'Griechisch (Septuaginta/NT)';
  if (lang === 'latin') return 'Lateinisch (Vulgata, Hieronymus ~405 n.Chr.)';
  return lang;
}

export default function LatinWordPage({ params }: Props) {
  const db = getDb();
  const lemma = decodeURIComponent(params.word).toLowerCase();

  const entry = db.prepare(
    `SELECT * FROM word_provenance WHERE lemma = ? AND language = 'latin'`
  ).get(lemma) as any;

  if (!entry) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl text-parchment-100 font-serif">Latin word &ldquo;{lemma}&rdquo; not found</h1>
          <Link href="/" className="text-gold-400 mt-4 inline-block">← Home</Link>
        </main>
      </>
    );
  }

  const chain = getChain(db, entry);
  const children = db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ?').all(entry.id) as any[];

  // Occurrences in Vulgate (with parallel KJV)
  const occurrences = db.prepare(`
    SELECT id, book, chapter, verse, text FROM verses
    WHERE translation = 'VUL' AND LOWER(text) LIKE ?
    ORDER BY book, chapter, verse LIMIT 50
  `).all(`% ${lemma} %`) as any[];

  // Also try without spaces for start/end of text
  const extraOccurrences = db.prepare(`
    SELECT id, book, chapter, verse, text FROM verses
    WHERE translation = 'VUL' AND (LOWER(text) LIKE ? OR LOWER(text) LIKE ?)
    AND id NOT IN (${occurrences.map(o => o.id).join(',') || '0'})
    ORDER BY book, chapter, verse LIMIT 20
  `).all(`${lemma} %`, `% ${lemma}`) as any[];

  const allOccurrences = [...occurrences, ...extraOccurrences];

  // Get KJV parallels
  const getKjv = (book: number, chapter: number, verse: number) => {
    return db.prepare(
      "SELECT text FROM verses WHERE book = ? AND chapter = ? AND verse = ? AND translation = 'KJV'"
    ).get(book, chapter, verse) as any;
  };

  const manuscriptSources = parseJson(entry.manuscript_sources) || [];
  const textualVariants = parseJson(entry.textual_variants) || [];
  const academicRefs = parseJson(entry.academic_refs) || {};

  // Get all latin words for browse
  const allLatinWords = db.prepare(
    `SELECT wp.lemma, wp.word, wp.definition, lw.occurrences
     FROM word_provenance wp
     LEFT JOIN latin_words lw ON lw.provenance_id = wp.id
     WHERE wp.language = 'latin' ORDER BY wp.lemma`
  ).all() as any[];

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-6">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Latin Vocabulary</span>
        </div>

        {/* Main Entry */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-2xl p-8 mb-8 text-center">
          <div className="text-5xl mb-3 font-serif italic text-gold-300">{entry.word}</div>
          <h1 className="text-2xl font-bold text-gold-400 mb-1">{entry.lemma}</h1>
          <p className="text-sm text-parchment-500 mb-4">
            📜 Latin · {entry.part_of_speech}
          </p>
          <p className="text-lg text-parchment-200 max-w-2xl mx-auto leading-relaxed font-serif">
            {entry.definition}
          </p>
        </div>

        {/* Etymology Chain - Visual */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-parchment-200 mb-4">🔗 Vollständige Etymologie-Kette</h2>
          <div className="space-y-3">
            {[...chain].reverse().map((node, i) => {
              const isLast = i === chain.length - 1;
              return (
                <div key={node.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{langEmoji(node.language)}</span>
                    {!isLast && <div className="w-0.5 h-8 bg-gold-500/30 mt-1" />}
                  </div>
                  <div className={`flex-1 p-3 rounded-lg ${isLast ? 'bg-gold-600/10 border border-gold-500/30' : 'bg-parchment-800'}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-lg font-serif font-bold text-parchment-100">{node.word}</span>
                      <span className="text-sm text-parchment-400">({node.lemma})</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-700 text-parchment-300">
                        {langLabel(node.language)}
                      </span>
                    </div>
                    <p className="text-sm text-parchment-300 mt-1">{node.definition}</p>
                    {node.proto_root && (
                      <p className="text-xs text-parchment-500 mt-1">🌿 Ursprung: {node.proto_root}</p>
                    )}
                    {i < chain.length - 1 && (
                      <p className="text-xs text-gold-500 mt-1">↓ übersetzt als...</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Proto-Root & Etymology */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-parchment-200 mb-3">📚 Etymologie</h2>
          <p className="text-parchment-300 leading-relaxed">{entry.etymology}</p>
          {entry.proto_root && (
            <p className="text-sm text-parchment-400 mt-3">
              <span className="font-semibold text-gold-400">Ur-Wurzel:</span> {entry.proto_root}
            </p>
          )}
          {entry.first_occurrence && (
            <p className="text-sm text-parchment-400 mt-1">
              <span className="font-semibold text-gold-400">Erste Verwendung:</span> {entry.first_occurrence}
            </p>
          )}
        </div>

        {/* Manuscript Sources */}
        {manuscriptSources.length > 0 && (
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-parchment-200 mb-3">📜 Manuskript-Quellen</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {manuscriptSources.map((ms: string, i: number) => (
                <span key={i} className="text-sm px-3 py-1 rounded-full bg-parchment-800 text-parchment-300 border border-parchment-700">
                  ✓ {ms}
                </span>
              ))}
            </div>
            {textualVariants.length > 0 && (
              <>
                <h3 className="text-sm font-semibold text-parchment-400 mb-2">Textvarianten:</h3>
                <ul className="space-y-1">
                  {textualVariants.map((v: string, i: number) => (
                    <li key={i} className="text-sm text-parchment-400 pl-4 border-l-2 border-parchment-700">{v}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* Academic References */}
        {Object.keys(academicRefs).length > 0 && (
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-parchment-200 mb-3">🎓 Akademische Referenzen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(academicRefs).map(([key, val]) => (
                <div key={key} className="flex gap-2 p-2 rounded bg-parchment-800">
                  <span className="text-xs font-mono font-bold text-gold-400 min-w-[80px]">{key}</span>
                  <span className="text-sm text-parchment-300">{val as string}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              {entry.logeion_url && (
                <a href={entry.logeion_url} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-gold-400 hover:text-gold-300 underline">
                  📖 Logeion (Chicago)
                </a>
              )}
              {entry.perseus_url && (
                <a href={entry.perseus_url} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-gold-400 hover:text-gold-300 underline">
                  🏛️ Perseus Digital Library
                </a>
              )}
            </div>
          </div>
        )}

        {/* Occurrences in Vulgate */}
        {allOccurrences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-parchment-200 mb-4">
              📖 Vorkommen in der Vulgata ({allOccurrences.length}{allOccurrences.length >= 50 ? '+' : ''})
            </h2>
            <div className="space-y-3">
              {allOccurrences.slice(0, 30).map((o: any) => {
                const bookInfo = getBookById(o.book);
                const kjv = getKjv(o.book, o.chapter, o.verse);
                const slug = bookInfo?.name.toLowerCase().replace(/ /g, '-');

                // Highlight the word in text
                const regex = new RegExp(`(${lemma})`, 'gi');
                const parts = o.text.split(regex);

                return (
                  <Link
                    key={o.id}
                    href={`/reader/${slug}/${o.chapter}?translations=VUL,KJV`}
                    className="block p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-gold-400">
                        {bookInfo?.name} {o.chapter}:{o.verse}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-gold-600 text-parchment-950 font-bold">VUL</span>
                    </div>
                    <p className="text-sm text-parchment-200 font-serif italic mb-1">
                      {parts.map((part: string, i: number) =>
                        part.toLowerCase() === lemma ? (
                          <span key={i} className="text-gold-400 font-bold not-italic">{part}</span>
                        ) : part
                      )}
                    </p>
                    {kjv && (
                      <p className="text-xs text-parchment-400 font-serif">
                        <span className="text-parchment-500 font-mono font-bold mr-1">KJV</span>
                        {kjv.text}
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Browse all Latin words */}
        <div>
          <h2 className="text-xl font-semibold text-parchment-200 mb-4">📚 Alle lateinischen Wörter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {allLatinWords.map((w: any) => (
              <Link
                key={w.lemma}
                href={`/latin/${w.lemma}`}
                className={`p-3 rounded-lg border transition-all ${
                  w.lemma === lemma
                    ? 'bg-gold-600/20 border-gold-500/50'
                    : 'bg-parchment-900 border-parchment-800 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-serif italic text-parchment-100">{w.word}</span>
                    <span className="text-xs text-parchment-500 ml-2">{w.lemma}</span>
                  </div>
                  {w.occurrences > 0 && (
                    <span className="text-xs text-parchment-500">{w.occurrences}×</span>
                  )}
                </div>
                <p className="text-xs text-parchment-400 line-clamp-1 mt-0.5">{w.definition}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
