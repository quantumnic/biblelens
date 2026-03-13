import { describe, it, expect } from 'vitest';

describe('Parables API', () => {
  it('should return parables data structure', async () => {
    // Test the API module can be imported and has correct structure
    const mod = await import('../../src/app/api/parables/route');
    expect(mod.GET).toBeDefined();
    expect(typeof mod.GET).toBe('function');
  });

  it('should handle request with theme filter', async () => {
    const mod = await import('../../src/app/api/parables/route');
    const url = new URL('http://localhost/api/parables?theme=Kingdom');
    const req = new Request(url.toString());
    const res = await mod.GET(req as any);
    const data = await res.json();
    expect(data.parables).toBeDefined();
    expect(data.parables.length).toBeGreaterThan(0);
    for (const p of data.parables) {
      expect(p.theme).toBe('Kingdom');
    }
  });

  it('should return all parables without filter', async () => {
    const mod = await import('../../src/app/api/parables/route');
    const url = new URL('http://localhost/api/parables');
    const req = new Request(url.toString());
    const res = await mod.GET(req as any);
    const data = await res.json();
    expect(data.total).toBeGreaterThanOrEqual(25);
    expect(data.themes.length).toBeGreaterThan(0);
  });
});
