import { Course, InsightArticle } from '../types';
import { SITE_URL } from '../config/site';

const BASE_URL = SITE_URL;

/**
 * EducationalOrganization Schema for Homepage and Site-wide Branding
 */
export function getEducationalOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    '@id': `${BASE_URL}/#organization`,
    name: 'Navya Ed Tech',
    alternateName: ['Navya Ed Tech Pvt. Ltd.', 'Navya EdTech Nepal'],
    url: BASE_URL,
    logo: `${BASE_URL}/logo.webp`,
    image: `${BASE_URL}/og-image.jpg`,
    description:
      'Practical IT education and software engineering training academy in Nepal, teaching live online classes. Practical curriculums, daily Git audits, production capstone defense, and placement support.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Navya EdTech',
      url: 'https://navyaedtech.com/',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NP',
    },
    areaServed: 'NP',
    telephone: '+977-9800000000',
    email: 'info@navyaedtech.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+977-9800000000',
        contactType: 'Admissions & Counseling',
        email: 'admissions@navyaedtech.com',
        areaServed: 'NP',
        availableLanguage: ['English', 'Nepali'],
      },
    ],
    sameAs: [
      'https://navyaedtech.com/',
      'https://www.facebook.com/navyaedtech',
      'https://www.linkedin.com/company/navya-ed-tech',
      'https://www.instagram.com/navyaedtech',
    ],
  };
}

/**
 * Course Schema for Individual Course Detail Pages (Schema.org compliant)
 */
export function getCourseSchema(course: Course) {
  // Extract number of days from duration string like "45 Days"
  const durationMatch = course.duration.match(/(\d+)/);
  const days = durationMatch ? durationMatch[1] : '45';

  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${BASE_URL}/courses/${course.slug}#course`,
    name: `${course.title} Course in Nepal`,
    description: course.shortDescription || course.description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Navya Ed Tech',
      url: BASE_URL,
      logo: `${BASE_URL}/logo.webp`,
      sameAs: BASE_URL,
    },
    timeRequired: `P${days}D`,
    educationalCredentialAwarded: 'Industry Certificate of Completion & Capstone Defense',
    coursePrerequisites: course.prerequisites || ['Basic computer literacy'],
    teaches: course.technologies || [],
    occupationalCredentialAwarded: course.title,
    offers: {
      '@type': 'Offer',
      category: 'Tuition',
      priceCurrency: 'NPR',
      availability: 'https://schema.org/InStock',
      validFrom: '2026-01-01',
      url: `${BASE_URL}/courses/${course.slug}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: `${course.duration} (${course.upcomingBatch?.classDays || '6 Days/Week'})`,
      location: {
        '@type': 'VirtualLocation',
        url: `${BASE_URL}/courses/${course.slug}`,
      },
      instructor: {
        '@type': 'Organization',
        name: 'Navya Ed Tech Engineering Mentors',
      },
    },
    image: course.heroImage?.startsWith('http')
      ? course.heroImage
      : `${BASE_URL}${course.heroImage || '/og-image.jpg'}`,
  };
}

/**
 * ItemList Schema for Courses Catalog Page
 */
export function getItemListSchema(courses: Course[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Live Online IT Training Courses in Nepal',
    description: 'Catalog of industry-aligned software engineering and design courses at Navya Ed Tech.',
    itemListElement: courses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: course.title,
      url: `${BASE_URL}/courses/${course.slug}`,
    })),
  };
}

/**
 * BreadcrumbList Schema for Nested Pages
 */
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

/**
 * BlogPosting Schema for Insight Articles
 */
export function getArticleSchema(article: InsightArticle) {
  const coverUrl = article.coverImage
    ? article.coverImage.startsWith('http')
      ? article.coverImage
      : `${BASE_URL}${article.coverImage.startsWith('/') ? '' : '/'}${article.coverImage}`
    : `${BASE_URL}/og-image.jpg`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${BASE_URL}/insights/${article.slug}#article`,
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Navya Ed Tech Editorial',
      jobTitle: article.author?.role || 'Senior Technical Instructor',
    },
    publisher: {
      '@type': 'EducationalOrganization',
      name: 'Navya Ed Tech',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/insights/${article.slug}`,
    },
    image: coverUrl,
    keywords: [article.category, 'IT training Nepal', 'online IT courses Nepal'],
  };
}

/**
 * FAQPage Schema for Google Rich Snippets
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

