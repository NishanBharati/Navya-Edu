import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  console.log('Navigating to contact page...');
  await page.goto('http://127.0.0.1:3000/contact', { waitUntil: 'networkidle2' });

  // Capture Contact page initial view with privacy checkbox and honeypot
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9/contact_form_initial.png' });
  console.log('✓ Captured contact_form_initial.png');

  // Fill in form fields
  await page.type('#contact-fullname', 'Sneha Adhikari');
  await page.type('#contact-email', 'sneha.adhikari@example.com');
  await page.type('#contact-phone', '9841234567');
  await page.type('#contact-message', 'Inquiring about syllabus modules and the 3-part installment plan in NPR for the MERN Stack Cohort.');
  
  // Check the privacy consent checkbox
  await page.click('#contact-privacy');

  // Capture filled form
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9/contact_form_filled.png' });
  console.log('✓ Captured contact_form_filled.png');

  // Submit the form
  console.log('Submitting contact form...');
  await page.click('button[type="submit"]');

  // Wait for submission confirmation
  await page.waitForFunction(() => document.body.innerText.includes('Inquiry Successfully Registered') || document.body.innerText.includes('Thank You'), { timeout: 8000 });
  
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9/contact_form_submitted.png' });
  console.log('✓ Captured contact_form_submitted.png');

  // Navigate to course detail inquiry form to verify course inquiry
  console.log('Navigating to course inquiry form...');
  await page.goto('http://127.0.0.1:3000/courses/web-development#inquiry', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity-ide/brain/d7f237e9-5c11-4b7a-bbd6-d07483c392d9/course_inquiry_verified.png' });
  console.log('✓ Captured course_inquiry_verified.png');

  await page.close();
  browser.disconnect();
  console.log('Done.');
})();
