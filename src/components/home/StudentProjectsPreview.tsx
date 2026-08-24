import React from 'react';
import { ArrowRight, Layers } from 'lucide-react';
import { STUDENT_PROJECTS } from '../../data/studentProjects';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const StudentProjectsPreview: React.FC = () => {
  // Show first 3 projects on home
  const previewProjects = STUDENT_PROJECTS.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Proof of Work"
            title="What Students Build"
            description="Instead of fabricated claims, we let the quality of engineering work speak for itself. Explore capstone projects developed during our training programs."
          />
          <div className="shrink-0">
            <Button
              variant="outline"
              size="md"
              href="/student-work"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Student Projects
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {previewProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white border border-[#E8E4DA] rounded-xl overflow-hidden hover:border-[#17324D]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  <span className="text-[11px] font-mono text-[#356A9A] tracking-wider uppercase block">
                    {project.completionContext}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#171A1F] leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-[#F0ECE1]">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#F4F1EA] text-[#17324D] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded text-[#5F6670] font-mono">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
