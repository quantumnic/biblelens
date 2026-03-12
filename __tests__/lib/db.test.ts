import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import fs from 'fs';

// Reset module between tests
beforeEach(() => {
  vi.resetModules();
});

describe('db module', () => {
  it('isDatabaseAvailable returns false when DB does not exist', async () => {
    // Use a temp dir
    const origCwd = process.cwd;
    process.cwd = () => '/tmp/nonexistent-test-dir';
    
    const { isDatabaseAvailable } = await import('@/lib/db');
    expect(isDatabaseAvailable()).toBe(false);
    
    process.cwd = origCwd;
  });

  it('getDb throws DatabaseNotAvailableError when DB missing', async () => {
    const origCwd = process.cwd;
    process.cwd = () => '/tmp/nonexistent-test-dir-2';
    
    const { getDb, DatabaseNotAvailableError } = await import('@/lib/db');
    expect(() => getDb()).toThrow(DatabaseNotAvailableError);
    
    process.cwd = origCwd;
  });

  it('DatabaseNotAvailableError has correct name', async () => {
    const { DatabaseNotAvailableError } = await import('@/lib/db');
    const err = new DatabaseNotAvailableError('test');
    expect(err.name).toBe('DatabaseNotAvailableError');
    expect(err.message).toBe('test');
    expect(err instanceof Error).toBe(true);
  });
});
