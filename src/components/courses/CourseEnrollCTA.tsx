import React from 'react';
import { MessageSquare, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

interface CourseEnrollCTAProps {
  course: Course;
  onOpenAdvisor: () => void;
}

export const CourseEnrollCTA: React.FC<CourseEnrollCTAProps> = ({
  course,
  onOpenAdvisor
}) => {
  return (
    <section className="py-16 sm:py-20 bg-[#F4F1EA]">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-[#E5DFD4] shadow-sm text-center space-y-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#356A9A]">
            Next Step
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#171A1F]">
            Ready to explore {course.title}?
          </h2>

          <p className="text-sm sm:text-base text-[#5F6670] max-w-2xl mx-auto leading-relaxed">
            Speak with the Navya Ed Tech academic team about upcoming batches, laboratory schedules, and admission criteria. We'll help you verify whether this syllabus matches your career objectives.
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
              Contact Admissions Desk
            </Button>
          </div>

          <div className="pt-6 border-t border-[#F0ECE1] flex items-center justify-center gap-2 text-xs text-[#5F6670]">
            <ShieldCheck className="w-4 h-4 text-[#718C7A]" />
            <span>No upfront online payments required. Transparent syllabus and admissions consultation.</span>
          </div>
        </div>
      </Container>
    </section>
  );
};
