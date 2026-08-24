export type CourseCategory = 
  | 'All'
  | 'Development'
  | 'Data & AI'
  | 'Design'
  | 'Cloud & DevOps'
  | 'Cybersecurity'
  | 'Digital Skills';

export interface ProjectExample {
  title: string;
  technologies: string[];
  description: string;
  type?: string;
}

export interface CurriculumModule {
  moduleNumber: string;
  title: string;
  duration?: string;
  topics: string[];
  practicalExercise: string;
  expectedOutcome: string;
}

export interface InstructorProfile {
  name: string;
  role: string;
  experience: string;
  specialization: string;
  bio?: string;
  isPlaceholder?: boolean;
  avatarUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  shortDescription: string;
  description: string;
  heroImage: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels' | 'Beginner to Intermediate' | 'Intermediate to Advanced';
  mode: 'Classroom / In-Person' | 'Online Live' | 'Hybrid (Classroom & Online)';
  upcomingBatch: {
    startDate: string;
    classDays: string;
    classTime: string;
    seatsStatus: string;
    location: string;
  };
  fee: string; // e.g., "Contact for current fee" or specific NPR value
  technologies: string[];
  targetAudience: string[];
  prerequisites: string[];
  outcomes: string[];
  projects: ProjectExample[];
  curriculum: CurriculumModule[];
  careerPaths: string[];
  instructor: InstructorProfile;
  faqs: FAQItem[];
  featured?: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: 'Career Programs' | 'Professional Programs' | 'Short Courses' | 'Internship Programs';
  tagline: string;
  description: string;
  duration: string;
  format: string;
  whoItsFor: string[];
  whatItIncludes: string[];
  expectedOutcome: string[];
  coursesIncluded?: string[];
  eligibility: string;
}

export interface StudentProject {
  id: string;
  title: string;
  category: 'Web' | 'Mobile' | 'AI' | 'UI/UX' | 'Data';
  technologies: string[];
  description: string;
  image: string;
  completionContext: string;
  highlights: string[];
  isPlaceholder?: boolean;
}

export interface InsightArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Technology' | 'Career' | 'Web Development' | 'AI' | 'Programming' | 'Digital Skills' | 'Nepal IT Industry';
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  coverImage: string;
  content: string[];
  tags: string[];
}

export interface CourseInquiryForm {
  fullName: string;
  email: string;
  phone: string;
  interestedCourse: string;
  preferredMode: string;
  experienceLevel: string;
  message: string;
}

export type InquiryStatus = 'New' | 'Contacted' | 'Enrolled' | 'Closed';

export interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  interestedCourse: string;
  preferredMode: string;
  message: string;
  status: InquiryStatus;
  source: string;
  createdAt: string;
  notes?: string;
}
