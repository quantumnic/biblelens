import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface SacrificeType {
  name: string;
  hebrew: string;
  transliteration: string;
  strongs: string;
  purpose: string;
  description: string;
  animal: string;
  references: { ref: string; slug: string; ch: number; v: number }[];
  ntFulfillment: string;
}

const SACRIFICES: SacrificeType[] = [
  {
    name: 'Burnt Offering',
    hebrew: 'עֹלָה',
    transliteration: 'Olah',
    strongs: 'H5930',
    purpose: 'Atonement, devotion, worship',
    description: 'Completely consumed by fire — symbolizing total surrender and dedication to God. The most common offering, presented morning and evening.',
    animal: 'Bull, ram, goat, dove, or pigeon (based on ability)',
    references: [
      { ref: 'Leviticus 1:1-17', slug: 'leviticus', ch: 1, v: 1 },
      { ref: 'Genesis 22:2', slug: 'genesis', ch: 22, v: 2 },
    ],
    ntFulfillment: 'Christ\'s complete self-offering (Hebrews 10:10) — total surrender to God\'s will.',
  },
  {
    name: 'Grain/Meal Offering',
    hebrew: 'מִנְחָה',
    transliteration: 'Minchah',
    strongs: 'H4503',
    purpose: 'Thanksgiving, dedication of labor',
    description: 'A non-blood offering of fine flour, oil, and frankincense — representing the fruit of one\'s work offered to God.',
    animal: 'None (flour, oil, salt, frankincense)',
    references: [
      { ref: 'Leviticus 2:1-16', slug: 'leviticus', ch: 2, v: 1 },
    ],
    ntFulfillment: 'Believers as living sacrifices, offering spiritual worship (Romans 12:1).',
  },
  {
    name: 'Peace/Fellowship Offering',
    hebrew: 'שֶׁלֶם',
    transliteration: 'Shelem',
    strongs: 'H8002',
    purpose: 'Thanksgiving, fellowship with God',
    description: 'A shared meal — part burned, part given to priests, part eaten by the offerer. The only sacrifice where the worshiper ate.',
    animal: 'Bull, cow, lamb, or goat (male or female)',
    references: [
      { ref: 'Leviticus 3:1-17', slug: 'leviticus', ch: 3, v: 1 },
      { ref: 'Leviticus 7:11-34', slug: 'leviticus', ch: 7, v: 11 },
    ],
    ntFulfillment: 'The Lord\'s Supper — communion and fellowship through Christ\'s body (1 Cor 10:16-17).',
  },
  {
    name: 'Sin Offering',
    hebrew: 'חַטָּאת',
    transliteration: 'Chattat',
    strongs: 'H2403',
    purpose: 'Purification from unintentional sin',
    description: 'Required for cleansing from inadvertent transgressions. The animal varied by the status of the sinner — priest, community, ruler, or individual.',
    animal: 'Bull (priest/community), male goat (ruler), female goat/lamb (individual)',
    references: [
      { ref: 'Leviticus 4:1-35', slug: 'leviticus', ch: 4, v: 1 },
      { ref: 'Leviticus 5:1-13', slug: 'leviticus', ch: 5, v: 1 },
    ],
    ntFulfillment: 'Christ made sin for us (2 Corinthians 5:21) — the ultimate purification.',
  },
  {
    name: 'Guilt/Trespass Offering',
    hebrew: 'אָשָׁם',
    transliteration: 'Asham',
    strongs: 'H817',
    purpose: 'Restitution for wrongs against God or others',
    description: 'Required when someone wronged another or violated sacred things — demanded restitution plus 20% penalty alongside the sacrifice.',
    animal: 'Ram (usually)',
    references: [
      { ref: 'Leviticus 5:14-19', slug: 'leviticus', ch: 5, v: 14 },
      { ref: 'Leviticus 6:1-7', slug: 'leviticus', ch: 6, v: 1 },
      { ref: 'Isaiah 53:10', slug: 'isaiah', ch: 53, v: 10 },
    ],
    ntFulfillment: 'Christ as the guilt offering (Isaiah 53:10) — making restitution for humanity\'s debt.',
  },
];

export default function SacrificesPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🔥 Levitical Sacrifices</h1>
          <p className="text-parchment-400">The five major offerings of the Mosaic system — their purpose, practice, and New Testament fulfillment in Christ.</p>
        </div>

        <div className="space-y-6">
          {SACRIFICES.map((s, i) => (
            <div key={s.name} className="bg-parchment-900 border border-parchment-800 rounded-2xl p-5 hover:border-gold-500/20 transition-all">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className="text-xl font-semibold text-gold-400 font-serif">{s.name}</h2>
                <span className="text-lg text-parchment-400 font-serif" dir="rtl">{s.hebrew}</span>
                <span className="text-sm text-parchment-500 italic">({s.transliteration})</span>
                <Link href={`/word/${s.strongs}`}
                  className="text-xs px-2 py-0.5 rounded bg-gold-600/20 text-gold-400 hover:bg-gold-600/30 transition-colors font-mono">
                  {s.strongs}
                </Link>
              </div>

              <p className="text-sm text-parchment-300 mb-4">{s.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                <div className="bg-parchment-800/50 rounded-lg p-3">
                  <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">Purpose</p>
                  <p className="text-sm text-parchment-200">{s.purpose}</p>
                </div>
                <div className="bg-parchment-800/50 rounded-lg p-3">
                  <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">Offering</p>
                  <p className="text-sm text-parchment-200">{s.animal}</p>
                </div>
              </div>

              <div className="bg-blue-950/20 border border-blue-900/30 rounded-lg p-3 mb-3">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">✝️ New Testament Fulfillment</p>
                <p className="text-sm text-parchment-300">{s.ntFulfillment}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {s.references.map(r => (
                  <Link key={r.ref} href={`/reader/${r.slug}/${r.ch}#v${r.v}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-gold-600/20 text-gold-400 hover:bg-gold-600/30 transition-colors">
                    {r.ref}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <section className="mt-8 bg-parchment-900 border border-parchment-800 rounded-2xl p-5">
          <h2 className="text-xl font-semibold text-parchment-200 mb-3 font-serif">📖 The Big Picture</h2>
          <div className="text-sm text-parchment-300 space-y-2">
            <p>The Levitical sacrificial system taught Israel three foundational truths:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-parchment-200">Sin is serious</strong> — it costs a life</li>
              <li><strong className="text-parchment-200">Substitution is possible</strong> — an innocent can bear the penalty</li>
              <li><strong className="text-parchment-200">Access to God requires mediation</strong> — through blood and a priest</li>
            </ul>
            <p className="mt-3">The author of Hebrews calls these sacrifices &ldquo;a shadow of the good things to come&rdquo; (Hebrews 10:1) — pointing forward to Christ, who offered Himself once for all.</p>
          </div>
        </section>
      </main>
    </>
  );
}
