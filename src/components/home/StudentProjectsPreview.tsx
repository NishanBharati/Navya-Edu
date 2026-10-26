import React, { useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, CheckCircle2, ShieldCheck, Code2, Layers, X, Globe, Cpu, Terminal } from 'lucide-react';
import type { StudentProject } from '../../types';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { STUDENT_PROJECTS, EnhancedStudentProject } from '../../data/studentProjects';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { fadeUp, staggerContainer, chipItem, bentoCardVariant, VIEWPORT_ONCE, getMotionVariants } from '../../lib/motion';

export const StudentProjectsPreview: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const motionVariants = getMotionVariants(prefersReducedMotion);
  const { items: dbProjects } = useSupabaseTable<EnhancedStudentProject>('student_projects', { orderBy: 'title', ascending: true });
  const [inspectingProject, setInspectingProject] = useState<EnhancedStudentProject | null>(null);

  const allProjects = useMemo(() => {
    const combined: EnhancedStudentProject[] = [...STUDENT_PROJECTS];
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
      };
    });
  }, [dbProjects]);

  const featuredProject = allProjects.find((p) => p.isFeatured) || allProjects[0];
  const sideProjects = allProjects.filter((p) => p.id !== featuredProject?.id).slice(0, 2);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Development':
        return <Globe className="w-3.5 h-3.5 text-blue" />;
      case 'Data Science':
        return <Cpu className="w-3.5 h-3.5 text-sage" />;
      case 'Python Engineering':
        return <Terminal className="w-3.5 h-3.5 text-navy" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-navy" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Capstone Architecture Standards"
            title="Systems You Will Engineer & Deploy"
            description="Explore the production-grade reference capstones designed by our senior engineering leads that students build, review via GitHub PRs, and deploy."
          />
          <div className="shrink-0">
            <Button
              variant="outline"
              size="md"
              href="/student-work"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View All Capstones ({allProjects.length})
            </Button>
          </div>
        </div>

        {/* Bento Layout: 1 Wide Flagship Hero Card + 2 Stacked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Flagship Featured Capstone Card (7 cols) */}
          {featuredProject && (
            <motion.div
              variants={prefersReducedMotion ? undefined : bentoCardVariant}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="lg:col-span-7 h-full"
            >
              <article className="group bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-navy/40 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="relative overflow-hidden bg-paper-alt border-b border-border">
                    <ImagePlaceholder
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      aspectRatio="video"
                      priority={true}
                      className="w-full"
                      imgClassName="group-hover:scale-106 transition-transform duration-500 ease-out"
                    >
                      <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2 z-10">
                        <Badge variant="navy" size="sm" className="shadow-xs backdrop-blur-md bg-navy/90 text-white flex items-center gap-1.5">
                          {getCategoryIcon(featuredProject.category)}
                          <span>{featuredProject.category}</span>
                        </Badge>
                        {featuredProject.featuredBadge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/90 text-navy-dark text-xs font-mono font-bold tracking-wide shadow-xs backdrop-blur-md">
                            <Sparkles className="w-3 h-3" />
                            {featuredProject.featuredBadge}
                          </span>
                        )}
                      </div>

                      {featuredProject.stats && (
                        <div className="absolute bottom-3.5 right-3.5 z-10 px-3 py-1 rounded-xl bg-navy-dark/85 backdrop-blur-md text-white border border-white/15 text-xs font-mono font-bold shadow-md">
                          <span className="text-white/70 mr-1.5">{featuredProject.stats.label}:</span>
                          <span className="text-emerald-400">{featuredProject.stats.value}</span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </ImagePlaceholder>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block mb-1">
                        {featuredProject.completionContext}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-ink leading-snug group-hover:text-navy transition-colors">
                        {featuredProject.title}
                      </h3>
                    </div>

                    <p className="text-sm text-ink-soft leading-relaxed">
                      {featuredProject.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-border-faint">
                      <span className="text-xs font-mono uppercase tracking-wider text-ink-faint block font-semibold">
                        Key Architecture Benchmarks:
                      </span>
                      <ul className="space-y-2 text-xs text-ink">
                        {featuredProject.highlights.slice(0, 3).map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                            <span className="leading-snug text-ink-soft">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-border-faint bg-paper-alt/60 space-y-4">
                  {/* Staggered Tech Chips */}
                  <motion.div
                    variants={prefersReducedMotion ? undefined : staggerContainer(0.04, 0.02)}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    whileInView="visible"
                    viewport={VIEWPORT_ONCE}
                    className="flex flex-wrap gap-1.5"
                  >
                    {featuredProject.technologies.map((tech, tIdx) => (
                      <motion.span
                        key={tIdx}
                        variants={prefersReducedMotion ? undefined : chipItem}
                        className="text-xs px-2.5 py-1 rounded-lg bg-white text-navy font-mono font-medium border border-border-warm shadow-2xs hover:border-navy/30 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setInspectingProject(featuredProject)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-navy hover:text-white text-navy text-xs font-bold border border-input-border hover:border-navy transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs group/btn"
                    >
                      <span>Inspect Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      href="/student-work"
                    >
                      Full Details
                    </Button>
                  </div>
                </div>
              </article>
            </motion.div>
          )}

          {/* Right Column: 2 Stacked Bento Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8 justify-between">
            {sideProjects.map((project, sIdx) => (
              <motion.div
                key={project.id}
                variants={prefersReducedMotion ? undefined : bentoCardVariant}
                initial={prefersReducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="flex-1"
              >
                <article className="group bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-navy/40 transition-all duration-300 flex flex-col justify-between h-full">
                  <div>
                    <div className="relative overflow-hidden bg-paper-alt border-b border-border">
                      <ImagePlaceholder
                        src={project.image}
                        alt={project.title}
                        aspectRatio="video"
                        className="w-full"
                        imgClassName="group-hover:scale-106 transition-transform duration-500 ease-out"
                      >
                        <div className="absolute top-3 left-3">
                          <Badge variant="navy" size="sm" className="shadow-xs backdrop-blur-md bg-navy/90 text-white">
                            {project.category}
                          </Badge>
                        </div>
                      </ImagePlaceholder>
                    </div>

                    <div className="p-5 sm:p-6 space-y-2.5">
                      <span className="text-xs font-mono font-bold text-blue tracking-wider uppercase block">
                        {project.completionContext}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-ink leading-snug group-hover:text-navy transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-ink-soft leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-3 border-t border-border-faint bg-paper-alt/50 flex items-center justify-between gap-3">
                    <motion.div
                      variants={prefersReducedMotion ? undefined : staggerContainer(0.04, 0.02)}
                      initial={prefersReducedMotion ? false : 'hidden'}
                      whileInView="visible"
                      viewport={VIEWPORT_ONCE}
                      className="flex flex-wrap gap-1"
                    >
                      {project.technologies.slice(0, 3).map((tech, idx) => (
                        <motion.span
                          key={idx}
                          variants={prefersReducedMotion ? undefined : chipItem}
                          className="text-xs px-2 py-0.5 rounded bg-white text-navy font-mono border border-border-warm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-xs px-1.5 py-0.5 rounded text-ink-soft font-mono">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </motion.div>

                    <button
                      type="button"
                      onClick={() => setInspectingProject(project)}
                      className="text-xs font-bold text-navy hover:text-blue flex items-center gap-1 group-hover:translate-x-0.5 transition-transform shrink-0 cursor-pointer"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* Quick-Preview Technical Architecture Modal */}
      <Modal
        isOpen={!!inspectingProject}
        onClose={() => setInspectingProject(null)}
        maxWidthClass="max-w-3xl"
        contentClassName="max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
        labelledBy="home-inspection-modal-title"
      >
        {inspectingProject && (
          <motion.div
            variants={motionVariants.scaleIn}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="space-y-6"
          >
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
                <h3 id="home-inspection-modal-title" className="text-xl sm:text-2xl font-bold text-ink">
                  {inspectingProject.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectingProject(null)}
                aria-label="Close modal"
                className="p-2 rounded-xl bg-paper-alt hover:bg-border text-ink transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ImagePlaceholder
              src={inspectingProject.image}
              alt={inspectingProject.title}
              aspectRatio="cinema"
              className="rounded-2xl border border-border overflow-hidden"
            />

            <div className="space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-navy flex items-center gap-2">
                <Layers className="w-4 h-4 text-navy" />
                <span>Project Scope & Commercial Intent</span>
              </h4>
              <p className="text-sm text-ink-soft leading-relaxed">
                {inspectingProject.description}
              </p>
            </div>

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

            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-ink-soft">
                Explore all 7 reference architectures on our student work showcase.
              </span>
              <Button
                variant="primary"
                size="md"
                href="/student-work"
              >
                Go to Student Work Page
              </Button>
            </div>
          </motion.div>
        )}
      </Modal>
    </section>
  );
};

