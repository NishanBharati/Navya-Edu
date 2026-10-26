# Navya Ed Tech — Content Management Guide

**Version:** 1.0  
**Audience:** Academic Counselors, Course Coordinators, Content Editors, and Administrative Staff  
**Portal Access:** `https://navya-edu.vercel.app/admin` (or `https://navyaedtech.com/admin`)

---

## 1. Administrative Portal Overview

The Navya Ed Tech administrative workstation is accessible at `/admin`. It enables non-technical staff to manage the institute's courses, batch dates, fees, syllabus PDFs, career programs, student portfolios, blog insights, and student inquiries in real time.

### Logging In
1. Navigate to `/admin/login`.
2. Enter your authorized institute email address and password.
3. If an incorrect password is entered 5 times consecutively, the login form will lock out for 60 seconds to prevent brute-force attacks.
4. Once authenticated, your session token is securely persisted in browser memory.

---

## 2. Managing Courses & Syllabus Outlines

Navigate to **Admin &rarr; Courses** (`/admin/courses`).

### 2.1 Creating or Updating a Course
Click **Add New Course** or click the **Edit** icon on an existing course card:
1. **Basic Details:**
   - **Course Title:** Official name (e.g., *MERN Stack Development*).
   - **Slug:** URL identifier (e.g., `mern-stack-development`). *Keep lowercase with hyphens.*
   - **Category:** Select from `Web Development`, `Programming & Python`, `UI/UX & Product Design`, `Data & AI`, or `Kids Coding`.
   - **Delivery Mode:** `Classroom (Kathmandu)`, `Online Live`, or `Hybrid`.
   - **Level:** `Beginner`, `Intermediate`, `Advanced`, or `All Levels`.
   - **Duration:** e.g., `12 Weeks (120 Hours Practical Lab)`.
   - **Course Fee:** State clearly in Nepalese Rupees (NPR), e.g., `NPR 28,000 (Installment Available)`.

2. **Upcoming Batch Schedule:**
   - **Start Date:** Next cohort date, e.g., `October 15, 2026`.
   - **Schedule Timing:** e.g., `Morning 7:00 AM – 9:00 AM (Sun–Fri)`.
   - **Seats Status:** Select `Enrolling Now`, `Limited Seats Available`, `Filling Fast`, or `Batch Full`.

3. **Curriculum Modules:**
   - Break coursework down into structured weekly modules.
   - Each module includes: Module Title, Duration, Description, and Key Topics.

4. **Attaching Official Syllabus PDF:**
   - Use the **Course Syllabus PDF** upload section.
   - You can upload a customized official PDF document (up to 25MB) directly into the Supabase `media` bucket, or provide an external URL.
   - *If no custom PDF is attached, the system will automatically synthesize an official verified vector PDF dynamically upon student download requests.*

5. **Publication Status:**
   - `published`: Visible publicly on `/courses`.
   - `upcoming`: Marked with "Upcoming Cohort" badge.
   - `draft`: Only viewable by authenticated staff with `?preview=true`.
   - `archived`: Retired course, hidden from public index.

---

## 3. Managing Career Programs

Navigate to **Admin &rarr; Programs** (`/admin/programs`).

Career programs represent bundled multidisciplinary tracks (e.g., *Full Stack Web Developer Track*):
- **Tagline & Overview:** Value proposition bridging academia and industry.
- **Duration & Format:** Comprehensive duration (e.g., `6 Months • Full-Time Immersion`).
- **Courses Included:** Array of core courses included in this track.
- **Who It's For & Expected Outcomes:** Clear guidance on prerequisite education and graduation readiness.

---

## 4. Student Work Showcase & Capstone Portfolios

Navigate to **Admin &rarr; Student Work** (`/admin/student-work`).

Student project showcases demonstrate authentic graduate quality to prospective employers:
- **Project Title:** e.g., *Nepal Heritage Tourism Portal*.
- **Category:** Matches the course category.
- **Technologies Used:** Tags representing tools (e.g., `React`, `TypeScript`, `Node.js`, `TailwindCSS`).
- **Image URL:** Project screenshot or interface mockup.
- **Context & Highlights:** Summary of problem solved and engineering achievements.

---

## 5. Writing & Publishing Blog Insights

Navigate to **Admin &rarr; Insights** (`/admin/insights`).

The insights section serves as the institute's technical publication channel:
- **Title & Slug:** e.g., *Why Project-Based Learning Outperforms Passive Tutorials*.
- **Category & Read Time:** e.g., `Pedagogy & Careers` • `5 min read`.
- **Author Information:** Name, role (e.g., `Lead Instructor`), and avatar URL.
- **Content Paragraphs:** Markdown or structured text paragraphs detailing practical concepts.
- **SEO Title & Description:** Search engine metadata for Google indexing.

---

## 6. Approving & Moderating Student Testimonials

Navigate to **Admin &rarr; Testimonials** (`/admin/testimonials`).

> [!IMPORTANT]
> **Consent Policy Enforcement:** To protect student privacy under Nepal's *Individual Privacy Act, 2075*, student testimonials are strictly isolated from the public website unless two conditions are met:
> 1. `status` must be set to **`Approved`**.
> 2. `consentConfirmed` must be checked **`Yes`** (representing signed or recorded affirmative student consent).

1. Click **Review Testimonial**.
2. Verify the student's name, role, company, and capstone course.
3. Confirm that written or digital affirmative consent was provided by the student.
4. Set status to **Approved** and toggle **Consent Confirmed** to `ON`.
5. Optionally toggle **Featured on Homepage** to showcase on the main landing page.

---

## 7. Keeping Static Seed Files Updated

For maximum SEO performance, the website generates static HTML versions of courses and blog posts during `npm run build` using the files in `src/data/`:
- [`src/data/courses.ts`](file:///c:/Users/ASUS/Desktop/Navya-Edu/src/data/courses.ts)
- [`src/data/insights.ts`](file:///c:/Users/ASUS/Desktop/Navya-Edu/src/data/insights.ts)

When major curriculum overhauls or permanent new courses are introduced, update the corresponding TypeScript file and run `npm run build` to bake the updates into the static search engine crawl index.
