import React from 'react';
import { ArrowRight, School, GraduationCap, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Block } from '../blocks/Block';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

interface ForSchoolsProps {
  onOpenAdvisor: () => void;
}

const AUDIENCES: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: School,
    title: 'Schools',
    body: 'Scratch and Python classes for students, run as a coding club or alongside the computer curriculum.',
  },
  {
    icon: GraduationCap,
    title: 'Colleges',
    body: 'Project-based bootcamps in web development, Python and data science for BCA, CSIT and engineering students.',
  },
  {
    icon: Building2,
    title: 'Companies',
    body: 'Practical upskilling for teams, planned around the tools and workflows your staff use every day.',
  },
];

// Institutional training band: schools, colleges and companies, taught live online.
export const ForSchools: React.FC<ForSchoolsProps> = ({ onOpenAdvisor }) => (
  <section id="for-schools" className="section-y relative overflow-hidden bg-ink text-white">
    <div className="absolute inset-0 bg-dots-light pointer-events-none opacity-60" aria-hidden="true" />
    <Container className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-12 lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <h2 className="text-title text-white">Bring coding to your school or team</h2>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/85 max-w-[46ch]">
            We run live online classes for your students or staff, with a course plan and schedule shaped around
            your learners.
          </p>
          <div className="mt-8 flex flex-col items-start gap-1 stack-depth text-[15px] sm:text-base">
            <Block color="green" hat>Live online</Block>
            <Block color="yellow">Your schedule</Block>
            <Block color="pink" tab={false}>Your curriculum</Block>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Button variant="amber" size="lg" href="/corporate-training" rightIcon={<ArrowRight className="w-5 h-5" />}>
              See institutional training
            </Button>
            <Button variant="outline-white" size="lg" onClick={onOpenAdvisor}>
              Talk to an advisor
            </Button>
          </div>
        </Reveal>

        <Stagger as="ul" className="grid grid-cols-1 gap-5">
          {AUDIENCES.map(({ icon: Icon, title, body }) => (
            <StaggerItem as="li" key={title} className="list-none">
              <div className="flex gap-5 rounded-3xl bg-white/[0.06] border border-white/15 p-7">
                <span aria-hidden="true" className="inline-grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-white/10 text-block-yellow">
                  <Icon className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold tracking-[-0.025em] text-white">{title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-white/80">{body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Container>
  </section>
);
