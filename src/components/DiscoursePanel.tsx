'use client';

import { useState, useEffect } from 'react';

interface DiscourseFeature {
  type: string;
  description: string;
  category: string;
  markers: string[];
}

interface VerseAnalysis {
  verse: number;
  text: string;
  features: DiscourseFeature[];
}

interface ChapterFeature {
  type: string;
  details: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'rhetoric': 'bg-blue-900/30 text-blue-300 border-blue-700/30',
  'logic': 'bg-green-900/30 text-green-300 border-green-700/30',
  'speech-act': 'bg-purple-900/30 text-purple-300 border-purple-700/30',
  'structure': 'bg-amber-900/30 text-amber-300 border-amber-700/30',
};

export default function DiscoursePanel({ book, chapter }: { book: number; chapter: number }) {
  const [data, setData] = useState<{ chapterFeatures: ChapterFeature[]; verses: VerseAnalysis[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/discourse?book=${book}&chapter=${chapter}`)
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [book, chapter]);

  if (loading) return <div className="text-parchment-500 text-sm animate-pulse p-4">Analyzing discourse structure…</div>;
  if (!data || !data.verses) return <div className="text-parchment-500 text-sm p-4">No analysis available.</div>;

  const versesWithFeatures = data.verses.filter(v => v.features.length > 0);

  return (
    <div className="space-y-4">
      {/* Chapter-level features */}
      {data.chapterFeatures.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider text-gold-500 font-semibold">Chapter-Level Patterns</h4>
          {data.chapterFeatures.map((f, i) => (
            <div key={i} className="p-3 rounded-lg bg-amber-900/20 border border-amber-700/20">
              <p className="text-sm font-semibold text-parchment-200">{f.type}</p>
              <p className="text-xs text-parchment-400 mt-1">{f.details}</p>
            </div>
          ))}
        </div>
      )}

      {/* Verse-level features */}
      <div className="space-y-2">
        <h4 className="text-xs uppercase tracking-wider text-gold-500 font-semibold">
          Verse Analysis ({versesWithFeatures.length} of {data.verses.length} verses with features)
        </h4>
        {versesWithFeatures.map(v => (
          <div key={v.verse} className="p-3 rounded-lg bg-parchment-800/50">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-xs font-mono text-gold-400 mt-0.5">v{v.verse}</span>
              <p className="text-xs text-parchment-300 line-clamp-2 italic">{v.text}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 ml-6">
              {v.features.map((f, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[f.category] || 'bg-parchment-800 text-parchment-400'}`}
                  title={`${f.description}\nMarkers: ${f.markers.join(', ')}`}
                >
                  {f.type}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
