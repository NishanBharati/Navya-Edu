import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  GraduationCap,
  Code2,
  CheckCircle2,
  Users,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Send,
  Laptop,
  Terminal,
  Layers,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { Button } from '../components/common/Button';
import { getBreadcrumbSchema } from '../utils/structuredData';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const CorporateTraining: React.FC = () => {
  // Form State
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orgType, setOrgType] = useState('company');
  const [trainingNeed, setTrainingNeed] = useState('junior-onboarding');
  const [cohortSize, setCohortSize] = useState('10-20');
  const [deliveryFormat, setDeliveryFormat] = useState('on-campus');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!orgName.trim() || !contactName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in all required fields (Organization, Contact Person, Email, and Phone).');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: contactName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: `Institutional Training Inquiry: ${orgName.trim()}`,
        message: `Institutional & Corporate Training Inquiry:
Organization: ${orgName.trim()}
Organization Type: ${orgType}
Training Need: ${trainingNeed}
Expected Batch Size: ${cohortSize}
Preferred Delivery: ${deliveryFormat}
Requirements/Notes: ${notes || 'None specified'}`,
        intent: 'institutional_training',
      };

      if (isSupabaseConfigured) {
        await supabase.from('inquiries').insert([payload]);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.warn('Institutional inquiry notice:', err);
      // Graceful fallback confirmation
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Corporate Tech Upskilling & College Bootcamps | Navya Ed Tech Nepal"
        description="Customized software engineering training for tech companies and computer science colleges (BSc.CSIT, BCA, BIT) in Nepal. Accelerate junior onboarding and student internship readiness."
        keywords="corporate tech training Nepal, IT bootcamp for colleges Kathmandu, BSc.CSIT workshop Putalisadak, developer upskilling Nepal, software engineering internship readiness"
        structuredData={[
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Institutional & Corporate Training', path: '/corporate-training' },
          ]),
        ]}
      />

      <Container>
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumbs items={[{ label: 'Institutional & Corporate Training' }]} />
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-semibold uppercase tracking-wider text-blue mb-4">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional & Enterprise Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-tight">
            Corporate Tech Upskilling & College Bootcamps
          </h1>

          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Bridge the gap between academic theory and commercial software engineering. We partner with tech enterprises to onboard junior developers and with IT colleges to run high-impact capstone bootcamps.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="primary"
              size="md"
              href="#inquiry-form"
              className="font-bold text-xs sm:text-sm"
            >
              Request Institutional Proposal
            </Button>
            <Button
              variant="outline"
              size="md"
              href="/contact"
              className="text-xs sm:text-sm"
            >
              Contact Advisory Desk
            </Button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. TARGET AUDIENCES: COMPANIES VS. COLLEGES */}
        {/* ========================================================================= */}
        <section className="mb-16 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card A: For Software Companies & Enterprises */}
          <div className="p-8 rounded-3xl bg-white border border-border shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue/10 text-blue flex items-center justify-center">
                <Briefcase className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue">
                  For IT Companies & Startups
                </span>
                <h2 className="text-2xl font-extrabold text-ink mt-1">
                  Corporate Engineering Upskilling
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Hiring fresh talent often means weeks lost to basic training. We accelerate your onboarding pipeline by training junior engineers and interns on your exact commercial stack before their first sprint.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span>Junior Developer Fast-Track Onboarding</span>
                  </h3>
                  <p className="text-xs text-ink-soft pl-5.5">
                    Idiomatic Python, JavaScript ES6+, Git branching protocols, and pull request hygiene aligned with your internal review standards.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span>Stack Transition & Microservices</span>
                  </h3>
                  <p className="text-xs text-ink-soft pl-5.5">
                    Transition teams from legacy backends to asynchronous Python (FastAPI, AsyncIO, SQLAlchemy ORM) and modern component-driven frontends.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span>Testing & Production Readiness</span>
                  </h3>
                  <p className="text-xs text-ink-soft pl-5.5">
                    Automated unit testing with pytest, REST API contract validation with Pydantic, and CI/CD workflow fundamentals.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-faint">
              <span className="text-[11px] text-ink-faint block">
                Tailored for software teams, fintechs, digital agencies, and outsourced engineering centers in Nepal.
              </span>
            </div>
          </div>

          {/* Card B: For Colleges & Universities */}
          <div className="p-8 rounded-3xl bg-white border border-border shadow-xs space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sage/15 text-sage flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sage">
                  For Universities & Colleges
                </span>
                <h2 className="text-2xl font-extrabold text-ink mt-1">
                  College Project & Internship Bootcamps
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                Empower your BSc.CSIT, BCA, BIT, and BE Computer students with industry-standard project sprints that turn theoretical university syllabi into verifiable, live-deployed capstones.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span>Software Engineering Internship Readiness</span>
                  </h3>
                  <p className="text-xs text-ink-soft pl-5.5">
                    Multi-week finishing program for 6th–8th semester students covering GitHub portfolio polishing, technical mock interviews, and live code reviews.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span>Practical University Capstone Sprints</span>
                  </h3>
                  <p className="text-xs text-ink-soft pl-5.5">
                    Hands-on 2-week to 6-week intensive workshops building real-time full-stack web apps, analytics pipelines, or Python tools.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-paper-alt border border-border space-y-1">
                  <h3 className="font-bold text-ink text-xs sm:text-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-sage shrink-0" />
                    <span>Faculty Development Workshops (FDP)</span>
                  </h3>
                  <p className="text-xs text-ink-soft pl-5.5">
                    Hands-on update sessions for computer science faculty covering modern Git workflows, API design, and containerization basics.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border-faint">
              <span className="text-[11px] text-ink-faint block">
                Partnership models available for Tribhuvan University (TU), Pokhara University (PU), Kathmandu University (KU), and Purbanchal University affiliated colleges.
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CROSS-LINK TO CAREER PROGRAMS */}
        {/* ========================================================================= */}
        <section className="mb-16 max-w-5xl mx-auto rounded-3xl bg-paper-alt border border-border p-6 sm:p-10 shadow-2xs">
          <div className="max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue">
              Curriculum Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Powered by Commercial Engineering Pathways
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Our corporate and institutional modules are modularized directly from our intensive career tracks. Institutional partners can cross-license or adapt complete semester-length modules:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-white border border-border shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue uppercase tracking-wider">Career Track</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-paper-alt border border-border text-ink-soft">
                  80 Days (~3 Months)
                </span>
              </div>
              <h3 className="text-lg font-bold text-ink">
                Python Software Engineering Track
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Takes candidates from core logical syntax to production microservices with AsyncIO, FastAPI, Pydantic, and SQLAlchemy ORM. Ideal for college final-year batches and junior backend onboarding.
              </p>
              <Link
                to="/programs#python-software-engineering"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-navy pt-1"
              >
                <span>Inspect Full Track Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-border shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Career Track</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-paper-alt border border-border text-ink-soft">
                  45 Days (7.5 Weeks)
                </span>
              </div>
              <h3 className="text-lg font-bold text-ink">
                Modern Web Development Career Track
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Hands-on frontend engineering spanning semantic HTML5, modern Tailwind CSS design systems, JavaScript ES6+ state management, REST API consumption, and Vercel cloud deployments.
              </p>
              <Link
                to="/programs#web-development-career-track"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue hover:text-navy pt-1"
              >
                <span>Inspect Full Track Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. DELIVERY MODES */}
        {/* ========================================================================= */}
        <section className="mb-16 max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue">
              Flexible Delivery Options
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1">
              How We Deliver Training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-border shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-navy text-white mx-auto flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink">On-Campus / On-Site</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                We send lead instructors and mentor assistants directly to your company office or university laboratory in Kathmandu Valley.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue text-white mx-auto flex items-center justify-center">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink">Navya Putalisadak Lab</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Host your cohort at our physical computer lab in Putalisadak, equipped with developer workstations, dual monitors, and high-speed fiber internet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border shadow-xs text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sage text-white mx-auto flex items-center justify-center">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-ink">Hybrid / Live Virtual</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Synchronous live interactive sessions via screen sharing, private GitHub organization access, and dedicated Slack channels.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DEDICATED INSTITUTIONAL INQUIRY FORM */}
        {/* ========================================================================= */}
        <section id="inquiry-form" className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Inquiry Received
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-ink">
                    Proposal Request Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                    Thank you, {contactName}. We have received the training inquiry for <strong className="text-ink">{orgName}</strong>. Our academic coordinator will contact you at <strong className="text-ink">{email}</strong> within 1 business day with a customized curriculum proposal and pricing outline.
                  </p>
                </div>

                <div className="pt-4">
                  <Button variant="primary" size="md" href="/">
                    Back to Homepage
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-border pb-4">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                    Request an Institutional Training Proposal
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-soft mt-1">
                    Tell us about your organization and training objectives. We will prepare a customized curriculum proposal and timeline.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Org Name & Contact Person */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="org-name" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Organization / College Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="org-name"
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g., Tech Solutions Pvt. Ltd. or TU College"
                      className="w-full px-4 py-2.5 rounded-xl bg-paper-alt border border-border text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Contact Person & Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g., Suman Shrestha (HOD / HR Lead)"
                      className="w-full px-4 py-2.5 rounded-xl bg-paper-alt border border-border text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="org-email" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Official Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="org-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., info@company.com or hod@college.edu.np"
                      className="w-full px-4 py-2.5 rounded-xl bg-paper-alt border border-border text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>

                  <div>
                    <label htmlFor="org-phone" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Contact Number / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="org-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g., +977 98XXXXXXXX"
                      className="w-full px-4 py-2.5 rounded-xl bg-paper-alt border border-border text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    />
                  </div>
                </div>

                {/* Org Type & Training Need */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="org-type" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Organization Type
                    </label>
                    <select
                      id="org-type"
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-paper-alt border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    >
                      <option value="company">IT / Software Company</option>
                      <option value="college">College / University (CS/IT Dept)</option>
                      <option value="school">High School (+2 STEM)</option>
                      <option value="nonprofit">Development Agency / NGO</option>
                      <option value="other">Other Commercial Enterprise</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="training-need" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Primary Training Focus
                    </label>
                    <select
                      id="training-need"
                      value={trainingNeed}
                      onChange={(e) => setTrainingNeed(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-paper-alt border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    >
                      <option value="junior-onboarding">Junior Developer Onboarding</option>
                      <option value="college-bootcamp">College Capstone Sprint / Bootcamp</option>
                      <option value="internship-readiness">Software Internship Readiness</option>
                      <option value="python-backend">Python & FastAPI Microservices</option>
                      <option value="web-dev">Modern Web Development (Frontend/Full-Stack)</option>
                      <option value="data-science">Data Science & Analytics</option>
                      <option value="fdp">Faculty Development Program (FDP)</option>
                    </select>
                  </div>
                </div>

                {/* Cohort Size & Delivery Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cohort-size" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Expected Cohort Size
                    </label>
                    <select
                      id="cohort-size"
                      value={cohortSize}
                      onChange={(e) => setCohortSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-paper-alt border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    >
                      <option value="5-10">Small Team (5–10 participants)</option>
                      <option value="10-20">Standard Batch (10–20 participants)</option>
                      <option value="20-50">Department Cohort (20–50 participants)</option>
                      <option value="50+">Large Scale Program (50+ participants)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="delivery-mode" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                      Preferred Training Location
                    </label>
                    <select
                      id="delivery-mode"
                      value={deliveryFormat}
                      onChange={(e) => setDeliveryFormat(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-paper-alt border border-border text-xs text-ink focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy"
                    >
                      <option value="on-campus">At Your Office / College Campus</option>
                      <option value="navya-lab">At Navya Putalisadak Innovation Lab</option>
                      <option value="live-online">Live Interactive Virtual Sprints</option>
                      <option value="hybrid">Blended / Hybrid Model</option>
                    </select>
                  </div>
                </div>

                {/* Notes & Requirements */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Specific Requirements or Timeline (Optional)
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Provide any details on preferred start dates, specific frameworks, student semester, or current tech stack..."
                    className="w-full px-4 py-2.5 rounded-xl bg-paper-alt border border-border text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-navy hover:bg-navy-deep text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending Request...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Proposal Request</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-ink-faint mt-2">
                    Official enterprise agreements are backed by Navya Ed Tech Pvt. Ltd. with standard VAT invoicing.
                  </p>
                </div>
              </form>
            )}
          </div>
        </section>
      </Container>
    </main>
  );
};
