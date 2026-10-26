import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const scratchDir = path.resolve('./.tmp_chrome');
if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

const pages = [
  { name: 'homepage', url: 'http://localhost:3000/' },
  { name: 'course_details', url: 'http://localhost:3000/courses/web-development' },
  { name: 'contact', url: 'http://localhost:3000/contact' },
];

const results = {};

for (const page of pages) {
  console.log(`Auditing ${page.name} (${page.url})...`);
  const outputPath = path.resolve(`./scratch_lh_${page.name}.json`);
  
  try {
    const cmd = `npx --yes lighthouse "${page.url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless=new --no-sandbox --disable-gpu --user-data-dir=${scratchDir}" --quiet --only-categories=performance,accessibility,best-practices,seo`;
    execSync(cmd, { stdio: 'inherit', env: { ...process.env, CHROME_PATH: undefined } });

    if (fs.existsSync(outputPath)) {
      const data = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      const categories = data.categories;
      results[page.name] = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
      };
      fs.unlinkSync(outputPath);
      console.log(`  ✓ ${page.name}:`, results[page.name]);
    }
  } catch (err) {
    console.error(`  ✗ Error auditing ${page.name}:`, err.message);
  }
}

console.log('\n=== LIGHTHOUSE AUDIT SCORES ===\n');
console.table(results);
