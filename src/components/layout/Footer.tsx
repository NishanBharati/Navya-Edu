import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Clock, Phone, Globe } from 'lucide-react';
import { FOOTER_LINKS } from '../../data/navigation';
import { Container } from '../common/Container';
import { Logo } from '../common/Logo';

const columnHeading = 'font-display text-base font-bold text-white mb-5';
const footerLink = 'link-underline text-[15px] text-mist hover:text-white';

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden bg-ink text-mist">
      <div className="absolute inset-0 bg-dots-light opacity-50 pointer-events-none" aria-hidden="true" />

      <Container className="relative">
        <h2 className="sr-only">Footer Directory and Institutional Links</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 pt-20 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-6">
            <Link to="/" className="block w-fit rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-ink">
              <Logo variant="dark" size="md" subtitle="Live online coding classes" />
            </Link>

            <p className="text-[15px] leading-relaxed text-mist max-w-sm">
              Hands-on coding classes for ages 8 to 16, and Python, web development and data science courses for older
              students. Small live online groups and real projects, from anywhere in Nepal.
            </p>
          </div>

          {/* Popular Courses */}
          <nav aria-label="Popular courses" className="lg:col-span-2 lg:col-start-6">
            <h3 className={columnHeading}>Popular Courses</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.popularCourses.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs & Admissions */}
          <nav aria-label="Programs and admissions" className="lg:col-span-2">
            <h3 className={columnHeading}>Programs & Admissions</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.education.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={footerLink}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Admissions Desk */}
          <div className="sm:col-span-2 lg:col-span-3 lg:col-start-10">
            <h3 className={columnHeading}>Admissions Desk</h3>
            <ul className="space-y-3.5 text-[14px]">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-navy-mist shrink-0 mt-0.5" />
                <a href="tel:+9779800000000" className="link-underline text-white font-medium tabular-nums">
                  +977 980-0000000
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-navy-mist shrink-0 mt-0.5" />
                <a href="mailto:info@navyaedtech.com" className="link-underline hover:text-white">
                  info@navyaedtech.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-navy-mist shrink-0 mt-0.5" />
                <span>Sun to Fri: 7:00 AM to 7:00 PM</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-navy-mist shrink-0 mt-0.5" />
                <span>100% online, live classes</span>
              </li>
            </ul>
            <Link
              to="/contact"
              className="group mt-6 inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-block-yellow text-ink font-display text-[15px] font-bold shadow-[inset_0_-7px_9px_-6px_rgb(15_22_64/0.32)] hover:-translate-y-0.5 active:scale-[0.97] transition-[translate,scale] duration-180 ease-out"
            >
              <span>Inquire / Book a demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-240 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-navy-mist">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Navya Ed Tech Pvt. Ltd. All rights reserved.
            <span className="hidden sm:inline"> Live online classes across Nepal.</span>
          </p>
          <nav aria-label="Legal and institutional policies" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/terms" className="link-underline hover:text-white">Terms of Service</Link>
            <Link to="/privacy" className="link-underline hover:text-white">Privacy Policy</Link>
            <Link to="/refund" className="link-underline hover:text-white">Refund Policy</Link>
            <Link to="/faq" className="link-underline hover:text-white">Student FAQ</Link>
          </nav>
        </div>
      </Container>
    </footer>
  );
};
