import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  BookOpen,
  Loader2,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Users,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { COURSE_CATEGORIES, COURSES, LEGACY_COURSE_SLUGS } from '../data/courses';
import { Course, CourseCategory } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { Container } from '../components/common/Container';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseSpotlight } from '../components/courses/CourseSpotlight';
import { CourseComparisonModal, ComparisonFloatingDock } from '../components/courses/CourseComparisonModal';
import { CourseQuickPreviewModal } from '../components/courses/CourseQuickPreviewModal';
import { CoursePedagogyStrip } from '../components/courses/CoursePedagogyStrip';
import { CourseFAQAccordion } from '../components/courses/CourseFAQAccordion';
import { CourseConsultationCTA } from '../components/courses/CourseConsultationCTA';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';

export const Courses: React.FC = () => {
  const { items: dbCourses, isLoading } = useSupabaseTable<Course>('courses', {
    orderBy: 'title',
    ascending: true
  });

  // Guarantee fallback to COURSES if database returns empty or contains legacy courses
  const allCourses = useMemo(() => {
    if (dbCourses && dbCourses.length > 0) {
      const active = dbCourses.filter((c) => !LEGACY_COURSE_SLUGS.has(c.slug));
      if (active.length > 0) {
        return active;
      }
    }
    return COURSES;
  }, [dbCourses]);

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'alpha' | 'duration'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Modal & Comparison states
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState('');
  const [quickPreviewCourse, setQuickPreviewCourse] = useState<Course | null>(null);
  const [comparingCourses, setComparingCourses] = useState<Course[]>([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOpenAdvisor = (slug?: string) => {
    setSelectedCourseSlug(slug || '');
    setIsAdvisorOpen(true);
  };

  const handleToggleCompare = (course: Course) => {
    setComparingCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      if (exists) {
        return prev.filter((c) => c.id !== course.id);
      }
      if (prev.length >= 3) {
        // Max 3 courses for side-by-side comparison
        return [...prev.slice(1), course];
      }
      return [...prev, course];
    });
  };

  const handleRemoveComparedCourse = (courseSlug: string) => {
    setComparingCourses((prev) => prev.filter((c) => c.slug !== courseSlug));
  };

  const handleClearComparison = () => {
    setComparingCourses([]);
  };

  // Popular search keywords
  const popularKeywords = ['Python', 'Web Development', 'Scratch', 'Data Science', 'Beginner', 'Advance'];

  // Calculate dynamic category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allCourses.length };
    COURSE_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = allCourses.filter((c) => c.category === cat).length;
      }
    });
    return counts;
  }, [allCourses]);

  // Featured course spotlight (top flagship track)
  const spotlightCourse = useMemo(() => {
    return allCourses.find((c) => c.featured && c.slug === 'web-development') || allCourses.find((c) => c.featured) || allCourses[0];
  }, [allCourses]);

  // Filtered & Sorted courses
  const filteredCourses = useMemo(() => {
    let result = allCourses.filter((course) => {
      // Category filter
      const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

      // Level filter
      const matchesLevel =
        selectedLevel === 'All' || course.level.toLowerCase().includes(selectedLevel.toLowerCase());

      // Mode filter
      const matchesMode =
        selectedMode === 'All' ||
        (selectedMode === 'In-Person' && course.mode.toLowerCase().includes('in-person')) ||
        (selectedMode === 'Online' && course.mode.toLowerCase().includes('online')) ||
        (selectedMode === 'Hybrid' && course.mode.toLowerCase().includes('hybrid'));

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        course.title.toLowerCase().includes(q) ||
        course.shortDescription.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.technologies.some((t) => t.toLowerCase().includes(q)) ||
        course.careerPaths?.some((p) => p.toLowerCase().includes(q));

      return matchesCategory && matchesLevel && matchesMode && matchesSearch;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'alpha') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'duration') {
        const getDays = (d: string) => {
          const n = parseInt(d) || 0;
          return d.toLowerCase().includes('month') ? n * 30 : n;
        };
        return getDays(b.duration) - getDays(a.duration);
      }
      return 0;
    });

    return result;
  }, [allCourses, selectedCategory, selectedLevel, selectedMode, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    selectedMode !== 'All' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedMode('All');
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Explore Professional IT Courses & Tech Training | Navya Ed Tech Nepal"
        description="Browse industry-standard courses in Python, Web Development, Scratch Programming, and Data Science in Kathmandu. Real production projects and career mentorship."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & VALUE PROPOSITION */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span>2026 Batch Admissions Open • Kathmandu Campus & Live Online</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]">
                Launch Your Tech Career With Production-Grade Engineering Courses.
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                Every curriculum is built around real-world software architecture, continuous line-by-line code reviews, and live cloud-deployed capstone portfolios.
              </p>
            </div>

            {/* Live Search & Quick Keyword Pills */}
            <div className="pt-2 space-y-3">
              <div className="relative max-w-2xl">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
                <input
                  type="text"
                  placeholder="Search courses, frameworks, or tools (e.g., Python, JavaScript, Scratch, Data Science)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base rounded-2xl border border-input-border bg-white text-ink shadow-xs placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Popular tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
                <span className="font-semibold text-ink">Popular:</span>
                {popularKeywords.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 rounded-lg bg-white border border-border-warm text-ink-soft hover:text-ink hover:border-navy/40 transition-colors cursor-pointer font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust Telemetry Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-ink-soft">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sage" />
                <span className="font-medium">1:12 Max Cohort Ratio</span>
              </div>
              <span className="text-input-border">•</span>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue" />
                <span className="font-medium">Direct Senior Mentorship</span>
              </div>
              <span className="text-input-border">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-navy" />
                <span className="font-medium">GitHub Code Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition with Generated Matching Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-navy/20 via-blue/15 to-sage/20 rounded-3xl blur-xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
                <img
                  src="/images/heroes/courses-hero.jpg"
                  alt="Students and developers learning in Kathmandu tech academy lab"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Kathmandu Innovation Lab</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Real Production Codebases</p>
                    <p className="text-[11px] text-ink-soft">Cloud-deployed capstone portfolios</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    2026 Batch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FEATURED EDITORIAL SPOTLIGHT */}
        {/* ========================================================================= */}
        {spotlightCourse && selectedCategory === 'All' && !searchQuery && (
          <CourseSpotlight
            course={spotlightCourse}
            onOpenAdvisor={handleOpenAdvisor}
            onQuickPreview={(c) => setQuickPreviewCourse(c)}
          />
        )}

        {/* Anchor point for smooth scrolling */}
        <div id="courses-catalog-anchor" className="scroll-mt-24" />

        {/* ========================================================================= */}
        {/* 4. COMPREHENSIVE FILTER & DISCOVERY TOOLBAR */}
        {/* ========================================================================= */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-border shadow-xs mb-8 space-y-4">
          {/* Top Row: Category Pills + View Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills with item counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {COURSE_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat as CourseCategory)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-paper-alt text-ink-soft hover:text-ink hover:bg-[#EAE5DA] border border-border-warm'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white text-ink-soft'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Mode & Sort Controls */}
            <div className="flex items-center gap-3 self-end lg:self-auto">
              <div className="flex items-center bg-paper-alt p-1 rounded-xl border border-border-warm">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white text-navy shadow-xs font-bold'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-white text-navy shadow-xs font-bold'
                      : 'text-ink-soft hover:text-ink'
                  }`}
                  title="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'alpha' | 'duration')}
                className="px-3 py-2 text-xs font-semibold rounded-xl border border-input-border bg-paper text-ink focus:outline-none focus:ring-2 focus:ring-navy cursor-pointer"
              >
                <option value="featured">Sort: Featured First</option>
                <option value="duration">Sort: Duration (Longest)</option>
                <option value="alpha">Sort: Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Secondary Filter Row: Skill Level, Mode, and Active Chips */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border-faint">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold text-ink-soft uppercase flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </span>

              {/* Skill Level Dropdown */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-input-border bg-white text-ink focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner Level</option>
                <option value="Intermediate">Intermediate Level</option>
                <option value="Advanced">Advanced Level</option>
              </select>

              {/* Learning Mode Dropdown */}
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-input-border bg-white text-ink focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="All">All Delivery Modes</option>
                <option value="In-Person">Classroom / In-Person</option>
                <option value="Online">Online Live</option>
                <option value="Hybrid">Hybrid Delivery</option>
              </select>

              {/* Reset button if filters are active */}
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue hover:underline px-2 py-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Results counter */}
            <div className="text-xs text-ink-soft font-medium">
              Showing <strong>{filteredCourses.length}</strong> of <strong>{allCourses.length}</strong> available curriculum{allCourses.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. COURSES GRID / LIST */}
        {/* ========================================================================= */}
        {isLoading && !allCourses.length ? (
          <div className="flex flex-col items-center justify-center gap-3 py-24 text-sm text-ink-soft">
            <Loader2 className="w-6 h-6 animate-spin text-navy" />
            <span>Loading courses catalog…</span>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                : 'space-y-4'
            }
          >
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                viewMode={viewMode}
                onOpenAdvisor={handleOpenAdvisor}
                onQuickPreview={(c) => setQuickPreviewCourse(c)}
                isComparing={comparingCourses.some((c) => c.id === course.id)}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20 bg-white rounded-3xl border border-border p-8 max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-paper-alt text-ink-soft flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7 text-ink-faint" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-ink">
                No courses match your filter criteria
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Try resetting your keywords or selecting "All" across skill levels and categories.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. PEDAGOGICAL EXCELLENCE (4 PILLARS) */}
        {/* ========================================================================= */}
        <CoursePedagogyStrip />

        {/* ========================================================================= */}
        {/* 7. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <CourseFAQAccordion />

        {/* ========================================================================= */}
        {/* 8. ADMISSIONS & ADVISOR CONSULTATION CTA */}
        {/* ========================================================================= */}
        <CourseConsultationCTA onOpenAdvisor={() => handleOpenAdvisor()} />
      </Container>

      {/* Floating Bottom Comparison Dock (When >= 1 course is selected) */}
      <ComparisonFloatingDock
        selectedCourses={comparingCourses}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        onClearAll={handleClearComparison}
      />

      {/* Side-by-Side Course Comparison Modal */}
      <CourseComparisonModal
        selectedCourses={comparingCourses}
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        onRemoveCourse={handleRemoveComparedCourse}
        onClearAll={handleClearComparison}
        onOpenAdvisor={handleOpenAdvisor}
      />

      {/* Quick Syllabus Outline Preview Modal */}
      <CourseQuickPreviewModal
        course={quickPreviewCourse}
        isOpen={!!quickPreviewCourse}
        onClose={() => setQuickPreviewCourse(null)}
        onOpenAdvisor={handleOpenAdvisor}
      />

      {/* Global Advisor Inquiry Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />
    </main>
  );
};
