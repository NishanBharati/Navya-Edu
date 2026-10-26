# Navya Ed Tech — Deployment & Operations Guide

**Version:** 1.0  
**Target Environment:** Vercel Edge Hosting + Supabase Cloud PostgreSQL  
**Primary Domains:** `navya-edu.vercel.app` (Staging / Live Preview) &rarr; `navyaedtech.com` (Production Custom Domain)

---

## 1. Hosting Architecture Overview

The Navya Ed Tech website uses a decoupled edge-and-cloud architecture:
- **Frontend & Routing:** Deployed on **Vercel's Global Edge Network**. Builds run `vite build && tsx scripts/prerender.ts`, pre-rendering 26 static HTML marketing pages for instant crawler indexing and sub-500ms initial page load.
- **Backend & Database:** Hosted on **Supabase** (PostgreSQL 15). All public mutations (such as prospective student inquiries) and reads (courses, projects, published blogs) communicate directly with Supabase via `@supabase/supabase-js` under strict PostgreSQL **Row Level Security (RLS)**.
- **Media Storage:** Supabase Storage (`media` bucket) serves official course syllabus PDFs and high-resolution images with public CDN read access and authenticated-only write permissions.

---

## 2. Environment Variables Reference

Configure these variables in your local `.env.local` file and in the **Vercel Project Settings &rarr; Environment Variables**:

| Variable Name | Environment Scope | Secret? | Purpose & Format Example |
| :--- | :--- | :---: | :--- |
| `VITE_SUPABASE_URL` | Production & Preview | **No** | Your Supabase project URL (e.g. `https://xxxxxx.supabase.co`). Embedded in client bundle. |
| `VITE_SUPABASE_ANON_KEY` | Production & Preview | **No** | The public "anon" API key. Safe for browser code; data safety is guaranteed by PostgreSQL RLS. |
| `VITE_SITE_URL` | Production & Preview | **No** | Canonical base URL (no trailing slash). E.g., `https://navya-edu.vercel.app` or `https://navyaedtech.com`. Used for sitemap, canonical links, and OpenGraph images. |
| `SUPABASE_SERVICE_ROLE_KEY` | **CI / Server Only** | **CRITICAL SECRET** | Master administrative bypass key. **DO NOT EXPOSE TO CLIENT BUNDLE OR GIT.** |

> [!CAUTION]
> Never set `SUPABASE_SERVICE_ROLE_KEY` as a client-side environment variable (`VITE_...`). The client code strictly requires the `anon` key.

---

## 3. Step-by-Step Vercel Deployment

### Step 3.1: Connect GitHub Repository
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Click **Add New &rarr; Project** and select the `NishanBharati/Navya-Edu` repository.
3. In **Framework Preset**, ensure **Vite** is selected.
4. Verify the build commands:
   - **Build Command:** `npm run build` (or `vite build && tsx scripts/prerender.ts`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

### Step 3.2: Configure Environment Variables in Vercel
In the project setup screen, expand **Environment Variables** and add:
- `VITE_SUPABASE_URL`: `https://YOUR_PROJECT_REF.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: `YOUR_PUBLIC_ANON_KEY`
- `VITE_SITE_URL`: `https://navya-edu.vercel.app` (or your custom domain `https://navyaedtech.com`)

Click **Deploy**. Within 2 minutes, Vercel will complete the build and generate preview routes.

---

## 4. Custom Domain & DNS Migration Runbook

When ready to route the official production custom domain (`navyaedtech.com`):

### Step 4.1: Add Domain in Vercel
1. Go to **Project Settings &rarr; Domains**.
2. Enter `navyaedtech.com` and select the recommended option: `Redirect www.navyaedtech.com to navyaedtech.com` (or vice versa).

### Step 4.2: Update DNS Records at Domain Registrar
At your DNS registrar (e.g., Cloudflare, Namecheap, GoDaddy):

| Record Type | Host / Name | Target / Value | TTL | Note |
| :---: | :---: | :---: | :---: | :--- |
| **A** | `@` | `76.76.21.21` | Auto / 300 | Points apex domain to Vercel edge IP. |
| **CNAME** | `www` | `cname.vercel-dns.com` | Auto / 300 | Handles `www` subdomain routing. |

### Step 4.3: SSL / TLS Certificate Validation
- Vercel will automatically provision a free Let's Encrypt / DigiCert wildcard SSL certificate once DNS records propagate (typically 5–30 minutes).
- Verify that `https://navyaedtech.com` loads with a secure padlock.

### Step 4.4: Update Canonical Domain Variable
Once DNS is live:
1. In Vercel Project Settings, update `VITE_SITE_URL` to `https://navyaedtech.com`.
2. Trigger a fresh deployment ("Redeploy") so all pre-rendered HTML canonicals and `sitemap.xml` regenerate with the new domain.

---

## 5. Supabase Production Hardening & Settings

Before opening the site to students, verify these three critical Supabase project settings:

### 1. Disable Public Signups
- Navigate to **Authentication &rarr; Providers &rarr; Email**.
- Ensure **Enable Signups** is toggled **OFF**.
- *Reason:* Only staff invited by existing administrators should be able to create accounts. Leaving this open allows public visitors to obtain `auth.role() = 'authenticated'`.

### 2. Run Database Migrations
- Navigate to **SQL Editor &rarr; New Query**.
- Paste and execute [`supabase/schema.sql`](file:///c:/Users/ASUS/Desktop/Navya-Edu/supabase/schema.sql).
- Verify that all tables have Row Level Security enabled (`alter table ... enable row level security;`).

### 3. Verify Media Storage Bucket
- Navigate to **Storage &rarr; Buckets**.
- Ensure the `media` bucket exists and is set to **Public: Yes**.
- Verify allowed MIME types include images (`image/jpeg`, `image/png`, `image/webp`) and PDFs (`application/pdf`) with a 25MB file size limit.

---

## 6. Backup & Disaster Recovery Protocols

### 6.1 Supabase Automated Backups
- **Daily Automated Backups:** Supabase projects automatically run daily snapshot backups retained for 7 to 30 days depending on the tier.
- **Point-in-Time Recovery (PITR):** On Pro projects, PITR allows restoring database state down to the second within a 7-day window.

### 6.2 Manual Data Export (Admissions Inquiries & Courses)
Admins can manually export all data at any time via the admin dashboard:
1. Log into `/admin/settings`.
2. Click **Export Platform Backup (JSON)** to download a complete JSON snapshot containing all courses, programs, student projects, blogs, testimonials, and inquiries.
3. Save the backup securely in the institute's Google Workspace drive.

---

## 7. Emergency Rollback Procedure

If an erroneous deployment or edge routing anomaly occurs:
1. Log into the **Vercel Dashboard &rarr; Deployments**.
2. Locate the previous healthy deployment from the timeline.
3. Click the three dots `...` on the healthy deployment card and select **Promote to Production**.
4. Vercel will instantly switch edge traffic back to the previous build in less than 5 seconds without triggering a rebuild.
