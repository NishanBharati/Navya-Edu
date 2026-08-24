import React from 'react';
import { ArrowRight, MessageSquare, Check, Code2, Users, Layers, ShieldCheck, Sparkles, Terminal, Globe } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

interface HeroProps {
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#EFECE5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#17324D]/5 border border-[#17324D]/15 text-xs font-semibold tracking-wider text-[#17324D] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#718C7A] animate-pulse" />
              <span>Navya Ed Tech • IT Education Division of Navya EdTech</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[#171A1F] leading-[1.12]">
              Learn Technology From The Enterprise That <span className="text-[#17324D] underline decoration-[#356A9A]/30 underline-offset-8">Actually Builds It.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed max-w-2xl">
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
                Explore Courses & Syllabi
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-[#356A9A]" />}
              >
                Talk to an Academic Advisor
              </Button>
            </div>

            {/* Trust & Verification Points */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-[#EFECE5]">
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#171A1F]">
                <div className="w-5 h-5 rounded-full bg-[#718C7A]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#3D5644]" />
                </div>
                <span>70% Hands-On Production Coding</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#171A1F]">
                <div className="w-5 h-5 rounded-full bg-[#718C7A]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#3D5644]" />
                </div>
                <span>Line-by-Line GitHub PR Reviews</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-[#171A1F]">
                <div className="w-5 h-5 rounded-full bg-[#718C7A]/20 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[#3D5644]" />
                </div>
                <span>Kathmandu Lab & Live Online</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame with refined editorial crop */}
              <div className="relative rounded-3xl overflow-hidden border border-[#E0DACF] shadow-xl bg-[#F4F1EA]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                  alt="Navya Ed Tech modern classroom lab and coding sessions"
                  className="w-full h-[400px] sm:h-[460px] object-cover"
                />

                {/* Subtle gradient vignette to anchor overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/90 via-[#17324D]/30 to-transparent" />

                {/* Overlaid Badges / Real Value Pillars */}
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/15 backdrop-blur-xs text-[10px] font-mono tracking-wider uppercase text-[#9BBAD4]">
                    <Terminal className="w-3 h-3" />
                    <span>KATHMANDU INNOVATION LAB</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    Hands-on laboratory sessions, code sprints & peer architecture reviews.
                  </h3>
                  <p className="text-xs text-[#C4CDD5]">
                    Dual-monitor developer desks, gigabit fiber, and 1-on-1 mentor guidance.
                  </p>
                </div>
              </div>

              {/* Floating Understated Info Cards */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DA] shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#171A1F] block">Production Workflows</span>
                  <span className="text-[#5F6670] text-[10px]">TypeScript, Docker, AWS CI/CD</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#E8E4DA] shadow-lg">
                <div className="w-8 h-8 rounded-xl bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#171A1F] block">40+ Hiring Partners</span>
                  <span className="text-[#5F6670] text-[10px]">Nepal & Remote Tech Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
