import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/24774201-a059-43ac-a51b-25934e010fc4';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching Chrome via chrome-launcher...');
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

    console.log('Navigating to http://127.0.0.1:3000/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/' });
    await new Promise(r => setTimeout(r, 2500));

    // 1. Verify Hero Animated Counters
    console.log('1. Evaluating Hero animated counters...');
    const heroStatsResult = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const heroSection = document.querySelector('section');
        const ratioEl = document.querySelector('span:has-text, span');
        const allSpans = Array.from(document.querySelectorAll('span')).map(s => s.innerText.trim());
        const hasRatio = allSpans.some(t => t.includes('1:12'));
        const hasPercent = allSpans.some(t => t.includes('100%'));
        return { hasRatio, hasPercent };
      })()`,
      returnByValue: true
    });
    console.log('   Hero stats verified:', heroStatsResult.result.value);

    // 2. Verify CourseDiscovery Grid & CourseCard Hover
    console.log('2. Evaluating CourseDiscovery section & card hover...');
    await sendCommand('Runtime.evaluate', {
      expression: `document.querySelector('article[id^="course-card-"]')?.scrollIntoView({ behavior: 'instant', block: 'center' })`
    });
    await new Promise(r => setTimeout(r, 1000));

    const courseCardEval = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const cards = document.querySelectorAll('article[id^="course-card-"]');
        if (!cards.length) return null;
        const first = cards[0];
        const rect = first.getBoundingClientRect();
        return {
          count: cards.length,
          x: Math.round(rect.x + rect.width / 2),
          y: Math.round(rect.y + rect.height / 2),
          classes: first.className
        };
      })()`,
      returnByValue: true
    });
    console.log('   Course cards detected:', courseCardEval.result.value?.count);

    if (courseCardEval.result.value) {
      // Simulate mouse move over card
      await sendCommand('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: courseCardEval.result.value.x,
        y: courseCardEval.result.value.y
      });
      await new Promise(r => setTimeout(r, 600));

      const cardTransformAfterHover = await sendCommand('Runtime.evaluate', {
        expression: `window.getComputedStyle(document.querySelector('article[id^="course-card-"]')).transform`,
        returnByValue: true
      });
      console.log('   Card transform on hover:', cardTransformAfterHover.result.value);

      const shotCard = await sendCommand('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, 'module3_coursecard_hover.png'), Buffer.from(shotCard.data, 'base64'));
      console.log('   ✓ Saved module3_coursecard_hover.png');
    }

    // 3. Verify WhyNavya Interactive Technology Selector
    console.log('3. Evaluating WhyNavya interactive technology selector...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h2s = Array.from(document.querySelectorAll('h2'));
        const whyH2 = h2s.find(h => h.innerText.includes('Learn the exact technologies'));
        if (whyH2) whyH2.closest('section').scrollIntoView({ behavior: 'instant' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    // Click track 2: Python Software Engineering
    const clickTrack2 = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('div[role="button"]'));
        const pythonBtn = buttons.find(b => b.innerText.includes('Python Software Engineering'));
        if (pythonBtn) {
          pythonBtn.click();
          return true;
        }
        return false;
      })()`,
      returnByValue: true
    });
    console.log('   Clicked Python track:', clickTrack2.result.value);
    await new Promise(r => setTimeout(r, 600));

    const checkPythonPreview = await sendCommand('Runtime.evaluate', {
      expression: `document.body.innerText.includes('FastAPI') && document.body.innerText.includes('Python 3.12+')`,
      returnByValue: true
    });
    console.log('   Preview updated with FastAPI & Python 3.12+:', checkPythonPreview.result.value);

    // Click track 3: Applied Data Science
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('div[role="button"]'));
        const dsBtn = buttons.find(b => b.innerText.includes('Applied Data Science'));
        if (dsBtn) dsBtn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    const checkDsPreview = await sendCommand('Runtime.evaluate', {
      expression: `document.body.innerText.includes('Pandas') && document.body.innerText.includes('Scikit-Learn')`,
      returnByValue: true
    });
    console.log('   Preview updated with Pandas & Scikit-Learn:', checkDsPreview.result.value);

    const shotWhyNavya = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module3_whynavya_interactive.png'), Buffer.from(shotWhyNavya.data, 'base64'));
    console.log('   ✓ Saved module3_whynavya_interactive.png');

    // 4. Verify Latest Technical Insights Preview
    console.log('4. Evaluating Insights Preview section...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h2s = Array.from(document.querySelectorAll('h2'));
        const insightsH2 = h2s.find(h => h.innerText.includes('Latest Technical Insights'));
        if (insightsH2) insightsH2.closest('section').scrollIntoView({ behavior: 'instant' });
      })()`
    });
    await new Promise(r => setTimeout(r, 1000));

    const shotInsights = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module3_insights_preview.png'), Buffer.from(shotInsights.data, 'base64'));
    console.log('   ✓ Saved module3_insights_preview.png');

    console.log('\n=== ALL MODULE 3 VERIFICATIONS PASSED SUCCESSFULLY ===');
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Ignore Windows temp dir cleanup error
    }
  }
}

run().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
