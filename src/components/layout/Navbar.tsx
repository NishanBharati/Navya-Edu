import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowRight, ChevronDown, Phone } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { AdvisorModal } from '../common/AdvisorModal';
import { Logo } from '../common/Logo';
import { EASING, EASE_IN_OUT, DURATION, fadeUp, staggerContainer } from '../../lib/motion';

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
  const [isHidden, setIsHidden] = useState(false);
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
  const menusOpenRef = useRef(false);
  menusOpenRef.current = isMobileMenuOpen || isMoreOpen;

  // Compact surface after 24px; slide away while reading down, return on any upward scroll.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      setIsScrolled(y > 24);
      if (menusOpenRef.current || y < 320) {
        setIsHidden(false);
      } else if (delta > 6) {
        setIsHidden(true);
      } else if (delta < -4) {
        setIsHidden(false);
      }
      lastY = y;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
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

  const indicatorTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: DURATION.base, ease: EASE_IN_OUT };

  const mobileLink = (href: string, label: string) => {
    const isActive = location.pathname === href;
    return (
      <Link
        to={href}
        aria-current={isActive ? 'page' : undefined}
        className={`flex items-center justify-between px-3 h-11 rounded-xl text-[15px] transition-colors duration-180 ${
          isActive ? 'text-navy bg-navy/[0.06] font-semibold' : 'text-ink hover:bg-ink/[0.04]'
        }`}
      >
        <span>{label}</span>
        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-navy" aria-hidden="true" />}
      </Link>
    );
  };

  return (
    <>
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 w-full transition-[translate,background-color,border-color,box-shadow] duration-240 ease-out focus-within:translate-y-0 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled || isMobileMenuOpen
            ? 'bg-paper/85 backdrop-blur-xl backdrop-saturate-150 border-b border-border/70 shadow-[0_1px_0_rgb(23_50_77/0.03),0_8px_24px_-12px_rgb(23_50_77/0.12)]'
            : 'bg-paper/0 border-b border-transparent'
        }`}
      >
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-18 flex items-center justify-between gap-6">
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            className="shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-lg p-1 -m-1"
          >
            <Logo
              variant="light"
              size="md"
              subtitle="IT Training & Professional Education"
              subtitleClassName="hidden sm:block"
            />
          </Link>

          {/* Desktop Navigation: one indicator glides between hovered and active links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-0.5"
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
                      className={`relative inline-flex items-center gap-1 px-3.5 h-10 rounded-xl text-[14px] font-medium transition-colors duration-180 cursor-pointer ${
                        isSelected || isChildActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute inset-0 rounded-xl bg-ink/[0.045] -z-10"
                          transition={indicatorTransition}
                        />
                      )}
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-ink-faint transition-transform duration-240 ease-out ${
                          isMoreOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMoreOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98, transition: { duration: DURATION.instant } }}
                          transition={{ duration: DURATION.fast, ease: EASING }}
                          style={{ transformOrigin: 'top left' }}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-border shadow-xl p-1.5 z-50"
                        >
                          {item.children.map((child) => {
                            const isActive = location.pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={() => setIsMoreOpen(false)}
                                aria-current={isActive ? 'page' : undefined}
                                className={`group/item flex items-start justify-between gap-3 p-3 rounded-xl transition-colors duration-180 ${
                                  isActive ? 'bg-navy/[0.05]' : 'hover:bg-paper-alt'
                                }`}
                              >
                                <span>
                                  <span className={`block text-sm font-semibold leading-tight ${isActive ? 'text-navy' : 'text-ink'}`}>
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="block text-[13px] text-ink-muted mt-1 leading-snug">
                                      {child.description}
                                    </span>
                                  )}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ink-faint opacity-0 -translate-x-1 transition-[opacity,translate,scale,rotate] duration-180 ease-out group-hover/item:opacity-100 group-hover/item:translate-x-0" />
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
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative flex items-center px-3.5 h-10 rounded-xl text-[14px] font-medium transition-colors duration-180 ${
                      isSelected || isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl bg-ink/[0.045] -z-10"
                        transition={indicatorTransition}
                      />
                    )}
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-1 w-1 h-1 rounded-full bg-navy" aria-hidden="true" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <a
              href="tel:+9779800000000"
              className="hidden xl:inline-flex items-center gap-2 px-3 h-10 rounded-xl text-[13px] font-medium text-ink-muted hover:text-ink transition-colors duration-180"
              title="Call Admissions Desk: +977 980-0000000"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="tabular-nums">+977 980-0000000</span>
            </a>

            <Link
              to="/apply"
              className="inline-flex items-center h-10 px-4 rounded-xl border border-border-warm bg-white text-ink text-[13px] font-semibold shadow-xs hover:border-navy/35 hover:shadow-sm active:scale-[0.97] transition-[border-color,box-shadow,translate,scale,rotate] duration-180 ease-out"
            >
              Apply Now
            </Link>

            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="group inline-flex items-center gap-2 h-10 pl-4 pr-3.5 rounded-xl bg-navy text-white text-[13px] font-semibold shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_1px_2px_rgb(23_50_77/0.2)] hover:bg-navy-light active:scale-[0.97] transition-[background-color,translate,scale,rotate] duration-180 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2"
            >
              <span>Talk to an Advisor</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 transition-transform duration-240 ease-out group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1.5">
            <Link
              to="/apply"
              className="hidden min-[400px]:inline-flex items-center h-9 px-3 rounded-lg border border-border-warm bg-white text-ink text-[13px] font-semibold active:scale-[0.97] transition-transform duration-180"
            >
              Apply
            </Link>
            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="inline-flex items-center h-9 px-3 rounded-lg bg-navy text-white text-[13px] font-semibold active:scale-[0.97] transition-transform duration-180 cursor-pointer"
            >
              Advisor
            </button>
            <button
              ref={mobileMenuTriggerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="relative w-11 h-11 -mr-1 grid place-items-center rounded-xl text-ink hover:bg-ink/[0.04] active:scale-[0.94] transition-[background-color,translate,scale,rotate] duration-180 cursor-pointer"
            >
              <Menu
                className={`absolute w-5.5 h-5.5 transition-[opacity,translate,scale,rotate] duration-180 ease-out ${
                  isMobileMenuOpen ? 'opacity-0 rotate-45 scale-75' : 'opacity-100'
                }`}
              />
              <X
                className={`absolute w-5.5 h-5.5 transition-[opacity,translate,scale,rotate] duration-180 ease-out ${
                  isMobileMenuOpen ? 'opacity-100' : 'opacity-0 -rotate-45 scale-75'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Reading progress for long pages (transform: scaleX only) */}
        {showProgressBar && (
          <div className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden pointer-events-none">
            <motion.div
              aria-hidden="true"
              className="h-full bg-gradient-to-r from-navy via-blue to-blue-light origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        )}

        {/* Mobile Navigation: overlay panel (no layout shift), links stagger in */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                key="mobile-nav-scrim"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.base, ease: EASING }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden absolute inset-x-0 top-full h-dvh bg-navy-dark/30"
              />
              <motion.div
                key="mobile-nav-panel"
                ref={mobileDrawerRef}
                id="mobile-navigation-drawer"
                role="dialog"
                aria-label="Mobile Navigation"
                aria-modal="true"
                tabIndex={-1}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: DURATION.fast } }}
                transition={{ duration: DURATION.base, ease: EASING }}
                className="lg:hidden absolute inset-x-0 top-full border-b border-border bg-paper shadow-xl focus:outline-none max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain"
              >
                <motion.div
                  variants={staggerContainer(0.04, 0.02)}
                  initial="hidden"
                  animate="visible"
                  className="px-4 sm:px-6 pt-4 pb-6 space-y-6"
                >
                  <motion.div variants={fadeUp}>
                    <p className="eyebrow px-3 mb-2">Courses & Admissions</p>
                    <div className="space-y-0.5">
                      {mobileLink('/courses', 'Courses Catalog')}
                      {mobileLink('/programs', 'Career Programs')}
                      {mobileLink('/pricing', 'Pricing & Tuition (NPR)')}
                      {mobileLink('/apply', 'Apply & Enroll Now')}
                      {mobileLink('/corporate-training', 'Institutional & Corporate Training')}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <p className="eyebrow px-3 mb-2">Explore & Resources</p>
                    <div className="space-y-0.5">
                      {mobileLink('/student-work', 'Student Work & Capstones')}
                      {mobileLink('/about', 'About Navya Ed Tech')}
                      {mobileLink('/faq', 'Admissions FAQ')}
                      {mobileLink('/insights', 'Industry Insights')}
                      {mobileLink('/contact', 'Contact Admissions Desk')}
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="pt-5 border-t border-border space-y-2.5">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 h-12 rounded-xl bg-navy text-white text-[15px] font-semibold active:scale-[0.98] transition-transform duration-180 cursor-pointer"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsAdvisorModalOpen(true);
                      }}
                    >
                      <span>Talk to an Advisor</span>
                      <ArrowRight className="w-4 h-4 text-white/70" />
                    </button>
                    <a
                      href="tel:+9779800000000"
                      className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-border-warm bg-white text-ink text-sm font-semibold"
                    >
                      <Phone className="w-4 h-4 text-navy" />
                      <span className="tabular-nums">Call Admissions: +977 980-0000000</span>
                    </a>
                    <div className="pt-2 text-center">
                      <a
                        href="https://navyaedtech.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[13px] text-ink-muted hover:text-navy"
                      >
                        <span>Visit Parent Company (navyaedtech.com)</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </>
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
