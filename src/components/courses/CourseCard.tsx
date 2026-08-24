import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BarChart2, Laptop, ArrowRight } from 'lucide-react';
import { Course } from '../../types';
import { Badge } from '../common/Badge';

interface CourseCardProps {
  course: Course;
  className?: string;
  onOpenAdvisor?: (courseSlug: string) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  className = '',
  onOpenAdvisor
}) => {
  return (
    <article
      id={`course-card-${course.slug}`}
      className={`group flex flex-col bg-white border border-[#E8E4DA] rounded-xl overflow-hidden hover:border-[#356A9A]/50 hover:shadow-md transition-all duration-200 ${className}`}
    >
      {/* Course Image Header */}
      <Link to={`/courses/${course.slug}`} className="relative block aspect-[16/9] overflow-hidden bg-[#F4F1EA]">
        <img
          src={course.heroImage}
          alt={course.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          onError={(e) => {
            // fallback gracefully
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <Badge variant="navy" size="sm">
            {course.category}
          </Badge>
          {course.featured && (
            <Badge variant="amber" size="sm">
              Featured
            </Badge>
          )}
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <Link to={`/courses/${course.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#171A1F] group-hover:text-[#17324D] transition-colors leading-snug">
              {course.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-[#5F6670] line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Course Metadata Strip */}
        <div className="pt-3 border-t border-[#F0ECE1] space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs text-[#5F6670]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#356A9A] shrink-0" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-[#356A9A] shrink-0" />
              <span>{course.level}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#5F6670]">
            <Laptop className="w-3.5 h-3.5 text-[#356A9A] shrink-0" />
            <span className="truncate">{course.mode}</span>
          </div>

          {/* Card Footer Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#17324D] hover:text-[#356A9A] transition-colors group-hover:underline"
            >
              <span>View Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {onOpenAdvisor && (
              <button
                type="button"
                onClick={() => onOpenAdvisor(course.slug)}
                className="text-xs font-medium text-[#5F6670] hover:text-[#17324D] px-2.5 py-1 rounded bg-[#F4F1EA] hover:bg-[#EAE5DA] transition-colors"
              >
                Inquire
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
