import React, { useState, useMemo } from 'react';
import { HelpCircle, Search, ChevronDown, MessageSquare, Phone, BookOpen, ShieldCheck, CreditCard, ArrowRight, Laptop } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { getFAQSchema, getBreadcrumbSchema } from '../utils/structuredData';
import { FAQS, FAQ_CATEGORIES, FAQCategory } from '../data/faq';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-1': true, // Keep first question expanded by default
    'faq-5': true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.categoryLabel.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper">
      <SEOHead
        title="Frequently Asked Questions (FAQ) | Navya Ed Tech Nepal"
        description="Find answers to common questions regarding IT course enrollment, installment payment options, laptop prerequisites, certificate verification, and career support at Navya Ed Tech."
        structuredData={[
          getFAQSchema(FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Frequently Asked Questions', path: '/faq' },
          ]),
        ]}
      />

      <Container>
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Frequently Asked Questions' }]} />
        </div>

        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Admissions & Student Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Everything you need to know about our practical IT training batches in Kathmandu, workstation laboratory policies, payment terms, prerequisites, and capstone certification.
          </p>

          {/* Search Box */}
          <div className="mt-8 relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-ink-faint absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              aria-label="Search frequently asked questions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., installments, laptop, certificate, demo class)..."
              className="w-full pl-11 pr-14 py-3 rounded-2xl bg-white border border-border text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search query"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-faint hover:text-ink px-2 py-1 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Filter */}
        <div
          role="tablist"
          aria-label="Filter frequently asked questions by topic"
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          <button
            type="button"
            role="tab"
            aria-selected={selectedCategory === 'all'}
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-ink-soft border border-border hover:bg-paper-alt'
            }`}
          >
            All Questions ({FAQS.length})
          </button>
          {FAQ_CATEGORIES.map((cat) => {
            const count = FAQS.filter((f) => f.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-white text-ink-soft border border-border hover:bg-paper-alt'
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List with semantic h2 for hierarchy */}
        <h2 className="sr-only">Frequently Asked Questions List</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-border">
              <HelpCircle className="w-10 h-10 text-ink-faint mx-auto mb-3" />
              <h3 className="text-base font-bold text-ink">No matching questions found</h3>
              <p className="text-xs text-ink-soft mt-1 max-w-sm mx-auto">
                Couldn't find what you're looking for? Reach out to our admissions desk directly for personalized counseling.
              </p>
              <div className="mt-5">
                <Button variant="primary" size="sm" href="/contact">
                  Ask Admissions Counselor
                </Button>
              </div>
            </div>
          ) : (
            filteredFaqs.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-border overflow-hidden shadow-2xs transition-all hover:border-navy/20"
                >
                  <button
                    id={`faq-trigger-${item.id}`}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-2xl cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue">
                        {item.categoryLabel}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">
                        {item.question}
                      </h3>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full bg-paper-alt flex items-center justify-center shrink-0 text-ink-soft transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-navy/10 text-navy' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 border-t border-border-faint text-xs sm:text-sm text-ink-soft leading-relaxed space-y-3"
                    >
                      <p className="pt-3">{item.answer}</p>
                      {item.link && (
                        <div className="pt-1">
                          <Link
                            to={item.link.href}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue hover:text-navy transition-colors"
                          >
                            <span>{item.link.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-16 max-w-3xl mx-auto rounded-3xl bg-navy text-white p-8 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-mist">
                Personalized Advisory
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                Have questions about your specific career path?
              </h3>
              <p className="text-xs sm:text-sm text-mist max-w-md leading-relaxed">
                Speak directly with an instructor or admissions counselor in Kathmandu. We will assess your background, recommend the ideal course track, and explain upcoming batch dates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                href="/contact"
                className="justify-center bg-white text-navy hover:bg-paper font-bold"
              >
                Contact Admissions
              </Button>
              <Button
                variant="outline-white"
                size="md"
                href="/contact?intent=demo"
                className="justify-center text-xs"
              >
                Book Free Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Reference Policy Links */}
        <div className="mt-12 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <Link
            to="/terms"
            className="p-4 rounded-xl bg-white border border-border hover:border-navy/30 transition-all text-xs text-ink-soft hover:text-navy flex flex-col items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-blue" />
            <span className="font-semibold text-ink">Terms of Service</span>
            <span className="text-[11px] text-ink-faint">Admissions & lab ethics</span>
          </Link>
          <Link
            to="/privacy"
            className="p-4 rounded-xl bg-white border border-border hover:border-navy/30 transition-all text-xs text-ink-soft hover:text-navy flex flex-col items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-sage" />
            <span className="font-semibold text-ink">Privacy Policy</span>
            <span className="text-[11px] text-ink-faint">Data handling & cookies</span>
          </Link>
          <Link
            to="/refund"
            className="p-4 rounded-xl bg-white border border-border hover:border-navy/30 transition-all text-xs text-ink-soft hover:text-navy flex flex-col items-center gap-1.5"
          >
            <CreditCard className="w-4 h-4 text-amber-600" />
            <span className="font-semibold text-ink">Refund Policy</span>
            <span className="text-[11px] text-ink-faint">Withdrawal & transfers</span>
          </Link>
        </div>
      </Container>
    </main>
  );
};
