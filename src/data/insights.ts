import { InsightArticle } from '../types';

export const INSIGHTS: InsightArticle[] = [
  {
    id: 'it-career-transition-nepal-guide',
    slug: 'navigating-modern-software-engineering-careers-in-nepal',
    title: 'Navigating Modern Software Engineering Careers in Nepal: Skills, Portfolios & Industry Demands',
    excerpt: 'An objective analysis of how the IT hiring landscape in Kathmandu and remote tech companies has shifted from memorizing syntax to evaluating architecture, Git hygiene, and end-to-end project execution.',
    category: 'Nepal IT Industry',
    date: 'August 2026',
    readTime: '6 min read',
    author: {
      name: 'Engineering Advisory Group',
      role: 'Navya EdTech Practitioners'
    },
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['Career', 'Hiring', 'Software Engineering', 'Nepal Tech'],
    content: [
      'The technology employment landscape in Nepal is undergoing a profound evolution. While early industry roles prioritized basic scripting or static website templating, modern product studios and offshore development centers look for candidates who can think in systems, collaborate using Git, and understand deployment mechanics.',
      'One of the most frequent gaps our engineering leads observe in fresh university graduates is the separation between theoretical syllabus concepts and practical product engineering. Knowing what an array is does not automatically translate into understanding how to handle asynchronous data fetching without crashing an interface.',
      'To build a competitive profile in 2026, engineers need three core pillars: clean architectural fundamentals (such as TypeScript and modular design), practical database fluency with indexing and security in mind, and demonstrated proof of work through verified live projects.'
    ]
  },
  {
    id: 'why-project-based-learning-beats-video-tutorials',
    slug: 'why-project-based-learning-outperforms-passive-tutorials',
    title: 'The "Tutorial Trap" in Programming: Why Building Under Constraint Drives Real Competency',
    excerpt: 'Why watching hours of coding tutorials rarely produces job-ready developers, and how deliberate practice with code reviews builds true problem-solving resilience.',
    category: 'Programming',
    date: 'July 2026',
    readTime: '5 min read',
    author: {
      name: 'Technical Education Team',
      role: 'Navya Ed Tech'
    },
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    tags: ['Learning Methodology', 'Code Reviews', 'Productivity'],
    content: [
      'Passive video consumption creates an illusion of competence. When following a tutorial video step-by-step, the instructor has already solved the architectural dilemmas, handled the edge cases, and cleaned up the bugs off-camera.',
      'Real engineering competence begins the moment your build fails and you must inspect stack traces, consult official documentation, and formulate hypotheses to resolve the bug.',
      'At Navya Ed Tech, we structure all coursework around guided project sprints with mandatory code critiques. When students learn to defend their schema choices and refactor their own code, their retention and debugging speed increase drastically.'
    ]
  },
  {
    id: 'typescript-in-production-react-workflows',
    slug: 'why-typescript-is-essential-for-modern-web-development',
    title: 'Why TypeScript Has Become Non-Negotiable in Production Web Teams',
    excerpt: 'Exploring how static typing prevents entire classes of runtime defects, improves IDE developer experience, and enables fearless refactoring in growing codebases.',
    category: 'Web Development',
    date: 'June 2026',
    readTime: '7 min read',
    author: {
      name: 'Frontend Engineering Guild',
      role: 'Navya EdTech'
    },
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: ['TypeScript', 'React', 'Frontend', 'Best Practices'],
    content: [
      'As web applications grow in complexity, dynamic typing in pure JavaScript often leads to silent runtime errors, difficult refactorings, and undocumented API contracts between teams.',
      'TypeScript solves these challenges by providing compile-time type checking, self-documenting data interfaces, and instant auto-completion in modern code editors.',
      'In our MERN and React courses, TypeScript is taught alongside core syntax so students build muscle memory with types, interfaces, generics, and strict linting from day one.'
    ]
  }
];
