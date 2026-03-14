import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

interface Prophecy {
  title: string;
  category: string;
  otRef: { book: string; chapter: number; verse: number; text: string };
  ntRef: { book: string; chapter: number; verse: number; text: string };
  status: 'fulfilled' | 'partially' | 'future';
  notes: string;
}

const PROPHECIES: Prophecy[] = [
  {
    title: 'Born of a Virgin',
    category: 'Messianic',
    otRef: { book: 'isaiah', chapter: 7, verse: 14, text: 'Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son...' },
    ntRef: { book: 'matthew', chapter: 1, verse: 23, text: 'Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel...' },
    status: 'fulfilled',
    notes: 'Isaiah prophesied ~700 BC. Matthew identifies Jesus\' birth as the fulfillment.',
  },
  {
    title: 'Born in Bethlehem',
    category: 'Messianic',
    otRef: { book: 'micah', chapter: 5, verse: 2, text: 'But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth...' },
    ntRef: { book: 'matthew', chapter: 2, verse: 1, text: 'Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king...' },
    status: 'fulfilled',
    notes: 'Micah prophesied ~700 BC. Jesus was born in Bethlehem as foretold.',
  },
  {
    title: 'Triumphal Entry on a Donkey',
    category: 'Messianic',
    otRef: { book: 'zechariah', chapter: 9, verse: 9, text: 'Rejoice greatly, O daughter of Zion... thy King cometh unto thee... lowly, and riding upon an ass...' },
    ntRef: { book: 'matthew', chapter: 21, verse: 5, text: 'Tell ye the daughter of Sion, Behold, thy King cometh unto thee, meek, and sitting upon an ass...' },
    status: 'fulfilled',
    notes: 'Zechariah prophesied ~520 BC. Fulfilled at Jesus\' entry into Jerusalem.',
  },
  {
    title: 'Betrayed for Thirty Pieces of Silver',
    category: 'Messianic',
    otRef: { book: 'zechariah', chapter: 11, verse: 12, text: 'So they weighed for my price thirty pieces of silver.' },
    ntRef: { book: 'matthew', chapter: 26, verse: 15, text: 'And said unto them, What will ye give me, and I will deliver him unto you? And they covenanted with him for thirty pieces of silver.' },
    status: 'fulfilled',
    notes: 'The exact price of betrayal was foretold centuries before Judas.',
  },
  {
    title: 'Pierced Hands and Feet',
    category: 'Messianic',
    otRef: { book: 'psalms', chapter: 22, verse: 16, text: 'They pierced my hands and my feet.' },
    ntRef: { book: 'john', chapter: 20, verse: 25, text: 'Except I shall see in his hands the print of the nails...' },
    status: 'fulfilled',
    notes: 'Psalm 22 written ~1000 BC, before crucifixion was invented.',
  },
  {
    title: 'The Suffering Servant',
    category: 'Messianic',
    otRef: { book: 'isaiah', chapter: 53, verse: 5, text: 'But he was wounded for our transgressions, he was bruised for our iniquities...' },
    ntRef: { book: '1-peter', chapter: 2, verse: 24, text: 'Who his own self bare our sins in his own body on the tree...' },
    status: 'fulfilled',
    notes: 'Isaiah 53 is the most detailed messianic prophecy — servant suffering for the sins of many.',
  },
  {
    title: 'Resurrection from the Dead',
    category: 'Messianic',
    otRef: { book: 'psalms', chapter: 16, verse: 10, text: 'For thou wilt not leave my soul in hell; neither wilt thou suffer thine Holy One to see corruption.' },
    ntRef: { book: 'acts', chapter: 2, verse: 31, text: 'He seeing this before spake of the resurrection of Christ, that his soul was not left in hell...' },
    status: 'fulfilled',
    notes: 'David prophesied resurrection. Peter identifies this as fulfilled in Christ at Pentecost.',
  },
  {
    title: 'Destruction of the Temple',
    category: 'Historical',
    otRef: { book: 'daniel', chapter: 9, verse: 26, text: 'And after threescore and two weeks shall Messiah be cut off... and the people of the prince that shall come shall destroy the city and the sanctuary...' },
    ntRef: { book: 'matthew', chapter: 24, verse: 2, text: 'There shall not be left here one stone upon another, that shall not be thrown down.' },
    status: 'fulfilled',
    notes: 'The Temple was destroyed by Rome in 70 AD, as both Daniel and Jesus foretold.',
  },
  {
    title: 'Israel Scattered Among Nations',
    category: 'Historical',
    otRef: { book: 'deuteronomy', chapter: 28, verse: 64, text: 'And the LORD shall scatter thee among all people, from the one end of the earth even unto the other...' },
    ntRef: { book: 'luke', chapter: 21, verse: 24, text: 'And they shall fall by the edge of the sword, and shall be led away captive into all nations...' },
    status: 'fulfilled',
    notes: 'The Jewish diaspora following the Roman conquest fulfilled this warning.',
  },
  {
    title: 'Israel Regathered',
    category: 'Eschatological',
    otRef: { book: 'ezekiel', chapter: 37, verse: 21, text: 'I will take the children of Israel from among the heathen... and will gather them on every side, and bring them into their own land.' },
    ntRef: { book: 'romans', chapter: 11, verse: 26, text: 'And so all Israel shall be saved...' },
    status: 'partially',
    notes: 'Israel was reestablished in 1948. Paul speaks of a future spiritual restoration.',
  },
  {
    title: 'New Heavens and New Earth',
    category: 'Eschatological',
    otRef: { book: 'isaiah', chapter: 65, verse: 17, text: 'For, behold, I create new heavens and a new earth: and the former shall not be remembered...' },
    ntRef: { book: 'revelation', chapter: 21, verse: 1, text: 'And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away...' },
    status: 'future',
    notes: 'Both Isaiah and Revelation describe the ultimate renewal of creation.',
  },
  {
    title: 'The Second Coming',
    category: 'Eschatological',
    otRef: { book: 'daniel', chapter: 7, verse: 13, text: 'I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven...' },
    ntRef: { book: 'matthew', chapter: 24, verse: 30, text: 'And they shall see the Son of man coming in the clouds of heaven with power and great glory.' },
    status: 'future',
    notes: 'Daniel\'s vision of the Son of Man, echoed by Jesus himself in the Olivet Discourse.',
  },
];

const CATEGORIES = ['All', 'Messianic', 'Historical', 'Eschatological'];
const STATUS_LABELS = {
  fulfilled: { label: 'Fulfilled', color: 'text-green-400 bg-green-900/30 border-green-700/30' },
  partially: { label: 'Partially Fulfilled', color: 'text-yellow-400 bg-yellow-900/30 border-yellow-700/30' },
  future: { label: 'Future / Unfulfilled', color: 'text-blue-400 bg-blue-900/30 border-blue-700/30' },
};

export default function PropheciesPage() {
  const fulfilled = PROPHECIES.filter(p => p.status === 'fulfilled').length;
  const partial = PROPHECIES.filter(p => p.status === 'partially').length;
  const future = PROPHECIES.filter(p => p.status === 'future').length;

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🔮 Prophecy Tracker</h1>
        <p className="text-parchment-400 mb-6">Old Testament prophecies and their New Testament fulfillments — trace the prophetic thread through Scripture.</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-green-900/20 border border-green-700/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{fulfilled}</div>
            <div className="text-xs text-green-500">Fulfilled</div>
          </div>
          <div className="bg-yellow-900/20 border border-yellow-700/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{partial}</div>
            <div className="text-xs text-yellow-500">Partially Fulfilled</div>
          </div>
          <div className="bg-blue-900/20 border border-blue-700/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{future}</div>
            <div className="text-xs text-blue-500">Future</div>
          </div>
        </div>

        {/* Prophecy Cards */}
        <div className="space-y-4">
          {PROPHECIES.map((p, i) => {
            const status = STATUS_LABELS[p.status];
            return (
              <div key={i} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-all">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-parchment-100">{p.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-parchment-500 bg-parchment-800 px-2 py-0.5 rounded">{p.category}</span>
                      <span className={`text-xs px-2 py-0.5 rounded border ${status.color}`}>{status.label}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {/* OT Reference */}
                  <div className="bg-parchment-950 rounded-lg p-4 border border-parchment-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">📜 Prophecy (OT)</span>
                    </div>
                    <blockquote className="text-sm text-parchment-300 italic mb-2">&ldquo;{p.otRef.text}&rdquo;</blockquote>
                    <Link
                      href={`/reader/${p.otRef.book}/${p.otRef.chapter}#v${p.otRef.verse}`}
                      className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      → {p.otRef.book.charAt(0).toUpperCase() + p.otRef.book.slice(1).replace(/-/g, ' ')} {p.otRef.chapter}:{p.otRef.verse}
                    </Link>
                  </div>

                  {/* NT Reference */}
                  <div className="bg-parchment-950 rounded-lg p-4 border border-parchment-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">✝️ Fulfillment (NT)</span>
                    </div>
                    <blockquote className="text-sm text-parchment-300 italic mb-2">&ldquo;{p.ntRef.text}&rdquo;</blockquote>
                    <Link
                      href={`/reader/${p.ntRef.book}/${p.ntRef.chapter}#v${p.ntRef.verse}`}
                      className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      → {p.ntRef.book.charAt(0).toUpperCase() + p.ntRef.book.slice(1).replace(/-/g, ' ')} {p.ntRef.chapter}:{p.ntRef.verse}
                    </Link>
                  </div>
                </div>

                <p className="text-xs text-parchment-500 mt-3 leading-relaxed">📝 {p.notes}</p>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
