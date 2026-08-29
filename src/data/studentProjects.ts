import { StudentProject } from '../types';

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'project-ecommerce-storefront',
    title: 'HimalStore: Modern E-Commerce Storefront & Cart',
    category: 'Web Development',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript ES6+', 'REST APIs', 'Vercel'],
    description: 'A responsive e-commerce web application engineered during the Web Development course. Features dynamic product filtering, price sorting, interactive shopping cart with local state synchronization, and mock checkout flow.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Web Development Capstone Project',
    highlights: [
      'Modular, reusable UI patterns built with vanilla JavaScript ES6+',
      'Responsive mobile-first layout with modern Tailwind CSS utilities',
      'Deployed to production on Vercel with automated GitHub sync'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-kanban-taskflow',
    title: 'TaskFlow: Interactive Real-Time Kanban Board',
    category: 'Web Development',
    technologies: ['JavaScript ES6+', 'CSS Grid', 'REST APIs', 'Vercel'],
    description: 'A project management dashboard designed to streamline agile team workflows. Users can create, edit, tag, and re-order tasks across custom sprint stages with persistent local storage and dynamic theme controls.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Web Development Intermediate Project',
    highlights: [
      'Drag-and-drop state handling and optimistic UI updates',
      'Accessible keyboard navigation and dark/light color palette',
      'Connected to live mock REST API endpoints for seamless data flow'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-agro-price-prediction',
    title: 'KrishiForecast: Vegetable Price Trend Predictor (Kalimati Market)',
    category: 'Data Science',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    description: 'A data science system trained on historical daily price datasets from the Kalimati vegetable market. Cleans time-series data, analyzes seasonal volatility indices, and builds regression models to forecast agricultural staple prices.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Data Science Capstone Project',
    highlights: [
      'Rigorous time-series data cleaning and outlier imputation in Pandas',
      'Random Forest regression model with 88% directional accuracy',
      'Interactive statistical charts and price trend distribution plots'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-nepal-housing-valuation',
    title: 'NepalGhar: Housing Valuation & Real Estate Analytics',
    category: 'Data Science',
    technologies: ['Python', 'Pandas', 'Scikit-Learn', 'Seaborn', 'SQL'],
    description: 'A predictive real estate analytics pipeline analyzing Kathmandu housing metrics (square footage, road access, location zones). Implements feature scaling, multi-variable linear regression, and model evaluation metrics.',
    image: 'https://images.unsplash.com/photo-1557404763-69708cd8b9ce?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Data Science Machine Learning Project',
    highlights: [
      'Comprehensive correlation matrix and feature importance ranking',
      'K-Fold cross-validation and RMSE error metric scoring',
      'Structured data pipeline from raw CSV ingestion to prediction report'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-finance-tracker-cli',
    title: 'FinTrack: Automated Personal Expense & Analytics CLI',
    category: 'Python Engineering',
    technologies: ['Python 3.12', 'OOP', 'JSON / CSV', 'CLI', 'Git'],
    description: 'A modular command-line application designed in Python Beginner. Parses multi-month expense records, performs categorical breakdown, calculates monthly savings rates, and exports formatted financial audit summaries.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Python Beginner Capstone Project',
    highlights: [
      'Object-oriented architecture with clean, reusable domain models',
      'Robust error handling for corrupt file records and malformed JSON',
      'CLI interface with interactive terminal prompt workflows'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-fastapi-microservice',
    title: 'FastScrape: Asynchronous Ingestion & Microservice Engine',
    category: 'Python Engineering',
    technologies: ['Python', 'FastAPI', 'AsyncIO', 'SQLAlchemy', 'Pydantic'],
    description: 'Built during Python Advance to demonstrate high-throughput concurrency. Uses AsyncIO and AIOHTTP to scrape, validate, and persist tech listings into a relational database exposed via authenticated REST endpoints.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Python Advance Engineering Project',
    highlights: [
      'Non-blocking asynchronous I/O ingestion engine handling 100+ concurrent requests',
      'Pydantic schema validation and automatic OpenAPI documentation',
      'SQLAlchemy ORM models with connection pooling and query optimization'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-scratch-space-defenders',
    title: 'Space Defenders: Multi-Level 2D Arcade Physics Platformer',
    category: 'Kids Coding',
    technologies: ['Scratch 3.0', 'Velocity Physics', 'Sprite Clones', 'Collision Math'],
    description: 'An arcade platformer game created in Scratch Advanced by young coders. Features jumping gravity physics, multi-wave enemy clone spawning, projectile collisions, dynamic score counters, and progressive boss battles.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Scratch Advanced Capstone Project',
    highlights: [
      'Custom velocity physics blocks simulating realistic jump gravity',
      'Algorithmic enemy spawn waves using sprite cloning',
      'Interactive sound effects, boss battle phases, and high-score saves'
    ],
    isPlaceholder: false
  }
];
