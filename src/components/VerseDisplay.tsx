'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBookById } from '@/lib/bible-books';
import CrossRefPanel from './CrossRefPanel';
import StrongsPanel from './StrongsPanel';
import ResearchPanel from './ResearchPanel';
import ManuscriptPanel from './ManuscriptPanel';
import WordDNA from './WordDNA';
import IntertextualPanel from './IntertextualPanel';
import CopyButton from './CopyButton';

interface Verse {
  book: number;
  chapter: number;
  verse: number;
  text: string;
  translation: string;
}

interface WordStrongs {
  word: string;
  strongs_id: string;
  position: number;
  original: string;
  transliteration: string;
  definition: string;
  language: string;
}

interface LatinWordProv {
  word: string;
  lemma: string;
  id: number;
  language: string;
  definition: string;
  parent_word_id: number | null;
  chain?: any[];
}

interface Props {
  verses: Verse[];
  translations: string[];
  strongsWords?: Record<string, WordStrongs[]>;
  latinWords?: Record<string, LatinWordProv[]>; // keyed by lemma
}

export default function VerseDisplay({ verses, translations, strongsWords, latinWords }: Props) {
  const [selectedVerse, setSelectedVerse] = useState<{ book: number; chapter: number; verse: number } | null>(null);
  const [showPanel, setShowPanel] = useState<'crossref' | 'strongs' | 'research' | 'manuscripts' | 'intertextual' | null>(null);
  const [selectedStrongs, setSelectedStrongs] = useState<string | null>(null);

  // Group by verse number
  const grouped: Record<number, Verse[]> = {};
  for (const v of verses) {
    if (!grouped[v.verse]) grouped[v.verse] = [];
    grouped[v.verse].push(v);
  }

  const handleVerseClick = (book: number, chapter: number, verse: number) => {
    if (selectedVerse?.book === book && selectedVerse?.chapter === chapter && selectedVerse?.verse === verse && showPanel === 'crossref') {
      setShowPanel(null);
      setSelectedVerse(null);
    } else {
      setSelectedVerse({ book, chapter, verse });
      setShowPanel('crossref');
    }
  };

  const handleWordClick = (word: string, strongsId: string) => {
    setSelectedStrongs(strongsId);
    setShowPanel('strongs');
  };

  const renderVerseText = (v: Verse) => {
    const key = `${v.book}-${v.chapter}-${v.verse}`;

    // For VUL verses with latin word data, render with WordDNA popups
    if (v.translation === 'VUL' && latinWords) {
      return v.text.split(/(\s+)/).map((token, i) => {
        const clean = token.toLowerCase().replace(/[^a-zàáâãäåèéêëìíîïòóôõöùúûüý]/g, '');
        const lw = latinWords[clean];
        if (lw && lw.length > 0) {
          const prov = lw[0];
          return (
            <WordDNA
              key={i}
              word={token}
              provenance={prov}
              chain={prov.chain}
            />
          );
        }
        return token;
      });
    }

    const words = strongsWords?.[key];
    if (!words || words.length === 0) return v.text;
    
    const wordMap = new Map(words.map(w => [w.word.toLowerCase(), w]));
    
    return v.text.split(/(\s+)/).map((token, i) => {
      const clean = token.toLowerCase().replace(/[^a-z]/g, '');
      const sw = wordMap.get(clean);
      if (sw) {
        return (
          <span
            key={i}
            className="strongs-word"
            title={`${sw.strongs_id}: ${sw.transliteration} — ${sw.original}`}
            onClick={(e) => {
              e.stopPropagation();
              handleWordClick(sw.word, sw.strongs_id);
            }}
          >
            {token}
          </span>
        );
      }
      return token;
    });
  };

  const bookInfo = verses[0] ? getBookById(verses[0].book) : null;
  const verseRef = selectedVerse 
    ? `${getBookById(selectedVerse.book)?.name || ''} ${selectedVerse.chapter}:${selectedVerse.verse}` 
    : '';

  return (
    <div className="flex gap-4 flex-col xl:flex-row">
      <div className="flex-1 min-w-0">
        {Object.entries(grouped)
          .sort(([a], [b]) => parseInt(a) - parseInt(b))
          .map(([verseNum, verseTranslations]) => (
            <div
              key={verseNum}
              className={`group py-3 px-4 rounded-lg mb-2 cursor-pointer transition-colors ${
                selectedVerse?.verse === parseInt(verseNum) 
                  ? 'bg-parchment-800/80 ring-1 ring-gold-500/30' 
                  : 'hover:bg-parchment-900/50'
              }`}
              onClick={() => {
                const v = verseTranslations[0];
                handleVerseClick(v.book, v.chapter, v.verse);
              }}
            >
              <div className="flex items-start gap-3">
                <span className="verse-number mt-1 select-none min-w-[2rem] text-right">
                  {verseNum}
                </span>
                <div className="flex-1 space-y-1">
                  {translations.length === 1 ? (
                    <p className="bible-text text-parchment-100">
                      {renderVerseText(verseTranslations[0])}
                    </p>
                  ) : (
                    verseTranslations.map(v => (
                      <div key={v.translation} className="flex gap-2 items-start">
                        <span className="text-xs font-mono text-gold-500 mt-1 min-w-[2.5rem] font-semibold">
                          {v.translation}
                        </span>
                        <p className="bible-text text-parchment-100 flex-1">
                          {renderVerseText(v)}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-2 mt-2 ml-12 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); handleVerseClick(verseTranslations[0].book, verseTranslations[0].chapter, parseInt(verseNum)); }}
                  className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-400 hover:text-gold-400 hover:bg-parchment-700 transition-colors"
                >
                  🔗 Cross-Refs
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVerse({ book: verseTranslations[0].book, chapter: verseTranslations[0].chapter, verse: parseInt(verseNum) });
                    setShowPanel('research');
                  }}
                  className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-400 hover:text-gold-400 hover:bg-parchment-700 transition-colors"
                >
                  🎓 Research
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVerse({ book: verseTranslations[0].book, chapter: verseTranslations[0].chapter, verse: parseInt(verseNum) });
                    setShowPanel('manuscripts');
                  }}
                  className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-400 hover:text-gold-400 hover:bg-parchment-700 transition-colors"
                >
                  📜 Manuscripts
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVerse({ book: verseTranslations[0].book, chapter: verseTranslations[0].chapter, verse: parseInt(verseNum) });
                    setShowPanel('intertextual');
                  }}
                  className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-400 hover:text-gold-400 hover:bg-parchment-700 transition-colors"
                >
                  🔗 Intertextual
                </button>
                <Link
                  href={`/compare?book=${verseTranslations[0].book}&chapter=${verseTranslations[0].chapter}&verse=${verseNum}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-400 hover:text-gold-400 hover:bg-parchment-700 transition-colors"
                >
                  ⚖️ Compare
                </Link>
                <CopyButton
                  text={`"${verseTranslations[0].text}" — ${bookInfo?.name || ''} ${verseTranslations[0].chapter}:${verseNum} (${verseTranslations[0].translation})`}
                  label="Copy verse with reference"
                />
              </div>
            </div>
          ))}
      </div>

      {/* Side Panel */}
      {showPanel && selectedVerse && (
        <div className="xl:w-96 w-full xl:sticky xl:top-4 xl:self-start bg-parchment-900 border border-parchment-700 rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gold-400">{verseRef}</h3>
            <div className="flex gap-1">
              {(['crossref', 'research', 'manuscripts', 'intertextual'] as const).map(panel => (
                <button
                  key={panel}
                  onClick={() => setShowPanel(panel)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${showPanel === panel ? 'bg-gold-600 text-parchment-950' : 'bg-parchment-800 text-parchment-400 hover:text-gold-400'}`}
                >
                  {panel === 'crossref' ? '🔗' : panel === 'research' ? '🎓' : panel === 'manuscripts' ? '📜' : '🧬'}
                </button>
              ))}
              <button
                onClick={() => { setShowPanel(null); setSelectedVerse(null); }}
                className="text-xs px-2 py-1 rounded bg-parchment-800 text-parchment-500 hover:text-parchment-200"
              >
                ✕
              </button>
            </div>
          </div>
          
          {showPanel === 'crossref' && <CrossRefPanel {...selectedVerse} />}
          {showPanel === 'strongs' && selectedStrongs && <StrongsPanel strongsId={selectedStrongs} />}
          {showPanel === 'research' && <ResearchPanel {...selectedVerse} />}
          {showPanel === 'manuscripts' && <ManuscriptPanel {...selectedVerse} />}
          {showPanel === 'intertextual' && <IntertextualPanel {...selectedVerse} />}
        </div>
      )}

      {/* Strong's popup */}
      {showPanel === 'strongs' && selectedStrongs && !selectedVerse && (
        <div className="xl:w-96 w-full bg-parchment-900 border border-parchment-700 rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-gold-400">Strong&apos;s {selectedStrongs}</h3>
            <button onClick={() => { setShowPanel(null); setSelectedStrongs(null); }} className="text-parchment-500 hover:text-parchment-200">✕</button>
          </div>
          <StrongsPanel strongsId={selectedStrongs} />
        </div>
      )}
    </div>
  );
}
