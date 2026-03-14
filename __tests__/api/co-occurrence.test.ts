import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock db
vi.mock('@/lib/db', () => ({
  isDatabaseAvailable: vi.fn(() => true),
  getDb: vi.fn(() => ({
    prepare: vi.fn(() => ({
      all: vi.fn(() => [
        { text: 'For God so loved the world that he gave his only begotten Son' },
        { text: 'God is love and he that dwelleth in love dwelleth in God' },
        { text: 'The Lord God made the heavens and the earth' },
      ]),
    })),
  })),
}));

describe('GET /api/co-occurrence', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return co-occurrences for a word', async () => {
    const { GET } = await import('../../src/app/api/co-occurrence/route');
    const req = new Request('http://localhost/api/co-occurrence?word=god');
    const res = await GET(req as any);
    const data = await res.json();
    expect(data.word).toBe('god');
    expect(data.totalVerses).toBeGreaterThan(0);
    expect(Array.isArray(data.coOccurrences)).toBe(true);
  });

  it('should require word parameter', async () => {
    const { GET } = await import('../../src/app/api/co-occurrence/route');
    const req = new Request('http://localhost/api/co-occurrence');
    const res = await GET(req as any);
    expect(res.status).toBe(400);
  });
});
