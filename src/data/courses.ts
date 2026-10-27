import { Course } from '../types';

export const COURSES: Course[] = [
{
    id: 'python-beginner',
    slug: 'python-beginner',
    title: 'Python Beginner',
    category: 'Programming',
    shortDescription: 'Master the fundamentals of Python programming from scratch with hands-on exercises, logical problem-solving, and foundational scripts.',
    description: 'A structured, beginner-friendly immersion into modern Python programming. Designed for complete beginners, school and college students, and professionals with zero prior coding experience. You will understand programming fundamentals, data types, control flow, functions, modular architecture, file handling, and basic object-oriented principles while building functional command-line applications and practical automation scripts.',
    heroImage: '',
    duration: '40 Days',
    level: 'Beginner',
    mode: 'Online Live',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 8:30 AM) & Evening (5:00 PM – 6:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Live online classes'
    },
    fee: 'Contact for current fee & scholarship options (NPR)',
    technologies: [
      'Python 3.12',
      'VS Code',
      'Git & GitHub',
      'Python Data Types & Variables',
      'Control Flow & Loops',
      'Functions & Scope',
      'File Handling & JSON',
      'OOP Fundamentals',
      'Virtual Environments',
      'CLI Scripting'
    ],
    targetAudience: [
      'Complete beginners with no prior programming background wanting a clean start in coding.',
      'School (+2) and university students in BCA, BSc.CSIT, BIT, or engineering seeking strong programming basics.',
      'Professionals and non-technical staff aiming to automate repetitive daily computer tasks.',
      'Enthusiasts preparing for advanced pathways in Web Development, Data Science, or Artificial Intelligence.'
    ],
    prerequisites: [
      'Basic computer literacy (operating a browser, file management, and typing).',
      'A laptop or desktop computer with a stable internet connection for live online classes and code exercises.',
      'Passion and dedication to learn logical problem solving.'
    ],
    outcomes: [
      'Write clean, idiomatic, and readable Python code following PEP 8 conventions.',
      'Solve algorithmic problems using core data structures: lists, dictionaries, tuples, and sets.',
      'Perform file reading, writing, and parsing of text, CSV, and structured JSON data.',
      'Build modular, reusable functions and apply foundational Object-Oriented Programming (OOP).',
      'Use Git for version control and manage code repositories on GitHub.'
    ],
    projects: [
      {
        title: 'Automated Personal Finance & Expense Tracker',
        technologies: ['Python', 'CSV / JSON', 'CLI', 'Git'],
        description: 'Command-line tool that parses income and expenditure logs, computes monthly category analytics, and outputs formatted financial summaries.',
        type: 'CLI Application'
      },
      {
        title: 'Interactive Text RPG & Quest Engine',
        technologies: ['Python', 'OOP', 'Data Structures'],
        description: 'Turn-based role-playing game utilizing object-oriented classes for characters, inventory management, battle mechanics, and game-save persistence.',
        type: 'Interactive Game'
      },
      {
        title: 'Automated File Organizer & System Cleanup Utility',
        technologies: ['Python', 'OS Module', 'Shutil', 'Logging'],
        description: 'Desktop background script that automatically categorizes downloaded files into sorted folders by extension and generates audit logs.',
        type: 'Automation Script'
      }
    ],
    whyChooseThis: {
      title: 'Why Start with Python Beginner?',
      points: [
        {
          headline: 'Most Friendly Syntax:',
          detail: 'Python reads like plain English, allowing beginners to focus on core programming logic without getting frustrated by complex punctuation.'
        },
        {
          headline: 'Stepping Stone to Modern Tech:',
          detail: 'Python is the foundational language for Artificial Intelligence, Data Science, Machine Learning, and Backend Web Development worldwide.'
        },
        {
          headline: 'Hands-On Live Mentorship:',
          detail: 'Learn in small live online cohorts with instructor guidance, dedicated mentor hours, and line-by-line code reviews at Navya Ed Tech.'
        }
      ]
    },
    curriculum: [
    {
        "moduleNumber": "Module 01",
        "title": "Computing Logic & Python Environment Setup",
        "duration": "Week 1–2 (8 Days)",
        "topics": [
            "How computer programs execute: interpreters vs compilers",
            "Python 3.12 installation, VS Code configuration & terminal mastery",
            "Variables, memory references, and core scalar types (int, float, str, bool)",
            "Type casting, user input parsing, and string formatting (f-strings)",
            "Writing clean code conforming to PEP 8 standards"
        ],
        "subLessons": [
            {
                "subNumber": "1.1",
                "title": "Development Environment & First Scripts",
                "topics": [
                    "Terminal commands",
                    "Python interactive REPL",
                    "VS Code extensions",
                    "Script execution"
                ]
            },
            {
                "subNumber": "1.2",
                "title": "Variables, Expressions & Formatted Output",
                "topics": [
                    "Arithmetic operators",
                    "Operator precedence",
                    "f-string interpolation",
                    "Dynamic typing"
                ]
            }
        ],
        "practicalExercise": "Build a Terminal Currency & Temperature Converter CLI utility with dynamic user prompt validation.",
        "expectedOutcome": "Confidently write, run, and debug basic Python programs from the command line."
    },
    {
        "moduleNumber": "Module 02",
        "title": "Control Flow, Conditions & Iteration Loops",
        "duration": "Week 3–4 (8 Days)",
        "topics": [
            "Boolean logic, comparison operators, and logical operators (and, or, not)",
            "Branching decision trees: if, elif, else statements",
            "For loops, while loops, and range generation",
            "Loop control primitives: break, continue, and pass",
            "Nested loops and accumulator patterns for mathematical calculation"
        ],
        "subLessons": [
            {
                "subNumber": "2.1",
                "title": "Conditional Branching & Guard Clauses",
                "topics": [
                    "Grading algorithms",
                    "Password strength evaluators",
                    "Input sanitization guards"
                ]
            },
            {
                "subNumber": "2.2",
                "title": "Iteration & Loop Algorithms",
                "topics": [
                    "Summation loops",
                    "Prime number checks",
                    "Pattern printing",
                    "Sentinel-controlled while loops"
                ]
            }
        ],
        "practicalExercise": "Develop an interactive Number Guessing Game with binary search hint system and attempt tracker.",
        "expectedOutcome": "Implement non-trivial algorithmic decision making and repetitive logic effortlessly."
    },
    {
        "moduleNumber": "Module 03",
        "title": "Data Structures & Modular Functions",
        "duration": "Week 5–6 (8 Days)",
        "topics": [
            "Function definition, return values, parameters, and default arguments",
            "Variable scopes: Local vs Global and LEGB lookup rules",
            "Python Lists: indexing, slicing, appending, sorting, and comprehension",
            "Dictionaries: key-value storage, lookup performance, nested mappings",
            "Tuples and Sets: immutability, uniqueness, and set theory operations"
        ],
        "subLessons": [
            {
                "subNumber": "3.1",
                "title": "Modular Function Architecture",
                "topics": [
                    "DRY principle",
                    "Positional vs keyword args",
                    "*args and **kwargs basics",
                    "Docstrings"
                ]
            },
            {
                "subNumber": "3.2",
                "title": "Lists, Dictionaries & Comprehensions",
                "topics": [
                    "Matrix operations",
                    "Dictionary lookups",
                    "List comprehensions",
                    "In-place vs copy mutations"
                ]
            }
        ],
        "practicalExercise": "Create a Student Gradebook & Ranking Engine capable of calculating GPAs, sorting, and generating class transcripts.",
        "expectedOutcome": "Organize complex real-world data in structured collections and write modular, reusable functions."
    },
    {
        "moduleNumber": "Module 04",
        "title": "File I/O, Structured JSON & Exception Handling",
        "duration": "Week 7 (8 Days)",
        "topics": [
            "Reading and writing plain text files using context managers (with open)",
            "Parsing and saving structured tabular data with the CSV module",
            "Serializing and deserializing JSON configurations and API-style payloads",
            "Handling runtime exceptions gracefully with try, except, else, finally blocks",
            "Standard library modules: datetime, math, random, and os"
        ],
        "subLessons": [
            {
                "subNumber": "4.1",
                "title": "File Persistence & Serialization",
                "topics": [
                    "Context managers",
                    "CSV reader/writer",
                    "json.loads & json.dumps",
                    "File paths with os.path"
                ]
            },
            {
                "subNumber": "4.2",
                "title": "Defensive Programming & Exceptions",
                "topics": [
                    "FileNotFoundError",
                    "ValueError & KeyError traps",
                    "Custom error messages",
                    "Clean shutdown"
                ]
            }
        ],
        "practicalExercise": "Engineer a Persistent Contact & Note Management CLI that stores data in structured JSON files with search & backup.",
        "expectedOutcome": "Safely persist application data to disk and prevent script crashes with defensive error handling."
    },
    {
        "moduleNumber": "Module 05",
        "title": "Object-Oriented Programming (OOP) & Capstone Project",
        "duration": "Week 8 (8 Days)",
        "topics": [
            "OOP paradigms: Classes, instances, attributes, and methods",
            "Constructor (__init__) and string representation (__str__, __repr__)",
            "Encapsulation, property decorators, and state validation",
            "Inheritance hierarchies and method overriding with super()",
            "Git version control basics: initializing repos, staging, committing, and GitHub pushes",
            "Capstone Project Defense: Personal Finance & Expense Tracker"
        ],
        "subLessons": [
            {
                "subNumber": "5.1",
                "title": "Classes, Objects & Inheritance",
                "topics": [
                    "Class blueprints",
                    "Self reference",
                    "Subclassing",
                    "Polymorphic methods"
                ]
            },
            {
                "subNumber": "5.2",
                "title": "Git Version Control & Project Packaging",
                "topics": [
                    "git init, add, commit",
                    "GitHub remote setup",
                    "Virtual environments (venv)",
                    "requirements.txt"
                ]
            }
        ],
        "practicalExercise": "Complete Capstone: Build the Automated Personal Expense Tracker with category analytics, budget thresholds, and Git defense.",
        "expectedOutcome": "Master object-oriented design and deliver a polished, GitHub-hosted Python portfolio project."
    }
],
    careerPaths: [
      'Junior Python Programmer',
      'Automation Script Developer',
      'Technical Support Specialist',
      'Foundation for Data Science & AI',
      'Foundation for Backend Development'
    ],
    instructor: {
      name: 'Navya Python Systems Faculty Panel',
      role: 'Python Engineering Track Leads',
      experience: 'Min. 5+ years commercial Python engineering & systems architecture',
      specialization: 'Python Core, Automation, Logic Building, Algorithm Design',
      isPlaceholder: false
    },
    faqs: [
      {
        question: 'Do I need any previous coding experience before enrolling?',
        answer: 'No! This course is engineered from absolute ground zero. We teach computer logic, syntax, and problem-solving step by step.'
      },
      {
        question: 'What is the duration and daily commitment for this 40-day course?',
        answer: 'The course runs for 40 instructional days (approx. 6–7 weeks), Sunday through Friday, with 1.5 to 2 hours of live lectures and lab work daily.'
      },
      {
        question: 'Will I receive a certificate upon completion?',
        answer: 'Yes. Students who complete the practical coursework, lab assignments, and the capstone project receive the verified Navya Ed Tech Course Completion Certificate.'
      }
    ],
    seoTitle: 'Python Beginner Course in Nepal (40 Days) | Learn Python Online',
    seoDescription: 'Start your coding journey with our 40-day live online Python Beginner course at Navya Ed Tech. Hands-on coding, practical projects, and personalized mentorship.'
  },
{
    id: 'python-advance',
    slug: 'python-advance',
    title: 'Python Advance',
    category: 'Programming',
    shortDescription: 'Elevate your Python skills to production-grade engineering with asynchronous concurrency, design patterns, metaclasses, and backend API microservices.',
    description: 'An intensive, advanced software engineering track tailored for developers with Python foundations who want to build high-performance, robust, and scalable systems. Dive deep into internal Python object models, dunder protocols, asynchronous I/O with AsyncIO, concurrency with multiprocessing, decorators, context managers, clean architecture patterns, and production deployment.',
    heroImage: '',
    duration: '40 Days',
    level: 'Advanced',
    mode: 'Online Live',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 8:30 AM) & Evening (5:30 PM – 7:00 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Live online classes'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Python 3.12+',
      'AsyncIO & AIOHTTP',
      'Multiprocessing & Threading',
      'Decorators & Generators',
      'Metaclasses & Dunder Methods',
      'FastAPI & Pydantic',
      'SQLAlchemy ORM',
      'Docker & Containerization',
      'PyTest & Mocking',
      'Redis Caching'
    ],
    targetAudience: [
      'Developers with basic or intermediate Python knowledge looking to level up to senior engineering standards.',
      'Backend programmers wanting to master asynchronous APIs, thread-safe architectures, and microservices.',
      'Data engineers and AI developers needing high-performance computing, memory optimization, and parallel processing.',
      'IT graduates seeking commercial software engineering roles in Nepal and international remote tech companies.'
    ],
    prerequisites: [
      'Familiarity with Python syntax, loops, functions, basic OOP, and common data structures.',
      'Understanding of basic terminal commands and Git version control.',
      'A personal laptop suitable for running Docker containers and development environments.'
    ],
    outcomes: [
      'Write scalable, non-blocking asynchronous Python applications using AsyncIO and coroutines.',
      'Implement enterprise software design patterns: Factory, Singleton, Observer, and Dependency Injection.',
      'Master advanced Python internals: memory management, garbage collection, descriptors, and metaclasses.',
      'Architect and deploy high-performance REST APIs with FastAPI, Pydantic, and SQLAlchemy.',
      'Write comprehensive unit and integration test suites using PyTest, fixtures, and mocks.'
    ],
    projects: [
      {
        title: 'High-Throughput Asynchronous Web Scraping & Ingestion Engine',
        technologies: ['Python', 'AsyncIO', 'AIOHTTP', 'BeautifulSoup', 'PostgreSQL'],
        description: 'Distributed web data scraper capable of querying hundreds of concurrent endpoints, handling rate limits, retry backoffs, and structured database storage.',
        type: 'Asynchronous Service'
      },
      {
        title: 'Distributed Task Queue & Background Worker System',
        technologies: ['Python', 'Redis', 'Multiprocessing', 'Docker'],
        description: 'Lightweight distributed task scheduler with worker worker pools, priority message queuing, failed job retries, and task execution metrics.',
        type: 'System Tool'
      },
      {
        title: 'Production-Grade Microservice with FastAPI & JWT Authentication',
        technologies: ['FastAPI', 'Pydantic', 'SQLAlchemy', 'JWT', 'Docker'],
        description: 'Fully containerized microservice featuring role-based access control, database connection pooling, auto-generated OpenAPI documentation, and test suites.',
        type: 'Backend Microservice'
      }
    ],
    whyChooseThis: {
      title: 'Why Python Advance at Navya?',
      points: [
        {
          headline: 'Beyond Basic Syntax:',
          detail: 'Move past basic tutorials to master asynchronous programming, memory profiling, and architecture patterns used in enterprise engineering.'
        },
        {
          headline: 'Modern Tech Stack:',
          detail: 'Learn FastAPI, Docker, and Redis—the modern toolchain preferred by high-growth startups and international tech firms.'
        },
        {
          headline: 'Rigorous Code Review:',
          detail: 'Submit pull requests reviewed by senior software engineers with deep feedback on maintainability, performance, and clean code.'
        }
      ]
    },
    curriculum: [
    {
        "moduleNumber": "Module 01",
        "title": "Advanced Python Internals & Metaprogramming",
        "duration": "Week 1–2 (8 Days)",
        "topics": [
            "Python object model, dunder protocols (__call__, __enter__, __exit__, __getitem__)",
            "Custom iterators and generator functions (yield, yield from, memory profiling)",
            "Higher-order functions, closures, and custom parameterized decorators",
            "Context managers and the contextlib standard utility module",
            "Descriptors, metaclasses, and runtime class inspection (__new__ vs __init__)"
        ],
        "subLessons": [
            {
                "subNumber": "1.1",
                "title": "Iterators, Generators & Memory Optimization",
                "topics": [
                    "Lazy evaluation",
                    "Infinite streams",
                    "Generator pipelines",
                    "Memory footprint reduction"
                ]
            },
            {
                "subNumber": "1.2",
                "title": "Decorators & Context Management",
                "topics": [
                    "Function instrumentation",
                    "Timing decorators",
                    "Resource locks",
                    "Custom context managers"
                ]
            }
        ],
        "practicalExercise": "Build a production rate-limiting and performance telemetry decorator suite with automated logging.",
        "expectedOutcome": "Deep architectural understanding of Python runtime internals, memory profiles, and metaprogramming."
    },
    {
        "moduleNumber": "Module 02",
        "title": "Concurrency, Threading & Asynchronous AsyncIO",
        "duration": "Week 3–4 (8 Days)",
        "topics": [
            "CPython GIL (Global Interpreter Lock) constraints and architectural implications",
            "I/O bound vs CPU bound workloads: choosing between AsyncIO, Threading, and Multiprocessing",
            "AsyncIO architecture: event loops, coroutines (async/await), and Task scheduling",
            "Concurrent HTTP queries with AIOHTTP and asyncio.gather",
            "Thread synchronization, worker pools (ThreadPoolExecutor, ProcessPoolExecutor), and queues"
        ],
        "subLessons": [
            {
                "subNumber": "2.1",
                "title": "AsyncIO & Non-Blocking I/O",
                "topics": [
                    "async/await syntax",
                    "asyncio.sleep vs time.sleep",
                    "Task cancellation",
                    "Error aggregation"
                ]
            },
            {
                "subNumber": "2.2",
                "title": "Multiprocessing & Parallel CPU Computation",
                "topics": [
                    "Process forks",
                    "Inter-process queues",
                    "ProcessPoolExecutor",
                    "Batch data processing"
                ]
            }
        ],
        "practicalExercise": "Develop a High-Throughput Asynchronous Web Scraper capable of indexing 100+ pages concurrently with rate limit handling.",
        "expectedOutcome": "Write lightning-fast, non-blocking asynchronous Python services without thread lock deadlocks."
    },
    {
        "moduleNumber": "Module 03",
        "title": "High-Performance REST APIs with FastAPI & Pydantic",
        "duration": "Week 5–6 (8 Days)",
        "topics": [
            "Modern Python type annotations (Type Hints, Generics, Optional, Union)",
            "Pydantic v2 schemas: validation, serialization, custom field validators",
            "FastAPI request routing, path/query parameters, and HTTP request lifecycles",
            "Dependency Injection architecture in FastAPI for DB connections and auth guards",
            "Auto-generated OpenAPI (Swagger) documentation and API versioning"
        ],
        "subLessons": [
            {
                "subNumber": "3.1",
                "title": "Pydantic Data Contracts & Validation",
                "topics": [
                    "Field validation",
                    "ConfigDict",
                    "Serialization aliases",
                    "Error response formatting"
                ]
            },
            {
                "subNumber": "3.2",
                "title": "FastAPI Router & Dependency Injection",
                "topics": [
                    "APIRouter",
                    "Depends() mechanics",
                    "Global exception handlers",
                    "CORS middleware"
                ]
            }
        ],
        "practicalExercise": "Architect a modular RESTful microservice with clean router separation, automated validation, and OpenAPI documentation.",
        "expectedOutcome": "Build commercial-grade RESTful APIs adhering to clean architecture standards."
    },
    {
        "moduleNumber": "Module 04",
        "title": "Database Persistence, SQLAlchemy ORM & Authentication",
        "duration": "Week 7 (8 Days)",
        "topics": [
            "Relational modeling: tables, foreign keys, one-to-many, and many-to-many relationships",
            "SQLAlchemy 2.0 ORM: declarative models, async sessions, and connection pooling",
            "Database migrations with Alembic: revisions, upgrades, and schema rollbacks",
            "User security: password hashing with bcrypt, JWT token signing, and refresh token rotations",
            "Role-Based Access Control (RBAC) middleware for protected endpoints"
        ],
        "subLessons": [
            {
                "subNumber": "4.1",
                "title": "SQLAlchemy Async ORM & Alembic Migrations",
                "topics": [
                    "AsyncSession",
                    "select() queries",
                    "Relationship eager loading",
                    "Alembic autogenerate"
                ]
            },
            {
                "subNumber": "4.2",
                "title": "JWT Authentication & Security Guards",
                "topics": [
                    "OAuth2PasswordBearer",
                    "Token expiration",
                    "Protected route guards",
                    "Password salting"
                ]
            }
        ],
        "practicalExercise": "Implement a secure authentication service with encrypted credentials, JWT issuing, and user profile management.",
        "expectedOutcome": "Design normalized SQL databases and secure API endpoints with enterprise authentication patterns."
    },
    {
        "moduleNumber": "Module 05",
        "title": "Testing, Dockerization & Production Deployment",
        "duration": "Week 8 (8 Days)",
        "topics": [
            "Test-Driven Development (TDD) with PyTest: test suites, fixtures, parametrization",
            "Mocking external APIs and database calls with pytest-mock and AsyncMock",
            "Redis caching: key expiration, cache-aside pattern, and background task queues",
            "Containerizing Python services with Docker and multi-stage Dockerfiles",
            "Docker Compose orchestration: FastAPI + PostgreSQL + Redis",
            "Capstone Defense: Production-Grade Microservice with JWT & Caching"
        ],
        "subLessons": [
            {
                "subNumber": "5.1",
                "title": "Automated Testing with PyTest",
                "topics": [
                    "Fixtures",
                    "Test client",
                    "Mocking database transactions",
                    "Coverage reports"
                ]
            },
            {
                "subNumber": "5.2",
                "title": "Docker & Multi-Container Deployment",
                "topics": [
                    "Dockerfile optimization",
                    "docker-compose.yml",
                    "Environment secrets",
                    "Cloud deployment"
                ]
            }
        ],
        "practicalExercise": "Containerize and deploy the Capstone Microservice with complete PyTest test suites and Docker Compose.",
        "expectedOutcome": "Deliver containerized, thoroughly tested Python backend systems ready for enterprise production."
    }
],
    careerPaths: [
      'Senior Python Developer',
      'Backend Software Engineer',
      'API & Microservices Engineer',
      'Data Infrastructure Engineer',
      'Python Automation Architect'
    ],
    instructor: {
      name: 'Navya Backend Systems Faculty Panel',
      role: 'Advanced Architecture Mentors',
      experience: 'Min. 5+ years building high-concurrency microservices & distributed systems',
      specialization: 'AsyncIO, Distributed Systems, FastAPI, Clean Architecture',
      isPlaceholder: false
    },
    faqs: [
      {
        question: 'Who should take Python Advance over Python Beginner?',
        answer: 'If you already understand Python loops, functions, lists, dictionaries, and classes, this course is designed for you. It skips the basics and jumps straight into concurrency, architecture, and production APIs.'
      },
      {
        question: 'Are FastAPI and Docker covered in this course?',
        answer: 'Yes! You will build and containerize modern RESTful APIs using FastAPI, Pydantic, SQLAlchemy, and Docker.'
      }
    ],
    seoTitle: 'Python Advance Course in Nepal (40 Days) | Advanced Python Online',
    seoDescription: 'Master advanced Python online. Learn AsyncIO, design patterns, FastAPI, and scalable system engineering in our intensive 40-day course at Navya Ed Tech.'
  },
{
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    category: 'Web Development',
    shortDescription: 'Build modern responsive websites and interactive web applications using HTML5, CSS3, modern JavaScript ES6+, and backend API integration.',
    description: 'A practical, industry-aligned web development program covering the complete journey of modern web craftsmanship. Starting with semantic HTML5 and responsive modern CSS layouts (Flexbox & Grid), and culminating in modern JavaScript ES6+ application logic, dynamic DOM interfaces, and connecting to RESTful APIs.',
    heroImage: '',
    duration: '45 Days',
    level: 'Beginner to Intermediate',
    mode: 'Online Live',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 9:00 AM) & Evening (5:00 PM – 7:00 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Live online classes'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'HTML5 & Semantic Markup',
      'Modern CSS3 (Flexbox, Grid)',
      'Tailwind CSS',
      'JavaScript ES6+',
      'DOM Manipulation & Events',
      'JavaScript ES6+ Modules & Design Patterns',
      'REST APIs & Fetch',
      'Git & GitHub',
      'Vercel & Netlify Deployment'
    ],
    targetAudience: [
      'Aspiring web developers and software engineers wanting an end-to-end practical foundation.',
      'Students in IT, BCA, BSc.CSIT, or Engineering seeking hands-on project experience.',
      'Career switchers wanting to build real, deployable commercial websites and web apps.',
      'Graphic and UI designers who want to bring their web designs to life with clean code.'
    ],
    prerequisites: [
      'Basic computer literacy and a passion for technology and design.',
      'No prior programming or web development experience required.',
      'A laptop or desktop computer with a stable internet connection for live classes and coding assignments.'
    ],
    outcomes: [
      'Build fully responsive, accessible websites that render seamlessly across mobile, tablet, and desktop.',
      'Write modular, clean JavaScript ES6+ code with array methods, promises, and async/await.',
      'Build dynamic, interactive interfaces with DOM manipulation and reusable UI patterns in vanilla JavaScript.',
      'Integrate third-party RESTful APIs and handle asynchronous data fetching, caching, and state.',
      'Deploy production web applications to cloud hosts like Vercel and showcase on GitHub.'
    ],
    projects: [
      {
        title: 'Modern E-Commerce Storefront with Product Filtering & Cart',
        technologies: ['HTML5', 'Tailwind CSS', 'JavaScript ES6+', 'Local Storage'],
        description: 'Complete online retail interface with product catalog, search filters, category tags, responsive shopping cart, and mock checkout flow.',
        type: 'Vanilla JavaScript Web Application'
      },
      {
        title: 'Interactive Real-Time Task & Kanban Board',
        technologies: ['JavaScript ES6+', 'CSS Grid', 'REST APIs', 'Vercel'],
        description: 'Project management application featuring drag-and-drop status columns, task creation, tagging, priority indicators, and persistent state.',
        type: 'Interactive Dashboard'
      },
      {
        title: 'Dynamic Weather & City Information Portal with Live APIs',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Fetch API'],
        description: 'Real-time meteorological web app utilizing geolocation, external REST weather APIs, dynamic theme switching, and 5-day forecast visualizations.',
        type: 'API-Driven Web App'
      }
    ],
    whyChooseThis: {
      title: 'Why Web Development at Navya Ed Tech?',
      points: [
        {
          headline: 'Complete Modern Stack:',
          detail: 'We skip obsolete workflows and teach what modern tech companies actively look for: semantic HTML5, Tailwind CSS, and JavaScript ES6+.'
        },
        {
          headline: 'Live Deployed Portfolio Requirement:',
          detail: 'Curriculum milestone: Students engineer and deploy 3 production web applications on Vercel with clean GitHub repositories to showcase to employers.'
        },
        {
          headline: 'Daily Hands-On Sprints:',
          detail: 'Learn by coding every single day in live online sessions with direct instructor guidance and support.'
        }
      ]
    },
    curriculum: [
    {
        "moduleNumber": "Module 01",
        "title": "Semantic HTML5, Modern CSS3 & Responsive Layouts",
        "duration": "Week 1–2 (9 Days)",
        "topics": [
            "Semantic HTML5 markup: header, nav, main, section, article, footer",
            "Modern CSS3 fundamentals: box model, specificity, custom properties (CSS variables)",
            "CSS Flexbox mastery: axis alignments, flex wrapping, order, and responsive navbars",
            "CSS Grid systems: track sizing, grid-template-areas, auto-fit, and card galleries",
            "Responsive design principles, mobile-first media queries, and typography scale"
        ],
        "subLessons": [
            {
                "subNumber": "1.1",
                "title": "Semantic Structure & Modern CSS Layouts",
                "topics": [
                    "HTML5 semantic elements",
                    "CSS resets",
                    "Flexbox layouts",
                    "Grid systems"
                ]
            },
            {
                "subNumber": "1.2",
                "title": "Mobile-First Responsive Engineering",
                "topics": [
                    "Viewport meta tags",
                    "Media queries",
                    "Responsive images",
                    "CSS variables"
                ]
            }
        ],
        "practicalExercise": "Design and code a pixel-perfect, fully responsive Agency Portfolio Website with CSS Grid & Flexbox.",
        "expectedOutcome": "Craft clean, semantic HTML5 and fluid CSS3 layouts that render flawlessly on mobile, tablet, and desktop."
    },
    {
        "moduleNumber": "Module 02",
        "title": "Tailwind CSS Utility Design Systems & UI Polishing",
        "duration": "Week 3 (9 Days)",
        "topics": [
            "Utility-first CSS philosophy vs component-class approaches",
            "Tailwind CSS setup, configuration, and design tokens (colors, spacing, shadows)",
            "Responsive prefix modifiers (sm, md, lg, xl) and pseudo-class states (hover, focus, active)",
            "Building reusable UI components: buttons, modals, dropdowns, input fields, badges",
            "Dark mode implementation, micro-interactions, and transition animations"
        ],
        "subLessons": [
            {
                "subNumber": "2.1",
                "title": "Tailwind CSS Core Utilities & Grid Systems",
                "topics": [
                    "Flex and grid utilities",
                    "Typography utilities",
                    "Color palette theming",
                    "Borders & shadows"
                ]
            },
            {
                "subNumber": "2.2",
                "title": "Interactive UI Components & Transitions",
                "topics": [
                    "Hover and focus ring states",
                    "Transitions & transforms",
                    "Dark mode toggles",
                    "Accessible forms"
                ]
            }
        ],
        "practicalExercise": "Re-create a modern SaaS Landing Page using Tailwind CSS featuring dynamic hero, feature grid, and pricing cards.",
        "expectedOutcome": "Rapidly construct professional, accessible, and responsive user interfaces with Tailwind CSS."
    },
    {
        "moduleNumber": "Module 03",
        "title": "Modern JavaScript ES6+ & Dynamic DOM Manipulation",
        "duration": "Week 4–5 (9 Days)",
        "topics": [
            "Modern JavaScript syntax: let/const, arrow functions, destructuring, rest/spread operators",
            "DOM querying, dynamic element creation, event listeners, and event bubbling/delegation",
            "Functional array methods: map, filter, reduce, find, some, every",
            "Asynchronous JavaScript: Promises, async/await, and error handling with try/catch",
            "Working with third-party APIs using the Fetch API and localStorage persistence"
        ],
        "subLessons": [
            {
                "subNumber": "3.1",
                "title": "DOM Engineering & Event Systems",
                "topics": [
                    "querySelector",
                    "addEventListener",
                    "Event bubbling & delegation",
                    "Dynamic CSS class toggles"
                ]
            },
            {
                "subNumber": "3.2",
                "title": "Asynchronous JavaScript & REST API Fetching",
                "topics": [
                    "Promises",
                    "async/await",
                    "Fetch API",
                    "JSON parsing",
                    "localStorage data caching"
                ]
            }
        ],
        "practicalExercise": "Build a Dynamic Weather & City Information Web Application using real-time open weather APIs and location search.",
        "expectedOutcome": "Master core JavaScript programming, asynchronous network requests, and dynamic DOM manipulation."
    },
    {
        "moduleNumber": "Module 04",
        "title": "React 18+ Component Architecture & State Management",
        "duration": "Week 6–7 (9 Days)",
        "topics": [
            "React philosophy: declarative UI, virtual DOM, and component composition",
            "Vite build tooling: creating fast modern React applications",
            "JSX syntax, component props, and conditional rendering patterns",
            "React Hooks: useState for reactive state, useEffect for side-effects and API subscriptions",
            "Controlled form inputs, validation state, and lifting state up across parent-child components"
        ],
        "subLessons": [
            {
                "subNumber": "4.1",
                "title": "Component Trees & State Mechanics",
                "topics": [
                    "Functional components",
                    "Props passing",
                    "useState hook",
                    "Immutable state updates"
                ]
            },
            {
                "subNumber": "4.2",
                "title": "Effects, Data Fetching & Custom Hooks",
                "topics": [
                    "useEffect dependencies",
                    "API lifecycle fetching",
                    "Loading/Error states",
                    "Custom useFetch hook"
                ]
            }
        ],
        "practicalExercise": "Develop an Interactive Kanban Board & Task Manager with customizable status columns and persistent state.",
        "expectedOutcome": "Architect scalable Single-Page Applications with React component hierarchies and reactive state."
    },
    {
        "moduleNumber": "Module 05",
        "title": "Single-Page Routing, Capstone Project & Cloud Deployment",
        "duration": "Week 8 (9 Days)",
        "topics": [
            "Client-side routing with React Router: Route, Link, NavLink, useParams, and useNavigate",
            "Shopping cart state management and checkout flow logic",
            "Git workflows: branches, feature pull requests, and GitHub repository hygiene",
            "Production optimization: code splitting, asset bundling, and environment variables",
            "Continuous deployment to Vercel and Netlify with live custom domains",
            "Capstone Defense: E-Commerce Storefront with Product Filtering & Shopping Cart"
        ],
        "subLessons": [
            {
                "subNumber": "5.1",
                "title": "React Router & Multi-Page Navigation",
                "topics": [
                    "Route hierarchies",
                    "Dynamic URL params",
                    "Protected routes",
                    "404 handling"
                ]
            },
            {
                "subNumber": "5.2",
                "title": "Production Deployment & Git Portfolio Defense",
                "topics": [
                    "Vercel deployment",
                    "Build optimization",
                    "GitHub README polish",
                    "Live demonstration"
                ]
            }
        ],
        "practicalExercise": "Deliver the full Modern E-Commerce Storefront capstone project with category filtering, cart persistence, and live cloud URL.",
        "expectedOutcome": "Deploy polished, production-ready React web applications to the cloud and present a verifiable hiring portfolio."
    }
],
    careerPaths: [
      'Junior Frontend Developer',
      'Web Developer',
      'JavaScript Developer',
      'UI/Web Engineer',
      'Freelance Web Specialist'
    ],
    instructor: {
      name: 'Navya Web Engineering Faculty Panel',
      role: 'Modern Frontend & Web Architecture Leads',
      experience: 'Min. 5+ years engineering commercial web applications with modern JavaScript',
      specialization: 'Modern Frontend Architecture, JavaScript ES6+, Tailwind CSS, Responsive Design',
      isPlaceholder: false
    },
    faqs: [
      {
        question: 'Do I need design skills before joining Web Development?',
        answer: 'Not at all! We teach the principles of clean UI layout, typography, colors, and responsive design alongside HTML, CSS, and JavaScript.'
      },
      {
        question: 'What is the schedule and total duration for 45 days?',
        answer: 'The course spans 45 instructional days (approx. 7.5 weeks), Sunday to Friday, with 2 hours of daily interactive instruction and mentored lab coding.'
      },
      {
        question: 'Will I learn how to host and deploy my web projects?',
        answer: 'Yes! You will learn Git version control, push your work to GitHub, and deploy live websites to cloud platforms like Vercel and Netlify.'
      }
    ],
    seoTitle: 'Web Development Course in Nepal (45 Days) | Learn Web Design Online',
    seoDescription: 'Master web development in Nepal with Navya Ed Tech. Learn HTML5, CSS3, JavaScript, and Git in our 45-day hands-on live online course.'
  },
{
    id: 'data-science',
    slug: 'data-science',
    title: 'Data Science',
    category: 'Data & AI',
    shortDescription: 'Extract actionable insights from raw data using Python, Pandas, statistical modeling, exploratory data analysis, and machine learning pipelines.',
    description: 'A rigorous, industry-relevant curriculum designed to transform learners into competent data practitioners. Master data wrangling, cleaning, exploratory data analysis (EDA), statistical inference, data visualization with Seaborn and Matplotlib, SQL database querying, and predictive modeling using Scikit-Learn machine learning algorithms.',
    heroImage: '',
    duration: '50 Days',
    level: 'Intermediate to Advanced',
    mode: 'Online Live',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 9:00 AM) & Evening (5:30 PM – 7:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Live online classes'
    },
    fee: 'Contact for current fee & batch structure (NPR)',
    technologies: [
      'Python',
      'NumPy & Vectorized Computing',
      'Pandas DataFrames',
      'Matplotlib & Seaborn',
      'SQL & Relational Databases',
      'Exploratory Data Analysis (EDA)',
      'Scikit-Learn',
      'Supervised & Unsupervised ML',
      'Feature Engineering & Scaling',
      'JupyterLab & Google Colab',
      'Model Evaluation & Metrics'
    ],
    targetAudience: [
      'Students and graduates in Computer Science, Statistics, Mathematics, Economics, or Business disciplines.',
      'Programmers wanting to transition into high-growth Data Science, Business Intelligence, or AI careers.',
      'Business analysts seeking to replace manual spreadsheet workflows with automated Python data pipelines.',
      'Working professionals aiming to build machine learning models to solve real organizational challenges.'
    ],
    prerequisites: [
      'Basic familiarity with computer usage and high-school mathematics (basic algebra and statistics).',
      'Prior exposure to programming logic or completion of Python Beginner is helpful but not strictly required.',
      'A laptop with at least 8GB RAM for running data processing notebooks.'
    ],
    outcomes: [
      'Clean, reshape, and impute missing data from messy real-world datasets using Pandas and NumPy.',
      'Conduct comprehensive Exploratory Data Analysis (EDA) and synthesize compelling visual stories with Seaborn.',
      'Write complex SQL queries for data aggregation, filtering, joining, and cohort analysis.',
      'Train, tune, and evaluate machine learning models (Regression, Classification, Clustering) with Scikit-Learn.',
      'Build end-to-end reproducible data science notebooks and deliver actionable business presentations.'
    ],
    projects: [
      {
        title: 'Exploratory Customer Churn Analysis & Retention Strategy',
        technologies: ['Python', 'Pandas', 'Seaborn', 'Scikit-Learn'],
        description: 'Comprehensive analysis of telecommunication customer behavior, identifying churn drivers, correlation heatmaps, and building a logistic classification model to predict at-risk users.',
        type: 'Analytics & Predictive Model'
      },
      {
        title: 'Real Estate & Housing Valuation Regression Pipeline',
        technologies: ['Python', 'Pandas', 'Scikit-Learn', 'Feature Engineering'],
        description: 'Multi-variable regression model predicting property market valuations, featuring automated outlier removal, categorical one-hot encoding, and hyperparameter tuning.',
        type: 'Machine Learning Pipeline'
      },
      {
        title: 'Retail Market Basket Analysis & Product Recommendation Engine',
        technologies: ['Python', 'Pandas', 'Association Rules', 'Matplotlib'],
        description: 'Unsupervised learning system analyzing thousands of shopping transaction baskets to discover frequent item pairings and generate automated cross-sell recommendations.',
        type: 'Unsupervised Learning'
      }
    ],
    whyChooseThis: {
      title: 'Why Data Science at Navya Ed Tech?',
      points: [
        {
          headline: 'High-Demand Global Career:',
          detail: 'Data Science remains one of the most lucrative and future-proof career paths across tech, banking, healthcare, and e-commerce.'
        },
        {
          headline: 'Real-World Datasets:',
          detail: 'Work with authentic, messy datasets—not clean toy examples—to learn the real art of data preparation, cleaning, and modeling.'
        },
        {
          headline: 'Senior Data Mentorship:',
          detail: 'Learn directly from experienced data practitioners with 1-on-1 online code reviews and project defense sessions.'
        }
      ]
    },
    curriculum: [
    {
        "moduleNumber": "Module 01",
        "title": "Python for Scientific Computing, NumPy & Pandas",
        "duration": "Week 1–2 (10 Days)",
        "topics": [
            "Data science ecosystem: JupyterLab, Google Colab, and virtual environments",
            "Vectorized computing with NumPy: multi-dimensional ndarrays, slicing, and broadcasting",
            "Pandas fundamentals: Series and DataFrames, index manipulation, and data alignment",
            "Data ingestion: reading CSV, Excel, JSON, and SQL database tables",
            "Data cleaning: handling missing values (imputation vs deletion), deduplication, and type casting"
        ],
        "subLessons": [
            {
                "subNumber": "1.1",
                "title": "NumPy Vectorized Array Computations",
                "topics": [
                    "Matrix operations",
                    "Array broadcasting",
                    "Boolean masking",
                    "Mathematical aggregations"
                ]
            },
            {
                "subNumber": "1.2",
                "title": "Pandas DataFrames & Wrangling Primitives",
                "topics": [
                    "iloc and loc indexing",
                    "Filtering rows",
                    "Column transformations",
                    "Handling NaN values"
                ]
            }
        ],
        "practicalExercise": "Perform data auditing and automated cleaning on messy real-world telecom customer service datasets.",
        "expectedOutcome": "Fluently clean, reshape, and transform large datasets using high-performance Pandas and NumPy operations."
    },
    {
        "moduleNumber": "Module 02",
        "title": "Exploratory Data Analysis (EDA) & Statistical Inference",
        "duration": "Week 3–4 (10 Days)",
        "topics": [
            "Descriptive statistics: mean, median, standard deviation, IQR, and percentiles",
            "Visualizing distributions with Matplotlib & Seaborn: histograms, KDE, boxplots, violin plots",
            "Bivariate and multivariate analysis: scatter plots, pairplots, and correlation heatmaps",
            "Detecting and treating outliers using Z-score and IQR methods",
            "Statistical hypothesis testing: t-tests, Chi-square tests, and p-value interpretations"
        ],
        "subLessons": [
            {
                "subNumber": "2.1",
                "title": "Data Storytelling & Visualization",
                "topics": [
                    "Seaborn styling",
                    "Custom color palettes",
                    "Subplot layouts",
                    "Visualizing categorical vs continuous variables"
                ]
            },
            {
                "subNumber": "2.2",
                "title": "Correlation & Hypothesis Testing",
                "topics": [
                    "Pearson & Spearman correlation",
                    "Hypothesis formulation",
                    "p-values & significance",
                    "A/B testing basics"
                ]
            }
        ],
        "practicalExercise": "Execute complete Exploratory Data Analysis (EDA) report uncovering key customer churn indicators with visual dashboards.",
        "expectedOutcome": "Formulate hypotheses, synthesize statistical distributions, and communicate insights visually."
    },
    {
        "moduleNumber": "Module 03",
        "title": "Relational Data Warehousing & Advanced SQL",
        "duration": "Week 5–6 (10 Days)",
        "topics": [
            "Relational database architecture: tables, keys, normal forms, and entity relationships",
            "SQL querying mastery: SELECT, WHERE, GROUP BY, HAVING, ORDER BY",
            "Complex SQL joins: INNER, LEFT, RIGHT, FULL OUTER, and CROSS joins",
            "Advanced SQL analytical window functions: ROW_NUMBER(), RANK(), DENSE_RANK(), LAG(), LEAD()",
            "Common Table Expressions (CTEs), subqueries, and connecting Python to SQL databases"
        ],
        "subLessons": [
            {
                "subNumber": "3.1",
                "title": "Relational Queries & Multi-Table Joins",
                "topics": [
                    "Aggregation queries",
                    "Grouping semantics",
                    "Join strategies",
                    "Null handling in SQL"
                ]
            },
            {
                "subNumber": "3.2",
                "title": "Window Functions & Cohort Analysis",
                "topics": [
                    "PARTITION BY clauses",
                    "Rolling moving averages",
                    "Customer retention cohorts",
                    "Python SQL query execution"
                ]
            }
        ],
        "practicalExercise": "Build a SQL analytics script computing monthly user cohort retention curves and lifetime customer valuations.",
        "expectedOutcome": "Query complex enterprise relational databases and engineer aggregated analytical datasets with SQL."
    },
    {
        "moduleNumber": "Module 04",
        "title": "Supervised Machine Learning with Scikit-Learn",
        "duration": "Week 7–8 (10 Days)",
        "topics": [
            "Machine learning fundamentals: features, target labels, train-test splits, overfitting vs underfitting",
            "Feature engineering: StandardScaler, MinMaxScaler, One-Hot Encoding, and ColumnTransformer",
            "Regression algorithms: Linear Regression, Ridge, Lasso, and evaluation metrics (MAE, MSE, RMSE, R²)",
            "Classification algorithms: Logistic Regression, Decision Trees, Random Forests, Support Vector Machines",
            "Scikit-Learn Pipelines and hyperparameter tuning with GridSearchCV and cross-validation"
        ],
        "subLessons": [
            {
                "subNumber": "4.1",
                "title": "Regression & Housing Valuation Pipelines",
                "topics": [
                    "Linear regression mathematics",
                    "Cost functions",
                    "Gradient descent concept",
                    "R² evaluation"
                ]
            },
            {
                "subNumber": "4.2",
                "title": "Classification & Predictive Modeling",
                "topics": [
                    "Decision trees",
                    "Ensemble Random Forests",
                    "Feature importances",
                    "GridSearchCV tuning"
                ]
            }
        ],
        "practicalExercise": "Train, tune, and evaluate a Real Estate & Housing Valuation regression pipeline with cross-validation scoring.",
        "expectedOutcome": "Train robust supervised regression and classification models using modern Scikit-Learn pipelines."
    },
    {
        "moduleNumber": "Module 05",
        "title": "Unsupervised Learning, Model Evaluation & Capstone Defense",
        "duration": "Week 9–10 (10 Days)",
        "topics": [
            "Model evaluation in depth: Confusion Matrix, Precision, Recall, F1-Score, ROC-AUC curves",
            "Unsupervised learning: K-Means Clustering, Elbow Method, and customer market segmentation",
            "Dimensionality reduction: Principal Component Analysis (PCA) concept and implementation",
            "Association rule mining: Apriori algorithm for market basket product recommendations",
            "Packaging reproducible data science projects: narrative Jupyter Notebooks and executive slide decks",
            "Capstone Defense: Customer Churn Prediction Engine & Retail Recommendation Model"
        ],
        "subLessons": [
            {
                "subNumber": "5.1",
                "title": "Clustering & Customer Segmentation",
                "topics": [
                    "K-Means clustering",
                    "Elbow method",
                    "Silhouette score",
                    "Market basket association analysis"
                ]
            },
            {
                "subNumber": "5.2",
                "title": "Comprehensive Model Evaluation & Portfolio Defense",
                "topics": [
                    "Precision vs Recall tradeoffs",
                    "ROC curves",
                    "Model export with Joblib",
                    "Executive presentation"
                ]
            }
        ],
        "practicalExercise": "Complete and defend the end-to-end Customer Churn & Retention Machine Learning Project before the faculty panel.",
        "expectedOutcome": "Deliver rigorous predictive models and unsupervised data intelligence projects ready for hiring review."
    }
],
    careerPaths: [
      'Data Scientist',
      'Data Analyst',
      'Business Intelligence (BI) Analyst',
      'Machine Learning Associate',
      'Quantitative Analytics Specialist'
    ],
    instructor: {
      name: 'Navya Applied Data Science Faculty Panel',
      role: 'Data Science & Applied ML Leads',
      experience: 'Min. 5+ years in enterprise predictive modeling, analytics & production pipelines',
      specialization: 'Pandas, Scikit-Learn, Feature Engineering, Machine Learning, Statistical Inference',
      isPlaceholder: false
    },
    faqs: [
      {
        question: 'Do I need an advanced math or statistics degree for this course?',
        answer: 'No. We teach all necessary statistical concepts—standard deviation, distributions, correlation, p-values, and loss functions—intuitively with visual representations and code.'
      },
      {
        question: 'What is the format and duration for 50 days?',
        answer: 'The course runs for 50 intensive instructional days (approx. 8 weeks), with daily live lectures, coding labs in JupyterLab, and weekend project sprints.'
      },
      {
        question: 'Will I learn Machine Learning algorithms in this course?',
        answer: 'Yes! You will implement linear and logistic regression, decision trees, random forests, k-means clustering, and model evaluation metrics using Scikit-Learn.'
      }
    ],
    seoTitle: 'Data Science Course in Nepal (50 Days) | Python & ML Training Online',
    seoDescription: 'Master Data Science online with Navya Ed Tech. Learn Python, Pandas, SQL, and Machine Learning with real-world datasets in our 50-day live online course.'
  },
{
    id: 'scratch-beginner',
    slug: 'scratch-beginner',
    title: 'Scratch Beginner',
    category: 'Kids Coding',
    shortDescription: 'An exciting, playful introduction to computational thinking, animation, and storytelling using visual block-based programming for young learners.',
    description: 'A fun and engaging program designed specifically for school students and young beginners to cultivate problem-solving, creativity, and computational thinking. Students learn core computer science concepts—such as sequences, loops, conditionals, events, and variables—through interactive animations, musical instruments, and simple arcade games created in Scratch 3.0.',
    heroImage: '',
    duration: '30 Days',
    level: 'Beginner',
    mode: 'Online Live',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (8:00 AM – 9:30 AM) & Afternoon (4:00 PM – 5:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Live online classes'
    },
    fee: 'Contact for current fee & junior batch schedules (NPR)',
    technologies: [
      'Scratch 3.0',
      'Visual Block-Based Coding',
      'Sprite Creation & Costumes',
      'Sound Effects & Audio FX',
      'Sequencing & Event Handling',
      'Loops & Iteration',
      'Conditional Logic (If-Else)',
      'Basic Variables & Scores',
      'Interactive Storytelling'
    ],
    targetAudience: [
      'School students (Ages 7–14) curious about how computers, games, and animations work.',
      'Young beginners with zero computer programming experience looking for a joyful start.',
      'Parents seeking structured STEM and computational thinking education for their children.',
      'Educators and creative minds wanting to explore educational coding tools.'
    ],
    prerequisites: [
      'Basic ability to read, click a computer mouse, and follow simple instructions.',
      'No prior programming or typing knowledge required.',
      'Curiosity, enthusiasm, and imagination!'
    ],
    outcomes: [
      'Understand the foundational logic of programming: instructions, events, and loops.',
      'Design and animate interactive sprites with custom costumes, backdrops, and sounds.',
      'Build engaging mini-games with player movement, collision detection, and score tracking.',
      'Cultivate algorithmic problem-solving and structured logical thinking from an early age.',
      'Publish and present completed Scratch projects proudly to peers and parents.'
    ],
    projects: [
      {
        title: 'Interactive Animated Storybook with Sound FX',
        technologies: ['Scratch 3.0', 'Broadcast Events', 'Costumes', 'Sound'],
        description: 'Multi-scene interactive fairy tale or cartoon story where user clicks trigger character dialogues, sound effects, and backdrop transitions.',
        type: 'Interactive Story'
      },
      {
        title: 'Fruit Catcher Arcade Game',
        technologies: ['Scratch 3.0', 'Loops', 'Conditionals', 'Variables'],
        description: 'Fast-paced arcade game where players move a bowl to catch falling fruit, gain points for apples, and lose lives for obstacles.',
        type: 'Arcade Game'
      },
      {
        title: 'Virtual Musical Instrument & Dance Party Simulator',
        technologies: ['Scratch 3.0', 'Audio Blocks', 'Key Press Events'],
        description: 'Interactive keyboard synthesizer where number keys trigger drum beats, piano notes, and dancing character animations.',
        type: 'Music App'
      }
    ],
    whyChooseThis: {
      title: 'Why Start Kids with Scratch Beginner?',
      points: [
        {
          headline: 'Visual & Frustration-Free:',
          detail: 'Scratch replaces confusing punctuation and spelling errors with colorful visual puzzle blocks, allowing kids to focus on pure logic and fun.'
        },
        {
          headline: 'Ignites Early Creativity:',
          detail: 'Kids transform from passive screen consumers into active creators who design their own games, stories, and animations.'
        },
        {
          headline: 'Safe & Encouraging Environment:',
          detail: 'Our small live online classes provide guided, patient mentorship tailored specifically for young learners and junior cohorts.'
        }
      ]
    },
    curriculum: [
    {
        "moduleNumber": "Module 01",
        "title": "Introduction to Creative Coding & Scratch Studio",
        "duration": "Week 1 (7 Days)",
        "topics": [
            "What is coding? Understanding how computers follow step-by-step instructions",
            "Tour of the Scratch 3.0 interface: stage, sprites, blocks palette, and scripts area",
            "Motion blocks: moving, turning, glide, and coordinate plane (X and Y positions)",
            "Looks and sound blocks: changing costumes, speech bubbles, and playing sound effects",
            "First project: Animated Greeting Card & Dancing Sprite"
        ],
        "subLessons": [
            {
                "subNumber": "1.1",
                "title": "Scratch Studio & Sprite Animation",
                "topics": [
                    "Green flag events",
                    "Coordinate movements",
                    "Costume switching",
                    "Sound blocks"
                ]
            }
        ],
        "practicalExercise": "Create an Animated Interactive Musical Dance Party with clickable characters and sound effects.",
        "expectedOutcome": "Comfortably navigate Scratch, understand the X-Y coordinate plane, and animate custom sprites."
    },
    {
        "moduleNumber": "Module 02",
        "title": "Sequencing, Events & Interactive Storytelling",
        "duration": "Week 2 (7 Days)",
        "topics": [
            "Event blocks: When green flag clicked, when key pressed, and when sprite clicked",
            "Broadcasting messages: coordinating actions between multiple sprites",
            "Backdrops and scene changes: switching backgrounds to create multi-scene stories",
            "Wait blocks and dialogue timing between characters",
            "Project: Multi-Scene Animated Comic Storybook"
        ],
        "subLessons": [
            {
                "subNumber": "2.1",
                "title": "Broadcast Messaging & Story Architecture",
                "topics": [
                    "Broadcast send and receive",
                    "Dialogue synchronizations",
                    "Backdrop transitions"
                ]
            }
        ],
        "practicalExercise": "Build an Interactive Fairy Tale Storybook where user choices guide the characters to different story endings.",
        "expectedOutcome": "Use broadcast messages to coordinate complex interactions between multiple animated sprites."
    },
    {
        "moduleNumber": "Module 03",
        "title": "Loops, Conditionals & Sensing Controls",
        "duration": "Week 3 (8 Days)",
        "topics": [
            "Control blocks: Repeat loops, Forever loops, and Repeat Until",
            "Sensing blocks: touching mouse pointer, touching colors, and distance to",
            "Conditional decision logic: If-Then and If-Then-Else blocks",
            "Keyboard controls for player sprite movement (Arrow keys / WASD)",
            "Project: Maze Runner Game with boundary detection"
        ],
        "subLessons": [
            {
                "subNumber": "3.1",
                "title": "Player Movement & Boundary Collisions",
                "topics": [
                    "Arrow key listeners",
                    "Color sensing wall boundaries",
                    "Forever loop game loops"
                ]
            }
        ],
        "practicalExercise": "Program a Maze Escape Game with obstacle walls, collectibles, and celebration animations upon winning.",
        "expectedOutcome": "Implement continuous game loops, player steering controls, and collision sensing logic."
    },
    {
        "moduleNumber": "Module 04",
        "title": "Variables, Scorekeeping & Capstone Arcade Game",
        "duration": "Week 4 (8 Days)",
        "topics": [
            "Data variables: creating variables, setting values, and changing by numbers",
            "Tracking scores, player lives, and countdown game timers",
            "Randomness with \"pick random\" block for unpredictable obstacles",
            "Game over conditions and victory screens",
            "Capstone Defense: Fruit Catcher Arcade Game"
        ],
        "subLessons": [
            {
                "subNumber": "4.1",
                "title": "Variables & Arcade Game Architecture",
                "topics": [
                    "Score counters",
                    "Health bars",
                    "Falling item randomness",
                    "Win/Loss state screens"
                ]
            }
        ],
        "practicalExercise": "Complete Capstone: Program the Fruit Catcher Arcade Game with falling fruit, score counters, and sound FX.",
        "expectedOutcome": "Build complete playable games with scoring rules, health meters, and share them with family and friends."
    }
],
    careerPaths: [
      'Foundation for Scratch Advanced',
      'Foundation for Python Programming',
      'STEM & Robotics Readiness',
      'Creative Digital Arts & Game Design'
    ],
    instructor: {
      name: 'Young Coders & STEM Mentorship Council',
      role: 'Creative Coding & CS Pedagogy Mentors',
      experience: 'Min. 4+ years specializing in K-12 STEM pedagogy & computational logic',
      specialization: 'Scratch 3.0, Computational Thinking, Game-Based Learning',
      isPlaceholder: false
    },
    faqs: [
      {
        question: 'What age group is Scratch Beginner suitable for?',
        answer: 'Scratch Beginner is ideally designed for children aged 7 to 14. No prior computer coding experience is needed.'
      },
      {
        question: 'Do parents need to attend the classes with their child?',
        answer: 'No. Our instructors and lab assistants provide hands-on, step-by-step guidance in every session. Parents are welcome during project presentations!'
      },
      {
        question: 'Can projects created in class be played at home?',
        answer: 'Yes! Scratch projects run inside any web browser and can be shared with family and friends anywhere via Scratch project links.'
      }
    ],
    seoTitle: 'Scratch Beginner Coding Course for Kids (30 Days) | Online in Nepal',
    seoDescription: 'Introduce your child to coding with our 30-day live online Scratch Beginner course at Navya Ed Tech. Fun, visual, creative game development for kids.'
  },
{
    id: 'scratch-advanced',
    slug: 'scratch-advanced',
    title: 'Scratch Advanced',
    category: 'Kids Coding',
    shortDescription: 'Take block coding to the next level with multi-level 2D games, physics simulations, custom blocks, cloning, and game state mechanics.',
    description: 'A project-heavy advanced Scratch track for students who have mastered basic block coding and want to engineer sophisticated 2D games and simulations. Students explore gravity and jump physics, collision detection algorithms, cloning for particle effects, custom procedural blocks ("My Blocks"), broadcast messaging hierarchies, and cloud variable high-score leaderboards.',
    heroImage: '',
    duration: '30 Days',
    level: 'Intermediate to Advanced',
    mode: 'Online Live',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (8:00 AM – 9:30 AM) & Afternoon (4:00 PM – 5:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Live online classes'
    },
    fee: 'Contact for current fee & junior batch schedules (NPR)',
    technologies: [
      'Scratch 3.0 Advanced',
      'Custom Procedures (My Blocks)',
      'Sprite Cloning & Particle Systems',
      'Gravity & Velocity Physics',
      'Hitbox Collision Algorithms',
      'Broadcast Message Hierarchies',
      'List Data Structures & Inventories',
      'Cloud Variables & Leaderboards',
      'Game State Machines (Menu/Play/Over)'
    ],
    targetAudience: [
      'Graduates of Scratch Beginner who want to build more complex, commercial-style arcade games.',
      'School students with basic Scratch familiarity ready to learn advanced game mechanics and physics.',
      'Young creators fascinated by game design, mechanics, animation polish, and level design.',
      'Students preparing to transition smoothly to text-based programming in Python.'
    ],
    prerequisites: [
      'Completion of Scratch Beginner or practical familiarity with loops, conditionals, and variables in Scratch.',
      'Comfortable using a mouse and keyboard.',
      'A laptop or desktop computer with a stable internet connection for live online classes.'
    ],
    outcomes: [
      'Implement realistic 2D game physics including acceleration, gravity, jumping, and momentum.',
      'Use sprite cloning efficiently to create enemy waves, projectile bullets, and particle explosions.',
      'Organize complex codebases using modular custom procedures ("My Blocks") with inputs.',
      'Manage complete game lifecycles: start menu, pause state, health meters, multi-levels, and game-over screens.',
      'Store high scores and inventory items using lists and Scratch cloud variables.'
    ],
    projects: [
      {
        title: 'Multi-Level 2D Platformer with Gravity & Jump Physics',
        technologies: ['Scratch 3.0', 'Custom Blocks', 'Physics Velocity', 'Hitboxes'],
        description: 'Complete scrolling platformer game featuring running, jumping on platforms, collecting coins, dodging hazards, and transitioning through distinct levels.',
        type: 'Platformer Game'
      },
      {
        title: 'Space Defenders Arcade Shooter with Enemy Waves & Boss Battles',
        technologies: ['Scratch 3.0', 'Cloning', 'Lists', 'Health Meters'],
        description: 'Top-down arcade shooter utilizing dynamic sprite cloning for laser bullets and enemy ships, featuring progressive difficulty and boss battle phases.',
        type: 'Arcade Shooter'
      },
      {
        title: 'Interactive Virtual Pet Simulator with State Management',
        technologies: ['Scratch 3.0', 'Lists', 'Timers', 'State Machine'],
        description: 'Digital pet game where hunger, happiness, and energy levels decrease over time, requiring players to feed, train, and interact with the pet.',
        type: 'Simulation Game'
      }
    ],
    whyChooseThis: {
      title: 'Why Scratch Advanced at Navya Ed Tech?',
      points: [
        {
          headline: 'Real Game Mechanics:',
          detail: 'Learn the exact math and physics logic behind classic 2D games: gravity, friction, collision angles, and state transitions.'
        },
        {
          headline: 'Clean Code Modularization:',
          detail: 'Master "My Blocks" to eliminate repetitive code and think like professional software engineers before touching text syntax.'
        },
        {
          headline: 'Smooth Bridge to Python:',
          detail: 'Scratch Advanced reinforces algorithmic thinking and data structures that make learning Python afterward effortless.'
        }
      ]
    },
    curriculum: [
    {
        "moduleNumber": "Module 01",
        "title": "Advanced 2D Platformer Physics & Velocity Math",
        "duration": "Week 1 (7 Days)",
        "topics": [
            "Simulating gravity with velocity variables (Y-velocity and X-velocity)",
            "Jump mechanics, momentum, and platform collision detection (hitboxes)",
            "Scrolling camera backgrounds: horizontal and vertical level panning",
            "Friction, acceleration, and smooth character deceleration",
            "Project: Core Platformer Movement Engine"
        ],
        "subLessons": [
            {
                "subNumber": "1.1",
                "title": "Gravity & Hitbox Platform Physics",
                "topics": [
                    "Y-velocity calculations",
                    "Ground touch sensing",
                    "Wall jumping mechanics",
                    "Camera scroll offset"
                ]
            }
        ],
        "practicalExercise": "Build a smooth 2D Platformer Physics Engine with realistic running, jumping, and slope climbing.",
        "expectedOutcome": "Understand game physics math: velocity, acceleration, gravity, and hitbox collision detection."
    },
    {
        "moduleNumber": "Module 02",
        "title": "Sprite Cloning, Particle Systems & Wave Spawning",
        "duration": "Week 2 (7 Days)",
        "topics": [
            "Sprite cloning: \"create clone of\", \"when I start as a clone\", and \"delete this clone\"",
            "Local vs Global variables in clones (creating unique clone health and speed)",
            "Particle effects: smoke trails, laser bullets, explosion bursts",
            "Enemy wave spawning algorithms with progressive difficulty scaling",
            "Project: Space Defenders Top-Down Shooter"
        ],
        "subLessons": [
            {
                "subNumber": "2.1",
                "title": "Clone Architecture & Particle Systems",
                "topics": [
                    "Clone life-cycles",
                    "Bullet firing systems",
                    "Enemy waves",
                    "Particle decay algorithms"
                ]
            }
        ],
        "practicalExercise": "Engineer a Top-Down Arcade Space Shooter with laser projectile cloning, enemy waves, and explosion particles.",
        "expectedOutcome": "Master sprite cloning algorithms for managing hundreds of dynamic onscreen game entities."
    },
    {
        "moduleNumber": "Module 03",
        "title": "Custom Procedures (\"My Blocks\") & List Data Structures",
        "duration": "Week 3 (8 Days)",
        "topics": [
            "Custom blocks (\"My Blocks\"): modular procedural programming with inputs and parameters",
            "\"Run without screen refresh\" for instant calculations and fast rendering",
            "List data structures: adding items, deleting, inserting, and searching arrays",
            "Building game inventories and dialogue text typing engines using lists",
            "State machines: cleanly transitioning between Main Menu, Gameplay, Pause, and Game Over"
        ],
        "subLessons": [
            {
                "subNumber": "3.1",
                "title": "Procedures, Parameters & List Arrays",
                "topics": [
                    "Custom block inputs",
                    "Screen refresh optimization",
                    "Inventory lists",
                    "Dialogue engines"
                ]
            }
        ],
        "practicalExercise": "Develop an RPG Inventory & Quest Dialogue System using custom parametric blocks and Scratch lists.",
        "expectedOutcome": "Write organized, modular code using procedures and manage game data with list collections."
    },
    {
        "moduleNumber": "Module 04",
        "title": "Cloud High Scores, Boss Battles & Capstone Defense",
        "duration": "Week 4 (8 Days)",
        "topics": [
            "Cloud variables: storing global high scores across different player sessions",
            "Designing multi-phase Boss Battles with attack patterns and health thresholds",
            "Game polish: screen shake effects, sound volume fading, and user feedback",
            "Publishing and sharing projects on the global Scratch developer community",
            "Capstone Defense: Multi-Level Arcade Platformer / Space Boss Game"
        ],
        "subLessons": [
            {
                "subNumber": "4.1",
                "title": "Boss AI, Cloud High Scores & Polish",
                "topics": [
                    "Boss state machine",
                    "Cloud leaderboards",
                    "Screen shake effect",
                    "Final game balance"
                ]
            }
        ],
        "practicalExercise": "Complete Capstone: Deliver a multi-level arcade game with boss battle mechanics, custom blocks, and high-score saves.",
        "expectedOutcome": "Deliver a published, sophisticated 2D video game with multi-phase mechanics and polished physics."
    }
],
    careerPaths: [
      'Game Design & Mechanics Pathway',
      'Direct Progression to Python Programming',
      'Advanced Robotics & STEM Competitions',
      'Algorithmic Problem Solving'
    ],
    instructor: {
      name: 'Game Physics & STEM Mentorship Council',
      role: 'Advanced Junior Track Mentors',
      experience: 'Min. 4+ years in game mechanics, creative technology & youth STEM coaching',
      specialization: 'Game Physics, Scratch Advanced, Algorithmic Thinking for Youth',
      isPlaceholder: false
    },
    faqs: [
      {
        question: 'How is Scratch Advanced different from Scratch Beginner?',
        answer: 'Scratch Advanced introduces complex math, gravity physics, cloning algorithms, list arrays, custom procedural blocks, and multi-level game mechanics that go far beyond introductory animations.'
      },
      {
        question: 'Does this course prepare students for Python?',
        answer: 'Yes! The logical patterns taught here—custom functions, parameters, data arrays, and game state loops—map directly to Python syntax, making the transition seamless.'
      }
    ],
    seoTitle: 'Scratch Advanced Game Coding for Kids (30 Days) | Online in Nepal',
    seoDescription: 'Master 2D game physics, custom blocks, and advanced Scratch coding in Nepal. Intensive 30-day course for young game creators at Navya Ed Tech.'
  }
];

export const COURSE_CATEGORIES = [
  'All',
  'Web Development',
  'Programming',
  'Data & AI',
  'Kids Coding'
] as const;

export const LEGACY_COURSE_SLUGS = new Set([
  'devops-cloud-engineering',
  'cybersecurity-fundamentals',
  'flutter-mobile-app-development',
  'python-data-science-ai',
  'mern-stack-development',
  'react-frontend-engineering',
  'ui-ux-product-design'
]);
