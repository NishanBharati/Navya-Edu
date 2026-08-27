import React from 'react';
import { BookOpen, Code, GitBranch, Rocket } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const LearningExperience: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Architect & Conceptualize',
      description: 'Foundational concepts introduced through structured live sessions, terminal demonstrations, and interactive system architecture diagrams.',
      detail: 'Core theory & diagrams',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      number: '02',
      title: 'Keyboard-On-Code Sprints',
      description: 'Daily laboratory coding sessions where students build architectural muscle memory by writing production code, handling errors, and writing tests.',
      detail: 'Hands-on lab practice',
      icon: <Code className="w-4 h-4" />
    },
    {
      number: '03',
      title: 'Line-by-Line PR Reviews',
      description: 'Senior software architects review every student pull request on GitHub for clean architecture, naming conventions, and OWASP security standards.',
      detail: 'GitHub code critiques',
      icon: <GitBranch className="w-4 h-4" />
    },
    {
      number: '04',
      title: 'Cloud Deploy & Defense',
      description: 'Deploying multi-tier applications to live cloud servers, configuring CI/CD pipelines, and presenting technical project defenses to hiring panels.',
      detail: 'Production deployment',
      icon: <Rocket className="w-4 h-4" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-paper-alt border-b border-border">
      <Container>
        <SectionHeader
          title="From first line of code to production deployment."
          description="We reject passive video consumption and exam cramming. Our instructional model is engineered around deliberate coding practice and continuous architectural feedback."
        />

        <div className="relative mt-14 sm:mt-16">
          {/* Connecting rail — only reads correctly once steps sit in a single row */}
          <div className="hidden lg:block absolute top-5.5 left-0 right-0 h-px bg-input-border" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {steps.map((step) => (
              <div key={step.number} className="flex lg:block items-start gap-4">
                <div className="relative z-10 w-11 h-11 rounded-full bg-navy text-white flex items-center justify-center font-heading font-bold text-sm shrink-0">
                  {step.number}
                </div>
                <div className="lg:mt-5 space-y-2">
                  <div className="flex items-center gap-2 text-blue">
                    {step.icon}
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      {step.detail}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-ink leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {step.description}
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
