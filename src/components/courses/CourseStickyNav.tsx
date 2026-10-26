import React, { useState, useEffect, useMemo } from 'react';
import { Layers, Terminal, UserCheck, HelpCircle, MessageSquareCode, Download, Award, MessageSquare } from 'lucide-react';
import { Container } from '../common/Container';

interface CourseStickyNavProps {
  onOpenAdvisor: (intent?: 'enroll' | 'demo') => void;
  onDownloadSyllabus?: () => void;
  courseTitle?: string;
  hasProjects?: boolean;
  hasFaqs?: boolean;
}

export const CourseStickyNav: React.FC<CourseStickyNavProps> = ({
  onOpenAdvisor,
  onDownloadSyllabus,
  hasProjects = false,
  hasFaqs = false
}) => {
  const [activeSection, setActiveSection] = useState('curriculum');
  const [isSticky, setIsSticky] = useState(false);

  const navItems = useMemo(() => {
    const items = [
      { id: 'curriculum', label: 'Curriculum', icon: <Layers className="w-3.5 h-3.5" /> },
    ];
    if (hasProjects) {
      items.push({ id: 'projects', label: 'Capstones', icon: <Terminal className="w-3.5 h-3.5" /> });
    }
    items.push({ id: 'instructor', label: 'Faculty', icon: <UserCheck className="w-3.5 h-3.5" /> });
    items.push({ id: 'eligibility', label: 'Eligibility', icon: <UserCheck className="w-3.5 h-3.5" /> });
    items.push({ id: 'certificate', label: 'Certificate', icon: <Award className="w-3.5 h-3.5" /> });
    if (hasFaqs) {
      items.push({ id: 'faqs', label: 'FAQs', icon: <HelpCircle className="w-3.5 h-3.5" /> });
    }
    items.push({ id: 'inquiry', label: 'Inquiry', icon: <MessageSquare className="w-3.5 h-3.5" /> });
    return items;
  }, [hasProjects, hasFaqs]);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle sticky state
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Check current section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPos = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <div
      className={`w-full bg-paper transition-all duration-200 z-30 ${
        isSticky
          ? 'sticky top-20 border-b border-border bg-paper/95 backdrop-blur-md shadow-xs'
          : 'border-b border-border-soft'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4 py-2.5 overflow-x-auto scrollbar-none">
          {/* Section links */}
          <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-navy text-white shadow-xs'
                      : 'text-ink-soft hover:text-ink hover:bg-paper-alt'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick CTAs */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {onDownloadSyllabus && (
              <button
                type="button"
                onClick={onDownloadSyllabus}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy hover:bg-paper-alt px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue" />
                <span>PDF</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onOpenAdvisor('demo')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-navy bg-paper-alt hover:bg-[#EAE5DA] border border-border-warm transition-colors shadow-xs cursor-pointer"
            >
              <span>Book Demo</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenAdvisor('enroll')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-navy hover:bg-navy-deep transition-colors shadow-xs cursor-pointer"
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Enroll Now</span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};
