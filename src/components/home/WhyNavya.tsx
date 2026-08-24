import React from 'react';
import { ArrowUpRight, Code, Smartphone, Brain, Cloud, Palette, Shield, Building2, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const WhyNavya: React.FC = () => {
  const capabilities = [
    {
      title: 'Full-Stack Software Engineering',
      description: 'Production web apps, microservices, high-throughput REST APIs, and database modeling with TypeScript & Node.js.',
      icon: <Code className="w-5 h-5" />,
      tag: 'Core Discipline'
    },
    {
      title: 'Cross-Platform Mobile Apps',
      description: 'Smooth 60fps native and hybrid mobile digital products for iOS and Android using Flutter & Dart.',
      icon: <Smartphone className="w-5 h-5" />,
      tag: 'Mobile Engineering'
    },
    {
      title: 'Applied AI & Data Systems',
      description: 'Retrieval-augmented generation (RAG), vector databases, predictive ML pipelines, and Python analytics.',
      icon: <Brain className="w-5 h-5" />,
      tag: 'Generative AI'
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      description: 'Docker containerization, automated GitHub Actions CI/CD pipelines, and AWS cloud architecting.',
      icon: <Cloud className="w-5 h-5" />,
      tag: 'Cloud-Native'
    },
    {
      title: 'Digital Product & UI/UX Design',
      description: 'Design tokens, auto-layout component systems, Figma design libraries, and user research protocols.',
      icon: <Palette className="w-5 h-5" />,
      tag: 'Design Systems'
    },
    {
      title: 'Cybersecurity & Defense',
      description: 'Vulnerability assessment, OWASP Top 10 mitigation, token security, and secure API audits.',
      icon: <Shield className="w-5 h-5" />,
      tag: 'Security Auditing'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Story & Parent Company Link */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              eyebrow="Commercial Engineering Synergy"
              title="Learn the exact technologies used to engineer real digital products."
              description="Most training institutes operate as isolated testing centers. Navya Ed Tech is directly integrated with an active software engineering enterprise in Nepal."
            />

            <div className="p-6 rounded-2xl bg-white border border-[#E5DFD4] space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#356A9A]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#356A9A]">
                  Parent Tech Enterprise
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Our parent company, <strong className="text-[#171A1F]">Navya EdTech</strong>, engineers digital products, cloud platforms, and mobile apps for commercial clients. This directly informs our curriculum standards, coding conventions, and architectural reviews.
              </p>

              <div className="pt-2 border-t border-[#F0ECE1]">
                <a
                  href="https://navyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#17324D] text-white text-xs font-bold hover:bg-[#12283E] transition-colors shadow-xs"
                >
                  <span>Explore navyaedtech.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#9BBAD4]" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Grid of Real Engineering Disciplines */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-2xl border border-[#E5DFD4] hover:border-[#17324D]/30 transition-all space-y-3 shadow-2xs hover:shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                    {cap.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-[#F4F1EA] text-[#5F6670] border border-[#E8E4DA]">
                    {cap.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#171A1F]">
                  {cap.title}
                </h3>
                <p className="text-xs text-[#5F6670] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
