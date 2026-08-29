import React from 'react';
import { Briefcase, Compass, ShieldCheck } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';

export const CareerPathway: React.FC = () => {
  const pathways = [
    {
      role: 'Modern Web & Frontend Developer',
      description: 'Crafting responsive websites, interactive JavaScript-driven interfaces, and connecting RESTful APIs.',
      technologies: 'HTML5, CSS3, Tailwind CSS, JavaScript ES6+, Vercel',
      salaryRange: 'NPR 40,000 – 105,000 / mo',
      demand: 'High Demand'
    },
    {
      role: 'Python & Backend Software Engineer',
      description: 'Building high-throughput asynchronous REST microservices, database ORMs, automation tools, and modular systems.',
      technologies: 'Python 3.12, FastAPI, SQLAlchemy, AsyncIO, Pydantic, Git',
      salaryRange: 'NPR 45,000 – 115,000 / mo',
      demand: 'Rapidly Growing'
    },
    {
      role: 'Data Analyst & Machine Learning Practitioner',
      description: 'Extracting data intelligence, performing statistical modeling, and deploying predictive machine learning models.',
      technologies: 'Python, Pandas, NumPy, SQL, Scikit-Learn, Matplotlib',
      salaryRange: 'NPR 45,000 – 120,000 / mo',
      demand: 'High Demand'
    },
    {
      role: 'Junior Programmer & Automation Developer',
      description: 'Writing clean idiomatic scripts, building CLI utilities, handling structured files, and automating repetitive tasks.',
      technologies: 'Python, Git, GitHub, JSON/CSV Parsing, OOP Fundamentals',
      salaryRange: 'NPR 30,000 – 65,000 / mo',
      demand: 'Steady Demand'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-paper-alt border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              title="Where practical technical competence leads."
              description="Rather than offering hollow placement promises, we focus on engineering rigor, clean code portfolios, and interview preparedness that employers respect."
            />

            <div className="p-6 bg-white rounded-2xl border border-border-warm space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                <Compass className="w-4 h-4 text-blue" />
                <span>Our Career Transition Philosophy</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Hiring managers in Nepal and international remote companies evaluate verifiable
                proof-of-work: your ability to explain database indexing, resolve Git merge
                conflicts, write unit-testable code, and present deployed applications.
              </p>

              <div className="pt-2 border-t border-border-faint flex items-center gap-2 text-xs text-ink font-semibold">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>Placement Support & Partner Tech Employer Network</span>
              </div>
            </div>

            <div className="pt-1">
              <Button variant="primary" size="md" href="/contact">
                Talk to a Career Transition Coach
              </Button>
            </div>
          </div>

          {/* Right Column: Roles Directory */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border-warm shadow-xs overflow-hidden">
            {pathways.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 transition-colors duration-150 hover:bg-paper ${
                  idx !== 0 ? 'border-t border-border-faint' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-navy/10 text-navy flex items-center justify-center shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-ink">
                      {item.role}
                    </h3>
                  </div>

                  <span className="text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full bg-sage/20 text-sage-ink w-fit">
                    {item.demand}
                  </span>
                </div>

                <p className="mt-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-3 pt-3 border-t border-border-faint flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-ink-soft">Core Stack: </span>
                    <span className="text-navy font-medium">{item.technologies}</span>
                  </div>
                  <div className="text-[11px] font-bold text-blue font-mono">
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
