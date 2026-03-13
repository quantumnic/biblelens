'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BIBLE_BOOKS, BookInfo } from '@/lib/bible-books';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedBook, setExpandedBook] = useState<number | null>(null);
  const [bookFilter, setBookFilter] = useState('');

  const filterLower = bookFilter.toLowerCase();
  const otBooks = BIBLE_BOOKS.filter(b => b.testament === 'OT' && (!filterLower || b.name.toLowerCase().includes(filterLower) || b.abbrev.toLowerCase().includes(filterLower)));
  const ntBooks = BIBLE_BOOKS.filter(b => b.testament === 'NT' && (!filterLower || b.name.toLowerCase().includes(filterLower) || b.abbrev.toLowerCase().includes(filterLower)));

  const toggleBook = (id: number) => {
    setExpandedBook(expandedBook === id ? null : id);
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
          <div className="grid grid-cols-2 gap-1.5 mb-3 px-2">
            <Link href="/search" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              🔍 Search
            </Link>
            <Link href="/compare" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              ⚖️ Compare
            </Link>
            <Link href="/analytics" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📊 Analytics
            </Link>
            <Link href="/word/G26" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📖 Strong&apos;s
            </Link>
            <Link href="/latin/amor" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📜 Latin
            </Link>
            <Link href="/verse-of-the-day" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              ✨ Daily
            </Link>
            <Link href="/parallels" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              🔀 Parallels
            </Link>
            <Link href="/bookmarks" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📑 Bookmarks
            </Link>
            <Link href="/timeline" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📅 Timeline
            </Link>
            <Link href="/study-notes" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📝 Notes
            </Link>
            <Link href="/reading-plans" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📅 Plans
            </Link>
            <Link href="/alphabet" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              🔤 Alphabet
            </Link>
            <Link href="/chiasm" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              🔄 Chiasm
            </Link>
            <Link href="/concordance" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              📖 Concordance
            </Link>
            <Link href="/geography" className="text-center text-xs py-2 bg-parchment-800 hover:bg-gold-600 hover:text-parchment-950 text-parchment-300 rounded transition-colors">
              🗺️ Geography
            </Link>
          </div>

          {/* Book filter */}
          <div className="px-2 mb-2">
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
