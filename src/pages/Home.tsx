import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { getEducationalOrganizationSchema, getFAQSchema } from '../utils/structuredData';
import { Hero } from '../components/home/Hero';
import { TrustIntro } from '../components/home/TrustIntro';
import { CourseDiscovery } from '../components/home/CourseDiscovery';
import { FeaturedProgram } from '../components/home/FeaturedProgram';
import { WhyNavya } from '../components/home/WhyNavya';
import { LearningExperience } from '../components/home/LearningExperience';
import { StudentProjectsPreview } from '../components/home/StudentProjectsPreview';
import { CareerPathway } from '../components/home/CareerPathway';
import { FacultyMentorshipStandard } from '../components/home/FacultyMentorshipStandard';
import { GraduateQualityStandard } from '../components/home/GraduateQualityStandard';
import { HomeFAQ, HOMEPAGE_FAQS } from '../components/home/HomeFAQ';
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
        description="Practical IT education designed around modern technologies, real projects, and career-ready skills. Learn technology from the company that builds technology in Kathmandu."
        keywords="IT training in Nepal, IT training institute Kathmandu, Web development course Nepal, Python programming Kathmandu, Data Science training Nepal, Kids coding Nepal, Navya Ed Tech"
        structuredData={[
          getEducationalOrganizationSchema(),
          getFAQSchema(HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      {/* 1. Hero Section */}
      <Hero onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* 2. Trust Section (Verified Institutional Lineage) */}
      <TrustIntro />

      {/* 3. Featured Courses & Catalog Filter */}
      <CourseDiscovery onOpenAdvisor={handleOpenAdvisor} />

      {/* 4. Flagship Practical Tracks Roadmap */}
      <FeaturedProgram onOpenAdvisor={(slug) => handleOpenAdvisor(slug || 'web-development')} />

      {/* 5. Learning Experience & Parent Enterprise Synergies */}
      <WhyNavya />
      <LearningExperience />

      {/* 6. Student Projects & Career Pathways */}
      <StudentProjectsPreview />
      <CareerPathway onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* 7. Instructors & Mentorship Model (1:12 Ratio Standard) */}
      <FacultyMentorshipStandard onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* 8. Graduate Quality & Proof-of-Work Standard */}
      <GraduateQualityStandard />

      {/* 9. Authentic Student FAQ (Enrollment, Fees, Prerequisites, Certification) */}
      <HomeFAQ onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* Educational Insights & Industry Guides */}
      <InsightsPreview />

      {/* 10. Final Admissions & Advisory CTA */}
      <AdvisorCTA onOpenAdvisor={() => handleOpenAdvisor()} />

      {/* Global Advisor & Inquiry Modal */}
      <AdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        defaultCourseSlug={selectedCourseSlug}
      />
    </main>
  );
};
