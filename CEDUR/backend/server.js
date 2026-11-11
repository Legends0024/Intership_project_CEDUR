import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { getDb, closeDb } from './db/db.js';
import leadsRouter from './routes/leads.js';
import newsletterRouter from './routes/newsletter.js';
import healthRouter from './routes/health.js';
import adminRouter from './routes/admin.js';

dotenv.config();

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------
const app = express();

// ---------------------------------------------------------------------------
// Security
// ---------------------------------------------------------------------------
app.use(helmet());

// CORS — restrict to allowed origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:4173']; // Vite dev + preview

app.use(cors({
  origin(origin, callback) {
    // Allow requests with no origin (curl, server-to-server, mobile apps)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
}));

// Body parsing
app.use(express.json({ limit: '256kb' }));

// Rate limiting for form endpoints
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 30,                   // 30 submissions per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many submissions. Please try again later.' },
});

// ---------------------------------------------------------------------------
// Initialise SQLite (creates DB file + runs migrations on first call)
// ---------------------------------------------------------------------------
getDb();

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use('/api/leads', formLimiter, leadsRouter);
app.use('/api/contact', formLimiter, leadsRouter);   // Backwards-compatible alias
app.use('/api/newsletter', formLimiter, newsletterRouter);
app.use('/api/health', healthRouter);
app.use('/api/admin', adminRouter);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Cedur backend running on port ${PORT}`);
});

// Graceful shutdown
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`\n${signal} received — shutting down…`);
    closeDb();
    process.exit(0);
  });
}
