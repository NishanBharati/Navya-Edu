import React from 'react';
import { ArrowRight, MessageSquare, Check, Code2, Users, Layers } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

interface HeroProps {
  onOpenAdvisor: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-[#EFECE5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F4F1EA] border border-[#E5DFD4] text-xs font-semibold tracking-wider text-[#17324D] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#356A9A] animate-pulse" />
              <span>Navya Ed Tech — IT Training Division</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl font-extrabold tracking-tight text-[#171A1F] leading-[1.12]">
              Build Skills That Move Your Career Forward.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-[#5F6670] leading-relaxed max-w-2xl">
              Practical IT education designed around modern technologies, real projects, and career-ready skills. Learn directly from the technology organization that builds digital software in Nepal.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                variant="primary"
                size="lg"
                href="/courses"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Courses
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-[#356A9A]" />}
              >
                Talk to an Advisor
              </Button>
            </div>

            {/* Subtle verification points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#EFECE5]">
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6670]">
                <Check className="w-4 h-4 text-[#718C7A] shrink-0" />
                <span>Project-Driven Syllabus</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6670]">
                <Check className="w-4 h-4 text-[#718C7A] shrink-0" />
                <span>Industry Practitioners</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#5F6670]">
                <Check className="w-4 h-4 text-[#718C7A] shrink-0" />
                <span>Classroom & Online Live</span>
              </div>
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image Frame with refined editorial crop */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E0DACF] shadow-lg bg-[#F4F1EA]">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                  alt="Students and instructor collaborating on code in modern classroom"
                  className="w-full h-[380px] sm:h-[440px] object-cover"
                />
                
                {/* Subtle gradient vignette to anchor overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17324D]/80 via-transparent to-transparent" />

                {/* Overlaid Badges / Real Value Pillars */}
                <div className="absolute bottom-5 left-5 right-5 text-white space-y-2">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-[#9BBAD4] block">
                    [NAVYA TRAINING ENVIRONMENT]
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Hands-on laboratory sessions, code sprints & peer architecture reviews.
                  </p>
                </div>
              </div>

              {/* Floating Understated Info Cards */}
              <div className="absolute -top-4 -left-4 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8E4DA] shadow-md">
                <div className="w-7 h-7 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#171A1F] block">Production Workflows</span>
                  <span className="text-[#5F6670] text-[10px]">Git, CI/CD, Cloud Deployment</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white border border-[#E8E4DA] shadow-md">
                <div className="w-7 h-7 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-[#171A1F] block">Real Project Portfolios</span>
                  <span className="text-[#5F6670] text-[10px]">Full-stack & AI capstones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
