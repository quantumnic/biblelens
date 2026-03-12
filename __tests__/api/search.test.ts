import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { GET } from '@/app/api/search/route';
import { NextRequest } from 'next/server';

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/search');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('GET /api/search', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns 400 without query', async () => {
    const res = await GET(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('searches for a word', async () => {
    const res = await GET(makeRequest({ q: 'God' }));
    const data = await res.json();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.total).toBeGreaterThan(0);
  });

  it('respects translation filter', async () => {
    const res = await GET(makeRequest({ q: 'God', translation: 'ASV' }));
    const data = await res.json();
    expect(data.results.every((v: any) => v.translation === 'ASV')).toBe(true);
  });

  it('respects book filter', async () => {
    const res = await GET(makeRequest({ q: 'God', book: '43' }));
    const data = await res.json();
    expect(data.results.every((v: any) => v.book === 43)).toBe(true);
  });

  it('returns empty for nonexistent word', async () => {
    const res = await GET(makeRequest({ q: 'xyznotaword' }));
    const data = await res.json();
    expect(data.results).toHaveLength(0);
    expect(data.total).toBe(0);
  });
});
