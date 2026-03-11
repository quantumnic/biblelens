import Database from 'better-sqlite3';
import path from 'path';

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!db) {
    const dbPath = path.join(process.cwd(), 'data', 'bible.db');
    db = new Database(dbPath, { readonly: true });
    db.pragma('journal_mode = WAL');
  }
  return db;
}
