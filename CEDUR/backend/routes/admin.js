import express from 'express';
import { getDb } from '../db/db.js';

const router = express.Router();

/**
 * Middleware: verify ADMIN_TOKEN bearer token.
 */
function requireAdmin(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return res.status(503).json({ message: 'Admin access is not configured.' });
  }

  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${token}`) {
    return res.status(401).json({ message: 'Unauthorized.' });
  }

  next();
}

/**
 * GET /api/admin/leads
 * Returns all leads as JSON.
 */
router.get('/leads', requireAdmin, (_req, res) => {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    return res.json(rows);
  } catch (err) {
    console.error('Admin leads error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

/**
 * GET /api/admin/leads.csv
 * Returns all leads as a CSV download.
 */
router.get('/leads.csv', requireAdmin, (_req, res) => {
  try {
    const db = getDb();
    const rows = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();

    if (rows.length === 0) {
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
      return res.send('No leads yet.\n');
    }

    const headers = Object.keys(rows[0]);
    const csvRows = [
      headers.join(','),
      ...rows.map(row =>
        headers.map(h => {
          const val = row[h] ?? '';
          // Escape double quotes and wrap in quotes if value contains comma, newline, or quote
          const str = String(val);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(',')
      ),
    ];

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="leads.csv"');
    return res.send(csvRows.join('\n') + '\n');
  } catch (err) {
    console.error('Admin leads CSV error:', err);
    return res.status(500).json({ message: 'Server error.' });
  }
});

export default router;
