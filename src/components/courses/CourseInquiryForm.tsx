import React, { useState } from 'react';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { Course } from '../../types';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { submitInquiry, InquirySubmissionResult } from '../../lib/inquiryService';
import { SITE_CONFIG } from '../../config/site';

interface CourseInquiryFormProps {
  course: Course;
}

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  preferredMode: string;
  message: string;
  privacyConsent: boolean;
  website_hp: string; // Honeypot anti-spam field
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  privacyConsent?: string;
  general?: string;
}

export const CourseInquiryForm: React.FC<CourseInquiryFormProps> = ({ course }) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    preferredMode: course.mode.includes('Hybrid')
      ? 'Hybrid (Kathmandu Lab + Online)'
      : course.mode.includes('Online')
      ? 'Online Live'
      : 'In-Person (Kathmandu Lab)',
    message: '',
    privacyConsent: false,
    website_hp: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquirySubmissionResult | null>(null);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name (minimum 2 characters).';
    } else if (formData.fullName.trim().length > 100) {
      errs.fullName = 'Full name must not exceed 100 characters.';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!emailPattern.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Please enter your contact phone or WhatsApp number.';
    } else if (cleanPhone.length < 7 || !/^\+?[0-9]{7,15}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid phone number (7–15 digits, e.g. 98XXXXXXXX).';
    }

    if (!formData.privacyConsent) {
      errs.privacyConsent = 'You must agree to the privacy notice before submitting.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1. Anti-spam honeypot detection
    if (formData.website_hp) {
      console.warn('[CourseInquiryForm] Spam bot detected via honeypot field.');
      // Silently simulate success to discourage bot retry
      setSubmissionResult({
        success: true,
        savedLocally: true,
        cloudSynced: false,
        localId: 'inq_hp_blocked',
        mailtoUrl: '#',
        whatsappUrl: '#',
      });
      return;
    }

    // 2. Validate input fields
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const result = await submitInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        interestedCourse: course.title,
        preferredMode: formData.preferredMode,
        message: formData.message,
        source: `Course Detail Page (/courses/${course.slug})`,
      });

      if (!result.success && result.errorMessage) {
        setErrors({ general: result.errorMessage });
        return;
      }

      setSubmissionResult(result);
    } catch (err) {
      console.error('[CourseInquiryForm] Submission error:', err);
      setErrors({
        general: 'Could not record inquiry. Please call or WhatsApp our admissions desk directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      preferredMode: 'In-Person (Kathmandu Lab)',
      message: '',
      privacyConsent: false,
      website_hp: '',
    });
    setErrors({});
    setSubmissionResult(null);
  };

  return (
    <section id="inquiry" className="py-16 sm:py-24 bg-paper border-b border-border scroll-mt-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Column: Context, Course Identification & Direct Contacts */}
              <div className="lg:col-span-5 bg-navy p-6 sm:p-8 text-white flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-light" />
                    <span>Admissions Counseling</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Inquire About {course.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Have questions regarding seat availability, lab prerequisites, or installment terms? Speak directly with our technical counseling team.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2.5 text-xs text-white/90">
                  <div className="font-bold text-blue-light uppercase tracking-wider text-xs">
                    Identified Course Details:
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Course:</span>
                    <span className="font-bold truncate max-w-[170px]">{course.title}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Next Intake:</span>
                    <span className="font-semibold">{course.upcomingBatch.startDate}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-white/70">Tuition Fee:</span>
                    <span className="font-bold text-emerald-300">{course.fee}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-white/80 border-t border-white/15">
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-blue-light shrink-0" />
                    <span>Admissions Hotline: <strong>{SITE_CONFIG.contactPhone}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-light shrink-0" />
                    <span>Email: <strong>{SITE_CONFIG.contactEmail}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-blue-light shrink-0" />
                    <span>Putalisadak, Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Inquiry Form or Success State */}
              <div className="lg:col-span-7 p-6 sm:p-8">
                {submissionResult ? (
                  <div className="h-full flex flex-col justify-center text-center space-y-6 py-6" role="status" aria-live="polite">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-extrabold text-ink">
                        Inquiry Successfully Recorded
                      </h4>
                      <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                        Thank you, <strong>{formData.fullName}</strong>. Your request regarding <strong>{course.title}</strong> has been logged with our admissions desk.
                      </p>
                      <p className="text-xs font-mono text-ink-faint">
                        Reference Ticket: {submissionResult.localId}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      {submissionResult.whatsappUrl && submissionResult.whatsappUrl !== '#' && (
                        <a
                          href={submissionResult.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Chat on WhatsApp Now</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-paper border border-border text-xs font-bold text-ink hover:bg-paper-alt transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>

                    <div className="text-xs text-ink-faint flex items-center justify-center gap-1.5 pt-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-sage-ink" />
                      <span>Zero spam guarantee. Your contact information is never shared.</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-ink">
                        Request Course Counseling
                      </h4>
                      <p className="text-xs text-ink-soft">
                        Fill out the form below. An academic counselor will contact you within 24 hours.
                      </p>
                    </div>

                    {errors.general && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2" role="alert">
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>{errors.general}</span>
                      </div>
                    )}

                    {/* Honeypot field for anti-spam (hidden from real users) */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website_hp">Leave this field blank</label>
                      <input
                        type="text"
                        id="website_hp"
                        name="website_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.website_hp}
                        onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                      />
                    </div>

                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-ink mb-1">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        aria-invalid={errors.fullName ? true : undefined}
                        aria-describedby={errors.fullName ? 'course-inquiry-fullname-error' : undefined}
                        placeholder="e.g. Aarav Sharma"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-paper border ${
                          errors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-border'
                        } focus:outline-hidden focus:ring-2 focus:ring-navy/20 focus:border-navy`}
                      />
                      {errors.fullName && (
                        <p id="course-inquiry-fullname-error" role="alert" className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email & Phone Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-ink mb-1">
                          Email Address <span className="text-rose-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          aria-invalid={errors.email ? true : undefined}
                          aria-describedby={errors.email ? 'course-inquiry-email-error' : undefined}
                          placeholder="aarav@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-paper border ${
                            errors.email ? 'border-rose-500 bg-rose-50/20' : 'border-border'
                          } focus:outline-hidden focus:ring-2 focus:ring-navy/20 focus:border-navy`}
                        />
                        {errors.email && (
                          <p id="course-inquiry-email-error" role="alert" className="text-xs text-rose-600 mt-1">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-ink mb-1">
                          Phone / WhatsApp <span className="text-rose-600">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          aria-invalid={errors.phone ? true : undefined}
                          aria-describedby={errors.phone ? 'course-inquiry-phone-error' : undefined}
                          placeholder="98XXXXXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-paper border ${
                            errors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-border'
                          } focus:outline-hidden focus:ring-2 focus:ring-navy/20 focus:border-navy`}
                        />
                        {errors.phone && (
                          <p id="course-inquiry-phone-error" role="alert" className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Preferred Learning Mode */}
                    <div>
                      <label htmlFor="preferredMode" className="block text-xs font-bold text-ink mb-1">
                        Preferred Attendance Format
                      </label>
                      <select
                        id="preferredMode"
                        value={formData.preferredMode}
                        onChange={(e) => setFormData({ ...formData, preferredMode: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm bg-paper border border-border focus:outline-hidden focus:ring-2 focus:ring-navy/20 focus:border-navy cursor-pointer"
                      >
                        <option value="In-Person (Kathmandu Lab)">In-Person (Kathmandu Lab, Putalisadak)</option>
                        <option value="Online Live">Online Live (Interactive Video & Discord)</option>
                        <option value="Hybrid (Kathmandu Lab + Online)">Hybrid (Lab Access + Recorded Sessions)</option>
                      </select>
                    </div>

                    {/* Optional Message / Specific Questions */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label htmlFor="message" className="block text-xs font-bold text-ink">
                          Questions or Background (Optional)
                        </label>
                        <span className="text-xs text-ink-faint">
                          {formData.message.length} / 1000
                        </span>
                      </div>
                      <textarea
                        id="message"
                        rows={2}
                        maxLength={1000}
                        placeholder="Ask about batch timings, installments, or laptop requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-paper border border-border focus:outline-hidden focus:ring-2 focus:ring-navy/20 focus:border-navy resize-none"
                      />
                    </div>

                    {/* Privacy Notice & Consent Checkbox */}
                    <div>
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          id="course-inquiry-privacy"
                          checked={formData.privacyConsent}
                          aria-invalid={errors.privacyConsent ? true : undefined}
                          aria-describedby={errors.privacyConsent ? 'course-inquiry-privacy-error' : undefined}
                          onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                          className="mt-0.5 w-4 h-4 rounded border-border text-navy focus:ring-navy cursor-pointer"
                        />
                        <span className="text-xs text-ink-soft leading-snug">
                          I agree to be contacted by Navya Ed Tech regarding {course.title} admissions, fee installments in NPR, and upcoming batch dates. <span className="text-rose-600">*</span>
                        </span>
                      </label>
                      {errors.privacyConsent && (
                        <p id="course-inquiry-privacy-error" role="alert" className="text-xs text-rose-600 mt-1">{errors.privacyConsent}</p>
                      )}
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full justify-center"
                        disabled={isSubmitting}
                        leftIcon={
                          isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Send className="w-4 h-4 text-navy-mist" />
                          )
                        }
                      >
                        {isSubmitting ? 'Recording Inquiry...' : 'Submit Course Inquiry'}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-ink-faint pt-1">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-sage-ink" />
                        <span>Protected by anti-spam verification</span>
                      </span>
                      <span>Response within 24h</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
