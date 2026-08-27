import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Courses } from '../pages/Courses';
import { CourseDetails } from '../pages/CourseDetails';
import { Programs } from '../pages/Programs';
import { About } from '../pages/About';
import { StudentWork } from '../pages/StudentWork';
import { Insights } from '../pages/Insights';
import { BlogDetails } from '../pages/BlogDetails';
import { Contact } from '../pages/Contact';
import { Terms } from '../pages/Terms';
import { Privacy } from '../pages/Privacy';

// ScrollToTop component to reset viewport on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetails />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/about" element={<About />} />
        <Route path="/student-work" element={<StudentWork />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        {/* Fallback to Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
};
