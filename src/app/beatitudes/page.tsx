import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb, isDatabaseAvailable } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface Beatitude {
  reference: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  blessed: string;
  promise: string;
  theme: string;
  context: string;
}

const BEATITUDES: Beatitude[] = [
  {
    reference: 'Matthew 5:3',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 3,
    blessed: 'the poor in spirit',
    promise: 'theirs is the kingdom of heaven',
    theme: 'Humility',
    context: 'Recognizing spiritual need and total dependence on God — the gateway to all other beatitudes.',
  },
  {
    reference: 'Matthew 5:4',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 4,
    blessed: 'they that mourn',
    promise: 'they shall be comforted',
    theme: 'Repentance',
    context: 'Mourning over sin and the brokenness of the world — godly sorrow that leads to comfort.',
  },
  {
    reference: 'Matthew 5:5',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 5,
    blessed: 'the meek',
    promise: 'they shall inherit the earth',
    theme: 'Gentleness',
    context: 'Strength under control — not weakness, but power surrendered to God (cf. Psalm 37:11).',
  },
  {
    reference: 'Matthew 5:6',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 6,
    blessed: 'they which do hunger and thirst after righteousness',
    promise: 'they shall be filled',
    theme: 'Desire for Justice',
    context: 'An intense longing for God\'s righteous order — both personal holiness and social justice.',
  },
  {
    reference: 'Matthew 5:7',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 7,
    blessed: 'the merciful',
    promise: 'they shall obtain mercy',
    theme: 'Mercy',
    context: 'Active compassion toward the suffering — reflecting God\'s own chesed (lovingkindness).',
  },
  {
    reference: 'Matthew 5:8',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 8,
    blessed: 'the pure in heart',
    promise: 'they shall see God',
    theme: 'Purity',
    context: 'Inner sincerity and moral wholeness — an undivided heart set on God alone (cf. Psalm 24:3-4).',
  },
  {
    reference: 'Matthew 5:9',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 9,
    blessed: 'the peacemakers',
    promise: 'they shall be called the children of God',
    theme: 'Peace',
    context: 'Actively pursuing reconciliation — reflecting the character of the God of shalom.',
  },
  {
    reference: 'Matthew 5:10',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 10,
    blessed: 'they which are persecuted for righteousness\' sake',
    promise: 'theirs is the kingdom of heaven',
    theme: 'Perseverance',
    context: 'Suffering for doing what is right — bookending with v.3, framing all beatitudes within the Kingdom.',
  },
  {
    reference: 'Matthew 5:11-12',
    bookSlug: 'matthew',
    chapter: 5,
    verse: 11,
    blessed: 'ye, when men shall revile you and persecute you',
    promise: 'great is your reward in heaven',
    theme: 'Joy in Suffering',
    context: 'The extended beatitude — personal, direct (\"ye\"), connecting disciples to the prophetic tradition.',
  },
];

// OT Beatitudes and other NT beatitudes
const OTHER_BEATITUDES: { reference: string; bookSlug: string; chapter: number; verse: number; text: string; source: string }[] = [
  { reference: 'Psalm 1:1', bookSlug: 'psalms', chapter: 1, verse: 1, text: 'Blessed is the man that walketh not in the counsel of the ungodly', source: 'OT' },
  { reference: 'Psalm 32:1', bookSlug: 'psalms', chapter: 32, verse: 1, text: 'Blessed is he whose transgression is forgiven, whose sin is covered', source: 'OT' },
  { reference: 'Psalm 84:5', bookSlug: 'psalms', chapter: 84, verse: 5, text: 'Blessed is the man whose strength is in thee', source: 'OT' },
  { reference: 'Psalm 119:1', bookSlug: 'psalms', chapter: 119, verse: 1, text: 'Blessed are the undefiled in the way, who walk in the law of the LORD', source: 'OT' },
  { reference: 'Proverbs 8:34', bookSlug: 'proverbs', chapter: 8, verse: 34, text: 'Blessed is the man that heareth me, watching daily at my gates', source: 'OT' },
  { reference: 'Luke 6:20', bookSlug: 'luke', chapter: 6, verse: 20, text: 'Blessed be ye poor: for yours is the kingdom of God', source: 'NT' },
  { reference: 'Luke 11:28', bookSlug: 'luke', chapter: 11, verse: 28, text: 'Blessed are they that hear the word of God, and keep it', source: 'NT' },
  { reference: 'John 20:29', bookSlug: 'john', chapter: 20, verse: 29, text: 'Blessed are they that have not seen, and yet have believed', source: 'NT' },
  { reference: 'Romans 4:7', bookSlug: 'romans', chapter: 4, verse: 7, text: 'Blessed are they whose iniquities are forgiven, and whose sins are covered', source: 'NT' },
  { reference: 'James 1:12', bookSlug: 'james', chapter: 1, verse: 12, text: 'Blessed is the man that endureth temptation', source: 'NT' },
  { reference: 'Revelation 1:3', bookSlug: 'revelation', chapter: 1, verse: 3, text: 'Blessed is he that readeth, and they that hear the words of this prophecy', source: 'NT' },
  { reference: 'Revelation 22:7', bookSlug: 'revelation', chapter: 22, verse: 7, text: 'Blessed is he that keepeth the sayings of the prophecy of this book', source: 'NT' },
];

export default function BeatitudesPage() {
  let verseTexts: Record<string, string> = {};

  if (isDatabaseAvailable()) {
    const db = getDb();
    for (const b of BEATITUDES) {
      const row = db.prepare(
        'SELECT text FROM verses WHERE book = 40 AND chapter = ? AND verse = ? AND translation = ?'
      ).get(b.chapter, b.verse, 'KJV') as { text: string } | undefined;
      if (row) verseTexts[`${b.chapter}:${b.verse}`] = row.text;
    }
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Beatitudes</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">😇 The Beatitudes</h1>
        <p className="text-parchment-400 text-sm mb-8 max-w-2xl">
          Jesus&apos;s revolutionary &ldquo;blessings&rdquo; from the Sermon on the Mount (Matthew 5:3-12) — 
          a portrait of Kingdom character that inverts worldly values. Each beatitude builds on the previous, 
          forming a spiritual progression from poverty of spirit to joy in persecution.
        </p>

        {/* Chiastic structure note */}
        <div className="bg-parchment-900 border border-gold-500/20 rounded-xl p-4 mb-8">
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider mb-2">📐 Literary Structure</p>
          <p className="text-sm text-parchment-300">
            The Beatitudes form an <span className="text-gold-400">inclusio</span> — the first (v.3) and eighth (v.10) 
            both promise &ldquo;the kingdom of heaven,&rdquo; framing the entire set. The Greek word 
            <span className="text-gold-400 italic"> makarios</span> (μακάριος, G3107) means more than &ldquo;happy&rdquo; — 
            it describes a deep, God-given blessedness independent of circumstances.
          </p>
        </div>

        {/* Main Beatitudes */}
        <div className="space-y-4 mb-12">
          {BEATITUDES.map((b, i) => (
            <div key={i} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/30 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-400 font-bold text-lg flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <Link href={`/reader/${b.bookSlug}/${b.chapter}#v${b.verse}`} className="text-gold-400 font-semibold hover:text-gold-300 transition-colors">
                      {b.reference}
                    </Link>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gold-600/20 text-gold-400">{b.theme}</span>
                  </div>
                  {verseTexts[`${b.chapter}:${b.verse}`] && (
                    <blockquote className="text-parchment-200 font-serif italic mb-3 border-l-2 border-gold-600/30 pl-3">
                      &ldquo;{verseTexts[`${b.chapter}:${b.verse}`]}&rdquo;
                    </blockquote>
                  )}
                  <div className="text-sm text-parchment-300 mb-2">
                    <span className="text-parchment-500">Blessed are </span>
                    <span className="text-parchment-100 font-medium">{b.blessed}</span>
                    <span className="text-parchment-500"> → </span>
                    <span className="text-emerald-400 font-medium">{b.promise}</span>
                  </div>
                  <p className="text-xs text-parchment-500">{b.context}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Other Beatitudes */}
        <h2 className="text-2xl font-bold font-serif text-parchment-100 mb-4">📜 Other Biblical Beatitudes</h2>
        <p className="text-parchment-400 text-sm mb-6">
          The &ldquo;blessed is…&rdquo; formula appears throughout Scripture, from the Psalms to Revelation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          {OTHER_BEATITUDES.map((b, i) => (
            <Link key={i} href={`/reader/${b.bookSlug}/${b.chapter}#v${b.verse}`}
              className="bg-parchment-900 border border-parchment-800 rounded-lg p-4 hover:border-gold-500/30 transition-all group">
              <div className="flex items-start gap-3">
                <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${b.source === 'OT' ? 'bg-amber-600/20 text-amber-400' : 'bg-blue-600/20 text-blue-400'}`}>
                  {b.source}
                </span>
                <div className="flex-1">
                  <p className="text-sm text-parchment-200 italic mb-1">&ldquo;{b.text}&rdquo;</p>
                  <p className="text-xs text-gold-400 font-semibold">{b.reference}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Cross-references */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
          <h3 className="text-lg font-semibold text-parchment-200 mb-3">🔗 Key Cross-References</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {[
              { from: 'Matt 5:3', to: 'Isaiah 57:15', desc: 'God dwells with the humble and contrite' },
              { from: 'Matt 5:4', to: 'Isaiah 61:2-3', desc: 'Comfort for those who mourn in Zion' },
              { from: 'Matt 5:5', to: 'Psalm 37:11', desc: 'The meek shall inherit the earth' },
              { from: 'Matt 5:6', to: 'Isaiah 55:1', desc: 'Come, all who thirst for righteousness' },
              { from: 'Matt 5:7', to: 'Micah 6:8', desc: 'What does the LORD require? To love mercy' },
              { from: 'Matt 5:8', to: 'Psalm 24:3-4', desc: 'Clean hands and a pure heart' },
              { from: 'Matt 5:9', to: 'James 3:18', desc: 'The fruit of righteousness is sown in peace' },
              { from: 'Matt 5:10', to: '1 Peter 3:14', desc: 'If you suffer for righteousness, you are blessed' },
            ].map((xref, i) => (
              <div key={i} className="flex items-start gap-2 p-2 bg-parchment-800 rounded-lg">
                <span className="text-gold-400 text-xs font-mono whitespace-nowrap">{xref.from} → {xref.to}</span>
                <span className="text-parchment-400 text-xs">{xref.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
