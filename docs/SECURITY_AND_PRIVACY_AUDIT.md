# Navya Ed Tech — Security, Privacy, and Production Hardening Audit

**Audit Version:** 1.0 (Defensive Audit & Production Hardening)  
**Date:** September 2026  
**Target Architecture:** React 19 + TypeScript (Vite SPA with Static Site Prerendering), Supabase (PostgreSQL 15 with Row Level Security & GoTrue Auth), Vercel Serverless Edge Hosting.  
**Scope:** Defensive code audit, database policies, administrative protection, environment isolation, privacy governance, and production deployment checklist.

---

## 1. Executive Summary

This security and privacy review was conducted to assess the security posture of the **Navya Ed Tech** web application and production infrastructure. The assessment verified frontend client bundles, database access policies, form endpoint abuse protection, session handling, error resilience, and privacy compliance for an educational enterprise in Kathmandu, Nepal.

### Overall Assessment
- **Client Bundle Safety:** **PASSED**. No service-role keys, database passwords, or master secrets are present in client bundles or public repositories.
- **Data Layer Authorization (RLS):** **PASSED & HARDENED**. PostgreSQL Row Level Security (RLS) is strictly enforced on all public tables. Anonymous users cannot query prospective student inquiries or unapproved testimonials.
- **Abuse & Bot Mitigation:** **PASSED**. Multi-layered anti-spam defenses: hidden honeypot traps, client-side input sanitization, length boundaries, and 30-second duplicate throttle.
- **HTTP Security Headers:** **REMEDIATED & HARDENED**. Comprehensive Content Security Policy (CSP), HSTS, X-Frame-Options, Referrer-Policy, and Permissions-Policy configured via `vercel.json`.
- **Runtime Error Containment:** **REMEDIATED**. Implemented defensive React `ErrorBoundary` preventing cascading UI unmounts and eliminating stack trace / sensitive path leakage.
- **Privacy & Statutory Compliance:** **EXPANDED**. Formalized policies for Minors' Data Protection (under 18), Student Media / Testimonial Consent (`consentConfirmed`), and infrastructure telemetry under Nepal's *Individual Privacy Act, 2075*.

---

## 2. Vulnerability Findings, Severity & Remediation Matrix

| ID | Component | Vulnerability / Finding | Severity | Status | Remediation Applied |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | Vercel Deployment | Missing HTTP security headers (Clickjacking, HSTS, MIME sniffing, CSP) | **High** | **FIXED** | Configured `X-Frame-Options: DENY`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, and strict `Content-Security-Policy` in `vercel.json`. |
| **SEC-02** | Runtime Resilience | Absence of top-level Error Boundary risking white-screen crashes and internal error trace leakage | **Medium** | **FIXED** | Implemented `ErrorBoundary.tsx` wrapping public and administrative routes with sanitized diagnostic codes and user recovery actions. |
| **SEC-03** | SSG Prerenderer | Potential script breakout in inline `<script type="application/ld+json">` | **Low** | **FIXED** | Escaped `<` to `\u003c` and `>` to `\u003e` across all structured data payloads in `scripts/prerender.ts`. |
| **SEC-04** | Supabase Storage | `schema.sql` media bucket allowed only images (5MB), conflicting with official syllabus PDF uploads (25MB) | **Medium** | **FIXED** | Updated `schema.sql` bucket configuration to allow `application/pdf` with a 25MB limit while preserving strict admin-only mutation RLS policies. |
| **SEC-05** | Privacy Governance | Incomplete disclosures for minors' data (youth coding), student media consent, and server telemetry | **Medium** | **FIXED** | Added Sections 7, 8, and 9 to `Privacy.tsx` detailing parental consent, testimonial consent revocability, and non-commercial bot telemetry. |
| **SEC-06** | Administrative Auth | Risk of unauthorized registrations if Supabase public signups are left enabled | **Medium** | **DOCUMENTED** | Established operational checklist to disable public signups in Supabase project settings. |

---

## 3. Architecture Security Deep Dive

### 3.1 Frontend & Bundle Security
1. **Client Credential Isolation:**
   - The application relies solely on `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
   - The `VITE_SUPABASE_ANON_KEY` is a signed JWT with the `anon` public role claim. It possesses zero administrative privileges and can only perform actions explicitly granted by PostgreSQL Row Level Security.
   - The master `SUPABASE_SERVICE_ROLE_KEY` is never included in frontend code, build scripts, or repository commits.
2. **Bundle Code Splitting:**
   - Administrative portal code (`/admin/*`) is dynamically lazy-loaded using `React.lazy()` (`dist/assets/AdminRoutes-*.js`). Public visitors never download administrative interface components.
3. **External Link Safety:**
   - All outbound anchor tags (`target="_blank"`) enforce `rel="noopener noreferrer"` across the entire codebase to prevent reverse tab-napping and window opener tampering.
4. **Safe DOM Rendering:**
   - The codebase avoids `dangerouslySetInnerHTML` and raw `innerHTML` injections entirely. React's automatic string escaping safely renders all dynamic data.

### 3.2 Database & Supabase Row Level Security (RLS)
Every table in the Supabase schema has RLS enabled (`alter table <name> enable row level security;`):

| Table | Public Access (`anon`) | Authenticated Access (`admin`) | Security Architecture Notes |
| :--- | :--- | :--- | :--- |
| `courses` | `SELECT` (published/upcoming only) | `ALL` (full CRUD) | Drafts and archived courses are invisible to public visitors. |
| `programs` | `SELECT` | `ALL` (full CRUD) | Read-only catalog data. |
| `student_projects` | `SELECT` | `ALL` (full CRUD) | Read-only showcase data. |
| `insights` | `SELECT` (published only) | `ALL` (full CRUD) | Draft blog articles are isolated from public queries. |
| `inquiries` | `INSERT` only (`with check (true)`) | `SELECT`, `UPDATE`, `DELETE` | **Zero Public Read Access.** Anonymous visitors cannot query, list, modify, or delete existing admissions inquiries. |
| `testimonials` | `SELECT` (`Approved` & `consentConfirmed = true`) | `ALL` (full CRUD) | **Consent Enforcement.** Student reviews cannot appear publicly without both admin approval and verified student consent. |
| `storage.objects` | `SELECT` (bucket `media`) | `INSERT`, `UPDATE`, `DELETE` | Public download of authorized media; only authenticated admins can upload, replace, or delete files. |

### 3.3 Form Submission & Abuse Mitigation
Admissions and contact inquiries are processed through `src/lib/inquiryService.ts` with multi-layered defense:
- **Honeypot Trap (`website_hp`):** Hidden from screen readers and legitimate users. If filled by automated bots, submissions are silently acknowledged without forwarding to the database.
- **Input Sanitization:** Strips non-printable ASCII control characters (`\u0000-\u001F`) and enforces strict field lengths (Name: 100 chars, Email: 120 chars, Phone: 30 chars, Message: 2,500 chars).
- **Regex Validation:** Enforces RFC-compliant email formatting and 7–15 digit phone validation.
- **Duplicate Throttling:** In-memory submission cache blocks identical submissions within 30 seconds.
- **Offline Reliability Failsafe:** Inquiries are safely queued in local browser storage if the database is unreachable, with instant WhatsApp and Email fallback channels to guarantee zero student data loss.

### 3.4 Admin Authentication & Session Security
- **Authentication Provider:** Supabase GoTrue authentication utilizing standard bcrypt password hashing and short-lived JWTs.
- **Brute-Force Rate Limiting:** Client login enforces a 5-attempt limit with a 60-second lockout timer in `sessionStorage` and automated password clearing upon failed attempts.
- **Session Lifecycle:** Tokens are refreshed automatically in browser memory; unauthenticated users trying to access `/admin/*` are intercepted by `<ProtectedRoute>` and redirected to `/admin/login`.

---

## 4. Privacy & Regulatory Alignment

### 4.1 Statutory Context in Nepal
The website operates under the jurisdiction of the **Individual Privacy Act, 2075 (2018)** and the **Electronic Transactions Act, 2063 (2008)** of Nepal:
1. **Notice & Purpose Specification:** Data collected (name, contact phone, email, course preference) is strictly used for educational advisory, batch scheduling, and capstone certification.
2. **Minors' Data (Under 18):** Students under 18 enrolled in coding bootcamps require parental or guardian consent. Parents retain the unconditional right to request inspection or deletion of student records.
3. **Student Media & Testimonial Consent:** Student capstone repositories, portraits, and quotes require affirmative written/digital consent (`testimonials.consentConfirmed`). Students can revoke consent at any time, requiring asset removal within 7 business days.
4. **Data Retention Policy:** Prospective student inquiries that do not result in active enrollment are retained for 12 months for counseling follow-up, after which they are purged.
5. **No Third-Party Tracking Pixels:** The website uses zero third-party commercial surveillance trackers or cross-domain ad retargeting pixels.

> [!NOTE]
> Formal legal terms should be reviewed periodically by licensed Nepalese legal counsel for statutory compliance as cyber laws evolve.

---

## 5. Pre-Deployment Security Checklist

Before deploying updates to production, verify each item:

### Environment Variables & Secrets
- [x] **No Private Keys in Git:** `.env*` is listed in `.gitignore` (only `.env.example` committed).
- [x] **Client Environment Scoping:** Only `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, and `VITE_SITE_URL` are prefixed with `VITE_`.
- [x] **No Service Role Keys in Frontend:** Master database keys (`service_role`) are never deployed to Vercel environment variables for client builds.

### Supabase Project Configuration (Host Level)
- [ ] **Disable Public Signups:** In Supabase Dashboard -> **Authentication** -> **Providers** -> **Email**, disable "Enable Signups" so uninvited visitors cannot create authenticated accounts.
- [ ] **Enforce RLS:** Ensure all tables in `supabase/schema.sql` have been executed with RLS enabled.
- [ ] **Storage Bucket Permissions:** Ensure `media` bucket has public read enabled, with write/delete restricted to `authenticated`.
- [ ] **Automated Database Backups:** Verify Supabase automated daily PITR (Point-in-Time Recovery) or scheduled backups are active.

### HTTP & Edge Configuration
- [x] **Security Headers Active:** `vercel.json` contains CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy.
- [x] **Asset Caching:** Static hashed assets in `/assets/*` have 1-year immutable caching.
- [x] **HTTPS Enforcement:** Vercel automatically terminates TLS 1.3 and redirects HTTP to HTTPS.

### Build Verification & Rollback Plan
- [x] **Zero Vulnerabilities:** `npm audit` verified 0 vulnerabilities across all dependencies.
- [x] **TypeScript Validation:** `npm run lint` compiles cleanly with zero type errors.
- [x] **Static Generation:** `npm run build` generates all 26 static marketing routes and administrative fallback shells.
- [ ] **Rollback Procedure:** In the Vercel Dashboard -> **Deployments**, any previous production deployment can be restored instantly with one click ("Promote to Production") in case of edge anomalies.
