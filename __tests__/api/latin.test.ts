import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { NextRequest } from 'next/server';

function makeSearchRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/latin/search');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('Latin API routes', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  describe('GET /api/latin/search', () => {
    it('searches for latin words', async () => {
      const { GET } = await import('@/app/api/latin/search/route');
      const res = await GET(makeSearchRequest({ q: 'amor' }));
      const data = await res.json();
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/latin/word/[lemma]', () => {
    it('returns word details', async () => {
      const { GET } = await import('@/app/api/latin/word/[lemma]/route');
      const url = new URL('http://localhost/api/latin/word/amor');
      const req = new NextRequest(url);
      const res = await GET(req, { params: { lemma: 'amor' } });
      expect(res.status).toBe(200);
    });
  });
});
