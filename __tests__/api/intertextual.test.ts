import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

// Mock DB
vi.mock('@/lib/db', () => ({
  isDatabaseAvailable: vi.fn(() => true),
  getDb: vi.fn(() => ({
    prepare: vi.fn((sql: string) => ({
      all: vi.fn((...args: any[]) => {
        if (sql.includes('FROM word_strongs ws') && sql.includes('JOIN strongs s') && !sql.includes('IN (')) {
          return [
            { strongs_id: 'G26', word: 'loved', original: 'ἀγάπη', transliteration: 'agapē', definition: 'Love', language: 'greek' },
            { strongs_id: 'G2316', word: 'God', original: 'θεός', transliteration: 'theos', definition: 'God', language: 'greek' },
          ];
        }
        if (sql.includes('IN (')) {
          return [
            { book: 45, chapter: 5, verse: 8, strongs_id: 'G26', word: 'love', transliteration: 'agapē', definition: 'Love' },
            { book: 45, chapter: 5, verse: 8, strongs_id: 'G2316', word: 'God', transliteration: 'theos', definition: 'God' },
            { book: 62, chapter: 4, verse: 8, strongs_id: 'G26', word: 'love', transliteration: 'agapē', definition: 'Love' },
          ];
        }
        return [];
      }),
      get: vi.fn(() => ({ text: 'For God so loved the world...' })),
    })),
  })),
  DatabaseNotAvailableError: class extends Error { constructor(m: string) { super(m); this.name = 'DatabaseNotAvailableError'; } },
}));

describe('Intertextual API', () => {
  let GET: any;

  beforeEach(async () => {
    const mod = await import('../../src/app/api/intertextual/route');
    GET = mod.GET;
  });

  it('returns connections for a verse', async () => {
    const req = new NextRequest('http://localhost/api/intertextual?book=43&chapter=3&verse=16');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.sourceWords).toHaveLength(2);
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.data[0].sharedWords.length).toBeGreaterThan(0);
  });

  it('returns 400 for missing params', async () => {
    const req = new NextRequest('http://localhost/api/intertextual?book=43');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('returns 503 when db unavailable', async () => {
    const dbMod = await import('@/lib/db');
    (dbMod.isDatabaseAvailable as any).mockReturnValueOnce(false);
    const req = new NextRequest('http://localhost/api/intertextual?book=43&chapter=3&verse=16');
    const res = await GET(req);
    expect(res.status).toBe(503);
  });
});
