# Navya EdTech — Technical SEO, AEO & Local SEO Audit & Strategy

This document provides a technical audit of the SEO architecture implemented for **Navya Ed Tech**, outlines the Answer Engine Optimization (AEO) and local search strategy, and specifies the exact business and content information required from stakeholders for continued organic growth.

> [!NOTE]
> **SEO Statement of Integrity:** Search engine algorithms reward genuine content, fast performance, semantic structure, and authentic user value. We do not promise guaranteed #1 rankings or artificial search manipulation.

---

## 1. Technical SEO Audit & Implementation Summary

### 1.1 Metadata Architecture Matrix
Every public page on Navya Ed Tech features unique, page-specific metadata with tailored titles, meta descriptions, and canonical tags.

| Route | Page Title | Primary Canonical Target | Key Schemas Injected |
| :--- | :--- | :--- | :--- |
| `/` | Navya Ed Tech \| Professional IT Training & Technology Education in Nepal | `https://navya-edu.vercel.app/` | `EducationalOrganization`, `LocalBusiness`, `FAQPage` |
| `/courses` | Explore Professional IT Courses & Tech Training \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/courses` | `BreadcrumbList`, `ItemList` |
| `/courses/:slug` | [Course Title] Course in Nepal \| Navya Ed Tech Kathmandu | `https://navya-edu.vercel.app/courses/:slug` | `Course`, `BreadcrumbList`, `FAQPage` (when present) |
| `/programs` | Career Programs & Professional Tracks \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/programs` | `BreadcrumbList` |
| `/student-work` | Verified Student Work & Capstone Projects \| Navya Ed Tech | `https://navya-edu.vercel.app/student-work` | `BreadcrumbList` |
| `/insights` | Technology Insights, Engineering Guides & Career Retrospectives \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/insights` | `BreadcrumbList` |
| `/insights/:slug` | [Article SEO Title] \| Navya Ed Tech Insights | `https://navya-edu.vercel.app/insights/:slug` | `BlogPosting`, `BreadcrumbList` |
| `/about` | About Navya Ed Tech \| IT Education Division of Navya EdTech Nepal | `https://navya-edu.vercel.app/about` | `BreadcrumbList`, `FAQPage` |
| `/contact` | Contact Admissions & Academic Advisory \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/contact` | `EducationalOrganization`, `LocalBusiness`, `BreadcrumbList`, `FAQPage` |
| `/faq` | Frequently Asked Questions (FAQ) \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/faq` | `FAQPage`, `BreadcrumbList` |
| `/terms` | Terms of Service \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/terms` | `BreadcrumbList` |
| `/privacy` | Privacy Policy \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/privacy` | `BreadcrumbList` |
| `/refund` | Refund & Cancellation Policy \| Navya Ed Tech Nepal | `https://navya-edu.vercel.app/refund` | `BreadcrumbList` |
| `/404` | 404 - Page Not Found \| Navya Ed Tech Nepal | Self | `noindex, nofollow` |

### 1.2 Crawl Budget & Robots Indexability Rules
- **Directives:**
  - Public marketing pages output: `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`.
  - 404 pages and unreleased preview query params (`?preview=true`) output: `<meta name="robots" content="noindex, nofollow" />`.
- **`robots.txt` configuration:**
  ```txt
  User-agent: *
  Allow: /

  # Disallow administrative dashboard and draft preview states
  Disallow: /admin/
  Disallow: /admin
  Disallow: /*?preview=true
  Disallow: /*?*preview=true
  Disallow: /404

  # Sitemap Location
  Sitemap: https://navya-edu.vercel.app/sitemap.xml
  ```

### 1.3 Clean URLs & Dynamic XML Sitemap
- All URLs use clean, lowercase kebab-case paths without file extensions or trailing slash confusion.
- The sitemap generator (`scripts/generate-sitemap.ts`) filters out legacy drafts and archived courses, outputting valid `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` tags across all 26 canonical routes.

### 1.4 Structured Data Validation (Schema.org)
All schemas have been implemented to strict Google Search Central standards:
1. **`EducationalOrganization` / `LocalBusiness`:** Provides verified legal name, Putalisadak address, GPS coordinates, dual telephone desks, opening hours, official parent company linkage (`https://navyaedtech.com/`), and active social profiles.
2. **`Course`:** Specifies duration (`timeRequired`), prerequisites, technologies taught, and physical/online delivery mode without fictitious pricing strings.
3. **`ItemList`:** Injected on `/courses` catalog page to structure the full course index for Google carousel display.
4. **`BlogPosting`:** Contains dynamic cover image URLs, author entity, publication date, and language tag.
5. **`FAQPage`:** Injected only on pages where the exact questions and answers are visible in the DOM (Homepage, Course details, About, Contact, and FAQ pages).
6. **`BreadcrumbList`:** Establishes semantic hierarchy from Home to leaf nodes.

---

## 2. AEO (Answer Engine Optimization) & Generative Search Readiness

Modern search engines (Google SGE / AI Overviews, Perplexity, Claude, ChatGPT Search) synthesize answers directly from structured text. Navya Ed Tech has been optimized for answer engines through:

### 2.1 Direct-Answer Heading Architecture
Key landing and course pages structure their headings as direct inquiries followed by concise, factual introductory paragraphs (under 60 words) suitable for snippet extraction:
- *"How do I enroll in a course, and can I attend a free demo class first?"*
- *"Are classes held in-person in Kathmandu or online?"*
- *"What is the typical batch size and instructor attention ratio?"*
- *"Do I need a Computer Science (CS/IT) degree to join?"*
- *"How much are course fees, and are installment payment plans available?"*

### 2.2 Pedagogical Authority & Proof of Learning
Answer engines prioritize content from genuine practitioners over content farms. Navya's technical copy emphasizes:
- Engineering-backed education rooted in an active software development parent company (*Navya EdTech*).
- Small cohorts strictly capped at **12–16 students** to enable line-by-line pull request audits.
- Proof of learning demonstrated through public GitHub repositories rather than artificial multiple-choice quizzes.

---

## 3. Real Keyword Strategy & Content Clusters

Based on Navya Ed Tech's genuine curriculum offerings, the following keyword clusters represent the core search opportunity in Nepal. **Do not target services Navya does not provide** (such as generic digital marketing, hardware repair, or offshore call centers).

### Cluster 1: Full-Stack Web Development & MERN Stack
- **Primary Keywords:** `MERN stack course in Nepal`, `Full stack web development training Kathmandu`, `React JS classes Nepal`, `Node JS training Kathmandu`
- **Secondary/Intent Keywords:** `React developer roadmap Nepal`, `Learn MERN stack Putalisadak`, `JavaScript ES6 course Kathmandu`, `MERN stack project based learning`
- **Core Landing Page:** `/courses/mern-stack-development` and `/courses/react-frontend-engineering`

### Cluster 2: Python Software Architecture & Backend Microservices
- **Primary Keywords:** `Python programming course Nepal`, `Python training in Kathmandu`, `FastAPI course Nepal`, `Django backend training Nepal`
- **Secondary/Intent Keywords:** `Python software architecture classes`, `Celery and Redis tutorial Nepal`, `Docker microservices training Kathmandu`, `Python for beginners Kathmandu`
- **Core Landing Page:** `/courses/python-advance` and `/courses/python-beginner`

### Cluster 3: Applied Data Science & Machine Learning
- **Primary Keywords:** `Data science course in Nepal`, `Machine learning training Kathmandu`, `Data analysis with Python Nepal`, `Pandas NumPy course Nepal`
- **Secondary/Intent Keywords:** `Data science institute Putalisadak`, `Practical ML projects Nepal`, `Data science syllabus Nepal`
- **Core Landing Page:** `/courses/data-science`

### Cluster 4: UI/UX Product Design & Design Systems
- **Primary Keywords:** `UI UX design course in Nepal`, `Figma training Kathmandu`, `Product design course Nepal`, `UX research institute Kathmandu`
- **Secondary/Intent Keywords:** `Design systems Figma Nepal`, `UI UX internship preparation Kathmandu`, `Mobile app UI design course`
- **Core Landing Page:** `/courses/ui-ux-product-design`

### Cluster 5: Foundational Programming & Kids Coding
- **Primary Keywords:** `Coding for kids in Nepal`, `Scratch programming classes Kathmandu`, `Beginner programming for school students Nepal`
- **Secondary/Intent Keywords:** `Logical thinking classes for kids Kathmandu`, `Creative computing Scratch Nepal`
- **Core Landing Page:** `/courses/scratch-beginner` and `/courses/scratch-advanced`

---

## 4. Local SEO Strategy (Kathmandu, Bagmati Province)

Local search is the primary driver of qualified student admissions in Kathmandu.

### 4.1 Canonical NAP (Name, Address, Phone) Standard
All site components, schemas, social profiles, and external citations must use this exact string to prevent local authority fragmentation:
- **Business Name:** Navya Ed Tech Pvt. Ltd. (Brand: Navya Ed Tech)
- **Street Address:** Putalisadak (IT Corridor), Ward 28
- **City / Postal Code:** Kathmandu, 44600
- **Province / Country:** Bagmati Province, Nepal
- **Landmark:** Opposite Kathmandu Plaza (5-minute walk from Ratnapark and City Center)
- **Primary Mobile / WhatsApp:** `+977 980-0000000`
- **Campus Landline:** `+977 1-4400000`
- **Primary Email:** `info@navyaedtech.com` / `admissions@navyaedtech.com`
- **Coordinates:** `27.7050° N, 85.3210° E`

### 4.2 Local SEO Roadmap
1. **Google Business Profile (GBP):**
   - Claim or optimize the profile under the primary category: **"Computer Training School"** or **"Educational Institution"**.
   - Add secondary categories: **"Software Training Institute"**, **"Technical School"**.
   - Populate campus operating hours matching website schema (Sun–Fri 07:00–19:00, Sat 09:00–15:00).
   - Upload high-resolution photos of the Putalisadak dual-monitor developer stations, classroom discussion areas, and faculty lab mentors.
2. **Nepali Local Directory Citations:**
   - Ensure accurate NAP presence in Yellow Pages Nepal, Hamro Patro Local Services, TechLekh Directory, and ICT Frame.

---

## 5. Information & Assets Required from Management for Further SEO Work

To proceed with off-page technical indexing, domain verification, and local search authority, the following information and access points are needed from Navya EdTech management:

### 5.1 Domain & Webmaster Verifications
- [ ] **Google Search Console (GSC):** Add DNS TXT verification token to the domain registrar for `navyaedtech.com` or deployment domain.
- [ ] **Bing Webmaster Tools:** Link via Google Search Console authentication for Bing and Copilot search indexing.
- [ ] **Google Analytics 4 (GA4):** Provide `G-XXXXXXXXXX` measurement ID for conversion and syllabus download tracking.

### 5.2 Official Statutory & Business Records
- [ ] **Company Registration Number & PAN/VAT:** Formal registration number from Office of the Company Registrar (OCR) Nepal to display in institutional footer / About schema.
- [ ] **Official Landline Number Verification:** Confirm whether `+977 1-4400000` is the active landline desk or if a new NTC/Ncell number is designated.
- [ ] **Google Business Profile Verification Access:** Designated staff email for Google postcard or video verification at the Putalisadak facility.

### 5.3 Faculty & Academic Verification Assets
- [ ] **Instructor Profiles & LinkedIn URLs:** Public LinkedIn profiles of lead engineering mentors to link within `CourseInstance.instructor` schema for Google E-E-A-T (Experience, Expertise, Authoritativeness, and Trustworthiness).
- [ ] **Campus Laboratory Photos:** 5–10 original, well-lit photographs of the Kathmandu campus laboratory, student workstations, and faculty mentoring sessions to replace stock photography in Google Business Profile and local schema.
