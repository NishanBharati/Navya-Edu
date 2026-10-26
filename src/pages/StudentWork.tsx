import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Check,
  Search,
  ShieldCheck,
  GitBranch,
  Code2,
  ArrowRight,
  X,
  Building2,
  CheckCircle2,
  Globe,
  Sparkles,
  Layers,
  Cpu,
  Terminal,
  Gamepad2
} from 'lucide-react';
import type { StudentProject } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { STUDENT_PROJECTS, EnhancedStudentProject } from '../data/studentProjects';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { Modal } from '../components/common/Modal';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';
import { HeroImageWithParallax } from '../components/common/HeroImageWithParallax';
import { HeroLiveIndicator } from '../components/common/HeroLiveIndicator';
import {
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroCardsContainer,
  heroCardItem,
  bentoCardVariant,
  chipItem,
  staggerContainer,
  getMotionVariants,
  VIEWPORT_ONCE,
} from '../lib/motion';

export const StudentWork: React.FC = () => {
  const { items: dbProjects } = useSupabaseTable<EnhancedStudentProject>('student_projects', { orderBy: 'title', ascending: true });
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = getMotionVariants(prefersReducedMotion);

  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingProject, setInspectingProject] = useState<EnhancedStudentProject | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedInquirySubject, setSelectedInquirySubject] = useState('');

  const handleOpenAdvisor = (subject: string) => {
    setSelectedInquirySubject(subject);
    setIsAdvisorOpen(true);
  };

  // Merge database projects with local STUDENT_PROJECTS to ensure the full rich 7-capstone showcase is always complete
  const allProjects = useMemo(() => {
    // Start with local reference projects
    const combined: EnhancedStudentProject[] = [...STUDENT_PROJECTS];

    // If database has records, merge or overlay
    if (dbProjects && dbProjects.length > 0) {
      dbProjects.forEach((dbp) => {
        const idx = combined.findIndex(
          (p) => p.id === dbp.id || p.title.toLowerCase() === dbp.title.toLowerCase()
        );
        if (idx >= 0) {
          combined[idx] = { ...combined[idx], ...dbp };
        } else {
          combined.push(dbp);
        }
      });
    }

    return combined.map((p) => {
      const titleLower = p.title.toLowerCase();
      const localMatch = STUDENT_PROJECTS.find(
        (lp) => lp.id === p.id || lp.title.toLowerCase() === titleLower || titleLower.includes('krishiforecast')
      );

      // Determine robust guaranteed image asset
      let resolvedImage = p.image;
      if (
        !resolvedImage ||
        resolvedImage.includes('unsplash.com/photo-1460925895917') ||
        titleLower.includes('krishiforecast') ||
        titleLower.includes('price trend')
      ) {
        resolvedImage = '/images/courses/data-science.jpg';
      } else if (
        titleLower.includes('ecommerce') ||
        titleLower.includes('himalstore') ||
        titleLower.includes('carequeue')
      ) {
        resolvedImage = '/images/courses/web-development.jpg';
      } else if (titleLower.includes('space defenders') || titleLower.includes('scratch')) {
        resolvedImage = '/images/courses/scratch-advanced.jpg';
      } else if (titleLower.includes('fastscrape') || titleLower.includes('fastapi')) {
        resolvedImage = '/images/courses/python-advance.jpg';
      } else if (titleLower.includes('fintrack') || (titleLower.includes('python') && !titleLower.includes('advance'))) {
        resolvedImage = '/images/courses/python-beginner.jpg';
      } else if (titleLower.includes('housing') || titleLower.includes('nepalghar')) {
        resolvedImage = '/images/courses/data-science.jpg';
      }

      return {
        ...p,
        image: resolvedImage,
        isFeatured:
          localMatch?.isFeatured ??
          p.isFeatured ??
          (titleLower.includes('krishiforecast') ||
            titleLower.includes('himalstore') ||
            titleLower.includes('carequeue') ||
            titleLower.includes('space defenders')),
        featuredBadge:
          localMatch?.featuredBadge ??
          p.featuredBadge ??
          (titleLower.includes('krishiforecast')
            ? 'Flagship ML Capstone'
            : titleLower.includes('himalstore') || titleLower.includes('carequeue')
            ? 'Flagship Web Capstone'
            : titleLower.includes('space defenders')
            ? 'Kids Coding Showcase'
            : undefined),
        stats:
          localMatch?.stats ??
          p.stats ??
          (titleLower.includes('krishiforecast')
            ? { label: 'Model Accuracy', value: '88% R²' }
            : titleLower.includes('himalstore') || titleLower.includes('carequeue')
            ? { label: 'Lighthouse Score', value: '98/100' }
            : titleLower.includes('space defenders')
            ? { label: 'Physics Engine', value: '60 FPS Canvas' }
            : undefined),
      };
    });
  }, [dbProjects]);

  const categories = ['All', 'Web Development', 'Python Engineering', 'Data Science', 'Kids Coding'];

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory = selectedFilter === 'All' || p.category === selectedFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [allProjects, selectedFilter, searchQuery]);

  // Dynamic Bento Span calculation based on filter context and project traits
  const getBentoSpanClass = (project: EnhancedStudentProject, index: number, totalCount: number) => {
    if (selectedFilter === 'All') {
      if (project.id === 'project-ecommerce-storefront' || project.title.toLowerCase().includes('carequeue')) return 'lg:col-span-7';
      if (project.id === 'project-kanban-taskflow') return 'lg:col-span-5';
      if (project.id === 'project-nepal-housing-valuation') return 'lg:col-span-5';
      if (project.id === 'project-agro-price-prediction' || project.title.toLowerCase().includes('krishiforecast')) return 'lg:col-span-7';
      if (project.id === 'project-finance-tracker-cli') return 'lg:col-span-6';
      if (project.id === 'project-fastapi-microservice') return 'lg:col-span-6';
      if (project.id === 'project-scratch-space-defenders') return 'lg:col-span-12';
    }

    // Filtered mode spans
    if (totalCount === 1) return 'lg:col-span-12';
    if (totalCount === 2) {
      return index === 0 ? 'lg:col-span-7' : 'lg:col-span-5';
    }
    if (totalCount === 3) {
      return index === 0 ? 'lg:col-span-12' : 'lg:col-span-6';
    }
    return 'lg:col-span-6';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Globe className="w-3.5 h-3.5 text-blue" />;
      case 'Data Science':
        return <Cpu className="w-3.5 h-3.5 text-sage" />;
      case 'Python Engineering':
        return <Terminal className="w-3.5 h-3.5 text-navy" />;
      case 'Kids Coding':
        return <Gamepad2 className="w-3.5 h-3.5 text-[#966324]" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-navy" />;
    }
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Student Work & Production Capstone Reference Projects | Navya Ed Tech"
        description="Explore reference capstone software systems built and deployed at Navya Ed Tech. Real-world architecture, 100% PR review history, and live cloud demonstrations in Nepal."
        keywords="student projects Nepal, full stack capstone projects Kathmandu, React software portfolio Nepal, production code Nepal, engineering proof of work"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Student Work', path: '/student-work' },
          ]),
        ]}
      />

      <Container>
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Student Work & Capstones' }]} />
        </div>

        {/* ========================================================================= */}
        {/* 1. HERO SECTION & PROOF OF WORK */}
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
              <HeroLiveIndicator color="sage" />
              <span>Reference Capstone Architectures • Production Benchmark Code</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1
                variants={prefersReducedMotion ? undefined : heroHeadline}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]"
              >
                Proof of Work: Benchmark Systems Engineered at Navya.
              </motion.h1>
              <motion.p
                variants={prefersReducedMotion ? undefined : heroParagraph}
                className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
              >
                We believe a software engineer&apos;s true credential is live, working code. Below are the reference capstone applications designed by our senior engineering leads that students build, review via GitHub pull requests, and deploy to live cloud domains.
              </motion.p>
            </div>

            {/* Verification Badges / Rubric Standards */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardsContainer}
              className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            >
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs hover:border-navy/30 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                <span>OWASP Checked</span>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs hover:border-navy/30 transition-colors"
              >
                <GitBranch className="w-4 h-4 text-blue shrink-0" />
                <span>Full PR History</span>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs hover:border-navy/30 transition-colors"
              >
                <Code2 className="w-4 h-4 text-navy shrink-0" />
                <span>Clean Architecture</span>
              </motion.div>
              <motion.div
                variants={prefersReducedMotion ? undefined : heroCardItem}
                className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs hover:border-navy/30 transition-colors"
              >
                <Globe className="w-4 h-4 text-[#966324] shrink-0" />
                <span>Live Deployed</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition with Parallax Overlaid Card */}
          <div className="lg:col-span-5 relative">
            <HeroImageWithParallax
              src="/images/heroes/student-work-hero.jpg"
              alt="Student developers showcasing deployed software projects in Kathmandu"
              heightClass="h-[320px] sm:h-[380px]"
              priority={true}
              overlayBadgeTop={
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <HeroLiveIndicator color="sage" />
                  <span>Curriculum Reference Capstones</span>
                </div>
              }
              overlayCardBottom={
                <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Commercial Architecture</p>
                    <p className="text-xs text-ink-soft">Production cloud deployments</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Live Demos
                  </span>
                </div>
              }
            />
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FILTER TABS & SEARCH BAR */}
        {/* ========================================================================= */}
        <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border min-w-0 max-w-full">
          {/* Category Filter Pills */}
          <div
            role="tablist"
            aria-label="Filter student capstones by technology track"
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none min-w-0 max-w-full"
          >
            {categories.map((cat) => {
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-navy text-white shadow-sm ring-2 ring-navy/20'
                      : 'bg-white text-ink-soft hover:text-ink border border-border-warm hover:bg-paper-alt'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              aria-label="Search student projects by technology or title"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-xl border border-input-border bg-white text-xs sm:text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. STUDENT PROJECTS BENTO GRID */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-border space-y-3">
              <Code2 className="w-10 h-10 text-ink-faint mx-auto" />
              <h3 className="text-base font-bold text-ink">No projects found matching your search.</h3>
              <p className="text-xs text-ink-soft">Try clearing your search query or selecting a different category filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedFilter('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-blue hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {filteredProjects.map((project, idx) => {
                const bentoSpan = getBentoSpanClass(project, idx, filteredProjects.length);
                const isWide = bentoSpan.includes('col-span-12') || bentoSpan.includes('col-span-7') || bentoSpan.includes('col-span-8');

                return (
                  <motion.article
                    key={project.id}
                    variants={prefersReducedMotion ? undefined : bentoCardVariant}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className={`${bentoSpan} group bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-navy/40 transition-all duration-300 flex flex-col justify-between`}
                  >
                    <div>
                      {/* Project Cover Image with Hover Zoom */}
                      <div className="relative overflow-hidden bg-paper-alt border-b border-border">
                        <ImagePlaceholder
                          src={project.image}
                          alt={project.title}
                          priority={idx < 4}
                          aspectRatio={isWide && bentoSpan.includes('col-span-12') ? 'wide' : 'video'}
                          className="w-full"
                          imgClassName="group-hover:scale-106 transition-transform duration-500 ease-out"
                        >
                          {/* Badges Overlay */}
                          <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 z-10">
                            <Badge variant="navy" size="sm" className="shadow-xs backdrop-blur-md bg-navy/90 text-white flex items-center gap-1.5">
                              {getCategoryIcon(project.category)}
                              <span>{project.category}</span>
                            </Badge>
                            {project.featuredBadge && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/90 text-navy-dark text-xs font-mono font-bold tracking-wide shadow-xs backdrop-blur-md">
                                <Sparkles className="w-3 h-3" />
                                {project.featuredBadge}
                              </span>
                            )}
                          </div>

                          {/* Stat pill overlay if present */}
                          {project.stats && (
                            <div className="absolute bottom-3.5 right-3.5 z-10 px-3 py-1 rounded-xl bg-navy-dark/85 backdrop-blur-md text-white border border-white/15 text-xs font-mono font-bold shadow-md">
                              <span className="text-white/70 mr-1.5">{project.stats.label}:</span>
                              <span className="text-emerald-400">{project.stats.value}</span>
                            </div>
                          )}

                          {/* Subtle hover gradient scrim */}
                          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </ImagePlaceholder>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 sm:p-7 space-y-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block mb-1">
                            {project.completionContext}
                          </span>
                          <h2 className="text-lg sm:text-xl font-bold text-ink leading-snug group-hover:text-navy transition-colors">
                            {project.title}
                          </h2>
                        </div>

                        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                          {project.description}
                        </p>

                        {/* Engineering Architecture Highlights */}
                        <div className="space-y-2 pt-3 border-t border-border-faint">
                          <span className="text-xs font-mono uppercase tracking-wider text-ink-faint block font-semibold">
                            Key Architecture Benchmarks:
                          </span>
                          <ul className="space-y-2 text-xs text-ink">
                            {project.highlights.map((highlight, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2.5">
                                <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                                <span className="leading-snug text-ink-soft">{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Footer: Staggered Tech Stack Chips & Inspect Button */}
                    <div className="p-6 pt-4 border-t border-border-faint bg-paper-alt/60 space-y-4">
                      {/* Animated Tech Stack Chips */}
                      <motion.div
                        variants={prefersReducedMotion ? undefined : staggerContainer(0.04, 0.02)}
                        initial={prefersReducedMotion ? false : 'hidden'}
                        whileInView="visible"
                        viewport={VIEWPORT_ONCE}
                        className="flex flex-wrap gap-1.5"
                      >
                        {project.technologies.map((tech, tIdx) => (
                          <motion.span
                            key={tIdx}
                            variants={prefersReducedMotion ? undefined : chipItem}
                            className="text-xs px-2.5 py-1 rounded-lg bg-white text-navy font-mono font-medium border border-border-warm shadow-2xs hover:border-navy/30 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>

                      <button
                        type="button"
                        onClick={() => setInspectingProject(project)}
                        className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-navy hover:text-white text-navy text-xs font-bold border border-input-border hover:border-navy transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs group/btn"
                      >
                        <span>Inspect Technical Architecture</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. CODE REVIEW STANDARDS & METHODOLOGY TEASER */}
        {/* ========================================================================= */}
        <motion.section
          variants={motionVariants.fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="mb-16 lg:mb-24 p-6 sm:p-8 rounded-3xl bg-paper-alt border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="space-y-1.5 max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-blue font-bold">
              Production Rubric & Defense
            </span>
            <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
              Every capstone project is evaluated against the engineering benchmarks and code review standards defined in our pedagogical framework.
            </p>
          </div>

          <a
            href="/about#method"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-light transition-all shadow-xs group"
          >
            <span>Read our 4 pillars in The Navya Method</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
          </a>
        </motion.section>

        {/* ========================================================================= */}
        {/* 5. RECRUITER & EMPLOYER TALENT CONNECT */}
        {/* ========================================================================= */}
        <motion.section
          variants={motionVariants.fadeUp}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="p-8 sm:p-12 rounded-3xl bg-paper-alt border border-border text-center max-w-3xl mx-auto space-y-5"
        >
          <div className="w-12 h-12 rounded-full bg-navy/10 text-navy mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-ink">
            Building Your Junior Engineering Pipeline?
          </h3>

          <p className="text-sm text-ink-soft leading-relaxed max-w-xl mx-auto">
            Connect with Navya Ed Tech to observe upcoming capstone project defenses and interview job-ready engineering talent from our founding cohorts.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              href="/contact"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Connect with Academic Desk
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleOpenAdvisor('Founding Cohort Recruitment')}
            >
              Inquire About Upcoming Cohort Timelines
            </Button>
          </div>
        </motion.section>
      </Container>

      {/* ========================================================================= */}
      {/* 6. TECHNICAL ARCHITECTURE INSPECTION MODAL DRAWER */}
      {/* ========================================================================= */}
      <Modal
        isOpen={!!inspectingProject}
        onClose={() => setInspectingProject(null)}
        maxWidthClass="max-w-3xl"
        contentClassName="max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
        labelledBy="inspection-modal-title"
      >
        {inspectingProject && (
          <motion.div
            variants={motionVariants.scaleIn}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="space-y-6"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-blue uppercase tracking-wider">
                    {inspectingProject.completionContext}
                  </span>
                  {inspectingProject.featuredBadge && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-[#966324] text-xs font-mono font-bold">
                      {inspectingProject.featuredBadge}
                    </span>
                  )}
                </div>
                <h3 id="inspection-modal-title" className="text-xl sm:text-2xl font-bold text-ink">
                  {inspectingProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingProject(null)}
                aria-label="Close modal"
                className="p-2 rounded-xl bg-paper-alt hover:bg-border text-ink transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Project Image */}
            <ImagePlaceholder
              src={inspectingProject.image}
              alt={inspectingProject.title}
              aspectRatio="cinema"
              className="rounded-2xl border border-border overflow-hidden"
            />

            {/* Project Deep Dive Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                <Layers className="w-4 h-4 text-navy" />
                <span>Project Scope & Commercial Intent</span>
              </h4>
              <p className="text-sm text-ink-soft leading-relaxed">
                {inspectingProject.description}
              </p>
            </div>

            {/* Technical Highlights */}
            <div className="space-y-3 p-5 rounded-2xl bg-paper border border-border">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>Verified Engineering Capabilities</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
                {inspectingProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span className="leading-snug">{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue" />
                <span>Production Tech Stack & Frameworks</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {inspectingProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-navy/8 text-navy text-xs font-mono font-bold border border-navy/15 shadow-2xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-ink-soft">
                Curriculum Track: Learn to build production systems like this at Navya.
              </span>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  setInspectingProject(null);
                  handleOpenAdvisor(inspectingProject.title);
                }}
              >
                Inquire About This Track
              </Button>
            </div>
          </motion.div>
        )}
      </Modal>

      {/* Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedInquirySubject}
      />
    </main>
  );
};

