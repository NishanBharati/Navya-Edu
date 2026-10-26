import React, { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { getMotionVariants } from '../lib/motion';
import { Home } from '../pages/Home';
import { Courses } from '../pages/Courses';
import { CourseDetails } from '../pages/CourseDetails';
import { Programs } from '../pages/Programs';
import { ProgramDetails } from '../pages/ProgramDetails';
import { About } from '../pages/About';
import { StudentWork } from '../pages/StudentWork';
import { Insights } from '../pages/Insights';
import { BlogDetails } from '../pages/BlogDetails';
import { Contact } from '../pages/Contact';
import { Terms } from '../pages/Terms';
import { Privacy } from '../pages/Privacy';
import { Refund } from '../pages/Refund';
import { FAQ } from '../pages/FAQ';
import { Pricing } from '../pages/Pricing';
import { Apply } from '../pages/Apply';
import { CorporateTraining } from '../pages/CorporateTraining';
import { NotFound } from '../pages/NotFound';

// Resets the viewport on route change, or brings a #hash target into view.
const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash, prefersReducedMotion]);

  return null;
};

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const variants = getMotionVariants(prefersReducedMotion).pageTransition;
  // The first (server-rendered) page must paint immediately; only later navigations fade in.
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  return (
    <>
      <ScrollToTop />
      <motion.div
        key={location.pathname}
        variants={variants}
        initial={isFirstRender.current ? false : 'initial'}
        animate="animate"
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetails />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/enroll" element={<Navigate to="/apply" replace />} />
          <Route path="/corporate-training" element={<CorporateTraining />} />
          <Route path="/institutional" element={<Navigate to="/corporate-training" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/student-work" element={<StudentWork />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<BlogDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/faq" element={<FAQ />} />
          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </>
  );
};

