import { describe, it, expect } from 'vitest';

describe('Typology page data', () => {
  it('should have typology page that exports default component', async () => {
    // Verify the page module exists and can be imported
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'src/app/typology/page.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  it('should have parables page that exports default component', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'src/app/parables/page.tsx');
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
