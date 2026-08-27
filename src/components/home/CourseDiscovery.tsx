import React, { useState, useMemo } from 'react';
import { ArrowRight, Search } from 'lucide-react';
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
    <section id="courses-section" className="py-16 sm:py-24 bg-paper border-b border-border-soft">
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
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-4 border-b border-border">
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
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-paper-alt text-ink-soft hover:text-ink hover:bg-[#EAE5DA] border border-border-warm'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Quick Filter Search */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
            <input
              type="text"
              placeholder="Search by stack, e.g. React, Python..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-input-border bg-white text-ink focus:outline-none focus:ring-2 focus:ring-navy"
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
          <div className="text-center py-16 bg-white rounded-2xl border border-border p-8 space-y-3">
            <p className="text-sm font-bold text-ink">
              No courses matching your filter criteria.
            </p>
            <p className="text-xs text-ink-soft">
              Try selecting "All" or resetting your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="text-xs font-bold text-blue hover:underline"
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
            rightIcon={<ArrowRight className="w-4 h-4 text-navy" />}
          >
            Browse All {allCourses.length} Courses & Batch Timelines
          </Button>
        </div>
      </Container>
    </section>
  );
};
