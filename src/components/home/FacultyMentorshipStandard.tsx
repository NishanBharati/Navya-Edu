import React from 'react';
import { UserCheck, GitPullRequest, Laptop, ShieldCheck, Award, MessageSquare, Terminal } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Stagger, StaggerItem } from '../motion/Reveal';
import { Block, BlockColor } from '../blocks/Block';

const STANDARD_COLORS: BlockColor[] = ['blue', 'yellow', 'green', 'pink'];

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

      <Stagger as="ul" className="flex flex-col gap-3">
        {mentorshipStandards.map((item, i) => (
          <StaggerItem
            as="li"
            key={item.title}
            className="list-none grid grid-cols-1 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] gap-x-8 gap-y-3 items-center rounded-2xl bg-white border border-border p-4 sm:p-5"
          >
            <span className="stack-depth">
              <Block color={STANDARD_COLORS[i % STANDARD_COLORS.length]} tab={false} className="text-base sm:text-[17px] !flex-nowrap">
                <span aria-hidden="true" className="inline-flex shrink-0 [&>svg]:w-[1.1em] [&>svg]:h-[1.1em]">{item.icon}</span>
                <h4 className="font-display font-bold leading-snug">{item.title}</h4>
              </Block>
            </span>
            <span className="flex items-start gap-3">
              <span aria-hidden="true" className="hidden md:block mt-3 h-0.5 w-6 shrink-0 bg-ink/25 rounded-full" />
              <span>
                <span className="block text-[15px] leading-relaxed text-ink-muted">{item.description}</span>
              </span>
            </span>
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
