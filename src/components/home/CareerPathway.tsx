import React from 'react';
import { Briefcase, ArrowUpRight, Compass, ShieldCheck } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const CareerPathway: React.FC = () => {
  const pathways = [
    {
      role: 'Full Stack & Web Developer',
      description: 'Building modern responsive web applications, robust REST APIs, and database architectures for tech companies and digital agencies.',
      technologies: 'React, Node.js, Express, MongoDB, TypeScript, Next.js'
    },
    {
      role: 'Data Analyst & ML Specialist',
      description: 'Transforming enterprise data into actionable predictive insights, statistical models, and production FastAPI services.',
      technologies: 'Python, Pandas, Scikit-Learn, SQL, FastAPI'
    },
    {
      role: 'UI/UX & Product Designer',
      description: 'Architecting design systems, user journeys, accessible components, and high-fidelity prototypes in Figma.',
      technologies: 'Figma, Design Systems, UX Research, Prototyping'
    },
    {
      role: 'DevOps & Cloud Administrator',
      description: 'Managing automated deployment pipelines, Docker containerized workloads, Linux servers, and AWS cloud services.',
      technologies: 'Docker, Linux, AWS, GitHub Actions, Nginx'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-5">
            <SectionHeader
              eyebrow="Career Outcomes"
              title="Where practical technical skills lead."
              description="Rather than offering unsubstantiated placement promises, we focus on engineering rigor, clean code portfolios, and interview readiness that employers respect."
            />

            <div className="p-5 bg-white rounded-xl border border-[#E5DFD4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#17324D] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#356A9A]" />
                <span>Our Career Philosophy</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Hiring managers evaluate verifiable capabilities: your ability to explain database indexes, demonstrate Git collaboration, write clean unit-testable code, and present deployed applications.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {pathways.map((item, idx) => (
              <div
                key={idx}
                className="p-5 bg-white rounded-xl border border-[#E5DFD4] hover:border-[#17324D]/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#171A1F]">
                    {item.role}
                  </h3>
                  <Briefcase className="w-4 h-4 text-[#356A9A]" />
                </div>
                <p className="mt-1.5 text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-3 pt-2 border-t border-[#F0ECE1] flex items-center gap-2 text-xs text-[#17324D]">
                  <span className="font-semibold">Core Stack:</span>
                  <span className="font-mono text-[#5F6670]">{item.technologies}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
