import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/word-compare/route';
import { NextRequest } from 'next/server';

vi.mock('../../src/lib/db', () => ({
  getDb: () => ({
    prepare: (sql: string) => ({
      get: (...args: any[]) => ({ c: 42 }),
      all: (...args: any[]) => [{ book: 1, count: 10 }, { book: 43, count: 8 }],
    }),
  }),
  isDatabaseAvailable: () => true,
}));

describe('GET /api/word-compare', () => {
  it('returns 400 without word param', async () => {
    const req = new NextRequest('http://localhost/api/word-compare');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('returns word comparison data', async () => {
    const req = new NextRequest('http://localhost/api/word-compare?word=love');
    const res = await GET(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.word).toBe('love');
    expect(data).toHaveProperty('oldTestament');
    expect(data).toHaveProperty('newTestament');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('bookBreakdown');
  });
});
