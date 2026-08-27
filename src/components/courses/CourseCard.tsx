import React from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  BarChart2,
  Laptop,
  ArrowRight,
  Eye,
  Layers,
  Sparkles,
  Scale
} from 'lucide-react';
import { Course } from '../../types';
import { Badge } from '../common/Badge';
import { ImagePlaceholder } from '../common/ImagePlaceholder';

export interface CourseCardProps {
  course: Course;
  className?: string;
  onOpenAdvisor?: (courseSlug: string) => void;
  onQuickPreview?: (course: Course) => void;
  isComparing?: boolean;
  onToggleCompare?: (course: Course) => void;
  showCompareOption?: boolean;
  viewMode?: 'grid' | 'list';
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  className = '',
  onOpenAdvisor,
  onQuickPreview,
  isComparing = false,
  onToggleCompare,
  showCompareOption = true,
  viewMode = 'grid'
}) => {
  const visibleTechs = course.technologies.slice(0, 4);
  const remainingTechCount = course.technologies.length - visibleTechs.length;

  if (viewMode === 'list') {
    return (
      <article
        id={`course-card-${course.slug}`}
        className={`group relative bg-white border border-border rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-navy/40 hover:shadow-lg hover:shadow-navy/5 flex flex-col md:flex-row gap-5 lg:gap-6 ${
          isComparing ? 'ring-2 ring-blue bg-[#F8FAFC]' : ''
        } ${className}`}
      >
        {/* Left Thumbnail with overlays */}
        <div className="relative md:w-64 lg:w-72 rounded-xl overflow-hidden shrink-0">
          <ImagePlaceholder
            src={course.heroImage}
            alt={course.title}
            aspectRatio="video"
            className="md:h-full md:aspect-auto"
            imgClassName="group-hover:scale-105 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 md:hidden pointer-events-none" />

            <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 z-10">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-navy text-white tracking-wide shadow-sm">
                {course.category}
              </span>
              {course.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#D48B38] text-white shadow-sm">
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
              )}
            </div>

            {/* Quick Preview Hover Trigger */}
            {onQuickPreview && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  onQuickPreview(course);
                }}
                className="absolute bottom-2.5 right-2.5 hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/75 hover:bg-black text-white text-xs font-semibold backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                title="Quick preview course"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>
            )}
          </ImagePlaceholder>
        </div>

        {/* Center / Content Details */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-ink-soft">
                <span className="inline-flex items-center gap-1 text-blue bg-blue/10 px-2 py-0.5 rounded-md">
                  <Laptop className="w-3 h-3" />
                  {course.mode}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 text-ink-soft" />
                  {course.duration}
                </span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-ink-soft" />
                  {course.level}
                </span>
              </div>

              {/* Compare toggle */}
              {showCompareOption && onToggleCompare && (
                <button
                  type="button"
                  onClick={() => onToggleCompare(course)}
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    isComparing
                      ? 'bg-blue text-white'
                      : 'text-ink-soft hover:text-ink hover:bg-paper-alt border border-border-warm'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isComparing ? 'Comparing' : 'Compare'}</span>
                </button>
              )}
            </div>

            <Link to={`/courses/${course.slug}`}>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-navy transition-colors leading-snug">
                {course.title}
              </h3>
            </Link>

            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed line-clamp-2">
              {course.shortDescription}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {visibleTechs.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-[11px] font-medium bg-paper-alt text-[#4A5059] border border-border"
                >
                  {tech}
                </span>
              ))}
              {remainingTechCount > 0 && (
                <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold text-ink-soft bg-border-soft">
                  +{remainingTechCount} more
                </span>
              )}
            </div>
          </div>

          {/* Bottom Bar: Schedule info + Actions */}
          <div className="pt-3 border-t border-border-faint flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-ink-soft">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse shrink-0" />
              <span className="font-medium text-ink">
                {course.upcomingBatch?.seatsStatus || 'Admissions Open'}
              </span>
              <span className="hidden sm:inline text-ink-faint">|</span>
              <span className="hidden sm:inline truncate max-w-[200px]">
                {course.upcomingBatch?.classTime || 'Morning & Evening batches'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onQuickPreview && (
                <button
                  type="button"
                  onClick={() => onQuickPreview(course)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-ink bg-paper-alt hover:bg-[#EAE5DA] transition-colors cursor-pointer"
                >
                  Quick Outline
                </button>
              )}
              {onOpenAdvisor && (
                <button
                  type="button"
                  onClick={() => onOpenAdvisor(course.slug)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-navy bg-navy/10 hover:bg-navy/15 transition-colors cursor-pointer"
                >
                  Inquire
                </button>
              )}
              <Link
                to={`/courses/${course.slug}`}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-navy hover:bg-navy-deep transition-all shadow-xs"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Default Grid View Layout
  return (
    <article
      id={`course-card-${course.slug}`}
      className={`group flex flex-col bg-white border border-border rounded-2xl overflow-hidden hover:border-navy/40 hover:shadow-xl hover:shadow-navy/5 transition-all duration-300 relative ${
        isComparing ? 'ring-2 ring-blue bg-[#F8FAFC]' : ''
      } ${className}`}
    >
      {/* Course Image Header with Overlays */}
      <ImagePlaceholder
        src={course.heroImage}
        alt={course.title}
        aspectRatio="cinema"
        imgClassName="group-hover:scale-105 transition-transform duration-500"
      >
        <Link to={`/courses/${course.slug}`} className="absolute inset-0 z-0" aria-label={course.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
          <Badge variant="navy" size="sm">
            {course.category}
          </Badge>
          {course.featured && (
            <Badge variant="amber" size="sm">
              Featured
            </Badge>
          )}
        </div>

        {/* Top Right Quick Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
          {showCompareOption && onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(course)}
              className={`p-1.5 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                isComparing
                  ? 'bg-blue text-white shadow-sm'
                  : 'bg-black/60 hover:bg-black/80 text-white/90'
              }`}
              title={isComparing ? 'Remove from comparison' : 'Compare with other courses'}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
          )}
          {onQuickPreview && (
            <button
              type="button"
              onClick={() => onQuickPreview(course)}
              className="p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white/90 backdrop-blur-md transition-all cursor-pointer"
              title="Quick preview syllabus"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Bottom Mode Pill on Image */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-white font-medium z-10">
          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Laptop className="w-3 h-3 text-blue-light" />
            {course.mode}
          </span>
          <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-[#D9A662]" />
            {course.duration}
          </span>
        </div>
      </ImagePlaceholder>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Level & Module Count */}
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <div className="flex items-center gap-1 font-semibold text-navy">
              <BarChart2 className="w-3.5 h-3.5 text-blue" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink-soft bg-paper-alt px-2 py-0.5 rounded">
              <Layers className="w-3 h-3" />
              <span>{course.curriculum?.length || 4} Modules</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/courses/${course.slug}`}>
            <h3 className="text-lg font-bold tracking-tight text-ink group-hover:text-navy transition-colors leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs sm:text-sm text-ink-soft line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Technologies Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {visibleTechs.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-paper-alt text-[#4A5059] border border-border"
              >
                {tech}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="px-1.5 py-0.5 rounded text-[11px] font-semibold text-ink-soft bg-border-soft">
                +{remainingTechCount}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer & Batch Status */}
        <div className="pt-3 border-t border-border-faint space-y-3">
          <div className="flex items-center justify-between text-xs text-ink-soft">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span className="font-semibold text-ink">
                {course.upcomingBatch?.seatsStatus || 'Admissions Open'}
              </span>
            </div>
            <span className="text-[11px] text-ink-soft">
              {course.projects?.length ? `${course.projects.length} Real Projects` : 'Capstone Defense'}
            </span>
          </div>

          <div className="pt-1 flex items-center justify-between gap-2">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-navy hover:text-blue transition-colors group-hover:underline"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>

            <div className="flex items-center gap-1.5">
              {onQuickPreview && (
                <button
                  type="button"
                  onClick={() => onQuickPreview(course)}
                  className="text-xs font-semibold text-ink-soft hover:text-ink px-2.5 py-1.5 rounded-lg bg-paper-alt hover:bg-[#EAE5DA] transition-colors cursor-pointer"
                >
                  Outline
                </button>
              )}
              {onOpenAdvisor && (
                <button
                  type="button"
                  onClick={() => onOpenAdvisor(course.slug)}
                  className="text-xs font-semibold text-navy hover:bg-navy/10 px-2.5 py-1.5 rounded-lg bg-navy/5 transition-colors cursor-pointer"
                >
                  Inquire
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
