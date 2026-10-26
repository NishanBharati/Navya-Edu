import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COURSES } from '../../data/courses';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Block, BlockSlot, BlockColor } from '../blocks/Block';
import { Reveal, Stagger, StaggerItem } from '../motion/Reveal';

const OLDER: { slug: string; color: BlockColor }[] = [
  { slug: 'python-beginner', color: 'yellow' },
  { slug: 'web-development', color: 'orange' },
  { slug: 'python-advance', color: 'green' },
  { slug: 'data-science', color: 'pink' },
];

export const OlderLearners: React.FC = () => (
  <section id="older-learners" className="section-y relative overflow-hidden bg-block-violet text-white">
    <div className="absolute inset-0 bg-dots-light pointer-events-none" aria-hidden="true" />
    <Container className="relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <Reveal>
          <h2 className="text-title text-white">For teens, students and career switchers</h2>
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/90 max-w-[46ch]">
            The same hands-on approach continues into Python, web development and data science, for +2 and university
            students and adults changing careers.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3">
            <Button variant="amber" size="lg" href="/programs" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Explore career programs
            </Button>
            <Button variant="outline-white" size="lg" href="/corporate-training">
              Schools & organisations
            </Button>
          </div>
        </Reveal>

        <Stagger as="ul" className="flex flex-col items-start gap-1 stack-depth">
          <StaggerItem as="li" className="list-none">
            <Block color="blueDeep" hat>when ready for real code</Block>
          </StaggerItem>
          {OLDER.map(({ slug, color }) => {
            const course = COURSES.find((c) => c.slug === slug);
            if (!course) return null;
            return (
              <StaggerItem as="li" key={slug} className="list-none">
                <Link
                  to={`/courses/${slug}`}
                  className="group inline-flex rounded-xl focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-white"
                  aria-label={`${course.title}, ${course.duration}, ${course.level}`}
                >
                  <span className="transition-transform duration-180 ease-out group-hover:translate-x-1.5">
                    <Block color={color} className="text-base sm:text-lg">
                      {course.title} <BlockSlot>{course.duration}</BlockSlot>
                      <span className="hidden sm:inline text-[0.85em] font-semibold opacity-80">{course.level}</span>
                    </Block>
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Container>
  </section>
);
