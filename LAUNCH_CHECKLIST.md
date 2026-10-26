# Navya Ed Tech — Production Launch & Domain Migration Checklist

This document serves as the master production readiness and domain migration checklist for **Navya Ed Tech** (`navya-edu.vercel.app` / `navyaedtech.com`).

---

## 1. Domain Configuration & Environment Variable Migration

The codebase utilizes a centralized, intelligent domain configuration in [`src/config/site.ts`](file:///c:/Users/ASUS/Desktop/Navya-Edu/src/config/site.ts).
By default, builds and runtime automatically resolve to the active live preview domain:
`https://navya-edu.vercel.app` (or Vercel automatic `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL`).

When ready to switch to the official apex domain (`navyaedtech.com`), update `VITE_SITE_URL` in `.env.local` or your Vercel Project Settings:

```env
# Production Custom Domain (no trailing slash)
VITE_SITE_URL="https://navyaedtech.com"
```

### Locations Dynamically Configured by `SITE_URL`:

All canonical references and social preview scrapers resolve through `getSiteUrl()`:

| Component / Layer | File Path | Dynamic Integration |
| :--- | :--- | :--- |
| **Site Config** | `src/config/site.ts` | Single source of truth with priority: `VITE_SITE_URL` -> `VERCEL_URL` -> `navya-edu.vercel.app` |
| **Structured Data** | `src/utils/structuredData.ts` | Injects `SITE_URL` into `EducationalOrganization`, `Course`, `FAQPage`, `BreadcrumbList` |
| **SEO Head Tags** | `src/components/common/SEOHead.tsx` | Defaults canonical links and `og:image` to `${SITE_URL}/...` |
| **Course Details** | `src/pages/CourseDetails.tsx` | Canonical URLs generated via `${SITE_URL}/courses/${course.slug}` |
| **Insights / Articles** | `src/pages/BlogDetails.tsx` | Canonical URLs and social share targets generated via `${SITE_URL}/insights/${article.slug}` |
| **XML Sitemap** | `scripts/generate-sitemap.ts` | Generates 26+ `<loc>` entries using resolved `baseUrl` |
| **SSR Pre-rendering** | `scripts/prerender.ts` | Builds static HTML shells with current resolved `BASE_URL` |
| **Vite SSR Dev Server**| `vite.config.ts` | Injects canonical tags and metadata using current resolved `BASE_URL` |
| **Robots Header** | `dist/robots.txt` / `public/robots.txt` | Dynamically points crawler to `${BASE_URL}/sitemap.xml` |

> [!NOTE]
> Links pointing to the official parent software enterprise (`https://navyaedtech.com/`) in the navbar and footer are external company references and remain independent of the student training portal domain.


---

## 2. Pre-Launch Verification Checklist

### A. Custom Domain & DNS / HTTPS
- [ ] **Domain Registration**: Verify ownership of apex domain (`navyaedtech.com`) and `www` subdomain.
- [ ] **DNS Records Configured**:
  - `A` Record: `@` pointing to hosting IP (e.g., `76.76.21.21` for Vercel)
  - `CNAME` Record: `www` pointing to `cname.vercel-dns.com`
- [ ] **SSL / TLS Certificate**: Confirm automated Let's Encrypt / DigiCert certificate is active and auto-renews.
- [ ] **HTTPS Redirection**: Confirm HTTP traffic automatically redirects to HTTPS (301 Permanent Redirect).
- [ ] **Apex / WWW Canonicalization**: Verify `www.navyaedtech.com` permanently redirects to `navyaedtech.com` (or vice-versa) to prevent duplicate indexing.
- [ ] **Environment Variable Set on Host**: In Vercel / Netlify dashboard, set `VITE_SITE_URL=https://navyaedtech.com` for Production environment.

---

### B. Core Features & Module Verification (Live Audit)
- [x] **Module 1 (SSR / SSG Rendering)**: All 26 public marketing routes statically pre-rendered in `dist/` with full text payloads visible to web crawlers without client JS.
- [x] **Module 2 (SEO & Social Sharing)**:
  - Canonical `<link rel="canonical">` on every page.
  - Branded 1200x630 Open Graph (`og:image`) and Twitter Card (`summary_large_image`) tags active.
  - Valid `EducationalOrganization`, `Course`, `FAQPage`, `BlogPosting`, and `BreadcrumbList` JSON-LD structured data.
  - Valid `public/robots.txt` disallowing `/admin` and pointing to `sitemap.xml`.
  - Dynamic `public/sitemap.xml` generated with weekly/daily change frequencies.
- [x] **Module 3 (Core Student Pages)**:
  - Courses listing (`/courses`) with category pills, level filters, delivery mode, and search.
  - Individual course detail template (`/courses/:slug`) with module breakdown, prerequisites, faculty bio, tools covered, certificate criteria, and working CTAs.
  - About page (`/about`) with company story, mission, why-choose-us differentiators, and transparent `[PLACEHOLDER]` faculty badges.
  - Contact page (`/contact`) with full client-side regex validation, Supabase backend integration, embedded Google Map of Kathmandu, and direct `tel:`/WhatsApp links.
- [x] **Module 4 (Baseline Legal & Trust Pages)**:
  - Privacy Policy (`/privacy`) covering form data, visitor telemetry, cookies, PostgreSQL RLS encryption, and `[LEGAL REVIEW NEEDED]` notices.
  - Terms of Service (`/terms`) covering admissions, lab code of conduct, 100% student IP ownership, and baseline liability limitations with `[LEGAL REVIEW NEEDED]` markers.
  - Refund & Cancellation Policy (`/refund`) with pre-commencement cooling-off, non-refundable post-commencement rules, and emergency batch transfer terms.
  - Student FAQ page (`/faq`) with 16 categorized Q&As, search bar, interactive accordion, and `FAQPage` schema.
  - Testimonials section (`src/components/home/TestimonialsSection.tsx`) seeded with structured `[PLACEHOLDER]` outcomes across MERN, React, Python, UI/UX, and Data Science.
  - Universal footer linking to all legal and FAQ pages on every page of the site.
- [x] **Module 5 (Technical Quality & Polish)**:
  - Custom branded 404 page (`/404` and `dist/404.html`).
  - High-res vector favicon (`/favicon.svg`), apple-touch-icon, and `site.webmanifest`.
  - Color contrast pass: WCAG AA compliant across all text, buttons, and badges.
  - Keyboard accessibility: full tab order and visible `focus-visible` rings.

---

### C. Analytics & Conversion Tracking
- [ ] **Web Analytics Provider Configured**:
  - Option A: Google Analytics 4 (GA4) tag installed in `index.html` (`G-XXXXXXXXXX`).
  - Option B: Privacy-preserving Plausible or Cloudflare Web Analytics script added.
- [ ] **Conversion Event Tracking**:
  - `course_inquiry_submitted`: Fires on successful `/contact` submission or `AdvisorModal` completion.
  - `demo_class_booked`: Fires when user clicks "Book a Free Demo Class".
  - `syllabus_downloaded`: Fires on course syllabus PDF download.
  - `phone_clicked` / `whatsapp_clicked`: Fires on admissions tel / WhatsApp clicks.

---

### D. Search Console & Webmaster Tools
- [ ] **Google Search Console (GSC)**:
  - Add Domain Property for `navyaedtech.com` using DNS TXT verification.
  - Submit sitemap URL: `https://navyaedtech.com/sitemap.xml`.
  - Verify zero coverage errors, valid mobile usability, and detected Rich Results (Course, FAQ, Organization).
- [ ] **Bing Webmaster Tools**: Import verified Google Search Console property.

---

### E. Social Sharing & Link Preview Verification
Test the live URL across major social crawler debuggers to confirm proper rendering of Title, Description, and 1200x630 Branded Banner:
- [ ] **Facebook / Instagram**: [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] **Twitter / X**: [X Card Validator](https://cards-dev.twitter.com/validator)
- [ ] **LinkedIn**: [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] **WhatsApp / Telegram / Slack**: Send a live test message containing `https://navyaedtech.com` to confirm preview thumbnail, title, and description render instantly.

---

### F. Multi-Browser & Device Matrix Verification
Confirm visual fidelity, font rendering, and layout stability across:
- [ ] **Desktop Browsers**:
  - Google Chrome (Windows / macOS)
  - Apple Safari (macOS)
  - Mozilla Firefox (Windows / macOS)
  - Microsoft Edge (Windows)
- [ ] **Mobile & Tablet Devices**:
  - Apple iOS Safari (iPhone 13/14/15, iPad Pro)
  - Google Android Chrome (Samsung Galaxy, Google Pixel, Redmi)
- [ ] **Responsive Breakpoints Audited**:
  - 360px (Small Mobile): Hamburger menu works, tables scroll horizontally, cards stack cleanly.
  - 768px (Tablet): Grid switches to 2 columns, search and filter bars align properly.
  - 1024px (Small Desktop / Laptop): Full navigation bar displays without overlap.
  - 1440px+ (Large Desktop): Content remains centered within max-width container with crisp typography.

---

### G. Security & Operations Sanity Check
- [ ] **Supabase Row Level Security (RLS)**: Verify public `anon` key only has `INSERT` access to `inquiries`, and read access is restricted to authenticated staff.
- [ ] **No Secret Keys in Frontend Bundle**: Confirm `SUPABASE_SERVICE_ROLE_KEY` or admin tokens are NOT present in client JS.
- [ ] **Contact Email Forwarding**: Confirm incoming admissions emails sent to `info@navyaedtech.com` route to the active admissions team inbox.
