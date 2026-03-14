import { describe, it, expect } from 'vitest';
import { NextRequest } from 'next/server';
import { GET } from '../../src/app/api/prophecies/route';

describe('GET /api/prophecies', () => {
  it('returns all prophecies', async () => {
    const req = new NextRequest('http://localhost/api/prophecies');
    const res = await GET(req);
    const data = await res.json();
    expect(data.prophecies).toBeDefined();
    expect(data.prophecies.length).toBeGreaterThan(5);
    expect(data.stats).toBeDefined();
    expect(data.stats.fulfilled).toBeGreaterThan(0);
  });

  it('filters by category', async () => {
    const req = new NextRequest('http://localhost/api/prophecies?category=Messianic');
    const res = await GET(req);
    const data = await res.json();
    expect(data.prophecies.every((p: any) => p.category === 'Messianic')).toBe(true);
  });

  it('filters by status', async () => {
    const req = new NextRequest('http://localhost/api/prophecies?status=fulfilled');
    const res = await GET(req);
    const data = await res.json();
    expect(data.prophecies.every((p: any) => p.status === 'fulfilled')).toBe(true);
  });

  it('each prophecy has OT and NT references', async () => {
    const req = new NextRequest('http://localhost/api/prophecies');
    const res = await GET(req);
    const data = await res.json();
    for (const p of data.prophecies) {
      expect(p.otBook).toBeTruthy();
      expect(p.otRef).toBeTruthy();
      expect(p.ntBook).toBeTruthy();
      expect(p.ntRef).toBeTruthy();
    }
  });
});
