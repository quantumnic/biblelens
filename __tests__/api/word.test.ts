import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createTestDb, seedTestDb } from '../helpers/test-db';
import Database from 'better-sqlite3';

let testDb: Database.Database;

vi.mock('@/lib/db', () => ({
  getDb: () => testDb,
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

import { GET } from '@/app/api/word/route';
import { NextRequest } from 'next/server';

function makeRequest(params: Record<string, string>): NextRequest {
  const url = new URL('http://localhost/api/word');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return new NextRequest(url);
}

describe('GET /api/word', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns Strong\'s entry by id', async () => {
    const res = await GET(makeRequest({ strongs: 'G26' }));
    const data = await res.json();
    expect(data.entry).toBeDefined();
    expect(data.entry.transliteration).toBe('agapē');
    expect(data.occurrences).toBeDefined();
  });

  it('returns 404 for nonexistent Strong\'s', async () => {
    const res = await GET(makeRequest({ strongs: 'G99999' }));
    expect(res.status).toBe(404);
  });

  it('returns words for a specific verse', async () => {
    const res = await GET(makeRequest({ book: '1', chapter: '1', verse: '1' }));
    const data = await res.json();
    expect(data.words.length).toBeGreaterThan(0);
    expect(data.words[0]).toHaveProperty('strongs_id');
  });

  it('lists all Strong\'s entries when no params', async () => {
    const res = await GET(makeRequest({}));
    const data = await res.json();
    expect(data.entries.length).toBeGreaterThan(0);
  });
});
