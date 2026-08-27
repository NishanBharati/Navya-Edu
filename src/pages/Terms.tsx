import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, Scale, BookOpen, Award, Mail } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';

export const Terms: React.FC = () => {
  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper">
      <SEOHead
        title="Terms and Conditions | Navya Ed Tech Nepal"
        description="Review the terms and conditions for course admissions, laboratory code of conduct, certification criteria, and educational services at Navya Ed Tech."
      />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>Institutional Policies</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Welcome to Navya Ed Tech Pvt. Ltd. These Terms and Conditions govern course admissions, classroom and laboratory participation, certification requirements, and the use of our digital platforms and services.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-ink-faint">
            <span>Effective Date: August 2026</span>
            <span>•</span>
            <span>Applicable to all Students, Enrollees & Website Visitors</span>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-white border border-border shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-navy/10 text-navy flex items-center justify-center mb-3">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">100% Project Ownership</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Students retain full intellectual property rights to all original code, designs, and capstones authored during their coursework.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Merit-Based Certification</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Certificates are awarded upon successful completion of required module deliverables, code reviews, and defense evaluations.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-sage/20 text-sage-ink flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Transparent Advisory</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Clear course prerequisites, laboratory expectations, and honest career outcomes without misleading promises.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Legal Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section id="section-acceptance" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Acceptance of Terms</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                By accessing this website (<a href="https://navyaedtech.com" className="text-blue hover:underline">navyaedtech.com</a>), submitting an admissions inquiry, enrolling in any training course or career track, or using our physical or virtual laboratories, you acknowledge that you have read, understood, and agreed to be bound by these Terms and Conditions.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">
                If you are enrolling on behalf of a corporate sponsor or educational institution, you represent and warrant that you have full authorization to bind that entity to these terms.
              </p>
            </section>

            {/* Section 2 */}
            <section id="section-admissions" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>Admissions, Enrollment & Batch Allocation</span>
              </h2>
              <ul className="space-y-3 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Eligibility & Prerequisites:</strong> Prospective students must satisfy the prerequisite foundational knowledge specified in each course syllabus to ensure cohort learning pace.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Batch Seat Reservation:</strong> Enrollment is confirmed upon completion of the official registration procedure and fee agreement. Seats are allocated on a strictly first-come, first-served basis due to workstation and laboratory hardware capacity limits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Batch Rescheduling:</strong> Navya Ed Tech reserves the right to adjust batch commencement dates or instructor allocations due to laboratory maintenance, public holidays, or unforeseen institutional circumstances, with advance notice provided to enrollees.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="section-fees" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Fee Structure & Payment Policy</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                All course fees are stated in <strong>Nepalese Rupees (NPR / Rs.)</strong> and cover instructional delivery, laboratory computer access, mentorship, code critique sessions, and certification assessments.
              </p>
              
              <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-2 text-xs text-ink-soft">
                <div className="flex items-center gap-2 font-semibold text-ink">
                  <AlertCircle className="w-4 h-4 text-amber" />
                  <span>No Unverified Online Payment Gateways</span>
                </div>
                <p>
                  To prevent unauthorized transaction fraud, Navya Ed Tech processes tuition exclusively via official institutional bank transfer / QR counter deposits, official receipt vouchers, or authorized in-campus admissions desk counters.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink">Refund & Transfer Rules:</h4>
                <ul className="space-y-2 text-xs text-ink-soft list-disc list-inside leading-relaxed">
                  <li>Tuition fee refund requests submitted prior to batch commencement are subject to an administrative processing deduction.</li>
                  <li>Once cohort classes and module repository access have commenced, tuition fees are non-refundable.</li>
                  <li>In verifiable medical or personal emergencies, students may request a batch transfer to a future cohort subject to academic committee approval.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="section-code-of-conduct" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">4</span>
                <span>Laboratory Code of Conduct & Ethics</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Navya Ed Tech maintains a professional, industry-aligned engineering environment. All students and visitors agree to:
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span>Treat fellow students, instructors, mentors, and staff with mutual respect and professionalism.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span>Use laboratory workstations, networking hardware, and server resources strictly for authorized educational software engineering tasks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span>Refrain from any malicious network penetration testing, unauthorized credential scraping, or disruptive activities on the academy network.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue font-bold">•</span>
                  <span>Adhere to academic integrity standards: plagiarism of project code or submitting another person's work for capstone defense will result in immediate disqualification.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="section-intellectual-property" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">5</span>
                <span>Intellectual Property & Capstone Work</span>
              </h2>
              <div className="space-y-3 text-sm text-ink-soft leading-relaxed">
                <p>
                  <strong>Course Materials:</strong> All curriculum documents, lecture slides, proprietary code starter templates, and instructional recordings provided by Navya Ed Tech remain the exclusive intellectual property of Navya Ed Tech Pvt. Ltd. and its parent technology company. Unauthorized commercial redistribution or public sharing is prohibited.
                </p>
                <p>
                  <strong>Student Capstones & Code:</strong> Students retain 100% copyright and intellectual ownership of the software applications, databases, UI designs, and repositories they author during their training. Navya Ed Tech may showcase student work in portfolio directories, marketing highlights, or student hall-of-fame pages with appropriate attribution.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="section-certification" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">6</span>
                <span>Evaluation & Certificate Criteria</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                To maintain the high credibility of Navya Ed Tech certificates among hiring tech employers in Nepal and abroad, certificates of completion are issued strictly to students who satisfy:
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Minimum 80% active attendance in instructional and laboratory sprint sessions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Successful completion and submission of all core module assignments.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span>Satisfactory defense and deployment of the required final Capstone Project.</span>
                </li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="section-career-disclaimer" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">7</span>
                <span>Career Advisory & Placement Policy</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Navya Ed Tech provides industry mentorship, portfolio reviews, mock technical interviews, and hiring partner introductions. However, as an ethical educational institution, we do not make false guarantees of 100% job placement. Final employment offers depend upon student technical aptitude, project quality, interview performance, and individual employer requirements.
              </p>
            </section>

            {/* Section 8 */}
            <section id="section-governing-law" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">8</span>
                <span>Governing Law & Dispute Resolution</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                These Terms and Conditions are governed by and construed in accordance with the prevailing laws of <strong>Nepal</strong>. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts in Kathmandu, Nepal.
              </p>
            </section>
          </div>

          {/* Sticky Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Quick Navigation Card */}
              <div className="p-6 rounded-2xl bg-white border border-border shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy">
                  <FileText className="w-4 h-4 text-blue" />
                  <span>On This Page</span>
                </div>
                <nav className="space-y-2 text-xs">
                  {[
                    { id: 'section-acceptance', label: '1. Acceptance of Terms' },
                    { id: 'section-admissions', label: '2. Admissions & Enrollment' },
                    { id: 'section-fees', label: '3. Fee Structure & Payments' },
                    { id: 'section-code-of-conduct', label: '4. Laboratory Code of Conduct' },
                    { id: 'section-intellectual-property', label: '5. Intellectual Property Rights' },
                    { id: 'section-certification', label: '6. Evaluation & Certificates' },
                    { id: 'section-career-disclaimer', label: '7. Career Advisory Policy' },
                    { id: 'section-governing-law', label: '8. Governing Law (Nepal)' },
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

              {/* Legal & Advisory Support Card */}
              <div className="p-6 rounded-2xl bg-navy text-white space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy-mist">
                  Legal Inquiries & Advisory Desk
                </span>
                <h4 className="text-base font-bold text-white">
                  Have questions about these terms?
                </h4>
                <p className="text-xs text-mist leading-relaxed">
                  Our academic counselor and administration team is available to assist you with enrollment policies and curriculum questions.
                </p>
                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-navy-mist">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>info@navyaedtech.com</span>
                  </div>
                  <div className="text-[11px] text-navy-mist">
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
