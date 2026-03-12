'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  bookSlug: string;
  chapter: number;
  maxChapter: number;
  prevBookSlug?: string;
  prevBookMaxChapter?: number;
  nextBookSlug?: string;
}

export default function KeyboardNav({ bookSlug, chapter, maxChapter, prevBookSlug, prevBookMaxChapter, nextBookSlug }: Props) {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) return;

      switch (e.key) {
        case 'ArrowLeft':
        case 'h':
          e.preventDefault();
          if (chapter > 1) {
            router.push(`/reader/${bookSlug}/${chapter - 1}`);
          } else if (prevBookSlug && prevBookMaxChapter) {
            router.push(`/reader/${prevBookSlug}/${prevBookMaxChapter}`);
          }
          break;
        case 'ArrowRight':
        case 'l':
          e.preventDefault();
          if (chapter < maxChapter) {
            router.push(`/reader/${bookSlug}/${chapter + 1}`);
          } else if (nextBookSlug) {
            router.push(`/reader/${nextBookSlug}/1`);
          }
          break;
        case '/':
          e.preventDefault();
          router.push('/search');
          break;
        case '?':
          e.preventDefault();
          setShowHelp(prev => !prev);
          break;
        case 'Escape':
          setShowHelp(false);
          break;
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [bookSlug, chapter, maxChapter, prevBookSlug, prevBookMaxChapter, nextBookSlug, router]);

  if (!showHelp) {
    return (
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-4 right-4 z-40 w-8 h-8 rounded-full bg-parchment-800 border border-parchment-700 text-parchment-500 hover:text-gold-400 hover:border-gold-500/30 text-xs font-bold transition-all no-print"
        title="Keyboard shortcuts (?)"
      >
        ?
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 no-print" onClick={() => setShowHelp(false)}>
      <div className="bg-parchment-900 border border-parchment-700 rounded-2xl p-6 max-w-sm shadow-2xl" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gold-400 mb-4 font-serif">⌨️ Keyboard Shortcuts</h3>
        <div className="space-y-2 text-sm">
          {[
            ['← / h', 'Previous chapter'],
            ['→ / l', 'Next chapter'],
            ['/', 'Go to Search'],
            ['?', 'Toggle this help'],
            ['Esc', 'Close panel'],
          ].map(([key, desc]) => (
            <div key={key} className="flex items-center gap-3">
              <kbd className="px-2 py-0.5 bg-parchment-800 rounded text-gold-400 font-mono text-xs border border-parchment-700 min-w-[3rem] text-center">{key}</kbd>
              <span className="text-parchment-300">{desc}</span>
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowHelp(false)}
          className="mt-4 w-full text-center text-xs text-parchment-500 hover:text-parchment-300 transition-colors"
        >
          Press Esc or click outside to close
        </button>
      </div>
    </div>
  );
}
