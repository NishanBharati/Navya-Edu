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
    <section className="py-16 sm:py-20 bg-paper border-b border-border-soft">
      <Container>
        <DarkCTACard decoration="dots">
          <div className="p-8 sm:p-10 lg:p-12 space-y-6">
            {/* Track Switcher Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono uppercase tracking-wider text-navy-mist mr-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber" />
                  Flagship Pathways:
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
                  Python &amp; Data Science (90 Days)
                </button>
              </div>

              <a
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-mist hover:text-white transition-colors"
              >
                <span>Compare all courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Teaser Content */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                {activeTrack === 'web' ? (
                  <>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber/20 text-[#D9A662] text-xs font-mono font-bold border border-amber/30">
                        FLAGSHIP SPECIALIZATION
                      </span>
                      <span className="text-xs text-navy-mist font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>45 Days • 1:12 Laboratory Cohort</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      Modern Web Development with HTML, CSS &amp; JavaScript
                    </h2>

                    <p className="text-sm sm:text-base text-mist leading-relaxed max-w-2xl">
                      Transition from first principles to deploying interactive web applications on Vercel. Master semantic HTML5, modern Tailwind CSS, JavaScript ES6+ application logic, and dynamic DOM engineering under direct code review.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs text-border-warm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                        <span>3 Live Deployed Capstones</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                        <span>Weekly PR Code Critiques</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                        <span>Vercel Cloud CI/CD</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-sage/20 text-sage text-xs font-mono font-bold border border-sage/30">
                        FLAGSHIP SPECIALIZATION
                      </span>
                      <span className="text-xs text-navy-mist font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>90 Days • Multi-Stage Pathway</span>
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      Python Software Engineering &amp; Applied Data Science
                    </h2>

                    <p className="text-sm sm:text-base text-mist leading-relaxed max-w-2xl">
                      A rigorous engineering pathway taking you from core Python programming and FastAPI microservices to exploratory data analytics, Pandas, SQL querying, and predictive machine learning models.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs text-border-warm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                        <span>AsyncIO &amp; FastAPI APIs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                        <span>Pandas &amp; ML Pipelines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                        <span>Real Nepali Market Datasets</span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Action Column */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <Button
                  variant="secondary"
                  size="md"
                  href={activeTrack === 'web' ? '/courses/web-development' : '/courses/data-science'}
                  rightIcon={<ArrowRight className="w-4 h-4 text-navy transition-transform duration-200 group-hover:translate-x-0.5" />}
                  className="w-full justify-center"
                >
                  {activeTrack === 'web' ? 'View Web Dev Syllabus' : 'View Data Science Syllabus'}
                </Button>

                <Button
                  variant="outline-white"
                  size="md"
                  onClick={() => onOpenAdvisor(activeTrack === 'web' ? 'web-development' : 'data-science')}
                  leftIcon={<MessageSquare className="w-4 h-4 text-navy-mist" />}
                  className="w-full justify-center"
                >
                  Inquire for Schedule &amp; Fees
                </Button>
              </div>
            </div>
          </div>
        </DarkCTACard>
      </Container>
    </section>
  );
};
