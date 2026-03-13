import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface NameEntry {
  name: string;
  original: string;
  transliteration: string;
  meaning: string;
  language: 'hebrew' | 'greek' | 'aramaic';
  firstRef: { ref: string; slug: string; chapter: number; verse: number };
  description: string;
}

const NAMES: NameEntry[] = [
  {
    name: 'Elohim',
    original: 'אֱלֹהִים',
    transliteration: 'Elohim',
    meaning: 'God (plural of majesty)',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 1:1', slug: 'genesis', chapter: 1, verse: 1 },
    description: 'The plural form suggests fullness and majesty. Used ~2,600 times. First name of God in the Bible, emphasizing his creative power.',
  },
  {
    name: 'YHWH (Yahweh)',
    original: 'יהוה',
    transliteration: 'YHWH',
    meaning: 'I AM WHO I AM — the self-existent One',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 2:4', slug: 'genesis', chapter: 2, verse: 4 },
    description: 'The covenant name of God, revealed to Moses at the burning bush (Exodus 3:14). The most sacred name, used ~6,800 times. Often rendered "LORD" in English translations.',
  },
  {
    name: 'El Shaddai',
    original: 'אֵל שַׁדַּי',
    transliteration: 'El Shaddai',
    meaning: 'God Almighty, God of the Mountain',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 17:1', slug: 'genesis', chapter: 17, verse: 1 },
    description: 'The name by which God revealed himself to Abraham, Isaac, and Jacob before revealing YHWH to Moses. Emphasizes God\'s supreme power and sufficiency.',
  },
  {
    name: 'Adonai',
    original: 'אֲדֹנָי',
    transliteration: 'Adonai',
    meaning: 'Lord, Master, Sovereign',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 15:2', slug: 'genesis', chapter: 15, verse: 2 },
    description: 'Emphasizes God\'s lordship and authority. Jews traditionally say "Adonai" when reading YHWH aloud, out of reverence for the covenant name.',
  },
  {
    name: 'El Elyon',
    original: 'אֵל עֶלְיוֹן',
    transliteration: 'El Elyon',
    meaning: 'God Most High',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 14:18', slug: 'genesis', chapter: 14, verse: 18 },
    description: 'First used by Melchizedek, king of Salem and priest of God Most High. Stresses God\'s sovereignty over all creation and all other powers.',
  },
  {
    name: 'El Olam',
    original: 'אֵל עוֹלָם',
    transliteration: 'El Olam',
    meaning: 'The Everlasting God',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 21:33', slug: 'genesis', chapter: 21, verse: 33 },
    description: 'Emphasizes God\'s eternal, unchanging nature — without beginning or end. Abraham called on this name at Beersheba.',
  },
  {
    name: 'YHWH Jireh',
    original: 'יהוה יִרְאֶה',
    transliteration: 'YHWH Yireh',
    meaning: 'The LORD will provide',
    language: 'hebrew',
    firstRef: { ref: 'Genesis 22:14', slug: 'genesis', chapter: 22, verse: 14 },
    description: 'Named by Abraham on Mount Moriah after God provided a ram in place of Isaac. Foreshadows God\'s ultimate provision in Christ.',
  },
  {
    name: 'YHWH Rapha',
    original: 'יהוה רָפָא',
    transliteration: 'YHWH Rapha',
    meaning: 'The LORD who heals',
    language: 'hebrew',
    firstRef: { ref: 'Exodus 15:26', slug: 'exodus', chapter: 15, verse: 26 },
    description: 'Revealed after the crossing of the Red Sea, emphasizing God as healer of body, soul, and nation.',
  },
  {
    name: 'YHWH Nissi',
    original: 'יהוה נִסִּי',
    transliteration: 'YHWH Nissi',
    meaning: 'The LORD is my banner',
    language: 'hebrew',
    firstRef: { ref: 'Exodus 17:15', slug: 'exodus', chapter: 17, verse: 15 },
    description: 'Moses named the altar after the victory over the Amalekites. God as the rallying point and source of victory in battle.',
  },
  {
    name: 'YHWH Shalom',
    original: 'יהוה שָׁלוֹם',
    transliteration: 'YHWH Shalom',
    meaning: 'The LORD is peace',
    language: 'hebrew',
    firstRef: { ref: 'Judges 6:24', slug: 'judges', chapter: 6, verse: 24 },
    description: 'Gideon built an altar by this name after the Angel of the LORD assured him he would not die. God as source of wholeness and peace.',
  },
  {
    name: 'YHWH Sabaoth',
    original: 'יהוה צְבָאוֹת',
    transliteration: 'YHWH Tzevaot',
    meaning: 'The LORD of Hosts (armies)',
    language: 'hebrew',
    firstRef: { ref: '1 Samuel 1:3', slug: '1-samuel', chapter: 1, verse: 3 },
    description: 'God as commander of the angelic armies and all cosmic forces. Prominent in the Prophets, especially Isaiah.',
  },
  {
    name: 'Theos',
    original: 'θεός',
    transliteration: 'Theos',
    meaning: 'God',
    language: 'greek',
    firstRef: { ref: 'Matthew 1:23', slug: 'matthew', chapter: 1, verse: 23 },
    description: 'The standard Greek word for God in the New Testament. Used to translate both Elohim and YHWH in the Septuagint.',
  },
  {
    name: 'Kyrios',
    original: 'κύριος',
    transliteration: 'Kyrios',
    meaning: 'Lord, Master',
    language: 'greek',
    firstRef: { ref: 'Matthew 1:20', slug: 'matthew', chapter: 1, verse: 20 },
    description: 'Used in the Septuagint to translate YHWH. The earliest Christian confession: "Jesus is Lord" (Kyrios Iesous) — equating Christ with YHWH.',
  },
  {
    name: 'Abba',
    original: 'אַבָּא',
    transliteration: 'Abba',
    meaning: 'Father (intimate, familial)',
    language: 'aramaic',
    firstRef: { ref: 'Mark 14:36', slug: 'mark', chapter: 14, verse: 36 },
    description: 'Jesus\' own address to God in Gethsemane. An intimate Aramaic term expressing childlike trust. Paul says the Spirit enables believers to cry "Abba, Father" (Rom 8:15, Gal 4:6).',
  },
  {
    name: 'Alpha and Omega',
    original: 'Ἄλφα καὶ Ὦ',
    transliteration: 'Alpha kai Omega',
    meaning: 'The First and the Last, the Beginning and the End',
    language: 'greek',
    firstRef: { ref: 'Revelation 1:8', slug: 'revelation', chapter: 1, verse: 8 },
    description: 'Christ as encompassing all of reality and history — from start to finish, everything exists within his sovereignty.',
  },
];

export default function NamesOfGodPage() {
  const hebrewNames = NAMES.filter(n => n.language === 'hebrew');
  const greekNames = NAMES.filter(n => n.language === 'greek' || n.language === 'aramaic');

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-5xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Names of God</span>
        </div>

        <h1 className="text-3xl font-bold font-serif text-parchment-100 mb-2">✡️ Names of God</h1>
        <p className="text-parchment-400 mb-8 max-w-2xl">
          In the biblical world, a name reveals character and nature. Each divine name unveils a different facet of who God is
          and how he relates to his creation.
        </p>

        {[
          { title: 'Hebrew Names (Old Testament)', names: hebrewNames },
          { title: 'Greek & Aramaic Names (New Testament)', names: greekNames },
        ].map(section => (
          <div key={section.title} className="mb-10">
            <h2 className="text-xl font-semibold text-gold-500 font-serif mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.names.map(n => (
                <div key={n.name} className="bg-parchment-900 border border-parchment-800 rounded-xl p-5 hover:border-gold-500/20 transition-colors">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-parchment-100 font-serif">{n.name}</h3>
                      <p className="text-gold-400 text-sm font-semibold">{n.meaning}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-serif text-gold-500/70">{n.original}</span>
                      <p className="text-xs text-parchment-500 italic">{n.transliteration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-parchment-300 leading-relaxed mb-2">{n.description}</p>
                  <Link
                    href={`/reader/${n.firstRef.slug}/${n.firstRef.chapter}#v${n.firstRef.verse}`}
                    className="text-xs text-gold-400 hover:text-gold-300 transition-colors"
                  >
                    📖 First occurrence: {n.firstRef.ref} →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
