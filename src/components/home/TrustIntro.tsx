import React from 'react';
import { Terminal, Cpu, Briefcase } from 'lucide-react';
import { Container } from '../common/Container';

export const TrustIntro: React.FC = () => {
  return (
    <section className="py-14 sm:py-18 bg-[#F4F1EA] border-b border-[#E8E4DA]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#356A9A]">
            The Navya Advantage
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171A1F]">
            Technology education built by people who work in technology.
          </h2>
          <p className="text-sm sm:text-base text-[#5F6670] leading-relaxed">
            Navya Ed Tech is the dedicated education wing of Navya EdTech, a technology company delivering software development, cloud infrastructure, AI solutions, and digital engineering. We translate active industry practices directly into modern classroom and online training.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-[#E5DFD4] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">
              Practical Technology
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
              We teach modern, high-demand frameworks and toolsets used by engineering teams today, avoiding outdated syllabi.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5DFD4] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#356A9A]/10 text-[#356A9A] flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">
              Project-Based Learning
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
              Every concept is cemented through hands-on laboratory exercises, code reviews, and multi-tier capstone projects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[#E5DFD4] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#171A1F]">
              Career-Focused Training
            </h3>
            <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
              Structured pathways that emphasize Git hygiene, debugging, system design, and verifiable portfolio deliverables.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};
