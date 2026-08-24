import React from 'react';
import { UserCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface CourseAudienceProps {
  course: Course;
}

export const CourseAudience: React.FC<CourseAudienceProps> = ({ course }) => {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Target Students */}
          <div className="lg:col-span-7 space-y-5">
            <SectionHeader
              eyebrow="Target Audience"
              title="Is this course right for you?"
              description="Our courses are specifically structured for learners seeking practical, job-ready technical execution rather than abstract academic theory."
            />

            <div className="space-y-3 pt-2">
              {course.targetAudience.map((audience, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-[#E5DFD4] flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-full bg-[#17324D]/10 text-[#17324D] flex items-center justify-center shrink-0 mt-0.5">
                    <UserCheck className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#171A1F] leading-relaxed">
                    {audience}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites & Outcomes */}
          <div className="lg:col-span-5 space-y-6">
            {/* Prerequisites */}
            <div className="p-6 bg-white rounded-xl border border-[#E5DFD4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#356A9A]">
                <AlertCircle className="w-4 h-4" />
                <span>Prerequisites</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5F6670]">
                {course.prerequisites.map((prereq, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#356A9A] mt-2 shrink-0" />
                    <span>{prereq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Core Outcomes */}
            <div className="p-6 bg-white rounded-xl border border-[#E5DFD4] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17324D]">
                <CheckCircle2 className="w-4 h-4 text-[#718C7A]" />
                <span>Key Competencies You Acquire</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#5F6670]">
                {course.outcomes.slice(0, 4).map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#718C7A] mt-2 shrink-0" />
                    <span className="text-[#171A1F]">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
