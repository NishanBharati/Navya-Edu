import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Layers,
  ShieldCheck,
  GraduationCap,
  Check,
  HelpCircle
} from 'lucide-react';
import type { Program } from '../types';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { PROGRAMS } from '../data/programs';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';

export const Programs: React.FC = () => {
  const { items: dbPrograms } = useSupabaseTable<Program>('programs', { orderBy: 'title', ascending: true });
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

  const categories = ['All', 'Career Programs', 'Specialized Tracks', 'Kids & School Programs'];

  const filteredPrograms = useMemo(() => {
    if (selectedCategory === 'All') return allPrograms;
    return allPrograms.filter((p) => p.category === selectedCategory);
  }, [allPrograms, selectedCategory]);

  const handleOpenAdvisor = (programTitle: string) => {
    setSelectedProgramTitle(programTitle);
    setIsAdvisorOpen(true);
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Career Programs & Professional Tracks | Navya Ed Tech Nepal"
        description="Explore comprehensive career programs in Modern Web Development, Python Software Engineering, Data Science, and Kids Coding with live capstone defense and direct placement support in Kathmandu."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & VALUE PROPOSITION */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase">
              <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
              <span>Multi-Tier Career Programs • Kathmandu Campus & Live Online</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]">
                Comprehensive Programs Built for Production Engineering Roles.
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                Our career tracks combine multiple interconnected technology modules, agile sprint simulations, architectural reviews, and production capstone deployments to transition you into a professional software engineer.
              </p>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">Format</span>
                <strong className="text-xs sm:text-sm font-bold text-ink block">Classroom & Live</strong>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">Mentorship</span>
                <strong className="text-xs sm:text-sm font-bold text-sage-ink block">1 : 12 Cohort Max</strong>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">Capstone</span>
                <strong className="text-xs sm:text-sm font-bold text-navy block">Cloud Deployed</strong>
              </div>
              <div className="p-3.5 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint block">Pipeline</span>
                <strong className="text-xs sm:text-sm font-bold text-blue block">Direct Placement</strong>
              </div>
            </div>
          </div>

          {/* Right Visual Composition with Generated Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue/20 via-navy/15 to-sage/20 rounded-3xl blur-xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
                <img
                  src="/images/heroes/programs-hero.jpg"
                  alt="Software engineering mentorship and career program in Kathmandu"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
                  <span>Engineering Fellowship</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Multi-Track Curriculums</p>
                    <p className="text-[11px] text-ink-soft">From fundamentals to scalable system design</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Industry Standard
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CATEGORY FILTER TABS */}
        {/* ========================================================================= */}
        <section className="mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-border scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
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
        {/* 3. PROGRAM TRACK CARDS */}
        {/* ========================================================================= */}
        <section className="space-y-10 mb-16 lg:mb-24">
          {filteredPrograms.map((program) => (
            <article
              key={program.id}
              className="bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-sm hover:border-navy/30 transition-all space-y-8"
            >
              {/* Header Box */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border-faint">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-navy/10 text-navy text-xs font-mono font-bold">
                      {program.category}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-sage/20 text-sage-ink text-xs font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Placement Assistance Included</span>
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                    {program.title}
                  </h2>

                  <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Right Meta Card */}
                <div className="shrink-0 bg-paper-alt p-5 rounded-2xl border border-border-warm space-y-3 min-w-[260px]">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Duration:</span>
                      <strong className="text-ink font-bold">{program.duration}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Format:</span>
                      <span className="text-ink font-medium">{program.format}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-ink-soft">Eligibility:</span>
                      <span className="text-ink font-medium text-right max-w-[140px] truncate" title={program.eligibility}>
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
                <div className="p-5 rounded-2xl bg-paper border border-border-soft space-y-3">
                  <div className="flex items-center gap-2 text-blue">
                    <UserCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Target Audience
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
                    {program.whoItsFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-border-soft text-[11px] text-ink-soft">
                    <strong className="text-ink block">Prerequisite check:</strong>
                    <span>{program.eligibility}</span>
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
                    {program.whatItIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {program.coursesIncluded && program.coursesIncluded.length > 0 && (
                    <div className="pt-2 border-t border-border-soft">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-ink-faint block mb-1">
                        Integrated Courses:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {program.coursesIncluded.map((c, cIdx) => (
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

                {/* Column 3: Expected Outcomes & Career Readiness */}
                <div className="p-5 rounded-2xl bg-sage/10 border border-sage/25 space-y-3">
                  <div className="flex items-center gap-2 text-sage-ink">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider block">
                      Career Outcomes
                    </span>
                  </div>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-sage-ink">
                    {program.expectedOutcome.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-sage-ink shrink-0 mt-0.5 font-bold" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 border-t border-sage/20 text-[11px] text-sage-ink">
                    <strong className="block font-bold">Hiring Support:</strong>
                    <span>Direct recommendations to our partner tech companies and internal junior software roles.</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* ========================================================================= */}
        {/* 4. THE 4-STAGE PROGRAM EXECUTION PIPELINE */}
        {/* ========================================================================= */}
        <section className="mb-16 lg:mb-24 p-6 sm:p-10 lg:p-12 rounded-3xl bg-navy text-white border border-navy-deep shadow-lg">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-navy-mist">
              Structured Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              The 4-Stage Career Transformation Pipeline
            </h2>
            <p className="text-sm sm:text-base text-mist">
              Every career track follows this rigorous progression to ensure you enter the job market with demonstrable technical competence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-navy-mist block">Stage 01</span>
              <h3 className="text-base font-bold text-white">Foundations & System Architecture</h3>
              <p className="text-xs text-mist leading-relaxed">
                Core syntax fluency, database normalization, asynchronous workflows, and API design principles.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-navy-mist block">Stage 02</span>
              <h3 className="text-base font-bold text-white">Live Agile Code Sprints</h3>
              <p className="text-xs text-mist leading-relaxed">
                Simulating engineering teams with Jira tickets, daily standups, Git branching strategies, and pair programming.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-navy-mist block">Stage 03</span>
              <h3 className="text-base font-bold text-white">Capstone Defense & Code Review</h3>
              <p className="text-xs text-mist leading-relaxed">
                Line-by-line inspection on GitHub by senior software architects covering OWASP security, performance, and clean code.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold text-navy-mist block">Stage 04</span>
              <h3 className="text-base font-bold text-white">Employer Matching & Interview Prep</h3>
              <p className="text-xs text-mist leading-relaxed">
                Technical mock interviews, resume optimization, and direct introduction to our hiring network companies.
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
            <table className="w-full text-left border-collapse bg-white rounded-2xl border border-border overflow-hidden shadow-xs">
              <thead>
                <tr className="bg-paper-alt border-b border-border text-xs font-bold uppercase tracking-wider text-ink">
                  <th className="p-4 sm:p-5">Feature & Scope</th>
                  <th className="p-4 sm:p-5 text-navy">Comprehensive Career Programs</th>
                  <th className="p-4 sm:p-5 text-ink-soft">Single Specialized Courses</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft text-xs sm:text-sm text-ink-soft">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Ideal Candidate</td>
                  <td className="p-4 sm:p-5 text-navy font-medium">Fresh graduates, career switchers, aspiring full-stack engineers</td>
                  <td className="p-4 sm:p-5">Working developers upskilling in a specific technology (e.g. Python, JavaScript)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Typical Duration</td>
                  <td className="p-4 sm:p-5 text-navy font-medium">3 to 6 Months (Intensive / Multi-Module)</td>
                  <td className="p-4 sm:p-5">6 to 8 Weeks (Targeted Skill Focus)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Portfolio Capstones</td>
                  <td className="p-4 sm:p-5 text-navy font-medium">2 to 3 Major Full-Stack Production Systems deployed live</td>
                  <td className="p-4 sm:p-5">1 Focused Domain Project</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Career & Placement Cell</td>
                  <td className="p-4 sm:p-5 text-navy font-medium">Direct employer introduction, mock interviews & demo days</td>
                  <td className="p-4 sm:p-5">Resume guidance & alumni network access</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-ink">Mentorship Depth</td>
                  <td className="p-4 sm:p-5 text-navy font-medium">Dedicated weekly 1-on-1 office hours & PR reviews</td>
                  <td className="p-4 sm:p-5">In-class Q&A and group project review</td>
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
            Unsure Which Career Program Fits Your Background?
          </h3>

          <p className="text-sm text-ink-soft leading-relaxed max-w-xl mx-auto">
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
