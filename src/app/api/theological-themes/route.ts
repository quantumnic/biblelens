import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

const THEMES: Record<string, string[]> = {
  'Salvation': ['salvation','save','saved','saviour','redeem','redeemed','redemption','deliver','deliverance','ransom'],
  'Faith': ['faith','believe','believed','trust','trusted','faithful','faithfulness','believing'],
  'Love': ['love','loved','loveth','loving','lovingkindness','charity','beloved'],
  'Grace': ['grace','gracious','mercy','merciful','compassion','compassionate','kindness'],
  'Righteousness': ['righteous','righteousness','just','justice','justified','upright','blameless'],
  'Sin': ['sin','sinned','sinner','sinners','sinful','iniquity','transgression','trespass','wickedness'],
  'Prayer': ['pray','prayer','prayed','praying','supplicate','supplication','intercession','beseech'],
  'Kingdom': ['kingdom','reign','throne','king','kings','dominion','sovereign','rule'],
  'Covenant': ['covenant','promise','promises','oath','sworn','testament','pledge'],
  'Holy Spirit': ['spirit','ghost','comforter','advocate','anointing','anointed','baptize'],
  'Wisdom': ['wisdom','wise','understanding','knowledge','discernment','prudence','insight'],
  'Prophecy': ['prophet','prophets','prophecy','prophesied','prophesy','foretold','vision','oracle'],
  'Resurrection': ['resurrection','risen','raised','rise','arose','alive'],
  'Worship': ['worship','praise','praising','glorify','glory','magnify','exalt','thanksgiving','hymn'],
  'Suffering': ['suffer','suffering','affliction','tribulation','persecution','trial','temptation','trouble'],
  'Creation': ['create','created','creation','maker','formed','earth','heaven','world','beginning','foundation'],
  'Angels': ['angel','angels','seraphim','cherubim','archangel','heavenly','host','messenger'],
  'Baptism': ['baptize','baptized','baptism','immerse','wash','washed','washing','water'],
  'Communion': ['bread','wine','cup','supper','table','feast','eat','drink','body','blood'],
  'Family': ['father','mother','son','daughter','children','brother','sister','husband','wife','marriage'],
  'Hope': ['hope','hoped','hoping','hopeth','expectation','wait','waited','waiting','endure','endurance'],
  'Joy': ['joy','joyful','rejoice','rejoiced','glad','gladness','delight','merry','happy','blessed'],
  'Death': ['death','die','died','dead','grave','tomb','burial','perish','destroy','slain'],
};

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const translation = searchParams.get('translation') || 'KJV';

  const db = getDb();

  let query: string;
  let params: any[];
  if (book) {
    query = 'SELECT book, chapter, verse, text FROM verses WHERE book = ? AND translation = ?';
    params = [parseInt(book), translation];
  } else {
    query = 'SELECT book, chapter, verse, text FROM verses WHERE translation = ?';
    params = [translation];
  }

  const rows = db.prepare(query).all(...params) as { book: number; chapter: number; verse: number; text: string }[];

  const themeStats: Record<string, { count: number; topVerses: { book: number; chapter: number; verse: number; matches: number }[] }> = {};

  for (const [theme, keywords] of Object.entries(THEMES)) {
    themeStats[theme] = { count: 0, topVerses: [] };
    const keySet = new Set(keywords);

    const verseScores: { book: number; chapter: number; verse: number; matches: number }[] = [];

    for (const row of rows) {
      const words = row.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/);
      let matches = 0;
      for (const w of words) {
        if (keySet.has(w)) matches++;
      }
      if (matches > 0) {
        themeStats[theme].count += matches;
        verseScores.push({ book: row.book, chapter: row.chapter, verse: row.verse, matches });
      }
    }

    themeStats[theme].topVerses = verseScores
      .sort((a, b) => b.matches - a.matches)
      .slice(0, 5);
  }

  // Sort themes by total count descending
  const sorted = Object.entries(themeStats)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([theme, stats]) => ({ theme, ...stats }));

  return NextResponse.json({ type: 'theological-themes', data: sorted });
  } catch (error) {
    return handleApiError(error);
  }
}
