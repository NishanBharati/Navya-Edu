import React from 'react';
import { Terminal, Cpu, Briefcase, CheckCircle2, ShieldCheck, Building2, MapPin } from 'lucide-react';
import { Container } from '../common/Container';
import { DarkCTACard } from '../common/DarkCTACard';
import { AnimatedCounter } from '../common/StatCounter';

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
      description: 'Every line of student code is submitted via GitHub pull requests and inspected by senior software engineers—validating error boundaries, OWASP security, modular design, and clean naming.',
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

  return (
    <section id="trust-section" className="py-14 sm:py-20 bg-paper-alt border-b border-border">
      <Container>
        <DarkCTACard decoration="dots" className="p-8 sm:p-12 lg:p-14">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-10 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-white border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-sage" />
              <span>Verified Institutional Foundation</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Technology education engineered by active software practitioners.
            </h2>
            <p className="text-sm sm:text-base text-mist leading-relaxed">
              Navya Ed Tech is the dedicated technology education division of{' '}
              <strong className="text-white font-semibold">Navya EdTech</strong>—a Kathmandu-based commercial software enterprise. We bring live engineering practices, architecture patterns, and production debugging directly into classroom labs and interactive online cohorts.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-navy-mist">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-sage" />
                <span>Commercial Parent Enterprise Lineage</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sage" />
                <span>Putalisadak, Kathmandu Physical Lab</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                <span>
                  <AnimatedCounter prefix="1:" from={1} to={12} duration={900} /> Small Cohort Cap
                </span>
              </span>
            </div>

            {/* Animated Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-center">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-extrabold text-white">
                  <AnimatedCounter prefix="1:" from={1} to={12} duration={900} />
                </span>
                <span className="text-[11px] text-navy-mist">Mentor Ratio Cap</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-extrabold text-white">
                  <AnimatedCounter from={0} to={100} suffix="%" duration={1100} />
                </span>
                <span className="text-[11px] text-navy-mist">PR Review Coverage</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-extrabold text-white">
                  <AnimatedCounter from={0} to={30} suffix="+" duration={1000} />
                </span>
                <span className="text-[11px] text-navy-mist">Reference Capstones</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="block text-xl sm:text-2xl font-extrabold text-white">0</span>
                <span className="text-[11px] text-navy-mist">Manufactured Claims</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-white/10">
            {pillars.map((pillar, i) => (
              <div
                key={i}
                className={`md:px-8 space-y-3 ${
                  i !== 0 ? 'pt-8 md:pt-0 border-t border-white/10 md:border-t-0' : ''
                }`}
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 text-navy-mist flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A9B8C7] leading-relaxed">
                  {pillar.description}
                </p>
                <div className="pt-2 flex items-start gap-1.5 text-[11px] font-semibold text-navy-mist">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sage" />
                  <span>{pillar.proof}</span>
                </div>
              </div>
            ))}
          </div>
        </DarkCTACard>
      </Container>
    </section>
  );
};
