import React, { useState, useMemo } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Layers,
  Sparkles,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  Code2,
  Building2,
  Terminal,
  Cpu,
  Compass,
  Check,
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import type { Program } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { PROGRAMS } from '../data/programs';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';

export const Programs: React.FC = () => {
  const { items: dbPrograms, isLoading } = useSupabaseTable<Program>('programs', { orderBy: 'title', ascending: true });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedProgramTitle, setSelectedProgramTitle] = useState('');

  // Fallback to local PROGRAMS data if database returns empty
  const allPrograms = useMemo(() => {
    if (dbPrograms && dbPrograms.length > 0) {
      return dbPrograms;
    }
    return PROGRAMS;
  }, [dbPrograms]);

  const categories = ['All', 'Career Programs', 'Professional Programs', 'Internship Programs'];

  const filteredPrograms = useMemo(() => {
    if (selectedCategory === 'All') return allPrograms;
    return allPrograms.filter((p) => p.category === selectedCategory);
  }, [allPrograms, selectedCategory]);

  const handleOpenAdvisor = (programTitle: string) => {
    setSelectedProgramTitle(programTitle);
    setIsAdvisorOpen(true);
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8] text-[#171A1F]">
      <SEOHead
        title="Career Programs & Professional Tracks | Navya Ed Tech Nepal"
        description="Explore comprehensive multi-tier career programs in Full Stack Engineering, Data Science, AI, and UI/UX Design with live capstone defense and direct placement support in Kathmandu."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & VALUE PROPOSITION */}
        {/* ========================================================================= */}
        <section className="mb-14 max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17324D]/5 border border-[#17324D]/15 text-xs font-semibold tracking-wider text-[#17324D] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#356A9A] animate-pulse" />
            <span>Multi-Tier Career Programs • Kathmandu Campus & Live Online</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#171A1F] leading-[1.12]">
            Comprehensive Programs Built for Production Engineering Roles.
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#5F6670] leading-relaxed max-w-3xl">
            Our career tracks combine multiple interconnected technology modules, agile sprint simulations, architectural reviews, and production capstone deployments to transition you into a professional software engineer.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 bg-white rounded-xl border border-[#E8E4DA] shadow-xs">
              <span className="text-xs font-semibold text-[#5F6670] block">Format</span>
              <strong className="text-sm sm:text-base font-bold text-[#171A1F]">In-Person & Online Live</strong>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#E8E4DA] shadow-xs">
              <span className="text-xs font-semibold text-[#5F6670] block">Mentorship Ratio</span>
              <strong className="text-sm sm:text-base font-bold text-[#171A1F]">1 : 12 Max Per Cohort</strong>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#E8E4DA] shadow-xs">
              <span className="text-xs font-semibold text-[#5F6670] block">Capstone Defense</span>
              <strong className="text-sm sm:text-base font-bold text-[#171A1F]">Live Cloud Deployed</strong>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#E8E4DA] shadow-xs">
              <span className="text-xs font-semibold text-[#5F6670] block">Hiring Network</span>
              <strong className="text-sm sm:text-base font-bold text-[#171A1F]">40+ Tech Partners</strong>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <section className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-[#E8E4DA] scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
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
        </section>

        {/* ========================================================================= */}
        {/* 3. PROGRAM TRACK CARDS */}
        {/* ========================================================================= */}
        <section className="space-y-10 mb-16 lg:mb-24">
          {filteredPrograms.map((program) => (
            <article
              key={program.id}
              className="bg-white border border-[#E8E4DA] rounded-3xl p-6 sm:p-10 shadow-sm hover:border-[#17324D]/30 transition-all space-y-8"
            >
              {/* Header Box */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#F0ECE1]">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-[#17324D]/10 text-[#17324D] text-xs font-mono font-bold">
                      {program.category}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-[#718C7A]/20 text-[#3D5644] text-xs font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Placement Assistance Included</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A1F] tracking-tight">
                    {program.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#5F6670] leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Right Meta Card */}
                <div className="shrink-0 bg-[#F4F1EA] p-5 rounded-2xl border border-[#E5DFD4] space-y-3 min-w-[260px]">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#5F6670]">Duration:</span>
                      <strong className="text-[#171A1F] font-bold">{program.duration}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5F6670]">Format:</span>
                      <span className="text-[#171A1F] font-medium">{program.format}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#5F6670]">Eligibility:</span>
                      <span className="text-[#171A1F] font-medium text-right max-w-[140px] truncate" title={program.eligibility}>
                        {program.eligibility.split(' ')[0]} Entry
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full"
                      onClick={() => handleOpenAdvisor(program.title)}
                    >
                      Inquire for Track
                    </Button>
                  </div>
                </div>
              </div>

              {/* 3-Column Detailed Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1: Who It's For & Prerequisites */}
                <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#EFECE5] space-y-3">
                  <div className="flex items-center gap-2 text-[#356A9A]">
                    <UserCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Target Audience
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#5F6670]">
                    {program.whoItsFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#356A9A] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-[#EFECE5] text-[11px] text-[#5F6670]">
                    <strong className="text-[#171A1F] block">Prerequisite check:</strong>
                    <span>{program.eligibility}</span>
                  </div>
                </div>

                {/* Column 2: What It Includes / Curriculum */}
                <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#EFECE5] space-y-3">
                  <div className="flex items-center gap-2 text-[#17324D]">
                    <Layers className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Curriculum & Deliverables
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-[#171A1F]">
                    {program.whatItIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {program.coursesIncluded && program.coursesIncluded.length > 0 && (
                    <div className="pt-2 border-t border-[#EFECE5]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C939E] block mb-1">
                        Integrated Courses:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {program.coursesIncluded.map((c, cIdx) => (
                          <span
                            key={cIdx}
                            className="text-[10px] px-2 py-0.5 rounded bg-[#F4F1EA] text-[#17324D] font-mono border border-[#E5DFD4]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Column 3: Expected Outcomes & Career Readiness */}
                <div className="p-5 rounded-2xl bg-[#718C7A]/10 border border-[#718C7A]/25 space-y-3">
                  <div className="flex items-center gap-2 text-[#3D5644]">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Career Outcomes
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-[#3D5644]">
                    {program.expectedOutcome.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#3D5644] shrink-0 mt-0.5 font-bold" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-[#718C7A]/20 text-[11px] text-[#3D5644]">
                    <strong className="block font-bold">Hiring Support:</strong>
                    <span>Direct recommendations to 40+ partner tech companies and internal junior software roles.</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ========================================================================= */}
        {/* 4. THE 4-STAGE PROGRAM EXECUTION PIPELINE */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#17324D] text-white border border-[#12283E] shadow-lg">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-[#9BBAD4]">
              Structured Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              The 4-Stage Career Transformation Pipeline
            </h2>
            <p className="text-sm sm:text-base text-[#C4CDD5]">
              Every career track follows this rigorous progression to ensure you enter the job market with demonstrable technical competence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#9BBAD4] block">Stage 01</span>
              <h3 className="text-base font-bold text-white">Foundations & System Architecture</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Core syntax fluency, database normalization, asynchronous workflows, and API design principles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#9BBAD4] block">Stage 02</span>
              <h3 className="text-base font-bold text-white">Live Agile Code Sprints</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Simulating engineering teams with Jira tickets, daily standups, Git branching strategies, and pair programming.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#9BBAD4] block">Stage 03</span>
              <h3 className="text-base font-bold text-white">Capstone Defense & Code Review</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Line-by-line inspection on GitHub by senior software architects covering OWASP security, performance, and clean code.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-[#9BBAD4] block">Stage 04</span>
              <h3 className="text-base font-bold text-white">Employer Matching & Interview Prep</h3>
              <p className="text-xs text-[#C4CDD5] leading-relaxed">
                Technical mock interviews, resume optimization, and direct introduction to our 40+ hiring network companies.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CAREER TRACKS VS SHORT COURSES COMPARISON */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24">
          <SectionHeader
            eyebrow="Decision Guide"
            title="Career Programs vs. Single Specialized Courses"
            description="Understand which pathway best matches your current experience level, timeline, and professional career goals."
          />

          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-2xl border border-[#E8E4DA] overflow-hidden shadow-xs">
              <thead>
                <tr className="bg-[#F4F1EA] border-b border-[#E8E4DA] text-xs font-bold uppercase tracking-wider text-[#171A1F]">
                  <th className="p-4 sm:p-5">Feature & Scope</th>
                  <th className="p-4 sm:p-5 text-[#17324D]">Comprehensive Career Programs</th>
                  <th className="p-4 sm:p-5 text-[#5F6670]">Single Specialized Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE5] text-xs sm:text-sm text-[#5F6670]">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#171A1F]">Ideal Candidate</td>
                  <td className="p-4 sm:p-5 text-[#17324D] font-medium">Fresh graduates, career switchers, aspiring full-stack engineers</td>
                  <td className="p-4 sm:p-5">Working developers upskilling in a specific technology (e.g. Flutter, React)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#171A1F]">Typical Duration</td>
                  <td className="p-4 sm:p-5 text-[#17324D] font-medium">3 to 6 Months (Intensive / Multi-Module)</td>
                  <td className="p-4 sm:p-5">6 to 8 Weeks (Targeted Skill Focus)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#171A1F]">Portfolio Capstones</td>
                  <td className="p-4 sm:p-5 text-[#17324D] font-medium">2 to 3 Major Full-Stack Production Systems deployed live</td>
                  <td className="p-4 sm:p-5">1 Focused Domain Project</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#171A1F]">Career & Placement Cell</td>
                  <td className="p-4 sm:p-5 text-[#17324D] font-medium">Direct employer introduction, mock interviews & demo days</td>
                  <td className="p-4 sm:p-5">Resume guidance & alumni network access</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-[#171A1F]">Mentorship Depth</td>
                  <td className="p-4 sm:p-5 text-[#17324D] font-medium">Dedicated weekly 1-on-1 office hours & PR reviews</td>
                  <td className="p-4 sm:p-5">In-class Q&A and group project review</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ADVISOR CONSULTATION CTA */}
        {/* ========================================================================= */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#F4F1EA] border border-[#E8E4DA] text-center max-w-3xl mx-auto space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#17324D]/10 text-[#17324D] mx-auto flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-[#171A1F]">
            Unsure Which Career Program Fits Your Background?
          </h3>

          <p className="text-sm text-[#5F6670] leading-relaxed max-w-xl mx-auto">
            Speak with an academic counselor to evaluate your current programming level, discuss upcoming batch schedules, and review fee installment plans in NPR.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => handleOpenAdvisor('General Career Counseling')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Talk to an Academic Advisor
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
