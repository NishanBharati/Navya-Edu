import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { Container } from '../common/Container';

export const LearningExperience: React.FC = () => {
  return (
    <section className="py-10 sm:py-14 bg-paper-alt border-b border-border">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white border border-border shadow-xs">
          <div className="flex items-center gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-navy/10 text-navy flex items-center justify-center shrink-0">
              <Terminal className="w-6 h-6 text-blue" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue">
                <span>The Navya Method</span>
              </div>
              <p className="text-sm sm:text-base text-ink font-semibold leading-relaxed">
                Our pedagogy is built on deliberate coding practice, daily pull-request critiques, and live cloud deployments.
              </p>
            </div>
          </div>

          <a
            href="/about#method"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy-light transition-all shadow-xs group"
          >
            <span>Learn how we teach</span>
            <ArrowRight className="w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Container>
    </section>
  );
};
