import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import { COURSES, COURSE_CATEGORIES } from '../data/courses';
import { CourseCategory } from '../types';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { CourseCard } from '../components/courses/CourseCard';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';

export const Courses: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('');

  const handleOpenAdvisor = (slug: string) => {
    setSelectedCourseSlug(slug);
    setIsAdvisorOpen(true);
  };

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === 'All' || course.level.toLowerCase().includes(selectedLevel.toLowerCase());
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="Explore IT Courses & Technology Training | Navya Ed Tech Nepal"
        description="Browse professional courses in MERN Stack, Python, Machine Learning, UI/UX Design, DevOps, Flutter, and Cybersecurity in Kathmandu, Nepal."
      />

      <Container>
        {/* Header */}
        <div className="max-w-3xl space-y-4 mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            Curriculum & Specializations
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F]">
            Explore All Courses
          </h1>
          <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
            Every course at Navya Ed Tech is designed around hands-on laboratory practice, code reviews, and production-grade project deliverables.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-2xl border border-[#E8E4DA] shadow-sm mb-10 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {COURSE_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat as CourseCategory)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#17324D] text-white shadow-sm'
                      : 'bg-[#F4F1EA] text-[#5F6670] hover:text-[#171A1F] hover:bg-[#EAE5DA]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Level Filter */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5F6670]" />
                <input
                  type="text"
                  placeholder="Search courses or tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D] focus:bg-white"
                />
              </div>

              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full sm:w-auto px-3 py-2 text-xs rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner Level</option>
                <option value="Intermediate">Intermediate Level</option>
                <option value="Advanced">Advanced Level</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#5F6670] pt-2 border-t border-[#F0ECE1]">
            <span>Showing <strong>{filteredCourses.length}</strong> course{filteredCourses.length === 1 ? '' : 's'}</span>
            {(selectedCategory !== 'All' || selectedLevel !== 'All' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                  setSearchQuery('');
                }}
                className="text-[#356A9A] font-semibold hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onOpenAdvisor={handleOpenAdvisor}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E8E4DA] p-8 max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-[#8C939E] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#171A1F]">
              No courses match your active filters
            </h3>
            <p className="text-xs text-[#5F6670] mt-1">
              Try choosing another category or clearing your search keywords.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedLevel('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#17324D] text-white text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Container>

      {/* Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />
    </main>
  );
};
