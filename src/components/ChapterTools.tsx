'use client';

import { useState } from 'react';
import DiscoursePanel from './DiscoursePanel';

export default function ChapterTools({ book, chapter }: { book: number; chapter: number }) {
  const [showDiscourse, setShowDiscourse] = useState(false);

  return (
    <div className="mt-6 border-t border-parchment-800 pt-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowDiscourse(!showDiscourse)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            showDiscourse
              ? 'bg-gold-600 text-parchment-950 border-gold-600 font-semibold'
              : 'bg-parchment-900 text-parchment-400 border-parchment-700 hover:border-gold-500'
          }`}
        >
          📐 Discourse Analysis
        </button>
      </div>
      {showDiscourse && <DiscoursePanel book={book} chapter={chapter} />}
    </div>
  );
}
