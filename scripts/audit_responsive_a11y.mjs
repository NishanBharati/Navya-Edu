import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const BREAKPOINTS = [320, 375, 390, 768, 1024, 1280, 1440];
const BASE_URL = 'http://127.0.0.1:4173';

const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Course Detail', path: '/courses/web-development' },
  { name: 'Programs', path: '/programs' },
  { name: 'About', path: '/about' },
  { name: 'Student Work', path: '/student-work' },
  { name: 'Insights', path: '/insights' },
  { name: 'Blog Detail', path: '/insights/navigating-modern-software-engineering-careers-in-nepal' },
  { name: 'Contact', path: '/contact' },
  { name: 'FAQ', path: '/faq' },
];

async function main() {
  console.log('Launching headless Chrome for Responsive & Accessibility Audit...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1440,1080'],
  });

  try {
    const targetsRes = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${chrome.port}/json`, (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });

    const pageTarget = targetsRes.find((t) => t.type === 'page');
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error('No page websocket target');
    }

    const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise((resolve) => ws.addEventListener('open', resolve, { once: true }));

    let msgId = 1;
    function sendCommand(method, params = {}) {
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

    await sendCommand('Page.enable');
    await sendCommand('Runtime.enable');
    await sendCommand('DOM.enable');

    const auditResults = {
      responsive: [],
      accessibility: [],
    };

    console.log('\n======================================================');
    console.log('1. TESTING RESPONSIVE BREAKPOINTS & HORIZONTAL OVERFLOW');
    console.log('======================================================\n');

    for (const page of PAGES) {
      const pageUrl = `${BASE_URL}${page.path}`;
      console.log(`Checking Page: ${page.name} (${page.path})`);

      for (const width of BREAKPOINTS) {
        // Emulate device metrics
        await sendCommand('Emulation.setDeviceMetricsOverride', {
          width,
          height: 800,
          deviceScaleFactor: 1,
          mobile: width < 1024,
        });

        await sendCommand('Page.navigate', { url: pageUrl });
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Evaluate overflow & bounding rect violations
        const overflowCheck = await sendCommand('Runtime.evaluate', {
          expression: `
            (() => {
              const docWidth = document.documentElement.clientWidth;
              const scrollWidth = document.documentElement.scrollWidth;
              const hasDocOverflow = scrollWidth > docWidth;

              // Helper to test if element is properly clipped by a contained scroll/overflow ancestor
              function isClippedByAncestor(node) {
                let parent = node.parentElement;
                while (parent && parent !== document.documentElement && parent !== document.body) {
                  const style = window.getComputedStyle(parent);
                  const overflowX = style.overflowX;
                  if (overflowX === 'hidden' || overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'clip') {
                    const pRect = parent.getBoundingClientRect();
                    if (pRect.right <= docWidth + 2) {
                      return true;
                    }
                  }
                  parent = parent.parentElement;
                }
                return false;
              }

              // Find uncontained elements causing horizontal overflow
              const overflowingElements = [];
              const allEls = document.querySelectorAll('*');
              for (const el of allEls) {
                const rect = el.getBoundingClientRect();
                if (rect.right > docWidth + 2) {
                  if (!isClippedByAncestor(el)) {
                    const tag = el.tagName.toLowerCase();
                    const id = el.id ? '#' + el.id : '';
                    const cls = el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : '';
                    overflowingElements.push({
                      selector: tag + id + cls,
                      right: Math.round(rect.right),
                      width: Math.round(rect.width),
                      excess: Math.round(rect.right - docWidth)
                    });
                  }
                }
              }

              return {
                docWidth,
                scrollWidth,
                hasDocOverflow: scrollWidth > docWidth + 1 || overflowingElements.length > 0,
                overflowingElements: overflowingElements.slice(0, 5) // top 5
              };
            })()
          `,
          returnByValue: true,
        });

        const res = overflowCheck.result.value;
        if (res.hasDocOverflow) {
          console.log(`  ✗ [${width}px] OVERFLOW DETECTED: scrollWidth (${res.scrollWidth}px) > docWidth (${res.docWidth}px)`);
          res.overflowingElements.forEach((el) => {
            console.log(`    - ${el.selector}: right=${el.right}px (+${el.excess}px)`);
          });
          auditResults.responsive.push({
            page: page.name,
            path: page.path,
            width,
            ...res,
          });
        } else {
          console.log(`  ✓ [${width}px] OK (scrollWidth: ${res.scrollWidth}px <= docWidth: ${res.docWidth}px)`);
        }
      }
    }

    console.log('\n======================================================');
    console.log('2. TESTING ACCESSIBILITY (SEMANTICS, LABELS, HEADINGS)');
    console.log('======================================================\n');

    // Restore desktop view for a11y checks
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });

    for (const page of PAGES) {
      const pageUrl = `${BASE_URL}${page.path}`;
      await sendCommand('Page.navigate', { url: pageUrl });
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const a11yCheck = await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const issues = [];

            // 1. Heading hierarchy check
            const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
              level: parseInt(h.tagName[1]),
              text: h.innerText.trim().slice(0, 40)
            }));

            const h1Count = headings.filter(h => h.level === 1).length;
            if (h1Count === 0) {
              issues.push({ type: 'HEADING', message: 'Missing <h1> heading' });
            } else if (h1Count > 1) {
              issues.push({ type: 'HEADING', message: 'Multiple <h1> headings found (' + h1Count + ')' });
            }

            for (let i = 0; i < headings.length - 1; i++) {
              if (headings[i + 1].level > headings[i].level + 1) {
                issues.push({
                  type: 'HEADING_SKIP',
                  message: 'Skipped heading level: <h' + headings[i].level + '> ("' + headings[i].text + '") to <h' + headings[i + 1].level + '> ("' + headings[i + 1].text + '")'
                });
              }
            }

            // 2. Form input labels
            const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
            inputs.forEach(inp => {
              const id = inp.id;
              const hasLabel = id && document.querySelector('label[for="' + id + '"]');
              const hasAriaLabel = inp.getAttribute('aria-label') || inp.getAttribute('aria-labelledby');
              const hasWrappedLabel = inp.closest('label');
              const isHoneypot = inp.name === 'website_hp' || inp.id === 'website_hp';

              if (!hasLabel && !hasAriaLabel && !hasWrappedLabel && !isHoneypot) {
                issues.push({
                  type: 'FORM_LABEL',
                  message: 'Form input missing label: ' + (inp.name || inp.id || inp.placeholder || inp.tagName)
                });
              }
            });

            // 3. Image alt text
            const images = document.querySelectorAll('img');
            images.forEach(img => {
              if (!img.hasAttribute('alt')) {
                issues.push({
                  type: 'IMG_ALT_MISSING',
                  message: 'Image missing alt attribute: ' + (img.src || '').slice(-40)
                });
              } else if (img.getAttribute('alt').trim() === '' && img.getAttribute('role') !== 'presentation') {
                // decorative images should have empty alt or role=presentation, check if meaningful
              }
            });

            // 4. Buttons and links accessible name
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn => {
              const name = btn.innerText.trim() || btn.getAttribute('aria-label') || btn.getAttribute('title');
              if (!name) {
                issues.push({
                  type: 'BUTTON_NAME',
                  message: 'Button missing accessible name: class="' + btn.className.slice(0, 30) + '"'
                });
              }
            });

            const links = document.querySelectorAll('a[href]');
            links.forEach(a => {
              const name = a.innerText.trim() || a.getAttribute('aria-label') || a.getAttribute('title') || a.querySelector('img')?.getAttribute('alt');
              if (!name) {
                issues.push({
                  type: 'LINK_NAME',
                  message: 'Link missing accessible name: href="' + a.getAttribute('href') + '"'
                });
              }
            });

            return { headingsCount: headings.length, issues };
          })()
        `,
        returnByValue: true,
      });

      const a11y = a11yCheck.result.value;
      console.log(`A11y Check for ${page.name}: ${a11y.issues.length} issue(s) found`);
      a11y.issues.forEach((iss) => {
        console.log(`  - [${iss.type}] ${iss.message}`);
      });
      auditResults.accessibility.push({
        page: page.name,
        path: page.path,
        ...a11y,
      });
    }

    fs.writeFileSync(
      path.resolve('./audit_responsive_a11y_results.json'),
      JSON.stringify(auditResults, null, 2),
      'utf-8'
    );
    console.log('\nSaved audit results to audit_responsive_a11y_results.json');
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {}
    }
  }
}

main().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
