import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../../src/app/api/research/route';
import { NextRequest } from 'next/server';

// Mock fetch for external APIs
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('GET /api/research — extended sources', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns error for missing query', async () => {
    const req = new NextRequest('http://localhost/api/research');
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it('handles openlibrary source', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        numFound: 1,
        docs: [{
          key: '/works/OL123W',
          title: 'Biblical Commentary',
          author_name: ['Scholar A'],
          first_publish_year: 1990,
          subject: ['Bible', 'Commentary'],
          isbn: ['978-0-123-45678-9'],
          number_of_pages_median: 400,
          publisher: ['Academic Press'],
        }],
      }),
    });

    const req = new NextRequest('http://localhost/api/research?q=Genesis+commentary&source=openlibrary');
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.source).toBe('openlibrary');
    expect(data.results).toHaveLength(1);
    expect(data.results[0].title).toBe('Biblical Commentary');
    expect(data.results[0].url).toContain('openlibrary.org');
  });

  it('handles crossref source', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: {
          items: [{
            DOI: '10.1234/test',
            title: ['Biblical Exegesis Study'],
            author: [{ given: 'John', family: 'Smith' }],
            'published-print': { 'date-parts': [[2020]] },
            'container-title': ['Journal of Biblical Studies'],
            abstract: '<p>This is an abstract about biblical exegesis.</p>',
            URL: 'https://doi.org/10.1234/test',
          }],
          'total-results': 1,
        },
      }),
    });

    const req = new NextRequest('http://localhost/api/research?q=biblical+exegesis&source=crossref');
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.source).toBe('crossref');
    expect(data.results).toHaveLength(1);
    expect(data.results[0].title).toBe('Biblical Exegesis Study');
    expect(data.results[0].doi).toBe('10.1234/test');
    expect(data.results[0].abstract).not.toContain('<p>');
  });

  it('handles doaj source', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        total: 1,
        results: [{
          id: 'doaj-123',
          bibjson: {
            title: 'Open Access Biblical Research',
            author: [{ name: 'Dr. Maria Schmidt' }],
            year: '2023',
            journal: { title: 'Journal of Open Theology' },
            abstract: 'An open access study on hermeneutics.',
            identifier: [{ type: 'doi', id: '10.5678/doaj-test' }],
            link: [{ type: 'fulltext', url: 'https://example.com/article' }],
            keywords: ['hermeneutics', 'biblical studies'],
          },
        }],
      }),
    });

    const req = new NextRequest('http://localhost/api/research?q=hermeneutics&source=doaj');
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.source).toBe('doaj');
    expect(data.results).toHaveLength(1);
    expect(data.results[0].title).toBe('Open Access Biblical Research');
    expect(data.results[0].doi).toBe('10.5678/doaj-test');
    expect(data.results[0].keywords).toContain('hermeneutics');
  });

  it('rejects unknown sources with updated message', async () => {
    const req = new NextRequest('http://localhost/api/research?q=test&source=unknown');
    const res = await GET(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain('doaj');
  });
});
