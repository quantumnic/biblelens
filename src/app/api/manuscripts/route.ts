import { NextRequest, NextResponse } from 'next/server';
import { handleApiError } from '@/lib/api-utils';

// Curated manuscript attestation data
// In reality, this would be a full database. This is a representative demo.
interface ManuscriptInfo {
  id: string;
  name: string;
  symbol: string;
  date: string;
  language: string;
  content: string;
  location: string;
  digitalUrl?: string;
}

const MANUSCRIPTS: ManuscriptInfo[] = [
  {
    id: 'sinaiticus',
    name: 'Codex Sinaiticus',
    symbol: 'א (Aleph)',
    date: 'c. 330–360 CE',
    language: 'Greek',
    content: 'Most of OT (LXX) + complete NT',
    location: 'British Library, London',
    digitalUrl: 'https://codexsinaiticus.org',
  },
  {
    id: 'vaticanus',
    name: 'Codex Vaticanus',
    symbol: 'B',
    date: 'c. 300–325 CE',
    language: 'Greek',
    content: 'Most of OT + NT through Hebrews 9:14',
    location: 'Vatican Library, Rome',
    digitalUrl: 'https://digi.vatlib.it/view/MSS_Vat.gr.1209',
  },
  {
    id: 'alexandrinus',
    name: 'Codex Alexandrinus',
    symbol: 'A',
    date: 'c. 400–440 CE',
    language: 'Greek',
    content: 'Nearly complete Bible (some NT lacunae)',
    location: 'British Library, London',
    digitalUrl: 'https://www.bl.uk/collection-items/codex-alexandrinus',
  },
  {
    id: 'bezae',
    name: 'Codex Bezae',
    symbol: 'D',
    date: 'c. 400–450 CE',
    language: 'Greek/Latin',
    content: 'Gospels, Acts (with unique variant readings)',
    location: 'Cambridge University Library',
  },
  {
    id: 'ephraemi',
    name: 'Codex Ephraemi Rescriptus',
    symbol: 'C',
    date: 'c. 450 CE',
    language: 'Greek',
    content: 'Palimpsest; portions of OT + NT',
    location: 'Bibliothèque nationale de France, Paris',
  },
  {
    id: 'dss',
    name: 'Dead Sea Scrolls',
    symbol: 'DSS',
    date: 'c. 250 BCE – 68 CE',
    language: 'Hebrew/Aramaic/Greek',
    content: 'Every OT book except Esther; sectarian texts',
    location: 'Israel Museum, Jerusalem',
    digitalUrl: 'https://www.deadseascrolls.org.il',
  },
  {
    id: 'mt',
    name: 'Masoretic Text',
    symbol: 'MT',
    date: '7th–10th century CE (Aleppo Codex c. 930)',
    language: 'Hebrew',
    content: 'Complete Hebrew Bible (OT)',
    location: 'Various (Aleppo Codex: Israel Museum)',
  },
  {
    id: 'lxx',
    name: 'Septuagint',
    symbol: 'LXX',
    date: 'c. 250–100 BCE (translation period)',
    language: 'Greek',
    content: 'Greek translation of Hebrew Bible + Deuterocanon',
    location: 'Various manuscripts',
  },
  {
    id: 'vulgata',
    name: 'Vulgate',
    symbol: 'Vg',
    date: 'c. 382–405 CE (Jerome\'s translation)',
    language: 'Latin',
    content: 'Complete Bible in Latin',
    location: 'Various (Codex Amiatinus: Laurentian Library, Florence)',
  },
  {
    id: 'peshitta',
    name: 'Peshitta',
    symbol: 'Syr',
    date: 'c. 2nd–5th century CE',
    language: 'Syriac',
    content: 'OT + most of NT (excludes some catholic epistles + Revelation)',
    location: 'Various libraries worldwide',
  },
];

// Simplified: which manuscripts cover which book ranges
function getManuscriptsForVerse(book: number, _chapter: number, _verse: number): ManuscriptInfo[] {
  const results: ManuscriptInfo[] = [];
  
  // OT books (1-39)
  if (book <= 39) {
    results.push(MANUSCRIPTS.find(m => m.id === 'mt')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'lxx')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'vulgata')!);
    if (book !== 17) { // Esther not in DSS
      results.push(MANUSCRIPTS.find(m => m.id === 'dss')!);
    }
    results.push(MANUSCRIPTS.find(m => m.id === 'sinaiticus')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'vaticanus')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'peshitta')!);
  }
  
  // NT books (40-66)
  if (book >= 40) {
    results.push(MANUSCRIPTS.find(m => m.id === 'sinaiticus')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'vaticanus')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'alexandrinus')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'vulgata')!);
    
    // Bezae only covers Gospels + Acts
    if (book >= 40 && book <= 44) {
      results.push(MANUSCRIPTS.find(m => m.id === 'bezae')!);
    }
    
    results.push(MANUSCRIPTS.find(m => m.id === 'ephraemi')!);
    results.push(MANUSCRIPTS.find(m => m.id === 'peshitta')!);
  }
  
  return results.filter(Boolean);
}

export async function GET(request: NextRequest) {
  try {
  const { searchParams } = new URL(request.url);
  const book = searchParams.get('book');
  const chapter = searchParams.get('chapter');
  const verse = searchParams.get('verse');
  
  if (book && chapter && verse) {
    const manuscripts = getManuscriptsForVerse(
      parseInt(book), parseInt(chapter), parseInt(verse)
    );
    return NextResponse.json({ manuscripts });
  }
  
  // Return all manuscripts
  return NextResponse.json({ manuscripts: MANUSCRIPTS });
  } catch (error) {
    return handleApiError(error);
  }
}
