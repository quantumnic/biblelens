import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

// Synoptic Gospel parallel passages and other well-known parallels
const PARALLEL_PASSAGES: { label: string; refs: [number, number, number, number][] }[] = [
  { label: 'Birth of Jesus', refs: [[40,1,18,25],[42,2,1,20]] },
  { label: 'Baptism of Jesus', refs: [[40,3,13,17],[41,1,9,11],[42,3,21,22]] },
  { label: 'Temptation', refs: [[40,4,1,11],[41,1,12,13],[42,4,1,13]] },
  { label: 'Beatitudes', refs: [[40,5,1,12],[42,6,20,26]] },
  { label: "Lord's Prayer", refs: [[40,6,9,13],[42,11,2,4]] },
  { label: 'Feeding 5000', refs: [[40,14,13,21],[41,6,30,44],[42,9,10,17],[43,6,1,14]] },
  { label: 'Walking on Water', refs: [[40,14,22,33],[41,6,45,52],[43,6,16,21]] },
  { label: 'Transfiguration', refs: [[40,17,1,8],[41,9,2,8],[42,9,28,36]] },
  { label: "Peter's Confession", refs: [[40,16,13,20],[41,8,27,30],[42,9,18,21]] },
  { label: 'Triumphal Entry', refs: [[40,21,1,11],[41,11,1,11],[42,19,28,44],[43,12,12,19]] },
  { label: 'Last Supper', refs: [[40,26,17,30],[41,14,12,26],[42,22,7,23]] },
  { label: 'Crucifixion', refs: [[40,27,32,56],[41,15,21,41],[42,23,26,49],[43,19,17,37]] },
  { label: 'Resurrection', refs: [[40,28,1,10],[41,16,1,8],[42,24,1,12],[43,20,1,18]] },
  { label: 'Great Commission', refs: [[40,28,16,20],[41,16,15,18],[42,24,44,49],[44,1,8,8]] },
  { label: 'Creation', refs: [[1,1,1,31],[1,2,1,25],[43,1,1,5],[58,11,3,3]] },
  { label: 'Ten Commandments', refs: [[2,20,1,17],[5,5,6,21]] },
  { label: 'Shema', refs: [[5,6,4,9],[40,22,37,40],[41,12,29,31]] },
  { label: 'Suffering Servant', refs: [[23,52,13,15],[23,53,1,12],[44,8,30,35]] },
  { label: 'New Covenant', refs: [[24,31,31,34],[58,8,8,13],[42,22,20,20]] },
  { label: 'Armor of God', refs: [[49,6,10,18],[23,59,17,17],[52,5,8,8]] },
  { label: 'Love Chapter', refs: [[46,13,1,13],[62,4,7,12]] },
  { label: 'Faith Chapter', refs: [[58,11,1,40]] },
  { label: 'Fruit of the Spirit', refs: [[48,5,22,23],[51,3,12,15]] },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const book = searchParams.get('book');
    const chapter = searchParams.get('chapter');
    const verse = searchParams.get('verse');

    const db = getDb();

    if (book && chapter && verse) {
      const b = parseInt(book);
      const c = parseInt(chapter);
      const v = parseInt(verse);

      // Find parallels that include this verse
      const matches = PARALLEL_PASSAGES.filter(p =>
        p.refs.some(([rb, rc, rvs, rve]) => rb === b && rc === c && v >= rvs && v <= rve)
      );

      // Fetch verse texts for each parallel
      const results = matches.map(m => ({
        label: m.label,
        passages: m.refs.map(([rb, rc, rvs, rve]) => {
          const verses = db.prepare(
            `SELECT book, chapter, verse, text FROM verses
             WHERE book = ? AND chapter = ? AND verse >= ? AND verse <= ? AND translation = 'KJV'
             ORDER BY verse`
          ).all(rb, rc, rvs, rve) as any[];
          return { book: rb, chapter: rc, verseStart: rvs, verseEnd: rve, verses };
        }),
      }));

      return NextResponse.json({ parallels: results, total: results.length });
    }

    // Return all parallel passage groups (without verse texts for overview)
    return NextResponse.json({
      passages: PARALLEL_PASSAGES.map(p => ({
        label: p.label,
        refs: p.refs.map(([b, c, vs, ve]) => ({ book: b, chapter: c, verseStart: vs, verseEnd: ve })),
      })),
      total: PARALLEL_PASSAGES.length,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
