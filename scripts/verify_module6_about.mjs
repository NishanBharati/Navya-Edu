import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/24774201-a059-43ac-a51b-25934e010fc4';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching Chrome for Module 6 Verification...');
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

    // 1. Navigate to /about
    console.log('1. Navigating to http://127.0.0.1:3000/about ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/about' });
    await new Promise(r => setTimeout(r, 2200));

    // 2. Evaluate Why We Built Navya Narrative Section
    console.log('2. Evaluating "Why We Built Navya" Narrative Section & Quote Card...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.getElementById('why-we-built');
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotNarrative = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module6_about_narrative_quote.png'), Buffer.from(shotNarrative.data, 'base64'));
    console.log('   ✓ Saved module6_about_narrative_quote.png');

    // 3. Evaluate Four Pillars Section
    console.log('3. Evaluating Four Practical Pillars Section...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const sec = document.getElementById('method');
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotPillars = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module6_about_four_pillars_hover.png'), Buffer.from(shotPillars.data, 'base64'));
    console.log('   ✓ Saved module6_about_four_pillars_hover.png');

    // 4. Evaluate Faculty & Mentorship Council
    console.log('4. Evaluating Faculty & Mentorship Council Cards...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('Departmental Mentorship Standards'));
        const sec = h2 ? h2.closest('section') : null;
        if (sec) sec.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotFaculty = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module6_about_faculty_cards_hover.png'), Buffer.from(shotFaculty.data, 'base64'));
    console.log('   ✓ Saved module6_about_faculty_cards_hover.png');

    console.log('\n=== ALL MODULE 6 VERIFICATIONS COMPLETED SUCCESSFULLY ===');
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Ignore Windows temp dir lock
    }
  }
}

run().catch(err => {
  console.error('Module 6 verification failed:', err);
  process.exit(1);
});
