import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Calendar, MessageSquare, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DarkCTACard } from '../common/DarkCTACard';

interface FeaturedProgramProps {
  onOpenAdvisor: (courseSlug?: string) => void;
}

type TrackKey = 'web' | 'python-data';

export const FeaturedProgram: React.FC<FeaturedProgramProps> = ({ onOpenAdvisor }) => {
  const [activeTrack, setActiveTrack] = useState<TrackKey>('web');

  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        <DarkCTACard decoration="dots">
          <div className="p-8 sm:p-12 lg:p-14 space-y-8">
            {/* Track Switcher Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 flex-wrap">
              <span className="text-xs font-mono uppercase tracking-wider text-navy-mist mr-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber" />
                Featured Pathways:
              </span>
              <button
                type="button"
                onClick={() => setActiveTrack('web')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeTrack === 'web'
                    ? 'bg-white/15 text-white border border-white/30 shadow-xs'
                    : 'text-navy-mist hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                Web Development (45 Days)
              </button>
              <button
                type="button"
                onClick={() => setActiveTrack('python-data')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                  activeTrack === 'python-data'
                    ? 'bg-white/15 text-white border border-white/30 shadow-xs'
                    : 'text-navy-mist hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                Python & Data Science (90 Days)
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6">
                {activeTrack === 'web' ? (
                  <>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-3 py-1 rounded-md bg-amber/20 text-[#D9A662] text-xs font-mono font-bold border border-amber/30">
                        FLAGSHIP WEB DEVELOPMENT TRACK
                      </span>
                      <span className="text-xs text-navy-mist font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>45 Days (7.5 Weeks Intensive Labs)</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Modern Web Development with HTML, CSS &amp; JavaScript
                    </h2>

                    <p className="text-sm sm:text-base text-mist leading-relaxed">
                      Our flagship practical web program designed to transition learners from foundational markup to deploying production-grade, interactive web applications. Master semantic HTML5, modern Tailwind CSS, JavaScript ES6+ application logic, dynamic DOM interfaces, and live cloud deployment on Vercel.
                    </p>

                    {/* 4 Key Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>3 Production Capstones (E-Commerce & Kanban)</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>Weekly 1-on-1 Code Critiques with Senior Engineers</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>Git Branching, GitHub Workflows & Vercel Deployment</span>
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
                        href="/courses/web-development"
                        rightIcon={<ArrowRight className="w-4 h-4 text-navy transition-transform duration-200 group-hover:translate-x-0.5" />}
                      >
                        View Web Development Syllabus
                      </Button>
                      <Button
                        variant="outline-white"
                        size="lg"
                        onClick={() => onOpenAdvisor('web-development')}
                        leftIcon={<MessageSquare className="w-4 h-4 text-navy-mist" />}
                      >
                        Inquire for Schedule & Fees (NPR)
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-3 py-1 rounded-md bg-sage/20 text-sage text-xs font-mono font-bold border border-sage/30">
                        FLAGSHIP PYTHON & DATA TRACK
                      </span>
                      <span className="text-xs text-navy-mist font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>90 Days (Python + Advanced + Data Science)</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                      Python Software Engineering & Applied Data Science
                    </h2>

                    <p className="text-sm sm:text-base text-mist leading-relaxed">
                      A comprehensive engineering pathway taking you from core Python programming and asynchronous FastAPI microservices to high-impact exploratory data analysis, Pandas, SQL data querying, and predictive machine learning models with Scikit-Learn.
                    </p>

                    {/* 4 Key Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>3 Domain Capstones (Kalimati Predictor & FinTrack CLI)</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>Object-Oriented Architecture, AsyncIO & FastAPI</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-border-warm">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                        <span>Real Nepali Datasets for Market Trend Analytics</span>
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
                        href="/courses/data-science"
                        rightIcon={<ArrowRight className="w-4 h-4 text-navy transition-transform duration-200 group-hover:translate-x-0.5" />}
                      >
                        View Data Science Syllabus
                      </Button>
                      <Button
                        variant="outline-white"
                        size="lg"
                        onClick={() => onOpenAdvisor('data-science')}
                        leftIcon={<MessageSquare className="w-4 h-4 text-navy-mist" />}
                      >
                        Inquire for Schedule & Fees (NPR)
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* Right Card / 3-Phase Progression Roadmap */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-4 backdrop-blur-xs">
                <span className="text-xs font-mono uppercase tracking-wider text-navy-mist block border-b border-white/10 pb-3">
                  {activeTrack === 'web' ? 'Web Development Roadmap (45 Days)' : 'Python & Data Roadmap (90 Days)'}
                </span>

                {activeTrack === 'web' ? (
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold">Phase 1: Modern UI & Responsive Layouts</strong>
                        <span className="text-[10px] font-mono text-navy-mist">Days 1–15</span>
                      </div>
                      <p className="text-[11px] text-mist">Semantic HTML5, CSS3 Flexbox & Grid, Tailwind CSS Design Systems</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold">Phase 2: JavaScript ES6+ & Dynamic Logic</strong>
                        <span className="text-[10px] font-mono text-navy-mist">Days 16–30</span>
                      </div>
                      <p className="text-[11px] text-mist">DOM Manipulation, Array Methods, Async/Await, REST APIs & Fetch</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold">Phase 3: Advanced JavaScript & Cloud Deployment</strong>
                        <span className="text-[10px] font-mono text-navy-mist">Days 31–45</span>
                      </div>
                      <p className="text-[11px] text-mist">Reusable UI Patterns, State &amp; Local Storage, Git Workflows, Vercel CI/CD</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold">Phase 1: Python Programming Foundations</strong>
                        <span className="text-[10px] font-mono text-navy-mist">Days 1–40</span>
                      </div>
                      <p className="text-[11px] text-mist">Data Types, Control Flow, Functions, OOP Principles & CLI Scripting</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold">Phase 2: Advanced Python & Async APIs</strong>
                        <span className="text-[10px] font-mono text-navy-mist">Days 41–80</span>
                      </div>
                      <p className="text-[11px] text-mist">AsyncIO, FastAPI Microservices, SQLAlchemy ORM & Concurrency</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <strong className="text-white font-bold">Phase 3: Data Science & Predictive ML</strong>
                        <span className="text-[10px] font-mono text-navy-mist">Days 81–90+</span>
                      </div>
                      <p className="text-[11px] text-mist">Pandas, NumPy, Scikit-Learn Pipelines & Model Deployment</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-center text-[11px] text-navy-mist italic">
                  * Cohort size is strictly capped at 16 students for deep code review quality.
                </div>
              </div>
            </div>
          </div>
        </DarkCTACard>
      </Container>
    </section>
  );
};
