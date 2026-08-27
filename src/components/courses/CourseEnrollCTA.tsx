import React from 'react';
import { MessageSquare, ShieldCheck, Download, Calendar } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { DarkCTACard } from '../common/DarkCTACard';

interface CourseEnrollCTAProps {
  course: Course;
  onOpenAdvisor: () => void;
  onDownloadSyllabus?: () => void;
}

export const CourseEnrollCTA: React.FC<CourseEnrollCTAProps> = ({
  course,
  onOpenAdvisor,
  onDownloadSyllabus
}) => {
  return (
    <section className="py-16 sm:py-24 bg-paper">
      <Container>
        <DarkCTACard className="p-8 sm:p-12 md:p-16">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-light uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-sage" />
              <span>Admissions Open for {course.title}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Advance Your Software Engineering Career?
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Connect with our academic advisory team to discuss upcoming batch timings, laboratory infrastructure, and fee installment plans.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
              <Button
                variant="secondary"
                size="lg"
                onClick={onOpenAdvisor}
                leftIcon={<MessageSquare className="w-4 h-4 text-navy" />}
              >
                Talk to an Advisor / Reserve Seat
              </Button>

              {onDownloadSyllabus && (
                <button
                  type="button"
                  onClick={onDownloadSyllabus}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Download className="w-4 h-4 text-blue-light" />
                  <span>Download Full Syllabus PDF</span>
                </button>
              )}
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage" />
                <span>Zero Obligation Admissions Consultation</span>
              </div>
              <span>•</span>
              <div>Kathmandu Campus & Live Online</div>
              <span>•</span>
              <div>Installment Payment Options Available</div>
            </div>
          </div>
        </DarkCTACard>
      </Container>
    </section>
  );
};
