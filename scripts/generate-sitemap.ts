import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COURSES, LEGACY_COURSE_SLUGS } from '../src/data/courses';
import { PROGRAMS } from '../src/data/programs';
import { INSIGHTS } from '../src/data/insights';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const baseUrl = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'https://navya-edu.vercel.app'
).replace(/\/+$/, '');

const today = new Date().toISOString().split('T')[0];

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export function getSitemapUrls(): SitemapUrl[] {
  const urls: SitemapUrl[] = [
    { loc: `${baseUrl}/`, lastmod: today, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/courses`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/programs`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/about`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/student-work`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/insights`, lastmod: today, changefreq: 'daily', priority: '0.8' },
    { loc: `${baseUrl}/contact`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { loc: `${baseUrl}/terms`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/privacy`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/refund`, lastmod: today, changefreq: 'yearly', priority: '0.3' },
    { loc: `${baseUrl}/faq`, lastmod: today, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/pricing`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/apply`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { loc: `${baseUrl}/corporate-training`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
  ];

  // Dynamic Course Pages (Only active, non-draft, non-legacy courses)
  COURSES.filter(
    (course) => !LEGACY_COURSE_SLUGS.has(course.slug) && course.status !== 'draft' && course.status !== 'archived'
  ).forEach((course) => {
    urls.push({
      loc: `${baseUrl}/courses/${course.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9',
    });
  });

  // Dynamic Career Programs Pages
  PROGRAMS.forEach((program) => {
    urls.push({
      loc: `${baseUrl}/programs/${program.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8',
    });
  });

  // Dynamic Insights / Blog Articles (Published only)
  INSIGHTS.filter((article) => article.status !== 'draft').forEach((article) => {
    urls.push({
      loc: `${baseUrl}/insights/${article.slug}`,
      lastmod: article.date ? new Date(article.date).toISOString().split('T')[0] : today,
      changefreq: 'monthly',
      priority: '0.8',
    });
  });

  return urls;
}

export function generateSitemapXml(): string {
  const urls = getSitemapUrls();
  const xmlEntries = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>
`;
}

export function writeSitemap() {
  const xml = generateSitemapXml();
  const urls = getSitemapUrls();

  // Write to public/sitemap.xml (for dev and vite builds)
  const publicPath = path.resolve(rootDir, 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf-8');

  // Also write to dist/sitemap.xml if dist exists
  const distDir = path.resolve(rootDir, 'dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.resolve(distDir, 'sitemap.xml'), xml, 'utf-8');
  }

  console.log(`[sitemap] Successfully generated sitemap.xml with ${urls.length} URLs.`);
}

writeSitemap();
