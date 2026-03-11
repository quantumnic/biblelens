'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBookById } from '@/lib/bible-books';

interface CrossRef {
  book: number;
  chapter: number;
  verse_start: number;
  verse_end: number;
  votes: number;
  text: string;
}

export default function CrossRefPanel({ book, chapter, verse }: { book: number; chapter: number; verse: number }) {
  const [fromRefs, setFromRefs] = useState<CrossRef[]>([]);
  const [toRefs, setToRefs] = useState<CrossRef[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/crossrefs?book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(data => {
        setFromRefs(data.from || []);
        setToRefs(data.to || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [book, chapter, verse]);

  if (loading) return <div className="text-parchment-500 text-sm animate-pulse">Loading cross-references…</div>;

  const total = fromRefs.length + toRefs.length;
  if (total === 0) return <div className="text-parchment-500 text-sm">No cross-references found.</div>;

  const renderRef = (ref: CrossRef, direction: string) => {
    const bookInfo = getBookById(ref.book);
    const label = `${bookInfo?.name || `Book ${ref.book}`} ${ref.chapter}:${ref.verse_start}${ref.verse_end !== ref.verse_start ? `-${ref.verse_end}` : ''}`;
    
    return (
      <Link
        key={`${direction}-${ref.book}-${ref.chapter}-${ref.verse_start}`}
        href={`/reader/${bookInfo?.name.toLowerCase().replace(/ /g, '-') || ref.book}/${ref.chapter}#v${ref.verse_start}`}
        className="block p-2 rounded hover:bg-parchment-800 transition-colors group"
      >
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-semibold text-gold-400 group-hover:text-gold-300">{label}</span>
          {ref.votes > 0 && (
            <span className="text-xs text-parchment-600">⬆ {ref.votes}</span>
          )}
        </div>
        {ref.text && (
          <p className="text-xs text-parchment-400 line-clamp-2 font-serif">{ref.text}</p>
        )}
      </Link>
    );
  };

  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
      <p className="text-xs text-parchment-500">{total} cross-reference{total !== 1 ? 's' : ''} found</p>
      
      {fromRefs.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-parchment-400 uppercase tracking-wider mb-1">References from this verse →</h4>
          <div className="space-y-1">{fromRefs.map(r => renderRef(r, 'from'))}</div>
        </div>
      )}
      
      {toRefs.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-parchment-400 uppercase tracking-wider mb-1">← References to this verse</h4>
          <div className="space-y-1">{toRefs.map(r => renderRef(r, 'to'))}</div>
        </div>
      )}
    </div>
  );
}
