import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Code, ArrowRight, CheckCircle2, GitBranch, Cpu, Lock } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Stagger, StaggerItem } from '../motion/Reveal';
import { Block, BlockColor } from '../blocks/Block';

const STANDARD_COLORS: BlockColor[] = ['blue', 'yellow', 'green', 'pink'];

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

      <Stagger as="ul" className="flex flex-col gap-3">
        {qualityPillars.map((item, i) => (
          <StaggerItem
            as="li"
            key={item.title}
            className="list-none grid grid-cols-1 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-x-8 gap-y-3 items-center rounded-2xl bg-white border border-border p-4 sm:p-5"
          >
            <span className="stack-depth">
              <Block color={STANDARD_COLORS[i % STANDARD_COLORS.length]} tab={false} className="text-base sm:text-[17px] !flex-nowrap">
                <span aria-hidden="true" className="inline-flex shrink-0 [&>svg]:w-[1.1em] [&>svg]:h-[1.1em]">{item.icon}</span>
                <h4 className="font-display font-bold leading-snug">{item.title}</h4>
              </Block>
            </span>
            <span className="flex items-start gap-3">
              <span aria-hidden="true" className="hidden md:block mt-3 h-0.5 w-6 shrink-0 bg-ink/25 rounded-full" />
              <span>
                <span className="block text-[15px] leading-relaxed text-ink-muted">{item.description}</span>
                <span className="mt-2 flex items-center gap-2 text-sm font-semibold text-sage-ink">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                  {item.proof}
                </span>
              </span>
            </span>
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
