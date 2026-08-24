import React from 'react';
import { BookOpen, Code, Terminal, CheckSquare, Cloud, Presentation } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const CourseLearningJourney: React.FC = () => {
  const stages = [
    {
      step: '01',
      title: 'Learn',
      description: 'Core theoretical and architectural principles delivered via instructor-led live sessions.',
      icon: <BookOpen className="w-4 h-4 text-[#356A9A]" />
    },
    {
      step: '02',
      title: 'Practice',
      description: 'Immediate laboratory coding challenges where you apply syntax and solve edge cases.',
      icon: <Code className="w-4 h-4 text-[#356A9A]" />
    },
    {
      step: '03',
      title: 'Build',
      description: 'Constructing multi-tier features with database integration, state management, and API design.',
      icon: <Terminal className="w-4 h-4 text-[#356A9A]" />
    },
    {
      step: '04',
      title: 'Review',
      description: 'Structured 1-on-1 code reviews with senior engineering leads to refactor bottlenecks.',
      icon: <CheckSquare className="w-4 h-4 text-[#356A9A]" />
    },
    {
      step: '05',
      title: 'Deploy',
      description: 'Publishing production containers, configuring environment variables, and setting up CI/CD.',
      icon: <Cloud className="w-4 h-4 text-[#356A9A]" />
    },
    {
      step: '06',
      title: 'Present',
      description: 'Defending your system architecture during a capstone presentation with live Q&A.',
      icon: <Presentation className="w-4 h-4 text-[#356A9A]" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <SectionHeader
          eyebrow="Methodology"
          title="How You'll Learn"
          description="A continuous cycle of conceptual understanding, guided coding sprints, and production deployment."
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {stages.map((stage) => (
            <div
              key={stage.step}
              className="p-5 bg-white rounded-xl border border-[#E8E4DA] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-lg text-[#17324D]">
                    {stage.step}
                  </span>
                  <div className="w-7 h-7 rounded-md bg-[#F4F1EA] flex items-center justify-center">
                    {stage.icon}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-[#171A1F]">
                  {stage.title}
                </h3>
              </div>

              <p className="text-xs text-[#5F6670] leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
