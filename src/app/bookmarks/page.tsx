'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { BIBLE_BOOKS } from '@/lib/bible-books';

interface Bookmark {
  id: string;
  book: number;
  chapter: number;
  verse?: number;
  note: string;
  color: string;
  createdAt: string;
}

interface ReadingHistory {
  book: number;
  chapter: number;
  timestamp: string;
}

const COLORS = [
  { name: 'Gold', value: 'bg-gold-500/20 border-gold-500/40' },
  { name: 'Blue', value: 'bg-blue-500/20 border-blue-500/40' },
  { name: 'Green', value: 'bg-emerald-500/20 border-emerald-500/40' },
  { name: 'Red', value: 'bg-red-500/20 border-red-500/40' },
  { name: 'Purple', value: 'bg-purple-500/20 border-purple-500/40' },
];

function getBookName(id: number): string {
  return BIBLE_BOOKS.find(b => b.id === id)?.name || `Book ${id}`;
}
function getBookSlug(id: number): string {
  return (BIBLE_BOOKS.find(b => b.id === id)?.name || '').toLowerCase().replace(/ /g, '-');
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history'>('bookmarks');
  const [newNote, setNewNote] = useState('');
  const [newColor, setNewColor] = useState(COLORS[0].value);
  const [showAdd, setShowAdd] = useState(false);
  const [addBook, setAddBook] = useState(1);
  const [addChapter, setAddChapter] = useState(1);
  const [addVerse, setAddVerse] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('biblelens-bookmarks');
    if (stored) setBookmarks(JSON.parse(stored));
    const hist = localStorage.getItem('biblelens-history');
    if (hist) setHistory(JSON.parse(hist));
  }, []);

  const saveBookmarks = (bms: Bookmark[]) => {
    setBookmarks(bms);
    localStorage.setItem('biblelens-bookmarks', JSON.stringify(bms));
  };

  const addBookmark = () => {
    const bm: Bookmark = {
      id: Date.now().toString(36),
      book: addBook,
      chapter: addChapter,
      verse: addVerse ? parseInt(addVerse) : undefined,
      note: newNote,
      color: newColor,
      createdAt: new Date().toISOString(),
    };
    saveBookmarks([bm, ...bookmarks]);
    setNewNote('');
    setAddVerse('');
    setShowAdd(false);
  };

  const removeBookmark = (id: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('biblelens-history');
  };

  const selectedBookChapters = BIBLE_BOOKS.find(b => b.id === addBook)?.chapters || 1;

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-4xl">
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">📑 Bookmarks & History</h1>
        <p className="text-sm text-parchment-400 mb-6">Your saved passages and reading history (stored locally)</p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'bookmarks' ? 'bg-gold-600 text-parchment-950' : 'bg-parchment-900 text-parchment-400 hover:text-parchment-200'
            }`}
          >
            📌 Bookmarks ({bookmarks.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'history' ? 'bg-gold-600 text-parchment-950' : 'bg-parchment-900 text-parchment-400 hover:text-parchment-200'
            }`}
          >
            📖 History ({history.length})
          </button>
        </div>

        {/* Bookmarks Tab */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-4">
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="px-4 py-2 bg-gold-600 text-parchment-950 rounded-lg text-sm font-semibold hover:bg-gold-500 transition-colors"
            >
              {showAdd ? '✕ Cancel' : '+ Add Bookmark'}
            </button>

            {showAdd && (
              <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 space-y-3 animate-fade-in">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-parchment-500 block mb-1">Book</label>
                    <select
                      value={addBook}
                      onChange={e => { setAddBook(parseInt(e.target.value)); setAddChapter(1); }}
                      className="w-full bg-parchment-800 text-parchment-200 rounded px-2 py-1.5 text-sm border border-parchment-700"
                    >
                      {BIBLE_BOOKS.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-parchment-500 block mb-1">Chapter</label>
                    <select
                      value={addChapter}
                      onChange={e => setAddChapter(parseInt(e.target.value))}
                      className="w-full bg-parchment-800 text-parchment-200 rounded px-2 py-1.5 text-sm border border-parchment-700"
                    >
                      {Array.from({ length: selectedBookChapters }, (_, i) => i + 1).map(c =>
                        <option key={c} value={c}>{c}</option>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-parchment-500 block mb-1">Verse (opt)</label>
                    <input
                      type="number"
                      value={addVerse}
                      onChange={e => setAddVerse(e.target.value)}
                      placeholder="—"
                      className="w-full bg-parchment-800 text-parchment-200 rounded px-2 py-1.5 text-sm border border-parchment-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-parchment-500 block mb-1">Note</label>
                  <input
                    type="text"
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                    placeholder="Your note..."
                    className="w-full bg-parchment-800 text-parchment-200 rounded px-2 py-1.5 text-sm border border-parchment-700"
                  />
                </div>
                <div>
                  <label className="text-xs text-parchment-500 block mb-1">Color</label>
                  <div className="flex gap-2">
                    {COLORS.map(c => (
                      <button
                        key={c.name}
                        onClick={() => setNewColor(c.value)}
                        className={`w-8 h-8 rounded-full border-2 ${c.value} ${newColor === c.value ? 'ring-2 ring-gold-400' : ''}`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={addBookmark}
                  className="px-4 py-2 bg-gold-600 text-parchment-950 rounded-lg text-sm font-semibold hover:bg-gold-500 transition-colors"
                >
                  Save Bookmark
                </button>
              </div>
            )}

            {bookmarks.length === 0 ? (
              <div className="text-center py-12 text-parchment-500">
                <p className="text-lg mb-2">No bookmarks yet</p>
                <p className="text-sm">Add bookmarks to save your favourite passages</p>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarks.map(bm => (
                  <div key={bm.id} className={`flex items-center gap-3 p-3 rounded-xl border ${bm.color} transition-all`}>
                    <Link
                      href={`/reader/${getBookSlug(bm.book)}/${bm.chapter}${bm.verse ? `#v${bm.verse}` : ''}`}
                      className="flex-1"
                    >
                      <p className="text-sm font-semibold text-parchment-200">
                        {getBookName(bm.book)} {bm.chapter}{bm.verse ? `:${bm.verse}` : ''}
                      </p>
                      {bm.note && <p className="text-xs text-parchment-400 mt-0.5">{bm.note}</p>}
                      <p className="text-xs text-parchment-600 mt-0.5">{new Date(bm.createdAt).toLocaleDateString()}</p>
                    </Link>
                    <button
                      onClick={() => removeBookmark(bm.id)}
                      className="text-parchment-600 hover:text-red-400 text-sm p-1 transition-colors"
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-parchment-500 hover:text-red-400 transition-colors"
              >
                Clear history
              </button>
            )}
            {history.length === 0 ? (
              <div className="text-center py-12 text-parchment-500">
                <p className="text-lg mb-2">No reading history</p>
                <p className="text-sm">Start reading to build your history</p>
              </div>
            ) : (
              <div className="space-y-1">
                {history.slice(0, 100).map((h, i) => (
                  <Link
                    key={i}
                    href={`/reader/${getBookSlug(h.book)}/${h.chapter}`}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-parchment-900/50 transition-colors"
                  >
                    <span className="text-sm text-parchment-200">{getBookName(h.book)} {h.chapter}</span>
                    <span className="text-xs text-parchment-600">{new Date(h.timestamp).toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
