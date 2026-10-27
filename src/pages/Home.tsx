import React, { useState } from 'react';
import { SEOHead } from '../components/common/SEOHead';
import { getEducationalOrganizationSchema, getFAQSchema } from '../utils/structuredData';
import { Hero } from '../components/home/Hero';
import { CourseDiscovery } from '../components/home/CourseDiscovery';
import { ProjectsShelf } from '../components/home/ProjectsShelf';
import { OlderLearners } from '../components/home/OlderLearners';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { ForSchools } from '../components/home/ForSchools';
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
        description="Practical IT education designed around modern technologies, real projects, and career-ready skills. Live online classes from the company that builds technology, open to learners across Nepal."
        keywords="IT training in Nepal, online IT training Nepal, Web development course Nepal, online Python course Nepal, Data Science training Nepal, Kids coding Nepal, Navya Ed Tech"
        structuredData={[
          getEducationalOrganizationSchema(),
          getFAQSchema(HOMEPAGE_FAQS.map((f) => ({ question: f.question, answer: f.answer }))),
        ]}
      />

      {/* Working block editor: pick an age, see the path, book a demo class */}
      <Hero onOpenAdvisor={handleOpenAdvisor} />

      <CourseDiscovery onOpenAdvisor={handleOpenAdvisor} />

      <WhyChooseUs />

      <OlderLearners />

      <ProjectsShelf />

      {/* Schools, colleges and companies */}
      <ForSchools onOpenAdvisor={() => handleOpenAdvisor()} />

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
