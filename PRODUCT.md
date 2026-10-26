# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary (confirmed 2026-10-26): parents choosing a coding course for their child aged 8 to 16** in Kathmandu. They are deciding whether this institute is safe, credible and worth the fee for their child, usually comparing a few options, often on a phone, and they act by talking to an advisor or applying.
- Secondary: the learners themselves (teens moving from Scratch into Python and web development), and young adults / university students taking the Python, Web Development and Data Science courses.
- Tertiary: schools, colleges and organisations buying institutional training (`/corporate-training`).

## Product Purpose

Navya Ed Tech is an IT training institute in Putalisadak, Kathmandu that teaches coding through hands-on, project-based classes in a physical lab. Success is a parent (or learner) confident enough to book an advisor conversation or apply for a batch.

## Positioning

- The site presents **Navya Ed Tech as an independent brand**. The user asked to "keep this site independent"; read as: the institute stands on its own, and pages should not lean on the parent software company (navyaedtech.com) as the core selling point. *(Interpretation; confirm before removing remaining parent-company mentions.)*
- Mechanism to convey: small cohorts (1:12 mentor ratio), learning by building real projects, a clear path that grows with the child (Scratch Beginner, Scratch Advanced, then Python Beginner, Web Development, Python Advance, Data Science), and transparent admissions.

## Operating Context

- Courses (from `src/data/courses.ts`): Scratch Beginner (30 days), Scratch Advanced (30 days), Python Beginner (40 days), Python Advance (40 days), Web Development (45 days), Data Science (50 days). Mode: classroom / in-person. Fees are quoted on inquiry in NPR.
- Career programs (`src/data/programs.ts`), pricing, apply form, contact, FAQ, insights articles, student work (curriculum reference capstones).
- Conversion paths: Advisor modal (inquiry stored in Supabase), `/apply`, `/contact`.
- Admin dashboard (`/admin`) manages courses, programs, student work, insights, testimonials, inquiries and settings through Supabase.

## Capabilities and Constraints

- Stack: Vite, React 19, TypeScript, Tailwind CSS v4, Framer Motion, React Router 7, Supabase; static pre-rendering of public routes for SEO.
- Design and motion pass only: business logic, data fetching, routing, auth and Supabase integration must not change.
- Phone number `+977 980-0000000` is **unconfirmed** (likely placeholder).
- Age range copy is inconsistent in the code (7 to 14, 8 to 14, 8 to 16, 11+); the user stated 8 to 16 as the audience.

## Evidence on Hand

- **None yet** (confirmed): no real lab or class photography, no verified testimonials, placements or partner logos, no real student projects beyond the curriculum reference capstones.
- Existing course and hero images in `public/images/` and the hero video `public/videos/1.mp4` are illustrative, not documentary. Anything illustrative must be labelled or framed as illustrative; never present it as real students, results or reviews.
- Do not fabricate testimonials, ratings, enrolment numbers, placement rates or partner logos.

## Product Principles

1. A parent should understand within one screen what their child will learn, how, and what to do next.
2. Earn trust through transparency and specifics (class size, schedule, curriculum, what the child builds), not claims.
3. Show the learning path growing with the child, from first blocks to real code.
4. Keep the adult and institutional audiences served without diluting the family-first story.

## Accessibility & Inclusion

WCAG 2.1 AA contrast, full keyboard support, visible focus, `prefers-reduced-motion` honoured everywhere, readable on low-end Android phones and slow connections common in Nepal.
