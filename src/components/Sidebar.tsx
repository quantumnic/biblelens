'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BIBLE_BOOKS, BookInfo } from '@/lib/bible-books';

interface NavSection {
  label: string;
  links: { href: string; icon: string; label: string }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: '📚 Study Tools',
    links: [
      { href: '/search', icon: '🔍', label: 'Search' },
      { href: '/compare', icon: '⚖️', label: 'Compare' },
      { href: '/analytics', icon: '📊', label: 'Analytics' },
      { href: '/word/G26', icon: '📖', label: "Strong's" },
      { href: '/latin/amor', icon: '📜', label: 'Latin' },
      { href: '/concordance', icon: '📖', label: 'Concordance' },
      { href: '/heatmap', icon: '🔥', label: 'Heatmap' },
    ],
  },
  {
    label: '⛪ Theological',
    links: [
      { href: '/parallels', icon: '🔀', label: 'Parallels' },
      { href: '/chiasm', icon: '🔄', label: 'Chiasm' },
      { href: '/typology', icon: '🔗', label: 'Typology' },
      { href: '/prophecies', icon: '🔮', label: 'Prophecies' },
      { href: '/covenants', icon: '📜', label: 'Covenants' },
      { href: '/beatitudes', icon: '😇', label: 'Beatitudes' },
      { href: '/figures', icon: '🎭', label: 'Figures' },
    ],
  },
  {
    label: '📖 Reference',
    links: [
      { href: '/names-of-god', icon: '✡️', label: 'Names' },
      { href: '/persons', icon: '👤', label: 'Persons' },
      { href: '/parables', icon: '🌾', label: 'Parables' },
      { href: '/miracles', icon: '✨', label: 'Miracles' },
      { href: '/prayers', icon: '🙏', label: 'Prayers' },
      { href: '/sacrifices', icon: '🔥', label: 'Sacrifices' },
      { href: '/geography', icon: '🗺️', label: 'Geography' },
      { href: '/alphabet', icon: '🔤', label: 'Alphabet' },
    ],
  },
  {
    label: '📝 Personal',
    links: [
      { href: '/verse-of-the-day', icon: '✨', label: 'Daily' },
      { href: '/bookmarks', icon: '📑', label: 'Bookmarks' },
      { href: '/timeline', icon: '📅', label: 'Timeline' },
      { href: '/study-notes', icon: '📝', label: 'Notes' },
      { href: '/reading-plans', icon: '📅', label: 'Plans' },
    ],
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedBook, setExpandedBook] = useState<number | null>(null);
  const [bookFilter, setBookFilter] = useState('');
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const filterLower = bookFilter.toLowerCase();
  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'OT' && (!filterLower || b.name.toLowerCase().includes(filterLower) || b.abbrev.toLowerCase().includes(filterLower)));
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'NT' && (!filterLower || b.name.toLowerCase().includes(filterLower) || b.abbrev.toLowerCase().includes(filterLower)));

  const toggleBook = (id: number) => {
    setExpandedBook(expandedBook === id ? null : id);
  };

  const toggleSection = (label: string) => {
    setCollapsedSections(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const renderBook = (book: BookInfo) => (
    <div key={book.id}>
      <button
        onClick={() => toggleBook(book.id)}
        className="w-full text-left px-3 py-1.5 text-sm hover:bg-parchment-800 rounded transition-colors flex justify-between items-center text-parchment-200"
      >
        <span>{book.name}</span>
        <span className="text-xs text-parchment-500">{book.chapters}</span>
      </button>
      {expandedBook === book.id && (
        <div className="grid grid-cols-5 gap-1 px-3 py-2">
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map(ch => (
            <Link
              key={ch}
              href={`/reader/${book.name.toLowerCase().replace(/ /g, '-')}/${ch}`}
              className="text-center text-xs py-1 rounded bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {ch}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-parchment-800 text-gold-400 p-2 rounded-lg shadow-lg"
        aria-label="Toggle navigation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-parchment-900 border-r border-parchment-800 overflow-y-auto z-40 transform transition-transform lg:transform-none ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-parchment-800">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <h1 className="text-xl font-bold text-gold-400 font-serif">BibleLens</h1>
          </Link>
          <p className="text-xs text-parchment-500 mt-1">Analytical Bible Study</p>
        </div>

        <nav className="p-2">
          {/* Collapsible nav sections */}
          {NAV_SECTIONS.map(section => {
            const isCollapsed = collapsedSections.has(section.label);
            return (
              <div key={section.label} className="mb-2">
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-gold-500 uppercase tracking-wider hover:text-gold-400 transition-colors"
                >
                  <span>{section.label}</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {!isCollapsed && (
                  <div className="grid grid-cols-2 gap-1.5 px-2 mb-1">
                    {section.links.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.icon} {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Book filter */}
          <div className="px-2 mb-2 mt-2">
            <input
              type="text"
              value={bookFilter}
              onChange={(e) => setBookFilter(e.target.value)}
              placeholder="Filter books..."
              className="w-full text-xs px-3 py-1.5 bg-parchment-800 border border-parchment-700 rounded text-parchment-200 placeholder-parchment-600 focus:outline-none focus:border-gold-500/50 transition-colors"
            />
          </div>

          <div className="mb-2">
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider px-3 py-2">Old Testament</h3>
            {otBooks.map(renderBook)}
          </div>
          <div className="mt-4">
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider px-3 py-2">New Testament</h3>
            {ntBooks.map(renderBook)}
          </div>
        </nav>
      </aside>
    </>
  );
}
