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

    console.log('Navigating to http://127.0.0.1:3000/about/ ...');
    await sendCommand('Page.navigate', { url: 'http://127.0.0.1:3000/about/' });
    await new Promise(r => setTimeout(r, 2000));

    // 1. Initial unscrolled desktop state
    const shot1 = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    fs.writeFileSync(path.join(outDir, 'module1_navbar_unscrolled.png'), Buffer.from(shot1.data, 'base64'));
    console.log('✓ Saved module1_navbar_unscrolled.png');

    // 2. Scroll past 80px (e.g. 450px) to show shrunk header and progress bar
    await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollTo({ top: 450, behavior: "instant" })'
    });
    await new Promise(r => setTimeout(r, 600));

    const scrolledHeaderMetrics = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const header = document.getElementById('main-navigation-header');
        const container = header ? header.firstElementChild : null;
        const progressBar = header ? header.querySelector('.bg-gradient-to-r') : null;
        return {
          headerHeight: header ? header.offsetHeight : 0,
          containerHeight: container ? container.offsetHeight : 0,
          headerClasses: header ? header.className : '',
          progressBarExists: !!progressBar,
          progressBarTransform: progressBar ? getComputedStyle(progressBar).transform : 'none',
          scrollY: window.scrollY
        };
      })()`,
      returnByValue: true,
    });
    console.log('Scrolled header metrics:', scrolledHeaderMetrics.result.value);

    const shot2 = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    fs.writeFileSync(path.join(outDir, 'module1_navbar_scrolled.png'), Buffer.from(shot2.data, 'base64'));
    console.log('✓ Saved module1_navbar_scrolled.png');

    // 3. Hover over "Courses" link to demonstrate animated sliding pill
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const coursesLink = document.querySelector('a[href="/courses"]');
        if (coursesLink) {
          coursesLink.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
        }
      })()`
    });
    await new Promise(r => setTimeout(r, 300));

    const shotHover = await sendCommand('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });
    fs.writeFileSync(path.join(outDir, 'module1_navbar_hover_courses.png'), Buffer.from(shotHover.data, 'base64'));
    console.log('✓ Saved module1_navbar_hover_courses.png');

    // 3. Test Mobile Drawer (Viewport 390x844)
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sendCommand('Runtime.evaluate', {
      expression: 'window.scrollTo(0, 0)'
    });
    await new Promise(r => setTimeout(r, 500));

    // Click mobile menu toggle button
    await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-controls="mobile-navigation-drawer"]');
        if (btn) btn.click();
      })()`
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileDrawerMetrics = await sendCommand('Runtime.evaluate', {
      expression: `(() => {
        const drawer = document.getElementById('mobile-navigation-drawer');
        return {
          drawerExists: !!drawer,
          drawerVisible: drawer ? drawer.offsetHeight > 0 : false,
          drawerHeight: drawer ? drawer.offsetHeight : 0,
        };
      })()`,
      returnByValue: true,
    });
    console.log('Mobile drawer metrics:', mobileDrawerMetrics.result.value);

    const shot3 = await sendCommand('Page.captureScreenshot', {
      clip: { x: 0, y: 0, width: 390, height: 750, scale: 1 }
    });
    fs.writeFileSync(path.join(outDir, 'module1_mobile_menu.png'), Buffer.from(shot3.data, 'base64'));
    console.log('✓ Saved module1_mobile_menu.png');

    ws.close();
  } catch (err) {
    console.error('Error during verification:', err);
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Ignore transient file locks on Windows
    }
  }
}

run();
