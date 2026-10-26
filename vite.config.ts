import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function ssrDevPlugin(): Plugin {
  return {
    name: 'vite-ssr-dev-plugin',
    apply: 'serve',
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        const rawUrl = (ctx.originalUrl && ctx.originalUrl.split('?')[0]) || ctx.path || '/';
        const url = rawUrl === '/index.html' ? '/' : rawUrl;
        if (!url || url.startsWith('/admin') || path.extname(url) !== '') {
          return html;
        }

        try {
          const { render } = await ctx.server!.ssrLoadModule('/src/entry-server.tsx');
          const BASE_URL = (
            process.env.VITE_SITE_URL ||
            process.env.SITE_URL ||
            (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
            (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
            'https://navya-edu.vercel.app'
          ).replace(/\/+$/, '');
          const { html: appHtml, metadata } = render(url);

          const title = metadata.title || 'Navya Ed Tech | Professional IT Education & Technology Training in Nepal';
          const description =
            metadata.description ||
            'Practical IT education designed around modern technologies, real projects, and career-ready skills.';
          const ogImage = metadata.ogImage || `${BASE_URL}/og-image.jpg`;
          const canonicalUrl = metadata.canonicalUrl || `${BASE_URL}${url === '/' ? '' : url}`;
          const ogType = metadata.ogType || 'website';
          const ogSiteName = metadata.ogSiteName || 'Navya Ed Tech';

          let pageHtml = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

          // Replace title & description
          pageHtml = pageHtml.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
          pageHtml = pageHtml.replace(
            /<meta name="description" content="[\s\S]*?" \/>/i,
            `<meta name="description" content="${description}" />`
          );

          // Strip placeholder template tags
          pageHtml = pageHtml.replace(/<meta property="og:title" content="[\s\S]*?" \/>\s*/gi, '');
          pageHtml = pageHtml.replace(/<meta property="og:description" content="[\s\S]*?" \/>\s*/gi, '');
          pageHtml = pageHtml.replace(/<meta property="og:type" content="[\s\S]*?" \/>\s*/gi, '');
          pageHtml = pageHtml.replace(/<meta name="twitter:card" content="[\s\S]*?" \/>\s*/gi, '');
          pageHtml = pageHtml.replace(/<link rel="canonical" href="[\s\S]*?" \/>\s*/gi, '');

          const seoHeadTags = [
            `<!-- Canonical & OpenGraph / Twitter Cards -->`,
            `<link rel="canonical" href="${canonicalUrl}" />`,
            `<meta property="og:type" content="${ogType}" />`,
            `<meta property="og:site_name" content="${ogSiteName}" />`,
            `<meta property="og:url" content="${canonicalUrl}" />`,
            `<meta property="og:title" content="${title}" />`,
            `<meta property="og:description" content="${description}" />`,
            `<meta property="og:image" content="${ogImage}" />`,
            `<meta property="og:image:width" content="1200" />`,
            `<meta property="og:image:height" content="630" />`,
            `<meta name="twitter:card" content="summary_large_image" />`,
            `<meta name="twitter:url" content="${canonicalUrl}" />`,
            `<meta name="twitter:title" content="${title}" />`,
            `<meta name="twitter:description" content="${description}" />`,
            `<meta name="twitter:image" content="${ogImage}" />`,
          ];

          if (metadata.keywords) {
            seoHeadTags.push(`<meta name="keywords" content="${metadata.keywords}" />`);
          }

          if (metadata.structuredData) {
            const jsonLdContent = JSON.stringify(metadata.structuredData, null, 2);
            seoHeadTags.push(`<script type="application/ld+json" id="seo-json-ld">\n${jsonLdContent}\n    </script>`);
          }

          pageHtml = pageHtml.replace('</head>', `    ${seoHeadTags.join('\n    ')}\n  </head>`);

          return pageHtml;
        } catch (err) {
          console.error(`[ssr-dev] Error rendering ${url}:`, err);
          return html;
        }
      },
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), ssrDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom/dist/index.mjs'),
      },
    },
    ssr: {
      noExternal: ['react-router-dom', 'react-router', 'lucide-react'],
    },
    build: {
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'vendor-react';
              }
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
            }
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
