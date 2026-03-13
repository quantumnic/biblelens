'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBookById } from '@/lib/bible-books';

interface Props {
  book: number;
  chapter: number;
  verse: number;
}

interface SharedWord {
  strongs_id: string;
  word: string;
  transliteration: string;
  definition: string;
}

interface Connection {
  book: number;
  chapter: number;
  verse: number;
  sharedWords: SharedWord[];
  text: string;
}

export default function IntertextualPanel({ book, chapter, verse }: Props) {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sourceWords, setSourceWords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/intertextual?book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(data => {
        setConnections(data.data || []);
        setSourceWords(data.sourceWords || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [book, chapter, verse]);

  if (loading) {
    return <div className="text-sm text-parchment-500 animate-pulse">Loading intertextual connections...</div>;
  }

  if (connections.length === 0) {
    return <div className="text-sm text-parchment-500">No intertextual connections found for this verse.</div>;
  }

  return (
    <div className="space-y-3">
      {/* Source words */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {sourceWords.map((w: any) => (
          <Link
            key={w.strongs_id}
            href={`/word/${w.strongs_id}`}
            className="text-xs px-2 py-0.5 rounded-full bg-gold-600/20 text-gold-400 hover:bg-gold-600/30 transition-colors"
          >
            {w.transliteration} ({w.strongs_id})
          </Link>
        ))}
      </div>

      {/* Connected verses */}
      {connections.map((c, i) => {
        const bookInfo = getBookById(c.book);
        const slug = bookInfo?.name.toLowerCase().replace(/ /g, '-') || '';
        return (
          <div key={i} className="bg-parchment-800/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <Link
                href={`/reader/${slug}/${c.chapter}#v${c.verse}`}
                className="text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
              >
                {bookInfo?.name} {c.chapter}:{c.verse}
              </Link>
              <span className="text-xs text-parchment-500">
                {c.sharedWords.length} shared {c.sharedWords.length === 1 ? 'word' : 'words'}
              </span>
            </div>
            <p className="text-xs text-parchment-300 italic line-clamp-2 mb-1.5">{c.text}</p>
            <div className="flex flex-wrap gap-1">
              {c.sharedWords.map((w) => (
                <span key={w.strongs_id} className="text-xs px-1.5 py-0.5 rounded bg-parchment-700 text-parchment-300">
                  {w.transliteration}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
