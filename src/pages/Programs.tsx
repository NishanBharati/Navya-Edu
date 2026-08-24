import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, ArrowRight, UserCheck, Layers } from 'lucide-react';
import { PROGRAMS } from '../data/programs';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';

export const Programs: React.FC = () => {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedProgramTitle, setSelectedProgramTitle] = useState('');

  const handleOpenAdvisor = (programTitle: string) => {
    setSelectedProgramTitle(programTitle);
    setIsAdvisorOpen(true);
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="Career Programs & Professional Tracks | Navya Ed Tech"
        description="Comprehensive career programs in Full Stack Engineering, Data Science, Product Design, and Internship Readiness in Kathmandu, Nepal."
      />

      <Container>
        {/* Page Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            Career Tracks & Multi-Tier Pathways
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F]">
            Comprehensive Programs
          </h1>
          <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
            Our career tracks combine multiple interconnected modules, live code critiques, architecture reviews, and capstone engineering to prepare you for industry software roles.
          </p>
        </div>

        {/* Program Cards */}
        <div className="space-y-8">
          {PROGRAMS.map((program) => (
            <article
              key={program.id}
              className="bg-white border border-[#E8E4DA] rounded-2xl p-6 sm:p-10 shadow-sm space-y-8"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#F0ECE1]">
                <div className="space-y-2.5 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <Badge variant="navy" size="md">
                      {program.category}
                    </Badge>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#171A1F] tracking-tight">
                    {program.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[#5F6670] leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="shrink-0 bg-[#F4F1EA] p-4 rounded-xl border border-[#E5DFD4] space-y-2 min-w-[220px]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5F6670]">Duration:</span>
                    <span className="font-bold text-[#171A1F]">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#5F6670]">Format:</span>
                    <span className="font-semibold text-[#171A1F]">{program.format}</span>
                  </div>
                  <div className="pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      onClick={() => handleOpenAdvisor(program.title)}
                    >
                      Inquire for Track
                    </Button>
                  </div>
                </div>
              </div>

              {/* Grid: Who it's for, What it includes, Expected Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Col 1: Who It's For */}
                <div className="p-5 rounded-xl bg-[#FAFAF8] border border-[#EFECE5] space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A] block">
                    Who It's For:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5F6670]">
                    {program.whoItsFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#356A9A] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 2: What It Includes */}
                <div className="p-5 rounded-xl bg-[#FAFAF8] border border-[#EFECE5] space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#17324D] block">
                    What It Includes:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#5F6670]">
                    {program.whatItIncludes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                        <span className="text-[#171A1F]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Col 3: Expected Outcome */}
                <div className="p-5 rounded-xl bg-[#718C7A]/10 border border-[#718C7A]/20 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#3D5644] block">
                    Expected Outcomes:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#3D5644]">
                    {program.expectedOutcome.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3D5644] mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>

      {/* Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedProgramTitle}
      />
    </main>
  );
};
