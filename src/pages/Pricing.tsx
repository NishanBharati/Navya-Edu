import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CreditCard,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  Building2,
  FileText,
  AlertCircle
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { COURSES } from '../data/courses';
import { PROGRAMS } from '../data/programs';

interface PricingItem {
  id: string;
  name: string;
  slug: string;
  type: 'course' | 'program';
  category: string;
  duration: string;
  format: string;
  startingPrice: string;
  isPlaceholder: boolean;
  installments: string;
  installmentDetails: string;
  level?: string;
  highlight: string;
}

const PRICING_COURSES: PricingItem[] = [
  {
    id: 'python-beginner',
    name: 'Python Beginner',
    slug: 'python-beginner',
    type: 'course',
    category: 'Programming',
    duration: '40 Days',
    format: 'Classroom / Putalisadak & Live Online',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at Day 20 milestone',
    level: 'Beginner',
    highlight: 'Zero coding background required. Core syntax, logic, CLI tools & GitHub.',
  },
  {
    id: 'python-advance',
    name: 'Python Advance',
    slug: 'python-advance',
    type: 'course',
    category: 'Programming',
    duration: '40 Days',
    format: 'Classroom / Putalisadak & Live Online',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at Day 20 milestone',
    level: 'Intermediate',
    highlight: 'AsyncIO concurrency, OOP architecture, FastAPI microservices & SQLAlchemy.',
  },
  {
    id: 'web-development',
    name: 'Web Development',
    slug: 'web-development',
    type: 'course',
    category: 'Web Development',
    duration: '45 Days',
    format: 'Classroom / Putalisadak & Live Online',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at Day 22 milestone',
    level: 'Beginner to Intermediate',
    highlight: 'Semantic HTML5, modern Tailwind CSS, JavaScript ES6+, DOM & 3 live capstones.',
  },
  {
    id: 'data-science',
    name: 'Data Science',
    slug: 'data-science',
    type: 'course',
    category: 'Data & AI',
    duration: '50 Days',
    format: 'Classroom / Putalisadak & Live Online',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at Day 25 milestone',
    level: 'Intermediate',
    highlight: 'NumPy, Pandas data wrangling, SQL analytics, Scikit-Learn machine learning.',
  },
  {
    id: 'scratch-beginner',
    name: 'Scratch Beginner',
    slug: 'scratch-beginner',
    type: 'course',
    category: 'Young Coders',
    duration: '30 Days',
    format: 'Classroom / Putalisadak & Live Online',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at Day 15 milestone',
    level: 'Kids & School',
    highlight: 'Visual block-based logic, coordinate geometry, animated stories & basic games.',
  },
  {
    id: 'scratch-advanced',
    name: 'Scratch Advanced',
    slug: 'scratch-advanced',
    type: 'course',
    category: 'Young Coders',
    duration: '30 Days',
    format: 'Classroom / Putalisadak & Live Online',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at Day 15 milestone',
    level: 'Kids & School',
    highlight: '2D arcade physics, jump velocity, clone management & multi-level game design.',
  },
];

const PRICING_PROGRAMS: PricingItem[] = [
  {
    id: 'web-development-career-track',
    name: 'Modern Web Development Career Track',
    slug: 'web-development-career-track',
    type: 'program',
    category: 'Career Track',
    duration: '45 Days (7.5 Weeks)',
    format: 'Classroom Lab & Mentored Sprints',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% at mid-track milestone',
    highlight: 'End-to-end frontend craftsmanship, REST APIs, Git branching, Vercel deployments.',
  },
  {
    id: 'python-software-engineering',
    name: 'Python Software Engineering Track',
    slug: 'python-software-engineering',
    type: 'program',
    category: 'Specialized Track',
    duration: '80 Days (~3 Months)',
    format: 'Classroom & Hands-On Coding Lab',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (3 Milestones)',
    installmentDetails: '40% upon registration, 30% Month 1, 30% Month 2',
    highlight: 'Full Python spectrum: Python Beginner + Python Advance with FastAPI microservices.',
  },
  {
    id: 'python-data-science-program',
    name: 'Python & Applied Data Science Program',
    slug: 'python-data-science-program',
    type: 'program',
    category: 'Career Track',
    duration: '90 Days (~3 Months)',
    format: 'Classroom Immersion / Lab',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (3 Milestones)',
    installmentDetails: '40% upon registration, 30% Month 1, 30% Month 2',
    highlight: '3-tier pathway: Python foundations + Advanced asynchronous backend + ML pipelines.',
  },
  {
    id: 'young-coders-stem-track',
    name: 'Young Coders & STEM Foundation Pathway',
    slug: 'young-coders-stem-track',
    type: 'program',
    category: 'Kids Program',
    duration: '60 Days (2 Months)',
    format: 'Interactive Lab & Sprints',
    startingPrice: 'Contact for pricing',
    isPlaceholder: true,
    installments: 'Available (2 Milestones)',
    installmentDetails: '50% upon registration, 50% Month 1 milestone',
    highlight: 'Complete 2-stage game engineering curriculum: Scratch Beginner + Scratch Advanced.',
  },
];

export const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'programs'>('all');

  const displayedItems = activeTab === 'all'
    ? [...PRICING_COURSES, ...PRICING_PROGRAMS]
    : activeTab === 'courses'
    ? PRICING_COURSES
    : PRICING_PROGRAMS;

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Course Pricing & Tuition Fees (NPR) | Navya Ed Tech Nepal"
        description="Transparent IT course tuition fees quoted in Nepalese Rupees (NPR). Review pricing for Web Development, Python, Data Science, and Scratch with flexible milestone installment plans."
        keywords="IT course price Nepal, Python course fee Kathmandu, web development training cost NPR, data science training fee Nepal, installment computer training Putalisadak"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Pricing & Tuition', path: '/pricing' },
          ]),
        ]}
      />

      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Pricing & Tuition' }]} />
        </div>

        {/* Header Banner */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transparent Nepalese Tuition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Transparent Fees in Nepalese Rupees
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Official counseling desk. All fees transparent in NPR. Flexible 2–3 milestone installment options available across all multi-month and advanced tracks.
          </p>

          {/* Key Guarantee Badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-medium text-ink-soft">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-alt border border-border">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
              <span>Zero Hidden Lab Charges</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-alt border border-border">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
              <span>2–3 Milestone Installment Plans</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-alt border border-border">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
              <span>Official Tax Invoices (PAN/VAT)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-alt border border-border">
              <CheckCircle2 className="w-3.5 h-3.5 text-sage" />
              <span>Hybrid In-Person & Online</span>
            </span>
          </div>
        </div>

        {/* Notice on Pricing Availability */}
        <div className="max-w-4xl mx-auto mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950">
              Fee Schedule Update in Progress
            </p>
            <p className="text-amber-800 text-xs leading-relaxed">
              Specific NPR numbers are being calibrated for the upcoming admissions cohort. Rows marked with <span className="inline-block px-1.5 py-0.5 rounded bg-amber-200/80 font-mono text-[11px] font-bold text-amber-900">[PLACEHOLDER] Contact for pricing</span> will be updated with exact figures once confirmed by the administration. You can contact our admissions desk today for the current cohort fee voucher and early-seat incentives.
            </p>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-ink-soft border border-border hover:bg-paper-alt'
            }`}
          >
            All Tracks ({PRICING_COURSES.length + PRICING_PROGRAMS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-ink-soft border border-border hover:bg-paper-alt'
            }`}
          >
            Individual Courses ({PRICING_COURSES.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('programs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'programs'
                ? 'bg-navy text-white shadow-xs'
                : 'bg-white text-ink-soft border border-border hover:bg-paper-alt'
            }`}
          >
            Career Programs ({PRICING_PROGRAMS.length})
          </button>
        </div>

        {/* Pricing Table (Desktop) */}
        <div className="hidden lg:block max-w-6xl mx-auto bg-white rounded-3xl border border-border shadow-xs overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-paper-alt border-b border-border text-[11px] font-bold uppercase tracking-wider text-ink-soft">
                  <th className="py-4 px-6">Course / Track</th>
                  <th className="py-4 px-4">Duration</th>
                  <th className="py-4 px-4">Format</th>
                  <th className="py-4 px-4">Starting Price (NPR)</th>
                  <th className="py-4 px-4">Installment Option</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-faint text-sm">
                {displayedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-paper-alt/50 transition-colors">
                    {/* Name & Highlight */}
                    <td className="py-5 px-6 max-w-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Link
                            to={item.type === 'course' ? `/courses/${item.slug}` : `/programs`}
                            className="font-bold text-ink hover:text-blue transition-colors text-base"
                          >
                            {item.name}
                          </Link>
                          {item.type === 'program' && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                              Career Track
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ink-soft line-clamp-2 leading-relaxed">
                          {item.highlight}
                        </p>
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="py-5 px-4 whitespace-nowrap text-ink-soft text-xs font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-ink-faint" />
                        <span>{item.duration}</span>
                      </div>
                    </td>

                    {/* Format */}
                    <td className="py-5 px-4 text-xs text-ink-soft">
                      <span className="inline-block px-2 py-1 rounded-md bg-paper-alt border border-border text-[11px] font-medium">
                        {item.format}
                      </span>
                    </td>

                    {/* Price with clear placeholder badge */}
                    <td className="py-5 px-4 whitespace-nowrap">
                      {item.isPlaceholder ? (
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 font-medium text-xs">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">[PLACEHOLDER]</span>
                            <span>{item.startingPrice}</span>
                          </span>
                          <span className="block text-[10px] text-ink-faint">Inquire for current intake fee</span>
                        </div>
                      ) : (
                        <span className="font-extrabold text-navy text-base">
                          {item.startingPrice}
                        </span>
                      )}
                    </td>

                    {/* Installments */}
                    <td className="py-5 px-4 text-xs text-ink-soft max-w-[200px]">
                      <span className="font-semibold text-ink block mb-0.5">
                        {item.installments}
                      </span>
                      <span className="text-[11px] text-ink-faint leading-normal block">
                        {item.installmentDetails}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-5 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          href={`/apply?track=${item.slug}`}
                          className="text-xs"
                        >
                          Enroll Now
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Cards (Mobile & Tablet) */}
        <div className="lg:hidden space-y-4 mb-12">
          {displayedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-border p-5 shadow-2xs space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue">
                      {item.category}
                    </span>
                    {item.type === 'program' && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        Career Program
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-ink leading-snug">
                    <Link
                      to={item.type === 'course' ? `/courses/${item.slug}` : `/programs`}
                      className="hover:text-blue transition-colors"
                    >
                      {item.name}
                    </Link>
                  </h3>
                </div>
                <span className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md bg-paper-alt text-ink-soft border border-border">
                  {item.duration}
                </span>
              </div>

              <p className="text-xs text-ink-soft leading-relaxed">
                {item.highlight}
              </p>

              <div className="pt-2 pb-2 border-t border-b border-border-faint space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-ink-faint">Learning Format:</span>
                  <span className="font-medium text-ink">{item.format}</span>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink-faint">Starting Price:</span>
                  <div className="text-right">
                    {item.isPlaceholder ? (
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200 font-medium text-xs">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-700 mr-1">[PLACEHOLDER]</span>
                        {item.startingPrice}
                      </span>
                    ) : (
                      <span className="font-extrabold text-navy">{item.startingPrice}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-ink-faint">Installments:</span>
                  <span className="font-semibold text-ink text-right text-xs">
                    {item.installments}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <Link
                  to={item.type === 'course' ? `/courses/${item.slug}` : `/programs`}
                  className="text-xs font-semibold text-blue hover:text-navy"
                >
                  View Curriculum →
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  href={`/apply?track=${item.slug}`}
                  className="text-xs"
                >
                  Enroll Now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Fee Policy & Installment Framework */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ink">Milestone Installments</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              We never demand 100% upfront payment. Short courses are split into 2 milestones (50% registration deposit + 50% at midpoint). Comprehensive career programs offer 3 monthly milestone splits.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sage/15 text-sage flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ink">Institutional Tax Invoices</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Every tuition payment receives an official PAN/VAT invoice and stamped voucher from Navya Ed Tech Pvt. Ltd. Payments can be processed via ConnectIPS, Fonepay, Bank Transfer, or Putalisadak desk.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ink">Fair Refund & Batch Transfers</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Withdrawal requests prior to batch commencement are eligible for refunds under our fair refund policy. In case of verified personal or academic emergencies, cohort transfers are facilitated.
            </p>
            <Link to="/refund" className="inline-flex items-center gap-1 text-xs font-semibold text-blue hover:text-navy">
              <span>Read Refund Policy</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Next Step / Ready to Commit CTA */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-navy text-white p-8 sm:p-12 shadow-lg text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#A8C6E5]">
            Ready to Accelerate Your Career?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white max-w-xl mx-auto">
            Reserve Your Lab Seat for the Next Cohort
          </h2>
          <p className="text-xs sm:text-sm text-mist max-w-lg mx-auto leading-relaxed">
            Batch sizes are capped strictly at 12–16 students to ensure direct mentor access and line-by-line pull request code reviews. Complete the enrollment application to claim your seat.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              href="/apply"
              className="w-full sm:w-auto bg-white text-navy hover:bg-paper font-bold justify-center"
            >
              Start Enrollment Application
            </Button>
            <Button
              variant="outline-white"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto justify-center"
            >
              Consult Admissions Desk
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
};
