import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '../../types';
import { EASING } from '../../lib/motion';

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
  const prefersReducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`divide-y divide-border-soft ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `faq-accordion-trigger-${index}`;
        const panelId = `faq-accordion-panel-${index}`;
        return (
          <div key={index} className="py-4">
            <button
              type="button"
              id={triggerId}
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full flex items-center justify-between gap-4 text-left font-bold text-sm sm:text-base text-ink hover:text-navy transition-colors py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 rounded-md cursor-pointer"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-ink-faint shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isOpen ? 'rotate-180 text-navy' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASING }}
                  className="overflow-hidden pr-6"
                >
                  <div className="pt-2.5 pb-1 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    <p>{item.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
