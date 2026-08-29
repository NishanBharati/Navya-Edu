import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Code2, ShieldCheck, Terminal, Volume2, VolumeX } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import heroVideo from '../../assets/videos/1.mp4';

interface HeroProps {
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    // Ensure video attempts autoplay smoothly on mount
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
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-border-soft">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 space-y-6">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-ink leading-[1.12]">
              Learn Technology From The Enterprise That <span className="text-navy">Actually Builds It.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
              Practical, project-driven IT education designed around modern technologies and industry engineering standards in Nepal. Learn directly from working architects, write production code daily, and build verifiable proof-of-work portfolios.
            </p>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
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
            </div>
          </div>

          {/* Right Visual Composition - Professional Autoplay Video Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Subtle ambient backdrop glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-navy/25 via-blue/20 to-sage/25 rounded-3xl blur-xl opacity-80 -z-10" />

              {/* Main Video Frame with refined editorial crop */}
              <div className="group relative rounded-3xl overflow-hidden border border-[#E0DACF] shadow-2xl bg-[#0F1E2E]">
                <video
                  ref={videoRef}
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
                  className="w-full h-115 sm:h-135 lg:h-150 object-cover scale-[1.01] transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={heroVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Subtle gradient vignette to anchor overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F30]/95 via-[#0E1F30]/35 to-transparent pointer-events-none" />

                {/* Top Video Indicators & Mute Control */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E1F30]/75 backdrop-blur-md border border-white/10 text-[11px] font-semibold tracking-wide text-white/90 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/15 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase text-navy-mist">
                    <Terminal className="w-3.5 h-3.5 text-sage" />
                    <span>KATHMANDU INNOVATION LAB</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Hands-on laboratory sessions, code sprints & peer architecture reviews.
                  </h3>
                  <p className="text-xs text-mist">
                    Dual-monitor developer desks, gigabit fiber, and 1-on-1 mentor guidance.
                  </p>
                </div>
              </div>

              {/* Floating Understated Info Cards */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-xl z-20 transition-transform duration-300 hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-ink block">Production Workflows</span>
                  <span className="text-ink-soft text-[10px]">Python, JavaScript, Git & Vercel</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-border shadow-xl z-20 transition-transform duration-300 hover:translate-y-0.5">
                <div className="w-8 h-8 rounded-xl bg-sage/20 text-sage-ink flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-ink block">Growing Hiring Partner Network</span>
                  <span className="text-ink-soft text-[10px]">Nepal & Remote Tech Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

