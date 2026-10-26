import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '../common/Container';
import { Reveal } from '../motion/Reveal';
import { FacultyMentorshipStandard } from './FacultyMentorshipStandard';
import { GraduateQualityStandard } from './GraduateQualityStandard';
import { DURATION, EASING, EASE_IN_OUT } from '../../lib/motion';

interface QualityStandardsProps {
  onOpenAdvisor?: () => void;
}

const TABS = [
  { id: 'faculty', label: 'Faculty & mentorship' },
  { id: 'proof', label: 'Graduate proof-of-work' },
] as const;

type TabId = (typeof TABS)[number]['id'];

/**
 * Home page "standards" band: the faculty and graduate standards share one
 * section behind tabs. Both panels stay in the DOM (inactive one `hidden`)
 * so all copy remains crawlable and anchor links keep working.
 */
export const QualityStandards: React.FC<QualityStandardsProps> = ({ onOpenAdvisor }) => {
  const [active, setActive] = useState<TabId>('faculty');
  const prefersReducedMotion = useReducedMotion();

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const idx = TABS.findIndex((t) => t.id === active);
    const next = TABS[(idx + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
    setActive(next.id);
    document.getElementById(`standards-tab-${next.id}`)?.focus();
  };

  return (
    <section id="standards-section" className="section-y bg-paper-alt border-y border-border-soft">
      <Container>
        <Reveal className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <h2 className="text-title font-semibold text-ink max-w-xl">Standards we hold ourselves to.</h2>
          <div
            role="tablist"
            aria-label="Navya Ed Tech standards"
            onKeyDown={onKeyDown}
            className="inline-flex p-1 rounded-2xl bg-white border border-border shadow-xs w-fit max-w-full overflow-x-auto scrollbar-none"
          >
            {TABS.map((tab) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`standards-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`standards-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(tab.id)}
                  className={`relative h-10 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors duration-180 cursor-pointer ${
                    isActive ? 'text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="standards-tab-indicator"
                      className="absolute inset-0 rounded-xl bg-navy"
                      transition={prefersReducedMotion ? { duration: 0 } : { duration: DURATION.base, ease: EASE_IN_OUT }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <motion.div
              key={tab.id}
              id={`standards-panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`standards-tab-${tab.id}`}
              hidden={!isActive}
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: DURATION.base, ease: EASING }}
            >
              {tab.id === 'faculty' ? (
                <FacultyMentorshipStandard embedded onOpenAdvisor={onOpenAdvisor} />
              ) : (
                <GraduateQualityStandard embedded />
              )}
            </motion.div>
          );
        })}
      </Container>
    </section>
  );
};
