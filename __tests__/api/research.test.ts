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

describe('GET /api/research', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns 400 without query', async () => {
    const { GET } = await import('@/app/api/research/route');
    const url = new URL('http://localhost/api/research');
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('requires q parameter', async () => {
    const { GET } = await import('@/app/api/research/route');
    const url = new URL('http://localhost/api/research');
    const req = new NextRequest(url);
    const res = await GET(req);
    const data = await res.json();
    expect(data.error).toContain('q parameter required');
  });
});
