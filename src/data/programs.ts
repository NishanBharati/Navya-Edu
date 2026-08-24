import { Program } from '../types';

export const PROGRAMS: Program[] = [
  {
    id: 'full-stack-career-track',
    slug: 'full-stack-career-track',
    title: 'Full Stack Engineering Career Program',
    category: 'Career Programs',
    tagline: 'An intensive, end-to-end program for candidates preparing for professional software engineering roles.',
    description: 'Our flagship multi-tier career program designed to bridge the gap between academic theory and commercial software engineering. Spanning modern frontend, backend systems, database modeling, cloud deployment, code reviews, and structured capstone engineering.',
    duration: '6 Months (24 Weeks)',
    format: 'Classroom Immersion / Intensive Hybrid',
    eligibility: 'Graduates or final-year students in CS/IT/Engineering or individuals with dedicated full-time learning commitment.',
    whoItsFor: [
      'Fresh graduates looking to secure their first software developer role.',
      'Self-taught programmers seeking rigorous industry structure and mentoring.',
      'Career switchers wanting a comprehensive, guided technology pathway.'
    ],
    whatItIncludes: [
      'Comprehensive MERN Stack & TypeScript curriculum',
      'Advanced Database Architecture & REST API Design',
      'DevOps, Docker & Cloud Deployment fundamentals',
      '3 major production-grade portfolio projects with senior code reviews',
      'Resume reviews, technical interview prep, and project defense sessions'
    ],
    expectedOutcome: [
      'Ability to build and deploy complex full-stack web applications independently.',
      'Strong fluency in Git collaboration workflows, CI/CD, and system architecture.',
      'A verifiable GitHub portfolio with live deployed applications.'
    ],
    coursesIncluded: [
      'MERN Stack Web Development',
      'React & Modern Frontend Engineering',
      'DevOps & Cloud Engineering Fundamentals'
    ]
  },
  {
    id: 'applied-data-ai-program',
    slug: 'applied-data-ai-program',
    title: 'Applied Data Science & Machine Learning Program',
    category: 'Career Programs',
    tagline: 'Comprehensive data engineering, statistical modeling, and machine learning for modern analytical roles.',
    description: 'Designed for analytical professionals and students who want to build real data pipelines, perform rigorous exploratory analysis, train predictive models, and deploy machine learning APIs in production.',
    duration: '4 Months (16 Weeks)',
    format: 'Classroom / Online Live',
    eligibility: 'Basic mathematical aptitude (algebra/statistics) and strong motivation for data problem solving.',
    whoItsFor: [
      'Economics, statistics, mathematics, and engineering graduates.',
      'Business analysts looking to transition to data science and ML engineering.',
      'Software developers wanting to add machine learning capabilities.'
    ],
    whatItIncludes: [
      'Python programming for high-performance computing',
      'Pandas, NumPy & SQL Data Warehousing',
      'Scikit-Learn Machine Learning Pipelines',
      'FastAPI deployment & modern AI model integrations',
      '2 domain-specific analytics capstone projects'
    ],
    expectedOutcome: [
      'Ability to extract, clean, and model datasets to drive business decisions.',
      'Deployment of machine learning APIs capable of serving live predictions.',
      'Statistical reporting and data visualization fluency.'
    ],
    coursesIncluded: [
      'Python, Data Science & Machine Learning'
    ]
  },
  {
    id: 'digital-product-design-track',
    slug: 'digital-product-design-track',
    title: 'UI/UX & Product Design Professional Track',
    category: 'Professional Programs',
    tagline: 'A rigorous hands-on program covering UX research, design systems, Figma workflows, and high-impact case study formulation.',
    description: 'Equips designers and technologists with the practical methodologies needed to design complex digital experiences. From user interviews and wireframes to scalable Figma design systems and developer handoff.',
    duration: '3 Months (12 Weeks)',
    format: 'Classroom / Hybrid',
    eligibility: 'Open to all creative and analytical minds. No prior design software required.',
    whoItsFor: [
      'Aspiring UI/UX and product designers.',
      'Graphic designers transitioning into digital software product design.',
      'Frontend developers wanting to master visual hierarchy and UX design.'
    ],
    whatItIncludes: [
      'User research, customer journey mapping, and empathy modeling',
      'Figma auto-layout, component variants, variables, and design tokens',
      'Interactive prototyping and usability testing protocols',
      '2 detailed UX case studies formatted for international portfolio standards'
    ],
    expectedOutcome: [
      'Production of an industry-standard digital product portfolio.',
      'Mastery of Figma design system creation and management.',
      'Confidence in defending design decisions grounded in user research.'
    ],
    coursesIncluded: [
      'UI/UX & Digital Product Design'
    ]
  },
  {
    id: 'internship-readiness-pathway',
    slug: 'internship-readiness-pathway',
    title: 'Software Engineering Internship Readiness Program',
    category: 'Internship Programs',
    tagline: 'Focused preparation for college students and recent graduates targeting software development internships.',
    description: 'A targeted program that simulates working in a real software team at Navya EdTech. Focuses on code quality, testing, code reviews, collaborative pull requests, and building software that adheres to commercial standards.',
    duration: '8 Weeks',
    format: 'In-Person Laboratory & Code Sprints',
    eligibility: 'Candidates with basic programming knowledge who need practical team engineering experience.',
    whoItsFor: [
      'BSc.CSIT, BCA, BIT, Computer Engineering students seeking practical internship preparation.',
      'Learners who know syntax but struggle to build complete applications in teams.'
    ],
    whatItIncludes: [
      'Weekly agile sprint simulations with tickets and standups',
      'Git branching strategies, code reviews, and pair programming',
      'Testing fundamentals and error handling best practices',
      'Capstone team project evaluated by Navya EdTech engineers'
    ],
    expectedOutcome: [
      'Demonstrated experience collaborating on a multi-developer codebase.',
      'Readiness for technical interviews and corporate software internships.',
      'Verified performance assessment from industry instructors.'
    ],
    coursesIncluded: [
      'Practical Team Engineering Workshop'
    ]
  }
];
