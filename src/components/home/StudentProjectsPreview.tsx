import React, { useMemo } from 'react';
import { ArrowRight, Layers, ShieldCheck, Check, Code2, Globe } from 'lucide-react';
import type { StudentProject } from '../../types';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { STUDENT_PROJECTS } from '../../data/studentProjects';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const StudentProjectsPreview: React.FC = () => {
  const { items: dbProjects } = useSupabaseTable<StudentProject>('student_projects', { orderBy: 'title', ascending: true });

  const allProjects = useMemo(() => {
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects;
    }
    return STUDENT_PROJECTS;
  }, [dbProjects]);

  const previewProjects = allProjects.slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Verifiable Proof-of-Work"
            title="What Our Students Build & Deploy"
            description="Instead of fabricated claims, we let the quality of student engineering work speak for itself. Explore production-grade applications engineered under senior code review."
          />
          <div className="shrink-0">
            <Button
              variant="outline"
              size="md"
              href="/student-work"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Full Student Portfolio ({allProjects.length})
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {previewProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-white border border-[#E8E4DA] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#17324D]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-3.5">
                  <span className="text-[11px] font-mono font-bold text-[#356A9A] tracking-wider uppercase block">
                    {project.completionContext}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#171A1F] leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-[#F0ECE1] space-y-1.5">
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-[#171A1F]">
                        <Check className="w-3.5 h-3.5 text-[#718C7A] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#F0ECE1] bg-[#FAFAF8] flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-white text-[#17324D] font-mono border border-[#E5DFD4]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded text-[#5F6670] font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href="/student-work"
                  className="text-xs font-bold text-[#17324D] hover:text-[#356A9A] flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};
