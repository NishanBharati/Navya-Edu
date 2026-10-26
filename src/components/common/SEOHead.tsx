import React, { useEffect, createContext, useContext } from 'react';
import { SITE_URL } from '../../config/site';

export interface SEOMetadata {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: 'website' | 'article';
  ogSiteName?: string;
  canonicalUrl?: string;
  structuredData?: any;
  noindex?: boolean;
}

export const SEOContext = createContext<{ setMetadata?: (meta: SEOMetadata) => void }>({});

export interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  structuredData?: any;
  noindex?: boolean;
}

const DEFAULT_BASE_URL = SITE_URL;
const DEFAULT_OG_IMAGE = `${DEFAULT_BASE_URL}/og-image.jpg`;

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Navya Ed Tech | Professional IT Education & Technology Training in Nepal',
  description = 'Practical IT education designed around modern technologies, real projects, and career-ready skills. Learn technology from the company that builds technology.',
  keywords = 'IT training in Nepal, IT training institute in Kathmandu, Web development course Nepal, Python programming Nepal, Data Science Nepal, Scratch kids coding Kathmandu, Navya Ed Tech',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonicalUrl,
  structuredData,
  noindex = false,
}) => {
  const finalTitle = title.includes('Navya Ed Tech') ? title : `${title} | Navya Ed Tech`;
  
  // Resolve canonical & OG URL
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const finalCanonical = canonicalUrl || `${DEFAULT_BASE_URL}${currentPath === '/' ? '' : currentPath}`;
  const finalOgImage = ogImage.startsWith('http') ? ogImage : `${DEFAULT_BASE_URL}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  const seo = useContext(SEOContext);

  if (seo?.setMetadata) {
    seo.setMetadata({
      title: finalTitle,
      description,
      keywords,
      ogTitle: finalTitle,
      ogDescription: description,
      ogImage: finalOgImage,
      ogUrl: finalCanonical,
      ogType,
      ogSiteName: 'Navya Ed Tech',
      canonicalUrl: finalCanonical,
      structuredData,
      noindex,
    });
  }

  useEffect(() => {
    // 1. Page Title
    document.title = finalTitle;

    // Helper for updating meta tags
    const setMeta = (nameAttr: string, nameVal: string, contentVal: string) => {
      let meta = document.querySelector(`meta[${nameAttr}="${nameVal}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(nameAttr, nameVal);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', contentVal);
    };

    // 2. Robots Indexability Directive
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // 3. Standard Meta Tags
    setMeta('name', 'description', description);
    if (keywords) {
      setMeta('name', 'keywords', keywords);
    }

    // 4. Open Graph Tags
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:site_name', 'Navya Ed Tech');
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', finalCanonical);
    setMeta('property', 'og:image', finalOgImage);
    setMeta('property', 'og:image:width', '1200');
    setMeta('property', 'og:image:height', '630');
    setMeta('property', 'og:locale', 'en_US');
    setMeta('property', 'og:locale:alternate', 'ne_NP');

    // 5. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', finalOgImage);
    setMeta('name', 'twitter:url', finalCanonical);

    // 6. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalCanonical);

    // 7. JSON-LD Structured Data
    if (structuredData) {
      let script = document.querySelector('script#seo-json-ld');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'seo-json-ld');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [finalTitle, description, keywords, ogType, finalCanonical, finalOgImage, structuredData, noindex]);

  return null;
};
