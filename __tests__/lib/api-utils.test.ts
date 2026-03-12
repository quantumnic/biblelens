import { describe, it, expect } from 'vitest';
import { handleApiError, getCached } from '@/lib/api-utils';
import { DatabaseNotAvailableError } from '@/lib/db';

describe('handleApiError', () => {
  it('returns 503 for DatabaseNotAvailableError', () => {
    const error = new DatabaseNotAvailableError('DB missing');
    const response = handleApiError(error);
    expect(response.status).toBe(503);
  });

  it('returns 500 for generic errors', () => {
    const response = handleApiError(new Error('something broke'));
    expect(response.status).toBe(500);
  });

  it('returns 500 for non-Error values', () => {
    const response = handleApiError('string error');
    expect(response.status).toBe(500);
  });
});

describe('getCached', () => {
  it('caches results within TTL', () => {
    let callCount = 0;
    const fn = () => { callCount++; return 'result'; };
    
    const r1 = getCached('test-key-1', 10000, fn);
    const r2 = getCached('test-key-1', 10000, fn);
    
    expect(r1).toBe('result');
    expect(r2).toBe('result');
    expect(callCount).toBe(1);
  });

  it('uses different cache entries for different keys', () => {
    let callCount = 0;
    const fn = () => { callCount++; return callCount; };
    
    const r1 = getCached('key-a', 10000, fn);
    const r2 = getCached('key-b', 10000, fn);
    
    expect(r1).toBe(1);
    expect(r2).toBe(2);
  });
});
