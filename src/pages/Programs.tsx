import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Layers,
  ShieldCheck,
  GraduationCap,
  Check,
  HelpCircle,
  Sparkles,
  CheckCheck,
  Compass,
  Clock,
  Code
} from 'lucide-react';
import type { Program } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { PROGRAMS } from '../data/programs';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HeroImageWithParallax } from '../components/common/HeroImageWithParallax';
import { HeroLiveIndicator } from '../components/common/HeroLiveIndicator';
import { CareerPipelineStepper } from '../components/programs/CareerPipelineStepper';
import {
  EASING,
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroCardsContainer,
  heroCardItem,
} from '../lib/motion';

export const Programs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const { items: dbPrograms } = useSupabaseTable<Program>('programs', { orderBy: 'title', ascending: true });

  const categories = ['All', 'Career Programs', 'Specialized Tracks', 'Kids & School Programs'];

  const initialCategory = useMemo(() => {
    const cat = searchParams.get('category');
    if (cat && categories.includes(cat)) return cat;
    if (searchParams.get('audience') === 'kids') return 'Kids & School Programs';
    return 'All';
  }, [searchParams]);

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedProgramTitle, setSelectedProgramTitle] = useState('');

  // Fallback to local PROGRAMS data if database returns empty
  const allPrograms = useMemo(() => {
    if (dbPrograms && dbPrograms.length > 0) {
      return dbPrograms;
    }
    return PROGRAMS;
  }, [dbPrograms]);

  const filteredPrograms = useMemo(() => {
    if (selectedCategory === 'All') return allPrograms;
    return allPrograms.filter((p) => p.category === selectedCategory);
  }, [allPrograms, selectedCategory]);

  // Active Program State for the Interactive Explorer
  const [activeProgramId, setActiveProgramId] = useState<string>(
    filteredPrograms[0]?.id || 'web-development-career-track'
  );

  // Sync active program when category filter changes
  useEffect(() => {
    if (filteredPrograms.length > 0) {
      const isCurrentInFiltered = filteredPrograms.some((p) => p.id === activeProgramId);
      if (!isCurrentInFiltered) {
        setActiveProgramId(filteredPrograms[0].id);
      }
    }
  }, [filteredPrograms, activeProgramId]);

  const activeProgram = useMemo(() => {
    return filteredPrograms.find((p) => p.id === activeProgramId) || filteredPrograms[0] || allPrograms[0];
  }, [filteredPrograms, activeProgramId, allPrograms]);

  // Sync category selection with URL
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
      newParams.delete('audience');
    } else if (cat === 'Kids & School Programs') {
      newParams.set('audience', 'kids');
      newParams.set('category', cat);
    } else {
      newParams.delete('audience');
      newParams.set('category', cat);
    }
    setSearchParams(newParams, { replace: true });
  };

  const handleOpenAdvisor = (programTitle: string) => {
    setSelectedProgramTitle(programTitle);
    setIsAdvisorOpen(true);
  };

  const isKidsActive = selectedCategory === 'Kids & School Programs';

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Career Programs & Specialized Technology Tracks | Navya Ed Tech"
        description="Comprehensive career programs designed to transition learners into production software engineering roles in Nepal. 1:12 cohort ratios, daily pull requests, and live cloud deployment."
        keywords="software engineering programs Nepal, full stack career track Kathmandu, Python developer roadmap Nepal, coding bootcamp Nepal, kids STEM programs"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Career Programs', path: '/programs' },
          ]),
        ]}
      />

      <Container>
        <Breadcrumbs className="mb-6" items={[{ label: 'Career Programs' }]} />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION & VALUE PROPOSITION */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
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
              <HeroLiveIndicator color={isKidsActive ? 'amber' : 'blue'} />
              <span>
                {isKidsActive
                  ? 'Young Coders STEM Track • Kathmandu Lab & Weekend Batches (Ages 8–14)'
                  : 'Multi-Tier Career Programs • Kathmandu Campus & Live Online'}
              </span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                variants={prefersReducedMotion ? undefined : heroHeadline}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]"
              >
                {isKidsActive
                  ? 'Structured STEM Programs Designed for Young Minds.'
                  : 'Comprehensive Programs Built for Production Engineering Roles.'}
              </motion.h1>
              <motion.p
                variants={prefersReducedMotion ? undefined : heroParagraph}
                className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
              >
                {isKidsActive
                  ? 'Our school-age STEM track combines visual block coding, algorithmic puzzles, 2D arcade physics, and smooth progression into text-based Python in small, supervised cohorts.'
                  : 'Our career tracks combine multiple interconnected technology modules, agile sprint simulations, architectural reviews, and production capstone deployments to transition you into a professional software engineer.'}
              </motion.p>
            </div>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardsContainer}
              className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">Format</span>
                <strong className="text-xs sm:text-sm font-bold text-ink block">
                  {isKidsActive ? 'Lab & Weekend' : 'Classroom & Live'}
                </strong>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">Mentorship</span>
                <strong className="text-xs sm:text-sm font-bold text-sage-ink block">
                  {isKidsActive ? '1 : 8 Cohort Max' : '1 : 12 Cohort Max'}
                </strong>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">
                  {isKidsActive ? 'Outcomes' : 'Capstone'}
                </span>
                <strong className="text-xs sm:text-sm font-bold text-navy block">
                  {isKidsActive ? '6+ Games Built' : 'Cloud Deployed'}
                </strong>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1 hover:border-navy/30 transition-colors"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">
                  {isKidsActive ? 'Path' : 'Pipeline'}
                </span>
                <strong className="text-xs sm:text-sm font-bold text-blue block">
                  {isKidsActive ? 'Python Readiness' : 'Career Readiness'}
                </strong>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition with Parallax Overlaid Card */}
          <div className="lg:col-span-5 relative">
            <HeroImageWithParallax
              src={isKidsActive ? '/images/courses/scratch-beginner.jpg' : '/images/heroes/programs-hero.jpg'}
              alt={
                isKidsActive
                  ? 'Young students learning visual coding and robotics in Kathmandu'
                  : 'Software engineering mentorship and career program in Kathmandu'
              }
              heightClass="h-[320px] sm:h-[380px]"
              priority={true}
              overlayBadgeTop={
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <HeroLiveIndicator color={isKidsActive ? 'amber' : 'blue'} />
                  <span>{isKidsActive ? 'Young Coders STEM Track' : 'Engineering Fellowship'}</span>
                </div>
              }
              overlayCardBottom={
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">
                      {isKidsActive ? 'Creative Coding & Logic' : 'Multi-Track Curriculums'}
                    </p>
                    <p className="text-[11px] text-ink-soft">
                      {isKidsActive
                        ? 'MIT Scratch to Python Pathway (Ages 8–14)'
                        : 'From fundamentals to scalable system design'}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    {isKidsActive ? 'Ages 8–14' : 'Industry Standard'}
                  </span>
                </div>
              }
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <section className="mb-8 min-w-0 max-w-full">
          <div
            role="tablist"
            aria-label="Filter programs by category"
            className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-border scrollbar-none min-w-0 max-w-full"
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-white text-ink-soft hover:text-ink border border-border-warm hover:bg-paper-alt'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE PROGRAM EXPLORER (TABBED 2026 ARCHITECTURE) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 space-y-8">
          {/* Top Compact Program Selector Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-faint">
                Select a Program Track to Explore Full Syllabus ({filteredPrograms.length} Tracks Available)
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Interactive Program Selector"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {filteredPrograms.map((program) => {
                const isSelected = activeProgram?.id === program.id;
                return (
                  <button
                    key={program.id}
                    type="button"
                    role="tab"
                    id={`program-tab-${program.id}`}
                    aria-selected={isSelected}
                    aria-controls={`program-panel-${program.id}`}
                    onClick={() => setActiveProgramId(program.id)}
                    className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? 'bg-white border-navy ring-2 ring-navy/20 shadow-md'
                        : 'bg-white/80 hover:bg-white border-border hover:border-navy/30 hover:shadow-xs'
                    }`}
                  >
                    {/* Active Accent Indicator */}
                    {isSelected && (
                      <div className="absolute top-0 left-6 right-6 h-[3px] bg-navy rounded-b-full" />
                    )}

                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-navy/10 text-navy">
                          {program.category.split(' ')[0]}
                        </span>
                        <span className="text-[11px] font-semibold text-ink-faint">
                          {program.duration.split(' ')[0]} {program.duration.split(' ')[1]}
                        </span>
                      </div>

                      <h3 className={`text-sm sm:text-base font-extrabold leading-snug line-clamp-2 ${
                        isSelected ? 'text-navy' : 'text-ink'
                      }`}>
                        {program.title}
                      </h3>

                      <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed">
                        {program.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-border-faint flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-blue">
                        {isSelected ? 'Currently Viewing' : 'Click to View Syllabus'}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'text-navy translate-x-0.5' : 'text-ink-faint'
                      }`} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Program Showcase Stage */}
          {activeProgram && (
            <AnimatePresence mode="wait">
              <motion.article
                key={activeProgram.id}
                id={`program-panel-${activeProgram.id}`}
                role="tabpanel"
                aria-labelledby={`program-tab-${activeProgram.id}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASING }}
                className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8"
              >
                {/* Header Box */}
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border-faint">
                  <div className="space-y-3 max-w-3xl">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-3 py-1 rounded-md bg-navy/10 text-navy text-xs font-mono font-bold">
                        {activeProgram.category}
                      </span>
                      {activeProgram.category === 'Kids & School Programs' ? (
                        <span className="px-3 py-1 rounded-md bg-amber-500/15 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                          <span>Ages 8–14 • Creative STEM Project Showcase</span>
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-md bg-sage/20 text-sage-ink text-xs font-bold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Placement Assistance Included</span>
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                      <Link
                        to={`/programs/${activeProgram.slug}`}
                        className="hover:text-blue transition-colors"
                      >
                        {activeProgram.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                      {activeProgram.description}
                    </p>
                  </div>

                  {/* Right Meta Card */}
                  <div className="shrink-0 bg-paper-alt p-5 rounded-2xl border border-border-warm space-y-3 min-w-[260px]">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-ink-soft">Duration:</span>
                        <strong className="text-ink font-bold">{activeProgram.duration}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-ink-soft">Format:</span>
                        <span className="text-ink font-medium">{activeProgram.format}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-ink-soft">Eligibility:</span>
                        <span className="text-ink font-medium text-right max-w-[140px] truncate" title={activeProgram.eligibility}>
                          {activeProgram.eligibility.split(' ')[0]} Entry
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 space-y-2">
                      <Button
                        variant="primary"
                        size="md"
                        className="w-full justify-center font-bold"
                        href={`/programs/${activeProgram.slug}`}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Explore Full Track
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => handleOpenAdvisor(activeProgram.title)}
                      >
                        {activeProgram.category === 'Kids & School Programs' ? 'Talk to a Kids Counselor' : 'Talk to an Advisor'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 3-Column Detailed Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1: Who It's For & Prerequisites */}
                  <div className="p-5 rounded-2xl bg-paper border border-border-soft space-y-3">
                    <div className="flex items-center gap-2 text-blue">
                      <UserCheck className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider block">
                        Target Audience
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
                      {activeProgram.whoItsFor.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-border-soft text-[11px] text-ink-soft">
                      <strong className="text-ink block">Prerequisite check:</strong>
                      <span>{activeProgram.eligibility}</span>
                    </div>
                  </div>

                  {/* Column 2: What It Includes / Curriculum */}
                  <div className="p-5 rounded-2xl bg-paper border border-border-soft space-y-3">
                    <div className="flex items-center gap-2 text-navy">
                      <Layers className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider block">
                        Curriculum & Deliverables
                      </span>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-ink">
                      {activeProgram.whatItIncludes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {activeProgram.coursesIncluded && activeProgram.coursesIncluded.length > 0 && (
                      <div className="pt-2 border-t border-border-soft">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-1">
                          Integrated Courses:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {activeProgram.coursesIncluded.map((c, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] px-2 py-0.5 rounded bg-paper-alt text-navy font-mono border border-border-warm"
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Column 3: Expected Outcomes & Career / Learning Readiness */}
                  <div className="p-5 rounded-2xl bg-sage/10 border border-sage/25 space-y-3">
                    <div className="flex items-center gap-2 text-sage-ink">
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider block">
                        {activeProgram.category === 'Kids & School Programs' ? 'Learning Outcomes' : 'Career Outcomes'}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-sage-ink">
                      {activeProgram.expectedOutcome.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-sage-ink shrink-0 mt-0.5 font-bold" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2 border-t border-sage/20 text-[11px] text-sage-ink">
                      <strong className="block font-bold">
                        {activeProgram.category === 'Kids & School Programs' ? 'Mentorship & Support:' : 'Career Support:'}
                      </strong>
                      <span>
                        {activeProgram.category === 'Kids & School Programs'
                          ? '1:8 instructor ratio, supervised coding lab, verified certificate of achievement, and showcase of interactive games.'
                          : 'Comprehensive portfolio defense, interview coaching, and recommendation pathways for junior engineering roles at Navya EdTech.'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          )}

          {/* Hidden Semantic Indexing for Crawlers & Search Engines (SSG DOM Preservation) */}
          <div className="sr-only" aria-hidden="true">
            {allPrograms.map((p) => (
              <section key={`crawler-index-${p.id}`}>
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <p>{p.duration} - {p.format}</p>
                <ul>
                  {p.whatItIncludes.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
                <ul>
                  {p.expectedOutcome.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. 4-STAGE CAREER TRANSFORMATION PIPELINE (CONNECTED ANIMATED STEPPER) */}
        {/* ========================================================================= */}
        <CareerPipelineStepper />

        {/* ========================================================================= */}
        {/* 5. CAREER TRACKS VS SHORT COURSES COMPARISON (HIGH-IMPACT REDESIGN) */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Decision Guide"
            title="Career Programs vs. Single Specialized Courses"
            description="Understand which pathway best matches your current experience level, timeline, and professional career goals."
          />

          <div className="mt-10 overflow-x-auto min-w-0 max-w-full rounded-2xl border border-border bg-white shadow-xs">
            <table className="min-w-[640px] w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-xs font-bold uppercase tracking-wider">
                  <th className="p-4 sm:p-5 bg-paper-alt text-ink w-1/4">
                    Feature & Scope
                  </th>
                  <th className="p-4 sm:p-5 bg-navy/5 text-navy border-x border-navy/20 w-5/12 relative">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-sm sm:text-base">Comprehensive Career Programs</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-navy text-white tracking-normal">
                        RECOMMENDED
                      </span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 bg-paper-alt text-ink-soft w-1/3">
                    <span className="font-bold text-xs sm:text-sm">Single Specialized Courses</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft text-xs sm:text-sm">
                {/* Row 1 */}
                <tr className="hover:bg-navy/[0.02] transition-colors duration-150">
                  <td className="p-4 sm:p-5 font-bold text-ink bg-paper/40">
                    Ideal Candidate
                  </td>
                  <td className="p-4 sm:p-5 text-navy font-semibold bg-navy/[0.02] border-x border-navy/15">
                    <div className="space-y-1">
                      <p>Fresh graduates, career switchers, aspiring full-stack engineers</p>
                      <span className="text-[11px] text-blue font-medium block">→ Built for total career transition</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-ink-soft">
                    Working developers upskilling in a specific technology (e.g. Python, JavaScript)
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-navy/[0.02] transition-colors duration-150">
                  <td className="p-4 sm:p-5 font-bold text-ink bg-paper/40">
                    Typical Duration
                  </td>
                  <td className="p-4 sm:p-5 text-navy font-semibold bg-navy/[0.02] border-x border-navy/15">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-navy/10 text-navy font-mono">
                        3 to 6 Months
                      </span>
                      <span className="text-xs font-medium text-ink-soft">Multi-Module Immersion</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-ink-soft">
                    6 to 8 Weeks (Targeted Skill Focus)
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-navy/[0.02] transition-colors duration-150">
                  <td className="p-4 sm:p-5 font-bold text-ink bg-paper/40">
                    Portfolio Capstones
                  </td>
                  <td className="p-4 sm:p-5 text-navy font-semibold bg-navy/[0.02] border-x border-navy/15">
                    <div className="flex items-start gap-2">
                      <CheckCheck className="w-4 h-4 text-sage shrink-0 mt-0.5 font-bold" />
                      <div>
                        <strong className="text-ink font-bold block">2 to 3 Major Full-Stack Production Systems</strong>
                        <span className="text-xs text-ink-soft">Live deployed to cloud with automated CI/CD pipelines & test suites</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-ink-soft">
                    1 Focused Domain Project (e.g., CLI tool or standalone script)
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-navy/[0.02] transition-colors duration-150">
                  <td className="p-4 sm:p-5 font-bold text-ink bg-paper/40">
                    Career Preparation
                  </td>
                  <td className="p-4 sm:p-5 text-navy font-semibold bg-navy/[0.02] border-x border-navy/15">
                    <div className="flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-navy font-bold block">Capstone Defense Panel & Direct Referrals</strong>
                        <span className="text-xs text-ink-soft">Technical mock interviews, live defense before senior panel, and referral pipeline</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-ink-soft">
                    Resume audit guidance & general engineering community access
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-navy/[0.02] transition-colors duration-150">
                  <td className="p-4 sm:p-5 font-bold text-ink bg-paper/40">
                    Mentorship Depth
                  </td>
                  <td className="p-4 sm:p-5 text-navy font-semibold bg-navy/[0.02] border-x border-navy/15">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-ink font-bold block">Dedicated 1-on-1 Office Hours & PR Reviews</strong>
                        <span className="text-xs text-ink-soft">Line-by-line GitHub pull request audits on every assignment</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 sm:p-5 text-ink-soft">
                    In-class Q&A and group project review
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ADVISOR CONSULTATION CTA */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-paper-alt border border-border text-center max-w-3xl mx-auto space-y-5">
          <div className="w-12 h-12 rounded-full bg-navy/10 text-navy mx-auto flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-ink">
            {isKidsActive
              ? 'Have Questions About Our Young Coders STEM Track?'
              : 'Unsure Which Career Program Fits Your Background?'}
          </h3>

          <p className="text-sm text-ink-soft leading-relaxed max-w-xl mx-auto">
            {isKidsActive
              ? 'Schedule a lab visit or speak with our Young Coders instructor to review our curriculum, computer lab safety, and weekend batch timings for your child.'
              : 'Speak with an academic counselor to evaluate your current programming level, discuss upcoming batch schedules, and review fee installment plans in NPR.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => handleOpenAdvisor(isKidsActive ? 'Young Coders Counseling' : 'General Career Counseling')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {isKidsActive ? 'Talk to a Young Coders Counselor' : 'Talk to an Academic Advisor'}
            </Button>
            <Button
              variant="outline"
              size="md"
              href="/contact"
            >
              Contact Admissions Desk
            </Button>
          </div>
        </section>
      </Container>

      {/* Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedProgramTitle}
      />
    </main>
  );
};
