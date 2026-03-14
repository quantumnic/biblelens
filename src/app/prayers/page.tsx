import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface Prayer {
  title: string;
  person: string;
  reference: string;
  book: string;
  chapter: number;
  verse: number;
  type: 'petition' | 'praise' | 'confession' | 'intercession' | 'thanksgiving' | 'lament';
  testament: 'OT' | 'NT';
  summary: string;
}

const PRAYERS: Prayer[] = [
  // OT Prayers
  { title: "Abraham's Plea for Sodom", person: 'Abraham', reference: 'Genesis 18:23-32', book: 'genesis', chapter: 18, verse: 23, type: 'intercession', testament: 'OT', summary: 'Abraham negotiates with God to spare Sodom if righteous people are found there.' },
  { title: "Moses' Intercession for Israel", person: 'Moses', reference: 'Exodus 32:11-14', book: 'exodus', chapter: 32, verse: 11, type: 'intercession', testament: 'OT', summary: 'After the golden calf, Moses pleads with God not to destroy the people.' },
  { title: "Hannah's Prayer for a Son", person: 'Hannah', reference: '1 Samuel 1:10-11', book: '1-samuel', chapter: 1, verse: 10, type: 'petition', testament: 'OT', summary: 'Hannah pours out her soul, vowing to dedicate her child to the Lord.' },
  { title: "Hannah's Song of Praise", person: 'Hannah', reference: '1 Samuel 2:1-10', book: '1-samuel', chapter: 2, verse: 1, type: 'praise', testament: 'OT', summary: 'After Samuel is born, Hannah sings a hymn exalting God who reverses fortunes.' },
  { title: "Solomon's Prayer for Wisdom", person: 'Solomon', reference: '1 Kings 3:6-9', book: '1-kings', chapter: 3, verse: 6, type: 'petition', testament: 'OT', summary: 'Solomon asks God for an understanding heart to govern the people wisely.' },
  { title: "Solomon's Temple Dedication", person: 'Solomon', reference: '1 Kings 8:22-53', book: '1-kings', chapter: 8, verse: 22, type: 'praise', testament: 'OT', summary: 'Solomon consecrates the temple with an expansive prayer covering repentance, war, famine, and foreigners.' },
  { title: "Elijah on Mount Carmel", person: 'Elijah', reference: '1 Kings 18:36-37', book: '1-kings', chapter: 18, verse: 36, type: 'petition', testament: 'OT', summary: 'Elijah calls on God to reveal himself and turn the hearts of Israel back.' },
  { title: "David's Psalm of Repentance", person: 'David', reference: 'Psalm 51:1-19', book: 'psalms', chapter: 51, verse: 1, type: 'confession', testament: 'OT', summary: 'After his sin with Bathsheba, David pleads for cleansing and a renewed spirit.' },
  { title: "David's Cry for Deliverance", person: 'David', reference: 'Psalm 22:1-31', book: 'psalms', chapter: 22, verse: 1, type: 'lament', testament: 'OT', summary: '"My God, why hast thou forsaken me?" — a messianic psalm of suffering and vindication.' },
  { title: 'The Shepherd\'s Psalm', person: 'David', reference: 'Psalm 23:1-6', book: 'psalms', chapter: 23, verse: 1, type: 'praise', testament: 'OT', summary: '"The LORD is my shepherd" — the most beloved prayer of trust and comfort.' },
  { title: "Nehemiah's Prayer", person: 'Nehemiah', reference: 'Nehemiah 1:5-11', book: 'nehemiah', chapter: 1, verse: 5, type: 'confession', testament: 'OT', summary: 'Nehemiah confesses Israel\'s sins and asks God to grant favor before the king.' },
  { title: "Daniel's Prayer for Jerusalem", person: 'Daniel', reference: 'Daniel 9:4-19', book: 'daniel', chapter: 9, verse: 4, type: 'confession', testament: 'OT', summary: 'Daniel confesses the nation\'s sins and begs God to restore Jerusalem and the temple.' },
  { title: "Jonah's Prayer from the Fish", person: 'Jonah', reference: 'Jonah 2:1-9', book: 'jonah', chapter: 2, verse: 1, type: 'lament', testament: 'OT', summary: 'From inside the great fish, Jonah cries out to God and vows thanksgiving.' },
  { title: "Habakkuk's Prayer", person: 'Habakkuk', reference: 'Habakkuk 3:1-19', book: 'habakkuk', chapter: 3, verse: 1, type: 'praise', testament: 'OT', summary: '"Though the fig tree does not blossom... yet I will rejoice in the LORD."' },
  { title: "Job's Response to God", person: 'Job', reference: 'Job 42:1-6', book: 'job', chapter: 42, verse: 1, type: 'confession', testament: 'OT', summary: 'After God speaks from the whirlwind, Job repents in dust and ashes.' },

  // NT Prayers
  { title: "The Lord's Prayer", person: 'Jesus', reference: 'Matthew 6:9-13', book: 'matthew', chapter: 6, verse: 9, type: 'petition', testament: 'NT', summary: 'The model prayer taught by Jesus: "Our Father which art in heaven, Hallowed be thy name..."' },
  { title: "Jesus in Gethsemane", person: 'Jesus', reference: 'Matthew 26:39-42', book: 'matthew', chapter: 26, verse: 39, type: 'petition', testament: 'NT', summary: '"Not my will, but thine be done" — Jesus prays in agony before his arrest.' },
  { title: "Jesus' Prayer on the Cross", person: 'Jesus', reference: 'Luke 23:34', book: 'luke', chapter: 23, verse: 34, type: 'intercession', testament: 'NT', summary: '"Father, forgive them; for they know not what they do."' },
  { title: "The High Priestly Prayer", person: 'Jesus', reference: 'John 17:1-26', book: 'john', chapter: 17, verse: 1, type: 'intercession', testament: 'NT', summary: 'Jesus prays for his disciples and all future believers to be one, as he and the Father are one.' },
  { title: "Mary's Magnificat", person: 'Mary', reference: 'Luke 1:46-55', book: 'luke', chapter: 1, verse: 46, type: 'praise', testament: 'NT', summary: '"My soul doth magnify the Lord" — Mary\'s hymn after the Annunciation.' },
  { title: "Simeon's Prayer (Nunc Dimittis)", person: 'Simeon', reference: 'Luke 2:29-32', book: 'luke', chapter: 2, verse: 29, type: 'thanksgiving', testament: 'NT', summary: '"Lord, now lettest thou thy servant depart in peace" — upon seeing the Christ child.' },
  { title: "The Publican's Prayer", person: 'Tax Collector', reference: 'Luke 18:13', book: 'luke', chapter: 18, verse: 13, type: 'confession', testament: 'NT', summary: '"God be merciful to me a sinner" — the prayer Jesus held up as exemplary.' },
  { title: "Stephen's Final Prayer", person: 'Stephen', reference: 'Acts 7:59-60', book: 'acts', chapter: 7, verse: 59, type: 'intercession', testament: 'NT', summary: '"Lord, lay not this sin to their charge" — the first martyr echoes Christ\'s forgiveness.' },
  { title: "Paul's Prayer for the Ephesians", person: 'Paul', reference: 'Ephesians 3:14-21', book: 'ephesians', chapter: 3, verse: 14, type: 'intercession', testament: 'NT', summary: 'Paul prays for the Ephesians to be strengthened and to comprehend Christ\'s love.' },
  { title: "Paul's Prayer for the Philippians", person: 'Paul', reference: 'Philippians 1:9-11', book: 'philippians', chapter: 1, verse: 9, type: 'intercession', testament: 'NT', summary: 'Paul prays that their love may abound in knowledge and discernment.' },
];

const TYPE_COLORS: Record<string, string> = {
  petition: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  praise: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
  confession: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  intercession: 'bg-green-500/20 text-green-300 border-green-500/30',
  thanksgiving: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  lament: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const TYPE_ICONS: Record<string, string> = {
  petition: '\u{1F64F}',
  praise: '\u{1F3B6}',
  confession: '\u{1F494}',
  intercession: '\u{1F91D}',
  thanksgiving: '\u{1F64C}',
  lament: '\u{1F622}',
};

export default function PrayersPage() {
  const otPrayers = PRAYERS.filter(p => p.testament === 'OT');
  const ntPrayers = PRAYERS.filter(p => p.testament === 'NT');

  const types = [...new Set(PRAYERS.map(p => p.type))];
  const typeCounts = types.map(t => ({ name: t, count: PRAYERS.filter(p => p.type === t).length }));

  const persons = [...new Set(PRAYERS.map(p => p.person))];
  const personCounts = persons.map(p => ({ name: p, count: PRAYERS.filter(pr => pr.person === p).length })).sort((a, b) => b.count - a.count);

  const renderPrayer = (p: Prayer, idx: number) => (
    <Link
      key={idx}
      href={`/reader/${p.book}/${p.chapter}#v${p.verse}`}
      className="block bg-parchment-900 border border-parchment-700 rounded-xl p-4 hover:border-gold-500/40 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-serif font-semibold text-parchment-100 group-hover:text-gold-400 transition-colors">
          {TYPE_ICONS[p.type]} {p.title}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full border whitespace-nowrap ${TYPE_COLORS[p.type]}`}>
          {p.type}
        </span>
      </div>
      <p className="text-sm text-parchment-400 italic mb-2">{p.summary}</p>
      <div className="flex items-center gap-3 text-xs text-parchment-500">
        <span className="text-gold-500 font-medium">{p.reference}</span>
        <span>{'\u2022'}</span>
        <span>{p.person}</span>
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
          <span className="text-gold-400">Prayers</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">{'\u{1F64F}'} Prayers of the Bible</h1>
        <p className="text-parchment-400 mb-8">
          {PRAYERS.length} notable prayers — petitions, praises, confessions, and intercessions from across Scripture.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {typeCounts.map(t => (
            <div key={t.name} className={`rounded-xl border p-3 text-center ${TYPE_COLORS[t.name]}`}>
              <div className="text-xl font-bold">{t.count}</div>
              <div className="text-xs capitalize">{TYPE_ICONS[t.name]} {t.name}</div>
            </div>
          ))}
        </div>

        <div className="bg-parchment-900 border border-parchment-700 rounded-xl p-5 mb-8">
          <h2 className="text-lg font-serif text-parchment-100 mb-3">By Person</h2>
          <div className="flex flex-wrap gap-3">
            {personCounts.map(p => (
              <div key={p.name} className="bg-parchment-800 rounded-lg px-4 py-2 text-sm">
                <span className="text-gold-400 font-semibold">{p.name}</span>
                <span className="text-parchment-500 ml-2">({p.count})</span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-serif text-parchment-100 mb-4">{'\u{1F4DC}'} Old Testament ({otPrayers.length})</h2>
        <div className="grid gap-3 mb-10">
          {otPrayers.map((p, i) => renderPrayer(p, i))}
        </div>

        <h2 className="text-2xl font-serif text-parchment-100 mb-4">{'\u271D\uFE0F'} New Testament ({ntPrayers.length})</h2>
        <div className="grid gap-3 mb-10">
          {ntPrayers.map((p, i) => renderPrayer(p, i + 100))}
        </div>
      </main>
    </>
  );
}
