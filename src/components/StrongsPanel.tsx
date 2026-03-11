'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBookById } from '@/lib/bible-books';

interface StrongsEntry {
  id: string;
  original: string;
  transliteration: string;
  definition: string;
  language: string;
}

interface Occurrence {
  book: number;
  chapter: number;
  verse: number;
  word: string;
  text: string;
}

export default function StrongsPanel({ strongsId }: { strongsId: string }) {
  const [entry, setEntry] = useState<StrongsEntry | null>(null);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/word?strongs=${strongsId}`)
      .then(r => r.json())
      .then(data => {
        setEntry(data.entry || null);
        setOccurrences(data.occurrences || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [strongsId]);

  if (loading) return <div className="text-parchment-500 text-sm animate-pulse">Loading…</div>;
  if (!entry) return <div className="text-parchment-500 text-sm">Strong&apos;s entry not found.</div>;

  return (
    <div className="space-y-4">
      <Link href={`/word/${strongsId}`} className="block hover:opacity-80 transition-opacity">
        <div className="text-center p-4 bg-parchment-800 rounded-lg">
          <div className="text-3xl mb-2 font-serif">{entry.original}</div>
          <div className="text-gold-400 font-semibold">{entry.transliteration}</div>
          <div className="text-xs text-parchment-500 mt-1">
            {strongsId} · {entry.language === 'hebrew' ? 'Hebrew (OT)' : 'Greek (NT)'}
          </div>
        </div>
      </Link>
      
      <div>
        <h4 className="text-xs font-semibold text-parchment-400 uppercase tracking-wider mb-2">Definition</h4>
        <p className="text-sm text-parchment-200 leading-relaxed">{entry.definition}</p>
      </div>

      {occurrences.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-parchment-400 uppercase tracking-wider mb-2">
            Occurrences ({occurrences.length})
          </h4>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {occurrences.map((o, i) => {
              const bookInfo = getBookById(o.book);
              return (
                <Link
                  key={i}
                  href={`/reader/${bookInfo?.name.toLowerCase().replace(/ /g, '-')}/${o.chapter}#v${o.verse}`}
                  className="block p-2 rounded hover:bg-parchment-800 transition-colors text-xs"
                >
                  <span className="text-gold-400">{bookInfo?.name} {o.chapter}:{o.verse}</span>
                  <span className="text-parchment-500 ml-2">&quot;{o.word}&quot;</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
