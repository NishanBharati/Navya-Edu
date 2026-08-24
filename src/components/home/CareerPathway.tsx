import React from 'react';
import { Briefcase, ArrowUpRight, Compass, ShieldCheck, TrendingUp, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';

export const CareerPathway: React.FC = () => {
  const pathways = [
    {
      role: 'Full Stack & Backend Developer',
      description: 'Engineering responsive web apps, high-throughput REST APIs, microservices, and database models.',
      technologies: 'React, Node.js, Express, PostgreSQL, TypeScript, Next.js',
      salaryRange: 'NPR 45,000 – 120,000 / mo',
      demand: 'High Demand'
    },
    {
      role: 'Applied AI & Data Engineer',
      description: 'Building machine learning inference pipelines, vector search systems, and data analytics dashboards.',
      technologies: 'Python, Pandas, Scikit-Learn, SQL, FastAPI, PyTorch',
      salaryRange: 'NPR 50,000 – 130,000 / mo',
      demand: 'Rapidly Growing'
    },
    {
      role: 'Cross-Platform Mobile Developer',
      description: 'Developing high-performance iOS and Android digital products with smooth native integrations.',
      technologies: 'Flutter, Dart, BLoC, Firebase, SQLite, REST APIs',
      salaryRange: 'NPR 40,000 – 100,000 / mo',
      demand: 'High Demand'
    },
    {
      role: 'UI/UX & Digital Product Designer',
      description: 'Architecting scalable Figma design systems, user journey wireframes, and design token handoffs.',
      technologies: 'Figma, Design Systems, UX Research, Prototyping',
      salaryRange: 'NPR 40,000 – 95,000 / mo',
      demand: 'Steady Demand'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              eyebrow="Industry Outcomes"
              title="Where Practical Technical Competence Leads."
              description="Rather than offering hollow placement promises, we focus on engineering rigor, clean code portfolios, and interview preparedness that employers respect."
            />

            <div className="p-6 bg-white rounded-2xl border border-[#E5DFD4] space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#17324D] uppercase tracking-wider">
                <Compass className="w-4 h-4 text-[#356A9A]" />
                <span>Our Career Transition Philosophy</span>
              </div>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Hiring managers in Nepal and international remote companies evaluate verifiable proof-of-work: your ability to explain database indexing, resolve Git merge conflicts, write unit-testable code, and present deployed applications.
              </p>

              <div className="pt-2 border-t border-[#F0ECE1] flex items-center gap-2 text-xs text-[#171A1F] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#718C7A]" />
                <span>Placement Support & 40+ Partner Tech Employers</span>
              </div>
            </div>

            <div className="pt-1">
              <Button variant="primary" size="md" href="/contact">
                Talk to a Career Transition Coach
              </Button>
            </div>
          </div>

          {/* Right Column: Roles Grid */}
          <div className="lg:col-span-7 space-y-4">
            {pathways.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-2xl border border-[#E5DFD4] hover:border-[#17324D]/30 transition-all shadow-2xs hover:shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-[#171A1F]">
                      {item.role}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-[#718C7A]/20 text-[#3D5644] w-fit">
                    {item.demand}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-[#F0ECE1] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-[#17324D]">
                    <span className="font-semibold text-gray-500">Core Stack: </span>
                    <span className="font-mono text-[#17324D] font-medium">{item.technologies}</span>
                  </div>
                  <div className="text-[11px] font-bold text-[#356A9A] font-mono">
                    {item.salaryRange}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
