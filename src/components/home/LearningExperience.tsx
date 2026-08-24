import React from 'react';
import { BookOpen, Code, Terminal, Rocket, Check, GitBranch, ShieldCheck, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const LearningExperience: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Architect & Conceptualize',
      description: 'Foundational concepts introduced through structured live sessions, terminal demonstrations, and interactive system architecture diagrams.',
      detail: 'Core Theory & Diagrams',
      icon: <BookOpen className="w-5 h-5 text-[#356A9A]" />
    },
    {
      number: '02',
      title: 'Keyboard-On-Code Sprints',
      description: 'Daily laboratory coding sessions where students build architectural muscle memory by writing production code, handling errors, and writing tests.',
      detail: 'Hands-on Lab Practice',
      icon: <Code className="w-5 h-5 text-[#356A9A]" />
    },
    {
      number: '03',
      title: 'Line-by-Line PR Reviews',
      description: 'Senior software architects review every student pull request on GitHub for clean architecture, naming conventions, and OWASP security standards.',
      detail: 'GitHub Code Critiques',
      icon: <GitBranch className="w-5 h-5 text-[#356A9A]" />
    },
    {
      number: '04',
      title: 'Cloud Deploy & Defense',
      description: 'Deploying multi-tier applications to live cloud servers, configuring CI/CD pipelines, and presenting technical project defenses to hiring panels.',
      detail: 'Production Deployment',
      icon: <Rocket className="w-5 h-5 text-[#356A9A]" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <SectionHeader
          eyebrow="Pedagogical Standard"
          title="From First Line of Code to Production Deployment"
          description="We reject passive video consumption and exam cramming. Our instructional model is engineered around deliberate coding practice and continuous architectural feedback."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 bg-white rounded-2xl border border-[#E5DFD4] shadow-xs flex flex-col justify-between space-y-6 hover:border-[#17324D]/40 transition-all"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3 mb-4">
                  <span className="font-heading font-extrabold text-2xl text-[#17324D]">
                    {step.number}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#F4F1EA] flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#171A1F]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1] flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#356A9A] tracking-wider uppercase">
                  {step.detail}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#718C7A]" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
