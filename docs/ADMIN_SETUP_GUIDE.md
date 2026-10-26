# Navya EdTech — Admin & Content Management Setup Guide

This guide outlines the architecture, environment variables, security rules, and operational workflows for the **Module 10: Admin & Content Management System** of Navya EdTech.

---

## 1. Architecture & Justified Scope (Level 2)

Following the principle of minimum viable complexity that solves the institutional requirements, Navya EdTech uses a **Level 2 — Basic Content Management System**:

- **Frontend Console:** React 19 + TypeScript + Tailwind CSS running in the secure `/admin` route namespace.
- **Backend-as-a-Service:** Supabase (PostgreSQL with Row Level Security, GoTrue Authentication, and Object Storage).
- **Authentication & Authorization:** GoTrue session tokens verified server-side with strict PostgreSQL Row Level Security (RLS) policies.
- **Zero Student LMS Bloat:** Intentionally does not implement student portals, homework graders, or payment processing in this module, keeping the attack surface minimal and focused purely on content authoring, inquiry triage, and authentic proof-of-work publishing.

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env.local` for local development or configure in your deployment platform (Vercel, Cloudflare, etc.).

| Environment Variable | Scope | Description | Sensitive? |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | Client / Vite | Your Supabase project URL (e.g. `https://xyz.supabase.co`) | No (Public domain) |
| `VITE_SUPABASE_ANON_KEY` | Client / Vite | Public anon key (protected by RLS policies in PostgreSQL) | Safe with RLS |
| `VITE_SITE_URL` | Client / Vite | Canonical base URL (e.g. `https://navyaedutech.com`) | No |
| `SUPABASE_SERVICE_ROLE_KEY` | Server / CI Only | Master key with full database bypass | **CRITICAL: NEVER EXPOSE IN CLIENT CODE OR GIT** |

> [!CAUTION]
> **Never commit `.env.local` or any file containing `service_role` keys.** The client application strictly uses `VITE_SUPABASE_ANON_KEY`. All administrative mutations depend on PostgreSQL RLS evaluating `auth.role() = 'authenticated'`.

---

## 3. Database Schema & RLS Policy Migration

Apply the SQL migration located at `supabase/schema.sql` via the **Supabase Dashboard SQL Editor** or via Supabase CLI (`supabase db push`).

### Summary of Schema Updates:
1. **`courses` Table:**
   - Added `status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'upcoming', 'archived'))`.
   - Updated RLS: Anonymous public users can only SELECT `status = 'published'` or `status = 'upcoming'`. Authenticated admins have full SELECT, INSERT, UPDATE, DELETE privileges.
2. **`insights` Table:**
   - Added `status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived'))`.
   - Added `seoTitle VARCHAR(255)` and `seoDescription TEXT`.
   - Updated RLS: Anonymous public users can only SELECT `status = 'published'`. Authenticated admins have full privileges.
3. **`testimonials` Table:**
   - Columns: `id`, `studentName`, `cohortOrCourse`, `role`, `company`, `avatar`, `quote`, `rating`, `consentConfirmed`, `consentDate`, `verificationNotes`, `status`, `featured`, `createdAt`, `updatedAt`.
   - Trigger: `handle_updated_at()` auto-updates timestamp.
   - RLS Policy: Public read is restricted to `status = 'Approved' AND "consentConfirmed" = true`.
   - Anonymous insert/update/delete is blocked. Only authenticated admins can review, approve, or hide reviews.
4. **`inquiries` Table:**
   - RLS Policy: Public can INSERT inquiries (from contact and advisor modals). Only authenticated admins can SELECT, UPDATE status/notes, or purge expired records.

---

## 4. Admin User Creation & Onboarding

To grant administrative access to staff:

1. Navigate to **Supabase Dashboard** > **Authentication** > **Users**.
2. Click **Add User** > **Create User**.
3. Enter the institutional staff email (e.g., `academic.director@navyaedutech.com`) and a strong, high-entropy password (minimum 12 characters).
4. Check **Auto Confirm User** so email confirmation isn't blocked by email dispatch limits.
5. Provide the staff member with the login URL: `https://your-domain.com/admin/login`.

---

## 5. Security Hardening & Defenses

### 5.1 Client-Side Brute-Force Rate Limiting
- The `/admin/login` portal monitors failed login attempts.
- If **5 consecutive failed attempts** occur, the form triggers a **60-second countdown lockout**.
- During lockout, the submit button is disabled with a real-time countdown timer, and password inputs are instantly cleared.
- State is preserved in browser `sessionStorage` preventing trivial page reloads from bypassing the cooldown.

### 5.2 Server-Side Authorization (PostgreSQL RLS)
- No frontend-only access control. Even if an attacker inspects JavaScript bundles or sends crafted cURL requests directly to the Supabase REST endpoint:
  ```bash
  # Attempting to delete or update without admin JWT will result in 401/403 or 0 rows modified
  curl -X PATCH "https://xyz.supabase.co/rest/v1/courses?id=eq.1" \
    -H "apikey: <ANON_KEY>" \
    -d '{"title": "Hacked"}'
  # Returns: HTTP 403 Forbidden or empty affected set
  ```

### 5.3 Media Upload Constraints
- Course hero images, insight headers, and student avatars support direct cloud uploads with strict validation:
  - Allowed types: `image/jpeg`, `image/png`, `image/webp`.
  - Max file size: **2 MB**.
  - Supabase Storage bucket `media` is configured with public read access but upload restrictions requiring authenticated admin tokens.

### 5.4 Anti-Fabrication Testimonial Safeguard
- In compliance with institutional integrity standards, testimonials cannot be approved without:
  1. A signed student consent authorization on file (`consentConfirmed: true`).
  2. Recording the consent date (`consentDate`).
  3. Mentor verification notes confirming capstone defense (`verificationNotes`).
- Public queries filter strictly for approved and consent-verified records, preventing accidental publication of draft or unverified notes.

### 5.5 Institutional Data Retention Policy
- Admissions inquiries store prospective student contacts and course interests.
- In compliance with student privacy guidelines:
  - Admin displays an active banner highlighting records older than **90 days** in a `Closed` or `Resolved` state.
  - One-click bulk retention purge permanently removes expired inquiries from PostgreSQL while keeping active student leads intact.

---

## 6. Full Database Backup & Disaster Recovery

From **Admin Console > Settings**:
- Staff can click **"Download Full Backup (.json)"** to retrieve an encrypted, timestamped snapshot containing:
  - Courses & Curricula
  - Programs & Tracks
  - Student Capstones & Deliverables
  - Insight Publications & SEO Metadata
  - Verified Testimonials & Consent Records
  - Admissions Inquiries & Status History
- Individual sections can also be restored back to institutional baseline seeds in the event of human error.

---

## 7. Operational Workflows

### 7.1 Publishing a New Course
1. Go to `/admin/courses` > Click **"Add Course"**.
2. Fill in Title, Slug (auto-generated), Category, Level, Duration, and Tuition Fee.
3. Keep Status as **`Draft`** while configuring the Syllabus Curriculum and Projects.
4. Click **"Preview"** or visit `/courses/<slug>?preview=true` to review the student-facing presentation with the amber preview banner.
5. Once vetted by the academic board, switch Status to **`Published`**.

### 7.2 Editorial Insight Articles
1. Go to `/admin/insights` > Click **"Write Article"**.
2. Enter Title, Content, Excerpt, Author, and specify Custom SEO Title & Meta Description.
3. Preview draft via `/insights/<slug>?preview=true`.
4. Switch Status to **`Published`** to immediately make it live and eligible for sitemap indexing.

### 7.3 Triage Inquiries
1. Go to `/admin/inquiries`.
2. Review new applications (`New`), update status to `Contacted`, `Qualified`, or `Closed`.
3. Add counselor follow-up notes.
4. Run periodic 90-day retention cleanup.
