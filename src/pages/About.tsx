import React, { useState } from 'react';
import {
  ArrowUpRight,
  ShieldCheck,
  Terminal,
  Cpu,
  Users,
  Award,
  CheckCircle2,
  Code2,
  GitBranch,
  Building2,
  MapPin,
  Clock,
  Sparkles,
  Laptop,
  Server,
  Globe,
  ArrowRight,
  Check,
  Compass,
  HeartHandshake
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { FAQAccordion } from '../components/common/FAQAccordion';
import type { FAQItem } from '../types';

// Faculty / Leadership Data
interface FacultyMember {
  name: string;
  initials: string;
  monogramColor: string;
  role: string;
  department: string;
  experience: string;
  specialties: string[];
  bio: string;
}

const FACULTY: FacultyMember[] = [
  {
    name: 'Er. Anish Shrestha',
    initials: 'AS',
    monogramColor: 'from-navy to-[#0E1F30]',
    role: 'Head of Academics & Systems Architecture',
    department: 'Full-Stack & Cloud Engineering',
    experience: '10+ Years Industry Experience',
    specialties: ['Distributed Systems', 'Node.js / Go', 'Microservices Architecture', 'PostgreSQL'],
    bio: 'Former Senior Systems Architect with a track record of building high-concurrency fintech platforms. Leads curriculum quality, architectural reviews, and capstone evaluations.'
  },
  {
    name: 'Prashant Sharma',
    initials: 'PS',
    monogramColor: 'from-blue to-[#1F4468]',
    role: 'Lead Full-Stack Instructor & Frontend Architect',
    department: 'Modern Web & React Ecosystem',
    experience: '8+ Years Industry Experience',
    specialties: ['React 19 & Next.js', 'TypeScript', 'State Architectures', 'Performance Optimization'],
    bio: 'Passionate frontend craftsman who has engineered enterprise web apps for international clients. Mentors students on building production-grade Next.js SaaS applications.'
  },
  {
    name: 'Kripa Adhikari',
    initials: 'KA',
    monogramColor: 'from-sage-ink to-[#263A2E]',
    role: 'Data Science & Applied AI Lead',
    department: 'Machine Learning & AI Systems',
    experience: '6+ Years Industry Experience',
    specialties: ['Python & PyTorch', 'LLM Fine-Tuning', 'Vector Databases', 'MLOps Pipelines'],
    bio: 'Specialist in machine learning applications and data engineering. Guides students through building real predictive models, retrieval-augmented generation (RAG), and data APIs.'
  },
  {
    name: 'Sunil Maharjan',
    initials: 'SM',
    monogramColor: 'from-navy to-[#0E1F30]',
    role: 'Cloud Infrastructure & DevOps Mentor',
    department: 'DevOps & Platform Engineering',
    experience: '7+ Years Industry Experience',
    specialties: ['AWS Cloud Architecture', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Linux Security'],
    bio: 'AWS Certified Solutions Architect who oversees production deployments at Navya EdTech. Teaches container orchestration, infrastructure-as-code, and resilient cloud architectures.'
  },
  {
    name: 'Bandana Thapa',
    initials: 'BT',
    monogramColor: 'from-blue to-[#1F4468]',
    role: 'Head of UI/UX & Product Design',
    department: 'Product & Interaction Design',
    experience: '7+ Years Industry Experience',
    specialties: ['Design Systems', 'Figma Tokens', 'User Research & Testing', 'Micro-Interactions'],
    bio: 'Design systems lead who bridges the gap between visual aesthetics and developer implementation. Mentors students in building scalable, accessible component design libraries.'
  },
  {
    name: 'Rojina Prajapati',
    initials: 'RP',
    monogramColor: 'from-sage-ink to-[#263A2E]',
    role: 'Admissions Director & Tech Career Coach',
    department: 'Career Services & Placement Cell',
    experience: '8+ Years Tech Recruitment',
    specialties: ['Technical Resume Auditing', 'Behavioral Interview Prep', 'Salary Negotiation', 'Employer Relations'],
    bio: 'Has connected hundreds of tech graduates with hiring managers across Nepal and overseas. Manages student portfolio reviews, mock interviews, and industry recruitment days.'
  }
];

// FAQ Data
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
      'During the final 4 weeks of each track, students participate in our Career Transition Sprint: technical resume building, GitHub portfolio optimization, Mock System Design & Coding Interviews, and private Demo Days. Qualified graduates are recommended directly to our growing network of partner tech companies, as well as considered for internal junior engineering roles at Navya EdTech.'
  },
  {
    question: 'Are fees payable in Nepali Rupees (NPR)? Are installment plans available?',
    answer:
      'Yes, all course fees are quoted transparently in NPR (Rs.) with zero hidden registration fees or laboratory surcharges. Flexible 2-to-3 installment payment schedules are available for long-term tracks (such as the 6-Month Full Stack Engineering Fellowship).'
  }
];

export const About: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'physical' | 'digital'>('physical');

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="About Navya Ed Tech | IT Education Division of Navya EdTech Nepal"
        description="Learn about Navya Ed Tech Pvt. Ltd., our engineering-first philosophy, parent software enterprise, senior faculty, Kathmandu physical laboratory, and our mission to elevate tech education in Nepal."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & STRATEGIC MISSION */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span>About Navya Ed Tech • Kathmandu Innovation Center</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]">
                Engineering Education Rooted in Real-World Software Production.
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                We founded Navya Ed Tech to replace passive computer tuition with production engineering. As the education division of an active commercial software company, we mentor aspiring developers, career switchers, and university graduates to write scalable, production-grade code on Day 1.
              </p>
            </div>

            {/* Quick Strategic Pillars */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <strong className="text-sm font-bold text-navy block">Industry Backed</strong>
                <span className="text-ink-soft">Direct synergy with parent software engineering firm</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <strong className="text-sm font-bold text-sage-ink block">1:12 Mentorship</strong>
                <span className="text-ink-soft">Small cohort attention & daily Git code audits</span>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <strong className="text-sm font-bold text-blue block">100% Deployed</strong>
                <span className="text-ink-soft">Live cloud apps and production capstone portfolios</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition with Generated Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-navy/20 via-blue/15 to-sage/20 rounded-3xl blur-xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
                <img
                  src="/images/heroes/about-hero.jpg"
                  alt="Navya EdTech software development innovation laboratory in Kathmandu"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span>Navya EdTech Headquarters</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Corporate Technology Lab</p>
                    <p className="text-[11px] text-ink-soft">Kathmandu Innovation Hub</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Kathmandu, NP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CORPORATE INTEGRATION & PARENT COMPANY SYNERGY */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="bg-navy rounded-2xl sm:rounded-3xl text-white p-6 sm:p-10 lg:p-12 border border-navy-deep shadow-lg relative overflow-hidden">
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-xs font-mono uppercase tracking-wider text-navy-mist border border-white/10">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Ecosystem</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                  Backed by Navya EdTech — A Commercial Software & Cloud Solutions Enterprise.
                </h2>

                <p className="text-sm sm:text-base text-mist leading-relaxed">
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-navy text-xs font-bold hover:bg-paper-alt transition-colors shadow-sm"
                  >
                    <span>Visit Parent Company (navyaedtech.com)</span>
                    <ArrowUpRight className="w-4 h-4 text-navy" />
                  </a>

                  <span className="text-xs text-navy-mist flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sage" />
                    <span>Direct Internship & Hiring Pipeline</span>
                  </span>
                </div>
              </div>

              {/* Right Side: Parent Company Capabilities & Live Integration */}
              <div className="lg:col-span-5 bg-white/5 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-white/15 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-mist">
                    Parent Company Disciplines
                  </span>
                  <span className="text-[11px] font-mono text-white/60">Kathmandu, NP</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-border-warm">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Enterprise Web & Backend</strong>
                      <span className="text-[#A9B8C7] text-xs">High-throughput microservices, Next.js, Node.js, Go, PostgreSQL</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Laptop className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Cross-Platform Mobile Apps</strong>
                      <span className="text-[#A9B8C7] text-xs">Production Flutter & iOS/Android digital products</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Server className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Cloud Infrastructure & DevOps</strong>
                      <span className="text-[#A9B8C7] text-xs">AWS architecture, Docker containerization, Kubernetes & CI/CD</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Applied AI & Machine Learning</strong>
                      <span className="text-[#A9B8C7] text-xs">RAG pipelines, vector search, LLM integrations & predictive analytics</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-2 border-t border-white/10 text-[11px] text-navy-mist italic">
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

              <div className="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed">
                <p>
                  Between 2020 and 2022, while interviewing hundreds of university graduates and bootcamp certificate holders for engineering roles at our parent tech firm, we identified a consistent, frustrating reality:
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-paper-alt border border-border space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-ink">
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
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-border">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-ink block font-bold">100% Practical Rigor</strong>
                    <span className="text-ink-soft">Real terminals, real compilers, real Git commits every class.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-border">
                  <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-ink block font-bold">Verifiable Proof-of-Work</strong>
                    <span className="text-ink-soft">Live URLs & GitHub repos instead of hollow paper certificates.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Visual Story Composition */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-[#E0DACF] shadow-lg bg-paper-alt">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Navya engineering instructors conducting code review with students"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-navy-mist block">
                    [OUR MISSION IN NUMBERS]
                  </span>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Transforming Nepal into a Globally Respected Hub for World-Class Software Builders.
                  </h3>
                  <p className="text-xs text-mist">
                    Equipping students with modern stacks, technical resilience, and international engineering standards.
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-border shadow-md">
                <div className="w-8 h-8 rounded-lg bg-sage/20 text-sage-ink flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-ink block">Production Standard</span>
                  <span className="text-ink-soft text-[10px]">OWASP & Clean Code Guidelines</span>
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
            <div className="p-6 bg-white rounded-2xl border border-border hover:border-navy/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-navy/10 text-navy flex items-center justify-center font-mono font-bold text-lg">
                <Terminal className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue tracking-wider uppercase block">
                Pillar 01
              </span>
              <h3 className="text-base font-bold text-ink leading-snug">
                Production-First Curricula
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                We do not teach obsolete frameworks or toy examples. Syllabi focus on TypeScript, modern React/Next.js, PostgreSQL, Docker, Redis queues, and cloud deployment pipelines.
              </p>
              <div className="pt-2 border-t border-border-soft text-[11px] font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>Zero legacy syntax</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-white rounded-2xl border border-border hover:border-navy/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center font-mono font-bold text-lg">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue tracking-wider uppercase block">
                Pillar 02
              </span>
              <h3 className="text-base font-bold text-ink leading-snug">
                Keyboard-On-Code Practice
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Every single session involves hands-on programming. Students build architectural muscle memory by fixing real bugs, writing unit tests, and designing database schemas from scratch.
              </p>
              <div className="pt-2 border-t border-border-soft text-[11px] font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>70% coding / 30% architecture</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-white rounded-2xl border border-border hover:border-navy/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-sage/20 text-sage-ink flex items-center justify-center font-mono font-bold text-lg">
                <GitBranch className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue tracking-wider uppercase block">
                Pillar 03
              </span>
              <h3 className="text-base font-bold text-ink leading-snug">
                Mandatory Pull Request Reviews
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Writing code that runs is only step one. Our senior engineering instructors review every student PR line-by-line for security, variable naming, error boundaries, and design patterns.
              </p>
              <div className="pt-2 border-t border-border-soft text-[11px] font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>Line-by-line feedback on GitHub</span>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-white rounded-2xl border border-border hover:border-navy/40 transition-all space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber/15 text-[#966324] flex items-center justify-center font-mono font-bold text-lg">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue tracking-wider uppercase block">
                Pillar 04
              </span>
              <h3 className="text-base font-bold text-ink leading-snug">
                Verifiable Proof-of-Work
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Graduates complete 3-5 comprehensive production capstones deployed on live custom domains with clean README documentation, database schemas, and demo screencasts.
              </p>
              <div className="pt-2 border-t border-border-soft text-[11px] font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-border text-xs font-semibold text-navy">
                <Users className="w-4 h-4 text-blue" />
                <span>100% Industry Practitioners</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FACULTY.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Monogram header & department */}
                  <div className={`relative h-48 bg-gradient-to-br ${member.monogramColor} overflow-hidden flex items-end`}>
                    <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                    <span className="absolute top-5 right-5 text-4xl font-heading font-extrabold text-white/15 select-none">
                      {member.initials}
                    </span>
                    <div className="relative z-10 p-4">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-navy-mist block">
                        {member.department}
                      </span>
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3.5">
                    <div>
                      <span className="text-xs font-bold text-navy block">{member.role}</span>
                      <span className="text-[11px] font-mono text-sage font-semibold">{member.experience}</span>
                    </div>

                    <p className="text-xs text-ink-soft leading-relaxed">
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
                            className="px-2 py-0.5 rounded bg-paper-alt text-navy text-[10px] font-mono font-medium border border-border-warm"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-paper border-t border-border flex items-center justify-between text-[11px] text-ink-soft">
                  <span>Office Hours & PR Reviews</span>
                  <span className="font-semibold text-navy">Available Weekly</span>
                </div>
              </div>
            ))}
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
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-white text-ink-soft hover:text-ink border border-border'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Kathmandu Physical Lab</span>
            </button>

            <button
              onClick={() => setActiveLabTab('digital')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeLabTab === 'digital'
                  ? 'bg-navy text-white shadow-md'
                  : 'bg-white text-ink-soft hover:text-ink border border-border'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Interactive Digital Campus</span>
            </button>
          </div>

          {activeLabTab === 'physical' ? (
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sage/20 text-sage-ink text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Kathmandu Innovation Lab</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-ink">
                    Ergonomic Developer Workstations & Hardware Labs
                  </h3>

                  <p className="text-sm text-ink-soft leading-relaxed">
                    Our physical lab is designed specifically for pair programming, sprint hackathons, and mentor collaboration. Students enjoy uninterrupted power, dedicated high-speed optical fiber, and external multi-display setups.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Dual-Monitor Stations</strong>
                      <p className="text-[11px] text-ink-soft">External high-res displays for simultaneous code & debugger views.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Dual Redundant Fiber</strong>
                      <p className="text-[11px] text-ink-soft">Gigabit dedicated connection with automatic failover.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Zero-Downtime Power</strong>
                      <p className="text-[11px] text-ink-soft">Online UPS system backed by on-premise generator backup.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Hardware & Server Rack</strong>
                      <p className="text-[11px] text-ink-soft">Physical Linux server racks for hands-on networking drills.</p>
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
                  <div className="p-4 rounded-xl bg-paper-alt border border-border-warm text-xs text-ink-soft flex items-center justify-between">
                    <span>Campus Location: Kathmandu, Nepal</span>
                    <span className="font-semibold text-navy">Open Sun–Fri: 7:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue/15 text-blue text-xs font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Interactive Remote Learning</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-ink">
                    Live Interactive Sessions with Cloud Sandbox Environments
                  </h3>

                  <p className="text-sm text-ink-soft leading-relaxed">
                    For students attending from outside Kathmandu or working professionals requiring flexible participation, our digital campus delivers the exact same instructor interaction, live code reviews, and cohort energy.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Live Stream + Screen Sharing</strong>
                      <p className="text-[11px] text-ink-soft">Real-time audio-visual connection with instant instructor terminal sharing.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">1080p HD Archive</strong>
                      <p className="text-[11px] text-ink-soft">Every session recorded with timestamped code checkpoints for revision.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Cloud Dev Sandboxes</strong>
                      <p className="text-[11px] text-ink-soft">Pre-configured cloud database & Docker sandboxes for smooth setup.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">24/7 Discord Community</strong>
                      <p className="text-[11px] text-ink-soft">Active peer channels, bug-fix threads, and mentor office hours.</p>
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
                  <div className="p-4 rounded-xl bg-paper-alt border border-border-warm text-xs text-ink-soft flex items-center justify-between">
                    <span>Platform: Interactive Live Cohorts + LMS</span>
                    <span className="font-semibold text-navy">Lifetime Archive Access</span>
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
            <div className="p-6 bg-white rounded-2xl border border-border space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-navy/10 text-navy flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink">
                1. Radical Transparency
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                We provide clear syllabi, realistic salary expectations, and straightforward NPR pricing with zero hidden fees. We never sell hollow promises or fake 100% placement guarantees.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-border space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-blue/10 text-blue flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink">
                2. Code Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                We believe good software is readable, secure, and maintainable. We teach students to write clean code, handle edge cases, and take genuine pride in their architectural decisions.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-border space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-sage/20 text-sage-ink flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink">
                3. Lifetime Alumni Community
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Everything You Need to Know About Navya Ed Tech
              </h2>
              <p className="text-sm text-ink-soft">
                Have questions about our background, teaching model, parent company, or placement support?
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
              <FAQAccordion items={FAQS} />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. CAMPUS VISIT & ACTION CTA */}
        {/* ========================================================================= */}
        <section className="bg-navy rounded-3xl text-white p-8 sm:p-12 lg:p-16 border border-navy-deep shadow-xl text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider text-navy-mist">
              <Sparkles className="w-3.5 h-3.5 text-navy-mist" />
              <span>Take the Next Step</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Accelerate Your Software Engineering Career?
            </h2>

            <p className="text-sm sm:text-base text-mist leading-relaxed">
              Schedule a personalized academic counseling session or visit our Kathmandu Innovation Lab to review our syllabus modules, meet our mentors, and inspect our student capstone projects in person.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                href="/contact"
                rightIcon={<ArrowRight className="w-4 h-4 text-navy" />}
              >
                Schedule a Campus Visit & Counseling
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                href="/courses"
                rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
              >
                Browse Course Catalog
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-navy-mist border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sage" />
                <span>Sun – Fri: 7:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>Registered IT Education Provider</span>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};
