import React from 'react';
import { Terminal, Cpu, Briefcase, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { DarkCTACard } from '../common/DarkCTACard';

export const TrustIntro: React.FC = () => {
  const pillars = [
    {
      title: 'Production-First Stacks',
      description: 'We reject outdated college syllabi. Students master modern Python, JavaScript ES6+, Tailwind CSS, FastAPI, and Data Science workflows currently demanded by modern technology firms.',
      proof: 'Zero legacy syntax or toy projects',
      icon: <Terminal className="w-5 h-5" />
    },
    {
      title: 'Continuous Code Reviews',
      description: 'Every line of code you write is inspected on GitHub by senior software engineers — error boundaries, OWASP security standards, naming conventions, and clean architectural design.',
      proof: 'Line-by-line feedback on every pull request',
      icon: <Cpu className="w-5 h-5" />
    },
    {
      title: 'Verifiable Proof-of-Work',
      description: 'Graduates leave with live-deployed applications, clean GitHub repositories, and structured technical documentation that prove real capability to hiring managers in Nepal and abroad.',
      proof: 'Live custom domain deployments',
      icon: <Briefcase className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-14 sm:py-20 bg-paper-alt border-b border-border">
      <Container>
        <DarkCTACard decoration="dots" className="p-8 sm:p-12 lg:p-14">
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-12 lg:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
              Technology education engineered by software practitioners.
            </h2>
            <p className="text-sm sm:text-base text-mist leading-relaxed">
              Navya Ed Tech is the dedicated technology education division of{' '}
              <strong className="text-white font-semibold">Navya EdTech</strong> — our parent
              commercial software company. We translate active production practices, architecture
              patterns, and live bug reviews directly into modern classroom and online training.
            </p>
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
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
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
