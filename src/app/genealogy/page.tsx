import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Person {
  name: string;
  ref: string;
  slug: string;
  chapter: number;
  verse: number;
  role?: string;
}

interface Lineage {
  title: string;
  description: string;
  icon: string;
  persons: Person[];
}

const LINEAGES: Lineage[] = [
  {
    title: 'Adam to Noah',
    description: 'The antediluvian patriarchs — ten generations from creation to the flood',
    icon: '🌍',
    persons: [
      { name: 'Adam', ref: 'Genesis 5:1', slug: 'genesis', chapter: 5, verse: 1, role: 'First man' },
      { name: 'Seth', ref: 'Genesis 5:3', slug: 'genesis', chapter: 5, verse: 3, role: 'Son of Adam' },
      { name: 'Enosh', ref: 'Genesis 5:6', slug: 'genesis', chapter: 5, verse: 6 },
      { name: 'Kenan', ref: 'Genesis 5:9', slug: 'genesis', chapter: 5, verse: 9 },
      { name: 'Mahalalel', ref: 'Genesis 5:12', slug: 'genesis', chapter: 5, verse: 12 },
      { name: 'Jared', ref: 'Genesis 5:15', slug: 'genesis', chapter: 5, verse: 15 },
      { name: 'Enoch', ref: 'Genesis 5:18', slug: 'genesis', chapter: 5, verse: 18, role: 'Walked with God' },
      { name: 'Methuselah', ref: 'Genesis 5:21', slug: 'genesis', chapter: 5, verse: 21, role: 'Oldest man (969 years)' },
      { name: 'Lamech', ref: 'Genesis 5:25', slug: 'genesis', chapter: 5, verse: 25 },
      { name: 'Noah', ref: 'Genesis 5:29', slug: 'genesis', chapter: 5, verse: 29, role: 'Builder of the Ark' },
    ],
  },
  {
    title: 'Noah to Abraham',
    description: 'The postdiluvian patriarchs — from the flood to the father of nations',
    icon: '🕊️',
    persons: [
      { name: 'Shem', ref: 'Genesis 11:10', slug: 'genesis', chapter: 11, verse: 10, role: 'Son of Noah' },
      { name: 'Arphaxad', ref: 'Genesis 11:12', slug: 'genesis', chapter: 11, verse: 12 },
      { name: 'Shelah', ref: 'Genesis 11:14', slug: 'genesis', chapter: 11, verse: 14 },
      { name: 'Eber', ref: 'Genesis 11:16', slug: 'genesis', chapter: 11, verse: 16, role: 'Ancestor of the Hebrews' },
      { name: 'Peleg', ref: 'Genesis 11:18', slug: 'genesis', chapter: 11, verse: 18 },
      { name: 'Reu', ref: 'Genesis 11:20', slug: 'genesis', chapter: 11, verse: 20 },
      { name: 'Serug', ref: 'Genesis 11:22', slug: 'genesis', chapter: 11, verse: 22 },
      { name: 'Nahor', ref: 'Genesis 11:24', slug: 'genesis', chapter: 11, verse: 24 },
      { name: 'Terah', ref: 'Genesis 11:26', slug: 'genesis', chapter: 11, verse: 26 },
      { name: 'Abraham', ref: 'Genesis 12:1', slug: 'genesis', chapter: 12, verse: 1, role: 'Father of many nations' },
    ],
  },
  {
    title: 'The Patriarchs',
    description: 'Abraham through the twelve tribes of Israel',
    icon: '⭐',
    persons: [
      { name: 'Abraham', ref: 'Genesis 12:1', slug: 'genesis', chapter: 12, verse: 1, role: 'Father of faith' },
      { name: 'Isaac', ref: 'Genesis 21:3', slug: 'genesis', chapter: 21, verse: 3, role: 'Child of promise' },
      { name: 'Jacob (Israel)', ref: 'Genesis 25:26', slug: 'genesis', chapter: 25, verse: 26, role: 'Father of 12 tribes' },
      { name: 'Judah', ref: 'Genesis 29:35', slug: 'genesis', chapter: 29, verse: 35, role: 'Royal tribe' },
      { name: 'Levi', ref: 'Genesis 29:34', slug: 'genesis', chapter: 29, verse: 34, role: 'Priestly tribe' },
      { name: 'Joseph', ref: 'Genesis 30:24', slug: 'genesis', chapter: 30, verse: 24, role: 'Ruler in Egypt' },
      { name: 'Benjamin', ref: 'Genesis 35:18', slug: 'genesis', chapter: 35, verse: 18, role: 'Youngest son' },
    ],
  },
  {
    title: 'The Royal Line of David',
    description: 'From Judah to King David — the messianic lineage',
    icon: '👑',
    persons: [
      { name: 'Judah', ref: 'Genesis 49:10', slug: 'genesis', chapter: 49, verse: 10, role: 'The sceptre promise' },
      { name: 'Perez', ref: 'Ruth 4:18', slug: 'ruth', chapter: 4, verse: 18 },
      { name: 'Hezron', ref: 'Ruth 4:19', slug: 'ruth', chapter: 4, verse: 19 },
      { name: 'Ram', ref: 'Ruth 4:19', slug: 'ruth', chapter: 4, verse: 19 },
      { name: 'Amminadab', ref: 'Ruth 4:19', slug: 'ruth', chapter: 4, verse: 19 },
      { name: 'Nahshon', ref: 'Ruth 4:20', slug: 'ruth', chapter: 4, verse: 20 },
      { name: 'Salmon', ref: 'Ruth 4:20', slug: 'ruth', chapter: 4, verse: 20 },
      { name: 'Boaz', ref: 'Ruth 4:21', slug: 'ruth', chapter: 4, verse: 21, role: 'Kinsman-redeemer' },
      { name: 'Obed', ref: 'Ruth 4:21', slug: 'ruth', chapter: 4, verse: 21 },
      { name: 'Jesse', ref: 'Ruth 4:22', slug: 'ruth', chapter: 4, verse: 22 },
      { name: 'David', ref: '1 Samuel 16:13', slug: '1-samuel', chapter: 16, verse: 13, role: 'King of Israel' },
    ],
  },
  {
    title: 'David to the Exile',
    description: 'The kings of Judah from Solomon to the Babylonian captivity',
    icon: '🏛️',
    persons: [
      { name: 'Solomon', ref: '1 Kings 1:39', slug: '1-kings', chapter: 1, verse: 39, role: 'Builder of the Temple' },
      { name: 'Rehoboam', ref: '1 Kings 11:43', slug: '1-kings', chapter: 11, verse: 43, role: 'Kingdom divided' },
      { name: 'Asa', ref: '1 Kings 15:11', slug: '1-kings', chapter: 15, verse: 11, role: 'Reformer king' },
      { name: 'Jehoshaphat', ref: '1 Kings 22:41', slug: '1-kings', chapter: 22, verse: 41 },
      { name: 'Hezekiah', ref: '2 Kings 18:3', slug: '2-kings', chapter: 18, verse: 3, role: 'Faithful reformer' },
      { name: 'Josiah', ref: '2 Kings 22:1', slug: '2-kings', chapter: 22, verse: 1, role: 'Last great reformer' },
      { name: 'Jehoiachin', ref: '2 Kings 24:8', slug: '2-kings', chapter: 24, verse: 8, role: 'Taken to Babylon' },
    ],
  },
  {
    title: 'Genealogy of Jesus (Matthew 1)',
    description: 'The legal lineage of Jesus through Joseph — 42 generations',
    icon: '✝️',
    persons: [
      { name: 'Abraham', ref: 'Matthew 1:2', slug: 'matthew', chapter: 1, verse: 2 },
      { name: 'David', ref: 'Matthew 1:6', slug: 'matthew', chapter: 1, verse: 6, role: 'King' },
      { name: 'Solomon', ref: 'Matthew 1:7', slug: 'matthew', chapter: 1, verse: 7 },
      { name: 'Zerubbabel', ref: 'Matthew 1:12', slug: 'matthew', chapter: 1, verse: 12, role: 'Post-exile governor' },
      { name: 'Joseph', ref: 'Matthew 1:16', slug: 'matthew', chapter: 1, verse: 16, role: 'Husband of Mary' },
      { name: 'Jesus', ref: 'Matthew 1:16', slug: 'matthew', chapter: 1, verse: 16, role: 'Christ, Son of God' },
    ],
  },
];

export default function GenealogyPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Genealogies</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🌳 Biblical Genealogies</h1>
        <p className="text-parchment-400 mb-8 max-w-2xl">
          Tracing the family lines of Scripture — from Adam to Christ. The genealogies reveal God&apos;s
          faithfulness across generations and the unbroken thread of the messianic promise.
        </p>

        <div className="space-y-8">
          {LINEAGES.map((lineage, li) => (
            <section key={li} className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">{lineage.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-parchment-100 font-serif">{lineage.title}</h2>
                  <p className="text-sm text-parchment-400">{lineage.description}</p>
                </div>
              </div>

              {/* Visual lineage chain */}
              <div className="relative ml-4">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gold-600/30" />
                <div className="space-y-3">
                  {lineage.persons.map((person, pi) => (
                    <div key={pi} className="flex items-center gap-4 relative">
                      <div className="w-7 h-7 rounded-full bg-gold-600/20 border-2 border-gold-500/40 flex items-center justify-center text-[10px] text-gold-400 font-bold flex-shrink-0 relative z-10">
                        {pi + 1}
                      </div>
                      <Link
                        href={`/reader/${person.slug}/${person.chapter}#v${person.verse}`}
                        className="flex-1 flex items-center justify-between bg-parchment-800/50 hover:bg-parchment-800 rounded-lg px-4 py-2.5 transition-colors group"
                      >
                        <div>
                          <span className="text-parchment-100 font-semibold group-hover:text-gold-400 transition-colors">
                            {person.name}
                          </span>
                          {person.role && (
                            <span className="text-xs text-parchment-500 ml-2">— {person.role}</span>
                          )}
                        </div>
                        <span className="text-xs text-parchment-500 font-mono">{person.ref}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{LINEAGES.length}</div>
            <div className="text-xs text-parchment-500 mt-1">Family Lines</div>
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">{LINEAGES.reduce((s, l) => s + l.persons.length, 0)}</div>
            <div className="text-xs text-parchment-500 mt-1">Named Persons</div>
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">~4000 yr</div>
            <div className="text-xs text-parchment-500 mt-1">Time Span</div>
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold-400">42</div>
            <div className="text-xs text-parchment-500 mt-1">Generations (Matt 1)</div>
          </div>
        </div>
      </main>
    </>
  );
}
