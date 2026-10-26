import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
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
  HeartHandshake,
  FileCheck,
  AlertCircle,
  Phone,
  Mail,
  Quote
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema, getFAQSchema } from '../utils/structuredData';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { HeroImageWithParallax } from '../components/common/HeroImageWithParallax';
import { HeroLiveIndicator } from '../components/common/HeroLiveIndicator';
import {
  EASING,
  fadeUp,
  staggerContainer,
  scaleIn,
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroCardsContainer,
  heroCardItem,
} from '../lib/motion';
import { SITE_CONFIG } from '../config/site';
import type { FAQItem } from '../types';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';

// Departmental Faculty & Mentorship Council Structure (Zero Placeholders)
interface FacultyDepartment {
  department: string;
  discipline: string;
  leadRole: string;
  initials: string;
  monogramColor: string;
  experienceRequirement: string;
  coreTech: string[];
  responsibilities: string;
  photoUrl?: string;
  imageAlt?: string;
}

const FACULTY_DEPARTMENTS: FacultyDepartment[] = [
  {
    department: 'Full-Stack & Cloud Engineering',
    discipline: 'Modern Web, React & Cloud Architectures',
    leadRole: 'Senior Full-Stack Engineering Mentors',
    initials: 'FS',
    monogramColor: 'from-navy to-[#0E1F30]',
    experienceRequirement: 'Min. 6+ Years Commercial Engineering Experience',
    coreTech: ['JavaScript ES6+', 'React 18+', 'Node.js / Express', 'PostgreSQL', 'Tailwind CSS'],
    responsibilities:
      'Guides students through modular component architecture, asynchronous state patterns, RESTful API design, and automated deployment pipelines on Vercel and Render.'
  },
  {
    department: 'Python Systems & Microservices',
    discipline: 'Backend Engineering & Concurrent Systems',
    leadRole: 'Senior Python Systems Architects',
    initials: 'PY',
    monogramColor: 'from-blue to-[#1F4468]',
    experienceRequirement: 'Min. 5+ Years Backend Architecture Experience',
    coreTech: ['Python 3.12+', 'FastAPI', 'AsyncIO', 'SQLAlchemy ORM', 'Redis', 'Docker'],
    responsibilities:
      'Directs modular object-oriented software design, transactional database modeling, asynchronous API throughput, and containerized microservice workflows.'
  },
  {
    department: 'Applied Data Science & Machine Learning',
    discipline: 'Predictive Analytics & Applied AI Systems',
    leadRole: 'Data Science & Applied AI Specialists',
    initials: 'DS',
    monogramColor: 'from-sage-ink to-[#263A2E]',
    experienceRequirement: 'Min. 5+ Years Production Analytics & ML Experience',
    coreTech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Statistical Inference', 'Streamlit'],
    responsibilities:
      'Supervises exploratory data wrangling on real market datasets, cross-validated regression modeling, interactive analytical dashboards, and model deployment.'
  },
  {
    department: 'UI/UX Product Design Systems',
    discipline: 'Interface Craftsmanship & Design Systems',
    leadRole: 'Senior Product Design Mentors',
    initials: 'UX',
    monogramColor: 'from-[#6B21A8] to-[#4C1D95]',
    experienceRequirement: 'Min. 5+ Years Digital Product Design Experience',
    coreTech: ['Figma Auto Layout', 'Component Architecture', 'WCAG AA Accessibility', 'Usability Audits'],
    responsibilities:
      'Coaches students on user research, user journey mapping, design system documentation, accessible typography, and interactive clickable prototypes.'
  },
  {
    department: 'Young Coders & Computational Thinking',
    discipline: 'Early Computer Science & Game Physics',
    leadRole: 'STEM Education & Creative Computing Mentors',
    initials: 'CC',
    monogramColor: 'from-amber-700 to-amber-900',
    experienceRequirement: 'Min. 4+ Years CS Pedagogy & Youth Instruction',
    coreTech: ['Scratch 3.0 Logic', 'Algorithmic Sequencing', '2D Sprite Physics', 'Game Loops'],
    responsibilities:
      'Mentors school students through algorithmic thinking, coordinate physics, interactive storytelling, and arcade game development.'
  },
  {
    department: 'Career Advisory & Technical Placement',
    discipline: 'Portfolio Audits & Industry Transition',
    leadRole: 'Career Coaches & Technical Recruiters',
    initials: 'CA',
    monogramColor: 'from-navy-deep to-[#0A1828]',
    experienceRequirement: 'Min. 6+ Years Tech Recruitment & Talent Advisory',
    coreTech: ['GitHub Portfolio Optimization', 'System Design Mock Interviews', 'Resume Audits'],
    responsibilities:
      'Conducts mandatory portfolio audits, code walk-through simulations, salary negotiation guidance, and direct referrals to Kathmandu technology employer networks.'
  }
];

// Institutional Frequently Asked Questions (Top 3 Relevant to About)
const FAQS: FAQItem[] = [
  {
    question: 'How is Navya Ed Tech different from traditional computer institutes in Nepal?',
    answer:
      'Traditional institutes rely heavily on theoretical slideshows, obsolete syntax, and part-time lecture tutors. Navya Ed Tech is the education division of an active commercial software company (Navya EdTech). Students learn production standards: daily Git commits, line-by-line pull request code critiques from senior software engineers, live cloud deployments, and 1:12 small cohort attention.'
  },
  {
    question: 'What is the relationship between Navya Ed Tech and Navya EdTech (navyaedtech.com)?',
    answer:
      'Navya EdTech (navyaedtech.com) is our parent software enterprise that designs and builds commercial web, mobile, and cloud platforms. Navya Ed Tech Pvt. Ltd. is the dedicated workforce education division. This corporate synergy allows us to integrate actual software patterns, real client challenges, and hiring referrals directly into student learning.'
  },
  {
    question: 'What certificate is awarded upon completion?',
    answer:
      'Graduates who achieve 80% attendance, complete all assignments, and successfully defend their capstone project receive an official Certificate of Technical Competence issued by Navya Ed Tech Pvt. Ltd. We transparently disclose that this is an industry technical credential validating practical code skills, not an accredited university degree or CTEVT charter.'
  }
];

export const About: React.FC = () => {
  const [activeLabTab, setActiveLabTab] = useState<'physical' | 'digital'>('physical');
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="About Navya Ed Tech | IT Education Division of Navya EdTech Nepal"
        description="Learn about Navya Ed Tech Pvt. Ltd., our engineering-first learning philosophy, parent software enterprise, senior practitioner mentorship council, Kathmandu innovation laboratory, and institutional policies."
        keywords="about Navya Ed Tech, IT training institute Kathmandu, software company education Nepal, engineering mentorship Nepal, Putalisadak computer institute"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ]),
          getFAQSchema(FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      <Container>
        <Breadcrumbs className="mb-6" items={[{ label: 'About Us' }]} />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION: WHO NAVYA ED TECH IS */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            variants={prefersReducedMotion ? undefined : heroStaggerContainer}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={prefersReducedMotion ? undefined : heroEyebrow}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase"
            >
              <HeroLiveIndicator color="sage" />
              <span>About Navya Ed Tech • Kathmandu, Nepal</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                variants={prefersReducedMotion ? undefined : heroHeadline}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]"
              >
                Engineering Education Rooted in Real-World Software Production.
              </motion.h1>
              <motion.p
                variants={prefersReducedMotion ? undefined : heroParagraph}
                className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
              >
                Navya Ed Tech Pvt. Ltd. is the dedicated workforce training and technical education division of Navya EdTech—an active commercial software engineering firm based in Kathmandu. We train aspiring software engineers, university graduates, and career transitioners through production engineering workflows, daily Git code audits, and live cloud deployment.
              </motion.p>
            </div>

            {/* Core Institutional Fact Bar */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardsContainer}
              className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs"
            >
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <strong className="text-sm font-bold text-navy block">Industry Backed</strong>
                <span className="text-ink-soft">Direct synergy with commercial software parent firm</span>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <strong className="text-sm font-bold text-sage-ink block">1:12 Mentorship</strong>
                <span className="text-ink-soft">Small cohort attention & line-by-line pull request audits</span>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <strong className="text-sm font-bold text-blue block">Production Rigor</strong>
                <span className="text-ink-soft">Live cloud deployments and verifiable GitHub portfolios</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition with Parallax Overlaid Card */}
          <div className="lg:col-span-5 relative">
            <HeroImageWithParallax
              src="/images/heroes/about-hero.jpg"
              alt="Navya Ed Tech software development laboratory in Kathmandu"
              heightClass="h-[320px] sm:h-[380px]"
              priority={true}
              overlayBadgeTop={
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <HeroLiveIndicator color="sage" />
                  <span>Navya EdTech Education Division</span>
                </div>
              }
              overlayCardBottom={
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Putalisadak Campus</p>
                    <p className="text-xs text-ink-soft">Kathmandu Innovation Lab</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Kathmandu, NP
                  </span>
                </div>
              }
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. WHY WE BUILT NAVYA: NARRATIVE EDITORIAL SHOWCASE (Module 6 Enhancement) */}
        {/* ========================================================================= */}
        <section id="why-we-built" className="mb-16 lg:mb-24 relative overflow-hidden rounded-3xl bg-paper-alt border border-border-warm p-6 sm:p-10 lg:p-12 shadow-xs">
          {/* Subtle Grid Accent */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #0B192C 1px, transparent 1px), linear-gradient(to bottom, #0B192C 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Compelling Narrative */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: EASING }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-mono font-bold uppercase tracking-wider">
                <Code2 className="w-3.5 h-3.5 text-blue" />
                <span>Founding Narrative &amp; Mission</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                Traditional Institutes Teach Chalkboard Theory. We Teach Commercial Software Engineering.
              </h2>

              <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                Across Kathmandu, traditional training centers still ask students to memorize textbook definitions of polymorphism, write syntax by hand on chalkboards, and watch passive video lectures. Yet when these same graduates enter real engineering interviews, they struggle to resolve a simple Git merge conflict, diagnose an unindexed database query, or architect a resilient API microservice.
              </p>

              <p className="text-sm text-ink-soft leading-relaxed">
                Navya Ed Tech was founded to close this commercial gap. As the education division of an active software engineering firm, our students build real-world software from day one: opening daily feature branches, defending architectural tradeoffs, and deploying live production applications to the cloud.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 font-medium text-ink">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  <span>Daily Git branching &amp; PR reviews</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-ink">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  <span>Real PostgreSQL &amp; cloud deployments</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-ink">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  <span>1:12 small cohort mentorship</span>
                </div>
                <div className="flex items-center gap-2 font-medium text-ink">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  <span>Verifiable production portfolios</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Floating Dramatic Quote Callout Box */}
            <motion.div
              variants={prefersReducedMotion ? undefined : scaleIn}
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15, ease: EASING }}
              className="lg:col-span-5 bg-white rounded-3xl border border-navy/20 p-6 sm:p-8 shadow-lg space-y-5 relative"
            >
              <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                <Quote className="w-5 h-5 text-blue" />
              </div>

              <blockquote className="text-base sm:text-lg font-bold text-ink leading-snug italic">
                &ldquo;If an engineer can't resolve a Git merge conflict or explain why their database query is slow, theoretical slideshows won't save them in a production sprint. We built Navya to teach what engineering teams actually demand.&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-border-faint flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-navy to-[#0E1F30] text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
                  NE
                </div>
                <div>
                  <strong className="text-sm font-bold text-ink block">Senior Engineering Mentorship Council</strong>
                  <span className="text-xs text-ink-soft">Navya EdTech (Commercial Software Studio)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. WHAT WE OFFER & WHO WE SERVE */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* What We Offer */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-blue" />
                  <span>What We Offer</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  9 Production-Aligned Technology Tracks
                </h2>
                <p className="text-sm text-ink-soft leading-relaxed">
                  We reject legacy curricula and toy projects. Our 9 specialized pathways focus exclusively on modern technologies actively demanded in commercial software environments:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-paper border border-border-soft space-y-1">
                  <strong className="font-bold text-navy block">Web Development</strong>
                  <span className="text-ink-soft">Modern HTML5, CSS3, Tailwind CSS & JavaScript ES6+</span>
                </div>
                <div className="p-3 rounded-xl bg-paper border border-border-soft space-y-1">
                  <strong className="font-bold text-navy block">Python Beginner</strong>
                  <span className="text-ink-soft">Programming Fundamentals, Data Structures & Automation</span>
                </div>
                <div className="p-3 rounded-xl bg-paper border border-border-soft space-y-1">
                  <strong className="font-bold text-navy block">Python Advance</strong>
                  <span className="text-ink-soft">FastAPI Microservices, Concurrency & SQLAlchemy</span>
                </div>
                <div className="p-3 rounded-xl bg-paper border border-border-soft space-y-1">
                  <strong className="font-bold text-navy block">Data Science</strong>
                  <span className="text-ink-soft">Pandas, NumPy, Scikit-Learn & Predictive ML Pipelines</span>
                </div>
                <div className="p-3 rounded-xl bg-paper border border-border-soft space-y-1">
                  <strong className="font-bold text-navy block">Scratch Beginner</strong>
                  <span className="text-ink-soft">Visual Block Coding, Creative Stories & Mini-Games</span>
                </div>
                <div className="p-3 rounded-xl bg-paper border border-border-soft space-y-1">
                  <strong className="font-bold text-navy block">Scratch Advanced</strong>
                  <span className="text-ink-soft">2D Game Physics, Custom Blocks & Arcade Capstones</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border-faint">
                <Button variant="outline" size="sm" href="/courses" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Full Course Catalog
                </Button>
              </div>
            </div>

            {/* Who We Serve */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 text-navy text-xs font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-blue" />
                  <span>Who We Serve</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  Built for Dedicated Builders & Transitioners
                </h2>
                <p className="text-sm text-ink-soft leading-relaxed">
                  Our curricula are tailored to learners who want verifiable keyboard capability and real production portfolios:
                </p>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-paper border border-border-soft">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-ink font-bold block">University Students & CS/IT Undergrads</strong>
                    <span className="text-ink-soft text-xs leading-relaxed">
                      Bridging the gap between academic theory and commercial Git, Docker, and full-stack software practices.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-paper border border-border-soft">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-ink font-bold block">Career Changers & Non-CS Professionals</strong>
                    <span className="text-ink-soft text-xs leading-relaxed">
                      Transitioning from business, engineering, or arts disciplines into software development with guided laboratory mentorship.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-paper border border-border-soft">
                  <div className="w-6 h-6 rounded-full bg-navy text-white flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-ink font-bold block">School Students & Young Creators</strong>
                    <span className="text-ink-soft text-xs leading-relaxed">
                      Cultivating foundational algorithmic logic, computational thinking, and 2D game physics through visual Scratch programming.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-border-faint text-xs text-ink-faint flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                <span>Zero previous coding experience required for introductory tracks</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CORPORATE SYNERGY: PARENT COMPANY INTEGRATION */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="bg-navy rounded-3xl text-white p-6 sm:p-10 lg:p-12 border border-navy-deep shadow-lg relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-xs font-mono uppercase tracking-wider text-navy-mist border border-white/10">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Corporate Lineage</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-snug">
                  Backed by Navya EdTech — Commercial Software & Cloud Studio
                </h2>

                <p className="text-sm sm:text-base text-mist leading-relaxed">
                  Most training centers operate in an isolated academic vacuum. Navya Ed Tech is the education division of <strong className="text-white">Navya EdTech</strong>—an active technology enterprise that architects commercial software, cloud platforms, and data systems for domestic and international clients.
                </p>

                <p className="text-sm text-[#A9B8C7] leading-relaxed">
                  This synergy directly shapes student outcomes: our instructional patterns mirror real client development sprints, contemporary CI/CD pipelines, and practical code audits.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href="https://navyaedtech.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-navy text-xs font-bold hover:bg-paper-alt transition-colors shadow-sm"
                  >
                    <span>Visit Parent Company (navyaedtech.com)</span>
                    <ArrowUpRight className="w-4 h-4 text-navy" />
                  </a>

                  <span className="text-xs text-navy-mist flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sage" />
                    <span>Direct Internship & Engineering Lineage</span>
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border border-white/15 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-mist">
                    Parent Studio Disciplines
                  </span>
                  <span className="text-xs font-mono text-white/60">Kathmandu, NP</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-border-warm">
                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Code2 className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Web Application Engineering</strong>
                      <span className="text-[#A9B8C7] text-xs">Modern React, JavaScript ES6+ & Tailwind CSS</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Terminal className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Python Backend Systems</strong>
                      <span className="text-[#A9B8C7] text-xs">FastAPI microservices, AsyncIO & PostgreSQL</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-md bg-blue/30 text-navy-mist flex items-center justify-center shrink-0 mt-0.5">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">Data Analytics & Machine Learning</strong>
                      <span className="text-[#A9B8C7] text-xs">Pandas pipelines, Scikit-Learn models & analytics</span>
                    </div>
                  </li>
                </ul>

                <div className="pt-2 border-t border-white/10 text-xs text-navy-mist italic">
                  * Advanced track students work on real internal software modules under direct engineer supervision.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. LEARNING PHILOSOPHY: FOUR PRACTICAL PILLARS (Module 6 Micro-Animations) */}
        {/* ========================================================================= */}
        <section id="method" className="mb-16 lg:mb-24 scroll-mt-24">
          <SectionHeader
            eyebrow="Pedagogical Standards"
            title="The Navya Method: Four Practical Pillars"
            description="We reject rote theory and passive video watching. Every cohort is structured on these four uncompromising practical standards."
          />

          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer(0.08, 0.04)}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Pillar 01 */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="group p-6 bg-white rounded-2xl border border-border hover:border-navy/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.15, rotate: -4 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="w-12 h-12 rounded-xl bg-navy/10 text-navy flex items-center justify-center font-mono font-bold text-lg cursor-pointer"
                >
                  <Terminal className="w-6 h-6 text-navy" />
                </motion.div>
                <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block">
                  Pillar 01
                </span>
                <h3 className="text-base font-extrabold text-ink leading-snug group-hover:text-navy transition-colors">
                  Production-First Stacks
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  We skip obsolete tutorials and toy projects. Syllabi focus exclusively on modern Python, JavaScript ES6+, Tailwind CSS, FastAPI, and Scikit-Learn data science.
                </p>
              </div>
              <div className="pt-2 border-t border-border-soft text-xs font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>Zero legacy syntax</span>
              </div>
            </motion.div>

            {/* Pillar 02 */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="group p-6 bg-white rounded-2xl border border-border hover:border-navy/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.15, rotate: 4 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="w-12 h-12 rounded-xl bg-blue/10 text-blue flex items-center justify-center font-mono font-bold text-lg cursor-pointer"
                >
                  <Code2 className="w-6 h-6 text-blue" />
                </motion.div>
                <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block">
                  Pillar 02
                </span>
                <h3 className="text-base font-extrabold text-ink leading-snug group-hover:text-navy transition-colors">
                  Keyboard-On-Code Practice
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Every session involves hands-on programming. Students develop muscle memory by fixing real runtime errors, writing unit tests, and structuring database schemas.
                </p>
              </div>
              <div className="pt-2 border-t border-border-soft text-xs font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>70% coding / 30% architecture</span>
              </div>
            </motion.div>

            {/* Pillar 03 */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="group p-6 bg-white rounded-2xl border border-border hover:border-navy/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.15, rotate: -4 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="w-12 h-12 rounded-xl bg-sage/20 text-sage-ink flex items-center justify-center font-mono font-bold text-lg cursor-pointer"
                >
                  <GitBranch className="w-6 h-6 text-sage-ink" />
                </motion.div>
                <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block">
                  Pillar 03
                </span>
                <h3 className="text-base font-extrabold text-ink leading-snug group-hover:text-navy transition-colors">
                  Mandatory PR Reviews
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Code that merely runs is not enough. Senior engineering instructors review student pull requests line-by-line for security, variable naming, error handling, and architecture.
                </p>
              </div>
              <div className="pt-2 border-t border-border-soft text-xs font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>Line-by-line GitHub reviews</span>
              </div>
            </motion.div>

            {/* Pillar 04 */}
            <motion.div
              variants={prefersReducedMotion ? undefined : fadeUp}
              className="group p-6 bg-white rounded-2xl border border-border hover:border-navy/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.15, rotate: 4 }}
                  transition={{ duration: 0.3, ease: EASING }}
                  className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-mono font-bold text-lg border border-amber-200 cursor-pointer"
                >
                  <Award className="w-6 h-6 text-amber-800" />
                </motion.div>
                <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block">
                  Pillar 04
                </span>
                <h3 className="text-base font-extrabold text-ink leading-snug group-hover:text-navy transition-colors">
                  Verifiable Proof-of-Work
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Graduates complete production capstones deployed on live custom domains with clean README documentation, database schemas, and demo walk-throughs.
                </p>
              </div>
              <div className="pt-2 border-t border-border-soft text-xs font-semibold text-navy flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-sage" />
                <span>Live URLs for employers</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FACULTY & MENTORSHIP COUNCIL (Module 6 Hover Lift & Avatar Scale) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeader
              eyebrow="Faculty & Technical Mentorship"
              title="Departmental Mentorship Standards"
              description="Our cohorts are instructed by commercial software engineers and technical leads from Navya EdTech and partner engineering studios."
            />
            <div className="shrink-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-border text-xs font-semibold text-navy shadow-xs">
                <Users className="w-4 h-4 text-blue" />
                <span>1:12 Small Cohort Attention</span>
              </div>
            </div>
          </div>

          {/* Transparent Faculty Assignment Policy */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-paper-alt border border-border text-xs text-ink-soft flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-blue shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold text-navy block text-sm">
                Faculty Vetting & Assignment Policy:
              </strong>
              <p className="leading-relaxed">
                To guarantee contemporary production patterns, instructors must have a minimum of 5 years of active commercial software engineering experience. Lead engineers and laboratory teaching assistants are assigned to specific cohorts prior to batch orientation.
              </p>
            </div>
          </div>

          {/* 6 Faculty Department Cards */}
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer(0.08, 0.04)}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {FACULTY_DEPARTMENTS.map((dept, index) => (
              <motion.div
                key={index}
                variants={prefersReducedMotion ? undefined : fadeUp}
                className="group bg-white rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-2xl hover:border-navy/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    {dept.photoUrl ? (
                      <>
                        <motion.img
                          initial={prefersReducedMotion ? false : { scale: 0.94, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, ease: EASING }}
                          src={dept.photoUrl}
                          alt={dept.imageAlt || `${dept.leadRole} - ${dept.department}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.initials-fallback') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F30]/90 via-[#0E1F30]/40 to-transparent pointer-events-none p-5 flex flex-col justify-between">
                          <div className="self-end">
                            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-white text-xs font-mono font-bold border border-white/20">
                              {dept.initials}
                            </span>
                          </div>
                          <div className="relative z-10 space-y-0.5">
                            <span className="text-xs font-mono uppercase tracking-wider text-navy-mist block">
                              {dept.department}
                            </span>
                            <h3 className="text-lg font-bold text-white leading-tight">
                              {dept.leadRole}
                            </h3>
                          </div>
                        </div>
                      </>
                    ) : null}

                    {/* Initials & Monogram Fallback Banner */}
                    <div
                      className={`initials-fallback w-full h-full bg-gradient-to-br ${dept.monogramColor} overflow-hidden p-5 flex items-end relative ${
                        dept.photoUrl ? 'hidden' : 'flex'
                      }`}
                    >
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
                          backgroundSize: '20px 20px'
                        }}
                      />
                      <motion.span
                        initial={prefersReducedMotion ? false : { scale: 0.85, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 0.15 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: EASING }}
                        className="absolute top-4 right-4 text-4xl font-mono font-extrabold text-white select-none"
                      >
                        {dept.initials}
                      </motion.span>
                      <div className="relative z-10 space-y-1">
                        <span className="text-xs font-mono uppercase tracking-wider text-navy-mist block">
                          {dept.department}
                        </span>
                        <h3 className="text-lg font-bold text-white leading-tight">
                          {dept.leadRole}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs font-semibold text-blue block">{dept.discipline}</span>
                      <span className="text-xs font-mono text-sage-ink font-bold block">
                        {dept.experienceRequirement}
                      </span>
                    </div>

                    <p className="text-xs text-ink-soft leading-relaxed">
                      {dept.responsibilities}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-ink-faint block">
                        Supervised Technology Stack:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {dept.coreTech.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md bg-paper text-navy text-xs font-mono font-medium border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Interactive Affordance */}
                <div className="p-4 bg-paper border-t border-border flex items-center justify-between text-xs text-ink-soft group-hover:bg-paper-alt transition-colors">
                  <span className="flex items-center gap-1 text-navy font-semibold">
                    <span>1:1 Mentorship &amp; PR Reviews</span>
                  </span>
                  <span className="font-bold text-blue flex items-center gap-1">
                    <span>Explore Track</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ========================================================================= */}
        {/* 7. TRAINING INFRASTRUCTURE: KATHMANDU LAB & DIGITAL CAMPUS */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Facilities & Infrastructure"
            title="Workstation Laboratories Built for Intensive Coding"
            description="Whether attending in-person at our Putalisadak Innovation Lab or joining our interactive digital cohorts, you experience an environment engineered for focused programming."
          />

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
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sage/10 text-sage-ink text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Putalisadak Campus, Kathmandu</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-ink">
                    Ergonomic Developer Workstations & Laboratory Desks
                  </h3>

                  <p className="text-sm text-ink-soft leading-relaxed">
                    Our Kathmandu computer lab is designed specifically for code sprints, pair programming, and live mentor troubleshooting. Students have access to dedicated power backup, high-speed optical fiber, and external multi-display workstations.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Dual-Monitor Stations</strong>
                      <p className="text-xs text-ink-soft">External displays for simultaneous code editor & browser debugger views.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Redundant Optical Fiber</strong>
                      <p className="text-xs text-ink-soft">High-bandwidth dedicated internet with automatic secondary failover.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Zero-Downtime Power</strong>
                      <p className="text-xs text-ink-soft">Centralized online UPS system with generator backup during outages.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Physical Server Rack</strong>
                      <p className="text-xs text-ink-soft">On-premise Linux hardware for practical networking and DevOps demonstrations.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-xs">
                    <ImagePlaceholder alt="Navya Kathmandu Innovation Lab Workstations" aspectRatio="auto" art="python" className="w-full h-72 sm:h-80" />
                  </div>
                  <div className="p-4 rounded-xl bg-paper border border-border-soft text-xs text-ink-soft flex items-center justify-between">
                    <span>Campus: Putalisadak, Kathmandu, Nepal</span>
                    <span className="font-semibold text-navy">Open Sun–Fri: 7:00 AM – 7:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue/15 text-blue text-xs font-bold">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Interactive Remote Cohorts</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-ink">
                    Live Video Sessions with Cloud Development Sandboxes
                  </h3>

                  <p className="text-sm text-ink-soft leading-relaxed">
                    For learners across Nepal or working professionals needing evening flexibility, our interactive digital campus provides real-time instructor code-along sessions, terminal screen sharing, and recorded lecture archives.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Live Interactive Code-Along</strong>
                      <p className="text-xs text-ink-soft">Real-time two-way audio-video with live instructor screen casting.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">1080p Video Archives</strong>
                      <p className="text-xs text-ink-soft">Full session video recordings available for review and revision.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Cloud Dev Sandboxes</strong>
                      <p className="text-xs text-ink-soft">Pre-configured cloud databases and virtual environments for seamless coding.</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-paper border border-border space-y-1">
                      <strong className="text-xs font-bold text-ink block">Dedicated Community</strong>
                      <p className="text-xs text-ink-soft">Active peer channels, asynchronous bug-fix threads, and mentor office hours.</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-border shadow-xs">
                    <ImagePlaceholder alt="Digital campus live programming and online code sprints" aspectRatio="auto" art="web" className="w-full h-72 sm:h-80" />
                  </div>
                  <div className="p-4 rounded-xl bg-paper border border-border-soft text-xs text-ink-soft flex items-center justify-between">
                    <span>Platform: Interactive Live Cohorts</span>
                    <span className="font-semibold text-navy">Lifetime Archive Access</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 8. INSTITUTIONAL GOVERNANCE & POLICIES */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Governance & Integrity"
            title="Transparent Institutional Policies"
            description="Clear guidelines on certification eligibility, fee payments, and academic standards."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-border space-y-4 shadow-xs hover:border-navy/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                <Award className="w-5 h-5 text-blue" />
              </div>
              <h3 className="text-base font-bold text-ink">
                1. Certificate of Competence Policy
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Navya Ed Tech issues certificates of technical completion upon verified milestones: 80% attendance, completed assignments, and live capstone defense. We transparently declare this is an industry competence credential, not an accredited university degree or CTEVT charter.
              </p>
              <div className="pt-2 text-xs font-bold text-navy">
                Strict proof-of-work criteria
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-border space-y-4 shadow-xs hover:border-navy/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-blue" />
              </div>
              <h3 className="text-base font-bold text-ink">
                2. Fee Transparency & Refund Terms
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                All course tuitions are quoted upfront in NPR with zero hidden lab or examination surcharges. Milestone-based installments are available. Clear withdrawal and refund terms are documented in our refund policy prior to enrollment.
              </p>
              <div className="pt-2">
                <a href="/refund" className="text-xs font-bold text-blue hover:underline">
                  Read Refund Policy →
                </a>
              </div>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-border space-y-4 shadow-xs hover:border-navy/30 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sage/20 text-sage-ink flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-sage-ink" />
              </div>
              <h3 className="text-base font-bold text-ink">
                3. Student Code of Conduct & Privacy
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                We maintain an inclusive, collaborative coding environment. Student personal data is strictly protected under our privacy policy. We never publish student reviews, names, or code without explicit written consent.
              </p>
              <div className="pt-2">
                <a href="/privacy" className="text-xs font-bold text-blue hover:underline">
                  Read Privacy Policy →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue">
                Questions & Transparency
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                Frequently Asked Questions About Navya Ed Tech
              </h2>
              <p className="text-sm text-ink-soft">
                Factual answers regarding our background, teaching model, parent company, and enrollment terms.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs space-y-6">
              <FAQAccordion items={FAQS} />
              <div className="pt-4 border-t border-border-faint text-center">
                <a
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue hover:text-navy transition-colors"
                >
                  <span>Have questions about fees, schedules, or hardware? See all FAQs</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. CAMPUS VISIT & ADMISSIONS CONSULTATION CTA */}
        {/* ========================================================================= */}
        <section className="bg-navy rounded-3xl text-white p-8 sm:p-12 lg:p-16 border border-navy-deep shadow-xl text-center relative overflow-hidden">
          {/* Ambient Glow Mesh Orbs */}
          <motion.div
            animate={prefersReducedMotion ? undefined : {
              scale: [1, 1.25, 1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue/20 blur-3xl pointer-events-none"
          />
          <motion.div
            animate={prefersReducedMotion ? undefined : {
              scale: [1, 1.3, 1],
              x: [0, -25, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-sage/20 blur-3xl pointer-events-none"
          />

          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider text-navy-mist">
              <Sparkles className="w-3.5 h-3.5 text-navy-mist" />
              <span>Campus Visit & Counseling</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Visit Our Putalisadak Innovation Lab
            </h2>

            <p className="text-sm sm:text-base text-mist leading-relaxed">
              Schedule an in-person academic counseling session or lab visit to inspect our workstations, review detailed curriculum modules, and discuss upcoming cohort schedules.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                href="/contact"
                rightIcon={<ArrowRight className="w-4 h-4 text-navy" />}
              >
                Schedule Campus Counseling
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
                <span>Putalisadak, Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sage" />
                <span>Sun – Fri: 7:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage" />
                <span>{SITE_CONFIG.contactPhone}</span>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};
