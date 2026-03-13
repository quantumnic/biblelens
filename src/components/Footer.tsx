import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-parchment-800 mt-12 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">Study</h3>
            <div className="space-y-1">
              <Link href="/reader/genesis/1" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Read Bible</Link>
              <Link href="/search" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Search</Link>
              <Link href="/compare" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Compare</Link>
              <Link href="/bookmarks" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Bookmarks</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">Tools</h3>
            <div className="space-y-1">
              <Link href="/word/G26" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Strong&apos;s Concordance</Link>
              <Link href="/latin/amor" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Latin Vulgate</Link>
              <Link href="/parallels" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Parallel Passages</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">Explore</h3>
            <div className="space-y-1">
              <Link href="/analytics" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Analytics</Link>
              <Link href="/heatmap" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Word Heatmap</Link>
              <Link href="/timeline" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Timeline</Link>
              <Link href="/figures" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Figures of Speech</Link>
              <Link href="/names-of-god" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Names of God</Link>
              <Link href="/persons" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Key Persons</Link>
              <Link href="/verse-of-the-day" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Verse of the Day</Link>
              <Link href="/alphabet" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">Alphabets</Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">About</h3>
            <div className="space-y-1">
              <a href="https://github.com/quantumnic/biblelens" target="_blank" rel="noopener noreferrer" className="block text-xs text-parchment-400 hover:text-gold-400 transition-colors">GitHub</a>
              <span className="block text-xs text-parchment-500">Open Source</span>
              <span className="block text-xs text-parchment-500">KJV, ASV, WEB, VUL</span>
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-parchment-600 pt-4 border-t border-parchment-800/50">
          <p>📖 BibleLens — Analytical Bible Study Platform</p>
          <p className="mt-1">Built with Next.js • Data from public domain translations</p>
        </div>
      </div>
    </footer>
  );
}
