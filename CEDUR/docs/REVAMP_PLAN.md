# Cedur Website Revamp Plan & Documentation

## Overview

The Cedur marketing website has been completely revamped into a clean, modern, multi-page application with an embedded SQLite database, unified indigo/violet design system, offline form resilience, and zero external runtime dependencies.

---

## LOCAL-ONLY RULE (Strict Compliance Audit)

1. **Zero External Domains:**
   - No `href`, redirect, `window.location`, `fetch`, `<iframe>`, `<script>`, image, font, video, canonical tag, or sitemap entry points to `cedurnow.com`, `app.cedurnow.com`, `wa.me`, `linkedin.com`, `instagram.com`, `youtube.com`, `twitter.com`, or `ui-avatars.com`.
   - `public/_redirects` contains only the single local SPA fallback: `/* /index.html 200`.
   - Full repository grep audit for all prohibited domains returns 0 matches in code, markup, styles, configs, and env files.

2. **All Buttons & Actions Stay Local:**
   - **Login** (`/login`): Styled login page with client-side form validation. On submit, displays the exact notice: `"Login is not connected in this local build."`
   - **Signup / Get Started Free** (`/register`): Local registration form that persists to SQLite `leads` table with `type = 'signup'`.
   - **Request a Demo**: Navigates to local route `/contact-us?type=demo`.
   - **Talk to Sales**: Navigates to local route `/contact-us?type=sales`.
   - **Watch Demo**: Plays local video `/videos/demo.mp4` when present, or renders an elegant local fallback placeholder.
   - **Forgot Password**: Triggers local client-side notification.

3. **No Hotlinking & Self-Hosted Assets:**
   - **Typography**: Self-hosted Inter font via `@fontsource/inter` (weights 400, 500, 600, 700, 800) bundled locally into `dist/assets/`. Zero calls to Google Fonts CDN.
   - **Avatars**: Replaced `ui-avatars.com` with styled SVG/CSS initials badges (`GS`, `HV`, `PS`, `RS`) with harmonious background tokens.
   - **Icons**: 100% vector SVGs via `lucide-react`.

4. **Offline Resilience:**
   - Entire website and forms function with Wi-Fi turned off.
   - Form submissions queue automatically into `localStorage` with a UUID `client_id` idempotency key if offline or if API is unreachable.
   - Auto-syncs queued leads when the browser triggers the `online` event or on the next session.

5. **Local Environment Driven:**
   - Frontend reads API base URL from `VITE_API_URL` (default `http://localhost:5000`).
   - Canonical & Open Graph URLs are constructed from `VITE_SITE_URL` (default `http://localhost:5173`).
   - `VITE_APP_URL` has been completely eliminated.

6. **Social Channels & Contact Information:**
   - In `src/data/site.js`, WhatsApp, LinkedIn, Instagram, YouTube, and X are set to `null` by default.
   - Footer and contact widgets conditionally hide social icons when their value is `null`.
   - Support phone (`011-4345-1244`), sales phone (`+91 85959 21201`), and email (`contact@cedur.local`) are editable display text.

---

## Architecture & Changes

### Phase A: Database: MongoDB → SQLite
- **Driver**: `better-sqlite3` (synchronous, embedded in-process database).
- **Location**: `backend/data/cedur.db` (configurable via `SQLITE_PATH` environment variable).
- **Pragmas**: `PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;`
- **Migrations**: Version-controlled migrations in `backend/db/migrations/001_init.sql` tracked in `schema_migrations` table.
- **Mongoose Removal**: Uninstalled `mongoose`, `mongodb`, `bcryptjs`, and `jsonwebtoken`. Removed old models (`Contact.js`, `User.js`) and MongoDB connection strings.
- **Tables**:
  - `leads`: `id, client_id (UNIQUE, nullable), type ('contact'|'demo'|'sales'|'signup'), full_name, email, phone, company_or_website, employee_count, message, source_page, consent (0/1), status ('new'|'contacted'|'closed'), created_at`
  - `newsletter_subscribers`: `id, email (UNIQUE COLLATE NOCASE), created_at`
- **Security & APIs**:
  - `POST /api/leads` (honeypot check, input validation, idempotency via `client_id`)
  - `POST /api/contact` (alias for backwards compatibility)
  - `POST /api/newsletter` (case-insensitive email deduplication)
  - `GET /api/health`
  - `GET /api/admin/leads` and `GET /api/admin/leads.csv` (protected by `Bearer` token matching `ADMIN_TOKEN`)
  - Rate limiting with `express-rate-limit`, security headers via `helmet`, and CORS restricted to `ALLOWED_ORIGINS`.
- **Scripts**:
  - `backend/scripts/import-mongo-export.js`: Standalone migration tool for JSON files produced by `mongoexport --jsonArray`. Supports UTF-8 BOM and does not require MongoDB drivers.
  - `backend/scripts/backup.js`: Creates timestamped online SQLite backups in `backend/backups/`.

### Phase B: Multi-page Structure
- **Routing**: `react-router-dom` v7 with shared `Layout` (Navbar + Footer) and 404 catch-all.
- **Routes**:
  - `/` (Home)
  - `/products` (Products overview grid)
  - `/hr-software` (HR Software for Indian SMEs)
  - `/payroll-software` (Payroll Software for Indian Businesses)
  - `/leave-management-software` (Leave Management Software)
  - `/attendance-management-software` (Attendance Management Software)
  - `/employee-self-service-portal` (Employee Self-Service Portal)
  - `/mobile-app` (HR & Payroll Mobile App)
  - `/expense-management-software` (Expense & Reimbursement Software)
  - `/geofence-attendance-software` (Geofence Attendance Software)
  - `/pricing` (Pricing comparison table & tiers; `/plans` alias)
  - `/about-us` (About story & company milestones; `/about` alias)
  - `/contact-us` (Contact, Support & Request a Demo; `/support`, `/contact` aliases)
  - `/testimonials` (Customer stories & verified metrics)
  - `/faqs` (Categorized FAQ hub)
  - `/blogs` (Educational resources & guides; `/resources` alias)
  - `/login` (Local login UI)
  - `/register` (Local signup request form saving to SQLite `leads`)
  - `/privacy-policy` & `/terms-of-service` (Legal policy placeholders with DPDP Act references)
- **SEO**: Dynamic title, description, canonical link, and Open Graph tags on every route using `react-helmet-async` powered by `SITE_URL`. Generated `public/sitemap.xml` and `public/robots.txt`.
- **Data-Driven Content**: All copy extracted into `src/data/` (`site.js`, `products.js`, `pricing.js`, `testimonials.js`, `faqs.js`, `industries.js`, `navigation.js`, `clients.js`).

### Phase C: Design System & Color Palette
- **Tokens**: Centralized CSS variables in `src/styles/tokens.css` mapped in `tailwind.config.js`.
- **Primary Brand**: Indigo shades (`#EEF2FF` to `#1E1B4B`), primary button `#4F46E5` (hover `#4338CA`).
- **Accent**: Sky blue (`#38BDF8`, `#0EA5E9`, `#0284C7`) and Violet highlights.
- **Surfaces & Night**: `#F5F8FF` page tint, `#FFFFFF` card surfaces, `#1E1B4B` to `#0F172A` night dark footer and sections.
- **Typography & Accessibility**: Inter with tight tracking, WCAG AA 4.5:1 text contrast compliance, visible keyboard focus rings, and `prefers-reduced-motion` animation guards.

### Phase D: Pricing Page Matrix
- **Tier Structure**: Core (₹3,945/mo, ≤25 emp), Growth (₹5,945/mo, ≤50 emp), Veteran (₹9,945/mo, ≤100 emp).
- Formatted with `Intl.NumberFormat('en-IN')`.
- Detailed 11-feature comparison matrix with expandable accordion and FAQ drawer.

---

## 7. Open Questions for the Owner

1. **Plan feature matrix:** Which specific features are included in each tier (Core, Growth, Veteran), and what is the exact ₹ cost per additional employee above tier limits? (Currently marked with `// TODO(owner): confirm` in `src/data/pricing.js`).
2. **Answers for the 4 unanswered pricing FAQs:**
   - *Is there a free trial available?* (Draft answer provided; needs confirmation).
   - *What payment methods do you accept?* (Draft answer provided; needs confirmation).
   - *Are there any hidden fees?* (Draft answer provided; needs confirmation).
   - *What happens if I exceed my employee limit?* (Draft answer provided; needs confirmation).
3. **Inconsistent numbers on the live site:** Hero quotes "200+ companies", pricing CTA quotes "2000+", and home CTA mentions "thousands". We have standardized on **200+** in `site.js` until you confirm the desired metric.
4. **Integration & uptime claims:** Confirm whether the claims *"100+ tool integrations"* and *"99.9% uptime SLA"* should be kept or modified.
5. **Testimonial permissions & metrics:** Confirm whether testimonials from Globe Noble (Mr. Ghanshyam Singh, +40% productivity), Harsh Enterprises (Mr. Harsh Vardhan, +50% efficiency), Banyan Shield Realty (Mr. P Saroha), and Darshika Marketing (Mr. Raj V Singh) are approved for public marketing.
6. **Future production deployment host:** For future deployment (not needed for local use), which host will run the Express backend? (Requires a host with persistent disk storage for `cedur.db`, such as Railway, Render with persistent disks, Fly.io, or VPS).
7. **Legal text:** Replace the provided DPDP Act draft placeholders in `src/pages/PrivacyPolicyPage.jsx` and `src/pages/TermsOfServicePage.jsx` with your official corporate legal policies.
