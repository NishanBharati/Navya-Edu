import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageSquare, Code2, ShieldCheck, Volume2, VolumeX, Users } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

const heroVideo = '/videos/1.mp4';

interface HeroProps {
  onOpenAdvisor: () => void;
}

// Staggered page-load entrance. Runs in CSS so it plays from the server-rendered HTML.
const riseDelay = (delayMs: number) => ({ '--rise-delay': `${delayMs}ms` }) as React.CSSProperties;

const HERO_STATS = [
  { value: '1:12', label: 'Cohort ratio' },
  { value: '100%', label: 'GitHub PR reviews' },
  { value: 'Kathmandu', label: 'Physical lab' },
];

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Gentle depth: the media drifts slower than the page while the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 48]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
      return;
    }
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted until user interaction
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden -mt-16 lg:-mt-18 pt-28 lg:pt-36 pb-20 lg:pb-28">
      {/* Background: blueprint grid + slow ambient glow */}
      <div className="absolute inset-0 bg-blueprint pointer-events-none" aria-hidden="true" />
      <div
        className="ambient-drift absolute -top-32 right-[-10%] w-[44rem] h-[44rem] rounded-full bg-[radial-gradient(closest-side,rgb(121_183_237/0.28),transparent)] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-[-12%] w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(82_112_92/0.12),transparent)] pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 xl:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-6 xl:col-span-6">
            <p style={riseDelay(0)} className="rise inline-flex items-center gap-2.5 text-[13px] font-medium text-ink-muted">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white border border-border shadow-xs">
                <Users className="w-3.5 h-3.5 text-blue" />
              </span>
              For University Students, Career Switchers & Aspiring Developers
            </p>

            <h1 style={riseDelay(80)} className="rise mt-6 text-display font-semibold text-ink">
              Learn technology from the enterprise that{' '}
              <span className="relative inline-block text-navy whitespace-nowrap">
                actually builds it.
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-blue-light overflow-visible"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="draw-line"
                    pathLength={1}
                    d="M2 8.5C60 3.5 140 2.5 298 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </span>
            </h1>

            <p style={riseDelay(160)} className="rise mt-7 text-lg sm:text-xl text-ink-muted leading-relaxed max-w-[56ch]">
              Practical, project-driven IT education designed around modern technologies and industry engineering standards in Nepal. Learn directly from working architects, write production code daily, and build verifiable proof-of-work portfolios.
            </p>

            <div style={riseDelay(240)} className="rise mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/courses" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Courses & Syllabus
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-blue" />}
              >
                Talk to an Academic Advisor
              </Button>
            </div>

            <dl style={riseDelay(320)} className="rise mt-14 grid grid-cols-3 max-w-lg divide-x divide-border">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="px-4 first:pl-0">
                  <dt className="text-[13px] text-ink-muted">{stat.label}</dt>
                  <dd className="mt-1 text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-ink tabular-nums">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Media */}
          <div style={riseDelay(200)} className="rise lg:col-span-6 xl:col-span-6 relative">
            <motion.div style={{ y: mediaY }} className="relative">
              <div className="relative rounded-3xl p-1.5 bg-white/70 border border-border shadow-2xl backdrop-blur-sm">
                <div className="relative rounded-[1rem] overflow-hidden bg-navy-dark aspect-[4/3.4] sm:aspect-[4/3]">
                  <video
                    ref={videoRef}
                    src={heroVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    aria-label="Students working in the Navya Ed Tech Kathmandu lab"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-navy-dark/60 backdrop-blur-md border border-white/10 font-mono text-xs tracking-[0.06em] uppercase text-white/90">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage" aria-hidden="true" />
                      Live lab experience
                    </span>
                    <button
                      type="button"
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="w-9 h-9 grid place-items-center rounded-full bg-navy-dark/60 hover:bg-navy-dark backdrop-blur-md border border-white/15 text-white/85 hover:text-white active:scale-[0.94] transition-[background-color,color,scale] duration-180 cursor-pointer"
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 text-white">
                    <p className="font-mono text-xs tracking-[0.08em] uppercase text-navy-mist">Kathmandu Innovation Lab</p>
                    <p className="mt-2 text-lg sm:text-xl font-semibold leading-snug max-w-md">
                      Hands-on laboratory sessions, code sprints & peer architecture reviews.
                    </p>
                    <p className="mt-1.5 text-sm text-mist">
                      Dual-monitor developer desks, gigabit fiber, and 1-on-1 mentor guidance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Supporting proof, anchored to the frame */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-navy/[0.06] text-navy grid place-items-center shrink-0">
                    <Code2 className="w-4 h-4" />
                  </span>
                  <span className="text-[13px] leading-snug">
                    <span className="block font-semibold text-ink">Production Workflows</span>
                    <span className="text-ink-muted">Python, JavaScript, Git & Vercel</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border shadow-sm">
                  <span className="w-9 h-9 rounded-xl bg-sage-light text-sage-ink grid place-items-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-[13px] leading-snug">
                    <span className="block font-semibold text-ink">Industry-Backed Training</span>
                    <span className="text-ink-muted">Navya EdTech Software Studio Lineage</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
