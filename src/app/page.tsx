import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb, isDatabaseAvailable } from '@/lib/db';
import { getBookById, BIBLE_BOOKS } from '@/lib/bible-books';

export const dynamic = 'force-dynamic';

// Curated notable verses (subset for VOTD)
const NOTABLE_VERSES: [number, number, number][] = [
  [1,1,1],[19,23,1],[19,23,4],[19,46,1],[19,119,105],[19,27,1],[19,37,4],
  [20,3,5],[20,3,6],[23,40,31],[23,41,10],[23,53,5],[24,29,11],
  [40,5,3],[40,6,33],[40,11,28],[40,28,19],
  [43,1,1],[43,3,16],[43,8,32],[43,14,6],[43,14,27],[43,15,13],
  [45,3,23],[45,5,8],[45,8,1],[45,8,28],[45,8,38],[45,12,2],
  [46,13,4],[46,13,13],
  [49,2,8],[49,3,20],
  [50,4,6],[50,4,8],[50,4,13],
  [58,4,12],[58,11,1],[58,12,1],
  [59,1,5],[60,5,7],[62,4,8],
  [66,3,20],[66,21,4],
];

export default function Home() {
  if (!isDatabaseAvailable()) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 max-w-5xl">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold font-serif text-parchment-100 mb-4">📖 BibleLens</h1>
            <p className="text-parchment-400 mb-6">Database not found. Run <code className="bg-parchment-800 px-2 py-1 rounded text-gold-400">npm run seed</code> to populate the database.</p>
          </div>
        </main>
      </>
    );
  }

  const db = getDb();

  // Verse of the day
  const now = new Date();
  const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
  const idx = dayOfYear % NOTABLE_VERSES.length;
  const [vBook, vChapter, vVerse] = NOTABLE_VERSES[idx];
  const votdRow = db.prepare(
    'SELECT text FROM verses WHERE book = ? AND chapter = ? AND verse = ? AND translation = ?'
  ).get(vBook, vChapter, vVerse, 'KJV') as { text: string } | undefined;
  const votdBookInfo = getBookById(vBook);
  const votdSlug = votdBookInfo?.name.toLowerCase().replace(/ /g, '-') || '';

  // DB stats
  const verseCount = (db.prepare("SELECT COUNT(*) as c FROM verses WHERE translation = 'KJV'").get() as any).c;
  const translationCount = (db.prepare('SELECT COUNT(DISTINCT translation) as c FROM verses').get() as any).c;
  const xrefCount = (db.prepare('SELECT COUNT(*) as c FROM cross_references').get() as any).c;
  const strongsCount = (db.prepare('SELECT COUNT(*) as c FROM strongs').get() as any).c;

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        {/* Hero */}
        <div className="text-center mb-10 pt-4 lg:pt-8">
          <h1 className="text-5xl font-bold font-serif text-parchment-100 mb-3">
            📖 <span className="text-gold-400">Bible</span>Lens
          </h1>
          <p className="text-lg text-parchment-400 max-w-xl mx-auto">
            Analytical Bible Study — Multi-translation comparison, Strong&apos;s concordance, cross-references, word etymology, and scholarly research tools.
          </p>
        </div>

        {/* Verse of the Day */}
        {votdRow && (
          <Link href={`/reader/${votdSlug}/${vChapter}#v${vVerse}`} className="block mb-8 group">
            <div className="bg-parchment-900 border border-gold-500/20 rounded-2xl p-6 lg:p-8 text-center hover:border-gold-500/40 transition-all shadow-lg shadow-gold-600/5">
              <p className="text-xs text-gold-500 uppercase tracking-widest mb-3">✨ Verse of the Day</p>
              <blockquote className="text-xl lg:text-2xl text-parchment-100 font-serif leading-relaxed italic max-w-2xl mx-auto mb-3">
                &ldquo;{votdRow.text}&rdquo;
              </blockquote>
              <p className="text-sm text-gold-400 font-semibold">
                — {votdBookInfo?.name} {vChapter}:{vVerse} (KJV)
              </p>
            </div>
          </Link>
        )}

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          <Link href="/search" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔍</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Search</p>
            <p className="text-xs text-parchment-500 mt-0.5">Full-text search</p>
          </Link>
          <Link href="/compare" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">⚖️</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Compare</p>
            <p className="text-xs text-parchment-500 mt-0.5">Translation comparison</p>
          </Link>
          <Link href="/analytics" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📊</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Analytics</p>
            <p className="text-xs text-parchment-500 mt-0.5">Word frequency &amp; sentiment</p>
          </Link>
          <Link href="/word/G26" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📖</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Strong&apos;s</p>
            <p className="text-xs text-parchment-500 mt-0.5">{strongsCount} entries</p>
          </Link>
          <Link href="/latin/amor" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📜</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Latin</p>
            <p className="text-xs text-parchment-500 mt-0.5">Vulgate vocabulary</p>
          </Link>
          <Link href="/verse-of-the-day" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">✨</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Daily Verse</p>
            <p className="text-xs text-parchment-500 mt-0.5">All translations</p>
          </Link>
          <Link href="/reader/genesis/1" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🕎</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Old Testament</p>
            <p className="text-xs text-parchment-500 mt-0.5">Start reading</p>
          </Link>
          <Link href="/reader/matthew/1" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">✝️</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">New Testament</p>
            <p className="text-xs text-parchment-500 mt-0.5">Start reading</p>
          </Link>
          <Link href="/parallels" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔀</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Parallels</p>
            <p className="text-xs text-parchment-500 mt-0.5">Synoptic comparisons</p>
          </Link>
          <Link href="/bookmarks" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📑</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Bookmarks</p>
            <p className="text-xs text-parchment-500 mt-0.5">Saved passages</p>
          </Link>
          <Link href="/timeline" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📅</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Timeline</p>
            <p className="text-xs text-parchment-500 mt-0.5">Biblical chronology</p>
          </Link>
          <Link href="/study-notes" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📝</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Study Notes</p>
            <p className="text-xs text-parchment-500 mt-0.5">Personal annotations</p>
          </Link>
          <Link href="/reading-plans" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📅</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Reading Plans</p>
            <p className="text-xs text-parchment-500 mt-0.5">Guided study tracks</p>
          </Link>
          <Link href="/alphabet" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔤</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Alphabets</p>
            <p className="text-xs text-parchment-500 mt-0.5">Hebrew &amp; Greek</p>
          </Link>
          <Link href="/chiasm" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔄</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Chiasms</p>
            <p className="text-xs text-parchment-500 mt-0.5">Literary structures</p>
          </Link>
          <Link href="/concordance" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📖</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Concordance</p>
            <p className="text-xs text-parchment-500 mt-0.5">Browse all entries</p>
          </Link>
          <Link href="/geography" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🗺️</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Geography</p>
            <p className="text-xs text-parchment-500 mt-0.5">Biblical places</p>
          </Link>
          <Link href="/figures" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🎭</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Figures of Speech</p>
            <p className="text-xs text-parchment-500 mt-0.5">Literary devices</p>
          </Link>
          <Link href="/heatmap" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔥</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Word Heatmap</p>
            <p className="text-xs text-parchment-500 mt-0.5">Visual distribution</p>
          </Link>
          <Link href="/names-of-god" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">✡️</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Names of God</p>
            <p className="text-xs text-parchment-500 mt-0.5">Divine names &amp; titles</p>
          </Link>
          <Link href="/persons" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">👤</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Key Persons</p>
            <p className="text-xs text-parchment-500 mt-0.5">Biblical figures</p>
          </Link>
          <Link href="/parables" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🌾</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Parables</p>
            <p className="text-xs text-parchment-500 mt-0.5">Jesus&apos;s teachings</p>
          </Link>
          <Link href="/typology" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔗</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Typology</p>
            <p className="text-xs text-parchment-500 mt-0.5">OT → NT connections</p>
          </Link>
          <Link href="/prophecies" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔮</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Prophecies</p>
            <p className="text-xs text-parchment-500 mt-0.5">OT→NT fulfillment tracker</p>
          </Link>
          <Link href="/covenants" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">📜</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Covenants</p>
            <p className="text-xs text-parchment-500 mt-0.5">God&apos;s binding promises</p>
          </Link>
          <Link href="/sacrifices" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🔥</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Sacrifices</p>
            <p className="text-xs text-parchment-500 mt-0.5">Levitical offerings &amp; fulfillment</p>
          </Link>
          <Link href="/miracles" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">✨</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Miracles</p>
            <p className="text-xs text-parchment-500 mt-0.5">Supernatural acts catalogued</p>
          </Link>
          <Link href="/prayers" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🙏</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Prayers</p>
            <p className="text-xs text-parchment-500 mt-0.5">Notable prayers of Scripture</p>
          </Link>
          <Link href="/beatitudes" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">😇</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Beatitudes</p>
            <p className="text-xs text-parchment-500 mt-0.5">Sermon on the Mount blessings</p>
          </Link>
          <Link href="/genealogy" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🌳</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Genealogies</p>
            <p className="text-xs text-parchment-500 mt-0.5">Biblical family trees</p>
          </Link>
          <Link href="/ten-commandments" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">⛰️</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Ten Commandments</p>
            <p className="text-xs text-parchment-500 mt-0.5">Decalogue with Hebrew roots</p>
          </Link>
          <Link href="/fruit-of-spirit" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🍇</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Fruit of the Spirit</p>
            <p className="text-xs text-parchment-500 mt-0.5">Galatians 5:22–23 deep dive</p>
          </Link>
          <Link href="/armor-of-god" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">⚔️</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Armor of God</p>
            <p className="text-xs text-parchment-500 mt-0.5">Spiritual warfare equipment</p>
          </Link>
          <Link href="/doxologies" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🎵</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Doxologies</p>
            <p className="text-xs text-parchment-500 mt-0.5">Hymns &amp; canticles of Scripture</p>
          </Link>
          <Link href="/lords-prayer" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🙏</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Lord&apos;s Prayer</p>
            <p className="text-xs text-parchment-500 mt-0.5">Petition-by-petition analysis</p>
          </Link>
          <Link href="/themes" className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all text-center group">
            <span className="text-2xl group-hover:scale-110 inline-block transition-transform">🎨</span>
            <p className="text-sm text-parchment-200 mt-2 font-semibold">Themes</p>
            <p className="text-xs text-parchment-500 mt-0.5">Theological theme explorer</p>
          </Link>
        </div>

        {/* Popular Passages */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-parchment-200 mb-4 font-serif">📌 Popular Passages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { ref: 'John 3:16', slug: 'john', ch: 3, v: 16, desc: 'God\'s love for the world' },
              { ref: 'Psalm 23', slug: 'psalms', ch: 23, v: 1, desc: 'The Lord is my Shepherd' },
              { ref: 'Genesis 1:1', slug: 'genesis', ch: 1, v: 1, desc: 'In the beginning...' },
              { ref: 'Romans 8:28', slug: 'romans', ch: 8, v: 28, desc: 'All things work together for good' },
              { ref: 'Isaiah 53:5', slug: 'isaiah', ch: 53, v: 5, desc: 'By His stripes we are healed' },
              { ref: 'Philippians 4:13', slug: 'philippians', ch: 4, v: 13, desc: 'I can do all things through Christ' },
            ].map(p => (
              <Link key={p.ref} href={`/reader/${p.slug}/${p.ch}#v${p.v}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-gold-600/20 flex items-center justify-center text-gold-400 font-bold text-sm flex-shrink-0">
                  {p.ch}:{p.v}
                </div>
                <div>
                  <p className="text-sm font-semibold text-parchment-200">{p.ref}</p>
                  <p className="text-xs text-parchment-500">{p.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Verses', value: verseCount.toLocaleString(), icon: '📜' },
            { label: 'Translations', value: translationCount, icon: '🌐' },
            { label: 'Cross-References', value: (xrefCount / 1000).toFixed(0) + 'k', icon: '🔗' },
            { label: 'Strong\'s Entries', value: strongsCount, icon: '📖' },
          ].map(s => (
            <div key={s.label} className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
              <div className="text-lg mb-1">{s.icon}</div>
              <div className="text-2xl font-bold text-gold-400">{s.value}</div>
              <div className="text-xs text-parchment-500 mt-1">{s.label}</div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
