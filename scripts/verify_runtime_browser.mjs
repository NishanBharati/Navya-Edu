import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('Launching headless Chrome via chrome-launcher...');
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1440,1080'],
  });

  try {
    // 1. Get websocket debug URL
    const targetsRes = await new Promise((resolve, reject) => {
      http.get(`http://127.0.0.1:${chrome.port}/json`, (res) => {
        let raw = '';
        res.on('data', chunk => raw += chunk);
        res.on('end', () => resolve(JSON.parse(raw)));
      }).on('error', reject);
    });

    const pageTarget = targetsRes.find(t => t.type === 'page');
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error('No page websocket debugger target found');
    }

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

    console.log('Navigating to http://127.0.0.1:3000/courses/web-development/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/courses/web-development/' });

    // Wait for load event
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Test form interaction: Fill in inquiry form
    console.log('Evaluating inquiry form interaction...');
    const fillResult = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const nameInput = document.querySelector('#fullName');
          const emailInput = document.querySelector('#email');
          const phoneInput = document.querySelector('#phone');
          const submitBtn = document.querySelector('#inquiry button[type="submit"]');

          if (!nameInput || !emailInput || !phoneInput || !submitBtn) {
            return { error: 'Form elements not found' };
          }

          // Native value setter for React inputs
          function setReactValue(input, val) {
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            nativeInputValueSetter.call(input, val);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
          }

          setReactValue(nameInput, 'Nishan Bharati');
          setReactValue(emailInput, 'nishan@example.com');
          setReactValue(phoneInput, '9812345678');

          submitBtn.click();
          return { success: true, name: nameInput.value, email: emailInput.value, phone: phoneInput.value };
        })()
      `,
      returnByValue: true
    });

    console.log('Form fill and submit result:', fillResult.result.value);

    // Wait 1.5s for submission & local storage recording
    await new Promise(resolve => setTimeout(resolve, 1500));

    const checkResult = await sendCommand('Runtime.evaluate', {
      expression: `
        (() => {
          const raw = localStorage.getItem('navya_offline_inquiries');
          const parsed = raw ? JSON.parse(raw) : [];
          const successHeading = document.querySelector('#inquiry h4')?.textContent;
          const refText = document.querySelector('#inquiry .font-mono')?.textContent;
          const whatsappBtn = document.querySelector('#inquiry a[href*="wa.me"]');

          return {
            localStorageEntries: parsed.length,
            latestInquiry: parsed[0],
            heading: successHeading,
            reference: refText,
            hasWhatsAppBtn: !!whatsappBtn,
            whatsappHref: whatsappBtn?.getAttribute('href')
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Post-submission state:', JSON.stringify(checkResult.result.value, null, 2));

    // Capture screenshot of the course page
    const screenshotData = await sendCommand('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(screenshotData.data, 'base64');
    const artifactDir = path.resolve('C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9');
    const screenshotPath = path.join(artifactDir, 'course_detail_runtime.png');
    fs.writeFileSync(screenshotPath, buffer);
    console.log(`Saved screenshot to: ${screenshotPath}`);

    ws.close();
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Ignored: Windows temporary file lock during browser termination
    }
  }
}

main().catch(err => {
  console.error('Browser verification failed:', err);
  process.exit(1);
});
