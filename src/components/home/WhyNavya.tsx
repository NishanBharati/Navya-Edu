import React from 'react';
import { ArrowUpRight, Code, Terminal, BarChart3, Gamepad2, GitBranch, Users, Building2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

export const WhyNavya: React.FC = () => {
  const capabilities = [
    {
      title: 'Modern Web Craftsmanship',
      description: 'Semantic HTML5, responsive Tailwind CSS layouts, and modern JavaScript ES6+ application logic for interactive user interfaces.',
      icon: <Code className="w-4.5 h-4.5" />,
      tag: 'Frontend & UI',
      featured: true
    },
    {
      title: 'Python Software Engineering',
      description: 'Clean object-oriented architecture, modular automation scripting, asynchronous concurrency, and high-performance FastAPI microservices.',
      icon: <Terminal className="w-4.5 h-4.5" />,
      tag: 'Backend & Core',
      featured: true
    },
    {
      title: 'Applied Data Science & ML',
      description: 'Exploratory data analysis, Pandas, NumPy, statistical hypothesis testing, and predictive machine learning models using Scikit-Learn.',
      icon: <BarChart3 className="w-4.5 h-4.5" />,
      tag: 'Analytics & AI'
    },
    {
      title: 'STEM & Early Coding Logic',
      description: 'Visual block programming in Scratch 3.0, computational thinking, 2D arcade physics, and interactive problem solving for young learners.',
      icon: <Gamepad2 className="w-4.5 h-4.5" />,
      tag: 'Kids Coding'
    },
    {
      title: 'Verifiable Production Workflows',
      description: 'Line-by-line pull request reviews on GitHub, Git branching strategies, clean code standards, and live deployments on Vercel.',
      icon: <GitBranch className="w-4.5 h-4.5" />,
      tag: 'Engineering rigor'
    },
    {
      title: 'Direct Industry Mentorship',
      description: 'Learn directly from active software developers and technical trainers at Navya EdTech with personalized feedback in small cohorts.',
      icon: <Users className="w-4.5 h-4.5" />,
      tag: 'Mentorship desk'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-paper-alt border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Story & Parent Company Link */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              title="Learn the exact technologies used to engineer real digital products."
              description="Most training institutes operate as isolated testing centers. Navya Ed Tech is directly integrated with an active software engineering enterprise in Nepal."
            />

            <div className="p-6 rounded-2xl bg-white border border-border-warm space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue">
                  Parent Tech Enterprise
                </span>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Our parent company, <strong className="text-ink">Navya EdTech</strong>,
                engineers digital products, cloud platforms, and mobile apps for commercial
                clients. This directly informs our curriculum standards, coding conventions, and
                architectural reviews.
              </p>

              <div className="pt-2 border-t border-border-faint">
                <a
                  href="https://navyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep active:scale-[0.97] transition-all duration-150"
                >
                  <span>Explore navyaedtech.com</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-navy-mist transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Real Engineering Disciplines */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-border-warm shadow-xs overflow-hidden">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 p-5 sm:p-6 transition-colors duration-150 hover:bg-paper ${
                  i !== 0 ? 'border-t border-border-faint' : ''
                } ${cap.featured ? 'bg-navy/3' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  {cap.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <h3
                      className={`font-bold text-ink ${
                        cap.featured ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
                      }`}
                    >
                      {cap.title}
                    </h3>
                    <span className="text-[11px] font-semibold text-ink-faint whitespace-nowrap">
                      {cap.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {cap.description}
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
