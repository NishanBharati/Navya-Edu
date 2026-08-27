import { StudentProject } from '../types';

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'project-nepal-remittance-dashboard',
    title: 'RemitFlow: Cross-Border Remittance & Settlement Portal',
    category: 'Web',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    description: 'A full-stack banking prototype built by students during the MERN Stack Capstone. Features live currency conversion rate calculators, multi-step KYC verification simulation, transaction audit logs, and role-based permissions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    completionContext: 'MERN Stack Web Development Capstone Project',
    highlights: [
      'JWT Authentication with refresh token rotation',
      'Complex aggregation pipelines for financial transaction reconciliation',
      'Responsive design with light/dark accessibility modes'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-hospital-queue-management',
    title: 'CareQueue: OPD Appointment & Real-Time Queue Tracker',
    category: 'Web',
    technologies: ['React', 'Node.js', 'Socket.io', 'Express', 'PostgreSQL'],
    description: 'Designed to solve crowding in local Kathmandu hospitals. Patients receive live queue position updates on mobile web while clinic receptionists manage dynamic slot allocations through an administrative dashboard.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Full Stack Engineering Capstone',
    highlights: [
      'WebSocket bi-directional real-time queue streaming',
      'SMS notification dispatch integration simulation',
      'Role-based doctor, receptionist, and patient portals'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-agro-price-prediction',
    title: 'KrishiForecast: Vegetable Price Trend Predictor (Kalimati Market)',
    category: 'Data',
    technologies: ['Python', 'Pandas', 'Scikit-Learn', 'FastAPI', 'Matplotlib'],
    description: 'A machine learning system trained on historical daily price datasets from the Kalimati vegetable market. Predicts price fluctuations for 30+ staples based on seasonal indices and rainfall patterns.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Python & Data Science Capstone Project',
    highlights: [
      'Rigorous time-series cleaning and outlier normalization',
      'Random Forest regression model with 88% directional accuracy',
      'FastAPI REST endpoint serving real-time inferences'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-eco-ride-nepal',
    title: 'SajhaYatri: Electric Microbus Ride Booker & Route Tracker',
    category: 'Mobile',
    technologies: ['Flutter', 'Dart', 'Bloc', 'Google Maps SDK', 'Firebase'],
    description: 'A mobile application prototype for tracking and pre-booking electric public transit routes in the Kathmandu valley. Features live GPS map simulation and digital ticket QR codes.',
    image: 'https://images.unsplash.com/photo-1557404763-69708cd8b9ce?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Flutter Mobile App Development Project',
    highlights: [
      'Bloc state management with strict unidirectional data flow',
      'Smooth 60fps route rendering with vector map overlays',
      'Offline-first ticket storage with local SQLite database'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-freelancer-tax-saas-ux',
    title: 'LekhaPro: Digital Tax Filing UX for Remote Tech Workers',
    category: 'UI/UX',
    technologies: ['Figma', 'User Research', 'Design Systems', 'Prototyping'],
    description: 'A comprehensive UX case study addressing the friction Nepali remote software developers face when filing self-employed tax declarations and foreign remittance invoices.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    completionContext: 'UI/UX Digital Product Design Track',
    highlights: [
      '12 moderated user interviews with freelance engineers in Nepal',
      '80+ screen interactive Figma prototype with WCAG AA compliance',
      'Comprehensive design token specification for developer handoff'
    ],
    isPlaceholder: false
  },
  {
    id: 'project-ai-legal-summarizer',
    title: 'NyayaSutra: Legal Document Analysis & Clause Search Engine',
    category: 'AI',
    technologies: ['Python', 'FastAPI', 'Vector Embeddings', 'React'],
    description: 'An AI-assisted document parser that ingests legal contracts, extracts key liability clauses, and provides semantic search over hundreds of pages of documentation.',
    image: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    completionContext: 'Applied AI & Python Project Showcase',
    highlights: [
      'High-speed vector chunking and similarity scoring',
      'Context-grounded summarization preventing hallucinations',
      'Clean search UI with cited source highlighting'
    ],
    isPlaceholder: false
  }
];
