import { NextRequest, NextResponse } from 'next/server';
import { getDb, isDatabaseAvailable } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

export async function GET(request: NextRequest) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word')?.toLowerCase();
    const book = parseInt(searchParams.get('book') || '0');
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50);

    if (!word) {
      return NextResponse.json({ error: 'word parameter required' }, { status: 400 });
    }

    const STOP_WORDS = new Set(['the','and','of','to','in','that','he','for','it','with','as','his','on','be','at','by','i','this','had','not','are','but','from','or','have','an','they','which','one','you','were','her','all','she','there','would','their','we','him','been','has','when','who','will','no','more','if','out','so','said','what','up','its','about','into','than','them','can','only','other','new','some','could','time','these','two','may','then','do','first','any','my','now','such','like','our','over','man','me','even','most','made','after','also','did','many','before','must','through','back','years','where','much','your','way','well','down','should','because','each','just','those','people','how','too','little','state','good','very','make','world','still','own','see','men','here','between','both','life','being','under','never','day','same','another','know','while','last','might','us','great','old','year','off','come','since','against','go','came','right','used','take','three','a','is','was','shall','unto','upon','thy','thee','thou','hath','ye','lo','am','o','oh','ah']);

    const db = getDb();

    let query: string;
    let params: any[];
    if (book > 0) {
      query = "SELECT text FROM verses WHERE translation = 'KJV' AND book = ? AND LOWER(text) LIKE ?";
      params = [book, `%${word}%`];
    } else {
      query = "SELECT text FROM verses WHERE translation = 'KJV' AND LOWER(text) LIKE ?";
      params = [`%${word}%`];
    }

    const rows = db.prepare(query).all(...params) as { text: string }[];
    const coOccurrences: Record<string, number> = {};
    let totalVerses = 0;

    for (const row of rows) {
      const words = row.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 2);
      const hasWord = words.includes(word);
      if (!hasWord) continue;
      totalVerses++;

      const uniqueWords = new Set(words);
      for (const w of uniqueWords) {
        if (w !== word && !STOP_WORDS.has(w)) {
          coOccurrences[w] = (coOccurrences[w] || 0) + 1;
        }
      }
    }

    const results = Object.entries(coOccurrences)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([coWord, count]) => ({
        word: coWord,
        count,
        percentage: Math.round((count / totalVerses) * 100),
      }));

    return NextResponse.json({
      word,
      totalVerses,
      coOccurrences: results,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
