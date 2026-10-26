import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowRight, MessageSquareCode, ChevronDown, Phone } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { AdvisorModal } from '../common/AdvisorModal';
import { Logo } from '../common/Logo';
import { EASING, fadeUp, staggerContainer } from '../../lib/motion';

// Pages with significant vertical scroll where a header reading-progress bar assists navigation orientation
const LONG_PAGES = [
  '/about',
  '/programs',
  '/student-work',
  '/courses',
  '/pricing',
  '/faq',
  '/corporate-training',
  '/insights',
  '/contact',
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const wasMobileMenuOpen = useRef(false);

  // Scroll threshold: switch state after scrolling past 80px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreOpen(false);
    setHoveredNav(null);
  }, [location.pathname]);

  // Click outside to close 'More' dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle mobile menu body scroll lock, focus trap & Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) {
      if (wasMobileMenuOpen.current) {
        mobileMenuTriggerRef.current?.focus();
      }
      wasMobileMenuOpen.current = false;
      return;
    }

    wasMobileMenuOpen.current = true;

    const timer = setTimeout(() => {
      if (mobileDrawerRef.current) {
        const focusable = mobileDrawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsMoreOpen(false);
        return;
      }

      if (e.key === 'Tab' && mobileDrawerRef.current) {
        const focusable = (
          Array.from(
            mobileDrawerRef.current.querySelectorAll(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ) as HTMLElement[]
        ).filter((el) => el.offsetParent !== null);

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || !mobileDrawerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last || !mobileDrawerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  // Determine if active route qualifies for scroll progress bar
  const showProgressBar = LONG_PAGES.some(
    (path) => location.pathname === path || location.pathname.startsWith(`${path}/`)
  );

  return (
    <>
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 w-full transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled
            ? 'bg-paper/85 backdrop-blur-xl shadow-[0_4px_24px_rgba(23,50,77,0.07)] border-b border-border/80'
            : 'bg-paper/95 backdrop-blur-md border-b border-border-soft'
        }`}
      >
        {/* Nav Container with height shrink from h-20 (unscrolled) to h-16 (scrolled past 80px) */}
        <div
          className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-6 flex items-center justify-between transition-[height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isScrolled ? 'h-16' : 'h-20'
          }`}
        >
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-lg p-1 transition-transform duration-200 hover:scale-[1.01]"
          >
            <Logo
              variant="light"
              size="md"
              subtitle="IT Training & Professional Education"
            />
          </Link>

          {/* Desktop Navigation Links with animated sliding indicator */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-1.5"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {MAIN_NAV_ITEMS.map((item) => {
              if (item.children) {
                const isChildActive = item.children.some(
                  (child) => location.pathname === child.href || location.pathname.startsWith(`${child.href}/`)
                );
                const isSelected = hoveredNav ? hoveredNav === item.label : (isChildActive || isMoreOpen);

                return (
                  <div key={item.label} ref={moreDropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsMoreOpen((prev) => !prev)}
                      onMouseEnter={() => setHoveredNav(item.label)}
                      aria-expanded={isMoreOpen}
                      aria-haspopup="true"
                      className={`relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        isSelected
                          ? 'text-navy font-semibold'
                          : 'text-ink-soft hover:text-ink'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-xl bg-paper-alt border border-border/50 shadow-2xs -z-10"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 420, damping: 32 }
                          }
                        />
                      )}
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-ink-faint transition-transform duration-200 ${
                          isMoreOpen ? 'rotate-180 text-navy' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMoreOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8, scale: prefersReducedMotion ? 1 : 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 6, scale: prefersReducedMotion ? 1 : 0.98 }}
                          transition={{ duration: prefersReducedMotion ? 0.05 : 0.18, ease: EASING }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-border shadow-xl p-2 z-50 space-y-1"
                        >
                          {item.children.map((child) => {
                            const isActive = location.pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setIsMoreOpen(false)}
                                className={`block p-2.5 rounded-xl transition-colors ${
                                  isActive
                                    ? 'bg-paper-alt text-navy font-semibold'
                                    : 'hover:bg-paper-alt text-ink hover:text-navy'
                                }`}
                              >
                                <div className="text-xs sm:text-sm font-bold leading-tight">
                                  {child.label}
                                </div>
                                {child.description && (
                                  <p className="text-xs text-ink-soft font-normal mt-0.5 leading-snug">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              const isActive =
                location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              const isSelected = hoveredNav ? hoveredNav === item.href : isActive;

              return (
                <div key={item.href} className="relative">
                  <Link
                    to={item.href}
                    onMouseEnter={() => setHoveredNav(item.href)}
                    className={`relative block px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      isSelected
                        ? 'text-navy font-semibold'
                        : 'text-ink-soft hover:text-ink'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-xl bg-paper-alt border border-border/50 shadow-2xs -z-10"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 420, damping: 32 }
                        }
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Action / Enrollment & Advisor Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="tel:+9779800000000"
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-ink-muted hover:text-navy hover:bg-paper-alt transition-all border border-transparent hover:border-border"
              title="Call Admissions Desk: +977 980-0000000"
            >
              <Phone className="w-3.5 h-3.5 text-navy" />
              <span>+977 980-0000000</span>
            </a>

            <Link
              to="/apply"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-border hover:border-navy text-ink hover:text-navy text-xs sm:text-[13px] font-semibold tracking-tight transition-all bg-white hover:bg-paper-alt shadow-2xs hover:shadow-xs"
            >
              <span>Apply Now</span>
            </Link>

            {/* Primary CTA with subtle hover lift and scale feedback */}
            <motion.button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              whileHover={prefersReducedMotion ? {} : { scale: 1.025, y: -1 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASING }}
              className="group relative inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-navy hover:bg-navy-deep text-white text-xs sm:text-[13px] font-semibold tracking-tight shadow-sm hover:shadow-md hover:shadow-navy/20 border border-navy-light focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 cursor-pointer transition-shadow"
            >
              {/* Live Availability Indicator */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>

              <MessageSquareCode className="w-4 h-4 text-[#93C5FD] transition-transform duration-200 group-hover:scale-110" />

              <span>Talk to an Advisor</span>

              <ArrowRight className="w-3.5 h-3.5 text-white/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
            </motion.button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/apply"
              className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-2 rounded-lg border border-border bg-white text-ink hover:bg-paper-alt"
            >
              Apply
            </Link>
            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-navy text-white hover:bg-navy-deep shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>Advisor</span>
            </button>
            <button
              ref={mobileMenuTriggerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="p-2.5 rounded-xl text-ink hover:bg-paper-alt transition-colors focus:outline-none focus:ring-2 focus:ring-navy cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Scroll Progress Bar for long content pages (transform: scaleX only, GPU-accelerated) */}
        {showProgressBar && (
          <div className="relative w-full h-[2.5px] bg-transparent overflow-hidden">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-blue-electric via-blue to-teal-500 origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        )}

        {/* Mobile Navigation Drawer with animated slide/fade and staggered link entrance */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileDrawerRef}
              id="mobile-navigation-drawer"
              role="dialog"
              aria-label="Mobile Navigation"
              aria-modal="true"
              tabIndex={-1}
              initial={{ opacity: 0, height: 0, y: prefersReducedMotion ? 0 : -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: prefersReducedMotion ? 0.05 : 0.28, ease: EASING }}
              className="lg:hidden border-t border-border bg-paper px-4 pt-3 pb-6 space-y-4 shadow-xl focus:outline-none max-h-[calc(100vh-5rem)] overflow-y-auto"
            >
              <motion.div
                variants={prefersReducedMotion ? undefined : staggerContainer(0.04, 0.03)}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Admissions & Programs */}
                <motion.div variants={prefersReducedMotion ? undefined : fadeUp}>
                  <div className="pb-1 mb-2 border-b border-border">
                    <span className="text-xs font-bold text-ink-faint uppercase tracking-wider px-3">
                      Courses & Admissions
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/courses"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/courses' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Courses Catalog
                    </Link>
                    <Link
                      to="/programs"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/programs' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Career Programs
                    </Link>
                    <Link
                      to="/pricing"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/pricing' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Pricing & Tuition (NPR)
                    </Link>
                    <Link
                      to="/apply"
                      className={`block px-3 py-2 rounded-lg text-sm font-semibold transition-colors text-blue ${
                        location.pathname === '/apply' ? 'bg-blue/10' : 'hover:bg-paper-alt'
                      }`}
                    >
                      Apply & Enroll Now
                    </Link>
                    <Link
                      to="/corporate-training"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/corporate-training' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Institutional & Corporate Training
                    </Link>
                  </div>
                </motion.div>

                {/* Explore & Resources */}
                <motion.div variants={prefersReducedMotion ? undefined : fadeUp}>
                  <div className="pb-1 mb-2 border-b border-border">
                    <span className="text-xs font-bold text-ink-faint uppercase tracking-wider px-3">
                      Explore & Resources
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Link
                      to="/student-work"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/student-work' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Student Work & Capstones
                    </Link>
                    <Link
                      to="/about"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/about' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      About Navya Ed Tech
                    </Link>
                    <Link
                      to="/faq"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/faq' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Admissions FAQ
                    </Link>
                    <Link
                      to="/insights"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/insights' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Industry Insights
                    </Link>
                    <Link
                      to="/contact"
                      className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === '/contact' ? 'text-navy bg-paper-alt font-semibold' : 'text-ink hover:bg-paper-alt'
                      }`}
                    >
                      Contact Admissions Desk
                    </Link>
                  </div>
                </motion.div>

                <motion.div variants={prefersReducedMotion ? undefined : fadeUp} className="pt-2 border-t border-border space-y-2.5">
                  <a
                    href="tel:+9779800000000"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-white text-ink hover:text-navy text-xs font-semibold shadow-2xs transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-navy" />
                    <span>Call Admissions: +977 980-0000000</span>
                  </a>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-navy hover:bg-navy-deep text-white text-sm font-semibold shadow-sm hover:shadow-md active:scale-[0.99] transition-all cursor-pointer"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAdvisorModalOpen(true);
                    }}
                  >
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <MessageSquareCode className="w-4 h-4 text-[#93C5FD]" />
                    <span>Talk to an Advisor</span>
                    <ArrowRight className="w-4 h-4 text-white/70" />
                  </button>
                  <div className="text-center">
                    <a
                      href="https://navyaedtech.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-ink-soft hover:text-navy"
                    >
                      <span>Visit Parent Company (navyaedtech.com)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Global Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />
    </>
  );
};

