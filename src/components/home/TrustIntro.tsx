import React from 'react';
import { Terminal, Cpu, Briefcase, CheckCircle2, ShieldCheck, Building2, MapPin } from 'lucide-react';
import { Container } from '../common/Container';
import { AnimatedCounter } from '../common/StatCounter';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

export const TrustIntro: React.FC = () => {
  const pillars = [
    {
      title: 'Production-First Stacks',
      description: 'We reject outdated syllabi and toy projects. Students master modern Python 3.12+, JavaScript ES6+, Tailwind CSS, FastAPI, and Data Science workflows currently demanded by active technology studios.',
      proof: 'Zero legacy syntax or toy projects',
      icon: <Terminal className="w-5 h-5" />,
    },
    {
      title: 'Continuous Code Reviews',
      description: 'Every line of student code is submitted via GitHub pull requests and inspected by senior software engineers, validating error boundaries, OWASP security, modular design, and clean naming.',
      proof: 'Line-by-line GitHub reviews',
      icon: <Cpu className="w-5 h-5" />,
    },
    {
      title: 'Verifiable Proof-of-Work',
      description: 'Graduates leave with live-deployed cloud applications, verifiable public repositories, and architectural documentation that prove real capability to hiring managers in Nepal and international remote markets.',
      proof: 'Live custom domain deployments',
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  const metrics = [
    { node: <AnimatedCounter prefix="1:" from={1} to={12} duration={900} />, label: 'Mentor Ratio Cap' },
    { node: <AnimatedCounter from={0} to={100} suffix="%" duration={1100} />, label: 'PR Review Coverage' },
    { node: <AnimatedCounter from={0} to={30} suffix="+" duration={1000} />, label: 'Reference Capstones' },
    { node: '0', label: 'Manufactured Claims' },
  ];

  return (
    <section id="trust-section" className="section-y bg-white border-y border-border-soft">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow mb-5">
              <ShieldCheck className="w-3.5 h-3.5 -ml-1" aria-hidden="true" />
              Verified Institutional Foundation
            </p>
            <h2 className="text-title font-semibold text-ink">
              Technology education engineered by active software practitioners.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              Navya Ed Tech is the dedicated technology education division of{' '}
              <strong className="text-ink font-semibold">Navya EdTech</strong>, a Kathmandu-based commercial software enterprise. We bring live engineering practices, architecture patterns, and production debugging directly into classroom labs and interactive online cohorts.
            </p>
          </Reveal>
        </div>

        {/* Context strip */}
        <Reveal className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-muted">
          <span className="inline-flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue" />
            Commercial Parent Enterprise Lineage
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue" />
            Putalisadak, Kathmandu Physical Lab
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue" />
            <span>
              <AnimatedCounter prefix="1:" from={1} to={12} duration={900} /> Small Cohort Cap
            </span>
          </span>
        </Reveal>

        {/* Metrics */}
        <Stagger
          as="dl"
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden"
        >
          {metrics.map((m) => (
            <StaggerItem key={m.label} className="bg-white p-6 sm:p-8 flex flex-col-reverse">
              <dt className="mt-2 text-sm text-ink-muted">{m.label}</dt>
              <dd className="text-4xl sm:text-5xl font-semibold tracking-[-0.04em] text-navy tabular-nums">{m.node}</dd>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Pillars */}
        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <StaggerItem key={pillar.title} className="relative">
              <div className="flex items-center justify-between">
                <span className="w-11 h-11 rounded-xl bg-navy/[0.06] text-navy grid place-items-center">{pillar.icon}</span>
                <span className="font-mono text-xs text-ink-faint tabular-nums">0{i + 1}</span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-ink">{pillar.title}</h3>
              <p className="mt-3 text-[15px] text-ink-muted leading-relaxed">{pillar.description}</p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-sage-ink">
                <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                {pillar.proof}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};
