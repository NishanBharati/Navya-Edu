import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { ImagePlaceholder } from '../common/ImagePlaceholder';
import { Reveal } from '../motion/Reveal';
import { DURATION, EASING, EASE_IN_OUT } from '../../lib/motion';

interface FeaturedProgramProps {
  onOpenAdvisor: (courseSlug?: string) => void;
}

type TrackKey = 'web' | 'python-data';

const TRACKS: Record<
  TrackKey,
  {
    tab: string;
    schedule: string;
    title: string;
    description: string;
    outcomes: string[];
    syllabusHref: string;
    syllabusLabel: string;
    advisorSlug: string;
    image: string;
    accent: string;
  }
> = {
  web: {
    tab: 'Web Development (45 Days)',
    schedule: '45 Days • 1:12 Laboratory Cohort',
    title: 'Modern Web Development with HTML, CSS & JavaScript',
    description:
      'Transition from first principles to deploying interactive web applications on Vercel. Master semantic HTML5, modern Tailwind CSS, JavaScript ES6+ application logic, and dynamic DOM engineering under direct code review.',
    outcomes: ['3 Live Deployed Capstones', 'Weekly PR Code Critiques', 'Vercel Cloud CI/CD'],
    syllabusHref: '/courses/web-development',
    syllabusLabel: 'View Web Dev Syllabus',
    advisorSlug: 'web-development',
    image: '/images/courses/web-development.jpg',
    accent: 'bg-amber-light text-amber-dark border-amber/25',
  },
  'python-data': {
    tab: 'Python & Data Science (90 Days)',
    schedule: '90 Days • Multi-Stage Pathway',
    title: 'Python Software Engineering & Applied Data Science',
    description:
      'A rigorous engineering pathway taking you from core Python programming and FastAPI microservices to exploratory data analytics, Pandas, SQL querying, and predictive machine learning models.',
    outcomes: ['AsyncIO & FastAPI APIs', 'Pandas & ML Pipelines', 'Real Nepali Market Datasets'],
    syllabusHref: '/courses/data-science',
    syllabusLabel: 'View Data Science Syllabus',
    advisorSlug: 'data-science',
    image: '/images/courses/data-science.jpg',
    accent: 'bg-sage-light text-sage-ink border-sage/25',
  },
};

export const FeaturedProgram: React.FC<FeaturedProgramProps> = ({ onOpenAdvisor }) => {
  const [activeTrack, setActiveTrack] = useState<TrackKey>('web');
  const prefersReducedMotion = useReducedMotion();
  const track = TRACKS[activeTrack];

  return (
    <section className="section-y bg-paper-alt border-y border-border-soft">
      <Container>
        <Reveal className="rounded-3xl bg-white border border-border shadow-lg overflow-hidden">
          {/* Track switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-5 sm:px-8 lg:px-10 py-5 border-b border-border-soft">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="eyebrow">
                <Sparkles className="w-3.5 h-3.5 -ml-1 text-amber" aria-hidden="true" />
                Flagship Pathways
              </span>
              <div role="tablist" aria-label="Flagship pathways" className="inline-flex p-1 rounded-xl bg-paper-alt border border-border w-fit max-w-full overflow-x-auto scrollbar-none">
                {(Object.keys(TRACKS) as TrackKey[]).map((key) => {
                  const isActive = activeTrack === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTrack(key)}
                      className={`relative h-9 px-3.5 rounded-lg text-[13px] font-semibold whitespace-nowrap transition-colors duration-180 cursor-pointer ${
                        isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="featured-track-indicator"
                          className="absolute inset-0 rounded-lg bg-white shadow-sm border border-border/70"
                          transition={prefersReducedMotion ? { duration: 0 } : { duration: DURATION.base, ease: EASE_IN_OUT }}
                        />
                      )}
                      <span className="relative">{TRACKS[key].tab}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Link to="/courses" className="group inline-flex items-center gap-1.5 text-[13px] font-semibold text-navy">
              <span className="link-underline">Compare all courses</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Copy */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeTrack}
                  initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(2px)', transition: { duration: DURATION.instant } }}
                  transition={{ duration: DURATION.base, ease: EASING }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`inline-flex items-center h-7 px-2.5 rounded-md border font-mono text-xs font-medium tracking-[0.06em] ${track.accent}`}>
                      FLAGSHIP SPECIALIZATION
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-muted">
                      <Calendar className="w-3.5 h-3.5" />
                      {track.schedule}
                    </span>
                  </div>

                  <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-[1.12] text-ink">
                    {track.title}
                  </h2>

                  <p className="mt-5 text-base sm:text-lg text-ink-muted leading-relaxed max-w-[60ch]">
                    {track.description}
                  </p>

                  <ul className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {track.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm font-medium text-ink">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Button variant="primary" size="md" href={track.syllabusHref} rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {track.syllabusLabel}
                    </Button>
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => onOpenAdvisor(track.advisorSlug)}
                      leftIcon={<MessageSquare className="w-4 h-4 text-blue" />}
                    >
                      Inquire for Schedule & Fees
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual */}
            <div className="lg:col-span-5 relative min-h-64 lg:min-h-full border-t lg:border-t-0 lg:border-l border-border-soft">
              <AnimatePresence initial={false}>
                <motion.div
                  key={track.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: DURATION.normal, ease: EASING }}
                  className="absolute inset-0"
                >
                  <ImagePlaceholder
                    src={track.image}
                    alt={track.title}
                    aspectRatio="auto"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-full"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/30 to-transparent pointer-events-none" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
