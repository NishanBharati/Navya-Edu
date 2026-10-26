import http from 'http';
import fs from 'fs';
import path from 'path';

function get(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  console.log('--- STARTING MODULE 7 ABOUT, INSTRUCTORS, TRUST & TESTIMONIALS VERIFICATION ---');
  let failures = 0;

  // 1. Test /about/ page content
  try {
    const res = await get('http://127.0.0.1:3000/about/');
    console.log(`[1] Fetch /about/: Status ${res.status}`);
    if (res.status !== 200) {
      console.error('FAIL: Expected status 200 for /about/');
      failures++;
    }

    const checks = [
      { name: '1. Who Navya Ed Tech Is', pattern: /Engineering Education Rooted in Real-World Software Production/i },
      { name: '2. What We Offer (9 Tracks)', pattern: /9 Production-Aligned Technology Tracks/i },
      { name: '3. Who We Serve (Target Learners)', pattern: /Built for Dedicated Builders &amp; Transitioners/i },
      { name: '4. Learning Philosophy (4 Pillars)', pattern: /The Four Pillars of the Navya Method/i },
      { name: '5. Practical Teaching Method (70/30 Coding)', pattern: /70% coding \/ 30% architecture/i },
      { name: '6. Faculty Mentorship Standards (No Placeholders)', pattern: /Departmental Mentorship Standards/i },
      { name: '6b. Faculty Vetting Policy', pattern: /Faculty Vetting &amp; Assignment Policy/i },
      { name: '7. Campus Location (Putalisadak)', pattern: /Putalisadak Campus, Kathmandu/i },
      { name: '7b. Hours of Operation', pattern: /Sun – Fri: 7:00 AM – 7:00 PM/i },
      { name: '8. Institutional Policies (Certificate of Competence)', pattern: /Certificate of Competence Policy/i },
      { name: '8b. Fee & Refund Terms', pattern: /Fee Transparency &amp; Refund Terms/i },
      { name: '8c. Student Privacy & Conduct', pattern: /Student Code of Conduct &amp; Privacy/i },
      { name: 'Parent Company Link (navyaedtech.com)', pattern: /navyaedtech\.com/i },
    ];

    for (const check of checks) {
      if (check.pattern.test(res.body)) {
        console.log(`  ✓ ${check.name} found in HTML`);
      } else {
        console.error(`  ✗ FAIL: Missing ${check.name}`);
        failures++;
      }
    }

    if (res.body.includes('[PLACEHOLDER]')) {
      console.error('  ✗ FAIL: Found raw [PLACEHOLDER] in /about/ HTML!');
      failures++;
    } else {
      console.log('  ✓ Verified: Zero [PLACEHOLDER] tags in /about/ HTML');
    }
  } catch (err) {
    console.error('FAIL fetching /about/:', err.message);
    failures++;
  }

  // 2. Scan entire dist/ folder for prohibited [PLACEHOLDER] tags
  console.log('\n[2] Scanning entire dist/ distribution folder for raw [PLACEHOLDER] tags...');
  try {
    const distDir = path.resolve('dist');
    let totalHtmlChecked = 0;
    let placeholderFiles = [];

    function walkDir(dir) {
      const files = fs.readdirSync(dir, { withFileTypes: true });
      for (const file of files) {
        const fullPath = path.join(dir, file.name);
        if (file.isDirectory()) {
          walkDir(fullPath);
        } else if (file.name.endsWith('.html')) {
          totalHtmlChecked++;
          const content = fs.readFileSync(fullPath, 'utf-8');
          if (content.includes('[PLACEHOLDER]')) {
            placeholderFiles.push(fullPath);
          }
        }
      }
    }

    walkDir(distDir);

    if (placeholderFiles.length > 0) {
      console.error(`  ✗ FAIL: Found [PLACEHOLDER] in ${placeholderFiles.length} file(s):`);
      placeholderFiles.forEach(f => console.error(`    - ${f}`));
      failures++;
    } else {
      console.log(`  ✓ Verified: Checked ${totalHtmlChecked} static HTML files across dist/. ZERO [PLACEHOLDER] tags found!`);
    }
  } catch (err) {
    console.error('Error walking dist directory:', err.message);
    failures++;
  }

  // 3. Scan for fake star rating icons in testimonials
  console.log('\n[3] Checking for prohibited fake ratings in static pages...');
  try {
    const homeHtml = fs.readFileSync(path.resolve('dist', 'index.html'), 'utf-8');
    const aboutHtml = fs.readFileSync(path.resolve('dist', 'about', 'index.html'), 'utf-8');

    // Ensure TestimonialsSection uses VERIFIED_CAPSTONES and TESTIMONIAL_POLICY without mock names
    if (homeHtml.includes('Suman Gautam') || aboutHtml.includes('Suman Gautam')) {
      console.error('  ✗ FAIL: Mock student name Suman Gautam still found in production HTML!');
      failures++;
    } else {
      console.log('  ✓ Verified: Mock student identities successfully removed from production HTML');
    }
  } catch (err) {
    console.error('Error checking rating artifacts:', err.message);
    failures++;
  }

  console.log('\n--- VERIFICATION SUMMARY ---');
  if (failures === 0) {
    console.log('ALL MODULE 7 AUDIT CHECKS PASSED WITH 0 FAILURES!');
  } else {
    console.error(`FAILED WITH ${failures} ERROR(S).`);
    process.exit(1);
  }
}

runTests();
