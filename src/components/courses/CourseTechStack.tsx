import React from 'react';
import { Cpu, Check } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';

interface CourseTechStackProps {
  course: Course;
}

export const CourseTechStack: React.FC<CourseTechStackProps> = ({ course }) => {
  return (
    <section className="py-12 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
              Curriculum Toolset
            </span>
            <h3 className="text-xl font-bold text-[#171A1F]">
              Technologies & Frameworks You Master
            </h3>
          </div>

          {/* Tech Strip Badges */}
          <div className="flex flex-wrap items-center gap-2 max-w-2xl">
            {course.technologies.map((tech, idx) => (
              <div
                key={idx}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E5DFD4] text-xs font-mono font-medium text-[#17324D] shadow-sm flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-[#718C7A]" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
