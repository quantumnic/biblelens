import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api-utils';
import { getDb, isDatabaseAvailable } from '@/lib/db';
import { getBookById } from '@/lib/bible-books';

export async function GET(request: NextRequest) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const bookId = parseInt(searchParams.get('book') || '0');
    const db = getDb();

    const STOP_WORDS = new Set(['the','and','of','to','in','that','he','for','it','with','as','his','on','be','at','by','i','this','had','not','are','but','from','or','have','an','they','which','one','you','were','her','all','she','there','would','their','we','him','been','has','when','who','will','no','more','if','out','so','said','what','up','its','about','into','than','them','can','only','other','new','some','could','time','these','two','may','then','do','first','any','my','now','such','like','our','over','man','me','even','most','made','after','also','did','many','before','must','through','back','years','where','much','your','way','well','down','should','because','each','just','those','people','how','too','little','state','good','very','make','world','still','own','see','men','here','between','both','life','being','under','never','day','same','another','know','while','last','might','us','great','old','year','off','come','since','against','go','came','right','used','take','three','a','is','was','shall','unto','upon','thy','thee','thou','hath','ye','lo','am','o','oh','ah']);

    // Calculate lexical diversity (type-token ratio) per book
    let books: number[];
    if (bookId > 0) {
      books = [bookId];
    } else {
      books = (db.prepare("SELECT DISTINCT book FROM verses WHERE translation = 'KJV' ORDER BY book").all() as any[]).map(r => r.book);
    }

    const diversity = books.map(book => {
      const rows = db.prepare("SELECT text FROM verses WHERE book = ? AND translation = 'KJV'").all(book) as { text: string }[];
      const allWords: string[] = [];
      const uniqueWords = new Set<string>();

      for (const row of rows) {
        const words = row.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
        for (const w of words) {
          allWords.push(w);
          uniqueWords.add(w);
        }
      }

      const ttr = allWords.length > 0 ? uniqueWords.size / allWords.length : 0;
      const bookInfo = getBookById(book);

      return {
        book,
        name: bookInfo?.name || `Book ${book}`,
        abbrev: bookInfo?.abbrev || '',
        testament: bookInfo?.testament || 'OT',
        totalWords: allWords.length,
        uniqueWords: uniqueWords.size,
        ttr: Math.round(ttr * 1000) / 1000,
        hapaxCount: 0, // words appearing only once
      };
    });

    // Sort by TTR descending
    diversity.sort((a, b) => b.ttr - a.ttr);

    return NextResponse.json({
      data: diversity,
      averageTTR: Math.round((diversity.reduce((s, d) => s + d.ttr, 0) / diversity.length) * 1000) / 1000,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
