import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

async function checkA11y(url) {
  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    });

    const options = {
      logLevel: 'error',
      output: 'json',
      onlyCategories: ['accessibility'],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);
    const report = JSON.parse(runnerResult.report);
    const audits = report.audits;
    
    const issues = [];
    for (const [key, audit] of Object.entries(audits)) {
      if (audit.score !== null && audit.score < 1 && audit.details?.items?.length) {
        issues.push({
          id: key,
          title: audit.title,
          description: audit.description,
          count: audit.details.items.length,
          itemDetails: audit.details.items,
        });
      }
    }
    return issues;
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {}
    }
  }
}

const pages = [
  { name: 'Homepage', url: 'http://127.0.0.1:4173/' },
  { name: 'Courses', url: 'http://127.0.0.1:4173/courses' },
  { name: 'Course Detail', url: 'http://127.0.0.1:4173/courses/web-development' },
  { name: 'Programs', url: 'http://127.0.0.1:4173/programs' },
  { name: 'Contact', url: 'http://127.0.0.1:4173/contact' },
  { name: 'FAQ', url: 'http://127.0.0.1:4173/faq' },
];

for (const p of pages) {
  console.log(`\n=== ACCESSIBILITY AUDIT: ${p.name} ===`);
  const issues = await checkA11y(p.url);
  if (issues.length === 0) {
    console.log('No accessibility issues found! Score: 100');
  } else {
    for (const issue of issues) {
      console.log(`- [${issue.id}] ${issue.title} (${issue.count} items)`);
      console.log(JSON.stringify(issue.itemDetails, null, 2));
    }
  }
}
