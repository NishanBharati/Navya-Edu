import * as chromeLauncher from 'chrome-launcher';
import http from 'http';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/ASUS/.gemini/antigravity-ide/brain/24774201-a059-43ac-a51b-25934e010fc4';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function run() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu', '--window-size=1280,960'],
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

    // 1. Check Home Hero (Video + Floating Badges + Pulsing Indicator)
    console.log('Navigating to http://127.0.0.1:3000/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/' });
    await new Promise(r => setTimeout(r, 2200));

    const shotHome = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    fs.writeFileSync(path.join(outDir, 'module2_home_hero.png'), Buffer.from(shotHome.data, 'base64'));
    console.log('✓ Saved module2_home_hero.png');

    // Scroll down 250px to measure parallax drift on floating badges
    await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollTo({ top: 250, behavior: "instant" })'
    });
    await new Promise(r => setTimeout(r, 400));

    const homeParallaxMetrics = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const badges = document.querySelectorAll('.absolute.-top-4.-left-4, .absolute.-bottom-4.-right-4');
        return Array.from(badges).map(b => ({
          text: b.innerText.split('\\n')[0],
          transform: getComputedStyle(b).transform
        }));
      })()`,
      returnByValue: true,
    });
    console.log('Home floating badges parallax metrics:', homeParallaxMetrics.result.value);

    // 2. Check About Hero (Photography + Live Indicator + Staggered Fact Bar + Parallax Card)
    console.log('Navigating to http://127.0.0.1:3000/about/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/about/' });
    await new Promise(r => setTimeout(r, 2000));

    const shotAbout = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    fs.writeFileSync(path.join(outDir, 'module2_about_hero.png'), Buffer.from(shotAbout.data, 'base64'));
    console.log('✓ Saved module2_about_hero.png');

    // Scroll down 250px on About to measure parallax drift on overlaid campus card
    await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollTo({ top: 250, behavior: "instant" })'
    });
    await new Promise(r => setTimeout(r, 400));

    const aboutParallaxMetrics = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const card = document.querySelector('.absolute.bottom-4.left-4.right-4');
        return {
          cardFound: !!card,
          transform: card ? getComputedStyle(card).transform : 'none'
        };
      })()`,
      returnByValue: true,
    });
    console.log('About overlaid card parallax metrics:', aboutParallaxMetrics.result.value);

    // 3. Check Courses Hero (Search + Telemetry + Parallax Card)
    console.log('Navigating to http://127.0.0.1:3000/courses ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/courses' });
    await new Promise(r => setTimeout(r, 2000));

    const shotCourses = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    fs.writeFileSync(path.join(outDir, 'module2_courses_hero.png'), Buffer.from(shotCourses.data, 'base64'));
    console.log('✓ Saved module2_courses_hero.png');

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    try {
      await chrome.kill();
    } catch (e) {}
  }
}

run();
