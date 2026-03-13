import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface TypePair {
  type: string;
  antitype: string;
  otRef: string;
  ntRef: string;
  otLink: string;
  ntLink: string;
  category: string;
  description: string;
}

const TYPOLOGY_DATA: TypePair[] = [
  { type: 'Adam', antitype: 'Christ (the Last Adam)', otRef: 'Genesis 2:7', ntRef: 'Romans 5:14; 1 Cor 15:45', otLink: '/reader/genesis/2#v7', ntLink: '/reader/romans/5#v14', category: 'Persons', description: 'As sin entered through the first Adam, grace abounds through the second Adam' },
  { type: 'Melchizedek', antitype: 'Christ the High Priest', otRef: 'Genesis 14:18-20', ntRef: 'Hebrews 7:1-17', otLink: '/reader/genesis/14#v18', ntLink: '/reader/hebrews/7#v1', category: 'Persons', description: 'King-priest without genealogy, foreshadowing Christ\'s eternal priesthood' },
  { type: 'Isaac\'s sacrifice', antitype: 'Christ\'s crucifixion', otRef: 'Genesis 22:1-14', ntRef: 'Hebrews 11:17-19', otLink: '/reader/genesis/22#v1', ntLink: '/reader/hebrews/11#v17', category: 'Events', description: 'A father offering his only son, received back "from the dead" figuratively' },
  { type: 'Joseph (sold by brothers)', antitype: 'Christ (betrayed, exalted)', otRef: 'Genesis 37-50', ntRef: 'Acts 7:9-14', otLink: '/reader/genesis/37#v1', ntLink: '/reader/acts/7#v9', category: 'Persons', description: 'Rejected by his own, raised to save them — a portrait of Christ' },
  { type: 'Passover Lamb', antitype: 'Christ our Passover', otRef: 'Exodus 12:1-13', ntRef: '1 Corinthians 5:7', otLink: '/reader/exodus/12#v1', ntLink: '/reader/1-corinthians/5#v7', category: 'Sacrifices', description: 'The unblemished lamb whose blood delivers from judgment' },
  { type: 'Manna from Heaven', antitype: 'Christ the Bread of Life', otRef: 'Exodus 16:14-35', ntRef: 'John 6:31-35', otLink: '/reader/exodus/16#v14', ntLink: '/reader/john/6#v31', category: 'Events', description: 'God provides sustaining bread in the wilderness; Christ is the true bread' },
  { type: 'The Rock struck for water', antitype: 'Christ smitten for us', otRef: 'Exodus 17:6', ntRef: '1 Corinthians 10:4', otLink: '/reader/exodus/17#v6', ntLink: '/reader/1-corinthians/10#v4', category: 'Events', description: 'Water from the rock — that Rock was Christ' },
  { type: 'The Tabernacle', antitype: 'Christ dwelling among us', otRef: 'Exodus 25-27', ntRef: 'John 1:14; Hebrews 9:11', otLink: '/reader/exodus/25#v1', ntLink: '/reader/john/1#v14', category: 'Structures', description: 'God\'s dwelling with His people — the Word became flesh and "tabernacled" among us' },
  { type: 'The Veil of the Temple', antitype: 'Christ\'s body', otRef: 'Exodus 26:31-33', ntRef: 'Hebrews 10:19-20', otLink: '/reader/exodus/26#v31', ntLink: '/reader/hebrews/10#v19', category: 'Structures', description: 'The veil torn at the crucifixion opens the way to God\'s presence' },
  { type: 'The Bronze Serpent', antitype: 'Christ lifted up on the cross', otRef: 'Numbers 21:8-9', ntRef: 'John 3:14-15', otLink: '/reader/numbers/21#v8', ntLink: '/reader/john/3#v14', category: 'Events', description: 'As Moses lifted the serpent, so must the Son of Man be lifted up' },
  { type: 'The Day of Atonement', antitype: 'Christ\'s once-for-all sacrifice', otRef: 'Leviticus 16', ntRef: 'Hebrews 9:7-14', otLink: '/reader/leviticus/16#v1', ntLink: '/reader/hebrews/9#v7', category: 'Sacrifices', description: 'The annual atonement foreshadows Christ\'s permanent, sufficient sacrifice' },
  { type: 'The Scapegoat', antitype: 'Christ bearing our sins', otRef: 'Leviticus 16:20-22', ntRef: '2 Corinthians 5:21; 1 Peter 2:24', otLink: '/reader/leviticus/16#v20', ntLink: '/reader/2-corinthians/5#v21', category: 'Sacrifices', description: 'One goat bears away the sins of the people — Christ bore our sins' },
  { type: 'Moses (deliverer)', antitype: 'Christ (the true Deliverer)', otRef: 'Deuteronomy 18:15', ntRef: 'Acts 3:22-23', otLink: '/reader/deuteronomy/18#v15', ntLink: '/reader/acts/3#v22', category: 'Persons', description: 'A prophet like Moses — but greater' },
  { type: 'Joshua leading into Canaan', antitype: 'Jesus leading into rest', otRef: 'Joshua 1:1-9', ntRef: 'Hebrews 4:8-10', otLink: '/reader/joshua/1#v1', ntLink: '/reader/hebrews/4#v8', category: 'Persons', description: 'Joshua (Yeshua) leads into the promised land; Jesus leads into true rest' },
  { type: 'David the King', antitype: 'Christ the eternal King', otRef: '2 Samuel 7:12-16', ntRef: 'Luke 1:32-33', otLink: '/reader/2-samuel/7#v12', ntLink: '/reader/luke/1#v32', category: 'Persons', description: 'God\'s covenant with David fulfilled in Christ\'s eternal throne' },
  { type: 'Solomon\'s Temple', antitype: 'Christ\'s body / the Church', otRef: '1 Kings 6', ntRef: 'John 2:19-21; 1 Cor 3:16', otLink: '/reader/1-kings/6#v1', ntLink: '/reader/john/2#v19', category: 'Structures', description: 'The temple as God\'s dwelling — Christ is the true temple' },
  { type: 'Jonah in the fish (3 days)', antitype: 'Christ in the tomb (3 days)', otRef: 'Jonah 1:17', ntRef: 'Matthew 12:40', otLink: '/reader/jonah/1#v17', ntLink: '/reader/matthew/12#v40', category: 'Events', description: 'Three days and three nights — the sign of Jonah' },
  { type: 'The Suffering Servant', antitype: 'Christ\'s passion', otRef: 'Isaiah 52:13-53:12', ntRef: 'Acts 8:32-35; 1 Peter 2:22-25', otLink: '/reader/isaiah/52#v13', ntLink: '/reader/acts/8#v32', category: 'Persons', description: 'Wounded for our transgressions, bruised for our iniquities' },
  { type: 'The Ark of Noah', antitype: 'Baptism / salvation in Christ', otRef: 'Genesis 6-8', ntRef: '1 Peter 3:20-21', otLink: '/reader/genesis/6#v1', ntLink: '/reader/1-peter/3#v20', category: 'Events', description: 'Saved through water — a figure of baptism and new life' },
  { type: 'The Red Sea crossing', antitype: 'Baptism into Christ', otRef: 'Exodus 14:21-31', ntRef: '1 Corinthians 10:1-2', otLink: '/reader/exodus/14#v21', ntLink: '/reader/1-corinthians/10#v1', category: 'Events', description: 'Passing through the sea into freedom — a type of baptism' },
];

const CATEGORIES = [...new Set(TYPOLOGY_DATA.map(t => t.category))].sort();

export default function TypologyPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🔗 Biblical Typology</h1>
          <p className="text-parchment-400">
            Old Testament types and their New Testament fulfillments — {TYPOLOGY_DATA.length} connections mapped.
          </p>
          <p className="text-sm text-parchment-500 mt-2 italic">
            Typology reveals how earlier events, persons, and institutions foreshadow later realities in God&apos;s redemptive plan.
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => {
            const count = TYPOLOGY_DATA.filter(t => t.category === cat).length;
            const icons: Record<string, string> = { Persons: '👤', Events: '⚡', Sacrifices: '🐑', Structures: '🏛️' };
            return (
              <span key={cat} className="px-3 py-1.5 bg-parchment-900 border border-parchment-700 rounded-full text-xs text-parchment-300">
                {icons[cat] || '📌'} {cat} <span className="text-gold-400 font-semibold ml-1">{count}</span>
              </span>
            );
          })}
        </div>

        {/* Type pairs */}
        <div className="space-y-4">
          {TYPOLOGY_DATA.map((t, i) => (
            <div key={i} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-gold-600/15 text-gold-500 text-xs rounded-full font-medium">
                  {t.category}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* OT Type */}
                <Link href={t.otLink} className="group block p-3 rounded-lg bg-parchment-950/50 border border-parchment-800 hover:border-gold-500/30 transition-all">
                  <p className="text-xs text-parchment-500 uppercase tracking-wider mb-1">🕎 Old Testament Type</p>
                  <p className="text-parchment-100 font-semibold font-serif group-hover:text-gold-400 transition-colors">{t.type}</p>
                  <p className="text-xs text-gold-500 mt-1">{t.otRef}</p>
                </Link>

                {/* NT Antitype */}
                <Link href={t.ntLink} className="group block p-3 rounded-lg bg-parchment-950/50 border border-parchment-800 hover:border-gold-500/30 transition-all">
                  <p className="text-xs text-parchment-500 uppercase tracking-wider mb-1">✝️ New Testament Fulfillment</p>
                  <p className="text-parchment-100 font-semibold font-serif group-hover:text-gold-400 transition-colors">{t.antitype}</p>
                  <p className="text-xs text-gold-500 mt-1">{t.ntRef}</p>
                </Link>
              </div>

              <p className="text-sm text-parchment-400 italic">{t.description}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
