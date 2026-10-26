import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';
import { ArrowRight, Blocks, Code2 } from 'lucide-react';
import { Container } from '../common/Container';
import { Block, BlockSlot, blockStyle } from '../blocks/Block';
import { CoverArt, coverKindFor } from '../blocks/CoverArt';
import { AGE_BANDS, PATH_STEPS } from '../../data/learningPath';
import { DURATION, EASING, EASE_IN_OUT } from '../../lib/motion';

interface HeroProps {
  onOpenAdvisor: (courseSlug?: string) => void;
}

const riseDelay = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as React.CSSProperties;

// Blocks land one after another with a small settle, like a block clicking into place.
const snapIn = {
  hidden: { opacity: 0, y: -14, x: 10 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: { type: 'spring' as const, duration: 0.45, bounce: 0.2, delay: 0.06 + i * 0.07 },
  }),
  exit: { opacity: 0, x: -8, transition: { duration: DURATION.instant } },
};

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  const [bandId, setBandId] = useState(AGE_BANDS[0].id);
  const [view, setView] = useState<'blocks' | 'python'>('blocks');
  // The pre-rendered script must be visible at once; blocks only snap in after a choice.
  const [touched, setTouched] = useState(false);
  const chooseBand = (id: string) => {
    setTouched(true);
    setBandId(id);
  };
  const prefersReducedMotion = useReducedMotion();

  const band = AGE_BANDS.find((b) => b.id === bandId) ?? AGE_BANDS[0];
  const steps = band.path.map((slug) => PATH_STEPS[slug]);
  const first = steps[0];
  const indicator = prefersReducedMotion ? { duration: 0 } : { duration: DURATION.base, ease: EASE_IN_OUT };

  const onAgeKey = (e: React.KeyboardEvent) => {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
    e.preventDefault();
    const idx = AGE_BANDS.findIndex((b) => b.id === bandId);
    const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : AGE_BANDS.length - 1;
    const next = AGE_BANDS[(idx + step) % AGE_BANDS.length];
    chooseBand(next.id);
    document.getElementById(`age-${next.id}`)?.focus();
  };

  let blockIndex = 0;

  return (
    <section className="relative overflow-hidden bg-block-blue text-white">
      <div className="absolute inset-0 bg-dots-light pointer-events-none" aria-hidden="true" />

      <Container className="relative pt-14 sm:pt-20 pb-16 sm:pb-24">
        <div className="max-w-5xl">
          <h1 style={riseDelay(0)} className="rise text-display text-white">
            Your child snaps ideas together. <span className="text-block-yellow">Then writes real code.</span>
          </h1>
          <p style={riseDelay(90)} className="rise mt-6 max-w-[60ch] text-lg sm:text-xl leading-relaxed text-white/90">
            Small, hands-on coding classes for ages 8 to 16 in Putalisadak, Kathmandu. Every class builds a real
            project, from first Scratch blocks to Python and websites.
          </p>
        </div>

        {/* The editor: palette, script, stage */}
        <div
          style={riseDelay(180)}
          className="rise mt-10 sm:mt-14 rounded-3xl bg-white text-ink shadow-[0_30px_80px_-30px_rgb(8_12_38/0.55)] overflow-hidden"
        >
          {/* Editor bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-border bg-canvas">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink-muted">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-block-pink" />
                <span className="w-3 h-3 rounded-full bg-block-yellow" />
                <span className="w-3 h-3 rounded-full bg-block-green" />
              </span>
              <span className="ml-2">Suggested path</span>
            </div>
            <LayoutGroup id="hero-view">
              <div role="tablist" aria-label="Show the path as" className="inline-flex p-1 rounded-xl bg-white border border-border">
                {(['blocks', 'python'] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    role="tab"
                    aria-selected={view === v}
                    onClick={() => setView(v)}
                    className={`relative inline-flex items-center gap-1.5 h-9 px-3.5 rounded-lg text-sm font-display font-bold transition-colors duration-180 cursor-pointer ${
                      view === v ? 'text-white' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {view === v && (
                      <motion.span layoutId="hero-view-indicator" className="absolute inset-0 rounded-lg bg-ink" transition={indicator} />
                    )}
                    <span className="relative inline-flex items-center gap-1.5">
                      {v === 'blocks' ? <Blocks className="w-4 h-4" /> : <Code2 className="w-4 h-4" />}
                      {v === 'blocks' ? 'Blocks' : 'Python'}
                    </span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)_22rem]">
            {/* Palette: the action starts here */}
            <div className="p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-border bg-canvas/60">
              <p id="age-label" className="font-display font-bold text-lg text-ink">How old is your child?</p>
              <div
                role="radiogroup"
                aria-labelledby="age-label"
                onKeyDown={onAgeKey}
                className="mt-4 flex lg:flex-col flex-wrap gap-x-2 gap-y-3"
              >
                {AGE_BANDS.map((b) => {
                  const checked = b.id === bandId;
                  return (
                    <button
                      key={b.id}
                      id={`age-${b.id}`}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      tabIndex={checked ? 0 : -1}
                      onClick={() => chooseBand(b.id)}
                      style={blockStyle(checked ? 'violet' : 'white')}
                      className={`snap-block snap-hat !min-h-11 justify-between lg:w-full cursor-pointer transition-[translate,scale] duration-180 ease-out hover:-translate-y-0.5 active:scale-[0.97] ${
                        checked ? 'text-white' : 'snap-ink ring-2 ring-inset ring-ink/10'
                      }`}
                    >
                      <span>Ages {b.label}</span>
                      {checked && <span aria-hidden="true" className="w-2 h-2 rounded-full bg-block-yellow" />}
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-muted" aria-live="polite">
                {band.note}
              </p>
            </div>

            {/* Script area */}
            <div className="relative min-h-[22rem] p-5 sm:p-8 bg-dots overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                {view === 'blocks' ? (
                  <motion.div
                    key={`blocks-${band.id}`}
                    initial={{ opacity: 0, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(2px)', transition: { duration: DURATION.instant } }}
                    transition={{ duration: DURATION.base, ease: EASING }}
                    className="flex flex-col items-start gap-1 stack-depth text-[15px] sm:text-base"
                    aria-label={`Suggested path for ages ${band.label}: ${steps.map((s) => s.course).join(', then ')}`}
                  >
                    <motion.div custom={blockIndex} variants={snapIn} initial={false} animate="show" className={touched ? '' : 'snap-in'} style={{ '--snap-delay': `${300 + blockIndex++ * 70}ms` } as React.CSSProperties}>
                      <Block color="yellow" hat>when my child joins Navya</Block>
                    </motion.div>
                    {steps.map((step) => (
                      <React.Fragment key={step.slug}>
                        <motion.div custom={blockIndex} variants={snapIn} initial={touched ? 'hidden' : false} animate="show" className={touched ? '' : 'snap-in'} style={{ '--snap-delay': `${300 + blockIndex++ * 70}ms` } as React.CSSProperties}>
                          <Block color={step.color}>
                            learn <BlockSlot>{step.course}</BlockSlot> for <BlockSlot>{step.duration}</BlockSlot>
                          </Block>
                        </motion.div>
                        {step.blocks.map((b) => (
                          <motion.div key={b.text} custom={blockIndex} variants={snapIn} initial={touched ? 'hidden' : false} animate="show" className={`ml-6 sm:ml-8 ${touched ? '' : 'snap-in'}`} style={{ '--snap-delay': `${300 + blockIndex++ * 70}ms` } as React.CSSProperties}>
                            <Block color={step.color === 'blue' || step.color === 'violet' ? 'blueDeep' : 'green'}>
                              {b.text} {b.slot && <BlockSlot>{b.slot}</BlockSlot>}
                            </Block>
                          </motion.div>
                        ))}
                      </React.Fragment>
                    ))}
                  </motion.div>
                ) : (
                  <motion.pre
                    key={`python-${band.id}`}
                    initial={{ opacity: 0, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(2px)', transition: { duration: DURATION.instant } }}
                    transition={{ duration: DURATION.base, ease: EASING }}
                    className="rounded-2xl bg-ink text-[#E6E9FF] p-5 sm:p-6 font-mono text-[13px] sm:text-sm leading-7 overflow-x-auto"
                    aria-label="The same path written as Python"
                  >
                    {steps.map((step) => (
                      <span key={step.slug} className="block mb-3 last:mb-0">
                        <span className="text-white/55"># {step.course}, {step.duration}</span>
                        {'\n'}
                        {step.python.join('\n')}
                        {'\n'}
                      </span>
                    ))}
                  </motion.pre>
                )}
              </AnimatePresence>
            </div>

            {/* Stage: what they build, and the action */}
            <div className="p-5 sm:p-6 border-t lg:border-t-0 lg:border-l border-border flex flex-col gap-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden" role="img" aria-label={`Illustration of ${first.project}`}>
                <AnimatePresence initial={false}>
                  <motion.div
                    key={first.slug}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: DURATION.base, ease: EASING }}
                    className="absolute inset-0"
                  >
                    <CoverArt kind={coverKindFor(first.course + ' ' + first.project)} label={first.project} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-muted">First project</p>
                <p className="mt-1 font-display text-xl font-bold leading-snug text-ink">{first.project}</p>
                <p className="mt-1 text-sm text-ink-muted">from {first.course}</p>
              </div>
              <div className="mt-auto flex flex-col gap-2.5">
                {/* The primary action is the script's hat block: it starts everything */}
                <button
                  type="button"
                  onClick={() => onOpenAdvisor(first.slug)}
                  style={blockStyle('orange')}
                  className="group snap-block snap-hat snap-ink w-full justify-center !min-h-14 text-[17px] cursor-pointer transition-[translate,scale,filter] duration-180 ease-out hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0 active:scale-[0.97] focus:outline-none focus-visible:ring-[3px] focus-visible:ring-block-blue focus-visible:ring-offset-2"
                >
                  Book a free demo class
                  <ArrowRight className="w-5 h-5 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
                </button>
                <Link
                  to={`/courses/${first.slug}`}
                  className="inline-flex items-center justify-center gap-1.5 h-11 text-[15px] font-semibold text-ink"
                >
                  <span className="link-underline">See the {first.course} course</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p style={riseDelay(260)} className="rise mt-6 text-[15px] text-white/85">
          Up to 12 children per mentor, in our lab in Putalisadak. An advisor confirms the right level in the free demo class.
        </p>
      </Container>
    </section>
  );
};
