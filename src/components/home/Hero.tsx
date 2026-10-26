import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageSquare, Code2, ShieldCheck, Terminal, Volume2, VolumeX, Users } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { HeroLiveIndicator } from '../common/HeroLiveIndicator';
import { AnimatedCounter } from '../common/StatCounter';
import {
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  heroCardsContainer,
  heroCardItem,
  heroVisual,
  EASING,
} from '../../lib/motion';

const heroVideo = '/videos/1.mp4';

interface HeroProps {
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Gentle vertical drift on scroll for floating cards
  const topBadgeParallax = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -14]);
  const bottomBadgeParallax = useTransform(scrollY, [0, 400], [0, prefersReducedMotion ? 0 : -22]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    // Ensure video attempts autoplay smoothly on mount if allowed
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
    <section className="relative pt-8 pb-14 md:pt-14 md:pb-20 overflow-hidden border-b border-border-soft">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Content with Staggered Entrance Sequence */}
          <motion.div
            variants={prefersReducedMotion ? undefined : heroStaggerContainer}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="lg:col-span-6 space-y-6"
          >
            {/* Target Audience Eyebrow Pill */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroEyebrow}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold text-navy"
            >
              <Users className="w-3.5 h-3.5 text-blue" />
              <span>For University Students, Career Switchers & Aspiring Developers</span>
              <HeroLiveIndicator color="emerald" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={prefersReducedMotion ? undefined : heroHeadline}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink leading-[1.14]"
            >
              Learn Technology From The Enterprise That <span className="text-navy">Actually Builds It.</span>
            </motion.h1>

            {/* Subtitle & Value Proposition */}
            <motion.p
              variants={prefersReducedMotion ? undefined : heroParagraph}
              className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
            >
              Practical, project-driven IT education designed around modern technologies and industry engineering standards in Nepal. Learn directly from working architects, write production code daily, and build verifiable proof-of-work portfolios.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroEyebrow}
              className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                href="/courses"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Courses & Syllabus
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-blue" />}
              >
                Talk to an Academic Advisor
              </Button>
            </motion.div>

            {/* Quick Trust Highlights with Staggered Metric Cards & Animated Counters */}
            <motion.div
              variants={prefersReducedMotion ? undefined : heroCardsContainer}
              className="pt-4 border-t border-border-faint grid grid-cols-3 gap-3 text-left"
            >
              <motion.div variants={prefersReducedMotion ? undefined : heroCardItem}>
                <span className="block text-base sm:text-lg font-bold text-ink">
                  <AnimatedCounter prefix="1:" from={1} to={12} duration={950} />
                </span>
                <span className="text-xs text-ink-soft">Cohort Ratio</span>
              </motion.div>
              <motion.div variants={prefersReducedMotion ? undefined : heroCardItem}>
                <span className="block text-base sm:text-lg font-bold text-ink">
                  <AnimatedCounter from={0} to={100} suffix="%" duration={1100} />
                </span>
                <span className="text-xs text-ink-soft">GitHub PR Reviews</span>
              </motion.div>
              <motion.div variants={prefersReducedMotion ? undefined : heroCardItem}>
                <span className="block text-base sm:text-lg font-bold text-ink">Kathmandu</span>
                <span className="text-xs text-ink-soft">Physical Lab</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Visual Composition - Professional Autoplay Video Frame with Parallax Floating Badges */}
          <motion.div
            variants={prefersReducedMotion ? undefined : heroVisual}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle ambient backdrop glow */}
              <div
                className="absolute -inset-1.5 bg-gradient-to-tr from-navy/25 via-blue/20 to-sage/25 rounded-3xl blur-xl opacity-80 -z-10"
                aria-hidden="true"
              />

              {/* Main Video Frame with refined editorial crop */}
              <div className="group relative rounded-3xl overflow-hidden border border-[#E0DACF] shadow-2xl bg-[#0F1E2E]">
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
                  className="w-full h-96 sm:h-120 lg:h-135 object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Subtle gradient vignette to anchor overlays */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#0E1F30]/95 via-[#0E1F30]/35 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Top Video Indicators & Mute Control */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1F30]/75 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wide text-white/90 shadow-sm">
                    <HeroLiveIndicator color="sage" />
                    <span>LIVE LAB EXPERIENCE</span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="pointer-events-auto p-2 rounded-full bg-[#0E1F30]/75 hover:bg-[#0E1F30] backdrop-blur-md border border-white/15 text-white/80 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sage" />}
                  </button>
                </div>

                {/* Overlaid Badges / Real Value Pillars */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 pointer-events-none z-10">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/10 text-xs font-mono tracking-wider uppercase text-navy-mist">
                    <Terminal className="w-3.5 h-3.5 text-sage" />
                    <span>KATHMANDU INNOVATION LAB</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white leading-snug">
                    Hands-on laboratory sessions, code sprints & peer architecture reviews.
                  </p>
                  <p className="text-xs text-mist">
                    Dual-monitor developer desks, gigabit fiber, and 1-on-1 mentor guidance.
                  </p>
                </div>
              </div>

              {/* Floating Understated Info Cards with Scroll Parallax Drift */}
              <motion.div
                style={{ y: topBadgeParallax }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                transition={{ duration: 0.2, ease: EASING }}
                className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-xl z-20 cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-ink block">Production Workflows</span>
                  <span className="text-ink-soft text-xs">Python, JavaScript, Git & Vercel</span>
                </div>
              </motion.div>

              <motion.div
                style={{ y: bottomBadgeParallax }}
                whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
                transition={{ duration: 0.2, ease: EASING }}
                className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-xl z-20 cursor-default"
              >
                <div className="w-8 h-8 rounded-xl bg-sage/20 text-sage-ink flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-ink block">Industry-Backed Training</span>
                  <span className="text-ink-soft text-xs">Navya EdTech Software Studio Lineage</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

