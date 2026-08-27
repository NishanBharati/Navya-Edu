import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Course } from '../types';
import { COURSES } from '../data/courses';

// Focused, High-Impact Course Components
import { CourseHero } from '../components/courses/CourseHero';
import { CourseStickyNav } from '../components/courses/CourseStickyNav';
import { CourseCurriculum } from '../components/courses/CourseCurriculum';
import { CourseProjects } from '../components/courses/CourseProjects';
import { CourseEligibilityMatrix } from '../components/courses/CourseEligibilityMatrix';
import { CourseFAQ } from '../components/courses/CourseFAQ';
import { CourseEnrollCTA } from '../components/courses/CourseEnrollCTA';

// Common Components
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { downloadCourseSyllabus } from '../utils/pdfGenerator';

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'downloaded'>('idle');

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);

    async function loadCourse() {
      try {
        const { data } = await supabase
          .from('courses')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();

        if (!isActive) return;
        const matched = (data as Course) ?? COURSES.find((c) => c.slug === slug) ?? null;
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
        <span className="text-sm font-medium text-ink-soft">Loading course syllabus…</span>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen py-24 bg-paper flex items-center justify-center">
        <Container size="narrow" className="text-center space-y-4 bg-white p-8 sm:p-12 rounded-3xl border border-border shadow-xs">
          <h1 className="text-2xl font-bold text-ink">
            Course Not Found
          </h1>
          <p className="text-sm text-ink-soft max-w-md mx-auto">
            The course you are looking for does not exist or has been updated in our catalog.
          </p>
          <div className="pt-2">
            <Button variant="primary" href="/courses">
              Browse All Courses
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  const hasProjects = !!(course.projects && course.projects.length > 0);
  const hasFaqs = !!(course.faqs && course.faqs.length > 0);

  return (
    <main className="min-h-screen bg-paper">
      <SEOHead
        title={`${course.title} Course in Nepal | Navya Ed Tech Kathmandu`}
        description={course.shortDescription || course.description}
      />

      {/* 1. Course Hero with Key Telemetry & Cohort Card */}
      <CourseHero
        course={course}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onDownloadSyllabus={handleDirectDownload}
      />

      {/* 2. Sticky Sub-Navigation Bar */}
      <CourseStickyNav
        courseTitle={course.title}
        hasProjects={hasProjects}
        hasFaqs={hasFaqs}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onDownloadSyllabus={handleDirectDownload}
      />

      {/* 3. Detailed Curriculum & Interactive Syllabus */}
      <CourseCurriculum
        course={course}
        onDownloadSyllabus={handleDirectDownload}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* 4. Production-Grade Capstone Deliverables (if configured for this course) */}
      {hasProjects && <CourseProjects course={course} />}

      {/* 5. Target Learners, Prerequisites & Career Outcomes */}
      <CourseEligibilityMatrix course={course} />

      {/* 6. Course-Specific FAQs (if available) */}
      {hasFaqs && (
        <div id="faqs" className="scroll-mt-24">
          <CourseFAQ faqs={course.faqs!} />
        </div>
      )}

      {/* 7. Final Consultation & Advisor CTA */}
      <CourseEnrollCTA
        course={course}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onDownloadSyllabus={handleDirectDownload}
      />

      {/* Advisor Inquiry Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={course.slug}
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
                  <p className="text-[11px] text-white/70">Direct download starting immediately</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">Syllabus PDF Downloaded</p>
                  <p className="text-[11px] text-[#A8C8E6] truncate max-w-[220px]">
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
