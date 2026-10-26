import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { COURSES, LEGACY_COURSE_SLUGS } from '../src/data/courses';
import { PROGRAMS } from '../src/data/programs';
import { INSIGHTS } from '../src/data/insights';
import { render } from '../src/entry-server';
import { writeSitemap } from './generate-sitemap';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const BASE_URL = (
  process.env.VITE_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'https://navya-edu.vercel.app'
).replace(/\/+$/, '');

// Determine template
const templatePath = path.resolve(distDir, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error(`[prerender] Error: Template file not found at ${templatePath}. Run 'vite build' first.`);
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// Build list of all public marketing routes
const routes: string[] = [
  '/',
  '/courses',
  '/programs',
  '/about',
  '/student-work',
  '/insights',
  '/contact',
  '/terms',
  '/privacy',
  '/refund',
  '/faq',
  '/pricing',
  '/apply',
  '/corporate-training',
];

// Add all active course detail routes (excluding legacy, draft, and archived)
COURSES.filter(
  (course) => !LEGACY_COURSE_SLUGS.has(course.slug) && course.status !== 'draft' && course.status !== 'archived'
).forEach((course) => {
  routes.push(`/courses/${course.slug}`);
});

// Add all career program detail routes
PROGRAMS.forEach((program) => {
  routes.push(`/programs/${program.slug}`);
});

// Add all published blog detail routes (excluding drafts)
INSIGHTS.filter((article) => article.status !== 'draft').forEach((article) => {
  routes.push(`/insights/${article.slug}`);
});

console.log(`[prerender] Starting static HTML generation for ${routes.length} public marketing routes...`);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

let generatedCount = 0;

for (const url of routes) {
  try {
    const { html: appHtml, metadata } = render(url);

    let pageHtml = template;

    // 1. Inject rendered component HTML into #root
    pageHtml = pageHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    const title = metadata.title || 'Navya Ed Tech | Professional IT Education & Technology Training in Nepal';
    const description =
      metadata.description ||
      'Practical IT education designed around modern technologies, real projects, and career-ready skills. Learn technology from the company that builds technology.';
    const ogImage = metadata.ogImage || `${BASE_URL}/og-image.jpg`;
    const canonicalUrl = metadata.canonicalUrl || `${BASE_URL}${url === '/' ? '' : url}`;
    const ogType = metadata.ogType || 'website';
    const ogSiteName = metadata.ogSiteName || 'Navya Ed Tech';

    // 2. Replace or inject title
    pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

    // 3. Replace or inject meta description
    pageHtml = pageHtml.replace(
      /<meta name="description" content="[\s\S]*?" \/>/i,
      `<meta name="description" content="${escapeHtml(description)}" />`
    );

    const robotsDirective = metadata.noindex
      ? `<meta name="robots" content="noindex, nofollow" />`
      : `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`;

    // 4. Construct complete SEO head tags block
    const seoHeadTags = [
      `<!-- Canonical, Robots & OpenGraph / Twitter Cards -->`,
      robotsDirective,
      `<link rel="canonical" href="${canonicalUrl}" />`,
      `<meta property="og:type" content="${ogType}" />`,
      `<meta property="og:site_name" content="${escapeHtml(ogSiteName)}" />`,
      `<meta property="og:url" content="${canonicalUrl}" />`,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      `<meta property="og:image" content="${ogImage}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:locale" content="en_US" />`,
      `<meta property="og:locale:alternate" content="ne_NP" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:url" content="${canonicalUrl}" />`,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
      `<meta name="twitter:image" content="${ogImage}" />`,
    ];

    if (metadata.keywords) {
      seoHeadTags.push(`<meta name="keywords" content="${escapeHtml(metadata.keywords)}" />`);
    }

    if (metadata.structuredData) {
      // Defensively sanitize JSON string to prevent inline script breakout (XSS hardening)
      const jsonLdContent = JSON.stringify(metadata.structuredData, null, 2)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e');
      seoHeadTags.push(`<script type="application/ld+json" id="seo-json-ld">\n${jsonLdContent}\n    </script>`);
    }

    // Clean up existing placeholder og / twitter tags in template before inserting new ones
    pageHtml = pageHtml.replace(/<meta property="og:title" content="[\s\S]*?" \/>\s*/gi, '');
    pageHtml = pageHtml.replace(/<meta property="og:description" content="[\s\S]*?" \/>\s*/gi, '');
    pageHtml = pageHtml.replace(/<meta property="og:type" content="[\s\S]*?" \/>\s*/gi, '');
    pageHtml = pageHtml.replace(/<meta name="twitter:card" content="[\s\S]*?" \/>\s*/gi, '');
    pageHtml = pageHtml.replace(/<link rel="canonical" href="[\s\S]*?" \/>\s*/gi, '');

    // Insert new tags right before </head>
    pageHtml = pageHtml.replace('</head>', `    ${seoHeadTags.join('\n    ')}\n  </head>`);

    // Determine output file path
    let outPath: string;
    if (url === '/') {
      outPath = path.resolve(distDir, 'index.html');
    } else {
      const routeDir = path.resolve(distDir, url.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      outPath = path.resolve(routeDir, 'index.html');
    }

    fs.writeFileSync(outPath, pageHtml, 'utf-8');
    generatedCount++;
    console.log(`  ✓ Generated: ${url} -> ${path.relative(rootDir, outPath)} (${(pageHtml.length / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`  ✗ Error rendering ${url}:`, err);
  }
}

// Ensure an SPA fallback shell exists for client-rendered admin routes
const adminDir = path.resolve(distDir, 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}
fs.writeFileSync(path.resolve(adminDir, 'index.html'), template, 'utf-8');
console.log(`  ✓ Created SPA fallback shell for /admin/* -> dist/admin/index.html`);

// Generate static 404.html fallback
try {
  const { html: notFoundHtml, metadata: notFoundMeta } = render('/404-not-found-page');
  let notFoundPageHtml = template.replace('<div id="root"></div>', `<div id="root">${notFoundHtml}</div>`);
  notFoundPageHtml = notFoundPageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${notFoundMeta.title || '404 - Page Not Found | Navya Ed Tech'}</title>`);
  notFoundPageHtml = notFoundPageHtml.replace('</head>', `    <meta name="robots" content="noindex, nofollow" />\n  </head>`);
  fs.writeFileSync(path.resolve(distDir, '404.html'), notFoundPageHtml, 'utf-8');
  console.log(`  ✓ Generated: 404 fallback -> dist/404.html (with noindex)`);
} catch (err) {
  console.error('  ✗ Error generating 404.html:', err);
}

// Ensure robots.txt is generated with dynamic Sitemap URL matching the deployment domain
const robotsContent = `# robots.txt for Navya Ed Tech (${BASE_URL})
User-agent: *
Allow: /

# Disallow indexing of administrative portal and private preview states
Disallow: /admin/
Disallow: /admin
Disallow: /*?preview=true
Disallow: /*?*preview=true
Disallow: /404

# Sitemap
Sitemap: ${BASE_URL}/sitemap.xml
`;
fs.writeFileSync(path.resolve(distDir, 'robots.txt'), robotsContent, 'utf-8');
console.log(`  ✓ Generated dynamic dist/robots.txt pointing to ${BASE_URL}/sitemap.xml`);


writeSitemap();

console.log(`[prerender] Successfully generated ${generatedCount}/${routes.length} public static routes with full SEO & Structured Data!`);
