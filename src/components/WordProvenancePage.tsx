import Link from 'next/link';
import Sidebar from './Sidebar';
import { getDb } from '@/lib/db';
import { getBookById } from '@/lib/bible-books';
import { parseJson, getProvenanceChain, getProvenanceChildren, langEmoji, langLabel } from '@/lib/provenance';

interface Props {
  lemma: string;
  language: 'hebrew' | 'greek' | 'latin';
}

export default function WordProvenancePage({ lemma, language }: Props) {
  const db = getDb();

  const entry = db.prepare('SELECT * FROM word_provenance WHERE lemma = ? AND language = ?').get(lemma, language) as any;

  if (!entry) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl text-parchment-100 font-serif">Word &ldquo;{lemma}&rdquo; ({language}) not found</h1>
          <Link href="/" className="text-gold-400 mt-4 inline-block">← Home</Link>
        </main>
      </>
    );
  }

  const chain = getProvenanceChain(db, entry);
  const children = getProvenanceChildren(db, entry.id);
  const manuscriptSources = parseJson(entry.manuscript_sources) || [];
  const textualVariants = parseJson(entry.textual_variants) || [];
  const academicRefs = parseJson(entry.academic_refs) || {};

  // Determine search translation
  const searchTranslation = language === 'latin' ? 'VUL' : 'KJV';

  // All words of same language for browse
  const allWords = db.prepare(
    `SELECT lemma, word, definition FROM word_provenance WHERE language = ? ORDER BY lemma`
  ).all(language) as any[];

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-6">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">{langEmoji(language)} {language.charAt(0).toUpperCase() + language.slice(1)} Vocabulary</span>
        </div>

        {/* Main Entry */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-2xl p-8 mb-8 text-center">
          <div className="text-5xl mb-3 font-serif">{entry.word}</div>
          <h1 className="text-2xl font-bold text-gold-400 mb-1">{entry.lemma}</h1>
          <p className="text-sm text-parchment-500 mb-4">
            {langEmoji(language)} {langLabel(language)} · {entry.part_of_speech}
          </p>
          <p className="text-lg text-parchment-200 max-w-2xl mx-auto leading-relaxed font-serif">
            {entry.definition}
          </p>
        </div>

        {/* Etymology Chain */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-parchment-200 mb-4">🔗 Übersetzungskette</h2>
          <div className="space-y-3">
            {[...chain].reverse().map((node, i) => {
              const isCurrentEntry = node.id === entry.id;
              return (
                <div key={node.id} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{langEmoji(node.language)}</span>
                    {i < chain.length - 1 && <div className="w-0.5 h-8 bg-gold-500/30 mt-1" />}
                  </div>
                  <div className={`flex-1 p-3 rounded-lg ${isCurrentEntry ? 'bg-gold-600/10 border border-gold-500/30' : 'bg-parchment-800'}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={node.language === 'latin' ? `/latin/${node.lemma}` : `/word/${node.language}/${node.lemma}`}
                        className="text-lg font-serif font-bold text-parchment-100 hover:text-gold-400"
                      >
                        {node.word}
                      </Link>
                      <span className="text-sm text-parchment-400">({node.lemma})</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-parchment-700 text-parchment-300">
                        {langLabel(node.language)}
                      </span>
                    </div>
                    <p className="text-sm text-parchment-300 mt-1">{node.definition}</p>
                    {node.proto_root && (
                      <p className="text-xs text-parchment-500 mt-1">🌿 {node.proto_root}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Children */}
          {children.length > 0 && (
            <div className="mt-4 pt-4 border-t border-parchment-800">
              <h3 className="text-sm font-semibold text-parchment-400 mb-2">↓ Übersetzt als:</h3>
              <div className="flex flex-wrap gap-2">
                {children.map((child: any) => (
                  <Link
                    key={child.id}
                    href={child.language === 'latin' ? `/latin/${child.lemma}` : `/word/${child.language}/${child.lemma}`}
                    className="px-3 py-1.5 rounded-lg bg-parchment-800 text-sm text-parchment-200 hover:bg-parchment-700 border border-parchment-700"
                  >
                    {langEmoji(child.language)} {child.word} ({child.lemma})
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Etymology */}
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

        {/* Manuscripts */}
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
                  <span className="text-xs font-mono font-bold text-gold-400 min-w-[100px]">{key}</span>
                  <span className="text-sm text-parchment-300">{val as string}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-4">
              {entry.logeion_url && (
                <a href={entry.logeion_url} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-gold-400 hover:text-gold-300 underline">📖 Logeion</a>
              )}
              {entry.perseus_url && (
                <a href={entry.perseus_url} target="_blank" rel="noopener noreferrer"
                   className="text-sm text-gold-400 hover:text-gold-300 underline">🏛️ Perseus</a>
              )}
            </div>
          </div>
        )}

        {/* Browse */}
        <div>
          <h2 className="text-xl font-semibold text-parchment-200 mb-4">
            {langEmoji(language)} Alle {language === 'hebrew' ? 'hebräischen' : language === 'greek' ? 'griechischen' : 'lateinischen'} Wörter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {allWords.map((w: any) => (
              <Link
                key={w.lemma}
                href={language === 'latin' ? `/latin/${w.lemma}` : `/word/${language}/${w.lemma}`}
                className={`p-3 rounded-lg border transition-all ${
                  w.lemma === lemma ? 'bg-gold-600/20 border-gold-500/50' : 'bg-parchment-900 border-parchment-800 hover:border-gold-500/30'
                }`}
              >
                <span className="text-sm font-serif text-parchment-100">{w.word}</span>
                <span className="text-xs text-parchment-500 ml-2">{w.lemma}</span>
                <p className="text-xs text-parchment-400 line-clamp-1 mt-0.5">{w.definition}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
