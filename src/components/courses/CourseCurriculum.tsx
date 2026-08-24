import React, { useState } from 'react';
import { ChevronDown, CheckCircle, Code, Layers, FileText } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface CourseCurriculumProps {
  course: Course;
}

export const CourseCurriculum: React.FC<CourseCurriculumProps> = ({ course }) => {
  // Open first module by default
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleModule = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const expandAll = () => {
    setOpenIndices(course.curriculum.map((_, i) => i));
  };

  const collapseAll = () => {
    setOpenIndices([]);
  };

  return (
    <section id="curriculum" className="py-16 sm:py-24 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Detailed Syllabus"
            title="Course Curriculum & Modules"
            description="A carefully structured roadmap moving systematically from foundations to advanced full-scale deployment."
          />

          <div className="flex items-center gap-3 text-xs font-semibold text-[#17324D]">
            <button
              onClick={expandAll}
              className="hover:underline px-2.5 py-1 rounded bg-white border border-[#E5DFD4]"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="hover:underline px-2.5 py-1 rounded bg-white border border-[#E5DFD4]"
            >
              Collapse All
            </button>
          </div>
        </div>

        <div className="space-y-4 max-w-4xl">
          {course.curriculum.map((module, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="bg-white border border-[#E5DFD4] rounded-xl overflow-hidden shadow-sm transition-all"
              >
                {/* Module Header Button */}
                <button
                  type="button"
                  onClick={() => toggleModule(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs font-mono font-bold text-[#356A9A] bg-[#F4F1EA] px-2.5 py-1 rounded border border-[#E8E4DA]">
                      {module.moduleNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#171A1F]">
                      {module.title}
                    </h3>
                  </div>

                  <div className="shrink-0 p-1 rounded-md text-[#5F6670] bg-[#F4F1EA]">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#17324D]' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Module Body Content */}
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#F0ECE1] space-y-4 animate-fade-in">
                    {/* Topics Covered */}
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#8C939E] block mb-2">
                        Topics Covered:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#171A1F]">
                        {module.topics.map((topic, tIdx) => (
                          <li key={tIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#356A9A] mt-2 shrink-0" />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Practical Exercise & Expected Outcome */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[#F0ECE1]">
                      <div className="p-3 rounded-lg bg-[#F4F1EA] space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#17324D]">
                          <Code className="w-3.5 h-3.5 text-[#356A9A]" />
                          <span>Practical Exercise</span>
                        </div>
                        <p className="text-xs text-[#5F6670] leading-relaxed">
                          {module.practicalExercise}
                        </p>
                      </div>

                      <div className="p-3 rounded-lg bg-[#718C7A]/10 border border-[#718C7A]/20 space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3D5644]">
                          <CheckCircle className="w-3.5 h-3.5 text-[#718C7A]" />
                          <span>Expected Competency</span>
                        </div>
                        <p className="text-xs text-[#3D5644] leading-relaxed">
                          {module.expectedOutcome}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
