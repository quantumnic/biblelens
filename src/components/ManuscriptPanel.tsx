'use client';

import { useState, useEffect } from 'react';

interface Manuscript {
  id: string;
  name: string;
  symbol: string;
  date: string;
  language: string;
  content: string;
  location: string;
  digitalUrl?: string;
}

export default function ManuscriptPanel({ book, chapter, verse }: { book: number; chapter: number; verse: number }) {
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/manuscripts?book=${book}&chapter=${chapter}&verse=${verse}`)
      .then(r => r.json())
      .then(data => {
        setManuscripts(data.manuscripts || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [book, chapter, verse]);

  if (loading) return <div className="text-parchment-500 text-sm animate-pulse">Loading manuscript data…</div>;

  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
      <p className="text-xs text-parchment-500">{manuscripts.length} manuscript source{manuscripts.length !== 1 ? 's' : ''} attest this passage</p>
      
      {manuscripts.map(m => (
        <div key={m.id} className="bg-parchment-800 rounded-lg p-3 space-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-semibold text-parchment-100">{m.name}</h4>
              <span className="text-xs text-gold-400 font-mono">{m.symbol}</span>
            </div>
            {m.digitalUrl && (
              <a
                href={m.digitalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded bg-parchment-700 text-gold-400 hover:bg-gold-600 hover:text-parchment-950 transition-colors"
              >
                View →
              </a>
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-parchment-400">
            <div><span className="text-parchment-600">Date:</span> {m.date}</div>
            <div><span className="text-parchment-600">Lang:</span> {m.language}</div>
            <div className="col-span-2"><span className="text-parchment-600">Content:</span> {m.content}</div>
            <div className="col-span-2"><span className="text-parchment-600">Location:</span> {m.location}</div>
          </div>
        </div>
      ))}

      <div className="border-t border-parchment-700 pt-3">
        <h4 className="text-xs font-semibold text-parchment-400 uppercase tracking-wider mb-2">Digital Collections</h4>
        <div className="space-y-1">
          {[
            { name: 'CSNTM — NT Manuscripts', url: 'https://csntm.org' },
            { name: 'Codex Sinaiticus Project', url: 'https://codexsinaiticus.org' },
            { name: 'Dead Sea Scrolls Digital Library', url: 'https://www.deadseascrolls.org.il' },
            { name: 'Vatican Digital Library', url: 'https://digi.vatlib.it' },
          ].map(link => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-gold-400 hover:text-gold-300 transition-colors">
              📜 {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
