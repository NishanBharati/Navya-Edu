# Navya Ed Tech — Professional IT Training & Technology Education

> **Learn technology from the company that builds technology.**  
> Practical, project-driven computer training and software engineering education bridging academic curricula and commercial product standards in Kathmandu, Nepal.

[![Production Build](https://img.shields.io/badge/Build-Passing-emerald)](https://navya-edu.vercel.app)
[![React](https://img.shields.io/badge/React-19.0.1-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.14-cyan)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL%20RLS-3ECF8E)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel%20Edge-black)](https://vercel.com)

---

## 1. Project Overview

Navya Ed Tech is the dedicated technology education division of Navya EdTech Pvt. Ltd. The web platform delivers an enterprise-grade, high-performance portal featuring:
- **Comprehensive Course Catalog**: Real-world curriculum outlines, duration, milestone fees in NPR, tools covered, outcomes, and downloadable vector syllabus PDFs.
- **Career Programs**: Structured multi-course career tracks (Full Stack Web Developer, Data & AI Associate, UI/UX Product Designer) with clear eligibility and outcomes.
- **Student Work Showcase**: Real student capstone repositories, live application demos, and verified technical outcomes.
- **Industry Insights & Engineering Blog**: Practical technical articles on modern software engineering careers in Nepal.
- **Dual-Layer Admissions Pipeline**: High-reliability student inquiry pipeline combining client-side sanitization, PostgreSQL Row Level Security persistence, local storage queueing, and instant WhatsApp/Email advisory fallbacks.
- **Administrative Workstation (`/admin/*`)**: Code-split, password-protected administrative dashboard for course management, syllabus uploads, inquiry tracking, and content publishing.

---

## 2. Architecture & Technology Stack

| Layer | Technologies & Implementations |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 6, React Router DOM 7 |
| **Styling & Design System**| Tailwind CSS 4, Custom Educational Design Tokens (`#17324D` Deep Navy, `#0A66C2` Blue, Warm Paper surfaces) |
| **Icons & Media** | Lucide React, Optimized WebP photography, Vector SVG graphics |
| **Rendering Strategy** | Hybrid Static Site Generation (SSG) prerendering for all 26 public routes + client-side hydration & code-split SPA admin portal |
| **SEO & Social Graph** | Canonical tags, 1200x630 OpenGraph cards, Twitter cards, dynamic XML sitemap, `robots.txt`, and Schema.org JSON-LD structured data |
| **Backend & Database** | Supabase (PostgreSQL 15 with Row Level Security, GoTrue Auth, and Storage Buckets) |
| **Edge Hosting & Security**| Vercel Serverless Edge, strict Content Security Policy, HSTS, X-Frame-Options, and 1-year immutable caching |

---

## 3. Quickstart & Local Development

### Prerequisites
- Node.js 20+ or Node.js 22+ (LTS recommended)
- npm or bun

### Setup Steps
```bash
# 1. Clone the repository
git clone https://github.com/NishanBharati/Navya-Edu.git
cd Navya-Edu

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials (see docs/DEPLOYMENT_AND_OPERATIONS_GUIDE.md)

# 4. Start the local development server
npm run dev
# Application will be accessible at http://localhost:3000
```

---

## 4. Available Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server on port 3000 with hot module replacement (HMR). |
| `npm run build` | Builds the production bundle (`vite build`) and runs the SSG prerender script (`tsx scripts/prerender.ts`). |
| `npm run preview` | Spins up a local production preview server serving the `dist/` build. |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`). |
| `npm run clean` | Removes the `dist/` build directory. |
| `node scripts/qa_master_suite.mjs` | Executes the automated 52-test regression test suite across Chrome CDP. |

---

## 5. Repository Structure

```
Navya-Edu/
├── docs/                                  # Master Documentation & Handover Guides
│   ├── DEPLOYMENT_AND_OPERATIONS_GUIDE.md # Production deployment, DNS, and rollback runbook
│   ├── CONTENT_MANAGEMENT_GUIDE.md        # Admin console & curriculum publishing guide
│   ├── INQUIRY_WORKFLOW_AND_OPERATIONS.md # Admissions triage, SLAs, and retention policy
│   ├── TROUBLESHOOTING_AND_MAINTENANCE.md # Common issues, diagnostics, and known placeholders
│   ├── QA_AND_REGRESSION_REPORT.md        # 52-test automated regression results
│   └── SECURITY_AND_PRIVACY_AUDIT.md      # Security architecture, RLS & compliance audit
├── public/                                # Static assets (favicons, sitemap, robots, OG image)
├── scripts/                               # SSG Prerendering & QA Automation
│   ├── prerender.ts                       # Static HTML prerender generator for 26 routes
│   ├── generate-sitemap.ts                # Dynamic XML sitemap generator
│   └── qa_master_suite.mjs                # 52-point automated Chrome CDP test suite
├── src/
│   ├── admin/                             # Code-split Administrative Workstation
│   │   ├── context/                       # Supabase Admin Auth state
│   │   ├── layouts/                       # Admin navigation & sidebar layouts
│   │   ├── pages/                         # Courses, Inquiries, Insights, Testimonials admin
│   │   └── routes/                        # Protected admin routing tree
│   ├── components/                        # Modular UI Component Library
│   │   ├── common/                        # ErrorBoundary, Modal, SEOHead, Buttons, Badges
│   │   ├── courses/                       # CourseCard, Curriculum, Syllabus downloads
│   │   ├── home/                          # Hero, Pathway, TrustIntro, Testimonials
│   │   └── layout/                        # Accessible Navbar & Footer
│   ├── config/                            # Centralized domain and site constants
│   ├── data/                              # Static seed data (Courses, Programs, Insights)
│   ├── lib/                               # Supabase client & Inquiry pipeline services
│   ├── pages/                             # Public marketing route views
│   └── utils/                             # Structured data schemas & PDF generators
├── supabase/
│   ├── schema.sql                         # PostgreSQL schema, RLS policies, and triggers
│   └── seed.sql                           # Initial production catalog seed data
├── vercel.json                            # Edge security headers and routing configuration
└── vite.config.ts                         # Vite build configuration & chunk splitting
```

---

## 6. Master Documentation Library

Comprehensive operational guides are available in the [`docs/`](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs) folder:

1. [**Deployment & Operations Guide**](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs/DEPLOYMENT_AND_OPERATIONS_GUIDE.md) — Step-by-step Vercel deployment, custom domain setup (`navyaedtech.com`), DNS records, SSL/TLS, and disaster recovery.
2. [**Content Management Guide**](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs/CONTENT_MANAGEMENT_GUIDE.md) — How institute staff create and update courses, batch schedules, fees in NPR, blog insights, and capstone showcases.
3. [**Inquiry Workflow & Operations Guide**](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs/INQUIRY_WORKFLOW_AND_OPERATIONS_GUIDE.md) — Admissions counseling pipeline, SLA guidelines, spam defense, and privacy-compliant data retention.
4. [**Troubleshooting & Maintenance Guide**](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs/TROUBLESHOOTING_AND_MAINTENANCE_GUIDE.md) — Resolution steps for common errors, list of placeholder content awaiting final business photos, and update schedules.
5. [**Quality Assurance & Regression Report**](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs/QA_AND_REGRESSION_REPORT.md) — Automated testing matrix, defect logs, and release sign-off.
6. [**Security & Privacy Audit**](file:///c:/Users/ASUS/Desktop/Navya-Edu/docs/SECURITY_AND_PRIVACY_AUDIT.md) — Deep-dive audit of PostgreSQL RLS policies, frontend bundle hygiene, and statutory compliance.

---

## 7. Operational Contacts & Support

- **Campus Address:** Putalisadak Campus, Kathmandu, Bagmati Province, Nepal
- **Admissions Desk:** `info@navyaedtech.com` | `admissions@navyaedtech.com`
- **Parent Company:** [Navya EdTech](https://navyaedtech.com/)
- **Technical Maintenance:** Navya Engineering Team
