import React from 'react';
import { ArrowRight, MessageSquare, Mail, MapPin, Clock } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Reveal } from '../motion/Reveal';

interface AdvisorCTAProps {
  onOpenAdvisor: () => void;
}

// The page's single dark band: closing call to action with an ambient glow.
export const AdvisorCTA: React.FC<AdvisorCTAProps> = ({ onOpenAdvisor }) => {
  return (
    <section id="final-cta-section" className="section-y bg-paper">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-navy text-white px-6 py-16 sm:px-12 sm:py-20 lg:py-24 text-center shadow-2xl">
          <div className="absolute inset-0 bg-blueprint-dark pointer-events-none" aria-hidden="true" />
          <div
            className="ambient-drift absolute -top-1/2 left-1/2 -ml-[28rem] w-[56rem] h-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(121_183_237/0.32),transparent)] pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative max-w-2xl mx-auto">
            <p className="eyebrow text-blue-light justify-center">Admissions & Academic Counseling</p>

            <h2 className="mt-6 text-title font-semibold text-white">
              Ready to Build Production Software Engineering Skills?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-mist leading-relaxed">
              Schedule a personalized academic counseling session or visit our Kathmandu Innovation Lab to review our curriculum modules, inspect student capstones, and discuss upcoming cohort schedules.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-navy" />}
                className="border-transparent"
              >
                Talk to an Academic Advisor
              </Button>
              <Button variant="outline-white" size="lg" href="/contact" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Visit Kathmandu Campus
              </Button>
            </div>

            <ul className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-mist">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-light" />
                Putalisadak, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-light" />
                <a href="mailto:info@navyaedtech.com" className="link-underline hover:text-white">
                  info@navyaedtech.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-light" />
                Sun to Fri: 7:00 AM to 7:00 PM
              </li>
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
