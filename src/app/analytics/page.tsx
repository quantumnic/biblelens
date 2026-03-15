import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { getDb } from '@/lib/db';
import { getBookById, BIBLE_BOOKS } from '@/lib/bible-books';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import AnalyticsBookSelector from '@/components/AnalyticsBookSelector';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: { book?: string };
}

export default function AnalyticsPage({ searchParams }: Props) {
  const bookId = parseInt(searchParams.book || '0');
  const db = getDb();

  // Word frequency
  const STOP_WORDS = new Set(['the','and','of','to','in','that','he','for','it','with','as','his','on','be','at','by','i','this','had','not','are','but','from','or','have','an','they','which','one','you','were','her','all','she','there','would','their','we','him','been','has','when','who','will','no','more','if','out','so','said','what','up','its','about','into','than','them','can','only','other','new','some','could','time','these','two','may','then','do','first','any','my','now','such','like','our','over','man','me','even','most','made','after','also','did','many','before','must','through','back','years','where','much','your','way','well','down','should','because','each','just','those','people','how','too','little','state','good','very','make','world','still','own','see','men','here','between','both','life','being','under','never','day','same','another','know','while','last','might','us','great','old','year','off','come','since','against','go','came','right','used','take','three','a','is','was','shall','unto','upon','thy','thee','thou','hath','ye','lo','am','o','oh','ah']);

  let verseQuery: string;
  let verseParams: any[];
  if (bookId > 0) {
    verseQuery = 'SELECT text FROM verses WHERE book = ? AND translation = ?';
    verseParams = [bookId, 'KJV'];
  } else {
    verseQuery = 'SELECT text FROM verses WHERE translation = ?';
    verseParams = ['KJV'];
  }
  
  const verseRows = db.prepare(verseQuery).all(...verseParams) as { text: string }[];
  const freq: Record<string, number> = {};
  for (const row of verseRows) {
    const words = row.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
    for (const w of words) {
      if (w.length > 2 && !STOP_WORDS.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
      }
    }
  }
  const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 30).map(([word, count]) => ({ word, count }));

  // Sentiment per chapter (for selected book or Genesis)
  const sentBook = bookId > 0 ? bookId : 1;
  const POSITIVE = new Set(['love','joy','peace','faith','hope','grace','glory','praise','blessed','good','mercy','salvation','righteous','holy','light','truth','life','comfort','rejoice','wonderful','beautiful','kind','gentle','faithful','eternal','heaven','pure','wisdom']);
  const NEGATIVE = new Set(['sin','death','evil','wrath','destroy','curse','sorrow','fear','wicked','darkness','hate','judge','punishment','suffer','plague','famine','sword','enemy','war','desolation','corruption','deceit','perish','terror','affliction','trouble','grief','weep']);

  const chapters = db.prepare(
    'SELECT DISTINCT chapter FROM verses WHERE book = ? AND translation = ? ORDER BY chapter'
  ).all(sentBook, 'KJV') as { chapter: number }[];
  
  const sentimentData = chapters.map(({ chapter }) => {
    const texts = db.prepare(
      'SELECT text FROM verses WHERE book = ? AND chapter = ? AND translation = ?'
    ).all(sentBook, chapter, 'KJV') as { text: string }[];
    
    let pos = 0, neg = 0;
    for (const t of texts) {
      for (const w of t.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/)) {
        if (POSITIVE.has(w)) pos++;
        if (NEGATIVE.has(w)) neg++;
      }
    }
    return { chapter, positive: pos, negative: neg, score: pos - neg };
  });

  // Book stats
  const bookStats = db.prepare(`
    SELECT book, COUNT(*) as verses, SUM(LENGTH(text)) as chars
    FROM verses WHERE translation = 'KJV'
    GROUP BY book ORDER BY book
  `).all() as any[];

  const enrichedStats = bookStats.map(s => {
    const bi = getBookById(s.book);
    return { name: bi?.abbrev || `${s.book}`, book: s.book, verses: s.verses, chars: s.chars, testament: bi?.testament || 'OT' };
  });

  // Historical timeline data
  const timeline = [
    { book: 'Genesis', period: '~1450-1410 BC', event: 'Creation, Patriarchs, Exodus' },
    { book: 'Psalms', period: '~1000-400 BC', event: 'Davidic kingdom, Temple worship' },
    { book: 'Isaiah', period: '~740-680 BC', event: 'Assyrian Empire, Fall of Northern Kingdom' },
    { book: 'Daniel', period: '~605-530 BC', event: 'Babylonian Exile, Persian Rise' },
    { book: 'Matthew', period: '~50-70 AD', event: 'Roman occupation, Early church' },
    { book: 'Romans', period: '~57 AD', event: 'Paul\'s missionary journeys' },
    { book: 'Revelation', period: '~95 AD', event: 'Domitian persecution, Late 1st century' },
  ];

  const bookName = bookId > 0 ? getBookById(bookId)?.name : 'All Books';

  return (
    <>
      <Sidebar />
      <main className="flex-1 p-4 lg:p-8 max-w-6xl">
        <div className="flex items-center gap-2 text-sm text-parchment-500 mb-2">
          <Link href="/" className="hover:text-gold-400">Home</Link>
          <span>/</span>
          <span className="text-gold-400">Analytics</span>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h1 className="text-3xl font-bold font-serif text-parchment-100">📊 Analytics Dashboard</h1>
          <AnalyticsBookSelector bookId={bookId} />
        </div>

        {/* Pass data to client component for charts */}
        <AnalyticsCharts
          topWords={topWords}
          sentimentData={sentimentData}
          bookStats={enrichedStats}
          timeline={timeline}
          bookName={bookName || 'All Books'}
          sentBookName={getBookById(sentBook)?.name || 'Genesis'}
          bookId={bookId}
        />
      </main>
    </>
  );
}
