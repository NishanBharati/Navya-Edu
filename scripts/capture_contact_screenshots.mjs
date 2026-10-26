import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1280,950'],
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

    console.log('Navigating to http://127.0.0.1:3000/contact/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/contact/' });
    await new Promise(r => setTimeout(r, 2500));

    // Capture initial contact form
    const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9';
    const initShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_form_view.png'), Buffer.from(initShot.data, 'base64'));
    console.log('✓ Captured contact_form_view.png');

    // Fill form using Runtime.evaluate
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const nameInput = document.getElementById('contact-fullname');
        const emailInput = document.getElementById('contact-email');
        const phoneInput = document.getElementById('contact-phone');
        const messageInput = document.getElementById('contact-message');
        const privacyCheck = document.getElementById('contact-privacy');

        if (nameInput) {
          nameInput.value = 'Rajan Shrestha';
          nameInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (emailInput) {
          emailInput.value = 'rajan.shrestha@example.com';
          emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (phoneInput) {
          phoneInput.value = '9841987654';
          phoneInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (messageInput) {
          messageInput.value = 'Inquiring about syllabus modules and the 3-part installment plan in NPR for the MERN Stack Cohort.';
          messageInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (privacyCheck) {
          privacyCheck.checked = true;
          privacyCheck.dispatchEvent(new Event('change', { bubbles: true }));
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 800));
    const filledShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_form_filled.png'), Buffer.from(filledShot.data, 'base64'));
    console.log('✓ Captured contact_form_filled.png');

    // Submit form
    console.log('Submitting contact form...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const form = document.querySelector('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 3000));
    const confirmedShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'contact_inquiry_confirmed.png'), Buffer.from(confirmedShot.data, 'base64'));
    console.log('✓ Captured contact_inquiry_confirmed.png');

    // Navigate to course detail page and capture CourseInquiryForm
    console.log('Navigating to course inquiry...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/courses/web-development/#inquiry' });
    await new Promise(r => setTimeout(r, 2500));
    const courseInquiryShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'course_inquiry_section.png'), Buffer.from(courseInquiryShot.data, 'base64'));
    console.log('✓ Captured course_inquiry_section.png');

    ws.close();
  } finally {
    await chrome.kill();
  }
}

main().catch(err => {
  console.error('Fatal screenshot error:', err);
  process.exit(1);
});
