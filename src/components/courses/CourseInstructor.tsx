import React from 'react';
import { Award, UserCheck, Sparkles, Shield, Code, Terminal, Users } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

interface CourseInstructorProps {
  course: Course;
  onOpenAdvisor?: (intent?: 'enroll' | 'demo') => void;
}

export const CourseInstructor: React.FC<CourseInstructorProps> = ({ course, onOpenAdvisor }) => {
  const { instructor } = course;
  if (!instructor) return null;

  // Derive instructor initials or fallback
  const initials = instructor.name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || 'NE';

  return (
    <section id="instructor" className="py-14 sm:py-20 bg-paper border-b border-border scroll-mt-24">
      <Container>
        <div className="max-w-3xl mb-10 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold text-navy uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-blue" />
            <span>Faculty & Mentorship</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-ink">
            Learn Directly From Industry Software Practitioners
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Our training cohorts are led by active commercial software engineers from Navya EdTech and partner technology teams—not theoretical lecture tutors.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Faculty Avatar & Credential Details */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-navy via-[#162D4A] to-blue text-white flex items-center justify-center shadow-md border-2 border-white/60 overflow-hidden relative">
                  {instructor.avatarUrl ? (
                    <img
                      src={instructor.avatarUrl}
                      alt={instructor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.instructor-initials') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className={`instructor-initials text-3xl sm:text-4xl font-mono font-extrabold text-white/90 ${instructor.avatarUrl ? 'hidden' : 'flex'}`}>
                    {initials}
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-sage-ink text-white shadow-md">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-ink">
                  {instructor.isPlaceholder ? 'Navya Engineering Faculty Panel' : instructor.name}
                </h3>
                <p className="text-xs font-semibold text-blue">
                  {instructor.role}
                </p>
                <p className="text-[11px] font-mono text-ink-soft">
                  {instructor.experience || 'Min. 5+ years commercial software engineering experience'}
                </p>
                <div className="pt-2">
                  <a
                    href="/about#team"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue hover:text-navy transition-colors underline-offset-2 hover:underline"
                  >
                    <span>View Faculty Profile on About Page</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              {/* Faculty Assignment & Vetting Policy */}
              <div className="p-3.5 rounded-xl bg-paper border border-border text-left space-y-1 text-[11px] text-ink-soft">
                <div className="flex items-center gap-1.5 font-bold text-navy">
                  <Users className="w-3.5 h-3.5 text-blue" />
                  <span>Cohort Mentorship Policy:</span>
                </div>
                <p className="leading-relaxed">
                  To guarantee modern production patterns, instructors are active commercial practitioners. Specific lead engineers and lab assistants are assigned to each cohort batch prior to orientation.
                </p>
              </div>
            </div>

            {/* Right Column: Credentials, Specializations, and Mentorship Model */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink-faint">
                  Core Engineering Specialization:
                </span>
                <p className="text-sm sm:text-base font-semibold text-ink leading-relaxed">
                  {instructor.specialization}
                </p>
              </div>

              {/* 4 Mentorship Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-4 rounded-xl bg-paper border border-border-soft space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy">
                    <UserCheck className="w-3.5 h-3.5 text-blue" />
                    <span>1:12 Small Cohort Attention</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Small class sizes guarantee you never get lost in a crowd. Mentors sit with you to troubleshoot bugs line-by-line.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper border border-border-soft space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy">
                    <Terminal className="w-3.5 h-3.5 text-blue" />
                    <span>Weekly 1-on-1 Code Critiques</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Submit GitHub pull requests and receive professional code review comments on architecture, performance, and naming.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper border border-border-soft space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy">
                    <Code className="w-3.5 h-3.5 text-blue" />
                    <span>Live Architecture Sprints</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Watch instructors architect systems from scratch, refactor legacy code, and resolve realistic deployment errors in real time.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper border border-border-soft space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-navy">
                    <Award className="w-3.5 h-3.5 text-blue" />
                    <span>Capstone Defense Panel</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Defend your project before a panel of senior software engineers and receive verifiable grading for career referrals.
                  </p>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {onOpenAdvisor && (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={() => onOpenAdvisor('enroll')}
                    >
                      Enroll in This Cohort
                    </Button>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => onOpenAdvisor('demo')}
                      leftIcon={<Sparkles className="w-4 h-4 text-blue" />}
                    >
                      Book a Free Demo Class
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
