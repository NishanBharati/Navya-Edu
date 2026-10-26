import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code, ArrowRight, ExternalLink, CheckCircle2, GitBranch, Cpu, Lock } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';

export const GraduateQualityStandard: React.FC = () => {
  const qualityPillars = [
    {
      title: 'Live Custom Cloud Deployments',
      description: 'Graduates do not leave with localhost projects. Every capstone is deployed live on cloud infrastructure (Vercel, Supabase, or AWS) with real domain routing and active SSL.',
      proof: 'Live URLs for hiring managers',
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      title: 'Public GitHub Code Repositories',
      description: 'Students publish clean, idiomatic code with branch histories, atomic commits, descriptive pull request discussions, and structured README architecture documentation.',
      proof: 'Verifiable Git commit history',
      icon: <GitBranch className="w-5 h-5" />,
    },
    {
      title: 'Panel Capstone Defense',
      description: 'Completion certificates require defending project architecture, database normalization, and security trade-offs before a panel of senior software engineers.',
      proof: 'Live technical architecture Q&A',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
    {
      title: 'Verifiable Digital Credentials',
      description: 'Every certificate issued includes a tamper-proof credential ID and direct verification URL allowing hiring employers or university evaluators to authenticate completion.',
      proof: 'Instant online credential check',
      icon: <Lock className="w-5 h-5" />,
    },
  ];

  return (
    <section id="proof-of-work-section" className="py-16 sm:py-24 bg-paper-alt border-b border-border">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Integrity & Credibility"
            title="Founding Cohort Proof-of-Work Standard"
            description="Instead of unverified testimonials or synthetic placement percentages, we establish credibility through transparent engineering standards and inspectable capstone repositories."
          />
          <div className="shrink-0">
            <Button
              variant="outline"
              size="md"
              href="/student-work"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explore Capstone Repositories
            </Button>
          </div>
        </div>

        {/* 4 Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-border-warm shadow-xs hover:border-navy/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-base font-bold text-ink leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border-faint flex items-center gap-1.5 text-xs font-semibold text-navy">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                <span>{pillar.proof}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Verification Statement Banner */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-white border border-border-warm shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sage shrink-0" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-navy">
                  Founding Cohort Transparency Policy
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                As a first-year institute, Navya Ed Tech publishes student reviews and career outcomes strictly upon verified capstone defense and affirmative written consent following graduation. We encourage all prospective students, parents, and engineering managers to directly inspect the source code, live demos, and documentation of our curriculum reference capstones.
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/student-work"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-deep active:scale-[0.98] transition-all shadow-xs"
              >
                <Code className="w-4 h-4 text-navy-mist" />
                <span>Inspect Capstone Codebases</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
