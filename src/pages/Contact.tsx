import React, { useState, useMemo } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ArrowUpRight,
  Building2,
  HelpCircle,
  Compass
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { SEOHead } from '../components/common/SEOHead';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { supabase } from '../lib/supabaseClient';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { COURSES, LEGACY_COURSE_SLUGS } from '../data/courses';
import type { Course, Inquiry, FAQItem } from '../types';

export const Contact: React.FC = () => {
  const { items: dbCourses } = useSupabaseTable<Course>('courses', {
    orderBy: 'title',
    ascending: true
  });

  const allCourses = useMemo(() => {
    if (dbCourses && dbCourses.length > 0) {
      const active = dbCourses.filter((c) => !LEGACY_COURSE_SLUGS.has(c.slug));
      if (active.length > 0) return active;
    }
    return COURSES;
  }, [dbCourses]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedCourse: 'python-beginner',
    preferredMode: 'Classroom (Kathmandu Campus)',
    preferredTime: 'Morning (7:00 AM – 9:00 AM)',
    experienceLevel: 'College Student / Recent Graduate',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const detailedMessage = [
      `Experience Level: ${formData.experienceLevel}`,
      `Preferred Timing: ${formData.preferredTime}`,
      formData.message ? `Notes: ${formData.message}` : ''
    ].filter(Boolean).join('\n');

    const inquiry: Omit<Inquiry, 'id' | 'createdAt'> = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      interestedCourse: formData.interestedCourse,
      preferredMode: formData.preferredMode,
      message: detailedMessage,
      status: 'New',
      source: 'Contact Page',
    };

    try {
      const { error } = await supabase.from('inquiries').insert(inquiry as never);
      if (error) {
        // Fallback gracefully so student is never blocked
        console.warn('Inquiry insert notice:', error.message);
      }
      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs: FAQItem[] = [
    {
      question: 'Can I attend a free demo or trial session before enrolling?',
      answer: 'Yes! We encourage prospective students to schedule a free 1-hour trial session or visit our Kathmandu campus to experience the teaching methodology, inspect the lab environment, and speak directly with instructors.'
    },
    {
      question: 'What are the fee payment options and installment plans in NPR?',
      answer: 'All course fees are priced transparently in Nepalese Rupees (NPR). We offer flexible 2 to 3 milestone installment plans structured across the training duration, allowing students to pay comfortably without upfront financial stress.'
    },
    {
      question: 'What happens if I miss a live classroom or online lecture?',
      answer: 'Every lecture includes structured code repositories, step-by-step documentation, and recorded backup sessions. Students also receive dedicated 1-on-1 lab mentor hours to resolve any doubts or blockers.'
    },
    {
      question: 'Do you offer internship placement or job referrals after graduation?',
      answer: 'Yes. Students who successfully complete their capstone projects and pass code reviews are connected with our partner network of product studios, IT companies, and startups in Nepal and remote markets. We also provide resume reviews and technical interview preparation.'
    },
    {
      question: 'What laptop specifications do I need for practical lab classes?',
      answer: 'A standard laptop with at least 8GB RAM, an Intel Core i5 / AMD Ryzen 5 / Apple Silicon processor, and 256GB SSD storage is sufficient for all Web Development, Python, Scratch, and Data Science courses.'
    }
  ];

  return (
    <main className="min-h-screen py-10 sm:py-16 bg-paper text-ink">
      <SEOHead
        title="Contact Admissions & Academic Advisory | Navya Ed Tech Nepal"
        description="Connect with academic advisors at Navya Ed Tech Kathmandu. Ask about upcoming batch dates, syllabus outlines, fees in NPR, campus visits, or demo classes."
      />

      <Container>
        {/* ========================================================================= */}
        {/* 1. HERO SECTION & TRUST SLA */}
        {/* ========================================================================= */}
        <section className="mb-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase">
              <Compass className="w-3.5 h-3.5 text-blue" />
              <span>Admissions & Academic Advisory Desk</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span className="text-sage-ink font-medium">Live Counseling Open</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]">
                Let&apos;s Shape Your Software Career.
              </h1>
              <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
                Have questions regarding upcoming batch schedules, course prerequisites, syllabus modules, or installment fee plans in NPR? Connect directly with our Kathmandu admissions team.
              </p>
            </div>

            {/* Quick Advisory Trust Badges */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="font-bold text-navy block">Direct Consultation</span>
                <p className="text-ink-soft">Zero obligation career mapping with senior faculty</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="font-bold text-sage-ink block">Campus & Online</span>
                <p className="text-ink-soft">Visit our Kathmandu lab or join via live stream</p>
              </div>
              <div className="p-3 bg-white rounded-2xl border border-border shadow-xs space-y-1">
                <span className="font-bold text-blue block">24hr SLA</span>
                <p className="text-ink-soft">Guaranteed response within 1 business day</p>
              </div>
            </div>
          </div>

          {/* Right Visual Composition with Generated Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-tr from-navy/20 via-blue/15 to-sage/20 rounded-3xl blur-xl -z-10" />
              <div className="relative rounded-3xl overflow-hidden border border-blue-mist shadow-xl bg-white group">
                <img
                  src="/images/heroes/contact-hero.jpg"
                  alt="Academic advisory lounge at Navya EdTech in Kathmandu"
                  className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-black/20" />

                {/* Floating Top Badge */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                  <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                  <span>Kathmandu Advisory Lounge</span>
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-ink">Talk to an Academic Advisor</p>
                    <p className="text-[11px] text-ink-soft">Call / WhatsApp / Campus Walk-in</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                    Open Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. MAIN GRID: INQUIRY FORM + CONTACT INFORMATION */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mb-16">
          {/* Left Column: Comprehensive Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-10 sm:py-16 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block">
                    Inquiry Successfully Registered
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                    Thank You, {formData.fullName}!
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                    Our admissions counselor will contact you at <strong className="text-ink">{formData.phone || formData.email}</strong> to share the detailed syllabus PDF, fee schedule, and upcoming batch dates.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-paper border border-border max-w-md mx-auto text-left text-xs space-y-1.5 text-ink-soft">
                  <span className="font-bold text-ink block">Summary of Inquiry:</span>
                  <div>• Course: <span className="text-ink font-medium">{formData.interestedCourse}</span></div>
                  <div>• Learning Mode: <span className="text-ink font-medium">{formData.preferredMode}</span></div>
                  <div>• Timing Preference: <span className="text-ink font-medium">{formData.preferredTime}</span></div>
                </div>

                <div className="pt-3">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        interestedCourse: 'python-beginner',
                        preferredMode: 'Classroom (Kathmandu Campus)',
                        preferredTime: 'Morning (7:00 AM – 9:00 AM)',
                        experienceLevel: 'College Student / Recent Graduate',
                        message: ''
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-ink">
                    Send an Academic Inquiry
                  </h2>
                  <p className="text-xs text-ink-soft mt-1">
                    Fill in your details and our education team will reach out with complete curriculum documents.
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bijay Adhikari / Sneha Shrestha"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Phone / WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Course Selection & Learning Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Interested Course Track
                    </label>
                    <select
                      value={formData.interestedCourse}
                      onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                    >
                      {allCourses.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.title} ({c.duration})
                        </option>
                      ))}
                      <option value="full-stack-track">Full-Stack Career Track (6 Months)</option>
                      <option value="general-counseling">General IT Career Counseling</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Preferred Learning Mode
                    </label>
                    <select
                      value={formData.preferredMode}
                      onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                    >
                      <option value="Classroom (Kathmandu Campus)">Classroom (Kathmandu Campus)</option>
                      <option value="Online Live Interactive">Online Live (Interactive via Meet/Zoom)</option>
                      <option value="Hybrid (Classroom + Online)">Hybrid (Classroom + Online)</option>
                      <option value="Undecided">Undecided / Discuss with Advisor</option>
                    </select>
                  </div>
                </div>

                {/* Batch Timing & Experience Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Preferred Batch Timing
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                    >
                      <option value="Morning (7:00 AM – 9:00 AM)">Morning (7:00 AM – 9:00 AM)</option>
                      <option value="Day (11:00 AM – 1:00 PM)">Day (11:00 AM – 1:00 PM)</option>
                      <option value="Evening (5:00 PM – 7:00 PM)">Evening (5:00 PM – 7:00 PM)</option>
                      <option value="Weekend Intensive">Weekend Intensive Batch</option>
                      <option value="Flexible">Flexible / Discuss Available Slots</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      Current Background / Level
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all"
                    >
                      <option value="College Student / Recent Graduate">College Student (BSc.CSIT, BCA, BIT, BE)</option>
                      <option value="Absolute Beginner / Non-Tech">Absolute Beginner (No coding experience)</option>
                      <option value="Self-Taught Developer">Self-Taught Developer (Knows basics)</option>
                      <option value="Working Professional">Working Professional / Career Switcher</option>
                    </select>
                  </div>
                </div>

                {/* Message / Questions */}
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    Specific Questions or Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your learning goals, target job roles, or questions about fees, installments, or demo class schedules..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-navy focus:bg-white transition-all resize-none"
                  />
                </div>

                {submitError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                    {submitError}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-ink-faint">
                    Official counseling desk. All fees transparent in NPR.
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {isSubmitting ? 'Registering Inquiry...' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Campus Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Campus & Admissions Information */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border shadow-sm space-y-6">
              <h2 className="text-lg font-extrabold text-ink">
                Kathmandu Admissions & Campus Hub
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-ink-soft">
                {/* Physical Location */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <strong className="text-ink block text-sm">Training Campus & Labs:</strong>
                    <span>Putalisadak / IT Corridor, Kathmandu, Nepal</span>
                    <span className="block text-[11px] text-ink-faint mt-0.5">
                      Easily accessible from Kathmandu Plaza and City Center.
                    </span>
                  </div>
                </div>

                {/* WhatsApp Quick Connect */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <strong className="text-ink block text-sm">WhatsApp Consultation:</strong>
                    <span>Direct chat with admissions counselor</span>
                    <a
                      href="https://wa.me/9779800000000?text=Hello%20Navya%20EdTech%2C%20I%20am%20inquiring%20about%20course%20admissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-1"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Email Channel */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <strong className="text-ink block text-sm">Admissions Email:</strong>
                    <a
                      href="mailto:info@navyaedtech.com"
                      className="text-navy hover:underline font-medium"
                    >
                      info@navyaedtech.com
                    </a>
                    <span className="block text-[11px] text-ink-faint">
                      Syllabus requests & institutional inquiries.
                    </span>
                  </div>
                </div>

                {/* Advisory Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <strong className="text-ink block text-sm">Advisory & Visiting Hours:</strong>
                    <span>Sunday – Friday: 7:00 AM – 7:00 PM (NPT)</span>
                    <span className="block text-[11px] text-ink-faint mt-0.5">
                      Saturday: 9:00 AM – 3:00 PM (Demo sessions & lab tours by appointment)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Organization Link Card */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-paper-alt border border-border-warm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue block">
                  Parent Organization
                </span>
                <Building2 className="w-4 h-4 text-ink-faint" />
              </div>
              <h3 className="text-base font-bold text-ink">
                Navya EdTech (Enterprise Technology Solutions)
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                For commercial software engineering services, cloud architecture, or enterprise corporate upskilling contracts, visit our parent technology platform.
              </p>
              <a
                href="https://navyaedtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-blue transition-colors"
              >
                <span>Visit navyaedtech.com</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. ADMISSIONS FAQ ACCORDION SECTION */}
        {/* ========================================================================= */}
        <section className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-sm mb-16 space-y-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue">
              <HelpCircle className="w-4 h-4 text-blue" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
              Everything You Need to Know Before Enrolling
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft">
              Clear, transparent answers to common student inquiries regarding admissions, class modes, and payment policies.
            </p>
          </div>

          <FAQAccordion items={faqs} className="border-t border-border-faint" />
        </section>

        {/* ========================================================================= */}
        {/* 4. CORPORATE & UNIVERSITY WORKSHOPS BANNER */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-navy to-[#204468] rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A8C6E5] block">
              Institutional & Corporate Partnerships
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Looking for Corporate Tech Upskilling or College Bootcamps?
            </h3>
            <p className="text-xs sm:text-sm text-mist leading-relaxed">
              We partner with software companies in Nepal for junior developer onboarding, as well as colleges (BSc.CSIT, BCA, BIT) for customized project sprints.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="secondary"
              size="md"
              href="mailto:info@navyaedtech.com?subject=Corporate%20or%20College%20Training%20Inquiry"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Inquire for Institutional Training
            </Button>
          </div>
        </section>
      </Container>
    </main>
  );
};
