import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code, ArrowRight, CheckCircle2, GitBranch, Cpu, Lock } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Stagger, StaggerItem } from '../motion/Reveal';

interface GraduateQualityStandardProps {
  /** Render only the panel content (used inside the Home "Standards" tabs) */
  embedded?: boolean;
}

export const GraduateQualityStandard: React.FC<GraduateQualityStandardProps> = ({ embedded = false }) => {
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

  const content = (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
        <SectionHeader
          eyebrow="Integrity & Credibility"
          title="Founding Cohort Proof-of-Work Standard"
          description="Instead of unverified testimonials or synthetic placement percentages, we establish credibility through transparent engineering standards and inspectable capstone repositories."
          headingTag={embedded ? 'h3' : 'h2'}
          size={embedded ? 'md' : 'lg'}
        />
        <div className="shrink-0">
          <Button variant="outline" size="md" href="/student-work" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Capstone Repositories
          </Button>
        </div>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-3xl overflow-hidden">
        {qualityPillars.map((pillar) => (
          <StaggerItem key={pillar.title} className="bg-white p-6 sm:p-7 flex flex-col">
            <span className="w-11 h-11 rounded-xl bg-navy/[0.06] text-navy grid place-items-center">{pillar.icon}</span>
            <h4 className="mt-6 text-[17px] font-semibold tracking-[-0.015em] text-ink leading-snug">{pillar.title}</h4>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">{pillar.description}</p>
            <p className="mt-5 pt-4 border-t border-border-soft flex items-center gap-2 text-[13px] font-medium text-sage-ink">
              <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
              {pillar.proof}
            </p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0" aria-hidden="true" />
            <h4 className="text-[15px] font-semibold text-ink">Founding Cohort Transparency Policy</h4>
          </div>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            As a first-year institute, Navya Ed Tech publishes student reviews and career outcomes strictly upon verified capstone defense and affirmative written consent following graduation. We encourage all prospective students, parents, and engineering managers to directly inspect the source code, live demos, and documentation of our curriculum reference capstones.
          </p>
        </div>

        <Link
          to="/student-work"
          className="group shrink-0 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light active:scale-[0.97] transition-[background-color,scale] duration-180 ease-out shadow-xs"
        >
          <Code className="w-4 h-4 text-navy-mist" />
          <span>Inspect Capstone Codebases</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );

  if (embedded) return content;

  return (
    <section id="proof-of-work-section" className="section-y bg-paper-alt">
      <Container>{content}</Container>
    </section>
  );
};
