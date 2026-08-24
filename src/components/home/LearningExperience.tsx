import React from 'react';
import { BookOpen, Code, Terminal, Rocket } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const LearningExperience: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Learn',
      description: 'Foundational concepts introduced through structured live lectures, interactive architecture diagrams, and clean code examples.',
      detail: 'Core Theory & Concepts',
      icon: <BookOpen className="w-5 h-5 text-[#356A9A]" />
    },
    {
      number: '02',
      title: 'Practice',
      description: 'Daily laboratory assignments where students write code under instructor guidance, refactor solutions, and resolve errors.',
      detail: 'Hands-on Lab Sprints',
      icon: <Code className="w-5 h-5 text-[#356A9A]" />
    },
    {
      number: '03',
      title: 'Build',
      description: 'Architecting multi-tier projects under real-world technical constraints, integrating APIs, databases, and authentication.',
      detail: 'Capstone Development',
      icon: <Terminal className="w-5 h-5 text-[#356A9A]" />
    },
    {
      number: '04',
      title: 'Apply',
      description: 'Deploying live systems to cloud servers, participating in code reviews, and defending technical architectural decisions.',
      detail: 'Review & Cloud Deploy',
      icon: <Rocket className="w-5 h-5 text-[#356A9A]" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <SectionHeader
          eyebrow="Pedagogy & Workflow"
          title="From Learning to Building"
          description="We avoid passive video consumption. Our instructional model is structured around continuous deliberate practice and engineering rigor."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 bg-white rounded-xl border border-[#E5DFD4] flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3 mb-4">
                  <span className="font-heading font-extrabold text-2xl text-[#17324D]">
                    {step.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#F4F1EA] flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#171A1F]">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0ECE1]">
                <span className="text-[11px] font-mono font-medium text-[#356A9A] tracking-wider uppercase">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
