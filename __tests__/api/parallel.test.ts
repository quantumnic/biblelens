import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock db
const mockPrepare = vi.fn();
vi.mock('@/lib/db', () => ({
  getDb: () => ({ prepare: mockPrepare }),
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

describe('/api/parallel', () => {
  beforeEach(() => {
    vi.resetModules();
    mockPrepare.mockReturnValue({ all: () => [] });
  });

  it('returns parallel passage groups without verse param', async () => {
    const { GET } = await import('@/app/api/parallel/route');
    const req = new Request('http://localhost/api/parallel');
    const res = await GET(req as any);
    const data = await res.json();
    expect(data.passages).toBeDefined();
    expect(data.total).toBeGreaterThan(0);
    expect(data.passages[0]).toHaveProperty('label');
    expect(data.passages[0]).toHaveProperty('refs');
  });

  it('returns matching parallels for a specific verse', async () => {
    mockPrepare.mockReturnValue({
      all: () => [{ book: 40, chapter: 3, verse: 13, text: 'Then cometh Jesus...' }],
    });
    const { GET } = await import('@/app/api/parallel/route');
    const req = new Request('http://localhost/api/parallel?book=40&chapter=3&verse=15');
    const res = await GET(req as any);
    const data = await res.json();
    expect(data.parallels).toBeDefined();
    expect(data.parallels.length).toBeGreaterThan(0);
    expect(data.parallels[0].label).toBe('Baptism of Jesus');
  });
});
