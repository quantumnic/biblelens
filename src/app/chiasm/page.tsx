import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { isDatabaseAvailable } from '@/lib/db';
import { getBookById } from '@/lib/bible-books';

export const dynamic = 'force-dynamic';

const CHIASTIC_STRUCTURES = [
  {
    title: 'Genesis 1:1-2:3 — Creation Week',
    reference: 'Gen 1:1-2:3',
    book: 1, chapter: 1,
    description: 'The creation narrative follows an A-B-C-C\u2019-B\u2019-A\u2019 pattern matching days 1-3 with days 4-6.',
    layers: [
      { label: 'A', text: 'Day 1 — Light separated from darkness', ref: '1:3-5' },
      { label: 'B', text: 'Day 2 — Waters above / waters below', ref: '1:6-8' },
      { label: 'C', text: 'Day 3 — Dry land, vegetation', ref: '1:9-13' },
      { label: "C\u2019", text: 'Day 4 — Sun, moon, stars (fill the sky)', ref: '1:14-19' },
      { label: "B\u2019", text: 'Day 5 — Sea creatures, birds (fill waters/sky)', ref: '1:20-23' },
      { label: "A\u2019", text: 'Day 6 — Land animals, humanity (fill the land)', ref: '1:24-31' },
    ],
    center: "Day 7 — Sabbath rest, God\u2019s blessing and sanctification (2:1-3)",
  },
  {
    title: 'Genesis 6-9 — The Flood Narrative',
    reference: 'Gen 6:10-9:19',
    book: 1, chapter: 6,
    description: "The flood story is structured as one of the Bible\u2019s most recognized chiasms (Wenham, 1978).",
    layers: [
      { label: 'A', text: "Noah\u2019s sons (6:10)", ref: '6:10' },
      { label: 'B', text: 'All flesh corrupted (6:11-12)', ref: '6:11-12' },
      { label: 'C', text: 'Ark instructions (6:14-22)', ref: '6:14-22' },
      { label: 'D', text: 'Enter the ark (7:1-9)', ref: '7:1-9' },
      { label: 'E', text: '7 days waiting (7:10)', ref: '7:10' },
      { label: 'F', text: 'Flood waters rise (7:11-24)', ref: '7:11-24' },
      { label: 'X', text: '\u2605 God remembers Noah (8:1a) \u2605', ref: '8:1' },
      { label: "F\u2019", text: 'Flood waters recede (8:1b-5)', ref: '8:1-5' },
      { label: "E\u2019", text: '7 days waiting (8:10,12)', ref: '8:10-12' },
      { label: "D\u2019", text: 'Exit the ark (8:15-19)', ref: '8:15-19' },
      { label: "C\u2019", text: 'Covenant terms (9:1-7)', ref: '9:1-7' },
      { label: "B\u2019", text: 'Covenant with all flesh (9:8-17)', ref: '9:8-17' },
      { label: "A\u2019", text: "Noah\u2019s sons (9:18-19)", ref: '9:18-19' },
    ],
    center: 'God remembers Noah — the theological pivot of the entire flood narrative',
  },
  {
    title: 'Psalm 67 — Missionary Psalm',
    reference: 'Psalm 67',
    book: 19, chapter: 67,
    description: "A perfect 7-verse chiasm centered on God\u2019s rule over the nations.",
    layers: [
      { label: 'A', text: 'God be gracious, bless us (v.1)', ref: '67:1' },
      { label: 'B', text: 'That your way may be known (v.2)', ref: '67:2' },
      { label: 'C', text: 'Let the peoples praise you (v.3)', ref: '67:3' },
      { label: 'X', text: '\u2605 Let the nations be glad — God judges with equity (v.4) \u2605', ref: '67:4' },
      { label: "C\u2019", text: 'Let the peoples praise you (v.5)', ref: '67:5' },
      { label: "B\u2019", text: 'The earth has yielded its produce (v.6)', ref: '67:6' },
      { label: "A\u2019", text: 'God blesses us, all the ends of the earth fear him (v.7)', ref: '67:7' },
    ],
    center: "God judges the peoples with equity — central theme of the psalm",
  },
  {
    title: "John 1:1-18 — The Prologue",
    reference: 'John 1:1-18',
    book: 43, chapter: 1,
    description: "The Fourth Gospel\u2019s prologue is widely recognized as a literary chiasm (Culpepper, 1981).",
    layers: [
      { label: 'A', text: 'The Word with God (v.1-2)', ref: '1:1-2' },
      { label: 'B', text: 'Role in creation (v.3)', ref: '1:3' },
      { label: 'C', text: 'Gift to humanity: life/light (v.4-5)', ref: '1:4-5' },
      { label: 'D', text: "John\u2019s witness (v.6-8)", ref: '1:6-8' },
      { label: 'E', text: 'The true light entering the world (v.9-10)', ref: '1:9-10' },
      { label: 'X', text: '\u2605 To those who received him — children of God (v.12-13) \u2605', ref: '1:12-13' },
      { label: "E\u2019", text: 'The Word became flesh (v.14)', ref: '1:14' },
      { label: "D\u2019", text: "John\u2019s witness (v.15)", ref: '1:15' },
      { label: "C\u2019", text: 'Gift to humanity: grace (v.16)', ref: '1:16' },
      { label: "B\u2019", text: 'Grace and truth through Christ (v.17)', ref: '1:17' },
      { label: "A\u2019", text: 'The Son who reveals the Father (v.18)', ref: '1:18' },
    ],
    center: "Receiving the Word and becoming children of God — the invitation at the heart of John\u2019s Gospel",
  },
  {
    title: "Romans 5-8 — Salvation\u2019s Architecture",
    reference: 'Rom 5-8',
    book: 45, chapter: 5,
    description: "Paul\u2019s argument in Romans 5-8 follows a grand chiastic structure (Longenecker, 2016).",
    layers: [
      { label: 'A', text: 'Peace with God through justification (5:1-11)', ref: '5:1-11' },
      { label: 'B', text: 'Adam and Christ — death and life (5:12-21)', ref: '5:12-21' },
      { label: 'C', text: 'Dead to sin, alive to God (6:1-14)', ref: '6:1-14' },
      { label: 'X', text: '\u2605 Slaves of righteousness (6:15-23) \u2605', ref: '6:15-23' },
      { label: "C\u2019", text: 'Released from the law (7:1-6)', ref: '7:1-6' },
      { label: "B\u2019", text: 'The struggle of flesh vs Spirit (7:7-25)', ref: '7:7-25' },
      { label: "A\u2019", text: 'No condemnation — nothing separates us (8:1-39)', ref: '8:1-39' },
    ],
    center: 'Whose servant are you? The decisive pivot between the old and new life',
  },
];

export default function ChiasmPage() {
  const dbAvailable = isDatabaseAvailable();

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Chiastic Structures</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">{'\ud83d\udd04'} Chiastic Structures</h1>
          <p className="text-parchment-400 max-w-2xl">
            A chiasm (or chiasmus) is a literary device where ideas are presented in an A-B-C...C&apos;-B&apos;-A&apos;
            pattern, with the most important idea at the center. This &quot;X&quot; pattern is pervasive in
            Hebrew and Greek biblical literature.
          </p>
        </div>

        <div className="space-y-8">
          {CHIASTIC_STRUCTURES.map((ch, idx) => (
            <div key={idx} className="bg-parchment-900 border border-parchment-800 rounded-2xl p-6 hover:border-gold-500/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-parchment-100">{ch.title}</h2>
                  <p className="text-sm text-parchment-400 mt-1">{ch.description}</p>
                </div>
                {dbAvailable && (
                  <Link
                    href={`/reader/${getBookById(ch.book)?.name.toLowerCase().replace(/ /g, '-')}/${ch.chapter}`}
                    className="text-xs px-3 py-1.5 bg-gold-600/20 text-gold-400 rounded-lg hover:bg-gold-600/30 transition-colors flex-shrink-0"
                  >
                    {'\ud83d\udcd6'} Read
                  </Link>
                )}
              </div>

              <div className="space-y-1 my-4">
                {ch.layers.map((layer, li) => {
                  const isCenter = layer.label === 'X';
                  const depth = isCenter ? 0 : Math.min(li, ch.layers.length - 1 - li);
                  const indent = depth * 24;
                  return (
                    <div
                      key={li}
                      className={`flex items-start gap-3 py-1.5 px-3 rounded-lg transition-colors ${
                        isCenter
                          ? 'bg-gold-600/20 border border-gold-500/30'
                          : 'hover:bg-parchment-800/50'
                      }`}
                      style={{ marginLeft: `${indent}px` }}
                    >
                      <span className={`font-mono text-xs min-w-[2rem] text-right mt-0.5 ${
                        isCenter ? 'text-gold-400 font-bold' : 'text-parchment-500'
                      }`}>
                        {layer.label}
                      </span>
                      <span className={`text-sm flex-1 ${
                        isCenter ? 'text-gold-300 font-semibold' : 'text-parchment-200'
                      }`}>
                        {layer.text}
                      </span>
                      <span className="text-xs text-parchment-600 font-mono flex-shrink-0">
                        {layer.ref}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-parchment-800">
                <p className="text-xs text-gold-500 uppercase tracking-wider mb-1">Center / Pivot</p>
                <p className="text-sm text-parchment-300 italic">{ch.center}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-parchment-900/50 border border-parchment-800 rounded-xl p-6">
          <h3 className="text-lg font-serif font-semibold text-parchment-200 mb-2">{'\ud83d\udcda'} About Chiastic Analysis</h3>
          <div className="text-sm text-parchment-400 space-y-2">
            <p>
              Chiastic structures (from the Greek letter {'\u03c7'} — &quot;chi&quot;) are a hallmark of ancient Semitic
              and Greco-Roman rhetoric. The central element (the &quot;pivot&quot;) typically carries the
              author&apos;s main theological point.
            </p>
            <p>
              Key scholars: Nils Lund (1942) pioneered chiastic analysis; Gordon Wenham applied it to
              the flood narrative; Mary Douglas explored it across Leviticus and Numbers. John Breck&apos;s
              <em> The Shape of Biblical Language</em> (1994) remains a standard reference.
            </p>
            <p className="text-parchment-500 text-xs">
              Note: Not all proposed chiasms are equally convincing. Look for clear verbal and thematic
              parallels between matching layers, and a theologically significant center.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
