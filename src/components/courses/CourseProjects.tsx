import React from 'react';
import { Terminal, Cloud, CheckCircle2, GitBranch } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';

interface CourseProjectsProps {
  course: Course;
}

export const CourseProjects: React.FC<CourseProjectsProps> = ({ course }) => {
  return (
    <section id="projects" className="py-16 sm:py-24 bg-white border-b border-border scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sage/10 border border-sage/25 text-xs font-semibold text-sage-ink uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-sage-ink" />
            <span>Capstone Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            Production-Grade Systems You'll Build
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Every graduate leaves with a battle-tested GitHub portfolio of live cloud-hosted applications with unit tests, CI/CD pipelines, and secure database schemas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {course.projects.map((project, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 bg-paper rounded-3xl border border-border hover:border-navy/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-navy uppercase tracking-wider px-2.5 py-1 rounded-md bg-navy/10">
                    {project.type || `Capstone 0${idx + 1}`}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-medium text-sage-ink bg-sage/10 px-2 py-0.5 rounded">
                    <Cloud className="w-3 h-3" />
                    <span>Cloud Deployed</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-ink leading-snug group-hover:text-navy transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#EAE5DA] space-y-3">
                <div>
                  <span className="text-[11px] font-bold uppercase text-ink-faint tracking-wider block mb-2">
                    Architectural Stack:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-white text-navy font-mono font-medium border border-input-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-ink-soft">
                  <span className="flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5 text-blue" />
                    <span>Code Review Verified</span>
                  </span>
                  <span className="text-sage-ink font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sage-ink" />
                    <span>Portfolio Ready</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
