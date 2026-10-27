/**
 * Centralized Site Configuration & Canonical Domain Management
 *
 * All canonical tags, sitemaps, structured data, Open Graph images, and social sharing
 * links reference SITE_URL.
 *
 * To change the domain (e.g., from a staging vercel.app URL to your official custom domain),
 * simply update VITE_SITE_URL in `.env` or set SITE_URL in your hosting provider dashboard.
 */

export const getSiteUrl = (): string => {
  // 1. Explicit environment variable override (highest priority)
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    if (import.meta.env.VITE_SITE_URL) return import.meta.env.VITE_SITE_URL.replace(/\/+$/, '');
    if (import.meta.env.VITE_PUBLIC_SITE_URL) return import.meta.env.VITE_PUBLIC_SITE_URL.replace(/\/+$/, '');
  }

  if (typeof process !== 'undefined' && process.env) {
    if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/+$/, '');
    if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '');
    if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');

    // 2. Vercel deployment automatic environment variables
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/+$/, '');
    }
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`.replace(/\/+$/, '');
    }
  }

  // 3. Client-side browser runtime detection (respects active preview host)
  if (typeof window !== 'undefined' && window.location?.origin) {
    const origin = window.location.origin;
    if (origin && !origin.includes('localhost') && !origin.includes('127.0.0.1')) {
      return origin.replace(/\/+$/, '');
    }
  }

  // 4. Default active live preview URL (matching deployed site)
  return 'https://navya-edu.vercel.app';
};


export const SITE_URL: string = getSiteUrl();

export const SITE_CONFIG = {
  name: 'Navya Ed Tech',
  legalName: 'Navya Ed Tech Pvt. Ltd.',
  parentCompanyName: 'Navya EdTech',
  parentCompanyUrl: 'https://navyaedtech.com/',
  siteUrl: SITE_URL,
  tagline: 'Professional IT Training & Technology Education in Nepal',
  description:
    'Practical IT education designed around modern technologies, real projects, and career-ready skills, taught live online across Nepal.',
  defaultOgImage: `${SITE_URL}/og-image.jpg`,
  logoUrl: `${SITE_URL}/logo.webp`,
  contactEmail: 'info@navyaedtech.com',
  contactPhone: '+977-9800000000',
  location: {
    country: 'NP',
  },
};
