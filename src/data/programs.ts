import { Program } from '../types';

export const PROGRAMS: Program[] = [
  {
    id: 'web-development-career-track',
    slug: 'web-development-career-track',
    title: 'Modern Web Development Career Track',
    category: 'Career Programs',
    tagline: 'Practical, project-based web development from UI foundations to interactive, API-driven web applications.',
    description: 'Our premier frontend and web engineering track designed to bridge the gap between academic theory and commercial web craftsmanship. Spanning semantic HTML5, modern Tailwind CSS styling, JavaScript ES6+ application logic, REST API integration, and cloud deployment on Vercel.',
    duration: '45 Days (7.5 Weeks)',
    format: 'In-Person Computer Lab & Mentored Sprints',
    eligibility: 'Open to beginners and students passionate about building modern web software. Personal laptop required.',
    whoItsFor: [
      'Students and fresh graduates aspiring to become frontend and web engineers.',
      'Career switchers looking to build commercial, production-ready web applications.',
      'Designers and tech enthusiasts who want to bring digital interfaces to life with clean code.'
    ],
    whatItIncludes: [
      'Semantic HTML5, CSS3 Flexbox & Grid, and Tailwind CSS design systems',
      'Modern JavaScript ES6+ application logic, array methods, and async/await',
      'Dynamic DOM manipulation, reusable UI patterns, and client-side state management',
      'REST API consumption and third-party data fetching',
      'Cloud deployment to Vercel with Git branching and GitHub version control',
      '3 major production capstones: E-Commerce Storefront, Real-Time Kanban Board, and Live API Portal'
    ],
    expectedOutcome: [
      'Ability to build responsive, accessible web applications independently.',
      'Live deployed portfolio containing 3 interactive JavaScript applications on Vercel.',
      'Fluency in Git branching, pull requests, and modern frontend tooling.'
    ],
    coursesIncluded: [
      'Web Development'
    ]
  },
  {
    id: 'python-data-science-program',
    slug: 'python-data-science-program',
    title: 'Python & Applied Data Science Program',
    category: 'Career Programs',
    tagline: 'Comprehensive data engineering, statistical modeling, and machine learning for modern analytical roles.',
    description: 'An intensive, multi-tier data intelligence pathway taking you from core Python programming and asynchronous FastAPI microservices to high-impact exploratory data analysis, Pandas data wrangling, SQL querying, and predictive machine learning models with Scikit-Learn.',
    duration: '90 Days (~3 Months)',
    format: 'Classroom Immersion / Intensive Laboratory',
    eligibility: 'Basic mathematical aptitude (algebra/statistics) and strong motivation for analytical problem solving.',
    whoItsFor: [
      'Graduates in CS, IT, BCA, statistics, mathematics, economics, or engineering.',
      'Business analysts looking to transition to data science and ML engineering.',
      'Software developers wanting to add predictive machine learning capabilities.'
    ],
    whatItIncludes: [
      'Foundational and advanced object-oriented Python 3 programming',
      'High-performance data analysis with NumPy, Pandas & SQL Data Warehousing',
      'Exploratory data visualization and statistical trend modeling',
      'Scikit-Learn machine learning pipelines and predictive model evaluation',
      'FastAPI microservices for serving live machine learning predictions',
      'Domain capstones using real Nepali economic, agriculture, and market datasets'
    ],
    expectedOutcome: [
      'Ability to clean, transform, analyze, and extract business insights from complex datasets.',
      'Deployment of machine learning APIs capable of serving live predictions.',
      'Statistical reporting and data visualization fluency showcased in a public portfolio.'
    ],
    coursesIncluded: [
      'Python Beginner',
      'Python Advance',
      'Data Science'
    ]
  },
  {
    id: 'python-software-engineering',
    slug: 'python-software-engineering',
    title: 'Python Software Engineering Track',
    category: 'Specialized Tracks',
    tagline: 'Master clean object-oriented Python, asynchronous concurrency, and scalable API backend systems.',
    description: 'A structured software engineering pathway combining fundamental logic with production-grade backend engineering. Cover internal Python object models, dunder protocols, asynchronous I/O with AsyncIO, concurrency with multiprocessing, decorators, FastAPI microservices, and database ORMs with SQLAlchemy.',
    duration: '80 Days (~3 Months)',
    format: 'Classroom & Hands-On Coding Lab',
    eligibility: 'Candidates wanting rigorous programming foundations and production software craftsmanship.',
    whoItsFor: [
      'Complete beginners wanting an end-to-end pathway to professional Python programming.',
      'College students in BCA, BSc.CSIT, or Engineering seeking strong backend skills.',
      'Developers wanting to master asynchronous concurrency and microservice architecture.'
    ],
    whatItIncludes: [
      'PEP 8 idiomatic Python syntax, data structures, and OOP design patterns',
      'File handling, JSON/CSV parsing, and automation scripting',
      'Asynchronous I/O with AsyncIO and multiprocessing concurrency',
      'FastAPI REST microservice creation, Pydantic validation & SQLAlchemy ORM',
      'Unit testing with pytest, Git version control, and GitHub workflows',
      '3 major projects: Personal Finance Tracker CLI, Async Scraper, and Auth Microservice'
    ],
    expectedOutcome: [
      'Mastery of professional Python programming from CLI utilities to backend microservices.',
      'Ability to architect resilient asynchronous web services with database persistence.',
      'A verifiable GitHub portfolio with production code reviewed by senior engineers.'
    ],
    coursesIncluded: [
      'Python Beginner',
      'Python Advance'
    ]
  },
  {
    id: 'young-coders-stem-track',
    slug: 'young-coders-stem-track',
    title: 'Young Coders & STEM Foundation Pathway',
    category: 'Kids & School Programs',
    tagline: 'Inspiring the next generation of engineers through creative game design and interactive computational logic.',
    description: 'A two-stage progressive coding curriculum designed specifically for young learners and school students. Starts with visual block-based storytelling and algorithmic sequencing in Scratch Beginner, and advances into 2D arcade physics, velocity math, collision detection, and multi-level game architecture in Scratch Advanced.',
    duration: '60 Days (2 Months)',
    format: 'Interactive Laboratory & Creative Sprints',
    eligibility: 'School students (Grade 4–12) with enthusiasm for creativity, games, and technology. No prior coding required.',
    whoItsFor: [
      'School students (+2 and below) taking their first steps in computer science.',
      'Young learners interested in creating video games, animations, and interactive stories.',
      'Parents seeking structured, creative screen time and computational thinking for kids.'
    ],
    whatItIncludes: [
      'Visual block-based logic, motion math, and coordinate geometry',
      'Event broadcasting, condition trees, loops, and variable state management',
      'Custom functions (My Blocks), collision detection, and clone management',
      '2D arcade platformer game physics, jump mechanics, and enemy waves',
      'Interactive capstone game showcase and certificate of achievement'
    ],
    expectedOutcome: [
      'Strong grasp of foundational computational thinking and algorithmic sequencing.',
      'Creation of 6+ published interactive games, animations, and quizzes.',
      'Confidence and readiness for transition into text-based coding languages like Python.'
    ],
    coursesIncluded: [
      'Scratch Beginner',
      'Scratch Advanced'
    ]
  }
];
