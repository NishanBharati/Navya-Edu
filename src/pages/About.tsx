import React from 'react';
import { ArrowUpRight, ShieldCheck, Terminal, Cpu, Users, Award, BookOpen, Layers } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';

export const About: React.FC = () => {
  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="About Navya Ed Tech | IT Education Division of Navya EdTech"
        description="Learn about Navya Ed Tech Pvt. Ltd., our parent technology organization, our training philosophy, and our commitment to practical IT education in Nepal."
      />

      <Container>
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4 mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
            About Our Institute
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F] leading-tight">
            Bridging Industry Software Engineering and IT Education in Nepal.
          </h1>
          <p className="text-base sm:text-lg text-[#5F6670] leading-relaxed">
            Navya Ed Tech Pvt. Ltd. was established to solve a persistent industry challenge: the gap between academic computer science curricula and the practical demands of production software teams.
          </p>
        </div>

        {/* Core Corporate Section: Parent Company Connection */}
        <div className="bg-[#17324D] rounded-2xl text-white p-8 sm:p-12 mb-16 border border-[#12283E] shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#9BBAD4]">
                Corporate Integration
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Part of the Navya EdTech Technology Ecosystem
              </h2>
              <p className="text-sm sm:text-base text-[#C4CDD5] leading-relaxed">
                Our education division operates in direct alignment with <strong className="text-white">Navya EdTech</strong>, our parent technology enterprise. Because our parent company designs, builds, and maintains commercial software, cloud applications, and AI integrations, our instructional syllabi reflect active production practices.
              </p>
              <div className="pt-2">
                <a
                  href="https://navyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/15"
                >
                  <span>Explore Navya EdTech Parent Website (navyaedtech.com)</span>
                  <ArrowUpRight className="w-4 h-4 text-[#9BBAD4]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 p-6 rounded-xl border border-white/10 space-y-3">
              <span className="text-xs font-semibold uppercase text-[#9BBAD4] block">
                Parent Company Capabilities:
              </span>
              <ul className="space-y-1.5 text-xs text-[#E5DFD4] font-mono">
                <li>• Web & Mobile App Development</li>
                <li>• Cloud Systems & DevOps</li>
                <li>• Applied AI & Machine Learning</li>
                <li>• Enterprise UI/UX Product Design</li>
                <li>• IT Systems Consulting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Training Philosophy Grid */}
        <div className="mb-16 space-y-8">
          <SectionHeader
            eyebrow="Pedagogical Standards"
            title="Our Training Philosophy"
            description="We reject rote memorization and passive video lecturing. Every course adheres to three strict instructional pillars."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-[#E8E4DA] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171A1F]">
                1. Continuous Code Production
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Students write code in every single session. We prioritize keyboard muscle memory, terminal fluency, and resolving real compiler errors over slide decks.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E4DA] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#356A9A]/10 text-[#356A9A] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171A1F]">
                2. Mandatory Code Critiques
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Writing code that works is only step one. Our instructors inspect code structure, variable naming, error boundaries, and security vulnerabilities.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E4DA] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-[#171A1F]">
                3. Verifiable Proof of Work
              </h3>
              <p className="text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                Graduates leave with live deployed URLs and clean GitHub repositories that provide concrete evidence of capability to hiring teams.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Environment Section */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#F4F1EA] border border-[#E8E4DA] mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A]">
                Infrastructure & Setup
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#171A1F]">
                Modern Training Environment
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                Whether you attend physically at our Kathmandu laboratory or join live online cohorts, our training setup ensures direct interaction with instructors, dedicated lab hours, and fast response times during code sprints.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#171A1F]">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#718C7A]" />
                  <span>High-speed dedicated fiber connection and lab power backup</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#718C7A]" />
                  <span>Individual workstation setups with secondary external monitors</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#718C7A]" />
                  <span>Interactive online stream with recorded sessions for revision</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-xl overflow-hidden border border-[#E5DFD4] shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Navya training lab environment with students collaborating"
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center max-w-xl mx-auto space-y-4">
          <h3 className="text-xl font-bold text-[#171A1F]">
            Want to visit our training campus?
          </h3>
          <p className="text-xs sm:text-sm text-[#5F6670]">
            Schedule an appointment with an academic counselor to tour the lab and review syllabus modules in person.
          </p>
          <div className="pt-2">
            <Button variant="primary" size="md" href="/contact">
              Contact Admissions Desk
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};
