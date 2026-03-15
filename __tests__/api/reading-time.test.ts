import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { GET } from '@/app/api/reading-time/route';
import { NextRequest } from 'next/server';

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/reading-time');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('GET /api/reading-time', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns reading time for a specific chapter', async () => {
    const res = await GET(makeRequest({ book: '1', chapter: '1' }));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.totalWords).toBeGreaterThan(0);
    expect(data.readingTimeMinutes).toBeGreaterThanOrEqual(1);
    expect(data.verses).toBeGreaterThan(0);
  });

  it('returns overview for all books', async () => {
    const res = await GET(makeRequest({}));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.books).toBeDefined();
    expect(Array.isArray(data.books)).toBe(true);
    expect(data.totalReadingTimeMinutes).toBeGreaterThan(0);
    expect(data.totalReadingTimeFormatted).toBeDefined();
  });
});
