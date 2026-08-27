import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'mern-stack-development',
    slug: 'mern-stack-development',
    title: 'MERN Stack Web Development',
    category: 'Development',
    shortDescription: 'Build scalable full-stack web applications using MongoDB, Express.js, React, and Node.js with modern production workflows.',
    description: 'A comprehensive, project-driven training curriculum designed to take you from foundational JavaScript through building, securing, and deploying multi-tier web applications. You will write clean modular code, design RESTful APIs, manage complex client state, and deploy to cloud environments.',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    duration: '4 Months',
    level: 'Intermediate',
    mode: 'Classroom / In-Person',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 9:00 AM) & Evening (5:00 PM – 7:00 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'JavaScript ES6+',
      'React 18+',
      'Node.js',
      'Express.js',
      'MongoDB & Mongoose',
      'TypeScript',
      'REST APIs',
      'JWT Authentication',
      'Git & GitHub',
      'Postman',
      'Tailwind CSS',
      'Vercel / Render Deployment'
    ],
    targetAudience: [
      'Students and graduates in Computer Science, BCA, BSc.CSIT, BIT, or engineering disciplines.',
      'Aspiring developers with basic HTML/CSS/JS knowledge who want to build end-to-end applications.',
      'Frontend developers wanting to master backend API architecture and database persistence.',
      'Professionals seeking structured hands-on web engineering skills for technical employment in Nepal or remote.'
    ],
    prerequisites: [
      'Basic familiarity with programming logic and HTML/CSS fundamentals.',
      'A personal laptop for practical laboratory exercises and project development.'
    ],
    outcomes: [
      'Architect, build, and deploy production-ready full-stack applications.',
      'Implement robust JWT token-based authentication and role-based access control (RBAC).',
      'Design normalized and embedded MongoDB database schemas with indexing and aggregation pipelines.',
      'Develop modular React frontends with reusable component architectures and state management.',
      'Use Git branches, pull requests, and continuous deployment workflows.'
    ],
    projects: [
      {
        title: 'Multi-Vendor E-Commerce Engine',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
        description: 'Complete storefront with product catalog, cart persistence, vendor inventory management, order lifecycles, and Khalti/eSewa payment webhook integration.',
        type: 'Full-Stack Web App'
      },
      {
        title: 'Collaborative Workspace & Task Management Platform',
        technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'MongoDB'],
        description: 'Real-time kanban boards, task assignments, role permissions, activity audit trails, and live status notifications.',
        type: 'Real-Time Application'
      },
      {
        title: 'Secure RESTful API Gateway for Healthcare Records',
        technologies: ['Node.js', 'Express', 'Mongoose', 'Postman', 'Docker'],
        description: 'Comprehensive API with rate limiting, input sanitization, automated schema validation, and Swagger API documentation.',
        type: 'Backend Service'
      }
    ],
    upcomingClasses: [
      { date: '26 Aug 2026', time: '05:00 PM - 06:30 PM', mode: 'Evening Batch' },
      { date: '30 Aug 2026', time: '08:00 AM - 09:30 AM', mode: 'Morning Batch' },
      { date: '07 Sep 2026', time: '08:00 AM - 09:30 AM', mode: 'Morning Batch' },
      { date: '07 Sep 2026', time: '03:30 PM - 05:00 PM', mode: 'Afternoon Batch' },
      { date: '15 Sep 2026', time: '06:00 PM - 07:30 PM', mode: 'Evening Batch' },
      { date: '22 Sep 2026', time: '07:00 AM - 08:30 AM', mode: 'Morning Batch' },
      { date: '01 Oct 2026', time: '05:00 PM - 06:30 PM', mode: 'Evening Batch' }
    ],
    whyChooseThis: {
      title: 'Why MERN Stack?',
      points: [
        {
          headline: 'Single Language, Industry Standard:',
          detail: 'JavaScript powers both backend development with Node.js and Express and frontend development with React and Next.js, making it easier to learn and apply skills across the full stack.'
        },
        {
          headline: 'High-Demand Skill:',
          detail: 'Learn an open-source technology stack supported by a large developer community and widely used across the industry, creating opportunities for both entry-level and experienced developers.'
        },
        {
          headline: 'Full-Stack Mastery:',
          detail: 'Build strong database skills with MongoDB and PostgreSQL, backend expertise with Node.js and Express, and frontend skills with React and Next.js. Add Generative AI to become a Prompt-AI-driven Full Stack Developer.'
        },
        {
          headline: 'Scalable, Real-World Projects:',
          detail: 'Build applications ranging from e-commerce platforms to enterprise ERP systems and develop the skills needed to handle projects of different scales and complexity.'
        },
        {
          headline: 'Hands-On, Project-Based Training:',
          detail: 'Gain practical experience through real-world projects and guided training from industry-experienced instructors at Navya EdTech.'
        }
      ]
    },
    curriculum: [
      {
        moduleNumber: 'Lesson 1',
        title: 'JavaScript With Git',
        duration: '2 Weeks',
        topics: [
          'Overview of web development',
          'Key Features and Applications',
          'MERN Stack roadmap',
          'Environment Setup (Node.js, MongoDB, VSCode, Git)',
          'JavaScript Core Fundamentals & ES6+',
          'Git Branches, Pull Requests & Version Control'
        ],
        subLessons: [
          {
            subNumber: '1.1',
            title: 'Introduction to Web Development and Git Basics',
            topics: [
              'Overview of web development.',
              'Key Features and Applications',
              'MERN Stack roadmap',
              'Environment Setup',
              'Installing Required Tools (Node.js, MongoDB, VSCode, Git)',
              'Setting up development tools: Node.js, npm, VS Code.'
            ]
          },
          {
            subNumber: '1.2',
            title: 'JavaScript (JS) Basics',
            topics: [
              'Variables (var, let, const) and Data Types',
              'Operators, Type Coercion and Equality',
              'Control Flow (if/else, switch, loops)'
            ]
          },
          {
            subNumber: '1.3',
            title: 'Function Declaration and Expression',
            topics: [
              'Function declarations vs expressions',
              'Arrow functions and lexical this',
              'Higher-order functions and Callback patterns'
            ]
          },
          {
            subNumber: '1.4',
            title: 'DSA Overview',
            topics: [
              'Array transformations (map, filter, reduce, find)',
              'Object manipulation and memory references',
              'Time and space complexity fundamentals'
            ]
          },
          {
            subNumber: '1.5',
            title: 'Introduction to ES6+',
            topics: [
              'Destructuring, Spread/Rest operators',
              'Template Literals and Enhanced Object Literals',
              'Promises, Async/Await and Error Handling'
            ]
          },
          {
            subNumber: '1.6',
            title: 'Git and Versioning',
            topics: [
              'Git init, staging, commits and log history',
              'Branching strategies, merging and conflict resolution',
              'Remote GitHub repositories and SSH configuration'
            ]
          },
          {
            subNumber: '1.7',
            title: 'TypeScript Foundations',
            topics: [
              'Type annotations, interfaces and type aliases',
              'Generics and Union/Intersection types',
              'Strict compiler configurations and TS workflows'
            ]
          }
        ],
        practicalExercise: 'Build an interactive CLI task tracker and asynchronous data validation utility in TypeScript.',
        expectedOutcome: 'Command modern JavaScript and TypeScript without relying on boilerplate code.'
      },
      {
        moduleNumber: 'Lesson 2',
        title: 'Frontend Technology: Learning React and Next.js with AI',
        duration: '2 Weeks',
        topics: [
          'Modern Frontend Architecture & Tooling',
          'Next.js App Router & Server Components',
          'Tailwind CSS & Glassmorphic UI Systems',
          'AI-assisted code generation & Prompt workflows'
        ],
        subLessons: [
          {
            subNumber: '2.1',
            title: 'Modern Frontend Architecture & Vite Setup',
            topics: [
              'Client-Side Rendering (CSR) vs Server-Side Rendering (SSR)',
              'Vite tooling and project folder scaffolding',
              'JSX/TSX syntax and component composition'
            ]
          },
          {
            subNumber: '2.2',
            title: 'Next.js App Router & Server Components',
            topics: [
              'React Server Components (RSC) vs Client Components',
              'File-system based routing, layouts and nested routes',
              'AI prompt engineering for rapid component prototyping'
            ]
          },
          {
            subNumber: '2.3',
            title: 'Tailwind CSS & Responsive Layout Systems',
            topics: [
              'Tailwind configuration and design token system',
              'Responsive container grids and flexbox layouts',
              'Modern UI micro-interactions and dark mode themes'
            ]
          }
        ],
        practicalExercise: 'Develop a responsive landing page and product dashboard with Next.js and Tailwind CSS.',
        expectedOutcome: 'Architect high-performance user interfaces with modern React and Next.js principles.'
      },
      {
        moduleNumber: 'Lesson 3',
        title: 'React Fundamentals (using Ts)',
        duration: '2 Weeks',
        topics: [
          'Component lifecycle and Virtual DOM reconciliation',
          'State, Props and Custom Hooks in TypeScript',
          'Context API & Global State Management',
          'React Hook Form with Zod Schema Validation'
        ],
        subLessons: [
          {
            subNumber: '3.1',
            title: 'Component State & Prop Drilling Solutions',
            topics: [
              'useState, useEffect, and useRef deeply explained',
              'State lifting and unidirectional data flow',
              'Prop types vs TypeScript interfaces'
            ]
          },
          {
            subNumber: '3.2',
            title: 'Advanced React Hooks',
            topics: [
              'useMemo and useCallback performance optimizations',
              'useReducer for complex state transitions',
              'Building custom reusable data-fetching hooks'
            ]
          },
          {
            subNumber: '3.3',
            title: 'Forms and Data Validation',
            topics: [
              'Controlled vs Uncontrolled components',
              'React Hook Form integration',
              'Type-safe Zod schema validation'
            ]
          }
        ],
        practicalExercise: 'Build a multi-step user onboarding and settings dashboard with dynamic forms and live validation.',
        expectedOutcome: 'Construct robust, type-safe React applications.'
      },
      {
        moduleNumber: 'Lesson 4',
        title: 'React with Next.js',
        duration: '2 Weeks',
        topics: [
          'Server Actions & Data Mutations',
          'Static Site Generation (SSG) & Incremental Static Regeneration (ISR)',
          'Route Handlers and RESTful API Endpoints in Next.js',
          'Optimistic UI Updates and Caching Strategies'
        ],
        subLessons: [
          {
            subNumber: '4.1',
            title: 'Data Fetching & Server Actions',
            topics: [
              'Server Actions for database mutations',
              'Streaming with Suspense and loading states',
              'Revalidation tags and ISR caching'
            ]
          },
          {
            subNumber: '4.2',
            title: 'Next.js Route Handlers',
            topics: [
              'Creating GET, POST, PUT, DELETE route handlers',
              'Request validation and header manipulations',
              'Connecting with external REST APIs'
            ]
          }
        ],
        practicalExercise: 'Build a dynamic blog and content management system with server actions and revalidation.',
        expectedOutcome: 'Build fast full-stack applications with Next.js.'
      },
      {
        moduleNumber: 'Lesson 5',
        title: 'Frontend Project Module',
        duration: '2 Weeks',
        topics: [
          'Production-Ready E-Commerce Storefront',
          'Cart Persistence & Global Checkout State',
          'Payment Gateway Webhooks (Khalti / eSewa)',
          'Lighthouse 95+ Performance Auditing'
        ],
        subLessons: [
          {
            subNumber: '5.1',
            title: 'Storefront Architecture & Product Catalog',
            topics: [
              'Product grid with multi-filter faceted search',
              'Product detail pages with image galleries and variant selectors',
              'Cart management with LocalStorage persistence'
            ]
          },
          {
            subNumber: '5.2',
            title: 'Payment Integration & Webhooks',
            topics: [
              'Khalti and eSewa payment integration',
              'Webhook event handling and order verification',
              'Invoice PDF generation and order summary'
            ]
          }
        ],
        practicalExercise: 'Complete and deploy an interactive e-commerce storefront with live payment processing.',
        expectedOutcome: 'Deliver a production-ready commercial frontend.'
      },
      {
        moduleNumber: 'Lesson 6',
        title: 'Node js With Express',
        duration: '2 Weeks',
        topics: [
          'Event-driven Node.js runtime and architecture',
          'RESTful API design with Express router',
          'JWT Authentication, Bcrypt and Cookie Security',
          'Error handling middleware and Winston logging'
        ],
        subLessons: [
          {
            subNumber: '6.1',
            title: 'Node.js Core Architecture',
            topics: [
              'The Event Loop, Libuv and thread pool',
              'Buffers, Streams and file system manipulation',
              'Node.js Module system (CommonJS vs ESM)'
            ]
          },
          {
            subNumber: '6.2',
            title: 'Express Server & Routing',
            topics: [
              'Custom middleware creation (auth, logger, rate-limit)',
              'Controller and service pattern architecture',
              'RESTful URL conventions and status code standards'
            ]
          },
          {
            subNumber: '6.3',
            title: 'Authentication & Security',
            topics: [
              'JWT access & refresh token rotation strategies',
              'Password hashing with Bcrypt and salt rounds',
              'CORS, Helmet, Rate limiting and XSS protection'
            ]
          }
        ],
        practicalExercise: 'Build a secure, modular REST API gateway with JWT auth, role-based access control, and Swagger docs.',
        expectedOutcome: 'Architect enterprise-grade backend APIs.'
      },
      {
        moduleNumber: 'Lesson 7',
        title: 'Database and Usages',
        duration: '2 Weeks',
        topics: [
          'MongoDB Architecture & NoSQL Data Modeling',
          'Mongoose Schema, Hooks and Virtuals',
          'Aggregation Pipelines, Indexes & Lookup Joins',
          'Database Transactions and Redis Caching'
        ],
        subLessons: [
          {
            subNumber: '7.1',
            title: 'Document Data Modeling',
            topics: [
              'Relational vs Document database modeling tradeoffs',
              'Embedding vs Referencing documents',
              'Schema validation and indexing for performance'
            ]
          },
          {
            subNumber: '7.2',
            title: 'Complex Aggregations & Query Optimization',
            topics: [
              '$match, $group, $lookup, $project, and $facet stages',
              'Text search indexing and geospatial queries',
              'MongoDB Atlas cluster setup and backup routines'
            ]
          }
        ],
        practicalExercise: 'Design and benchmark a scalable database schema for an analytics dashboard with complex aggregations.',
        expectedOutcome: 'Store, query, and optimize high-throughput databases.'
      },
      {
        moduleNumber: 'Lesson 8',
        title: 'Project Modules',
        duration: '2 Weeks',
        topics: [
          'Full-Stack Capstone Defense & Architecture Review',
          'Docker Containerization & Multi-Stage Builds',
          'CI/CD with GitHub Actions and Cloud Deployment',
          'Technical Presentation and Portfolio Defense'
        ],
        subLessons: [
          {
            subNumber: '8.1',
            title: 'Capstone System Integration',
            topics: [
              'Connecting Next.js/React frontend with Node/Express/Mongo backend',
              'Real-time features using WebSockets / Socket.io',
              'Comprehensive unit and integration testing'
            ]
          },
          {
            subNumber: '8.2',
            title: 'Docker & Production Cloud Deployment',
            topics: [
              'Dockerizing Node.js and Next.js applications',
              'Continuous integration and deployment via GitHub Actions',
              'Deploying frontend to Vercel and API to Render/AWS with custom domains',
              'Live Capstone Defense in front of engineering panel'
            ]
          }
        ],
        practicalExercise: 'Deploy a multi-tier collaborative enterprise web application to live production URLs with full documentation.',
        expectedOutcome: 'Graduate with a verified, deployed full-stack portfolio.'
      }
    ],
    careerPaths: [
      'Full Stack Developer (MERN)',
      'Frontend Developer (React)',
      'Backend Developer (Node.js/Express)',
      'Junior Software Engineer',
      'Web Application Engineer'
    ],
    instructor: {
      name: '[Senior Software Engineer at Navya EdTech / Industry Practitioner]',
      role: 'Full Stack Engineering Lead',
      experience: '6+ years in commercial web applications and distributed systems',
      specialization: 'Node.js, React, Distributed Architecture, Scalable Databases',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Who is eligible to enroll in this MERN stack course?',
        answer: 'Anyone with a basic understanding of computer operations and programming logic. Prior experience with HTML, CSS, or basic JavaScript is helpful but we also cover modern JS fundamentals thoroughly in the initial weeks.'
      },
      {
        question: 'Is this training available in-person in Kathmandu or online?',
        answer: 'We offer both physical classroom sessions at our Kathmandu training facility and interactive online live sessions with hands-on lab support.'
      },
      {
        question: 'Will I build real projects during the course?',
        answer: 'Yes. Every module includes mandatory practical assignments, and the final 4 weeks are dedicated to architecting and deploying an end-to-end full-stack capstone project.'
      },
      {
        question: 'Do you provide course completion certificates?',
        answer: 'Yes, students who successfully complete all module projects and their capstone evaluation receive a verified Certificate of Completion from Navya Ed Tech Pvt. Ltd.'
      },
      {
        question: 'How do I enquire about the next batch and fees?',
        answer: 'Click "Talk to an Advisor" or fill out the enquiry form on this page. Our education advisory team will reach out with the batch timings, curriculum outline, and fee details.'
      }
    ],
    seoTitle: 'MERN Stack Course in Nepal | Full Stack Web Development Training Kathmandu',
    seoDescription: 'Master MERN stack web development in Nepal with Navya Ed Tech. Learn React, Node.js, Express, and MongoDB through real project development.'
  },
  {
    id: 'python-data-science-ai',
    slug: 'python-data-science-ai',
    title: 'Python, Data Science & Machine Learning',
    category: 'Data & AI',
    shortDescription: 'Master modern Python programming, statistical data analysis, machine learning models, and practical AI workflow implementation.',
    description: 'Designed for analytical minds wanting to harness Python for data analysis, business intelligence, predictive modeling, and applied machine learning. Learn to manipulate datasets with Pandas and NumPy, build predictive models with Scikit-Learn, and understand modern AI integration techniques.',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    duration: '3.5 Months',
    level: 'Beginner to Intermediate',
    mode: 'Classroom / In-Person',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday',
      classTime: 'Morning (6:30 AM – 8:30 AM) & Evening (4:30 PM – 6:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Python 3.12+',
      'NumPy',
      'Pandas',
      'Matplotlib & Seaborn',
      'Scikit-Learn',
      'Jupyter Labs',
      'SQL & PostgreSQL',
      'FastAPI',
      'Git & GitHub',
      'Applied LLM APIs'
    ],
    targetAudience: [
      'Undergraduates and professionals in STEM, economics, finance, or business analytics.',
      'Developers transitioning into data analysis and machine learning engineering.',
      'Anyone looking to develop strong programmatic problem-solving with Python.'
    ],
    prerequisites: [
      'High-school level mathematics and logical problem-solving aptitude.',
      'No mandatory prior coding experience required; Python starts from foundational syntax.'
    ],
    outcomes: [
      'Clean, transform, and analyze complex unstructured and structured datasets.',
      'Build end-to-end supervised and unsupervised machine learning pipelines.',
      'Deploy predictive ML models as production REST APIs using FastAPI.',
      'Perform exploratory data analysis (EDA) with publication-quality visualizations.',
      'Integrate AI services and embedding workflows into practical applications.'
    ],
    projects: [
      {
        title: 'Customer Churn & Risk Prediction Engine',
        technologies: ['Python', 'Pandas', 'Scikit-Learn', 'FastAPI'],
        description: 'End-to-end machine learning system that ingests historical customer telemetry to predict churn probabilities with explainable feature importance.',
        type: 'Machine Learning Pipeline'
      },
      {
        title: 'Automated Financial Market & Inflation Analytics System',
        technologies: ['Python', 'Pandas', 'Matplotlib', 'PostgreSQL'],
        description: 'Time-series data aggregation, automated anomaly detection, and interactive reporting dashboard for financial metrics.',
        type: 'Data Analysis Platform'
      },
      {
        title: 'Document Semantic Search & Q&A Service',
        technologies: ['Python', 'FastAPI', 'Vector Embeddings', 'Postman'],
        description: 'Applied AI service that embeds technical documentation for high-accuracy semantic retrieval and contextual summarization.',
        type: 'AI / Backend Service'
      }
    ],
    curriculum: [
      {
        moduleNumber: 'Module 01',
        title: 'Python Core Architecture & Algorithmic Problem Solving',
        topics: [
          'Data structures: lists, tuples, sets, dictionaries, and list comprehensions',
          'Object-Oriented Programming (OOP) in Python: classes, inheritance, dunder methods',
          'File I/O, exception handling, and virtual environments',
          'Writing clean PEP 8 compliant code'
        ],
        practicalExercise: 'Develop a modular data parser and automated report generator in pure Python.',
        expectedOutcome: 'Write idiomatic, maintainable Python code.'
      },
      {
        moduleNumber: 'Module 02',
        title: 'Data Wrangling, Analysis & SQL Integration',
        topics: [
          'NumPy multi-dimensional arrays, vectorization, and broadcasting',
          'Pandas DataFrames: indexing, filtering, merging, and groupby aggregations',
          'Handling missing values, outlier detection, and data cleansing',
          'Relational database querying with SQL & SQLAlchemy'
        ],
        practicalExercise: 'Clean and merge multi-source business datasets to generate actionable analytical metrics.',
        expectedOutcome: 'Confidently clean and analyze real-world datasets.'
      },
      {
        moduleNumber: 'Module 03',
        title: 'Exploratory Data Analysis & Statistical Modeling',
        topics: [
          'Descriptive and inferential statistics fundamentals',
          'Hypothesis testing, correlation analysis, and distributions',
          'Advanced visualizations with Seaborn and Matplotlib',
          'Storytelling with data for stakeholders'
        ],
        practicalExercise: 'Produce a comprehensive Exploratory Data Analysis report with statistical hypotheses.',
        expectedOutcome: 'Uncover patterns, anomalies, and insights from complex data.'
      },
      {
        moduleNumber: 'Module 04',
        title: 'Machine Learning Pipelines with Scikit-Learn',
        topics: [
          'Supervised learning: Linear Regression, Logistic Regression, Decision Trees, Random Forests',
          'Unsupervised learning: K-Means clustering, PCA dimensionality reduction',
          'Cross-validation, hyperparameter tuning (GridSearchCV), and evaluation metrics',
          'Building reproducible Scikit-Learn Pipelines'
        ],
        practicalExercise: 'Train and optimize a classification model with strict cross-validation safeguards against data leakage.',
        expectedOutcome: 'Develop, evaluate, and tune robust machine learning models.'
      },
      {
        moduleNumber: 'Module 05',
        title: 'Model Deployment, FastAPI & AI Systems',
        topics: [
          'Exporting models (Joblib/Pickle) and serving predictions via FastAPI',
          'Input validation with Pydantic and API testing',
          'Introduction to modern AI APIs, embeddings, and vector databases',
          'Final capstone evaluation and technical presentation'
        ],
        practicalExercise: 'Deploy an interactive ML API endpoint with live documentation and test client.',
        expectedOutcome: 'Deliver functioning data and ML services that integrate with web applications.'
      }
    ],
    careerPaths: [
      'Data Analyst',
      'Junior Machine Learning Engineer',
      'Python Backend Developer',
      'Business Intelligence Developer',
      'AI Solutions Associate'
    ],
    instructor: {
      name: '[Data & AI Practitioner at Navya EdTech / Industry Specialist]',
      role: 'Data Science & Machine Learning Lead',
      experience: '5+ years in data modeling, statistical computing, and predictive systems',
      specialization: 'Python, Predictive Analytics, Applied Machine Learning, FastAPI',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Do I need a strong mathematical or coding background to start?',
        answer: 'Basic high-school mathematics and logical reasoning are sufficient. We teach Python syntax from scratch and build up statistical concepts intuitively with code examples.'
      },
      {
        question: 'What kind of projects will I complete in this course?',
        answer: 'You will work on real datasets covering customer churn prediction, financial analysis, exploratory data reporting, and a production FastAPI model deployment.'
      },
      {
        question: 'Are classes hands-on with lab sessions?',
        answer: 'Yes, every lecture is accompanied by code-along exercises and Jupyter notebook laboratory sessions.'
      }
    ],
    seoTitle: 'Python & Data Science Course in Nepal | Machine Learning Training Kathmandu',
    seoDescription: 'Learn Python programming, data analytics, and machine learning in Nepal with Navya Ed Tech. Hands-on projects with Pandas, Scikit-Learn, and FastAPI.'
  },
  {
    id: 'ui-ux-product-design',
    slug: 'ui-ux-product-design',
    title: 'UI/UX & Digital Product Design',
    category: 'Design',
    shortDescription: 'Master user research, wireframing, design systems, Figma workflows, and high-fidelity prototyping for modern digital products.',
    description: 'Learn to design intuitive, aesthetically refined, and accessible user interfaces. This course bridges user research, information architecture, typography, color theory, design systems, and responsive UX design tailored to real enterprise and consumer software products.',
    heroImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    mode: 'Hybrid (Classroom & Online)',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday',
      classTime: 'Morning (7:00 AM – 8:30 AM) & Evening (5:30 PM – 7:00 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Figma (Advanced)',
      'Design Systems & Tokens',
      'Wireframing & Prototyping',
      'User Research & Personas',
      'Information Architecture',
      'WCAG Accessibility',
      'Responsive Grids',
      'Developer Handoff',
      'Micro-interactions'
    ],
    targetAudience: [
      'Aspiring product designers, UI designers, and visual creators.',
      'Frontend developers looking to deepen their design sensibilities and user experience rigor.',
      'Product managers and entrepreneurs wanting to prototype ideas cleanly.'
    ],
    prerequisites: [
      'Basic familiarity with computers and a genuine interest in visual problem solving.',
      'No prior graphic design software experience required.'
    ],
    outcomes: [
      'Conduct user interviews, synthesize research, and build actionable journey maps.',
      'Build scalable multi-brand design systems in Figma using auto-layout, variables, and components.',
      'Design accessible, responsive web and mobile interfaces that meet WCAG AA standards.',
      'Create interactive prototypes with realistic component states and micro-interactions.',
      'Assemble an industry-grade UX portfolio case study.'
    ],
    projects: [
      {
        title: 'FinTech Banking & Remittance Mobile Experience',
        technologies: ['Figma', 'Auto-Layout', 'Interactive Prototypes', 'Design System'],
        description: 'End-to-end mobile design case study solving transaction clarity, biometric verification, and localized payment flows for Nepali users.',
        type: 'Mobile App Design Case Study'
      },
      {
        title: 'B2B SaaS Analytics & Management Dashboard',
        technologies: ['Figma', 'Design Tokens', 'Information Architecture', 'Responsive Grids'],
        description: 'Complex data-dense desktop software with multi-level navigation, table views, filter drawers, and component state specifications.',
        type: 'Desktop Web App Case Study'
      },
      {
        title: 'E-Commerce Checkout & Micro-Interactions Optimization',
        technologies: ['Figma', 'Usability Testing', 'Design System'],
        description: 'Conversion-focused checkout overhaul addressing cognitive load, form errors, and friction points.',
        type: 'UX Audit & Redesign'
      }
    ],
    curriculum: [
      {
        moduleNumber: 'Module 01',
        title: 'UX Research & Information Architecture Fundamentals',
        topics: [
          'User-centered design methodology and Double Diamond framework',
          'Conducting user interviews and creating user personas',
          'User journey mapping, empathy maps, and problem framing',
          'Information architecture, card sorting, and user flow diagrams'
        ],
        practicalExercise: 'Conduct research for a digital service in Nepal and develop structured user journey maps.',
        expectedOutcome: 'Ground design decisions in verified user needs.'
      },
      {
        moduleNumber: 'Module 02',
        title: 'Wireframing, Layouts & Visual Design Foundations',
        topics: [
          'Low-fidelity sketching and paper prototyping',
          'Typography hierarchy, scale ratios, and font pairing',
          'Color theory, contrast ratios, and accessible palette generation',
          '8pt spatial grid system and layout math'
        ],
        practicalExercise: 'Design wireframes and visual style guides for responsive viewport breakpoints.',
        expectedOutcome: 'Create structured, balanced visual layouts.'
      },
      {
        moduleNumber: 'Module 03',
        title: 'Figma Mastery: Components, Auto-Layout & Design Systems',
        topics: [
          'Mastering Figma Auto-Layout (nesting, wrap, min/max constraints)',
          'Component variants, properties, slots, and interactive states',
          'Design tokens and Figma variables (colors, typography, spacing, modes)',
          'Structuring multi-page design libraries for team collaboration'
        ],
        practicalExercise: 'Build a production-grade UI kit with 25+ reusable responsive components and dark/light modes.',
        expectedOutcome: 'Construct professional design systems ready for production scaling.'
      },
      {
        moduleNumber: 'Module 04',
        title: 'Interactive Prototyping & Usability Evaluation',
        topics: [
          'Smart animate, interactive components, and micro-interactions',
          'Simulating scroll physics, overlay modals, and conditional states',
          'Planning and executing moderated usability tests',
          'Synthesizing feedback into iterative design improvements'
        ],
        practicalExercise: 'Build a clickable high-fidelity mobile prototype and record a structured usability test session.',
        expectedOutcome: 'Validate interaction models with realistic prototypes.'
      },
      {
        moduleNumber: 'Module 05',
        title: 'Developer Handoff & Portfolio Case Study Building',
        topics: [
          'Dev mode, redlines, asset exports, and design annotations',
          'Writing comprehensive UX case studies (Context, Problem, Process, Solution, Impact)',
          'Structuring a portfolio presentation on Behance/Dribbble/Custom domain',
          'Design review and critique with industry practitioners'
        ],
        practicalExercise: 'Publish a complete end-to-end design case study ready for employer review.',
        expectedOutcome: 'Graduate with an industry-ready UI/UX portfolio.'
      }
    ],
    careerPaths: [
      'UI/UX Designer',
      'Product Designer',
      'User Experience Researcher',
      'Interaction Designer',
      'Visual Designer'
    ],
    instructor: {
      name: '[Lead Product Designer at Navya EdTech / Design Consultant]',
      role: 'Lead UI/UX Designer',
      experience: '6+ years designing enterprise SaaS, consumer mobile apps, and web platforms',
      specialization: 'Design Systems, Figma, Mobile Interaction, Usability Engineering',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Do I need to know coding to become a UI/UX designer?',
        answer: 'No coding is required. UI/UX focuses on user psychology, research, interface design, and prototyping in Figma. We do teach you how to collaborate smoothly with developers during handoff.'
      },
      {
        question: 'What tools will I learn?',
        answer: 'You will achieve high proficiency in Figma, design system libraries, FigJam, and usability testing tools.'
      },
      {
        question: 'Will I have a finished portfolio after the course?',
        answer: 'Yes. You will complete and document at least two comprehensive UX case studies formatted for your professional portfolio.'
      }
    ],
    seoTitle: 'UI UX Design Course in Nepal | Product Design Training Kathmandu',
    seoDescription: 'Learn UI/UX design in Kathmandu with Navya Ed Tech. Master Figma, design systems, user research, wireframing, and portfolio case studies.'
  },
  {
    id: 'react-frontend-engineering',
    slug: 'react-frontend-engineering',
    title: 'React & Modern Frontend Engineering',
    category: 'Development',
    shortDescription: 'Master React 18+, TypeScript, state management, modern build tooling, performance optimization, and clean component architecture.',
    description: 'A deep-dive frontend program focusing on building robust, performant web applications. You will master React fundamentals, hooks architecture, TypeScript integration, client-side caching with TanStack Query, styling with Tailwind, and production deployment.',
    heroImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
    duration: '2.5 Months',
    level: 'Intermediate',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday',
      classTime: 'Morning & Evening batches available',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'React 18+',
      'TypeScript',
      'Vite & Next.js Basics',
      'Tailwind CSS',
      'TanStack Query',
      'Zustand / Redux Toolkit',
      'React Router 6+',
      'Zod & React Hook Form',
      'Git & CI/CD'
    ],
    targetAudience: [
      'Developers with JavaScript basics wanting to master production React development.',
      'Backend developers looking to gain serious modern frontend proficiency.',
      'Computer science students preparing for frontend developer interviews.'
    ],
    prerequisites: [
      'Solid foundation in JavaScript (ES6 syntax, DOM manipulation, async/await).',
      'Basic HTML5 and CSS3 proficiency.'
    ],
    outcomes: [
      'Write scalable, type-safe React applications with TypeScript.',
      'Implement efficient server-state synchronization with TanStack Query.',
      'Optimize React rendering performance, code-splitting, and memoization.',
      'Build responsive, accessible component design systems with Tailwind CSS.'
    ],
    projects: [
      {
        title: 'Project Management & Team Workspace App',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'TanStack Query'],
        description: 'Rich client-side application with drag-and-drop task boards, filter presets, optimistic UI updates, and offline sync caching.',
        type: 'Interactive SPA'
      },
      {
        title: 'Stock Market & Crypto Telemetry Terminal',
        technologies: ['React', 'TypeScript', 'Recharts', 'WebSockets'],
        description: 'High-frequency data visualization dashboard rendering interactive charts, custom timeframe selectors, and real-time feeds.',
        type: 'Data Visualization'
      }
    ],
    curriculum: [
      {
        moduleNumber: 'Module 01',
        title: 'React Fundamentals & Component Architecture',
        topics: ['JSX compilation', 'Props, State, and Pure Functions', 'Conditional rendering and lists', 'Lifecycle and side effects'],
        practicalExercise: 'Build an interactive filterable product catalog with URL state sync.',
        expectedOutcome: 'Master core React primitives.'
      },
      {
        moduleNumber: 'Module 02',
        title: 'TypeScript with React & Advanced Hooks',
        topics: ['Typing Props, State, Events, and Refs', 'Custom Hooks patterns', 'useCallback, useMemo, and React.memo', 'Context API vs lightweight state'],
        practicalExercise: 'Develop a type-safe form builder with dynamic fields and validation.',
        expectedOutcome: 'Write type-safe React without compile errors.'
      },
      {
        moduleNumber: 'Module 03',
        title: 'State Management & Async Server Data',
        topics: ['Client state with Zustand', 'Server state with TanStack Query (fetching, caching, mutations, pagination)', 'Optimistic updates', 'Error boundaries'],
        practicalExercise: 'Integrate a complex REST API with optimistic mutations and infinite scrolling.',
        expectedOutcome: 'Handle complex async data with zero UI jank.'
      },
      {
        moduleNumber: 'Module 04',
        title: 'Design Systems, Performance & Production Build',
        topics: ['Tailwind CSS architectures', 'Headless UI & accessibility', 'Vite bundle optimization and dynamic imports', 'Automated testing overview'],
        practicalExercise: 'Audit and optimize an existing React app for Lighthouse performance 95+ score.',
        expectedOutcome: 'Deliver production-grade frontend web applications.'
      }
    ],
    careerPaths: [
      'Frontend Engineer (React)',
      'React Developer',
      'JavaScript Web Developer',
      'UI Engineer'
    ],
    instructor: {
      name: '[Senior Frontend Engineer at Navya EdTech]',
      role: 'Frontend Engineering Lead',
      experience: '5+ years in modern JavaScript, SPA architectures, and frontend performance',
      specialization: 'React, TypeScript, Next.js, Performance Optimization',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Is TypeScript mandatory for this course?',
        answer: 'We introduce TypeScript step-by-step from week two. Modern industry standards require TypeScript, so we ensure you learn it naturally alongside React.'
      }
    ],
    seoTitle: 'React JS Course in Nepal | Frontend Web Development Training Kathmandu',
    seoDescription: 'Master React.js and TypeScript in Kathmandu with Navya Ed Tech. Hands-on project based training in modern frontend engineering.'
  },
  {
    id: 'devops-cloud-engineering',
    slug: 'devops-cloud-engineering',
    title: 'DevOps & Cloud Engineering',
    category: 'Cloud & DevOps',
    shortDescription: 'Learn Linux systems administration, Docker containerization, CI/CD pipelines, Kubernetes basics, and AWS cloud infrastructure management.',
    description: 'Equip yourself with the tools and mindsets used by modern site reliability and DevOps teams. Master Linux command line operations, containerize multi-tier apps with Docker, automate testing and deployment with GitHub Actions, and provision cloud infrastructure on AWS.',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    duration: '3 Months',
    level: 'Intermediate to Advanced',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday',
      classTime: 'Morning & Evening sessions',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Linux Administration',
      'Bash Scripting',
      'Docker & Docker Compose',
      'Kubernetes (K8s) Basics',
      'AWS (EC2, S3, RDS, IAM)',
      'GitHub Actions CI/CD',
      'Nginx & Reverse Proxies',
      'Terraform Basics',
      'Prometheus & Grafana'
    ],
    targetAudience: [
      'Software developers wanting to master deployment, containerization, and infrastructure.',
      'System administrators transitioning into modern cloud automation and DevOps.',
      'IT graduates seeking high-demand infrastructure engineering roles.'
    ],
    prerequisites: [
      'Basic familiarity with operating systems and networking concepts.',
      'Fundamental command line comfort.'
    ],
    outcomes: [
      'Administer secure Linux servers, users, permissions, and systemd services.',
      'Containerize full-stack applications with multi-stage Docker builds.',
      'Build automated CI/CD deployment pipelines using GitHub Actions.',
      'Deploy and manage web workloads on AWS cloud infrastructure.',
      'Configure Nginx reverse proxies, SSL certificates (Certbot), and domain routing.'
    ],
    projects: [
      {
        title: 'Zero-Downtime Multi-Tier CI/CD Pipeline',
        technologies: ['GitHub Actions', 'Docker', 'AWS EC2', 'Nginx'],
        description: 'Automated workflow that runs tests, builds Docker containers, publishes to registry, and executes zero-downtime rolling deployment to cloud instances.',
        type: 'DevOps Pipeline'
      },
      {
        title: 'Microservices Infrastructure with Docker Compose & Nginx',
        technologies: ['Docker', 'Nginx', 'PostgreSQL', 'Redis', 'Certbot'],
        description: 'Containerized infrastructure running multiple services behind an Nginx reverse proxy with automated Let\'s Encrypt SSL renewal.',
        type: 'Infrastructure Deployment'
      }
    ],
    curriculum: [
      {
        moduleNumber: 'Module 01',
        title: 'Linux Systems Administration & Bash Automation',
        topics: ['Linux filesystem hierarchy, permissions, and user management', 'Process management, systemd services, and cron jobs', 'Networking: DNS, SSH keys, firewalls (UFW/iptables), curl', 'Writing robust Bash automation scripts'],
        practicalExercise: 'Provision a secured headless Linux VM with automated user and security scripts.',
        expectedOutcome: 'Master Linux server administration.'
      },
      {
        moduleNumber: 'Module 02',
        title: 'Docker Containerization & Multi-Stage Builds',
        topics: ['Container concepts vs virtualization', 'Dockerfile instructions, caching, and multi-stage builds', 'Docker networking, volumes, and data persistence', 'Orchestration with Docker Compose for local environments'],
        practicalExercise: 'Containerize a multi-tier web application (Node API + React + MongoDB) with optimized image sizes.',
        expectedOutcome: 'Containerize any software stack reliably.'
      },
      {
        moduleNumber: 'Module 03',
        title: 'AWS Cloud Architecture & Infrastructure Essentials',
        topics: ['AWS IAM policies, roles, and security groups', 'Compute with EC2 and auto-scaling basics', 'Storage with S3 and database hosting with RDS', 'VPC basics and public/private subnets'],
        practicalExercise: 'Deploy a high-availability web service on AWS with managed database and storage.',
        expectedOutcome: 'Provision and configure core AWS cloud services.'
      },
      {
        moduleNumber: 'Module 04',
        title: 'CI/CD Pipelines, Nginx & Monitoring',
        topics: ['GitHub Actions workflows, secrets, and runners', 'Nginx reverse proxy, load balancing, and SSL', 'Log aggregation and basic server monitoring with Prometheus/Grafana', 'Disaster recovery and backup strategies'],
        practicalExercise: 'Construct an end-to-end automated deployment pipeline triggered on git push.',
        expectedOutcome: 'Automate build, test, and release cycles from source control.'
      }
    ],
    careerPaths: [
      'DevOps Engineer',
      'Cloud Support Engineer',
      'System & Infrastructure Administrator',
      'Site Reliability Engineer (Associate)',
      'Build & Release Specialist'
    ],
    instructor: {
      name: '[Cloud & Infrastructure Lead at Navya EdTech / Industry Specialist]',
      role: 'DevOps & Cloud Engineer',
      experience: '7+ years managing production cloud infrastructure and automated pipelines',
      specialization: 'AWS, Docker, Linux Systems, CI/CD, Kubernetes',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Do I need an AWS credit card/account for class?',
        answer: 'We guide you through setting up the AWS Free Tier and provide shared laboratory environments for practical coursework.'
      }
    ],
    seoTitle: 'DevOps & AWS Cloud Course in Nepal | Infrastructure Training Kathmandu',
    seoDescription: 'Learn DevOps, Docker, Linux, CI/CD, and AWS cloud engineering in Kathmandu with Navya Ed Tech. Hands-on practical infrastructure training.'
  },
  {
    id: 'cybersecurity-fundamentals',
    slug: 'cybersecurity-fundamentals',
    title: 'Cybersecurity Fundamentals & Network Defense',
    category: 'Cybersecurity',
    shortDescription: 'Understand network security, vulnerability assessment, ethical hacking concepts, web application security (OWASP Top 10), and defensive hardening.',
    description: 'A structured foundation in practical information security. Learn how networks communicate, identify common attack vectors, analyze web vulnerabilities using industry standard tools, and implement defensive countermeasures to protect digital assets.',
    heroImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday',
      classTime: 'Morning & Evening batches',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Kali Linux',
      'Wireshark',
      'Nmap',
      'Burp Suite Community',
      'OWASP Top 10',
      'Metasploit Basics',
      'Network Protocols (TCP/IP, DNS, SSL)',
      'Firewalls & IDS/IPS Concepts'
    ],
    targetAudience: [
      'IT students and graduates interested in cybersecurity and ethical security analysis.',
      'System administrators and network engineers wishing to strengthen defensive capabilities.',
      'Developers wanting to build secure software from the ground up.'
    ],
    prerequisites: [
      'Basic understanding of networking concepts (IP addresses, ports, routers).',
      'High standard of ethical responsibility and commitment to legal security practices.'
    ],
    outcomes: [
      'Inspect and analyze network packets with Wireshark to spot anomalies.',
      'Perform structured vulnerability assessments on test networks with Nmap and Nessus.',
      'Test web applications against OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR).',
      'Configure system hardening, password policies, and security logging.'
    ],
    projects: [
      {
        title: 'Comprehensive Web Application Penetration Test Report',
        technologies: ['Burp Suite', 'OWASP ZAP', 'Kali Linux'],
        description: 'Structured vulnerability assessment of an intentionally vulnerable enterprise lab environment with formal remediation recommendations.',
        type: 'Security Assessment'
      },
      {
        title: 'Network Defense & Intrusion Detection Lab',
        technologies: ['Wireshark', 'Snort', 'Linux'],
        description: 'Simulated network environment with configured intrusion rules to detect port scans, brute-force attempts, and unauthorized data exfiltration.',
        type: 'Defensive Lab'
      }
    ],
    curriculum: [
      {
        moduleNumber: 'Module 01',
        title: 'Networking & Operating System Security Foundations',
        topics: ['TCP/IP model, packet structure, subnetting', 'Common protocols: DNS, HTTP/HTTPS, SSH, DHCP', 'Linux and Windows security baselines', 'Setting up a virtualized Kali security lab'],
        practicalExercise: 'Configure and isolate a security lab using VirtualBox/VMware.',
        expectedOutcome: 'Build a secure testing environment.'
      },
      {
        moduleNumber: 'Module 02',
        title: 'Network Reconnaissance & Vulnerability Scanning',
        topics: ['Passive and active reconnaissance', 'Port scanning and service detection with Nmap', 'Vulnerability scanning workflows', 'Packet inspection with Wireshark'],
        practicalExercise: 'Map a target network subnet and identify exposed legacy services.',
        expectedOutcome: 'Identify network security gaps before attackers do.'
      },
      {
        moduleNumber: 'Module 03',
        title: 'Web Application Security & OWASP Top 10',
        topics: ['HTTP request/response analysis with Burp Suite proxy', 'SQL Injection (SQLi) and prevention with parameterized queries', 'Cross-Site Scripting (XSS) and Content Security Policy (CSP)', 'Authentication bypass and broken access controls'],
        practicalExercise: 'Identify and remediate 5 distinct OWASP vulnerabilities in a controlled lab application.',
        expectedOutcome: 'Audit and secure modern web applications.'
      },
      {
        moduleNumber: 'Module 04',
        title: 'System Hardening, Incident Response & Reporting',
        topics: ['Endpoint protection, firewalls, and least-privilege principles', 'Security logging, SIEM basics, and alert triage', 'Writing professional vulnerability assessment reports', 'Ethics, legal standards, and industry certifications (Security+, CEH) overview'],
        practicalExercise: 'Author a professional executive summary and technical remediation report.',
        expectedOutcome: 'Communicate technical security findings clearly to technical and executive stakeholders.'
      }
    ],
    careerPaths: [
      'Junior Security Analyst (SOC Tier 1)',
      'Vulnerability Assessment Associate',
      'Network Security Specialist',
      'Information Security Auditor'
    ],
    instructor: {
      name: '[Certified Information Security Specialist at Navya EdTech / Consultant]',
      role: 'Cybersecurity Instructor',
      experience: '6+ years in vulnerability research, network auditing, and incident response',
      specialization: 'Network Security, OWASP, Penetration Testing, System Hardening',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Are the security testing practices legal?',
        answer: 'All practical lab exercises are conducted strictly inside isolated local virtual environments and designated vulnerable practice platforms under clear ethical guidelines.'
      }
    ],
    seoTitle: 'Cybersecurity Training in Nepal | Ethical Hacking & Security Course Kathmandu',
    seoDescription: 'Learn cybersecurity fundamentals, network defense, and web security testing in Kathmandu with Navya Ed Tech.'
  },
  {
    id: 'flutter-mobile-app-development',
    slug: 'flutter-mobile-app-development',
    title: 'Flutter & Cross-Platform Mobile App Development',
    category: 'Development',
    shortDescription: 'Build native iOS and Android mobile applications using Google Flutter and Dart with clean architecture, state management, and backend integrations.',
    description: 'Learn to design, develop, and publish fluid cross-platform mobile apps for iOS and Android from a single codebase. Master Dart language fundamentals, widget composition, state management with Bloc/Provider, SQLite local databases, and REST API integration.',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday',
      classTime: 'Morning & Evening batches',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Dart Programming',
      'Flutter SDK 3+',
      'Bloc / Riverpod State Management',
      'REST API Integration (Dio/Http)',
      'SQLite & Hive Local Storage',
      'Firebase Mobile Services',
      'Push Notifications',
      'Google Play / App Store Deployment'
    ],
    targetAudience: [
      'Beginners and web developers wanting to build native mobile apps for iOS and Android.',
      'Computer science students preparing for mobile developer careers.',
      'Entrepreneurs building custom mobile MVPs.'
    ],
    prerequisites: [
      'Basic programming understanding (any language: C, C++, Java, JS, or Python).',
      'A computer capable of running Android Studio / Xcode simulator.'
    ],
    outcomes: [
      'Build smooth, responsive 60fps mobile interfaces in Flutter.',
      'Implement clean architecture and reliable state management using Bloc or Riverpod.',
      'Store data offline with local SQLite/Hive databases and synchronize with REST APIs.',
      'Package and prepare apps for the Google Play Store.'
    ],
    projects: [
      {
        title: 'Ride-Hailing & Logistics Mobile App',
        technologies: ['Flutter', 'Google Maps SDK', 'Bloc', 'REST API'],
        description: 'Interactive booking flow, live driver location tracking, localized routes, fare calculation, and cash/digital wallet checkout.',
        type: 'Mobile App'
      },
      {
        title: 'Personal Finance & Expense Tracker with Offline Sync',
        technologies: ['Flutter', 'Hive DB', 'FL Chart', 'Clean Architecture'],
        description: 'Comprehensive budget manager with visual analytics, category budgets, receipt attachments, and offline-first data sync.',
        type: 'Mobile App'
      }
    ],
    curriculum: [
      {
        moduleNumber: 'Module 01',
        title: 'Dart Language Mastery & Object-Oriented Design',
        topics: ['Variables, types, functions, and control flow', 'OOP: Classes, Mixins, Abstract Classes, and Interfaces', 'Null safety, collections, and higher-order functions', 'Async programming: Futures, Streams, and isolates'],
        practicalExercise: 'Write an asynchronous financial calculation engine in pure Dart.',
        expectedOutcome: 'Command Dart syntax with confidence.'
      },
      {
        moduleNumber: 'Module 02',
        title: 'Flutter UI Composition & Custom Widgets',
        topics: ['Stateless vs Stateful widgets', 'Layout primitives: Row, Column, Stack, Flex, Wrap', 'Material 3 and Cupertino UI widgets', 'Custom animations and responsive layout builders'],
        practicalExercise: 'Construct an aesthetic multi-screen e-commerce product UI.',
        expectedOutcome: 'Build pixel-perfect mobile layouts.'
      },
      {
        moduleNumber: 'Module 03',
        title: 'State Management & Architecture Patterns',
        topics: ['State management comparison: setState, Provider, Bloc/Cubit, Riverpod', 'Clean Architecture layer separation (Data, Domain, Presentation)', 'Dependency injection with GetIt', 'Handling form states and user inputs'],
        practicalExercise: 'Implement a complete authentication and cart management flow using Bloc.',
        expectedOutcome: 'Architect scalable mobile codebases without spaghetti state.'
      },
      {
        moduleNumber: 'Module 04',
        title: 'APIs, Local Persistence & Store Release',
        topics: ['HTTP clientDio, interceptors, error handling', 'Local databases with SQLite (sqflite) and Hive', 'Push notifications, device permissions (Camera, GPS)', 'App signing, ProGuard, and Google Play Store submission prep'],
        practicalExercise: 'Build an offline-capable news application with push alerts and publishable APK.',
        expectedOutcome: 'Publish production-ready mobile applications.'
      }
    ],
    careerPaths: [
      'Flutter Developer',
      'Mobile Application Developer (iOS/Android)',
      'Cross-Platform App Engineer',
      'Junior Mobile Software Engineer'
    ],
    instructor: {
      name: '[Senior Mobile Engineer at Navya EdTech / Industry Specialist]',
      role: 'Mobile Development Lead',
      experience: '5+ years publishing commercial Flutter and Android applications',
      specialization: 'Flutter, Dart, Clean Architecture, Mobile State Management',
      isPlaceholder: true
    },
    faqs: [
      {
        question: 'Can I build both Android and iOS apps with this course?',
        answer: 'Yes! Flutter creates unified binaries for both Android and iOS from a single Dart codebase.'
      }
    ],
    seoTitle: 'Flutter App Development Course in Nepal | Mobile Training Kathmandu',
    seoDescription: 'Learn Flutter and Dart mobile app development in Kathmandu with Navya Ed Tech. Build cross-platform Android and iOS apps with practical projects.'
  }
];

export const COURSE_CATEGORIES = [
  'All',
  'Development',
  'Data & AI',
  'Design',
  'Cloud & DevOps',
  'Cybersecurity'
] as const;
