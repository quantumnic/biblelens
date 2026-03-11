'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProvenanceNode {
  id: number;
  word: string;
  language: string;
  lemma: string;
  definition: string;
  parent_word_id: number | null;
}

interface Props {
  word: string;
  provenance: ProvenanceNode | null;
  chain?: ProvenanceNode[];
}

function langEmoji(lang: string) {
  if (lang === 'hebrew') return '🕎';
  if (lang === 'greek') return '🏛️';
  if (lang === 'latin') return '📜';
  return '📖';
}

export default function WordDNA({ word, provenance, chain }: Props) {
  const [showPopup, setShowPopup] = useState(false);

  if (!provenance) {
    return <span className="text-parchment-200">{word}</span>;
  }

  const wordLink = provenance.language === 'latin'
    ? `/latin/${provenance.lemma}`
    : `/word/${provenance.language}/${provenance.lemma}`;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <span className="text-gold-300 cursor-pointer hover:text-gold-200 underline decoration-dotted decoration-gold-500/30 underline-offset-2">
        {word}
      </span>
      {showPopup && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-72 p-3 rounded-xl bg-parchment-800 border border-parchment-600 shadow-2xl text-left">
          {/* Chain visualization */}
          <div className="space-y-1 mb-2">
            {chain && chain.length > 0 ? (
              [...chain].reverse().map((node, i) => (
                <div key={node.id} className="flex items-center gap-1 text-xs">
                  <span>{langEmoji(node.language)}</span>
                  <span className="font-serif font-bold text-parchment-100">{node.word}</span>
                  <span className="text-parchment-500">({node.lemma})</span>
                  {i < chain.length - 1 && <span className="text-gold-500 ml-1">→</span>}
                </div>
              ))
            ) : (
              <div className="flex items-center gap-1 text-xs">
                <span>{langEmoji(provenance.language)}</span>
                <span className="font-serif font-bold text-parchment-100">{provenance.word}</span>
                <span className="text-parchment-500">({provenance.lemma})</span>
              </div>
            )}
          </div>

          <p className="text-xs text-parchment-300 line-clamp-2 mb-2">{provenance.definition}</p>

          <Link
            href={wordLink}
            className="text-xs text-gold-400 hover:text-gold-300 font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            Vollständiges Wort-Profil →
          </Link>

          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-parchment-600" />
        </div>
      )}
    </span>
  );
}
