import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Code,
  Terminal,
  BarChart3,
  Gamepad2,
  GitBranch,
  Users,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu
} from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { DURATION, EASING, EASE_IN_OUT } from '../../lib/motion';
import { Reveal } from '../motion/Reveal';

interface Capability {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  stack: string[];
  metric: { value: string; label: string };
  highlight: string;
  coursePath: string;
  previewType: 'web' | 'backend' | 'datascience' | 'kids' | 'workflow' | 'mentorship';
}

const CAPABILITIES: Capability[] = [
  {
    id: 'web',
    title: 'Modern Web Craftsmanship',
    description: 'Semantic HTML5, responsive Tailwind CSS layouts, and modern JavaScript ES6+ application logic for interactive user interfaces.',
    icon: <Code className="w-4.5 h-4.5" />,
    tag: 'Frontend & UI',
    stack: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Next.js', 'Vite'],
    metric: { value: '100% Mobile-First', label: 'WCAG AA Compliant Standards' },
    highlight: 'Build production-ready web apps with state management, modular component architecture, and high-performance rendering.',
    coursePath: '/courses/web-development',
    previewType: 'web',
  },
  {
    id: 'backend',
    title: 'Python Software Engineering',
    description: 'Clean object-oriented architecture, modular automation scripting, asynchronous concurrency, and high-performance FastAPI microservices.',
    icon: <Terminal className="w-4.5 h-4.5" />,
    tag: 'Backend & Core',
    stack: ['Python 3.12+', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AsyncIO'],
    metric: { value: '< 50ms Latency', label: 'Asynchronous API Benchmarks' },
    highlight: 'Architect distributed backend systems with relational migrations, background worker queues, and automated test coverage.',
    coursePath: '/courses/python-advance',
    previewType: 'backend',
  },
  {
    id: 'datascience',
    title: 'Applied Data Science & ML',
    description: 'Exploratory data analysis, Pandas, NumPy, statistical hypothesis testing, and predictive machine learning models using Scikit-Learn.',
    icon: <BarChart3 className="w-4.5 h-4.5" />,
    tag: 'Analytics & AI',
    stack: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Streamlit', 'Jupyter'],
    metric: { value: 'Real Datasets', label: 'Nepal Market Data Pipelines' },
    highlight: 'Ingest raw data feeds, perform feature engineering, run cross-validation, and deploy interactive analytical dashboards.',
    coursePath: '/courses/data-science',
    previewType: 'datascience',
  },
  {
    id: 'kids',
    title: 'STEM & Early Coding Logic',
    description: 'Visual block programming in Scratch 3.0, computational thinking, 2D arcade physics, and interactive problem solving for young learners.',
    icon: <Gamepad2 className="w-4.5 h-4.5" />,
    tag: 'Kids Coding',
    stack: ['Scratch 3.0', 'Block Logic', 'Game Physics', 'Algorithmic Thinking'],
    metric: { value: 'Ages 8–16', label: 'Hands-On Creative Problem Solving' },
    highlight: 'Foster logical thinking early through animation sequencing, broadcast messaging, and beginner game architecture.',
    coursePath: '/courses/scratch-beginner',
    previewType: 'kids',
  },
  {
    id: 'workflows',
    title: 'Verifiable Production Workflows',
    description: 'Line-by-line pull request reviews on GitHub, Git branching strategies, clean code standards, and live deployments on Vercel.',
    icon: <GitBranch className="w-4.5 h-4.5" />,
    tag: 'Engineering Rigor',
    stack: ['GitHub PRs', 'Git Branching', 'CI/CD Pipelines', 'Vercel', 'OWASP'],
    metric: { value: '100% PR Review', label: 'Senior Architect Code Inspection' },
    highlight: 'No student graduates with unreviewed code. Every commit is audited for clean naming, edge cases, and security standards.',
    coursePath: '/student-work',
    previewType: 'workflow',
  },
  {
    id: 'mentorship',
    title: 'Direct Industry Mentorship',
    description: 'Learn directly from active software developers and technical trainers at Navya EdTech with personalized feedback in small cohorts.',
    icon: <Users className="w-4.5 h-4.5" />,
    tag: 'Mentorship Desk',
    stack: ['1:12 Ratio Cap', 'Daily Code Sprints', 'Architecture Defenses'],
    metric: { value: '1:12 Cohort Cap', label: 'Maximum Personalized Attention' },
    highlight: 'Avoid crowded lecture halls. Work alongside senior engineers in our Putalisadak physical lab or live online sessions.',
    coursePath: '/about',
    previewType: 'mentorship',
  },
];

export const WhyNavya: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeCap = CAPABILITIES[activeIndex];

  return (
    <section className="section-y bg-paper">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <SectionHeader
            eyebrow="Practical Engineering Stack"
            title="Learn the exact technologies used to engineer real digital products."
            description="Most training institutes operate as isolated testing centers. Navya Ed Tech is directly integrated with an active software engineering enterprise in Nepal."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Supporting Visual / Stat Cross-Fade Panel */}
          <Reveal className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
            {/* Dynamic Visual Box Driven by Active Row */}
            <div className="relative min-h-90 rounded-3xl bg-navy-dark text-white p-6 sm:p-8 border border-white/10 shadow-2xl overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 bg-blueprint-dark opacity-70 pointer-events-none" aria-hidden="true" />
              {/* Subtle ambient lighting */}
              <div
                className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-blue/20 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute -bottom-24 -left-24 w-56 h-56 rounded-full bg-sage/20 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCap.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6, filter: 'blur(2px)', transition: { duration: DURATION.instant } }}
                  transition={{ duration: DURATION.base, ease: EASING }}
                  className="space-y-5 relative z-10"
                >
                  {/* Active Header with Live Badge */}
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white tracking-wide">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
                      <span>{activeCap.tag}</span>
                    </div>
                    <span className="text-xs font-mono text-navy-mist">
                      Track 0{activeIndex + 1} / 06
                    </span>
                  </div>

                  {/* Title & Key Highlight */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 text-blue-light">
                      <div className="p-2 rounded-xl bg-white/10 text-white">
                        {activeCap.icon}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                        {activeCap.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-mist leading-relaxed pt-1">
                      {activeCap.highlight}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-navy-mist block">
                      Production Stack & Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCap.stack.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-white font-mono border border-white/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metric Box */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-lg sm:text-xl font-extrabold text-white block">
                        {activeCap.metric.value}
                      </span>
                      <span className="text-xs text-navy-mist">
                        {activeCap.metric.label}
                      </span>
                    </div>
                    <div className="p-2 rounded-xl bg-sage/15 text-sage">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Track CTA */}
                  <div className="pt-2">
                    <Link
                      to={activeCap.coursePath}
                      className="group inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-light transition-colors duration-180"
                    >
                      <span className="link-underline">Explore {activeCap.title} Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Parent Company Accreditation Card */}
            <div className="p-6 rounded-2xl bg-white border border-border-warm space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue">
                  Commercial Parent Enterprise
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Our parent company, <strong className="text-ink">Navya EdTech</strong>, engineers digital products, cloud platforms, and mobile apps for commercial clients. This directly informs our curriculum standards, coding conventions, and architectural reviews.
              </p>

              <div className="pt-2 border-t border-border-faint">
                <a
                  href="https://navyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep active:scale-[0.97] transition-all duration-150 shadow-xs"
                >
                  <span>Explore navyaedtech.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-navy-mist transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Interactive Technology Rows (Hover / Tap to Switch) */}
          <Reveal delay={0.08} className="lg:col-span-7 bg-white rounded-3xl border border-border shadow-sm overflow-hidden divide-y divide-border-soft">
            {CAPABILITIES.map((cap, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={cap.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(i);
                    }
                  }}
                  className={`flex items-start gap-4 p-5 sm:p-6 transition-colors duration-180 cursor-pointer text-left relative ${
                    isActive ? 'bg-navy/[0.035]' : 'hover:bg-paper-alt/60'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="why-navya-active-bar"
                      className="absolute left-0 top-0 bottom-0 w-0.75 bg-navy"
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: DURATION.base, ease: EASE_IN_OUT }}
                      aria-hidden="true"
                    />
                  )}
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${
                      isActive ? 'bg-navy text-white shadow-xs' : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {cap.icon}
                  </div>

                  {/* Text Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <h3
                        className={`text-base sm:text-[17px] font-semibold tracking-[-0.015em] transition-colors duration-180 ${
                          isActive ? 'text-navy' : 'text-ink'
                        }`}
                      >
                        {cap.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
                            isActive
                              ? 'bg-navy/10 text-navy font-bold'
                              : 'text-ink-faint bg-paper-alt'
                          }`}
                        >
                          {cap.tag}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-navy hidden sm:inline-block" />
                        )}
                      </div>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-2">
                      {cap.description}
                    </p>

                    {/* Active preview hint */}
                    {isActive && (
                      <div className="mt-2.5 flex items-center gap-2 text-xs font-semibold text-blue">
                        <span>Viewing active curriculum specification</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
};

