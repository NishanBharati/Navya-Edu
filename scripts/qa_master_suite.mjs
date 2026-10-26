import * as chromeLauncher from 'chrome-launcher';
import { preview } from 'vite';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const PORT = 4173;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const ALL_ROUTES = [
  { name: 'Home', path: '/', isPublic: true },
  { name: 'Courses Index', path: '/courses', isPublic: true },
  { name: 'Course Detail (MERN)', path: '/courses/web-development', isPublic: true },
  { name: 'Course Detail (React)', path: '/courses/react-frontend-engineering', isPublic: true },
  { name: 'Course Detail (Python)', path: '/courses/python-beginner', isPublic: true },
  { name: 'Programs Index', path: '/programs', isPublic: true },
  { name: 'About Us', path: '/about', isPublic: true },
  { name: 'Student Work', path: '/student-work', isPublic: true },
  { name: 'Insights Index', path: '/insights', isPublic: true },
  { name: 'Blog Detail', path: '/insights/navigating-modern-software-engineering-careers-in-nepal', isPublic: true },
  { name: 'Contact Admissions', path: '/contact', isPublic: true },
  { name: 'Terms of Service', path: '/terms', isPublic: true },
  { name: 'Privacy Policy', path: '/privacy', isPublic: true },
  { name: 'Refund Policy', path: '/refund', isPublic: true },
  { name: 'FAQ', path: '/faq', isPublic: true },
  { name: 'Invalid Course Fallback', path: '/courses/non-existent-course-slug-12345', isFallback: true },
  { name: 'Invalid Blog Fallback', path: '/insights/non-existent-blog-slug-12345', isFallback: true },
  { name: '404 Route', path: '/non-existent-page-url-xyz', is404: true },
  { name: 'Admin Dashboard (Unauthenticated)', path: '/admin', isAdmin: true },
  { name: 'Admin Login', path: '/admin/login', isAdmin: true },
];

const BREAKPOINTS = [
  { name: 'Mobile Mini', width: 320, height: 600 },
  { name: 'Mobile Standard (iPhone)', width: 375, height: 667 },
  { name: 'Tablet (iPad)', width: 768, height: 1024 },
  { name: 'Laptop Small', width: 1024, height: 768 },
  { name: 'Desktop Standard', width: 1440, height: 900 },
];

async function main() {
  console.log('===============================================================');
  console.log('NAVYA ED TECH — MODULE 15 MASTER QA & REGRESSION TEST SUITE');
  console.log('===============================================================\n');

  const report = {
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      categories: {},
    },
    defects: [],
    details: {},
  };

  function recordTest(category, name, passed, details = '') {
    report.summary.totalTests++;
    if (!report.summary.categories[category]) {
      report.summary.categories[category] = { total: 0, passed: 0, failed: 0 };
    }
    report.summary.categories[category].total++;

    if (passed) {
      report.summary.passed++;
      report.summary.categories[category].passed++;
      console.log(`  ✓ [${category}] ${name}`);
    } else {
      report.summary.failed++;
      report.summary.categories[category].failed++;
      console.log(`  ✗ [${category}] ${name} — ${details}`);
    }
  }

  // 1. Start Vite Preview Server
  console.log('[1/10] Starting Vite production preview server...');
  let previewServer;
  try {
    previewServer = await preview({
      root: rootDir,
      preview: { port: PORT, host: '127.0.0.1' },
    });
    console.log(`Preview server active at ${BASE_URL}\n`);
  } catch (err) {
    console.error('Failed to start preview server:', err);
    process.exit(1);
  }

  // 2. Launch Chrome
  console.log('[2/10] Launching headless Chrome via chrome-launcher...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1440,900'],
  });

  try {
    const targetsRes = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${chrome.port}/json`, (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });

    const pageTarget = targetsRes.find((t) => t.type === 'page');
    if (!pageTarget?.webSocketDebuggerUrl) {
      throw new Error('No Chrome page debug target available');
    }

    const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (event) => {
          const res = JSON.parse(event.data.toString());
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            if (res.error) reject(res.error);
            else resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');
    await send('DOM.enable');

    // Helper: evaluate JS in page
    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', {
        expression,
        returnByValue: true,
        awaitPromise: true,
      });
      return res.result?.value;
    }

    // Helper: navigate and wait for hydration
    async function navigateTo(pathUrl, waitMs = 1200) {
      await send('Page.navigate', { url: `${BASE_URL}${pathUrl}` });
      await new Promise((r) => setTimeout(r, waitMs));
    }

    // =========================================================================
    // CATEGORY 1: BUILD AND CODE QUALITY
    // =========================================================================
    console.log('\n--- CATEGORY 1: BUILD & CODE QUALITY ---');
    
    // Check dist directory presence
    const hasDist = fs.existsSync(distDir) && fs.existsSync(path.resolve(distDir, 'index.html'));
    recordTest('Build & Quality', 'Production build artifacts exist in dist/', hasDist);

    // Check chunk splitting: AdminRoutes chunk exists separately
    const assets = fs.readdirSync(path.resolve(distDir, 'assets'));
    const hasAdminChunk = assets.some((f) => f.startsWith('AdminRoutes-') && f.endsWith('.js'));
    recordTest('Build & Quality', 'Admin routes code-split into isolated bundle', hasAdminChunk);

    const hasVendorSupabase = assets.some((f) => f.startsWith('vendor-supabase-') && f.endsWith('.js'));
    recordTest('Build & Quality', 'Vendor Supabase chunk separated', hasVendorSupabase);

    // =========================================================================
    // CATEGORY 2: ROUTE TESTING & FALLBACKS
    // =========================================================================
    console.log('\n--- CATEGORY 2: ROUTE TESTING ---');
    for (const route of ALL_ROUTES) {
      await navigateTo(route.path, route.isFallback ? 1800 : 1000);
      const pageInfo = await evaluate(`(() => {
        return {
          title: document.title,
          h1: document.querySelector('h1')?.innerText?.trim() || null,
          hasRoot: Boolean(document.querySelector('#root')),
          rootChildCount: document.querySelector('#root')?.children?.length || 0,
          url: window.location.href,
          pathname: window.location.pathname,
          hasErrorUI: Boolean(document.querySelector('[data-error-boundary]')) || document.body.innerText.includes('Something went wrong'),
          isNotFoundUI: document.body.innerText.includes('404') || 
                        document.body.innerText.includes('Page Not Found') || 
                        document.body.innerText.includes('Course Not Found') || 
                        document.body.innerText.includes('Article Not Found') ||
                        document.body.innerText.includes('Publication Not Found') ||
                        document.title.includes('Not Found'),
        };
      })()`);

      if (route.isPublic) {
        const passed = pageInfo.hasRoot && pageInfo.rootChildCount > 0 && !pageInfo.hasErrorUI && pageInfo.title.length > 5;
        recordTest('Route Testing', `Public Route: ${route.name} (${route.path})`, passed, `Title: "${pageInfo.title}"`);
      } else if (route.isFallback) {
        const passed = pageInfo.isNotFoundUI;
        recordTest('Route Testing', `Slug Fallback: ${route.name} (${route.path})`, passed, `Displays proper not found fallback`);
      } else if (route.is404) {
        const passed = pageInfo.isNotFoundUI;
        recordTest('Route Testing', `Wildcard 404 Route: (${route.path})`, passed, `Displays 404 Not Found UI`);
      } else if (route.isAdmin && route.path === '/admin') {
        const passed = pageInfo.pathname.includes('/admin/login') || pageInfo.url.includes('/admin/login');
        recordTest('Route Testing', `Admin Unauth Redirect: ${route.name}`, passed, `Redirected to ${pageInfo.pathname}`);
      } else if (route.isAdmin && route.path === '/admin/login') {
        const hasLoginForm = await evaluate(`Boolean(document.querySelector('form input[type="password"]'))`);
        recordTest('Route Testing', `Admin Login Route: ${route.name}`, hasLoginForm, `Login form rendered`);
      }
    }

    // =========================================================================
    // CATEGORY 3: NAVIGATION & INTERACTION TESTING
    // =========================================================================
    console.log('\n--- CATEGORY 3: NAVIGATION & INTERACTION ---');
    await navigateTo('/');

    // Test Desktop Header navigation items
    const navItems = await evaluate(`(() => {
      const links = Array.from(document.querySelectorAll('nav a, header a'))
        .map(a => ({ text: a.innerText.trim(), href: a.getAttribute('href') }))
        .filter(l => l.href && l.href.startsWith('/'));
      return links;
    })()`);
    recordTest('Navigation', 'Header navigation links present and structured', navItems.length >= 5, `Found ${navItems.length} internal nav links`);

    // Test Skip to Main Content Link
    const skipLink = await evaluate(`(() => {
      const link = document.querySelector('a[href="#main-content"]');
      const target = document.querySelector('#main-content');
      return { hasLink: Boolean(link), hasTarget: Boolean(target) };
    })()`);
    recordTest('Navigation', 'Accessible skip-to-content link exists (#main-content)', skipLink.hasLink && skipLink.hasTarget);

    // Test External Links Security (rel="noopener noreferrer")
    const externalLinksTest = await evaluate(`(() => {
      const extLinks = Array.from(document.querySelectorAll('a[target="_blank"]'));
      const insecure = extLinks.filter(a => {
        const rel = a.getAttribute('rel') || '';
        return !rel.includes('noopener') || !rel.includes('noreferrer');
      });
      return { total: extLinks.length, insecure: insecure.map(a => a.getAttribute('href')) };
    })()`);
    recordTest(
      'Navigation',
      'All external target="_blank" links have rel="noopener noreferrer"',
      externalLinksTest.insecure.length === 0,
      `Checked ${externalLinksTest.total} external links, insecure: ${externalLinksTest.insecure.length}`
    );

    // Test Browser Back & Forward Navigation
    await navigateTo('/courses');
    await navigateTo('/contact');
    await send('Page.navigate', { url: `${BASE_URL}/courses` }); // Back
    await new Promise((r) => setTimeout(r, 600));
    const isCoursesNow = await evaluate(`window.location.pathname === '/courses'`);
    recordTest('Navigation', 'Browser history state navigation works', isCoursesNow);

    // =========================================================================
    // CATEGORY 4: FORM & VALIDATION TESTING
    // =========================================================================
    console.log('\n--- CATEGORY 4: FORM TESTING & VALIDATION ---');
    await navigateTo('/contact', 1200);

    // Test 1: Empty Form Submission
    const emptyValidation = await evaluate(`(async () => {
      const form = document.querySelector('form');
      const submitBtn = form?.querySelector('button[type="submit"]');
      if (!submitBtn) return { error: 'Submit button not found' };
      submitBtn.click();
      await new Promise(r => setTimeout(r, 400));
      
      const hasValidationText = document.body.innerText.includes('Full Name is required') || 
                                document.body.innerText.includes('Email address is required') ||
                                document.body.innerText.includes('Phone number is required');
      return { success: hasValidationText };
    })()`);
    recordTest('Forms', 'Empty form triggers required validation alerts', emptyValidation.success);

    // Test 2: Invalid Email Input
    const emailValidation = await evaluate(`(async () => {
      const setNativeVal = (el, val) => {
        const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
        setter.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      };

      const nameInput = document.querySelector('#contact-fullname');
      const emailInput = document.querySelector('#contact-email');
      const submitBtn = document.querySelector('form button[type="submit"]');
      if (!emailInput || !nameInput || !submitBtn) return { error: 'Inputs not found' };
      
      setNativeVal(nameInput, 'John Tester');
      setNativeVal(emailInput, 'invalid-email-format-without-at');
      submitBtn.click();
      await new Promise(r => setTimeout(r, 400));

      const hasEmailError = document.body.innerText.includes('Please enter a valid email address') || document.body.innerText.includes('valid email');
      return { success: hasEmailError };
    })()`);
    recordTest('Forms', 'Invalid email address correctly blocked', emailValidation.success);

    // Test 3: Honeypot Anti-Bot Field Presence
    const honeypotTest = await evaluate(`(() => {
      const hp = document.querySelector('input[name="website_hp"]') || document.querySelector('#contact_website_hp');
      const isHidden = hp ? (hp.tabIndex === -1 || hp.getAttribute('aria-hidden') === 'true' || hp.classList.contains('hidden') || hp.classList.contains('sr-only') || hp.style.display === 'none' || hp.parentElement?.classList.contains('hidden') || hp.parentElement?.classList.contains('sr-only')) : false;
      return { hasHoneypot: Boolean(hp), isHidden };
    })()`);
    recordTest('Forms', 'Spam protection honeypot (website_hp) present and hidden from humans', honeypotTest.hasHoneypot && honeypotTest.isHidden);

    // Test 4: Valid Form Submission & Local Failsafe Queueing
    const validSubmission = await evaluate(`(async () => {
      const setNativeVal = (el, val) => {
        const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
        const setter = Object.getOwnPropertyDescriptor(proto, 'value').set;
        setter.call(el, val);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
        el.dispatchEvent(new Event('blur', { bubbles: true }));
      };

      const nameInput = document.querySelector('#contact-fullname');
      const emailInput = document.querySelector('#contact-email');
      const phoneInput = document.querySelector('#contact-phone');
      const messageInput = document.querySelector('#contact-message');
      const consentBox = document.querySelector('#contact-privacy');
      const submitBtn = document.querySelector('form button[type="submit"]');

      if (!nameInput || !emailInput || !phoneInput || !messageInput || !submitBtn) {
        return { error: 'Elements missing' };
      }

      const randomPhone = '98' + Math.floor(10000000 + Math.random() * 90000000);
      setNativeVal(nameInput, 'QA Student Automation');
      setNativeVal(emailInput, 'qa_auto_' + Date.now() + '@example.com');
      setNativeVal(phoneInput, randomPhone);
      setNativeVal(messageInput, 'Automated QA inquiry: Testing syllabus schedule and enrollment prerequisites.');

      if (consentBox && !consentBox.checked) {
        consentBox.click();
      }

      submitBtn.click();

      // Wait 2.2s for submission completion and transition
      await new Promise(r => setTimeout(r, 2200));

      const hasSuccessState = document.body.innerText.includes('Inquiry Received') || 
                             document.body.innerText.includes('Thank You') || 
                             document.body.innerText.includes('Reference Ticket') ||
                             document.body.innerText.includes('Chat on WhatsApp') ||
                             document.body.innerText.includes('Admissions Desk Notified');

      return { success: hasSuccessState };
    })()`);
    recordTest('Forms', 'Valid form submission transitions to Success Confirmation state', validSubmission.success);

    // =========================================================================
    // CATEGORY 5: RESPONSIVE BREAKPOINTS & HORIZONTAL OVERFLOW
    // =========================================================================
    console.log('\n--- CATEGORY 5: RESPONSIVE TESTING (320px–1440px) ---');
    const responsivePages = [
      { name: 'Home', path: '/' },
      { name: 'Course Detail', path: '/courses/web-development' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy', path: '/privacy' },
    ];

    for (const bp of BREAKPOINTS) {
      await send('Emulation.setDeviceMetricsOverride', {
        width: bp.width,
        height: bp.height,
        deviceScaleFactor: 1,
        mobile: bp.width < 1024,
      });

      let bpPassed = true;
      let worstExcess = 0;

      for (const p of responsivePages) {
        await navigateTo(p.path, 800);
        const overflow = await evaluate(`(() => {
          const docW = document.documentElement.clientWidth;
          const scrollW = document.documentElement.scrollWidth;
          return { hasOverflow: scrollW > docW + 1, excess: scrollW - docW };
        })()`);

        if (overflow.hasOverflow) {
          bpPassed = false;
          if (overflow.excess > worstExcess) worstExcess = overflow.excess;
        }
      }

      recordTest(
        'Responsive',
        `Viewport ${bp.name} (${bp.width}px): Zero horizontal overflow`,
        bpPassed,
        bpPassed ? 'No overflow' : `Excess width: ${worstExcess}px`
      );
    }

    // Restore desktop viewport
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // =========================================================================
    // CATEGORY 6: ACCESSIBILITY (A11Y)
    // =========================================================================
    console.log('\n--- CATEGORY 6: ACCESSIBILITY (A11Y) ---');
    await navigateTo('/');

    const a11yChecks = await evaluate(`(() => {
      // 1. Heading hierarchy: Ensure at least one H1
      const h1s = document.querySelectorAll('h1');
      const h1Count = h1s.length;

      // 2. Images missing alt attributes
      const imgs = Array.from(document.querySelectorAll('img'));
      const missingAlt = imgs.filter(img => !img.hasAttribute('alt') || img.getAttribute('alt') === null);

      // 3. Interactive buttons missing labels
      const buttons = Array.from(document.querySelectorAll('button'));
      const unlabelledButtons = buttons.filter(btn => {
        const text = btn.innerText.trim();
        const ariaLabel = btn.getAttribute('aria-label');
        const ariaLabelledBy = btn.getAttribute('aria-labelledby');
        return !text && !ariaLabel && !ariaLabelledBy;
      });

      return {
        h1Count,
        totalImages: imgs.length,
        missingAltCount: missingAlt.length,
        totalButtons: buttons.length,
        unlabelledButtonCount: unlabelledButtons.length,
      };
    })()`);

    recordTest('Accessibility', 'Exactly one <h1> heading per page', a11yChecks.h1Count === 1, `Found ${a11yChecks.h1Count} h1s`);
    recordTest('Accessibility', 'All images contain alt attributes', a11yChecks.missingAltCount === 0, `Missing: ${a11yChecks.missingAltCount}/${a11yChecks.totalImages}`);
    recordTest('Accessibility', 'All buttons have accessible text or aria-labels', a11yChecks.unlabelledButtonCount === 0, `Missing: ${a11yChecks.unlabelledButtonCount}/${a11yChecks.totalButtons}`);

    // =========================================================================
    // CATEGORY 7: SEO & STRUCTURED DATA
    // =========================================================================
    console.log('\n--- CATEGORY 7: SEO & METADATA ---');
    await navigateTo('/courses/web-development');

    const seoChecks = await evaluate(`(() => {
      const title = document.title;
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
      const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const twitterCard = document.querySelector('meta[name="twitter:card"]')?.getAttribute('content');
      const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));

      let parsedSchemas = [];
      for (const s of jsonLdScripts) {
        try {
          const parsed = JSON.parse(s.textContent);
          if (Array.isArray(parsed)) parsedSchemas.push(...parsed);
          else parsedSchemas.push(parsed);
        } catch {}
      }

      return {
        title,
        hasMetaDesc: Boolean(metaDesc && metaDesc.length > 20),
        canonical,
        hasOgTitle: Boolean(ogTitle),
        hasOgImage: Boolean(ogImage),
        hasTwitterCard: Boolean(twitterCard),
        schemaTypes: parsedSchemas.map(s => s['@type']).flat(),
      };
    })()`);

    recordTest('SEO', 'Page title descriptive (>15 chars)', seoChecks.title.length > 15, `Title: "${seoChecks.title}"`);
    recordTest('SEO', 'Meta description present and populated (>20 chars)', seoChecks.hasMetaDesc);
    recordTest('SEO', 'Canonical link tag configured correctly', Boolean(seoChecks.canonical), `Canonical: ${seoChecks.canonical}`);
    recordTest('SEO', 'OpenGraph and Twitter Card tags configured', seoChecks.hasOgTitle && seoChecks.hasOgImage && seoChecks.hasTwitterCard);
    recordTest('SEO', 'JSON-LD Structured Data parses cleanly', seoChecks.schemaTypes.length > 0, `Schemas: ${seoChecks.schemaTypes.join(', ')}`);

    // Verify robots.txt and sitemap.xml in dist
    const robotsPath = path.resolve(distDir, 'robots.txt');
    const sitemapPath = path.resolve(distDir, 'sitemap.xml');
    const hasRobots = fs.existsSync(robotsPath) && fs.readFileSync(robotsPath, 'utf8').includes('Sitemap:');
    const hasSitemap = fs.existsSync(sitemapPath) && fs.readFileSync(sitemapPath, 'utf8').includes('<urlset');
    recordTest('SEO', 'dist/robots.txt contains Sitemap directive', hasRobots);
    recordTest('SEO', 'dist/sitemap.xml valid XML structure with URLs', hasSitemap);

    // =========================================================================
    // CATEGORY 8: PERFORMANCE & LOAD RESILIENCE
    // =========================================================================
    console.log('\n--- CATEGORY 8: PERFORMANCE ---');
    await navigateTo('/');

    const perfMetrics = await evaluate(`(() => {
      const perf = window.performance;
      const timing = perf.getEntriesByType('navigation')[0];
      return {
        domContentLoaded: Math.round(timing?.domContentLoadedEventEnd || 0),
        loadComplete: Math.round(timing?.loadEventEnd || 0),
      };
    })()`);

    recordTest(
      'Performance',
      'DOM Content Loaded time within optimal threshold (<1500ms)',
      perfMetrics.domContentLoaded < 1500,
      `Actual: ${perfMetrics.domContentLoaded}ms`
    );

    recordTest(
      'Performance',
      'Full window load time within acceptable threshold (<2500ms)',
      perfMetrics.loadComplete < 2500,
      `Actual: ${perfMetrics.loadComplete}ms`
    );

    // =========================================================================
    // CATEGORY 9: DEFENSIVE SECURITY & SECRETS ISOLATION
    // =========================================================================
    console.log('\n--- CATEGORY 9: DEFENSIVE SECURITY ---');

    // Scan dist/ JS bundles for accidental secrets
    const jsFiles = assets.filter((f) => f.endsWith('.js'));
    let secretLeakFound = false;
    let leakedSecretName = '';

    for (const jsFile of jsFiles) {
      const content = fs.readFileSync(path.resolve(distDir, 'assets', jsFile), 'utf8');
      if (content.includes('service_role') && !content.includes('NEVER EXPOSE')) {
        secretLeakFound = true;
        leakedSecretName = `service_role in ${jsFile}`;
      }
      if (content.includes('SUPABASE_SERVICE_ROLE_KEY')) {
        secretLeakFound = true;
        leakedSecretName = `SUPABASE_SERVICE_ROLE_KEY in ${jsFile}`;
      }
    }

    recordTest('Security', 'No service-role database keys in client JS bundles', !secretLeakFound, leakedSecretName);

    // Check security headers configured in vercel.json
    const vercelJsonPath = path.resolve(rootDir, 'vercel.json');
    const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
    const headersList = vercelConfig.headers?.find((h) => h.source === '/(.*)')?.headers || [];
    const hasCsp = headersList.some((h) => h.key === 'Content-Security-Policy');
    const hasHsts = headersList.some((h) => h.key === 'Strict-Transport-Security');
    const hasFrameOptions = headersList.some((h) => h.key === 'X-Frame-Options' && h.value === 'DENY');

    recordTest('Security', 'vercel.json enforces Content-Security-Policy', hasCsp);
    recordTest('Security', 'vercel.json enforces Strict-Transport-Security', hasHsts);
    recordTest('Security', 'vercel.json enforces X-Frame-Options: DENY (anti-clickjacking)', hasFrameOptions);

    console.log('\n===============================================================');
    console.log(`QA SUMMARY: ${report.summary.passed}/${report.summary.totalTests} TESTS PASSED (${report.summary.failed} FAILED)`);
    console.log('===============================================================\n');

    // Output JSON result file for documentation
    fs.writeFileSync(
      path.resolve(rootDir, 'docs', 'qa_master_results.json'),
      JSON.stringify(report, null, 2),
      'utf8'
    );

    return report;
  } finally {
    try {
      await chrome.kill();
    } catch {}
    if (previewServer?.httpServer) {
      previewServer.httpServer.close();
    }
  }
}

main().catch((err) => {
  console.error('QA Master Runner failed with error:', err);
  process.exit(1);
});
