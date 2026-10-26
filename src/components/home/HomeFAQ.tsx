import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, HelpCircle, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Container } from '../common/Container';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { EASING } from '../../lib/motion';

interface FAQEntry {
  question: string;
  answer: string;
  category: string;
  highlight?: string;
  link?: {
    label: string;
    href: string;
  };
}

export const HOMEPAGE_FAQS: FAQEntry[] = [
  {
    category: 'Admissions & Enrollment',
    question: 'How do I enroll in a course, and can I attend a free demo class first?',
    answer:
      'You can apply directly online by browsing our Courses catalog and clicking "Inquire" or "Talk to an Advisor". We host free introductory demo sessions and diagnostic syllabus consultations for upcoming batches. This lets prospective students inspect our physical laboratory in Kathmandu, review the curriculum, and interact directly with instructors before committing to tuition.',
    highlight: 'Free diagnostic consultation & syllabus review before tuition',
    link: { label: 'Explore Course Catalog', href: '/courses' },
  },
  {
    category: 'Learning Mode & Lab',
    question: 'Are classes held in-person in Kathmandu or online?',
    answer:
      'We offer both formats: (1) In-Person Laboratory Sessions at our Putalisadak Kathmandu Innovation Lab with dual-monitor developer desks, gigabit fiber, and direct 1-on-1 mentor guidance, and (2) Interactive Live Online Cohorts with real-time code-along sessions and recorded archives for students outside Kathmandu or working professionals.',
    highlight: 'Physical Putalisadak lab desks + Live interactive online options',
  },
  {
    category: 'Class Size & Mentorship',
    question: 'What is the typical batch size and instructor attention ratio?',
    answer:
      'To guarantee rigorous line-by-line pull request reviews and personal debugging attention during daily coding sprints, we cap batch sizes strictly at 12 to 16 students per cohort. Seats are reserved on a confirmed registration basis.',
    highlight: 'Strictly capped at 12–16 students per cohort for code review quality',
  },
  {
    category: 'Prerequisites & Background',
    question: 'Do I need a Computer Science (CS/IT) degree to join?',
    answer:
      'No. Our foundational courses—including Web Development (45 Days) and Python Foundations (40 Days)—start from first principles with zero prior coding required. The curriculum is tailored for career transitioners from non-CS backgrounds—including business, engineering, and humanities—building technical fluency through deliberate hands-on practice.',
    highlight: 'No prior computer science degree required for foundation tracks',
    link: { label: 'View Beginner Tracks', href: '/courses?level=Beginner' },
  },
  {
    category: 'Tuition & Payment Options',
    question: 'How much are course fees, and are installment payment plans available?',
    answer:
      'All course fees are quoted transparently in Nepali Rupees (NPR) with zero hidden lab surcharges or registration fees. For multi-month comprehensive programs, we provide structured 2-to-3 part installment schedules: an initial registration deposit, with subsequent payments aligned with mid-course milestones.',
    highlight: 'Transparent NPR pricing with flexible milestone installments',
    link: { label: 'View Terms & Fee Policy', href: '/terms' },
  },
  {
    category: 'Certification & Capstone',
    question: 'How do I earn the Navya Ed Tech Certificate of Completion?',
    answer:
      'Certificates are awarded based on verified competence, not passive attendance. Students must maintain at least 80% attendance, complete laboratory sprint assignments, and deploy and defend an approved Capstone Project before a panel of senior software engineers. Every certificate carries a verifiable digital ID.',
    highlight: 'Verifiable certificate issued upon successful capstone defense',
  },
  {
    category: 'Career Support & Placement',
    question: 'Do you offer 100% job placement guarantees?',
    answer:
      'As an ethical engineering institution in our inaugural year, we reject deceptive "100% job placement guarantee" claims. Real employment depends on individual problem-solving capability, communication, and demonstrable proof-of-work. We provide genuine, rigorous career preparation: live project building, GitHub portfolio polishing, technical mock interviews, and direct referral opportunities through Navya EdTech\'s software engineering network.',
    highlight: 'Transparent engineering preparation over deceptive placement guarantees',
    link: { label: 'Inspect Reference Capstones', href: '/student-work' },
  },
  {
    category: 'Student Code Ownership',
    question: 'Who owns the intellectual property of projects built during classes?',
    answer:
      'You do! Students retain 100% ownership, copyright, and intellectual property rights over all application source code, designs, and repositories created during the course. We encourage students to open-source their capstones on personal GitHub accounts and feature them on their resumes.',
    highlight: '100% student ownership of all code and project repositories',
  },
];

interface HomeFAQProps {
  onOpenAdvisor?: () => void;
}

export const HomeFAQ: React.FC<HomeFAQProps> = ({ onOpenAdvisor }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-16 sm:py-24 bg-paper-alt border-b border-border">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Context & Support Card */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeader
              eyebrow="Clear & Transparent Information"
              title="Frequently Asked Questions"
              description="Everything prospective learners and working professionals need to know about our syllabi, Kathmandu lab sessions, tuition terms, and graduation standards."
            />

            {/* Direct Counseling Callout */}
            <div className="p-6 bg-white rounded-2xl border border-border-warm space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
                <HelpCircle className="w-4 h-4 text-blue" />
                <span>Have a specific question about your background?</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Our academic counseling desk can evaluate your current technical background, suggest the best starting track, and arrange a campus visit at our Kathmandu lab.
              </p>

              <div className="pt-2 border-t border-border-faint flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {onOpenAdvisor ? (
                  <button
                    type="button"
                    onClick={onOpenAdvisor}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep active:scale-[0.98] transition-all cursor-pointer shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-navy-mist" />
                    <span>Talk to an Academic Advisor</span>
                  </button>
                ) : (
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-deep active:scale-[0.98] transition-all shadow-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-navy-mist" />
                    <span>Inquire with Admissions</span>
                  </Link>
                )}

                <Link
                  to="/faq"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-ink-soft hover:text-navy transition-colors"
                >
                  <span>View All 16 FAQs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {HOMEPAGE_FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              const itemId = `home-faq-${index}`;
              const buttonId = `home-faq-trigger-${index}`;

              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-navy/40 shadow-sm ring-1 ring-navy/10'
                      : 'border-border hover:border-border-warm'
                  }`}
                >
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={itemId}
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-2xl"
                  >
                    <div className="space-y-1 pr-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue">
                        {faq.category}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-ink leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen
                          ? 'bg-navy text-white rotate-180'
                          : 'bg-paper text-ink-soft'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={itemId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: EASING }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-1 space-y-3 border-t border-border-faint text-ink-soft text-xs sm:text-sm leading-relaxed">
                          <p>{faq.answer}</p>

                          {faq.highlight && (
                            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-paper-alt border border-border-soft text-ink text-xs font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-sage shrink-0 mt-0.5" />
                              <span>{faq.highlight}</span>
                            </div>
                          )}

                          {faq.link && (
                            <div className="pt-1">
                              <Link
                                to={faq.link.href}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-blue transition-colors"
                              >
                                <span>{faq.link.label}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
