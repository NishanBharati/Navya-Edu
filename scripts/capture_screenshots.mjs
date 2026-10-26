import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1280,900'],
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

    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/courses/web-development/' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    const artifactDir = path.resolve('C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9');

    // 1. Hero & Cohort Screenshot
    const heroShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'course_hero_payment.png'), Buffer.from(heroShot.data, 'base64'));
    console.log('Saved course_hero_payment.png');

    // 2. Scroll to certificate
    await sendCommand('Runtime.evaluate', { expression: `document.querySelector('#certificate').scrollIntoView();` });
    await new Promise(resolve => setTimeout(resolve, 600));
    const certShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'course_certificate_credential.png'), Buffer.from(certShot.data, 'base64'));
    console.log('Saved course_certificate_credential.png');

    // 3. Scroll to instructor
    await sendCommand('Runtime.evaluate', { expression: `document.querySelector('#instructor').scrollIntoView();` });
    await new Promise(resolve => setTimeout(resolve, 600));
    const instShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'course_faculty_mentorship.png'), Buffer.from(instShot.data, 'base64'));
    console.log('Saved course_faculty_mentorship.png');

    // 4. Scroll to inquiry form
    await sendCommand('Runtime.evaluate', { expression: `document.querySelector('#inquiry').scrollIntoView();` });
    await new Promise(resolve => setTimeout(resolve, 600));
    const inqShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'course_inquiry_form.png'), Buffer.from(inqShot.data, 'base64'));
    console.log('Saved course_inquiry_form.png');

    ws.close();
  } finally {
    try {
      await chrome.kill();
    } catch (e) {}
  }
}

main().catch(err => {
  console.error('Screenshot capture failed:', err);
});
