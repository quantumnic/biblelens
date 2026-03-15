'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { BIBLE_BOOKS } from '@/lib/bible-books';

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ type: string; label: string; href: string; icon: string }[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const PAGES = [
    { label: 'Search', href: '/search', icon: '🔍' },
    { label: 'Compare Translations', href: '/compare', icon: '⚖️' },
    { label: 'Analytics Dashboard', href: '/analytics', icon: '📊' },
    { label: "Strong's Concordance", href: '/concordance', icon: '📖' },
    { label: 'Latin Vulgate', href: '/latin/amor', icon: '📜' },
    { label: 'Word Heatmap', href: '/heatmap', icon: '🔥' },
    { label: 'Synoptic Parallels', href: '/parallels', icon: '🔀' },
    { label: 'Chiastic Structures', href: '/chiasm', icon: '🔄' },
    { label: 'Typology', href: '/typology', icon: '🔗' },
    { label: 'Prophecies', href: '/prophecies', icon: '🔮' },
    { label: 'Covenants', href: '/covenants', icon: '📜' },
    { label: 'Beatitudes', href: '/beatitudes', icon: '😇' },
    { label: 'Figures of Speech', href: '/figures', icon: '🎭' },
    { label: 'Names of God', href: '/names-of-god', icon: '✡️' },
    { label: 'Key Persons', href: '/persons', icon: '👤' },
    { label: 'Parables', href: '/parables', icon: '🌾' },
    { label: 'Miracles', href: '/miracles', icon: '✨' },
    { label: 'Prayers', href: '/prayers', icon: '🙏' },
    { label: 'Sacrifices', href: '/sacrifices', icon: '🔥' },
    { label: 'Geography', href: '/geography', icon: '🗺️' },
    { label: 'Alphabets', href: '/alphabet', icon: '🔤' },
    { label: 'Genealogies', href: '/genealogy', icon: '🌳' },
    { label: 'Verse of the Day', href: '/verse-of-the-day', icon: '✨' },
    { label: 'Bookmarks', href: '/bookmarks', icon: '📑' },
    { label: 'Timeline', href: '/timeline', icon: '📅' },
    { label: 'Study Notes', href: '/study-notes', icon: '📝' },
    { label: 'Reading Plans', href: '/reading-plans', icon: '📅' },
  ];

  const computeResults = useCallback((q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    const lower = q.toLowerCase();
    const matched: { type: string; label: string; href: string; icon: string }[] = [];

    // Search pages
    for (const p of PAGES) {
      if (p.label.toLowerCase().includes(lower)) {
        matched.push({ type: 'page', ...p });
      }
    }

    // Search books
    for (const book of BIBLE_BOOKS) {
      if (book.name.toLowerCase().includes(lower) || book.abbrev.toLowerCase().includes(lower)) {
        matched.push({
          type: 'book',
          label: book.name,
          href: `/reader/${book.name.toLowerCase().replace(/ /g, '-')}/1`,
          icon: book.testament === 'OT' ? '🕎' : '✝️',
        });
      }
    }

    // Detect verse reference patterns like "John 3:16" or "Gen 1"
    const refMatch = q.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
    if (refMatch) {
      const bookName = refMatch[1].toLowerCase();
      const ch = refMatch[2];
      const vs = refMatch[3];
      const book = BIBLE_BOOKS.find(b =>
        b.name.toLowerCase().startsWith(bookName) || b.abbrev.toLowerCase().startsWith(bookName)
      );
      if (book) {
        const slug = book.name.toLowerCase().replace(/ /g, '-');
        const href = vs ? `/reader/${slug}/${ch}#v${vs}` : `/reader/${slug}/${ch}`;
        matched.unshift({
          type: 'verse',
          label: `${book.name} ${ch}${vs ? ':' + vs : ''}`,
          href,
          icon: '📖',
        });
      }
    }

    // Search for Strong's
    if (lower.match(/^[hg]\d+$/i)) {
      matched.unshift({
        type: 'strongs',
        label: `Strong's ${q.toUpperCase()}`,
        href: `/word/${q.toUpperCase()}`,
        icon: '📖',
      });
    }

    // Full-text search link
    matched.push({
      type: 'search',
      label: `Search for "${q}"`,
      href: `/search?q=${encodeURIComponent(q)}`,
      icon: '🔍',
    });

    setResults(matched.slice(0, 12));
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    computeResults(query);
  }, [query, computeResults]);

  const navigate = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      navigate(results[selectedIndex].href);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-parchment-800 border border-parchment-700 text-parchment-400 px-3 py-1.5 rounded-lg text-xs hover:border-gold-500/50 hover:text-gold-400 transition-colors shadow-lg flex items-center gap-2"
        title="Quick search (⌘K)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>⌘K</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]" onClick={() => setIsOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-parchment-900 border border-parchment-700 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-parchment-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-parchment-500"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, books, verses, Strong's..."
            className="flex-1 bg-transparent text-parchment-100 placeholder-parchment-600 text-sm focus:outline-none"
          />
          <kbd className="text-[10px] text-parchment-600 border border-parchment-700 rounded px-1.5 py-0.5">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => navigate(r.href)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  i === selectedIndex
                    ? 'bg-gold-600/20 text-gold-400'
                    : 'text-parchment-300 hover:bg-parchment-800'
                }`}
              >
                <span className="text-base">{r.icon}</span>
                <span className="flex-1">{r.label}</span>
                <span className="text-[10px] text-parchment-600 uppercase">{r.type}</span>
              </button>
            ))}
          </div>
        )}

        {!query && (
          <div className="p-4 text-center text-xs text-parchment-600">
            Type to search books, pages, verses (e.g. &quot;John 3:16&quot;), or Strong&apos;s numbers (e.g. &quot;G26&quot;)
          </div>
        )}
      </div>
    </div>
  );
}
