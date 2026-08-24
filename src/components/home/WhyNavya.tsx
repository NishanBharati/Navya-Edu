import React from 'react';
import { ArrowUpRight, Code, Smartphone, Brain, Cloud, Palette, GitBranch, Shield, Server } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const WhyNavya: React.FC = () => {
  const capabilities = [
    {
      title: 'Full-Stack Software Engineering',
      description: 'Web application development, high-throughput microservices, and distributed architectures.',
      icon: <Code className="w-5 h-5" />,
      tag: 'Core Discipline'
    },
    {
      title: 'Mobile App Engineering',
      description: 'Native and cross-platform mobile experiences for iOS and Android with Flutter.',
      icon: <Smartphone className="w-5 h-5" />,
      tag: 'Cross-Platform'
    },
    {
      title: 'Applied AI & Data Systems',
      description: 'Data analytics, predictive machine learning pipelines, and vector search embeddings.',
      icon: <Brain className="w-5 h-5" />,
      tag: 'Modern AI'
    },
    {
      title: 'Cloud Infrastructure & DevOps',
      description: 'Containerization with Docker, automated CI/CD pipelines, and AWS cloud management.',
      icon: <Cloud className="w-5 h-5" />,
      tag: 'Cloud-Native'
    },
    {
      title: 'Digital Product & UI/UX Design',
      description: 'User research, design tokens, responsive Figma libraries, and accessibility standards.',
      icon: <Palette className="w-5 h-5" />,
      tag: 'Design Systems'
    },
    {
      title: 'Cybersecurity & Defense',
      description: 'Vulnerability assessment, network forensics, and web application security auditing.',
      icon: <Shield className="w-5 h-5" />,
      tag: 'Information Security'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Parent Company Link */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              eyebrow="Industry Connection"
              title="Learn the technologies used to build real digital products."
              description="Most training institutes operate as isolated testing centers. Navya Ed Tech is directly integrated with an active technology engineering company."
            />

            <div className="p-5 rounded-xl bg-white border border-[#E5DFD4] space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A] block">
                Parent Company Connection
              </span>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Our parent organization, <strong className="text-[#171A1F]">Navya EdTech</strong>, engineers digital products, cloud platforms, and mobile apps for commercial clients. This directly informs our curriculum standards and coding guidelines.
              </p>
              <a
                href="https://navyaedtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17324D] hover:text-[#356A9A] transition-colors pt-1"
              >
                <span>Visit navyaedtech.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Grid of Real Engineering Disciplines */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-5 bg-white rounded-xl border border-[#E5DFD4] hover:border-[#17324D]/30 transition-colors space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                    {cap.icon}
                  </div>
                  <span className="text-[10px] font-mono font-medium tracking-wide uppercase px-2 py-0.5 rounded bg-[#F4F1EA] text-[#5F6670]">
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
