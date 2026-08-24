import React from 'react';
import { Terminal, Cpu, Briefcase, Building2, ShieldCheck, ArrowUpRight, Users, GitBranch, Award, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';

export const TrustIntro: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        {/* Verification Numbers Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          <div className="p-5 bg-white rounded-2xl border border-[#E8E4DA] shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-[#356A9A]">
              <Users className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">1,450+</span>
            </div>
            <p className="text-xs text-[#5F6670] font-medium">Alumni & Engineers Mentored</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8E4DA] shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-[#718C7A]">
              <ShieldCheck className="w-4 h-4 text-[#3D5644]" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">94.6%</span>
            </div>
            <p className="text-xs text-[#5F6670] font-medium">Live Deployed Capstones</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8E4DA] shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-[#356A9A]">
              <Building2 className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">40+</span>
            </div>
            <p className="text-xs text-[#5F6670] font-medium">Tech Hiring Partners</p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-[#E8E4DA] shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-[#D97706]">
              <GitBranch className="w-4 h-4" />
              <span className="text-2xl sm:text-3xl font-extrabold text-[#171A1F]">1 : 12</span>
            </div>
            <p className="text-xs text-[#5F6670] font-medium">Strict Live Lab Ratio</p>
          </div>
        </div>

        {/* Advantage Narrative Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <p className="text-xs font-semibold tracking-wider uppercase text-[#356A9A]">
            The Navya Advantage
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171A1F]">
            Technology Education Engineered by Software Practitioners.
          </h2>
          <p className="text-sm sm:text-base text-[#5F6670] leading-relaxed max-w-3xl mx-auto">
            Navya Ed Tech is the dedicated technology education division of <strong className="text-[#171A1F]">Navya EdTech</strong> (our parent commercial software company). We translate active production software practices, architecture patterns, and live bug reviews directly into modern classroom and online training.
          </p>
        </div>

        {/* 3 Core Advantage Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-[#E5DFD4] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#17324D]/30 transition-all">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#171A1F]">
                1. Production-First Stacks
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                We reject outdated college syllabi. Students learn TypeScript, modern React/Next.js, PostgreSQL, Docker containerization, and AWS cloud workflows currently demanded by software companies.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0ECE1] text-[11px] font-semibold text-[#17324D] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#718C7A]" />
              <span>Zero legacy syntax or toy projects</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E5DFD4] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#17324D]/30 transition-all">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#356A9A]/10 text-[#356A9A] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#171A1F]">
                2. Continuous Code Reviews
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Every line of code you write is inspected on GitHub by senior software engineers. You learn error boundaries, security standards (OWASP), naming conventions, and clean architectural design.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0ECE1] text-[11px] font-semibold text-[#17324D] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#718C7A]" />
              <span>Line-by-line feedback on PRs</span>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E5DFD4] shadow-xs space-y-3 flex flex-col justify-between hover:border-[#17324D]/30 transition-all">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-xl bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#171A1F]">
                3. Verifiable Proof-of-Work
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Graduates leave with live-deployed applications, clean GitHub repositories, and structured technical documentation that prove real capability to hiring managers in Nepal and abroad.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0ECE1] text-[11px] font-semibold text-[#17324D] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#718C7A]" />
              <span>Live custom domain deployments</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
