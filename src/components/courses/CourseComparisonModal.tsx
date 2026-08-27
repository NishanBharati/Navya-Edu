import React from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Scale,
  Clock,
  BarChart2,
  Laptop,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Course } from '../../types';
import { Modal } from '../common/Modal';

interface CourseComparisonModalProps {
  selectedCourses: Course[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveCourse: (courseSlug: string) => void;
  onClearAll: () => void;
  onOpenAdvisor: (courseSlug: string) => void;
}

export const CourseComparisonModal: React.FC<CourseComparisonModalProps> = ({
  selectedCourses,
  isOpen,
  onClose,
  onRemoveCourse,
  onClearAll,
  onOpenAdvisor
}) => {
  if (!isOpen || selectedCourses.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClass="max-w-5xl"
      contentClassName="max-h-[92vh] flex flex-col"
      labelledBy="comparison-modal-title"
    >
        {/* Modal Header */}
        <div className="bg-navy text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-white">
              <Scale className="w-5 h-5 text-blue-light" />
            </div>
            <div>
              <h2 id="comparison-modal-title" className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Side-by-Side Course Comparison
              </h2>
              <p className="text-xs text-white/70">
                Comparing {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} across syllabus depth, technologies, and career tracks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-white/70 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="p-4 sm:p-6 overflow-x-auto overflow-y-auto flex-1">
          <div className="min-w-[640px] divide-y divide-border">
            {/* 1. Header / Course Titles */}
            <div className="grid grid-cols-4 gap-4 pb-4 items-start">
              <div className="text-xs font-bold uppercase tracking-wider text-ink-soft self-center">
                Course Title
              </div>
              {selectedCourses.map((course) => (
                <div key={course.id} className="space-y-2 relative bg-paper p-3.5 rounded-xl border border-border">
                  <button
                    type="button"
                    onClick={() => onRemoveCourse(course.slug)}
                    className="absolute top-2 right-2 text-ink-faint hover:text-red-500 transition-colors p-1"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-navy text-white">
                    {course.category}
                  </span>
                  <h3 className="text-sm font-bold text-ink leading-snug pr-4">
                    {course.title}
                  </h3>
                </div>
              ))}
              {/* Empty placeholder slots if < 3 */}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, idx) => (
                <div
                  key={idx}
                  className="border-2 border-dashed border-border-warm rounded-xl p-4 flex flex-col items-center justify-center text-center text-xs text-ink-faint"
                >
                  <span>Select another course to compare</span>
                </div>
              ))}
            </div>

            {/* 2. Duration & Schedule */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-center text-xs">
              <div className="font-bold text-ink-soft">Duration & Commitment</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="font-semibold text-ink flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue" />
                  <span>{c.duration}</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 3. Skill Level */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-center text-xs">
              <div className="font-bold text-ink-soft">Skill Level</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="font-semibold text-ink flex items-center gap-1.5">
                  <BarChart2 className="w-3.5 h-3.5 text-blue" />
                  <span>{c.level}</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 4. Learning Mode */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-center text-xs">
              <div className="font-bold text-ink-soft">Delivery Format</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="text-ink flex items-center gap-1.5">
                  <Laptop className="w-3.5 h-3.5 text-blue" />
                  <span>{c.mode}</span>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 5. Core Technologies */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-start text-xs">
              <div className="font-bold text-ink-soft">Technologies & Frameworks</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="flex flex-wrap gap-1">
                  {c.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] bg-paper-alt text-[#4A5059] border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 6. Capstone Projects */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-start text-xs">
              <div className="font-bold text-ink-soft">Production Capstones</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="space-y-1.5">
                  {c.projects?.map((p, pI) => (
                    <div key={pI} className="text-xs text-ink flex items-start gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sage-ink shrink-0 mt-0.5" />
                      <span className="font-medium">{p.title}</span>
                    </div>
                  ))}
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 7. Target Career Roles */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-start text-xs">
              <div className="font-bold text-ink-soft">Career Roles</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="space-y-1">
                  {c.careerPaths?.map((path, pIdx) => (
                    <div key={pIdx} className="text-[11px] font-semibold text-navy bg-navy/5 px-2 py-0.5 rounded">
                      {path}
                    </div>
                  ))}
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 8. Prerequisites */}
            <div className="grid grid-cols-4 gap-4 py-3.5 items-start text-xs">
              <div className="font-bold text-ink-soft">Prerequisites</div>
              {selectedCourses.map((c) => (
                <ul key={c.id} className="space-y-1 text-ink-soft list-disc pl-3 text-[11px]">
                  {c.prerequisites?.map((pr, prIdx) => (
                    <li key={prIdx}>{pr}</li>
                  ))}
                </ul>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} className="text-ink-faint">—</div>
              ))}
            </div>

            {/* 9. Actions */}
            <div className="grid grid-cols-4 gap-4 pt-4 items-center">
              <div className="font-bold text-xs text-ink-soft">Next Step</div>
              {selectedCourses.map((c) => (
                <div key={c.id} className="space-y-2">
                  <Link
                    to={`/courses/${c.slug}`}
                    onClick={onClose}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-navy hover:bg-navy-deep transition-colors shadow-xs"
                  >
                    <span>View Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAdvisor(c.slug);
                    }}
                    className="w-full text-center px-3 py-1.5 rounded-xl text-xs font-semibold text-navy bg-navy/10 hover:bg-navy/15 transition-colors cursor-pointer"
                  >
                    Inquire Batch
                  </button>
                </div>
              ))}
              {Array.from({ length: Math.max(0, 3 - selectedCourses.length) }).map((_, i) => (
                <div key={i} />
              ))}
            </div>
          </div>
        </div>
    </Modal>
  );
};

// Sticky Floating Comparison Dock
interface ComparisonFloatingDockProps {
  selectedCourses: Course[];
  onOpenComparison: () => void;
  onClearAll: () => void;
}

export const ComparisonFloatingDock: React.FC<ComparisonFloatingDockProps> = ({
  selectedCourses,
  onOpenComparison,
  onClearAll
}) => {
  if (selectedCourses.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto bg-navy text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center justify-between gap-4 animate-slide-in">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-blue flex items-center justify-center text-white shrink-0 font-bold text-xs">
          {selectedCourses.length}
        </div>
        <div className="text-xs">
          <div className="font-bold text-white">
            {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected
          </div>
          <div className="text-white/70 hidden sm:block text-[11px] truncate max-w-[220px]">
            {selectedCourses.map((c) => c.title.split(' ')[0]).join(', ')}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-white/70 hover:text-white px-2 py-1 transition-colors cursor-pointer"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={onOpenComparison}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-navy hover:bg-white/90 transition-all shadow-md cursor-pointer inline-flex items-center gap-1.5"
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Compare Now</span>
        </button>
      </div>
    </div>
  );
};
