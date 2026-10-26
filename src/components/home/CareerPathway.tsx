import React from 'react';
import { Briefcase, Compass, ShieldCheck, CheckCircle2, MessageSquare } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

interface CareerPathwayProps {
  onOpenAdvisor?: () => void;
}

export const CareerPathway: React.FC<CareerPathwayProps> = ({ onOpenAdvisor }) => {
  const pathways = [
    {
      role: 'Modern Web & Frontend Developer',
      description: 'Crafting responsive websites, interactive JavaScript-driven interfaces, and connecting RESTful APIs.',
      technologies: 'HTML5, CSS3, Tailwind CSS, JavaScript ES6+, Vercel',
      salaryRange: 'NPR 40,000 to 105,000 / mo',
      demand: 'High Demand',
    },
    {
      role: 'Python & Backend Software Engineer',
      description: 'Building high-throughput asynchronous REST microservices, database ORMs, automation tools, and modular systems.',
      technologies: 'Python 3.12, FastAPI, SQLAlchemy, AsyncIO, Pydantic, Git',
      salaryRange: 'NPR 45,000 to 115,000 / mo',
      demand: 'Rapidly Growing',
    },
    {
      role: 'Data Analyst & Machine Learning Practitioner',
      description: 'Extracting data intelligence, performing statistical modeling, and deploying predictive machine learning models.',
      technologies: 'Python, Pandas, NumPy, SQL, Scikit-Learn, Matplotlib',
      salaryRange: 'NPR 45,000 to 120,000 / mo',
      demand: 'High Demand',
    },
    {
      role: 'Junior Programmer & Automation Developer',
      description: 'Writing clean idiomatic scripts, building CLI utilities, handling structured files, and automating repetitive tasks.',
      technologies: 'Python, Git, GitHub, JSON/CSV Parsing, OOP Fundamentals',
      salaryRange: 'NPR 30,000 to 65,000 / mo',
      demand: 'Steady Demand',
    },
  ];

  return (
    <section id="career-pathway-section" className="section-y bg-paper">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              eyebrow="Realistic Career Pathways"
              title="Where practical technical competence leads."
              description="Rather than offering hollow placement guarantees, we focus on engineering rigor, clean code portfolios, and technical interview preparedness that hiring managers respect."
            />

            <Reveal delay={0.06} className="p-6 bg-paper-alt rounded-2xl border border-border space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                <Compass className="w-4 h-4 text-blue" />
                <span>Our Career Transition Philosophy</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Hiring managers in Nepal and international remote companies evaluate verifiable proof-of-work: your ability to explain database indexing, resolve Git merge conflicts, write testable code, and present deployed web applications.
              </p>

              <div className="pt-2 border-t border-border-faint space-y-2 text-xs text-ink font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span>Technical resume & GitHub portfolio auditing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span>Mock system design & live coding interview prep</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage shrink-0" />
                  <span>Direct referrals to Navya EdTech engineering & tech network</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="pt-1">
              {onOpenAdvisor ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onOpenAdvisor}
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  Talk to a Career Transition Coach
                </Button>
              ) : (
                <Button variant="primary" size="md" href="/contact">
                  Talk to a Career Transition Coach
                </Button>
              )}
            </Reveal>
          </div>

          {/* Right Column: Roles Directory */}
          <Stagger className="lg:col-span-7 bg-white rounded-3xl border border-border shadow-sm overflow-hidden divide-y divide-border-soft">
            {pathways.map((item, idx) => (
              <StaggerItem
                key={idx}
                className="group p-6 sm:p-7 transition-colors duration-180 hover:bg-paper"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-navy/[0.06] text-navy grid place-items-center shrink-0 transition-colors duration-180 group-hover:bg-navy group-hover:text-white">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="text-[17px] font-semibold tracking-[-0.015em] text-ink">
                      {item.role}
                    </h3>
                  </div>

                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-sage-light text-sage-ink border border-sage/20 w-fit">
                    {item.demand}
                  </span>
                </div>

                <p className="mt-3 text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 pt-4 border-t border-border-soft flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px]">
                  <div>
                    <span className="font-semibold text-ink-soft">Core Stack: </span>
                    <span className="text-navy font-medium">{item.technologies}</span>
                  </div>
                  <div className="text-[13px] font-medium text-navy font-mono tabular-nums whitespace-nowrap">
                    {item.salaryRange}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
};
