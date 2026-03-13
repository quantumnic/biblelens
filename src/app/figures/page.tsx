import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface FigureOfSpeech {
  name: string;
  greek: string;
  definition: string;
  examples: { ref: string; slug: string; book: number; chapter: number; verse: number; text: string; explanation: string }[];
}

const FIGURES: FigureOfSpeech[] = [
  {
    name: 'Chiasmus',
    greek: 'χιασμός (chiasmos)',
    definition: 'An inverted parallelism (A-B-B′-A′) where the second half mirrors the first in reverse order, drawing emphasis to the center.',
    examples: [
      { ref: 'Matthew 19:30', slug: 'matthew', book: 40, chapter: 19, verse: 30, text: 'But many that are first shall be last; and the last shall be first.', explanation: 'A-B-B′-A′ structure: first↔last reversed.' },
      { ref: 'Isaiah 6:10', slug: 'isaiah', book: 23, chapter: 6, verse: 10, text: 'Make the heart of this people fat, and make their ears heavy, and shut their eyes; lest they see with their eyes, and hear with their ears, and understand with their heart…', explanation: 'Heart→ears→eyes // eyes→ears→heart.' },
    ],
  },
  {
    name: 'Parallelism',
    greek: 'παραλληλισμός',
    definition: 'Two or more lines that express the same idea using different words (synonymous), opposite ideas (antithetic), or build upon each other (synthetic).',
    examples: [
      { ref: 'Psalm 19:1', slug: 'psalms', book: 19, chapter: 19, verse: 1, text: 'The heavens declare the glory of God; and the firmament sheweth his handywork.', explanation: 'Synonymous: heavens/firmament, declare/sheweth, glory/handywork.' },
      { ref: 'Proverbs 15:1', slug: 'proverbs', book: 20, chapter: 15, verse: 1, text: 'A soft answer turneth away wrath: but grievous words stir up anger.', explanation: 'Antithetic: soft answer vs. grievous words.' },
    ],
  },
  {
    name: 'Metaphor',
    greek: 'μεταφορά (metaphora)',
    definition: 'A direct comparison without "like" or "as", identifying one thing as another to reveal deeper spiritual meaning.',
    examples: [
      { ref: 'John 6:35', slug: 'john', book: 43, chapter: 6, verse: 35, text: 'I am the bread of life: he that cometh to me shall never hunger…', explanation: 'Jesus directly identifies himself as bread — sustenance for the soul.' },
      { ref: 'Psalm 23:1', slug: 'psalms', book: 19, chapter: 23, verse: 1, text: 'The LORD is my shepherd; I shall not want.', explanation: 'God is identified as shepherd — protector, guide, provider.' },
    ],
  },
  {
    name: 'Simile',
    greek: 'ὁμοίωσις (homoiosis)',
    definition: 'A comparison using "like" or "as" to illuminate spiritual truths through familiar imagery.',
    examples: [
      { ref: 'Isaiah 53:7', slug: 'isaiah', book: 23, chapter: 53, verse: 7, text: 'He is brought as a lamb to the slaughter, and as a sheep before her shearers is dumb…', explanation: 'The Suffering Servant compared to a silent lamb — innocence and submission.' },
      { ref: 'Matthew 10:16', slug: 'matthew', book: 40, chapter: 10, verse: 16, text: 'Be ye therefore wise as serpents, and harmless as doves.', explanation: 'Dual comparison: shrewdness (serpent) + purity (dove).' },
    ],
  },
  {
    name: 'Hyperbole',
    greek: 'ὑπερβολή (hyperbole)',
    definition: 'Deliberate exaggeration to emphasize a point — not literal falsehood but rhetorical intensification.',
    examples: [
      { ref: 'Matthew 7:3', slug: 'matthew', book: 40, chapter: 7, verse: 3, text: 'And why beholdest thou the mote that is in thy brother\'s eye, but considerest not the beam that is in thine own eye?', explanation: 'A beam in your eye is impossible — the exaggeration drives home the absurdity of judging others.' },
      { ref: 'John 21:25', slug: 'john', book: 43, chapter: 21, verse: 25, text: '…the world itself could not contain the books that should be written.', explanation: 'Emphasizes the vastness of Jesus\' works beyond what was recorded.' },
    ],
  },
  {
    name: 'Merism',
    greek: 'μερισμός (merismos)',
    definition: 'Naming two opposite extremes to represent the entire range between them — a way of expressing totality.',
    examples: [
      { ref: 'Genesis 1:1', slug: 'genesis', book: 1, chapter: 1, verse: 1, text: 'In the beginning God created the heaven and the earth.', explanation: 'Heaven + earth = everything that exists; the entirety of creation.' },
      { ref: 'Psalm 139:2', slug: 'psalms', book: 19, chapter: 139, verse: 2, text: 'Thou knowest my downsitting and mine uprising…', explanation: 'Sitting + rising = every moment and posture of life.' },
    ],
  },
  {
    name: 'Inclusio',
    greek: 'ἔγκλεισις (enkleisis)',
    definition: 'A literary "bookend" where a passage begins and ends with the same word or phrase, framing the content between.',
    examples: [
      { ref: 'Psalm 8:1,9', slug: 'psalms', book: 19, chapter: 8, verse: 1, text: 'O LORD our Lord, how excellent is thy name in all the earth!', explanation: 'The same line opens (v.1) and closes (v.9) the psalm — everything between is framed by God\'s majesty.' },
      { ref: 'Ecclesiastes 1:2 / 12:8', slug: 'ecclesiastes', book: 21, chapter: 1, verse: 2, text: 'Vanity of vanities, saith the Preacher, vanity of vanities; all is vanity.', explanation: 'The book opens and closes with this refrain, enclosing all of Qoheleth\'s reflections.' },
    ],
  },
  {
    name: 'Anthropomorphism',
    greek: 'ἀνθρωπομορφισμός',
    definition: 'Attributing human physical characteristics to God, who is spirit, to make divine action comprehensible.',
    examples: [
      { ref: 'Exodus 33:11', slug: 'exodus', book: 2, chapter: 33, verse: 11, text: 'And the LORD spake unto Moses face to face, as a man speaketh unto his friend.', explanation: 'God doesn\'t have a physical face — this expresses the intimacy and directness of their communion.' },
      { ref: 'Isaiah 59:1', slug: 'isaiah', book: 23, chapter: 59, verse: 1, text: 'Behold, the LORD\'s hand is not shortened, that it cannot save; neither his ear heavy, that it cannot hear…', explanation: 'Hand and ear attributed to God to express his power and attentiveness.' },
    ],
  },
];

export default function FiguresPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Figures of Speech</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🎭 Figures of Speech</h1>
        <p className="text-parchment-400 mb-8 max-w-2xl">
          The Bible employs sophisticated literary devices inherited from ancient Near Eastern and Greco-Roman rhetoric.
          Understanding these figures unlocks layers of meaning that a surface reading misses.
        </p>

        <div className="space-y-8">
          {FIGURES.map(fig => (
            <section key={fig.name} className="bg-parchment-900 border border-parchment-800 rounded-xl p-6">
              <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                <h2 className="text-xl font-bold text-gold-400 font-serif">{fig.name}</h2>
                <span className="text-xs text-parchment-500 font-mono italic">{fig.greek}</span>
              </div>
              <p className="text-parchment-300 mb-4 text-sm leading-relaxed">{fig.definition}</p>

              <div className="space-y-3">
                {fig.examples.map(ex => (
                  <div key={ex.ref} className="border-l-2 border-gold-600/30 pl-4">
                    <Link
                      href={`/reader/${ex.slug}/${ex.chapter}#v${ex.verse}`}
                      className="text-sm font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      {ex.ref}
                    </Link>
                    <blockquote className="text-parchment-200 font-serif italic mt-1 text-sm leading-relaxed">
                      &ldquo;{ex.text}&rdquo;
                    </blockquote>
                    <p className="text-xs text-parchment-400 mt-1">💡 {ex.explanation}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
