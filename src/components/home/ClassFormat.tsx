import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../common/Container';
import { Block, BlockSlot, BlockColor } from '../blocks/Block';
import { Reveal } from '../motion/Reveal';
import { VIEWPORT_REVEAL } from '../../lib/motion';

const SCRIPT: { color: BlockColor; text: React.ReactNode; note: string }[] = [
  {
    color: 'blue',
    text: <>join a group of <BlockSlot>12 children</BlockSlot> with one mentor</>,
    note: 'Small groups, so nobody gets lost at the back of the room.',
  },
  {
    color: 'violet',
    text: <>build the next part of <BlockSlot>a real project</BlockSlot></>,
    note: 'Every class adds to a game, an app or a website your child can open at home.',
  },
  {
    color: 'green',
    text: <>if stuck, mentor <BlockSlot>sits beside you</BlockSlot></>,
    note: 'Bugs are fixed together, line by line, not by copying an answer.',
  },
  {
    color: 'pink',
    text: <>show the project, earn the <BlockSlot>certificate</BlockSlot></>,
    note: 'Each course ends with a finished project and a certificate of completion.',
  },
];

// Each block lands after the one above it, like a script being assembled.
const land = {
  hidden: { opacity: 0, y: -12, x: 8 },
  show: (i: number) => ({ opacity: 1, y: 0, x: 0, transition: { type: 'spring' as const, duration: 0.5, bounce: 0.2, delay: i * 0.11 } }),
};

export const ClassFormat: React.FC = () => (
  <section id="how-classes-work" className="section-y bg-block-yellow text-ink overflow-hidden">
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 lg:gap-20 items-start">
        <Reveal className="lg:sticky lg:top-28">
          <h2 className="text-title">What happens in a class</h2>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-ink/80 max-w-[44ch]">
            Classes run in person at our lab in Putalisadak. Parents are welcome to visit first and meet the mentor
            in a free demo class before choosing a batch.
          </p>
        </Reveal>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT_REVEAL}
          className="flex flex-col items-start gap-1 stack-depth text-base sm:text-lg"
        >
          <motion.li custom={0} variants={land} className="list-none">
            <Block color="orange" hat>when class starts</Block>
          </motion.li>
          {SCRIPT.map((line, i) => (
            <motion.li
              key={line.note}
              custom={i + 1}
              variants={land}
              className="list-none w-full grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] items-center gap-x-5 gap-y-2"
            >
              <Block color={line.color}>{line.text}</Block>
              {/* Leader line: the note sits beside the step it explains */}
              <span className="flex items-center gap-3 text-[15px] leading-snug text-ink/80 pl-1 sm:pl-0">
                <span aria-hidden="true" className="hidden sm:block h-0.5 w-8 shrink-0 bg-ink/35 rounded-full" />
                {line.note}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </Container>
  </section>
);
