import React from 'react';
import { MessageSquareCode, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { DarkCTACard } from '../common/DarkCTACard';

interface CourseConsultationCTAProps {
  onOpenAdvisor: () => void;
}

export const CourseConsultationCTA: React.FC<CourseConsultationCTAProps> = ({ onOpenAdvisor }) => {
  return (
    <section>
      <DarkCTACard className="p-8 sm:p-12">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-light uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-sage" />
          <span>Free 1-on-1 Academic & Career Consultation</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Still Not Sure Which Tech Track Aligns With Your Goals?
        </h2>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
          Schedule a 15-minute consultation with our senior engineering faculty. We'll assess your current background, walk through syllabi, and map out your roadmap.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Button
            variant="secondary"
            size="lg"
            onClick={onOpenAdvisor}
            leftIcon={<MessageSquareCode className="w-4 h-4 text-navy" />}
          >
            Talk to an Academic Advisor
          </Button>

          <a
            href="tel:+9779800000000"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors focus-visible:ring-2 focus-visible:ring-white"
          >
            <Phone className="w-4 h-4 text-sage" />
            <span>Call Admissions Desk</span>
          </a>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-light" />
            <span>Kathmandu Campus & Live Online Hybrid</span>
          </div>
          <span>•</span>
          <div>Next Batch Orientation Starting Next Week</div>
          <span>•</span>
          <div>Zero Obligation Consultation</div>
        </div>
      </div>
      </DarkCTACard>
    </section>
  );
};
