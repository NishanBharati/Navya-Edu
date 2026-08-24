import React, { useState } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Users,
  Award,
  BookOpen,
  Layers,
  CheckCircle2,
  Code2,
  GitBranch,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  Laptop,
  Server,
  Zap,
  TrendingUp,
  Globe,
  Briefcase,
  ChevronDown,
  ArrowRight,
  GraduationCap,
  Calendar,
  Check,
  Compass,
  HeartHandshake
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';

// Milestone Data
interface Milestone {
  year: string;
  quarter?: string;
  tag: string;
  title: string;
  description: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    year: '2022',
    quarter: 'Q2–Q4',
    tag: 'The Genesis',
    title: 'Internal Engineering Academy & Pilot Cohorts',
    description:
      'Started as an internal talent incubator inside our parent software company, Navya EdTech. Frustrated by the gap between traditional college graduates and production engineering readiness, senior engineers designed a project-first pilot for 30 students.',
    highlights: [
      'First 2 pilot cohorts completed 100-hour MERN Stack sprints',
      '88% of pilot graduates transitioned to junior developer positions in Kathmandu',
      'Established core "continuous code production" methodology'
    ]
  },
  {
    year: '2023',
    quarter: 'Q1–Q3',
    tag: 'Formal Incorporation',
    title: 'Dedicated Training Campus & Government Registration',
    description:
      'Incorporated officially as Navya Ed Tech Pvt. Ltd. Established our flagship physical learning laboratory in Kathmandu, equipped with dual-monitor developer stations, fiber backup, and dedicated mentor desks.',
    highlights: [
      'Official incorporation as a recognized IT education provider in Nepal',
      'Opened Kathmandu physical laboratory with dedicated lab power backup',
      'Expanded curriculum to include Flutter Mobile and UI/UX Design'
    ]
  },
  {
    year: '2024',
    quarter: 'Q1–Q4',
    tag: 'Cloud & AI Expansion',
    title: 'Modernizing Syllabi with DevOps, Cloud & Applied AI',
    description:
      'Recognizing industry shifts toward cloud-native architecture and artificial intelligence, we revamped all courses to integrate Docker containerization, AWS cloud workflows, and applied Generative AI tooling.',
    highlights: [
      'Launched 6-Month Full Stack Engineering Fellowship',
      'Introduced Applied AI & Machine Learning with Python and vector search',
      'Crossed 800+ cumulative students trained across physical and live online tracks'
    ]
  },
  {
    year: '2025',
    quarter: 'Q1–Q4',
    tag: 'Hiring Network Growth',
    title: '40+ Industry Placement Partnerships & Capstone Showcases',
    description:
      'Formalized hiring pipelines with leading software houses, fintech startups, and remote overseas agencies. Launched quarterly "Demo Day" events where students pitch production systems directly to hiring managers.',
    highlights: [
      'Built network of 40+ software companies hiring directly from cohorts',
      'Recorded 94.6% capstone deployment rate on live production domains',
      'Surpassed 1,450+ total developers, engineers, and designers trained'
    ]
  },
  {
    year: '2026',
    quarter: 'Present & Beyond',
    tag: 'The Future',
    title: 'Open-Source Incubation & Specialized Fellowships',
    description:
      'Expanding our footprint with open-source student labs, advanced microservices tracks, and direct international remote placement support for Nepali developers.',
    highlights: [
      'Launching Student Open Source Incubation Grants',
      'Advanced High-Scale Backend & Distributed Systems Masterclass',
      'Continuous alumni upskilling & lifetime career advisory network'
    ]
  }
];

// Faculty / Leadership Data
interface FacultyMember {
  name: string;
  role: string;
  department: string;
  experience: string;
  specialties: string[];
  bio: string;
  image: string;
}

const FACULTY: FacultyMember[] = [
  {
    name: 'Er. Anish Shrestha',
    role: 'Head of Academics & Systems Architecture',
    department: 'Full-Stack & Cloud Engineering',
    experience: '10+ Years Industry Experience',
    specialties: ['Distributed Systems', 'Node.js / Go', 'Microservices Architecture', 'PostgreSQL'],
    bio: 'Former Senior Systems Architect with a track record of building high-concurrency fintech platforms. Leads curriculum quality, architectural reviews, and capstone evaluations.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Prashant Sharma',
    role: 'Lead Full-Stack Instructor & Frontend Architect',
    department: 'Modern Web & React Ecosystem',
    experience: '8+ Years Industry Experience',
    specialties: ['React 19 & Next.js', 'TypeScript', 'State Architectures', 'Performance Optimization'],
    bio: 'Passionate frontend craftsman who has engineered enterprise web apps for international clients. Mentors students on building production-grade Next.js SaaS applications.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Kripa Adhikari',
    role: 'Data Science & Applied AI Lead',
    department: 'Machine Learning & AI Systems',
    experience: '6+ Years Industry Experience',
    specialties: ['Python & PyTorch', 'LLM Fine-Tuning', 'Vector Databases', 'MLOps Pipelines'],
    bio: 'Specialist in machine learning applications and data engineering. Guides students through building real predictive models, retrieval-augmented generation (RAG), and data APIs.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sunil Maharjan',
    role: 'Cloud Infrastructure & DevOps Mentor',
    department: 'DevOps & Platform Engineering',
    experience: '7+ Years Industry Experience',
    specialties: ['AWS Cloud Architecture', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Linux Security'],
    bio: 'AWS Certified Solutions Architect who oversees production deployments at Navya EdTech. Teaches container orchestration, infrastructure-as-code, and resilient cloud architectures.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Bandana Thapa',
    role: 'Head of UI/UX & Product Design',
    department: 'Product & Interaction Design',
    experience: '7+ Years Industry Experience',
    specialties: ['Design Systems', 'Figma Tokens', 'User Research & Testing', 'Micro-Interactions'],
    bio: 'Design systems lead who bridges the gap between visual aesthetics and developer implementation. Mentors students in building scalable, accessible component design libraries.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Rojina Prajapati',
    role: 'Admissions Director & Tech Career Coach',
    department: 'Career Services & Placement Cell',
    experience: '8+ Years Tech Recruitment',
    specialties: ['Technical Resume Auditing', 'Behavioral Interview Prep', 'Salary Negotiation', 'Employer Relations'],
    bio: 'Has connected hundreds of tech graduates with hiring managers across Nepal and overseas. Manages student portfolio reviews, mock interviews, and industry recruitment days.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80'
  }
];

// FAQ Data
interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How is Navya Ed Tech different from typical computer training centers in Nepal?',
    answer:
      'Most computer institutes rely on outdated slideshows, generic to-do apps, and instructors who teach part-time without production experience. Navya Ed Tech is the education division of Navya EdTech, an active commercial software company. Our syllabi reflect active production practices: students use Git/GitHub daily, build real multi-tenant software, containerize with Docker, deploy live to cloud domains, and receive line-by-line code reviews from working software engineers.'
  },
  {
    question: 'What is the relationship between Navya Ed Tech and Navya EdTech (navyaedtech.com)?',
    answer:
      'Navya EdTech (navyaedtech.com) is our parent technology enterprise that builds commercial software, cloud platforms, and AI applications for domestic and international clients. Navya Ed Tech Pvt. Ltd. is the dedicated IT education and workforce training division. This corporate synergy allows us to bring real client challenges, code patterns, and internship placements directly to our students.'
  },
  {
    question: 'Do I need a Computer Science or IT degree to join a program?',
    answer:
      'No. Many of our most successful alumni come from non-CS backgrounds (management, engineering, humanities, or self-taught backgrounds). What we require is dedication, problem-solving curiosity, and a willingness to commit to rigorous coding sprints. We start with fundamental software logic before advancing into complex full-stack or data architectures.'
  },
  {
    question: 'What is the format of your training (Classroom vs. Online Live)?',
    answer:
      'We offer two parallel modes: (1) Physical Classroom at our Kathmandu Innovation Lab with dual-monitor workstations and in-person mentor desks, and (2) Interactive Online Live cohorts with screen-sharing, instant code-along environments, and recorded HD session archives. Both options include the exact same syllabus, assignments, code reviews, and placement assistance.'
  },
  {
    question: 'How does career guidance and internship placement support work?',
    answer:
      'During the final 4 weeks of each track, students participate in our Career Transition Sprint: technical resume building, GitHub portfolio optimization, Mock System Design & Coding Interviews, and private Demo Days. Qualified graduates are recommended directly to our network of 40+ partner tech companies, as well as considered for internal junior engineering roles at Navya EdTech.'
  },
  {
    question: 'Are fees payable in Nepali Rupees (NPR)? Are installment plans available?',
    answer:
      'Yes, all course fees are quoted transparently in NPR (Rs.) with zero hidden registration fees or laboratory surcharges. Flexible 2-to-3 installment payment schedules are available for long-term tracks (such as the 6-Month Full Stack Engineering Fellowship).'
  }
];

export const About: React.FC = () => {
  const [activeMilestone, setActiveMilestone] = useState<number>(3); // Default to 2025
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First open by default
  const [activeLabTab, setActiveLabTab] = useState<'physical' | 'digital'>('physical');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8] text-[#171A1F]">
      <SEOHead
        title="About Navya Ed Tech | IT Education Division of Navya EdTech Nepal"
        description="Learn about Navya Ed Tech Pvt. Ltd., our engineering-first philosophy, parent software enterprise, senior faculty, Kathmandu physical laboratory, and our mission to elevate tech education in Nepal."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & STRATEGIC MISSION */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17324D]/5 border border-[#17324D]/15 text-xs font-semibold tracking-wider text-[#17324D] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#356A9A] animate-pulse" />
              <span>Navya Ed Tech Pvt. Ltd. • Established in Kathmandu, Nepal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171A1F] leading-[1.12]">
              Engineering Education Rooted in Real-World Software Production.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#5F6670] leading-relaxed max-w-3xl">
              We founded Navya Ed Tech to replace passive computer tuition with production engineering. As the education division of an active software enterprise, we mentor aspiring developers, career switchers, and university graduates to write scalable, production-grade code on Day 1.
            </p>
          </div>

          {/* Key Metrics Banner */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E8E4DA] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-[#356A9A]">
                <Users className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">1,450+</span>
              </div>
              <p className="text-xs text-[#5F6670] font-medium">Graduates & Alumni Trained</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E8E4DA] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-[#718C7A]">
                <ShieldCheck className="w-4 h-4 text-[#3D5644]" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">94.6%</span>
              </div>
              <p className="text-xs text-[#5F6670] font-medium">Live Deployed Capstones</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E8E4DA] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-[#356A9A]">
                <Building2 className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">40+</span>
              </div>
              <p className="text-xs text-[#5F6670] font-medium">Tech Hiring Partners</p>
            </div>

            <div className="p-4 sm:p-5 bg-white rounded-xl border border-[#E8E4DA] shadow-xs space-y-1">
              <div className="flex items-center gap-2 text-[#D97706]">
                <GitBranch className="w-4 h-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">1 : 12</span>
              </div>
              <p className="text-xs text-[#5F6670] font-medium">Strict Mentor-to-Student Ratio</p>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 sm:p-5 bg-[#17324D] rounded-xl border border-[#12283E] text-white space-y-1 shadow-xs">
              <div className="flex items-center gap-2 text-[#9BBAD4]">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xl sm:text-2xl font-extrabold text-white font-mono">70 / 30</span>
              </div>
              <p className="text-xs text-[#C4CDD5] font-medium">Coding vs. Theory Split</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CORPORATE INTEGRATION & PARENT COMPANY SYNERGY */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="bg-[#17324D] rounded-2xl sm:rounded-3xl text-white p-6 sm:p-10 lg:p-12 border border-[#12283E] shadow-lg relative overflow-hidden">
            {/* Background Decorative Grid */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
                backgroundSize: '24px 24px'
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-xs font-mono uppercase tracking-wider text-[#9BBAD4] border border-white/10">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Ecosystem</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                  Backed by Navya EdTech — A Commercial Software & Cloud Solutions Enterprise.
                </h2>

                <p className="text-sm sm:text-base text-[#C4CDD5] leading-relaxed">
                  Most computer institutes operate in an academic vacuum, teaching technologies that went obsolete three years ago. Navya Ed Tech operates in direct synergy with <strong className="text-white">Navya EdTech</strong> (our parent commercial software company).
                </p>

                <p className="text-sm text-[#A9B8C7] leading-relaxed">
                  Because our engineering parent builds scalable web applications, mobile platforms, enterprise cloud architectures, and AI integrations for real-world clients, our students learn from actual production codebases, live bug triage, and contemporary CI/CD workflows.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://navyaedtech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#17324D] text-xs font-bold hover:bg-[#F4F1EA] transition-colors shadow-sm"
                  >
                    <span>Visit Parent Company (navyaedtech.com)</span>
                    <ArrowUpRight className="w-4 h-4 text-[#17324D]" />
                  </a>

                  <span className="text-xs text-[#9BBAD4] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#718C7A]" />
                    <span>Direct Internship & Hiring Pipeline</span>
                  </span>
                </div>
              </div>

              {/* Right Side: Parent Company Capabilities & Live Integration */}
              <div className="lg:col-span-5 bg-white/5 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-white/15 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#9BBAD4]">
                    Parent Company Disciplines
                  </span>
                  <span className="text-[11px] font-mono text-white/60">Kathmandu, NP</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-[#E5DFD4]">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#356A9A]/30 text-[#9BBAD4] flex items-center justify-center shrink-0 mt-0.5">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Enterprise Web & Backend</strong>
                      <span className="text-[#A9B8C7] text-xs">High-throughput microservices, Next.js, Node.js, Go, PostgreSQL</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#356A9A]/30 text-[#9BBAD4] flex items-center justify-center shrink-0 mt-0.5">
                      <Laptop className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Cross-Platform Mobile Apps</strong>
                      <span className="text-[#A9B8C7] text-xs">Production Flutter & iOS/Android digital products</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#356A9A]/30 text-[#9BBAD4] flex items-center justify-center shrink-0 mt-0.5">
                      <Server className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Cloud Infrastructure & DevOps</strong>
                      <span className="text-[#A9B8C7] text-xs">AWS architecture, Docker containerization, Kubernetes & CI/CD</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-[#356A9A]/30 text-[#9BBAD4] flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Applied AI & Machine Learning</strong>
                      <span className="text-[#A9B8C7] text-xs">RAG pipelines, vector search, LLM integrations & predictive analytics</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-2 border-t border-white/10 text-[11px] text-[#9BBAD4] italic">
                  * Students in advanced tracks work on real internal software modules under direct supervision.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE GENESIS & ORIGIN STORY */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                eyebrow="Our Genesis & Philosophy"
                title="Why We Built Navya: Solving the Software Engineering Gap in Nepal."
                description="We didn't start Navya Ed Tech as a generic training franchise. We built it because we were struggling to hire competent software engineers."
              />

              <div className="space-y-4 text-sm sm:text-base text-[#5F6670] leading-relaxed">
                <p>
                  Between 2020 and 2022, while interviewing hundreds of university graduates and bootcamp certificate holders for engineering roles at our parent tech firm, we identified a consistent, frustrating reality:
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-[#F4F1EA] border border-[#E8E4DA] space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-[#171A1F]">
                    "Candidates knew the textbook definition of polymorphism, but couldn't resolve a Git merge conflict, design a normalized SQL database, handle async JavaScript errors, or deploy a Docker container to AWS."
                  </p>
                </div>

                <p>
                  The conventional education system in Nepal prioritizes rote memorization and passing exams. But software engineering is a craft of keyboard muscle memory, architectural trade-offs, reading production error logs, and writing maintainable code.
                </p>

                <p>
                  Navya Ed Tech was created to flip this paradigm on its head: <strong>70% hands-on coding, 30% architectural deep-dive</strong>, zero PowerPoint reading, and mandatory daily code critiques by senior engineers.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#E8E4DA]">
                  <CheckCircle2 className="w-5 h-5 text-[#718C7A] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-[#171A1F] block font-bold">100% Practical Rigor</strong>
                    <span className="text-[#5F6670]">Real terminals, real compilers, real Git commits every class.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#E8E4DA]">
                  <CheckCircle2 className="w-5 h-5 text-[#718C7A] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-[#171A1F] block font-bold">Verifiable Proof-of-Work</strong>
                    <span className="text-[#5F6670]">Live URLs & GitHub repos instead of hollow paper certificates.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Story Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E0DACF] shadow-lg bg-[#F4F1EA]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Navya engineering instructors conducting code review with students"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/90 via-[#17324D]/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#9BBAD4] block">
                    [OUR MISSION IN NUMBERS]
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Transforming Nepal into a Globally Respected Hub for World-Class Software Builders.
                  </h3>
                  <p className="text-xs text-[#C4CDD5]">
                    Equipping students with modern stacks, technical resilience, and international engineering standards.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#E8E4DA] shadow-md">
                <div className="w-8 h-8 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#171A1F] block">Production Standard</span>
                  <span className="text-[#5F6670] text-[10px]">OWASP & Clean Code Guidelines</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE NAVYA STANDARD (4 PEDAGOGICAL PILLARS) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Pedagogical Standard"
            title="The Four Pillars of the Navya Method"
            description="We reject rote theory and passive video watching. Every student cohort is built on these four uncompromising training standards."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] hover:border-[#17324D]/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#17324D]/10 text-[#17324D] flex items-center justify-center font-mono font-bold text-lg">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#356A9A] tracking-wider uppercase block">
                Pillar 01
              </span>
              <h3 className="text-base font-bold text-[#171A1F] leading-snug">
                Production-First Curricula
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                We do not teach obsolete frameworks or toy examples. Syllabi focus on TypeScript, modern React/Next.js, PostgreSQL, Docker, Redis queues, and cloud deployment pipelines.
              </p>
              <div className="pt-2 border-t border-[#EFECE5] text-[11px] font-semibold text-[#17324D] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#718C7A]" />
                <span>Zero legacy syntax</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] hover:border-[#17324D]/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#356A9A]/10 text-[#356A9A] flex items-center justify-center font-mono font-bold text-lg">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#356A9A] tracking-wider uppercase block">
                Pillar 02
              </span>
              <h3 className="text-base font-bold text-[#171A1F] leading-snug">
                Keyboard-On-Code Practice
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Every single session involves hands-on programming. Students build architectural muscle memory by fixing real bugs, writing unit tests, and designing database schemas from scratch.
              </p>
              <div className="pt-2 border-t border-[#EFECE5] text-[11px] font-semibold text-[#17324D] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#718C7A]" />
                <span>70% coding / 30% architecture</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] hover:border-[#17324D]/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center font-mono font-bold text-lg">
                <GitBranch className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#356A9A] tracking-wider uppercase block">
                Pillar 03
              </span>
              <h3 className="text-base font-bold text-[#171A1F] leading-snug">
                Mandatory Pull Request Reviews
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Writing code that runs is only step one. Our senior engineering instructors review every student PR line-by-line for security, variable naming, error boundaries, and design patterns.
              </p>
              <div className="pt-2 border-t border-[#EFECE5] text-[11px] font-semibold text-[#17324D] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#718C7A]" />
                <span>Line-by-line feedback on GitHub</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] hover:border-[#17324D]/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#D97706]/15 text-[#B45309] flex items-center justify-center font-mono font-bold text-lg">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#356A9A] tracking-wider uppercase block">
                Pillar 04
              </span>
              <h3 className="text-base font-bold text-[#171A1F] leading-snug">
                Verifiable Proof-of-Work
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Graduates complete 3-5 comprehensive production capstones deployed on live custom domains with clean README documentation, database schemas, and demo screencasts.
              </p>
              <div className="pt-2 border-t border-[#EFECE5] text-[11px] font-semibold text-[#17324D] flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-[#718C7A]" />
                <span>Live URLs for hiring managers</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. LEADERSHIP & SENIOR FACULTY */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Faculty & Mentors"
              title="Learn Directly from Practicing Software Architects."
              description="Our instructors are active technology leads, DevOps engineers, and UI/UX designers who build production systems every day."
            />
            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E8E4DA] text-xs font-semibold text-[#17324D]">
                <Users className="w-4 h-4 text-[#356A9A]" />
                <span>100% Industry Practitioners</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FACULTY.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top image & badge */}
                  <div className="relative h-48 bg-[#F4F1EA] overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171A1F]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#9BBAD4] block">
                        {member.department}
                      </span>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <span className="text-xs font-bold text-[#17324D] block">{member.role}</span>
                      <span className="text-[11px] font-mono text-[#718C7A] font-semibold">{member.experience}</span>
                    </div>

                    <p className="text-xs text-[#5F6670] leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Specialty tags */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block">
                        Core Tech Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.specialties.map((spec, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded bg-[#F4F1EA] text-[#17324D] text-[10px] font-mono font-medium border border-[#E5DFD4]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#FAFAF8] border-t border-[#E8E4DA] flex items-center justify-between text-[11px] text-[#5F6670]">
                  <span>Office Hours & PR Reviews</span>
                  <span className="font-semibold text-[#17324D]">Available Weekly</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. EVOLUTION & MILESTONE TIMELINE (Interactive) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#F4F1EA] border border-[#E8E4DA]">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
              Our Journey & Growth
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#171A1F]">
              From Internal Code Sprints to Nepal's Premier IT Institute.
            </h2>
            <p className="text-sm sm:text-base text-[#5F6670] leading-relaxed">
              Explore the key milestones that shaped our institution's growth, curriculum expansion, and alumni hiring network.
            </p>
          </div>

          {/* Timeline Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 border-b border-[#DCD6C9] scrollbar-none">
            {MILESTONES.map((item, idx) => {
              const isActive = activeMilestone === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveMilestone(idx)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#17324D] text-white shadow-sm'
                      : 'bg-white text-[#5F6670] hover:text-[#171A1F] border border-[#E5DFD4]'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.year}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isActive ? 'bg-white/20 text-white' : 'bg-[#F4F1EA] text-[#5F6670]'}`}>
                    {item.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Milestone Card */}
          <div className="mt-8 bg-white p-6 sm:p-8 rounded-2xl border border-[#E8E4DA] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-[#17324D]/10 text-[#17324D] text-xs font-mono font-bold">
                    {MILESTONES[activeMilestone].year} {MILESTONES[activeMilestone].quarter}
                  </span>
                  <span className="text-xs font-semibold text-[#356A9A] uppercase tracking-wider">
                    {MILESTONES[activeMilestone].tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#171A1F]">
                  {MILESTONES[activeMilestone].title}
                </h3>

                <p className="text-sm text-[#5F6670] leading-relaxed">
                  {MILESTONES[activeMilestone].description}
                </p>
              </div>

              <div className="lg:col-span-5 bg-[#FAFAF8] p-5 rounded-xl border border-[#E8E4DA] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#171A1F] block">
                  Key Achievements & Impact:
                </span>
                <ul className="space-y-2 text-xs text-[#5F6670]">
                  {MILESTONES[activeMilestone].highlights.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. TRAINING INFRASTRUCTURE & LABS (Physical & Digital) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Learning Environment"
            title="World-Class Facilities Built for Intensive Coding."
            description="Whether attending in-person at our Kathmandu Innovation Lab or joining our interactive digital cohorts, you experience an environment designed for rapid skill acquisition."
          />

          {/* Tabs for Physical Lab vs Digital Campus */}
          <div className="mt-8 flex items-center justify-center gap-3 mb-8">
            <button
              onClick={() => setActiveLabTab('physical')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeLabTab === 'physical'
                  ? 'bg-[#17324D] text-white shadow-md'
                  : 'bg-white text-[#5F6670] hover:text-[#171A1F] border border-[#E8E4DA]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Kathmandu Physical Lab</span>
            </button>

            <button
              onClick={() => setActiveLabTab('digital')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeLabTab === 'digital'
                  ? 'bg-[#17324D] text-white shadow-md'
                  : 'bg-white text-[#5F6670] hover:text-[#171A1F] border border-[#E8E4DA]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Interactive Digital Campus</span>
            </button>
          </div>

          {activeLabTab === 'physical' ? (
            <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#718C7A]/20 text-[#3D5644] text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kathmandu Innovation Lab</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F]">
                    Ergonomic Developer Workstations & Hardware Labs
                  </h3>

                  <p className="text-sm text-[#5F6670] leading-relaxed">
                    Our physical lab is designed specifically for pair programming, sprint hackathons, and mentor collaboration. Students enjoy uninterrupted power, dedicated high-speed optical fiber, and external multi-display setups.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">Dual-Monitor Stations</strong>
                      <p className="text-[11px] text-[#5F6670]">External high-res displays for simultaneous code & debugger views.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">Dual Redundant Fiber</strong>
                      <p className="text-[11px] text-[#5F6670]">Gigabit dedicated connection with automatic failover.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">Zero-Downtime Power</strong>
                      <p className="text-[11px] text-[#5F6670]">Online UPS system backed by on-premise generator backup.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">Hardware & Server Rack</strong>
                      <p className="text-[11px] text-[#5F6670]">Physical Linux server racks for hands-on networking drills.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-[#E0DACF] shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
                      alt="Navya Kathmandu Innovation Lab Workstations"
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E5DFD4] text-xs text-[#5F6670] flex items-center justify-between">
                    <span>Campus Location: Kathmandu, Nepal</span>
                    <span className="font-semibold text-[#17324D]">Open Sun–Fri: 7:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#E8E4DA] p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#356A9A]/15 text-[#356A9A] text-xs font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Interactive Remote Learning</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F]">
                    Live Interactive Sessions with Cloud Sandbox Environments
                  </h3>

                  <p className="text-sm text-[#5F6670] leading-relaxed">
                    For students attending from outside Kathmandu or working professionals requiring flexible participation, our digital campus delivers the exact same instructor interaction, live code reviews, and cohort energy.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">Live Stream + Screen Sharing</strong>
                      <p className="text-[11px] text-[#5F6670]">Real-time audio-visual connection with instant instructor terminal sharing.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">1080p HD Archive</strong>
                      <p className="text-[11px] text-[#5F6670]">Every session recorded with timestamped code checkpoints for revision.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">Cloud Dev Sandboxes</strong>
                      <p className="text-[11px] text-[#5F6670]">Pre-configured cloud database & Docker sandboxes for smooth setup.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA] space-y-1">
                      <strong className="text-xs font-bold text-[#171A1F] block">24/7 Discord Community</strong>
                      <p className="text-[11px] text-[#5F6670]">Active peer channels, bug-fix threads, and mentor office hours.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-[#E0DACF] shadow-sm">
                    <img
                      src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                      alt="Digital campus live programming and online code sprints"
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                  </div>
                  <div className="p-4 rounded-xl bg-[#F4F1EA] border border-[#E5DFD4] text-xs text-[#5F6670] flex items-center justify-between">
                    <span>Platform: Interactive Live Cohorts + LMS</span>
                    <span className="font-semibold text-[#17324D]">Lifetime Archive Access</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 8. INSTITUTIONAL VALUES & ETHICS */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Core Values"
            title="What We Stand For at Navya"
            description="Our institutional values dictate how we teach, how we mentor, and how we measure our long-term success."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171A1F]">
                1. Radical Transparency
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                We provide clear syllabi, realistic salary expectations, and straightforward NPR pricing with zero hidden fees. We never sell hollow promises or fake 100% placement guarantees.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#356A9A]/10 text-[#356A9A] flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171A1F]">
                2. Code Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                We believe good software is readable, secure, and maintainable. We teach students to write clean code, handle edge cases, and take genuine pride in their architectural decisions.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E8E4DA] space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171A1F]">
                3. Lifetime Alumni Community
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Graduation isn't the end of your relationship with Navya. Alumni retain lifelong access to guest masterclasses, career advice, job board listings, and our senior mentor network.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FREQUENTLY ASKED QUESTIONS (Accordion) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">
                Everything You Need to Know About Navya Ed Tech
              </h2>
              <p className="text-sm text-[#5F6670]">
                Have questions about our background, teaching model, parent company, or placement support?
              </p>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-[#E8E4DA] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#171A1F] hover:text-[#356A9A] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#5F6670] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#17324D]' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5F6670] leading-relaxed border-t border-[#F4F1EA]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. CAMPUS VISIT & ACTION CTA */}
        {/* ========================================================================= */}
        <section className="bg-[#17324D] rounded-3xl text-white p-8 sm:p-12 lg:p-16 border border-[#12283E] shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider text-[#9BBAD4]">
              <Sparkles className="w-3.5 h-3.5 text-[#9BBAD4]" />
              <span>Take the Next Step</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Accelerate Your Software Engineering Career?
            </h2>

            <p className="text-sm sm:text-base text-[#C4CDD5] leading-relaxed">
              Schedule a personalized academic counseling session or visit our Kathmandu Innovation Lab to review our syllabus modules, meet our mentors, and inspect our student capstone projects in person.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                href="/contact"
                rightIcon={<ArrowRight className="w-4 h-4 text-[#17324D]" />}
              >
                Schedule a Campus Visit & Counseling
              </Button>
              <Button
                variant="outline"
                size="lg"
                href="/courses"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Browse Course Catalog
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#9BBAD4] border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#718C7A]" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#718C7A]" />
                <span>Sun – Fri: 7:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#718C7A]" />
                <span>Registered IT Education Provider</span>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};
