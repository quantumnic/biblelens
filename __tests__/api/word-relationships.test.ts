import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { GET } from '@/app/api/word-relationships/route';
import { NextRequest } from 'next/server';

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/word-relationships');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('GET /api/word-relationships', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns relationships for a valid Strong\'s ID', async () => {
    const res = await GET(makeRequest({ id: 'G26' }));
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.entry).toBeDefined();
    expect(data.entry.id).toBe('G26');
    expect(data.coOccurrences).toBeDefined();
    expect(Array.isArray(data.coOccurrences)).toBe(true);
    expect(data.distribution).toBeDefined();
    expect(data.distribution).toHaveProperty('oldTestament');
    expect(data.distribution).toHaveProperty('newTestament');
  });

  it('returns 400 when id is missing', async () => {
    const res = await GET(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns 404 for nonexistent Strong\'s', async () => {
    const res = await GET(makeRequest({ id: 'G99999' }));
    expect(res.status).toBe(404);
  });
});
