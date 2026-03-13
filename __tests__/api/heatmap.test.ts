import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Heatmap API', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should require word parameter', async () => {
    const { GET } = await import('../../src/app/api/heatmap/route');
    const req = new Request('http://localhost/api/heatmap');
    const res = await GET(req as any);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toContain('word');
  });

  it('should handle database not available gracefully', async () => {
    const { DatabaseNotAvailableError } = await import('../../src/lib/db');
    vi.doMock('../../src/lib/db', () => ({
      getDb: () => { throw new DatabaseNotAvailableError('Database not found'); },
      DatabaseNotAvailableError,
      isDatabaseAvailable: () => false,
      getDbPath: () => '/tmp/fake.db',
    }));
    const { GET } = await import('../../src/app/api/heatmap/route');
    const req = new Request('http://localhost/api/heatmap?word=love');
    const res = await GET(req as any);
    expect(res.status).toBeGreaterThanOrEqual(400);
  });
});
