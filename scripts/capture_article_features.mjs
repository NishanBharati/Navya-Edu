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

    // 1. Re-navigate to why-typescript-is-essential-for-modern-web-development
    console.log('Navigating to TypeScript article with updated build...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/insights/why-typescript-is-essential-for-modern-web-development/' });
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to the Table of Contents & Code Block
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('nav[aria-label="Table of contents"]');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    const tocShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'article_toc_verified.png'), Buffer.from(tocShot.data, 'base64'));
    console.log('✓ Captured article_toc_verified.png');

    // Scroll to code snippet
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('pre');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    const codeShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'article_code_snippet_verified.png'), Buffer.from(codeShot.data, 'base64'));
    console.log('✓ Captured article_code_snippet_verified.png');

    ws.close();
  } finally {
    try { await chrome.kill(); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Capture error:', err);
});
