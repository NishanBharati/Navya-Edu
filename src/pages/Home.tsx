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

      {/* 2. Trust Intro */}
      <TrustIntro />

      {/* 3. Course Discovery */}
      <CourseDiscovery onOpenAdvisor={handleOpenAdvisor} />

      {/* 4. Why Navya Ed Tech (Parent company credibility) */}
      <WhyNavya />

      {/* 5. Featured Career Track */}
      <FeaturedProgram onOpenAdvisor={() => handleOpenAdvisor('full-stack-career-track')} />

      {/* 6. Learning Experience (From Learning to Building) */}
      <LearningExperience />

      {/* 7. Student Project Showcase */}
      <StudentProjectsPreview />

      {/* 8. Career Pathway */}
      <CareerPathway />

      {/* 9. Latest Insights */}
      <InsightsPreview />

      {/* 10. Contact / Advisor CTA */}
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
