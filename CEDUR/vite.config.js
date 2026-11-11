import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

/**
 * Direct SQLite Plugin for Vite
 * Allows the website to read/write directly to SQLite (backend/data/cedur.db)
 * without requiring any external server process or connection string.
 */
function sqliteDevPlugin() {
  let db;

  function getDatabase() {
    if (db) return db;
    const dbDir = path.resolve(__dirname, 'backend/data');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    const dbPath = path.join(dbDir, 'cedur.db');
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
    db.pragma('busy_timeout = 5000');

    // Ensure table schemas exist
    db.exec(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version TEXT PRIMARY KEY,
        applied_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id TEXT UNIQUE,
        type TEXT NOT NULL DEFAULT 'contact' CHECK(type IN ('contact', 'demo', 'sales', 'signup')),
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company_or_website TEXT,
        employee_count TEXT,
        message TEXT,
        source_page TEXT,
        consent INTEGER NOT NULL DEFAULT 1,
        status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'closed')),
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE COLLATE NOCASE NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      );
    `);
    return db;
  }

  return {
    name: 'sqlite-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url.startsWith('/api')) {
          return next();
        }

        const url = new URL(req.url, 'http://localhost');
        const pathname = url.pathname;
        const method = req.method;

        // Helper to read JSON body
        const readBody = () =>
          new Promise((resolve) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                resolve(JSON.parse(body || '{}'));
              } catch {
                resolve({});
              }
            });
          });

        // 1. GET /api/health
        if (pathname === '/api/health' && method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'ok',
              database: 'sqlite-direct',
              mode: 'embedded-wal',
              timestamp: new Date().toISOString(),
            })
          );
          return;
        }

        // 2. POST /api/leads or POST /api/contact
        if ((pathname === '/api/leads' || pathname === '/api/contact') && method === 'POST') {
          const body = await readBody();

          // Honeypot check
          if (body.hp_company_title) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Received' }));
            return;
          }

          const fullName = (body.full_name || body.name || '').trim();
          const email = (body.email || '').trim().toLowerCase();
          if (!fullName || !email) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Name and email are required.' }));
            return;
          }

          const allowedTypes = ['contact', 'demo', 'sales', 'signup'];
          const type = allowedTypes.includes(body.type) ? body.type : 'contact';
          const clientId = body.client_id || null;
          const phone = body.phone || null;
          const company = body.company_or_website || body.company || null;
          const employees = body.employee_count || null;
          const message = body.message || null;
          const source = body.source_page || '/';
          const consent = body.consent ? 1 : 0;
          const now = new Date().toISOString();

          try {
            const sqlite = getDatabase();
            const stmt = sqlite.prepare(`
              INSERT INTO leads (
                client_id, type, full_name, email, phone, company_or_website,
                employee_count, message, source_page, consent, status, created_at
              ) VALUES (
                @client_id, @type, @full_name, @email, @phone, @company_or_website,
                @employee_count, @message, @source_page, @consent, 'new', @created_at
              ) ON CONFLICT(client_id) DO NOTHING
            `);

            const result = stmt.run({
              client_id: clientId,
              type,
              full_name: fullName,
              email,
              phone,
              company_or_website: company,
              employee_count: employees,
              message,
              source_page: source,
              consent,
              created_at: now,
            });

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            res.end(
              JSON.stringify({
                success: true,
                id: result.lastInsertRowid,
                message: 'Thank you! Your request has been recorded into SQLite.',
              })
            );
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // 3. POST /api/newsletter
        if (pathname === '/api/newsletter' && method === 'POST') {
          const body = await readBody();
          const email = (body.email || '').trim().toLowerCase();
          if (!email || !email.includes('@')) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Valid email is required.' }));
            return;
          }

          try {
            const sqlite = getDatabase();
            const stmt = sqlite.prepare(`
              INSERT OR IGNORE INTO newsletter_subscribers (email, created_at)
              VALUES (?, ?)
            `);
            stmt.run(email, new Date().toISOString());

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            res.end(JSON.stringify({ success: true, message: 'Thanks for subscribing!' }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // 4. GET /api/admin/leads
        if (pathname === '/api/admin/leads' && method === 'GET') {
          try {
            const sqlite = getDatabase();
            const leads = sqlite.prepare('SELECT * FROM leads ORDER BY id DESC').all();
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ leads }));
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // 5. GET /api/admin/leads.csv
        if (pathname === '/api/admin/leads.csv' && method === 'GET') {
          try {
            const sqlite = getDatabase();
            const leads = sqlite.prepare('SELECT * FROM leads ORDER BY id DESC').all();
            const header = 'id,type,full_name,email,phone,company_or_website,employee_count,message,source_page,consent,status,created_at\n';
            const rows = leads.map(l => [
              l.id,
              l.type,
              `"${(l.full_name || '').replace(/"/g, '""')}"`,
              `"${(l.email || '').replace(/"/g, '""')}"`,
              `"${(l.phone || '').replace(/"/g, '""')}"`,
              `"${(l.company_or_website || '').replace(/"/g, '""')}"`,
              `"${(l.employee_count || '').replace(/"/g, '""')}"`,
              `"${(l.message || '').replace(/"/g, '""')}"`,
              `"${(l.source_page || '').replace(/"/g, '""')}"`,
              l.consent,
              l.status,
              l.created_at
            ].join(',')).join('\n');

            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
            res.end(header + rows);
          } catch (err) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), sqliteDevPlugin()],
  publicDir: 'public',
});