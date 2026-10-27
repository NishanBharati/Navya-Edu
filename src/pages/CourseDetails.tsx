import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Course } from '../types';
import { COURSES, LEGACY_COURSE_SLUGS } from '../data/courses';

// Focused, High-Impact Course Components
import { CourseHero } from '../components/courses/CourseHero';
import { CourseStickyNav } from '../components/courses/CourseStickyNav';
import { CourseCurriculum } from '../components/courses/CourseCurriculum';
import { CourseProjects } from '../components/courses/CourseProjects';
import { CourseInstructor } from '../components/courses/CourseInstructor';
import { CourseEligibilityMatrix } from '../components/courses/CourseEligibilityMatrix';
import { CourseCertificate } from '../components/courses/CourseCertificate';
import { CourseFAQ } from '../components/courses/CourseFAQ';
import { CourseEnrollCTA } from '../components/courses/CourseEnrollCTA';

// Common Components
import { SEOHead } from '../components/common/SEOHead';
import { getCourseSchema, getBreadcrumbSchema, getFAQSchema } from '../utils/structuredData';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Loader2, CheckCircle2, Eye, ShieldAlert } from 'lucide-react';
import { downloadCourseSyllabus } from '../utils/pdfGenerator';
import { SITE_URL } from '../config/site';

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [advisorIntent, setAdvisorIntent] = useState<'enroll' | 'demo' | 'inquire'>('inquire');
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'downloaded'>('idle');

  const handleOpenAdvisor = (intent: 'enroll' | 'demo' | 'inquire' = 'inquire') => {
    setAdvisorIntent(intent);
    setIsAdvisorOpen(true);
  };

  const initialCourse = slug && !LEGACY_COURSE_SLUGS.has(slug) ? (COURSES.find((c) => c.slug === slug) ?? null) : null;
  const [course, setCourse] = useState<Course | null>(initialCourse);
  const [isLoading, setIsLoading] = useState(!initialCourse && !LEGACY_COURSE_SLUGS.has(slug || ''));

  useEffect(() => {
    let isActive = true;
    if (!initialCourse) {
      setIsLoading(true);
    }

    async function loadCourse() {
      if (slug && LEGACY_COURSE_SLUGS.has(slug)) {
        if (isActive) {
          setCourse(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { data } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (!isActive) return;
        const localCourse = COURSES.find((c) => c.slug === slug);
        let matched: Course | null = null;
        if (data) {
          matched = {
            ...(localCourse || {}),
            ...(data as Course),
            whyChooseThis: (data as Course).whyChooseThis || localCourse?.whyChooseThis
          };
        } else {
          matched = localCourse ?? null;
        }
        setCourse(matched);
      } catch {
        if (!isActive) return;
        setCourse(COURSES.find((c) => c.slug === slug) ?? null);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadCourse();
    return () => {
      isActive = false;
    };
  }, [slug]);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleDirectDownload = () => {
    if (!course) return;
    setDownloadStatus('downloading');
    setTimeout(() => {
      downloadCourseSyllabus(course);
      setDownloadStatus('downloaded');
      setTimeout(() => {
        setDownloadStatus('idle');
      }, 4000);
    }, 400);
  };

  if (isLoading) {
    return (
      <main className="min-h-screen py-24 bg-paper flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-navy animate-spin" />
        <span className="text-sm font-medium text-ink-muted">Loading course syllabus…</span>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen py-16 sm:py-24 bg-paper">
        <Container size="narrow">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Courses', href: '/courses' },
              { label: 'Course Not Found' },
            ]}
          />
          <div className="text-center space-y-4 bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-xs">
            <h1 className="text-2xl font-bold text-ink">
              Course Not Found
            </h1>
            <p className="text-sm text-ink-muted max-w-md mx-auto">
              The course "{slug}" was not found or may have been updated in our catalog.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" href="/courses">
                Browse All Courses
              </Button>
              <Button variant="outline" href="/contact">
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  if ((course.status === 'draft' || course.status === 'archived') && !isPreview) {
    return (
      <main className="min-h-screen py-16 sm:py-24 bg-paper">
        <Container size="narrow">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Courses', href: '/courses' },
              { label: 'Course Unavailable' },
            ]}
          />
          <div className="text-center space-y-4 bg-white p-8 sm:p-12 rounded-2xl border border-border shadow-xs">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold text-ink">
              Course In Development or Archived
            </h1>
            <p className="text-sm text-ink-muted max-w-md mx-auto">
              "{course.title}" is currently saved as an unpublished draft or has been archived. It is not currently open for public enrollment.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Button variant="primary" href="/courses">
                Browse Active Courses
              </Button>
              <Button variant="outline" href="/admin/courses">
                Admin Console
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  const hasProjects = !!(course.projects && course.projects.length > 0);
  const hasFaqs = !!(course.faqs && course.faqs.length > 0);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: course.title, path: `/courses/${course.slug}` },
  ];

  return (
    <main className="min-h-screen bg-paper">
      {isPreview && (
        <div className="bg-amber-500 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-md sticky top-0 z-50">
          <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
            <Eye className="w-4 h-4 shrink-0" />
            <span>
              <strong>Curriculum Preview Mode:</strong> You are previewing an unpublished or draft course ({course.status || 'draft'}). Public visitors cannot view this page without preview authorization.
            </span>
            <Link
              to="/admin/courses"
              className="ml-auto underline font-bold hover:text-amber-100 shrink-0"
            >
              Back to Admin
            </Link>
          </div>
        </div>
      )}
      <SEOHead
        title={`${course.title} Course Online in Nepal | Navya Ed Tech`}
        description={course.shortDescription || course.description}
        keywords={`${course.title} course Nepal, ${course.title} online training Nepal, ${course.technologies?.join(', ') || ''}, IT courses Nepal, Navya Ed Tech`}
        ogImage={course.heroImage || '/og-image.jpg'}
        canonicalUrl={`${SITE_URL}/courses/${course.slug}`}
        noindex={isPreview}
        structuredData={[
          getCourseSchema(course),
          getBreadcrumbSchema(breadcrumbs),
          ...(hasFaqs ? [getFAQSchema(course.faqs!.map((f) => ({ question: f.question, answer: f.answer })))] : []),
        ]}
      />

      {/* 1. Course Hero with Key Telemetry & Cohort Card */}
      <CourseHero
        course={course}
        onOpenAdvisor={handleOpenAdvisor}
        onDownloadSyllabus={handleDirectDownload}
      />

      {/* 2. Sticky Sub-Navigation Bar */}
      <CourseStickyNav
        courseTitle={course.title}
        hasProjects={hasProjects}
        hasFaqs={hasFaqs}
        onOpenAdvisor={handleOpenAdvisor}
        onDownloadSyllabus={handleDirectDownload}
      />

      {/* 3. Detailed Curriculum & Interactive Syllabus */}
      <CourseCurriculum
        course={course}
        onDownloadSyllabus={handleDirectDownload}
        onOpenAdvisor={() => handleOpenAdvisor('inquire')}
      />

      {/* 4. Production-Grade Capstone Deliverables (if configured for this course) */}
      {hasProjects && <CourseProjects course={course} />}

      {/* 5. Senior Faculty & Instructor Profile */}
      <CourseInstructor
        course={course}
        onOpenAdvisor={handleOpenAdvisor}
      />

      {/* 6. Target Learners, Prerequisites & Career Outcomes */}
      <CourseEligibilityMatrix course={course} />

      {/* 7. Industry Certificate of Technical Competence */}
      <CourseCertificate course={course} />

      {/* 8. Course-Specific FAQs (if available) */}
      {hasFaqs && (
        <div id="faqs" className="scroll-mt-24">
          <CourseFAQ faqs={course.faqs!} />
        </div>
      )}

      {/* 9. Final Consultation & Advisor CTA */}
      <CourseEnrollCTA
        course={course}
        onOpenAdvisor={handleOpenAdvisor}
        onDownloadSyllabus={handleDirectDownload}
      />

      {/* Advisor Inquiry Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={course.slug}
        initialIntent={advisorIntent}
      />

      {/* Direct PDF Download Toast Notification */}
      {downloadStatus !== 'idle' && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
          <div className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-navy text-white shadow-2xl border border-white/20 backdrop-blur-md max-w-sm">
            {downloadStatus === 'downloading' ? (
              <>
                <Loader2 className="w-5 h-5 text-[#93C5FD] animate-spin shrink-0" />
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">Generating Official Syllabus PDF...</p>
                  <p className="text-xs text-white/70">Direct download starting immediately</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">Syllabus PDF Downloaded</p>
                  <p className="text-xs text-[#A8C8E6] truncate max-w-[220px]">
                    Navya-Edu_{course.title.replace(/[^a-zA-Z0-9_-]/g, '_')}_Syllabus.pdf
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
