import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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

// ScrollToTop component to reset viewport on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes: React.FC = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const variants = getMotionVariants(prefersReducedMotion).pageTransition;

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
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
      </AnimatePresence>
    </>
  );
};

