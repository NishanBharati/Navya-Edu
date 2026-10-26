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

    // 1. Visit Contact page and scroll to the form
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/contact/' });
    await new Promise(r => setTimeout(r, 2000));

    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 450, behavior: 'instant' })`
    });
    await new Promise(r => setTimeout(r, 500));

    // Type fields slowly and trigger React events
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const setVal = (selector, val) => {
          const el = document.querySelector(selector);
          if (!el) return;
          const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value') ||
                               Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value');
          if (nativeSetter && nativeSetter.set) {
            nativeSetter.set.call(el, val);
          } else {
            el.value = val;
          }
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        };

        setVal('#contact-fullname', 'Rajan Shrestha');
        setVal('#contact-email', 'rajan.shrestha@example.com');
        setVal('#contact-phone', '9841987654');
        setVal('#contact-message', 'Inquiring about upcoming cohort dates and syllabus details.');

        const checkbox = document.querySelector('#contact-privacy');
        if (checkbox) {
          checkbox.checked = true;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 800));
    const formFilledShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_form_filled_scrolled.png'), Buffer.from(formFilledShot.data, 'base64'));
    console.log('✓ Captured contact_form_filled_scrolled.png');

    // Click submit button
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('form button[type="submit"]');
        if (btn) btn.click();
      })()`
    });

    await new Promise(r => setTimeout(r, 2500));
    const successShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_submission_success.png'), Buffer.from(successShot.data, 'base64'));
    console.log('✓ Captured contact_submission_success.png');

    // 2. Scroll to Course Inquiry section on course page
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/courses/web-development/' });
    await new Promise(r => setTimeout(r, 2000));
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const target = document.getElementById('inquiry');
        if (target) {
          target.scrollIntoView({ behavior: 'instant' });
        }
      })()`
    });
    await new Promise(r => setTimeout(r, 800));
    const courseInquiryShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'course_inquiry_form_scrolled.png'), Buffer.from(courseInquiryShot.data, 'base64'));
    console.log('✓ Captured course_inquiry_form_scrolled.png');

    ws.close();
  } finally {
    try { await chrome.kill(); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Screenshot error:', err);
});
