import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import type { Course } from '../types';
import { CourseHero } from '../components/courses/CourseHero';
import { CourseAudience } from '../components/courses/CourseAudience';
import { CourseProjects } from '../components/courses/CourseProjects';
import { CourseTechStack } from '../components/courses/CourseTechStack';
import { CourseLearningJourney } from '../components/courses/CourseLearningJourney';
import { CourseCurriculum } from '../components/courses/CourseCurriculum';
import { CourseInstructor } from '../components/courses/CourseInstructor';
import { CourseCareerPaths } from '../components/courses/CourseCareerPaths';
import { CourseFAQ } from '../components/courses/CourseFAQ';
import { CourseEnrollCTA } from '../components/courses/CourseEnrollCTA';
import { SEOHead } from '../components/common/SEOHead';
import { AdvisorModal } from '../components/common/AdvisorModal';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';

export const CourseDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    supabase
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (!isActive) return;
        setCourse((data as Course) ?? null);
        setIsLoading(false);
      });
    return () => {
      isActive = false;
    };
  }, [slug]);

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen py-20 bg-[#FAFAF8] flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-[#17324D] animate-spin" />
      </main>
    );
  }

  if (!course) {
    return (
      <main className="min-h-screen py-20 bg-[#FAFAF8] flex items-center justify-center">
        <Container size="narrow" className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#171A1F]">
            Course Not Found
          </h1>
          <p className="text-sm text-[#5F6670]">
            The course you are looking for does not exist or has been relocated.
          </p>
          <div className="pt-2">
            <Button variant="primary" href="/courses">
              Back to All Courses
            </Button>
          </div>
        </Container>
      </main>
    );
  }

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSuccess(true);
  };

  return (
    <main className="min-h-screen">
      <SEOHead
        title={`${course.title} in Nepal | Navya Ed Tech`}
        description={course.shortDescription}
      />

      {/* 1. Course Hero with Batch & Overview */}
      <CourseHero
        course={course}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onDownloadSyllabus={() => setIsDownloadModalOpen(true)}
      />

      {/* 2. "Is this course right for you?" + Prerequisites */}
      <CourseAudience course={course} />

      {/* 3. "What You'll Build" (Outcome-focused Project deliverables) */}
      <CourseProjects course={course} />

      {/* 4. Course Tech Stack Strip */}
      <CourseTechStack course={course} />

      {/* 5. "How You'll Learn" (Learning Journey) */}
      <CourseLearningJourney />

      {/* 6. Curriculum Accordion */}
      <CourseCurriculum course={course} />

      {/* 7. Instructor & Faculty Guidance */}
      <CourseInstructor course={course} />

      {/* 8. Career Application */}
      <CourseCareerPaths course={course} />

      {/* 9. FAQs */}
      <CourseFAQ faqs={course.faqs} />

      {/* 10. Final Enroll / Advisor CTA */}
      <CourseEnrollCTA
        course={course}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
      />

      {/* Advisor Inquiry Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={course.slug}
      />

      {/* Download Syllabus Modal */}
      {isDownloadModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsDownloadModalOpen(false);
              setDownloadSuccess(false);
            }
          }}
        >
          <div className="bg-white rounded-2xl border border-[#E5DFD4] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            {downloadSuccess ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#718C7A]/20 text-[#3D5644] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-[#171A1F]">
                  Outline Ready
                </h3>
                <p className="text-xs text-[#5F6670] leading-relaxed">
                  The complete syllabus PDF for <strong>{course.title}</strong> has been dispatched to <strong>{downloadEmail}</strong>.
                </p>
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsDownloadModalOpen(false);
                      setDownloadSuccess(false);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#356A9A] block">
                    Curriculum Document
                  </span>
                  <h3 className="text-lg font-bold text-[#171A1F] mt-1">
                    Download {course.title} Outline
                  </h3>
                  <p className="text-xs text-[#5F6670] mt-1 leading-relaxed">
                    Receive the full module-by-module breakdown, project specifications, and laboratory schedule.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#171A1F] uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D8D2C6] bg-[#FAFAF8] text-sm text-[#171A1F] focus:outline-none focus:ring-2 focus:ring-[#17324D]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsDownloadModalOpen(false)}
                    className="px-3.5 py-2 text-xs font-semibold text-[#5F6670] hover:text-[#171A1F]"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="primary" size="sm">
                    Receive Syllabus
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
};
