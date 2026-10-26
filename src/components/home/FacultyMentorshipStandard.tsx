import React from 'react';
import { UserCheck, GitPullRequest, Laptop, ShieldCheck, Award, MessageSquare, Terminal } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';

interface FacultyMentorshipStandardProps {
  onOpenAdvisor?: () => void;
}

export const FacultyMentorshipStandard: React.FC<FacultyMentorshipStandardProps> = ({ onOpenAdvisor }) => {
  const mentorshipStandards = [
    {
      title: 'Active Commercial Software Engineers',
      description: 'Instruction is led by practicing software architects and technical leads from Navya EdTech and partner studios who build production systems daily—not theoretical textbook tutors.',
      icon: <Terminal className="w-5 h-5" />,
      tag: 'Practitioner Faculty',
    },
    {
      title: 'Strict 1:12 Cohort Ratio',
      description: 'We strictly cap classroom and live cohort sizes at 12 to 16 students to ensure you never get lost in a crowd. Mentors sit beside you to troubleshoot bugs line-by-line.',
      icon: <UserCheck className="w-5 h-5" />,
      tag: 'Personalized Attention',
    },
    {
      title: 'Line-by-Line Pull Request Reviews',
      description: 'Every assignment is submitted via GitHub. Mentors provide professional code review comments on naming conventions, modular architecture, performance, and security boundaries.',
      icon: <GitPullRequest className="w-5 h-5" />,
      tag: 'Engineering Rigor',
    },
    {
      title: 'Live Architecture & Refactoring Sprints',
      description: 'Watch senior engineers design systems from scratch, tackle real-world edge cases, and debug live runtime errors during hands-on Kathmandu laboratory sessions.',
      icon: <Laptop className="w-5 h-5" />,
      tag: 'Hands-On Labs',
    },
  ];

  return (
    <section id="faculty-section" className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
          <SectionHeader
            eyebrow="Pedagogical Rigor"
            title="Faculty & Mentorship Standard"
            description="Our instructional model is built around small cohorts, working commercial engineers, and continuous code audits rather than passive slideshows."
          />
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-paper-alt border border-border-warm text-xs font-semibold text-navy">
              <ShieldCheck className="w-4 h-4 text-blue" />
              <span>100% Industry Practitioner Led</span>
            </div>
          </div>
        </div>

        {/* 4 Core Standards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentorshipStandards.map((standard, index) => (
            <div
              key={index}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-border shadow-xs hover:border-navy/30 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                  {standard.icon}
                </div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue block">
                  {standard.tag}
                </span>
                <h3 className="text-base font-bold text-ink leading-snug">
                  {standard.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                  {standard.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent Faculty Policy Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-paper-alt border border-border-warm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue" />
              <h4 className="text-sm font-bold text-ink uppercase tracking-wide">
                Faculty Assignment & Consultation Policy
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Course instructors are active commercial engineers assigned specifically per cohort schedule. To maintain strict integrity, we do not use stock photos or fabricated faculty credentials. Prospective students can meet their designated lead mentor during a free diagnostic session before cohort registration.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            {onOpenAdvisor && (
              <Button
                variant="primary"
                size="md"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4" />}
              >
                Schedule Diagnostic Consultation
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
