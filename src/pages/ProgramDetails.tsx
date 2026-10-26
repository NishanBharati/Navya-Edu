import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Laptop,
  Calendar,
  Layers,
  CheckCircle2,
  UserCheck,
  Award,
  ShieldCheck,
  ArrowRight,
  Terminal,
  BookOpen,
  Sparkles,
  CreditCard,
  Building2,
  Users,
  ChevronRight
} from 'lucide-react';
import { PROGRAMS } from '../data/programs';
import { COURSES } from '../data/courses';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { Program } from '../types';

export const ProgramDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);

  // Match program by exact slug or common aliases
  const program: Program | undefined = PROGRAMS.find((p) => {
    if (p.slug === slug) return true;
    if (slug === 'full-stack-engineering' && p.slug === 'web-development-career-track') return true;
    if (slug === 'applied-data-science-ml' && p.slug === 'python-data-science-program') return true;
    if (slug === 'software-engineering-internship-readiness' && p.slug === 'python-software-engineering') return true;
    return false;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!program) {
    return (
      <main className="min-h-screen py-16 sm:py-24 bg-paper text-ink">
        <Container size="narrow">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Career Programs', href: '/programs' },
              { label: 'Program Not Found' },
            ]}
          />
          <div className="text-center space-y-4 bg-white p-8 sm:p-12 rounded-3xl border border-border shadow-xs">
            <h1 className="text-2xl font-bold text-ink">Career Track Not Found</h1>
            <p className="text-sm text-ink-soft max-w-md mx-auto">
              The program "{slug}" was not found in our directory. Please check our career tracks catalog.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" href="/programs">
                Browse All Programs
              </Button>
              <Button variant="outline" href="/contact">
                Contact Advisory Desk
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  // Find linked individual courses
  const linkedCourses = COURSES.filter((c) =>
    program.coursesIncluded?.some((title) => title.toLowerCase() === c.title.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-paper text-ink">
      <SEOHead
        title={`${program.title} in Nepal | Navya Ed Tech Career Track`}
        description={program.tagline || program.description}
        keywords={`${program.title}, career track Nepal, software engineering program Kathmandu, IT bootcamp Nepal`}
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Career Programs', path: '/programs' },
            { name: program.title, path: `/programs/${program.slug}` },
          ]),
        ]}
      />

      {/* ========================================================================= */}
      {/* 1. HERO BANNER */}
      {/* ========================================================================= */}
      <section className="pt-6 pb-12 sm:pb-16 border-b border-border-soft bg-paper">
        <Container>
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Career Programs', href: '/programs' },
              { label: program.title },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-navy text-white">
                  {program.category}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-sage/20 text-sage-ink flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Capstone Defense Included</span>
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
                  {program.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold text-blue">
                  {program.tagline}
                </p>
                <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-2xl">
                  {program.description}
                </p>
              </div>

              {/* Telemetry Metric Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white border border-border shadow-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-ink-faint uppercase tracking-wider block">
                    Duration
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-ink flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-blue" />
                    {program.duration}
                  </strong>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-ink-faint uppercase tracking-wider block">
                    Format
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-ink flex items-center gap-1.5">
                    <Laptop className="w-4 h-4 text-blue" />
                    In-Person & Live Online
                  </strong>
                </div>

                <div className="space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-ink-faint uppercase tracking-wider block">
                    Batches
                  </span>
                  <strong className="text-sm sm:text-base font-bold text-ink flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-blue" />
                    Max 12–16 Seats
                  </strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="primary"
                  size="lg"
                  href={`/apply?track=${program.slug}`}
                  className="font-bold text-xs sm:text-sm"
                >
                  Enroll in Track
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsAdvisorOpen(true)}
                  className="text-xs sm:text-sm"
                >
                  Talk to an Advisor
                </Button>

                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue hover:text-navy px-2 py-2"
                >
                  <span>View Fee & Installments</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Meta Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-border p-6 sm:p-8 shadow-xs space-y-6">
              <div className="border-b border-border-faint pb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue block mb-1">
                  Admissions Status
                </span>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ink">Upcoming Cohort</h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Admissions Open
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-ink-soft">Campus Location:</span>
                  <span className="font-semibold text-ink text-right">Putalisadak, Kathmandu</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-ink-soft">Batch Timings:</span>
                  <span className="font-semibold text-ink text-right">Morning & Evening Cohorts</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-ink-soft">Entry Eligibility:</span>
                  <span className="font-semibold text-ink text-right max-w-[200px]">{program.eligibility}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-ink-soft">Installment Plan:</span>
                  <span className="font-semibold text-ink text-right text-sage-ink">2–3 Milestone Splits in NPR</span>
                </div>
              </div>

              <div className="pt-2 border-t border-border-faint">
                <Button
                  variant="primary"
                  size="md"
                  href={`/apply?track=${program.slug}`}
                  className="w-full justify-center font-bold"
                >
                  Start Enrollment Application
                </Button>
                <p className="text-center text-[11px] text-ink-faint mt-2">
                  No tuition charged until diagnostic consultation is complete.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. TARGET AUDIENCE & ELIGIBILITY */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-border-soft bg-white">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-blue">
                <UserCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Target Candidate Profile
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                Who This Career Track Is Built For
              </h2>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-ink-soft">
                {program.whoItsFor.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-border shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-sage">
                <Award className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Learning Outcomes & Standards
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                What You Will Achieve & Deploy
              </h2>
              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-ink-soft">
                {program.expectedOutcome.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 3. CURRICULUM MODULES & INCLUDED COURSES */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-border-soft bg-paper">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue">
              Curriculum Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink">
              What This Program Delivers
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft">
              Every phase is engineered around deliberate laboratory practice, pull request reviews, and production capstones.
            </p>
          </div>

          {/* Core Curriculum Deliverables */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs space-y-4 mb-12">
            <h3 className="text-lg font-bold text-ink border-b border-border-faint pb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue" />
              <span>Core Modules & Architectural Competencies</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {program.whatItIncludes.map((point, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-paper-alt border border-border space-y-1">
                  <div className="text-[11px] font-bold font-mono text-navy">
                    Phase 0{idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-ink leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Integrated Course Modules (if any) */}
          {linkedCourses.length > 0 && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue" />
                  <span>Integrated Standalone Course Modules</span>
                </h3>
                <span className="text-xs text-ink-soft">Covered inside this career track</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {linkedCourses.map((c) => (
                  <Link
                    key={c.id}
                    to={`/courses/${c.slug}`}
                    className="p-4 rounded-2xl bg-white border border-border hover:border-navy/30 transition-all space-y-2 group shadow-2xs"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue block">
                      {c.duration} • {c.level}
                    </span>
                    <h4 className="text-sm font-bold text-ink group-hover:text-navy transition-colors">
                      {c.title}
                    </h4>
                    <p className="text-xs text-ink-soft line-clamp-2">
                      {c.shortDescription}
                    </p>
                    <div className="text-xs font-semibold text-navy inline-flex items-center gap-1 pt-1">
                      <span>View Course Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. FACULTY & CAPSTONE INTEGRATION */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 border-b border-border-soft bg-white">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Faculty Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-border shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-ink">
                Senior Engineering Mentorship
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Taught by software practitioners actively developing commercial cloud systems at our parent software enterprise, Navya EdTech. Every pull request receives architectural code review.
              </p>
              <div className="pt-2">
                <Link
                  to="/about#team"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue hover:text-navy"
                >
                  <span>Meet Engineering Faculty on About Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Capstone Showcase */}
            <div className="p-6 sm:p-8 rounded-3xl bg-paper border border-border shadow-xs space-y-4">
              <div className="w-10 h-10 rounded-xl bg-sage/15 text-sage flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-extrabold text-ink">
                Verifiable Capstone Projects
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Students graduate with a live deployed GitHub portfolio of 3+ applications backed by CI/CD workflows and automated unit testing rather than basic textbook exercises.
              </p>
              <div className="pt-2">
                <Link
                  to="/student-work"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue hover:text-navy"
                >
                  <span>Inspect Capstone Showcase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. ENROLLMENT CTA */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-24 bg-paper">
        <Container>
          <div className="max-w-4xl mx-auto rounded-3xl bg-navy text-white p-8 sm:p-14 shadow-lg text-center space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8C6E5]">
              Admissions Open • Capped at 12–16 Seats
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Ready to Enroll in {program.title}?
            </h2>
            <p className="text-xs sm:text-sm text-mist max-w-xl mx-auto leading-relaxed">
              Complete the step-by-step enrollment application to reserve your lab seat. Our admissions desk will schedule your 15-minute diagnostic consultation within 24 business hours.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="lg"
                href={`/apply?track=${program.slug}`}
                className="w-full sm:w-auto bg-white text-navy hover:bg-paper font-bold justify-center"
              >
                Start Enrollment Application
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                onClick={() => setIsAdvisorOpen(true)}
                className="w-full sm:w-auto justify-center"
              >
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Global Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        initialIntent="inquire"
      />
    </main>
  );
};
