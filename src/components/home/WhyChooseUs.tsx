import React from 'react';
import { Users, Hammer, Laptop, Award, DoorOpen, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Container } from '../common/Container';
import { BLOCK_COLORS, BlockColor } from '../blocks/Block';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

const REASONS: { icon: LucideIcon; color: BlockColor; title: string; body: string }[] = [
  {
    icon: Globe,
    color: 'blue',
    title: 'Live online, from home',
    body: 'Every class is taught live on video by a mentor, in morning or evening batches that learners anywhere in Nepal can join from home.',
  },
  {
    icon: Users,
    color: 'violet',
    title: 'Small batches, one mentor',
    body: 'Groups of up to 12 learners, so every question gets answered and nobody gets left behind.',
  },
  {
    icon: Hammer,
    color: 'yellow',
    title: 'Learn by building',
    body: 'Every class adds to a real game, app or website that learners can open and show at home.',
  },
  {
    icon: Laptop,
    color: 'blueDeep',
    title: 'Taught by people who build software',
    body: 'Mentors come from the team that builds technology at Navya, so lessons match how the industry works.',
  },
  {
    icon: Award,
    color: 'green',
    title: 'Certificate on completion',
    body: 'Each course ends with a finished project and a certificate of completion.',
  },
  {
    icon: DoorOpen,
    color: 'orange',
    title: 'Free demo class first',
    body: 'Join a live online demo class, meet the mentor and try it out before choosing a course.',
  },
];

export const WhyChooseUs: React.FC = () => (
  <section id="why-navya" className="section-y bg-block-yellow text-ink overflow-hidden">
    <Container>
      <Reveal className="max-w-3xl">
        <h2 className="text-title">Why learn at Navya</h2>
        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink/80 max-w-[52ch]">
          Hands-on live online classes for children, students and working professionals, built around real projects
          rather than slides.
        </p>
      </Reveal>

      <Stagger as="ul" className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {REASONS.map(({ icon: Icon, color, title, body }) => (
          <StaggerItem as="li" key={title} className="list-none">
            <div className="h-full rounded-3xl bg-white p-7 shadow-md">
              <span
                aria-hidden="true"
                className={`inline-grid place-items-center w-12 h-12 rounded-xl shadow-[inset_0_-7px_9px_-6px_rgb(15_22_64/0.32)] ${
                  BLOCK_COLORS[color].ink ? 'text-ink' : 'text-white'
                }`}
                style={{ background: BLOCK_COLORS[color].bg }}
              >
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.025em] leading-tight text-ink">{title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">{body}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Container>
  </section>
);
