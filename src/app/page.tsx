import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

const FEATURED_VERSES = [
  { ref: 'Genesis 1:1', book: 'genesis', chapter: 1, desc: 'In the beginning…' },
  { ref: 'Psalm 23:1', book: 'psalms', chapter: 23, desc: 'The Lord is my shepherd…' },
  { ref: 'John 3:16', book: 'john', chapter: 3, desc: 'For God so loved the world…' },
  { ref: 'Romans 8:28', book: 'romans', chapter: 8, desc: 'All things work together…' },
  { ref: 'Isaiah 53:5', book: 'isaiah', chapter: 53, desc: 'By his stripes we are healed…' },
  { ref: 'Proverbs 3:5', book: 'proverbs', chapter: 3, desc: 'Trust in the LORD…' },
];

export default function Home() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-6 lg:p-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-bold font-serif text-gold-400 mb-4">
              BibleLens
            </h1>
            <p className="text-xl text-parchment-300 mb-2">
              Analytical Bible Research Platform
            </p>
            <p className="text-sm text-parchment-500 max-w-xl mx-auto">
              Multi-translation comparison · 340,000+ cross-references · Strong&apos;s concordance · 
              Data science analytics · Academic research integration · Manuscript sources
            </p>
          </div>

          {/* Quick Search */}
          <div className="mb-12">
            <form action="/search" method="GET" className="flex gap-2">
              <input
                type="text"
                name="q"
                placeholder="Search the Bible… (e.g. 'love', 'faith', 'beginning')"
                className="flex-1 px-4 py-3 rounded-xl bg-parchment-900 border border-parchment-700 text-parchment-100 placeholder-parchment-600 focus:outline-none focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 font-serif"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-gold-600 text-parchment-950 font-semibold hover:bg-gold-500 transition-colors"
              >
                🔍 Search
              </button>
            </form>
          </div>

          {/* Featured */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-parchment-300 mb-4">Start Reading</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {FEATURED_VERSES.map(v => (
                <Link
                  key={v.ref}
                  href={`/reader/${v.book}/${v.chapter}`}
                  className="p-4 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 hover:bg-parchment-800 transition-all group"
                >
                  <h3 className="text-sm font-semibold text-gold-400 group-hover:text-gold-300">{v.ref}</h3>
                  <p className="text-sm text-parchment-400 font-serif mt-1">{v.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <Link href="/compare?book=43&chapter=3&verse=16" className="p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
              <h3 className="text-lg font-semibold text-gold-400 mb-1">⚖️ Compare Translations</h3>
              <p className="text-sm text-parchment-400">Side-by-side comparison including Latin Vulgate with diff highlighting</p>
            </Link>
            <Link href="/latin/amor" className="p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
              <h3 className="text-lg font-semibold text-gold-400 mb-1">📜 Latin Vulgate</h3>
              <p className="text-sm text-parchment-400">Full Latin vocabulary with etymology chains, manuscripts &amp; academic references</p>
            </Link>
            <Link href="/analytics" className="p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
              <h3 className="text-lg font-semibold text-gold-400 mb-1">📊 Analytics Dashboard</h3>
              <p className="text-sm text-parchment-400">Word frequency, sentiment analysis, authorship statistics</p>
            </Link>
            <Link href="/word/G26" className="p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
              <h3 className="text-lg font-semibold text-gold-400 mb-1">📖 Strong&apos;s Concordance</h3>
              <p className="text-sm text-parchment-400">Hebrew &amp; Greek with translation chains to Latin</p>
            </Link>
            <Link href="/word/hebrew/ahavah" className="p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
              <h3 className="text-lg font-semibold text-gold-400 mb-1">🕎 Word Provenance</h3>
              <p className="text-sm text-parchment-400">Complete word history: Proto-Semitic → Hebrew → Greek → Latin → English</p>
            </Link>
            <Link href="/search?q=love" className="p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all">
              <h3 className="text-lg font-semibold text-gold-400 mb-1">🔍 Full-Text Search</h3>
              <p className="text-sm text-parchment-400">Search across all translations including Vulgate</p>
            </Link>
          </div>

          {/* Stats */}
          <div className="text-center text-parchment-600 text-xs">
            <p>5 translations (incl. Latin Vulgate) · 155,000+ verses · 430,000+ cross-references · 106 word provenance entries</p>
            <p className="mt-1">Built with Next.js · SQLite · Open Source</p>
          </div>
        </div>
      </main>
    </>
  );
}
