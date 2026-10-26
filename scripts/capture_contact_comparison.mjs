import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/24774201-a059-43ac-a51b-25934e010fc4';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function capture(tag = 'before') {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1280,1000'],
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

    ws.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data.toString());
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('[BROWSER CONSOLE]', msg.params.type, msg.params.args.map(a => a.value || a.description).join(' '));
        }
        if (msg.method === 'Runtime.exceptionThrown') {
          console.error('[BROWSER EXCEPTION]', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
        }
      } catch (e) {}
    });

    console.log(`Navigating to http://127.0.0.1:3000/contact/ (${tag})...`);
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/contact/' });
    await new Promise(r => setTimeout(r, 2500));

    // Capture desktop hero and form view
    const heroShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `contact_${tag}_desktop.png`), Buffer.from(heroShot.data, 'base64'));
    console.log(`✓ Saved contact_${tag}_desktop.png`);

    // Capture full page
    const metrics = await sendCommand('Page.getLayoutMetrics');
    const contentSize = metrics.contentSize;
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: Math.ceil(contentSize.height),
      deviceScaleFactor: 1,
      mobile: false,
    });
    await new Promise(r => setTimeout(r, 800));
    const fullShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `contact_${tag}_full.png`), Buffer.from(fullShot.data, 'base64'));
    console.log(`✓ Saved contact_${tag}_full.png`);

    ws.close();
  } finally {
    if (chrome) {
      try {
        await chrome.kill();
      } catch (e) {
        // Ignore Windows EPERM tmp dir lock
      }
    }
  }
}

const tag = process.argv[2] || 'before';
capture(tag).catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
