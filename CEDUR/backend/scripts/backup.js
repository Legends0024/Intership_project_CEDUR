#!/usr/bin/env node
/**
 * backup.js
 *
 * Uses SQLite's online backup API (via better-sqlite3) to write a
 * timestamped copy of the database to backend/backups/.
 *
 * Usage:
 *   node backend/scripts/backup.js [--db path/to/cedur.db]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const args = process.argv.slice(2);
  let dbPath = path.join(__dirname, '..', 'data', 'cedur.db');

  for (let i = 0; i < args.length; i += 2) {
    if (args[i] === '--db') dbPath = args[i + 1];
  }

  if (!fs.existsSync(dbPath)) {
    console.error(`Database not found at ${dbPath}.`);
    process.exit(1);
  }

  const backupDir = path.join(__dirname, '..', 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `cedur-${timestamp}.db`);

  const db = new Database(dbPath, { readonly: true });
  db.backup(backupPath)
    .then(() => {
      console.log(`✓ Backup saved to ${backupPath}`);
      db.close();
    })
    .catch(err => {
      console.error('Backup failed:', err);
      db.close();
      process.exit(1);
    });
}

main();
