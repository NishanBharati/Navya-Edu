import React from 'react';
import { Briefcase, ArrowRight, Target } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface CourseCareerPathsProps {
  course: Course;
}

export const CourseCareerPaths: React.FC<CourseCareerPathsProps> = ({ course }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <SectionHeader
          eyebrow="Industry Application"
          title="Where this course can take you"
          description="Graduates of this curriculum are equipped to pursue technical roles across software houses, product startups, and tech consultancy teams."
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
          {course.careerPaths.map((role, idx) => (
            <div
              key={idx}
              className="p-4 bg-white rounded-xl border border-[#E5DFD4] flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0">
                <Target className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-[#171A1F]">
                {role}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
