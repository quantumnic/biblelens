import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-parchment-800 mt-12 py-8 px-4 bg-parchment-950/50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">Study</h3>
            <div className="space-y-1.5">
              <Link href="/reader/genesis/1" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Read Bible</Link>
              <Link href="/search" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Search</Link>
              <Link href="/compare" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Compare</Link>
              <Link href="/bookmarks" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Bookmarks</Link>
              <Link href="/study-notes" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Study Notes</Link>
              <Link href="/reading-plans" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Reading Plans</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">Tools</h3>
            <div className="space-y-1.5">
              <Link href="/word/G26" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Strong&apos;s Concordance</Link>
              <Link href="/concordance" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Concordance Browser</Link>
              <Link href="/latin/amor" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Latin Vulgate</Link>
              <Link href="/parallels" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Parallel Passages</Link>
              <Link href="/chiasm" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Chiastic Structures</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">Theology</h3>
            <div className="space-y-1.5">
              <Link href="/ten-commandments" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Ten Commandments</Link>
              <Link href="/beatitudes" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Beatitudes</Link>
              <Link href="/fruit-of-spirit" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Fruit of the Spirit</Link>
              <Link href="/armor-of-god" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Armor of God</Link>
              <Link href="/parables" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Parables of Jesus</Link>
              <Link href="/typology" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Biblical Typology</Link>
              <Link href="/prophecies" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Prophecy Tracker</Link>
              <Link href="/covenants" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Biblical Covenants</Link>
              <Link href="/sacrifices" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Levitical Sacrifices</Link>
              <Link href="/miracles" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Miracles</Link>
              <Link href="/prayers" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Prayers</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-3">Explore</h3>
            <div className="space-y-1.5">
              <Link href="/analytics" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Analytics</Link>
              <Link href="/heatmap" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Word Heatmap</Link>
              <Link href="/timeline" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Timeline</Link>
              <Link href="/figures" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Figures of Speech</Link>
              <Link href="/names-of-god" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Names of God</Link>
              <Link href="/persons" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Key Persons</Link>
              <Link href="/geography" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Geography</Link>
              <Link href="/verse-of-the-day" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Verse of the Day</Link>
              <Link href="/alphabet" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Alphabets</Link>
              <Link href="/genealogy" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Genealogies</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-xs">
          <a href="https://github.com/quantumnic/biblelens" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-parchment-900 border border-parchment-800 rounded-full text-parchment-400 hover:text-gold-400 hover:border-gold-500/30 transition-all">
            ⭐ GitHub
          </a>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-parchment-900 border border-parchment-800 rounded-full text-parchment-500">
            📜 Open Source (MIT)
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-parchment-900 border border-parchment-800 rounded-full text-parchment-500">
            🌐 KJV · ASV · WEB · VUL
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-parchment-900 border border-parchment-800 rounded-full text-parchment-500">
            🔬 14 Research APIs
          </span>
        </div>
        <div className="text-center text-xs text-parchment-600 pt-5 border-t border-parchment-800/50">
          <p className="flex items-center justify-center gap-2">
            <span>📖</span>
            <span className="font-semibold text-parchment-500">BibleLens</span>
            <span>—</span>
            <span>Analytical Bible Study Platform</span>
          </p>
          <p className="mt-1.5 text-parchment-700">
            Built with Next.js &amp; SQLite • Data from public domain translations • Strong&apos;s concordance &amp; cross-references
          </p>
        </div>
      </div>
    </footer>
  );
}
