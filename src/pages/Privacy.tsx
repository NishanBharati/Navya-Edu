import React from 'react';
import { Shield, Lock, Eye, CheckCircle2, FileCheck, Database, Key, Mail, AlertTriangle, Cookie } from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { Button } from '../components/common/Button';

export const Privacy: React.FC = () => {
  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper">
      <SEOHead
        title="Privacy Policy | Navya Ed Tech Nepal"
        description="Learn how Navya Ed Tech collects, stores, and protects user data from contact inquiries, website telemetry, and cookies with database encryption."
        structuredData={getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Privacy Policy', path: '/privacy' },
        ])}
      />

      <Container>
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Governance & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            At Navya Ed Tech Pvt. Ltd. (Nepal), we respect your privacy and are committed to safeguarding personal information collected through our website, admissions counseling, contact forms, and live online training programs.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-faint">
            <span>Last Updated: August 2026</span>
            <span>•</span>
            <span>Applies to Website Visitors, Inquirers & Registered Students</span>
          </div>
        </div>

        {/* Legal Review Callout */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-ink-soft flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="font-semibold text-ink flex items-center gap-2">
              <span>[LEGAL REVIEW NEEDED: Statutory Compliance & Data Protection Notice]</span>
            </strong>
            <p className="text-xs leading-relaxed text-ink-soft">
              This policy outlines standard operational practices for contact form submission handling, basic website telemetry, cookies, and database storage for an online IT educational institute in Nepal. Formal statutory clauses require review by certified Nepalese legal counsel under the <em>Individual Privacy Act, 2075 (2018)</em> and related electronic transaction frameworks.
            </p>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-navy/10 text-navy flex items-center justify-center mb-3">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Zero Data Selling</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              We never sell, monetize, or lease student contact numbers or inquiry details to third-party ad networks or brokers.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-blue/10 text-blue flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Encrypted Storage</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Inquiries and student records are stored with PostgreSQL Row Level Security (RLS) and TLS 1.3 encryption in transit.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white border border-border shadow-xs">
            <div className="w-9 h-9 rounded-lg bg-sage/20 text-sage-ink flex items-center justify-center mb-3">
              <Eye className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-ink">Right to Erasure</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              You can request inspection, correction, or deletion of your counseling inquiries and stored records at any time.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-10">
            {/* Section 1 */}
            <section id="section-collection" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">1</span>
                <span>Information We Collect</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                We gather information voluntarily provided by you through our website contact forms, course consultation workflows, and online admissions calls, as well as limited technical telemetry:
              </p>
              
              <div className="space-y-4 pt-1">
                <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-1.5">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" />
                    <span>A. Contact & Admissions Inquiries</span>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    When submitting our contact form or booking a free demo class, we collect: <strong>Full Name</strong>, <strong>Email Address</strong>, <strong>Phone / WhatsApp Number</strong>, <strong>Course of Interest</strong> (e.g., Web Development, Python Advance, Data Science), and your optional <strong>Learning Message / Background Notes</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-1.5">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" />
                    <span>B. Enrolled Student Academic Records</span>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    For confirmed batch enrollees, we maintain live class attendance logs, assignment submissions, GitHub repository URLs for capstone projects, and mentor review evaluations required for certification.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper-alt border border-border space-y-1.5">
                  <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue" />
                    <span>C. Technical Telemetry & Analytics</span>
                  </h3>
                  <p className="text-xs text-ink-soft leading-relaxed">
                    When navigating our website, standard web server logs and privacy-preserving analytics capture non-identifying telemetry: browser family, device operating system, general geographic region (country/city), referring URLs, and page visit duration.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="section-use" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">2</span>
                <span>How We Use Your Information</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Personal information collected is utilized exclusively for legitimate educational and student counseling purposes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3.5 rounded-xl bg-paper-alt border border-border text-xs text-ink-soft">
                  <strong className="block text-ink font-semibold mb-1">Admissions Counseling:</strong>
                  Responding to course inquiries, clarifying prerequisites, and confirming batch schedule slots.
                </div>
                <div className="p-3.5 rounded-xl bg-paper-alt border border-border text-xs text-ink-soft">
                  <strong className="block text-ink font-semibold mb-1">Instructional Delivery:</strong>
                  Providing live class access, course materials, assignment feedback, and workshop links.
                </div>
                <div className="p-3.5 rounded-xl bg-paper-alt border border-border text-xs text-ink-soft">
                  <strong className="block text-ink font-semibold mb-1">Certificate Verification:</strong>
                  Generating unique credential verification links for prospective employers to validate capstone completion.
                </div>
                <div className="p-3.5 rounded-xl bg-paper-alt border border-border text-xs text-ink-soft">
                  <strong className="block text-ink font-semibold mb-1">Essential Notices:</strong>
                  Alerting students about emergency schedule changes, festival closures, or online platform updates.
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="section-cookies" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">3</span>
                <span>Cookies & Local Storage</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Our website utilizes minimal, essential cookies and browser local storage mechanisms strictly for functional integrity:
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <Cookie className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Essential Session Storage:</strong> Temporary memory to preserve form inputs across navigation steps and prevent accidental inquiry loss.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Cookie className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Interface Preferences:</strong> Local storage flags for maintaining user preferences (such as modal dismissals or view modes).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Cookie className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>No Third-Party Ad Trackers:</strong> We do not deploy invasive cross-site advertising pixels or surveillance trackers (such as behavioral retargeting cookies).</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="section-storage" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">4</span>
                <span>Data Storage, Security & Retention</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                We implement industry-standard cybersecurity and data management safeguards:
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>PostgreSQL Row Level Security (RLS):</strong> Inquiry database tables are safeguarded with granular policies that isolate sensitive student contact records strictly to authorized administration staff.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Encrypted In-Flight & At-Rest:</strong> All web submissions and API communications are encrypted via HTTPS / TLS 1.3 protocols.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Key className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Retention Timeframes:</strong> Unconverted prospective student inquiries are retained for up to 12 months for counseling follow-ups, after which they are systematically purged unless active enrollment occurs.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="section-sharing" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">5</span>
                <span>Data Sharing & Third Parties</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                We do not sell student data. Data is shared solely with trusted service providers assisting our direct operations:
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Database & Cloud Hosting:</strong> Secure cloud infrastructure (Supabase PostgreSQL, Vercel/Node cloud servers) bound by strict confidentiality agreements.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Hiring Partners (Explicit Opt-In Only):</strong> Graduate portfolios and resumes are forwarded to IT software employers exclusively upon individual student authorization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Legal Mandates:</strong> Where compelled by valid legal processes under applicable laws of Nepal.</span>
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="section-rights" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">6</span>
                <span>Your Rights & Choices</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                You retain full control over the personal information submitted to Navya Ed Tech:
              </p>
              <ul className="space-y-2 text-sm text-ink-soft">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span><strong>Access & Verification:</strong> Request a copy of your personal data held by our admissions office.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span><strong>Correction:</strong> Update inaccurate contact numbers, email addresses, or academic details.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span><strong>Erasure:</strong> Request the deletion of your inquiry submissions and counseling history.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sage" />
                  <span><strong>Communication Opt-Out:</strong> Unsubscribe from WhatsApp batch updates or informational emails at any time.</span>
                </li>
              </ul>
            </section>

            {/* Section 7 - Minors & Youth Learners */}
            <section id="section-minors" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">7</span>
                <span>Protection of Minors & Youth Learners (Under 18)</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Navya Ed Tech offers foundational digital literacy, Scratch programming, and introductory Python courses that may attract secondary school students under 18 years of age.
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Parental / Guardian Consent:</strong> Enrolling any student under the age of 18 requires verifiable affirmative consent from a parent or legal guardian.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>No Direct Profiling:</strong> We do not conduct automated profiling or behavioural targeting on minor students. Academic records are restricted strictly to mentors and legal guardians.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Immediate Guardian Deletion Rights:</strong> Parents or legal guardians may inspect, update, or request immediate purging of their child's contact and enrollment data at any time via <code className="text-navy font-semibold">info@navyaedtech.com</code>.</span>
                </li>
              </ul>
            </section>

            {/* Section 8 - Student Media & Testimonials Consent */}
            <section id="section-media-consent" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">8</span>
                <span>Student Media, Capstone Showcases & Testimonials</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                We take immense pride in student achievements, but respect personal privacy unconditionally:
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Affirmative Written Consent:</strong> Student photographs, video recordings of presentations, graduate testimonials, and capstone repository links are published on public marketing pages strictly after obtaining signed or digital affirmative consent (<code className="text-navy font-semibold">consentConfirmed = true</code>).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Right to Revoke Media Consent:</strong> Students may withdraw consent for published testimonials, case studies, or headshots at any point. Upon notification, media will be unlinked and purged from production CDN buckets within 7 business days.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-sage shrink-0 mt-0.5" />
                  <span><strong>Independent Project Ownership:</strong> Students retain full intellectual property rights to their individual capstone source code, Git repositories, and architecture diagrams.</span>
                </li>
              </ul>
            </section>

            {/* Section 9 - Analytics & Bot Defense Telemetry */}
            <section id="section-telemetry" className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-ink flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-navy text-white text-xs font-bold flex items-center justify-center">9</span>
                <span>Analytics, Infrastructure Logs & Bot Defense</span>
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                To maintain high availability and protect application forms from automated brute-force attacks or spam scraping, our server edge records temporary technical telemetry:
              </p>
              <ul className="space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Security & Abuse Prevention:</strong> IP addresses and browser user-agent headers are processed transiently to enforce form rate limiting, bot honeypot validation, and DDoS mitigation.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Zero Commercial Ad Telemetry:</strong> We do not embed surveillance tracking pixels (such as third-party ad retargeters or cross-domain fingerprinting scripts).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue shrink-0 mt-0.5" />
                  <span><strong>Log Rotation:</strong> Edge server access logs are systematically rotated and flushed after 30 days.</span>
                </li>
              </ul>
            </section>

            {/* Section 10 - Legal Review Marker */}
            <section id="section-statutory" className="bg-paper-alt rounded-2xl p-6 sm:p-8 border border-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span>[LEGAL REVIEW NEEDED: Jurisdiction & Statutory Alignment]</span>
              </div>
              <h3 className="text-base font-bold text-ink">
                10. Applicable Jurisdiction & Regulatory Alignment
              </h3>
              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                <em>
                  [LEGAL REVIEW NEEDED: Certified legal counsel in Nepal should review this section to ensure precise conformity with the Individual Privacy Act 2075 (2018), Electronic Transactions Act 2063, and cross-border server data transfer provisions applicable to educational private limited enterprises in Nepal.]
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
                  <FileCheck className="w-4 h-4 text-blue" />
                  <span>Privacy Policy Outline</span>
                </div>
                <nav className="space-y-1.5 text-xs">
                  {[
                    { id: 'section-collection', label: '1. Information We Collect' },
                    { id: 'section-use', label: '2. How We Use Your Data' },
                    { id: 'section-cookies', label: '3. Cookies & Local Storage' },
                    { id: 'section-storage', label: '4. Storage & Security' },
                    { id: 'section-sharing', label: '5. Data Sharing & Third Parties' },
                    { id: 'section-rights', label: '6. Your Rights & Choices' },
                    { id: 'section-minors', label: "7. Protection of Minors" },
                    { id: 'section-media-consent', label: '8. Media & Testimonial Consent' },
                    { id: 'section-telemetry', label: '9. Analytics & Bot Telemetry' },
                    { id: 'section-statutory', label: '10. Jurisdiction [LEGAL REVIEW]' },
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

              {/* Data Protection Desk Card */}
              <div className="p-6 rounded-2xl bg-navy text-white space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-mist">
                  Privacy & Data Desk
                </span>
                <h4 className="text-base font-bold text-white">
                  Data Protection Inquiries
                </h4>
                <p className="text-xs text-mist leading-relaxed">
                  For privacy requests, personal data deletion, or questions regarding our security architecture:
                </p>
                <div className="pt-1 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-navy-mist">
                    <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                    <span>info@navyaedtech.com</span>
                  </div>
                  <div className="text-xs text-navy-mist">
                    Nepal • Live Online
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="outline-white" size="sm" href="/contact" className="w-full justify-center">
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
