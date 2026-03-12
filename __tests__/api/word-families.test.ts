import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/word-families/route';
import { NextRequest } from 'next/server';

vi.mock('../../src/lib/db', () => ({
  isDatabaseAvailable: vi.fn(() => true),
  getDb: vi.fn(() => ({
    prepare: vi.fn((sql: string) => ({
      get: vi.fn((id: string) => {
        if (id === 'H3068') {
          return { id: 'H3068', original: 'יְהוָה', transliteration: 'YHWH', definition: 'The LORD', language: 'hebrew' };
        }
        if (id === 'NOTFOUND') return undefined;
        return { c: 5 };
      }),
      all: vi.fn((..._args: any[]) => [
        { id: 'H3050', original: 'יָהּ', transliteration: 'Yah', definition: 'The Lord (shortened)', language: 'hebrew', occurrences: 3 },
      ]),
    })),
  })),
}));

describe('GET /api/word-families', () => {
  it('returns family for a root Strong\'s entry', async () => {
    const req = new NextRequest('http://localhost/api/word-families?root=H3068');
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.root).toBeDefined();
    expect(data.root.id).toBe('H3068');
    expect(data.family).toBeDefined();
    expect(Array.isArray(data.family)).toBe(true);
  });

  it('returns 404 for unknown root', async () => {
    const req = new NextRequest('http://localhost/api/word-families?root=NOTFOUND');
    const res = await GET(req);
    expect(res.status).toBe(404);
  });

  it('returns browse mode when no root', async () => {
    const req = new NextRequest('http://localhost/api/word-families?lang=hebrew&limit=5');
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.language).toBe('hebrew');
    expect(data.entries).toBeDefined();
  });
});
