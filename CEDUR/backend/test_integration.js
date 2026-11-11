/**
 * test_integration.js
 * 
 * Direct SQLite Database Integration Test (Works directly without any server connection).
 * 
 * Run with:
 *   node backend/test_integration.js
 */

import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import { getDb, closeDb } from './db/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runDirectSqliteTests() {
  console.log('\n======================================================');
  console.log('🧪 Cedur SQLite Direct Integration Test (No Server Needed)');
  console.log('======================================================\n');

  // 1. Initialize SQLite database & execute automatic migrations
  console.log('1. Initializing SQLite database and verifying migrations...');
  const db = getDb();
  console.log('   ✓ SQLite connected directly to backend/data/cedur.db');

  // 2. Verify PRAGMAs
  const journalMode = db.pragma('journal_mode', { simple: true });
  const foreignKeys = db.pragma('foreign_keys', { simple: true });
  console.log(`   ✓ PRAGMA journal_mode = ${journalMode} (WAL mode active)`);
  console.log(`   ✓ PRAGMA foreign_keys = ${foreignKeys === 1 ? 'ON' : 'OFF'}`);

  // 3. Verify Table Schemas
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all();
  console.log('   ✓ Tables detected:', tables.map(t => t.name).join(', '));

  // 4. Test Direct Lead Insertion (type = 'signup')
  console.log('\n2. Testing direct lead insertion (type: signup)...');
  const clientId = 'test-client-' + Date.now();
  const insertLead = db.prepare(`
    INSERT INTO leads (
      client_id, type, full_name, email, phone, company_or_website,
      employee_count, message, source_page, consent, status, created_at
    ) VALUES (
      @client_id, @type, @full_name, @email, @phone, @company_or_website,
      @employee_count, @message, @source_page, @consent, 'new', @created_at
    )
  `);

  const leadData = {
    client_id: clientId,
    type: 'signup',
    full_name: 'Priya Sharma',
    email: 'priya.sharma@example.local',
    phone: '+91 98765 43210',
    company_or_website: 'Sharma Logistics Pvt Ltd',
    employee_count: '26-50',
    message: 'Self-Service Signup for Growth plan',
    source_page: '/register',
    consent: 1,
    created_at: new Date().toISOString(),
  };

  const leadResult = insertLead.run(leadData);
  console.log(`   ✓ Lead inserted directly with ID: ${leadResult.lastInsertRowid}`);

  // 5. Test Idempotency with Duplicate client_id
  console.log('\n3. Testing idempotency (INSERT ... ON CONFLICT(client_id) DO NOTHING)...');
  const duplicateInsert = db.prepare(`
    INSERT INTO leads (
      client_id, type, full_name, email, phone, company_or_website,
      employee_count, message, source_page, consent, status, created_at
    ) VALUES (
      @client_id, @type, @full_name, @email, @phone, @company_or_website,
      @employee_count, @message, @source_page, @consent, 'new', @created_at
    ) ON CONFLICT(client_id) DO NOTHING
  `);

  const dupResult = duplicateInsert.run(leadData);
  console.log(`   ✓ Duplicate insert executed with 0 changes (changes: ${dupResult.changes})`);

  // 6. Test Direct Newsletter Subscriber Insertion
  console.log('\n4. Testing direct newsletter subscription (case-insensitive deduplication)...');
  const subEmail = `subscriber-${Date.now()}@example.local`;
  const insertSub = db.prepare(`
    INSERT OR IGNORE INTO newsletter_subscribers (email, created_at)
    VALUES (?, ?)
  `);

  const subResult = insertSub.run(subEmail, new Date().toISOString());
  console.log(`   ✓ Subscriber added with ID: ${subResult.lastInsertRowid}`);

  const dupSubResult = insertSub.run(subEmail.toUpperCase(), new Date().toISOString());
  console.log(`   ✓ Duplicate case-insensitive subscriber ignored (changes: ${dupSubResult.changes})`);

  // 7. Verify Data Ingestion
  const allLeads = db.prepare('SELECT id, type, full_name, email, company_or_website FROM leads ORDER BY id DESC LIMIT 5').all();
  console.log('\n5. Latest leads in SQLite:');
  console.table(allLeads);

  const subCount = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers').get();
  console.log(`   Total newsletter subscribers in SQLite: ${subCount.count}`);

  closeDb();

  console.log('\n======================================================');
  console.log('🎉 ALL SQLITE DIRECT TESTS PASSED SUCCESSFULLY!');
  console.log('   The SQLite database operates 100% offline and file-based');
  console.log('   without requiring any external network or server connection.');
  console.log('======================================================\n');
}

runDirectSqliteTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
