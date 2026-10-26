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

    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/about/' });
    await new Promise(resolve => setTimeout(resolve, 2000));

    const artifactDir = path.resolve('C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9');

    // 1. Hero Screenshot
    const heroShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'about_hero_institution.png'), Buffer.from(heroShot.data, 'base64'));
    console.log('Saved about_hero_institution.png');

    // 2. Scroll to What We Offer & Who We Serve
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 580, behavior: 'instant' });`
    });
    await new Promise(resolve => setTimeout(resolve, 600));
    const offerShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'about_offer_and_audience.png'), Buffer.from(offerShot.data, 'base64'));
    console.log('Saved about_offer_and_audience.png');

    // 3. Scroll to Departmental Mentorship Standards
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 2100, behavior: 'instant' });`
    });
    await new Promise(resolve => setTimeout(resolve, 600));
    const facultyShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'about_faculty_mentorship_standards.png'), Buffer.from(facultyShot.data, 'base64'));
    console.log('Saved about_faculty_mentorship_standards.png');

    // 4. Scroll to Institutional Governance & Policies
    await sendCommand('Runtime.evaluate', {
      expression: `window.scrollTo({ top: 4800, behavior: 'instant' });`
    });
    await new Promise(resolve => setTimeout(resolve, 600));
    const policyShot = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(artifactDir, 'about_governance_cards.png'), Buffer.from(policyShot.data, 'base64'));
    console.log('Saved about_governance_cards.png');

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
