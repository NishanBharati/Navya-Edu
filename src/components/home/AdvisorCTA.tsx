import React from 'react';
import { ArrowRight, MessageSquare, Mail, MapPin, Clock, Sparkles } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DarkCTACard } from '../common/DarkCTACard';

interface AdvisorCTAProps {
  onOpenAdvisor: () => void;
}

export const AdvisorCTA: React.FC<AdvisorCTAProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="py-16 sm:py-24 bg-paper-alt">
      <Container>
        <DarkCTACard className="p-8 sm:p-12 lg:p-16 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-wider text-navy-mist">
              <Sparkles className="w-3.5 h-3.5 text-navy-mist" />
              <span>Admissions & Academic Advisory</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Build Production Software Engineering Skills?
            </h2>

            <p className="text-sm sm:text-base text-mist leading-relaxed">
              Schedule a personalized academic counseling session or visit our Kathmandu Innovation Lab to review our curriculum modules, inspect student capstones, and discuss upcoming batch schedules.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-navy" />}
              >
                Talk to an Academic Advisor
              </Button>
              <Button
                variant="outline-white"
                size="lg"
                href="/contact"
                rightIcon={<ArrowRight className="w-4 h-4 text-white" />}
              >
                Schedule a Campus Tour
              </Button>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-navy-mist border-t border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage" />
                <span>Kathmandu, Nepal</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage" />
                <span>info@navyaedtech.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sage" />
                <span>Sun – Fri: 7:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        </DarkCTACard>
      </Container>
    </section>
  );
};
