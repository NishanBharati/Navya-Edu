import React from 'react';
import { HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import type { FAQItem } from '../../types';
import { FAQAccordion } from '../common/FAQAccordion';

const KIDS_FAQS: FAQItem[] = [
  {
    question: 'Does my child need any prior coding or computer experience to join?',
    answer: 'No prior experience is necessary! Scratch Beginner starts from first principles using intuitive, colorful drag-and-drop code blocks. Kids learn how computers think, sequence commands, and solve problems without frustrating syntax errors.'
  },
  {
    question: 'What age group is this program designed for?',
    answer: 'Our Young Coders curriculum is designed for children ages 8 to 14 (Grades 4 to 9). Scratch Beginner is ideal for ages 8–11, while Scratch Advanced introduces arcade physics and velocity math for ages 11–14.'
  },
  {
    question: 'How do you ensure a safe and supportive learning environment?',
    answer: 'Classes are small, live online sessions with a strictly enforced 1:8 instructor-to-student ratio, and parents are welcome to sit in from home. Instructors are patient, friendly software educators focused on positive encouragement.'
  },
  {
    question: 'How does learning Scratch prepare my child for future programming like Python?',
    answer: 'Scratch teaches the exact same fundamental concepts used in professional programming—loops, if-else logic, coordinate geometry, variables, and event broadcasting—without the barrier of typing typos. Graduates transition into Python with proven confidence.'
  },
  {
    question: 'What will my child actually create and take home?',
    answer: 'Every child builds and publishes 3+ real playable arcade games, animated stories, and interactive simulations in their personal Scratch cloud account, and receives a verified Certificate of Achievement.'
  }
];

export const KidsFAQAccordion: React.FC = () => {
  return (
    <section className="mb-16 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
      <div className="max-w-3xl mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
          <Sparkles className="w-4 h-4" />
          <span>Parent & Family FAQs</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Common Questions from Parents
        </h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          Everything you need to know about our safe live online classes, age guidelines, and creative learning outcomes for kids.
        </p>
      </div>

      <FAQAccordion items={KIDS_FAQS} />

      <div className="pt-6 mt-6 border-t border-border-faint text-center">
        <a
          href="/faq"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue hover:text-navy transition-colors"
        >
          <span>Have more questions about schedules or batch options? See all FAQs</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
