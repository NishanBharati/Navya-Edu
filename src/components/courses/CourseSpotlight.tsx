import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  Sparkles,
  Clock,
  Laptop,
  Calendar,
  ArrowRight,
  Award
} from 'lucide-react';
import { Course } from '../../types';

interface CourseSpotlightProps {
  course: Course;
  onOpenAdvisor: (courseSlug: string) => void;
  onQuickPreview?: (course: Course) => void;
}

export const CourseSpotlight: React.FC<CourseSpotlightProps> = ({
  course,
  onOpenAdvisor,
  onQuickPreview
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const gridParallax = useTransform(scrollY, [0, 800], [0, -25]);

  return (
    <section className="mb-14 relative rounded-3xl bg-gradient-to-br from-navy via-[#102438] to-[#0A1624] text-white p-6 sm:p-8 lg:p-10 overflow-hidden shadow-2xl border border-white/15">
      {/* 1. Slow-moving animated gradient mesh orbs */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, 25, -20, 0],
                y: [0, -20, 15, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 -top-24 w-96 h-96 bg-blue-electric/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                x: [0, -30, 20, 0],
                y: [0, 25, -15, 0],
                scale: [1, 0.9, 1.08, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-20 -bottom-20 w-80 h-80 bg-sage/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Faint technical blueprint grid pattern with parallax drift */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : gridParallax }}
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Flagship Details */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold tracking-wider text-white uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A662]" />
            <span>Featured Specialization • 2026 Batch</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {course.title}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
              {course.description || course.shortDescription}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-white/60 block text-xs">Duration</span>
              <strong className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-blue-light" />
                {course.duration}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-white/60 block text-xs">Format</span>
              <strong className="text-sm font-bold text-white flex items-center gap-1 mt-0.5">
                <Laptop className="w-3.5 h-3.5 text-blue-light" />
                {course.mode.split(' ')[0]}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-white/60 block text-xs">Admissions</span>
              <strong className="text-sm font-bold text-sage flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                {course.upcomingBatch?.seatsStatus || 'Open'}
              </strong>
            </div>
          </div>

          {/* Key Tech Stack */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60">
              Core Technologies & Tooling:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {course.technologies.slice(0, 8).map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-white/10 text-white/90 border border-white/15 backdrop-blur-xs"
                >
                  {tech}
                </span>
              ))}
              {course.technologies.length > 8 && (
                <span className="px-2 py-1 rounded-md text-xs font-semibold text-white/60 bg-white/5">
                  +{course.technologies.length - 8} more
                </span>
              )}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-navy bg-white hover:bg-white/90 transition-all shadow-lg cursor-pointer"
            >
              <span>Explore Full Syllabus & Modules</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {onQuickPreview && (
              <button
                type="button"
                onClick={() => onQuickPreview(course)}
                className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/15 cursor-pointer"
              >
                Quick Preview
              </button>
            )}

            <button
              type="button"
              onClick={() => onOpenAdvisor(course.slug)}
              className="px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition-colors cursor-pointer"
            >
              Talk to Course Advisor
            </button>
          </div>
        </div>

        {/* Right Column: Live Capstone Preview & Upcoming Batch Box */}
        <div className="lg:col-span-5 space-y-4">
          {/* Capstone Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D9A662] flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Featured Capstone Project
              </span>
              <span className="text-xs text-white/60">Live Deployed</span>
            </div>

            {course.projects && course.projects[0] && (
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white">
                  {course.projects[0].title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed line-clamp-3">
                  {course.projects[0].description}
                </p>
                <div className="flex flex-wrap gap-1 pt-1">
                  {course.projects[0].technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-xs bg-black/30 text-white/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Batch Schedule Box */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-2.5 text-xs text-white/80">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Calendar className="w-4 h-4 text-sage" />
              <span>Next Cohort Schedule</span>
            </div>
            <p className="text-white/90 font-medium">
              {course.upcomingBatch?.startDate || 'Admissions currently in progress'}
            </p>
            <p className="text-white/70 text-xs">
              {course.upcomingBatch?.classTime || 'Morning (7:00 AM) & Evening (5:00 PM) sessions'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
