import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1280,1050'],
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

    const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9';

    // 1. Insights listing page
    console.log('Navigating to http://127.0.0.1:3000/insights/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/insights/' });
    await new Promise(r => setTimeout(r, 2000));
    const listingShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'insights_listing_page.png'), Buffer.from(listingShot.data, 'base64'));
    console.log('✓ Captured insights_listing_page.png');

    // 2. Article detail page (with Table of Contents and Code Snippet)
    console.log('Navigating to TypeScript article detail...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/insights/why-typescript-is-essential-for-modern-web-development/' });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to Table of Contents and Code block
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 750, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 600));

    const articleShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'article_toc_and_code.png'), Buffer.from(articleShot.data, 'base64'));
    console.log('✓ Captured article_toc_and_code.png');

    // 3. Test 404 missing article handling
    console.log('Navigating to missing article route...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/insights/non-existent-sample-slug/' });
    await new Promise(r => setTimeout(r, 1500));
    const missingShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'article_missing_state.png'), Buffer.from(missingShot.data, 'base64'));
    console.log('✓ Captured article_missing_state.png');

    ws.close();
  } finally {
    try { await chrome.kill(); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Module 9 capture error:', err);
});
