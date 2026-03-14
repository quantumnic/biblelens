import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Miracle {
  title: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  category: 'nature' | 'healing' | 'resurrection' | 'provision' | 'judgment' | 'other';
  performer: 'Jesus' | 'Moses' | 'Elijah' | 'Elisha' | 'God' | 'Apostles' | 'Other';
  testament: 'OT' | 'NT';
  description: string;
}

const MIRACLES: Miracle[] = [
  { title: 'Parting of the Red Sea', reference: 'Exodus 14:21-22', book: 'exodus', chapter: 14, verse: 21, category: 'nature', performer: 'Moses', testament: 'OT', description: 'God parts the Red Sea through Moses, allowing Israel to cross on dry ground.' },
  { title: 'The Burning Bush', reference: 'Exodus 3:2-4', book: 'exodus', chapter: 3, verse: 2, category: 'nature', performer: 'God', testament: 'OT', description: 'God appears to Moses in a bush that burns but is not consumed.' },
  { title: 'The Ten Plagues of Egypt', reference: 'Exodus 7-12', book: 'exodus', chapter: 7, verse: 1, category: 'judgment', performer: 'Moses', testament: 'OT', description: 'Ten devastating plagues upon Egypt to free the Israelites from bondage.' },
  { title: 'Manna from Heaven', reference: 'Exodus 16:14-15', book: 'exodus', chapter: 16, verse: 14, category: 'provision', performer: 'God', testament: 'OT', description: 'God provides bread from heaven daily to feed Israel in the wilderness.' },
  { title: 'Water from the Rock', reference: 'Exodus 17:6', book: 'exodus', chapter: 17, verse: 6, category: 'provision', performer: 'Moses', testament: 'OT', description: 'Moses strikes a rock at Horeb and water flows out for the people.' },
  { title: 'The Sun Stands Still', reference: 'Joshua 10:12-13', book: 'joshua', chapter: 10, verse: 12, category: 'nature', performer: 'God', testament: 'OT', description: 'The sun and moon stand still so Joshua can defeat the Amorites.' },
  { title: 'The Fall of Jericho', reference: 'Joshua 6:20', book: 'joshua', chapter: 6, verse: 20, category: 'nature', performer: 'God', testament: 'OT', description: 'The walls of Jericho fall after Israel marches and the trumpets sound.' },
  { title: 'Elijah and the Prophets of Baal', reference: '1 Kings 18:38', book: '1-kings', chapter: 18, verse: 38, category: 'nature', performer: 'Elijah', testament: 'OT', description: 'Fire from heaven consumes Elijah\'s sacrifice, altar, and water-soaked trench.' },
  { title: 'Elijah Taken to Heaven', reference: '2 Kings 2:11', book: '2-kings', chapter: 2, verse: 11, category: 'other', performer: 'God', testament: 'OT', description: 'Elijah is carried to heaven by a chariot and horses of fire in a whirlwind.' },
  { title: 'Elisha Parts the Jordan', reference: '2 Kings 2:14', book: '2-kings', chapter: 2, verse: 14, category: 'nature', performer: 'Elisha', testament: 'OT', description: 'Elisha strikes the Jordan with Elijah\'s mantle and the waters divide.' },
  { title: 'Naaman Healed of Leprosy', reference: '2 Kings 5:14', book: '2-kings', chapter: 5, verse: 14, category: 'healing', performer: 'Elisha', testament: 'OT', description: 'The Syrian commander Naaman is cleansed of leprosy by washing in the Jordan.' },
  { title: 'The Iron Axe Head Floats', reference: '2 Kings 6:6', book: '2-kings', chapter: 6, verse: 6, category: 'nature', performer: 'Elisha', testament: 'OT', description: 'Elisha makes a borrowed iron axe head float on water.' },
  { title: 'Daniel in the Lions\' Den', reference: 'Daniel 6:22', book: 'daniel', chapter: 6, verse: 22, category: 'other', performer: 'God', testament: 'OT', description: 'God sends an angel to shut the lions\' mouths, protecting Daniel.' },
  { title: 'The Fiery Furnace', reference: 'Daniel 3:25', book: 'daniel', chapter: 3, verse: 25, category: 'other', performer: 'God', testament: 'OT', description: 'Shadrach, Meshach, and Abednego walk unharmed in the furnace with a fourth figure.' },
  { title: 'Jonah and the Great Fish', reference: 'Jonah 1:17', book: 'jonah', chapter: 1, verse: 17, category: 'nature', performer: 'God', testament: 'OT', description: 'God appoints a great fish to swallow Jonah; he survives three days inside.' },
  { title: 'Water into Wine', reference: 'John 2:7-11', book: 'john', chapter: 2, verse: 7, category: 'nature', performer: 'Jesus', testament: 'NT', description: 'Jesus turns water into wine at the wedding in Cana — his first recorded miracle.' },
  { title: 'Feeding the 5,000', reference: 'Matthew 14:19-21', book: 'matthew', chapter: 14, verse: 19, category: 'provision', performer: 'Jesus', testament: 'NT', description: 'Five loaves and two fish feed 5,000 men plus women and children.' },
  { title: 'Walking on Water', reference: 'Matthew 14:25', book: 'matthew', chapter: 14, verse: 25, category: 'nature', performer: 'Jesus', testament: 'NT', description: 'Jesus walks on the Sea of Galilee during a storm to reach his disciples.' },
  { title: 'Calming the Storm', reference: 'Mark 4:39', book: 'mark', chapter: 4, verse: 39, category: 'nature', performer: 'Jesus', testament: 'NT', description: 'Jesus rebukes the wind and sea, and there is a great calm.' },
  { title: 'Healing the Blind Man', reference: 'John 9:6-7', book: 'john', chapter: 9, verse: 6, category: 'healing', performer: 'Jesus', testament: 'NT', description: 'Jesus heals a man born blind by anointing his eyes with clay and sending him to wash.' },
  { title: 'Raising of Lazarus', reference: 'John 11:43-44', book: 'john', chapter: 11, verse: 43, category: 'resurrection', performer: 'Jesus', testament: 'NT', description: 'Jesus raises Lazarus from the dead after four days in the tomb.' },
  { title: 'Healing the Paralytic', reference: 'Mark 2:10-12', book: 'mark', chapter: 2, verse: 10, category: 'healing', performer: 'Jesus', testament: 'NT', description: 'Jesus forgives sins and heals a paralyzed man lowered through the roof.' },
  { title: 'Healing the Leper', reference: 'Mark 1:41-42', book: 'mark', chapter: 1, verse: 41, category: 'healing', performer: 'Jesus', testament: 'NT', description: 'Jesus touches a leper and heals him instantly of his disease.' },
  { title: 'The Withered Hand Restored', reference: 'Mark 3:5', book: 'mark', chapter: 3, verse: 5, category: 'healing', performer: 'Jesus', testament: 'NT', description: 'Jesus heals a man\'s withered hand on the Sabbath in the synagogue.' },
  { title: 'The Resurrection of Jesus', reference: 'Matthew 28:5-6', book: 'matthew', chapter: 28, verse: 5, category: 'resurrection', performer: 'God', testament: 'NT', description: 'Jesus rises from the dead on the third day, the central miracle of Christianity.' },
  { title: 'The Transfiguration', reference: 'Matthew 17:2', book: 'matthew', chapter: 17, verse: 2, category: 'other', performer: 'Jesus', testament: 'NT', description: 'Jesus is transfigured on a mountain, his face shining like the sun.' },
  { title: 'Feeding the 4,000', reference: 'Matthew 15:36-38', book: 'matthew', chapter: 15, verse: 36, category: 'provision', performer: 'Jesus', testament: 'NT', description: 'Seven loaves and a few fish feed 4,000 men plus women and children.' },
  { title: 'Healing the Centurion\'s Servant', reference: 'Matthew 8:13', book: 'matthew', chapter: 8, verse: 13, category: 'healing', performer: 'Jesus', testament: 'NT', description: 'Jesus heals the centurion\'s servant remotely, marveling at the man\'s faith.' },
  { title: 'Casting Out Legion', reference: 'Mark 5:9-13', book: 'mark', chapter: 5, verse: 9, category: 'healing', performer: 'Jesus', testament: 'NT', description: 'Jesus casts a legion of demons into a herd of swine at Gadara.' },
  { title: 'The Virgin Birth', reference: 'Luke 1:35', book: 'luke', chapter: 1, verse: 35, category: 'other', performer: 'God', testament: 'NT', description: 'Mary conceives Jesus by the Holy Spirit — the incarnation of God.' },
  { title: 'Pentecost — Tongues of Fire', reference: 'Acts 2:3-4', book: 'acts', chapter: 2, verse: 3, category: 'other', performer: 'Apostles', testament: 'NT', description: 'The Holy Spirit descends as tongues of fire; the apostles speak in other languages.' },
  { title: 'Peter Heals the Lame Man', reference: 'Acts 3:6-8', book: 'acts', chapter: 3, verse: 6, category: 'healing', performer: 'Apostles', testament: 'NT', description: 'Peter heals a man lame from birth at the Beautiful Gate of the temple.' },
  { title: 'Peter\'s Prison Escape', reference: 'Acts 12:7-10', book: 'acts', chapter: 12, verse: 7, category: 'other', performer: 'God', testament: 'NT', description: 'An angel frees Peter from prison, chains falling off and gates opening by themselves.' },
  { title: 'Paul\'s Conversion Vision', reference: 'Acts 9:3-6', book: 'acts', chapter: 9, verse: 3, category: 'other', performer: 'Jesus', testament: 'NT', description: 'A light from heaven blinds Saul on the road to Damascus; Jesus speaks to him.' },
  { title: 'Paul Survives a Viper Bite', reference: 'Acts 28:3-5', book: 'acts', chapter: 28, verse: 3, category: 'other', performer: 'God', testament: 'NT', description: 'A venomous snake bites Paul on Malta, but he suffers no harm.' },
];

const CATEGORY_COLORS: Record<string, string> = {
  nature: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  healing: 'bg-green-500/20 text-green-300 border-green-500/30',
  resurrection: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  provision: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  judgment: 'bg-red-500/20 text-red-300 border-red-500/30',
  other: 'bg-parchment-700/40 text-parchment-300 border-parchment-600/30',
};

const CATEGORY_ICONS: Record<string, string> = {
  nature: '\u{1F30A}',
  healing: '\u{1F49A}',
  resurrection: '\u271D\uFE0F',
  provision: '\u{1F35E}',
  judgment: '\u26A1',
  other: '\u2728',
};

export default function MiraclesPage() {
  const otMiracles = MIRACLES.filter(m => m.testament === 'OT');
  const ntMiracles = MIRACLES.filter(m => m.testament === 'NT');

  const categories = [...new Set(MIRACLES.map(m => m.category))];
  const performers = [...new Set(MIRACLES.map(m => m.performer))];

  const categoryCounts = categories.map(c => ({ name: c, count: MIRACLES.filter(m => m.category === c).length }));
  const performerCounts = performers.map(p => ({ name: p, count: MIRACLES.filter(m => m.performer === p).length })).sort((a, b) => b.count - a.count);

  const renderMiracle = (m: Miracle, idx: number) => (
    <Link
      key={idx}
      href={`/reader/${m.book}/${m.chapter}#v${m.verse}`}
      className="block bg-parchment-900 border border-parchment-700 rounded-xl p-4 hover:border-gold-500/40 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif font-semibold text-parchment-100 group-hover:text-gold-400 transition-colors">
          {CATEGORY_ICONS[m.category]} {m.title}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${CATEGORY_COLORS[m.category]}`}>
          {m.category}
        </span>
      </div>
      <p className="text-sm text-parchment-400 mb-2">{m.description}</p>
      <div className="flex items-center gap-3 text-xs text-parchment-500">
        <span className="text-gold-500 font-medium">{m.reference}</span>
        <span>{'\u2022'}</span>
        <span>{m.performer}</span>
      </div>
    </Link>
  );

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Miracles</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">{'\u2728'} Miracles of the Bible</h1>
        <p className="text-parchment-400 mb-8">
          A catalog of {MIRACLES.length} supernatural acts across both testaments — from Creation to the early Church.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {categoryCounts.map(c => (
            <div key={c.name} className={`rounded-xl border p-3 text-center ${CATEGORY_COLORS[c.name]}`}>
              <div className="text-xl font-bold">{c.count}</div>
              <div className="text-xs capitalize">{CATEGORY_ICONS[c.name]} {c.name}</div>
            </div>
          ))}
        </div>

        <div className="bg-parchment-900 border border-parchment-700 rounded-xl p-5 mb-8">
          <h2 className="text-lg font-serif text-parchment-100 mb-3">By Performer</h2>
          <div className="flex flex-wrap gap-3">
            {performerCounts.map(p => (
              <div key={p.name} className="bg-parchment-800 rounded-lg px-4 py-2 text-sm">
                <span className="text-gold-400 font-semibold">{p.name}</span>
                <span className="text-parchment-500 ml-2">({p.count})</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-serif text-parchment-100 mb-4">{'\u{1F4DC}'} Old Testament ({otMiracles.length})</h2>
        <div className="grid gap-3 mb-10">
          {otMiracles.map((m, i) => renderMiracle(m, i))}
        </div>

        <h2 className="text-2xl font-serif text-parchment-100 mb-4">{'\u271D\uFE0F'} New Testament ({ntMiracles.length})</h2>
        <div className="grid gap-3 mb-10">
          {ntMiracles.map((m, i) => renderMiracle(m, i + 100))}
        </div>
      </main>
    </>
  );
}
