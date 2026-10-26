import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';
import { Course, CourseCategory } from '../../types';
import { COURSE_CATEGORIES, COURSES, LEGACY_COURSE_SLUGS } from '../../data/courses';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { CourseCard } from '../courses/CourseCard';
import { Button } from '../common/Button';
import { DURATION, EASING, EASE_IN_OUT } from '../../lib/motion';
import { Reveal } from '../motion/Reveal';

interface CourseDiscoveryProps {
  onOpenAdvisor: (courseSlug: string) => void;
}

export const CourseDiscovery: React.FC<CourseDiscoveryProps> = ({ onOpenAdvisor }) => {
  const prefersReducedMotion = useReducedMotion();
  const { items: dbCourses } = useSupabaseTable<Course>('courses', { orderBy: 'title', ascending: true });
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Fallback to COURSES if database returns empty or contains legacy courses
  const allCourses = useMemo(() => {
    if (dbCourses && dbCourses.length > 0) {
      const active = dbCourses.filter((c) => !LEGACY_COURSE_SLUGS.has(c.slug));
      if (active.length > 0) {
        return active;
      }
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

  // Families come first on the home page: kids' courses lead, then the rest in catalogue order.
  const visibleCourses = [...filteredCourses]
    .sort((a, b) => Number(b.category === 'Kids Coding') - Number(a.category === 'Kids Coding'))
    .slice(0, 6);

  return (
    <section id="courses-section" className="section-y bg-white">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <SectionHeader
            title="Six courses, one path that grows with your child"
            description="Start with blocks, move to Python and websites when ready. Fees and batch times are shared by an advisor."
          />
          <Reveal className="shrink-0">
            <Button variant="outline" size="md" href="/courses" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Full Course Catalog ({allCourses.length})
            </Button>
          </Reveal>
        </div>

        {/* Filter Navigation Bar & Search */}
        <Reveal className="mb-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between min-w-0 max-w-full">
          <LayoutGroup id="course-discovery-tabs">
            <div
              role="tablist"
              aria-label="Filter course tracks by discipline"
              className="flex items-center gap-1 p-1.5 rounded-2xl bg-canvas border border-border overflow-x-auto scrollbar-none min-w-0 max-w-full"
            >
              {COURSE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(cat as CourseCategory)}
                    className={`relative h-10 px-4 rounded-xl font-display text-sm font-bold whitespace-nowrap transition-colors duration-180 cursor-pointer ${
                      isActive ? 'text-white' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="course-tab-indicator"
                        className="absolute inset-0 rounded-xl bg-ink shadow-[inset_0_-7px_9px_-6px_rgb(0_0_0/0.35)]"
                        transition={prefersReducedMotion ? { duration: 0 } : { duration: DURATION.base, ease: EASE_IN_OUT }}
                      />
                    )}
                    <span className="relative">{cat}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Quick Filter Search */}
          <div className="relative sm:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint pointer-events-none" />
            <input
              type="text"
              aria-label="Search courses by technology or topic"
              placeholder="Search by stack, e.g. JavaScript, Python..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-10 pr-3 text-[15px] rounded-xl border-2 border-input-border/60 bg-white text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-150 focus:outline-none focus:border-block-blue focus:ring-4 focus:ring-block-blue/15"
            />
          </div>
        </Reveal>

        {/* Course grid: cards re-flow with layout animation when the filter changes */}
        {visibleCourses.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  exit={{ opacity: 0, scale: 0.97, transition: { duration: DURATION.fast } }}
                  transition={{
                    layout: { duration: 0.3, ease: EASE_IN_OUT },
                    default: { duration: 0.48, ease: EASING, delay: Math.min(i, 5) * 0.06 },
                  }}
                  className="h-full"
                >
                  <CourseCard course={course} onOpenAdvisor={onOpenAdvisor} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white rounded-2xl border border-dashed border-border-warm p-8"
          >
            <span className="mx-auto w-11 h-11 rounded-full bg-paper-alt grid place-items-center text-ink-faint">
              <Search className="w-5 h-5" />
            </span>
            <p className="mt-4 text-base font-semibold text-ink">No courses matching your filter criteria.</p>
            <p className="mt-1 text-sm text-ink-muted">Try selecting "All" or resetting your search term.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex h-9 items-center px-4 rounded-lg text-[13px] font-semibold text-navy bg-navy/[0.06] hover:bg-navy/10 transition-colors duration-180 cursor-pointer"
            >
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Bottom Explorer Action */}
        <Reveal className="mt-14 text-center">
          <Button variant="secondary" size="lg" href="/courses" rightIcon={<ArrowRight className="w-4 h-4 text-navy" />}>
            Browse All {allCourses.length} Courses & Batch Timelines
          </Button>
        </Reveal>
      </Container>
    </section>
  );
};
