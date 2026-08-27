import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../types';

export interface FAQAccordionProps {
  items: FAQItem[];
  defaultOpenIndex?: number | null;
  className?: string;
}

/**
 * Single shared FAQ accordion used everywhere the site needs one
 * (per-course FAQs, the course catalog, About, Contact). Every caller
 * used to hand-roll its own version of this with slightly different
 * markup, typing, and answer-reveal animation — this is the one
 * canonical implementation, driven by the shared `FAQItem` type.
 */
export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`divide-y divide-border-soft ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="py-4">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-ink hover:text-navy transition-colors py-1"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-ink-faint shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-navy' : ''
                }`}
              />
            </button>

            {isOpen && (
              <p className="mt-2.5 text-xs sm:text-sm text-ink-soft leading-relaxed pr-6 animate-fade-in">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};
