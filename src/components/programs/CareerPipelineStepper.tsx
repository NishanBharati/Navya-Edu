import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Terminal, Layers, GitPullRequest, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { EASING } from '../../lib/motion';

interface Stage {
  number: string;
  title: string;
  phase: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  deliverable: string;
  tagColor: string;
}

const STAGES: Stage[] = [
  {
    number: '01',
    title: 'Core Foundations',
    phase: 'Phase 1 • Algorithmic Rigor',
    icon: Terminal,
    description: 'Master idiomatic syntax, data structures, and command-line workflows. Build rock-solid mental models for memory, control flow, and clean code principles.',
    deliverable: 'CLI Utilities & Git Branching',
    tagColor: 'bg-navy/10 text-navy border-navy/20',
  },
  {
    number: '02',
    title: 'Systems & Production APIs',
    phase: 'Phase 2 • Concurrency & DBs',
    icon: Layers,
    description: 'Construct modular full-stack interfaces, asynchronous REST microservices, and database schemas with relational data integrity.',
    deliverable: 'Live REST APIs & DB Schemas',
    tagColor: 'bg-blue/10 text-blue border-blue/20',
  },
  {
    number: '03',
    title: 'Capstone Sprints & PR Audits',
    phase: 'Phase 3 • Agile Team Sprints',
    icon: GitPullRequest,
    description: 'Work in agile sprints mirroring commercial software studios. Submit line-by-line GitHub pull requests audited against industry quality and OWASP security.',
    deliverable: 'Cloud-Deployed Capstone Systems',
    tagColor: 'bg-sage/20 text-sage-ink border-sage/30',
  },
  {
    number: '04',
    title: 'Portfolio Defense & Placement',
    phase: 'Phase 4 • Industry Transition',
    icon: Award,
    description: 'Defend your system architecture before a senior engineering review panel. Receive technical mock interview coaching and direct referrals to hiring partners.',
    deliverable: 'Verified Portfolio & Direct Referrals',
    tagColor: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  },
];

export const CareerPipelineStepper: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="mb-16 lg:mb-24 relative overflow-hidden rounded-3xl bg-paper-alt border border-border p-6 sm:p-10 lg:p-12 shadow-xs">
      {/* Background Subtle Coordinate Grid Accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0B192C 1px, transparent 1px), linear-gradient(to bottom, #0B192C 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-3xl mb-10 sm:mb-14 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-navy text-xs font-mono font-bold uppercase tracking-wider">
          <span>4-Stage Career Transformation Pipeline</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
          How We Take You From Fundamentals to Production Engineering.
        </h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          A progressive, milestone-driven curriculum modeled after real engineering teams. Each phase unlocks higher technical autonomy with direct code review audits.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP CONNECTED STEPPER (Horizontal >= md) */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative">
        {/* Animated Connecting SVG Line */}
        <div className="absolute top-[28px] left-[6%] right-[6%] h-[2px] pointer-events-none z-0">
          <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 4">
            {/* Background Track */}
            <line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="#DCE4EC"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated Solid Progress Line */}
            <motion.line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="#0B192C"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASING }}
            />
          </svg>
        </div>

        {/* 4 Stage Cards Grid */}
        <div className="grid grid-cols-4 gap-4 lg:gap-6 relative z-10">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.number}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : idx * 0.12, ease: EASING }}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-border p-5 shadow-xs hover:border-navy/40 hover:shadow-md transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Top Node Header with Number and Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-navy text-white font-mono font-extrabold text-base flex items-center justify-center shadow-sm group-hover:bg-blue group-hover:scale-105 transition-all duration-300">
                      {stage.number}
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-paper-alt border border-border-warm text-ink flex items-center justify-center group-hover:text-navy transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${stage.tagColor}`}>
                    {stage.phase}
                  </span>

                  <h3 className="text-base font-extrabold text-ink group-hover:text-navy transition-colors">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-ink-soft leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border-faint">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint block">Key Deliverable:</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                    <span className="truncate" title={stage.deliverable}>{stage.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE VERTICAL STEPPER (< md) */}
      {/* ========================================================================= */}
      <div className="block md:hidden relative pl-6 space-y-6">
        {/* Vertical SVG Line */}
        <div className="absolute left-[18px] top-4 bottom-4 w-[2px] pointer-events-none">
          <svg className="w-2 h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 2 100">
            <line x1="1" y1="0" x2="1" y2="100" stroke="#DCE4EC" strokeWidth="2" strokeDasharray="4 4" />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="#0B192C"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASING }}
            />
          </svg>
        </div>

        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          return (
            <motion.div
              key={stage.number}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.1, ease: EASING }}
              className="relative bg-white rounded-2xl border border-border p-5 shadow-xs space-y-3"
            >
              {/* Node Indicator */}
              <div className="absolute -left-[33px] top-4 w-7 h-7 rounded-lg bg-navy text-white text-xs font-mono font-bold flex items-center justify-center shadow-xs">
                {stage.number}
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider border ${stage.tagColor}`}>
                  {stage.phase}
                </span>
                <Icon className="w-4 h-4 text-ink-soft" />
              </div>

              <h3 className="text-base font-extrabold text-ink">
                {stage.title}
              </h3>

              <p className="text-xs text-ink-soft leading-relaxed">
                {stage.description}
              </p>

              <div className="pt-2 border-t border-border-faint flex items-center gap-1.5 text-xs font-bold text-ink">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>{stage.deliverable}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Pedagogy Link */}
      <div className="mt-8 pt-6 border-t border-border-warm flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-ink-soft">
          Want to see our full assessment rubric and pull request audit criteria?
        </p>
        <a
          href="/about#method"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-blue transition-colors group"
        >
          <span>Read The Navya Pedagogy Framework</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
};
