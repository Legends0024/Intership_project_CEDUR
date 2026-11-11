import express from 'express';
import { getDb } from '../db/db.js';

const router = express.Router();

/**
 * GET /api/health
 * Simple healthcheck that also verifies the DB is reachable.
 */
router.get('/', (_req, res) => {
  try {
    const db = getDb();
    const row = db.prepare("SELECT 1 AS ok").get();
    if (row?.ok === 1) {
      return res.json({ status: 'ok', db: 'connected' });
    }
    return res.status(500).json({ status: 'error', db: 'unreachable' });
  } catch (err) {
    console.error('Health check failed:', err);
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
