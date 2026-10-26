import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';

const pages = [
  { id: 'home', name: 'Homepage', path: '/' },
  { id: 'courses', name: 'Course Listing', path: '/courses' },
  { id: 'course_detail', name: 'Course Detail', path: '/courses/web-development' },
  { id: 'blog_detail', name: 'Blog Article', path: '/insights/navigating-modern-software-engineering-careers-in-nepal' },
  { id: 'contact', name: 'Contact Page', path: '/contact' },
];

const BASE_URL = 'http://127.0.0.1:4173';

async function runLighthouse(url, isDesktop = false) {
  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    });

    const flags = {
      logLevel: 'error',
      output: 'json',
      port: chrome.port,
      onlyCategories: ['performance'],
    };

    const config = isDesktop
      ? {
          extends: 'lighthouse:default',
          settings: {
            formFactor: 'desktop',
            screenEmulation: {
              mobile: false,
              width: 1350,
              height: 940,
              deviceScaleFactor: 1,
              disabled: false,
            },
            throttling: {
              rttMs: 40,
              throughputKbps: 10 * 1024,
              cpuSlowdownMultiplier: 1,
              requestLatencyMs: 0,
              downloadThroughputKbps: 0,
              uploadThroughputKbps: 0,
            },
          },
        }
      : undefined; // default is mobile with standard 4G throttling

    const runnerResult = await lighthouse(url, flags, config);
    const report = JSON.parse(runnerResult.report);
    const audits = report.audits;

    const extractMetric = (auditId) => {
      const audit = audits[auditId];
      if (!audit) return { displayValue: 'N/A', numericValue: 0 };
      return {
        displayValue: audit.displayValue || 'N/A',
        numericValue: Math.round(audit.numericValue || 0),
        score: audit.score,
      };
    };

    const bottlenecks = [];
    const checkAudits = [
      'render-blocking-resources',
      'unused-javascript',
      'modern-image-formats',
      'uses-optimized-images',
      'uses-responsive-images',
      'layout-shift-elements',
      'largest-contentful-paint-element',
      'total-byte-weight',
      'bootup-time',
    ];

    for (const id of checkAudits) {
      const a = audits[id];
      if (a && a.score !== null && a.score < 0.9 && a.details?.items?.length) {
        bottlenecks.push({
          id,
          title: a.title,
          savings: a.displayValue || '',
          itemCount: a.details.items.length,
          topItem: a.details.items[0]?.url || a.details.items[0]?.node?.snippet || '',
        });
      }
    }

    return {
      score: Math.round((report.categories.performance?.score || 0) * 100),
      fcp: extractMetric('first-contentful-paint'),
      lcp: extractMetric('largest-contentful-paint'),
      cls: extractMetric('cumulative-layout-shift'),
      tbt: extractMetric('total-blocking-time'),
      si: extractMetric('speed-index'),
      bottlenecks,
    };
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {
        // Ignore Windows file lock
      }
    }
  }
}

async function main() {
  const mode = process.argv[2] || 'all'; // 'mobile', 'desktop', or 'all'
  console.log(`Starting Lighthouse CWV Audit against ${BASE_URL}... Mode: ${mode}`);
  const report = { timestamp: new Date().toISOString(), results: [] };

  for (const page of pages) {
    const fullUrl = `${BASE_URL}${page.path}`;
    console.log(`\n--------------------------------------------`);
    console.log(`Auditing: ${page.name} (${fullUrl})`);

    let mobileRes = null;
    let desktopRes = null;

    if (mode === 'all' || mode === 'mobile') {
      console.log(`  > Running Mobile audit (simulated moto G4, 4G)...`);
      mobileRes = await runLighthouse(fullUrl, false);
      console.log(`    Score: ${mobileRes.score}/100 | LCP: ${mobileRes.lcp.displayValue} | FCP: ${mobileRes.fcp.displayValue} | CLS: ${mobileRes.cls.displayValue} | TBT: ${mobileRes.tbt.displayValue}`);
    }

    if (mode === 'all' || mode === 'desktop') {
      console.log(`  > Running Desktop audit (1350x940, desktop network)...`);
      desktopRes = await runLighthouse(fullUrl, true);
      console.log(`    Score: ${desktopRes.score}/100 | LCP: ${desktopRes.lcp.displayValue} | FCP: ${desktopRes.fcp.displayValue} | CLS: ${desktopRes.cls.displayValue} | TBT: ${desktopRes.tbt.displayValue}`);
    }

    report.results.push({
      page: page.name,
      path: page.path,
      mobile: mobileRes,
      desktop: desktopRes,
    });
  }

  const outPath = path.resolve(process.argv[3] || './baseline_cwv_results.json');
  fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\nAudit complete! Saved detailed report to: ${outPath}`);
}

main().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
