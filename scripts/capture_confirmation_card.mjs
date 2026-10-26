import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function main() {
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

    const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9';

    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/contact/' });
    await new Promise(r => setTimeout(r, 2000));

    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 450, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 500));

    // Focus and type into inputs directly
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const simulateType = (selector, value) => {
          const el = document.querySelector(selector);
          if (!el) return;
          el.focus();
          // Use input event with data
          const proto = el instanceof HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
          const descriptor = Object.getOwnPropertyDescriptor(proto, 'value');
          if (descriptor && descriptor.set) {
            descriptor.set.call(el, value);
          } else {
            el.value = value;
          }
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.blur();
        };

        simulateType('#contact-fullname', 'Rajan Shrestha');
        simulateType('#contact-email', 'rajan.shrestha@example.com');
        simulateType('#contact-phone', '9841987654');
        simulateType('#contact-message', 'Inquiring about upcoming cohort dates, syllabus modules, and installment plans in NPR.');

        const checkbox = document.querySelector('#contact-privacy');
        if (checkbox) {
          checkbox.click();
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 800));

    // Capture filled with checkbox checked
    const filledShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_valid_filled.png'), Buffer.from(filledShot.data, 'base64'));
    console.log('✓ Captured contact_valid_filled.png');

    // Click submit
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const submitBtn = document.querySelector('form button[type="submit"]');
        if (submitBtn) submitBtn.click();
      })()`
    });

    await new Promise(r => setTimeout(r, 2500));

    const confirmedShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_confirmation_card.png'), Buffer.from(confirmedShot.data, 'base64'));
    console.log('✓ Captured contact_confirmation_card.png');

    ws.close();
  } finally {
    try { await chrome.kill(); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Test error:', err);
});
