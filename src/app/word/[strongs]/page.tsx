import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb } from '@/lib/db';
import { getBookById } from '@/lib/bible-books';
import { langEmoji, langLabel } from '@/lib/provenance';
import WordRelationships from '@/components/WordRelationships';

interface Props {
  params: { strongs: string };
}

function parseJson(s: string | null): any {
  try { return s ? JSON.parse(s) : null; } catch { return null; }
}

export default function WordPage({ params }: Props) {
  const db = getDb();
  
  const entry = db.prepare('SELECT * FROM strongs WHERE id = ?').get(params.strongs) as any;
  
  if (!entry) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl text-parchment-100 font-serif">Strong&apos;s {params.strongs} not found</h1>
          <p className="text-parchment-500 mt-2">This entry is not in the demo dataset.</p>
          <Link href="/" className="text-gold-400 mt-4 inline-block hover:text-gold-300">← Back to home</Link>
        </main>
      </>
    );
  }

  const occurrences = db.prepare(`
    SELECT ws.book, ws.chapter, ws.verse, ws.word, v.text
    FROM word_strongs ws
    LEFT JOIN verses v ON v.book = ws.book AND v.chapter = ws.chapter AND v.verse = ws.verse AND v.translation = 'KJV'
    WHERE ws.strongs_id = ?
    ORDER BY ws.book, ws.chapter, ws.verse
  `).all(params.strongs) as any[];

  // Get all Strong's entries for browse
  const allEntries = db.prepare('SELECT id, original, transliteration, language FROM strongs ORDER BY id').all() as any[];

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-6">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Strong&apos;s Concordance</span>
        </div>

        {/* Main Entry */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-2xl p-8 mb-8 text-center">
          <div className="text-6xl mb-4 font-serif">{entry.original}</div>
          <h1 className="text-2xl font-bold text-gold-400 mb-1">{entry.transliteration}</h1>
          <p className="text-sm text-parchment-500 mb-4">
            {entry.id} · {entry.language === 'hebrew' ? '🕎 Hebrew (Old Testament)' : '🏛️ Greek (New Testament)'}
          </p>
          <p className="text-lg text-parchment-200 max-w-2xl mx-auto leading-relaxed font-serif">
            {entry.definition}
          </p>
        </div>

        {/* Occurrences */}
        {occurrences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-parchment-200 mb-4">
              Occurrences ({occurrences.length})
            </h2>
            <div className="space-y-2">
              {occurrences.map((o: any, i: number) => {
                const bookInfo = getBookById(o.book);
                const slug = bookInfo?.name.toLowerCase().replace(/ /g, '-');
                return (
                  <Link
                    key={i}
                    href={`/reader/${slug}/${o.chapter}`}
                    className="block p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-semibold text-gold-400">
                        {bookInfo?.name} {o.chapter}:{o.verse}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-parchment-800 text-parchment-400">
                        &ldquo;{o.word}&rdquo;
                      </span>
                    </div>
                    <p className="text-sm text-parchment-300 font-serif line-clamp-2">{o.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Latin Translation Chain */}
        {(() => {
          // Find provenance entries that match this Strong's word
          const strongsLang = entry.language === 'hebrew' ? 'hebrew' : 'greek';
          const provEntries = db.prepare(
            `SELECT * FROM word_provenance WHERE language = ? AND (word = ? OR lemma = ?)`
          ).all(strongsLang, entry.original, entry.transliteration.toLowerCase()) as any[];

          if (provEntries.length === 0) return null;

          // For each provenance entry, find children (translations)
          const chains = provEntries.map((prov: any) => {
            const children = db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ?').all(prov.id) as any[];
            const grandchildren = children.flatMap((child: any) =>
              (db.prepare('SELECT * FROM word_provenance WHERE parent_word_id = ?').all(child.id) as any[]).map(gc => ({ ...gc, parentLang: child.language }))
            );
            return { root: prov, children, grandchildren };
          });

          return (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-parchment-200 mb-4">🔗 Übersetzungskette (Translation Chain)</h2>
              <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6">
                <p className="text-sm text-parchment-400 mb-4">
                  Wie wurde dieses Wort durch die Geschichte übersetzt? Von der Originalsprache über die Septuaginta/Vulgata bis heute.
                </p>
                {chains.map(({ root, children, grandchildren }: any, ci: number) => (
                  <div key={ci} className="space-y-2">
                    {/* Root */}
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-parchment-800">
                      <span className="text-xl">{langEmoji(root.language)}</span>
                      <Link href={`/word/${root.language}/${root.lemma}`} className="font-serif text-lg text-parchment-100 hover:text-gold-400">
                        {root.word}
                      </Link>
                      <span className="text-sm text-parchment-400">({root.lemma})</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-700 text-parchment-300">{langLabel(root.language)}</span>
                    </div>
                    {/* Children */}
                    {children.map((child: any) => (
                      <div key={child.id} className="ml-8">
                        <div className="flex items-center gap-1 text-gold-500 text-xs mb-1">↓ übersetzt als</div>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-parchment-800/60">
                          <span className="text-xl">{langEmoji(child.language)}</span>
                          <Link href={child.language === 'latin' ? `/latin/${child.lemma}` : `/word/${child.language}/${child.lemma}`} className="font-serif text-lg text-parchment-100 hover:text-gold-400">
                            {child.word}
                          </Link>
                          <span className="text-sm text-parchment-400">({child.lemma})</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-700 text-parchment-300">{langLabel(child.language)}</span>
                        </div>
                        {/* Grandchildren from this child */}
                        {grandchildren.filter((gc: any) => gc.parentLang === child.language).map((gc: any) => (
                          <div key={gc.id} className="ml-8 mt-2">
                            <div className="flex items-center gap-1 text-gold-500 text-xs mb-1">↓ übersetzt als</div>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-parchment-800/30">
                              <span className="text-xl">{langEmoji(gc.language)}</span>
                              <Link href={gc.language === 'latin' ? `/latin/${gc.lemma}` : `/word/${gc.language}/${gc.lemma}`} className="font-serif text-lg text-parchment-100 hover:text-gold-400">
                                {gc.word}
                              </Link>
                              <span className="text-sm text-parchment-400">({gc.lemma})</span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-700 text-parchment-300">{langLabel(gc.language)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        {/* Word Relationships */}
        <div className="mb-8">
          <WordRelationships strongsId={params.strongs} />
        </div>

        {/* Browse All */}
        <div>
          <h2 className="text-xl font-semibold text-parchment-200 mb-4">Browse Strong&apos;s Concordance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {allEntries.map((e: any) => (
              <Link
                key={e.id}
                href={`/word/${e.id}`}
                className={`p-3 rounded-lg border transition-all ${
                  e.id === params.strongs
                    ? 'bg-gold-600/20 border-gold-500/50'
                    : 'bg-parchment-900 border-parchment-800 hover:border-gold-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl font-serif">{e.original}</span>
                  <div>
                    <span className="text-sm text-gold-400">{e.transliteration}</span>
                    <span className="text-xs text-parchment-600 ml-2">{e.id}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
