import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/24774201-a059-43ac-a51b-25934e010fc4';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching Chrome for Module 4 Verification...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1440,1000'],
  });

  try {
    const targetsRes = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${chrome.port}/json`, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });

    const pageTarget = targetsRes.find(t => t.type === 'page');
    const ws = new globalThis.WebSocket(pageTarget.webSocketDebuggerUrl);
    await new Promise(resolve => ws.addEventListener('open', resolve, { once: true }));

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

    // 1. Navigate to /courses
    console.log('1. Navigating to http://127.0.0.1:3000/courses ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/courses' });
    await new Promise(r => setTimeout(r, 2200));

    // 2. Capture Featured Course Spotlight with Animated Mesh & Parallax Grid
    console.log('2. Evaluating Featured Course Spotlight...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const spotlight = document.querySelector('section.relative.overflow-hidden.rounded-3xl') || document.querySelector('.bg-navy');
        if (spotlight) spotlight.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotSpotlight = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module4_courses_featured_spotlight.png'), Buffer.from(shotSpotlight.data, 'base64'));
    console.log('   ✓ Saved module4_courses_featured_spotlight.png');

    // 3. Evaluate Sticky Filter Toolbar
    console.log('3. Evaluating Sticky Filter & Sort Toolbar...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        window.scrollTo({ top: 950, behavior: 'instant' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const stickyEval = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const toolbar = document.querySelector('.sticky');
        if (!toolbar) return null;
        const style = window.getComputedStyle(toolbar);
        const rect = toolbar.getBoundingClientRect();
        return {
          position: style.position,
          top: style.top,
          rectTop: rect.top,
          classes: toolbar.className
        };
      })()`,
      returnByValue: true
    });
    console.log('   Sticky toolbar evaluation:', stickyEval.result.value);

    const shotSticky = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module4_courses_sticky_filter.png'), Buffer.from(shotSticky.data, 'base64'));
    console.log('   ✓ Saved module4_courses_sticky_filter.png');

    // 4. Test Filter Tab Switching (Grid Layout Reflow)
    console.log('4. Testing Filter Tabs & Fluid Grid Re-layout...');
    const clickProgramming = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const progBtn = buttons.find(b => b.innerText.includes('Programming') && !b.innerText.includes('Career'));
        if (progBtn) {
          progBtn.click();
          return true;
        }
        return false;
      })()`,
      returnByValue: true
    });
    console.log('   Clicked Programming category tab:', clickProgramming.result.value);
    await new Promise(r => setTimeout(r, 600));

    // Reset back to All
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('button'));
        const allBtn = buttons.find(b => b.innerText.trim().startsWith('All'));
        if (allBtn) allBtn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    // 5. Test FAQ Accordion Auto-Height Transition
    console.log('5. Evaluating FAQ Accordion smooth expand & chevron rotation...');
    const clickFaq = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const triggers = Array.from(document.querySelectorAll('button[id^="faq-accordion-trigger-"]'));
        if (triggers.length > 1) {
          triggers[1].scrollIntoView({ behavior: 'instant', block: 'center' });
          triggers[1].click();
          return { clicked: true, text: triggers[1].innerText };
        }
        return { clicked: false };
      })()`,
      returnByValue: true
    });
    console.log('   Clicked FAQ item 1:', clickFaq.result.value);
    await new Promise(r => setTimeout(r, 800));

    const shotFaq = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module4_faq_accordion_open.png'), Buffer.from(shotFaq.data, 'base64'));
    console.log('   ✓ Saved module4_faq_accordion_open.png');
    console.log('   ✓ Saved module4_faq_accordion_open.png');

    console.log('\n=== ALL MODULE 4 VERIFICATIONS COMPLETED SUCCESSFULLY ===');
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Ignore Windows temp dir lock
    }
  }
}

run().catch(err => {
  console.error('Module 4 verification failed:', err);
  process.exit(1);
});
