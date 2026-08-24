import React from 'react';
import { Layers, Terminal, Sparkles } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface CourseProjectsProps {
  course: Course;
}

export const CourseProjects: React.FC<CourseProjectsProps> = ({ course }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <SectionHeader
          eyebrow="Practical Deliverables"
          title="What You'll Build"
          description="True understanding comes from architecting real digital systems. You will build, test, and deploy these projects during the course."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {course.projects.map((project, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl border border-[#E8E4DA] hover:border-[#17324D]/40 transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-[#356A9A] uppercase tracking-wider px-2 py-0.5 rounded bg-[#F4F1EA]">
                    {project.type || `Project 0${idx + 1}`}
                  </span>
                  <Terminal className="w-4 h-4 text-[#8C939E]" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#171A1F] leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0ECE1]">
                <span className="text-[11px] font-semibold uppercase text-[#8C939E] tracking-wider block mb-2">
                  Technologies Used:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[11px] px-2 py-0.5 rounded bg-[#F4F1EA] text-[#17324D] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
