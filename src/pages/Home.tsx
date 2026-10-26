import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { getEducationalOrganizationSchema, getFAQSchema } from '../utils/structuredData';
import { Hero } from '../components/home/Hero';
import { ClassFormat } from '../components/home/ClassFormat';
import { CourseDiscovery } from '../components/home/CourseDiscovery';
import { ProjectsShelf } from '../components/home/ProjectsShelf';
import { OlderLearners } from '../components/home/OlderLearners';
import { QualityStandards } from '../components/home/QualityStandards';
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

      {/* Working block editor: pick an age, see the path, book a demo class */}
      <Hero onOpenAdvisor={handleOpenAdvisor} />

      <ClassFormat />

      <CourseDiscovery onOpenAdvisor={handleOpenAdvisor} />

      <ProjectsShelf />

      <OlderLearners />

      {/* Faculty & mentorship standard + graduate proof-of-work standard (tabbed) */}
      <QualityStandards onOpenAdvisor={() => handleOpenAdvisor()} />

      <HomeFAQ onOpenAdvisor={() => handleOpenAdvisor()} />

      <InsightsPreview />

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
