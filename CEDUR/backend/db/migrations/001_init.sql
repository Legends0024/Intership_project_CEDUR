-- 001_init.sql: Initial schema for Cedur marketing site

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
  consent INTEGER NOT NULL DEFAULT 0 CHECK(consent IN (0, 1)),
  status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'contacted', 'closed')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE COLLATE NOCASE,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
