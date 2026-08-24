import React, { useState, useMemo } from 'react';
import {
  Layers,
  Terminal,
  Sparkles,
  Check,
  Search,
  ExternalLink,
  ShieldCheck,
  GitBranch,
  Code2,
  Cpu,
  Smartphone,
  Palette,
  Database,
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
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';

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

  const categories = ['All', 'Web', 'Mobile', 'AI', 'UI/UX', 'Data'];

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
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8] text-[#171A1F]">
      <SEOHead
        title="Verified Student Work & Capstone Projects | Navya Ed Tech"
        description="Explore verifiable full-stack applications, mobile apps, AI models, and UI/UX case studies engineered by Navya Ed Tech students under senior code review."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & PROOF OF WORK */}
        {/* ========================================================================= */}
        <section className="mb-12 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17324D]/5 border border-[#17324D]/15 text-xs font-semibold tracking-wider text-[#17324D] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#718C7A] animate-pulse" />
            <span>Verifiable Portfolio • 100% Student-Authored Code</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171A1F] leading-[1.12]">
            Proof of Work: Real Systems Built by Navya Students.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#5F6670] leading-relaxed max-w-3xl">
            We believe a software engineer's true credential is live, working code. Every project showcased below was engineered as an end-of-track capstone or graduation deliverable under strict line-by-line code review.
          </p>

          {/* Verification Badges */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E4DA] text-xs font-medium text-[#171A1F]">
              <ShieldCheck className="w-4 h-4 text-[#718C7A] shrink-0" />
              <span>OWASP Security Checked</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E4DA] text-xs font-medium text-[#171A1F]">
              <GitBranch className="w-4 h-4 text-[#356A9A] shrink-0" />
              <span>Full Git PR History</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E4DA] text-xs font-medium text-[#171A1F]">
              <Code2 className="w-4 h-4 text-[#17324D] shrink-0" />
              <span>Clean Architecture</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-[#E8E4DA] text-xs font-medium text-[#171A1F]">
              <Globe className="w-4 h-4 text-[#D97706] shrink-0" />
              <span>Live Cloud Deployed</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. FILTER TABS & SEARCH BAR */}
        {/* ========================================================================= */}
        <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E8E4DA]">
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
                      ? 'bg-[#17324D] text-white shadow-sm'
                      : 'bg-white text-[#5F6670] hover:text-[#171A1F] border border-[#E5DFD4] hover:bg-[#F4F1EA]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8C939E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#D8D2C6] bg-white text-xs sm:text-sm text-[#171A1F] placeholder:text-[#8C939E] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C939E] hover:text-[#171A1F]"
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
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E4DA] space-y-3">
              <Code2 className="w-10 h-10 text-[#8C939E] mx-auto" />
              <h3 className="text-base font-bold text-[#171A1F]">No projects found matching your search.</h3>
              <p className="text-xs text-[#5F6670]">Try clearing your search query or selecting a different category filter.</p>
              <button
                onClick={() => {
                  setSelectedFilter('All');
                  setSearchQuery('');
                }}
                className="text-xs font-bold text-[#356A9A] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white border border-[#E8E4DA] rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#17324D]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Project Cover Image */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA] group">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <Badge variant="navy" size="sm">
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#356A9A] tracking-wider uppercase block mb-1">
                          {project.completionContext}
                        </span>
                        <h2 className="text-lg font-bold text-[#171A1F] leading-snug">
                          {project.title}
                        </h2>
                      </div>

                      <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Engineering Highlights */}
                      <div className="space-y-2 pt-2 border-t border-[#F0ECE1]">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C939E] block">
                          Architecture Highlights:
                        </span>
                        <ul className="space-y-1.5 text-xs text-[#171A1F]">
                          {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#718C7A] shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer: Tech Stack & Inspect Button */}
                  <div className="p-6 pt-3 border-t border-[#F0ECE1] bg-[#FAFAF8] space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] px-2 py-0.5 rounded bg-white text-[#17324D] font-mono border border-[#E5DFD4]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setInspectingProject(project)}
                      className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#F4F1EA] text-[#17324D] text-xs font-bold border border-[#D8D2C6] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
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
        <section className="mb-16 lg:mb-24 p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#17324D] text-white border border-[#12283E] shadow-lg">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-[#9BBAD4]">
              Quality Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              The 4 Standards Every Capstone Must Satisfy
            </h2>
            <p className="text-sm sm:text-base text-[#C4CDD5]">
              Students do not graduate by just making something run locally. Every codebase undergoes strict evaluation before receiving graduation sign-off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#356A9A]/30 text-[#9BBAD4] flex items-center justify-center">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Git & PR Discipline</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Feature branch workflows, semantic commit messages, and structured pull request documentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#718C7A]/30 text-[#718C7A] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. OWASP & Security</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Zero hardcoded API secrets, parameterized queries against SQL injection, and hashed JWT token auth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#D97706]/30 text-[#D97706] flex items-center justify-center">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. Clean Architecture</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Modular separation of concerns, reusable component tokens, and normalized relational database schemas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#356A9A]/30 text-[#9BBAD4] flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">4. Live Production Deploy</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Production deployment on cloud services (AWS, Vercel, Render) with SSL and automated CI checks.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RECRUITER & EMPLOYER TALENT CONNECT */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#F4F1EA] border border-[#E8E4DA] text-center max-w-3xl mx-auto space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#17324D]/10 text-[#17324D] mx-auto flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F]">
            Looking to Hire Job-Ready Junior & Mid-Level Engineers?
          </h3>

          <p className="text-sm text-[#5F6670] leading-relaxed max-w-xl mx-auto">
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
      {inspectingProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E4DA] shadow-2xl p-6 sm:p-8 space-y-6">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E8E4DA]">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#356A9A] uppercase tracking-wider">
                  {inspectingProject.completionContext}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#171A1F]">
                  {inspectingProject.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectingProject(null)}
                className="p-1.5 rounded-lg bg-[#F4F1EA] hover:bg-[#E8E4DA] text-[#171A1F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Project Image */}
            <div className="rounded-xl overflow-hidden aspect-[16/9] bg-[#F4F1EA] border border-[#E8E4DA]">
              <img
                src={inspectingProject.image}
                alt={inspectingProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Project Deep Dive Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171A1F]">
                Project Scope & Architecture
              </h4>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                {inspectingProject.description}
              </p>
            </div>

            {/* Technical Highlights */}
            <div className="space-y-3 p-4 rounded-xl bg-[#FAFAF8] border border-[#E8E4DA]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171A1F]">
                Verified Engineering Capabilities
              </h4>
              <ul className="space-y-2 text-xs text-[#5F6670]">
                {inspectingProject.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#171A1F]">
                Integrated Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {inspectingProject.technologies.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md bg-[#17324D]/10 text-[#17324D] text-xs font-mono font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#E8E4DA] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#5F6670]">
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
          </div>
        </div>
      )}

      {/* Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedInquirySubject}
      />
    </main>
  );
};
