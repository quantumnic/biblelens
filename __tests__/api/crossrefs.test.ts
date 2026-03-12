import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { GET } from '@/app/api/crossrefs/route';
import { NextRequest } from 'next/server';

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/crossrefs');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('GET /api/crossrefs', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns 400 without required params', async () => {
    const res = await GET(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns cross-references for John 3:16', async () => {
    const res = await GET(makeRequest({ book: '43', chapter: '3', verse: '16' }));
    const data = await res.json();
    expect(data).toHaveProperty('from');
    expect(data).toHaveProperty('to');
    expect(data.from.length + data.to.length).toBeGreaterThan(0);
  });

  it('includes verse text in references', async () => {
    const res = await GET(makeRequest({ book: '43', chapter: '3', verse: '16' }));
    const data = await res.json();
    if (data.from.length > 0) {
      expect(data.from[0]).toHaveProperty('text');
    }
  });

  it('returns empty for verse without cross-refs', async () => {
    const res = await GET(makeRequest({ book: '50', chapter: '4', verse: '13' }));
    const data = await res.json();
    expect(data.total).toBe(0);
  });
});
