import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { handleApiError } from '@/lib/api-utils';

// Discourse markers and rhetorical patterns
const DISCOURSE_PATTERNS: Record<string, { markers: string[]; description: string; category: string }> = {
  'Inclusio': {
    markers: [],
    description: 'A passage that begins and ends with the same word or phrase, forming a literary "bookend"',
    category: 'structure',
  },
  'Parallelism': {
    markers: ['as', 'so', 'like', 'even as', 'just as'],
    description: 'Ideas expressed in parallel grammatical structures',
    category: 'rhetoric',
  },
  'Contrast': {
    markers: ['but', 'yet', 'however', 'nevertheless', 'notwithstanding', 'rather'],
    description: 'Antithetical or contrastive relationship between clauses',
    category: 'rhetoric',
  },
  'Cause-Effect': {
    markers: ['therefore', 'wherefore', 'for', 'because', 'since', 'thus', 'hence'],
    description: 'Logical cause-and-effect reasoning',
    category: 'logic',
  },
  'Condition': {
    markers: ['if', 'unless', 'except', 'lest'],
    description: 'Conditional statements (protasis-apodosis)',
    category: 'logic',
  },
  'Imperative': {
    markers: ['let', 'do', 'fear not', 'behold', 'hearken', 'arise', 'go', 'come', 'hear'],
    description: 'Commands and exhortations',
    category: 'speech-act',
  },
  'Question': {
    markers: ['?'],
    description: 'Rhetorical or deliberative questions',
    category: 'speech-act',
  },
  'Exclamation': {
    markers: ['!', 'O ', 'Woe', 'Alas', 'Behold', 'Lo'],
    description: 'Exclamatory expressions of emotion',
    category: 'speech-act',
  },
  'Repetition': {
    markers: [],
    description: 'Key words or phrases repeated for emphasis',
    category: 'rhetoric',
  },
  'Climax': {
    markers: [],
    description: 'Ideas arranged in ascending order of importance',
    category: 'structure',
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const book = parseInt(searchParams.get('book') || '0');
    const chapter = parseInt(searchParams.get('chapter') || '0');
    const translation = searchParams.get('translation') || 'KJV';

    if (!book || !chapter) {
      return NextResponse.json({ error: 'book and chapter parameters required' }, { status: 400 });
    }

    const db = getDb();
    const verses = db.prepare(
      'SELECT verse, text FROM verses WHERE book = ? AND chapter = ? AND translation = ? ORDER BY verse'
    ).all(book, chapter, translation) as { verse: number; text: string }[];

    if (verses.length === 0) {
      return NextResponse.json({ error: 'No verses found' }, { status: 404 });
    }

    // Analyze each verse for discourse features
    const analysis: {
      verse: number;
      text: string;
      features: { type: string; description: string; category: string; markers: string[] }[];
    }[] = [];

    // Track word frequencies for repetition detection
    const wordFreq: Record<string, number[]> = {};
    for (const v of verses) {
      const words = v.text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3);
      for (const w of words) {
        if (!wordFreq[w]) wordFreq[w] = [];
        wordFreq[w].push(v.verse);
      }
    }

    // Find repeated significant words (appear in 3+ verses)
    const repeatedWords = Object.entries(wordFreq)
      .filter(([word, vv]) => vv.length >= 3 && !['that', 'this', 'with', 'them', 'they', 'have', 'shall', 'will', 'from', 'were', 'upon', 'which', 'their', 'into', 'said', 'unto', 'also', 'your', 'been'].includes(word))
      .sort((a, b) => b[1].length - a[1].length)
      .slice(0, 10);

    // Check for inclusio (first and last verse share significant words)
    const firstWords = new Set(verses[0].text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3));
    const lastWords = new Set(verses[verses.length - 1].text.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(w => w.length > 3));
    const sharedInclusio = [...firstWords].filter(w => lastWords.has(w) && !['that', 'this', 'with', 'them', 'they', 'have', 'shall', 'will', 'from'].includes(w));

    for (const v of verses) {
      const features: { type: string; description: string; category: string; markers: string[] }[] = [];
      const textLower = v.text.toLowerCase();

      // Check discourse markers
      for (const [type, pattern] of Object.entries(DISCOURSE_PATTERNS)) {
        if (type === 'Inclusio' || type === 'Repetition' || type === 'Climax') continue;

        const foundMarkers: string[] = [];
        for (const marker of pattern.markers) {
          if (marker === '?' && v.text.includes('?')) foundMarkers.push('?');
          else if (marker === '!' && v.text.includes('!')) foundMarkers.push('!');
          else if (textLower.includes(marker.toLowerCase())) foundMarkers.push(marker);
        }

        if (foundMarkers.length > 0) {
          features.push({ type, description: pattern.description, category: pattern.category, markers: foundMarkers });
        }
      }

      // Check for repetition in this verse
      const verseRepeats = repeatedWords.filter(([, vv]) => vv.includes(v.verse));
      if (verseRepeats.length > 0) {
        features.push({
          type: 'Repetition',
          description: DISCOURSE_PATTERNS['Repetition'].description,
          category: 'rhetoric',
          markers: verseRepeats.map(([word, vv]) => `"${word}" (${vv.length}×)`),
        });
      }

      analysis.push({ verse: v.verse, text: v.text, features });
    }

    // Chapter-level features
    const chapterFeatures: { type: string; details: string }[] = [];

    if (sharedInclusio.length > 0) {
      chapterFeatures.push({
        type: 'Inclusio',
        details: `Shared terms between first and last verse: ${sharedInclusio.join(', ')}`,
      });
    }

    if (repeatedWords.length > 0) {
      chapterFeatures.push({
        type: 'Key Repeated Words',
        details: repeatedWords.map(([word, vv]) => `"${word}" (${vv.length}× in vv. ${vv.join(',')})`).join('; '),
      });
    }

    // Count questions in chapter
    const questionCount = verses.filter(v => v.text.includes('?')).length;
    if (questionCount >= 3) {
      chapterFeatures.push({
        type: 'Diatribe / Interrogation',
        details: `${questionCount} rhetorical questions detected — possible diatribe or Socratic dialogue pattern`,
      });
    }

    // Count imperatives
    const imperativeCount = analysis.filter(a => a.features.some(f => f.type === 'Imperative')).length;
    if (imperativeCount >= 3) {
      chapterFeatures.push({
        type: 'Exhortation Cluster',
        details: `${imperativeCount} verses with imperatives — hortatory discourse section`,
      });
    }

    return NextResponse.json({
      type: 'discourse-analysis',
      book,
      chapter,
      translation,
      totalVerses: verses.length,
      chapterFeatures,
      verses: analysis,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
