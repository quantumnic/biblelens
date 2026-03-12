import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const HEBREW_LETTERS = [
  { letter: 'א', name: 'Aleph', translit: 'ʾ', value: 1, meaning: 'Ox, leader' },
  { letter: 'ב', name: 'Bet', translit: 'b/v', value: 2, meaning: 'House, family' },
  { letter: 'ג', name: 'Gimel', translit: 'g', value: 3, meaning: 'Camel, to lift up' },
  { letter: 'ד', name: 'Dalet', translit: 'd', value: 4, meaning: 'Door, pathway' },
  { letter: 'ה', name: 'He', translit: 'h', value: 5, meaning: 'Window, behold' },
  { letter: 'ו', name: 'Vav', translit: 'v/w', value: 6, meaning: 'Hook, nail, and' },
  { letter: 'ז', name: 'Zayin', translit: 'z', value: 7, meaning: 'Weapon, sword' },
  { letter: 'ח', name: 'Chet', translit: 'ch', value: 8, meaning: 'Fence, inner room' },
  { letter: 'ט', name: 'Tet', translit: 't', value: 9, meaning: 'Snake, surround' },
  { letter: 'י', name: 'Yod', translit: 'y', value: 10, meaning: 'Hand, work' },
  { letter: 'כ', name: 'Kaf', translit: 'k/kh', value: 20, meaning: 'Palm, open hand' },
  { letter: 'ל', name: 'Lamed', translit: 'l', value: 30, meaning: 'Staff, goad, teach' },
  { letter: 'מ', name: 'Mem', translit: 'm', value: 40, meaning: 'Water, chaos' },
  { letter: 'נ', name: 'Nun', translit: 'n', value: 50, meaning: 'Fish, activity' },
  { letter: 'ס', name: 'Samekh', translit: 's', value: 60, meaning: 'Support, prop' },
  { letter: 'ע', name: 'Ayin', translit: 'ʿ', value: 70, meaning: 'Eye, see, know' },
  { letter: 'פ', name: 'Pe', translit: 'p/f', value: 80, meaning: 'Mouth, speak' },
  { letter: 'צ', name: 'Tsade', translit: 'ts', value: 90, meaning: 'Hook, righteous' },
  { letter: 'ק', name: 'Qof', translit: 'q', value: 100, meaning: 'Back of head, horizon' },
  { letter: 'ר', name: 'Resh', translit: 'r', value: 200, meaning: 'Head, beginning' },
  { letter: 'שׁ', name: 'Shin', translit: 'sh/s', value: 300, meaning: 'Tooth, fire, press' },
  { letter: 'ת', name: 'Tav', translit: 't', value: 400, meaning: 'Mark, sign, covenant' },
];

const GREEK_LETTERS = [
  { letter: 'Α α', name: 'Alpha', translit: 'a', value: 1, note: '"I am the Alpha and Omega" (Rev 1:8)' },
  { letter: 'Β β', name: 'Beta', translit: 'b', value: 2, note: '' },
  { letter: 'Γ γ', name: 'Gamma', translit: 'g', value: 3, note: '' },
  { letter: 'Δ δ', name: 'Delta', translit: 'd', value: 4, note: '' },
  { letter: 'Ε ε', name: 'Epsilon', translit: 'e (short)', value: 5, note: '' },
  { letter: 'Ζ ζ', name: 'Zeta', translit: 'z', value: 7, note: '' },
  { letter: 'Η η', name: 'Eta', translit: 'ē (long)', value: 8, note: '' },
  { letter: 'Θ θ', name: 'Theta', translit: 'th', value: 9, note: 'θεός (theos) = God' },
  { letter: 'Ι ι', name: 'Iota', translit: 'i', value: 10, note: '"Not one iota" (Matt 5:18)' },
  { letter: 'Κ κ', name: 'Kappa', translit: 'k', value: 20, note: 'κύριος (kyrios) = Lord' },
  { letter: 'Λ λ', name: 'Lambda', translit: 'l', value: 30, note: 'λόγος (logos) = Word' },
  { letter: 'Μ μ', name: 'Mu', translit: 'm', value: 40, note: '' },
  { letter: 'Ν ν', name: 'Nu', translit: 'n', value: 50, note: '' },
  { letter: 'Ξ ξ', name: 'Xi', translit: 'x', value: 60, note: '' },
  { letter: 'Ο ο', name: 'Omicron', translit: 'o (short)', value: 70, note: '' },
  { letter: 'Π π', name: 'Pi', translit: 'p', value: 80, note: 'πίστις (pistis) = Faith' },
  { letter: 'Ρ ρ', name: 'Rho', translit: 'r', value: 100, note: '' },
  { letter: 'Σ σ/ς', name: 'Sigma', translit: 's', value: 200, note: '' },
  { letter: 'Τ τ', name: 'Tau', translit: 't', value: 300, note: '' },
  { letter: 'Υ υ', name: 'Upsilon', translit: 'u/y', value: 400, note: '' },
  { letter: 'Φ φ', name: 'Phi', translit: 'ph', value: 500, note: 'φῶς (phōs) = Light' },
  { letter: 'Χ χ', name: 'Chi', translit: 'ch', value: 600, note: 'Χριστός (Christos) = Christ' },
  { letter: 'Ψ ψ', name: 'Psi', translit: 'ps', value: 700, note: 'ψυχή (psychē) = Soul' },
  { letter: 'Ω ω', name: 'Omega', translit: 'ō (long)', value: 800, note: '"the Alpha and Omega" (Rev 22:13)' },
];

export default function AlphabetPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Alphabet Reference</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">🔤 Biblical Alphabets</h1>
        <p className="text-parchment-400 mb-8">Reference guide for Hebrew (OT) and Greek (NT) letters with numerical values and biblical significance.</p>

        {/* Hebrew */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold font-serif text-gold-400 mb-4">🕎 Hebrew Alphabet (Aleph-Bet)</h2>
          <p className="text-sm text-parchment-500 mb-4">22 letters, read right to left. Each letter has a pictographic origin and numerical value used in gematria.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {HEBREW_LETTERS.map(l => (
              <div key={l.name} className="flex items-center gap-3 p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/20 transition-all">
                <div className="w-12 h-12 rounded-lg bg-parchment-800 flex items-center justify-center text-2xl text-gold-400 font-bold flex-shrink-0" dir="rtl">
                  {l.letter}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-parchment-200">{l.name}</span>
                    <span className="text-xs text-parchment-500">({l.translit})</span>
                    <span className="text-xs text-gold-500/60">= {l.value}</span>
                  </div>
                  <p className="text-xs text-parchment-400">{l.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Greek */}
        <section>
          <h2 className="text-2xl font-bold font-serif text-gold-400 mb-4">🏛️ Greek Alphabet</h2>
          <p className="text-sm text-parchment-500 mb-4">24 letters used in the New Testament manuscripts. Key theological terms are noted.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {GREEK_LETTERS.map(l => (
              <div key={l.name} className="flex items-center gap-3 p-3 rounded-xl bg-parchment-900 border border-parchment-800 hover:border-gold-500/20 transition-all">
                <div className="w-12 h-12 rounded-lg bg-parchment-800 flex items-center justify-center text-lg text-gold-400 font-bold flex-shrink-0">
                  {l.letter}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-parchment-200">{l.name}</span>
                    <span className="text-xs text-parchment-500">({l.translit})</span>
                    <span className="text-xs text-gold-500/60">= {l.value}</span>
                  </div>
                  {l.note && <p className="text-xs text-parchment-400 italic">{l.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-10 text-center text-xs text-parchment-600">
          <p>Numerical values shown are from traditional Hebrew gematria and Greek isopsephy systems.</p>
        </div>
      </main>
    </>
  );
}
