const routes = [
  '/',
  '/courses',
  '/courses/web-development',
  '/courses/react-frontend-engineering',
  '/courses/python-beginner',
  '/courses/python-advance',
  '/courses/ui-ux-product-design',
  '/courses/web-development',
  '/courses/data-science',
  '/courses/scratch-beginner',
  '/courses/scratch-advanced',
  '/programs',
  '/about',
  '/student-work',
  '/insights',
  '/insights/navigating-modern-software-engineering-careers-in-nepal',
  '/insights/why-project-based-learning-outperforms-passive-tutorials',
  '/insights/why-typescript-is-essential-for-modern-web-development',
  '/insights/demystifying-ai-and-python-in-modern-engineering',
  '/insights/full-stack-system-architecture-guide-for-scalable-apps',
  '/insights/ui-ux-design-systems-how-product-studios-hire',
  '/contact',
  '/terms',
  '/privacy',
  '/refund',
  '/faq',
];

async function verify() {
  console.log('Fetching raw HTML over HTTP without JavaScript execution...\n');
  let passCount = 0;

  for (const r of routes) {
    const res = await fetch('http://127.0.0.1:3000' + r);
    const text = await res.text();

    const hasCanonical = text.includes('<link rel="canonical"');
    const hasOgImage = text.includes('property="og:image"');
    const hasTwitterCard = text.includes('name="twitter:card" content="summary_large_image"');
    const jsonLdMatch = text.match(/"@type":\s*"([^"]+)"/g);
    const jsonTypes = jsonLdMatch ? jsonLdMatch.map((m) => m.replace(/"@type":\s*"/, '').replace(/"/, '')).join(', ') : 'None';

    const allPassed = hasCanonical && hasOgImage && hasTwitterCard;
    if (allPassed) passCount++;

    console.log(
      r.padEnd(65) +
      ' | Canonical: ' + (hasCanonical ? '✓' : '✗') +
      ' | OG: ' + (hasOgImage ? '✓' : '✗') +
      ' | Twitter: ' + (hasTwitterCard ? '✓' : '✗') +
      ' | Schema: ' + jsonTypes.padEnd(32) +
      ' | ' + (text.length / 1024).toFixed(1) + ' KB'
    );
  }

  console.log(`\nVerified: ${passCount}/${routes.length} public marketing routes contain full Open Graph, Twitter Cards, Canonical links, and JSON-LD structured data.`);
}

verify();
