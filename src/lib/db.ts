import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

let db: Database.Database | null = null;

export function getDbPath(): string {
  return path.join(process.cwd(), 'data', 'bible.db');
}

export function isDatabaseAvailable(): boolean {
  const dbPath = getDbPath();
  return fs.existsSync(dbPath);
}

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = getDbPath();
    const dir = path.dirname(dbPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(dbPath)) {
      throw new DatabaseNotAvailableError(
        'Database not found. Run "npm run seed" to populate the database.'
      );
    }
    db = new Database(dbPath, { readonly: true });
    db.pragma('journal_mode = WAL');
  }
  return db;
}

export class DatabaseNotAvailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseNotAvailableError';
  }
}
