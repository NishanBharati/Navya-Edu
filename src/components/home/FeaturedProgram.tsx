import React from 'react';
import { ArrowRight, CheckCircle2, Calendar, Award } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface FeaturedProgramProps {
  onOpenAdvisor: () => void;
}

export const FeaturedProgram: React.FC<FeaturedProgramProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <div className="bg-[#17324D] rounded-2xl text-white overflow-hidden shadow-xl border border-[#12283E]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2">
                <Badge variant="amber" size="sm">
                  Flagship Career Track
                </Badge>
                <span className="text-xs text-[#9BBAD4] font-medium">
                  24 Weeks Intensive
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Full Stack Engineering Career Track
              </h2>

              <p className="text-sm sm:text-base text-[#C4CDD5] leading-relaxed">
                An immersive, multi-module career program designed to take you from foundational JavaScript through full-stack MERN, TypeScript, relational databases, Docker containerization, and cloud deployment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#E5DFD4]">
                  <CheckCircle2 className="w-4 h-4 text-[#C88A3D] shrink-0 mt-0.5" />
                  <span>3 Production-grade portfolio deliverables</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#E5DFD4]">
                  <CheckCircle2 className="w-4 h-4 text-[#C88A3D] shrink-0 mt-0.5" />
                  <span>Weekly code reviews by tech leads</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#E5DFD4]">
                  <CheckCircle2 className="w-4 h-4 text-[#C88A3D] shrink-0 mt-0.5" />
                  <span>Git branching & CI/CD workflow training</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#E5DFD4]">
                  <CheckCircle2 className="w-4 h-4 text-[#C88A3D] shrink-0 mt-0.5" />
                  <span>Technical project defense & evaluation</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button
                  variant="amber"
                  size="md"
                  href="/programs"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  View Program Details
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="text-white border-white/30 hover:border-white hover:bg-white/10"
                  onClick={onOpenAdvisor}
                >
                  Inquire for Schedule & Fees
                </Button>
              </div>
            </div>

            {/* Right Card / Meta Info */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-6 space-y-4 backdrop-blur-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9BBAD4] block">
                Track Structure
              </span>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-[#C4CDD5]">Duration</span>
                  <span className="font-semibold text-white">6 Months (24 Weeks)</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-[#C4CDD5]">Learning Mode</span>
                  <span className="font-semibold text-white">Classroom / In-Person</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-[#C4CDD5]">Primary Stack</span>
                  <span className="font-semibold text-white">MERN + TypeScript + Cloud</span>
                </div>
                <div className="p-3 rounded-lg bg-white/5 flex items-center justify-between">
                  <span className="text-[#C4CDD5]">Admission</span>
                  <span className="font-semibold text-[#C88A3D]">Open for Next Batch</span>
                </div>
              </div>

              <div className="pt-2 text-center text-xs text-[#9BBAD4]">
                Admissions are capped per batch to maintain 1-on-1 code critique quality.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
