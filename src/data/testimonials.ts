/**
 * Verified Student Work, Capstone Deliverables & Testimonial Policy Data
 *
 * In adherence with institutional transparency principles:
 * - We do not fabricate 5-star ratings or publish unverified student identities.
 * - Formal alumni reviews and employer case studies are released upon verified employment
 *   and signed graduate consent per cohort graduation.
 * - Genuine proof of learning is demonstrated through production-grade capstone repositories.
 */

export interface VerifiedStudentCapstone {
  id: string;
  title: string;
  category: string;
  courseName: string;
  courseSlug: string;
  deliverableType: string;
  description: string;
  technologies: string[];
  keyCompetencies: string[];
  demoHost: string;
}

export const VERIFIED_CAPSTONES: VerifiedStudentCapstone[] = [
  {
    id: 'capstone-1',
    title: 'Multi-Vendor E-Commerce Platform & Admin Dashboard',
    category: 'Web Development',
    courseName: 'Web Development',
    courseSlug: 'web-development',
    deliverableType: 'Production Web Application',
    description:
      'Complete end-to-end multi-vendor marketplace featuring JWT authentication, Stripe/Fonepay payment simulation, inventory tracking, and responsive customer storefront.',
    technologies: ['MongoDB', 'Express.js', 'React 18', 'Node.js', 'Tailwind CSS', 'Redux Toolkit'],
    keyCompetencies: [
      'Modular REST API architecture with role-based access control (RBAC)',
      'Database schema normalization and indexing in MongoDB Atlas',
      'Production deployment on cloud hosts with CI/CD integration',
    ],
    demoHost: 'Vercel & Render',
  },
  {
    id: 'capstone-2',
    title: 'High-Throughput Asynchronous Task & Notification Engine',
    category: 'Python Architecture',
    courseName: 'Advanced Python Software Architecture',
    courseSlug: 'python-advance',
    deliverableType: 'Backend Microservice',
    description:
      'Distributed task processing system engineered with FastAPI, Celery, and Redis caching. Handles background queueing, automated email alerts, and database migrations.',
    technologies: ['Python 3.12+', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Alembic'],
    keyCompetencies: [
      'AsyncIO concurrency patterns for high-throughput API endpoints',
      'Relational schema migrations and transactional integrity with SQLAlchemy',
      'Dockerized multi-container orchestration with unit and integration test suites',
    ],
    demoHost: 'DigitalOcean Docker Droplet',
  },
  {
    id: 'capstone-3',
    title: 'Nepal Market Commodity Price Analytics & Forecasting System',
    category: 'Data Science & Machine Learning',
    courseName: 'Applied Data Science & Machine Learning',
    courseSlug: 'data-science',
    deliverableType: 'Data Pipeline & ML Dashboard',
    description:
      'Automated data ingestion pipeline parsing agricultural market price records in Nepal, cleaning time-series data with Pandas, and forecasting price trends using Scikit-Learn regression models.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Streamlit', 'Plotly'],
    keyCompetencies: [
      'Exploratory data analysis (EDA) and data wrangling on real local market datasets',
      'Feature engineering, cross-validation, and regression metric evaluation (RMSE, R2)',
      'Interactive analytical dashboard deployed for public exploration',
    ],
    demoHost: 'Streamlit Cloud',
  },
  {
    id: 'capstone-4',
    title: 'Modern Enterprise Task & Workflow Management Application',
    category: 'Frontend Engineering',
    courseName: 'Modern Web Development with HTML, CSS & JavaScript',
    courseSlug: 'web-development',
    deliverableType: 'Interactive Client Application',
    description:
      'Interactive project board with drag-and-drop task progression, modular JavaScript ES6+ architecture, local storage persistence, and accessible WCAG AA keyboard navigation.',
    technologies: ['HTML5 Semantic Markup', 'Tailwind CSS', 'JavaScript ES6+', 'Local Storage API', 'Fetch REST API'],
    keyCompetencies: [
      'DOM event delegation, state synchronization, and decoupled UI rendering',
      'Mobile-first responsive styling utilizing Flexbox and CSS Grid',
      'Accessible focus management and semantic ARIA labeling',
    ],
    demoHost: 'Vercel',
  },
];

export const TESTIMONIAL_POLICY = {
  policyHeadline: 'Founding Batch Transparency & Feedback Policy',
  statement:
    'Navya Ed Tech never publishes fabricated reviews, artificial 5-star ratings, or synthetic student profiles. As an engineering-first institution in our inaugural year, verified student retrospectives, interview recordings, and employment transitions will be published strictly following the successful capstone defense of our first graduating cohorts with signed graduate consent.',
  verificationProcess: [
    'Independent defense of capstone project architecture before an engineering review panel',
    'Verification of 80%+ classroom attendance and completed GitHub assignment deliverables',
    'Explicit written authorization before publishing student names or repository links',
  ],
};

import type { Testimonial } from '../types';

// Inaugural founding cohorts are currently in progress. Zero synthetic reviews.
export const TESTIMONIALS: Testimonial[] = [];

