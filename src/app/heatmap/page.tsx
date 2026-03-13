'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { BIBLE_BOOKS } from '@/lib/bible-books';

interface HeatmapEntry {
  book: number;
  count: number;
  total: number;
  frequency: number;
}

const SUGGESTED_WORDS = ['love', 'faith', 'sin', 'grace', 'mercy', 'light', 'darkness', 'covenant', 'glory', 'spirit', 'temple', 'king', 'prophet', 'blood', 'fire', 'water', 'bread', 'shepherd', 'lamb', 'cross'];

export default function HeatmapPage() {
  const [word, setWord] = useState('love');
  const [inputValue, setInputValue] = useState('love');
  const [data, setData] = useState<HeatmapEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'absolute' | 'relative'>('absolute');

  useEffect(() => {
    if (!word) return;
    setLoading(true);
    fetch(`/api/heatmap?word=${encodeURIComponent(word)}`)
      .then(r => r.json())
      .then(d => { setData(d.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [word]);

  const maxVal = Math.max(...data.map(d => mode === 'absolute' ? d.count : d.frequency), 0.001);
  const dataMap = new Map(data.map(d => [d.book, d]));

  const getColor = (value: number) => {
    const intensity = value / maxVal;
    if (intensity === 0) return 'bg-parchment-900';
    if (intensity < 0.15) return 'bg-amber-950';
    if (intensity < 0.3) return 'bg-amber-900';
    if (intensity < 0.5) return 'bg-amber-800';
    if (intensity < 0.7) return 'bg-amber-700';
    if (intensity < 0.85) return 'bg-amber-600';
    return 'bg-amber-500';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) setWord(inputValue.trim());
  };

  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'OT');
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'NT');

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Word Heatmap</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🔥 Word Distribution Heatmap</h1>
        <p className="text-parchment-400 mb-6">
          Visualize how a word is distributed across all 66 books of the Bible.
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a word…"
            className="flex-1 max-w-xs bg-parchment-800 border border-parchment-700 rounded-lg px-4 py-2 text-parchment-100 placeholder-parchment-500 focus:outline-none focus:border-gold-500/50"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gold-600 text-parchment-950 rounded-lg hover:bg-gold-500 transition-colors font-semibold text-sm"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => setMode(mode === 'absolute' ? 'relative' : 'absolute')}
            className="px-3 py-2 bg-parchment-800 text-parchment-300 rounded-lg hover:bg-parchment-700 transition-colors text-sm border border-parchment-700"
          >
            {mode === 'absolute' ? '# Absolute' : '% Relative'}
          </button>
        </form>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {SUGGESTED_WORDS.map(w => (
            <button
              key={w}
              onClick={() => { setInputValue(w); setWord(w); }}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                w === word
                  ? 'bg-gold-600 text-parchment-950 border-gold-500'
                  : 'bg-parchment-900 text-parchment-400 border-parchment-700 hover:border-gold-500/30'
              }`}
            >
              {w}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-8 text-parchment-500">Loading…</div>
        ) : (
          <>
            {/* Heatmap Grid */}
            <div className="space-y-6">
              {[{ label: 'Old Testament', books: otBooks }, { label: 'New Testament', books: ntBooks }].map(section => (
                <div key={section.label}>
                  <h2 className="text-sm font-semibold text-gold-500 uppercase tracking-wider mb-3">{section.label}</h2>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-13 gap-1">
                    {section.books.map(book => {
                      const entry = dataMap.get(book.id);
                      const val = entry ? (mode === 'absolute' ? entry.count : entry.frequency) : 0;
                      return (
                        <Link
                          key={book.id}
                          href={`/reader/${book.name.toLowerCase().replace(/ /g, '-')}/1`}
                          className={`${getColor(val)} rounded p-1.5 text-center transition-all hover:ring-1 hover:ring-gold-500/40 group relative`}
                          title={`${book.name}: ${entry?.count || 0} occurrences`}
                        >
                          <div className="text-[10px] text-parchment-400 font-mono leading-tight">{book.abbrev}</div>
                          <div className="text-xs font-bold text-parchment-200">{entry?.count || 0}</div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-6 text-xs text-parchment-500">
              <span>Low</span>
              <div className="flex gap-0.5">
                {['bg-parchment-900', 'bg-amber-950', 'bg-amber-900', 'bg-amber-800', 'bg-amber-700', 'bg-amber-600', 'bg-amber-500'].map((c, i) => (
                  <div key={i} className={`w-6 h-3 rounded-sm ${c}`} />
                ))}
              </div>
              <span>High</span>
            </div>

            {/* Stats summary */}
            {data.length > 0 && (
              <div className="mt-6 bg-parchment-900 border border-parchment-800 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gold-400 mb-2">📊 Summary for &ldquo;{word}&rdquo;</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div>
                    <span className="text-parchment-500">Total occurrences:</span>
                    <span className="ml-2 text-parchment-200 font-semibold">{data.reduce((s, d) => s + d.count, 0)}</span>
                  </div>
                  <div>
                    <span className="text-parchment-500">Books containing:</span>
                    <span className="ml-2 text-parchment-200 font-semibold">{data.filter(d => d.count > 0).length} / 66</span>
                  </div>
                  <div>
                    <span className="text-parchment-500">Most frequent:</span>
                    <span className="ml-2 text-parchment-200 font-semibold">
                      {(() => {
                        const top = [...data].sort((a, b) => b.count - a.count)[0];
                        if (!top) return '—';
                        const book = BIBLE_BOOKS.find(b => b.id === top.book);
                        return `${book?.name || '?'} (${top.count})`;
                      })()}
                    </span>
                  </div>
                  <div>
                    <span className="text-parchment-500">OT vs NT:</span>
                    <span className="ml-2 text-parchment-200 font-semibold">
                      {data.filter(d => d.book <= 39).reduce((s, d) => s + d.count, 0)} / {data.filter(d => d.book >= 40).reduce((s, d) => s + d.count, 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
