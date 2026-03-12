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

describe('GET /api/provenance/[id]', () => {
  beforeEach(() => {
    testDb = createTestDb();
    seedTestDb(testDb);
  });

  it('returns provenance entry by id', async () => {
    const { GET } = await import('@/app/api/provenance/[id]/route');
    const url = new URL('http://localhost/api/provenance/1');
    const req = new NextRequest(url);
    const res = await GET(req, { params: { id: '1' } });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toHaveProperty('entry');
    expect(data.entry).toHaveProperty('word');
  });

  it('returns 404 for nonexistent id', async () => {
    const { GET } = await import('@/app/api/provenance/[id]/route');
    const url = new URL('http://localhost/api/provenance/999');
    const req = new NextRequest(url);
    const res = await GET(req, { params: { id: '999' } });
    expect(res.status).toBe(404);
  });
});
