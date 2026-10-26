import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { COURSES } from '../../data/courses';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { CoverArt, coverKindFor } from '../blocks/CoverArt';
import { Stagger, StaggerItem } from '../motion/Reveal';

const SHELF_COURSES = ['scratch-beginner', 'scratch-advanced', 'python-beginner'];

/** Real project briefs from the kids' and first Python course curricula. */
export const ProjectsShelf: React.FC = () => {
  const items = SHELF_COURSES.flatMap((slug) => {
    const course = COURSES.find((c) => c.slug === slug);
    return (course?.projects ?? []).slice(0, 2).map((p) => ({ ...p, course }));
  });
  const [lead, ...rest] = items;
  if (!lead) return null;

  return (
    <section id="projects" className="section-y bg-white">
      <Container>
        <SectionHeader
          title="What your child will build"
          description="These projects come straight from our course plans. Each one is built step by step in class and goes home finished."
        />

        <Stagger className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-5 lg:gap-6">
          {/* The lead project gets the wide slot; the rest form a varied grid, not a row of equal cards */}
          <StaggerItem className="md:col-span-6 lg:col-span-4 lg:row-span-2">
            <ProjectTile project={lead} large />
          </StaggerItem>
          {rest.map((p, i) => (
            <StaggerItem key={p.title} className={i < 2 ? 'md:col-span-3 lg:col-span-2' : 'md:col-span-3 lg:col-span-2'}>
              <ProjectTile project={p} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
};

interface TileProps {
  project: { title: string; description: string; course?: { slug: string; title: string } };
  large?: boolean;
}

const ProjectTile: React.FC<TileProps> = ({ project, large }) => (
  <Link
    to={project.course ? `/courses/${project.course.slug}` : '/courses'}
    className="group block h-full rounded-3xl bg-canvas border border-border overflow-hidden transition-[translate,box-shadow,border-color] duration-240 ease-out hover:-translate-y-1 hover:shadow-lg hover:border-ink/15 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-block-blue"
  >
    <div className={`relative overflow-hidden ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        <CoverArt kind={coverKindFor(`${project.course?.title ?? ''} ${project.title}`)} label={project.title} />
      </div>
    </div>
    <div className={large ? 'p-6 sm:p-8' : 'p-5 sm:p-6'}>
      <h3 className={`font-display font-bold tracking-[-0.025em] leading-tight text-ink ${large ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
        {project.title}
      </h3>
      <p className="mt-1 text-sm font-semibold text-ink-muted">{project.course?.title}</p>
      {large && <p className="mt-3 text-base leading-relaxed text-ink-muted max-w-[62ch] line-clamp-3">{project.description}</p>}
      <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-block-blue">
        See the course
        <ArrowRight className="w-4 h-4 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
      </span>
    </div>
  </Link>
);
