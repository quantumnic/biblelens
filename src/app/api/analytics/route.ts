import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

// Stop words to exclude from frequency analysis
const STOP_WORDS = new Set([
  'the','and','of','to','in','that','he','for','it','with','as','his','on','be',
  'at','by','i','this','had','not','are','but','from','or','have','an','they',
  'which','one','you','were','her','all','she','there','would','their','we',
  'him','been','has','when','who','will','no','more','if','out','so','said',
  'what','up','its','about','into','than','them','can','only','other','new',
  'some','could','time','these','two','may','then','do','first','any','my',
  'now','such','like','our','over','man','me','even','most','made','after',
  'also','did','many','before','must','through','back','years','where','much',
  'your','way','well','down','should','because','each','just','those','people',
  'how','too','little','state','good','very','make','world','still','own',
  'see','men','here','between','both','life','being','under','never','day',
  'same','another','know','while','last','might','us','great','old','year',
  'off','come','since','against','go','came','right','used','take','three',
  'a','is','was','shall','unto','upon','thy','thee','thou','hath','ye',
  'lo','am','o','oh','ah'
]);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'word-frequency';
  const book = searchParams.get('book');
  const translation = searchParams.get('translation') || 'KJV';

  const db = getDb();

  if (type === 'word-frequency') {
    let query: string;
    let params: any[];
    
    if (book) {
      query = 'SELECT text FROM verses WHERE book = ? AND translation = ?';
      params = [parseInt(book), translation];
    } else {
      query = 'SELECT text FROM verses WHERE translation = ?';
      params = [translation];
    }
    
    const rows = db.prepare(query).all(...params) as { text: string }[];
    const freq: Record<string, number> = {};
    
    for (const row of rows) {
      const words = row.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
      for (const w of words) {
        if (w.length > 2 && !STOP_WORDS.has(w)) {
          freq[w] = (freq[w] || 0) + 1;
        }
      }
    }
    
    const sorted = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 100)
      .map(([word, count]) => ({ word, count }));
    
    return NextResponse.json({ type: 'word-frequency', data: sorted });
  }

  if (type === 'sentiment') {
    // Simple lexicon-based sentiment
    const POSITIVE = new Set(['love','joy','peace','faith','hope','grace','glory','praise','blessed','good','mercy','salvation','righteous','holy','light','truth','life','comfort','rejoice','wonderful','beautiful','kind','gentle','faithful','eternal','heaven','pure','wisdom']);
    const NEGATIVE = new Set(['sin','death','evil','wrath','destroy','curse','sorrow','fear','wicked','darkness','hate','judge','punishment','suffer','plague','famine','sword','enemy','war','desolation','corruption','deceit','perish','terror','affliction','trouble','grief','weep']);

    const bookId = book ? parseInt(book) : 1;
    const chapters = db.prepare(
      'SELECT DISTINCT chapter FROM verses WHERE book = ? AND translation = ? ORDER BY chapter'
    ).all(bookId, translation) as { chapter: number }[];
    
    const sentimentData = chapters.map(({ chapter }) => {
      const verses = db.prepare(
        'SELECT text FROM verses WHERE book = ? AND chapter = ? AND translation = ?'
      ).all(bookId, chapter, translation) as { text: string }[];
      
      let pos = 0, neg = 0, total = 0;
      for (const v of verses) {
        const words = v.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
        for (const w of words) {
          if (POSITIVE.has(w)) pos++;
          if (NEGATIVE.has(w)) neg++;
          total++;
        }
      }
      
      const score = total > 0 ? ((pos - neg) / Math.max(pos + neg, 1)) : 0;
      return { chapter, positive: pos, negative: neg, total, score: Math.round(score * 100) / 100 };
    });
    
    return NextResponse.json({ type: 'sentiment', book: bookId, data: sentimentData });
  }

  if (type === 'book-stats') {
    const stats = db.prepare(`
      SELECT book, 
        COUNT(*) as verse_count, 
        SUM(LENGTH(text)) as total_chars,
        AVG(LENGTH(text)) as avg_verse_length
      FROM verses WHERE translation = ?
      GROUP BY book ORDER BY book
    `).all(translation) as any[];
    
    // Word counts per book
    const enriched = stats.map(s => {
      const verses = db.prepare(
        'SELECT text FROM verses WHERE book = ? AND translation = ?'
      ).all(s.book, translation) as { text: string }[];
      
      const allWords = verses.flatMap(v => v.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 0));
      const uniqueWords = new Set(allWords);
      
      return {
        book: s.book,
        verses: s.verse_count,
        totalWords: allWords.length,
        uniqueWords: uniqueWords.size,
        avgVerseLength: Math.round(s.avg_verse_length),
        vocabularyRichness: Math.round((uniqueWords.size / Math.max(allWords.length, 1)) * 1000) / 1000,
      };
    });
    
    return NextResponse.json({ type: 'book-stats', data: enriched });
  }

  return NextResponse.json({ error: 'Unknown analytics type' }, { status: 400 });
}
