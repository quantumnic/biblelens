import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockPrepare = vi.fn();
vi.mock('@/lib/db', () => ({
  getDb: () => ({ prepare: mockPrepare }),
  isDatabaseAvailable: () => true,
  DatabaseNotAvailableError: class extends Error { name = 'DatabaseNotAvailableError'; },
}));

describe('/api/reading-stats', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('returns reading stats for a specific book', async () => {
    mockPrepare.mockReturnValue({
      all: vi.fn()
        .mockReturnValueOnce([{ chapter: 1 }, { chapter: 2 }]) // chapters query
        .mockReturnValueOnce([{ text: 'In the beginning God created the heaven and the earth.' }]) // ch1 verses
        .mockReturnValueOnce([{ text: 'And the earth was without form, and void.' }]) // ch2 verses
    });

    const { GET } = await import('@/app/api/reading-stats/route');
    const req = new Request('http://localhost/api/reading-stats?book=1');
    const res = await GET(req as any);
    const data = await res.json();
    expect(data.chapters).toBeDefined();
    expect(data.chapters.length).toBe(2);
    expect(data.chapters[0]).toHaveProperty('wordCount');
    expect(data.chapters[0]).toHaveProperty('gradeLevel');
    expect(data.chapters[0]).toHaveProperty('readingEase');
  });

  it('returns overview stats without book param', async () => {
    mockPrepare.mockReturnValue({
      all: vi.fn()
        .mockReturnValueOnce([{ book: 1 }]) // books query
        .mockReturnValueOnce([{ text: 'In the beginning God created the heaven and the earth.' }]) // book1 verses
    });

    const { GET } = await import('@/app/api/reading-stats/route');
    const req = new Request('http://localhost/api/reading-stats');
    const res = await GET(req as any);
    const data = await res.json();
    expect(data.books).toBeDefined();
    expect(data.books.length).toBe(1);
    expect(data.books[0]).toHaveProperty('gradeLevel');
  });
});
