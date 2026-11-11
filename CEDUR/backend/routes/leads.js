import express from 'express';
import { getDb } from '../db/db.js';

const router = express.Router();

/**
 * POST /api/leads
 * Also aliased as POST /api/contact for backwards compatibility.
 *
 * Body: { full_name, email, phone?, company_or_website?, employee_count?,
 *         message?, source_page?, consent?, type?, client_id?, website? }
 *
 * `website` is a honeypot field — if it contains a value the submission is silently discarded.
 * `client_id` is an optional UUID for offline idempotency.
 */
router.post('/', (req, res) => {
  try {
    // Honeypot check
    if (req.body.website) {
      // Bot detected — pretend success
      return res.status(201).json({ message: 'Thank you! We will be in touch.' });
    }

    const {
      full_name,
      // Backwards-compat: old form sent `name` instead of `full_name`
      name,
      email,
      phone,
      company_or_website,
      employee_count,
      message,
      source_page,
      consent,
      type,
      client_id,
    } = req.body;

    const resolvedName = full_name || name;

    // Validation
    if (!resolvedName || typeof resolvedName !== 'string' || resolvedName.trim().length === 0) {
      return res.status(400).json({ message: 'Full name is required.' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    const validTypes = ['contact', 'demo', 'sales', 'signup'];
    const resolvedType = validTypes.includes(type) ? type : 'contact';

    const db = getDb();

    const stmt = db.prepare(`
      INSERT INTO leads (client_id, type, full_name, email, phone, company_or_website, employee_count, message, source_page, consent)
      VALUES (@client_id, @type, @full_name, @email, @phone, @company_or_website, @employee_count, @message, @source_page, @consent)
      ON CONFLICT(client_id) DO NOTHING
    `);

    stmt.run({
      client_id: client_id || null,
      type: resolvedType,
      full_name: resolvedName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      company_or_website: company_or_website?.trim() || null,
      employee_count: employee_count?.toString().trim() || null,
      message: message?.trim() || null,
      source_page: source_page?.trim() || null,
      consent: consent ? 1 : 0,
    });

    return res.status(201).json({ message: 'Thank you! We will be in touch.' });
  } catch (err) {
    console.error('Lead submission error:', err);
    return res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
});

export default router;
