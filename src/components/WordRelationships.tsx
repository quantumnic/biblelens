'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CoOccurrence {
  id: string;
  original: string;
  transliteration: string;
  definition: string;
  language: string;
  shared_verses: number;
}

interface Props {
  strongsId: string;
}

export default function WordRelationships({ strongsId }: Props) {
  const [data, setData] = useState<{ coOccurrences: CoOccurrence[]; distribution: { oldTestament: number; newTestament: number } } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/word-relationships?id=${strongsId}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [strongsId]);

  if (loading) {
    return (
      <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 animate-pulse">
        <div className="h-4 bg-parchment-800 rounded w-40 mb-4" />
        <div className="space-y-2">
          {[1, 2, 3].map(i => <div key={i} className="h-10 bg-parchment-800 rounded" />)}
        </div>
      </div>
    );
  }

  if (!data || (!data.coOccurrences?.length && !data.distribution)) return null;

  const total = (data.distribution?.oldTestament || 0) + (data.distribution?.newTestament || 0);
  const otPct = total > 0 ? Math.round(((data.distribution?.oldTestament || 0) / total) * 100) : 0;
  const ntPct = total > 0 ? 100 - otPct : 0;

  return (
    <div className="space-y-6">
      {/* Testament Distribution */}
      {total > 0 && (
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-parchment-200 mb-3 font-serif">📊 Testament Distribution</h3>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex-1 h-6 bg-parchment-800 rounded-full overflow-hidden flex">
              {otPct > 0 && (
                <div
                  className="h-full bg-amber-500/70 flex items-center justify-center text-[10px] font-bold text-parchment-950"
                  style={{ width: `${otPct}%` }}
                >
                  {otPct > 15 ? `OT ${otPct}%` : ''}
                </div>
              )}
              {ntPct > 0 && (
                <div
                  className="h-full bg-blue-500/70 flex items-center justify-center text-[10px] font-bold text-parchment-950"
                  style={{ width: `${ntPct}%` }}
                >
                  {ntPct > 15 ? `NT ${ntPct}%` : ''}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between text-xs text-parchment-500">
            <span>🕎 Old Testament: {data.distribution.oldTestament} verses</span>
            <span>✝️ New Testament: {data.distribution.newTestament} verses</span>
          </div>
        </div>
      )}

      {/* Co-occurring Words */}
      {data.coOccurrences?.length > 0 && (
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-parchment-200 mb-2 font-serif">🔗 Co-occurring Words</h3>
          <p className="text-xs text-parchment-500 mb-4">Words that frequently appear alongside this term in the same verses.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {data.coOccurrences.slice(0, 10).map(co => (
              <Link
                key={co.id}
                href={`/word/${co.id}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-parchment-800 hover:bg-parchment-700 transition-colors group"
              >
                <span className="text-lg font-serif text-gold-400">{co.original}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-parchment-200 font-semibold truncate">
                    {co.transliteration} <span className="text-parchment-500 font-normal">({co.id})</span>
                  </p>
                  <p className="text-xs text-parchment-500 truncate">{co.definition}</p>
                </div>
                <span className="text-xs text-gold-500 font-semibold flex-shrink-0">{co.shared_verses}×</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
