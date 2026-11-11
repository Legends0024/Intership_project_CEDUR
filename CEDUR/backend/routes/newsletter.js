import express from 'express';
import { getDb } from '../db/db.js';

const router = express.Router();

/**
 * POST /api/newsletter
 * Body: { email }
 */
router.post('/', (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    const db = getDb();
    const stmt = db.prepare(`
      INSERT INTO newsletter_subscribers (email) VALUES (@email)
      ON CONFLICT(email) DO NOTHING
    `);

    stmt.run({ email: email.trim().toLowerCase() });

    return res.status(201).json({ message: 'Thanks for subscribing!' });
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

export default router;
