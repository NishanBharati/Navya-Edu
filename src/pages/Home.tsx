import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { Hero } from '../components/home/Hero';
import { TrustIntro } from '../components/home/TrustIntro';
import { CourseDiscovery } from '../components/home/CourseDiscovery';
import { WhyNavya } from '../components/home/WhyNavya';
import { FeaturedProgram } from '../components/home/FeaturedProgram';
import { LearningExperience } from '../components/home/LearningExperience';
import { StudentProjectsPreview } from '../components/home/StudentProjectsPreview';
import { CareerPathway } from '../components/home/CareerPathway';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { InsightsPreview } from '../components/home/InsightsPreview';
import { AdvisorCTA } from '../components/home/AdvisorCTA';
import { AdvisorModal } from '../components/common/AdvisorModal';

export const Home: React.FC = () => {
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>('');

  const handleOpenAdvisor = (slug?: string) => {
    setSelectedCourseSlug(slug || '');
    setIsAdvisorOpen(true);
  };

  return (
    <main className="min-h-screen">
      <SEOHead
        title="Navya Ed Tech | Professional IT Training & Technology Education in Nepal"
        description="Practical IT education designed around modern technologies, real projects, and career-ready skills. Learn technology from the company that builds technology."
      />

      {/* 1. Hero */}
      <Hero onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* 2. Trust & Live Verification Metrics */}
      <TrustIntro />

      {/* 3. Course Discovery */}
      <CourseDiscovery onOpenAdvisor={handleOpenAdvisor} />

      {/* 4. Why Navya Ed Tech (Parent company credibility) */}
      <WhyNavya />

      {/* 5. Featured Practical Tracks */}
      <FeaturedProgram onOpenAdvisor={(slug) => handleOpenAdvisor(slug || 'web-development')} />

      {/* 6. Learning Experience (4-Pillar Pedagogical Standard) */}
      <LearningExperience />

      {/* 7. Student Capstone Project Showcase */}
      <StudentProjectsPreview />

      {/* 8. Career Outcomes & Compensation Insights */}
      <CareerPathway />

      {/* 9. Verified Graduate Reviews & Testimonials */}
      <TestimonialsSection />

      {/* 10. Latest Insights & Technical Articles */}
      <InsightsPreview />

      {/* 11. Admissions & Campus Advisory CTA */}
      <AdvisorCTA onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />
    </main>
  );
};
