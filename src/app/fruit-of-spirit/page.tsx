import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const FRUITS = [
  {
    name: 'Love',
    greek: 'ἀγάπη (agapē)',
    strongsId: 'G26',
    definition: 'Unconditional, sacrificial love — the highest form, choosing the good of others regardless of merit.',
    verse: 'And now abideth faith, hope, charity, these three; but the greatest of these is charity.',
    verseRef: '1 Corinthians 13:13',
    bookSlug: '1-corinthians', chapter: 13, verseNum: 13,
    otRoot: 'chesed (חֶסֶד) — lovingkindness, covenant love (H2617)',
    practicalNote: 'Agapē is not a feeling but a decision — to will the good of another. It is the root from which all other fruits grow.',
    emoji: '❤️',
    color: 'bg-red-500/20 text-red-400',
  },
  {
    name: 'Joy',
    greek: 'χαρά (chara)',
    strongsId: 'G5479',
    definition: 'Deep, abiding gladness rooted in God — not dependent on circumstances.',
    verse: 'These things have I spoken unto you, that my joy might remain in you, and that your joy might be full.',
    verseRef: 'John 15:11',
    bookSlug: 'john', chapter: 15, verseNum: 11,
    otRoot: 'simchah (שִׂמְחָה) — gladness, mirth (H8057)',
    practicalNote: 'Biblical joy is paradoxical — it coexists with suffering (James 1:2). It is a fruit of relationship with God, not of good fortune.',
    emoji: '😊',
    color: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    name: 'Peace',
    greek: 'εἰρήνη (eirēnē)',
    strongsId: 'G1515',
    definition: 'Wholeness, harmony, tranquility — reconciliation with God and inner calm.',
    verse: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you.',
    verseRef: 'John 14:27',
    bookSlug: 'john', chapter: 14, verseNum: 27,
    otRoot: 'shalom (שָׁלוֹם) — completeness, welfare, peace (H7965)',
    practicalNote: 'Eirēnē encompasses the Hebrew shalom — not mere absence of conflict but total well-being and right-relationship.',
    emoji: '☮️',
    color: 'bg-blue-500/20 text-blue-400',
  },
  {
    name: 'Longsuffering',
    greek: 'μακροθυμία (makrothymia)',
    strongsId: 'G3115',
    definition: 'Patience, endurance, slow to anger — bearing with others over a long period.',
    verse: 'The Lord is not slack concerning his promise... but is longsuffering to us-ward.',
    verseRef: '2 Peter 3:9',
    bookSlug: '2-peter', chapter: 3, verseNum: 9,
    otRoot: "erek appayim (אֶרֶךְ אַפַּיִם) — slow to anger, lit. 'long of nostrils'",
    practicalNote: "Literally 'long-tempered' — the opposite of quick-tempered. It is God's own attribute (Exodus 34:6), now produced in believers.",
    emoji: '⏳',
    color: 'bg-amber-500/20 text-amber-400',
  },
  {
    name: 'Gentleness',
    greek: 'χρηστότης (chrēstotēs)',
    strongsId: 'G5544',
    definition: 'Kindness, goodness, generosity — moral excellence expressed in action toward others.',
    verse: 'Or despisest thou the riches of his goodness and forbearance and longsuffering?',
    verseRef: 'Romans 2:4',
    bookSlug: 'romans', chapter: 2, verseNum: 4,
    otRoot: 'tov (טוֹב) — good, pleasant, agreeable (H2896)',
    practicalNote: "Chrēstotēs is kindness in action — not passive niceness but active goodness. It is God's kindness that leads to repentance.",
    emoji: '🤝',
    color: 'bg-green-500/20 text-green-400',
  },
  {
    name: 'Goodness',
    greek: 'ἀγαθωσύνη (agathōsynē)',
    strongsId: 'G19',
    definition: 'Uprightness, moral excellence — goodness with backbone, sometimes confrontational.',
    verse: 'For the fruit of the Spirit is in all goodness and righteousness and truth.',
    verseRef: 'Ephesians 5:9',
    bookSlug: 'ephesians', chapter: 5, verseNum: 9,
    otRoot: 'tsedaqah (צְדָקָה) — righteousness, justice (H6666)',
    practicalNote: "While chrēstotēs is gentle kindness, agathōsynē has a sterner edge — Jesus cleansing the temple was goodness in action.",
    emoji: '✨',
    color: 'bg-emerald-500/20 text-emerald-400',
  },
  {
    name: 'Faith',
    greek: 'πίστις (pistis)',
    strongsId: 'G4102',
    definition: 'Faithfulness, fidelity, trustworthiness — reliable character flowing from trust in God.',
    verse: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    verseRef: 'Hebrews 11:1',
    bookSlug: 'hebrews', chapter: 11, verseNum: 1,
    otRoot: 'emunah (אֱמוּנָה) — faithfulness, firmness, steadiness (H530)',
    practicalNote: 'As a fruit of the Spirit, pistis emphasizes faithfulness (reliability) more than initial belief — being someone others can count on.',
    emoji: '🙏',
    color: 'bg-indigo-500/20 text-indigo-400',
  },
  {
    name: 'Meekness',
    greek: 'πραΰτης (prautēs)',
    strongsId: 'G4240',
    definition: 'Gentleness, humility, mildness — power under control, strength restrained.',
    verse: 'Blessed are the meek: for they shall inherit the earth.',
    verseRef: 'Matthew 5:5',
    bookSlug: 'matthew', chapter: 5, verseNum: 5,
    otRoot: 'anavah (עֲנָוָה) — humility, meekness (H6038)',
    practicalNote: "Meekness is not weakness. The Greek was used for a wild horse that has been tamed — immense strength under the rider's control.",
    emoji: '🕊️',
    color: 'bg-sky-500/20 text-sky-400',
  },
  {
    name: 'Temperance',
    greek: 'ἐγκράτεια (enkrateia)',
    strongsId: 'G1466',
    definition: 'Self-control, mastery over desires — the ability to govern oneself.',
    verse: 'And every man that striveth for the mastery is temperate in all things.',
    verseRef: '1 Corinthians 9:25',
    bookSlug: '1-corinthians', chapter: 9, verseNum: 25,
    otRoot: "moshel (מוֹשֵׁל) — to rule, have dominion (H4910, cf. Prov 16:32)",
    practicalNote: "Enkrateia comes from 'en' (in) + 'kratos' (power/strength). It bookends the list: love initiates, self-control sustains.",
    emoji: '⚖️',
    color: 'bg-purple-500/20 text-purple-400',
  },
];

export default function FruitOfSpiritPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🍇 Fruit of the Spirit</h1>
        <p className="text-parchment-400 mb-2">
          The nine-fold fruit produced by the Holy Spirit in believers (Galatians 5:22–23), with Greek/Hebrew roots and practical theology.
        </p>
        <Link href="/reader/galatians/5#v22" className="inline-block text-sm text-gold-400 hover:text-gold-300 mb-6">
          📖 Read Galatians 5:22–23 →
        </Link>

        <div className="bg-parchment-900 border border-gold-500/20 rounded-xl p-4 mb-6">
          <blockquote className="text-parchment-200 italic text-center font-serif">
            &ldquo;But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law.&rdquo;
          </blockquote>
          <p className="text-xs text-gold-400 text-center mt-2">— Galatians 5:22–23 (KJV)</p>
        </div>

        <div className="space-y-4">
          {FRUITS.map((fruit, i) => (
            <div key={fruit.name} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${fruit.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                  {fruit.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-lg font-semibold text-parchment-100">{i + 1}. {fruit.name}</h2>
                    <Link href={`/word/${fruit.strongsId}`} className="text-xs px-2 py-0.5 bg-parchment-800 text-gold-400 rounded-full hover:bg-parchment-700">
                      {fruit.strongsId}
                    </Link>
                  </div>
                  <p className="text-sm text-parchment-400 mb-1"><span className="text-parchment-300">{fruit.greek}</span> — {fruit.definition}</p>
                  
                  <blockquote className="text-parchment-300 italic border-l-2 border-gold-500/30 pl-3 my-2 text-sm">
                    &ldquo;{fruit.verse}&rdquo;
                    <Link href={`/reader/${fruit.bookSlug}/${fruit.chapter}#v${fruit.verseNum}`} className="block text-xs text-gold-400 mt-1 not-italic">
                      — {fruit.verseRef}
                    </Link>
                  </blockquote>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mt-2">
                    <div className="bg-parchment-800/50 rounded-lg p-2">
                      <span className="text-gold-500 uppercase tracking-wider">OT Root:</span>
                      <p className="text-parchment-300 mt-0.5">{fruit.otRoot}</p>
                    </div>
                    <div className="bg-parchment-800/50 rounded-lg p-2">
                      <span className="text-gold-500 uppercase tracking-wider">Insight:</span>
                      <p className="text-parchment-300 mt-0.5">{fruit.practicalNote}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-8 bg-parchment-900 border border-parchment-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-parchment-200 mb-3 font-serif">📚 Theological Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-parchment-400">
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Singular &ldquo;Fruit&rdquo;</h3>
              <p>Paul uses the singular &ldquo;fruit&rdquo; (karpos), not &ldquo;fruits.&rdquo; These nine qualities are one unified harvest — you cannot pick and choose. A Spirit-filled life produces all of them.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Contrast: Works of the Flesh</h3>
              <p>Galatians 5:19–21 lists the &ldquo;works of the flesh&rdquo; — plural, fragmented, chaotic. The fruit is singular, unified, beautiful. Flesh produces scattered works; the Spirit produces integrated character.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Triadic Structure</h3>
              <p>Some scholars see three triads: (1) Love, Joy, Peace — God-ward; (2) Longsuffering, Gentleness, Goodness — other-ward; (3) Faith, Meekness, Temperance — self-ward.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">&ldquo;Against Such There Is No Law&rdquo;</h3>
              <p>Paul&apos;s wry conclusion — no law has ever been written against love, joy, or peace. The fruit of the Spirit transcends and fulfills the law naturally.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
