import React from 'react';
import { UserCheck, Award, Briefcase, Sparkles } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface CourseInstructorProps {
  course: Course;
}

export const CourseInstructor: React.FC<CourseInstructorProps> = ({ course }) => {
  const instructor = course.instructor;

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <SectionHeader
          eyebrow="Faculty & Practitioners"
          title="Instruction & Mentorship"
          description="Courses are led by practicing software engineers and tech leads from Navya EdTech and verified industry specialists."
        />

        <div className="mt-10 max-w-2xl bg-white border border-[#E8E4DA] rounded-xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Neutral Professional Avatar Frame */}
            <div className="w-16 h-16 rounded-xl bg-[#17324D] text-white flex items-center justify-center font-heading font-bold text-xl shrink-0">
              <UserCheck className="w-8 h-8 text-[#9BBAD4]" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-[#171A1F]">
                  {instructor.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#356A9A]">
                {instructor.role}
              </p>
              <p className="text-xs text-[#5F6670]">
                {instructor.experience}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F0ECE1] space-y-3">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C939E] block mb-1">
                Domain Specialization:
              </span>
              <p className="text-xs sm:text-sm font-mono text-[#17324D]">
                {instructor.specialization}
              </p>
            </div>

            <p className="text-xs text-[#5F6670] leading-relaxed">
              Every cohort is directly mentored with active code reviews, project architecture guidance, and weekly lab feedback sessions.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
