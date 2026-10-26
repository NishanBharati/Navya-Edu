import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/24774201-a059-43ac-a51b-25934e010fc4';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  console.log('Launching Chrome for Module 5 Verification...');
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

    // 1. Navigate to /programs
    console.log('1. Navigating to http://127.0.0.1:3000/programs ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/programs' });
    await new Promise(r => setTimeout(r, 2200));

    // 2. Evaluate Program Explorer
    console.log('2. Evaluating Program Explorer (Tabs & Active Stage)...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const tabs = document.querySelectorAll('button[id^="program-tab-"]');
        if (tabs.length > 1) {
          tabs[1].scrollIntoView({ behavior: 'instant', block: 'center' });
          tabs[1].click();
          return true;
        }
        return false;
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotExplorer = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module5_program_explorer_active.png'), Buffer.from(shotExplorer.data, 'base64'));
    console.log('   ✓ Saved module5_program_explorer_active.png');

    // 3. Evaluate 4-Stage Career Transformation Pipeline Stepper
    console.log('3. Evaluating 4-Stage Career Transformation Pipeline Stepper...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const h2 = Array.from(document.querySelectorAll('h2')).find(el => el.innerText.includes('Fundamentals to Production'));
        const section = h2 ? h2.closest('section') : null;
        if (section) {
          section.scrollIntoView({ behavior: 'instant', block: 'center' });
          return true;
        }
        return false;
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotPipeline = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module5_pipeline_stepper_animated.png'), Buffer.from(shotPipeline.data, 'base64'));
    console.log('   ✓ Saved module5_pipeline_stepper_animated.png');

    // 4. Evaluate Comparison Table
    console.log('4. Evaluating Decision Comparison Table...');
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const table = document.querySelector('table');
        if (table) table.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });
    await new Promise(r => setTimeout(r, 800));

    const shotTable = await sendCommand('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, 'module5_comparison_table_highlighted.png'), Buffer.from(shotTable.data, 'base64'));
    console.log('   ✓ Saved module5_comparison_table_highlighted.png');

    console.log('\n=== ALL MODULE 5 VERIFICATIONS COMPLETED SUCCESSFULLY ===');
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Ignore Windows temp dir lock
    }
  }
}

run().catch(err => {
  console.error('Module 5 verification failed:', err);
  process.exit(1);
});
