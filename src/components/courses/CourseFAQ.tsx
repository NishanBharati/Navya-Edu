import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';

interface CourseFAQProps {
  faqs: FAQItem[];
}

export const CourseFAQ: React.FC<CourseFAQProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAFAF8] border-b border-[#EFECE5]">
      <Container>
        <SectionHeader
          eyebrow="Questions & Clarity"
          title="Frequently Asked Questions"
          description="Clear, factual answers regarding course structure, laboratory access, and enrollment requirements."
        />

        <div className="mt-10 max-w-3xl space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E8E4DA] rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAF8] transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-[#171A1F]">
                    {faq.question}
                  </span>
                  <div className="shrink-0 p-1 rounded text-[#5F6670] bg-[#F4F1EA]">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#17324D]' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-[#F0ECE1] text-xs sm:text-sm text-[#5F6670] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
