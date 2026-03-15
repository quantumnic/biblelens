import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Research API - Perseus source', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return Perseus results with lexicon links', async () => {
    mockFetch.mockResolvedValue({ ok: true, json: async () => ({}) });

    const { GET } = await import('../../src/app/api/research/route');
    const url = new URL('http://localhost/api/research?q=agape&source=perseus');
    const request = new Request(url);
    const response = await GET(request as any);
    const data = await response.json();

    expect(data.source).toBe('perseus');
    expect(data.results).toBeDefined();
    expect(data.results.length).toBeGreaterThan(0);
    expect(data.results.some((r: any) => r.type === 'lexicon')).toBe(true);
  });
});
