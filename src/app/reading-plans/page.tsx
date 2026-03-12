'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { BIBLE_BOOKS } from '@/lib/bible-books';

interface ReadingPlan {
  id: string;
  name: string;
  description: string;
  icon: string;
  days: { book: number; chapter: number; title: string }[];
}

const PLANS: ReadingPlan[] = [
  {
    id: 'gospels-30',
    name: '30 Days Through the Gospels',
    description: 'Read all four Gospels in one month with key chapters daily.',
    icon: '✝️',
    days: [
      { book: 40, chapter: 1, title: 'Birth of Jesus — Matthew 1' },
      { book: 40, chapter: 5, title: 'Sermon on the Mount — Matthew 5' },
      { book: 40, chapter: 6, title: 'Lord\'s Prayer & Trust — Matthew 6' },
      { book: 40, chapter: 7, title: 'Wise & Foolish Builders — Matthew 7' },
      { book: 40, chapter: 13, title: 'Parables of the Kingdom — Matthew 13' },
      { book: 40, chapter: 16, title: 'Peter\'s Confession — Matthew 16' },
      { book: 40, chapter: 26, title: 'Last Supper & Gethsemane — Matthew 26' },
      { book: 40, chapter: 28, title: 'Resurrection & Commission — Matthew 28' },
      { book: 41, chapter: 1, title: 'Beginning of the Gospel — Mark 1' },
      { book: 41, chapter: 4, title: 'Parables & Storm — Mark 4' },
      { book: 41, chapter: 8, title: 'Who Do You Say I Am? — Mark 8' },
      { book: 41, chapter: 10, title: 'Servant Leadership — Mark 10' },
      { book: 41, chapter: 14, title: 'Betrayal & Trial — Mark 14' },
      { book: 41, chapter: 15, title: 'Crucifixion — Mark 15' },
      { book: 41, chapter: 16, title: 'Resurrection — Mark 16' },
      { book: 42, chapter: 1, title: 'Annunciation & Magnificat — Luke 1' },
      { book: 42, chapter: 2, title: 'Birth Narrative — Luke 2' },
      { book: 42, chapter: 4, title: 'Nazareth Rejection — Luke 4' },
      { book: 42, chapter: 10, title: 'Good Samaritan — Luke 10' },
      { book: 42, chapter: 15, title: 'Lost Sheep, Coin, Son — Luke 15' },
      { book: 42, chapter: 22, title: 'Last Supper & Arrest — Luke 22' },
      { book: 42, chapter: 24, title: 'Emmaus Road — Luke 24' },
      { book: 43, chapter: 1, title: 'The Word Made Flesh — John 1' },
      { book: 43, chapter: 3, title: 'Born Again & John 3:16 — John 3' },
      { book: 43, chapter: 6, title: 'Bread of Life — John 6' },
      { book: 43, chapter: 10, title: 'Good Shepherd — John 10' },
      { book: 43, chapter: 14, title: 'Way, Truth, Life — John 14' },
      { book: 43, chapter: 15, title: 'Vine & Branches — John 15' },
      { book: 43, chapter: 17, title: 'High Priestly Prayer — John 17' },
      { book: 43, chapter: 20, title: 'Resurrection Appearances — John 20' },
    ],
  },
  {
    id: 'wisdom-21',
    name: '21 Days of Wisdom',
    description: 'Journey through Proverbs, Ecclesiastes, and Psalms of wisdom.',
    icon: '🦉',
    days: [
      { book: 20, chapter: 1, title: 'Beginning of Knowledge — Proverbs 1' },
      { book: 20, chapter: 2, title: 'Seeking Wisdom — Proverbs 2' },
      { book: 20, chapter: 3, title: 'Trust in the LORD — Proverbs 3' },
      { book: 20, chapter: 4, title: 'Guard Your Heart — Proverbs 4' },
      { book: 20, chapter: 8, title: 'Wisdom\'s Call — Proverbs 8' },
      { book: 20, chapter: 10, title: 'Wise & Foolish Contrasted — Proverbs 10' },
      { book: 20, chapter: 15, title: 'Gentle Answer — Proverbs 15' },
      { book: 20, chapter: 16, title: 'Plans of the Heart — Proverbs 16' },
      { book: 20, chapter: 22, title: 'Good Name & Humility — Proverbs 22' },
      { book: 20, chapter: 31, title: 'Woman of Valor — Proverbs 31' },
      { book: 21, chapter: 1, title: 'Vanity of Vanities — Ecclesiastes 1' },
      { book: 21, chapter: 3, title: 'A Time for Everything — Ecclesiastes 3' },
      { book: 21, chapter: 7, title: 'Wisdom\'s Value — Ecclesiastes 7' },
      { book: 21, chapter: 12, title: 'Remember Your Creator — Ecclesiastes 12' },
      { book: 19, chapter: 1, title: 'Blessed Is the Man — Psalm 1' },
      { book: 19, chapter: 19, title: 'Heavens Declare Glory — Psalm 19' },
      { book: 19, chapter: 37, title: 'Trust & Wait — Psalm 37' },
      { book: 19, chapter: 90, title: 'Lord Our Dwelling Place — Psalm 90' },
      { book: 19, chapter: 111, title: 'Beginning of Wisdom — Psalm 111' },
      { book: 19, chapter: 119, title: 'Delight in God\'s Word — Psalm 119' },
      { book: 19, chapter: 139, title: 'Fearfully & Wonderfully Made — Psalm 139' },
    ],
  },
  {
    id: 'romans-14',
    name: '14 Days in Romans',
    description: 'Deep dive into Paul\'s theology of salvation, grace, and new life.',
    icon: '⚖️',
    days: [
      { book: 45, chapter: 1, title: 'Gospel Power & Human Sin — Romans 1' },
      { book: 45, chapter: 2, title: 'God\'s Righteous Judgment — Romans 2' },
      { book: 45, chapter: 3, title: 'All Have Sinned — Romans 3' },
      { book: 45, chapter: 4, title: 'Abraham\'s Faith — Romans 4' },
      { book: 45, chapter: 5, title: 'Peace with God — Romans 5' },
      { book: 45, chapter: 6, title: 'Dead to Sin, Alive in Christ — Romans 6' },
      { book: 45, chapter: 7, title: 'Struggle with Sin — Romans 7' },
      { book: 45, chapter: 8, title: 'No Condemnation — Romans 8' },
      { book: 45, chapter: 9, title: 'God\'s Sovereign Choice — Romans 9' },
      { book: 45, chapter: 10, title: 'Salvation for All — Romans 10' },
      { book: 45, chapter: 11, title: 'Israel\'s Future — Romans 11' },
      { book: 45, chapter: 12, title: 'Living Sacrifice — Romans 12' },
      { book: 45, chapter: 13, title: 'Submit & Love — Romans 13' },
      { book: 45, chapter: 14, title: 'Weak & Strong — Romans 14' },
    ],
  },
];

const PROGRESS_KEY = 'biblelens-reading-plans';

function loadProgress(): Record<string, boolean[]> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch { return {}; }
}

function saveProgress(p: Record<string, boolean[]>) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

export default function ReadingPlansPage() {
  const [progress, setProgress] = useState<Record<string, boolean[]>>({});
  const [activePlan, setActivePlan] = useState<string | null>(null);

  useEffect(() => { setProgress(loadProgress()); }, []);

  const toggleDay = (planId: string, dayIdx: number) => {
    const arr = progress[planId] || [];
    const updated = [...arr];
    while (updated.length <= dayIdx) updated.push(false);
    updated[dayIdx] = !updated[dayIdx];
    const newProgress = { ...progress, [planId]: updated };
    setProgress(newProgress);
    saveProgress(newProgress);
  };

  const getCompletion = (planId: string, totalDays: number) => {
    const arr = progress[planId] || [];
    const done = arr.filter(Boolean).length;
    return { done, total: totalDays, pct: Math.round((done / totalDays) * 100) };
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Reading Plans</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">📅 Reading Plans</h1>
        <p className="text-parchment-400 mb-8">Structured Bible reading plans to guide your study. Progress is saved in your browser.</p>

        {!activePlan ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PLANS.map(plan => {
              const { done, total, pct } = getCompletion(plan.id, plan.days.length);
              return (
                <button
                  key={plan.id}
                  onClick={() => setActivePlan(plan.id)}
                  className="text-left bg-parchment-900 border border-parchment-800 rounded-2xl p-5 hover:border-gold-500/30 transition-all group"
                >
                  <div className="text-3xl mb-3">{plan.icon}</div>
                  <h2 className="text-lg font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors">{plan.name}</h2>
                  <p className="text-sm text-parchment-500 mt-1 mb-4">{plan.description}</p>
                  <div className="relative h-2 bg-parchment-800 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gold-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-parchment-500 mt-2">{done}/{total} days completed ({pct}%)</p>
                </button>
              );
            })}
          </div>
        ) : (
          (() => {
            const plan = PLANS.find(p => p.id === activePlan)!;
            const { done, total, pct } = getCompletion(plan.id, plan.days.length);
            const arr = progress[plan.id] || [];

            return (
              <div>
                <button onClick={() => setActivePlan(null)} className="text-sm text-gold-400 hover:text-gold-300 mb-4 transition-colors">← Back to Plans</button>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{plan.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold font-serif text-parchment-100">{plan.name}</h2>
                    <p className="text-sm text-parchment-500">{plan.description}</p>
                  </div>
                </div>
                <div className="relative h-3 bg-parchment-800 rounded-full overflow-hidden mb-6">
                  <div className="absolute inset-y-0 left-0 bg-gold-600 rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="text-sm text-parchment-400 mb-6">{done}/{total} days ({pct}% complete)</p>

                <div className="space-y-2">
                  {plan.days.map((day, idx) => {
                    const completed = arr[idx] || false;
                    const book = BIBLE_BOOKS.find(b => b.id === day.book);
                    const slug = book ? book.name.toLowerCase().replace(/ /g, '-') : '';
                    return (
                      <div key={idx} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${completed ? 'bg-gold-600/10 border-gold-500/30' : 'bg-parchment-900 border-parchment-800'}`}>
                        <button onClick={() => toggleDay(plan.id, idx)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${completed ? 'bg-gold-600 border-gold-600 text-parchment-950' : 'border-parchment-600 hover:border-gold-500'}`}>
                          {completed && <span className="text-xs">✓</span>}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${completed ? 'text-parchment-400 line-through' : 'text-parchment-200'}`}>
                            Day {idx + 1}: {day.title}
                          </p>
                        </div>
                        <Link href={`/reader/${slug}/${day.chapter}`} className="text-xs px-3 py-1.5 rounded-lg bg-parchment-800 text-gold-400 hover:bg-gold-600 hover:text-parchment-950 transition-colors flex-shrink-0">
                          Read →
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()
        )}
      </main>
    </>
  );
}
