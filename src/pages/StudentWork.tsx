import React, { useState, useMemo } from 'react';
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
  Lock,
  Globe
} from 'lucide-react';
import type { StudentProject } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { STUDENT_PROJECTS } from '../data/studentProjects';
import { Container } from '../components/common/Container';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { Modal } from '../components/common/Modal';
import { ImagePlaceholder } from '../components/common/ImagePlaceholder';

export const StudentWork: React.FC = () => {
  const { items: dbProjects } = useSupabaseTable<StudentProject>('student_projects', { orderBy: 'title', ascending: true });
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectingProject, setInspectingProject] = useState<StudentProject | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedInquirySubject, setSelectedInquirySubject] = useState('');

  const handleOpenAdvisor = (subject: string) => {
    setSelectedInquirySubject(subject);
    setIsAdvisorOpen(true);
  };

  // Fallback to local STUDENT_PROJECTS if database returns empty
  const allProjects = useMemo(() => {
    if (dbProjects && dbProjects.length > 0) {
      return dbProjects;
    }
    return STUDENT_PROJECTS;
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

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Verified Student Work & Capstone Projects | Navya Ed Tech"
        description="Explore verifiable web applications, Python microservices, data analytics pipelines, and interactive games engineered by Navya Ed Tech students under senior code review."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & PROOF OF WORK */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase">
              <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
              <span>Verifiable Portfolio • 100% Student-Authored Code</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]">
                Proof of Work: Real Systems Built by Navya Students.
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                We believe a software engineer&apos;s true credential is live, working code. Every project showcased below was engineered as an end-of-track capstone or graduation deliverable under strict line-by-line code review.
              </p>
            </div>

            {/* Verification Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs">
                <ShieldCheck className="w-4 h-4 text-sage shrink-0" />
                <span>OWASP Checked</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs">
                <GitBranch className="w-4 h-4 text-blue shrink-0" />
                <span>Full PR History</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs">
                <Code2 className="w-4 h-4 text-navy shrink-0" />
                <span>Clean Architecture</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-border text-xs font-medium text-ink shadow-xs">
                <Globe className="w-4 h-4 text-[#966324] shrink-0" />
                <span>Live Deployed</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition with Generated Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-sage/20 via-navy/15 to-blue/20 rounded-3xl blur-xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
                <img
                  src="/images/heroes/student-work-hero.jpg"
                  alt="Student developers showcasing deployed software projects in Kathmandu"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span>Verified Student Portfolios</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">GitHub Verified Code</p>
                    <p className="text-[11px] text-ink-soft">Live production applications</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    100% Deployed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FILTER TABS & SEARCH BAR */}
        {/* ========================================================================= */}
        <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
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

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-faint absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-input-border bg-white text-xs sm:text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. STUDENT PROJECTS GRID */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-border space-y-3">
              <Code2 className="w-10 h-10 text-ink-faint mx-auto" />
              <h3 className="text-base font-bold text-ink">No projects found matching your search.</h3>
              <p className="text-xs text-ink-soft">Try clearing your search query or selecting a different category filter.</p>
              <button
                onClick={() => {
                  setSelectedFilter('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-blue hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white border border-border rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-navy/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Project Cover Image */}
                    <ImagePlaceholder
                      src={project.image}
                      alt={project.title}
                      aspectRatio="video"
                      className="group"
                      imgClassName="group-hover:scale-103 transition-transform duration-300"
                    >
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <Badge variant="navy" size="sm">
                          {project.category}
                        </Badge>
                      </div>
                    </ImagePlaceholder>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-blue tracking-wider uppercase block mb-1">
                          {project.completionContext}
                        </span>
                        <h2 className="text-lg font-bold text-ink leading-snug">
                          {project.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                        {project.description}
                      </p>

                      {/* Engineering Highlights */}
                      <div className="space-y-2 pt-2 border-t border-border-faint">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block">
                          Architecture Highlights:
                        </span>
                        <ul className="space-y-1.5 text-xs text-ink">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer: Tech Stack & Inspect Button */}
                  <div className="p-6 pt-3 border-t border-border-faint bg-paper space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white text-navy font-mono border border-border-warm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectingProject(project)}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-paper-alt text-navy text-xs font-bold border border-input-border transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <span>Inspect Technical Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 4. CODE REVIEW STANDARDS & VERIFICATION CRITERIA */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 p-6 sm:p-10 lg:p-12 rounded-3xl bg-navy text-white border border-navy-deep shadow-lg">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-navy-mist">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              The 4 Standards Every Capstone Must Satisfy
            </h2>
            <p className="text-sm sm:text-base text-mist">
              Students do not graduate by just making something run locally. Every codebase undergoes strict evaluation before receiving graduation sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue/30 text-navy-mist flex items-center justify-center">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Git & PR Discipline</h3>
              <p className="text-xs text-mist leading-relaxed">
                Feature branch workflows, semantic commit messages, and structured pull request documentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-sage/30 text-sage flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. OWASP & Security</h3>
              <p className="text-xs text-mist leading-relaxed">
                Zero hardcoded API secrets, parameterized queries against SQL injection, and hashed JWT token auth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-amber/30 text-[#D9A662] flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. Clean Architecture</h3>
              <p className="text-xs text-mist leading-relaxed">
                Modular separation of concerns, reusable component tokens, and normalized relational database schemas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-blue/30 text-navy-mist flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">4. Live Production Deploy</h3>
              <p className="text-xs text-mist leading-relaxed">
                Production deployment on cloud services (AWS, Vercel, Render) with SSL and automated CI checks.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RECRUITER & EMPLOYER TALENT CONNECT */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-paper-alt border border-border text-center max-w-3xl mx-auto space-y-5">
          <div className="w-12 h-12 rounded-full bg-navy/10 text-navy mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-ink">
            Looking to Hire Job-Ready Junior & Mid-Level Engineers?
          </h3>

          <p className="text-sm text-ink-soft leading-relaxed max-w-xl mx-auto">
            Our placement cell connects tech companies, startups, and software houses with verified graduates who have demonstrated real capability in modern software production.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              href="/contact"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Connect with Placement Cell
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => handleOpenAdvisor('Graduate Portfolio Inquiries')}
            >
              Request Candidate Dossiers
            </Button>
          </div>
        </section>
      </Container>

      {/* ========================================================================= */}
      {/* 6. TECHNICAL INSPECTION MODAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={!!inspectingProject}
        onClose={() => setInspectingProject(null)}
        maxWidthClass="max-w-2xl"
        contentClassName="max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6"
        labelledBy="inspection-modal-title"
      >
        {inspectingProject && (
          <>
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-border">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-blue uppercase tracking-wider">
                  {inspectingProject.completionContext}
                </span>
                <h3 id="inspection-modal-title" className="text-xl sm:text-2xl font-bold text-ink">
                  {inspectingProject.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingProject(null)}
                className="p-1.5 rounded-lg bg-paper-alt hover:bg-border text-ink transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Project Image */}
            <ImagePlaceholder
              src={inspectingProject.image}
              alt={inspectingProject.title}
              aspectRatio="cinema"
              className="rounded-xl border border-border"
            />

            {/* Project Deep Dive Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                Project Scope & Architecture
              </h4>
              <p className="text-sm text-ink-soft leading-relaxed">
                {inspectingProject.description}
              </p>
            </div>

            {/* Technical Highlights */}
            <div className="space-y-3 p-4 rounded-xl bg-paper border border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                Verified Engineering Capabilities
              </h4>
              <ul className="space-y-2 text-xs text-ink-soft">
                {inspectingProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink">
                Integrated Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {inspectingProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-navy/10 text-navy text-xs font-mono font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-soft">
                Curriculum: Learn to build systems like this at Navya Ed Tech.
              </span>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setInspectingProject(null);
                  handleOpenAdvisor(inspectingProject.title);
                }}
              >
                Inquire About This Track
              </Button>
            </div>
          </>
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
