import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ArrowRight, MessageSquareCode } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { AdvisorModal } from '../common/AdvisorModal';
import { Logo } from '../common/Logo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-paper ${
          isScrolled
            ? 'border-b border-border shadow-[0_2px_12px_rgba(23,50,77,0.04)] bg-paper/95 backdrop-blur-md'
            : 'border-b border-border-soft'
        }`}
      >
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-6 h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-navy rounded-lg p-1"
            aria-label="Navya Ed Tech Home"
          >
            <Logo
              variant="light"
              size="md"
              subtitle="IT Training & Professional Education"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-navy bg-paper-alt font-semibold'
                      : 'text-ink-soft hover:text-ink hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Advisor Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="group relative inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-navy via-[#1C3B5E] to-navy text-white text-xs sm:text-[13px] font-semibold tracking-tight shadow-md shadow-navy/20 hover:shadow-xl hover:shadow-navy/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 border border-[#2B4B6E] focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 cursor-pointer"
            >
              {/* Subtle Live Availability Indicator */}
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>

              <MessageSquareCode className="w-4 h-4 text-[#93C5FD] transition-transform duration-200 group-hover:scale-110" />

              <span>Talk to an Advisor</span>

              <ArrowRight className="w-3.5 h-3.5 text-white/70 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAdvisorModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-navy text-white hover:bg-navy-deep shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Advisor</span>
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="p-2.5 rounded-lg text-ink hover:bg-paper-alt transition-colors focus:outline-none focus:ring-2 focus:ring-navy"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-paper px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fade-in">
            <div className="pb-2 mb-2 border-b border-border">
              <span className="text-[11px] font-semibold text-ink-faint uppercase tracking-wider px-3">
                Navigation
              </span>
            </div>
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'text-navy bg-paper-alt font-semibold'
                      : 'text-ink hover:bg-paper-alt'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-border space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-navy via-[#1C3B5E] to-navy text-white text-sm font-semibold shadow-md shadow-navy/20 hover:shadow-lg active:scale-[0.99] transition-all cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdvisorModalOpen(true);
                }}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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
            </div>
          </div>
        )}
      </header>

      {/* Global Advisor Modal */}
      <AdvisorModal
        isOpen={isAdvisorModalOpen}
        onClose={() => setIsAdvisorModalOpen(false)}
      />
    </>
  );
};
