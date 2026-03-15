import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb, isDatabaseAvailable } from '@/lib/db';

export const dynamic = 'force-dynamic';

interface PrayerLine {
  verseRef: string;
  chapter: number;
  verse: number;
  text: string;
  petition: string;
  hebrewRoot: string;
  greekWord: string;
  greekTranslit: string;
  strongsId: string;
  theology: string;
}

const PRAYER_LINES: PrayerLine[] = [
  {
    verseRef: 'Matthew 6:9b',
    chapter: 6, verse: 9,
    text: 'Our Father which art in heaven, Hallowed be thy name.',
    petition: 'Adoration',
    hebrewRoot: 'אָב (ab) — father',
    greekWord: 'Πάτερ (Patēr)',
    greekTranslit: 'patēr',
    strongsId: 'G3962',
    theology: 'Jesus teaches intimacy with God as Father (Abba) — revolutionary in Jewish prayer. "Hallowed" (hagiazō, G37) means to set apart as sacred. The prayer begins not with our needs but with God\'s holiness.',
  },
  {
    verseRef: 'Matthew 6:10a',
    chapter: 6, verse: 10,
    text: 'Thy kingdom come.',
    petition: 'Kingdom',
    hebrewRoot: 'מַלְכוּת (malkuth) — royal rule',
    greekWord: 'βασιλεία (basileia)',
    greekTranslit: 'basileia',
    strongsId: 'G932',
    theology: 'The already/not-yet tension of the kingdom — present in Christ\'s ministry, fully realized at His return. This is the central theme of Jesus\'s teaching.',
  },
  {
    verseRef: 'Matthew 6:10b',
    chapter: 6, verse: 10,
    text: 'Thy will be done in earth, as it is in heaven.',
    petition: 'Submission',
    hebrewRoot: 'רָצוֹן (ratson) — will, pleasure, delight',
    greekWord: 'θέλημα (thelēma)',
    greekTranslit: 'thelēma',
    strongsId: 'G2307',
    theology: 'Aligning human will with divine purpose. Jesus models this in Gethsemane (Matt 26:42). Heaven is the template for earth — the prayer is for cosmic alignment.',
  },
  {
    verseRef: 'Matthew 6:11',
    chapter: 6, verse: 11,
    text: 'Give us this day our daily bread.',
    petition: 'Provision',
    hebrewRoot: 'לֶחֶם (lechem) — bread, food',
    greekWord: 'ἐπιούσιος (epiousios)',
    greekTranslit: 'epiousios',
    strongsId: 'G1967',
    theology: 'Epiousios appears only here in all of Greek literature — a word coined or chosen by Jesus. It may mean "for the coming day" or "supersubstantial" (Jerome). Echoes the daily manna of Exodus 16.',
  },
  {
    verseRef: 'Matthew 6:12',
    chapter: 6, verse: 12,
    text: 'And forgive us our debts, as we forgive our debtors.',
    petition: 'Forgiveness',
    hebrewRoot: 'נָשָׂא (nasa) — to lift, carry, forgive',
    greekWord: 'ἄφες (aphes)',
    greekTranslit: 'aphiēmi',
    strongsId: 'G863',
    theology: 'The only petition Jesus expands on (vv. 14-15). Forgiveness is relational — our willingness to forgive reflects our understanding of being forgiven. "Debts" (opheilēmata) frames sin as moral obligation.',
  },
  {
    verseRef: 'Matthew 6:13a',
    chapter: 6, verse: 13,
    text: 'And lead us not into temptation, but deliver us from evil.',
    petition: 'Protection',
    hebrewRoot: 'נָצַל (natsal) — to deliver, rescue',
    greekWord: 'πειρασμός (peirasmos)',
    greekTranslit: 'peirasmos',
    strongsId: 'G3986',
    theology: 'Peirasmos means both "temptation" and "trial/testing." The prayer is for protection from trials that overwhelm faith. "Evil" (ponēros) can mean "the evil one" (Satan) — deliverance from cosmic evil.',
  },
  {
    verseRef: 'Matthew 6:13b',
    chapter: 6, verse: 13,
    text: 'For thine is the kingdom, and the power, and the glory, for ever. Amen.',
    petition: 'Doxology',
    hebrewRoot: 'כָּבוֹד (kabod) — glory, weight, honor',
    greekWord: 'δόξα (doxa)',
    greekTranslit: 'doxa',
    strongsId: 'G1391',
    theology: 'This closing doxology (absent in early manuscripts) echoes 1 Chronicles 29:11-13 — David\'s prayer. The prayer ends as it began: focused on God, not self. "Amen" (from Hebrew \'aman) means "surely, truly — so be it."',
  },
];

export default function LordsPrayerPage() {
  if (!isDatabaseAvailable()) {
    return (
      <>
        <Sidebar />
        <main className="flex-1 p-4 lg:p-8 max-w-5xl">
          <p className="text-parchment-400">Database not found. Run <code className="bg-parchment-800 px-2 py-1 rounded text-gold-400">npm run seed</code>.</p>
        </main>
      </>
    );
  }

  const db = getDb();
  const verses = db.prepare(
    "SELECT verse, text FROM verses WHERE book = 40 AND chapter = 6 AND verse BETWEEN 9 AND 13 AND translation = 'KJV' ORDER BY verse"
  ).all() as { verse: number; text: string }[];

  const lukeVerses = db.prepare(
    "SELECT verse, text FROM verses WHERE book = 42 AND chapter = 11 AND verse BETWEEN 2 AND 4 AND translation = 'KJV' ORDER BY verse"
  ).all() as { verse: number; text: string }[];

  const PETITION_COLORS: Record<string, string> = {
    Adoration: 'border-purple-500/40 bg-purple-500/5',
    Kingdom: 'border-blue-500/40 bg-blue-500/5',
    Submission: 'border-teal-500/40 bg-teal-500/5',
    Provision: 'border-amber-500/40 bg-amber-500/5',
    Forgiveness: 'border-rose-500/40 bg-rose-500/5',
    Protection: 'border-red-500/40 bg-red-500/5',
    Doxology: 'border-gold-500/40 bg-gold-500/5',
  };

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <Link href="/" className="text-gold-400 hover:text-gold-300 text-sm">&larr; Home</Link>
        </div>
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🙏 The Lord&apos;s Prayer</h1>
        <p className="text-parchment-400 mb-8 max-w-2xl">
          A deep analysis of the model prayer Jesus taught His disciples (Matthew 6:9-13), examining each petition through its Greek and Hebrew linguistic roots, theological significance, and structural beauty.
        </p>

        {/* Full text side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
            <h3 className="text-sm text-gold-500 uppercase tracking-widest mb-3">Matthew 6:9-13 (KJV)</h3>
            {verses.map(v => (
              <p key={v.verse} className="text-parchment-200 font-serif leading-relaxed mb-1">
                <sup className="text-parchment-500 text-xs mr-1">{v.verse}</sup>{v.text}
              </p>
            ))}
          </div>
          <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-5">
            <h3 className="text-sm text-gold-500 uppercase tracking-widest mb-3">Luke 11:2-4 (KJV)</h3>
            {lukeVerses.length > 0 ? lukeVerses.map(v => (
              <p key={v.verse} className="text-parchment-200 font-serif leading-relaxed mb-1">
                <sup className="text-parchment-500 text-xs mr-1">{v.verse}</sup>{v.text}
              </p>
            )) : (
              <p className="text-parchment-500 italic">Luke&apos;s shorter version — seed database to view.</p>
            )}
            <p className="text-xs text-parchment-500 mt-3 italic">Note: Luke&apos;s version is shorter, omitting &quot;which art in heaven,&quot; the petition about God&apos;s will, and the doxology.</p>
          </div>
        </div>

        {/* Petition-by-petition analysis */}
        <h2 className="text-xl font-semibold text-parchment-200 mb-4 font-serif">📖 Petition-by-Petition Analysis</h2>
        <div className="space-y-4 mb-10">
          {PRAYER_LINES.map((line, i) => (
            <div key={i} className={`border rounded-xl p-5 ${PETITION_COLORS[line.petition] || 'border-parchment-800'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs bg-parchment-800 text-gold-400 px-2 py-0.5 rounded-full font-semibold">{line.petition}</span>
                <span className="text-xs text-parchment-500">{line.verseRef}</span>
              </div>
              <blockquote className="text-lg text-parchment-100 font-serif italic mb-3">
                &ldquo;{line.text}&rdquo;
              </blockquote>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="text-sm">
                  <span className="text-parchment-500 block text-xs mb-0.5">Greek</span>
                  <Link href={`/word/${line.strongsId}`} className="text-gold-400 hover:text-gold-300">
                    {line.greekWord}
                  </Link>
                  <span className="text-parchment-500 text-xs ml-1">({line.strongsId})</span>
                </div>
                <div className="text-sm">
                  <span className="text-parchment-500 block text-xs mb-0.5">Hebrew Root</span>
                  <span className="text-parchment-200">{line.hebrewRoot}</span>
                </div>
                <div className="text-sm">
                  <span className="text-parchment-500 block text-xs mb-0.5">Strong&apos;s</span>
                  <Link href={`/word/${line.strongsId}`} className="text-gold-400 hover:text-gold-300 text-xs">
                    View entry &rarr;
                  </Link>
                </div>
              </div>
              <p className="text-sm text-parchment-300 leading-relaxed">{line.theology}</p>
            </div>
          ))}
        </div>

        {/* Chiastic Structure */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-parchment-200 mb-3 font-serif">🔄 Chiastic Structure</h2>
          <p className="text-sm text-parchment-400 mb-4">Many scholars see a chiastic (mirror) pattern in the Lord&apos;s Prayer:</p>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-purple-400">A &mdash; &quot;Our Father&quot; (relationship with God)</p>
            <p className="text-blue-400 pl-4">B &mdash; &quot;Thy kingdom come&quot; (God&apos;s reign)</p>
            <p className="text-teal-400 pl-8">C &mdash; &quot;Thy will be done&quot; (alignment)</p>
            <p className="text-amber-400 pl-12">D &mdash; &quot;Daily bread&quot; (CENTER: provision)</p>
            <p className="text-teal-400 pl-8">C&apos; &mdash; &quot;Forgive us&quot; (re-alignment)</p>
            <p className="text-blue-400 pl-4">B&apos; &mdash; &quot;Deliver from evil&quot; (God&apos;s protection)</p>
            <p className="text-purple-400">A&apos; &mdash; &quot;Thine is the kingdom&quot; (God&apos;s glory)</p>
          </div>
        </div>

        {/* Cross-references */}
        <div className="bg-parchment-900 border border-parchment-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-parchment-200 mb-3 font-serif">🔗 Key Cross-References</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {[
              { ref: '1 Chronicles 29:11-13', link: '/reader/1-chronicles/29#v11', desc: 'David\'s prayer — source of the doxology' },
              { ref: 'Psalm 103:1-5', link: '/reader/psalms/103#v1', desc: 'Blessing God\'s holy name' },
              { ref: 'Exodus 16:4', link: '/reader/exodus/16#v4', desc: 'Daily manna — "daily bread" typology' },
              { ref: 'Daniel 9:19', link: '/reader/daniel/9#v19', desc: 'Daniel\'s prayer for forgiveness and mercy' },
              { ref: 'Luke 11:1-4', link: '/reader/luke/11#v1', desc: 'Luke\'s shorter parallel version' },
              { ref: 'Matthew 26:39-42', link: '/reader/matthew/26#v39', desc: 'Gethsemane — "Thy will be done"' },
            ].map(cr => (
              <Link key={cr.ref} href={cr.link} className="flex gap-2 p-2 rounded-lg hover:bg-parchment-800 transition-colors">
                <span className="text-gold-400 flex-shrink-0">📖</span>
                <div>
                  <span className="text-parchment-200 font-semibold">{cr.ref}</span>
                  <span className="text-parchment-500 block text-xs">{cr.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
