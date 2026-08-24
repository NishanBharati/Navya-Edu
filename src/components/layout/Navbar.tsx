import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, MessageSquareCode } from 'lucide-react';
import { MAIN_NAV_ITEMS } from '../../data/navigation';
import { Button } from '../common/Button';
import { AdvisorModal } from '../common/AdvisorModal';

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
        className={`sticky top-0 z-40 w-full transition-all duration-200 bg-[#FAFAF8] ${
          isScrolled
            ? 'border-b border-[#E8E4DA] shadow-[0_2px_12px_rgba(23,50,77,0.04)] bg-[#FAFAF8]/95 backdrop-blur-md'
            : 'border-b border-[#EFECE5]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#17324D] rounded-lg p-1"
            aria-label="Navya Ed Tech Home"
          >
            {/* Visual Mark */}
            <div className="w-10 h-10 rounded-xl bg-[#17324D] text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm group-hover:bg-[#12283E] transition-colors">
              N
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-[#171A1F]">
                  NAVYA
                </span>
                <span className="font-heading font-semibold text-xs tracking-wider uppercase text-[#356A9A] bg-[#356A9A]/10 px-1.5 py-0.5 rounded">
                  ED TECH
                </span>
              </div>
              <span className="text-[11px] text-[#5F6670] tracking-wide font-normal -mt-0.5 hidden sm:inline-block">
                IT Training & Professional Education
              </span>
            </div>
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
                      ? 'text-[#17324D] bg-[#F4F1EA] font-semibold'
                      : 'text-[#5F6670] hover:text-[#171A1F] hover:bg-black/5'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Advisor Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdvisorModalOpen(true)}
              leftIcon={<MessageSquareCode className="w-4 h-4 text-[#356A9A]" />}
            >
              Talk to an Advisor
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="text-xs font-semibold px-3 py-2 rounded-lg bg-[#17324D] text-white hover:bg-[#12283E] transition-colors"
            >
              Advisor
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
              className="p-2.5 rounded-lg text-[#171A1F] hover:bg-[#F4F1EA] transition-colors focus:outline-none focus:ring-2 focus:ring-[#17324D]"
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
          <div className="lg:hidden border-t border-[#E8E4DA] bg-[#FAFAF8] px-4 pt-3 pb-6 space-y-1 shadow-lg animate-fade-in">
            <div className="pb-2 mb-2 border-b border-[#E8E4DA]">
              <span className="text-[11px] font-semibold text-[#8C939E] uppercase tracking-wider px-3">
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
                      ? 'text-[#17324D] bg-[#F4F1EA] font-semibold'
                      : 'text-[#171A1F] hover:bg-[#F4F1EA]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#E8E4DA] space-y-3">
              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAdvisorModalOpen(true);
                }}
              >
                Talk to an Advisor
              </Button>
              <div className="text-center">
                <a
                  href="https://navyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#5F6670] hover:text-[#17324D]"
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
