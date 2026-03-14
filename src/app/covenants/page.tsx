import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Covenant {
  name: string;
  hebrew?: string;
  greek?: string;
  parties: string;
  sign: string;
  promise: string;
  references: { ref: string; slug: string; ch: number; v: number }[];
  description: string;
}

const COVENANTS: Covenant[] = [
  {
    name: 'Adamic Covenant',
    parties: 'God → Adam & Eve',
    sign: 'Tree of Life',
    promise: 'Dominion over creation, with prohibition on the tree of knowledge',
    references: [
      { ref: 'Genesis 1:28', slug: 'genesis', ch: 1, v: 28 },
      { ref: 'Genesis 2:16-17', slug: 'genesis', ch: 2, v: 16 },
    ],
    description: 'The first covenant established at creation, granting humanity stewardship over the earth with a single prohibition.',
  },
  {
    name: 'Noahic Covenant',
    parties: 'God → Noah & all living creatures',
    sign: 'Rainbow 🌈',
    promise: 'Never again destroy earth by flood',
    references: [
      { ref: 'Genesis 9:9-17', slug: 'genesis', ch: 9, v: 9 },
      { ref: 'Genesis 8:21-22', slug: 'genesis', ch: 8, v: 21 },
    ],
    description: 'A universal covenant with all creation, sealed by the rainbow — the first unconditional covenant.',
  },
  {
    name: 'Abrahamic Covenant',
    hebrew: 'בְּרִית אַבְרָהָם',
    parties: 'God → Abraham & descendants',
    sign: 'Circumcision',
    promise: 'Great nation, land, blessing to all nations',
    references: [
      { ref: 'Genesis 12:1-3', slug: 'genesis', ch: 12, v: 1 },
      { ref: 'Genesis 15:1-21', slug: 'genesis', ch: 15, v: 1 },
      { ref: 'Genesis 17:1-14', slug: 'genesis', ch: 17, v: 1 },
    ],
    description: 'The foundational covenant establishing Israel as God\'s chosen people, with promises of land, descendants, and universal blessing.',
  },
  {
    name: 'Mosaic Covenant',
    hebrew: 'בְּרִית סִינַי',
    parties: 'God ↔ Israel (conditional)',
    sign: 'Sabbath',
    promise: 'Blessing for obedience, curse for disobedience — a kingdom of priests',
    references: [
      { ref: 'Exodus 19:5-6', slug: 'exodus', ch: 19, v: 5 },
      { ref: 'Exodus 24:3-8', slug: 'exodus', ch: 24, v: 3 },
      { ref: 'Deuteronomy 28:1-68', slug: 'deuteronomy', ch: 28, v: 1 },
    ],
    description: 'The conditional covenant at Sinai — the Torah as the terms, with blessings and curses contingent on Israel\'s faithfulness.',
  },
  {
    name: 'Davidic Covenant',
    hebrew: 'בְּרִית דָּוִד',
    parties: 'God → David & royal line',
    sign: 'Throne',
    promise: 'An eternal dynasty — "your throne shall be established forever"',
    references: [
      { ref: '2 Samuel 7:12-16', slug: '2-samuel', ch: 7, v: 12 },
      { ref: 'Psalm 89:3-4', slug: 'psalms', ch: 89, v: 3 },
      { ref: 'Luke 1:32-33', slug: 'luke', ch: 1, v: 32 },
    ],
    description: 'God\'s promise to David of an everlasting kingdom — fulfilled in the NT through Jesus as the "Son of David."',
  },
  {
    name: 'New Covenant',
    hebrew: 'בְּרִית חֲדָשָׁה',
    greek: 'καινὴ διαθήκη',
    parties: 'God → all believers through Christ',
    sign: 'The Lord\'s Supper / Holy Spirit',
    promise: 'Forgiveness of sins, law written on hearts, intimate knowledge of God',
    references: [
      { ref: 'Jeremiah 31:31-34', slug: 'jeremiah', ch: 31, v: 31 },
      { ref: 'Luke 22:20', slug: 'luke', ch: 22, v: 20 },
      { ref: 'Hebrews 8:6-13', slug: 'hebrews', ch: 8, v: 6 },
      { ref: '2 Corinthians 3:6', slug: '2-corinthians', ch: 3, v: 6 },
    ],
    description: 'The culmination of all covenants — through Christ\'s sacrifice, God\'s law is internalized and sins are permanently forgiven.',
  },
];

export default function CovenantsPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">📜 Biblical Covenants</h1>
          <p className="text-parchment-400">The progressive revelation of God&apos;s binding promises — from creation to the New Covenant in Christ.</p>
        </div>

        {/* Covenant Timeline */}
        <div className="relative mb-8">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-500 via-gold-600/50 to-gold-500" />
          <div className="space-y-6">
            {COVENANTS.map((c, i) => (
              <div key={c.name} className="relative pl-16">
                {/* Timeline dot */}
                <div className="absolute left-3.5 top-4 w-5 h-5 rounded-full bg-gold-600 border-2 border-parchment-950 flex items-center justify-center z-10">
                  <span className="text-[8px] text-parchment-950 font-bold">{i + 1}</span>
                </div>

                <div className="bg-parchment-900 border border-parchment-800 rounded-2xl p-5 hover:border-gold-500/30 transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h2 className="text-lg font-semibold text-gold-400 font-serif">{c.name}</h2>
                    {c.hebrew && <span className="text-sm text-parchment-500 font-serif" dir="rtl">{c.hebrew}</span>}
                    {c.greek && <span className="text-sm text-parchment-500 font-serif">{c.greek}</span>}
                  </div>

                  <p className="text-sm text-parchment-300 mb-3">{c.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <div className="bg-parchment-800/50 rounded-lg p-3">
                      <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">Parties</p>
                      <p className="text-sm text-parchment-200">{c.parties}</p>
                    </div>
                    <div className="bg-parchment-800/50 rounded-lg p-3">
                      <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">Sign</p>
                      <p className="text-sm text-parchment-200">{c.sign}</p>
                    </div>
                    <div className="bg-parchment-800/50 rounded-lg p-3">
                      <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">Promise</p>
                      <p className="text-sm text-parchment-200">{c.promise}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {c.references.map(r => (
                      <Link key={r.ref} href={`/reader/${r.slug}/${r.ch}#v${r.v}`}
                        className="text-xs px-2.5 py-1 rounded-full bg-gold-600/20 text-gold-400 hover:bg-gold-600/30 transition-colors">
                        {r.ref}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Covenant Comparison */}
        <section className="bg-parchment-900 border border-parchment-800 rounded-2xl p-5 mb-6">
          <h2 className="text-xl font-semibold text-parchment-200 mb-3 font-serif">🔗 Covenant Connections</h2>
          <div className="space-y-3 text-sm text-parchment-300">
            <div className="bg-parchment-800/30 rounded-lg p-3">
              <p className="text-gold-400 font-semibold mb-1">Conditional vs. Unconditional</p>
              <p>The Mosaic covenant is bilateral (conditional on obedience), while the Abrahamic, Davidic, and New Covenants are unilateral — God binds Himself regardless of human faithfulness.</p>
            </div>
            <div className="bg-parchment-800/30 rounded-lg p-3">
              <p className="text-gold-400 font-semibold mb-1">Progressive Fulfillment</p>
              <p>Each covenant builds on prior ones. The New Covenant doesn&apos;t cancel Abraham&apos;s promise but fulfills it (Galatians 3:14) — extending blessing to all nations through faith in Christ.</p>
            </div>
            <div className="bg-parchment-800/30 rounded-lg p-3">
              <p className="text-gold-400 font-semibold mb-1">Blood & Sacrifice</p>
              <p>Most covenants are sealed with blood: animal sacrifices (Abraham, Moses), circumcision (Abraham), and ultimately Christ&apos;s blood — &ldquo;This cup is the new covenant in my blood&rdquo; (Luke 22:20).</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
