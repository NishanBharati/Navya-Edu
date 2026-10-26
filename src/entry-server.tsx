import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { SEOContext, SEOMetadata } from './components/common/SEOHead';
import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';

export interface RenderResult {
  html: string;
  metadata: SEOMetadata;
}

export function render(url: string): RenderResult {
  let capturedMeta: SEOMetadata = {};

  const html = renderToString(
    <SEOContext.Provider value={{ setMetadata: (meta) => { capturedMeta = meta; } }}>
      <StaticRouter location={url}>
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen flex flex-col bg-paper text-ink">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-navy focus:text-white focus:font-semibold focus:rounded-xl focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
            >
              Skip to main content
            </a>
            <Navbar />
            <div id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
              <AppRoutes />
            </div>
            <Footer />
          </div>
        </MotionConfig>
      </StaticRouter>
    </SEOContext.Provider>
  );

  return {
    html,
    metadata: capturedMeta,
  };
}
