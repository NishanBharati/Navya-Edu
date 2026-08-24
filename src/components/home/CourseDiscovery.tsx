import React, { useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { CourseCategory } from '../../types';
import { COURSES, COURSE_CATEGORIES } from '../../data/courses';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { CourseCard } from '../courses/CourseCard';
import { Button } from '../common/Button';

interface CourseDiscoveryProps {
  onOpenAdvisor: (courseSlug: string) => void;
}

export const CourseDiscovery: React.FC<CourseDiscoveryProps> = ({ onOpenAdvisor }) => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="courses-section" className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Curriculum & Programs"
            title="Explore Our Courses"
            description="Choose a structured learning path based on the technologies, tools, and career specialization you want to pursue."
          />
          <div className="shrink-0">
            <Button
              variant="outline"
              size="md"
              href="/courses"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Courses
            </Button>
          </div>
        </div>

        {/* Filter Navigation Bar & Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pb-4 border-b border-[#E8E4DA]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {COURSE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat as CourseCategory)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#17324D] text-white shadow-sm'
                    : 'bg-[#F4F1EA] text-[#5F6670] hover:text-[#171A1F] hover:bg-[#EAE5DA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Filter Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6670]" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#D8D2C6] bg-white text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
          </div>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onOpenAdvisor={onOpenAdvisor}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E8E4DA] p-8">
            <p className="text-sm font-semibold text-[#171A1F]">
              No courses matching your filter criteria.
            </p>
            <p className="text-xs text-[#5F6670] mt-1">
              Try selecting "All" or resetting your search term.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-semibold text-[#356A9A] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};
