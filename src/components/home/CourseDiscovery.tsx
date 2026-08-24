import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Course, CourseCategory } from '../../types';
import { COURSE_CATEGORIES, COURSES } from '../../data/courses';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { CourseCard } from '../courses/CourseCard';
import { Button } from '../common/Button';

interface CourseDiscoveryProps {
  onOpenAdvisor: (courseSlug: string) => void;
}

export const CourseDiscovery: React.FC<CourseDiscoveryProps> = ({ onOpenAdvisor }) => {
  const { items: dbCourses } = useSupabaseTable<Course>('courses', { orderBy: 'title', ascending: true });
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback to COURSES if database returns empty
  const allCourses = useMemo(() => {
    if (dbCourses && dbCourses.length > 0) {
      return dbCourses;
    }
    return COURSES;
  }, [dbCourses]);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allCourses, selectedCategory, searchQuery]);

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Industry-Standard Syllabi"
            title="Explore Our Core Engineering Tracks"
            description="Choose a specialized learning path designed around modern technologies, live code sprints, and production deployment."
          />
          <div className="shrink-0">
            <Button
              variant="outline"
              size="md"
              href="/courses"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Full Course Catalog ({allCourses.length})
            </Button>
          </div>
        </div>

        {/* Filter Navigation Bar & Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-4 border-b border-[#E8E4DA]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {COURSE_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat as CourseCategory)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#17324D] text-white shadow-sm'
                      : 'bg-[#F4F1EA] text-[#5F6670] hover:text-[#171A1F] hover:bg-[#EAE5DA] border border-[#E5DFD4]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5F6670]" />
            <input
              type="text"
              placeholder="Search by stack, e.g. React, Python..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#D8D2C6] bg-white text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.slice(0, 6).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onOpenAdvisor={onOpenAdvisor}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E4DA] p-8 space-y-3">
            <p className="text-sm font-bold text-[#171A1F]">
              No courses matching your filter criteria.
            </p>
            <p className="text-xs text-[#5F6670]">
              Try selecting "All" or resetting your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-[#356A9A] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Explorer Action */}
        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            size="lg"
            href="/courses"
            rightIcon={<ArrowRight className="w-4 h-4 text-[#17324D]" />}
          >
            Browse All {allCourses.length} Courses & Batch Timelines
          </Button>
        </div>
      </Container>
    </section>
  );
};
