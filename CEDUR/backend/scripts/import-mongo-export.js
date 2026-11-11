#!/usr/bin/env node
/**
 * import-mongo-export.js
 *
 * Reads JSON files produced by `mongoexport --jsonArray` and inserts them
 * into the SQLite database.  Does NOT depend on the MongoDB driver.
 *
 * Usage:
 *   node backend/scripts/import-mongo-export.js --contacts path/to/contacts.json
 *
 * Flags:
 *   --contacts <file>    Import old Contact documents into the `leads` table
 *   --db <path>          Path to the SQLite database (defaults to backend/data/cedur.db)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    opts[key] = args[i + 1];
  }
  return opts;
}

function main() {
  const opts = parseArgs();
  const dbPath = opts.db || path.join(__dirname, '..', 'data', 'cedur.db');

  if (!opts.contacts) {
    console.log('Usage: node import-mongo-export.js --contacts <file.json> [--db <path>]');
    process.exit(1);
  }

  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}. Start the backend once first to create it.`);
    process.exit(1);
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // --contacts
  if (opts.contacts) {
    const raw = fs.readFileSync(opts.contacts, 'utf-8').replace(/^\uFEFF/, '');
    const docs = JSON.parse(raw);
    console.log(`Importing ${docs.length} contact(s) into leads…`);

    const insert = db.prepare(`
      INSERT INTO leads (full_name, email, message, source_page, type, created_at)
      VALUES (@full_name, @email, @message, 'import', 'contact', @created_at)
    `);

    const importAll = db.transaction((items) => {
      let count = 0;
      for (const doc of items) {
        try {
          insert.run({
            full_name: doc.name || 'Unknown',
            email: doc.email || 'unknown@import',
            message: doc.message || null,
            created_at: doc.createdAt?.$date
              ? new Date(doc.createdAt.$date).toISOString()
              : doc.createdAt
                ? new Date(doc.createdAt).toISOString()
                : new Date().toISOString(),
          });
          count++;
        } catch (err) {
          console.warn(`  ⚠ Skipped: ${err.message}`);
        }
      }
      return count;
    });

    const imported = importAll(docs);
    console.log(`  ✓ Imported ${imported} contact(s).`);
  }

  db.close();
  console.log('Done.');
}

main();
