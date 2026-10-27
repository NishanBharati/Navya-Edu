import React, { useEffect, useState, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Clock,
  MessageSquare,
  Mail,
  Phone,
  User,
  GraduationCap,
  Sunrise,
  Sunset,
  Compass,
  ShieldCheck,
  Sparkles,
  Check
} from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';
import { submitInquiry, InquirySubmissionResult } from '../../lib/inquiryService';
import { useSupabaseTable } from '../../lib/useSupabaseTable';
import { COURSES, LEGACY_COURSE_SLUGS } from '../../data/courses';
import type { Course } from '../../types';

interface AdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseSlug?: string;
  initialIntent?: 'enroll' | 'demo' | 'inquire';
}

const PREFERRED_MODES = [
  {
    id: 'Online Live (Morning)',
    label: 'Morning batch',
    sublabel: '7:00 to 8:30 AM',
    icon: Sunrise,
  },
  {
    id: 'Online Live (Evening)',
    label: 'Evening batch',
    sublabel: '5:00 to 6:30 PM',
    icon: Sunset,
  },
  {
    id: 'Flexible / Undecided',
    label: 'Flexible',
    sublabel: 'Discuss with Advisor',
    icon: Compass,
  },
];

export const AdvisorModal: React.FC<AdvisorModalProps> = ({
  isOpen,
  onClose,
  defaultCourseSlug = '',
  initialIntent = 'inquire',
}) => {
  const { items: courses } = useSupabaseTable<Course>('courses', { orderBy: 'title', ascending: true });
  const allCourses = useMemo(() => {
    if (courses && courses.length > 0) {
      const active = courses.filter((c) => !LEGACY_COURSE_SLUGS.has(c.slug));
      if (active.length > 0) return active;
    }
    return COURSES;
  }, [courses]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedCourse: defaultCourseSlug,
    preferredMode: 'Online Live (Morning)',
    message: '',
    website_hp: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquirySubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        interestedCourse: defaultCourseSlug || prev.interestedCourse || (allCourses[0]?.slug ?? ''),
      }));
    }
  }, [isOpen, defaultCourseSlug, allCourses]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);

    // Honeypot spam protection
    if (formData.website_hp) {
      console.warn('[AdvisorModal] Bot submission dropped.');
      setIsSubmitted(true);
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

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setSubmitError('Please provide your full name (minimum 2 characters).');
      return;
    }

    const cleanPhone = formData.phone.replace(/[\s\-()]/g, '');
    if (!cleanPhone || cleanPhone.length < 7) {
      setSubmitError('Please provide a valid phone or WhatsApp number (e.g. 98XXXXXXXX).');
      return;
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setSubmitError('Please check the email address, or leave it blank.');
      return;
    }

    setIsSubmitting(true);

    try {
      const intentLabel = { demo: 'Free demo class request', enroll: 'Enrollment request', inquire: 'General inquiry' }[initialIntent];
      const fullNotes = [intentLabel, formData.message.trim()].filter(Boolean).join(' | ');

      const result = await submitInquiry({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        interestedCourse: formData.interestedCourse,
        preferredMode: formData.preferredMode,
        message: fullNotes,
        source: `Advisor Modal (${initialIntent})`,
      });

      if (!result.success && result.errorMessage) {
        setSubmitError(result.errorMessage);
        return;
      }

      setSubmissionResult(result);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Unable to complete submission. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionResult(null);
    onClose();
  };

  const selectedCourseObj = allCourses.find((c) => c.slug === formData.interestedCourse);

  const getCtaLabel = () => {
    if (isSubmitting) return 'Submitting Request...';
    if (initialIntent === 'demo') return 'Request Free Demo Class';
    if (initialIntent === 'enroll') return 'Reserve Your Place';
    return 'Get Free Counseling & Syllabus';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidthClass="max-w-2xl" labelledBy="advisor-modal-title">
      {/* Executive Dark Navy Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0D1D2E] via-[#17324D] to-[#1E436A] text-white p-6 sm:p-7 border-b border-navy-light/40">
        {/* Subtle Ambient Radial Glow */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 bg-blue-400/15 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-1/4 w-48 h-24 bg-sage/20 rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Advisor Modal"
          className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-stone-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/10 focus-visible:ring-2 focus-visible:ring-white z-10 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Top Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-2.5 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/10 text-navy-mist border border-white/10">
            {initialIntent === 'demo' ? (
              <>
                <Sparkles className="w-3 h-3 text-amber-300" />
                <span>Free Demo Session</span>
              </>
            ) : initialIntent === 'enroll' ? (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-blue-300" />
                <span>Cohort Admissions</span>
              </>
            ) : (
              <>
                <BookOpen className="w-3 h-3 text-navy-mist" />
                <span>Admissions & Advisory Desk</span>
              </>
            )}
          </div>

          {/* Active Counselor Tag */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/70 border border-emerald-500/30 text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Advisors Online • Fast Response</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="relative z-10 max-w-xl">
          <h3 id="advisor-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {initialIntent === 'demo'
              ? 'Book a Free Interactive Demo Class'
              : initialIntent === 'enroll'
              ? 'Enroll Now — Reserve Your Place'
              : 'Talk to an Education Advisor'}
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 mt-1.5 leading-relaxed">
            {initialIntent === 'demo'
              ? 'Join a live online class, meet senior engineering faculty mentors, and explore live project architectures before enrolling.'
              : initialIntent === 'enroll'
              ? 'Complete priority registration to secure your place in the upcoming live online batch.'
              : 'Get personalized guidance on batch schedules, syllabus walk-throughs, career placement paths, and scholarship eligibility.'}
          </p>
        </div>
      </div>

      {/* Modal Body Container with Smooth Scroll for Mobile */}
      <div className="max-h-[calc(88vh-140px)] overflow-y-auto p-5 sm:p-7 bg-paper-alt/30">
        {isSubmitted ? (
          /* Confirmation State */
          <div className="py-4 sm:py-6 text-center" role="status" aria-live="polite">
            <div className="relative w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4 border-2 border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-2xl font-bold text-ink">Inquiry Confirmed!</h4>
            <p className="text-sm text-ink-soft mt-1.5 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="font-semibold text-ink">{formData.fullName}</span>. An education advisor has been assigned to your request and will reach out via WhatsApp / Call.
            </p>

            {/* Selected Snapshot Card */}
            <div className="mt-5 p-4 rounded-xl bg-white border border-border text-left shadow-xs space-y-2.5 max-w-md mx-auto text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <span className="text-ink-muted">Selected Program</span>
                <span className="font-semibold text-ink text-right">
                  {selectedCourseObj ? selectedCourseObj.title : formData.interestedCourse}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <span className="text-ink-muted">Preferred Mode</span>
                <span className="font-semibold text-navy bg-navy/5 px-2 py-0.5 rounded">
                  {formData.preferredMode}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-border/60">
                <span className="text-ink-muted">Contact Info</span>
                <span className="font-medium text-ink">
                  {formData.phone} • {formData.email}
                </span>
              </div>
              <div className="flex justify-between items-center text-emerald-700 font-medium pt-0.5">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Expected Response:
                </span>
                <span>Within 2 business hours</span>
              </div>
            </div>

            {/* 3-Step What Happens Next */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-border max-w-md mx-auto text-left">
              <p className="text-xs font-bold text-ink uppercase tracking-wider mb-3">
                What happens next?
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-ink block">Inquiry Logged & Queued</span>
                    <span className="text-ink-muted">Your profile is sent directly to our admissions team.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-navy/10 text-navy font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-ink block">Advisor Review</span>
                    <span className="text-ink-muted">We verify batch availability, timing, and prerequisites.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-5 h-5 rounded-full bg-navy/10 text-navy font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-ink block">Syllabus & Consultation Dispatch</span>
                    <span className="text-ink-muted">You receive the full curriculum guide via WhatsApp or email.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant Contact Hotline */}
            {submissionResult && (
              <div className="mt-5 p-4 rounded-xl bg-paper-alt border border-border-warm max-w-md mx-auto text-left space-y-2.5">
                <p className="text-xs font-semibold text-ink flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Need immediate confirmation or a place reserved?
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href={submissionResult.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Admissions</span>
                  </a>
                  <a
                    href={submissionResult.mailtoUrl}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Direct Admissions Email</span>
                  </a>
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center">
              <Button variant="primary" size="md" onClick={handleReset}>
                Done & Close Window
              </Button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Group 1: Contact Information */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border-soft">
                <span className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-navy" />
                  1. Contact Information
                </span>
                <span className="text-xs text-ink-muted">Fields with <span className="text-red-500">*</span> are required</span>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="advisor-fullname" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="advisor-fullname"
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-input-border bg-white text-ink text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                  />
                </div>
              </div>

              {/* Phone & Email 2-column */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label htmlFor="advisor-phone" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex">
                    <div className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-input-border bg-paper text-ink-soft text-xs font-semibold select-none">
                      <span>🇳🇵 +977</span>
                    </div>
                    <input
                      id="advisor-phone"
                      type="tel"
                      required
                      placeholder="98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-3 pr-3 py-2.5 rounded-r-lg border border-input-border bg-white text-ink text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                    />
                  </div>
                  <p className="text-xs text-ink-muted mt-1">We send batch guides & PDFs via WhatsApp</p>
                </div>

                <div>
                  <label htmlFor="advisor-email" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                    Email <span className="normal-case font-normal text-ink-muted">(optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="advisor-email"
                      type="email"
                      placeholder="aarav@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-input-border bg-white text-ink text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all"
                    />
                  </div>
                  <p className="text-xs text-ink-muted mt-1">For the syllabus and fee details</p>
                </div>
              </div>
            </div>

            {/* Group 2: Course & Learning Format */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border-soft">
                <span className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-navy" />
                  2. Course & Batch
                </span>
                {selectedCourseObj && (
                  <span className="text-xs font-semibold text-navy bg-navy/5 px-2 py-0.5 rounded">
                    Duration: {selectedCourseObj.duration}
                  </span>
                )}
              </div>

              {/* Course Dropdown */}
              <div>
                <label htmlFor="advisor-course" className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Course <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ink-muted">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <select
                    id="advisor-course"
                    value={formData.interestedCourse}
                    onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                    className="w-full pl-10 pr-8 py-2.5 rounded-lg border border-input-border bg-white text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all appearance-none cursor-pointer"
                  >
                    {allCourses.map((course) => (
                      <option key={course.slug} value={course.slug}>
                        {course.title} ({course.duration})
                      </option>
                    ))}
                    <option value="general-counseling">Not sure yet, help me choose</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-ink-muted text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* Preferred Mode: Tactile Segmented Cards */}
              <div>
                <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-1.5">
                  Preferred Batch Time (Live Online)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {PREFERRED_MODES.map((mode) => {
                    const isSelected = formData.preferredMode === mode.id;
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredMode: mode.id })}
                        className={`flex items-center sm:flex-col sm:items-start p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-navy bg-navy/5 ring-1 ring-navy text-navy shadow-xs'
                            : 'border-input-border bg-white hover:border-navy/40 text-ink-soft hover:bg-paper-alt/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:mb-1 w-full justify-between">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-navy' : 'text-ink-muted'}`} />
                          {isSelected && <Check className="w-3.5 h-3.5 text-navy shrink-0" />}
                        </div>
                        <div className="ml-2 sm:ml-0">
                          <div className="text-xs font-bold text-ink leading-tight">{mode.label}</div>
                          <div className="text-xs text-ink-muted leading-tight mt-0.5">{mode.sublabel}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Group 3: Optional note */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-border shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-border-soft">
                <label htmlFor="advisor-message" className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-navy" />
                  3. Anything we should know? (Optional)
                </label>
                <span className="text-xs text-ink-muted">{formData.message.length}/500</span>
              </div>

              <textarea
                id="advisor-message"
                rows={2}
                maxLength={500}
                placeholder="e.g. my child's age, questions about fees, or a preferred demo day"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-input-border bg-white text-ink text-sm placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all resize-none"
              />
            </div>

            {/* Honeypot field for anti-spam (invisible) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="advisor_website_hp">Leave blank</label>
              <input
                type="text"
                id="advisor_website_hp"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
              />
            </div>

            {/* Submission Error Banner */}
            {submitError && (
              <div
                role="alert"
                className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Actions Bar with Security Reassurance */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3.5">
              <div className="flex items-center gap-2 text-xs text-ink-muted">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  By submitting, you agree to be contacted about this inquiry. See our{' '}
                  <a href="/privacy" className="underline hover:text-ink">Privacy Policy</a>.
                </span>
              </div>

              <div className="w-full sm:w-auto flex items-center gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                  className="w-full sm:w-auto shadow-md shadow-navy/15 hover:shadow-lg hover:shadow-navy/20"
                  rightIcon={!isSubmitting ? <ArrowRight className="w-4 h-4" /> : undefined}
                >
                  {getCtaLabel()}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

