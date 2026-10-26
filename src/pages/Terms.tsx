import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Scale, BookOpen, Award, Mail, AlertTriangle } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { Button } from '../components/common/Button';

export const Terms: React.FC = () => {
  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper">
      <SEOHead
        title="Terms of Service | Navya Ed Tech Nepal"
        description="Review institutional terms governing course admissions, laboratory code of conduct, intellectual property, and liability policies at Navya Ed Tech."
        structuredData={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Terms of Service', path: '/terms' },
        ])}
      />

      <Container>
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Terms of Service' }]} />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Institutional Policies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            These Terms of Service govern student admissions, computer laboratory usage, intellectual property rights, certification criteria, and platform interactions with Navya Ed Tech Pvt. Ltd. (Kathmandu, Nepal).
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Applies to All Enrolled Students & Platform Users</span>
          </div>
        </div>

        {/* Legal Review Callout */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-ink-soft flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-semibold text-ink flex items-center gap-2">
              <span>[LEGAL REVIEW NEEDED: Liability & Statutory Enforceability Notice]</span>
            </strong>
            <p className="text-xs leading-relaxed text-ink-soft">
              This document outlines educational institution rules, student conduct guidelines, and baseline policies. Specific binding clauses—including liability dollar caps, statutory consumer dispute waivers, and indemnification scopes under Nepalese commercial contract law—must undergo formal review by a licensed attorney before serving as an unappealable legal contract.
            </p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-navy/10 text-navy flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">100% Student Code IP</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Students retain full copyright and ownership of all original code, repositories, and capstone applications built during their coursework.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Merit-Based Certificates</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Certificates are awarded upon verified 80% attendance, assignment completion, and successful public Capstone Project defense.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-sage/20 text-sage-ink flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Transparent Advisory</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Honest course prerequisites, real software laboratory standards, and zero misleading "100% job guarantee" marketing claims.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section id="section-acceptance" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                By accessing this website (<a href="https://navyaedtech.com" className="text-blue hover:underline">navyaedtech.com</a>), submitting an inquiry, enrolling in any training course, attending laboratory sessions, or using our digital course repositories, you agree to be bound by these Terms of Service.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">
                If enrolling on behalf of an enterprise or sponsor, you represent that you possess authority to bind that entity to these educational terms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-admissions" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>Admissions, Enrollment & Cohort Allocation</span>
              </h2>
              <ul className="space-y-3 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Prerequisites & Diagnostic Review:</strong> Prospective enrollees must fulfill the published technical prerequisites for intermediate/advanced courses (e.g., basic programming fundamentals for Advanced Python or Data Science).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Workstation Seat Reservation:</strong> Cohort laboratory seats are capped at 12 to 16 workstations per batch to preserve individual code review quality. Registration is secured upon receipt of the enrollment deposit.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Cohort Rescheduling:</strong> Navya Ed Tech reserves the right to postpone batch commencement dates by up to 14 calendar days due to laboratory maintenance, public holidays, or unforeseen institutional factors with advance notice provided.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="section-fees" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Tuition Fees & Official Payment Methods</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                All course fees are stated in <strong>Nepalese Rupees (NPR / Rs.)</strong> and encompass live instruction, workstation access, software environment configurations, instructor code critiques, and certificate credential verification.
              </p>
              
              <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-2 text-xs text-ink-soft">
                <div className="flex items-center gap-2 font-semibold text-ink">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Verified Official Payment Channels Only</span>
                </div>
                <p>
                  To protect students from fraud, tuition fees must only be transferred through official institutional bank accounts, registered Fonepay QR merchant counters, or in-person at our Kathmandu admissions desk with an official stamped receipt voucher.
                </p>
              </div>

              <p className="text-xs text-ink-soft pt-1">
                For detailed withdrawal timelines and batch transfer terms, refer to our comprehensive <a href="/refund" className="text-blue font-semibold hover:underline">Refund and Cancellation Policy</a>.
              </p>
            </section>

            {/* Section 4 */}
            <section id="section-conduct" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">4</span>
                <span>Laboratory Code of Conduct & Academic Integrity</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Navya Ed Tech simulates a professional tech engineering work culture. All enrollees agree to the following standards:
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span><strong>Respectful Collaborative Culture:</strong> Zero tolerance for discrimination, harassment, abusive language, or disruptive conduct toward peers, mentors, or staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span><strong>Responsible Lab Hardware Use:</strong> Physical workstations, peripheral equipment, and academy network bandwidth must be used strictly for coursework and software development activities.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span><strong>No Network Tampering:</strong> Students must not execute unauthorized penetration testing, port scanning, or vulnerability exploits against academy internal systems or third-party web endpoints.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span><strong>Academic Integrity (Anti-Plagiarism):</strong> While open-source packages and documentation are encouraged, submitting another developer's capstone repository as your own constitutes grounds for immediate academic dismissal without certification.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="section-ip" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">5</span>
                <span>Intellectual Property & Capstone Ownership</span>
              </h2>
              <div className="space-y-3 text-sm text-ink-soft leading-relaxed">
                <p>
                  <strong>Course Materials & Curriculum:</strong> All syllabi, lesson slide decks, proprietary starter repositories, exercises, and instructional recordings provided by Navya Ed Tech remain the exclusive intellectual property of Navya Ed Tech Pvt. Ltd. and its parent software enterprise. Unauthorized redistribution or commercial sale is prohibited.
                </p>
                <p>
                  <strong>Student Capstones & Code Repositories:</strong> Students retain 100% intellectual property ownership and copyright over the source code, databases, design prototypes, and applications created during their enrollment. Navya Ed Tech reserves the right to showcase publicly deployed capstone projects in portfolio directories with student credit.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section-certification" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">6</span>
                <span>Evaluation & Certificate Criteria</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                To maintain industry value and employer credibility in Nepal's tech sector, certificates of completion are awarded strictly upon fulfilling:
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Minimum 80% active cohort attendance in lab coding sprints.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Timely submission of all required module assignments and lab check-ins.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Successful live deployment and architectural defense of your final Capstone Project.</span>
                </li>
              </ul>
            </section>

            {/* Section 7 - Liability Basics & Legal Review Marker */}
            <section id="section-liability" className="bg-paper-alt rounded-2xl p-6 sm:p-8 border border-border space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span>[LEGAL REVIEW NEEDED: Limitation of Liability & Warranty Disclaimers]</span>
              </div>
              <h2 className="text-lg font-bold text-ink">
                7. Limitation of Liability & Educational Disclaimers
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Navya Ed Tech provides industry-aligned professional training, code mentorship, and portfolio preparation. However, we explicitly disclaim guarantees of employment, compensation thresholds, or career promotions:
              </p>
              <div className="p-4 rounded-xl bg-white border border-border space-y-2 text-xs text-ink-soft leading-relaxed">
                <p>
                  <em>
                    [LEGAL REVIEW NEEDED: Certified legal counsel must review the enforceability of liability caps under the Consumer Protection Act of Nepal. Proposed provision: In no event shall Navya Ed Tech Pvt. Ltd., its directors, instructors, or affiliates be liable for indirect, punitive, or consequential damages arising from website downtime, course rescheduling, or third-party service outages. Maximum aggregate liability is limited to the tuition amount actually paid by the student for the relevant course.]
                  </em>
                </p>
              </div>
            </section>

            {/* Section 8 - Dispute Resolution & Legal Review Marker */}
            <section id="section-governing-law" className="bg-paper-alt rounded-2xl p-6 sm:p-8 border border-border space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span>[LEGAL REVIEW NEEDED: Jurisdiction & Dispute Settlement]</span>
              </div>
              <h2 className="text-lg font-bold text-ink">
                8. Governing Law & Jurisdiction (Nepal)
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                <em>
                  [LEGAL REVIEW NEEDED: These terms shall be governed by and construed in accordance with the substantive laws of Nepal. Any dispute, controversy, or claim arising out of or relating to these terms or the breach thereof shall first be settled through amicable conciliation; failing which it shall be submitted to the exclusive jurisdiction of the competent courts in Kathmandu, Nepal.]
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
                  <span>On This Page</span>
                </div>
                <nav className="space-y-1.5 text-xs">
                  {[
                    { id: 'section-acceptance', label: '1. Acceptance of Terms' },
                    { id: 'section-admissions', label: '2. Admissions & Cohorts' },
                    { id: 'section-fees', label: '3. Fees & Payment Methods' },
                    { id: 'section-conduct', label: '4. Lab Code of Conduct' },
                    { id: 'section-ip', label: '5. Intellectual Property (IP)' },
                    { id: 'section-certification', label: '6. Certificate Criteria' },
                    { id: 'section-liability', label: '7. Liability [LEGAL REVIEW]' },
                    { id: 'section-governing-law', label: '8. Governing Law [LEGAL REVIEW]' },
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

              {/* Admissions & Student Support Desk */}
              <div className="p-6 rounded-2xl bg-navy text-white space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-mist">
                  Student Support & Advisory
                </span>
                <h4 className="text-base font-bold text-white">
                  Questions on Enrollment Policies?
                </h4>
                <p className="text-xs text-mist leading-relaxed">
                  Our admissions counselors are available to walk you through cohort options, curriculum prerequisites, and enrollment timelines.
                </p>
                <div className="pt-1 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-navy-mist">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>info@navyaedtech.com</span>
                  </div>
                  <div className="text-xs text-navy-mist">
                    Kathmandu, Nepal • Navya Ed Tech Pvt. Ltd.
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline-white" size="sm" href="/contact" className="w-full justify-center">
                    Contact Admissions Desk
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
