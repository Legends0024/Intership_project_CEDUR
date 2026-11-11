import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'cedur.db');
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

let db;

/**
 * Initialise and return the SQLite database instance.
 * Safe to call multiple times — returns the existing handle after the first call.
 */
export function getDb() {
  if (db) return db;

  // Ensure the data directory exists
  const dataDir = path.dirname(DB_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  db = new Database(DB_PATH);

  // Performance & safety pragmas
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');
  db.pragma('busy_timeout = 5000');

  // Run pending migrations
  runMigrations(db);

  return db;
}

/**
 * Simple file-based migration runner.
 * Tracks applied migrations in a `schema_migrations` table.
 * Files must be named NNN_description.sql (sorted lexicographically).
 */
function runMigrations(database) {
  // Create the tracking table if it doesn't exist
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);

  const applied = new Set(
    database.prepare('SELECT version FROM schema_migrations').all().map(r => r.version)
  );

  if (!fs.existsSync(MIGRATIONS_DIR)) return;

  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql'))
    .sort();

  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf-8');

    const migrate = database.transaction(() => {
      database.exec(sql);
      database.prepare('INSERT INTO schema_migrations (version) VALUES (?)').run(file);
    });

    migrate();
    console.log(`  ✓ Applied migration: ${file}`);
  }
}

/**
 * Close the database connection (for graceful shutdown).
 */
export function closeDb() {
  if (db) {
    db.close();
    db = undefined;
  }
}
