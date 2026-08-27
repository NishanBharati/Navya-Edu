import React from 'react';
import { HelpCircle } from 'lucide-react';
import type { FAQItem } from '../../types';
import { FAQAccordion } from '../common/FAQAccordion';

const FAQS: FAQItem[] = [
  {
    question: 'Are these courses suitable for beginners with zero programming background?',
    answer: 'Yes! While intermediate and advanced tracks have prerequisites, our beginner courses start with programming fundamentals, algorithmic thinking, and computer science basics before moving into frameworks and full-stack systems.'
  },
  {
    question: 'Can I switch between classroom in-person and live online sessions?',
    answer: 'Absolutely. All our classrooms are equipped with hybrid streaming infrastructure. If you are unable to visit our Kathmandu campus on any day, you can join the live interactive session online and access recorded lab walkthroughs.'
  },
  {
    question: 'What hardware or laptop specifications do I need?',
    answer: 'A standard laptop with at least 8GB RAM (16GB recommended for Data/AI & DevOps), an Intel i5/Ryzen 5 or Apple M-series processor, and 50GB of free SSD storage is sufficient for all course practical labs.'
  },
  {
    question: 'Do you offer installment payment options and scholarships?',
    answer: 'Yes. We offer flexible installment plans (2 to 3 milestone-based payments). Merit-based and need-based tuition waivers are also available upon evaluation of entrance aptitude exercises.'
  },
  {
    question: 'How does Navya assist with job placements and internships in Nepal?',
    answer: 'Upon successful capstone project defense and code audit, our career team provides technical resume polishing, mock system design interviews, and direct portfolio referrals to our hiring network of technology companies in Nepal and remote firms abroad.'
  },
  {
    question: 'What certificate and credentials do I receive upon graduation?',
    answer: 'You receive a verified Navya Ed Tech Certificate of Completion with a unique cryptographic verification link, an evaluated capstone defense score report, and an endorsement of your production GitHub portfolio.'
  }
];

export const CourseFAQAccordion: React.FC = () => {
  return (
    <section className="mb-16 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-xs">
      <div className="max-w-3xl mb-8 space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue">
          <HelpCircle className="w-4 h-4" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Admissions, Schedules & Learning Formats
        </h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          Everything you need to know before enrolling in a technical training track at Navya Ed Tech.
        </p>
      </div>

      <FAQAccordion items={FAQS} />
    </section>
  );
};
