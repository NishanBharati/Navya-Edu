import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'python-beginner',
    slug: 'python-beginner',
    title: 'Python Beginner',
    category: 'Programming',
    shortDescription: 'Master the fundamentals of Python programming from scratch with hands-on exercises, logical problem-solving, and foundational scripts.',
    description: 'A structured, beginner-friendly immersion into modern Python programming. Designed for complete beginners, school and college students, and professionals with zero prior coding experience. You will understand programming fundamentals, data types, control flow, functions, modular architecture, file handling, and basic object-oriented principles while building functional command-line applications and practical automation scripts.',
    heroImage: '/images/courses/python-beginner.jpg',
    duration: '40 Days',
    level: 'Beginner',
    mode: 'Classroom / In-Person',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 8:30 AM) & Evening (5:00 PM – 6:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
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
      'A personal laptop for hands-on classroom lab sessions and code exercises.',
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
          headline: 'Hands-On Mentorship in Kathmandu:',
          detail: 'Learn in small cohorts with instructor guidance, dedicated lab hours, and line-by-line code reviews at Navya Ed Tech.'
        }
      ]
    },
    curriculum: [],
    careerPaths: [
      'Junior Python Programmer',
      'Automation Script Developer',
      'Technical Support Specialist',
      'Foundation for Data Science & AI',
      'Foundation for Backend Development'
    ],
    instructor: {
      name: 'Senior Python Specialist',
      role: 'Lead Python Instructor',
      experience: '6+ years in Python engineering and technical training',
      specialization: 'Python Core, Automation, Logic Building, Algorithm Design',
      isPlaceholder: true
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
    seoTitle: 'Python Beginner Course in Nepal (40 Days) | Learn Python Kathmandu',
    seoDescription: 'Start your coding journey with our 40-day Python Beginner course in Kathmandu at Navya Ed Tech. Hands-on coding, practical projects, and personalized mentorship.'
  },
  {
    id: 'python-advance',
    slug: 'python-advance',
    title: 'Python Advance',
    category: 'Programming',
    shortDescription: 'Elevate your Python skills to production-grade engineering with asynchronous concurrency, design patterns, metaclasses, and backend API microservices.',
    description: 'An intensive, advanced software engineering track tailored for developers with Python foundations who want to build high-performance, robust, and scalable systems. Dive deep into internal Python object models, dunder protocols, asynchronous I/O with AsyncIO, concurrency with multiprocessing, decorators, context managers, clean architecture patterns, and production deployment.',
    heroImage: '/images/courses/python-advance.jpg',
    duration: '40 Days',
    level: 'Advanced',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 8:30 AM) & Evening (5:30 PM – 7:00 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
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
    curriculum: [],
    careerPaths: [
      'Senior Python Developer',
      'Backend Software Engineer',
      'API & Microservices Engineer',
      'Data Infrastructure Engineer',
      'Python Automation Architect'
    ],
    instructor: {
      name: 'Principal Systems Architect',
      role: 'Advanced Python Track Lead',
      experience: '8+ years building high-concurrency microservices and Python architectures',
      specialization: 'AsyncIO, Distributed Systems, FastAPI, Clean Architecture',
      isPlaceholder: true
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
    seoTitle: 'Python Advance Course in Nepal (40 Days) | Advanced Python Kathmandu',
    seoDescription: 'Master advanced Python in Kathmandu. Learn AsyncIO, design patterns, FastAPI, and scalable system engineering in our intensive 40-day course at Navya Ed Tech.'
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    category: 'Web Development',
    shortDescription: 'Build modern responsive websites and interactive web applications using HTML5, CSS3, modern JavaScript ES6+, and backend API integration.',
    description: 'A practical, industry-aligned web development program covering the complete journey of modern web craftsmanship. Starting with semantic HTML5 and responsive modern CSS layouts (Flexbox & Grid), and culminating in modern JavaScript ES6+ application logic, dynamic DOM interfaces, and connecting to RESTful APIs.',
    heroImage: '/images/courses/web-development.jpg',
    duration: '45 Days',
    level: 'Beginner to Intermediate',
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
      'A personal laptop for development labs and coding assignments.'
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
          headline: 'Live Deployed Portfolio:',
          detail: 'Every student graduates with 3+ live web applications deployed on Vercel with clean GitHub repositories to showcase to employers.'
        },
        {
          headline: 'Daily Hands-On Sprints:',
          detail: 'Learn by coding every single day in our Kathmandu computer labs with direct instructor guidance and support.'
        }
      ]
    },
    curriculum: [],
    careerPaths: [
      'Junior Frontend Developer',
      'Web Developer',
      'JavaScript Developer',
      'UI/Web Engineer',
      'Freelance Web Specialist'
    ],
    instructor: {
      name: 'Senior Frontend Architect',
      role: 'Web Development Faculty Lead',
      experience: '7+ years engineering web applications with modern JavaScript',
      specialization: 'Modern Frontend Architecture, JavaScript ES6+, Tailwind CSS, Responsive Design',
      isPlaceholder: true
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
    seoTitle: 'Web Development Course in Nepal (45 Days) | Learn Web Design Kathmandu',
    seoDescription: 'Master web development in Nepal with Navya Ed Tech. Learn HTML5, CSS3, JavaScript, and Git in our 45-day hands-on course in Kathmandu.'
  },
  {
    id: 'scratch-beginner',
    slug: 'scratch-beginner',
    title: 'Scratch Beginner',
    category: 'Kids Coding',
    shortDescription: 'An exciting, playful introduction to computational thinking, animation, and storytelling using visual block-based programming for young learners.',
    description: 'A fun and engaging program designed specifically for school students and young beginners to cultivate problem-solving, creativity, and computational thinking. Students learn core computer science concepts—such as sequences, loops, conditionals, events, and variables—through interactive animations, musical instruments, and simple arcade games created in Scratch 3.0.',
    heroImage: '/images/courses/scratch-beginner.jpg',
    duration: '30 Days',
    level: 'Beginner',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (8:00 AM – 9:30 AM) & Afternoon (4:00 PM – 5:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
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
          detail: 'Our Kathmandu classroom provides guided, patient mentorship tailored specifically for young learners and junior cohorts.'
        }
      ]
    },
    curriculum: [],
    careerPaths: [
      'Foundation for Scratch Advanced',
      'Foundation for Python Programming',
      'STEM & Robotics Readiness',
      'Creative Digital Arts & Game Design'
    ],
    instructor: {
      name: 'Junior STEM & Coding Educator',
      role: 'Creative Coding Lead',
      experience: '5+ years specializing in K-12 STEM pedagogy and Scratch education',
      specialization: 'Scratch 3.0, Computational Thinking, Game-Based Learning',
      isPlaceholder: true
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
    seoTitle: 'Scratch Beginner Coding Course for Kids (30 Days) | Nepal Kathmandu',
    seoDescription: 'Introduce your child to coding with our 30-day Scratch Beginner course in Kathmandu at Navya Ed Tech. Fun, visual, creative game development for kids.'
  },
  {
    id: 'scratch-advanced',
    slug: 'scratch-advanced',
    title: 'Scratch Advanced',
    category: 'Kids Coding',
    shortDescription: 'Take block coding to the next level with multi-level 2D games, physics simulations, custom blocks, cloning, and game state mechanics.',
    description: 'A project-heavy advanced Scratch track for students who have mastered basic block coding and want to engineer sophisticated 2D games and simulations. Students explore gravity and jump physics, collision detection algorithms, cloning for particle effects, custom procedural blocks ("My Blocks"), broadcast messaging hierarchies, and cloud variable high-score leaderboards.',
    heroImage: '/images/courses/scratch-advanced.jpg',
    duration: '30 Days',
    level: 'Intermediate to Advanced',
    mode: 'Classroom / In-Person',
    featured: false,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (8:00 AM – 9:30 AM) & Afternoon (4:00 PM – 5:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
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
      'A personal laptop for class coding labs.'
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
    curriculum: [],
    careerPaths: [
      'Game Design & Mechanics Pathway',
      'Direct Progression to Python Programming',
      'Advanced Robotics & STEM Competitions',
      'Algorithmic Problem Solving'
    ],
    instructor: {
      name: 'Game Development & STEM Mentor',
      role: 'Advanced Junior Track Lead',
      experience: '6+ years in game mechanics, creative technology, and youth STEM coaching',
      specialization: 'Game Physics, Scratch Advanced, Algorithmic Thinking for Youth',
      isPlaceholder: true
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
    seoTitle: 'Scratch Advanced Game Coding for Kids (30 Days) | Nepal Kathmandu',
    seoDescription: 'Master 2D game physics, custom blocks, and advanced Scratch coding in Nepal. Intensive 30-day course for young game creators at Navya Ed Tech.'
  },
  {
    id: 'data-science',
    slug: 'data-science',
    title: 'Data Science',
    category: 'Data & AI',
    shortDescription: 'Extract actionable insights from raw data using Python, Pandas, statistical modeling, exploratory data analysis, and machine learning pipelines.',
    description: 'A rigorous, industry-relevant curriculum designed to transform learners into competent data practitioners. Master data wrangling, cleaning, exploratory data analysis (EDA), statistical inference, data visualization with Seaborn and Matplotlib, SQL database querying, and predictive modeling using Scikit-Learn machine learning algorithms.',
    heroImage: '/images/courses/data-science.jpg',
    duration: '50 Days',
    level: 'Intermediate to Advanced',
    mode: 'Classroom / In-Person',
    featured: true,
    upcomingBatch: {
      startDate: 'Next batch starting soon [Inquire for exact schedule]',
      classDays: 'Sunday – Friday (6 Days/Week)',
      classTime: 'Morning (7:00 AM – 9:00 AM) & Evening (5:30 PM – 7:30 PM)',
      seatsStatus: 'Admissions Open',
      location: 'Kathmandu Campus / Online Live'
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
          detail: 'Learn directly from experienced data practitioners in Kathmandu with 1-on-1 code reviews and project defense sessions.'
        }
      ]
    },
    curriculum: [],
    careerPaths: [
      'Data Scientist',
      'Data Analyst',
      'Business Intelligence (BI) Analyst',
      'Machine Learning Associate',
      'Quantitative Analytics Specialist'
    ],
    instructor: {
      name: 'Lead Data Scientist & ML Researcher',
      role: 'Data Science Faculty Lead',
      experience: '7+ years in enterprise predictive modeling, big data pipelines, and analytics',
      specialization: 'Pandas, Scikit-Learn, Feature Engineering, Machine Learning, Statistical Inference',
      isPlaceholder: true
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
    seoTitle: 'Data Science Course in Nepal (50 Days) | Python & ML Training Kathmandu',
    seoDescription: 'Master Data Science in Kathmandu with Navya Ed Tech. Learn Python, Pandas, SQL, and Machine Learning with real-world datasets in our 50-day intensive course.'
  }
];

export const COURSE_CATEGORIES = [
  'All',
  'Programming',
  'Web Development',
  'Kids Coding',
  'Data & AI'
] as const;

export const LEGACY_COURSE_SLUGS = new Set([
  'mern-stack-development',
  'ui-ux-product-design',
  'react-frontend-engineering',
  'devops-cloud-engineering',
  'cybersecurity-fundamentals',
  'flutter-mobile-app-development',
  'python-data-science-ai'
]);
