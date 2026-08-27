import React from 'react';
import { ArrowUpRight, Code, Smartphone, Brain, Cloud, Palette, Shield, Building2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const WhyNavya: React.FC = () => {
  const capabilities = [
    {
      title: 'Full-Stack Software Engineering',
      description: 'Production web apps, microservices, high-throughput REST APIs, and database modeling with TypeScript & Node.js.',
      icon: <Code className="w-4.5 h-4.5" />,
      tag: 'Core discipline',
      featured: true
    },
    {
      title: 'Cross-Platform Mobile Apps',
      description: 'Smooth 60fps native and hybrid mobile digital products for iOS and Android using Flutter & Dart.',
      icon: <Smartphone className="w-4.5 h-4.5" />,
      tag: 'Mobile engineering'
    },
    {
      title: 'Applied AI & Data Systems',
      description: 'Retrieval-augmented generation (RAG), vector databases, predictive ML pipelines, and Python analytics.',
      icon: <Brain className="w-4.5 h-4.5" />,
      tag: 'Generative AI'
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      description: 'Docker containerization, automated GitHub Actions CI/CD pipelines, and AWS cloud architecting.',
      icon: <Cloud className="w-4.5 h-4.5" />,
      tag: 'Cloud-native'
    },
    {
      title: 'Digital Product & UI/UX Design',
      description: 'Design tokens, auto-layout component systems, Figma design libraries, and user research protocols.',
      icon: <Palette className="w-4.5 h-4.5" />,
      tag: 'Design systems'
    },
    {
      title: 'Cybersecurity & Defense',
      description: 'Vulnerability assessment, OWASP Top 10 mitigation, token security, and secure API audits.',
      icon: <Shield className="w-4.5 h-4.5" />,
      tag: 'Security auditing'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-paper-alt border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Story & Parent Company Link */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              title="Learn the exact technologies used to engineer real digital products."
              description="Most training institutes operate as isolated testing centers. Navya Ed Tech is directly integrated with an active software engineering enterprise in Nepal."
            />

            <div className="p-6 rounded-2xl bg-white border border-border-warm space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue">
                  Parent Tech Enterprise
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Our parent company, <strong className="text-ink">Navya EdTech</strong>,
                engineers digital products, cloud platforms, and mobile apps for commercial
                clients. This directly informs our curriculum standards, coding conventions, and
                architectural reviews.
              </p>

              <div className="pt-2 border-t border-border-faint">
                <a
                  href="https://navyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep active:scale-[0.97] transition-all duration-150"
                >
                  <span>Explore navyaedtech.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-navy-mist transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Real Engineering Disciplines */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border-warm shadow-xs overflow-hidden">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 sm:p-6 transition-colors duration-150 hover:bg-paper ${
                  i !== 0 ? 'border-t border-border-faint' : ''
                } ${cap.featured ? 'bg-navy/3' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  {cap.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3
                      className={`font-bold text-ink ${
                        cap.featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                      }`}
                    >
                      {cap.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-ink-faint whitespace-nowrap">
                      {cap.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
