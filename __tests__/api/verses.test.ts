import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { GET } from '@/app/api/verses/route';
import { NextRequest } from 'next/server';

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/verses');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('GET /api/verses', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns 400 without book and chapter', async () => {
    const res = await GET(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns verses for book and chapter', async () => {
    const res = await GET(makeRequest({ book: '1', chapter: '1' }));
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    expect(data[0]).toHaveProperty('text');
    expect(data[0]).toHaveProperty('book', 1);
    expect(data[0]).toHaveProperty('chapter', 1);
  });

  it('filters by translation', async () => {
    const res = await GET(makeRequest({ book: '1', chapter: '1', translation: 'ASV' }));
    const data = await res.json();
    expect(data.every((v: any) => v.translation === 'ASV')).toBe(true);
  });

  it('filters by specific verse', async () => {
    const res = await GET(makeRequest({ book: '1', chapter: '1', verse: '1' }));
    const data = await res.json();
    expect(data.every((v: any) => v.verse === 1)).toBe(true);
    // Should have KJV, ASV, VUL
    expect(data.length).toBeGreaterThanOrEqual(3);
  });

  it('returns empty array for nonexistent book', async () => {
    const res = await GET(makeRequest({ book: '99', chapter: '1' }));
    const data = await res.json();
    expect(data).toEqual([]);
  });
});
