'use client';

interface WordFreq { word: string; count: number; }
interface SentimentPoint { chapter: number; positive: number; negative: number; score: number; }
interface BookStat { name: string; book: number; verses: number; chars: number; testament: string; }
interface TimelineEvent { book: string; period: string; event: string; }

interface Props {
  topWords: WordFreq[];
  sentimentData: SentimentPoint[];
  bookStats: BookStat[];
  timeline: TimelineEvent[];
  bookName: string;
  sentBookName: string;
}

export default function AnalyticsCharts({ topWords, sentimentData, bookStats, timeline, bookName, sentBookName }: Props) {
  const maxWordCount = topWords[0]?.count || 1;
  const maxSentiment = Math.max(...sentimentData.map(s => Math.abs(s.score)), 1);
  const maxVerses = Math.max(...bookStats.map(b => b.verses), 1);

  return (
    <div className="space-y-8">
      {/* Word Frequency */}
      <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-parchment-200 mb-1">📝 Word Frequency</h2>
        <p className="text-xs text-parchment-500 mb-4">Top 30 words in {bookName} (KJV, stop words excluded)</p>
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

      {/* Sentiment Analysis */}
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
                
                {/* Tooltip */}
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

      {/* Book Statistics */}
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

      {/* Historical Timeline */}
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
    </div>
  );
}
