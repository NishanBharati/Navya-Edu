import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  Compass,
  Phone,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Send,
  Loader2
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { getBreadcrumbSchema, getEducationalOrganizationSchema, getFAQSchema } from '../utils/structuredData';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { supabase } from '../lib/supabaseClient';
import { submitInquiry, InquirySubmissionResult } from '../lib/inquiryService';
import { useSupabaseTable } from '../lib/useSupabaseTable';
import { motion, useReducedMotion } from 'framer-motion';
import {
  fadeUp,
  scaleIn,
  staggerContainer,
  heroStaggerContainer,
  heroEyebrow,
  heroHeadline,
  heroParagraph,
  bentoCardVariant,
  VIEWPORT_ONCE,
  getMotionVariants
} from '../lib/motion';
import { StatCounterRow, StatItem } from '../components/common/StatCounter';
import { IconStrip, IconStripItem } from '../components/common/IconStrip';
import { MeshCTABanner } from '../components/common/MeshCTABanner';
import { HeroImageWithParallax } from '../components/common/HeroImageWithParallax';
import { HeroLiveIndicator } from '../components/common/HeroLiveIndicator';
import { COURSES, LEGACY_COURSE_SLUGS } from '../data/courses';
import type { Course, FAQItem } from '../types';

/**
 * Floating-label input with subtle focus glow & validation feedback
 */
interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  label,
  value,
  error,
  required,
  onFocus,
  onBlur,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative">
      <input
        id={id}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        placeholder=" "
        className={`w-full pt-5 pb-2 px-4 rounded-xl border bg-paper text-ink text-xs sm:text-sm transition-all duration-200 outline-none ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15 bg-red-50/20'
            : 'border-input-border focus:border-navy focus:ring-4 focus:ring-navy/10 focus:bg-white shadow-2xs'
        } ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
          isFloating
            ? 'top-1.5 text-xs font-mono uppercase tracking-wider text-navy font-bold'
            : 'top-3.5 text-xs sm:text-sm text-ink-faint'
        } ${error && !isFocused ? 'text-red-500' : ''}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

/**
 * Floating-label textarea with focus glow
 */
interface FloatingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
}

const FloatingTextarea: React.FC<FloatingTextareaProps> = ({
  id,
  label,
  value,
  error,
  required,
  onFocus,
  onBlur,
  className = '',
  rows = 3,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        value={value}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        placeholder=" "
        className={`w-full pt-6 pb-2 px-4 rounded-xl border bg-paper text-ink text-xs sm:text-sm transition-all duration-200 outline-none resize-none ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-400/15 bg-red-50/20'
            : 'border-input-border focus:border-navy focus:ring-4 focus:ring-navy/10 focus:bg-white shadow-2xs'
        } ${className}`}
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
          isFloating
            ? 'top-1.5 text-xs font-mono uppercase tracking-wider text-navy font-bold'
            : 'top-3.5 text-xs sm:text-sm text-ink-faint'
        } ${error && !isFocused ? 'text-red-500' : ''}`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

/**
 * Floating select field with focus ring animation
 */
interface FloatingSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  children: React.ReactNode;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({ id, label, children, ...props }) => (
  <div className="relative">
    <label
      htmlFor={id}
      className="absolute left-4 top-1.5 text-xs font-mono uppercase tracking-wider text-navy font-bold pointer-events-none z-10"
    >
      {label}
    </label>
    <select
      id={id}
      className="w-full pt-5 pb-2 px-4 rounded-xl border border-input-border bg-paper text-ink text-xs sm:text-sm focus:border-navy focus:ring-4 focus:ring-navy/10 focus:bg-white transition-all duration-200 outline-none shadow-2xs cursor-pointer"
      {...props}
    >
      {children}
    </select>
  </div>
);




export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();

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
    interestedCourse: 'web-development',
    preferredMode: 'Classroom (Kathmandu Campus)',
    preferredTime: 'Morning (7:00 AM – 9:00 AM)',
    experienceLevel: 'College Student / Recent Graduate',
    message: '',
    privacyConsent: false,
    website_hp: '' // Honeypot anti-spam field
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<InquirySubmissionResult | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-fill course and intent from URL query parameters (e.g. ?course=web-development&intent=demo)
  useEffect(() => {
    const courseParam = searchParams.get('course');
    const intentParam = searchParams.get('intent');

    if (courseParam) {
      const matched = allCourses.find((c) => c.slug === courseParam);
      const courseTitle = matched ? matched.title : courseParam;

      setFormData((prev) => ({
        ...prev,
        interestedCourse: courseParam,
        message: intentParam === 'demo'
          ? `Hello, I would like to book a free demo class for the ${courseTitle} track.`
          : intentParam === 'enroll'
          ? `Hello, I would like to enroll in the upcoming cohort for ${courseTitle}. Please share the fee schedule and registration process.`
          : prev.message
      }));
    }
  }, [searchParams, allCourses]);

  // Client-side validator per field
  const validateField = (field: string, value: string | boolean): string => {
    switch (field) {
      case 'fullName':
        if (typeof value !== 'string' || !value.trim()) return 'Full Name is required.';
        if (value.trim().length < 2) return 'Full Name must be at least 2 characters.';
        if (value.trim().length > 100) return 'Full Name must not exceed 100 characters.';
        return '';
      case 'email':
        if (typeof value !== 'string' || !value.trim()) return 'Email address is required.';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@domain.com).';
        }
        return '';
      case 'phone':
        if (typeof value !== 'string' || !value.trim()) return 'Phone number is required.';
        const cleanPhone = value.replace(/[\s-]/g, '');
        if (!/^(?:\+?977[- ]?)?(?:9[6-8]\d{8}|01[- ]?\d{7}|\d{10})$/.test(cleanPhone)) {
          return 'Please enter a valid 10-digit mobile number (e.g. 98XXXXXXXX).';
        }
        return '';
      case 'message':
        if (typeof value !== 'string' || !value.trim()) return 'Please enter your message or questions.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        if (value.trim().length > 2000) return 'Message must not exceed 2000 characters.';
        return '';
      case 'privacyConsent':
        if (!value) return 'You must agree to the privacy notice to submit an inquiry.';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field as keyof typeof formData]);
    setFormErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setFormErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-clicks
    setSubmitError(null);

    // 1. Bot Honeypot detection
    if (formData.website_hp) {
      console.warn('[Contact] Spam bot honeypot triggered.');
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

    // Validate all fields
    const errors: Record<string, string> = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: validateField('message', formData.message),
      privacyConsent: validateField('privacyConsent', formData.privacyConsent),
    };

    setTouched({
      fullName: true,
      email: true,
      phone: true,
      message: true,
      privacyConsent: true,
    });
    setFormErrors(errors);

    const hasError = Object.values(errors).some((err) => Boolean(err));
    if (hasError) {
      return;
    }

    setIsSubmitting(true);

    const detailedMessage = [
      `Experience Level: ${formData.experienceLevel}`,
      `Preferred Timing: ${formData.preferredTime}`,
      formData.message ? `Notes: ${formData.message}` : ''
    ].filter(Boolean).join('\n');

    try {
      const result = await submitInquiry({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        interestedCourse: formData.interestedCourse,
        preferredMode: formData.preferredMode,
        message: detailedMessage,
        source: 'Contact Page',
      });

      if (!result.success && result.errorMessage) {
        setSubmitError(result.errorMessage);
        return;
      }

      setSubmissionResult(result);
      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong submitting your inquiry. Your message has been retained.');
    } finally {
      setIsSubmitting(false);
    }
  };



  const prefersReducedMotion = useReducedMotion();

  const heroTrustStats: StatItem[] = [
    {
      rawDisplay: '1-on-1',
      label: 'Direct Consultation',
      description: 'Zero obligation career mapping with senior software faculty',
      badge: 'Zero Cost',
      icon: <Compass className="w-4 h-4 text-navy" />
    },
    {
      numericValue: 24,
      suffix: 'hr',
      label: 'Advisory SLA',
      description: 'Guaranteed counselor response within 1 business day',
      badge: 'Verified',
      icon: <Clock className="w-4 h-4 text-blue" />
    },
    {
      rawDisplay: 'Hybrid',
      label: 'Kathmandu & Online',
      description: 'Putalisadak physical lab + interactive daily live streams',
      badge: 'Dual Mode',
      icon: <Building2 className="w-4 h-4 text-sage-ink" />
    }
  ];

  const mapFacilityStrip: IconStripItem[] = [
    {
      icon: <MapPin className="w-4 h-4 text-blue" />,
      label: 'Campus Address',
      description: 'Putalisadak IT Corridor (Opp. Kathmandu Plaza), Ward 28, Kathmandu',
      tag: 'Physical Lab'
    },
    {
      icon: <Compass className="w-4 h-4 text-sage" />,
      label: 'Transit Access',
      description: '5-minute walk from Ratnapark, City Center & Old Bus Park hubs',
      tag: 'Transit'
    },
    {
      icon: <Clock className="w-4 h-4 text-amber" />,
      label: 'Facility Schedule',
      description: 'Sun – Fri: 7:00 AM – 7:00 PM • Developer Workstations Open Daily',
      tag: 'Hours'
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: 'Can I attend a free demo or trial session before enrolling?',
      answer: 'Yes! We encourage prospective students to schedule a free trial session or visit our Kathmandu campus to experience the teaching methodology, inspect the lab environment, and speak directly with instructors.'
    },
    {
      question: 'What are the fee payment options and installment plans in NPR?',
      answer: 'All course fees are priced transparently in Nepalese Rupees (NPR). We offer flexible 2 to 3 milestone installment plans structured across the training duration, allowing students to pay comfortably without upfront financial stress.'
    },
    {
      question: 'What happens if I miss a live classroom or online lecture?',
      answer: 'Every lecture includes structured code repositories, step-by-step documentation, and recorded backup sessions. Students also receive dedicated 1-on-1 lab mentor hours to resolve any doubts or blockers.'
    }
  ];

  return (
    <main className="min-h-screen text-ink">
      <SEOHead
        title="Contact Admissions & Academic Advisory | Navya Ed Tech Nepal"
        description="Connect with academic advisors at Navya Ed Tech Kathmandu. Ask about upcoming batch dates, syllabus outlines, fees in NPR, campus visits, or demo classes."
        keywords="contact Navya Ed Tech, IT training Kathmandu address, computer institute Putalisadak, admissions counselor Nepal, IT course fees Nepal"
        structuredData={[
          getEducationalOrganizationSchema(),
          getBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Contact Us', path: '/contact' },
          ]),
          getFAQSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION & VALUE PROPOSITION (Warm Paper Ground) */}
      {/* ========================================================================= */}
      <section className="pt-8 pb-14 sm:pb-16 bg-paper border-b border-border-soft overflow-hidden">
        <Container>
          <div className="mb-6">
            <Breadcrumbs items={[{ label: 'Contact & Advisory Desk' }]} />
          </div>

          <motion.div
            variants={prefersReducedMotion ? undefined : heroStaggerContainer}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                variants={prefersReducedMotion ? undefined : heroEyebrow}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-navy/5 border border-navy/15 text-xs font-semibold tracking-wider text-navy uppercase"
              >
                <Compass className="w-3.5 h-3.5 text-blue" />
                <span>Admissions & Academic Advisory Desk</span>
                <HeroLiveIndicator color="sage" />
                <span className="text-sage-ink font-medium">Live Counseling Open</span>
              </motion.div>

              <div className="space-y-3">
                <motion.h1
                  variants={prefersReducedMotion ? undefined : heroHeadline}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-[1.12]"
                >
                  Let&apos;s Shape Your Software Career.
                </motion.h1>
                <motion.p
                  variants={prefersReducedMotion ? undefined : heroParagraph}
                  className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl"
                >
                  Have questions regarding upcoming batch schedules, course prerequisites, syllabus modules, or installment fee plans in NPR? Connect directly with our Kathmandu admissions team or book a free trial class.
                </motion.p>
              </div>

              {/* Variant C: Dynamic High-Credibility Stat & Counter Row */}
              <div className="pt-2">
                <StatCounterRow stats={heroTrustStats} />
              </div>
            </div>

            {/* Right Visual Composition with Parallax Overlaid Card */}
            <div className="lg:col-span-5 relative">
              <HeroImageWithParallax
                src="/images/heroes/contact-hero.jpg"
                alt="Academic advisory lounge at Navya EdTech in Kathmandu"
                heightClass="h-[320px] sm:h-[380px]"
                priority={true}
                overlayBadgeTop={
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-sm text-xs font-bold text-navy">
                    <HeroLiveIndicator color="sage" />
                    <span>Kathmandu Advisory Lounge</span>
                  </div>
                }
                overlayCardBottom={
                  <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-ink">Admissions Counseling</p>
                      <p className="text-xs text-ink-soft">Putalisadak, Kathmandu • Call / WhatsApp</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-navy text-white shrink-0">
                      Open Now
                    </span>
                  </div>
                }
              />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN GRID: INQUIRY FORM + DIRECT CHANNELS & INFORMATION (Clean White Ground) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-surface-white border-b border-border-soft">
        <Container>
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10"
          >
          {/* Left Column: Comprehensive Contact Form with Floating Labels & Animated States */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-sm">
            {isSubmitted ? (
              <motion.div
                role="status"
                aria-live="polite"
                variants={prefersReducedMotion ? undefined : scaleIn}
                initial={prefersReducedMotion ? false : 'hidden'}
                animate="visible"
                className="text-center py-10 sm:py-16 space-y-6"
              >
                <div className="relative w-16 h-16 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping opacity-75" />
                  <div className="relative w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-emerald-700 block">
                    Inquiry Successfully Registered
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
                    Thank You, {formData.fullName}!
                  </h2>
                  <p className="text-xs sm:text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
                    Our education advisor has received your details and will reach out at <strong className="text-ink">{formData.phone || formData.email}</strong> within 1 business day with the complete syllabus PDF, fee schedule, and demo class link.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-paper border border-border max-w-md mx-auto text-left text-xs space-y-2 text-ink-soft shadow-2xs">
                  <span className="font-bold text-ink block border-b border-border-faint pb-1.5 font-mono text-xs uppercase tracking-wider">
                    Registration Summary:
                  </span>
                  <div className="flex justify-between">
                    <span>Course of Interest:</span>
                    <strong className="text-ink capitalize">{formData.interestedCourse.replace(/-/g, ' ')}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Learning Mode:</span>
                    <strong className="text-ink">{formData.preferredMode}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Batch Time:</span>
                    <strong className="text-ink">{formData.preferredTime}</strong>
                  </div>
                  {submissionResult && (
                    <div className="pt-2 border-t border-border-faint flex items-center justify-between text-xs">
                      <span className="text-ink-faint">Storage Status:</span>
                      {submissionResult.cloudSynced ? (
                        <span className="px-2 py-0.5 rounded-md font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1 font-mono">
                          <CheckCircle2 className="w-3 h-3" /> Cloud Synced
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md font-medium bg-amber-50 text-amber-800 border border-amber-200 inline-flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" /> Queued Locally
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Instant Direct Channel Dispatch */}
                {submissionResult && (
                  <div className="p-4 rounded-2xl bg-paper-alt border border-border-warm max-w-md mx-auto space-y-2.5">
                    <p className="text-xs font-semibold text-ink text-left">
                      Need immediate assistance from our admissions desk?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <a
                        href={submissionResult.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                      <a
                        href={submissionResult.mailtoUrl}
                        className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Direct Email</span>
                      </a>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmissionResult(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        interestedCourse: 'web-development',
                        preferredMode: 'Classroom (Kathmandu Campus)',
                        preferredTime: 'Morning (7:00 AM – 9:00 AM)',
                        experienceLevel: 'College Student / Recent Graduate',
                        message: '',
                        privacyConsent: false,
                        website_hp: ''
                      });
                      setTouched({});
                      setFormErrors({});
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-ink flex items-center gap-2">
                    <Send className="w-5 h-5 text-blue" />
                    <span>Send an Academic Inquiry or Book a Demo</span>
                  </h2>
                  <p className="text-xs text-ink-soft mt-1">
                    Fill in your contact info to receive official course brochures, fee installment options in NPR, and upcoming cohort start dates.
                  </p>
                </div>

                {/* Full Name (Floating Label) */}
                <FloatingInput
                  id="contact-fullname"
                  name="fullName"
                  type="text"
                  required
                  label="Full Name"
                  value={formData.fullName}
                  error={touched.fullName ? formErrors.fullName : undefined}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={() => handleBlur('fullName')}
                />

                {/* Email & Phone (Floating Labels) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingInput
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    label="Email Address"
                    value={formData.email}
                    error={touched.email ? formErrors.email : undefined}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />

                  <FloatingInput
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    label="Phone / WhatsApp"
                    value={formData.phone}
                    error={touched.phone ? formErrors.phone : undefined}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                  />
                </div>

                {/* Course Selection & Learning Mode */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingSelect
                    id="contact-course"
                    label="Course of Interest"
                    value={formData.interestedCourse}
                    onChange={(e) => handleChange('interestedCourse', e.target.value)}
                  >
                    {allCourses.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title} ({c.duration})
                      </option>
                    ))}
                    <option value="general-it-career-counseling">General IT Career Counseling (Free)</option>
                    <option value="corporate-training-inquiry">Corporate / Team Training</option>
                  </FloatingSelect>

                  <FloatingSelect
                    id="contact-mode"
                    label="Preferred Learning Mode"
                    value={formData.preferredMode}
                    onChange={(e) => handleChange('preferredMode', e.target.value)}
                  >
                    <option value="Classroom (Kathmandu Campus)">Classroom (Kathmandu Campus)</option>
                    <option value="Online Live Interactive">Online Live (Interactive via Meet/Zoom)</option>
                    <option value="Hybrid (Classroom + Online)">Hybrid (Classroom + Online)</option>
                    <option value="Undecided">Undecided / Discuss with Advisor</option>
                  </FloatingSelect>
                </div>

                {/* Batch Timing & Experience Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingSelect
                    id="contact-time"
                    label="Preferred Batch Timing"
                    value={formData.preferredTime}
                    onChange={(e) => handleChange('preferredTime', e.target.value)}
                  >
                    <option value="Morning (7:00 AM – 9:00 AM)">Morning (7:00 AM – 9:00 AM)</option>
                    <option value="Day (11:00 AM – 1:00 PM)">Day (11:00 AM – 1:00 PM)</option>
                    <option value="Evening (5:00 PM – 7:00 PM)">Evening (5:00 PM – 7:00 PM)</option>
                    <option value="Weekend Intensive">Weekend Intensive Batch</option>
                    <option value="Flexible">Flexible / Discuss Available Slots</option>
                  </FloatingSelect>

                  <FloatingSelect
                    id="contact-level"
                    label="Current Background / Level"
                    value={formData.experienceLevel}
                    onChange={(e) => handleChange('experienceLevel', e.target.value)}
                  >
                    <option value="College Student / Recent Graduate">College Student (BSc.CSIT, BCA, BIT, BE)</option>
                    <option value="Absolute Beginner / Non-Tech">Absolute Beginner (No coding experience)</option>
                    <option value="Self-Taught Developer">Self-Taught Developer (Knows basics)</option>
                    <option value="Working Professional">Working Professional / Career Switcher</option>
                  </FloatingSelect>
                </div>

                {/* Message / Questions (Floating Textarea) */}
                <FloatingTextarea
                  id="contact-message"
                  name="message"
                  required
                  rows={3}
                  maxLength={2000}
                  label="Specific Questions, Goals, or Demo Class Request"
                  value={formData.message}
                  error={touched.message ? formErrors.message : undefined}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                />

                {/* Honeypot field for anti-spam (hidden from human users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="contact_website_hp">Leave this field blank</label>
                  <input
                    type="text"
                    id="contact_website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp}
                    onChange={(e) => handleChange('website_hp', e.target.value)}
                  />
                </div>

                {/* Privacy Notice & Consent Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      id="contact-privacy"
                      name="privacyConsent"
                      aria-invalid={Boolean(touched.privacyConsent && formErrors.privacyConsent)}
                      aria-describedby={touched.privacyConsent && formErrors.privacyConsent ? 'contact-consent-error' : undefined}
                      checked={formData.privacyConsent}
                      onChange={(e) => handleChange('privacyConsent', e.target.checked)}
                      onBlur={() => handleBlur('privacyConsent')}
                      className="mt-0.5 w-4 h-4 rounded border-input-border text-navy focus:ring-navy cursor-pointer"
                    />
                    <span className="text-xs text-ink-soft leading-snug">
                      I agree to be contacted by Navya Ed Tech regarding course curriculum, batch timetables, and admissions advisory. We respect your privacy and never share your data. <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {touched.privacyConsent && formErrors.privacyConsent && (
                    <p id="contact-consent-error" role="alert" className="mt-1.5 text-xs font-medium text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{formErrors.privacyConsent}</span>
                    </p>
                  )}
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-ink-faint flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-sage-ink" />
                    <span>Official counseling desk. All fees quoted in NPR with zero hidden surcharges.</span>
                  </span>

                  {/* Animated Submit Button with Loading Spinner & Hover States */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={isSubmitting || prefersReducedMotion ? {} : { scale: 1.02 }}
                    whileTap={isSubmitting || prefersReducedMotion ? {} : { scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Registering Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Direct Channels & Campus Details (Entrance Stagger) */}
          <motion.div
            variants={prefersReducedMotion ? undefined : staggerContainer(0.12, 0.06)}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="lg:col-span-5 space-y-6"
          >
            {/* Campus & Admissions Information */}
            <motion.div
              variants={prefersReducedMotion ? undefined : bentoCardVariant}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-border shadow-sm space-y-6"
            >
              <h2 className="text-lg font-extrabold text-ink">
                Kathmandu Admissions & Direct Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-ink-soft">
                {/* Physical Location */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5 text-blue" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="text-ink block text-sm">Training Campus & Labs:</strong>
                    <span>Putalisadak (IT Corridor), Ward 28, Kathmandu 44600, Bagmati Province, Nepal</span>
                    <span className="block text-xs text-ink-faint mt-0.5">
                      Opposite Kathmandu Plaza. 5-minute walk from City Center and Ratnapark.
                    </span>
                  </div>
                </div>

                {/* Direct Phone Links */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4.5 h-4.5 text-blue" />
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <strong className="text-ink block text-sm">Direct Telephone Desk:</strong>
                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-x-3 gap-y-1 min-w-0 max-w-full">
                      <a
                        href="tel:+9779800000000"
                        className="inline-flex flex-wrap items-center min-h-[36px] py-1 text-navy hover:text-blue font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded break-words"
                        title="Click to call mobile admissions desk"
                      >
                        <span>+977 980-0000000</span>
                        <span className="ml-1 text-xs font-mono text-ink-faint">(Mobile / WhatsApp)</span>
                      </a>
                      <span className="hidden sm:inline text-ink-faint">•</span>
                      <a
                        href="tel:+97714400000"
                        className="inline-flex flex-wrap items-center min-h-[36px] py-1 text-navy hover:text-blue font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded break-words"
                        title="Click to call landline desk"
                      >
                        <span>+977 1-4400000</span>
                        <span className="ml-1 text-xs font-mono text-ink-faint">(Desk)</span>
                      </a>
                    </div>
                    <span className="block text-xs text-ink-faint">
                      Speak directly with an education counselor (7:00 AM – 7:00 PM).
                    </span>
                  </div>
                </div>

                {/* WhatsApp Quick Connect */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="text-ink block text-sm">WhatsApp Consultation:</strong>
                    <span>Instant chat with admissions counselor</span>
                    <a
                      href="https://wa.me/9779800000000?text=Hello%20Navya%20EdTech%2C%20I%20would%20like%20to%20inquire%20about%20IT%20courses%20and%20upcoming%20batches"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 mt-1"
                    >
                      <span>Open WhatsApp Chat</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Email Channels */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4.5 h-4.5 text-blue" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <strong className="text-ink block text-sm">Direct Email Desk:</strong>
                    <div className="space-y-1 mt-0.5 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                        <a
                          href="mailto:info@navyaedtech.com"
                          className="text-navy hover:underline font-semibold text-xs sm:text-sm break-all"
                        >
                          info@navyaedtech.com
                        </a>
                        <span className="text-ink-faint text-xs shrink-0">(General Inquiries)</span>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                        <a
                          href="mailto:admissions@navyaedtech.com"
                          className="text-navy hover:underline font-semibold text-xs sm:text-sm break-all"
                        >
                          admissions@navyaedtech.com
                        </a>
                        <span className="text-ink-faint text-xs shrink-0">(Syllabus & Fees)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advisory Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4.5 h-4.5 text-blue" />
                  </div>
                  <div>
                    <strong className="text-ink block text-sm">Advisory & Visiting Hours:</strong>
                    <span>Sunday – Friday: 7:00 AM – 7:00 PM (NPT)</span>
                    <span className="block text-xs text-ink-faint mt-0.5">
                      Saturday: 9:00 AM – 3:00 PM (Trial demo sessions & lab tours by appointment)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Parent Organization Link Card */}
            <motion.div
              variants={prefersReducedMotion ? undefined : bentoCardVariant}
              className="p-6 rounded-2xl sm:rounded-3xl bg-paper-alt border border-border-warm space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue block font-mono">
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
                className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-blue transition-colors group/parent"
              >
                <span>Visit navyaedtech.com</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/parent:translate-x-0.5 group-hover/parent:-translate-y-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>

      {/* ========================================================================= */}
      {/* 3. CAMPUS LOCATION & EMBEDDED GOOGLE MAP (Warm Cream Ground) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-paper-alt border-b border-border">
        <Container>
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-sm space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue font-mono">
                  <MapPin className="w-4 h-4 text-blue" />
                  <span>Physical Campus • Bagmati Province, Nepal</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                  Visit Our Kathmandu Innovation Lab
                </h2>
                <p className="text-xs sm:text-sm text-ink-soft max-w-2xl">
                  Located in the Putalisadak IT Corridor, our physical center is easily accessible via public and private transport. Walk in for classroom tours, workstation inspections, or in-person career counseling.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <a
                  href="https://maps.google.com/?q=Putalisadak+IT+Corridor+Kathmandu+Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-light transition-all shadow-xs group/dir"
                >
                  <Compass className="w-3.5 h-3.5 text-sage" />
                  <span>Get Directions (Google Maps)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/dir:translate-x-0.5 group-hover/dir:-translate-y-0.5" />
                </a>
              </div>
            </div>

            {/* Embedded Responsive Google Maps Iframe (Animated Scale/Fade Reveal on Scroll) */}
            <motion.div
              variants={prefersReducedMotion ? undefined : scaleIn}
              initial={prefersReducedMotion ? false : 'hidden'}
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-inner relative w-full h-[360px] sm:h-[420px] bg-paper"
            >
              <iframe
                title="Navya Ed Tech Kathmandu Location Map - Putalisadak / IT Corridor, Kathmandu, Nepal"
                src="https://maps.google.com/maps?q=Putalisadak%20IT%20Corridor%2C%20Kathmandu%2C%20Nepal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </motion.div>

            {/* Variant A: Divided Horizontal Icon Strip (Zero bulky card borders) */}
            <div className="pt-2">
              <IconStrip items={mapFacilityStrip} />
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 4. ADMISSIONS FAQ ACCORDION SECTION (Clean White Ground) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-surface-white border-b border-border-soft">
        <Container>
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-border shadow-sm space-y-6"
          >
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue">
                <HelpCircle className="w-4 h-4 text-blue" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink leading-tight">
                Everything You Need to Know Before Enrolling
              </h2>
              <p className="text-xs sm:text-sm text-ink-soft">
                Clear, transparent answers to common student inquiries regarding admissions, class modes, and payment policies.
              </p>
            </div>

            <FAQAccordion items={faqs} className="border-t border-border-faint" />

            <div className="pt-4 border-t border-border-faint text-center">
              <a
                href="/faq"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-blue hover:text-navy transition-colors"
              >
                <span>Looking for curriculum prerequisites or certificate details? See all FAQs</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ========================================================================= */}
      {/* 5. CORPORATE & UNIVERSITY WORKSHOPS BANNER (Treatment 1: Ambient Mesh Gradient) */}
      {/* ========================================================================= */}
      <section className="py-14 sm:py-20 bg-paper">
        <Container>
          <MeshCTABanner
            badgeText="Institutional & Corporate Partnerships"
            badgeIcon={<Sparkles className="w-3.5 h-3.5 text-blue-light" />}
            title="Looking for Corporate Tech Upskilling or College Bootcamps?"
            description="We partner with software companies in Nepal for junior developer onboarding, as well as colleges (BSc.CSIT, BCA, BIT) for customized project sprints."
            primaryAction={{
              label: 'Explore Institutional Training',
              href: '/corporate-training',
              icon: <ArrowRight className="w-4 h-4" />,
            }}
            secondaryAction={{
              label: 'Contact Advisory Desk',
              href: 'mailto:admissions@navyaedtech.com',
              icon: <Mail className="w-4 h-4" />,
            }}
          />
        </Container>
      </section>
    </main>
  );
};
