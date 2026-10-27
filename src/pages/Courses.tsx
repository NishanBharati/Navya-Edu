import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  BookOpen,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  CheckCircle2,
  Users,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  MessageSquare,
  GraduationCap,
  Gamepad2
} from 'lucide-react';
import { COURSES, LEGACY_COURSE_SLUGS } from '../data/courses';
import { Course, CourseCategory } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { Container } from '../components/common/Container';
import { CourseCard } from '../components/courses/CourseCard';
import { CourseSpotlight } from '../components/courses/CourseSpotlight';
import { CourseComparisonModal, ComparisonFloatingDock } from '../components/courses/CourseComparisonModal';
import { CourseQuickPreviewModal } from '../components/courses/CourseQuickPreviewModal';
import { CoursePedagogyStrip } from '../components/courses/CoursePedagogyStrip';
import { KidsPedagogyStrip } from '../components/courses/KidsPedagogyStrip';
import { CourseFAQAccordion } from '../components/courses/CourseFAQAccordion';
import { KidsFAQAccordion } from '../components/courses/KidsFAQAccordion';
import { CourseConsultationCTA } from '../components/courses/CourseConsultationCTA';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema, getItemListSchema } from '../utils/structuredData';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { HeroImageWithParallax } from '../components/common/HeroImageWithParallax';
import { HeroLiveIndicator } from '../components/common/HeroLiveIndicator';
import {
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroCardsContainer,
  heroCardItem,
  EASING,
} from '../lib/motion';

export const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const audienceParam = searchParams.get('audience');
  const audience: 'career' | 'kids' =
    audienceParam === 'kids' || audienceParam === 'young-coders' ? 'kids' : 'career';


  const { items: dbCourses, isLoading: _isLoading, error: dbError } = useSupabaseTable<Course>('courses', {
    orderBy: 'title',
    ascending: true
  });

  const [dismissError, setDismissError] = useState(false);

  // Guarantee fallback to verified COURSES if database is unreachable or empty
  const allCourses = useMemo(() => {
    if (dbCourses && dbCourses.length > 0) {
      const active = dbCourses.filter(
        (c) => !LEGACY_COURSE_SLUGS.has(c.slug) && c.status !== 'draft' && c.status !== 'archived'
      );
      if (active.length > 0) {
        return active;
      }
    }
    return COURSES;
  }, [dbCourses]);

  // Target pool based on active audience segment
  const audienceCourses = useMemo(() => {
    if (audience === 'kids') {
      return allCourses.filter((c) => c.category === 'Kids Coding');
    }
    return allCourses.filter((c) => c.category !== 'Kids Coding');
  }, [allCourses, audience]);

  // Available categories per audience
  const CAREER_CATEGORIES: CourseCategory[] = ['All', 'Web Development', 'Programming', 'Data & AI'];
  const KIDS_CATEGORIES = ['All', 'Beginner (Ages 8–11)', 'Advanced (Ages 11–14)'];

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
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

  const handleAudienceChange = (newAudience: 'career' | 'kids') => {
    if (newAudience === audience) return;
    const newParams = new URLSearchParams(searchParams);
    if (newAudience === 'kids') {
      newParams.set('audience', 'kids');
    } else {
      newParams.delete('audience');
    }
    setSearchParams(newParams, { replace: true });
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSearchQuery('');
  };

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

  // Popular search keywords per audience
  const popularKeywords = useMemo(() => {
    if (audience === 'kids') {
      return ['Scratch Beginner', 'Scratch Advanced', 'Game Physics', 'Animation', 'Young Coders'];
    }
    return ['React', 'Python', 'Web Development', 'Data Science', 'JavaScript'];
  }, [audience]);

  // Calculate dynamic category item counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: audienceCourses.length };
    if (audience === 'career') {
      CAREER_CATEGORIES.forEach((cat) => {
        if (cat !== 'All') {
          counts[cat] = audienceCourses.filter((c) => c.category === cat).length;
        }
      });
    } else {
      counts['Beginner (Ages 8–11)'] = audienceCourses.filter(
        (c) => c.slug === 'scratch-beginner' || c.level.toLowerCase().includes('beginner')
      ).length;
      counts['Advanced (Ages 11–14)'] = audienceCourses.filter(
        (c) => c.slug === 'scratch-advanced' || c.level.toLowerCase().includes('intermediate')
      ).length;
    }
    return counts;
  }, [audienceCourses, audience]);

  // Featured course spotlight
  const spotlightCourse = useMemo(() => {
    if (audience === 'kids') {
      return (
        audienceCourses.find((c) => c.slug === 'scratch-beginner') ||
        audienceCourses[0]
      );
    }
    return (
      audienceCourses.find((c) => c.featured && c.slug === 'web-development') ||
      audienceCourses.find((c) => c.featured && c.slug === 'python-advance') ||
      audienceCourses.find((c) => c.featured) ||
      audienceCourses[0]
    );
  }, [audienceCourses, audience]);

  // Filtered & Sorted courses
  const filteredCourses = useMemo(() => {
    let result = audienceCourses.filter((course) => {
      // Category filter
      let matchesCategory = true;
      if (audience === 'career') {
        matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
      } else {
        if (selectedCategory === 'Beginner (Ages 8–11)') {
          matchesCategory = course.slug === 'scratch-beginner' || course.level.toLowerCase().includes('beginner');
        } else if (selectedCategory === 'Advanced (Ages 11–14)') {
          matchesCategory =
            course.slug === 'scratch-advanced' ||
            course.level.toLowerCase().includes('intermediate') ||
            course.level.toLowerCase().includes('advanced');
        }
      }

      // Level filter
      const matchesLevel =
        selectedLevel === 'All' || course.level.toLowerCase().includes(selectedLevel.toLowerCase());

      // Search Query
      const q = searchQuery.toLowerCase().trim();
      const techs = course.technologies || course.skills || [];
      const matchesSearch =
        q === '' ||
        course.title.toLowerCase().includes(q) ||
        (course.shortDescription && course.shortDescription.toLowerCase().includes(q)) ||
        course.category.toLowerCase().includes(q) ||
        techs.some((t) => t.toLowerCase().includes(q)) ||
        course.careerPaths?.some((p) => p.toLowerCase().includes(q));

      return matchesCategory && matchesLevel && matchesSearch;
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
  }, [audienceCourses, audience, selectedCategory, selectedLevel, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    searchQuery.trim() !== '';

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSearchQuery('');
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title={
          audience === 'kids'
            ? 'Live Online Kids Coding & Scratch Courses in Nepal (Ages 8-14) | Navya Ed Tech'
            : 'Explore Professional IT Courses & Tech Training | Navya Ed Tech Nepal'
        }
        description={
          audience === 'kids'
            ? 'Creative block-based coding and game physics courses for children ages 8 to 14, taught live online. Small batches, supervised classes, and playful problem solving.'
            : 'Browse live online courses in Web Development, Python, and Data Science. Real production projects, small cohorts, and career mentorship.'
        }
        keywords={
          audience === 'kids'
            ? 'kids coding Nepal, online Scratch classes Nepal, online coding for children Nepal, STEM courses Nepal, young coders Nepal'
            : 'IT courses in Nepal, online IT training Nepal, web development course Nepal, online Python course Nepal, data science training Nepal'
        }
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Courses', path: '/courses' },
          ]),
          getItemListSchema(audienceCourses),
        ]}
      />

      <Container>
        {/* Cloud sync status notification if error exists */}
        {dbError && !dismissError && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                <strong>Offline verified data active:</strong> Serving verified in-memory curriculum catalog while database reconnects.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setDismissError(true)}
              className="text-amber-800 hover:text-amber-950 p-1 font-bold"
              aria-label="Dismiss notice"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 0. TOP-LEVEL AUDIENCE SEGMENTATION TOGGLE */}
        {/* ========================================================================= */}
        <section aria-label="Course Audience Segment" className="mb-8 pb-6 border-b border-border-warm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-ink-soft block">
              Audience Focus:
            </span>
            <p className="text-xs text-ink-faint">
              {audience === 'career'
                ? 'Engineering courses for career switchers, university students & working professionals.'
                : 'Creative computing & algorithmic logic for school students ages 8 to 14.'}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Audience course category switch"
            className="inline-flex p-1.5 rounded-2xl bg-white border border-border-warm shadow-xs max-w-full overflow-x-auto self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={audience === 'career'}
              onClick={() => handleAudienceChange('career')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                audience === 'career'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink hover:bg-paper-alt'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Career & Professional Courses</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={audience === 'kids'}
              onClick={() => handleAudienceChange('kids')}
              className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                audience === 'kids'
                  ? 'bg-navy text-white shadow-sm'
                  : 'text-ink-soft hover:text-ink hover:bg-paper-alt'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-amber-500" />
              <span>Kids & School Programs (Ages 8–14)</span>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 1. HERO SECTION & VALUE PROPOSITION */}
        {/* ========================================================================= */}
        <section className="mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            variants={prefersReducedMotion ? undefined : heroStaggerContainer}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              variants={prefersReducedMotion ? undefined : heroEyebrow}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase"
            >
              <HeroLiveIndicator color={audience === 'kids' ? 'amber' : 'sage'} />
              <span>
                {audience === 'kids'
                  ? 'Young Coders • Live Online & Weekend Batches'
                  : 'Admissions Open • 100% Live Online'}
              </span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                variants={prefersReducedMotion ? undefined : heroHeadline}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]"
              >
                {audience === 'kids'
                  ? 'Empower Your Child With Creative Coding & Problem Solving.'
                  : 'Explore Practical Software Engineering Syllabi.'}
              </motion.h1>
              <motion.p
                variants={prefersReducedMotion ? undefined : heroParagraph}
                className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
              >
                {audience === 'kids'
                  ? 'Transform passive screen time into active creation. Children ages 8 to 14 master computational sequencing, arcade game physics, and animation in safe, supervised live online classesy.'
                  : 'Every curriculum is designed around modern technologies, daily live coding sprints, line-by-line GitHub pull request audits, and production capstone portfolios.'}
              </motion.p>
            </div>

            {/* Live Search & Accessible Input */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardItem}
              className="pt-2 space-y-3"
              role="search"
            >
              <div className="relative max-w-2xl">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none" />
                <input
                  type="text"
                  aria-label={
                    audience === 'kids'
                      ? 'Search kids coding courses by name or game topic'
                      : 'Search courses by title, framework, or skill'
                  }
                  placeholder={
                    audience === 'kids'
                      ? 'Search kids courses (e.g., Scratch Beginner, Game Physics, Animation)...'
                      : 'Search by course name or skill (e.g., Python, JavaScript, React)...'
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchQuery('');
                  }}
                  className="w-full pl-12 pr-10 py-3.5 text-sm sm:text-base rounded-2xl border border-input-border bg-white text-ink shadow-xs placeholder-ink-faint focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search input"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink p-1.5 cursor-pointer"
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
            </motion.div>

            {/* Trust Telemetry Strip */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardsContainer}
              className="pt-2 flex flex-wrap items-center gap-5 text-xs text-ink-soft"
            >
              {audience === 'kids' ? (
                <>
                  <motion.div variants={prefersReducedMotion ? undefined : heroCardItem} className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-sage" />
                    <span className="font-medium">1:8 Mentor Attention</span>
                  </motion.div>
                  <span className="text-input-border">•</span>
                  <motion.div variants={prefersReducedMotion ? undefined : heroCardItem} className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue" />
                    <span className="font-medium">Supervised Live Classes</span>
                  </motion.div>
                  <span className="text-input-border">•</span>
                  <motion.div variants={prefersReducedMotion ? undefined : heroCardItem} className="flex items-center gap-1.5">
                    <Gamepad2 className="w-4 h-4 text-amber-600" />
                    <span className="font-medium">Playable Game Portfolios</span>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div variants={prefersReducedMotion ? undefined : heroCardItem} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage" />
                    <span className="font-medium">1:12 Max Cohort Ratio</span>
                  </motion.div>
                  <span className="text-input-border">•</span>
                  <motion.div variants={prefersReducedMotion ? undefined : heroCardItem} className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue" />
                    <span className="font-medium">Direct Senior Mentorship</span>
                  </motion.div>
                  <span className="text-input-border">•</span>
                  <motion.div variants={prefersReducedMotion ? undefined : heroCardItem} className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-navy" />
                    <span className="font-medium">GitHub PR Code Audits</span>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right Visual Composition with Parallax Overlaid Card */}
          <div className="lg:col-span-5 relative">
            <HeroImageWithParallax
              src={audience === 'kids' ? '/images/courses/scratch-beginner.jpg' : '/images/heroes/courses-hero.jpg'}
              alt={
                audience === 'kids'
                  ? 'Young students learning visual coding and game design in a Navya Ed Tech online class'
                  : 'Students and developers learning in a live online coding class'
              }
              heightClass="h-80 sm:h-96"
              priority={true}
              overlayBadgeTop={
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <HeroLiveIndicator color={audience === 'kids' ? 'amber' : 'emerald'} />
                  <span>{audience === 'kids' ? 'Young Coders (Ages 8–14)' : 'Live Online Classes'}</span>
                </div>
              }
              overlayCardBottom={
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">
                      {audience === 'kids' ? 'Interactive Games & Stories' : 'Verifiable Capstones'}
                    </p>
                    <p className="text-xs text-ink-soft">
                      {audience === 'kids' ? 'MIT Scratch to Python Pathway' : '100% student-owned codebases'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    {audience === 'kids' ? 'Live Online' : '100% Online'}
                  </span>
                </div>
              }
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FEATURED EDITORIAL SPOTLIGHT */}
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
        {/* 3. COMPREHENSIVE FILTER & DISCOVERY TOOLBAR (STICKY ON SCROLL) */}
        {/* ========================================================================= */}
        <div className="sticky top-16 sm:top-20 z-20 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-3xl border border-border shadow-md mb-8 space-y-4 transition-all">
          {/* Top Row: Category Pills + View Switcher */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Category Pills with item counts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {(audience === 'career' ? CAREER_CATEGORIES : KIDS_CATEGORIES).map((cat) => {
                const isActive = selectedCategory === cat;
                const count = categoryCounts[cat] ?? 0;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-paper-alt text-ink-soft hover:text-ink hover:bg-[#EAE5DA] border border-border-warm'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full ${
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
                  aria-label="Switch to grid layout"
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
                  aria-label="Switch to list layout"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'alpha' | 'duration')}
                aria-label="Sort courses"
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
                aria-label="Filter by skill level"
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-input-border bg-white text-ink focus:outline-none focus:ring-2 focus:ring-navy"
              >
                <option value="All">All Skill Levels</option>
                <option value="Beginner">Beginner Level</option>
                <option value="Intermediate">Intermediate Level</option>
                <option value="Advanced">Advanced Level</option>
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
              Showing <strong>{filteredCourses.length}</strong> of <strong>{audienceCourses.length}</strong> course{audienceCourses.length === 1 ? '' : 's'}
            </div>
          </div>

          {/* Active Filter Chips Bar */}
          {hasActiveFilters && (
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-border-faint text-xs">
              <span className="text-xs font-semibold text-ink-faint">Active:</span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy/5 border border-navy/15 text-navy text-xs font-medium">
                  <span>Category: {selectedCategory}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedCategory('All')}
                    aria-label={`Remove category filter ${selectedCategory}`}
                    className="hover:text-ink cursor-pointer ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedLevel !== 'All' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy/5 border border-navy/15 text-navy text-xs font-medium">
                  <span>Level: {selectedLevel}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedLevel('All')}
                    aria-label={`Remove level filter ${selectedLevel}`}
                    className="hover:text-ink cursor-pointer ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-navy/5 border border-navy/15 text-navy text-xs font-medium">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Remove search query filter"
                    className="hover:text-ink cursor-pointer ml-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-ink-faint hover:text-ink underline ml-auto cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 4. COURSES GRID / LIST (FLUID LAYOUT RE-FLOW & ANIMATE PRESENCE) */}
        {/* ========================================================================= */}
        {filteredCourses.length > 0 ? (
          <motion.div
            layout={!prefersReducedMotion}
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'
                : 'space-y-4'
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  layout={!prefersReducedMotion}
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, scale: 0.96, transition: { duration: 0.2 } }
                  }
                  transition={{ duration: 0.35, ease: EASING }}
                  className="h-full"
                >
                  <CourseCard
                    course={course}
                    viewMode={viewMode}
                    onOpenAdvisor={handleOpenAdvisor}
                    onQuickPreview={(c) => setQuickPreviewCourse(c)}
                    isComparing={comparingCourses.some((c) => c.id === course.id)}
                    onToggleCompare={handleToggleCompare}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty state with guidance */
          <div className="text-center py-16 sm:py-20 bg-white rounded-3xl border border-border p-8 max-w-lg mx-auto space-y-5 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-paper-alt text-ink-soft flex items-center justify-center mx-auto">
              <BookOpen className="w-7 h-7 text-ink-faint" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-ink">
                No courses match your filter criteria
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                {searchQuery
                  ? `No course matches "${searchQuery}" in ${selectedCategory === 'All' ? 'the catalog' : selectedCategory}.`
                  : 'No course currently matches the selected combination of skill level and delivery mode.'}
              </p>
              <p className="text-xs text-ink-faint">
                Try clearing your search terms or resetting filters to see all {audienceCourses.length} available tracks.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep transition-colors cursor-pointer shadow-xs"
              >
                Reset All Filters
              </button>
              <button
                type="button"
                onClick={() => handleOpenAdvisor()}
                className="px-4 py-2.5 rounded-xl bg-paper-alt hover:bg-[#EAE5DA] text-ink text-xs font-semibold transition-colors cursor-pointer border border-border-warm inline-flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue" />
                <span>{audience === 'kids' ? 'Ask a Young Coders Counselor' : 'Ask an Academic Advisor'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. PEDAGOGICAL EXCELLENCE */}
        {/* ========================================================================= */}
        {audience === 'kids' ? <KidsPedagogyStrip /> : <CoursePedagogyStrip />}

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        {audience === 'kids' ? <KidsFAQAccordion /> : <CourseFAQAccordion />}

        {/* ========================================================================= */}
        {/* 7. ADMISSIONS & ADVISOR CONSULTATION CTA */}
        {/* ========================================================================= */}
        <CourseConsultationCTA mode={audience} onOpenAdvisor={() => handleOpenAdvisor()} />
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
