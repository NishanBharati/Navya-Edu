# Navya Ed Tech — Troubleshooting & Maintenance Guide

**Version:** 1.0  
**Target Audience:** Web Developers, DevOps Engineers, and System Administrators  
**Deployment Infrastructure:** Vercel (Edge Network) + Supabase (PostgreSQL 15)

---

## 1. Diagnostics & Common Issues Resolution

### Issue 1.1: "Supabase Environment Variables Not Configured on Host"
- **Symptom:** Submissions work locally into local storage, but display a warning in console: `[inquiryService] Supabase not configured on this host`.
- **Root Cause:** `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` is missing or contains the default placeholder text in `.env.local` or the Vercel dashboard.
- **Resolution:**
  1. Go to **Supabase Dashboard &rarr; Project Settings &rarr; API**.
  2. Copy the **Project URL** and the **anon public** API key.
  3. In Vercel Project Settings &rarr; Environment Variables, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  4. Trigger a redeployment.

---

### Issue 1.2: Media Upload Fails in Admin Console (`new row violates row-level security policy`)
- **Symptom:** Uploading a course image or syllabus PDF via `/admin/courses` returns an upload error.
- **Root Cause:** The admin session has expired, or the storage bucket policies in Supabase were not applied.
- **Resolution:**
  1. Refresh the admin console to verify you are logged in.
  2. In **Supabase Dashboard &rarr; SQL Editor**, execute lines 267–310 of [`supabase/schema.sql`](file:///c:/Users/ASUS/Desktop/Navya-Edu/supabase/schema.sql) to ensure policies `"Admins can upload media assets"` and bucket `media` are active.
  3. Ensure the uploaded file does not exceed **25MB** for PDFs or **5MB** for images.

---

### Issue 1.3: Admin Login Locked Out ("Security alert: Too many failed attempts")
- **Symptom:** Admin login screen displays a countdown timer and rejects attempts.
- **Root Cause:** 5 consecutive incorrect passwords triggered the client-side brute-force defense in `src/admin/pages/Login.tsx`.
- **Resolution:**
  1. Wait for the 60-second countdown timer to expire.
  2. Alternatively, open your browser Developer Tools (F12) &rarr; **Application** &rarr; **Session Storage** and clear keys `navya_admin_login_attempts` and `navya_admin_login_lockout`.
  3. To reset an admin password, go to **Supabase Dashboard &rarr; Authentication &rarr; Users** &rarr; Click `...` next to the admin user &rarr; **Send Password Reset** or **Edit User Password**.

---

### Issue 1.4: Pre-rendering Script Fails During `npm run build`
- **Symptom:** Terminal output stops at `[prerender] Error: Template file not found at dist/index.html`.
- **Root Cause:** Running `tsx scripts/prerender.ts` directly before running `vite build`.
- **Resolution:** Always use the standard build command: `npm run build`. The script is configured to run `vite build` first to compile client assets, followed immediately by `tsx scripts/prerender.ts`.

---

### Issue 1.5: Content-Security-Policy (CSP) Blocks an External Asset
- **Symptom:** Browser console reports: `Refused to load the image/script because it violates the following Content Security Policy directive...`.
- **Root Cause:** A new external CDN or image hosting domain was introduced that is not whitelisted in `vercel.json`.
- **Resolution:**
  1. Open [`vercel.json`](file:///c:/Users/ASUS/Desktop/Navya-Edu/vercel.json).
  2. Locate the `Content-Security-Policy` header.
  3. Add the authorized domain to the appropriate directive (e.g., add `https://your-new-cdn.com` to `img-src` or `script-src`).
  4. Commit and push changes.

---

## 2. Known Issues & Content Awaiting Business Assets

| Item | Current Status | Action Required from Business Team | Severity |
| :--- | :--- | :--- | :---: |
| **Faculty Headshots & Bios** | Using structured placeholder avatars on `/about` and `/courses/*`. | Provide professional photographic headshots and bios of active course instructors in Kathmandu. | **P3 (Content)** |
| **Statutory Legal Sign-Off** | Privacy Policy & Terms have `[LEGAL REVIEW NEEDED]` notices under Nepal's *Individual Privacy Act, 2075*. | Have licensed Nepalese attorney in Kathmandu review statutory clauses before high-volume commercial marketing. | **P2 (Legal)** |
| **Live Google Analytics 4 (GA4)** | Architecture supports privacy telemetry; script slot ready. | Provide live `G-XXXXXXXXXX` tag upon final domain launch to inject in `index.html`. | **P3 (Analytics)** |
| **Official Hotline Phone** | Contact details set to Kathmandu campus desk with placeholder hotline `+977-9800000000`. | Update with permanent registered NTC/Ncell admissions hotline numbers in [`src/config/site.ts`](file:///c:/Users/ASUS/Desktop/Navya-Edu/src/config/site.ts). | **P3 (Content)** |

---

## 3. Scheduled Maintenance & Hygiene Runbook

### Monthly Routine
- **Dependency Vulnerability Scan:** Run `npm audit` to verify zero known vulnerabilities. If non-breaking security patches are available, run `npm update`.
- **Inquiry Database Cleanup:** Review `/admin/inquiries` and archive closed inquiries older than 90 days.
- **Admin Accounts Audit:** Ensure inactive or departed staff accounts are removed from **Supabase Dashboard &rarr; Authentication &rarr; Users**.

### Quarterly Routine
- **Catalog Review:** Review fee structures, batch schedules, and curriculum outcomes with lead instructors.
- **Sitemap & SEO Inspection:** Check Google Search Console for coverage anomalies, indexed pages, and mobile usability flags.

### Annual Routine
- **Domain & SSL Renewal:** Ensure `navyaedtech.com` domain auto-renewal is active at the domain registrar.
