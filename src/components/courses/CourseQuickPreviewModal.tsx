import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  X,
  Clock,
  Laptop,
  CheckCircle2,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Course } from '../../types';
import { Modal } from '../common/Modal';

interface CourseQuickPreviewModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAdvisor: (courseSlug: string) => void;
}

export const CourseQuickPreviewModal: React.FC<CourseQuickPreviewModalProps> = ({
  course,
  isOpen,
  onClose,
  onOpenAdvisor
}) => {
  const [activeTab, setActiveTab] = useState<'modules' | 'projects' | 'outcomes'>('modules');

  if (!isOpen || !course) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClass="max-w-3xl"
      contentClassName="max-h-[90vh] flex flex-col"
      labelledBy="preview-modal-title"
    >
        {/* Modal Header */}
        <div className="relative bg-gradient-to-br from-navy to-[#0E1F30] text-white p-6 sm:p-8 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/20 text-white backdrop-blur-xs">
              {course.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-blue/60 text-white backdrop-blur-xs">
              {course.level}
            </span>
            {course.featured && (
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-amber text-navy">
                Featured Track
              </span>
            )}
          </div>

          <h2 id="preview-modal-title" className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug">
            {course.title}
          </h2>

          <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed max-w-2xl">
            {course.shortDescription}
          </p>

          {/* Quick Metrics */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-white/90">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-light" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-blue-light" />
              <span>{course.mode}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-sage" />
              <span>{course.upcomingBatch?.seatsStatus || 'Admissions Open'}</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center border-b border-border bg-paper px-6 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'modules'
                ? 'border-navy text-navy'
                : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            Curriculum ({course.curriculum?.length || 0} Modules)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'projects'
                ? 'border-navy text-navy'
                : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            Capstones ({course.projects?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('outcomes')}
            className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'outcomes'
                ? 'border-navy text-navy'
                : 'border-transparent text-ink-soft hover:text-ink'
            }`}
          >
            Outcomes & Skills
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'modules' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Module Breakdown & Laboratory Exercises
              </div>
              <div className="space-y-3">
                {course.curriculum?.map((mod, idx) => (
                  <div
                    key={mod.moduleNumber || idx}
                    className="p-4 rounded-xl bg-paper border border-border space-y-2 hover:border-navy/30 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-blue uppercase tracking-wide">
                        {mod.moduleNumber}
                      </span>
                      {mod.duration && (
                        <span className="text-[11px] text-ink-faint font-medium">
                          {mod.duration}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-ink">
                      {mod.title}
                    </h4>
                    <ul className="text-xs text-ink-soft space-y-1 pt-1">
                      {mod.topics?.map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-1.5">
                          <span className="text-blue font-bold mt-0.5">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    {mod.practicalExercise && (
                      <div className="mt-2 pt-2 border-t border-[#EAE5DA] text-xs text-navy bg-navy/5 p-2 rounded-lg">
                        <strong className="font-semibold">Lab Deliverable: </strong>
                        <span>{mod.practicalExercise}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                Production Capstone Projects Built During Training
              </div>
              <div className="grid grid-cols-1 gap-4">
                {course.projects?.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl bg-paper border border-border space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-ink">
                        {proj.title}
                      </h4>
                      {proj.type && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy text-white">
                          {proj.type}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-ink-soft leading-relaxed">
                      {proj.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {proj.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-white text-ink border border-input-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'outcomes' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-3">
                  Key Learning Outcomes
                </h4>
                <div className="space-y-2">
                  {course.outcomes?.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-start gap-2 text-xs sm:text-sm text-ink">
                      <CheckCircle2 className="w-4 h-4 text-sage-ink shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {course.prerequisites?.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                    Prerequisites & Recommended Background
                  </h4>
                  <ul className="text-xs text-ink-soft space-y-1 list-disc pl-4">
                    {course.prerequisites.map((req, rIdx) => (
                      <li key={rIdx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {course.careerPaths?.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
                    Career Roles Qualified For
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {course.careerPaths.map((path, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-navy/5 text-navy border border-navy/10"
                      >
                        {path}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-paper border-t border-border flex flex-wrap items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-ink-soft hover:text-ink transition-colors cursor-pointer"
          >
            Close Preview
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenAdvisor(course.slug);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-navy bg-navy/10 hover:bg-navy/15 transition-colors cursor-pointer"
            >
              Inquire / Reserve Seat
            </button>
            <Link
              to={`/courses/${course.slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-navy hover:bg-navy-deep transition-all shadow-sm"
            >
              <span>Full Course Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
    </Modal>
  );
};
