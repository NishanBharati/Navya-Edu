import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../data/studentProjects';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { SEOHead } from '../components/common/SEOHead';
import { Layers, Terminal, Sparkles, Check } from 'lucide-react';

export const StudentWork: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Web', 'Mobile', 'AI', 'UI/UX', 'Data'];

  const filteredProjects = STUDENT_PROJECTS.filter((p) => {
    return selectedFilter === 'All' || p.category === selectedFilter;
  });

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="Student Work & Capstone Projects | Navya Ed Tech"
        description="Explore verifiable capstone projects built by Navya Ed Tech students across Web, Mobile, Data Science, AI, and UI/UX Design."
      />

      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            Verified Portfolio
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F]">
            Student Work & Capstone Showcase
          </h1>
          <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
            Every project below was engineered as an end-of-module capstone or graduation deliverable under strict code review guidelines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-[#E8E4DA] scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === cat
                  ? 'bg-[#17324D] text-white shadow-sm'
                  : 'bg-white text-[#5F6670] border border-[#E5DFD4] hover:text-[#171A1F] hover:bg-[#F4F1EA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="bg-white border border-[#E8E4DA] rounded-2xl overflow-hidden shadow-sm hover:border-[#17324D]/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Project Screenshot Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-mono font-medium text-[#356A9A] tracking-wider uppercase block mb-1">
                      {project.completionContext}
                    </span>
                    <h3 className="text-lg font-bold text-[#171A1F] leading-snug">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-[#F0ECE1]">
                    <span className="text-[11px] font-semibold text-[#8C939E] uppercase tracking-wider block">
                      Engineering Highlights:
                    </span>
                    <ul className="space-y-1 text-xs text-[#171A1F]">
                      {project.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#718C7A] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Technologies strip */}
              <div className="px-6 pb-6 pt-3 border-t border-[#F0ECE1]">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-[#F4F1EA] text-[#17324D] font-mono border border-[#E8E3D8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
};
