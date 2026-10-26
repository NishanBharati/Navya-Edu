import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal } from 'lucide-react';
import { Container } from '../common/Container';
import { Reveal } from '../motion/Reveal';

// Closing strip for the "Why Navya" section; shares its background so the two read as one band.
export const LearningExperience: React.FC = () => {
  return (
    <section className="bg-paper pb-[clamp(4rem,3rem+5vw,7rem)] -mt-4">
      <Container>
        <Reveal className="relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-paper-alt border border-border">
          <div className="flex items-start sm:items-center gap-5 max-w-2xl">
            <span className="w-12 h-12 rounded-2xl bg-white border border-border shadow-xs text-blue grid place-items-center shrink-0">
              <Terminal className="w-5 h-5" />
            </span>
            <div>
              <p className="eyebrow">The Navya Method</p>
              <p className="mt-2 text-base sm:text-lg text-ink font-medium leading-relaxed">
                Our pedagogy is built on deliberate coding practice, daily pull-request critiques, and live cloud deployments.
              </p>
            </div>
          </div>

          <Link
            to="/about#method"
            className="group shrink-0 inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-navy text-white text-sm font-semibold hover:bg-navy-light active:scale-[0.97] transition-[background-color,scale] duration-180 ease-out shadow-xs"
          >
            <span>Learn how we teach</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};
