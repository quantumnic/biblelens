'use client';

interface WordItem {
  word: string;
  count: number;
}

interface Props {
  words: WordItem[];
  maxWords?: number;
}

const COLORS = [
  'text-gold-400',
  'text-gold-500',
  'text-amber-400',
  'text-amber-500',
  'text-yellow-400',
  'text-orange-400',
  'text-parchment-200',
  'text-parchment-300',
];

export default function WordCloud({ words, maxWords = 60 }: Props) {
  const display = words.slice(0, maxWords);
  const maxCount = display[0]?.count || 1;
  const minCount = display[display.length - 1]?.count || 1;

  // Shuffle for visual variety (deterministic based on word)
  const shuffled = [...display].sort((a, b) => {
    const ha = a.word.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    const hb = b.word.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
    return ha - hb;
  });

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 p-4">
      {shuffled.map((w) => {
        const ratio = maxCount === minCount ? 1 : (w.count - minCount) / (maxCount - minCount);
        const fontSize = 0.7 + ratio * 1.8; // 0.7rem to 2.5rem
        const opacity = 0.5 + ratio * 0.5;
        const colorIdx = Math.floor(ratio * (COLORS.length - 1));

        return (
          <span
            key={w.word}
            className={`${COLORS[colorIdx]} hover:text-gold-300 cursor-default transition-colors font-serif`}
            style={{ fontSize: `${fontSize}rem`, opacity }}
            title={`${w.word}: ${w.count} occurrences`}
          >
            {w.word}
          </span>
        );
      })}
    </div>
  );
}
