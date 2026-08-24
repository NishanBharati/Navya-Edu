import React from 'react';
import { ArrowRight, MessageSquare, PhoneCall, Mail } from 'lucide-react';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

interface AdvisorCTAProps {
  onOpenAdvisor: () => void;
}

export const AdvisorCTA: React.FC<AdvisorCTAProps> = ({ onOpenAdvisor }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F4F1EA]">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-white p-8 sm:p-12 rounded-2xl border border-[#E5DFD4] shadow-sm">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#356A9A]">
            Admissions & Academic Advisory
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171A1F]">
            Ready to start your technical education?
          </h2>

          <p className="text-sm sm:text-base text-[#5F6670] max-w-2xl mx-auto leading-relaxed">
            Speak directly with our academic team to discuss syllabus details, upcoming batch timings, prerequisite requirements, or personalized learning path recommendations.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={onOpenAdvisor}
              leftIcon={<MessageSquare className="w-4 h-4 text-[#9BBAD4]" />}
            >
              Talk to an Advisor
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/contact"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Visit Contact Desk
            </Button>
          </div>

          <div className="pt-6 border-t border-[#F0ECE1] flex flex-wrap items-center justify-center gap-6 text-xs text-[#5F6670]">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#17324D]" />
              <span>info@navyaedtech.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#718C7A]" />
              <span>Admissions Open for Kathmandu & Online Live Batches</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
