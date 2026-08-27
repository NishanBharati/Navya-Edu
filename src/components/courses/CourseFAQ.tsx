import React from 'react';
import { FAQItem } from '../../types';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { FAQAccordion } from '../common/FAQAccordion';

interface CourseFAQProps {
  faqs: FAQItem[];
}

export const CourseFAQ: React.FC<CourseFAQProps> = ({ faqs }) => {
  return (
    <section className="py-16 sm:py-24 bg-paper border-b border-border-soft">
      <Container>
        <SectionHeader
          eyebrow="Questions & Clarity"
          title="Frequently Asked Questions"
          description="Clear, factual answers regarding course structure, laboratory access, and enrollment requirements."
        />

        <div className="mt-10 max-w-3xl bg-white border border-border rounded-3xl p-6 sm:p-10 shadow-xs">
          <FAQAccordion items={faqs} />
        </div>
      </Container>
    </section>
  );
};
