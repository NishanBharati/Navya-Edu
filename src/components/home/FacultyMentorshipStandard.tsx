import React from 'react';
import { UserCheck, GitPullRequest, Laptop, ShieldCheck, Award, MessageSquare, Terminal } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Stagger, StaggerItem } from '../motion/Reveal';

interface FacultyMentorshipStandardProps {
  onOpenAdvisor?: () => void;
  /** Render only the panel content (used inside the Home "Standards" tabs) */
  embedded?: boolean;
}

export const FacultyMentorshipStandard: React.FC<FacultyMentorshipStandardProps> = ({ onOpenAdvisor, embedded = false }) => {
  const mentorshipStandards = [
    {
      title: 'Active Commercial Software Engineers',
      description: 'Instruction is led by practicing software architects and technical leads from Navya EdTech and partner studios who build production systems daily, not theoretical textbook tutors.',
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

  const content = (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10">
        <SectionHeader
          eyebrow="Pedagogical Rigor"
          title="Faculty & Mentorship Standard"
          description="Our instructional model is built around small cohorts, working commercial engineers, and continuous code audits rather than passive slideshows."
          headingTag={embedded ? 'h3' : 'h2'}
          size={embedded ? 'md' : 'lg'}
        />
        <div className="shrink-0">
          <span className="inline-flex items-center gap-2 h-9 px-3.5 rounded-xl bg-white border border-border text-[13px] font-medium text-navy">
            <ShieldCheck className="w-4 h-4 text-blue" />
            100% Industry Practitioner Led
          </span>
        </div>
      </div>

      <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border rounded-3xl overflow-hidden">
        {mentorshipStandards.map((standard) => (
          <StaggerItem key={standard.title} className="bg-white p-6 sm:p-7 flex flex-col">
            <span className="w-11 h-11 rounded-xl bg-navy/[0.06] text-navy grid place-items-center">{standard.icon}</span>
            <span className="mt-6 font-mono text-xs uppercase tracking-[0.08em] text-blue">{standard.tag}</span>
            <h4 className="mt-2 text-[17px] font-semibold tracking-[-0.015em] text-ink leading-snug">{standard.title}</h4>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">{standard.description}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white border border-border flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-blue" />
            <h4 className="text-[15px] font-semibold text-ink">Faculty Assignment & Consultation Policy</h4>
          </div>
          <p className="mt-2 text-sm text-ink-muted leading-relaxed">
            Course instructors are active commercial engineers assigned specifically per cohort schedule. To maintain strict integrity, we do not use stock photos or fabricated faculty credentials. Prospective students can meet their designated lead mentor during a free diagnostic session before cohort registration.
          </p>
        </div>

        {onOpenAdvisor && (
          <Button variant="primary" size="md" onClick={onOpenAdvisor} leftIcon={<MessageSquare className="w-4 h-4" />} className="shrink-0">
            Schedule Diagnostic Consultation
          </Button>
        )}
      </div>
    </>
  );

  if (embedded) return content;

  return (
    <section id="faculty-section" className="section-y bg-paper">
      <Container>{content}</Container>
    </section>
  );
};
