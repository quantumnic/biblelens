import { NextRequest, NextResponse } from 'next/server';
import { getDb, isDatabaseAvailable } from '@/lib/db';

export const dynamic = 'force-dynamic';

const STOP_WORDS = new Set([
  'the','and','of','to','in','that','he','for','it','with','as','his','on','be',
  'at','by','i','this','had','not','are','but','from','or','have','an','they',
  'which','one','you','were','her','all','she','there','would','their','we','him',
  'been','has','when','who','will','no','more','if','out','so','said','what','up',
  'its','about','into','than','them','can','only','other','new','some','could',
  'time','these','two','may','then','do','first','any','my','now','such','like',
  'our','over','man','me','even','most','made','after','also','did','many','before',
  'must','through','back','years','where','much','your','way','well','down','should',
  'because','each','just','those','people','how','too','little','state','good','very',
  'make','world','still','own','see','men','here','between','both','life','being',
  'under','never','day','same','another','know','while','last','might','us','great',
  'old','year','off','come','since','against','go','came','right','used','take',
  'three','a','is','was','shall','unto','upon','thy','thee','thou','hath','ye',
  'lo','am','o','oh','ah',
]);

export async function GET(request: NextRequest) {
  if (!isDatabaseAvailable()) {
    return NextResponse.json({ error: 'Database not available' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const book = parseInt(searchParams.get('book') || '0');
  const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 200);
  const minLength = parseInt(searchParams.get('minLength') || '3');

  const db = getDb();

  let query: string;
  let params: any[];
  if (book > 0) {
    query = "SELECT text FROM verses WHERE book = ? AND translation = 'KJV'";
    params = [book];
  } else {
    query = "SELECT text FROM verses WHERE translation = 'KJV'";
    params = [];
  }

  const rows = db.prepare(query).all(...params) as { text: string }[];
  const freq: Record<string, number> = {};
  let totalWords = 0;

  for (const row of rows) {
    const words = row.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
    for (const w of words) {
      if (w.length >= minLength && !STOP_WORDS.has(w)) {
        freq[w] = (freq[w] || 0) + 1;
        totalWords++;
      }
    }
  }

  const topWords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({
      word,
      count,
      percentage: Math.round((count / totalWords) * 10000) / 100,
    }));

  return NextResponse.json({
    book: book || 'all',
    totalUniqueWords: Object.keys(freq).length,
    totalContentWords: totalWords,
    words: topWords,
  });
}
