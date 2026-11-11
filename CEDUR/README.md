# 💼 Cedur — HR & Payroll SaaS for Indian SMEs

> **Tagline:** Outthink | Outwork | Outlast  
> **Environment:** Local Development (Runs 100% offline on localhost)

Cedur is a modern, cloud-based HR and payroll platform engineered specifically for Indian SMEs, startups, and growing enterprises. It automates employee onboarding, zero-hardware GPS geofenced attendance, leave policies, and 2-click payroll with 100% compliance across Indian statutory regulations (EPF, ESI, TDS under Old & New Regimes, and multi-state Professional Tax).

---

## 🌟 Key Highlights & Architecture

### 1. Multi-Page Architecture
- **Framework:** React 18 + Vite 7 + React Router v7 + React Helmet Async
- **Design System:** Indigo-violet brand design tokens (`src/styles/tokens.css`), Tailwind CSS, Plus Jakarta Sans & Inter typography, and Lucide icons.
- **8 Dedicated Product Deep-Dives:**
  - `/hr-software` — Employee records, digital KYC & document vaults
  - `/payroll-software` — 2-click payroll with 100% statutory compliance
  - `/leave-management-software` — Configurable leave accruals & holiday calendars
  - `/attendance-management-software` — Shift scheduling, late grace rules & live dashboards
  - `/employee-self-service-portal` — 24/7 payslip downloads & tax declarations
  - `/mobile-app` — Lightweight native Android app for on-the-go teams
  - `/expense-management-software` — Receipt bill snaps & payroll reimbursements
  - `/geofence-attendance-software` — Zero-hardware GPS virtual boundary check-ins
- **Core Pages:**
  - `/` (Home with live interactive process tabs, metrics & client logos)
  - `/products` (Full suite overview)
  - `/pricing` / `/plans` (Interactive employee calculator, Core/Growth/Veteran plans, comparison matrix & billing FAQs)
  - `/about` / `/about-us` (Mission, company ethos & Made in India commitment)
  - `/support` / `/contact` (Live inquiries form, Delhi office phone `011-4345-1244`, sales `+91 85959 21201`, WhatsApp)
  - `/testimonials` (Verified case studies with productivity & efficiency metrics)
  - `/faqs` (Searchable knowledge base with category filters)
  - `/blogs` / `/resources` (Practical guides on Indian payroll compliance & tax regimes)
  - `/privacy-policy` & `/terms-of-service` (Indian legal framework & data residency)
  - `*` (Custom 404 page)

### 2. SQLite Backend (Replacing MongoDB)
- **Engine:** `better-sqlite3` with WAL mode enabled (`PRAGMA journal_mode = WAL`) and foreign key constraints.
- **Security:** Helmet HTTP headers, CORS origin restrictions, and Express rate limiting on public forms.
- **Offline Tolerance:** Lead and demo forms generate idempotent `client_id`s, queue requests in localStorage when offline, and automatically flush them when connectivity returns.
- **API Endpoints:**
  - `POST /api/leads` (or `/api/contact`) — Honeypot-protected lead & demo capture
  - `POST /api/newsletter` — Newsletter subscription with email validation
  - `GET /api/health` — System and database connectivity check
  - `GET /api/admin/leads` — Secure leads list (requires `Authorization: Bearer <ADMIN_TOKEN>`)
  - `GET /api/admin/leads.csv` — Full RFC-4180 CSV leads export for sales & CRM
- **Scripts:**
  - `backend/scripts/import-mongo-export.js` — Imports legacy mongoexport JSON dumps without needing MongoDB
  - `backend/scripts/backup.js` — Non-blocking online SQLite database backup tool

---

## 📁 Repository Structure

```
CEDUR/
├── backend/
│   ├── data/
│   │   └── cedur.db           # SQLite database file (WAL mode, gitignored)
│   ├── db/
│   │   ├── db.js              # SQLite connection & migration runner
│   │   └── migrations/
│   │       └── 001_init.sql   # Initial schema (leads, newsletter, migrations)
│   ├── routes/
│   │   ├── admin.js           # Admin leads & CSV download routes
│   │   ├── health.js          # Health check endpoint
│   │   ├── leads.js           # Lead submission endpoint with honeypot & idempotency
│   │   └── newsletter.js     # Newsletter subscription endpoint
│   ├── scripts/
│   │   ├── backup.js          # Online SQLite backup script
│   │   └── import-mongo-export.js # MongoDB export migration utility
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express entry point
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml            # Full XML sitemap
│   └── images/
├── src/
│   ├── components/
│   │   ├── layout/            # Navbar (floating island), Footer, Layout wrapper
│   │   ├── sections/          # Hero, FeatureCards, ProcessTabs, ProductGrid, etc.
│   │   └── ui/                # Button, Badge, Modal, WatchDemoModal, RequestDemoModal, SEO
│   ├── data/                  # site.js, navigation.js, products.js, pricing.js, testimonials.js, faq.js, clients.js
│   ├── lib/                   # api.js (offline sync client), utils.js (formatINR, cn)
│   ├── pages/                 # Route pages (Home, Products, Pricing, About, Support, etc.)
│   ├── styles/
│   │   └── tokens.css         # CSS variables & design tokens
│   ├── App.jsx                # Router & route definitions
│   ├── config.js              # Environment & external URL configuration
│   ├── index.css              # Base styles & typography
│   └── main.jsx
├── .env.example
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- Node.js (v18+)
- npm

### 2. Frontend Setup
```bash
# From CEDUR root:
npm install
npm run dev
```
The website will run at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The Express backend will run at `http://localhost:5000` and automatically create `backend/data/cedur.db` with all tables migrated.

### 4. Admin Leads Export
You can view or download leads captured by the forms using your admin bearer token:
```bash
# View JSON:
curl -H "Authorization: Bearer dev-cedur-admin-secret" http://localhost:5000/api/admin/leads

# Download CSV:
curl -H "Authorization: Bearer dev-cedur-admin-secret" http://localhost:5000/api/admin/leads.csv -o leads.csv
```

---

## 🛡️ License & Copyright
© 2026 Cedur Enterprises Private Limited. All Rights Reserved.
Made in India 🇮🇳
