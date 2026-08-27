import React, { useMemo } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import type { StudentProject } from '../../types';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { STUDENT_PROJECTS } from '../../data/studentProjects';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

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
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
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
              className="group bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-navy/40 transition-all flex flex-col justify-between"
            >
              <div>
                <ImagePlaceholder
                  src={project.image}
                  alt={project.title}
                  aspectRatio="video"
                  imgClassName="group-hover:scale-103 transition-transform duration-300"
                >
                  <div className="absolute top-3 left-3">
                    <Badge variant="navy" size="sm">
                      {project.category}
                    </Badge>
                  </div>
                </ImagePlaceholder>

                <div className="p-6 space-y-3.5">
                  <span className="text-[11px] font-mono font-bold text-blue tracking-wider uppercase block">
                    {project.completionContext}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-border-faint space-y-1.5">
                    {project.highlights.slice(0, 2).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-ink">
                        <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-border-faint bg-paper flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 3).map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-white text-navy font-mono border border-border-warm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded text-ink-soft font-mono">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <a
                  href="/student-work"
                  className="text-xs font-bold text-navy hover:text-blue flex items-center gap-1"
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
