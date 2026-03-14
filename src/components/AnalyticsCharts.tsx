'use client';

import { useState, useEffect } from 'react';
import WordCloud from './WordCloud';

interface WordFreq { word: string; count: number; }
interface SentimentPoint { chapter: number; positive: number; negative: number; score: number; }
interface BookStat { name: string; book: number; verses: number; chars: number; testament: string; }
interface TimelineEvent { book: string; period: string; event: string; }
interface ThemeData { theme: string; count: number; topVerses: { book: number; chapter: number; verse: number; matches: number }[] }

interface Props {
  topWords: WordFreq[];
  sentimentData: SentimentPoint[];
  bookStats: BookStat[];
  timeline: TimelineEvent[];
  bookName: string;
  sentBookName: string;
  bookId?: number;
}

export default function AnalyticsCharts({ topWords, sentimentData, bookStats, timeline, bookName, sentBookName, bookId }: Props) {
  const maxWordCount = topWords[0]?.count || 1;
  const maxSentiment = Math.max(...sentimentData.map(s => Math.abs(s.score)), 1);
  const maxVerses = Math.max(...bookStats.map(b => b.verses), 1);

  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [themesLoading, setThemesLoading] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('all');

  useEffect(() => {
    setThemesLoading(true);
    const url = bookId && bookId > 0
      ? `/api/theological-themes?book=${bookId}`
      : '/api/theological-themes';
    fetch(url)
      .then(r => r.json())
      .then(d => { setThemes(d.data || []); setThemesLoading(false); })
      .catch(() => setThemesLoading(false));
  }, [bookId]);

  const maxThemeCount = themes[0]?.count || 1;

  const [coWord, setCoWord] = useState('');
  const [coResults, setCoResults] = useState<{ word: string; count: number; percentage: number }[]>([]);
  const [coTotal, setCoTotal] = useState(0);
  const [coLoading, setCoLoading] = useState(false);

  const searchCoOccurrences = () => {
    if (!coWord.trim()) return;
    setCoLoading(true);
    const url = bookId && bookId > 0
      ? `/api/co-occurrence?word=${encodeURIComponent(coWord.trim().toLowerCase())}&book=${bookId}`
      : `/api/co-occurrence?word=${encodeURIComponent(coWord.trim().toLowerCase())}`;
    fetch(url)
      .then(r => r.json())
      .then(d => {
        setCoResults(d.coOccurrences || []);
        setCoTotal(d.totalVerses || 0);
        setCoLoading(false);
      })
      .catch(() => setCoLoading(false));
  };

  const sections = [
    { id: 'all', label: '📋 All' },
    { id: 'words', label: '📝 Words' },
    { id: 'cooccurrence', label: '🔗 Co-occur' },
    { id: 'sentiment', label: '🎭 Sentiment' },
    { id: 'themes', label: '⛪ Themes' },
    { id: 'books', label: '📚 Books' },
    { id: 'timeline', label: '⏳ Timeline' },
  ];

  const show = (section: string) => activeSection === 'all' || activeSection === section;

  return (
    <div className="space-y-6">
      {/* Section filter */}
      <div className="flex flex-wrap gap-2">
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              activeSection === s.id
                ? 'bg-gold-600 text-parchment-950 border-gold-600 font-semibold'
                : 'bg-parchment-900 text-parchment-400 border-parchment-700 hover:border-gold-500'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Word Frequency */}
      {show('words') && (
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-1">📝 Word Frequency</h2>
          <p className="text-xs text-parchment-500 mb-4">Top 30 words in {bookName} (KJV, stop words excluded)</p>
          
          {/* Word Cloud visualization */}
          <div className="mb-6 bg-parchment-800/30 rounded-xl p-4 border border-parchment-800">
            <p className="text-xs text-parchment-500 mb-2 text-center uppercase tracking-wider">Word Cloud</p>
            <WordCloud words={topWords} maxWords={30} />
          </div>

          <div className="space-y-1">
            {topWords.map(w => (
              <div key={w.word} className="flex items-center gap-3">
                <span className="text-xs text-parchment-400 w-24 text-right font-mono">{w.word}</span>
                <div className="flex-1 h-5 bg-parchment-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold-600 to-gold-400 rounded-full transition-all"
                    style={{ width: `${(w.count / maxWordCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-parchment-500 w-12">{w.count}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Word Co-occurrence */}
      {show('cooccurrence') && (
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-1">🔗 Word Co-occurrence</h2>
          <p className="text-xs text-parchment-500 mb-4">Find which words appear most often alongside a given word in {bookName}</p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={coWord}
              onChange={e => setCoWord(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchCoOccurrences()}
              placeholder="Enter a word (e.g., love, faith, sin)..."
              className="flex-1 text-sm px-3 py-2 bg-parchment-800 border border-parchment-700 rounded-lg text-parchment-200 placeholder-parchment-600 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
            <button
              onClick={searchCoOccurrences}
              disabled={coLoading}
              className="px-4 py-2 bg-gold-600 text-parchment-950 rounded-lg text-sm font-semibold hover:bg-gold-500 transition-colors disabled:opacity-50"
            >
              {coLoading ? '...' : 'Search'}
            </button>
          </div>
          {coTotal > 0 && (
            <>
              <p className="text-xs text-parchment-500 mb-3">
                Found <span className="text-gold-400 font-semibold">&ldquo;{coWord}&rdquo;</span> in {coTotal} verses. Top co-occurring words:
              </p>
              <div className="space-y-1">
                {coResults.map(r => (
                  <div key={r.word} className="flex items-center gap-3">
                    <span className="text-xs text-parchment-400 w-24 text-right font-mono">{r.word}</span>
                    <div className="flex-1 h-5 bg-parchment-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all"
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-parchment-500 w-16">{r.count} ({r.percentage}%)</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {coTotal === 0 && coResults.length === 0 && !coLoading && coWord && (
            <p className="text-sm text-parchment-500">No results. Try a different word.</p>
          )}
        </section>
      )}

      {/* Sentiment Analysis */}
      {show('sentiment') && (
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-1">🎭 Sentiment Analysis</h2>
          <p className="text-xs text-parchment-500 mb-4">{sentBookName} — positive vs negative word density per chapter</p>
          <div className="flex items-end gap-[2px] h-48 overflow-x-auto pb-6">
            {sentimentData.map(s => {
              const height = Math.abs(s.score) / maxSentiment * 100;
              const isPositive = s.score >= 0;
              return (
                <div key={s.chapter} className="flex flex-col items-center min-w-[12px] relative group" style={{ height: '100%' }}>
                  <div className="flex-1 flex items-end w-full">
                    <div
                      className={`w-full rounded-t transition-all ${isPositive ? 'bg-emerald-500/70' : 'bg-red-500/70'}`}
                      style={{ height: `${Math.max(height, 4)}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-parchment-600 mt-1">{s.chapter}</span>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-parchment-800 text-xs text-parchment-200 px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    Ch. {s.chapter}: +{s.positive} / -{s.negative} = {s.score > 0 ? '+' : ''}{s.score}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 text-xs text-parchment-500 mt-2">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/70" /> Positive</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/70" /> Negative</span>
          </div>
        </section>
      )}

      {/* Theological Themes */}
      {show('themes') && (
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-1">⛪ Theological Themes</h2>
          <p className="text-xs text-parchment-500 mb-4">Keyword-based theme density in {bookName}</p>
          {themesLoading ? (
            <div className="text-parchment-500 text-sm animate-pulse">Analyzing themes…</div>
          ) : (
            <div className="space-y-2">
              {themes.map(t => (
                <div key={t.theme} className="group">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-parchment-300 w-28 text-right font-medium">{t.theme}</span>
                    <div className="flex-1 h-6 bg-parchment-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600/70 to-blue-400/70 rounded-full transition-all flex items-center pl-2"
                        style={{ width: `${Math.max((t.count / maxThemeCount) * 100, 5)}%` }}
                      >
                        <span className="text-[10px] text-white font-mono">{t.count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Book Statistics */}
      {show('books') && (
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-1">📚 Book Statistics</h2>
          <p className="text-xs text-parchment-500 mb-4">Verse count per book — all 66 books</p>
          <div className="flex items-end gap-[2px] h-40 overflow-x-auto pb-6">
            {bookStats.map(b => {
              const height = (b.verses / maxVerses) * 100;
              return (
                <div key={b.book} className="flex flex-col items-center min-w-[10px] relative group" style={{ height: '100%' }}>
                  <div className="flex-1 flex items-end w-full">
                    <div
                      className={`w-full rounded-t transition-all ${b.testament === 'OT' ? 'bg-amber-600/70' : 'bg-blue-500/70'}`}
                      style={{ height: `${Math.max(height, 2)}%` }}
                    />
                  </div>
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-parchment-800 text-xs text-parchment-200 px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                    {b.name}: {b.verses} verses
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 text-xs text-parchment-500 mt-2">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-600/70" /> Old Testament</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500/70" /> New Testament</span>
          </div>
        </section>
      )}

      {/* Historical Timeline */}
      {show('timeline') && (
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-1">⏳ Historical Timeline</h2>
          <p className="text-xs text-parchment-500 mb-4">When books were written and what was happening in the world</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold-600/30" />
            <div className="space-y-4">
              {timeline.map((t, i) => (
                <div key={i} className="flex items-start gap-4 ml-1">
                  <div className="w-7 h-7 rounded-full bg-gold-600 flex items-center justify-center text-xs text-parchment-950 font-bold flex-shrink-0 relative z-10">
                    {i + 1}
                  </div>
                  <div className="bg-parchment-800 rounded-lg p-3 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-gold-400">{t.book}</span>
                      <span className="text-xs text-parchment-500 font-mono">{t.period}</span>
                    </div>
                    <p className="text-xs text-parchment-400">{t.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reading Time Estimates */}
      <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-parchment-100 mb-1">⏱️ Estimated Reading Time</h2>
        <p className="text-xs text-parchment-500 mb-4">Based on ~200 words per minute (careful reading pace)</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {(() => {
            const totalChars = bookStats.reduce((s, b) => s + b.chars, 0);
            const totalWords = Math.round(totalChars / 5.5); // avg word length
            const totalHours = Math.round(totalWords / 200 / 60);
            const otChars = bookStats.filter(b => b.testament === 'OT').reduce((s, b) => s + b.chars, 0);
            const otHours = Math.round(Math.round(otChars / 5.5) / 200 / 60);
            const ntChars = bookStats.filter(b => b.testament === 'NT').reduce((s, b) => s + b.chars, 0);
            const ntHours = Math.round(Math.round(ntChars / 5.5) / 200 / 60);
            const topBooks = [...bookStats].sort((a, b) => b.chars - a.chars).slice(0, 5);
            return [
              { label: 'Entire Bible', value: `~${totalHours}h`, sub: `${totalWords.toLocaleString()} words` },
              { label: 'Old Testament', value: `~${otHours}h`, sub: `${bookStats.filter(b => b.testament === 'OT').length} books` },
              { label: 'New Testament', value: `~${ntHours}h`, sub: `${bookStats.filter(b => b.testament === 'NT').length} books` },
              ...topBooks.map(b => ({
                label: b.name,
                value: `~${Math.max(1, Math.round(Math.round(b.chars / 5.5) / 200))}min`,
                sub: `${b.verses} verses`,
              })),
            ].map(item => (
              <div key={item.label} className="bg-parchment-800 rounded-lg p-3 text-center">
                <div className="text-lg font-bold text-gold-400">{item.value}</div>
                <div className="text-xs text-parchment-200 font-medium">{item.label}</div>
                <div className="text-xs text-parchment-500">{item.sub}</div>
              </div>
            ));
          })()}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Verses (KJV)', value: bookStats.reduce((s, b) => s + b.verses, 0).toLocaleString() },
          { label: 'Old Testament Books', value: bookStats.filter(b => b.testament === 'OT').length },
          { label: 'New Testament Books', value: bookStats.filter(b => b.testament === 'NT').length },
          { label: 'Total Characters', value: (bookStats.reduce((s, b) => s + b.chars, 0) / 1000000).toFixed(1) + 'M' },
        ].map(s => (
          <div key={s.label} className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{s.value}</div>
            <div className="text-xs text-parchment-500 mt-1">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Verse Density — avg chars per verse by book */}
      <section className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-parchment-200 mb-4 font-serif">📐 Verse Density (avg chars/verse)</h3>
        <p className="text-xs text-parchment-500 mb-3">Which books have the longest or shortest verses on average?</p>
        <div className="flex flex-wrap gap-2">
          {(() => {
            const densities = bookStats
              .filter(b => b.verses > 0)
              .map(b => ({ name: b.name, density: Math.round(b.chars / b.verses), testament: b.testament }))
              .sort((a, b) => b.density - a.density);
            const maxDensity = densities[0]?.density || 1;
            return densities.slice(0, 20).map(d => (
              <div key={d.name} className="flex items-center gap-2 bg-parchment-800 rounded-lg px-3 py-1.5">
                <span className={`text-xs font-medium ${d.testament === 'OT' ? 'text-amber-400' : 'text-blue-400'}`}>{d.name}</span>
                <div className="w-20 h-2 bg-parchment-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500 rounded-full" style={{ width: `${(d.density / maxDensity) * 100}%` }} />
                </div>
                <span className="text-xs text-parchment-400">{d.density}</span>
              </div>
            ));
          })()}
        </div>
      </section>
    </div>
  );
}
