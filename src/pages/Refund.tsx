import React from 'react';
import { RotateCcw, AlertTriangle, CheckCircle2, FileText, Calendar, ArrowRight, Mail, HelpCircle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { Button } from '../components/common/Button';

export const Refund: React.FC = () => {
  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper">
      <SEOHead
        title="Refund & Cancellation Policy | Navya Ed Tech Nepal"
        description="Understand Navya Ed Tech's transparent refund, withdrawal, and cohort transfer policies for live online IT training courses."
        structuredData={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Refund & Cancellation Policy', path: '/refund' },
        ])}
      />

      <Container>
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Refund & Cancellation' }]} />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Admissions & Tuition Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            We believe in honest, transparent educational relationships. Because our live online cohorts are capped at 12–16 learners, this policy outlines the exact conditions for tuition refunds, cohort transfers, and withdrawal timelines.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Applicable to all Course Enrollees & Sponsoring Organizations</span>
          </div>
        </div>

        {/* Legal Review Callout */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-ink-soft flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-semibold text-ink flex items-center gap-2">
              <span>[LEGAL REVIEW NEEDED: Consumer Protection & Fee Statutory Review]</span>
            </strong>
            <p className="text-xs leading-relaxed text-ink-soft">
              This refund framework reflects institutional administrative guidelines for private IT training cohorts in Nepal. Formal statutory refund guarantees, banking deduction ceilings, and binding consumer dispute procedures require review by a licensed attorney under Nepal's Consumer Protection Act, 2075 (2018).
            </p>
          </div>
        </div>

        {/* Highlight Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-navy/10 text-navy flex items-center justify-center mb-3">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Pre-Commencement Notice</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Eligible for a refund minus a nominal administrative processing deduction if requested before batch start.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-3">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Emergency Batch Transfer</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Medical or personal emergencies qualify for a one-time transfer to an upcoming cohort within 6 months.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-sage/20 text-sage-ink flex items-center justify-center mb-3">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">100% Institute Guarantee</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              If Navya cancels or postpones a scheduled batch beyond 14 days, you receive a prompt 100% full refund.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1: Pre-Commencement */}
            <section id="section-pre-commencement" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Withdrawal Prior to Batch Commencement</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Because places in each live online cohort are strictly capped (12–16 learners) and reserved upon payment, cancellations impact batch planning:
              </p>
              
              <div className="space-y-3 pt-1">
                <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                    <span>Cancellation 7 or More Calendar Days Prior to Batch Start:</span>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    Full tuition refunded minus a 10% administrative reservation charge (or NPR 2,500, whichever is lower [PLACEHOLDER: Fee ceiling subject to official finance policy]).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Cancellation Within 3 to 6 Calendar Days Prior to Batch Start:</span>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    50% of the tuition fee paid is refunded, or the student may elect to transfer 100% of the balance toward the next scheduled cohort intake without penalty.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Cancellation Less than 48 Hours Before Batch Start:</span>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    Tuition fees are non-refundable as instructors, online software environments, and curriculum materials have been committed.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2: Post-Commencement */}
            <section id="section-post-commencement" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>Post-Commencement Policy (Classes Underway)</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Once cohort instruction, code repository invitations, and live class attendance begin, <strong>tuition fees are strictly non-refundable</strong>.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">
                Rationale: Unlike passive video platforms, Navya Ed Tech operates live, instructor-led cohorts with small-group code reviews. When a student leaves mid-course, that place cannot be filled by a new student due to foundational syllabus progression.
              </p>
            </section>

            {/* Section 3: Cohort Transfer Policy */}
            <section id="section-transfers" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Cohort Batch Transfer Guidelines</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                We understand that genuine life emergencies happen. Rather than forfeiting your educational investment, enrolled students may request a batch transfer under the following conditions:
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Qualifying Reasons:</strong> Verifiable medical emergency, documented immediate family circumstance, academic university exam clash, or employer relocation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Transfer Window:</strong> You may resume in an upcoming scheduled cohort within <strong>6 months</strong> of the original start date, subject to cohort availability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>One-Time Privilege:</strong> Each student is eligible for one penalty-free cohort transfer per course registration.</span>
                </li>
              </ul>
            </section>

            {/* Section 4: Institute-Initiated Changes */}
            <section id="section-institute-changes" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">4</span>
                <span>Institute-Initiated Cancellations or Rescheduling</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                In rare events where Navya Ed Tech must cancel a scheduled course cohort due to instructor unavailability, facility maintenance, or force majeure:
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Option A (Full Refund):</strong> 100% of all tuition fees paid will be refunded directly to your original bank account with zero deductions within 7 business days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Option B (Priority Place):</strong> Instant priority reservation in the rescheduled batch or an alternate track with an enrollment credit.</span>
                </li>
              </ul>
            </section>

            {/* Section 5: Claim Process */}
            <section id="section-claim-process" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">5</span>
                <span>How to Submit a Refund or Transfer Request</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                To initiate a formal request, follow these simple steps:
              </p>
              <ol className="space-y-3 text-xs sm:text-sm text-ink-soft list-decimal list-inside leading-relaxed">
                <li>
                  Send an email to <strong>info@navyaedtech.com</strong> with the subject line <code>Refund Request - [Your Full Name] - [Course Name]</code>.
                </li>
                <li>
                  Attach your official stamped payment receipt or bank deposit confirmation voucher.
                </li>
                <li>
                  State your reason for withdrawal or specify your desired upcoming cohort intake for transfer.
                </li>
                <li>
                  Our admissions office will review and confirm eligibility within 2 business days. Approved refunds are disbursed via official bank transfer (ConnectIPS / Account Payee) within 7–10 business days.
                </li>
              </ol>
            </section>

            {/* Section 6 - Legal Review Marker */}
            <section id="section-legal-review" className="bg-paper-alt rounded-2xl p-6 sm:p-8 border border-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span>[LEGAL REVIEW NEEDED: Statutory Consumer Protection Provisions]</span>
              </div>
              <h3 className="text-base font-bold text-ink">
                6. Statutory Compliance & Commercial Law Alignment
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                <em>
                  [LEGAL REVIEW NEEDED: Retained legal counsel should verify this refund schedule against the Consumer Protection Act, 2075 of Nepal to confirm statutory cooling-off provisions, banking fee deduction limits, and consumer grievance forum clauses.]
                </em>
              </p>
            </section>
          </div>

          {/* Sticky Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Quick Navigation Card */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                  <FileText className="w-4 h-4 text-blue" />
                  <span>Refund Policy Outline</span>
                </div>
                <nav className="space-y-1.5 text-xs">
                  {[
                    { id: 'section-pre-commencement', label: '1. Prior to Batch Start' },
                    { id: 'section-post-commencement', label: '2. Post-Commencement Policy' },
                    { id: 'section-transfers', label: '3. Cohort Batch Transfers' },
                    { id: 'section-institute-changes', label: '4. Institute Cancellations' },
                    { id: 'section-claim-process', label: '5. Submission Process' },
                    { id: 'section-legal-review', label: '6. Statutory Review [LEGAL REVIEW]' },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1.5 px-2 rounded-lg text-ink-soft hover:text-navy hover:bg-paper-alt transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Admissions Advisory Desk */}
              <div className="p-6 rounded-2xl bg-navy text-white space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-mist">
                  Admissions Office
                </span>
                <h4 className="text-base font-bold text-white">
                  Need Help with an Enrollment?
                </h4>
                <p className="text-xs text-mist leading-relaxed">
                  Our counseling desk can help clarify batch start dates, cohort availability, or payment schedules before you commit.
                </p>
                <div className="pt-1 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-navy-mist">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>info@navyaedtech.com</span>
                  </div>
                  <div className="text-xs text-navy-mist">
                    Live Online • Navya Ed Tech
                  </div>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <Button variant="outline-white" size="sm" href="/contact" className="w-full justify-center">
                    Contact Admissions
                  </Button>
                  <Button variant="ghost" size="sm" href="/faq" className="w-full justify-center text-white/80 hover:text-white">
                    <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                    <span>Read Student FAQ</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};
