import React from 'react';
import { ArrowRight, CheckCircle2, Calendar, MessageSquare } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DarkCTACard } from '../common/DarkCTACard';

interface FeaturedProgramProps {
  onOpenAdvisor: () => void;
}

export const FeaturedProgram: React.FC<FeaturedProgramProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        <DarkCTACard decoration="dots">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 lg:p-14">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="px-3 py-1 rounded-md bg-amber/20 text-[#D9A662] text-xs font-mono font-bold border border-amber/30">
                  FLAGSHIP CAREER FELLOWSHIP
                </span>
                <span className="text-xs text-navy-mist font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>6 Months (24 Weeks Intensive)</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Full Stack Software Engineering Fellowship
              </h2>

              <p className="text-sm sm:text-base text-mist leading-relaxed">
                Our flagship career program designed to bridge the gap between academic CS degrees and professional software engineering. Master TypeScript, modern React/Next.js, PostgreSQL relational modeling, Docker containerization, and AWS deployment.
              </p>

              {/* 3 Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span>3 Multi-Tenant Production Capstones</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span>Weekly 1-on-1 Code Critiques with Tech Leads</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span>Git Branching & GitHub Actions CI/CD</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span>Direct Placement Support Through Our Hiring Partner Network</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  href="/programs"
                  rightIcon={<ArrowRight className="w-4 h-4 text-navy transition-transform duration-200 group-hover:translate-x-0.5" />}
                >
                  View Fellowship Syllabus
                </Button>
                <Button
                  variant="outline-white"
                  size="lg"
                  onClick={onOpenAdvisor}
                  leftIcon={<MessageSquare className="w-4 h-4 text-navy-mist" />}
                >
                  Inquire for Schedule & Fees (NPR)
                </Button>
              </div>
            </div>

            {/* Right Card / 3-Phase Roadmap Preview */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4 backdrop-blur-xs">
              <span className="text-xs font-mono uppercase tracking-wider text-navy-mist block border-b border-white/10 pb-3">
                Curriculum Progression Roadmap
              </span>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-white font-bold">Phase 1: Modern Frontend & TypeScript</strong>
                    <span className="text-[10px] font-mono text-navy-mist">Months 1–2</span>
                  </div>
                  <p className="text-[11px] text-mist">React 19, Next.js App Router, Tailwind, State Architecture</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-white font-bold">Phase 2: Scalable Backend & Databases</strong>
                    <span className="text-[10px] font-mono text-navy-mist">Months 3–4</span>
                  </div>
                  <p className="text-[11px] text-mist">Node.js, Express, PostgreSQL, Prisma, Redis Queues & JWT</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <strong className="text-white font-bold">Phase 3: Cloud DevOps & Placement Sprint</strong>
                    <span className="text-[10px] font-mono text-navy-mist">Months 5–6</span>
                  </div>
                  <p className="text-[11px] text-mist">Docker, AWS, CI/CD, Capstone Code Defense & Tech Interviews</p>
                </div>
              </div>

              <div className="pt-2 text-center text-[11px] text-navy-mist italic">
                * Cohort size is strictly capped at 16 students for deep code review quality.
              </div>
            </div>
          </div>
        </DarkCTACard>
      </Container>
    </section>
  );
};
