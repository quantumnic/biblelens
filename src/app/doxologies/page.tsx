import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Doxology {
  name: string;
  reference: string;
  slug: string;
  chapter: number;
  verse: number;
  description: string;
  context: string;
  type: 'doxology' | 'hymn' | 'canticle' | 'song';
}

const DOXOLOGIES: Doxology[] = [
  {
    name: 'The Song of Moses',
    reference: 'Exodus 15:1-18',
    slug: 'exodus',
    chapter: 15,
    verse: 1,
    description: 'Victory song after crossing the Red Sea',
    context: 'The oldest extended poem in the Bible, celebrating God\'s triumph over Pharaoh\'s army',
    type: 'song',
  },
  {
    name: 'The Song of Deborah',
    reference: 'Judges 5:1-31',
    slug: 'judges',
    chapter: 5,
    verse: 1,
    description: 'Triumph song after defeating Sisera',
    context: 'One of the oldest passages in the Hebrew Bible, a victory hymn by the prophetess Deborah',
    type: 'song',
  },
  {
    name: 'Hannah\'s Prayer',
    reference: '1 Samuel 2:1-10',
    slug: '1-samuel',
    chapter: 2,
    verse: 1,
    description: 'A mother\'s song of thanksgiving',
    context: 'Hannah\'s poetic prayer after dedicating Samuel to God — a model for Mary\'s Magnificat',
    type: 'canticle',
  },
  {
    name: 'David\'s Psalm of Thanksgiving',
    reference: '2 Samuel 22:1-51',
    slug: '2-samuel',
    chapter: 22,
    verse: 1,
    description: 'Royal thanksgiving for deliverance',
    context: 'David\'s grand hymn of praise after God delivered him from all enemies, parallels Psalm 18',
    type: 'hymn',
  },
  {
    name: 'The Magnificat',
    reference: 'Luke 1:46-55',
    slug: 'luke',
    chapter: 1,
    verse: 46,
    description: 'Mary\'s song of praise',
    context: 'Mary\'s prophetic hymn echoing Hannah\'s prayer, proclaiming God\'s reversal of the social order',
    type: 'canticle',
  },
  {
    name: 'The Benedictus',
    reference: 'Luke 1:68-79',
    slug: 'luke',
    chapter: 1,
    verse: 68,
    description: 'Zechariah\'s prophetic song',
    context: 'Zechariah\'s Spirit-filled prophecy at John the Baptist\'s birth, celebrating God\'s covenant faithfulness',
    type: 'canticle',
  },
  {
    name: 'The Nunc Dimittis',
    reference: 'Luke 2:29-32',
    slug: 'luke',
    chapter: 2,
    verse: 29,
    description: 'Simeon\'s farewell hymn',
    context: 'Aged Simeon\'s peaceful prayer upon seeing the infant Jesus — "a light to the Gentiles"',
    type: 'canticle',
  },
  {
    name: 'The Kenosis Hymn',
    reference: 'Philippians 2:5-11',
    slug: 'philippians',
    chapter: 2,
    verse: 5,
    description: 'Christ\'s self-emptying and exaltation',
    context: 'The great Christological hymn: incarnation, humiliation, death, and supreme exaltation',
    type: 'hymn',
  },
  {
    name: 'The Colossian Hymn',
    reference: 'Colossians 1:15-20',
    slug: 'colossians',
    chapter: 1,
    verse: 15,
    description: 'The supremacy of Christ',
    context: 'Early Christian hymn declaring Christ as image of the invisible God, firstborn over all creation',
    type: 'hymn',
  },
  {
    name: 'The Doxology of Jude',
    reference: 'Jude 24-25',
    slug: 'jude',
    chapter: 1,
    verse: 24,
    description: 'Closing doxology of preservation',
    context: 'One of the most beloved benedictions: "Now unto him that is able to keep you from falling"',
    type: 'doxology',
  },
  {
    name: 'Romans Doxology',
    reference: 'Romans 11:33-36',
    slug: 'romans',
    chapter: 11,
    verse: 33,
    description: '"O the depth of the riches!"',
    context: 'Paul\'s awestruck doxology after expounding God\'s sovereign plan for Jews and Gentiles',
    type: 'doxology',
  },
  {
    name: 'Ephesian Doxology',
    reference: 'Ephesians 3:20-21',
    slug: 'ephesians',
    chapter: 3,
    verse: 20,
    description: '"Exceeding abundantly above all"',
    context: 'Paul\'s doxology celebrating God\'s power at work within believers — beyond imagination',
    type: 'doxology',
  },
  {
    name: 'The Heavenly Throne Room',
    reference: 'Revelation 4:8-11',
    slug: 'revelation',
    chapter: 4,
    verse: 8,
    description: '"Holy, holy, holy" — the ceaseless worship',
    context: 'The four living creatures and twenty-four elders worship the eternal God day and night',
    type: 'hymn',
  },
  {
    name: 'The Song of the Lamb',
    reference: 'Revelation 5:9-14',
    slug: 'revelation',
    chapter: 5,
    verse: 9,
    description: '"Worthy is the Lamb"',
    context: 'Cosmic worship as every creature joins to praise the Lamb who was slain',
    type: 'hymn',
  },
  {
    name: 'The Hallelujah Chorus',
    reference: 'Revelation 19:1-8',
    slug: 'revelation',
    chapter: 19,
    verse: 1,
    description: 'The great multitude\'s fourfold Hallelujah',
    context: 'Heaven\'s celebration of God\'s righteous judgments and the marriage of the Lamb',
    type: 'doxology',
  },
];

const TYPE_ICONS: Record<string, string> = {
  doxology: '🙌',
  hymn: '🎵',
  canticle: '🕊️',
  song: '🎶',
};

const TYPE_COLORS: Record<string, string> = {
  doxology: 'bg-gold-600/20 text-gold-400',
  hymn: 'bg-blue-600/20 text-blue-400',
  canticle: 'bg-purple-600/20 text-purple-400',
  song: 'bg-green-600/20 text-green-400',
};

export default function DoxologiesPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">
            🎵 Doxologies, Hymns &amp; Canticles
          </h1>
          <p className="text-parchment-400">
            The great songs of Scripture — from Moses&apos; victory song to heaven&apos;s Hallelujah chorus.
            These passages have been sung, chanted, and set to music for millennia.
          </p>
        </div>

        {/* Type legend */}
        <div className="flex flex-wrap gap-3 mb-6">
          {Object.entries(TYPE_ICONS).map(([type, icon]) => (
            <span key={type} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${TYPE_COLORS[type]}`}>
              {icon} {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {DOXOLOGIES.map((d, i) => (
            <Link
              key={i}
              href={`/reader/${d.slug}/${d.chapter}#v${d.verse}`}
              className="block p-5 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">
                  {TYPE_ICONS[d.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-parchment-100 font-serif">{d.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${TYPE_COLORS[d.type]}`}>
                      {d.type}
                    </span>
                  </div>
                  <p className="text-sm text-gold-400 font-semibold mb-1">{d.reference}</p>
                  <p className="text-sm text-parchment-300 mb-1">{d.description}</p>
                  <p className="text-xs text-parchment-500">{d.context}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Closing note */}
        <div className="mt-8 p-5 rounded-xl bg-parchment-900/50 border border-parchment-800 text-center">
          <p className="text-sm text-parchment-400 italic">
            &ldquo;Speaking to yourselves in psalms and hymns and spiritual songs, singing and making melody in your heart to the Lord.&rdquo;
          </p>
          <p className="text-xs text-gold-500 mt-2">— Ephesians 5:19 (KJV)</p>
        </div>
      </main>
    </>
  );
}
