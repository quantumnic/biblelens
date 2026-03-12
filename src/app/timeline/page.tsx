import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface TimelineEra {
  era: string;
  period: string;
  books: { name: string; slug: string; date: string; desc: string }[];
  color: string;
}

const TIMELINE: TimelineEra[] = [
  {
    era: 'Patriarchal Era',
    period: '~2000–1400 BC',
    color: 'from-amber-700/30 to-amber-900/10',
    books: [
      { name: 'Genesis', slug: 'genesis', date: '~1450–1410 BC', desc: 'Creation, Fall, Flood, Patriarchs (Abraham, Isaac, Jacob, Joseph)' },
      { name: 'Job', slug: 'job', date: '~2000–1800 BC', desc: 'Suffering and divine sovereignty — possibly the oldest biblical text' },
    ],
  },
  {
    era: 'Exodus & Law',
    period: '~1400–1380 BC',
    color: 'from-orange-700/30 to-orange-900/10',
    books: [
      { name: 'Exodus', slug: 'exodus', date: '~1446 BC', desc: 'Deliverance from Egypt, Sinai covenant, Tabernacle' },
      { name: 'Leviticus', slug: 'leviticus', date: '~1445 BC', desc: 'Holiness code, sacrificial system, priesthood' },
      { name: 'Numbers', slug: 'numbers', date: '~1444–1405 BC', desc: 'Wilderness wanderings, census, faithlessness' },
      { name: 'Deuteronomy', slug: 'deuteronomy', date: '~1406 BC', desc: "Moses' farewell speeches, covenant renewal" },
    ],
  },
  {
    era: 'Conquest & Judges',
    period: '~1400–1050 BC',
    color: 'from-red-700/30 to-red-900/10',
    books: [
      { name: 'Joshua', slug: 'joshua', date: '~1400 BC', desc: 'Conquest of Canaan, land allotment' },
      { name: 'Judges', slug: 'judges', date: '~1380–1050 BC', desc: 'Cycles of sin, oppression, deliverance' },
      { name: 'Ruth', slug: 'ruth', date: '~1100 BC', desc: 'Loyalty, redemption, Davidic lineage' },
    ],
  },
  {
    era: 'United Monarchy',
    period: '~1050–930 BC',
    color: 'from-yellow-700/30 to-yellow-900/10',
    books: [
      { name: '1 Samuel', slug: '1-samuel', date: '~1050–1010 BC', desc: "Samuel, Saul, David's rise" },
      { name: '2 Samuel', slug: '2-samuel', date: '~1010–970 BC', desc: "David's reign, Davidic covenant" },
      { name: '1 Kings 1–11', slug: '1-kings', date: '~970–930 BC', desc: "Solomon's glory, Temple, wisdom" },
      { name: 'Psalms', slug: 'psalms', date: '~1000–400 BC', desc: 'Hymns, laments, royal psalms (David, Asaph, etc.)' },
      { name: 'Proverbs', slug: 'proverbs', date: '~970–700 BC', desc: 'Wisdom literature, primarily Solomon' },
      { name: 'Ecclesiastes', slug: 'ecclesiastes', date: '~935 BC', desc: 'Philosophy of meaning, vanity of earthly pursuits' },
      { name: 'Song of Solomon', slug: 'song-of-solomon', date: '~960 BC', desc: 'Love poetry, allegory of divine love' },
    ],
  },
  {
    era: 'Divided Kingdom & Prophets',
    period: '~930–586 BC',
    color: 'from-emerald-700/30 to-emerald-900/10',
    books: [
      { name: '1 Kings 12–22', slug: '1-kings', date: '~930–850 BC', desc: 'Kingdom splits, Elijah, apostasy' },
      { name: '2 Kings', slug: '2-kings', date: '~850–586 BC', desc: 'Elisha, fall of Samaria & Jerusalem' },
      { name: 'Isaiah', slug: 'isaiah', date: '~740–680 BC', desc: 'Messianic prophecy, comfort, judgment' },
      { name: 'Jeremiah', slug: 'jeremiah', date: '~627–586 BC', desc: 'Warning of exile, new covenant promise' },
      { name: 'Hosea', slug: 'hosea', date: '~750–715 BC', desc: "God's faithful love despite Israel's unfaithfulness" },
      { name: 'Amos', slug: 'amos', date: '~760 BC', desc: 'Social justice, judgment on complacency' },
      { name: 'Micah', slug: 'micah', date: '~735–700 BC', desc: 'Justice, mercy, Bethlehem prophecy' },
      { name: 'Nahum', slug: 'nahum', date: '~663–612 BC', desc: 'Fall of Nineveh foretold' },
      { name: 'Habakkuk', slug: 'habakkuk', date: '~608–605 BC', desc: "Wrestling with God's justice" },
      { name: 'Zephaniah', slug: 'zephaniah', date: '~630–620 BC', desc: 'Day of the LORD, remnant hope' },
    ],
  },
  {
    era: 'Exile',
    period: '~605–538 BC',
    color: 'from-blue-700/30 to-blue-900/10',
    books: [
      { name: 'Lamentations', slug: 'lamentations', date: '~586 BC', desc: "Grief over Jerusalem's destruction" },
      { name: 'Ezekiel', slug: 'ezekiel', date: '~593–571 BC', desc: 'Visions, valley of dry bones, new temple' },
      { name: 'Daniel', slug: 'daniel', date: '~605–530 BC', desc: 'Faithfulness in exile, apocalyptic visions' },
      { name: 'Obadiah', slug: 'obadiah', date: '~586 BC', desc: 'Judgment on Edom' },
    ],
  },
  {
    era: 'Return & Restoration',
    period: '~538–400 BC',
    color: 'from-indigo-700/30 to-indigo-900/10',
    books: [
      { name: 'Ezra', slug: 'ezra', date: '~538–458 BC', desc: 'Return from exile, Temple rebuilding' },
      { name: 'Nehemiah', slug: 'nehemiah', date: '~445–432 BC', desc: 'Wall rebuilding, covenant renewal' },
      { name: 'Esther', slug: 'esther', date: '~483–473 BC', desc: 'Providence, salvation of the Jews in Persia' },
      { name: 'Haggai', slug: 'haggai', date: '~520 BC', desc: 'Rebuild the Temple — priorities matter' },
      { name: 'Zechariah', slug: 'zechariah', date: '~520–480 BC', desc: 'Messianic visions, coming King' },
      { name: 'Malachi', slug: 'malachi', date: '~430 BC', desc: 'Last OT prophet, coming messenger' },
      { name: '1 & 2 Chronicles', slug: '1-chronicles', date: '~430 BC', desc: "Israel's history retold for returning exiles" },
    ],
  },
  {
    era: 'Gospels & Life of Christ',
    period: '~6 BC – 30 AD',
    color: 'from-amber-500/30 to-amber-700/10',
    books: [
      { name: 'Matthew', slug: 'matthew', date: '~50–70 AD', desc: 'Jesus as Jewish Messiah-King' },
      { name: 'Mark', slug: 'mark', date: '~55–65 AD', desc: 'Jesus the Servant — action-oriented Gospel' },
      { name: 'Luke', slug: 'luke', date: '~60–62 AD', desc: 'Jesus the Son of Man — compassion for all' },
      { name: 'John', slug: 'john', date: '~85–95 AD', desc: 'Jesus the divine Word — "I AM" sayings' },
    ],
  },
  {
    era: 'Early Church & Epistles',
    period: '~30–68 AD',
    color: 'from-purple-700/30 to-purple-900/10',
    books: [
      { name: 'Acts', slug: 'acts', date: '~62–64 AD', desc: "Birth of the church, Paul's missionary journeys" },
      { name: 'Romans', slug: 'romans', date: '~57 AD', desc: 'Systematic theology of salvation by grace' },
      { name: '1 & 2 Corinthians', slug: '1-corinthians', date: '~55–56 AD', desc: 'Church problems, spiritual gifts, resurrection' },
      { name: 'Galatians', slug: 'galatians', date: '~49 AD', desc: 'Freedom from legalism, justification by faith' },
      { name: 'Ephesians', slug: 'ephesians', date: '~60–62 AD', desc: 'Unity in Christ, spiritual warfare' },
      { name: 'Philippians', slug: 'philippians', date: '~61 AD', desc: "Joy in all circumstances, Christ's humility" },
      { name: 'Colossians', slug: 'colossians', date: '~60–62 AD', desc: 'Supremacy of Christ over all' },
      { name: '1 & 2 Thessalonians', slug: '1-thessalonians', date: '~51 AD', desc: "Christ's return, holy living" },
      { name: 'Pastoral Epistles', slug: '1-timothy', date: '~63–67 AD', desc: 'Church leadership (1-2 Timothy, Titus)' },
      { name: 'Hebrews', slug: 'hebrews', date: '~64–68 AD', desc: 'Christ superior to all — better covenant' },
      { name: 'James', slug: 'james', date: '~45–49 AD', desc: 'Faith and works, practical Christianity' },
      { name: '1 & 2 Peter', slug: '1-peter', date: '~64–67 AD', desc: 'Suffering, hope, false teachers' },
      { name: '1, 2, 3 John', slug: '1-john', date: '~85–95 AD', desc: 'God is love, light, truth' },
    ],
  },
  {
    era: 'Apocalyptic',
    period: '~95 AD',
    color: 'from-rose-700/30 to-rose-900/10',
    books: [
      { name: 'Revelation', slug: 'revelation', date: '~95 AD', desc: "Visions of the end, Christ's ultimate victory, New Jerusalem" },
    ],
  },
];

export default function TimelinePage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Timeline</span>
        </div>
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">📅 Biblical Timeline</h1>
        <p className="text-parchment-400 mb-8">The books of the Bible arranged by historical era and approximate date of writing or events described.</p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-parchment-800 hidden lg:block" />

          <div className="space-y-8">
            {TIMELINE.map((era) => (
              <div key={era.era} className="relative">
                {/* Era dot */}
                <div className="absolute left-4 top-2 w-5 h-5 rounded-full bg-gold-500 border-4 border-parchment-950 z-10 hidden lg:block" />
                
                <div className="lg:ml-14">
                  <div className={`bg-gradient-to-r ${era.color} border border-parchment-800 rounded-2xl p-5 lg:p-6`}>
                    <div className="flex items-baseline gap-3 mb-4">
                      <h2 className="text-xl font-bold font-serif text-gold-400">{era.era}</h2>
                      <span className="text-sm text-parchment-500">{era.period}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {era.books.map((book, i) => (
                        <Link
                          key={`${book.name}-${i}`}
                          href={`/reader/${book.slug}/1`}
                          className="flex items-start gap-3 p-3 rounded-xl bg-parchment-950/50 hover:bg-parchment-900 border border-parchment-800/50 hover:border-gold-500/30 transition-all group"
                        >
                          <div className="mt-0.5 w-2 h-2 rounded-full bg-gold-500/60 flex-shrink-0 group-hover:bg-gold-400" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-parchment-200 group-hover:text-gold-400 transition-colors">{book.name}</p>
                            <p className="text-xs text-parchment-500 mb-0.5">{book.date}</p>
                            <p className="text-xs text-parchment-400 leading-relaxed">{book.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center text-xs text-parchment-600">
          <p>Dates are approximate and reflect scholarly consensus ranges. Some books span multiple eras.</p>
        </div>
      </main>
    </>
  );
}
