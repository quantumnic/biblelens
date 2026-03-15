import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

const COMMANDMENTS = [
  {
    number: 1,
    title: 'No Other Gods',
    text: 'Thou shalt have no other gods before me.',
    reference: 'Exodus 20:3',
    book: 2, chapter: 20, verse: 3,
    hebrewKey: 'elohim (אֱלֹהִים)',
    ntParallel: { ref: 'Matthew 4:10', book: 40, chapter: 4, verse: 10, text: 'Thou shalt worship the Lord thy God, and him only shalt thou serve.' },
    theme: 'Monotheism & Exclusive Devotion',
    explanation: 'The foundational command establishing YHWH as the sole deity worthy of worship. This set Israel apart from polytheistic neighbors.',
  },
  {
    number: 2,
    title: 'No Graven Images',
    text: 'Thou shalt not make unto thee any graven image.',
    reference: 'Exodus 20:4–6',
    book: 2, chapter: 20, verse: 4,
    hebrewKey: 'pesel (פֶּסֶל)',
    ntParallel: { ref: '1 John 5:21', book: 62, chapter: 5, verse: 21, text: 'Little children, keep yourselves from idols.' },
    theme: 'Spiritual Purity & Worship',
    explanation: 'Prohibits representing God in any physical form, protecting the transcendence and invisibility of the divine nature.',
  },
  {
    number: 3,
    title: "Do Not Take God's Name in Vain",
    text: 'Thou shalt not take the name of the LORD thy God in vain.',
    reference: 'Exodus 20:7',
    book: 2, chapter: 20, verse: 7,
    hebrewKey: 'shav (שָׁוְא)',
    ntParallel: { ref: 'Matthew 5:34', book: 40, chapter: 5, verse: 34, text: "Swear not at all; neither by heaven; for it is God's throne." },
    theme: 'Reverence & Integrity',
    explanation: "Guards the sanctity of God's name. 'Vain' (shav) means emptiness or falsehood — don't invoke God's name deceitfully.",
  },
  {
    number: 4,
    title: 'Remember the Sabbath',
    text: 'Remember the sabbath day, to keep it holy.',
    reference: 'Exodus 20:8–11',
    book: 2, chapter: 20, verse: 8,
    hebrewKey: 'shabbath (שַׁבָּת)',
    ntParallel: { ref: 'Mark 2:27', book: 41, chapter: 2, verse: 27, text: 'The sabbath was made for man, and not man for the sabbath.' },
    theme: 'Rest & Sacred Time',
    explanation: 'Grounded in creation theology — God rested on the seventh day. It provides rhythm, rest, and remembrance of liberation from Egypt.',
  },
  {
    number: 5,
    title: 'Honor Father and Mother',
    text: 'Honour thy father and thy mother.',
    reference: 'Exodus 20:12',
    book: 2, chapter: 20, verse: 12,
    hebrewKey: 'kabed (כָּבֵד)',
    ntParallel: { ref: 'Ephesians 6:2', book: 49, chapter: 6, verse: 2, text: 'Honour thy father and mother; which is the first commandment with promise.' },
    theme: 'Family & Social Order',
    explanation: "The bridge commandment between duties to God and to neighbor. 'Honor' (kabed) carries the weight of glory — treat parents as weighty, important.",
  },
  {
    number: 6,
    title: 'Do Not Murder',
    text: 'Thou shalt not kill.',
    reference: 'Exodus 20:13',
    book: 2, chapter: 20, verse: 13,
    hebrewKey: 'ratsach (רָצַח)',
    ntParallel: { ref: 'Matthew 5:21–22', book: 40, chapter: 5, verse: 21, text: 'Whosoever is angry with his brother without a cause shall be in danger of the judgment.' },
    theme: 'Sanctity of Life',
    explanation: 'The Hebrew ratsach specifically means unlawful killing (murder), not all taking of life. Jesus extends it to anger and hatred of heart.',
  },
  {
    number: 7,
    title: 'Do Not Commit Adultery',
    text: 'Thou shalt not commit adultery.',
    reference: 'Exodus 20:14',
    book: 2, chapter: 20, verse: 14,
    hebrewKey: "naaph (נָאַף)",
    ntParallel: { ref: 'Matthew 5:28', book: 40, chapter: 5, verse: 28, text: 'Whosoever looketh on a woman to lust after her hath committed adultery already in his heart.' },
    theme: 'Covenant Faithfulness',
    explanation: "Protects the marriage covenant, which Scripture uses as a metaphor for God's relationship with His people.",
  },
  {
    number: 8,
    title: 'Do Not Steal',
    text: 'Thou shalt not steal.',
    reference: 'Exodus 20:15',
    book: 2, chapter: 20, verse: 15,
    hebrewKey: 'ganab (גָּנַב)',
    ntParallel: { ref: 'Ephesians 4:28', book: 49, chapter: 4, verse: 28, text: 'Let him that stole steal no more: but rather let him labour.' },
    theme: 'Justice & Property',
    explanation: 'Upholds the right to property and personal dignity. The broader principle encompasses fraud, exploitation, and dishonest dealings.',
  },
  {
    number: 9,
    title: 'Do Not Bear False Witness',
    text: 'Thou shalt not bear false witness against thy neighbour.',
    reference: 'Exodus 20:16',
    book: 2, chapter: 20, verse: 16,
    hebrewKey: 'sheqer (שֶׁקֶר)',
    ntParallel: { ref: 'Colossians 3:9', book: 51, chapter: 3, verse: 9, text: 'Lie not one to another, seeing that ye have put off the old man.' },
    theme: 'Truth & Community Trust',
    explanation: "Originally a courtroom term — don't give false testimony. Expanded to encompass all forms of deception and slander.",
  },
  {
    number: 10,
    title: 'Do Not Covet',
    text: "Thou shalt not covet thy neighbour's house... nor any thing that is thy neighbour's.",
    reference: 'Exodus 20:17',
    book: 2, chapter: 20, verse: 17,
    hebrewKey: 'chamad (חָמַד)',
    ntParallel: { ref: 'Luke 12:15', book: 42, chapter: 12, verse: 15, text: "Take heed, and beware of covetousness: for a man's life consisteth not in the abundance of the things which he possesseth." },
    theme: 'Contentment & Inner Life',
    explanation: 'The only commandment addressing internal desire rather than external action. Coveting is the root from which other sins grow.',
  },
];

export default function TenCommandmentsPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">⛰️ The Ten Commandments</h1>
        <p className="text-parchment-400 mb-6">The Decalogue — God&apos;s covenant law given at Sinai (Exodus 20:1–17), with Hebrew roots and NT fulfillment.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
          <Link href="/reader/exodus/20#v1" className="p-3 bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 rounded-xl transition-all text-center">
            <span className="text-sm text-gold-400 font-semibold">📜 Exodus 20:1–17</span>
            <p className="text-xs text-parchment-500">Original giving at Sinai</p>
          </Link>
          <Link href="/reader/deuteronomy/5#v6" className="p-3 bg-parchment-900 border border-parchment-800 hover:border-gold-500/30 rounded-xl transition-all text-center">
            <span className="text-sm text-gold-400 font-semibold">📜 Deuteronomy 5:6–21</span>
            <p className="text-xs text-parchment-500">Moses&apos;s restatement</p>
          </Link>
        </div>

        <div className="space-y-4">
          {COMMANDMENTS.map((cmd) => (
            <div key={cmd.number} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-600/20 flex items-center justify-center text-gold-400 font-bold text-lg flex-shrink-0">
                  {cmd.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h2 className="text-lg font-semibold text-parchment-100">{cmd.title}</h2>
                    <span className="text-xs px-2 py-0.5 bg-parchment-800 text-parchment-400 rounded-full">{cmd.theme}</span>
                  </div>
                  <blockquote className="text-parchment-300 italic border-l-2 border-gold-500/30 pl-3 mb-2">
                    &ldquo;{cmd.text}&rdquo;
                  </blockquote>
                  <div className="flex flex-wrap gap-3 text-xs mb-2">
                    <Link href={`/reader/exodus/${cmd.chapter}#v${cmd.verse}`} className="text-gold-400 hover:text-gold-300">
                      📖 {cmd.reference}
                    </Link>
                    <span className="text-parchment-500">Hebrew: <span className="text-parchment-300">{cmd.hebrewKey}</span></span>
                  </div>
                  <p className="text-sm text-parchment-400 mb-2">{cmd.explanation}</p>
                  <div className="bg-parchment-800/50 rounded-lg p-3">
                    <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">NT Parallel</p>
                    <p className="text-sm text-parchment-300">
                      <span className="text-gold-400">{cmd.ntParallel.ref}</span> — &ldquo;{cmd.ntParallel.text}&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-8 bg-parchment-900 border border-parchment-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-parchment-200 mb-3 font-serif">📚 Structure &amp; Theology</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-parchment-400">
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">First Tablet (1–4)</h3>
              <p>Duties toward God — establishing exclusive worship, reverence, and sacred time. These form the vertical dimension of covenant relationship.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Second Tablet (5–10)</h3>
              <p>Duties toward neighbor — protecting life, marriage, property, truth, and contentment. These form the horizontal dimension of community ethics.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Jesus&apos;s Summary</h3>
              <p>&ldquo;Love the Lord thy God with all thy heart&rdquo; (Tablet 1) and &ldquo;Love thy neighbour as thyself&rdquo; (Tablet 2) — Matthew 22:37–39.</p>
            </div>
            <div>
              <h3 className="text-gold-400 font-semibold mb-1">Progressive Deepening</h3>
              <p>From external action (#6 murder) to internal desire (#10 covetousness) — the law addresses not just behavior but the heart.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
