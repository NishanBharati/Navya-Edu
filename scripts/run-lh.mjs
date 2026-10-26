import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

async function audit(url) {
  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    });

    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);
    const report = JSON.parse(runnerResult.report);
    const categories = report.categories;

    return {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
    };
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {
        // Ignore Windows EPERM tmp dir lock
      }
    }
  }
}

const pages = [
  { name: 'Homepage (/)', url: 'http://localhost:3000/' },
  { name: 'About (/about)', url: 'http://localhost:3000/about' },
  { name: 'Courses Catalog (/courses)', url: 'http://localhost:3000/courses' },
  { name: 'Programs (/programs)', url: 'http://localhost:3000/programs' },
  { name: 'Contact (/contact)', url: 'http://localhost:3000/contact' },
];

console.log('Running programmatic Lighthouse audits (Before Pass)...\n');
const results = {};

for (const p of pages) {
  try {
    console.log(`Auditing ${p.name}...`);
    const score = await audit(p.url);
    results[p.name] = score;
    console.log(`  ✓ Done: Performance: ${score.performance}, Accessibility: ${score.accessibility}, Best Practices: ${score.bestPractices}, SEO: ${score.seo}`);
  } catch (err) {
    console.error(`  ✗ Error on ${p.name}:`, err);
  }
}

console.log('\n=== BASELINE LIGHTHOUSE SCORES ===\n');
console.table(results);
