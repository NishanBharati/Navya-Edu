import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const pages = [
  { name: 'homepage', url: 'http://localhost:3000/' },
  { name: 'course_details', url: 'http://localhost:3000/courses/web-development' },
  { name: 'contact', url: 'http://localhost:3000/contact' },
];

const results: Record<string, { performance: number; accessibility: number; bestPractices: number; seo: number }> = {};

for (const page of pages) {
  console.log(`Running Lighthouse on ${page.name} (${page.url})...`);
  const outputPath = path.resolve(`./scratch_lighthouse_${page.name}.json`);
  
  try {
    execSync(
      `bun x lighthouse "${page.url}" --output=json --output-path="${outputPath}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet --only-categories=performance,accessibility,best-practices,seo`,
      { stdio: 'inherit' }
    );

    if (fs.existsSync(outputPath)) {
      const data = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
      const categories = data.categories;
      results[page.name] = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
      };
      // cleanup json file
      fs.unlinkSync(outputPath);
    }
  } catch (err: any) {
    console.error(`Error auditing ${page.name}:`, err.message);
  }
}

console.log('\n=== LIGHTHOUSE AUDIT RESULTS ===\n');
console.table(results);
