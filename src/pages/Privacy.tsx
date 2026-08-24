import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, CheckCircle2, FileCheck, Database, Key, Mail, ArrowUpRight } from 'lucide-react';
import { Container } from '../components/common/Container';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';

export const Privacy: React.FC = () => {
  return (
    <main className="min-h-screen py-10 sm:py-16 bg-[#FAFAF8]">
      <SEOHead
        title="Privacy Policy | Navya Ed Tech Nepal"
        description="Learn how Navya Ed Tech protects student data, handles admissions inquiries, and complies with data governance and privacy practices."
      />

      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17324D]/5 border border-[#17324D]/10 text-xs font-semibold uppercase tracking-wider text-[#356A9A] mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Governance & Security</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#171A1F] leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#5F6670] leading-relaxed">
            At Navya Ed Tech Pvt. Ltd., we respect your privacy and are committed to safeguarding personal information collected through our website, admissions counseling desk, and training laboratory programs.
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-[#8C939E]">
            <span>Effective Date: August 2026</span>
            <span>•</span>
            <span>Applicable to all Website Users & Registered Students</span>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-white border border-[#E8E4DA] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#17324D]/10 text-[#17324D] flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Zero Data Selling</h3>
            <p className="text-xs text-[#5F6670] mt-1 leading-relaxed">
              We never sell, rent, or trade student contact information or academic records to third-party advertising brokers.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8E4DA] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#356A9A]/10 text-[#356A9A] flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Encrypted Database</h3>
            <p className="text-xs text-[#5F6670] mt-1 leading-relaxed">
              Protected by PostgreSQL Row Level Security (RLS) and SSL/TLS encrypted in-transit communication.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E8E4DA] shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-[#718C7A]/20 text-[#3D5644] flex items-center justify-center mb-3">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-[#171A1F]">Full Transparency</h3>
            <p className="text-xs text-[#5F6670] mt-1 leading-relaxed">
              You have full rights to inspect, update, or request deletion of your inquiry details and student records at any time.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section id="section-collection" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#171A1F] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#17324D] text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Information We Collect</span>
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                We collect personal information only when voluntarily provided by you through our website forms, admissions desk, or during course enrollment:
              </p>
              <ul className="space-y-2.5 text-sm text-[#5F6670]">
                <li className="flex items-start gap-2">
                  <span className="text-[#356A9A] font-bold">•</span>
                  <span><strong>Admissions & Inquiries:</strong> Full name, email address, phone/WhatsApp number, preferred learning mode (Classroom or Online Live), interested course domain, and optional notes or learning goals.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#356A9A] font-bold">•</span>
                  <span><strong>Enrolled Student Records:</strong> Academic background, batch attendance, laboratory assessment results, code review submissions, and capstone project deliverables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#356A9A] font-bold">•</span>
                  <span><strong>Technical Telemetry:</strong> Standard non-identifying server logs (browser type, device category, page views) used exclusively for performance optimization and website security.</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section id="section-use" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#171A1F] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#17324D] text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>How We Use Your Information</span>
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                Personal information collected is utilized exclusively for legitimate academic and administrative purposes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#E8E4DA] text-xs text-[#5F6670]">
                  <strong className="block text-[#171A1F] font-semibold mb-1">Academic Advisory:</strong>
                  Responding to inquiries with batch schedules, syllabus guides, and course counseling.
                </div>
                <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#E8E4DA] text-xs text-[#5F6670]">
                  <strong className="block text-[#171A1F] font-semibold mb-1">Instructional Delivery:</strong>
                  Coordinating cohort laboratory slots, software repository access, and code critiques.
                </div>
                <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#E8E4DA] text-xs text-[#5F6670]">
                  <strong className="block text-[#171A1F] font-semibold mb-1">Certificate Verification:</strong>
                  Issuing and authenticating verifiable completion certificates for graduates.
                </div>
                <div className="p-3.5 rounded-xl bg-[#F4F1EA] border border-[#E8E4DA] text-xs text-[#5F6670]">
                  <strong className="block text-[#171A1F] font-semibold mb-1">Important Updates:</strong>
                  Notifying enrollees of schedule revisions, holidays, or emergency campus announcements.
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-sharing" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#171A1F] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#17324D] text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Data Sharing & Third-Party Disclosure</span>
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                <strong>We do not sell, rent, or trade your personal data.</strong> Your information is shared only under the following strict conditions:
              </p>
              <ul className="space-y-2 text-sm text-[#5F6670]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                  <span><strong>Technology Infrastructure:</strong> Secure cloud database and hosting providers (Supabase PostgreSQL, secure cloud servers) bound by strict confidentiality and data protection obligations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                  <span><strong>Hiring Partners (Opt-In Only):</strong> Sharing graduate resumes and portfolio links with tech companies exclusively upon explicit written consent from the student.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#718C7A] shrink-0 mt-0.5" />
                  <span><strong>Legal Obligations:</strong> Where mandated by applicable Nepalese law, court order, or governmental regulatory authority.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="section-security" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#171A1F] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#17324D] text-white text-xs font-bold flex items-center justify-center">4</span>
                <span>Data Security & Protection Measures</span>
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                We implement industry-standard technical and operational security controls to prevent unauthorized access, alteration, or disclosure of your information:
              </p>
              <ul className="space-y-2 text-sm text-[#5F6670]">
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-[#356A9A] shrink-0 mt-0.5" />
                  <span><strong>Row Level Security (RLS):</strong> Granular database policies ensure that private records (admissions inquiries) are isolated and accessible strictly to authenticated administrative staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-[#356A9A] shrink-0 mt-0.5" />
                  <span><strong>Encrypted Transmission:</strong> All web and API traffic is encrypted via HTTPS / TLS 1.3 encryption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-[#356A9A] shrink-0 mt-0.5" />
                  <span><strong>Role-Based Access Controls:</strong> Staff access to student contact details and database tables is restricted on a strict need-to-know basis.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="section-showcases" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#171A1F] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#17324D] text-white text-xs font-bold flex items-center justify-center">5</span>
                <span>Student Portfolios & Public Showcases</span>
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                To help graduates gain career visibility, Navya Ed Tech maintains a public Student Work showcase. We publish project screenshots, tech stack summaries, and GitHub / live demo links only for students who have granted permission. Students may update or withdraw their showcase profile at any time by contacting our advisory desk.
              </p>
            </section>

            {/* Section 6 */}
            <section id="section-rights" className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8E4DA] shadow-sm space-y-4">
              <h2 className="text-xl font-bold text-[#171A1F] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#17324D] text-white text-xs font-bold flex items-center justify-center">6</span>
                <span>Your Data Rights & Choices</span>
              </h2>
              <p className="text-sm text-[#5F6670] leading-relaxed">
                You possess full rights regarding the personal information we hold about you:
              </p>
              <ul className="space-y-2 text-sm text-[#5F6670]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#718C7A]" />
                  <span><strong>Access & Correction:</strong> Request a summary of your stored data or correct outdated contact information.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#718C7A]" />
                  <span><strong>Opt-Out of Communications:</strong> Opt out of informational emails or WhatsApp notifications at any time.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#718C7A]" />
                  <span><strong>Data Erasure:</strong> Request the deletion of non-essential inquiry records and contact history.</span>
                </li>
              </ul>
            </section>
          </div>

          {/* Sticky Sidebar Navigation */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 space-y-6">
              {/* Quick Navigation Card */}
              <div className="p-6 rounded-2xl bg-white border border-[#E8E4DA] shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#17324D]">
                  <FileCheck className="w-4 h-4 text-[#356A9A]" />
                  <span>Privacy Policy Outline</span>
                </div>
                <nav className="space-y-2 text-xs">
                  {[
                    { id: 'section-collection', label: '1. Information We Collect' },
                    { id: 'section-use', label: '2. How We Use Your Data' },
                    { id: 'section-sharing', label: '3. Data Sharing & Third Parties' },
                    { id: 'section-security', label: '4. Security & Encryption' },
                    { id: 'section-showcases', label: '5. Student Portfolios & Showcase' },
                    { id: 'section-rights', label: '6. Your Rights & Choices' },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block py-1.5 px-2 rounded-lg text-[#5F6670] hover:text-[#17324D] hover:bg-[#F4F1EA] transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Data Protection Desk Card */}
              <div className="p-6 rounded-2xl bg-[#17324D] text-white space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9BBAD4]">
                  Privacy & Data Desk
                </span>
                <h4 className="text-base font-bold text-white">
                  Data Protection Inquiries
                </h4>
                <p className="text-xs text-[#C4CDD5] leading-relaxed">
                  For privacy requests, data access, or updates regarding personal records, contact our data administration team:
                </p>
                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#9BBAD4]">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>privacy@navyaedtech.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#9BBAD4]">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>info@navyaedtech.com</span>
                  </div>
                  <div className="text-[11px] text-[#9BBAD4]">
                    Kathmandu, Nepal • Navya Ed Tech Pvt. Ltd.
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" href="/contact" className="w-full justify-center bg-white/10 hover:bg-white/20 text-white border-white/20">
                    Contact Advisory Desk
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
