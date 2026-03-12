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

describe('GET /api/hapax', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns hapax legomena data', async () => {
    const { GET } = await import('@/app/api/hapax/route');
    const url = new URL('http://localhost/api/hapax');
    const req = new NextRequest(url);
    const res = await GET(req);
    expect(res.status).toBe(200);
  });
});
